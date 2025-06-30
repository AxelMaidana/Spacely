import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantById } from "@/data/restaurants";

export default function Checkout() {
  const { cartItems, clearCart, restaurantInfo } = useCart();
  const [selectedDate, setSelectedDate] = useState("Hoy");
  const [selectedTime, setSelectedTime] = useState("19:00");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Obtener restaurante y menú real
  const restaurant = restaurantInfo ? getRestaurantById(restaurantInfo.id) : null;
  const menu = restaurant?.menu || [];
  const discountPercent = restaurant?.discount ? parseInt(restaurant.discount) : 0;

  // Función para obtener el precio real de un producto
  const getProductPrice = (itemId: string) => {
    const menuItem = menu.find((m) => m.id === itemId);
    if (!menuItem) return 0;
    return Number(menuItem.price.replace(/[^\d]/g, ""));
  };

  // Función para calcular el precio con descuento
  const getDiscountedPrice = (price: number) => {
    if (discountPercent > 0) {
      return Math.round(price * (1 - discountPercent / 100));
    }
    return price;
  };

  // Calcular subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    const price = getProductPrice(item.id);
    const finalPrice = getDiscountedPrice(price);
    return sum + finalPrice * item.quantity;
  }, 0);

  const deliveryFee = 2000;
  const subtotalWithDelivery = subtotal + deliveryFee;
  const cardFee = paymentMethod === "tarjeta" ? subtotalWithDelivery * 0.15 : 0;
  const total = subtotalWithDelivery + cardFee;

  const handleConfirmOrder = () => {
    if (paymentMethod === "tarjeta") {
      // Redirigir a la pantalla de pago con tarjeta
      router.push({
        pathname: "/payment",
        params: { total: total.toString() }
      });
      return;
    }

    Alert.alert(
      "Confirmar Pedido",
      "¿Estás seguro de que quieres confirmar tu pedido?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: () => {
            clearCart();
            setShowSuccessModal(true);
          }
        },
      ]
    );
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push('/home');
  };

  const dates = ["Hoy", "Mañana", "Pasado mañana"];
  const times = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmar Pedido</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* Resumen del pedido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
          {cartItems.map((item) => {
            const price = getProductPrice(item.id);
            const finalPrice = getDiscountedPrice(price);
            return (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  {discountPercent > 0 && (
                    <Text style={{ textDecorationLine: 'line-through', color: '#999', fontSize: 14 }}>
                      ${price.toLocaleString()}
                    </Text>
                  )}
                  {discountPercent > 0 && (
                    <Text style={{ color: '#DAA520', fontSize: 12, fontWeight: 'bold' }}> -{discountPercent}% </Text>
                  )}
                  <Text style={styles.itemPrice}>
                    ${(finalPrice * item.quantity).toLocaleString()}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Selección de fecha */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fecha de Entrega</Text>
          <View style={styles.optionsContainer}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date}
                style={[
                  styles.optionButton,
                  selectedDate === date && styles.optionButtonActive
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[
                  styles.optionText,
                  selectedDate === date && styles.optionTextActive
                ]}>
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selección de hora */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hora de Entrega</Text>
          <View style={styles.optionsContainer}>
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.optionButton,
                  selectedTime === time && styles.optionButtonActive
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.optionText,
                  selectedTime === time && styles.optionTextActive
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Información de entrega */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Entrega</Text>
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryText}>
              Dirección: Av. San Martín 1234, Resistencia
            </Text>
            <Text style={styles.deliveryText}>
              Teléfono: +54 9 362 123-4567
            </Text>
          </View>
        </View>

        {/* Método de pago */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de Pago</Text>
          <View style={styles.paymentOptionsContainer}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "efectivo" && styles.paymentOptionActive
              ]}
              onPress={() => setPaymentMethod("efectivo")}
            >
              <View style={styles.paymentOptionContent}>
                <Ionicons 
                  name="cash-outline" 
                  size={24} 
                  color={paymentMethod === "efectivo" ? "#FFFFFF" : "#6B7280"} 
                />
                <View style={styles.paymentOptionText}>
                  <Text style={[
                    styles.paymentOptionTitle,
                    paymentMethod === "efectivo" && styles.paymentOptionTitleActive
                  ]}>
                    Efectivo
                  </Text>
                  <Text style={[
                    styles.paymentOptionSubtitle,
                    paymentMethod === "efectivo" && styles.paymentOptionSubtitleActive
                  ]}>
                    Paga al recibir tu pedido
                  </Text>
                </View>
              </View>
              {paymentMethod === "efectivo" && (
                <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "tarjeta" && styles.paymentOptionActive
              ]}
              onPress={() => setPaymentMethod("tarjeta")}
            >
              <View style={styles.paymentOptionContent}>
                <Ionicons 
                  name="card-outline" 
                  size={24} 
                  color={paymentMethod === "tarjeta" ? "#FFFFFF" : "#6B7280"} 
                />
                <View style={styles.paymentOptionText}>
                  <Text style={[
                    styles.paymentOptionTitle,
                    paymentMethod === "tarjeta" && styles.paymentOptionTitleActive
                  ]}>
                    Tarjeta de Crédito/Débito
                  </Text>
                  <Text style={[
                    styles.paymentOptionSubtitle,
                    paymentMethod === "tarjeta" && styles.paymentOptionSubtitleActive
                  ]}>
                    Recargo del 15% por comisión
                  </Text>
                </View>
              </View>
              {paymentMethod === "tarjeta" && (
                <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer con total y botón de confirmar */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>${subtotal.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Envío:</Text>
            <Text style={styles.totalValue}>${deliveryFee.toLocaleString()}</Text>
          </View>
          {cardFee > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Recargo por tarjeta (15%):</Text>
              <Text style={styles.totalValue}>${cardFee.toLocaleString()}</Text>
            </View>
          )}
          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={styles.finalTotalLabel}>Total:</Text>
            <Text style={styles.finalTotalValue}>${total.toLocaleString()}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
          <Text style={styles.confirmButtonText}>
            {paymentMethod === "tarjeta" ? "Pagar con Tarjeta" : "Confirmar Pedido"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal de éxito */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseSuccessModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={80} color="#10B981" />
            </View>
            <Text style={styles.successTitle}>¡Pedido Confirmado!</Text>
            <Text style={styles.successMessage}>
              Tu pedido ha sido enviado al restaurante exitosamente.
            </Text>
            <Text style={styles.successSubMessage}>
              Te notificaremos cuando esté listo para recoger.
            </Text>
            <View style={styles.orderDetails}>
              <Text style={styles.orderDetailText}>
                📅 Fecha: {selectedDate}
              </Text>
              <Text style={styles.orderDetailText}>
                🕐 Hora: {selectedTime}
              </Text>
              <Text style={styles.orderDetailText}>
                💳 Pago: {paymentMethod === "efectivo" ? "Efectivo" : "Tarjeta"}
              </Text>
              <Text style={styles.orderDetailText}>
                📦 Total: ${total.toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.successButton}
              onPress={handleCloseSuccessModal}
            >
              <Text style={styles.successButtonText}>¡Perfecto!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  headerSpacer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 16,
    color: "#6B7280",
    marginHorizontal: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  optionButtonActive: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },
  optionText: {
    fontSize: 14,
    color: "#6B7280",
  },
  optionTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  deliveryInfo: {
    gap: 8,
  },
  deliveryText: {
    fontSize: 16,
    color: "#6B7280",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  totalContainer: {
    marginBottom: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
    color: "#6B7280",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  finalTotal: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
    marginTop: 8,
  },
  finalTotalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  confirmButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  successModal: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
  },
  successIconContainer: {
    backgroundColor: "#F0FDF4",
    borderRadius: 40,
    padding: 16,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  successSubMessage: {
    fontSize: 14,
    color: "#6B7280",
  },
  orderDetails: {
    marginBottom: 24,
  },
  orderDetailText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 4,
  },
  successButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  successButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentOptionsContainer: {
    gap: 12,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  paymentOptionActive: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },
  paymentOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  paymentOptionText: {
    flex: 1,
  },
  paymentOptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentOptionTitleActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  paymentOptionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  paymentOptionSubtitleActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
