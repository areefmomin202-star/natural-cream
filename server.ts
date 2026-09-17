import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { 
  getProduct, 
  updateProduct, 
  resetProduct, 
  getOrders, 
  addOrder, 
  updateOrder, 
  deleteOrder, 
  resetOrders 
} from './server/db';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Basic CORS & Headers for safety
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

  // ==========================================
  // API Routes (MUST BE BEFORE VITE MIDDLEWARE)
  // ==========================================

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Product API
  app.get('/api/product', (_req, res) => {
    try {
      const product = getProduct();
      res.json(product);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'Failed to retrieve product data', message });
    }
  });

  app.put('/api/product', (req, res) => {
    try {
      const updates = req.body;
      if (!updates || typeof updates !== 'object') {
        res.status(400).json({ error: 'Invalid product payload' });
        return;
      }
      const updated = updateProduct(updates);
      res.json(updated);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'Failed to update product', message });
    }
  });

  app.post('/api/product/reset', (_req, res) => {
    try {
      const reset = resetProduct();
      res.json(reset);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'Failed to reset product', message });
    }
  });

  // Orders API
  app.get('/api/orders', (_req, res) => {
    try {
      const orders = getOrders();
      res.json(orders);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'Failed to retrieve orders', message });
    }
  });

  app.post('/api/orders', (req, res) => {
    try {
      const orderData = req.body;
      if (!orderData || !orderData.customerName || !orderData.phone) {
        res.status(400).json({ error: 'Missing required order fields' });
        return;
      }
      const created = addOrder(orderData);
      res.status(201).json(created);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'Failed to create order', message });
    }
  });

  app.patch('/api/orders/:id', (req, res) => {
    try {
      const { id } = req.params;
      const patch = req.body;
      const updated = updateOrder(id, patch);
      if (!updated) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
      res.json(updated);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'Failed to update order', message });
    }
  });

  app.delete('/api/orders/:id', (req, res) => {
    try {
      const { id } = req.params;
      const success = deleteOrder(id);
      if (!success) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
      res.json({ success: true, message: `Order #${id} deleted` });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'Failed to delete order', message });
    }
  });

  app.post('/api/orders/reset', (_req, res) => {
    try {
      const orders = resetOrders();
      res.json(orders);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'Failed to reset orders', message });
    }
  });

  // Admin route URL normalize middleware
  app.use((req, _res, next) => {
    if (req.url) {
      const [pathname, search] = req.url.split('?');
      if (pathname.toLowerCase() === '/admin') {
        req.url = '/admin/' + (search ? `?${search}` : '');
      }
    }
    next();
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    app.get(['/admin', '/admin/*'], (_req, res) => {
      res.sendFile(path.join(distPath, 'admin/index.html'));
    });

    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Natural Cream Server running on http://localhost:${PORT}`);
  });
}

startServer();
