import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../theme';
import { AnimatedCard, Text, EmptyState, GradientBackground } from '../components';
import { Expense } from '../types';
import { formatCurrency, formatDate, formatMonthYear } from '../utils/formatting';

const ExpenseListScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const headerAnim = useRef(new Animated.Value(0)).current;
  
  // Mock data - replace with actual state management
  const [expenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 5000,
      type: 'income',
      category: 'Salary',
      date: '2024-01-15',
      note: 'Monthly salary',
    },
    {
      id: '2',
      amount: 1200,
      type: 'expense',
      category: 'Food',
      date: '2024-01-14',
      note: 'Groceries',
    },
    {
      id: '3',
      amount: 800,
      type: 'expense',
      category: 'Transport',
      date: '2024-01-13',
    },
  ]);

  const currentMonth = useMemo(() => {
    return formatMonthYear(new Date());
  }, []);

  const summary = useMemo(() => {
    const totalIncome = expenses
      .filter((e) => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);
    const totalExpense = expenses
      .filter((e) => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
    const balance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, balance };
  }, [expenses]);

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [headerAnim]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: headerAnim,
                transform: [
                  {
                    translateY: headerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text variant="heading">{currentMonth}</Text>
          </Animated.View>

          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <AnimatedCard style={styles.summaryCard} delay={100}>
              <Text variant="caption" style={styles.summaryLabel}>
                Total Income
              </Text>
              <Text variant="subheading" style={styles.incomeText}>
                {formatCurrency(summary.totalIncome)}
              </Text>
            </AnimatedCard>

            <AnimatedCard style={styles.summaryCard} delay={200}>
              <Text variant="caption" style={styles.summaryLabel}>
                Total Expense
              </Text>
              <Text variant="subheading" style={styles.expenseText}>
                {formatCurrency(summary.totalExpense)}
              </Text>
            </AnimatedCard>

            <AnimatedCard style={[styles.summaryCard, styles.balanceCard]} delay={300}>
              <Text variant="caption" style={styles.summaryLabel}>
                Balance
              </Text>
              <Text
                variant="subheading"
                style={[
                  styles.balanceText,
                  summary.balance >= 0 ? styles.incomeText : styles.expenseText,
                ]}
              >
                {formatCurrency(summary.balance)}
              </Text>
            </AnimatedCard>
          </View>

          {/* Transactions List */}
          <Animated.View
            style={[
              styles.transactionsHeader,
              {
                opacity: headerAnim,
              },
            ]}
          >
            <Text variant="subheading">Recent Transactions</Text>
          </Animated.View>

          {expenses.length === 0 ? (
            <AnimatedCard delay={400}>
              <EmptyState
                title="No transactions yet"
                message="Add your first transaction to get started"
              />
            </AnimatedCard>
          ) : (
            expenses.map((expense, index) => (
              <AnimatedCard
                key={expense.id}
                style={styles.transactionCard}
                delay={400 + index * 100}
              >
                <View style={styles.transactionContent}>
                  <View style={styles.transactionLeft}>
                    <Text variant="bodyBold">{expense.category}</Text>
                    {expense.note && (
                      <Text variant="caption" style={styles.transactionNote}>
                        {expense.note}
                      </Text>
                    )}
                    <Text variant="small" style={styles.transactionDate}>
                      {formatDate(expense.date)}
                    </Text>
                  </View>
                  <Text
                    variant="subheading"
                    style={[
                      styles.transactionAmount,
                      expense.type === 'income'
                        ? styles.incomeText
                        : styles.expenseText,
                    ]}
                  >
                    {expense.type === 'income' ? '+' : '-'}
                    {formatCurrency(expense.amount)}
                  </Text>
                </View>
              </AnimatedCard>
            ))
          )}
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
  header: {
    marginBottom: theme.spacing.lg,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  summaryCard: {
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
  },
  balanceCard: {
    flexBasis: '100%',
    marginTop: theme.spacing.sm,
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
  balanceText: {
    fontSize: 24,
    fontWeight: '700',
  },
  transactionsHeader: {
    marginBottom: theme.spacing.md,
  },
  transactionCard: {
    marginBottom: theme.spacing.md,
  },
  transactionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLeft: {
    flex: 1,
  },
  transactionNote: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  transactionDate: {
    marginTop: theme.spacing.xs,
  },
  transactionAmount: {
    fontWeight: '700',
  },
});

export default ExpenseListScreen;
