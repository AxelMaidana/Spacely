import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform,ScrollView, ActivityIndicator, Image, Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, FadeIn } from 'react-native-reanimated';
import { COLORS } from '@/constants/Colors';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Animaciones
  const circleScale = useSharedValue(4);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    // Animación al montar el componente
    circleScale.value = withTiming(0, {
      duration: 1200,
      easing: Easing.out(Easing.exp)
    });
    
    // Mostrar contenido después
    setTimeout(() => {
      contentOpacity.value = withTiming(1, { duration: 600 });
    }, 300);
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await register(name, email, password);
    } catch (err) {
      setError('Error al registrar. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[COLORS.PRIMARY_COLOR, '#fffbe6', COLORS.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
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
            <Animated.View style={contentStyle} entering={FadeIn.delay(300)}>
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
            <Animated.View 
              style={[styles.formContainer, contentStyle]}
              entering={FadeIn.delay(500)}
            >
              <View style={styles.header}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
              </View>

              <Text style={styles.logoText}>Crear Cuenta</Text>

              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              <Input
                label="Nombre Completo"
                placeholder="Tu nombre completo"
                value={name}
                onChangeText={setName}
                containerStyle={styles.inputContainer}
              />

              <Input
                label="Email"
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
                  <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                    {showPassword ? (
                      <EyeOff size={20} color="#888" />
                    ) : (
                      <Eye size={20} color="#888" />
                    )}
                  </TouchableOpacity>
                }
              />

              <Input
                label="Confirmar Contraseña"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                containerStyle={styles.inputContainer}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowConfirmPassword(prev => !prev)}>
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#888" />
                    ) : (
                      <Eye size={20} color="#888" />
                    )}
                  </TouchableOpacity>
                }
              />

              <Button 
                label={isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                onPress={handleRegister}
                disabled={isLoading}
                style={styles.registerButton}
                icon={isLoading ? <ActivityIndicator size="small" color="#FFF" /> : null}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginText}>Iniciar Sesión</Text>
                  </TouchableOpacity>
                </Link>
              </View>
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
  header: {
    width: '100%',
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
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
  registerButton: {
    borderRadius: 12,
    height: 50,
    backgroundColor: COLORS.PRIMARY_COLOR,
    shadowColor: COLORS.PRIMARY_COLOR,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  loginText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.PRIMARY_COLOR,
  },
});