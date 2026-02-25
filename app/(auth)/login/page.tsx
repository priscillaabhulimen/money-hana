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

              <div className="mt-2.5 flex justify-end">
                <a href="#" className="text-sm text-[#1919bc]">Forgot Password</a>
              </div>

              <button type="submit" className={buttonStyle(!errors.email && !errors.password)}>
                Login
              </button>

            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#04040a] h-60 w-screen lg:w-[42%] lg:h-auto self-stretch flex lg:flex-col lg:justify-center">
        <div className="lg:ml-6 lg:mr-auto p-4 my-auto">
          <h1 className="text-5xl font-bebas text-white mb-2"><span className="text-[#1919bc]">MONEY</span>HANA</h1>
          <h2 className="text-lg text-white font-medium">Lorem ipsum... sit dolor amet.</h2>
          <p className="text-sm text-white/65 text-justify md:mr-18 font-light">{"I'm"} a little teapot short and stout, this is my handle, this is my spout. {"I'm"} a little teapot short and stout, this is my handle, this is my spout. {"I'm"} a little teapot short and stout, this is my handle, this is my spout.</p>
        </div>
      </div>
    </div>
  );
}