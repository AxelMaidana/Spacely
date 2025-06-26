// C:\Users\Usuario\Desktop\Aaron\Spacely\app/(app)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Chrome as HomeIcon, User, Settings } from 'lucide-react-native'; 
import { COLORS } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY_COLOR, // Corregido el nombre de la propiedad
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false, // Oculta el header por defecto para todas las pantallas de las pestañas
        tabBarShowLabel: true,
      }}
    >
      {/* Pestañas principales */}
      <Tabs.Screen
        name="home" // Apunta a app/(app)/home.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // Apunta a app/(app)/profile.tsx
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings" // Apunta a app/(app)/settings.tsx
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />

      {/* Rutas de Restaurante: NO las definimos como Tabs.Screen aquí.
          Expo Router las manejará como pantallas que se abren desde estas pestañas.
          Cuando navegues a una ruta como /restaurant/[id]/menu, la barra de pestañas
          permanecerá visible.
      */}
      <Tabs.Screen
        name="[restaurantId]" // Esto capturará rutas como /(app)/123, /(app)/123/menu, etc.
        options={{
          href: null, // MUY IMPORTANTE: Esto oculta esta "pestaña" de la barra de navegación
          headerShown: false, // Oculta el encabezado para estas rutas también si las tienen
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.card,
    borderTopColor: COLORS.border,
    elevation: 0,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});