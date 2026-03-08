'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldStyle } from "@/lib/constants";
import { Goal, ExpenseCategory } from "@/types";
import { useAddGoal, useUpdateGoal } from "@/hooks/useGoals";

// API values match backend enums
const GOAL_CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: "groceries", label: "Groceries" },
  { value: "dining", label: "Dining" },
  { value: "transport", label: "Transport" },
  { value: "entertainment", label: "Entertainment" },
  { value: "utilities_bills", label: "Utilities & Bills" },
  { value: "education", label: "Education" },
  { value: "subscriptions", label: "Subscriptions" },
  { value: "other", label: "Other" },
];

const schema = z.object({
  category: z.string().min(1, "Category is required"),
  monthly_limit: z
    .number({ invalid_type_error: "Monthly limit is required" })
    .positive("Monthly limit must be greater than 0"),
});

type GoalForm = z.infer<typeof schema>;

interface GoalModalProps {
  onClose: () => void;
  initialData?: Goal;
  existingCategories?: ExpenseCategory[];
}

export default function GoalModal({ onClose, initialData, existingCategories = [] }: GoalModalProps) {
  const isEditing = !!initialData;
  const addGoal = useAddGoal();
  const updateGoal = useUpdateGoal();

  const availableCategories = GOAL_CATEGORIES.filter(
    (c) => !existingCategories.includes(c.value) || c.value === initialData?.category
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, dirtyFields },
  } = useForm<GoalForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: isEditing
      ? {
          category: initialData.category,
          monthly_limit: initialData.monthly_limit,
        }
      : undefined,
  });

  const isDirty = Object.keys(dirtyFields).length > 0;
  const canSubmit = isValid && !isSubmitting && (!isEditing || isDirty);
  const isPending = addGoal.isPending || updateGoal.isPending;
  const mutationError = addGoal.error || updateGoal.error;

  async function onSubmit(data: GoalForm) {
    try {
      if (isEditing) {
        await updateGoal.mutateAsync({
          id: initialData.id,
          data: { monthly_limit: data.monthly_limit },
        });
      } else {
        await addGoal.mutateAsync({
          category: data.category,
          monthly_limit: data.monthly_limit,
        });
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-sm shadow-lg p-8 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {isEditing ? "Edit Goal" : "Add Goal"}
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

          {/* Category */}
          <div>
            <label className="field-label">Category</label>
            <select
              {...register("category")}
              className={`${fieldStyle(!!errors.category)} w-full`}
              disabled={isEditing}
            >
              <option value="">Select category</option>
              {availableCategories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            {isEditing && (
              <p className="text-xs text-muted-foreground mt-1">
                Category cannot be changed after creation.
              </p>
            )}
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Monthly limit */}
          <div>
            <label className="field-label">Monthly Limit</label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              {...register("monthly_limit", { setValueAs: (v) => parseFloat(v) })}
              className={`${fieldStyle(!!errors.monthly_limit)} w-full`}
            />
            {errors.monthly_limit && (
              <p className="text-red-500 text-xs mt-1">{errors.monthly_limit.message}</p>
            )}
          </div>

          {mutationError && (
            <p className="text-red-500 text-xs">{mutationError.message}</p>
          )}

          <Button type="submit" disabled={!canSubmit || isPending} className="w-full mt-2">
            {isPending ? "Saving..." : isEditing ? "Update Goal" : "Add Goal"}
          </Button>

        </form>
      </div>
    </div>
  );
}
