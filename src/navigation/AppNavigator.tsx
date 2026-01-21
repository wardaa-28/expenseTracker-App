import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import theme from '../theme';
import ExpenseListScreen from '../screens/ExpenseList';
import AddExpenseScreen from '../screens/AddExpense';
import AnalyticsScreen from '../screens/Analytics';
import TabIcon from '../components/TabIcon';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.colors.textPrimary,
          headerTitleStyle: {
            ...theme.typography.subheading,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.backgroundSecondary,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            ...theme.typography.small,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="ExpenseList"
          component={ExpenseListScreen}
          options={{
            title: 'Expenses',
            tabBarLabel: 'Expenses',
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="list" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{
            title: 'Add Transaction',
            tabBarLabel: 'Add',
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="add" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            title: 'Analytics',
            tabBarLabel: 'Analytics',
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="chart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default AppNavigator;
