/**
 * Utility functions for formatting currency, dates, etc.
 */

export const formatCurrency = (amount: number, currency: string = '₹'): string => {
  return `${currency}${amount.toLocaleString('en-IN')}`;
};

export const formatDate = (dateString: string | Date, format: 'short' | 'long' = 'short'): string => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  if (format === 'long') {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
