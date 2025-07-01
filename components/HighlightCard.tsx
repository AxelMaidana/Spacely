import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface HighlightCardProps {
  image: any;
  badgeText?: string;
  title: string;
  description: string;
  onPress?: () => void;
}

export const HighlightCard = ({
  image,
  badgeText = 'Exclusivo',
  title,
  description,
  onPress,
}: HighlightCardProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/map' as any);
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={handlePress}
      style={styles.promoContainer}
    >
      <Image 
        source={image} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.promoOverlay}>
        <View style={styles.promoContent}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{badgeText}</Text>
          </View>
          <Text style={styles.promoTitle}>{title}</Text>
          <Text style={styles.promoDescription}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  promoContainer: {
    width: width - 40,
    height: 180,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  promoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  promoContent: {
    padding: 16,
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  discountText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: 4,
  },
  promoDescription: {
    fontSize: 14,
    color: COLORS.background,
    marginBottom: 4,
    opacity: 0.9,
  },
}); 