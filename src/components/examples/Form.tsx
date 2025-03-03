"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

// Define the form input types
interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  shouldRemember: boolean;
}

// Define the validation schema using yup
const loginSchema = yup.object().shape({
  name: yup.string().max(16, "Name too long").required("Name is required"),
  age: yup
    .number()
    .min(18, "You must 18 or older")
    .max(120, "Invalid Age")
    .required("Age is required")
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    ),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  shouldRemember: yup.boolean().default(true),
});

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: unknown) => {
    try {
        console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1">
        <div className="mb-4">
          <label className="font-semibold" htmlFor="Name">
            Name:
          </label>
          <input
            id="Name"
            type="text"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="John Doe"
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="Age">
            Age:
          </label>
          <input
            id="Age"
            type="number"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            {...register("age")}
          />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginEmail">
            Email:
          </label>
          <input
            id="LoginEmail"
            type="email"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="name@example.com"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginPassword">
            Password
          </label>
          <input
            id="LoginPassword"
            type="password"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="******"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="mb-4 flex justify-between">
          <div className="mb-0 flex items-center">
            <input
              className="form-checkbox me-2 rounded border-gray-200 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0 dark:border-gray-800"
              type="checkbox"
              id="RememberMe"
              {...register("shouldRemember")}
            />
            <label
              className="form-checkbox-label text-slate-400"
              htmlFor="RememberMe"
            >
              Remember me
            </label>
          </div>
        </div>
        <div className="mb-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="inline-block w-full rounded-md border border-red-400 bg-red-400 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
          >
            {isSubmitting ? "Process to login" : "Login"}
          </button>
        </div>
      </div>
    </form>
  );
}
