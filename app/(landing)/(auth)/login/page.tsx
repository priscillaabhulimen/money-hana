'use client';

import { fieldStyle, buttonStyle } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/services/auth";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/hooks/useCurrentUser";

const schema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string()
    .min(1, "Password is required"),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    const emailFromQuery = searchParams.get("email")?.trim();
    const emailFromLocalStorage = localStorage.getItem("passwordResetEmail")?.trim();
    const emailToPrefill = emailFromQuery || emailFromLocalStorage;

    if (emailToPrefill) {
      setValue("email", emailToPrefill, { shouldValidate: true });
      localStorage.removeItem("passwordResetEmail");
    }
  }, [searchParams, setValue]);

  async function onSubmit(data: LoginForm) {
    setServerError(null);
    try {
      const result = await loginUser(data);
      queryClient.setQueryData(authKeys.me, result);
      if (!result.data.isVerified) {
        router.push("/verify-email");
        return;
      }
      router.push("/dashboard");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <div className="flex-1 flex items-center mb-8 lg:mb-0">
      <div className="flex flex-col gap-2 mx-auto max-w-lg px-6 w-full">
        <h1 className="text-2xl font-semibold">Hi there!</h1>
        <div className="px-8 py-6 bg-card border border-border rounded-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="email" className="field-label">Email</label>
            <input
              {...register("email")}
              type="text"
              id="email"
              placeholder="john@example.com"
              className={`${fieldStyle(!!errors.email)} w-full`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}

            <label htmlFor="password" className="mt-2 field-label">Password</label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
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

            <div className="mt-2.5 flex justify-end">
              <Link href="/forgot-password" className="text-sm text-primary">Forgot password?</Link>
            </div>

            {serverError && (
              <p className="text-red-500 text-xs mt-3 text-center">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`${buttonStyle} mt-10`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="mt-2.5 flex justify-center gap-1">
              <p className="text-sm py-2 text-muted-foreground">{"Don't"} have an account?</p>
              <Link
                className="text-sm text-primary font-semibold py-2 cursor-pointer"
                href="/register"
              >Register</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}