"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFirstStepDto } from "@/api";

// Định nghĩa props cho LoginForm
interface RegisterFormProps {
  onSubmit: (data: SignUpFirstStepDto) => Promise<void>; // Truyền từ page.tsx
}

// Schema validation
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  name: yup
    .string()
    .required("Name is required"),
});

export default function SignUpStepOneForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFirstStepDto>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1">
        {/* Email Field */}
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginEmail">Email:</label>
          <input
            id=""
            type="email"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="name@example.com"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginPassword">Username</label>
          <input
            id=""
            type="text"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="******"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="inline-block w-full rounded-md border border-red-400 bg-red-400 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
          >
            {isSubmitting ? "Processing..." : "Register"}
          </button>
        </div>
      </div>
    </form>
  );
}
