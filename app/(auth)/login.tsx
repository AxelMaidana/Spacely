import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView, 
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { Link, router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  Easing,
  FadeIn
} from 'react-native-reanimated';
import { COLORS } from '@/constants/Colors';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react-native';

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
      duration: 5200,
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
    <View style={styles.backgroundContainer}>
      {/* Círculo naranja que se contrae */}
      <Animated.View style={[
        styles.backgroundCircle, 
        circleStyle,
        { backgroundColor: COLORS.PRIMARY_COLOR }
      ]} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.centerContainer}>
            {/* Logo de la app */}
            <Animated.View entering={FadeIn.delay(300)}>
              <Animated.View 
                style={[styles.logoContainer]}
                entering={FadeIn.delay(300)}
              >
                <Image
                  source={require('@/assets/images/spacely1.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </Animated.View>
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

                <Text style={styles.appTagline}>Discover the best restaurants</Text>

                <Input
                  label="Email"
                  placeholder="your@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  containerStyle={styles.inputContainer}
                />

                <Input
                  label="Password"
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
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button 
                  label={isLoading ? "Signing in..." : "Sign In"}
                  onPress={handleLogin}
                  disabled={isLoading}
                  style={styles.loginButton}
                  icon={isLoading ? <ActivityIndicator size="small" color="#FFF" /> : null}
                />

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account? </Text>
                  <Link href="/(auth)/register" asChild>
                    <TouchableOpacity>
                      <Text style={styles.signupLink}>Sign Up</Text>
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
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height - 100, // Asegura que ocupe toda la pantalla
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backgroundCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    transform: [{ translateX: -width }, { translateY: -width }],
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImage: {
    width: 180,
    height: 180,
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
    backgroundColor: '#FFF',
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
});