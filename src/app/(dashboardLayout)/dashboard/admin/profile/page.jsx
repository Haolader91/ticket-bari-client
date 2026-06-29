"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import ProfileCard from "@/components/ProfileCard";

export default function AdminProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending)
    return (
      <div className="text-center py-12 font-bold text-slate-400">
        Loading profile...
      </div>
    );

  return (
    <ProfileCard
      user={session?.user}
      roleColor="bg-rose-600"
      buttonText="Admin Panel"
      buttonColorClasses="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700"
    />
  );
}
