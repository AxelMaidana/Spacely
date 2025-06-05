// C:\Users\Usuario\Desktop\Aaron\Spacely\contexts\AuthContext.tsx
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// AsyncStorage keys
const USER_STORAGE_KEY = '@auth:user';
const TOKEN_STORAGE_KEY = '@auth:token';

// user default
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password123',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const userJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

        if (userJson && token) {
          const parsedUser = JSON.parse(userJson);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Login function - in a real app, this would make an API call
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user in our mock database
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;

      // Save user data and token to AsyncStorage
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, 'mock-jwt-token');

      // Update state
      setUser(userWithoutPassword);

      // Navigate to the main app - CORREGIDO
      router.replace('/(app)/home'); // Se cambió de /(tabs)/(tabs-group)/home a /(app)/home
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register function - in a real app, this would make an API call
  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = MOCK_USERS.find(u => u.email === email);

      if (existingUser) {
        throw new Error('User already exists');
      }

      // Generate a new user ID
      const id = (MOCK_USERS.length + 1).toString();

      // Create new user
      const newUser = { id, name, email, password };

      // Add to mock database (in real app, this would be a POST request)
      MOCK_USERS.push(newUser);

      // Create user object without password
      const { password: _, ...userWithoutPassword } = newUser;

      // Save user data and token to AsyncStorage
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, 'mock-jwt-token');

      // Update state
      setUser(userWithoutPassword);

      // Navigate to the main app - CORREGIDO
      router.replace('/(app)/home'); // Se cambió de /(tabs)/(tabs-group)/home a /(app)/home
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Clear auth data from AsyncStorage
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);

      // Update state
      setUser(null);

      // Navigate to the login screen
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  // Value object for the context provider
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};