"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    // লোডিং শেষ হলে এবং ইউজারের সেশন থাকলে রোল অনুযায়ী পুশ করবে
    if (!isPending && session?.user) {
      const role = session.user.role; // 'user', 'vendor', অথবা 'admin'

      if (role === "admin") {
        router.push("/dashboard/admin/profile");
      } else if (role === "vendor") {
        router.push("/dashboard/vendor/profile");
      } else {
        router.push("/dashboard/user/profile");
      }
    }
  }, [session, isPending, router]);

  // রিডাইরেক্ট হওয়ার আগ পর্যন্ত স্ক্রিনে জাস্ট একটা সুন্দর স্পিনার দেখাবে
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-[#6366F1]"></div>
    </div>
  );
}
