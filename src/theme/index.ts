/**
 * Professional Theme System for Finance/Expense Tracker App
 * Color palette based on #8FB6CF (soft blue theme)
 */

export const colors = {
  // Primary colors - Shades of #8FB6CF
  primary: '#8FB6CF', // Base color
  primaryLight: '#B4D1E5', // Lighter shade
  primaryDark: '#6A9AB8', // Darker shade
  
  // Secondary colors - Complementary teal/cyan
  secondary: '#7BC4C4', // Teal that complements blue
  secondaryLight: '#9DD9D9',
  secondaryDark: '#5BA3A3',
  
  // Status colors - Harmonized with blue theme
  success: '#7BC4C4', // Teal for success
  danger: '#E88B8B', // Soft coral/salmon
  warning: '#E8B88B', // Warm peach
  info: '#8FB6CF', // Base blue for info
  
  // Background colors - Very light tints of #8FB6CF
  background: '#F7FAFC', // Very light blue tint
  backgroundSecondary: '#FFFFFF', // Pure white
  card: '#FFFFFF', // White cards
  
  // Text colors - Dark for contrast
  textPrimary: '#2C3E50', // Dark blue-gray
  textSecondary: '#5A6C7D', // Medium blue-gray
  textTertiary: '#8B9BA8', // Light blue-gray
  textInverse: '#FFFFFF', // White text
  
  // Border colors - Light blue-gray tints
  border: '#D9E8F2', // Light blue border
  borderLight: '#F0F6FA', // Very light blue border
  
  // Income/Expense specific
  income: '#7BC4C4', // Teal for income
  expense: '#E88B8B', // Soft coral for expense
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const typography = {
  heading: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
    color: colors.textPrimary,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  captionBold: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    color: colors.textSecondary,
  },
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#8FB6CF', // Theme-based shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#6A9AB8', // Darker theme shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#6A9AB8', // Darker theme shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;
export default theme;
