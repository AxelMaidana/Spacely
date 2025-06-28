import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
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
        <Image source={promotion.image} style={styles.promotionImage} />

        {/* Discount Badge */}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{promotion.discount}</Text>
        </View>

        {/* Promotion Details */}
        <View style={styles.content}>
          <Text style={styles.title}>{promotion.title}</Text>
          <Text style={styles.description}>{promotion.description}</Text>

          {/* Restaurant Info */}
          {restaurant && (
            <TouchableOpacity style={styles.restaurantCard} onPress={handleViewRestaurant}>
              <Image source={restaurant.image} style={styles.restaurantImage} />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.title}</Text>
                <Text style={styles.restaurantCategory}>{restaurant.category}</Text>
                <View style={styles.ratingContainer}>
                  <MaterialIcons name="star" size={16} color="#F59439" />
                  <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  <Text style={styles.distanceText}>{restaurant.distance}</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsTitle}>Términos y condiciones</Text>
            {promotion.terms?.map((term, index) => (
              <View key={index} style={styles.termItem}>
                <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.termText}>{term}</Text>
              </View>
            ))}
          </View>

          {/* Validity */}
          <View style={styles.validityContainer}>
            <MaterialIcons name="schedule" size={20} color={COLORS.textSecondary} />
            <Text style={styles.validityText}>
              Válido hasta: {new Date(promotion.validUntil).toLocaleDateString('es-ES')}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {restaurant && (
          <>
            <TouchableOpacity style={styles.callButton} onPress={handleCallRestaurant}>
              <Ionicons name="call" size={20} color="#FFF" />
              <Text style={styles.callButtonText}>Llamar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.websiteButton} onPress={handleVisitWebsite}>
              <MaterialIcons name="language" size={20} color="#FFF" />
              <Text style={styles.websiteButtonText}>Sitio Web</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.orderButton}>
          <MaterialIcons name="shopping-cart" size={20} color="#FFF" />
          <Text style={styles.orderButtonText}>Hacer Pedido</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#F59439',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  discountText: {
    color: '#FFF',
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
    backgroundColor: '#FFF',
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
    backgroundColor: '#FFF',
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
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  validityText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
  },
  callButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  websiteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
  },
  websiteButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  orderButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59439',
    borderRadius: 8,
    paddingVertical: 12,
  },
  orderButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
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
    color: '#F59439',
    fontWeight: 'bold',
  },
}); 