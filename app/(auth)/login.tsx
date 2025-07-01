import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, FadeIn } from 'react-native-reanimated';
import { COLORS } from '@/constants/Colors';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Animaciones
  const circleScale = useSharedValue(4);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    // Animación al montar el componente
    circleScale.value = withTiming(0, {
      duration: 3200,
      easing: Easing.out(Easing.exp)
    });
    
    // Mostrar contenido después
    setTimeout(() => {
      contentOpacity.value = withTiming(1, { duration: 600 });
    }, 300);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('El correo y la contraseña son necesarios');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('Correo o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[COLORS.PRIMARY_COLOR, '#fffbe6', COLORS.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {/* Círculo naranja que se contrae */}
      <Animated.View style={[
        styles.backgroundCircle,
        circleStyle,
        { backgroundColor: COLORS.PRIMARY_COLOR, zIndex: 1 }
      ]} />
      <KeyboardAvoidingView 
        behavior={'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.centerContainer}>
            {/* Logo de la app */}
            <Animated.View entering={FadeIn.delay(300)}>
              <View style={styles.logoCenterContainer}>
                <View style={styles.logoBgCircle} />
                <Image
                  source={require('@/assets/images/spacely1.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </Animated.View>

            {/* Formulario */}
            <Animated.View entering={FadeIn.delay(500)}>
              <Animated.View 
                style={[styles.formContainer]}
                entering={FadeIn.delay(500)}
              >
                {error ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}

                <Text style={styles.appTagline}>Descubre los mejores restaurantes</Text>

                <Input
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  containerStyle={styles.inputContainer}
                />

                <Input
                  label="Contraseña"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  containerStyle={styles.inputContainer}
                  rightIcon={
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      {showPassword ? (
                        <EyeOff size={20} color="#888" />
                      ) : (
                        <Eye size={20} color="#888" />
                      )}
                    </TouchableOpacity>
                  }
                />

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                <Button 
                  label={isLoading ? "Ingresando..." : "Iniciar sesión"}
                  onPress={handleLogin}
                  disabled={isLoading}
                  style={styles.loginButton}
                  icon={isLoading ? <ActivityIndicator size="small" color="#FFF" /> : null}
                />

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>¿No tienes una cuenta? </Text>
                  <Link href="/(auth)/register" asChild>
                    <TouchableOpacity>
                      <Text style={styles.signupLink}>Regístrate</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </Animated.View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height - 100,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    marginBottom: 12,
    position: 'relative',
  },
  logoBgCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.PRIMARY_COLOR_DARK,
    opacity: 0.92,
    zIndex: 0,
    shadowColor: COLORS.PRIMARY_COLOR_DARK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  logoImage: {
    width: 140,
    height: 140,
    zIndex: 1,
  },
  appTagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.background,
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  inputContainer: {
    borderRadius: 12,
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.PRIMARY_COLOR,
  },
  loginButton: {
    borderRadius: 12,
    height: 50,
    shadowColor: COLORS.PRIMARY_COLOR,
    backgroundColor: COLORS.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#D32F2F',
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.PRIMARY_COLOR,
  },
  backgroundCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    transform: [{ translateX: -width }, { translateY: -width }],
    zIndex: 0,
  },
});