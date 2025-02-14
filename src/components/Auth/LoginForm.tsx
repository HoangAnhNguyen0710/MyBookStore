"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginDto } from "@/api";

// Định nghĩa props cho LoginForm
interface LoginFormProps {
  onSubmit: (data: LoginDto) => Promise<void>; // Truyền từ page.tsx
}

// Schema validation
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1">
        {/* Email Field */}
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginEmail">Email:</label>
          <input
            id="LoginEmail"
            type="email"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="name@example.com"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginPassword">Password</label>
          <input
            id="LoginPassword"
            type="password"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="******"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="inline-block w-full rounded-md border border-red-400 bg-red-400 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
          >
            {isSubmitting ? "Processing..." : "Login"}
          </button>
        </div>
      </div>
    </form>
  );
}
