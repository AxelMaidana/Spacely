import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/Colors';
import { getPromotionById } from '@/data/promotions';
import { getRestaurantById } from '@/data/restaurants';

export default function PromotionScreen() {
  const { id } = useLocalSearchParams();
  const promotion = getPromotionById(id as string);
  const restaurant = promotion?.restaurantId ? getRestaurantById(promotion.restaurantId) : null;

  if (!promotion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Promoción no encontrada</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleCallRestaurant = () => {
    if (restaurant?.phone) {
      Linking.openURL(`tel:${restaurant.phone}`);
    }
  };

  const handleVisitWebsite = () => {
    if (restaurant?.website) {
      Linking.openURL(`https://${restaurant.website}`);
    }
  };

  const handleViewRestaurant = () => {
    if (restaurant) {
      router.push({ pathname: `/restaurant/${restaurant.id}` } as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Promoción</Text>
          <TouchableOpacity style={styles.shareButton}>
            <MaterialIcons name="share" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Promotion Image */}
        <Image source={promotion.image} style={{ width: '100%', height: 220, borderTopLeftRadius: 16, borderTopRightRadius: 16, marginBottom: 0 }} />
        {/* Discount Badge */}
        <View style={{ position: 'absolute', top: 60, right: 24, backgroundColor: COLORS.PRIMARY_COLOR, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 }}>
          <Text style={{ color: COLORS.background, fontFamily: 'Inter-Bold', fontSize: 16 }}>{promotion.discount}</Text>
        </View>
        {/* Promotion Details */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontFamily: 'Inter-Bold', fontSize: 24, color: COLORS.text, marginBottom: 8 }}>{promotion.title}</Text>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 16, color: COLORS.textSecondary, marginBottom: 16 }}>{promotion.description}</Text>
          {/* Restaurant Info */}
          {restaurant && (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 12, padding: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }} onPress={handleViewRestaurant}>
              <Image source={restaurant.image} style={{ width: 60, height: 60, borderRadius: 8 }} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 16, color: COLORS.text }}>{restaurant.title}</Text>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: COLORS.textSecondary, marginBottom: 4 }}>{restaurant.category}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons name="star" size={16} color="#F59439" />
                  <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, color: COLORS.text, marginLeft: 4, marginRight: 8 }}>{restaurant.rating}</Text>
                  <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: COLORS.textSecondary }}>{restaurant.distance}</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
          {/* Terms and Conditions */}
          <View style={{ backgroundColor: COLORS.background, borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 18, color: COLORS.text, marginBottom: 12 }}>Términos y condiciones</Text>
            {promotion.terms?.map((term, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: COLORS.textSecondary, marginLeft: 8, flex: 1 }}>{term}</Text>
              </View>
            ))}
          </View>
          {/* Validity */}
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 12, padding: 16 }}>
            <MaterialIcons name="schedule" size={20} color={COLORS.textSecondary} />
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: COLORS.textSecondary, marginLeft: 8 }}>
              Válido hasta: {new Date(promotion.validUntil).toLocaleDateString('es-ES')}
            </Text>
          </View>
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
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  promotionImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  discountText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 20,
    lineHeight: 24,
  },
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  restaurantCategory: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 4,
    marginRight: 8,
  },
  distanceText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  termsContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  termText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
  },
  validityText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.PRIMARY_COLOR,
    fontWeight: 'bold',
  },
}); 