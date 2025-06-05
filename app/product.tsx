import React, { useState, useEffect } from 'react';
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
import { Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import { useAddProduct } from '@/hooks/useAddProduct';
import { COLORS } from '@/constants/Colors';

const productsMock = [
    { id: 'p1', name: 'Doble Cheeseburger', price: 7990, promo: 6990, image: require('@/assets/images/hamburguesaCheeseburger.jpg')},
    { id: 'p2', name: 'Kentucky', price: 8990, image: require('@/assets/images/hamburguesaKentucky.jpg')},
    { id: 'p3', name: 'Tasty', price: 8990, image: require('@/assets/images/hamburguesaTasty.jpg')},
    { id: 'p4', name: 'Oklahoma', price: 8990, image: require('@/assets/images/hamburguesaOklahoma.jpg')},
    { id: 'p5', name: 'California', price: 8990, image: require('@/assets/images/hamburguesaCalifornia.jpg')},
    { id: 'p6', name: 'Hamburgesa Full + Papas fritas', price: 8990, image: require('@/assets/images/hamburguesaFull.jpg')},
];

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const product = productsMock.find((r) => r.id === id);

  if (!product) {
    return <Text style={styles.noData}>Producto no encontrado</Text>;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [label, setLabel] = useState('');

  const handleShare = () => {
    Share.share({
      message: `¡Te recomiendo ${product.name}! Está en Spacely.`,
    });
  };

  const handleAddProduct = async () => {
    
    setError('');
    setIsLoading(true);

    try {
      await useAddProduct(product.id);
    } catch (err) {
      setError('Error al agregar. Intenta nuevamente.');
    } finally {
       // if(amount > 0){
            setLabel('Ver carrito');
       // }
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={product.image} style={styles.image} />
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
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.subtitle}>
                <Text style={styles.iconText}>
                    <EvilIcons name="location"  style={{ fontSize: 24, color: '#666', verticalAlign: 'bottom' }} />
                </Text> {product.price}
            </Text>
            <Text style={styles.subtitle}>
                <EvilIcons name="clock"  style={{ fontSize: 24, color: '#666', verticalAlign: 'bottom' }} /> Hoy: {product.price}
            </Text> 
        </View>

                      <Button 
                        label={"Añadir"}
                        onPress={handleAddProduct}
                        disabled={isLoading}
                        style={styles.añadirButton}
                        icon={isLoading ? <ActivityIndicator size="small" color="#FFF" /> : null}
                      />
        </ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;

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
  añadirButton: {
    borderRadius: 12,
    height: 50,
    width: 200,
    margin: 200,
    backgroundColor: COLORS.PRIMARY_COLOR,
    shadowColor: COLORS.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    }
});
