import { createContext, useContext, useState, ReactNode } from 'react';
import { ProductConfig } from '../types';
import { DEFAULT_PRODUCT_CONFIG } from './productData';

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
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const refreshProduct = async (): Promise<ProductConfig> => {
    setProduct(DEFAULT_PRODUCT_CONFIG);
    return DEFAULT_PRODUCT_CONFIG;
  };

  const saveProduct = async (
    updates: Partial<ProductConfig>
  ): Promise<ProductConfig> => {
    const updated = {
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

  return (
    <ProductContext.Provider
      value={{
        product,
        isLoading,
        error,
        refreshProduct,
        saveProduct,
        resetProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
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
      saveProduct: async (updates) => ({
        ...DEFAULT_PRODUCT_CONFIG,
        ...updates,
      }),
      resetProduct: async () => DEFAULT_PRODUCT_CONFIG,
    };
  }

  return ctx;
}
