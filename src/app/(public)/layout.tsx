"use client";

import { Footer } from "@/components/Layouts/Footer";
import { Navbar } from "@/components/Layouts/NavBar";
import { setUser } from "@/contexts/userSlice";
import { verifyUser } from "@/services/verifyUser";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  useEffect(() => {
    async function verify() {
      const accessToken = localStorage.getItem("accessToken");
      // const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken) {
        const user = await verifyUser(accessToken);
        if(user){
          console.log(user);
          dispatch(setUser(user));
        }
      }
    }
    verify();
  }, []);
  return (
    <div className="relative">
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}
