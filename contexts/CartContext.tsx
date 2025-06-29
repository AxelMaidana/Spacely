import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalCount: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  totalCount: 0,
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("cart");
        if (stored) {
          setCartItems(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Error loading cart from storage", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to storage", error);
      }
    })();
  }, [cartItems]);

  const addItem = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        // ✔️ Si ya existe, sumarle la cantidad del nuevo item
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0) // ✔️ Eliminar si la cantidad es 0
    );
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity, totalCount, clearCart, }}>
      {children}
    </CartContext.Provider>
  );
};
