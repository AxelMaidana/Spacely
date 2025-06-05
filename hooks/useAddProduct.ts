import { useContext } from 'react';
import { ProductContext } from '@/contexts/ProductContext';

export function useAddProduct( product: any) {
  const context = useContext(ProductContext);
  const amount = context.products.length;
    
  if (context === undefined) {
    throw new Error('useAddProduct must be used within a ProductProvider');
  }
  
  return amount;
}