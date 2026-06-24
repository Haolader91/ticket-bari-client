"use client";

import { useState } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaCalendarAlt, FaBus } from "react-icons/fa";

const DEMO_TICKETS = [
  {
    _id: "t1",
    title: "Hanif Enterprise - Scania Multi-Axle",
    from: "Dhaka",
    to: "Cox's Bazar",
    transportType: "AC Sleeper",
    price: 1200,
    quantity: 12,
    perks: ["WiFi", "Water Bottle", "Blanket"],
    departureDateTime: "2026-07-15T22:30:00",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600",
    status: "approved",
  },
  {
    _id: "t2",
    title: "Green Line Paribahan - Volvo Sleeper",
    from: "Dhaka",
    to: "Sylhet",
    transportType: "AC Sleeper",
    price: 1500,
    quantity: 0,
    perks: ["Snacks", "WiFi", "Premium Seats"],
    departureDateTime: "2026-06-30T08:15:00",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=600",
    status: "approved",
  },
  {
    _id: "t3",
    title: "Ena Transport - Hyundai Universe",
    from: "Chittagong",
    to: "Dhaka",
    transportType: "Non-AC Business",
    price: 800,
    quantity: 24,
    perks: ["Water Bottle"],
    departureDateTime: "2026-07-20T14:00:00",
    image:
      "https://images.unsplash.com/photo-1562620644-65db4039121b?q=80&w=600",
    status: "approved",
  },
];

export default function AllTicketsPage() {
  const [tickets] = useState(DEMO_TICKETS);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          Available Tickets (Demo)
        </h1>
        <p className="text-sm text-slate-400 font-medium mt-1">
          Explore our UI layout with template data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-100">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="object-cover w-full h-full"
                />
                <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-extrabold bg-indigo-50 text-indigo-600 rounded-lg uppercase tracking-wider border border-indigo-100 flex items-center gap-1">
                  <FaBus /> {ticket.transportType}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-black text-slate-800 tracking-tight line-clamp-1">
                  {ticket.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-600">
                  <FaMapMarkerAlt className="text-indigo-500" />
                  <span>{ticket.from}</span>
                  <span className="text-slate-300">➔</span>
                  <span>{ticket.to}</span>
                </div>

                <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <FaCalendarAlt />
                  <span>
                    {new Date(ticket.departureDateTime).toLocaleDateString(
                      "en-US",
                      { weekday: "short", month: "short", day: "numeric" },
                    )}
                    {" @ "}
                    {new Date(ticket.departureDateTime).toLocaleTimeString(
                      "en-US",
                      { hour: "2-digit", minute: "2-digit" },
                    )}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {ticket.perks.map((perk, index) => (
                    <span
                      key={index}
                      className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md font-medium border border-slate-100"
                    >
                      {perk}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Available
                    </p>
                    <p
                      className={`text-sm font-extrabold ${ticket.quantity === 0 ? "text-rose-500" : "text-slate-700"}`}
                    >
                      {ticket.quantity === 0
                        ? "Sold Out"
                        : `${ticket.quantity} Seats`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Price
                    </p>
                    <p className="text-lg font-black text-indigo-600">
                      ৳{ticket.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href={`/allTickets/${ticket._id}`}
                className="block w-full text-center bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all duration-200"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
