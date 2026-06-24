"use client";

import { useState } from "react";
import {
  FaBullhorn,
  FaCheck,
  FaPlus,
  FaMinus,
  FaBus,
  FaTags,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdvertiseTickets() {
  const [tickets, setTickets] = useState([
    {
      id: "t1",
      vendorName: "Green Line Paribahan",
      title: "Volvo Sleeper - Dhaka to Cox's Bazar",
      route: "Dhaka ➔ Cox's Bazar",
      price: 1500,
      isAdvertised: true,
    },
    {
      id: "t2",
      vendorName: "Hanif Enterprise",
      title: "Scania Multi-Axle - Dhaka to Sylhet",
      route: "Dhaka ➔ Sylhet",
      price: 1200,
      isAdvertised: true,
    },
    {
      id: "t3",
      vendorName: "Ena Transport",
      title: "Non-AC Hino - Dhaka to Chittagong",
      route: "Dhaka ➔ Chittagong",
      price: 800,
      isAdvertised: false,
    },
    {
      id: "t4",
      vendorName: "Desh Travels",
      title: "Hyundai Universe - Dhaka to Rajshahi",
      price: 1000,
      route: "Dhaka ➔ Rajshahi",
      isAdvertised: false,
    },
    {
      id: "t5",
      vendorName: "Shyamoli Paribahan",
      title: "Scania AC - Dhaka to Kolkata",
      price: 2100,
      route: "Dhaka ➔ Kolkata",
      isAdvertised: false,
    },
    {
      id: "t6",
      vendorName: "Saintmartin Travels",
      title: "Volvo AC - Dhaka to Teknaf",
      price: 1600,
      route: "Dhaka ➔ Teknaf",
      isAdvertised: false,
    },
    {
      id: "t7",
      vendorName: "Shohagh Paribahan",
      title: "Scania Business Class - Dhaka to Khulna",
      price: 1400,
      route: "Dhaka ➔ Khulna",
      isAdvertised: false,
    },
  ]);

  const advertisedCount = tickets.filter(
    (ticket) => ticket.isAdvertised,
  ).length;

  // Toggle Advertise / Unadvertise Function
  const handleToggleAdvertise = (id, currentStatus, title) => {
    if (!currentStatus && advertisedCount >= 6) {
      toast.error(
        "Maximum limit reached! You can only advertise up to 6 tickets.",
        {
          style: {
            borderRadius: "16px",
            background: "#334155",
            color: "#fff",
          },
        },
      );
      return;
    }

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, isAdvertised: !currentStatus } : ticket,
      ),
    );

    if (!currentStatus) {
      toast.success("Ticket added to Home Page Advertisement Section!", {
        icon: "📢",
      });
    } else {
      toast.success("Ticket removed from Advertisement.", { icon: "🗑️" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-[#6366F1] rounded-2xl border border-indigo-100 shadow-xs">
            <FaBullhorn size={22} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800">
              Advertise Approved Tickets
            </h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">
              Promote top tickets directly to the Home Page slider/grid
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-bold shadow-md shadow-slate-900/10 border border-slate-800 self-start md:self-auto">
          <span className="text-indigo-400">Slots Filled:</span>
          <span
            className={`${advertisedCount >= 6 ? "text-rose-400" : "text-emerald-400"}`}
          >
            {advertisedCount} / 6
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-5">Approved Ticket Details</th>
                <th className="p-5">Route</th>
                <th className="p-5">Price</th>
                <th className="p-5 text-center">Home Status</th>
                <th className="p-5 text-right pr-8">Campaign Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className={`transition-colors ${
                    ticket.isAdvertised
                      ? "bg-indigo-50/20 hover:bg-indigo-50/40"
                      : "hover:bg-slate-50/40"
                  }`}
                >
                  <td className="p-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-800 text-sm">
                        {ticket.vendorName}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                        <FaBus className="text-indigo-400 text-[10px]" />{" "}
                        {ticket.title}
                      </span>
                    </div>
                  </td>

                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-xl text-xs font-bold">
                      {ticket.route}
                    </span>
                  </td>

                  <td className="p-5">
                    <span className="text-slate-800 font-extrabold">
                      tk{ticket.price}
                    </span>
                  </td>

                  <td className="p-5 text-center">
                    {ticket.isAdvertised ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg">
                        <FaCheck size={12} /> Live on Home
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-2.5 py-1 text-slate-400 bg-slate-100 rounded-lg">
                        Not Featured
                      </span>
                    )}
                  </td>

                  <td className="p-5 text-right pr-8">
                    <button
                      onClick={() =>
                        handleToggleAdvertise(
                          ticket.id,
                          ticket.isAdvertised,
                          ticket.title,
                        )
                      }
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all active:scale-[0.97] ${
                        ticket.isAdvertised
                          ? "bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/10"
                          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20"
                      }`}
                    >
                      {ticket.isAdvertised ? (
                        <>
                          <FaMinus size={10} /> Unadvertise
                        </>
                      ) : (
                        <>
                          <FaPlus size={10} /> Advertise
                        </>
                      )}
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
