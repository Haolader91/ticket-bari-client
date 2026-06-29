"use client";

import { useState, useEffect } from "react";
import { FaChartPie, FaTicketAlt, FaWallet } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueOverview() {
  const { data: session, isPending } = useSession();
  const [revenueStats, setRevenueStats] = useState({
    totalRevenue: 0,
    totalTicketsSold: 0,
  });
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && session?.user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/vendor/revenue-overview?email=${encodeURIComponent(session.user.email)}`,
      )
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success) {
            setRevenueStats(resData.overview);
            setGraphData(resData.graphData || []);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching revenue data:", err);
          setLoading(false);
        });
    } else if (!isPending) {
      setLoading(false);
    }
  }, [isPending, session]);

  const stats = [
    {
      title: "Total Earnings",
      val: `৳${revenueStats.totalRevenue.toLocaleString()}`,
      icon: FaWallet,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      title: "Tickets Sold",
      val: `${revenueStats.totalTicketsSold} Tickets`,
      icon: FaTicketAlt,
      color: "text-indigo-500 bg-indigo-50",
    },
  ];

  if (isPending || loading) {
    return (
      <div className="text-center py-12 font-bold text-slate-400">
        Loading revenue stats...
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="text-center py-12 font-bold text-rose-500">
        Please login to view revenue overview.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
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

      {/* Stats Cards */}
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

      {/* Analytics Graph Chart Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
        <div className="mb-4">
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">
            Sales & Income Analytics
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Visual presentation of day-to-day revenue graph
          </p>
        </div>

        {graphData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-slate-400 font-semibold border border-dashed border-slate-200 rounded-2xl">
            No sales data available yet for the graph.
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={graphData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F1F5F9"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  stroke="#94A3B8"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#94A3B8"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                  }}
                  labelStyle={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#1E293B",
                  }}
                  itemStyle={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#10B981",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue (৳)"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
