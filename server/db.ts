import fs from 'fs';
import path from 'path';
import { ProductConfig, Order } from '../src/types';

const DATA_DIR = process.env.DATA_DIR 
  ? path.resolve(process.env.DATA_DIR) 
  : path.resolve(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

export const DEFAULT_PRODUCT_CONFIG: ProductConfig = {
  name: 'NATURAL CREAM',
  subtitle: 'Wake up to Gorgeous Skin',
  tagline: '“Wake up to Gorgeous Skin”',
  description: 'Original Jar Packaging. Formulated for nocturnal cellular rejuvenation so you wake up to deeply replenished, luminous skin.',
  mrp: 999,
  price: 399,
  discountPercent: 60,
  savings: 600,
  whatsappNumber: '917892658110',
  whatsappDisplayNumber: '+91 7892658110',
  images: [
    {
      id: 'front',
      title: 'NATURAL CREAM',
      subtitle: 'Wake up to Gorgeous Skin',
      src: '/img_jar_front.jpg',
      badge: 'Front Label',
      alt: 'NATURAL CREAM - Wake up to Gorgeous Skin (glossy black jar with silver glitter lid)'
    },
    {
      id: 'back',
      title: 'Directions of Use',
      subtitle: 'To be used before going to sleep only, wash and dry the skin properly then apply',
      src: '/img_jar_instructions.jpg',
      badge: 'Back Label',
      alt: 'NATURAL CREAM back label: Use: To be used before going to sleep only, wash and dry the skin properly then apply'
    }
  ],
  packs: [
    {
      id: 'pack-1',
      name: '1 Jar',
      subtitle: 'Standard 30-Day Night Regimen',
      quantity: 1,
      mrp: 999,
      price: 399,
      discountPercent: 60,
      savings: 600,
      popular: false,
      badge: 'Offer Price'
    },
    {
      id: 'pack-2',
      name: '2 Jars',
      subtitle: '60-Day Transformation Pack',
      quantity: 2,
      mrp: 1998,
      price: 798,
      discountPercent: 60,
      savings: 1200,
      popular: true,
      badge: 'Most Popular'
    },
    {
      id: 'pack-3',
      name: '3 Jars',
      subtitle: 'Complete 90-Day Skin Care Course',
      quantity: 3,
      mrp: 2997,
      price: 1197,
      discountPercent: 60,
      savings: 1800,
      popular: false,
      badge: 'Best Value'
    }
  ],
  usageNotice: 'To be used before going to sleep only, wash and dry the skin properly then apply',
  usageSteps: [
    {
      step: '01',
      title: 'Wash & Dry Skin',
      description: 'Wash face thoroughly with clean water or a gentle cleanser to remove daily dirt and oils, then gently pat completely dry.'
    },
    {
      step: '02',
      title: 'Apply Before Sleep Only',
      description: 'As printed on our official label, use strictly before going to bed. Take a small, pea-sized amount onto clean fingertips.'
    },
    {
      step: '03',
      title: 'Gentle Upward Massage',
      description: 'Dot across your cheeks, forehead, chin, and neck. Smooth gently in upward circular motions until absorbed.'
    },
    {
      step: '04',
      title: 'Wake up to Gorgeous Skin',
      description: 'Allow the restorative formulation to nourish your skin throughout the night. Rinse lightly with water in the morning.'
    }
  ],
  nightCareNoteTitle: 'Why use strictly before sleep?',
  nightCareNote: 'At night, skin cellular turnover increases by up to 3x while blood micro-circulation peaks. Natural Cream is engineered to deliver uninterrupted active hydration without sunscreen filters or environmental stressors.',
  benefits: [
    {
      id: 'glow',
      title: 'Overnight Radiance',
      description: 'Designed specifically for nocturnal cellular rejuvenation so you wake up to deeply replenished, luminous skin.'
    },
    {
      id: 'hydration',
      title: 'Intense Moisture Lock',
      description: 'Binds moisture to the deepest epidermal layers without leaving a greasy or heavy residue on your pillow.'
    },
    {
      id: 'barrier',
      title: 'Skin Barrier Repair',
      description: 'Strengthens fragile skin barriers exposed to daytime pollution, UV fatigue, and climate stress.'
    },
    {
      id: 'texture',
      title: 'Silky Smooth Texture',
      description: 'Gently softens roughness, fine lines, and uneven dry patches for an exceptionally soft touch.'
    }
  ],
  updatedAt: new Date().toISOString()
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'NC-2026-1089',
    customerName: 'Pooja Sharma',
    phone: '+91 98201 44521',
    address: 'Flat 402, Royal Palms, Link Road, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053',
    packSelected: '2 Jars (Most Popular)',
    quantity: 1,
    totalAmount: 699,
    paymentStatus: 'Paid',
    paymentMethod: 'Google Pay (UPI)',
    orderStatus: 'Confirmed',
    createdAt: '2026-09-14T09:30:00.000Z',
    notes: 'Please call before delivery. Call between 2 PM to 6 PM.',
    trackingNumber: 'DTDC-99214301'
  },
  {
    id: 'NC-2026-1088',
    customerName: 'Ananya Deshmukh',
    phone: '+91 97652 11094',
    address: 'B-12, Green Glen Layout, Bellandur',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    packSelected: '3 Jars (Best Value)',
    quantity: 1,
    totalAmount: 999,
    paymentStatus: 'Paid',
    paymentMethod: 'PhonePe (UPI)',
    orderStatus: 'Shipped',
    createdAt: '2026-09-13T16:45:00.000Z',
    notes: 'Deliver to apartment reception if locked.',
    trackingNumber: 'DELHIVERY-54812003'
  },
  {
    id: 'NC-2026-1087',
    customerName: 'Rajesh Verma',
    phone: '+91 99104 78231',
    address: 'House No. 142, Sector 21-C, Near Community Centre',
    city: 'Chandigarh',
    state: 'Punjab',
    pincode: '160022',
    packSelected: '1 Jar (Trial Pack)',
    quantity: 2,
    totalAmount: 798,
    paymentStatus: 'Paid',
    paymentMethod: 'Paytm (UPI)',
    orderStatus: 'Delivered',
    createdAt: '2026-09-12T11:20:00.000Z',
    notes: 'Verified original packaging required.',
    trackingNumber: 'BLUEDART-772109'
  },
  {
    id: 'NC-2026-1086',
    customerName: 'Sanjana Patel',
    phone: '+91 98980 34129',
    address: 'Plot 55, Shantiniketan Society, Satellite Road',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    packSelected: '1 Jar (Trial Pack)',
    quantity: 1,
    totalAmount: 399,
    paymentStatus: 'Pending',
    paymentMethod: 'UPI (QR Code pending confirmation)',
    orderStatus: 'New',
    createdAt: '2026-09-14T10:15:00.000Z',
    notes: 'Customer ordered via WhatsApp inquiry.'
  },
  {
    id: 'NC-2026-1085',
    customerName: 'Meera Nambiar',
    phone: '+91 94471 28930',
    address: 'TC 14/820, Panampilly Nagar, Near Central Park',
    city: 'Kochi',
    state: 'Kerala',
    pincode: '682036',
    packSelected: '2 Jars (Most Popular)',
    quantity: 1,
    totalAmount: 699,
    paymentStatus: 'Paid',
    paymentMethod: 'Google Pay (UPI)',
    orderStatus: 'Delivered',
    createdAt: '2026-09-10T14:10:00.000Z',
    notes: 'Order delivered safely. Customer gave 5-star review.',
    trackingNumber: 'INDIA-POST-90241'
  },
  {
    id: 'NC-2026-1084',
    customerName: 'Kavita Rao',
    phone: '+91 98480 67123',
    address: 'Flat 301, Sri Krishna Heights, Madhapur',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    packSelected: '3 Jars (Best Value)',
    quantity: 2,
    totalAmount: 1998,
    paymentStatus: 'Paid',
    paymentMethod: 'PhonePe (UPI)',
    orderStatus: 'Shipped',
    createdAt: '2026-09-13T19:00:00.000Z',
    notes: 'Repeat buyer, gift wrap if possible.',
    trackingNumber: 'EKART-449102'
  }
];

