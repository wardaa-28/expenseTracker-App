import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import theme from '../theme';

type TextVariant = 'heading' | 'subheading' | 'body' | 'bodyBold' | 'caption' | 'captionBold' | 'small';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
}

const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  style,
  ...props
}) => {
  const textStyle = [
    styles.base,
    theme.typography[variant],
    color && { color },
    style,
  ];

  return <RNText style={textStyle} {...props} />;
};

const styles = StyleSheet.create({
  base: {
    color: theme.colors.textPrimary,
  },
});

export default Text;
