import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useReservations, type Reservation } from '@/contexts/ReservationsContext';
import { COLORS } from '@/constants/Colors';

export default function MyReservations() {
  const { 
    getUpcomingReservations, 
    getPastReservations, 
    cancelReservation,
    updateReservationStatus 
  } = useReservations();
  
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const upcomingReservations = getUpcomingReservations();
  const pastReservations = getPastReservations();

  const handleCancelReservation = (reservation: Reservation) => {
    Alert.alert(
      'Cancelar Reserva',
      `¿Estás seguro de que quieres cancelar tu reserva en ${reservation.restaurantName}?`,
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Sí, cancelar', 
          style: 'destructive',
          onPress: () => {
            cancelReservation(reservation.id);
            Alert.alert('Reserva Cancelada', 'Tu reserva ha sido cancelada exitosamente.');
          }
        }
      ]
    );
  };

  const handleMarkAsCompleted = (reservation: Reservation) => {
    updateReservationStatus(reservation.id, 'completed');
    Alert.alert('Reserva Completada', 'La reserva ha sido marcada como completada.');
  };

  const formatDate = (dateString: string, time: string) => {
    const date = new Date(dateString + ' ' + time);
    return {
      date: date.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      }),
      time: time,
      isToday: date.toDateString() === new Date().toDateString(),
      isTomorrow: date.toDateString() === new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()
    };
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed': return COLORS.success;
      case 'completed': return COLORS.info;
      case 'cancelled': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusText = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return 'Desconocido';
    }
  };

  const renderReservationCard = (reservation: Reservation, isPast: boolean = false) => {
    const { date, time, isToday, isTomorrow } = formatDate(reservation.date, reservation.time);
    
    return (
      <View key={reservation.id} style={styles.reservationCard}>
        <View style={styles.cardHeader}>
          <Image source={reservation.restaurantImage} style={styles.restaurantImage} />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{reservation.restaurantName}</Text>
            <Text style={styles.restaurantAddress}>{reservation.restaurantAddress}</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(reservation.status) }]} />
              <Text style={[styles.statusText, { color: getStatusColor(reservation.status) }]}>
                {getStatusText(reservation.status)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.reservationDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>
              {isToday ? 'Hoy' : isTomorrow ? 'Mañana' : date}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="time" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{time}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="restaurant" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>Mesa {reservation.tableId} ({reservation.tableCapacity} personas)</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="person" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{reservation.customerName}</Text>
          </View>
          
          {reservation.notes && (
            <View style={styles.detailRow}>
              <Ionicons name="chatbubble" size={16} color={COLORS.textSecondary} />
              <Text style={styles.detailText}>{reservation.notes}</Text>
            </View>
          )}
        </View>

        {!isPast && reservation.status === 'confirmed' && (
          <View style={styles.cardActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleMarkAsCompleted(reservation)}
            >
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.actionText, { color: COLORS.success }]}>Marcar como completada</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleCancelReservation(reservation)}
            >
              <Ionicons name="close-circle" size={16} color={COLORS.error} />
              <Text style={[styles.actionText, { color: COLORS.error }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Reservas</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Próximas ({upcomingReservations.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Historial ({pastReservations.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'upcoming' ? (
          upcomingReservations.length > 0 ? (
            upcomingReservations.map(reservation => renderReservationCard(reservation))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={64} color={COLORS.textSecondary} />
              <Text style={styles.emptyTitle}>No tienes reservas próximas</Text>
              <Text style={styles.emptyDescription}>
                Haz una reserva en cualquier restaurante para verla aquí
              </Text>
              <TouchableOpacity 
                style={styles.browseButton}
                onPress={() => router.push('/home')}
              >
                <Text style={styles.browseButtonText}>Explorar Restaurantes</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          pastReservations.length > 0 ? (
            pastReservations.map(reservation => renderReservationCard(reservation, true))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="time-outline" size={64} color={COLORS.textSecondary} />
              <Text style={styles.emptyTitle}>No hay reservas pasadas</Text>
              <Text style={styles.emptyDescription}>
                Tus reservas completadas aparecerán aquí
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.text,
    marginLeft: 16,
  },
  headerSpacer: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.PRIMARY_COLOR,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  reservationCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  restaurantAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  reservationDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.borderLight,
  },
  cancelButton: {
    backgroundColor: COLORS.borderLight,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.white,
  },
}); 