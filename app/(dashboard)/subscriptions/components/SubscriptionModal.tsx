'use client';

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldStyle } from "@/lib/constants";
import { Subscription, EXPENSE_CATEGORY_LABELS, ExpenseCategory } from "@/types";
import { useAddSubscription, useUpdateSubscription } from "@/hooks/useSubscriptions";

const EXPENSE_CATEGORIES = (
  Object.entries(EXPENSE_CATEGORY_LABELS) as [ExpenseCategory, string][]
).map(([value, label]) => ({ value, label }));

const DAYS_OF_WEEK = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
];

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    amount: z
      .number({ invalid_type_error: "Amount is required" })
      .positive("Amount must be greater than 0"),
    description: z.string().optional(),
    billing_type: z.enum(["fixed_date", "periodic"]),
    frequency: z.enum(["weekly", "monthly", "yearly"]),
    anchor_day: z.number().nullable().optional(),
    anchor_month: z.number().nullable().optional(),
    is_trial: z.boolean(),
    trial_ends_at: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.billing_type === "fixed_date") {
      if (data.frequency === "weekly" && !data.anchor_day) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Day of week is required", path: ["anchor_day"] });
      }
      if (data.frequency === "monthly" && !data.anchor_day) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Day of month is required", path: ["anchor_day"] });
      }
      if (data.frequency === "yearly") {
        if (!data.anchor_day) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Day is required", path: ["anchor_day"] });
        }
        if (!data.anchor_month) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Month is required", path: ["anchor_month"] });
        }
      }
    }
    if (data.is_trial && !data.trial_ends_at) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Trial end date is required", path: ["trial_ends_at"] });
    }
  });

type SubscriptionForm = z.infer<typeof schema>;

interface SubscriptionModalProps {
  onClose: () => void;
  initialData?: Subscription;
}

