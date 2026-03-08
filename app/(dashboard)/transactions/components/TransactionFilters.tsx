'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fieldStyle } from "@/lib/constants";
import { Category } from "@/types";

const CATEGORIES: Array<{ value: Category | "All"; label: string }> = [
  { value: "All", label: "All" },
  { value: "salary_wages", label: "Salary & Wages" },
  { value: "returns", label: "Returns" },
  { value: "gift", label: "Gift" },
  { value: "groceries", label: "Groceries" },
  { value: "dining", label: "Dining" },
  { value: "transport", label: "Transport" },
  { value: "entertainment", label: "Entertainment" },
  { value: "utilities_bills", label: "Utilities & Bills" },
  { value: "education", label: "Education" },
  { value: "subscriptions", label: "Subscriptions" },
  { value: "other", label: "Other" },
];

interface TransactionFiltersProps {
  category: Category | "All";
  fromDate: string;
  toDate: string;
  onCategoryChange: (value: Category | "All") => void;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  onClear: () => void;
}

export default function TransactionFilters({
  category,
  fromDate,
  toDate,
  onCategoryChange,
  onFromDateChange,
  onToDateChange,
  onClear,
}: TransactionFiltersProps) {
  const hasActiveFilters = category !== "All" || fromDate !== "" || toDate !== "";

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

      <Select value={category} onValueChange={(v) => onCategoryChange(v as Category | "All")}>
        <SelectTrigger className="w-44 text-sm bg-muted border-0 shadow-none focus:ring-0">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((c) => (
            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
          className={fieldStyle() + " cursor-pointer"}
        />
        <span className="text-sm text-muted-foreground">to</span>
        <input
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
          className={fieldStyle() + " cursor-pointer"}
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear filters
        </button>
      )}

    </div>
  );
}
