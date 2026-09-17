import { createContext, useContext, useState, useEffect, useCallback, ReactNode, createElement } from 'react';
import { ProductConfig, PackOption, ProductImage, ProductBenefit, UsageStep } from '../types';

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

const CLIENT_CACHE_KEY = 'natural_cream_product_cache_v1';

function getCachedProduct(): ProductConfig {
  if (typeof window === 'undefined') return DEFAULT_PRODUCT_CONFIG;
  try {
    const raw = localStorage.getItem(CLIENT_CACHE_KEY);
    if (raw) {
      return { ...DEFAULT_PRODUCT_CONFIG, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Could not read product cache', err);
  }
  return DEFAULT_PRODUCT_CONFIG;
}

function setCachedProduct(product: ProductConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CLIENT_CACHE_KEY, JSON.stringify(product));
  } catch (err) {
    console.warn('Could not write product cache', err);
  }
}

interface ProductContextType {
  product: ProductConfig;
  isLoading: boolean;
  error: string | null;
  refreshProduct: () => Promise<ProductConfig>;
  saveProduct: (updates: Partial<ProductConfig>) => Promise<ProductConfig>;
  resetProduct: () => Promise<ProductConfig>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<ProductConfig>(() => getCachedProduct());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFromServer = useCallback(async (): Promise<ProductConfig> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/product');
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const data: ProductConfig = await res.json();
      setProduct(data);
      setCachedProduct(data);
      return data;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch product';
      setError(msg);
      // Fallback to cache or defaults
      return getCachedProduct();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveProduct = useCallback(async (updates: Partial<ProductConfig>): Promise<ProductConfig> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/product', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) {
        throw new Error(`Server failed to save product: ${res.status}`);
      }
      const saved: ProductConfig = await res.json();
      setProduct(saved);
      setCachedProduct(saved);

      // Broadcast update to other tabs/windows
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        try {
          const bc = new BroadcastChannel('natural_cream_product_sync');
          bc.postMessage({ type: 'PRODUCT_UPDATED', product: saved });
          bc.close();
        } catch {
          // ignore
        }
      }
      window.dispatchEvent(new CustomEvent('natural_cream_product_updated', { detail: saved }));

      return saved;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetProduct = useCallback(async (): Promise<ProductConfig> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/product/reset', { method: 'POST' });
      if (!res.ok) {
        throw new Error(`Server failed to reset: ${res.status}`);
      }
      const reset: ProductConfig = await res.json();
      setProduct(reset);
      setCachedProduct(reset);
      window.dispatchEvent(new CustomEvent('natural_cream_product_updated', { detail: reset }));
      return reset;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Reset failed';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch initial product from server
    fetchFromServer();

    // Listen for broadcast sync across tabs
    const handleCustomUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ProductConfig>;
      if (customEvent.detail) {
        setProduct(customEvent.detail);
      }
    };

    window.addEventListener('natural_cream_product_updated', handleCustomUpdate);

    let bc: BroadcastChannel | null = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        bc = new BroadcastChannel('natural_cream_product_sync');
        bc.onmessage = (event) => {
          if (event.data?.type === 'PRODUCT_UPDATED' && event.data.product) {
            setProduct(event.data.product);
            setCachedProduct(event.data.product);
          }
        };
      } catch {
        // BroadcastChannel not available
      }
    }

    return () => {
      window.removeEventListener('natural_cream_product_updated', handleCustomUpdate);
      if (bc) bc.close();
    };
  }, [fetchFromServer]);

  return createElement(
    ProductContext.Provider,
    {
      value: {
        product,
        isLoading,
        error,
        refreshProduct: fetchFromServer,
        saveProduct,
        resetProduct
      }
    },
    children
  );
}

export function useProduct(): ProductContextType {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    // If used outside provider, return default fallback
    return {
      product: DEFAULT_PRODUCT_CONFIG,
      isLoading: false,
      error: null,
      refreshProduct: async () => DEFAULT_PRODUCT_CONFIG,
      saveProduct: async () => DEFAULT_PRODUCT_CONFIG,
      resetProduct: async () => DEFAULT_PRODUCT_CONFIG
    };
  }
  return ctx;
}
