"use client";

import { useState, useEffect } from "react";
import { FaHistory, FaSearch, FaDownload } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";

export default function TransactionHistory() {
  const { data: session, isPending } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && session?.user?.email) {
      fetch(
        `http://localhost:8080/api/user/transaction-history?email=${encodeURIComponent(session.user.email)}`,
      )
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success) {
            setTransactions(resData.data || []);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching transactions:", err);
          setLoading(false);
        });
    } else if (!isPending) {
      setLoading(false);
    }
  }, [isPending, session]);

  const filteredTransactions = transactions.filter((txn) =>
    txn._id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isPending || loading) {
    return (
      <div className="text-center py-12 font-bold text-slate-400">
        Loading transaction history...
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="text-center py-12 font-bold text-rose-500">
        Please login to view your transaction history.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <FaHistory className="text-emerald-500 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Transaction History
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              Review all your successful Stripe payments
            </p>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-all">
          <FaDownload className="text-xs" />
          <span>Statement</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 overflow-hidden">
        <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
          <div className="relative w-full max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <FaSearch className="text-slate-400 text-xs" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Transaction ID..."
              className="w-full pl-9 pr-4 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#6366F1] transition-all"
            />
          </div>
          <span className="text-xs font-bold text-slate-400">
            Total Logs: {filteredTransactions.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Ticket Title</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6 text-center">Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-600">
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn._id}
                  className="hover:bg-slate-50/40 transition-colors"
                >
                  <td className="py-4 px-6 font-mono text-xs font-bold text-slate-800">
                    <span className="px-2 py-1 bg-slate-100 rounded-lg border border-slate-200/60">
                      {txn._id}
                    </span>
                  </td>

                  <td className="py-4 px-6 max-w-xs sm:max-w-sm truncate font-bold text-slate-700">
                    {txn.ticketTitle}
                  </td>

                  <td className="py-4 px-6 text-right font-black text-emerald-600">
                    <span className="inline-flex items-center gap-0.5">
                      ৳{txn.totalPrice.toLocaleString()}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-center text-xs text-slate-400 font-semibold">
                    {txn.paidAt ? (
                      <>
                        {new Date(txn.paidAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        <span className="mx-1.5 text-slate-200">|</span>
                        {new Date(txn.paidAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-semibold">
            No transaction records found.
          </div>
        )}
      </div>
    </div>
  );
}
