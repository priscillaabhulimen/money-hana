export type InsightType = "flag" | "pattern" | "goal_warning";
export type TransactionType = "income" | "expense";

export type IncomeCategory =
  | "salary_wages"
  | "returns"
  | "gift"
  | "other";

export type ExpenseCategory =
  | "groceries"
  | "dining"
  | "transport"
  | "entertainment"
  | "utilities_bills"
  | "education"
  | "subscriptions"
  | "other";

export type Category = IncomeCategory | ExpenseCategory;

// Display label maps for UI rendering
export const INCOME_CATEGORY_LABELS: Record<IncomeCategory, string> = {
  salary_wages: "Salary & Wages",
  returns: "Returns",
  gift: "Gift",
  other: "Other",
};

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  groceries: "Groceries",
  dining: "Dining",
  transport: "Transport",
  entertainment: "Entertainment",
  utilities_bills: "Utilities & Bills",
  education: "Education",
  subscriptions: "Subscriptions",
  other: "Other",
};

export const ALL_CATEGORY_LABELS: Record<Category, string> = {
  ...INCOME_CATEGORY_LABELS,
  ...EXPENSE_CATEGORY_LABELS,
};

export function getCategoryLabel(category: Category): string {
  return ALL_CATEGORY_LABELS[category] ?? category;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}

// API shape — transaction_type matches backend
export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  category: Category;
  transaction_type: TransactionType;
  note?: string;
  date: string;
  created_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  category: ExpenseCategory;
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

// Paginated API response shape
export interface PaginatedResponse<T> {
  status: string;
  data: T;
  total: number;
  limit: number;
  page: number;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  name: string;
  category: ExpenseCategory;
  amount: string;
  description: string | null;
  billing_type: "fixed_date" | "periodic";
  frequency: "weekly" | "monthly" | "yearly";
  anchor_day: number | null;
  anchor_month: number | null;
  next_due_date: string;
  is_trial: boolean;
  trial_ends_at: string | null;
  is_active: boolean;
  created_at: string;
}
