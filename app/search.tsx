import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const restaurantesMock = [
  {
    id: '1',
    name: 'La Trattoria',
    category: 'Italiana',
    rating: 4.8,
    distance: '0.5 km',
    image: require('@/assets/images/restaurant1.jpg'),
    featured: true,
  },
  {
    id: '2',
    name: 'Sushi Palace',
    category: 'Japonesa',
    rating: 4.6,
    distance: '1.2 km',
    image: require('@/assets/images/restaurant2.jpg'),
    featured: true,
  },
  {
    id: '3',
    name: 'Burger Factory',
    category: 'Americana',
    rating: 4.3,
    distance: '0.8 km',
    image: require('@/assets/images/restaurant3.jpg'),
    featured: true,
  },
  {
    id: '4',
    name: 'El Asador',
    category: 'Parrilla',
    rating: 4.5,
    distance: '1.5 km',
    image: require('@/assets/images/restaurant4.jpg'),
    featured: true,
  },
];

const ultimasBusquedas = ['La Trattoria', 'Sushi Palace', 'El Asador'];

const repetidos = [
  { id: 'r1', name: 'La Trattoria', icon: require('@/assets/images/restaurant1.jpg') },
  { id: 'r2', name: 'Sushi Palace', icon: require('@/assets/images/restaurant2.jpg') },
  { id: 'r3', name: 'Burger Factory', icon: require('@/assets/images/restaurant3.jpg') },
  { id: 'r4', name: 'El Asador', icon: require('@/assets/images/restaurant4.jpg') },
];

const tendencias = [
  { id: 't1', nombre: 'La Trattoria', categoria: 'Restaurantes' },
  { id: 't2', nombre: 'Sushi', categoria: 'Comida Japonesa' },
  { id: 't3', nombre: 'El Asador', categoria: 'Parrilla' },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [ultimas, setUltimas] = useState(ultimasBusquedas);

  const resultadosFiltrados = restaurantesMock.filter((restaurante) =>
    `${restaurante.name} ${restaurante.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const borrarBusqueda = (item: string) => {
    setUltimas((prev) => prev.filter((x) => x !== item));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#888" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Buscar restaurantes, platos..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />

        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      {searchQuery.trim() === '' ? (
        <ScrollView>
          {/* Últimas búsquedas */}
          <Text style={styles.sectionTitle}>Tus últimas búsquedas</Text>
          {ultimas.map((item) => (
            <View key={item} style={styles.recentItem}>
              <MaterialIcons name="history" size={20} color="#000" />
              <Text style={styles.recentText}>{item}</Text>
              <TouchableOpacity onPress={() => borrarBusqueda(item)} style={{ marginLeft: 'auto' }}>
                <Ionicons name="close" size={20} color="#888" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Repetir donde ya pediste */}
          <Text style={styles.sectionTitle}>Repetí donde ya pediste</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.repeatRow}>
            {repetidos.map((r) => (
              <TouchableOpacity key={r.id} style={styles.repeatItem}>
                <Image source={r.icon} style={styles.repeatIcon} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Tendencias */}
          <Text style={styles.sectionTitle}>Búsquedas que son tendencia</Text>
          {tendencias.map((t, index) => (
            <View key={t.id} style={styles.trendItem}>
              <Text style={styles.trendRank}>#{index + 1}</Text>
              <View>
                <Text style={styles.resultText}>{t.nombre}</Text>
                <Text style={styles.resultSub}>{t.categoria}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={resultadosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultItem}>
              <Image source={item.image} style={{ width: '100%', height: 150, borderRadius: 10 }} />
              <Text style={styles.resultText}>{item.name}</Text>
              <Text style={styles.resultSub}>{item.category} • ⭐ {item.rating} • {item.distance}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.noResults}>No se encontraron resultados.</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 16,
    color: '#000',
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  resultSub: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  noResults: {
    padding: 16,
    textAlign: 'center',
    color: '#888',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  recentText: {
    marginLeft: 10,
    fontSize: 15,
  },
  repeatRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  repeatItem: {
    marginRight: 12,
  },
  repeatIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  trendRank: {
    fontWeight: 'bold',
    width: 30,
    fontSize: 16,
  },
});
