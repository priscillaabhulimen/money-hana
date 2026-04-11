'use client';

import { buttonStyle, fieldStyle } from "@/lib/constants";
import { forgotPassword } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
});

type ForgotPasswordForm = z.infer<typeof schema>;

const SUCCESS_MESSAGE = "If this email exists, a password reset link has been sent.";

export default function ForgotPasswordPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: ForgotPasswordForm) {
    try {
      await forgotPassword(data.email);
    } catch {
      // Keep response intentionally identical to avoid account enumeration.
    }

    localStorage.setItem("passwordResetEmail", data.email);
    setSuccessMessage(SUCCESS_MESSAGE);
  }

  return (
    <div className="flex-1 flex items-center mb-8 lg:mb-0">
      <div className="flex flex-col gap-2 mx-auto max-w-lg px-6 w-full">
        <h1 className="text-2xl font-semibold">Forgot your password?</h1>
        <div className="px-8 py-6 bg-card border border-border rounded-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label htmlFor="email" className="field-label">Email</label>
            <input
              {...register("email")}
              id="email"
              type="text"
              placeholder="john@example.com"
              className={`${fieldStyle(!!errors.email)} w-full`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}

            {successMessage && (
              <p className="text-green-600 text-xs mt-3 text-center">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={!isValid || isSubmitting || !!successMessage}
              className={`${buttonStyle} mt-10`}
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
            </button>

            <div className="mt-2.5 flex justify-center gap-1">
              <p className="text-sm py-2 text-muted-foreground">Remembered your password?</p>
              <Link
                className="text-sm text-primary font-semibold py-2 cursor-pointer"
                href="/login"
              >
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
