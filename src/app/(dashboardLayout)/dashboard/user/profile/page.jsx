"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import ProfileCard from "@/components/ProfileCard";

export default function UserProfilePage() {
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
      roleColor="bg-blue-600"
      buttonText="Edit Profile"
      buttonColorClasses="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
    />
  );
}
