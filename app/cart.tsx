import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const { cartItems, updateQuantity, removeItem, addItem, clearCart } = useCart();

  const finalPricePerItem = 16400;
  const originalPricePerItem = 20500;

  const subtotal = cartItems.reduce((sum, item) => sum + finalPricePerItem * item.quantity, 0);
  const ahorro = cartItems.reduce((sum, item) => sum + (originalPricePerItem - finalPricePerItem) * item.quantity, 0);

  const handleClearCart = () => {
    Alert.alert("Vaciar carrito", "¿Seguro que deseas vaciar el carrito?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Vaciar", style: "destructive", onPress: clearCart },
    ]);
  };

  const suggestedProducts = [
    { id: "sorrentinos", name: "Sorrentinos de JyQ", price: 15725, discount: 15, image: require("@/assets/images/restaurant2.jpg") },
    { id: "flan", name: "Flan Casero", price: 4250, discount: 15, image: require("@/assets/images/restaurant3.jpg") },
    { id: "gaseosa", name: "Gaseosa x1", price: 3000, discount: 0, image: require("@/assets/images/restaurant4.jpg") },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Carrito</Text>
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={{ color: "#DAA520", fontWeight: "bold" }}>Vaciar</Text>
          </TouchableOpacity>
        </View>

        {/* Info restaurante */}
        <View style={styles.restaurantInfo}>
          <Image source={require("@/assets/images/restaurant1.jpg")} style={styles.restaurantLogo} />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>La Taberna</Text>
            <Text style={{ fontSize: 14, color: "gray" }}>Adolfo Alsina 431</Text>
          </View>
        </View>

        {/* Items en el carrito */}
        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={require("@/assets/images/restaurant1.jpg")} style={styles.itemImage} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text numberOfLines={1} style={styles.itemName}>{item.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>$20.500</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-20%</Text>
                </View>
              </View>
              <Text style={styles.finalPrice}>$16.400</Text>
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
        ))}

        {/* Otros Spacers */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 24 }}>Otros Spacers también compraron</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
          {suggestedProducts.map(product => (
            <View key={product.id} style={styles.suggestedItem}>
              <Image source={product.image} style={styles.suggestedImage} />
              <Text numberOfLines={1} style={styles.suggestedName}>{product.name}</Text>
              {product.discount > 0 && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.suggestedOriginalPrice}>
                    ${(product.price / (1 - product.discount / 100)).toLocaleString()}
                  </Text>
                  <Text style={styles.suggestedDiscount}> -{product.discount}%</Text>
                </View>
              )}
              <Text style={styles.suggestedPrice}>${product.price.toLocaleString()}</Text>
              <TouchableOpacity
                style={styles.addSuggestedButton}
                onPress={() => addItem({ id: product.id, name: product.name, quantity: 1 })}
              >
                <Ionicons name="add" size={16} color="#000" />
              </TouchableOpacity>
            </View>
          ))}
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
          onPress={() => router.push("/checkout")}
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
});
