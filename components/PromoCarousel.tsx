import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { getAllPromotions } from '@/data/promotions';

const { width } = Dimensions.get('window');

export const PromoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const promotions = getAllPromotions();

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  const handlePromoPress = (promotionId: string) => {
    router.push(`/promotion/${promotionId}` as any);
  };

  if (promotions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {promotions.map((promotion, index) => (
          <TouchableOpacity 
            key={promotion.id} 
            activeOpacity={0.9}
            onPress={() => handlePromoPress(promotion.id)}
            style={styles.promoContainer}
          >
            <Image 
              source={promotion.image} 
              style={styles.image} 
              resizeMode="cover"
            />
            <View style={styles.promoOverlay}>
              <View style={styles.promoContent}>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{promotion.discount}</Text>
                </View>
                <Text style={styles.promoTitle}>{promotion.title}</Text>
                <Text style={styles.promoDescription}>{promotion.description}</Text>
                {promotion.restaurantName && (
                  <Text style={styles.restaurantName}>{promotion.restaurantName}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.pagination}>
        {promotions.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot, 
              index === activeIndex && styles.paginationDotActive
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  promoContainer: {
    width: width - 40,
    height: 180,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  promoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  promoContent: {
    padding: 16,
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F59439',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  discountText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  promoDescription: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 4,
    opacity: 0.9,
  },
  restaurantName: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFF',
    width: 16,
  },
});