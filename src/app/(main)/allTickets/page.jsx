"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaMapMarkerAlt, FaCalendarAlt, FaBus } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import TicketFilterBar from "@/components/TicketFilterBar";

export default function AllTicketsPage() {
  const { isPending: isAuthPending } = useSession();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transportFilter, setTransportFilter] = useState("All");
  const [priceSort, setPriceSort] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/tickets")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setTickets(resData.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tickets:", err);
        setLoading(false);
      });
  }, []);

  const filteredAndSortedTickets = tickets
    .filter((ticket) => {
      const matchesFrom = ticket.from
        ?.toLowerCase()
        .includes(searchFrom.toLowerCase());
      const matchesTo = ticket.to
        ?.toLowerCase()
        .includes(searchTo.toLowerCase());
      const matchesTransport =
        transportFilter === "All" || ticket.transportType === transportFilter;
      return matchesFrom && matchesTo && matchesTransport;
    })
    .sort((a, b) => {
      if (priceSort === "lowToHigh") return a.price - b.price;
      if (priceSort === "highToLow") return b.price - a.price;
      return 0;
    });

  if (loading || isAuthPending) {
    return (
      <div className="text-center py-12 font-bold text-slate-400">
        Loading approved tickets...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          Available Tickets
        </h1>
        <p className="text-sm text-slate-400 font-medium mt-1">
          Explore real-time tickets approved by Admin
        </p>
      </div>

      <TicketFilterBar
        searchFrom={searchFrom}
        setSearchFrom={setSearchFrom}
        searchTo={searchTo}
        setSearchTo={setSearchTo}
        transportFilter={transportFilter}
        setTransportFilter={setTransportFilter}
        priceSort={priceSort}
        setPriceSort={setPriceSort}
      />

      {filteredAndSortedTickets.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400 font-bold">
          No tickets match your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTickets.map((ticket) => {
            const validImageSrc =
              ticket.image &&
              (ticket.image.startsWith("https://images.unsplash.com") ||
                ticket.image.startsWith("https://images.pexels.com"))
                ? ticket.image
                : "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600";

            return (
              <div
                key={ticket._id}
                className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={validImageSrc}
                      alt={ticket.title || "Ticket"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-extrabold bg-indigo-50 text-indigo-600 rounded-lg uppercase tracking-wider border border-indigo-100 flex items-center gap-1 z-10">
                      <FaBus /> {ticket.transportType || "Bus"}
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
                        {ticket.departureDateTime
                          ? new Date(
                              ticket.departureDateTime,
                            ).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                        {" @ "}
                        {ticket.departureDateTime
                          ? new Date(
                              ticket.departureDateTime,
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {ticket.perks?.map((perk, index) => (
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
            );
          })}
        </div>
      )}
    </div>
  );
}
