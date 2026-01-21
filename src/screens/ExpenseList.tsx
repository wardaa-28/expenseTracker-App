import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../theme';
import { Card, Text, EmptyState } from '../components';
import { Expense } from '../types';
import { formatCurrency, formatDate, formatMonthYear } from '../utils/formatting';

const ExpenseListScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  
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

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="heading">{currentMonth}</Text>
        </View>

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

          <Card style={[styles.summaryCard, styles.balanceCard]}>
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
          </Card>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsHeader}>
          <Text variant="subheading">Recent Transactions</Text>
        </View>

        {expenses.length === 0 ? (
          <EmptyState
            title="No transactions yet"
            message="Add your first transaction to get started"
          />
        ) : (
          expenses.map((expense) => (
            <Card key={expense.id} style={styles.transactionCard}>
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
            </Card>
          ))
        )}
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
