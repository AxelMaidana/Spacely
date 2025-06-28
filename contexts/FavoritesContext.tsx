import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextType {
  favoriteRestaurants: string[];
  addToFavorites: (restaurantId: string) => void;
  removeFromFavorites: (restaurantId: string) => void;
  isFavorite: (restaurantId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<string[]>([]);

  // Cargar favoritos desde AsyncStorage al iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteRestaurants');
      if (storedFavorites) {
        setFavoriteRestaurants(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (favorites: string[]) => {
    try {
      await AsyncStorage.setItem('favoriteRestaurants', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addToFavorites = (restaurantId: string) => {
    const newFavorites = [...favoriteRestaurants, restaurantId];
    setFavoriteRestaurants(newFavorites);
    saveFavorites(newFavorites);
  };

  const removeFromFavorites = (restaurantId: string) => {
    const newFavorites = favoriteRestaurants.filter(id => id !== restaurantId);
    setFavoriteRestaurants(newFavorites);
    saveFavorites(newFavorites);
  };

  const isFavorite = (restaurantId: string) => {
    return favoriteRestaurants.includes(restaurantId);
  };

  const clearFavorites = () => {
    setFavoriteRestaurants([]);
    saveFavorites([]);
  };

  const value: FavoritesContextType = {
    favoriteRestaurants,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}; 