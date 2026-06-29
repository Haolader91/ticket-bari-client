"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import ProfileCard from "@/components/ProfileCard";

export default function VendorProfilePage() {
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
      roleColor="bg-amber-500"
      buttonText="Vendor Settings"
      buttonColorClasses="bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600"
    />
  );
}
