import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Stack, useLocalSearchParams, router } from 'expo-router'; // Importamos useLocalSearchParams y router
import { COLORS } from '@/constants/Colors';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { ArrowLeft, Star } from 'lucide-react-native'; // Iconos de Lucide

// Datos simulados de restaurantes (usamos los mismos que en home.tsx)
const restaurants = [
  {
    id: '1',
    name: 'La Trattoria',
    category: 'Italiana',
    rating: 4.8,
    distance: '0.5 km',
    image: require('@/assets/images/restaurant1.jpg'),
    featured: true,
    description: 'Auténtica cocina italiana con los mejores ingredientes frescos. Disfruta de nuestras pastas caseras y pizzas al horno de leña.',
    menu: [
      { id: 'm1', name: 'Pizza Margarita', price: 12.99, description: 'Tomate, mozzarella, albahaca' },
      { id: 'm2', name: 'Lasaña Clásica', price: 15.50, description: 'Pasta, carne, bechamel, queso' },
      { id: 'm3', name: 'Risotto de Champiñones', price: 14.75, description: 'Arroz Arborio, champiñones, parmesano' },
      { id: 'm4', name: 'Tiramisú', price: 7.00, description: 'Postre italiano clásico' },
    ],
    reviewsCount: 120, // Añadimos un conteo de reseñas simulado
  },
  {
    id: '2',
    name: 'Sushi Palace',
    category: 'Japonesa',
    rating: 4.6,
    distance: '1.2 km',
    image: require('@/assets/images/restaurant2.jpg'),
    description: 'El mejor sushi de la ciudad, preparado por maestros chefs con pescado fresco del día. Variedad de rolls, nigiris y sashimis.',
    menu: [
      { id: 'm5', name: 'Dragon Roll', price: 18.00, description: 'Anguila, aguacate, pepino' },
      { id: 'm6', name: 'Nigiri Surtido (6 pzs)', price: 16.50, description: 'Selección de pescados frescos' },
      { id: 'm7', name: 'Sashimi de Salmón (5 pzs)', price: 14.00, description: 'Salmón fresco en lonchas' },
      { id: 'm8', name: 'Tempura de Langostinos', price: 11.00, description: 'Langostinos rebozados y fritos' },
    ],
    reviewsCount: 95,
  },
  {
    id: '3',
    name: 'Burger Factory',
    category: 'Americana',
    rating: 4.3,
    distance: '0.8 km',
    image: require('@/assets/images/restaurant3.jpg'),
    description: 'Hamburguesas artesanales con carne 100% de res, pan brioche y los ingredientes más frescos. ¡Crea tu propia burger!',
    menu: [
      { id: 'm9', name: 'Classic Cheeseburger', price: 10.99, description: 'Carne, queso cheddar, lechuga, tomate, cebolla' },
      { id: 'm10', name: 'Bacon BBQ Burger', price: 13.50, description: 'Carne, bacon, cebolla caramelizada, salsa BBQ' },
      { id: 'm11', name: 'Patatas Fritas Grandes', price: 4.00, description: 'Crujientes patatas fritas' },
      { id: 'm12', name: 'Aros de Cebolla', price: 5.50, description: 'Deliciosos aros de cebolla rebozados' },
    ],
    reviewsCount: 70,
  },
  {
    id: '4',
    name: 'El Asador',
    category: 'Parrilla',
    rating: 4.5,
    distance: '1.5 km',
    image: require('@/assets/images/restaurant4.jpg'),
    description: 'Las mejores carnes a la parrilla al estilo argentino. Cortes premium y acompañamientos tradicionales.',
    menu: [
      { id: 'm13', name: 'Bife de Chorizo (300gr)', price: 25.00, description: 'Corte tradicional argentino' },
      { id: 'm14', name: 'Ojo de Bife (250gr)', price: 22.00, description: 'Jugoso y tierno' },
      { id: 'm15', name: 'Parrillada Mixta (2 pers)', price: 45.00, description: 'Variedad de carnes y achuras' },
      { id: 'm16', name: 'Ensalada Mixta', price: 6.00, description: 'Lechuga, tomate, cebolla' },
    ],
    reviewsCount: 150,
  },
];

export default function RestaurantMenuScreen() {
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>(); // Obtiene el ID del restaurante de la URL
  const restaurant = restaurants.find(r => r.id === restaurantId);

  // Si el restaurante no se encuentra, puedes redirigir o mostrar un error
  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} /> {/* Ocultamos el header aquí también */}
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Restaurante no encontrado.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Ocultamos el header por defecto para una customización completa */}
      <Stack.Screen options={{ headerShown: false }} /> 

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Restaurant Image with Back Button */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.imageContainer}>
          <Image source={restaurant.image} style={styles.restaurantImage} />
          <TouchableOpacity 
            style={styles.backButtonAbsolute} 
            onPress={() => router.back()} // Navega hacia atrás
          >
            <ArrowLeft size={24} color={COLORS.white} />
          </TouchableOpacity>
        </Animated.View>

        {/* Restaurant Details */}
        <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.infoRow}>
            <View style={styles.ratingBadge}>
              <Star size={16} color={COLORS.white} />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
            <Text style={styles.categoryText}>{restaurant.category}</Text>
            <Text style={styles.distanceText}>{restaurant.distance}</Text>
          </View>
          <Text style={styles.descriptionText}>{restaurant.description}</Text>
          
          {/* Botón para ver reseñas */}
          <TouchableOpacity 
            style={styles.reviewsButton}
            onPress={() => router.push(`/(tabs)/${restaurant.id}/reviews`)} // Navega a la pantalla de reseñas
          >
            <Text style={styles.reviewsButtonText}>Ver {restaurant.reviewsCount} Reseñas</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color={COLORS.PRIMARY_COLOR} />
          </TouchableOpacity>
        </Animated.View>

        {/* Menu Section */}
        <Animated.View entering={FadeInUp.delay(250).duration(500)} style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menú</Text>
          <FlatList
            data={restaurant.menu}
            keyExtractor={item => item.id}
            scrollEnabled={false} // Para que el ScrollView padre maneje el scroll
            renderItem={({ item }) => (
              <View style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                </View>
                <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.menuItemSeparator} />}
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
    paddingBottom: 24,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButtonAbsolute: {
    position: 'absolute',
    top: 40, // Ajustar según SafeAreaView y barra de estado
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: COLORS.background,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginTop: -16, // Superponer ligeramente con la imagen
    paddingTop: 24,
  },
  restaurantName: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: COLORS.text,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 12,
  },
  ratingText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 4,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textSecondary,
    marginRight: 12,
  },
  distanceText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  reviewsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  reviewsButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.PRIMARY_COLOR,
  },
  menuSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12, // Espacio entre items
  },
  menuItemContent: {
    flex: 1,
    marginRight: 10,
  },
  menuItemName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  menuItemPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.PRIMARY_COLOR,
  },
  menuItemSeparator: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: 4, // Espacio para el separador
    marginHorizontal: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.error,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.white,
  },
});