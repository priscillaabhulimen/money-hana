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
  email: z.string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string()
    .min(1, "Password is required"),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  function onSubmit(data: LoginForm) {
    console.log(data);
    router.push('/dashboard');
  }

  return (
    <div className="flex-1 flex items-center">
      <div className="flex flex-col gap-2 mx-auto max-w-lg px-6 w-full">
        <h1 className="text-2xl font-semibold">Hi there!</h1>
        <div className="px-8 py-6 bg-white border border-[04040a]/25 rounded-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="email" className="field-label">Email</label>
            <input
              {...register("email")}
              type="text"
              id="email"
              placeholder="john@example.com"
              className={fieldStyle(!!errors.email) + 'w-full'}
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

            <div className="mt-2.5 flex justify-end">
              <Link href="#" className="text-sm text-[#1919bc]">Forgot Password</Link>
            </div>

            <button type="submit" className={buttonStyle(isValid)}>
              Login
            </button>

            <div className="mt-2.5 flex justify-center gap-1">
              <p className="text-sm py-2">{"Don't"} have an account?</p>
              <Link 
                className="text-sm text-[#1919bc] py-2 cursor-pointer"
                href={'/register'}
              >Register</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}