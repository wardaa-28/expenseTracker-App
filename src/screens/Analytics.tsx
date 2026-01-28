import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart, BarChart } from 'react-native-chart-kit';
import theme from '../theme';
import { AnimatedCard, Text, GradientBackground } from '../components';
import { Expense } from '../types';
import { formatCurrency, formatMonthYear } from '../utils/formatting';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Mock data - replace with actual state management
  const expenses: Expense[] = [
    { id: '1', amount: 5000, type: 'income', category: 'Salary', date: '2024-01-15' },
    { id: '2', amount: 1200, type: 'expense', category: 'Food', date: '2024-01-14' },
    { id: '3', amount: 800, type: 'expense', category: 'Transport', date: '2024-01-13' },
    { id: '4', amount: 500, type: 'expense', category: 'Shopping', date: '2024-01-12' },
    { id: '5', amount: 300, type: 'expense', category: 'Bills', date: '2024-01-11' },
    { id: '6', amount: 200, type: 'expense', category: 'Food', date: '2024-01-10' },
  ];

  const monthName = useMemo(() => {
    return formatMonthYear(selectedMonth);
  }, [selectedMonth]);

  const categoryData = useMemo(() => {
    const categoryMap: Record<string, number> = {};
    expenses
      .filter((e) => e.type === 'expense')
      .forEach((e) => {
        categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
      });

    const colors = [
      theme.colors.primary,
      theme.colors.secondary,
      theme.colors.warning,
      theme.colors.danger,
      theme.colors.info,
      theme.colors.primaryLight,
      theme.colors.secondaryLight,
      theme.colors.primaryDark,
    ];

    return {
      labels: Object.keys(categoryMap),
      datasets: [
        {
          data: Object.values(categoryMap),
        },
      ],
      colors: colors.slice(0, Object.keys(categoryMap).length),
    };
  }, [expenses]);

  const incomeExpenseData = useMemo(() => {
    const totalIncome = expenses
      .filter((e) => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);
    const totalExpense = expenses
      .filter((e) => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      labels: ['Income', 'Expense'],
      datasets: [
        {
          data: [totalIncome, totalExpense],
        },
      ],
    };
  }, [expenses]);

  const summary = useMemo(() => {
    const totalIncome = expenses
      .filter((e) => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);
    const totalExpense = expenses
      .filter((e) => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
    const balance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;
    
    return { totalIncome, totalExpense, balance, savingsRate };
  }, [expenses]);


  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const chartConfig = {
    backgroundColor: theme.colors.backgroundSecondary,
    backgroundGradientFrom: theme.colors.backgroundSecondary,
    backgroundGradientTo: theme.colors.backgroundSecondary,
    decimalPlaces: 0,
    color: (opacity = 1) => hexToRgba(theme.colors.primary, opacity),
    labelColor: (opacity = 1) => hexToRgba(theme.colors.textPrimary, opacity),
    style: {
      borderRadius: theme.borderRadius.md,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const changeMonth = (direction: 'prev' | 'next') => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    const newDate = new Date(selectedMonth);
    newDate.setMonth(selectedMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setSelectedMonth(newDate);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          {/* Month Selector */}
          <AnimatedCard style={styles.monthSelector} delay={100}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

            <TouchableOpacity onPress={() => changeMonth('prev')}>
              <Text variant="bodyBold" style={styles.monthButton}>
                ←
              </Text>
            </TouchableOpacity>
            <Text variant="subheading">{monthName}</Text>
            <TouchableOpacity onPress={() => changeMonth('next')}>
              <Text variant="bodyBold" style={styles.monthButton}>
                →
              </Text>
            </TouchableOpacity>
            </View>
          </AnimatedCard>

          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <AnimatedCard style={styles.summaryCard} delay={200}>
              <Text variant="caption" style={styles.summaryLabel}>
                Total Income
              </Text>
              <Text variant="subheading" style={styles.incomeText}>
                {formatCurrency(summary.totalIncome)}
              </Text>
            </AnimatedCard>
            <AnimatedCard style={styles.summaryCard} delay={250}>
              <Text variant="caption" style={styles.summaryLabel}>
                Total Expense
              </Text>
              <Text variant="subheading" style={styles.expenseText}>
                {formatCurrency(summary.totalExpense)}
              </Text>
            </AnimatedCard>
          </View>

          <View style={styles.summaryContainer}>
            <AnimatedCard style={styles.summaryCard} delay={300}>
              <Text variant="caption" style={styles.summaryLabel}>
                Balance
              </Text>
              <Text
                variant="subheading"
                style={[
                  summary.balance >= 0 ? styles.incomeText : styles.expenseText,
                ]}
              >
                {formatCurrency(summary.balance)}
              </Text>
            </AnimatedCard>
            <AnimatedCard style={styles.summaryCard} delay={350}>
              <Text variant="caption" style={styles.summaryLabel}>
                Savings Rate
              </Text>
              <Text variant="subheading" style={styles.savingsRateText}>
                {summary.savingsRate.toFixed(1)}%
              </Text>
            </AnimatedCard>
          </View>

          {/* Category Pie Chart */}
          {categoryData.labels.length > 0 && (
            <AnimatedCard style={styles.chartCard} delay={400}>
              <Text variant="subheading" style={styles.chartTitle}>
                Expenses by Category
              </Text>
              <PieChart
                data={categoryData.labels.map((label, index) => ({
                  name: label,
                  amount: categoryData.datasets[0].data[index],
                  color: categoryData.colors[index],
                  legendFontColor: theme.colors.textPrimary,
                  legendFontSize: 12,
                }))}
                width={screenWidth - theme.spacing.md * 4}
                height={190}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </AnimatedCard>
          )}

          {/* Income vs Expense Bar Chart */}
          <AnimatedCard style={styles.chartCard} delay={450}>
            <Text variant="subheading" style={styles.chartTitle}>
              Income vs Expense
            </Text>
            <BarChart
              data={incomeExpenseData}
              width={screenWidth - theme.spacing.md * 4}
              height={220}
              yAxisLabel="$"
              yAxisSuffix=""
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => hexToRgba(theme.colors.secondary, opacity),
              }}
              verticalLabelRotation={0}
              showValuesOnTopOfBars
              fromZero
            />
          </AnimatedCard>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.md,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    marginLeft:25
  },
  monthButton: {
    fontSize: 20,
    color: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    marginBottom: theme.spacing.xs,
  },
  incomeText: {
    color: theme.colors.income,
  },
  expenseText: {
    color: theme.colors.expense,
  },
  savingsRateText: {
    color: theme.colors.primary,
  },
  chartCard: {
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  chartTitle: {
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
});

export default AnalyticsScreen;
