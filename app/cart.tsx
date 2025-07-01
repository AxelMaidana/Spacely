import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantById } from "@/data/restaurants";
import { COLORS } from '@/constants/Colors';
import { ArrowLeft } from 'lucide-react-native';

export default function Cart() {
  const { cartItems, restaurantInfo, updateQuantity, removeItem, addItem, clearCart } = useCart();

  // Obtener restaurante y menú real
  const restaurant = restaurantInfo ? getRestaurantById(restaurantInfo.id) : null;
  const menu = restaurant?.menu || [];

  // Obtener descuento del restaurante (ej: "15% OFF")
  const discountPercent = restaurant?.discount ? parseInt(restaurant.discount) : 0;

  // Función para obtener el precio real de un producto
  const getProductPrice = (itemId: string) => {
    const menuItem = menu.find((m) => m.id === itemId);
    if (!menuItem) return 0;
    // El precio es string tipo "$8.500"
    return Number(menuItem.price.replace(/[^\d]/g, ""));
  };

  // Función para calcular el precio con descuento
  const getDiscountedPrice = (price: number) => {
    if (discountPercent > 0) {
      return Math.round(price * (1 - discountPercent / 100));
    }
    return price;
  };

  // Calcular subtotal y ahorro
  const subtotal = cartItems.reduce((sum, item) => {
    const price = getProductPrice(item.id);
    const finalPrice = getDiscountedPrice(price);
    return sum + finalPrice * item.quantity;
  }, 0);

  const ahorro = cartItems.reduce((sum, item) => {
    const price = getProductPrice(item.id);
    const finalPrice = getDiscountedPrice(price);
    return sum + (price - finalPrice) * item.quantity;
  }, 0);

  // Obtener productos sugeridos del mismo restaurante
  const getSuggestedProducts = () => {
    if (!restaurantInfo || !restaurant) return [];
    const cartItemIds = cartItems.map(item => item.id);
    const availableProducts = menu.filter(item => !cartItemIds.includes(item.id));
    // Tomar hasta 3 productos sugeridos
    return availableProducts.slice(0, 3).map(item => ({
      id: item.id,
      name: item.name,
      price: Number(item.price.replace(/[^\d]/g, "")),
      image: item.image || restaurant.image
    }));
  };

  const suggestedProducts = getSuggestedProducts();

  const handleClearCart = () => {
    Alert.alert("Vaciar carrito", "¿Seguro que deseas vaciar el carrito?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Vaciar", style: "destructive", onPress: clearCart },
    ]);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrito vacío", "Agrega productos al carrito antes de continuar");
      return;
    }
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={router.back} style={styles.backButton}>
            <ArrowLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carrito</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptyDescription}>
            Agrega productos desde cualquier restaurante para comenzar
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.push('/home')}
          >
            <Text style={styles.browseButtonText}>Explorar Restaurantes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity onPress={router.back} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Carrito</Text>
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={{ color: "#DAA520", fontWeight: "bold" }}>Vaciar</Text>
          </TouchableOpacity>
        </View>

        {/* Info restaurante */}
        {restaurantInfo && (
          <View style={styles.restaurantInfo}>
            <Image source={restaurantInfo.image} style={styles.restaurantLogo} />
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{restaurantInfo.name}</Text>
              <Text style={{ fontSize: 14, color: "gray" }}>{restaurantInfo.address}</Text>
            </View>
          </View>
        )}

        {/* Items en el carrito */}
        {cartItems.map((item) => {
          const price = getProductPrice(item.id);
          const finalPrice = getDiscountedPrice(price);
          // Obtener la imagen específica del plato
          const menuItem = menu.find((m) => m.id === item.id);
          const itemImage = menuItem?.image || restaurantInfo?.image || require("@/assets/images/restaurant1.jpg");
          
          return (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={itemImage} style={styles.itemImage} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text numberOfLines={1} style={styles.itemName}>{item.name}</Text>
                <View style={styles.priceRow}>
                  {discountPercent > 0 && (
                    <Text style={styles.originalPrice}>${price.toLocaleString()}</Text>
                  )}
                  {discountPercent > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>-{discountPercent}%</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.finalPrice}>${finalPrice.toLocaleString()}</Text>
              </View>

              <View style={styles.qtyControls}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => {
                    if (item.quantity > 1) {
                      updateQuantity(item.id, item.quantity - 1);
                    } else {
                      removeItem(item.id);
                    }
                  }}
                >
                  <Text style={styles.qtyButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {/* Otros Spacers */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 24 }}>
          Otros platos de {restaurantInfo?.name || 'este restaurante'}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
          {suggestedProducts.map(product => {
            const finalPrice = getDiscountedPrice(product.price);
            return (
              <View key={product.id} style={styles.suggestedItem}>
                <Image source={product.image} style={styles.suggestedImage} />
                <Text numberOfLines={1} style={styles.suggestedName}>{product.name}</Text>
                {discountPercent > 0 && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.suggestedOriginalPrice}>
                      ${product.price.toLocaleString()}
                    </Text>
                    <Text style={styles.suggestedDiscount}> -{discountPercent}%</Text>
                  </View>
                )}
                <Text style={styles.suggestedPrice}>${finalPrice.toLocaleString()}</Text>
                <TouchableOpacity
                  style={styles.addSuggestedButton}
                  onPress={() => addItem({ id: product.id, name: product.name, quantity: 1 }, restaurantInfo || undefined)}
                >
                  <Ionicons name="add" size={16} color="#000" />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>

      {/* Footer con subtotal y botón */}
      <View style={styles.footer}>
        <View>
          <Text style={{ fontSize: 14, color: "gray" }}>Subtotal</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>${subtotal.toLocaleString()}</Text>
          {ahorro > 0 && (
            <Text style={{ fontSize: 12, color: "#DAA520", marginTop: 4 }}>
              ¡Estás ahorrando ${ahorro.toLocaleString()}!
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Elige día y horario</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  restaurantLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 4,
  },
  discountBadge: {
    backgroundColor: "#F6A72D",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  discountText: {
    fontSize: 10,
    color: "#fff",
  },
  finalPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  qtyButton: {
    backgroundColor: "#eee",
    padding: 4,
    borderRadius: 4,
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  qtyValue: {
    marginHorizontal: 8,
    fontSize: 14,
  },
  suggestedItem: {
    width: 120,
    marginRight: 12,
    alignItems: "center",
  },
  suggestedImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  suggestedName: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "bold",
  },
  suggestedOriginalPrice: {
    fontSize: 10,
    color: "#999",
    textDecorationLine: "line-through",
  },
  suggestedDiscount: {
    fontSize: 10,
    color: "#F6A72D",
    fontWeight: "bold",
  },
  suggestedPrice: {
    fontSize: 12,
    fontWeight: "bold",
  },
  addSuggestedButton: {
    marginTop: 4,
    backgroundColor: "#eee",
    padding: 4,
    borderRadius: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  checkoutButton: {
    backgroundColor: "#1C1C1C",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButton: {
    padding: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
  },
  headerSpacer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyDescription: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
    textAlign: "center",
  },
  browseButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
