import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { useRestaurantFilters } from '@/hooks/useRestaurantFilters';
import { COLORS } from '@/constants/Colors';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CartIcon } from "@/components/ui/CartIcon";
import { Cog } from 'lucide-react-native';
import { navigate } from 'expo-router/build/global-state/routing';
import { CategoryCarousel } from '@/components/CategoryCarousel';
import { PromoCarousel } from '@/components/PromoCarousel';
import { RestaurantSection } from '@/components/RestaurantSection';
import { getFeaturedRestaurant, Restaurant } from '@/data/restaurants';
import { HighlightCard } from '@/components/HighlightCard';

export default function HomeScreen() {
  const { user } = useAuth();
  const { getFilteredRestaurants } = useRestaurantFilters();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');

  const featuredRestaurant = getFeaturedRestaurant();

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleRestaurantPress = (restaurant: Restaurant) => {
    navigate(`/restaurant/${restaurant.id}` as any);
  };

  const handleFeaturedPress = () => {
    if (featuredRestaurant) {
      handleRestaurantPress(featuredRestaurant);
    }
  };

  const handleViewMore = (filterType?: string) => {
    navigate(`/restobars?filter=${filterType || 'all'}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola, {user?.name || 'Gourmet'}</Text>
            <Text style={styles.welcomeBack}>¿Qué vas a comer hoy?</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}
            onPress={() => navigate('/settings')}
          >
            <Cog size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar restaurantes, platos..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => navigate('/search')}
              editable={true}
            />
          </View>
          {/* Ícono del carrito */}
          <CartIcon onPress={() => router.push('/cart')} />
        </Animated.View>

        {/* Promociones */}
        <PromoCarousel />

        {/* Categorías */}
        <CategoryCarousel />

        {/* Secciones de Restaurantes */}
        <RestaurantSection
          title="Con Descuentos"
          restaurants={getFilteredRestaurants.withDiscount()}
          maxItems={4}
          onActionPress={handleViewMore}
          filterType="discount"
        />

        <RestaurantSection
          title="Bodegones"
          restaurants={getFilteredRestaurants.bodegones()}
          maxItems={4}
          onActionPress={handleViewMore}
          filterType="bodegones"
        />

        {/* Beneficio exclusivo */}
        <HighlightCard
          image={require('@/assets/images/mapa.jpg')}
          badgeText="Exclusivo"
          title="Mapa interactivo"
          description="Añadimos una vista de mapa interactiva con los restaurantes más cercanos"
        />

        <RestaurantSection
          title="Mejor Calificados"
          restaurants={getFilteredRestaurants.topRated()}
          maxItems={4}
          onActionPress={handleViewMore}
          filterType="topRated"
        />

        <RestaurantSection
          title="Con Delivery"
          restaurants={getFilteredRestaurants.withDelivery()}
          maxItems={4}
          onActionPress={handleViewMore}
          filterType="withDelivery"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 6,
    paddingBottom: 62,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: COLORS.text,
    marginBottom: 4,
  },
  welcomeBack: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  settingsButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.text,
  },
});