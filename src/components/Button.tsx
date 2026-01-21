import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import theme from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      opacity: disabled || loading ? 0.6 : 1,
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, backgroundColor: theme.colors.primary };
      case 'secondary':
        return { ...baseStyle, backgroundColor: theme.colors.secondary };
      case 'danger':
        return { ...baseStyle, backgroundColor: theme.colors.danger };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    return {
      ...styles.text,
      color: theme.colors.textInverse,
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.textInverse} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    ...theme.typography.bodyBold,
    color: theme.colors.textInverse,
  },
});

export default Button;
