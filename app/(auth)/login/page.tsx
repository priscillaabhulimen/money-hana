'use client';

import { fieldStyle, buttonStyle } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string()
    .min(1, "Password is required"),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: LoginForm) {
    console.log(data);
    // Week 4: replace with real API call
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row flex-1">
      <div className="flex-1">
        <div className="flex flex-col gap-2 justify-center mx-auto max-w-lg px-6 py-8">
          <h1 className="text-2xl font-semibold">Hi there!</h1>
          <div className="px-8 py-6 bg-white drop-shadow-sm rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

              <label htmlFor="email" className="field-label">Email</label>
              <input
                {...register("email")}
                type="text"
                id="email"
                placeholder="john@example.com"
                className={fieldStyle(!!errors.email)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}

              <label htmlFor="password" className="mt-2 field-label">Password</label>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="*********"
                className={fieldStyle(!!errors.password)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}

              <button type="submit" className={buttonStyle(!errors.email && !errors.password)}>
                Login
              </button>

            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#0f0f1a] h-60 w-screen lg:w-[42%] lg:h-screen flex lg:flex-col justify-center">
        <div className="lg:ml-6 lg:mr-auto p-4 border border-white rounded-md my-auto">
          <h1 className="text-5xl font-bebas text-white">MONEYHANA</h1>
        </div>
      </div>
    </div>
  );
}