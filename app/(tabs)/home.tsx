import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  FlatList
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { COLORS } from '@/constants/Colors';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CartIcon } from "@/components/ui/CartIcon";

const restaurants = [
  {
    id: '1',
    name: 'La Trattoria',
    category: 'Italiana',
    rating: 4.8,
    distance: '0.5 km',
    image: require('@/assets/images/restaurant1.jpg'),
    featured: true
  },
  {
    id: '2',
    name: 'Sushi Palace',
    category: 'Japonesa',
    rating: 4.6,
    distance: '1.2 km',
    image: require('@/assets/images/restaurant2.jpg')
  },
  {
    id: '3',
    name: 'Burger Factory',
    category: 'Americana',
    rating: 4.3,
    distance: '0.8 km',
    image: require('@/assets/images/restaurant3.jpg')
  },
  {
    id: '4',
    name: 'El Asador',
    category: 'Parrilla',
    rating: 4.5,
    distance: '1.5 km',
    image: require('@/assets/images/restaurant4.jpg')
  },
];

const categories = [
  { id: '1', name: 'Todos', icon: 'restaurant' },
  { id: '2', name: 'Italiana', icon: 'local-pizza' }, // Cambiado de 'pizza' a 'local-pizza'
  { id: '3', name: 'Japonesa', icon: 'set-meal' }, // Cambiado de 'sushi' a 'set-meal'
  { id: '4', name: 'Parrilla', icon: 'outdoor-grill' }, // Cambiado de 'bbq' a 'outdoor-grill'
  { id: '5', name: 'Vegetariana', icon: 'grass' }, // Cambiado de 'leaf' a 'grass'
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');

  const featuredRestaurant = restaurants.find(r => r.featured);
  const filteredRestaurants = selectedCategory === '1' 
    ? restaurants 
    : restaurants.filter(r => r.category === categories.find(c => c.id === selectedCategory)?.name);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola, {user?.name || 'Gourmet'}</Text>
            <Text style={styles.welcomeBack}>¿Qué vas a comer hoy?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <FontAwesome name="user-circle" size={28} color={COLORS.text} />
          </TouchableOpacity>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar restaurantes, platos..."
            placeholderTextColor="#888"
            // value={searchQuery}
            // onChangeText={setSearchQuery}
            onFocus={() => router.push('/search')}
            editable={true}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#FFF" />
          </TouchableOpacity>
          {/* Ícono del carrito */}
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push('/cart')}
          >
            <CartIcon />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Categories */}
        <Animated.View entering={FadeInUp.delay(200).duration(500)}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <MaterialIcons 
                  name={categories.icon}
                  size={24} 
                  color={selectedCategory === category.id ? '#FFF' : COLORS.textSecondary} 
                />
                <Text 
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Featured Restaurant */}
        {featuredRestaurant && (
          <Animated.View entering={FadeInUp.delay(250).duration(500)}>
            <Text style={styles.sectionTitle}>Recomendado para ti</Text>
            <TouchableOpacity style={styles.featuredCard} onPress={() => router.push({ pathname: '/restaurant', params: { id: featuredRestaurant.id } })}>
              <Image source={featuredRestaurant.image} style={styles.featuredImage} />
              <View style={styles.featuredOverlay} />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>{featuredRestaurant.name}</Text>
                <View style={styles.featuredInfo}>
                  <View style={styles.ratingBadge}>
                    <MaterialIcons name="star" size={16} color="#FFF" />
                    <Text style={styles.ratingText}>{featuredRestaurant.rating}</Text>
                  </View>
                  <Text style={styles.featuredCategory}>{featuredRestaurant.category}</Text>
                  <Text style={styles.featuredDistance}>{featuredRestaurant.distance}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Nearby Restaurants */}
        <Animated.View entering={FadeInUp.delay(300).duration(500)}>
          <Text style={styles.sectionTitle}>Restaurantes cercanos</Text>
          <FlatList
            data={filteredRestaurants}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.restaurantCard} onPress={() => router.push({ pathname: '/restaurant', params: { id: item.id } })}>
                <Image source={item.image} style={styles.restaurantImage} />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{item.name}</Text>
                  <View style={styles.restaurantDetails}>
                    <View style={styles.ratingBadge}>
                      <MaterialIcons name="star" size={14} color="#FFF" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <Text style={styles.restaurantCategory}>{item.category}</Text>
                    <Text style={styles.restaurantDistance}>{item.distance}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
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
    padding: 16,
    paddingBottom: 30,
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
  profileButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
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
  filterButton: {
    backgroundColor: '#F59439',
    borderRadius: 8,
    padding: 6,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingBottom: 8,
    marginBottom: 24,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  categoryButtonActive: {
    backgroundColor: '#F59439',
    borderColor: '#F59439',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  categoryTextActive: {
    color: '#FFF',
  },
  featuredCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  featuredTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFF',
    marginBottom: 8,
  },
  featuredInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59439',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  ratingText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFF',
    marginLeft: 4,
  },
  featuredCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFF',
    marginRight: 10,
  },
  featuredDistance: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFF',
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  restaurantInfo: {
    flex: 1,
    padding: 12,
  },
  restaurantName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginRight: 10,
  },
  restaurantDistance: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  cartButton: {
  marginLeft: 8,
},

});