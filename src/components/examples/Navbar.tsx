"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full bg-red-300 text-white">
      <div className="flex items-center w-1/4">
        <Link className="border-r border-red-600 hover:bg-red-600 font-semibold text-xl px-6 py-2 my-2" href="/">Home</Link>
        <Link className="border-r border-red-600 hover:bg-red-600 font-semibold text-xl px-6 py-2 my-2" href="/About">About</Link>
      </div>
      <div className="flex w-1/6 justify-end">
        <Link className="border-l border-red-600 hover:bg-red-600 font-semibold text-xl px-6 py-2 my-2" href="/profile">Profile</Link>
      </div>
    </div>
  );
}
