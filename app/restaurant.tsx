import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, Feather, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '@/components/ui/Button';
import { COLORS } from '@/constants/Colors';

const restaurantesMock = [
  {
    id: '1',
    name: 'La Trattoria',
    category: 'Italiana',
    address: 'Av. Italia 123',
    schedule: '12:00 - 23:00',
    image: require('@/assets/images/restaurant1.jpg'),
    products: [
      { id: 'p1', name: 'Pizza Mediterránea', price: 9990, promo: 8990, pieces: '8 Porciones', image: require('@/assets/images/pizzaMediterranea.jpg')},
      { id: 'p2', name: 'Lasaña Boloñesa', price: 11990, promo: 9990, pieces: '1 Porción', image: require('@/assets/images/lasanaBolonesa.jpg')},
    ],
  },
  {
    id: '2',
    name: 'Sushi Palace',
    category: 'Japonesa',
    address: 'Av. Japón 456',
    schedule: '12:00 - 23:00',
    image: require('@/assets/images/restaurant2.jpg'),
    products: [
      { id: 'p1', name: '40 Piezas Vegetarianas', price: 14990, promo: 11992, pieces: '40 Porciones', image: require('@/assets/images/piezasVegetarianas.jpg')},
      { id: 'p2', name: '40 Piezas Veganas', price: 14990, promo: 11992, pieces: '40 Porciones', image: require('@/assets/images/piezasVeganas.jpg')},
    ],
  },
  {
    id: '3',
    name: 'Burger Factory',
    category: 'Americana',
    address: 'Calle Burger 789',
    schedule: '11:00 - 22:00',
    image: require('@/assets/images/restaurant3.jpg'),
    products: [
      { id: 'p1', name: 'Doble Cheeseburger', price: 7990, promo: 6990, pieces: '1 Porción', image: require('@/assets/images/hamburguesaCheeseburger.jpg')},
      { id: 'p2', name: 'Kentucky', price: 8990, pieces: '1 Porción', promo: 7990, image: require('@/assets/images/hamburguesaKentucky.jpg')},
      { id: 'p3', name: 'Tasty', price: 8990, pieces: '1 Porción', promo: 7990, image: require('@/assets/images/hamburguesaTasty.jpg')},
      { id: 'p4', name: 'Oklahoma', price: 8990, pieces: '1 Porción', promo: 7990, image: require('@/assets/images/hamburguesaOklahoma.jpg')},
      { id: 'p5', name: 'California', price: 8990, pieces: '1 Porción', promo: 7990, image: require('@/assets/images/hamburguesaCalifornia.jpg')},
      { id: 'p6', name: 'Hamburgesa Full + Papas fritas', price: 8990, pieces: '1 Porción', promo: 6990, image: require('@/assets/images/hamburguesaFull.jpg')},
    ],
  },
];

const RestaurantScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const restaurant = restaurantesMock.find((r) => r.id === id);

  if (!restaurant) {
    return <Text style={styles.noData}>Restaurante no encontrado</Text>;
  }

  const [isLoading, setIsLoading] = useState(false);
  const handleShare = () => {
    Share.share({
      message: `¡Te recomiendo ${restaurant.name}! Está en ${restaurant.address}.`,
    });
  };
  // agregar icono de ubicacion en infoContainer

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={restaurant.image} style={styles.image} />
            <TouchableOpacity onPress={router.back} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.topRightIcons}>
            <TouchableOpacity onPress={() => {}}>
                <Ionicons name="heart-outline" size={24} color="#fff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare}>
                <Feather name="share-2" size={24} color="#fff" />
            </TouchableOpacity>
            </View>
        </View>
        
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.subtitle}>
                <Text style={styles.iconText}>
                    <EvilIcons name="location"  style={{ fontSize: 24, color: '#666', verticalAlign: 'bottom' }} />
                </Text> {restaurant.address}
            </Text>
            <Text style={styles.subtitle}>
                <EvilIcons name="clock"  style={{ fontSize: 24, color: '#666', verticalAlign: 'bottom' }} /> Hoy: {restaurant.schedule}
            </Text> 
        </View>

        <View style={styles.reviewsContainer}>
          <Text style={styles.ratingValue}>4.5</Text>
          <View style={styles.starsRow}>
            <FontAwesome name="star" size={20} color="#000" />
            <FontAwesome name="star" size={20} color="#000" />
            <FontAwesome name="star" size={20} color="#000" />
            <FontAwesome name="star" size={20} color="#000" />
            <FontAwesome name="star-o" size={20} color="#000" />
          </View>
          <Text style={styles.reviewCount}>1,000 reviews</Text>

          {/* Distribución por estrellas */}
          {[
            { label: '5', percent: 70 },
            { label: '4', percent: 20 },
            { label: '3', percent: 6 },
            { label: '2', percent: 2 },
            { label: '1', percent: 2 },
          ].map((item, index) => (
            <View key={index} style={styles.starRow}>
              <Text style={styles.starLabel}>{item.label}</Text>
              <View style={styles.starBarBackground}>
                <View style={[styles.starBarFill, { width: `${item.percent}%` }]} />
              </View>
              <Text style={styles.starPercent}>{item.percent}%</Text>
            </View>
          ))}

          {/* Usuario ejemplo */}
          <Text style={styles.userReview}>Lucas</Text>
          <Text style={styles.reviewDate}>12/3/2022</Text>
        </View>





            <Button 
              label={"Reservar una mesa"}
              onPress={() => {}}
              disabled={isLoading}
              style={styles.reservarButton}
              icon={isLoading ? <ActivityIndicator size="small" color="#FFF" /> : null}
            />
        

        
        <View style={styles.productsContainer}>
            <Text style={styles.sectionTitle}>Ofertas Hot 🔥</Text>
            {restaurant.products.map((product) => (
            <View key={product.id} style={styles.productCard}>
                <TouchableOpacity 
                    onPress={() => router.push({ pathname: '/product', params: { id: product.id } })}
                >
                <Image
                source={product.image}
                style={styles.productImage}
                />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                <Text style={styles.productTitle}>{product.name}</Text>
                {product.pieces && <Text style={styles.piecesText}>{product.pieces}</Text>}
                <View style={styles.priceRow}>
                    <Text style={styles.oldPrice}>${product.price.toLocaleString()}</Text>
                    {product.promo && (
                    <Text style={styles.newPrice}>${product.promo.toLocaleString()}</Text>
                    )}
                </View>
                </View>
            </View>
            ))}
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: '#0006',
    padding: 8,
    borderRadius: 20,
  },
  topRightIcons: {
    position: 'absolute',
    top: 40,
    right: 16,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#0006',
    padding: 8,
    borderRadius: 20,
  },
  icon: {
    marginRight: 12,
  },
  iconText: {
  fontSize: 24,
  color: '#666',
  marginRight: 4,
  transform: [{ translateY: 1 }],
},
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    margin: 16,
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  piecesText: {
    fontSize: 13,
    color: '#888',
    marginVertical: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 14,
  },
  newPrice: {
    color: '#D9534F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noData: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
  },
  reviewsContainer: {
  paddingHorizontal: 16,
  paddingVertical: 20,
  backgroundColor: '#fff',
},

ratingValue: {
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 8,
},

starsRow: {
  flexDirection: 'row',
  marginBottom: 4,
},

reviewCount: {
  fontSize: 14,
  color: '#555',
  marginBottom: 12,
},

starRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 6,
},

starLabel: {
  width: 16,
  fontSize: 14,
},

starBarBackground: {
  flex: 1,
  height: 8,
  backgroundColor: '#eee',
  borderRadius: 4,
  marginHorizontal: 8,
},

starBarFill: {
  height: 8,
  backgroundColor: '#000',
  borderRadius: 4,
},

starPercent: {
  width: 40,
  fontSize: 12,
  color: '#888',
},

userReview: {
  marginTop: 16,
  fontSize: 16,
  fontWeight: '500',
},

reviewDate: {
  fontSize: 12,
  color: '#888',
},

reservarButton: {
      borderRadius: 12,
      height: 50,
      shadowColor: COLORS.PRIMARY_COLOR,
      backgroundColor: COLORS.PRIMARY_COLOR,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
      marginTop: 20,
      marginHorizontal: 20,
    },
});
