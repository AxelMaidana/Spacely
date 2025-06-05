// C:\Users\Usuario\Desktop\Aaron\Spacely\components\ui\Button.tsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator,
  View
} from 'react-native';
import { COLORS } from '@/constants/Colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  labelStyle,
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    disabled && styles.disabledButton,
    style,
  ];

  const labelStyles = [
    styles.label,
    styles[`${variant}Label`],
    styles[`${size}Label`],
    disabled && styles.disabledLabel,
    labelStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && iconPosition === 'left' && (
        <View style={styles.leftIcon}>{icon}</View>
      )}
      <Text style={labelStyles}>{label}</Text>
      {icon && iconPosition === 'right' && (
        <View style={styles.rightIcon}>{icon}</View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  primaryButton: {
    // Corregido: Usar PRIMARY_COLOR
    backgroundColor: COLORS.PRIMARY_COLOR,
  },
  secondaryButton: {
    // Corregido: Usar secondary (ya que sí existe en Colors.ts)
    backgroundColor: COLORS.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    // Corregido: Usar PRIMARY_COLOR
    borderColor: COLORS.PRIMARY_COLOR,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabledButton: {
    backgroundColor: COLORS.border,
    borderColor: COLORS.border,
  },
  label: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  primaryLabel: {
    color: COLORS.white,
  },
  secondaryLabel: {
    color: COLORS.white,
  },
  outlineLabel: {
    // Corregido: Usar PRIMARY_COLOR
    color: COLORS.PRIMARY_COLOR,
  },
  smallLabel: {
    fontSize: 14,
  },
  mediumLabel: {
    fontSize: 16,
  },
  largeLabel: {
    fontSize: 18,
  },
  disabledLabel: {
    color: COLORS.textTertiary,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});