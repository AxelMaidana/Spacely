import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Share } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProductScreen() {
  const [quantity, setQuantity] = useState(1);
  const { addItem, cartItems } = useCart();
  const [added, setAdded] = useState(false);

  const product = {
    id: "1",
    name: "Milanesa de Ternera Napolitana + Agua/Gaseosa",
    description: "Milanesa de Ternera Napolitana + Agua/Gaseosa.\n*No acumulable con otras promociones del local.",
    originalPrice: 20500,
    discount: 20,
    finalPrice: 16400,
    image: require("@/assets/images/restaurant1.jpg"),
    restaurant: {
      name: "La Taberna",
      address: "Adolfo Alsina 431",
      hours: "Acercate HOY de 11:30 - 17:00 / 19:00 - 00:00"
    }
  };

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, quantity });
    setAdded(true);
  };

  const handleShare = () => {
    Share.share({
      message: `¡Te recomiendo ${product.name}!.`,
    });
  };
  return (
    <ScrollView style={{ flex: 1 }}>
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
      

      <View style={styles.timerContainer}>
        <Ionicons name="time-outline" size={16} color="#F59439" />
        <Text style={styles.timerText}>12:52:37</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.originalPrice}>${product.originalPrice.toLocaleString()}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>- {product.discount}%</Text>
          </View>
        </View>
        <Text style={styles.finalPrice}>${product.finalPrice.toLocaleString()}</Text>

        <View style={styles.restaurantInfo}>
          <MaterialIcons name="storefront" size={18} color="#000" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.restaurantName}>{product.restaurant.name}</Text>
            <Text style={styles.restaurantAddress}>{product.restaurant.address}</Text>
          </View>
        </View>

        <View style={styles.hoursContainer}>
          <Ionicons name="time-outline" size={16} color="#F59439" />
          <Text style={styles.hoursText}>{product.restaurant.hours}</Text>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              <Text style={styles.qtyButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => setQuantity((prev) => prev + 1)}
            >
              <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              if (!added) handleAddToCart();
              else router.push("/cart");
            }}
          >
            <Text style={styles.addButtonText}>
              {added ? "Revisar carrito" : `Añadir $${product.finalPrice.toLocaleString()}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 250 },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: '#0006',
    padding: 8,
    borderRadius: 20,
  },
  imageContainer: {
    position: 'relative',
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
  timerText: { color: "#F59439", fontWeight: "bold", marginLeft: 4 },
  content: { padding: 16 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  description: { fontSize: 14, color: "#555", marginBottom: 12 },
  priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  originalPrice: { fontSize: 14, color: "#999", textDecorationLine: "line-through", marginRight: 8 },
  discountBadge: { backgroundColor: "#F6A72D", borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  discountText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  finalPrice: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  restaurantInfo: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  restaurantName: { fontSize: 16, fontWeight: "bold" },
  restaurantAddress: { fontSize: 14, color: "#777" },
  hoursContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF5E0", padding: 10, borderRadius: 6, marginBottom: 16 },
  hoursText: { marginLeft: 8, color: "#000", fontSize: 13 },
  footerRow: { flexDirection: "row", alignItems: "center" },
  quantityRow: { flexDirection: "row", alignItems: "center", marginRight: 12 },
  qtyButton: { backgroundColor: "#EEE", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
  qtyButtonText: { fontSize: 18, fontWeight: "bold" },
  qtyText: { marginHorizontal: 10, fontSize: 16, fontWeight: "bold" },
  addButton: { flex: 1, backgroundColor: "#1C1C1C", padding: 14, borderRadius: 8, alignItems: "center" },
  addButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
