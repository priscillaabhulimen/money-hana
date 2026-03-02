export type InsightType = "flag" | "pattern" | "goal_warning";
export type TransactionType = "income" | "expense";

export type IncomeCategory = "Salary & Wages" | "Returns" | "Gift" | "Other";
export type ExpenseCategory =
  | "Groceries"
  | "Dining"
  | "Transport"
  | "Entertainment"
  | "Utilities & Bills"
  | "Education"
  | "Subscriptions"
  | "Other";
export type Category = IncomeCategory | ExpenseCategory;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  category: Category;
  type: TransactionType;
  note?: string;
  date: string;
  created_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  category: Category;
  monthly_limit: number;
  current_spend: number;
  created_at: string;
}

export interface AIInsight {
  id: string;
  type: InsightType;
  message: string;
  created_at: string;
}