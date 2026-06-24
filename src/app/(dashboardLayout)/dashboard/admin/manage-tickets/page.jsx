"use client";

import { useState } from "react";
import {
  FaTicketAlt,
  FaCheck,
  FaTimes,
  FaBus,
  FaUser,
  FaTags,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function ManageTickets() {
  const [tickets, setTickets] = useState([
    {
      id: "t1",
      vendorName: "Green Line Paribahan",
      title: "Volvo Sleeper - Dhaka to Cox's Bazar",
      route: "Dhaka ➔ Cox's Bazar",
      price: 1500,
      seats: 40,
      status: "pending",
    },
    {
      id: "t2",
      vendorName: "Hanif Enterprise",
      title: "Scania Multi-Axle - Dhaka to Sylhet",
      route: "Dhaka ➔ Sylhet",
      price: 1200,
      seats: 36,
      status: "approved",
    },
    {
      id: "t3",
      vendorName: "Ena Transport",
      title: "Non-AC Hino - Dhaka to Chittagong",
      route: "Dhaka ➔ Chittagong",
      price: 800,
      seats: 40,
      status: "rejected",
    },
  ]);

  const handleApprove = (id, vendor) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "approved" } : ticket,
      ),
    );
    toast.success(`Approved! This ticket is now public on All Tickets page.`, {
      duration: 4000,
    });
  };

  const handleReject = (id, vendor) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "rejected" } : ticket,
      ),
    );
    toast.error(`Ticket from ${vendor} has been rejected.`, {
      duration: 4000,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-50 text-[#6366F1] rounded-2xl border border-indigo-100">
          <FaTicketAlt size={22} />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800">
            Manage Vendor Tickets
          </h1>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">
            Review, Approve, or Reject incoming transport tickets
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-5">Vendor & Bus Info</th>
                <th className="p-5">Route Details</th>
                <th className="p-5">Pricing & Seats</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-slate-50/40 transition-colors"
                >
                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
                        <FaUser className="text-slate-400 text-xs" />{" "}
                        {ticket.vendorName}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                        <FaBus className="text-indigo-400 text-xs" />{" "}
                        {ticket.title}
                      </span>
                    </div>
                  </td>

                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold inline-block">
                      {ticket.route}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-emerald-600 font-black text-base">
                        ৳{ticket.price}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {ticket.seats} Seats Available
                      </span>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        ticket.status === "approved"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : ticket.status === "rejected"
                            ? "bg-rose-50 text-rose-600 border border-rose-100"
                            : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() =>
                          handleApprove(ticket.id, ticket.vendorName)
                        }
                        disabled={ticket.status === "approved"}
                        className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          ticket.status === "approved"
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.97]"
                        }`}
                        title="Approve & Make Public"
                      >
                        <FaCheck size={11} /> Approve
                      </button>

                      <button
                        onClick={() =>
                          handleReject(ticket.id, ticket.vendorName)
                        }
                        disabled={ticket.status === "rejected"}
                        className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          ticket.status === "rejected"
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50"
                            : "bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/10 active:scale-[0.97]"
                        }`}
                        title="Reject Ticket"
                      >
                        <FaTimes size={11} /> Reject
                      </button>
                    </div>
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
