import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface TabIconProps {
  name: string;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => {
  const getIcon = () => {
    switch (name) {
      case 'list':
        return '📋';
      case 'add':
        return '➕';
      case 'chart':
        return '📊';
      default:
        return '•';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.icon, { fontSize: size, color }]}>
        {getIcon()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  },
});

export default TabIcon;
