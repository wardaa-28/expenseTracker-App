export interface Expense {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  note?: string;
}

export type TransactionType = 'income' | 'expense';
