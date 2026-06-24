"use client";
import { useState } from "react";
import { FaInbox, FaCheck, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function RequestedBookings() {
  const [requests, setRequests] = useState([
    {
      id: "r1",
      user: "AK Haolader",
      ticket: "Green Line Paribahan",
      qty: 2,
      total: 300,
      status: "pending",
    },
  ]);

  const handleAction = (id, action) => {
    toast.success(`Booking request ${action}ed!`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
          <FaInbox size={20} />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800">
            Requested Bookings
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Approve or reject incoming ticket reservation requests
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Passenger</th>
                <th className="p-4">Bus / Ticket</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4">Total</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
              {requests.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="p-4 font-bold text-slate-800">{r.user}</td>
                  <td className="p-4 text-xs font-semibold">{r.ticket}</td>
                  <td className="p-4 text-center">{r.qty}</td>
                  <td className="p-4 text-emerald-600 font-black">
                    ৳{r.total}
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleAction(r.id, "accept")}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-all"
                    >
                      <FaCheck size={10} /> Accept
                    </button>
                    <button
                      onClick={() => handleAction(r.id, "reject")}
                      className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-lg text-xs font-bold transition-all"
                    >
                      <FaTimes size={10} /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