interface DatabaseSchema {
  version: number;
  product: ProductConfig;
  orders: Order[];
}

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readDatabase(): DatabaseSchema {
  ensureDataDir();
  if (!fs.existsSync(STORE_FILE)) {
    const initial: DatabaseSchema = {
      version: 1,
      product: DEFAULT_PRODUCT_CONFIG,
      orders: INITIAL_ORDERS
    };
    writeDatabase(initial);
    return initial;
  }

  try {
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      version: parsed.version || 1,
      product: { ...DEFAULT_PRODUCT_CONFIG, ...(parsed.product || {}) },
      orders: Array.isArray(parsed.orders) ? parsed.orders : INITIAL_ORDERS
    };
  } catch (err) {
    console.error('Failed to read database store, resetting to defaults', err);
    const fallback: DatabaseSchema = {
      version: 1,
      product: DEFAULT_PRODUCT_CONFIG,
      orders: INITIAL_ORDERS
    };
    writeDatabase(fallback);
    return fallback;
  }
}

function writeDatabase(data: DatabaseSchema): void {
  ensureDataDir();
  const tempFile = `${STORE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).slice(2, 6)}`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, STORE_FILE);
}

// ---------------- Product Operations ----------------
export function getProduct(): ProductConfig {
  const db = readDatabase();
  return db.product;
}

