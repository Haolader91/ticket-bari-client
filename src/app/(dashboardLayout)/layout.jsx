import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-800">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <main className="flex-1 p-6 md:p-8 pt-20 lg:pt-8 overflow-y-auto h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
