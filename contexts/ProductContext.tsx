import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export interface ProductContextType {
  products: any[];
  addProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<any[]>([]);

  const addProduct = useCallback(async (id: string) => {
    const newProducts = [...products, { id }];
    await AsyncStorage.setItem('products', JSON.stringify(newProducts));
    setProducts(newProducts);
  }, [products]);

  useEffect(() => {
    (async () => {
      const products = await AsyncStorage.getItem('products');
      if (products) {
        setProducts(JSON.parse(products));
      }
    })();
  }, []);

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

//export default ProductContext;