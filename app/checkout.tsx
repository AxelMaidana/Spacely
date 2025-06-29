import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckoutScreen() {
  const { cartItems, clearCart } = useCart();
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const finalPricePerItem = 16400;
  const originalPricePerItem = 20500;

  const subtotal = cartItems.reduce((sum, item) => sum + finalPricePerItem * item.quantity, 0);
  const ahorro = cartItems.reduce((sum, item) => sum + (originalPricePerItem - finalPricePerItem) * item.quantity, 0);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleConfirm = () => {
    clearCart();
    alert("¡Pedido confirmado! 🎉");
    router.push("/"); // vuelve al home
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Elegí día y horario</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Resumen del pedido</Text>
          {cartItems.map((item) => (
            <Text key={item.id} style={styles.itemText}>
              {item.quantity} × {item.name}
            </Text>
          ))}
          <Text style={styles.total}>Subtotal: ${subtotal.toLocaleString()}</Text>
          {ahorro > 0 && (
            <Text style={styles.ahorro}>¡Estás ahorrando ${ahorro.toLocaleString()}!</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Fecha y horario seleccionado</Text>
          <Text style={styles.itemText}>
            {date.toLocaleDateString()} - {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Cambiar fecha y hora</Text>
          </TouchableOpacity>
        </View>

        {showPicker && (
        <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onChange}
        />
        )}

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Confirmar pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  ahorro: {
    fontSize: 12,
    color: "#DAA520",
    marginTop: 4,
  },
  dateButton: {
    backgroundColor: "#1C1C1C",
    paddingVertical: 12,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: "#1C1C1C",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
  },
});
