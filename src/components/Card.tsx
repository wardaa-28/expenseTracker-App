import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import theme from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'md',
}) => {
  return (
    <View style={[styles.card, { padding: theme.spacing[padding] }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
});

export default Card;
