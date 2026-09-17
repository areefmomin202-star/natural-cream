import { createContext, useContext, useState, ReactNode, createElement } from 'react';
import { ProductConfig } from '../types';

export const DEFAULT_PRODUCT_CONFIG: ProductConfig = {
  name: 'NATURAL CREAM',
  subtitle: 'Wake up to Gorgeous Skin',
  tagline: '“Wake up to Gorgeous Skin”',
  description:
    'Original Jar Packaging. Formulated for nocturnal cellular rejuvenation so you wake up to deeply replenished, luminous skin.',
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
      alt: 'NATURAL CREAM - Wake up to Gorgeous Skin (glossy black jar with silver glitter lid)',
    },
    {
      id: 'back',
      title: 'Directions of Use',
      subtitle:
        'To be used before going to sleep only, wash and dry the skin properly then apply',
      src: '/img_jar_instructions.jpg',
      badge: 'Back Label',
      alt: 'NATURAL CREAM back label: Use: To be used before going to sleep only, wash and dry the skin properly then apply',
    },
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
      badge: 'Offer Price',
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
      badge: 'Most Popular',
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
      badge: 'Best Value',
    },
  ],

  usageNotice:
    'To be used before going to sleep only, wash and dry the skin properly then apply',

  usageSteps: [
    {
      step: '01',
      title: 'Wash & Dry Skin',
      description:
        'Wash face thoroughly with clean water or a gentle cleanser to remove daily dirt and oils, then gently pat completely dry.',
    },
    {
      step: '02',
      title: 'Apply Before Sleep Only',
      description:
        'As printed on our official label, use strictly before going to bed. Take a small, pea-sized amount onto clean fingertips.',
    },
    {
      step: '03',
      title: 'Gentle Upward Massage',
      description:
        'Dot across your cheeks, forehead, chin, and neck. Smooth gently in upward circular motions until absorbed.',
    },
    {
      step: '04',
      title: 'Wake up to Gorgeous Skin',
      description:
        'Allow the restorative formulation to nourish your skin throughout the night. Rinse lightly with water in the morning.',
    },
  ],

  nightCareNoteTitle: 'Why use strictly before sleep?',
  nightCareNote:
    'At night, skin cellular turnover increases by up to 3x while blood micro-circulation peaks. Natural Cream is engineered to deliver uninterrupted active hydration without sunscreen filters or environmental stressors.',

  benefits: [
    {
      id: 'glow',
      title: 'Overnight Radiance',
      description:
        'Designed specifically for nocturnal cellular rejuvenation so you wake up to deeply replenished, luminous skin.',
    },
    {
      id: 'hydration',
      title: 'Intense Moisture Lock',
      description:
        'Binds moisture to the deepest epidermal layers without leaving a greasy or heavy residue on your pillow.',
    },
    {
      id: 'barrier',
      title: 'Skin Barrier Repair',
      description:
        'Strengthens fragile skin barriers exposed to daytime pollution, UV fatigue, and climate stress.',
    },
    {
      id: 'texture',
      title: 'Silky Smooth Texture',
      description:
        'Gently softens roughness, fine lines, and uneven dry patches for an exceptionally soft touch.',
    },
  ],

  updatedAt: new Date().toISOString(),
};

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
  const [product, setProduct] =
    useState<ProductConfig>(DEFAULT_PRODUCT_CONFIG);

  const refreshProduct = async (): Promise<ProductConfig> => {
    setProduct(DEFAULT_PRODUCT_CONFIG);
    return DEFAULT_PRODUCT_CONFIG;
  };

  const saveProduct = async (
    updates: Partial<ProductConfig>
  ): Promise<ProductConfig> => {
    const updated: ProductConfig = {
      ...product,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    setProduct(updated);
    return updated;
  };

  const resetProduct = async (): Promise<ProductConfig> => {
    setProduct(DEFAULT_PRODUCT_CONFIG);
    return DEFAULT_PRODUCT_CONFIG;
  };

  return createElement(
    ProductContext.Provider,
    {
      value: {
        product,
        isLoading: false,
        error: null,
        refreshProduct,
        saveProduct,
        resetProduct,
      },
    },
    children
  );
}

export function useProduct(): ProductContextType {
  const ctx = useContext(ProductContext);

  if (!ctx) {
    return {
      product: DEFAULT_PRODUCT_CONFIG,
      isLoading: false,
      error: null,

      refreshProduct: async () => DEFAULT_PRODUCT_CONFIG,

      saveProduct: async (updates: Partial<ProductConfig>) => ({
        ...DEFAULT_PRODUCT_CONFIG,
        ...updates,
        updatedAt: new Date().toISOString(),
      }),

      resetProduct: async () => DEFAULT_PRODUCT_CONFIG,
    };
  }

  return ctx;
         }
