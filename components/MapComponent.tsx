import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Restaurant } from '@/data/restaurants';
import { COLORS } from '@/constants/Colors';

interface MapComponentProps {
  initialRegion: any;
  filteredRestaurants: Restaurant[];
  handleRestaurantPress: (restaurant: Restaurant) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  initialRegion, 
  filteredRestaurants, 
  handleRestaurantPress 
}) => {
  // Import dinámico solo para móvil
  const MapView = require('react-native-maps').default;
  const { Marker, PROVIDER_GOOGLE } = require('react-native-maps');

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={initialRegion}
    >
      {filteredRestaurants.map((restaurant) => {
        const coordinates = restaurant.location?.coordinates || { lat: -27.4512, lng: -58.9866 };
        return (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: coordinates.lat,
              longitude: coordinates.lng,
            }}
            title={restaurant.title}
            onPress={() => handleRestaurantPress(restaurant)}
          >
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Image 
                  source={restaurant.image} 
                  style={styles.markerImage}
                  resizeMode="cover"
                />
                {restaurant.discount && (
                  <View style={styles.discountBadge}>
                    <MaterialIcons name="local-offer" size={8} color="#FFFFFF" />
                  </View>
                )}
              </View>
            </View>
          </Marker>
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 2,
    borderWidth: 2,
    borderColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    width: 40,
    height: 40,
  },
  markerImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  discountBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: COLORS.background,
  },
});

export default MapComponent; 