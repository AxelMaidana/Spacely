import { useMemo } from 'react';
import { 
  getAllRestaurants,
  getRestaurantsByCategory,
  getRestaurantsWithDiscount,
  getRestaurantsByRating,
  getRestaurantsByDistance,
  getRestaurantsByPriceRange,
  getRestaurantsByAmenity,
  Restaurant 
} from '@/data/restaurants';

export const useRestaurantFilters = () => {
  const allRestaurants = useMemo(() => getAllRestaurants(), []);

  const getFilteredRestaurants = useMemo(() => ({
    // Filtros básicos
    all: () => allRestaurants,
    byCategory: (category: string) => getRestaurantsByCategory(category),
    withDiscount: () => getRestaurantsWithDiscount(),
    byRating: (minRating: number) => getRestaurantsByRating(minRating),
    byDistance: (maxDistance: number) => getRestaurantsByDistance(maxDistance),
    byPriceRange: (minPrice: number, maxPrice: number) => getRestaurantsByPriceRange(minPrice, maxPrice),
    byAmenity: (amenity: string) => getRestaurantsByAmenity(amenity),

    // Filtros combinados
    topRated: () => getRestaurantsByRating(4.5),
    nearby: () => getRestaurantsByDistance(5),
    budget: () => getRestaurantsByPriceRange(1, 2),
    premium: () => getRestaurantsByPriceRange(3, 4),
    withDelivery: () => getRestaurantsByAmenity('Delivery'),
    withParking: () => getRestaurantsByAmenity('Estacionamiento'),
    withWifi: () => getRestaurantsByAmenity('WiFi'),

    // Filtros específicos por categoría
    bodegones: () => getRestaurantsByCategory('Bodegones'),
    pizzerias: () => getRestaurantsByCategory('Italiana'),
    heladerias: () => getRestaurantsByCategory('Heladerías'),
    cafeterias: () => getRestaurantsByCategory('Cafeterías'),
    postres: () => getRestaurantsByCategory('Postres'),
    parrillas: () => getRestaurantsByCategory('Parrilla'),
    sushi: () => getRestaurantsByCategory('Japonesa'),
    hamburguesas: () => getRestaurantsByCategory('Americana'),
    vegetariana: () => getRestaurantsByCategory('Vegetariana'),
    cervecerias: () => getRestaurantsByCategory('Cervecería'),
    restoBars: () => getRestaurantsByCategory('Resto Bar'),
    francesa: () => getRestaurantsByCategory('Francesa'),
    mexicana: () => getRestaurantsByCategory('Mexicana'),
    bars: () => getRestaurantsByCategory('Bar'),
    gastronomico: () => getRestaurantsByCategory('Gastronómico'),
  }), [allRestaurants]);

  return {
    allRestaurants,
    getFilteredRestaurants,
  };
}; 