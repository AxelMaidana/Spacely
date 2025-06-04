import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import {
  Home,
  MapPin,
  Search,
  Martini,
  User,
  Compass
  ,
} from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const TABBAR_HEIGHT = 60;
  const FLOATING_MARGIN = 10;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: TABBAR_HEIGHT,
          bottom: FLOATING_MARGIN + insets.bottom, // Espacio flotante + SafeArea
          paddingBottom: 0, // No necesitamos padding interno
          
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.exploreButton}>
              <Compass 
                size={28} 
                color={focused ? COLORS.PRIMARY_COLOR : COLORS.white}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="restobars"
        options={{
          tabBarIcon: ({ color, size }) => <Martini size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: 35,
    backgroundColor: 'rgba(250, 249, 249, 0.99)', // Fondo glass
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: 'rgba(173, 173, 173, 0.96)',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  exploreButton: {
    top: -30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
    elevation: 10,
    borderWidth: 4,
    borderColor: '#fff',
  },
});