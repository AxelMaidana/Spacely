import React, { useState, useMemo } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { restaurants, Restaurant } from '@/data/restaurants';
import { COLORS } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();

  const filteredResults = useMemo(() => 
    restaurants.filter(restaurant =>
      `${restaurant.title} ${restaurant.category} ${restaurant.subtitle || ''}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ), [searchQuery]
  );

  const removeRecentSearch = (search: string) => {
    setRecentSearches(prev => prev.filter(s => s !== search));
  };

  const addToRecentSearches = (search: string) => {
    if (search.trim() && !recentSearches.includes(search)) {
      setRecentSearches(prev => [search, ...prev.slice(0, 4)]);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      addToRecentSearches(query);
    }
  };

  const renderSearchHeader = () => (
    <View style={styles.searchBar}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Buscar restaurantes, platos..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={handleSearch}
        autoFocus
      />
      <TouchableOpacity style={styles.searchButton}>
        <MaterialIcons name="search" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );

  const renderRecentSearches = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Tus últimas búsquedas</Text>
      {recentSearches.length > 0 ? (
        recentSearches.map((search, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.recentItem}
            onPress={() => handleSearch(search)}
          >
            <MaterialIcons name="history" size={20} color="#666" />
            <Text style={styles.recentText}>{search}</Text>
            <TouchableOpacity 
              onPress={() => removeRecentSearch(search)} 
              style={styles.removeButton}
            >
              <Ionicons name="close" size={18} color="#999" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>No hay búsquedas recientes</Text>
      )}
    </View>
  );

  const renderRepeatSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Repetí donde ya pediste</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.repeatRow}>
        {restaurants.slice(0, 4).map((restaurant) => (
          <TouchableOpacity 
            key={restaurant.id} 
            style={styles.repeatItem}
            onPress={() => router.push(`/restaurant/${restaurant.id}`)}
          >
            <Image source={restaurant.image} style={styles.repeatIcon} />
            <Text style={styles.repeatText}>{restaurant.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderTrends = () => {
    // Obtener restaurantes con descuento como tendencias
    const trendingRestaurants = restaurants.filter(r => r.discount).slice(0, 3);
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Búsquedas que son tendencia</Text>
        {trendingRestaurants.map((restaurant, index) => (
          <TouchableOpacity 
            key={restaurant.id} 
            style={styles.trendItem}
            onPress={() => router.push(`/restaurant/${restaurant.id}`)}
          >
            <View style={styles.trendRank}>
              <Text style={styles.trendRankText}>#{index + 1}</Text>
            </View>
            <View style={styles.trendContent}>
              <Text style={styles.trendName}>{restaurant.title}</Text>
              <Text style={styles.trendCategory}>{restaurant.category}</Text>
            </View>
            <Ionicons name="trending-up" size={16} color="#FF6B6B" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderSearchResult = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => router.push(`/restaurant/${item.id}`)}
    >
      <Image source={item.image} style={styles.resultImage} />
      <View style={styles.resultContent}>
        <Text style={styles.resultName}>{item.title}</Text>
        <Text style={styles.resultDetails}>
          {item.category} • ⭐ {item.rating} • {item.distance}
        </Text>
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderSearchHeader()}
      
      {searchQuery.trim() === '' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderRecentSearches()}
          {renderRepeatSection()}
          {renderTrends()}
        </ScrollView>
      ) : (
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.id}
          renderItem={renderSearchResult}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#CCC" />
              <Text style={styles.emptyText}>No se encontraron resultados</Text>
              <Text style={styles.emptySubtext}>Intenta con otros términos de búsqueda</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  backButton: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 16,
    color: '#333',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    paddingVertical: 8,
  },
  recentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    padding: 4,
  },
  repeatRow: {
    paddingHorizontal: 20,
  },
  repeatItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  repeatIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 8,
  },
  repeatText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    maxWidth: 60,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 8,
  },
  trendRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  trendRankText: {
    color: COLORS.background,
    fontWeight: '700',
    fontSize: 14,
  },
  trendContent: {
    flex: 1,
  },
  trendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  trendCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  resultItem: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  resultImage: {
    width: '100%',
    height: 160,
  },
  resultContent: {
    padding: 16,
  },
  resultName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  resultDetails: {
    fontSize: 14,
    color: '#666',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#CCC',
    marginTop: 8,
  },
});

export default SearchScreen;
