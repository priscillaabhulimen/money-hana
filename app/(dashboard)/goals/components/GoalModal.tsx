'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldStyle } from "@/lib/constants";
import { Goal, Category } from "@/types";
import { addGoal, updateGoal } from "@/services/goals";

const GOAL_CATEGORIES = [
  "Dining",
  "Groceries",
  "Transport",
  "Entertainment",
  "Other",
] as const;

const schema = z.object({
  category: z.enum(GOAL_CATEGORIES, {
    errorMap: () => ({ message: "Category is required" }),
  }),
  monthly_limit: z
    .number({ invalid_type_error: "Monthly limit is required" })
    .positive("Monthly limit must be greater than 0"),
});

type GoalForm = z.infer<typeof schema>;

interface GoalModalProps {
  onClose: () => void;
  initialData?: Goal;
  existingCategories?: Category[];
}

export default function GoalModal({ onClose, initialData, existingCategories = [] }: GoalModalProps) {
  const isEditing = !!initialData;

  const availableCategories = GOAL_CATEGORIES.filter(
    (c) => !existingCategories.includes(c) || c === initialData?.category
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
          category: initialData.category as typeof GOAL_CATEGORIES[number],
          monthly_limit: initialData.monthly_limit,
        }
      : undefined,
  });

  const isDirty = Object.keys(dirtyFields).length > 0;
  const canSubmit = isValid && !isSubmitting && (!isEditing || isDirty);

  function onSubmit(data: GoalForm) {
    if (isEditing) {
      updateGoal(initialData.id, data);
    } else {
      addGoal(data);
    }
    onClose();
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
                <option key={c} value={c}>{c}</option>
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

          <Button type="submit" disabled={!canSubmit} className="w-full mt-2">
            {isEditing ? "Update Goal" : "Add Goal"}
          </Button>

        </form>
      </div>
    </div>
  );
}
