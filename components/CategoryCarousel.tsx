import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { getAllCategories } from '@/data/categories';

const { width } = Dimensions.get('window');

const categoryIcons = [
  { id: '1', icon: '🍔', name: 'Hamburgueserías' },
  { id: '2', icon: '🍦', name: 'Heladerías' },
  { id: '3', icon: '🍕', name: 'Pizzerías' },
  { id: '4', icon: '🍣', name: 'Sushi' },
  { id: '5', icon: '🥩', name: 'Parrillas' },
  { id: '6', icon: '🥗', name: 'Vegano' },
  { id: '7', icon: '☕', name: 'Cafeterías' },
  { id: '8', icon: '🍰', name: 'Postres' },
];

export const CategoryCarousel = () => {
  const categories = getAllCategories();
  
  // Dividir las categorías en dos filas
  const firstRow = categoryIcons.slice(0, 4);
  const secondRow = categoryIcons.slice(4, 8);

  const handleCategoryPress = (categoryId: string) => {
    // Mapear las categorías a los filtros correspondientes
    const filterMap: { [key: string]: string } = {
      '1': 'hamburguesas', // Hamburgueserías
      '2': 'heladerias',   // Heladerías
      '3': 'pizzerias',    // Pizzerías
      '4': 'sushi',        // Sushi
      '5': 'parrillas',    // Parrillas
      '6': 'vegetariana',  // Vegano
      '7': 'cafeterias',   // Cafeterías
      '8': 'postres',      // Postres
    };
    
    const filterType = filterMap[categoryId];
    if (filterType) {
      router.push(`/restobars?filter=${filterType}` as any);
    } else {
      // Si no hay filtro específico, navegar a todos
      router.push('/restobars?filter=all' as any);
    }
  };

  const handleSeeAll = () => {
    // Navegar a la vista de restobars con todos los restaurantes
    router.push('/restobars?filter=all' as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¿Qué estás buscando?</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAll}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View>
          <View style={styles.row}>
            {firstRow.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.category}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text style={styles.icon}>{category.icon}</Text>
                <Text style={styles.name}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.row}>
            {secondRow.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.category}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text style={styles.icon}>{category.icon}</Text>
                <Text style={styles.name}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  category: {
    width: (width - 60) / 4,
    marginHorizontal: 5,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: 24,
    marginBottom: 5,
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
});