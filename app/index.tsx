import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing
} from 'react-native-reanimated';
import { useAuth } from '@/hooks/useAuth';
import imagePath from '@/constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.8);
  const loaderAnim = useSharedValue(0);
  const backgroundCircleScale = useSharedValue(0);
  const contentOpacity = useSharedValue(1);

  const navigateToNextScreen = () => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(app)/home');
      } else {
        router.replace('/(auth)/login');
      }
    }
  };

  useEffect(() => {
    // Animación principal (logo) - Más lenta
    fadeAnim.value = withSequence(
      withTiming(1, { duration: 1500, easing: Easing.out(Easing.exp) }),
      withDelay(
        2000,
        withTiming(0, { duration: 1000 }, (finished) => {
          if (finished) {
            runOnJS(navigateToNextScreen)();
          }
        })
      )
    );

    scaleAnim.value = withSequence(
      withTiming(1, { duration: 1500, easing: Easing.out(Easing.exp) }),
      withDelay(
        2000,
        withTiming(1.1, { duration: 1000, easing: Easing.out(Easing.exp) })
    ));

    // Animación del loader (después de 1 segundo)
    setTimeout(() => {
      loaderAnim.value = withTiming(1, { 
        duration: 1000,
        easing: Easing.out(Easing.quad)
      });
    }, 1000);

    // Animación del círculo de fondo (después de 3 segundos)
    setTimeout(() => {
      // Primero ocultamos el contenido
      contentOpacity.value = withTiming(0, { duration: 300 });
      
      // Luego expandimos el círculo naranja
      setTimeout(() => {
        backgroundCircleScale.value = withTiming(4, { 
          duration: 3000,
          easing: Easing.out(Easing.exp)
        });
      }, 300);
    }, 3000);
  }, [isLoading, isAuthenticated]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }],
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backgroundCircleScale.value }],
  }));

  const loaderStyle = useAnimatedStyle(() => ({
    opacity: loaderAnim.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Contenido principal (logo, texto, loader) */}
      <Animated.View style={[styles.content, contentStyle]}>
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Image
            source={imagePath.logo}
            style={styles.logo}
            resizeMode='contain'
          />
        </Animated.View>

        {/* Círculo de carga simple */}
        <Animated.View style={[styles.loaderContainer, loaderStyle]}>
          <ActivityIndicator size="large" color="#FFA500" />
        </Animated.View>
      </Animated.View>

      {/* Círculo de fondo expandible - Ahora encima de todo */}
      <Animated.View
        style={[
          styles.backgroundCircle,
          backgroundStyle,
          { zIndex: 10 } // Asegura que esté por encima
        ]}
      />

      {/* Footer - También debe estar detrás del círculo naranja */}
      <Animated.View style={[styles.footer, contentStyle]}>
        <Text style={styles.headFooterText}>from</Text>
        <Text style={styles.footerText}>UTN STUDENTS</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B141A',
    paddingVertical: moderateVerticalScale(40),
    paddingHorizontal: moderateScale(20),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: moderateScale(200),
    height: moderateScale(200),
  },
  loaderContainer: {
    height: moderateVerticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: width * 2,
    height: width * 2,
    backgroundColor: '#FFA500',
    borderRadius: width,
    transform: [{ translateX: -width }, { translateY: -width }],
  },
  footer: {
    alignItems: 'center',
    marginBottom: moderateVerticalScale(40),
  },
  headFooterText: {
    fontSize: moderateScale(12),
    color: 'white',
  },
  footerText: {
    fontSize: moderateScale(16),
    color: 'white',
  },
});