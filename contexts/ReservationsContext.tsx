import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePoints } from "./PointsContext";

export type Reservation = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantImage: any;
  date: string;
  time: string;
  tableId: number;
  tableCapacity: number;
  customerName: string;
  customerPhone: string;
  notes?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
};

type ReservationsContextType = {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  cancelReservation: (id: string) => void;
  getReservationsByStatus: (status: Reservation['status']) => Reservation[];
  getUpcomingReservations: () => Reservation[];
  getPastReservations: () => Reservation[];
  clearAllReservations: () => void;
  autoCompletePastReservations: () => void;
};

const ReservationsContext = createContext<ReservationsContextType>({
  reservations: [],
  addReservation: () => {},
  updateReservationStatus: () => {},
  cancelReservation: () => {},
  getReservationsByStatus: () => [],
  getUpcomingReservations: () => [],
  getPastReservations: () => [],
  clearAllReservations: () => {},
  autoCompletePastReservations: () => {},
});

export const useReservations = () => useContext(ReservationsContext);

export const ReservationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { addPoints } = usePoints();

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("reservations");
        if (stored) {
          const parsedReservations = JSON.parse(stored);
          setReservations(parsedReservations);
          
          // Marcar automáticamente como completadas las reservas pasadas
          autoCompletePastReservations(parsedReservations);
        }
      } catch (error) {
        console.error("Error loading reservations from storage", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("reservations", JSON.stringify(reservations));
      } catch (error) {
        console.error("Error saving reservations to storage", error);
      }
    })();
  }, [reservations]);

  const autoCompletePastReservations = (reservationsToCheck: Reservation[] = reservations) => {
    const now = new Date();
    let hasChanges = false;
    
    const updatedReservations = reservationsToCheck.map(reservation => {
      if (reservation.status === 'confirmed') {
        const reservationDate = new Date(reservation.date + ' ' + reservation.time);
        if (reservationDate < now) {
          hasChanges = true;
          // Agregar puntos por completar la reserva
          const pointsEarned = Math.floor(reservation.tableCapacity * 10); // 10 puntos por persona
          addPoints(pointsEarned, `Reserva completada en ${reservation.restaurantName}`, reservation.id);
          
          return { ...reservation, status: 'completed' as const };
        }
      }
      return reservation;
    });

    if (hasChanges) {
      setReservations(updatedReservations);
    }
  };

  const addReservation = (reservationData: Omit<Reservation, 'id' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setReservations(prev => [newReservation, ...prev]);
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => 
      prev.map(reservation => {
        if (reservation.id === id) {
          // Si se está marcando como completada, agregar puntos
          if (status === 'completed' && reservation.status !== 'completed') {
            const pointsEarned = Math.floor(reservation.tableCapacity * 10); // 10 puntos por persona
            addPoints(pointsEarned, `Reserva completada en ${reservation.restaurantName}`, reservation.id);
          }
          return { ...reservation, status };
        }
        return reservation;
      })
    );
  };

  const cancelReservation = (id: string) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: 'cancelled' as const } 
          : reservation
      )
    );
  };

  const getReservationsByStatus = (status: Reservation['status']) => {
    return reservations.filter(reservation => reservation.status === status);
  };

  const getUpcomingReservations = () => {
    const now = new Date();
    return reservations.filter(reservation => {
      const reservationDate = new Date(reservation.date + ' ' + reservation.time);
      return reservationDate > now && reservation.status === 'confirmed';
    }).sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const getPastReservations = () => {
    const now = new Date();
    return reservations.filter(reservation => {
      const reservationDate = new Date(reservation.date + ' ' + reservation.time);
      return reservationDate < now || reservation.status === 'completed';
    }).sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const clearAllReservations = () => {
    setReservations([]);
  };

  return (
    <ReservationsContext.Provider value={{ 
      reservations,
      addReservation,
      updateReservationStatus,
      cancelReservation,
      getReservationsByStatus,
      getUpcomingReservations,
      getPastReservations,
      clearAllReservations,
      autoCompletePastReservations
    }}>
      {children}
    </ReservationsContext.Provider>
  );
}; 