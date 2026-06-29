"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBus, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function LatestTickets() {
  const [latestTickets, setLatestTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/latest-tickets`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setLatestTickets(resData.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading latest tickets:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 font-bold text-slate-400">
        Loading newest routes...
      </div>
    );
  }

  if (latestTickets.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold mb-3">
          <FaClock size={12} className="animate-spin-slow" /> New Releases
        </div>
        <h2 className="text-4xl font-black text-[#0f172a] tracking-tight">
          Recently Added Tickets
        </h2>
        <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto mt-2 leading-relaxed">
          Explore the newest available routes and newly deployed luxury vehicles
          fresh on our platform.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-slate-50/50 rounded-3xl border border-slate-100 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={
                    ticket.image ||
                    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600"
                  }
                  alt={ticket.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  New
                </div>
              </div>

              <div className="p-5">
                <span className="text-xs font-bold text-slate-400 block mb-1">
                  {ticket.vendorName || "Verified Operator"}
                </span>
                <h3 className="text-sm font-bold text-slate-800 line-clamp-1 mb-3">
                  {ticket.title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-3 bg-indigo-50/60 px-2.5 py-1 rounded-lg w-fit">
                  <FaMapMarkerAlt size={10} />
                  <span>{ticket.from}</span>
                  <span className="text-slate-300 font-normal">➔</span>
                  <span>{ticket.to}</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-2">
                  <div>
                    <span className="text-lg font-black text-slate-800">
                      ৳{ticket.price}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block -mt-1">
                      / ticket
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                    <FaBus className="text-slate-400" /> {ticket.quantity} Seats
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href={`/allTickets/${ticket._id}`}
                className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-200"
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
