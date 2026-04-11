'use client';

import { buttonStyle, fieldStyle } from "@/lib/constants";
import { ResetPasswordRequestError, resetPassword } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  password: z.string().trim()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string().trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordForm = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    clearErrors,
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  async function onSubmit(data: ResetPasswordForm) {
    setSuccessMessage(null);
    clearErrors("root");

    const token = searchParams.get("token")?.trim();
    if (!token) {
      setError("root", { type: "manual", message: "Reset link is invalid or expired. Request a new link." });
      return;
    }

    try {
      await resetPassword({
        token,
        new_password: data.password,
      });

      const resetEmail = localStorage.getItem("passwordResetEmail") ?? "";
      const query = resetEmail ? `?email=${encodeURIComponent(resetEmail)}` : "";

      setSuccessMessage("Password reset successful. For security, you need to log in again.");
      localStorage.removeItem("passwordResetEmail");

      setTimeout(() => {
        router.push(`/login${query}`);
      }, 1200);
    } catch (error) {
      if (error instanceof ResetPasswordRequestError) {
        if (error.status === 400) {
          setError("root", { type: "manual", message: "Reset link is invalid or expired. Request a new link." });
          return;
        }

        if (error.status === 429) {
          setError("root", { type: "manual", message: "Too many requests. Please try again soon." });
          return;
        }

        if (error.status >= 500) {
          setError("root", { type: "manual", message: "Server error. Please try again in a moment." });
          return;
        }
      }

      setError("root", { type: "manual", message: "Server error. Please try again in a moment." });
    }
  }

  return (
    <div className="flex-1 flex items-center mb-8 lg:mb-0">
      <div className="flex flex-col gap-2 mx-auto max-w-lg px-6 w-full">
        <h1 className="text-2xl font-semibold">Set a new password</h1>
        <div className="px-8 py-6 bg-card border border-border rounded-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label htmlFor="password" className="mt-2 field-label">New Password</label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="*********"
                className={`${fieldStyle(!!errors.password)} pl-9 pr-9 w-full`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-muted-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}

            <p className="text-xs text-muted-foreground mt-2">
              Use at least 8 characters, including one uppercase letter and one number.
            </p>

            <label htmlFor="confirmPassword" className="mt-2 field-label">Confirm Password</label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="*********"
                className={`${fieldStyle(!!errors.confirmPassword)} pl-9 pr-9 w-full`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-muted-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}

            {errors.root && (
              <p className="text-red-500 text-xs mt-3 text-center">{errors.root.message}</p>
            )}

            {successMessage && (
              <p className="text-green-600 text-xs mt-3 text-center">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={!isValid || isSubmitting || !!successMessage}
              className={`${buttonStyle} mt-10`}
            >
              {isSubmitting ? "Resetting password..." : "Reset password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
