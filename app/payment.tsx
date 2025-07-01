import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
  const { clearCart } = useCart();
  const params = useLocalSearchParams();
  const total = Number(params.total) || 0;
  
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const validateForm = () => {
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      Alert.alert("Error", "El número de tarjeta debe tener 16 dígitos");
      return false;
    }
    if (cardHolder.trim().length < 3) {
      Alert.alert("Error", "Ingresa el nombre del titular de la tarjeta");
      return false;
    }
    if (expiryDate.length !== 5) {
      Alert.alert("Error", "Ingresa la fecha de vencimiento (MM/YY)");
      return false;
    }
    if (cvv.length !== 3) {
      Alert.alert("Error", "El CVV debe tener 3 dígitos");
      return false;
    }
    return true;
  };

  const processPayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        "¡Pago Exitoso!",
        "Tu pago ha sido procesado correctamente.",
        [
          {
            text: "Continuar",
            onPress: () => {
              clearCart();
              router.push("/home");
            }
          }
        ]
      );
    }, 3000);
  };

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (cleaned.startsWith("5")) return "mastercard";
    if (cleaned.startsWith("3")) return "amex";
    return "generic";
  };

  const cardType = getCardType(cardNumber);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={router.back} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pago con Tarjeta</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Resumen del pago */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumen del Pago</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total a pagar:</Text>
              <Text style={styles.summaryAmount}>${total.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Método:</Text>
              <Text style={styles.summaryMethod}>Tarjeta de Crédito/Débito</Text>
            </View>
          </View>

          {/* Información de la tarjeta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información de la Tarjeta</Text>
            
            <View style={styles.cardPreview}>
              <View style={styles.cardHeader}>
                <Ionicons 
                  name={cardType === "visa" ? "card" : cardType === "mastercard" ? "card" : "card-outline"} 
                  size={24} 
                  color="#fff" 
                />
                <Text style={styles.cardType}>
                  {cardType === "visa" ? "VISA" : cardType === "mastercard" ? "MASTERCARD" : "TARJETA"}
                </Text>
              </View>
              <Text style={styles.cardNumber}>
                {cardNumber || "•••• •••• •••• ••••"}
              </Text>
              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.cardLabel}>TITULAR</Text>
                  <Text style={styles.cardValue}>{cardHolder || "NOMBRE APELLIDO"}</Text>
                </View>
                <View>
                  <Text style={styles.cardLabel}>VENCE</Text>
                  <Text style={styles.cardValue}>{expiryDate || "MM/YY"}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Formulario */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos de la Tarjeta</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Número de Tarjeta</Text>
              <TextInput
                style={styles.input}
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text.slice(0, 19)))}
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Titular de la Tarjeta</Text>
              <TextInput
                style={styles.input}
                value={cardHolder}
                onChangeText={setCardHolder}
                placeholder="NOMBRE APELLIDO"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Fecha de Vencimiento</Text>
                <TextInput
                  style={styles.input}
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text.slice(0, 5)))}
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={cvv}
                  onChangeText={(text) => setCvv(text.slice(0, 3))}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          {/* Información de seguridad */}
          <View style={styles.securityInfo}>
            <Ionicons name="shield-checkmark" size={20} color="#10B981" />
            <Text style={styles.securityText}>
              Tus datos están protegidos con encriptación SSL de 256 bits
            </Text>
          </View>
        </ScrollView>

        {/* Botón de pago */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.payButton, isProcessing && styles.payButtonDisabled]} 
            onPress={processPayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <View style={styles.processingContainer}>
                <Ionicons name="refresh" size={20} color="#fff" style={styles.spinning} />
                <Text style={styles.payButtonText}>Procesando pago...</Text>
              </View>
            ) : (
              <Text style={styles.payButtonText}>Pagar ${total.toLocaleString()}</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  summaryCard: {
    margin: 16,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#6B7280",
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  summaryMethod: {
    fontSize: 16,
    fontWeight: "500",
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
  cardPreview: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardType: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cardNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    color: "#9CA3AF",
    fontSize: 10,
    marginBottom: 4,
  },
  cardValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
  },
  row: {
    flexDirection: "row",
  },
  securityInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F0FDF4",
    margin: 16,
    borderRadius: 8,
  },
  securityText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#065F46",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  payButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  processingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  spinning: {
    marginRight: 8,
  },
}); 