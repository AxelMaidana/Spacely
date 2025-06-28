import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native'; // Icono de flecha

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const NotificationsScreen = () => {
  const [promociones, setPromociones] = useState(true);
  const [estadoPedidos, setEstadoPedidos] = useState(true);
  const [novedades, setNovedades] = useState(true);

  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container}>
  <View style={styles.header}>
    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
      <ChevronLeft size={28} color={COLORS.PRIMARY_COLOR} />
    </TouchableOpacity>
  </View>

  <Text style={styles.title}>Notificaciones</Text>

  <Text style={styles.subTitle}>
    Podrás personalizar las siguientes notificaciones como usted lo desee:
  </Text>



        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Promociones</Text>
              <Text style={styles.settingDescription}>
                Recibí notificaciones sobre descuentos y ofertas.
              </Text>
            </View>
            <Switch
              trackColor={{ false: COLORS.border, true: COLORS.PRIMARY_COLOR_DARK }}
              thumbColor={promociones ? COLORS.PRIMARY_COLOR : COLORS.textTertiary}
              onValueChange={setPromociones}
              value={promociones}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Estado de Pedidos</Text>
              <Text style={styles.settingDescription}>
                Te avisamos cuando tu pedido esté en camino o entregado.
              </Text>
            </View>
            <Switch
              trackColor={{ false: COLORS.border, true: COLORS.PRIMARY_COLOR_DARK }}
              thumbColor={estadoPedidos ? COLORS.PRIMARY_COLOR : COLORS.textTertiary}
              onValueChange={setEstadoPedidos}
              value={estadoPedidos}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Novedades</Text>
              <Text style={styles.settingDescription}>
                Enterate de nuevas funcionalidades y mejoras en la app.
              </Text>
            </View>
            <Switch
              trackColor={{ false: COLORS.border, true: COLORS.PRIMARY_COLOR_DARK }}
              thumbColor={novedades ? COLORS.PRIMARY_COLOR : COLORS.textTertiary}
              onValueChange={setNovedades}
              value={novedades}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

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
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: COLORS.text,
    marginLeft: 26,
  },
  subTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 7,
    color: COLORS.textSecondary,
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default NotificationsScreen;
