import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Service for interacting with AsyncStorage
 */
export const storageService = {
  /**
   * Store a value in AsyncStorage
   * @param key The storage key
   * @param value The value to store
   */
  storeData: async (key: string, value: any): Promise<void> => {
    try {
      const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  },

  /**
   * Get a value from AsyncStorage
   * @param key The storage key
   * @returns The stored value, or null if not found
   */
  getData: async (key: string): Promise<any> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      throw error;
    }
  },

  /**
   * Get a string from AsyncStorage
   * @param key The storage key
   * @returns The stored string, or null if not found
   */
  getString: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error retrieving string:', error);
      throw error;
    }
  },

  /**
   * Remove a value from AsyncStorage
   * @param key The storage key
   */
  removeData: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  },

  /**
   * Clear all data from AsyncStorage
   */
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },

  /**
   * Get all keys from AsyncStorage
   * @returns Array of keys
   */
  getAllKeys: async (): Promise<string[]> => {
    try {
      return Array.from(await AsyncStorage.getAllKeys());
    } catch (error) {
      console.error('Error getting all keys:', error);
      throw error;
    }
  }
};