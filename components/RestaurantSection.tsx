import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HorizontalCarousel } from './HorizontalCarousel';
import { Restaurant } from '@/data/restaurants';

interface RestaurantSectionProps {
  title: string;
  restaurants: Restaurant[];
  showActionButton?: boolean;
  actionButtonText?: string;
  onActionPress?: (filter?: string) => void;
  maxItems?: number;
  showDiscountOnly?: boolean;
  filterType?: string;
}

export const RestaurantSection: React.FC<RestaurantSectionProps> = ({
  title,
  restaurants,
  showActionButton = true,
  actionButtonText = 'Ver más',
  onActionPress,
  maxItems,
  showDiscountOnly = false,
  filterType,
}) => {
  // Filtrar restaurantes según las configuraciones
  let filteredRestaurants = restaurants;

  // Mostrar solo los que tienen descuento si se especifica
  if (showDiscountOnly) {
    filteredRestaurants = restaurants.filter(restaurant => restaurant.discount);
  }

  // Limitar el número de items si se especifica
  if (maxItems && filteredRestaurants.length > maxItems) {
    filteredRestaurants = filteredRestaurants.slice(0, maxItems);
  }

  // No mostrar la sección si no hay restaurantes
  if (filteredRestaurants.length === 0) {
    return null;
  }

  const handleActionPress = () => {
    if (onActionPress) {
      onActionPress(filterType);
    }
  };

  return (
    <View style={styles.container}>
      <HorizontalCarousel
        title={title}
        items={filteredRestaurants}
        showActionButton={showActionButton}
        actionButtonText={actionButtonText}
        onActionPress={handleActionPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
}); 