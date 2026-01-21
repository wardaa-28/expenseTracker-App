import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Card from './Card';
import Text from './Text';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
}) => {
  return (
    <Card style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text variant="subheading" style={styles.title}>
        {title}
      </Text>
      {message && (
        <Text variant="body" style={styles.message}>
          {message}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl * 2,
    paddingHorizontal: theme.spacing.lg,
  },
  iconContainer: {
    marginBottom: theme.spacing.md,
  },
  title: {
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
    color: theme.colors.textPrimary,
  },
  message: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
  },
});

export default EmptyState;
