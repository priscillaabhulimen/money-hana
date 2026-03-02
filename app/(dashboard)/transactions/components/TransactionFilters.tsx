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

const CATEGORIES: Array<Category | "All"> = [
  "All",
  "Salary & Wages",
  "Returns",
  "Gift",
  "Groceries",
  "Dining",
  "Transport",
  "Entertainment",
  "Utilities & Bills",
  "Education",
  "Subscriptions",
  "Other",
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
            <SelectItem key={c} value={c}>{c}</SelectItem>
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
