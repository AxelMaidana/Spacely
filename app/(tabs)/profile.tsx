import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { useReservations } from '@/contexts/ReservationsContext';
import { usePoints } from '@/contexts/PointsContext';
import { COLORS } from '@/constants/Colors';
import { Camera, LogOut, Building2, User, ChevronRight, Star, MapPin, Edit3, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { getUpcomingReservations, getPastReservations } = useReservations();
  const { totalPoints } = usePoints();
  const router = useRouter();
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);

  // Obtener estadísticas de reservas
  const upcomingReservations = getUpcomingReservations();
  const pastReservations = getPastReservations();
  const totalReservations = upcomingReservations.length + pastReservations.length;

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', style: 'destructive', onPress: logout }
      ]
    );
  };

  const handleAccountSettings = () => {
    router.push('/settings');
  };

  const handleAddBusiness = () => {
    Alert.alert(
      'Añadir Negocio',
      '¿Te gustaría registrar tu negocio en Spacely?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => {
          // Aquí iría la navegación a la pantalla de registro de negocio
          Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
        }}
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidad de edición de perfil próximamente');
  };

  const handleMyReservations = () => {
    router.push('/my-reservations');
  };

  const handlePoints = () => {
    router.push('/points');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(500)}
          style={styles.header}
        >
          <Text style={styles.title}>Mi Perfil</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Edit3 size={20} color={COLORS.PRIMARY_COLOR} />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Profile Section */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(500)}
          style={styles.profileSection}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.[0] || 'U'}</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Camera size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'usuario@ejemplo.com'}</Text>
          
          {isBusinessOwner && (
            <View style={styles.businessBadge}>
              <Building2 size={14} color={COLORS.PRIMARY_COLOR} />
              <Text style={styles.businessBadgeText}>Propietario de Negocio</Text>
            </View>
          )}
        </Animated.View>
        
        {/* Stats Section */}
        <Animated.View 
          entering={FadeInUp.delay(300).duration(500)}
          style={styles.statsContainer}
        >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalReservations}</Text>
            <Text style={styles.statLabel}>Reservas</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Text style={styles.statValue}>{totalPoints}</Text>
            <View style={styles.ratingContainer}>
              <Star size={12} color={COLORS.warning} fill={COLORS.warning} />
              <Text style={styles.statLabel}>Puntos</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{pastReservations.length}</Text>
            <Text style={styles.statLabel}>Completadas</Text>
          </View>
        </Animated.View>
        
        {/* Quick Actions */}
        <Animated.View 
          entering={FadeInUp.delay(400).duration(500)}
          style={styles.quickActionsContainer}
        >
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionItem}
              onPress={handleMyReservations}
            >
              <View style={styles.quickActionIcon}>
                <MapPin size={20} color={COLORS.PRIMARY_COLOR} />
                {upcomingReservations.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{upcomingReservations.length}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.quickActionText}>Mis Reservas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionItem}
              onPress={handlePoints}
            >
              <View style={styles.quickActionIcon}>
                <Star size={20} color={COLORS.PRIMARY_COLOR} />
              </View>
              <Text style={styles.quickActionText}>Puntos</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Business Section */}
        <Animated.View 
          entering={FadeInUp.delay(500).duration(500)}
          style={styles.businessSection}
        >
          <Text style={styles.sectionTitle}>Mi Negocio</Text>
          
          {!isBusinessOwner ? (
            <TouchableOpacity 
              style={styles.addBusinessCard}
              onPress={handleAddBusiness}
            >
              <View style={styles.addBusinessContent}>
                <View style={styles.addBusinessIcon}>
                  <Plus size={24} color={COLORS.PRIMARY_COLOR} />
                </View>
                <View style={styles.addBusinessText}>
                  <Text style={styles.addBusinessTitle}>Añadir Mi Negocio</Text>
                  <Text style={styles.addBusinessDescription}>
                    Registra tu negocio y comienza a recibir reservas
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.businessCard}>
              <View style={styles.businessContent}>
                <View style={styles.businessIcon}>
                  <Building2 size={24} color={COLORS.PRIMARY_COLOR} />
                </View>
                <View style={styles.businessText}>
                  <Text style={styles.businessTitle}>Mi Restaurante</Text>
                  <Text style={styles.businessDescription}>
                    Gestiona tu negocio y reservas
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={COLORS.textSecondary} />
            </View>
          )}
        </Animated.View>
        
        {/* Settings Section */}
        <Animated.View 
          entering={FadeInUp.delay(600).duration(500)}
          style={styles.settingsSection}
        >
          <Text style={styles.sectionTitle}>Configuración</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleAccountSettings}
          >
            <View style={styles.settingIcon}>
              <User size={20} color={COLORS.PRIMARY_COLOR} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Configuración de Cuenta</Text>
              <Text style={styles.settingDescription}>Gestiona tu perfil y preferencias</Text>
            </View>
            <ChevronRight size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
          
        </Animated.View>
        
        {/* Logout Section */}
        <Animated.View 
          entering={FadeInUp.delay(700).duration(500)}
          style={styles.logoutSection}
        >
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
          >
            <LogOut size={20} color={COLORS.error} />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: COLORS.text,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: COLORS.white,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  businessBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  businessBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.PRIMARY_COLOR,
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActionsContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.text,
  },
  businessSection: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  addBusinessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  addBusinessContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addBusinessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addBusinessText: {
    flex: 1,
  },
  addBusinessTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  addBusinessDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  businessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  businessContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  businessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  businessText: {
    flex: 1,
  },
  businessTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  businessDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  settingsSection: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.error,
    marginLeft: 8,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: COLORS.white,
  },
});