'use client';

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldStyle } from "@/lib/constants";
import { Transaction, Category } from "@/types";
import { addTransaction, updateTransaction } from "@/services/transactions";

const CATEGORIES = ["Dining", "Groceries", "Transport", "Entertainment", "Income", "Other", "Subscriptions"] as const;

const schema = z.object({
  amount: z.number({ invalid_type_error: "Amount is required" }).positive("Amount must be greater than 0"),
  type: z.enum(["income", "expense"]),
  category: z.enum(CATEGORIES, { errorMap: () => ({ message: "Category is required" }) }),
  note: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});

type TransactionForm = z.infer<typeof schema>;

const EXPENSE_CATEGORIES: Category[] = [
  "Dining",
  "Groceries",
  "Transport",
  "Entertainment",
  "Subscriptions",
  "Other",
];

interface TransactionModalProps {
  onClose: () => void;
  initialData?: Transaction;
}

export default function TransactionModal({ onClose, initialData }: TransactionModalProps) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, dirtyFields },
    setValue,
    getValues,
  } = useForm<TransactionForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: isEditing
      ? {
          amount: initialData.amount,
          type: initialData.type,
          category: initialData.category,
          note: initialData.note ?? "",
          date: initialData.date,
        }
      : {
          type: "expense",
          category: undefined,
          note: "",
          date: new Date().toISOString().slice(0, 10),
        },
  });

  const type = getValues("type");
  const isDirty = Object.keys(dirtyFields).length > 0;

  useEffect(() => {
  if (type === "income") {
    setValue("category", "Income", { shouldValidate: true });
  } else {
    if (getValues("category") === "Income") {
      setValue("category", undefined as unknown as Category, { shouldValidate: true });
    }
  }
}, [type, setValue, getValues]);

  function onSubmit(data: TransactionForm) {
    if (isEditing) {
      const { amount, type, category, note, date } = data;
      updateTransaction(initialData.id, { amount, type, category, note, date });
    } else {
      addTransaction(data);
    }
    onClose();
  }

  const canSubmit = isValid && !isSubmitting && (!isEditing || isDirty);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-sm shadow-lg p-8 w-full max-w-md mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {isEditing ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* Type toggle — segmented control */}
          <div className="flex rounded-sm overflow-hidden border border-border">
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setValue("type", t, { shouldDirty: true, shouldValidate: true })}
                className={`flex-1 py-2 text-sm font-medium transition-colors capitalize ${
                  type === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "income" ? "Income" : "Expense"}
              </button>
            ))}
          </div>

          {/* Amount */}
          <div>
            <label className="field-label">Amount</label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              {...register("amount", {
                setValueAs: (v) => parseFloat(v),
              })}
              className={`${fieldStyle(!!errors.amount)} w-full`}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="field-label">Category</label>
            {type === "income" ? (
              <input
                value="Income"
                readOnly
                className={`${fieldStyle(false)} w-full bg-muted text-muted-foreground cursor-not-allowed`}
              />
            ) : (
              <select
                {...register("category")}
                className={`${fieldStyle(!!errors.category)} w-full`}
              >
                <option value="">Select category</option>
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="field-label">Note <span className="text-muted-foreground">(optional)</span></label>
            <input
              {...register("note")}
              placeholder="e.g. Weekly groceries"
              className={`${fieldStyle(false)} w-full`}
            />
          </div>

          {/* Date */}
          <div>
            <label className="field-label">Date</label>
            <input
              type="date"
              {...register("date")}
              className={`${fieldStyle(!!errors.date)} w-full`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          <Button type="submit" disabled={!canSubmit} className="w-full mt-2">
            {isEditing ? "Update Transaction" : "Add Transaction"}
          </Button>

        </form>
      </div>
    </div>
  );
}