"use client";

import { useRouter } from "next/navigation";
import { authenticateUser } from "@/services/authenticateUser";
import { LoginDto } from "@/api";
import LoginForm from "@/components/Auth/LoginForm";
import { useDispatch } from "react-redux";
import { setUser } from "@/contexts/userSlice";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogin = async (data: LoginDto) => {
    try {
      const res = await authenticateUser(data);
      if (res) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        alert("Login successful!");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <LoginForm onSubmit={handleLogin} />
        <p className="text-center mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign_up/step_1" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
