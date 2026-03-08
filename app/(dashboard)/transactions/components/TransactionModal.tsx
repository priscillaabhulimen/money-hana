'use client';

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldStyle } from "@/lib/constants";
import { Transaction } from "@/types";
import { useAddTransaction, useUpdateTransaction } from "@/hooks/useTransactions";

// API values (lowercase with underscores)
const incomeCategoryEnum = z.enum([
  "salary_wages",
  "returns",
  "gift",
  "other",
]);

const expenseCategoryEnum = z.enum([
  "groceries",
  "dining",
  "transport",
  "entertainment",
  "utilities_bills",
  "education",
  "subscriptions",
  "other",
]);

const schema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .positive("Amount must be greater than 0"),
  transaction_type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Category is required"),
  note: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});

type TransactionForm = z.infer<typeof schema>;

const INCOME_CATEGORIES = [
  { value: "salary_wages", label: "Salary & Wages" },
  { value: "returns", label: "Returns" },
  { value: "gift", label: "Gift" },
  { value: "other", label: "Other" },
];

const EXPENSE_CATEGORIES = [
  { value: "groceries", label: "Groceries" },
  { value: "dining", label: "Dining" },
  { value: "transport", label: "Transport" },
  { value: "entertainment", label: "Entertainment" },
  { value: "utilities_bills", label: "Utilities & Bills" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

interface TransactionModalProps {
  onClose: () => void;
  initialData?: Transaction;
}

export default function TransactionModal({ onClose, initialData }: TransactionModalProps) {
  const isEditing = !!initialData;
  const addTransaction = useAddTransaction();
  const updateTransaction = useUpdateTransaction();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, dirtyFields },
    setValue,
    getValues,
  } = useForm<TransactionForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: isEditing
      ? {
          amount: initialData.amount,
          transaction_type: initialData.transaction_type,
          category: initialData.category,
          note: initialData.note ?? "",
          date: initialData.date,
        }
      : {
          amount: undefined,
          transaction_type: "expense",
          category: undefined,
          note: "",
          date: new Date().toISOString().slice(0, 10),
        },
  });

  const transaction_type = useWatch({ control, name: "transaction_type" });
  const isDirty = Object.keys(dirtyFields).length > 0;

  useEffect(() => {
    const currentCategory = getValues("category");
    const incomeValues = incomeCategoryEnum.options as string[];
    const expenseValues = expenseCategoryEnum.options as string[];

    if (transaction_type === "income" && expenseValues.includes(currentCategory)) {
      setValue("category", "", { shouldValidate: true });
    } else if (transaction_type === "expense" && incomeValues.includes(currentCategory)) {
      setValue("category", "", { shouldValidate: true });
    }
  }, [transaction_type, setValue, getValues]);

  async function onSubmit(data: TransactionForm) {
    try {
      if (isEditing) {
        await updateTransaction.mutateAsync({
          id: initialData.id,
          data: {
            amount: data.amount,
            transaction_type: data.transaction_type,
            category: data.category,
            note: data.note,
            date: data.date,
          },
        });
      } else {
        await addTransaction.mutateAsync({
          transaction_type: data.transaction_type,
          category: data.category,
          amount: data.amount,
          date: data.date,
          note: data.note,
        });
      }
      onClose();
    } catch (error) {
      // Error is surfaced via mutation state if needed
      console.error(error);
    }
  }

  const canSubmit = isValid && !isSubmitting && (!isEditing || isDirty);
  const categories = transaction_type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const isPending = addTransaction.isPending || updateTransaction.isPending;
  const mutationError = addTransaction.error || updateTransaction.error;

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

          {/* Type toggle */}
          <div className="flex rounded-sm overflow-hidden border border-border">
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setValue("transaction_type", t, { shouldDirty: true, shouldValidate: true })}
                className={`flex-1 py-2 text-sm font-medium transition-colors capitalize ${
                  transaction_type === t
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
            <select
              {...register("category")}
              className={`${fieldStyle(!!errors.category)} w-full`}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="field-label">
              Note <span className="text-muted-foreground">(optional)</span>
            </label>
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

          {mutationError && (
            <p className="text-red-500 text-xs">{mutationError.message}</p>
          )}

          <Button type="submit" disabled={!canSubmit || isPending} className="w-full mt-2">
            {isPending ? "Saving..." : isEditing ? "Update Transaction" : "Add Transaction"}
          </Button>

        </form>
      </div>
    </div>
  );
}