export function updateProduct(updates: Partial<ProductConfig>): ProductConfig {
  const db = readDatabase();
  const current = db.product;

  const mrp = updates.mrp !== undefined ? Number(updates.mrp) : current.mrp;
  const price = updates.price !== undefined ? Number(updates.price) : current.price;
  const savings = mrp > price ? mrp - price : 0;
  const discountPercent = updates.discountPercent !== undefined
    ? Number(updates.discountPercent)
    : mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : current.discountPercent;

  // Single source of truth for MRP:
  // Ensure all packs automatically derive their MRP directly from the product MRP
  const rawPacks = updates.packs ? updates.packs : (current.packs || []);
  const syncedPacks = rawPacks.map(pack => {
    const qty = pack.quantity || 1;
    const packMrp = mrp * qty;
    const packPrice = Number(pack.price);
    const packSavings = Math.max(0, packMrp - packPrice);
    const packDiscount = packMrp > 0 ? Math.round(((packMrp - packPrice) / packMrp) * 100) : 0;
    return {
      ...pack,
      mrp: packMrp,
      savings: packSavings,
      discountPercent: packDiscount
    };
  });

  const updatedProduct: ProductConfig = {
    ...current,
    ...updates,
    mrp,
    price,
    savings,
    discountPercent,
    packs: syncedPacks,
    updatedAt: new Date().toISOString()
  };

  db.product = updatedProduct;
  writeDatabase(db);
  return updatedProduct;
}

export function resetProduct(): ProductConfig {
  const db = readDatabase();
  db.product = {
    ...DEFAULT_PRODUCT_CONFIG,
    updatedAt: new Date().toISOString()
  };
  writeDatabase(db);
  return db.product;
}

// ---------------- Orders Operations ----------------
export function getOrders(): Order[] {
  const db = readDatabase();
  return db.orders;
}

export function addOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Order {
  const db = readDatabase();
  const newOrder: Order = {
    ...orderData,
    id: `NC-2026-${Math.floor(1090 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString()
  };
  db.orders = [newOrder, ...db.orders];
  writeDatabase(db);
  return newOrder;
}

export function updateOrder(orderId: string, patch: Partial<Order>): Order | null {
  const db = readDatabase();
  const index = db.orders.findIndex(o => o.id === orderId);
  if (index === -1) return null;

  db.orders[index] = {
    ...db.orders[index],
    ...patch
  };
  writeDatabase(db);
  return db.orders[index];
}

export function deleteOrder(orderId: string): boolean {
  const db = readDatabase();
  const prevCount = db.orders.length;
  db.orders = db.orders.filter(o => o.id !== orderId);
  if (db.orders.length !== prevCount) {
    writeDatabase(db);
    return true;
  }
  return false;
}

export function resetOrders(): Order[] {
  const db = readDatabase();
  db.orders = INITIAL_ORDERS;
  writeDatabase(db);
  return db.orders;
}
