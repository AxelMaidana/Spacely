import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { usePoints } from '@/contexts/PointsContext';
import { COLORS } from '@/constants/Colors';

export default function PointsScreen() {
  const { totalPoints, transactions, getPointsHistory } = usePoints();
  const pointsHistory = getPointsHistory();

  const handleRedeemPoints = () => {
    Alert.alert(
      'Canjear Puntos',
      'Esta funcionalidad estará disponible próximamente. Podrás canjear tus puntos por descuentos en restaurantes.',
      [{ text: 'Entendido', style: 'default' }]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Puntos</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Puntos Totales */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Ionicons name="star" size={32} color={COLORS.warning} />
            <Text style={styles.pointsTitle}>Puntos Totales</Text>
          </View>
          <Text style={styles.pointsValue}>{totalPoints}</Text>
          <Text style={styles.pointsDescription}>
            Gana 10 puntos por cada persona en tus reservas completadas
          </Text>
        </View>

        {/* Botón de Canjear */}
        <TouchableOpacity 
          style={[styles.redeemButton, totalPoints < 100 && styles.redeemButtonDisabled]}
          onPress={handleRedeemPoints}
          disabled={totalPoints < 100}
        >
          <Ionicons name="gift" size={20} color={COLORS.white} />
          <Text style={styles.redeemButtonText}>
            {totalPoints < 100 ? 'Necesitas 100 puntos para canjear' : 'Canjear Puntos'}
          </Text>
        </TouchableOpacity>

        {/* Información del Sistema */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>¿Cómo ganar puntos?</Text>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={styles.infoText}>10 puntos por cada persona en reservas completadas</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={styles.infoText}>Puntos automáticos al completar tu reserva</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={styles.infoText}>Canjea puntos por descuentos en restaurantes</Text>
          </View>
        </View>

        {/* Historial de Puntos */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Historial de Puntos</Text>
          
          {pointsHistory.length > 0 ? (
            pointsHistory.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionHeader}>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionDescription}>
                      {transaction.description}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {formatDate(transaction.date)}
                    </Text>
                  </View>
                  <View style={styles.transactionAmount}>
                    <Text style={[
                      styles.amountText,
                      transaction.type === 'earned' ? styles.earnedText : styles.redeemedText
                    ]}>
                      {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
                    </Text>
                    <Ionicons 
                      name={transaction.type === 'earned' ? 'add-circle' : 'remove-circle'} 
                      size={16} 
                      color={transaction.type === 'earned' ? COLORS.success : COLORS.error} 
                    />
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="star-outline" size={48} color={COLORS.textSecondary} />
              <Text style={styles.emptyTitle}>No hay transacciones aún</Text>
              <Text style={styles.emptyDescription}>
                Completa reservas para empezar a ganar puntos
              </Text>
            </View>
          )}
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pointsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginLeft: 8,
  },
  pointsValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: COLORS.PRIMARY_COLOR,
    marginBottom: 8,
  },
  pointsDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  redeemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  redeemButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  redeemButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.white,
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 12,
    flex: 1,
  },
  historySection: {
    marginBottom: 20,
  },
  historyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  transactionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  transactionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  transactionAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginRight: 4,
  },
  earnedText: {
    color: COLORS.success,
  },
  redeemedText: {
    color: COLORS.error,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
}); 