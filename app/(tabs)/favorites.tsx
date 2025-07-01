import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Heart, Star, MapPin, Clock, Trash2 } from 'lucide-react-native';
import { useFavorites } from '@/contexts/FavoritesContext';
import { getAllRestaurants, Restaurant } from '@/data/restaurants';
import { COLORS } from '@/constants/Colors';

export default function FavoritesScreen() {
  const { favoriteRestaurants, removeFromFavorites, clearFavorites } = useFavorites();
  const allRestaurants = getAllRestaurants();
  
  // Filtrar restaurantes favoritos
  const favoriteRestaurantsData = allRestaurants.filter(restaurant => 
    favoriteRestaurants.includes(restaurant.id)
  );

  const handleRestaurantPress = (restaurant: Restaurant) => {
    router.push(`/restaurant/${restaurant.id}` as any);
  };

  const handleRemoveFavorite = (restaurantId: string, restaurantName: string) => {
    Alert.alert(
      'Eliminar de favoritos',
      `¿Estás seguro de que quieres eliminar "${restaurantName}" de tus favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => removeFromFavorites(restaurantId)
        },
      ]
    );
  };

  const handleClearAllFavorites = () => {
    Alert.alert(
      'Eliminar todos los favoritos',
      '¿Estás seguro de que quieres eliminar todos los restaurantes de tus favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar todos', 
          style: 'destructive',
          onPress: clearFavorites
        },
      ]
    );
  };

  const renderFavoriteRestaurant = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity 
      style={styles.restaurantCard}
      onPress={() => handleRestaurantPress(item)}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.restaurantImage} />
      
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{item.title}</Text>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => handleRemoveFavorite(item.id, item.title)}
          >
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.restaurantCategory}>{item.category}</Text>
        
        <View style={styles.restaurantDetails}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFB830" fill="#FFB830" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          
          <View style={styles.distanceContainer}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.distanceText}>{item.distance}</Text>
          </View>
          
          <View style={styles.statusContainer}>
            <Clock size={14} color={item.isOpen ? "#10B981" : "#EF4444"} />
            <Text style={[styles.statusText, { color: item.isOpen ? "#10B981" : "#EF4444" }]}>
              {item.isOpen ? 'Abierto' : 'Cerrado'}
            </Text>
          </View>
        </View>

        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (favoriteRestaurants.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Heart size={64} color="#D1D5DB" />
          </View>
          <Text style={styles.emptyTitle}>No tienes favoritos</Text>
          <Text style={styles.emptyDescription}>
            Los restaurantes que marques como favoritos aparecerán aquí
          </Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => router.push('/(tabs)/home' as any)}
          >
            <Text style={styles.exploreButtonText}>Explorar restaurantes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Favoritos</Text>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearAllFavorites}
        >
          <Text style={styles.clearButtonText}>Limpiar todo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={favoriteRestaurantsData}
        renderItem={renderFavoriteRestaurant}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FEF2F2',
  },
  clearButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  listContainer: {
    padding: 16,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  restaurantCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: COLORS.PRIMARY_COLOR,
    marginBottom: 8,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: COLORS.background,
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});