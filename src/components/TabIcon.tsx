import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface TabIconProps {
  name: string;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => {
  const getIconName = () => {
    switch (name) {
      case 'list':
        return 'bars';
      case 'add':
        return 'plus';
      case 'chart':
        return 'barschart';
      default:
        return 'question';
    }
  };

  return (
    <View style={styles.container}>
      <Icon name={getIconName()} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabIcon;
