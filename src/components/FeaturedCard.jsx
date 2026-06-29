"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBus, FaMapMarkerAlt } from "react-icons/fa";

export default function FeaturedTickets() {
  const [featuredTickets, setFeaturedTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/featured-tickets")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setFeaturedTickets(resData.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading featured tickets:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 text-slate-400 font-bold">
        Loading special deals...
      </div>
    );
  }

  if (featuredTickets.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-50/40 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-black text-[#0f172a] tracking-tight">
          Featured Tickets
        </h2>
        <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto mt-3 leading-relaxed">
          Choose your route, pick your seat, and travel stress-free with fast
          booking, trusted operators, and real-time updates.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={
                    ticket.image ||
                    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600"
                  }
                  alt={ticket.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
                  <span className="text-white font-black text-sm tracking-wide">
                    {ticket.vendorName || "Verified Operator"}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 mb-3 bg-emerald-50/60 px-3 py-1.5 rounded-xl w-fit">
                  <FaMapMarkerAlt size={10} />
                  <span>{ticket.from}</span>
                  <span className="text-slate-300 font-normal">➔</span>
                  <span>{ticket.to}</span>
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-xl font-black text-slate-800">
                    ৳{ticket.price}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    / ticket
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <FaBus className="text-indigo-500 text-[11px]" />{" "}
                    {ticket.transportType || "Bus"}
                  </span>
                  <span className="bg-slate-100/80 px-2 py-0.5 rounded-md text-[11px] text-slate-600 font-semibold">
                    {ticket.quantity === 0
                      ? "Sold Out"
                      : `${ticket.quantity} seats left`}
                  </span>
                </div>

                {ticket.perks && ticket.perks.length > 0 && (
                  <>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
                      Included Perks:
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {ticket.perks.map((perk, index) => (
                        <span
                          key={index}
                          className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold border border-emerald-100/50"
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href={`/allTickets/${ticket._id}`}
                className="block w-full text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200"
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
