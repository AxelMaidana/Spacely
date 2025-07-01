import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type PointsTransaction = {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  description: string;
  date: string;
  reservationId?: string;
};

type PointsContextType = {
  totalPoints: number;
  transactions: PointsTransaction[];
  addPoints: (amount: number, description: string, reservationId?: string) => void;
  redeemPoints: (amount: number, description: string) => boolean;
  getPointsHistory: () => PointsTransaction[];
  clearAllPoints: () => void;
};

const PointsContext = createContext<PointsContextType>({
  totalPoints: 0,
  transactions: [],
  addPoints: () => {},
  redeemPoints: () => false,
  getPointsHistory: () => [],
  clearAllPoints: () => {},
});

export const usePoints = () => useContext(PointsContext);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const storedPoints = await AsyncStorage.getItem("userPoints");
        const storedTransactions = await AsyncStorage.getItem("pointsTransactions");
        
        if (storedPoints) {
          setTotalPoints(JSON.parse(storedPoints));
        }
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.error("Error loading points from storage", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("userPoints", JSON.stringify(totalPoints));
        await AsyncStorage.setItem("pointsTransactions", JSON.stringify(transactions));
      } catch (error) {
        console.error("Error saving points to storage", error);
      }
    })();
  }, [totalPoints, transactions]);

  const addPoints = (amount: number, description: string, reservationId?: string) => {
    const newTransaction: PointsTransaction = {
      id: Date.now().toString(),
      type: 'earned',
      amount,
      description,
      date: new Date().toISOString(),
      reservationId
    };

    setTotalPoints(prev => prev + amount);
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const redeemPoints = (amount: number, description: string): boolean => {
    if (totalPoints < amount) {
      return false; // No hay suficientes puntos
    }

    const newTransaction: PointsTransaction = {
      id: Date.now().toString(),
      type: 'redeemed',
      amount: -amount,
      description,
      date: new Date().toISOString(),
    };

    setTotalPoints(prev => prev - amount);
    setTransactions(prev => [newTransaction, ...prev]);
    return true;
  };

  const getPointsHistory = () => {
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const clearAllPoints = () => {
    setTotalPoints(0);
    setTransactions([]);
  };

  return (
    <PointsContext.Provider value={{ 
      totalPoints,
      transactions,
      addPoints,
      redeemPoints,
      getPointsHistory,
      clearAllPoints
    }}>
      {children}
    </PointsContext.Provider>
  );
}; 