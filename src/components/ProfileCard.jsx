"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const defaultAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100";

  const defaultBanner =
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800";

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-[#6366F1]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="relative h-48 w-full bg-slate-900">
        <Image
          src={defaultBanner}
          alt="Profile Cover"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>

      <div className="relative px-6 pb-8 text-center flex flex-col items-center">
        <div className="relative w-28 h-28 -mt-14 border-4 border-white rounded-full overflow-hidden shadow-lg bg-slate-200">
          <Image
            src={user?.image || defaultAvatar}
            alt={user?.name || "User Avatar"}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
        <span className="mt-4 px-4 py-1 text-xs font-extrabold tracking-wide uppercase bg-amber-500 text-white rounded-full shadow-sm capitalize">
          {user?.role || "No Role Found"}
        </span>
        <h2 className="mt-3 text-2xl font-black text-slate-800 tracking-tight capitalize">
          {user?.name || "Unknown User"}
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-400">
          {user?.email || "No Email"}
        </p>

        <button className="mt-6 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 rounded-xl transition-all duration-300 shadow-md shadow-cyan-500/10 transform hover:-translate-y-0.5">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
