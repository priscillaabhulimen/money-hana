export type InsightType = "flag" | "pattern" | "goal_warning";
export type Category = "Dining" | "Groceries" | "Transport" | "Entertainment" | "Income" | "Other";


export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
}


export interface Transaction {
  id: number;
  user_id: number;
  amount: number;
  category: Category;
  note?: string;
  date: string;
  created_at: string;
}

export interface Goal {
  id: number;
  user_id: number;
  category: Category;
  monthly_limit: number;
  current_spend: number;
  created_at: string;
}

export interface AIInsight {
  id: number;
  type: InsightType;
  message: string;
  created_at: string;
}