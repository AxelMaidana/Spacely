import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
};

type RestaurantInfo = {
  id: string;
  name: string;
  address: string;
  image: any;
};

type CartContextType = {
  cartItems: CartItem[];
  restaurantInfo: RestaurantInfo | null;
  addItem: (item: CartItem, restaurant?: RestaurantInfo) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalCount: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  restaurantInfo: null,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  totalCount: 0,
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("cart");
        const storedRestaurant = await AsyncStorage.getItem("cartRestaurant");
        if (stored) {
          setCartItems(JSON.parse(stored));
        }
        if (storedRestaurant) {
          setRestaurantInfo(JSON.parse(storedRestaurant));
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
        await AsyncStorage.setItem("cartRestaurant", JSON.stringify(restaurantInfo));
      } catch (error) {
        console.error("Error saving cart to storage", error);
      }
    })();
  }, [cartItems, restaurantInfo]);

  const addItem = (item: CartItem, restaurant?: RestaurantInfo) => {
    setCartItems((prev) => {
      // Si es el primer item o es del mismo restaurante
      if (prev.length === 0 || (restaurantInfo && restaurant && restaurantInfo.id === restaurant.id)) {
        const existing = prev.find((p) => p.id === item.id);
        if (existing) {
          return prev.map((p) =>
            p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
          );
        }
        return [...prev, item];
      } else {
        // Si es de un restaurante diferente, limpiar el carrito y agregar el nuevo item
        Alert.alert(
          "Restaurante diferente",
          "Tienes productos de otro restaurante en tu carrito. ¿Deseas reemplazarlos?",
          [
            { text: "Cancelar", style: "cancel" },
            { 
              text: "Reemplazar", 
              onPress: () => {
                setCartItems([item]);
                if (restaurant) {
                  setRestaurantInfo(restaurant);
                }
              }
            },
          ]
        );
        return prev;
      }
    });

    // Actualizar información del restaurante si es el primer item
    if (restaurant && (!restaurantInfo || restaurantInfo.id !== restaurant.id)) {
      setRestaurantInfo(restaurant);
    }
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      // Si no quedan items, limpiar también la información del restaurante
      if (newItems.length === 0) {
        setRestaurantInfo(null);
      }
      return newItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) => {
      const newItems = prev
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);
      
      // Si no quedan items, limpiar también la información del restaurante
      if (newItems.length === 0) {
        setRestaurantInfo(null);
      }
      return newItems;
    });
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
    setRestaurantInfo(null);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      restaurantInfo,
      addItem, 
      removeItem, 
      updateQuantity, 
      totalCount, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
