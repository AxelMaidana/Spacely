import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';

export default function AuthLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.background,
        },
        animation: 'slide_from_right',
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});