import { createContext, useContext, useState, ReactNode, createElement } from 'react';
import { ProductConfig } from '../types';
import { DEFAULT_PRODUCT_CONFIG } from './productData';
export { DEFAULT_PRODUCT_CONFIG } from './productData';
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
  const [product, setProduct] = useState<ProductConfig>(DEFAULT_PRODUCT_CONFIG);

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
