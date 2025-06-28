import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  FlatList,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { ArrowLeft, Star, MapPin, Clock } from 'lucide-react-native';
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
  { id: 'withDelivery', label: 'Con Delivery', icon: 'delivery-dining' },
  { id: 'hamburguesas', label: 'Hamburguesas', icon: 'fastfood' },
  { id: 'sushi', label: 'Sushi', icon: 'set-meal' },
  { id: 'parrillas', label: 'Parrillas', icon: 'outdoor-grill' },
  { id: 'vegetariana', label: 'Vegetariana', icon: 'eco' },
  { id: 'postres', label: 'Postres', icon: 'cake' },
];

export default function RestobarsScreen() {
  const { filter } = useLocalSearchParams();
  const { getFilteredRestaurants } = useRestaurantFilters();
  const [selectedFilter, setSelectedFilter] = useState(filter as string || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (filter) {
      setSelectedFilter(filter as string);
    }
  }, [filter]);

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
      case 'withDelivery':
        restaurants = getFilteredRestaurants.withDelivery();
        break;
      case 'hamburguesas':
        restaurants = getFilteredRestaurants.hamburguesas();
        break;
      case 'sushi':
        restaurants = getFilteredRestaurants.sushi();
        break;
      case 'parrillas':
        restaurants = getFilteredRestaurants.parrillas();
        break;
      case 'vegetariana':
        restaurants = getFilteredRestaurants.vegetariana();
        break;
      case 'postres':
        restaurants = getFilteredRestaurants.postres();
        break;
      default:
        restaurants = getFilteredRestaurants.all();
        break;
    }

    // Aplicar búsqueda si hay query
    if (searchQuery.trim()) {
      restaurants = restaurants.filter(restaurant =>
        restaurant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRestaurants(restaurants);
  }, [selectedFilter, searchQuery, getFilteredRestaurants]);

  const handleFilterPress = (filterId: string) => {
    setSelectedFilter(filterId);
  };

  const handleRestaurantPress = (restaurant: Restaurant) => {
    router.push(`/restaurant/${restaurant.id}` as any);
  };

  const getFilterTitle = () => {
    const filterOption = filterOptions.find(option => option.id === selectedFilter);
    return filterOption?.label || 'Todos los Restaurantes';
  };

  const renderRestaurantCard = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity 
      style={styles.restaurantCard}
      onPress={() => handleRestaurantPress(item)}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.restaurantImage} />
      
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{item.title}</Text>
          {item.discount && (
            <View style={styles.discountBadge}>
              <MaterialIcons name="local-offer" size={12} color="#FFFFFF" />
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
          )}
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

        {item.prices && (
          <Text style={styles.priceText}>
            {item.prices.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getFilterTitle()}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar restaurantes, platos..."
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

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredRestaurants.length} restaurante{filteredRestaurants.length !== 1 ? 's' : ''} encontrado{filteredRestaurants.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Restaurants List */}
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurantCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="search-off" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No se encontraron restaurantes</Text>
            <Text style={styles.emptyDescription}>
              Intenta cambiar los filtros o la búsqueda
            </Text>
          </View>
        }
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
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
    color: '#1F2937',
  },
  clearButton: {
    padding: 4,
  },
  filterContainer: {
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 8,
    paddingBottom: 24,
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
  resultsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  resultsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  listContainer: {
    padding: 20,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
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
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 2,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
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
  priceText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});