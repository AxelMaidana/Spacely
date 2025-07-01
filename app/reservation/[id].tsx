import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput, Modal, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getRestaurantById } from "@/data/restaurants";
import TableSelector from "@/components/TableSelector";
import { useReservations } from "@/contexts/ReservationsContext";

interface Table {
  id: number;
  x: number;
  y: number;
  capacity: number;
  isAvailable: boolean;
}

// Configuración de las mesas (debe coincidir con TableSelector)
const tables: Table[] = [
  { id: 1, x: 23, y: 6, capacity: 2, isAvailable: true },
  { id: 5, x: 35, y: 20, capacity: 4, isAvailable: true },
  { id: 6, x: 51, y: 23, capacity: 6, isAvailable: true },
  { id: 8, x: 74, y: 20, capacity: 10, isAvailable: true },
  { id: 4, x: 23, y: 55, capacity: 2, isAvailable: true },
  { id: 7, x: 51, y: 52, capacity: 10, isAvailable: true },
  { id: 9, x: 77, y: 50, capacity: 2, isAvailable: true },
  { id: 2, x: 23, y: 22, capacity: 2, isAvailable: true },
  { id: 3, x: 23, y: 39, capacity: 2, isAvailable: true },
  { id: 10, x: 77, y: 65, capacity: 2, isAvailable: true },
];

export default function Reservation() {
  const { id } = useLocalSearchParams();
  const restaurant = getRestaurantById(id as string);
  const { addReservation } = useReservations();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showTableSelector, setShowTableSelector] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Restaurante no encontrado</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Horarios disponibles
  const availableTimes = [
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", 
    "21:00", "21:30", "22:00", "23:00", "00:00"
  ];

  const handleConfirmReservation = () => {
    if (isSunday) {
      Alert.alert("Error", "El restaurante está cerrado los domingos. Por favor selecciona otra fecha.");
      return;
    }

    if (!selectedDate || !selectedTime || !selectedTable || !name.trim() || !phone.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }

    const selectedTableData = tables.find(t => t.id === selectedTable);
    const capacity = selectedTableData?.capacity || 0;

    Alert.alert(
      "Confirmar Reserva",
      `¿Confirmar reserva para ${name} el ${selectedDate.toLocaleDateString('es-ES')} a las ${selectedTime} en la mesa ${selectedTable} (${capacity} personas)?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: () => {
            // Guardar la reserva en el contexto
            addReservation({
              restaurantId: restaurant.id,
              restaurantName: restaurant.title,
              restaurantAddress: restaurant.address,
              restaurantImage: restaurant.image,
              date: selectedDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
              time: selectedTime,
              tableId: selectedTable,
              tableCapacity: capacity,
              customerName: name,
              customerPhone: phone,
              notes: notes.trim() || undefined,
              status: 'confirmed'
            });
            
            setShowSuccessModal(true);
          }
        },
      ]
    );
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push("/home");
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      // Limpiar hora seleccionada si cambia la fecha
      setSelectedTime("");
    }
  };

  // Verificar si la fecha seleccionada es domingo
  const isSunday = selectedDate.getDay() === 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reservar Mesa</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Información del restaurante */}
        <View style={styles.restaurantCard}>
          <Text style={styles.restaurantName}>{restaurant.title}</Text>
          <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
        </View>

        {/* Selección de fecha */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fecha de Reserva</Text>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => setShowDatePicker(true)}
          >
            <View style={styles.dateDisplay}>
              <Ionicons name="calendar" size={20} color="#6B7280" />
              <Text style={styles.dateText}>
                {selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                })}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Selección de hora */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hora de Reserva</Text>
          {isSunday ? (
            <View style={styles.closedMessage}>
              <Ionicons name="close-circle" size={24} color="#EF4444" />
              <Text style={styles.closedText}>
                El restaurante está cerrado los domingos
              </Text>
            </View>
          ) : (
            <View style={styles.timeGrid}>
              {availableTimes.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeOption,
                    selectedTime === time && styles.timeOptionActive
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextActive
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Selección de mesa */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seleccionar Mesa</Text>
          <TouchableOpacity
            style={styles.tableSelector}
            onPress={() => setShowTableSelector(true)}
          >
            <View style={styles.tableDisplay}>
              <Ionicons name="restaurant" size={20} color="#6B7280" />
              <Text style={styles.tableText}>
                {selectedTable 
                  ? `Mesa ${selectedTable} seleccionada` 
                  : "Toca para seleccionar una mesa"
                }
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Información personal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Contacto</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre completo *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre completo"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Teléfono *</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+54 9 362 123-4567"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Notas adicionales (opcional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Alergias, preferencias especiales, etc."
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Información importante */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color="#3B82F6" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Información importante</Text>
            <Text style={styles.infoText}>
              • La reserva se confirma automáticamente
            </Text>
            <Text style={styles.infoText}>
              • Llega 10 minutos antes de tu hora reservada
            </Text>
            <Text style={styles.infoText}>
              • Para cancelar, contacta al restaurante directamente
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Botón de confirmar */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            (isSunday || !selectedTable) && styles.confirmButtonDisabled
          ]} 
          onPress={handleConfirmReservation}
          disabled={isSunday || !selectedTable}
        >
          <Text style={[
            styles.confirmButtonText,
            (isSunday || !selectedTable) && styles.confirmButtonTextDisabled
          ]}>
            {isSunday ? "Cerrado los domingos" : !selectedTable ? "Selecciona una mesa" : "Confirmar Reserva"}
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
            <Text style={styles.successTitle}>¡Reserva Confirmada!</Text>
            <Text style={styles.successMessage}>
              Tu mesa ha sido reservada exitosamente.
            </Text>
            <View style={styles.reservationDetails}>
              <Text style={styles.reservationDetailText}>
                📅 Fecha: {selectedDate.toLocaleDateString('es-ES')}
              </Text>
              <Text style={styles.reservationDetailText}>
                🕐 Hora: {selectedTime}
              </Text>
              <Text style={styles.reservationDetailText}>
                🪑 Mesa: {selectedTable}
              </Text>
              <Text style={styles.reservationDetailText}>
                👥 Capacidad: {tables.find(t => t.id === selectedTable)?.capacity} personas
              </Text>
              <Text style={styles.reservationDetailText}>
                📞 Contacto: {phone}
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

      {/* DatePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
          maximumDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 días desde hoy
        />
      )}

      {/* TableSelector Modal */}
      <TableSelector
        visible={showTableSelector}
        onClose={() => setShowTableSelector(false)}
        onTableSelect={(tableId) => {
          setSelectedTable(tableId);
          setShowTableSelector(false);
        }}
        selectedTable={selectedTable}
      />
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
  restaurantCard: {
    margin: 16,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    color: "#6B7280",
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
  dateSelector: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateDisplay: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 8,
    fontWeight: "500",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    minWidth: 80,
    alignItems: "center",
  },
  timeOptionActive: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },
  timeText: {
    fontSize: 14,
    color: "#6B7280",
  },
  timeTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
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
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  infoCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#EFF6FF",
    margin: 16,
    borderRadius: 8,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
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
  confirmButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  confirmButtonTextDisabled: {
    color: "#6B7280",
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
    marginBottom: 16,
  },
  reservationDetails: {
    marginBottom: 24,
  },
  reservationDetailText: {
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  closedMessage: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFBEB",
    borderRadius: 8,
  },
  closedText: {
    fontSize: 16,
    color: "#EF4444",
    marginLeft: 8,
  },
  tableSelector: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableDisplay: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  tableText: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 8,
    fontWeight: "500",
  },
});