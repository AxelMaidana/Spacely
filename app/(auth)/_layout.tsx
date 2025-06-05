// C:\Users\Usuario\Desktop\Aaron\Spacely\app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext'; // Asumo que tienes AuthProvider

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        {/* Rutas de autenticación (login, register) */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
        {/* Ruta principal de la aplicación con la barra de navegación */}
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        
        {/* Página 404 (Not Found) */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthProvider>
  );
}