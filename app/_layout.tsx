import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { CartProvider } from '@/contexts/CartContext';
import { ReservationsProvider } from '@/contexts/ReservationsContext';
import { PointsProvider } from '@/contexts/PointsContext';
import { COLORS } from '@/constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);


  return (
    <PointsProvider>
      <ReservationsProvider>
        <CartProvider>
          <AuthProvider>
            <FavoritesProvider>
              <Stack screenOptions={{ 
                headerShown: false,
                animation: 'fade_from_bottom',
                contentStyle: {
                  backgroundColor: COLORS.background,
                }
              }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
                <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
                <Stack.Screen 
                  name="notifications" 
                  options={{ 
                    presentation: 'card',
                    headerShown: true,
                  }} 
                />
                <Stack.Screen 
                  name="my-reservations" 
                  options={{ 
                    presentation: 'card',
                    headerShown: false,
                  }} 
                />
                <Stack.Screen 
                  name="points" 
                  options={{ 
                    presentation: 'card',
                    headerShown: false,
                  }} 
                />
              </Stack>
              <StatusBar style="auto" />
            </FavoritesProvider>
          </AuthProvider>
        </CartProvider>
      </ReservationsProvider>
    </PointsProvider>
  );
}