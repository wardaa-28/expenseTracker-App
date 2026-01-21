import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../theme';
import { Input, Button, Card, Text } from '../components';
import { TransactionType } from '../types';
import { formatDate } from '../utils/formatting';

const AddExpenseScreen: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const categories = [
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Entertainment',
    'Health',
    'Education',
    'Salary',
    'Freelance',
    'Investment',
    'Other',
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Reset form
      setAmount('');
      setCategory('');
      setNote('');
      setDate(new Date());
      // In production, navigate back or show success message
    }, 1000);
  };


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Type Toggle */}
          <Card style={styles.typeCard}>
            <View style={styles.typeToggle}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'expense' && styles.typeButtonActive,
                ]}
                onPress={() => setType('expense')}
              >
                <Text
                  variant="bodyBold"
                  style={[
                    styles.typeButtonText,
                    type === 'expense' && styles.typeButtonTextActive,
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'income' && styles.typeButtonActive,
                ]}
                onPress={() => setType('income')}
              >
                <Text
                  variant="bodyBold"
                  style={[
                    styles.typeButtonText,
                    type === 'income' && styles.typeButtonTextActive,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Amount Input */}
          <Input
            label="Amount"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            error={errors.amount}
          />

          {/* Category Dropdown */}
          <View style={styles.categoryContainer}>
            <Text variant="captionBold" style={styles.categoryLabel}>
              Category
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
              contentContainerStyle={styles.categoryScrollContent}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    category === cat && styles.categoryChipActive,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    variant="caption"
                    style={[
                      styles.categoryChipText,
                      category === cat && styles.categoryChipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {errors.category && (
              <Text variant="small" style={styles.errorText}>
                {errors.category}
              </Text>
            )}
          </View>

          {/* Date Picker */}
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <View>
              <Text variant="captionBold" style={styles.dateLabel}>
                Date
              </Text>
              <Text variant="body" style={styles.dateText}>
                {formatDate(date, 'long')}
              </Text>
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}

          {/* Note Input */}
          <Input
            label="Note (Optional)"
            placeholder="Add a note..."
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          {/* Submit Button */}
          <Button
            title={type === 'income' ? 'Add Income' : 'Add Expense'}
            onPress={handleSubmit}
            variant={type === 'income' ? 'secondary' : 'primary'}
            loading={loading}
            style={styles.submitButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  typeCard: {
    marginBottom: theme.spacing.md,
  },
  typeToggle: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
  },
  typeButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  typeButtonActive: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  typeButtonText: {
    color: theme.colors.textSecondary,
  },
  typeButtonTextActive: {
    color: theme.colors.textPrimary,
  },
  categoryContainer: {
    marginBottom: theme.spacing.md,
  },
  categoryLabel: {
    marginBottom: theme.spacing.sm,
  },
  categoryScroll: {
    marginBottom: theme.spacing.xs,
  },
  categoryScrollContent: {
    paddingRight: theme.spacing.md,
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryChipText: {
    color: theme.colors.textSecondary,
  },
  categoryChipTextActive: {
    color: theme.colors.textInverse,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.backgroundSecondary,
    marginBottom: theme.spacing.md,
  },
  dateLabel: {
    marginBottom: theme.spacing.xs,
  },
  dateText: {
    color: theme.colors.textPrimary,
  },
  errorText: {
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
});

export default AddExpenseScreen;
