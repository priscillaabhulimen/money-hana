'use client';

import { InsightType } from "@/types";

const TYPES: Array<{ value: InsightType | "All"; label: string }> = [
  { value: "All", label: "All" },
  { value: "flag", label: "Flags" },
  { value: "pattern", label: "Patterns" },
  { value: "goal_warning", label: "Goal Warnings" },
];

interface InsightTypeToggleProps {
  active: InsightType | "All";
  onChange: (value: InsightType | "All") => void;
}

export default function InsightTypeToggle({ active, onChange }: InsightTypeToggleProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {TYPES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`text-sm px-4 py-1.5 rounded-sm transition-colors ${
            active === value
              ? "bg-primary text-primary-foreground font-medium"
              : "bg-muted/45 text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
