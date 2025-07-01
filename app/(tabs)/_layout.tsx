import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { House, Heart, MapPin, List, User } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

function TabBarIcon({ 
  name, 
  color, 
  focused 
}: { 
  name: string; 
  color: string; 
  focused: boolean; 
}) {
  const IconComponent = {
    home: House,
    favorites: Heart,
    map: MapPin,
    restobars: List,
    profile: User,
  }[name];

  if (!IconComponent) return null;

  return (
    <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
      <IconComponent 
        size={name === 'map' ? 28 : 24} 
        color={color} 
        strokeWidth={focused ? 2.5 : 2}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.PRIMARY_COLOR,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="favorites" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.mapButton, focused && styles.mapButtonFocused]}>
              <MapPin size={28} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="restobars"
        options={{
          title: 'Lugares',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="restobars" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="profile" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginTop: 4,
  },
  tabBarIcon: {
    marginBottom: -4,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  mapButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: COLORS.PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  mapButtonFocused: {
    backgroundColor: '#E55A2B',
    transform: [{ scale: 1.05 }],
  },
});