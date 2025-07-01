import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Restaurant } from '@/data/restaurants';
import DiscountSVG from '@/assets/icons/discount.svg';
import { COLORS } from '@/constants/Colors';

interface CarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  address?: string;
  discount?: string;
  distance?: string;
  image?: any; // Para imágenes locales
  imageUrl?: string; // Para imágenes remotas
  extraInfo?: string;
  onPress?: () => void;
}

interface HorizontalCarouselProps {
  title: string;
  items: Restaurant[] | CarouselItem[];
  showActionButton?: boolean;
  actionButtonText?: string;
  onActionPress?: () => void;
}

// Type guard para verificar si es un restaurante
const isRestaurant = (item: Restaurant | CarouselItem): item is Restaurant => {
  return 'category' in item;
};

// Type guard para verificar si es un CarouselItem
const isCarouselItem = (item: Restaurant | CarouselItem): item is CarouselItem => {
  return !('category' in item);
};

export const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  title,
  items,
  showActionButton = true,
  actionButtonText = 'Ver más',
  onActionPress,
}) => {
  const handleItemPress = (item: Restaurant | CarouselItem) => {
    if (isRestaurant(item)) {
      // Es un restaurante
      router.push(`/restaurant/${item.id}` as any);
    } else if (item.onPress) {
      // Es un item personalizado con onPress
      item.onPress();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showActionButton && (
          <TouchableOpacity onPress={onActionPress}>
            <Text style={styles.actionText}>{actionButtonText}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card}
            onPress={() => handleItemPress(item)}
            activeOpacity={0.8}
          >

            {(item.image || (isCarouselItem(item) && item.imageUrl)) && (
              <Image
              source={item.image ? item.image : { uri: isCarouselItem(item) ? item.imageUrl : '' }}
              style={styles.cardImage}
              resizeMode="cover"
              />
            )}

              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              </View>
  
              {item.address && (
                <Text style={styles.cardAddress} numberOfLines={1}>
                  {item.address}
                </Text>
              )}
            <View style={styles.cardFooter}>
              {item.discount && (
                <View style={styles.discountBadge}>
                  <DiscountSVG width={16} height={16} color="#FFF" style={styles.discountIcon} />
                  <Text style={styles.discountText}>{item.discount}</Text>
                </View>
              )}

              {item.distance && (
                <Text style={styles.distanceText}>{item.distance}</Text>
              )}

              {isCarouselItem(item) && item.extraInfo && (
                <Text style={styles.extraInfo}>{item.extraInfo}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionText: {
    fontSize: 14,
    color: COLORS.PRIMARY_COLOR,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  card: {
    width: 220,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  cardAddress: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: COLORS.borderLight,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  discountBadge: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 25,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountIcon: {
    marginRight: 4,
  },
  discountText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
  },
  extraInfo: {
    fontSize: 12,
    color: COLORS.PRIMARY_COLOR,
    fontWeight: '500',
  },
});