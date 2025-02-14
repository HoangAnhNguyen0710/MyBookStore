"use client";

import { setUser } from "@/contexts/userSlice";
import { verifyUser } from "@/services/verifyUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    async function verify() {
      const accessToken = localStorage.getItem("accessToken");
      // const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken) {
        const user = await verifyUser(accessToken);
        if(user){
          dispatch(setUser(user));
          router.push("/");
        }
      }
    }
    verify();
  }, []);
  return (
    <div className="relative">
      <div className="">{children}</div>
    </div>
  );
}
