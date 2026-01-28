import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  colors?: string[];
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
  colors = [theme.colors.primaryLight, theme.colors.background, theme.colors.background],
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default GradientBackground;
