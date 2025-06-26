import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native'; // Importa el icono

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const HelpScreen = () => {
  const navigation = useNavigation();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSection(prev => (prev === section ? null : section));
  };

  const handleSendEmail = async () => {
    const email = 'spacelyfood@gmail.com';
    const subject = encodeURIComponent('Soporte SpacelyFood');
    const body = encodeURIComponent('Hola, necesito ayuda con...');
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    try {
      const supported = await Linking.canOpenURL(mailtoUrl);
      if (supported) {
        await Linking.openURL(mailtoUrl);
      } else {
        Alert.alert('Error', 'No se pudo abrir el cliente de correo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar enviar el correo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER CON FLECHA */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* TÍTULO ABAJO DE LA FLECHA */}
      <Text style={styles.title}>Centro de Ayuda</Text>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* TODO EL CONTENIDO SIGUE IGUAL */}
        <TouchableOpacity onPress={() => toggleSection('faq')} style={styles.sectionButton}>
          <Text style={styles.sectionText}>Preguntas Frecuentes</Text>
        </TouchableOpacity>
        {openSection === 'faq' && (
          <View style={styles.subSection}>
            {[{
              question: '¿Cómo crear una cuenta?',
              answer: 'Para crear una cuenta, haga clic en "Registrarse" y complete el formulario.',
            },
            {
              question: '¿Cómo recuperar mi contraseña?',
              answer: 'Utilice "Olvidé mi contraseña" en la pantalla de inicio de sesión.',
            },
            {
              question: '¿Dónde puedo ver mis pedidos?',
              answer: 'En la pestaña "Pedidos" dentro de la app.',
            }].map((item, idx) => (
              <View key={idx} style={styles.faqItem}>
                <Text style={styles.question}>{item.question}</Text>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Pedidos */}
        <TouchableOpacity onPress={() => toggleSection('pedidos')} style={styles.sectionButton}>
          <Text style={styles.sectionText}>Pedidos</Text>
        </TouchableOpacity>
        {openSection === 'pedidos' && (
          <View style={styles.subSection}>
            <Text style={styles.question}>Pedidos en curso</Text>
            <Text style={styles.answer}>Aquí se mostrarán los pedidos actualmente en proceso.</Text>
            <Text style={styles.question}>Pedidos anteriores</Text>
            <Text style={styles.answer}>Historial de tus pedidos anteriores.</Text>
          </View>
        )}

        {/* Pagos */}
        <TouchableOpacity onPress={() => toggleSection('pagos')} style={styles.sectionButton}>
          <Text style={styles.sectionText}>Pagos</Text>
        </TouchableOpacity>
        {openSection === 'pagos' && (
          <View style={styles.subSection}>
            <Text style={styles.question}>Problemas con pagos</Text>
            <Text style={styles.answer}>Revisa si tu tarjeta o medio de pago fue rechazado.</Text>
            <Text style={styles.question}>Devoluciones</Text>
            <Text style={styles.answer}>Podés solicitar una devolución desde el detalle del pedido.</Text>
          </View>
        )}

        {/* Mis consultas */}
        <TouchableOpacity
          onPress={() => toggleSection('misConsultas')}
          style={styles.sectionButton}
        >
          <Text style={styles.sectionText}>Mis consultas</Text>
        </TouchableOpacity>

        {openSection === 'misConsultas' && (
          <View style={styles.subSection}>
            <Text style={styles.noConsultasText}>Todavía no has hecho ninguna consulta.</Text>
          </View>
        )}

        {/* Seguridad en mi cuenta */}
        <TouchableOpacity onPress={() => toggleSection('seguridad')} style={styles.sectionButton}>
          <Text style={styles.sectionText}>Seguridad en mi cuenta</Text>
        </TouchableOpacity>
        {openSection === 'seguridad' && (
          <View style={styles.subSection}>
            <Text style={styles.question}>Eliminar mi cuenta</Text>
            <Text style={styles.answer}>Podés solicitar la eliminación de tu cuenta escribiéndonos.</Text>
            <Text style={styles.question}>Reportar actividad sospechosa</Text>
            <Text style={styles.answer}>Si ves algo extraño, contactanos de inmediato.</Text>
          </View>
        )}

        {/* Contacto */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactText}>¿Necesitas más ayuda?</Text>
          <TouchableOpacity style={styles.emailButton} onPress={handleSendEmail}>
            <Text style={styles.emailButtonText}>Contactar por correo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    padding: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: COLORS.text,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    padding: 20,
  },
  sectionButton: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    elevation: 4,
  },
  sectionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.text,
  },
  subSection: {
    paddingLeft: 10,
    marginBottom: 25,
  },
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 6,
  },
  answer: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
    marginTop: 2,
  },
  contactContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  contactText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 10,
  },
  emailButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  emailButtonText: {
    fontFamily: 'Inter-Bold',
    color: COLORS.white,
    fontSize: 16,
  },
  noConsultasText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default HelpScreen;
