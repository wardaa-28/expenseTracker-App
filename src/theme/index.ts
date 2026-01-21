/**
 * Professional Theme System for Finance/Expense Tracker App
 * Modern fintech color palette (blue + green based)
 */

export const colors = {
  // Primary colors - Blue based (trust, stability)
  primary: '#2563EB', // Modern blue
  primaryLight: '#3B82F6',
  primaryDark: '#1E40AF',
  
  // Secondary colors - Green based (growth, success)
  secondary: '#10B981', // Emerald green
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  
  // Status colors
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Background colors
  background: '#F9FAFB',
  backgroundSecondary: '#FFFFFF',
  card: '#FFFFFF',
  
  // Text colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Income/Expense specific
  income: '#10B981',
  expense: '#EF4444',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
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
