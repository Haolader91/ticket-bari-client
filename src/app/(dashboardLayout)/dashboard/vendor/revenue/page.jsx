"use client";
import {
  FaChartPie,
  FaDollarSign,
  FaTicketAlt,
  FaWallet,
} from "react-icons/fa";

export default function RevenueOverview() {
  const stats = [
    {
      title: "Total Earnings",
      val: "45000tk",
      icon: FaWallet,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      title: "Tickets Sold",
      val: "124 ti",
      icon: FaTicketAlt,
      color: "text-indigo-500 bg-indigo-50",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
          <FaChartPie size={20} />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800">
            Revenue Overview
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Track your overall sales analytics and wallet balance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex items-center gap-4"
            >
              <div className={`p-4 rounded-2xl ${s.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {s.title}
                </p>
                <p className="text-2xl font-black text-slate-800 mt-1">
                  {s.val}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
