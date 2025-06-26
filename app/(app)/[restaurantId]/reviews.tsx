import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { ArrowLeft, Star, Plus } from 'lucide-react-native'; // Iconos de Lucide

// Datos simulados de reseñas para diferentes restaurantes
const mockReviews = {
  '1': [ // Reseñas para La Trattoria
    { id: 'rev1', user: 'Ana G.', rating: 5, comment: 'Excelente pasta, el mejor tiramisú que he probado!', date: '2024-05-20' },
    { id: 'rev2', user: 'Carlos M.', rating: 4, comment: 'Buen ambiente y servicio, la pizza es decente.', date: '2024-05-18' },
    { id: 'rev3', user: 'Elena P.', rating: 5, comment: 'Un lugar increíble para cenar, ¡muy recomendado!', date: '2024-05-15' },
    { id: 'rev4', user: 'Juan D.', rating: 4, comment: 'La lasaña es espectacular, pero el lugar es un poco ruidoso.', date: '2024-05-10' },
  ],
  '2': [ // Reseñas para Sushi Palace
    { id: 'rev5', user: 'Sofía R.', rating: 5, comment: 'El sushi más fresco y delicioso. Mi lugar favorito.', date: '2024-05-22' },
    { id: 'rev6', user: 'Pedro L.', rating: 4, comment: 'Buena calidad, pero un poco caro. La tempura es top.', date: '2024-05-19' },
  ],
  '3': [ // Reseñas para Burger Factory
    { id: 'rev7', user: 'Laura S.', rating: 3, comment: 'Hamburguesa normal, nada del otro mundo. Las patatas sí están buenas.', date: '2024-05-21' },
    { id: 'rev8', user: 'Diego V.', rating: 4, comment: 'Ideal para una comida rápida. Buen tamaño y sabor.', date: '2024-05-17' },
  ],
  '4': [ // Reseñas para El Asador
    { id: 'rev9', user: 'Marta F.', rating: 5, comment: 'La carne es increíble, se deshace en la boca. Volveré seguro!', date: '2024-05-23' },
    { id: 'rev10', user: 'Ricardo C.', rating: 4, comment: 'Auténtica parrilla argentina. El servicio un poco lento.', date: '2024-05-16' },
  ]
};

// Datos simulados de restaurantes para obtener el nombre
const restaurants = [
  { id: '1', name: 'La Trattoria', rating: 4.8 },
  { id: '2', name: 'Sushi Palace', rating: 4.6 },
  { id: '3', name: 'Burger Factory', rating: 4.3 },
  { id: '4', name: 'El Asador', rating: 4.5 },
];


export default function RestaurantReviewsScreen() {
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
  const reviews = mockReviews[restaurantId as keyof typeof mockReviews] || [];
  const restaurant = restaurants.find(r => r.id === restaurantId);

  // Calcula el promedio de calificaciones
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Restaurante no encontrado.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right' // Animación al entrar
        }} 
      />

      {/* Header personalizado con botón de retroceso */}
      <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonHeader}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Reseñas de {restaurant.name}</Text>
        <View style={{ width: 40 }} /> {/* Espaciador para centrar el título */}
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Resumen de Calificaciones */}
        <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Calificación General</Text>
          <View style={styles.ratingOverview}>
            <Text style={styles.averageRatingText}>{averageRating}</Text>
            <Star size={30} color={COLORS.PRIMARY_COLOR} fill={COLORS.PRIMARY_COLOR} />
            <Text style={styles.totalReviewsText}>({reviews.length} reseñas)</Text>
          </View>
        </Animated.View>

        {/* Sección de Reseñas Individuales */}
        <Animated.View entering={FadeInUp.delay(250).duration(500)} style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Todas las Reseñas</Text>
            {/* Botón para agregar reseña */}
            <TouchableOpacity 
              style={styles.addReviewButton}
              onPress={() => router.push(`/(app)/${restaurantId}/add-review`)} // Navega a la pantalla de agregar reseña
            >
              <Plus size={18} color={COLORS.white} />
              <Text style={styles.addReviewButtonText}>Añadir</Text>
            </TouchableOpacity>
          </View>
          
          {reviews.length > 0 ? (
            <FlatList
              data={reviews}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewUser}>{item.user}</Text>
                    <View style={styles.reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          color={i < item.rating ? COLORS.warning : COLORS.textTertiary} 
                          fill={i < item.rating ? COLORS.warning : COLORS.transparent} 
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{item.comment}</Text>
                  <Text style={styles.reviewDate}>{item.date}</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.reviewSeparator} />}
            />
          ) : (
            <Text style={styles.noReviewsText}>No hay reseñas todavía. ¡Sé el primero en añadir una!</Text>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  backButtonHeader: {
    padding: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 10,
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  averageRatingText: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: COLORS.PRIMARY_COLOR,
    marginRight: 8,
  },
  totalReviewsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  reviewsSection: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addReviewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 6,
  },
  reviewCard: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12, // Espacio entre reseñas
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.text,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  reviewDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textTertiary,
    textAlign: 'right',
  },
  reviewSeparator: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  noReviewsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingVertical: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.error,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.white,
  },
});