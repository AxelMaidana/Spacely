// C:\Users\Usuario\Desktop\Aaron\Spacely\app/(app)/[restaurantId]/_layout.tsx
// Este archivo debe estar DENTRO de app/(app)/[restaurantId]/
import { Stack } from 'expo-router';

export default function RestaurantDetailLayout() {
  return (
    <Stack>
      {/* Las pantallas específicas de este restaurante */}
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Detalles del Restaurante' }} /> {/* Si tienes un index.tsx para la vista base del restaurante */}
      <Stack.Screen name="menu" options={{ headerShown: false, title: 'Menú' }} />
      <Stack.Screen name="reviews" options={{ headerShown: false, title: 'Reseñas' }} />
      <Stack.Screen name="add-review" options={{ headerShown: false, title: 'Añadir Reseña' }} />
    </Stack>
  );
}