export default function SubscriptionModal({ onClose, initialData }: SubscriptionModalProps) {
  const isEditing = !!initialData;
  const addSubscription = useAddSubscription();
  const updateSubscription = useUpdateSubscription();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting, dirtyFields },
  } = useForm<SubscriptionForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: isEditing
      ? {
          name: initialData.name,
          category: initialData.category,
          amount: parseFloat(initialData.amount),
          description: initialData.description ?? "",
          billing_type: initialData.billing_type,
          frequency: initialData.frequency,
          anchor_day: initialData.anchor_day ?? null,
          anchor_month: initialData.anchor_month ?? null,
          is_trial: initialData.is_trial,
          trial_ends_at: initialData.trial_ends_at
            ? initialData.trial_ends_at.slice(0, 10)
            : null,
        }
      : {
          billing_type: "periodic",
          frequency: "monthly",
          is_trial: false,
          anchor_day: null,
          anchor_month: null,
          trial_ends_at: null,
        },
  });

  const billingType = useWatch({ control, name: "billing_type" });
  const frequency = useWatch({ control, name: "frequency" });
  const isTrial = useWatch({ control, name: "is_trial" });

  // Reset anchor fields when billing type / frequency changes
  useEffect(() => {
    setValue("anchor_day", null);
    setValue("anchor_month", null);
  }, [billingType, frequency, setValue]);

  const showAnchorDay = billingType === "fixed_date";
  // const showAnchorMonth = billingType === "fixed_date" && frequency === "yearly";

  const isDirty = Object.keys(dirtyFields).length > 0;
  const canSubmit = isValid && !isSubmitting && (!isEditing || isDirty);
  const isPending = addSubscription.isPending || updateSubscription.isPending;
  const mutationError = addSubscription.error || updateSubscription.error;

  async function onSubmit(data: SubscriptionForm) {
    try {
      const payload = {
        name: data.name,
        category: data.category,
        amount: data.amount,
        description: data.description || undefined,
        billing_type: data.billing_type,
        frequency: data.frequency,
        anchor_day: showAnchorDay ? data.anchor_day ?? null : null,
        is_trial: data.is_trial,
        trial_ends_at: data.is_trial ? data.trial_ends_at ?? null : null,
      };

      if (isEditing) {
        await updateSubscription.mutateAsync({ id: initialData.id, data: payload });
      } else {
        await addSubscription.mutateAsync(payload);
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
        className="bg-card rounded-sm shadow-lg p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {isEditing ? "Edit Subscription" : "Add Subscription"}
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

          {/* Name */}
          <div>
            <label className="field-label">Name</label>
            <input
              type="text"
              placeholder="e.g. Netflix"
              {...register("name")}
              className={`${fieldStyle(!!errors.name)} w-full`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="field-label">Category</label>
            <select
              {...register("category")}
              className={`${fieldStyle(!!errors.category)} w-full`}
            >
              <option value="">Select category</option>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="field-label">Amount</label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              {...register("amount", { setValueAs: (v) => parseFloat(v) })}
              className={`${fieldStyle(!!errors.amount)} w-full`}
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="field-label">Description <span className="text-muted-foreground font-normal">(optional)</span></label>
            <input
              type="text"
              placeholder="Add a note..."
              {...register("description")}
              className={`${fieldStyle()} w-full`}
            />
          </div>

          {/* Billing type */}
          <div>
            <label className="field-label">Billing type</label>
            <div className="flex gap-2">
              {(["periodic", "fixed_date"] as const).map((type) => (
                <label
                  key={type}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-sm border text-sm cursor-pointer transition-colors ${
                    billingType === type
                      ? "border-primary bg-primary/10 text-foreground font-medium"
                      : "border-transparent bg-muted/35 text-muted-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("billing_type")}
                    className="sr-only"
                  />
                  {type === "periodic" ? "Periodic" : "Fixed date"}
                </label>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="field-label">Frequency</label>
            <select
              {...register("frequency")}
              className={`${fieldStyle()} w-full`}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Anchor day — day of week for fixed weekly */}
          {showAnchorDay && frequency === "weekly" && (
            <div>
              <label className="field-label">Day of week</label>
              <select
                {...register("anchor_day", { setValueAs: (v) => v ? parseInt(v) : null })}
                className={`${fieldStyle(!!errors.anchor_day)} w-full`}
              >
                <option value="">Select day</option>
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              {errors.anchor_day && <p className="text-red-500 text-xs mt-1">{errors.anchor_day.message}</p>}
            </div>
          )}

          {/* Anchor day — day of month for fixed monthly */}
          {showAnchorDay && frequency === "monthly" && (
            <div>
              <label className="field-label">Day of month</label>
              <select
                {...register("anchor_day", { setValueAs: (v) => v ? parseInt(v) : null })}
                className={`${fieldStyle(!!errors.anchor_day)} w-full`}
              >
                <option value="">Select day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.anchor_day && <p className="text-red-500 text-xs mt-1">{errors.anchor_day.message}</p>}
            </div>
          )}

          {/* Anchor day + month for fixed yearly */}
          {showAnchorDay && frequency === "yearly" && (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="field-label">Month</label>
                <select
                  {...register("anchor_month", { setValueAs: (v) => v ? parseInt(v) : null })}
                  className={`${fieldStyle(!!errors.anchor_month)} w-full`}
                >
                  <option value="">Month</option>
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                {errors.anchor_month && <p className="text-red-500 text-xs mt-1">{errors.anchor_month.message}</p>}
              </div>
              <div className="flex-1">
                <label className="field-label">Day</label>
                <select
                  {...register("anchor_day", { setValueAs: (v) => v ? parseInt(v) : null })}
                  className={`${fieldStyle(!!errors.anchor_day)} w-full`}
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.anchor_day && <p className="text-red-500 text-xs mt-1">{errors.anchor_day.message}</p>}
              </div>
            </div>
          )}

          {/* Is trial */}
          <div className="flex items-center justify-between py-1">
            <label className="text-sm font-medium">Trial subscription</label>
            <button
              type="button"
              role="switch"
              aria-checked={isTrial}
              onClick={() => setValue("is_trial", !isTrial, { shouldDirty: true, shouldValidate: true })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none ${
                isTrial ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isTrial ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Trial end date */}
          {isTrial && (
            <div>
              <label className="field-label">Trial end date</label>
              <input
                type="date"
                {...register("trial_ends_at")}
                className={`${fieldStyle(!!errors.trial_ends_at)} w-full`}
              />
              {errors.trial_ends_at && (
                <p className="text-red-500 text-xs mt-1">{errors.trial_ends_at.message}</p>
              )}
            </div>
          )}

          {mutationError && (
            <p className="text-red-500 text-xs">{mutationError.message}</p>
          )}

          <Button type="submit" disabled={!canSubmit || isPending} className="w-full mt-2">
            {isPending ? "Saving..." : isEditing ? "Update Subscription" : "Add Subscription"}
          </Button>

        </form>
      </div>
    </div>
  );
}