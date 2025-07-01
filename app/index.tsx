import React, { useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView, Image, Dimensions, ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, runOnJS, Easing } from 'react-native-reanimated';
import { useAuth } from '@/hooks/useAuth';
import imagePath from '@/constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

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
        router.replace('/(tabs)/home');
      } else {
        router.replace('/(auth)/login');
      }
    }
  };

  useEffect(() => {
    fadeAnim.value = withSequence(
      withTiming(1, { duration: 1200, easing: Easing.out(Easing.exp) }),
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
      withTiming(1.1, { duration: 1200, easing: Easing.out(Easing.exp) }),
      withDelay(
        2000,
        withTiming(1.2, { duration: 1000, easing: Easing.out(Easing.exp) })
    ));

    setTimeout(() => {
      loaderAnim.value = withTiming(1, { 
        duration: 1000,
        easing: Easing.out(Easing.quad)
      });
    }, 1000);

    setTimeout(() => {
      contentOpacity.value = withTiming(0, { duration: 300 });
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
    shadowColor: COLORS.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
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
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[COLORS.PRIMARY_COLOR, '#fffbe6', COLORS.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {/* Contenido principal */}
      <Animated.View style={[styles.content, contentStyle]}>
        <View style={styles.logoCenterContainer}>
          <View style={styles.logoBgCircle} />
          <Image
            source={imagePath.logo}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>
        <Animated.View style={[styles.loaderContainer, loaderStyle]}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY_COLOR} />
        </Animated.View>
        <Text style={styles.slogan}>¡Tu mesa, tu momento!</Text>
      </Animated.View>
      {/* Círculo de fondo expandible */}
      <Animated.View
        style={[
          styles.backgroundCircle,
          backgroundStyle,
          { zIndex: 10 }
        ]}
      />
      {/* Footer */}
      <Animated.View style={[styles.footer, contentStyle]}>
        <Text style={styles.headFooterText}>de</Text>
        <Text style={styles.footerText}>ESTUDIANTES UTN</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(140),
    height: moderateScale(140),
    marginBottom: 32,
  },
  logoBgCircle: {
    position: 'absolute',
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    backgroundColor: COLORS.PRIMARY_COLOR_DARK,
    opacity: 0.92,
    zIndex: 0,
    shadowColor: COLORS.PRIMARY_COLOR_DARK,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 32,
    elevation: 18,
  },
  logo: {
    width: moderateScale(170),
    height: moderateScale(170),
    zIndex: 1,
  },
  loaderContainer: {
    height: moderateVerticalScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  backgroundCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: width * 2,
    height: width * 2,
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: width,
    transform: [{ translateX: -width }, { translateY: -width }],
  },
  footer: {
    alignItems: 'center',
    marginBottom: moderateVerticalScale(40),
  },
  headFooterText: {
    fontSize: moderateScale(12),
    color: COLORS.PRIMARY_COLOR_DARK,
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  footerText: {
    fontSize: moderateScale(16),
    color: COLORS.PRIMARY_COLOR_DARK,
    fontFamily: 'Inter-Bold',
    letterSpacing: 2,
  },
  slogan: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.PRIMARY_COLOR_DARK,
    marginTop: 0,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});