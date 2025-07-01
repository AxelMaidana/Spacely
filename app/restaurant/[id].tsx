import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Linking, FlatList, Dimensions, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { ArrowLeft, Heart, Share, Star, MapPin, Clock, Phone, Wifi, Car, Accessibility, TreePine, ThumbsUp } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { getRestaurantById, MenuItem } from '@/data/restaurants';
import { getAllPromotions } from '@/data/promotions';
import { getReviewsByRestaurantId, Review } from '@/data/reviews';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const restaurant = getRestaurantById(id as string);
  const [selectedTab, setSelectedTab] = useState('menu');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addItem, cartItems } = useCart();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 0,
    comment: '',
  });
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Restaurante no encontrado</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const promotions = getAllPromotions().filter(promo => promo.restaurantId === restaurant.id);
  const reviews = [
    ...getReviewsByRestaurantId(restaurant.id),
    ...localReviews
  ];
  const images = restaurant.images || [restaurant.image];
  const isRestaurantFavorite = isFavorite(restaurant.id);
  const menuItems = restaurant.menu || [];

  useEffect(() => {
    const loadLocalReviews = async () => {
      try {
        const stored = await AsyncStorage.getItem(`reviews_${restaurant.id}`);
        if (stored) {
          setLocalReviews(JSON.parse(stored));
        }
      } catch (e) {
        // Error al leer
      }
    };
    loadLocalReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant.id]);

  const toggleFavorite = () => {
    if (isRestaurantFavorite) {
      removeFromFavorites(restaurant.id);
    } else {
      addToFavorites(restaurant.id);
    }
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    const restaurantInfo = {
      id: restaurant.id,
      name: restaurant.title,
      address: restaurant.address,
      image: restaurant.image
    };
    
    addItem({
      id: menuItem.id,
      name: menuItem.name,
      quantity: 1
    }, restaurantInfo);
    
    Alert.alert('Producto agregado', `${menuItem.name} se agregó al carrito`);
  };

  const handleViewCart = () => {
    if (cartItems.length > 0) {
      router.push('/cart');
    } else {
      Alert.alert('Carrito vacío', 'Agrega productos al carrito antes de continuar');
    }
  };

  const handleCallRestaurant = () => {
    if (restaurant.phone) {
      Linking.openURL(`tel:${restaurant.phone}`);
    }
  };

  const handleVisitWebsite = () => {
    if (restaurant.website) {
      Linking.openURL(`https://${restaurant.website}`);
    }
  };

  const handleViewLocation = () => {
    if (restaurant.location?.coordinates) {
      const { lat, lng } = restaurant.location.coordinates;
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      Linking.openURL(url);
    }
  };

  const handleViewPromotion = (promotionId: string) => {
    router.push(`/promotion/${promotionId}` as any);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return Wifi;
      case 'estacionamiento':
        return Car;
      case 'acceso para silla de ruedas':
        return Accessibility;
      case 'terraza':
        return TreePine;
      default:
        return Star;
    }
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>{item.price}</Text>
      </View>
      <View style={styles.menuItemActions}>
        {item.image && (
          <Image source={item.image} style={styles.menuItemImage} />
        )}
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(item)}
        >
          <MaterialIcons name="add-shopping-cart" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPromotion = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.promotionCard}
      onPress={() => handleViewPromotion(item.id)}
    >
      <Image source={item.image} style={styles.promotionImage} />
      <View style={styles.promotionInfo}>
        <Text style={styles.promotionTitle}>{item.title}</Text>
        <Text style={styles.promotionDescription}>{item.description}</Text>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.userAvatar }} style={styles.reviewAvatar} />
        <View style={styles.reviewInfo}>
          <Text style={styles.reviewerName}>{item.userName}</Text>
          <View style={styles.reviewRating}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                color="#FFB830"
                fill={i < item.rating ? "#FFB830" : "none"}
              />
            ))}
          </View>
        </View>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <View style={styles.reviewActions}>
        <TouchableOpacity style={styles.helpfulButton}>
          <ThumbsUp size={14} color="#6B7280" />
          <Text style={styles.helpfulText}>Útil ({item.helpful})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleAddReview = async () => {
    if (!newReview.userName || !newReview.comment || newReview.rating === 0) {
      Alert.alert('Completa todos los campos y selecciona una calificación.');
      return;
    }
    const newLocalReviews = [
      {
        id: Date.now().toString(),
        restaurantId: restaurant.id,
        userName: newReview.userName,
        userAvatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(newReview.userName),
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString('es-ES'),
        helpful: 0,
      },
      ...localReviews
    ];
    setLocalReviews(newLocalReviews);
    try {
      await AsyncStorage.setItem(`reviews_${restaurant.id}` , JSON.stringify(newLocalReviews));
    } catch (e) {
      // Error al guardar
    }
    setShowReviewModal(false);
    setNewReview({ userName: '', rating: 0, comment: '' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.floor(event.nativeEvent.contentOffset.x / width);
              setSelectedImageIndex(index);
            }}
          >
            {images.map((image, index) => (
              <Image 
                key={index} 
                source={typeof image === 'string' ? { uri: image } : image} 
                style={styles.headerImage} 
              />
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  selectedImageIndex === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>

          {/* Header Actions */}
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color="#1F2937" />
            </TouchableOpacity>
            <View style={styles.headerActionsRight}>
              <TouchableOpacity style={styles.actionButton}>
                <Share size={20} color="#1F2937" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, isRestaurantFavorite && styles.favoriteButton]} 
                onPress={toggleFavorite}
              >
                <Heart 
                  size={20} 
                  color={isRestaurantFavorite ? "#FFFFFF" : "#1F2937"} 
                  fill={isRestaurantFavorite ? "#FFFFFF" : "none"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Restaurant Info */}
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Text style={styles.name}>{restaurant.title}</Text>
              <Text style={styles.category}>{restaurant.category}</Text>
            </View>
            <View style={styles.ratingSection}>
              <View style={styles.rating}>
                <Star size={16} color="#FFB830" fill="#FFB830" />
                <Text style={styles.ratingText}>{restaurant.rating}</Text>
              </View>
              <Text style={styles.reviewCount}>({reviews.length} reseñas)</Text>
            </View>
          </View>

          <Text style={styles.description}>{restaurant.subtitle}</Text>

          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <MapPin size={16} color="#9CA3AF" />
              <Text style={styles.infoText}>{restaurant.address}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={16} color="#9CA3AF" />
              <Text style={styles.infoText}>
                {restaurant.isOpen ? 'Abierto ahora' : 'Cerrado'} • {restaurant.distance}
              </Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton} onPress={handleCallRestaurant}>
              <Phone size={20} color="#4CAF50" />
              <Text style={styles.quickActionText}>Llamar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={handleVisitWebsite}>
              <MaterialIcons name="language" size={20} color="#2196F3" />
              <Text style={styles.quickActionText}>Sitio Web</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={handleViewLocation}>
              <MapPin size={20} color="#F59439" />
              <Text style={styles.quickActionText}>Dirección</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionButton} 
              onPress={() => router.push(`/reservation/${restaurant.id}` as any)}
            >
              <MaterialIcons name="event-available" size={20} color="#9C27B0" />
              <Text style={styles.quickActionText}>Reservar Mesa</Text>
            </TouchableOpacity>
          </View>

          {/* Amenities */}
          {restaurant.amenities && restaurant.amenities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Servicios</Text>
              <View style={styles.amenitiesContainer}>
                {restaurant.amenities.map((amenity, index) => {
                  const IconComponent = getAmenityIcon(amenity);
                  return (
                    <View key={index} style={styles.amenityItem}>
                      <IconComponent size={16} color="#FF6B35" />
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Opening Hours */}
          {restaurant.openingHoursDetailed && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Horarios de Apertura</Text>
              <View style={styles.hoursContainer}>
                {Object.entries(restaurant.openingHoursDetailed).map(([day, hours]) => (
                  <View key={day} style={styles.hourItem}>
                    <Text style={styles.dayText}>{day}</Text>
                    <Text style={styles.hoursText}>{hours}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'menu' && styles.tabActive]}
              onPress={() => setSelectedTab('menu')}
            >
              <Text style={[styles.tabText, selectedTab === 'menu' && styles.tabTextActive]}>
                Menú
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'promotions' && styles.tabActive]}
              onPress={() => setSelectedTab('promotions')}
            >
              <Text style={[styles.tabText, selectedTab === 'promotions' && styles.tabTextActive]}>
                Promociones
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'reviews' && styles.tabActive]}
              onPress={() => setSelectedTab('reviews')}
            >
              <Text style={[styles.tabText, selectedTab === 'reviews' && styles.tabTextActive]}>
                Reseñas
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {selectedTab === 'menu' ? (
            <View style={styles.menuContainer}>
              {menuItems.length > 0 ? (
                <FlatList
                  data={menuItems}
                  renderItem={renderMenuItem}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              ) : (
                <View style={styles.noMenuContainer}>
                  <Text style={styles.noMenuText}>
                    Menú no disponible en este momento
                  </Text>
                  <Text style={styles.noMenuSubtext}>
                    Contacta al restaurante para consultar los platos disponibles
                  </Text>
                </View>
              )}
            </View>
          ) : selectedTab === 'promotions' ? (
            <View style={styles.promotionsContainer}>
              {promotions.length > 0 ? (
                <FlatList
                  data={promotions}
                  renderItem={renderPromotion}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.noPromotionsText}>
                  No hay promociones disponibles en este momento
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.reviewsContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.PRIMARY_COLOR,
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  marginBottom: 16,
                  alignSelf: 'center',
                }}
                onPress={() => setShowReviewModal(true)}
              >
                <Text style={{ color: COLORS.background, fontFamily: 'Inter-Bold', fontSize: 16 }}>
                  Agregar reseña
                </Text>
              </TouchableOpacity>
              <Modal
                visible={showReviewModal}
                animationType="slide"
                transparent
                onRequestClose={() => setShowReviewModal(false)}
              >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: COLORS.background, borderRadius: 16, padding: 24, width: '85%' }}>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 20, marginBottom: 16, color: COLORS.text }}>Agregar reseña</Text>
                    <TextInput
                      placeholder="Tu nombre"
                      value={newReview.userName}
                      onChangeText={text => setNewReview({ ...newReview, userName: text })}
                      style={{ borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 10, marginBottom: 12, fontFamily: 'Inter-Regular', color: COLORS.text }}
                    />
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 16, marginBottom: 8, color: COLORS.text }}>Calificación</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                      {[1,2,3,4,5].map(star => (
                        <TouchableOpacity key={star} onPress={() => setNewReview({ ...newReview, rating: star })}>
                          <Star size={28} color={star <= newReview.rating ? '#FFB830' : COLORS.border} fill={star <= newReview.rating ? '#FFB830' : 'none'} />
                        </TouchableOpacity>
                      ))}
                    </View>
                    <TextInput
                      placeholder="Escribe tu comentario"
                      value={newReview.comment}
                      onChangeText={text => setNewReview({ ...newReview, comment: text })}
                      style={{ borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 10, minHeight: 60, fontFamily: 'Inter-Regular', color: COLORS.text, marginBottom: 16 }}
                      multiline
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
                      <TouchableOpacity onPress={() => setShowReviewModal(false)} style={{ paddingVertical: 10, paddingHorizontal: 18 }}>
                        <Text style={{ color: COLORS.textSecondary, fontFamily: 'Inter-Bold', fontSize: 16 }}>Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleAddReview} style={{ backgroundColor: COLORS.PRIMARY_COLOR, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 18 }}>
                        <Text style={{ color: COLORS.background, fontFamily: 'Inter-Bold', fontSize: 16 }}>Enviar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              {reviews.length > 0 ? (
                <FlatList
                  data={reviews}
                  renderItem={renderReview}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.noReviewsText}>
                  No hay reseñas disponibles aún
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceRange}>
            {restaurant.prices ? 
              `$${restaurant.prices.minPrice.toLocaleString('es-AR')} - $${restaurant.prices.maxPrice.toLocaleString('es-AR')}` : 
              restaurant.priceRange
            }
          </Text>
          <Text style={styles.priceText}>
            {restaurant.prices?.description || 'Rango de precios'}
          </Text>
          {cartItems.length > 0 && (
            <Text style={styles.cartCount}>
              {cartItems.length} producto{cartItems.length !== 1 ? 's' : ''} en el carrito
            </Text>
          )}
        </View>
        <TouchableOpacity 
          style={[styles.reserveButton, cartItems.length === 0 && styles.reserveButtonDisabled]}
          onPress={handleViewCart}
        >
          <Text style={styles.reserveButtonText}>
            {cartItems.length > 0 ? 'Ver Carrito' : 'Hacer Pedido'}
          </Text>
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
  imageContainer: {
    position: 'relative',
  },
  headerImage: {
    width,
    height: 300,
    backgroundColor: COLORS.borderLight,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeIndicator: {
    backgroundColor: COLORS.background,
  },
  headerActions: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerActionsRight: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  favoriteButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  titleSection: {
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.PRIMARY_COLOR,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 20,
  },
  quickInfo: {
    gap: 12,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
  },
  quickActionButton: {
    alignItems: 'center',
    gap: 4,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  amenityText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.PRIMARY_COLOR,
  },
  hoursContainer: {
    gap: 8,
  },
  hourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  hoursText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: COLORS.PRIMARY_COLOR,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  tabTextActive: {
    color: COLORS.background,
  },
  menuContainer: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 8,
  },
  menuItemName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: COLORS.PRIMARY_COLOR,
  },
  menuItemImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addToCartButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    padding: 8,
    borderRadius: 8,
  },
  promotionsContainer: {
    gap: 12,
  },
  promotionCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  promotionImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  promotionInfo: {
    padding: 16,
  },
  promotionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    color: COLORS.background,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  noPromotionsText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    padding: 20,
  },
  bottomAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  priceInfo: {
    flex: 1,
  },
  priceRange: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginBottom: 2,
  },
  priceText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  cartCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  reserveButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: COLORS.PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  reserveButtonDisabled: {
    backgroundColor: COLORS.borderLight,
  },
  reserveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: COLORS.PRIMARY_COLOR,
  },
  reviewsContainer: {
    gap: 12,
  },
  reviewItem: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  reviewActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  helpfulText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  noReviewsText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    padding: 20,
  },
  noMenuContainer: {
    alignItems: 'center',
    padding: 40,
  },
  noMenuText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  noMenuSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 