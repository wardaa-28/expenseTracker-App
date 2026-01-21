import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart, BarChart } from 'react-native-chart-kit';
import theme from '../theme';
import { Card, Text } from '../components';
import { Expense } from '../types';
import { formatCurrency, formatMonthYear } from '../utils/formatting';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

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
      '#8B5CF6',
      '#EC4899',
      '#14B8A6',
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


  const chartConfig = {
    backgroundColor: theme.colors.backgroundSecondary,
    backgroundGradientFrom: theme.colors.backgroundSecondary,
    backgroundGradientTo: theme.colors.backgroundSecondary,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(17, 24, 39, ${opacity})`,
    style: {
      borderRadius: theme.borderRadius.md,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(selectedMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setSelectedMonth(newDate);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Month Selector */}
        <Card style={styles.monthSelector}>
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
        </Card>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
            <Text variant="caption" style={styles.summaryLabel}>
              Total Income
            </Text>
            <Text variant="subheading" style={styles.incomeText}>
              {formatCurrency(summary.totalIncome)}
            </Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text variant="caption" style={styles.summaryLabel}>
              Total Expense
            </Text>
            <Text variant="subheading" style={styles.expenseText}>
              {formatCurrency(summary.totalExpense)}
            </Text>
          </Card>
        </View>

        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
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
          </Card>
          <Card style={styles.summaryCard}>
            <Text variant="caption" style={styles.summaryLabel}>
              Savings Rate
            </Text>
            <Text variant="subheading" style={styles.savingsRateText}>
              {summary.savingsRate.toFixed(1)}%
            </Text>
          </Card>
        </View>

        {/* Category Pie Chart */}
        {categoryData.labels.length > 0 && (
          <Card style={styles.chartCard}>
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
              height={220}
              chartConfig={chartConfig}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </Card>
        )}

        {/* Income vs Expense Bar Chart */}
        <Card style={styles.chartCard}>
          <Text variant="subheading" style={styles.chartTitle}>
            Income vs Expense
          </Text>
          <BarChart
            data={incomeExpenseData}
            width={screenWidth - theme.spacing.md * 4}
            height={220}
            yAxisLabel="₹"
            yAxisSuffix=""
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
            }}
            verticalLabelRotation={0}
            showValuesOnTopOfBars
            fromZero
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
