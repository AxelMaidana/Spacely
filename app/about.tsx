import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

export default function AboutAppScreen() {
  const router = useRouter();

  const handleOpenEmail = () => {
    Linking.openURL('mailto:spacelyfood@gmail.com').catch(() =>
      alert('No se pudo abrir el cliente de correo.')
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={28} color={COLORS.PRIMARY_COLOR} />
          </TouchableOpacity>
          <Text style={styles.title}>Acerca de Spacely</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.appName}>Spacely</Text>

          <Text style={styles.description}>
            Spacely es una aplicación que conecta a los usuarios con los mejores restaurantes y promociones cercanas, facilitando asi al cliente para que este se sienta comodo reservando desde el lugar donde se encuentre
          </Text>

          <Text style={styles.sectionTitle}>Contacto</Text>
          <TouchableOpacity onPress={handleOpenEmail}>
            <Text style={styles.link}>spacelyfood@gmail.com</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Créditos</Text>
          <Text style={styles.description}>Desarrollado por estudiantes de UTN.</Text>

          <Text style={styles.sectionTitle}>Agradecimientos</Text>
          <Text style={styles.description}>¡Gracias por usar Spacely!</Text>
        </ScrollView>
      </SafeAreaView>
    </>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.text,
  },
  contentContainer: {
    padding: 20,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: COLORS.text,
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 8,
  },
  link: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.PRIMARY_COLOR,
    marginBottom: 20,
  },
});
