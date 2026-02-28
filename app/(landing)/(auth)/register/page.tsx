'use client';

import { fieldStyle, buttonStyle } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().trim()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  password: z.string().trim()
    .min(1, "Password is required"),
  confirmPassword: z.string().trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof schema>;

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<RegisterForm>({
        resolver: zodResolver(schema),
        mode: "onChange",
      });
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    
    function onSubmit(data: RegisterForm) {
        console.log(data);
        router.push('/dashboard');
    }

    return (
      <div className="flex-1 flex items-center mb-8 lg:mb-0">
        <div className="flex flex-col gap-2 mx-auto max-w-lg px-6 w-full">
          <h1 className="text-2xl font-semibold">Hi there!</h1>
          <div className="px-8 py-6 bg-white border border-[04040a]/25 rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

              <label htmlFor="firstName" className="field-label">First name</label>
              <input
                {...register("firstName")}
                type="text"
                id="firstName"
                placeholder="John"
                className={`${fieldStyle(!!errors.firstName)} w-full`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
              )}

              <label htmlFor="lastName" className="field-label mt-2">Last name</label>
              <input
                {...register("lastName")}
                type="text"
                id="lastName"
                placeholder="Smith"
                className={`${fieldStyle(!!errors.lastName)} w-full`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
              )}

              <label htmlFor="email" className="field-label mt-2">Email</label>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}

              <label htmlFor="password" className="mt-2 field-label">Confirm Password</label>
              <div className="relative">
                <Lock 
                  size={16} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
                />
                <input
                  {...register("confirmPassword")}
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
                  className={`${fieldStyle(!!errors.confirmPassword)} pl-9 pr-9 w-full`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={buttonStyle}
              >
                Register
              </button>

              <div className="mt-2.5 flex gap-1 justify-center">
                <p className="text-sm py-2 text-gray-600">Already have an account?</p>
                <Link 
                  className="text-sm text-[#1919bc] font-semibold py-2 cursor-pointer"
                  href={'/login'}
                >Login</Link>
              </div>

            </form>
          </div>
        </div>
      
    </div>
  );
}