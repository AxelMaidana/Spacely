import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { ArrowLeft, Star, MapPin, Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { useRestaurantFilters } from '@/hooks/useRestaurantFilters';
import { Restaurant } from '@/data/restaurants';

const { width } = Dimensions.get('window');

const filterOptions = [
  { id: 'all', label: 'Todos', icon: 'restaurant' },
  { id: 'discount', label: 'Con Descuento', icon: 'local-offer' },
  { id: 'bodegones', label: 'Bodegones', icon: 'local-dining' },
  { id: 'topRated', label: 'Mejor Calificados', icon: 'star' },
  { id: 'pizzerias', label: 'Pizzerías', icon: 'local-pizza' },
  { id: 'heladerias', label: 'Heladerías', icon: 'icecream' },
  { id: 'cafeterias', label: 'Cafeterías', icon: 'local-cafe' },
  { id: 'cervecerias', label: 'Cervecerías', icon: 'sports-bar' },
  { id: 'restoBars', label: 'Resto Bars', icon: 'local-bar' },
  { id: 'mexicana', label: 'Mexicana', icon: 'restaurant' },
  { id: 'bars', label: 'Bares', icon: 'local-bar' },
];

// Importación dinámica del componente del mapa solo para móvil
const MapComponent = Platform.OS === 'web' 
  ? () => null 
  : lazy(() => import('@/components/MapComponent'));

export default function MapViewScreen() {
  const { getFilteredRestaurants } = useRestaurantFilters();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Coordenadas de Resistencia, Chaco - Centro de la ciudad
  const initialRegion = {
    latitude: -27.4512,
    longitude: -58.9866,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  useEffect(() => {
    let restaurants: Restaurant[] = [];
    
    switch (selectedFilter) {
      case 'discount':
        restaurants = getFilteredRestaurants.withDiscount();
        break;
      case 'bodegones':
        restaurants = getFilteredRestaurants.bodegones();
        break;
      case 'topRated':
        restaurants = getFilteredRestaurants.topRated();
        break;
      case 'pizzerias':
        restaurants = getFilteredRestaurants.pizzerias();
        break;
      case 'heladerias':
        restaurants = getFilteredRestaurants.heladerias();
        break;
      case 'cafeterias':
        restaurants = getFilteredRestaurants.cafeterias();
        break;
      case 'cervecerias':
        restaurants = getFilteredRestaurants.cervecerias();
        break;
      case 'restoBars':
        restaurants = getFilteredRestaurants.restoBars();
        break;
      case 'mexicana':
        restaurants = getFilteredRestaurants.mexicana();
        break;
      case 'bars':
        restaurants = getFilteredRestaurants.bars();
        break;
      default:
        restaurants = getFilteredRestaurants.all();
        break;
    }

    // Aplicar búsqueda si hay query
    if (searchQuery.trim()) {
      restaurants = restaurants.filter(restaurant =>
        restaurant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRestaurants(restaurants);
  }, [selectedFilter, searchQuery, getFilteredRestaurants]);

  const handleFilterPress = (filterId: string) => {
    setSelectedFilter(filterId);
  };

  const handleRestaurantPress = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleNavigateToRestaurant = (restaurant: Restaurant) => {
    router.push(`/restaurant/${restaurant.id}` as any);
  };

  const handleCallRestaurant = (phone: string) => {
    Alert.alert('Llamar', `¿Deseas llamar a ${phone}?`);
  };

  const handleGetDirections = (restaurant: Restaurant) => {
    Alert.alert('Direcciones', `Abrir mapa con direcciones a ${restaurant.title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Map - Full Screen */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <View style={styles.webNotAvailableContainer}>
            <MaterialIcons name="map" size={64} color="#6B7280" />
            <Text style={styles.webNotAvailableTitle}>Mapa no disponible</Text>
            <Text style={styles.webNotAvailableText}>
              La funcionalidad del mapa no está disponible en la versión web.
              Por favor, utiliza la aplicación móvil para acceder a esta función.
            </Text>
          </View>
        ) : (
          <Suspense fallback={<View style={styles.loadingContainer}><Text>Cargando mapa...</Text></View>}>
            <MapComponent
              initialRegion={initialRegion}
              filteredRestaurants={filteredRestaurants}
              handleRestaurantPress={handleRestaurantPress}
            />
          </Suspense>
        )}
      </View>

      {/* Overlay UI Elements */}
      <View style={styles.overlay}>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar restaurantes..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <MaterialIcons name="close" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterButton,
                selectedFilter === option.id && styles.filterButtonActive
              ]}
              onPress={() => handleFilterPress(option.id)}
            >
              <MaterialIcons 
                name={option.icon as any} 
                size={16} 
                color={selectedFilter === option.id ? '#FFFFFF' : '#6B7280'} 
              />
              <Text style={[
                styles.filterText,
                selectedFilter === option.id && styles.filterTextActive
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Restaurant Info Card */}
      {selectedRestaurant && (
        <View style={styles.restaurantCard}>
          <Image source={selectedRestaurant.image} style={styles.restaurantImage} />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{selectedRestaurant.title}</Text>
            <Text style={styles.restaurantCategory}>{selectedRestaurant.category}</Text>
            
            <View style={styles.restaurantDetails}>
              <View style={styles.ratingContainer}>
                <Star size={14} color="#FFB830" fill="#FFB830" />
                <Text style={styles.ratingText}>{selectedRestaurant.rating}</Text>
              </View>
              
              <View style={styles.distanceContainer}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.distanceText}>{selectedRestaurant.distance}</Text>
              </View>
              
              <View style={styles.statusContainer}>
                <Clock size={14} color={selectedRestaurant.isOpen ? "#10B981" : "#EF4444"} />
                <Text style={[styles.statusText, { color: selectedRestaurant.isOpen ? "#10B981" : "#EF4444" }]}>
                  {selectedRestaurant.isOpen ? 'Abierto' : 'Cerrado'}
                </Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleNavigateToRestaurant(selectedRestaurant)}
              >
                <MaterialIcons name="info" size={16} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Ver Detalles</Text>
              </TouchableOpacity>
              
              {selectedRestaurant.phone && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.callButton]}
                  onPress={() => handleCallRestaurant(selectedRestaurant.phone!)}
                >
                  <MaterialIcons name="phone" size={16} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Llamar</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.directionsButton]}
                onPress={() => handleGetDirections(selectedRestaurant)}
              >
                <MaterialIcons name="directions" size={16} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Cómo Llegar</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedRestaurant(null)}
          >
            <MaterialIcons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    marginTop: 60,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  clearButton: {
    padding: 4,
  },
  filterContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
    maxHeight: 60,
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 100,
    minHeight: 36,
  },
  filterButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    textAlign: 'center',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  restaurantCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
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
  restaurantName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  restaurantCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
    marginBottom: 8,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
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
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  callButton: {
    backgroundColor: '#10B981',
  },
  directionsButton: {
    backgroundColor: '#3B82F6',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  webNotAvailableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  webNotAvailableTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  webNotAvailableText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
