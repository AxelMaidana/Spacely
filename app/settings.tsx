import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { Bell, Moon, Shield, CircleHelp as HelpCircle, Info, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [biometrics, setBiometrics] = useState(false);
  const router = useRouter();

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleBiometrics = () => setBiometrics(prev => !prev);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back} style={{ marginRight: 16 }}>
          <ArrowLeft size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Configuración</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Animated.View 
          entering={FadeInUp.delay(200).duration(500)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Preferencias</Text>
          <TouchableOpacity
            style={[styles.settingButton, { paddingHorizontal: 0 }]}
            onPress={() => router.push('/notifications')}
          >
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={COLORS.PRIMARY_COLOR} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notificaciones</Text>
              <Text style={styles.settingDescription}>Ver configuración de notificaciones</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Moon size={20} color={COLORS.PRIMARY_COLOR} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Modo oscuro</Text>
              <Text style={styles.settingDescription}>Activar tema oscuro</Text>
            </View>
            <Switch
              trackColor={{ false: COLORS.border, true: COLORS.PRIMARY_COLOR_DARK }}
              thumbColor={darkMode ? COLORS.PRIMARY_COLOR : COLORS.textTertiary}
              onValueChange={toggleDarkMode}
              value={darkMode}
            />
          </View>
        </Animated.View>
        <Animated.View 
          entering={FadeInUp.delay(300).duration(500)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Seguridad</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={COLORS.PRIMARY_COLOR} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Inicio biométrico</Text>
              <Text style={styles.settingDescription}>Iniciar sesión con Face ID o Touch ID</Text>
            </View>
            <Switch
              trackColor={{ false: COLORS.border, true: COLORS.PRIMARY_COLOR_DARK }}
              thumbColor={biometrics ? COLORS.PRIMARY_COLOR : COLORS.textTertiary}
              onValueChange={toggleBiometrics}
              value={biometrics}
            />
          </View>
          <TouchableOpacity 
            style={styles.settingButton}
            onPress={() => router.push('/changePassword')}
          >
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={COLORS.PRIMARY_COLOR} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Cambiar contraseña</Text>
              <Text style={styles.settingDescription}>Actualiza tu contraseña</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View 
          entering={FadeInUp.delay(400).duration(500)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Acerca de</Text>
          <TouchableOpacity 
            style={styles.settingButton}
            onPress={() => router.push('/help')}
          >
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={COLORS.PRIMARY_COLOR} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Ayuda y soporte</Text>
              <Text style={styles.settingDescription}>Obtén ayuda con la app</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => router.push('/about')}
          >
            <View style={styles.settingIconContainer}>
              <Info size={20} color={COLORS.PRIMARY_COLOR} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Sobre la app</Text>
              <Text style={styles.settingDescription}>Versión 1.0.0</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: COLORS.text,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});