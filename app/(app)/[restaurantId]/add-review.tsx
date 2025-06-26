import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { ArrowLeft, Star } from 'lucide-react-native';
import Input from '@/components/ui/Input'; // Tu componente Input
import Button from '@/components/ui/Button'; // Tu componente Button
import { useAuth } from '@/hooks/useAuth'; // Para obtener el nombre del usuario

export default function AddReviewScreen() {
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
  const { user } = useAuth(); // Obtenemos el usuario autenticado
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Datos simulados de restaurantes para obtener el nombre
  const restaurants = [
    { id: '1', name: 'La Trattoria' },
    { id: '2', name: 'Sushi Palace' },
    { id: '3', name: 'Burger Factory' },
    { id: '4', name: 'El Asador' },
  ];
  const restaurant = restaurants.find(r => r.id === restaurantId);

  // Función para manejar el envío de la reseña
  const handleSubmitReview = async () => {
    if (rating === 0) {
      Alert.alert('Calificación Requerida', 'Por favor, selecciona una calificación en estrellas.');
      return;
    }
    if (comment.trim() === '') {
      Alert.alert('Comentario Requerido', 'Por favor, escribe un comentario para tu reseña.');
      return;
    }

    setIsLoading(true);
    try {
      // Simular el envío de la reseña a un backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula un retraso de red

      const newReview = {
        id: `rev-${Date.now()}`, // ID único simple para la simulación
        user: user?.name || 'Usuario Anónimo', // Usa el nombre del usuario o 'Anónimo'
        rating: rating,
        comment: comment.trim(),
        date: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      };

      console.log('Reseña enviada:', newReview);
      Alert.alert('Éxito', '¡Tu reseña ha sido enviada con éxito!');
      
      // En una aplicación real, aquí podrías:
      // 1. Enviar la reseña a tu API.
      // 2. Refrescar los datos de reseñas en la pantalla anterior (ReviewsScreen).
      // 3. Volver a la pantalla de reseñas.
      router.replace(`/(tabs)/${restaurantId}/reviews`); // Volver a la pantalla de reseñas del restaurante
    } catch (error) {
      console.error('Error al enviar reseña:', error);
      Alert.alert('Error', 'No se pudo enviar la reseña. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

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
          animation: 'slide_from_bottom' // Animación al entrar
        }} 
      />

      {/* Header personalizado con botón de retroceso */}
      <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonHeader}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Añadir Reseña para {restaurant.name}</Text>
        <View style={{ width: 40 }} /> {/* Espaciador para centrar el título */}
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.content}>
        <Text style={styles.sectionTitle}>Tu Calificación</Text>
        <View style={styles.ratingStarsContainer}>
          {[...Array(5)].map((_, i) => (
            <TouchableOpacity 
              key={i} 
              onPress={() => setRating(i + 1)}
              style={styles.starButton}
            >
              <Star 
                size={40} 
                color={i < rating ? COLORS.warning : COLORS.border} 
                fill={i < rating ? COLORS.warning : COLORS.transparent} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Tu Comentario</Text>
        <Input
          placeholder="Escribe tu reseña aquí..."
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
          containerStyle={styles.commentInputContainer}
          style={styles.commentInput}
        />

        <Button
          label={isLoading ? 'Enviando...' : 'Enviar Reseña'}
          onPress={handleSubmitReview}
          disabled={isLoading || rating === 0 || comment.trim() === ''}
          style={styles.submitButton}
        />
      </Animated.View>
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
    fontSize: 20,
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
    marginTop: 16,
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  starButton: {
    paddingHorizontal: 4,
  },
  commentInputContainer: {
    marginBottom: 24,
  },
  commentInput: {
    height: 120, // Altura fija para el área de texto multilínea
    textAlignVertical: 'top', // Para que el texto empiece arriba
    paddingTop: 12, // Ajustar padding para multilínea
    paddingBottom: 12,
  },
  submitButton: {
    width: '100%',
    marginTop: 'auto', // Empuja el botón al final
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