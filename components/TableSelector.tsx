import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import restobarPlane from '../assets/images/restobarPlane.webp';

interface Table {
  id: number;
  x: number; // posición X en porcentaje
  y: number; // posición Y en porcentaje
  capacity: number;
  isAvailable: boolean;
}

interface TableSelectorProps {
  visible: boolean;
  onClose: () => void;
  onTableSelect: (tableId: number) => void;
  selectedTable: number | null;
}

// Configuración de las mesas (posiciones en porcentaje del contenedor)
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

export default function TableSelector({ 
  visible, 
  onClose, 
  onTableSelect, 
  selectedTable 
}: TableSelectorProps) {
  const handleTablePress = (table: Table) => {
    if (table.isAvailable) {
      onTableSelect(table.id);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Seleccionar Mesa</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Leyenda */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.available]} />
              <Text style={styles.legendText}>Disponible</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.selected]} />
              <Text style={styles.legendText}>Seleccionada</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.occupied]} />
              <Text style={styles.legendText}>Ocupada</Text>
            </View>
          </View>

          {/* Mapa del restaurante */}
          <View style={styles.restaurantMap}>
            {/* Imagen de fondo del restaurante */}
            <Image source={restobarPlane} style={styles.backgroundImage} resizeMode="cover" />

            {/* Mesas */}
            {tables.map((table) => (
              <TouchableOpacity
                key={table.id}
                style={[
                  styles.table,
                  {
                    left: `${table.x}%`,
                    top: `${table.y}%`,
                    transform: [
                      { translateX: -10 },
                      { translateY: -10 },
                      ...(selectedTable === table.id ? [{ scale: 1.1 }] : []),
                    ],
                  },
                  selectedTable === table.id && styles.tableSelected,
                  !table.isAvailable && styles.tableOccupied,
                ]}
                onPress={() => handleTablePress(table)}
                disabled={!table.isAvailable}
              >
                <Text style={[
                  styles.tableText,
                  selectedTable === table.id && styles.tableTextSelected,
                  !table.isAvailable && styles.tableTextOccupied,
                ]}>
                  {table.id}
                </Text>
                <Text style={[
                  styles.capacityText,
                  selectedTable === table.id && styles.capacityTextSelected,
                  !table.isAvailable && styles.capacityTextOccupied,
                ]}>
                  {table.capacity}
                </Text>
              </TouchableOpacity>
            ))}

          </View>

          {/* Información de la mesa seleccionada */}
          {selectedTable && (
            <View style={styles.tableInfo}>
              <Text style={styles.tableInfoTitle}>
                Mesa {selectedTable} seleccionada
              </Text>
              <Text style={styles.tableInfoCapacity}>
                Capacidad: {tables.find(t => t.id === selectedTable)?.capacity} personas
              </Text>
            </View>
          )}

          {/* Botón de confirmar */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              !selectedTable && styles.confirmButtonDisabled
            ]}
            onPress={onClose}
            disabled={!selectedTable}
          >
            <Text style={[
              styles.confirmButtonText,
              !selectedTable && styles.confirmButtonTextDisabled
            ]}>
              Confirmar Mesa
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 60,
    marginBottom: 60,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  available: {
    backgroundColor: '#10B981',
  },
  selected: {
    backgroundColor: '#FF6B35',
  },
  occupied: {
    backgroundColor: '#EF4444',
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  restaurantMap: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    overflow: 'hidden',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  table: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableSelected: {
    backgroundColor: '#FF6B35',
  },
  tableOccupied: {
    backgroundColor: '#EF4444',
  },
  tableText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  tableTextSelected: {
    color: '#fff',
  },
  tableTextOccupied: {
    color: '#fff',
  },
  capacityText: {
    fontSize: 8,
    color: '#fff',
    marginTop: -2,
  },
  capacityTextSelected: {
    color: '#fff',
  },
  capacityTextOccupied: {
    color: '#fff',
  },
  element: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  entrance: {
    backgroundColor: '#DBEAFE',
  },
  kitchen: {
    backgroundColor: '#FEE2E2',
  },
  bar: {
    backgroundColor: '#FEF3C7',
  },
  elementText: {
    fontSize: 10,
    color: '#374151',
    fontWeight: '500',
  },
  tableInfo: {
    padding: 16,
    backgroundColor: '#F0FDF4',
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  tableInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#065F46',
  },
  tableInfoCapacity: {
    fontSize: 14,
    color: '#047857',
    marginTop: 4,
  },
  confirmButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButtonTextDisabled: {
    color: '#6B7280',
  },
}); 