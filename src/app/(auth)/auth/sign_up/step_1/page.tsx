"use client";

import { useRouter } from "next/navigation";
import { SignUpFirstStepDto } from "@/api";
import SignUpStepOneForm from "@/components/Auth/SignUpFirstStep";
import { SignUpFirstStep } from "@/services/signUpFirstStep";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const handleLogin = async (data: SignUpFirstStepDto) => {
    try {
      const res: unknown = await SignUpFirstStep(data);
      if (res) {
        console.log(res);
        alert("Register successful!");
        router.push("/auth/sign_up/step_2");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <SignUpStepOneForm onSubmit={handleLogin} />
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
