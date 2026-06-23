"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTicketAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

function CountdownTimer({ departureDate, status }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (status === "rejected" || status === "paid") {
      setTimeLeft(null);
      return;
    }

    const calculateTime = () => {
      const difference = new Date(departureDate) - new Date();
      if (difference <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [departureDate, status]);

  if (!timeLeft) return null;

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 font-mono text-xs font-bold">
      <FaClock className="animate-pulse" />
      <span>Leaves in: {timeLeft}</span>
    </div>
  );
}

export default function MyBookedTickets() {
  const [bookings, setBookings] = useState([
    {
      _id: "b1",
      ticketTitle: "Hanif Enterprise - Scania Multi-Axle",
      ticketImage:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600",
      bookingQuantity: 2,
      totalPrice: 2400,
      from: "Dhaka",
      to: "Cox's Bazar",
      departureDate: "2026-07-15T22:30:00",
      status: "pending",
    },
    {
      _id: "b2",
      ticketTitle: "Green Line Paribahan - Volvo Sleeper",
      ticketImage:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=600",
      bookingQuantity: 1,
      totalPrice: 1500,
      from: "Dhaka",
      to: "Sylhet",
      departureDate: "2026-06-30T08:15:00",
      status: "accepted",
    },
    {
      _id: "b3",
      ticketTitle: "Ena Transport - Hyundai Universe",
      ticketImage:
        "https://images.unsplash.com/photo-1562620644-65db4039121b?q=80&w=600",
      bookingQuantity: 4,
      totalPrice: 3200,
      from: "Chittagong",
      to: "Dhaka",
      departureDate: "2026-06-25T14:00:00",
      status: "paid",
    },
    {
      _id: "b4",
      ticketTitle: "Shyamoli Paribahan - Hino 1J",
      ticketImage:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600",
      bookingQuantity: 2,
      totalPrice: 1600,
      from: "Dhaka",
      to: "Rajshahi",
      departureDate: "2026-06-20T11:00:00",
      status: "rejected",
    },
  ]);

  const handlePayment = (bookingId) => {
    toast.loading("Redirecting to Stripe Payment Gateway...");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#6366F1]/10 rounded-2xl border border-[#6366F1]/20">
          <FaTicketAlt className="text-[#6366F1] text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            My Booked Tickets
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Manage your active and past travel bookings
          </p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 font-semibold">
            You haven't booked any tickets yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((ticket) => {
            const statusConfig = {
              pending: {
                text: "Pending",
                style: "bg-amber-100 text-amber-700 border-amber-200",
              },
              accepted: {
                text: "Accepted",
                style: "bg-blue-100 text-blue-700 border-blue-200",
              },
              paid: {
                text: "Paid",
                style: "bg-emerald-100 text-emerald-700 border-emerald-200",
              },
              rejected: {
                text: "Rejected",
                style: "bg-rose-100 text-rose-700 border-rose-200",
              },
            };

            const currentStatus =
              statusConfig[ticket.status] || statusConfig.pending;

            return (
              <div
                key={ticket._id}
                className="bg-white rounded-3xl border border-slate-100 shadow-md shadow-slate-100/50 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-slate-200/80 transition-all duration-300"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-100">
                    <Image
                      src={ticket.ticketImage}
                      alt={ticket.ticketTitle}
                      fill
                      className="object-cover"
                    />

                    <span
                      className={`absolute top-4 right-4 px-3 py-1 text-xs font-extrabold tracking-wide rounded-xl border uppercase shadow-sm ${currentStatus.style}`}
                    >
                      {currentStatus.text}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight line-clamp-1">
                      {ticket.ticketTitle}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-600">
                      <FaMapMarkerAlt className="text-[#6366F1]" />
                      <span>{ticket.from}</span>
                      <span className="text-slate-300">➔</span>
                      <span>{ticket.to}</span>
                    </div>

                    <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <FaCalendarAlt />
                      <span>
                        {new Date(ticket.departureDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                        {" @ "}
                        {new Date(ticket.departureDate).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Seats
                        </p>
                        <p className="text-sm font-extrabold text-slate-700">
                          {ticket.bookingQuantity} Tickets
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Total Cost
                        </p>
                        <p className="text-base font-black text-[#6366F1]">
                          ৳{ticket.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-slate-50 bg-slate-50/30 flex flex-wrap items-center justify-between gap-3 min-h-[60px]">
                  <CountdownTimer
                    departureDate={ticket.departureDate}
                    status={ticket.status}
                  />

                  {ticket.status === "accepted" && (
                    <button
                      onClick={() => handlePayment(ticket._id)}
                      className="flex-1 text-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-black py-2.5 px-4 rounded-xl shadow-md shadow-emerald-500/10 transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      Pay Now (Stripe)
                    </button>
                  )}

                  {ticket.status === "paid" && (
                    <div className="flex-1 text-center bg-emerald-50 text-emerald-600 text-sm font-black py-2.5 px-4 rounded-xl border border-emerald-100">
                      ✓ Paid Successfully
                    </div>
                  )}

                  {ticket.status === "pending" && (
                    <p className="text-xs font-semibold text-slate-400 italic">
                      Waiting for vendor approval...
                    </p>
                  )}

                  {ticket.status === "rejected" && (
                    <div className="flex-1 text-center bg-rose-50 text-rose-600 text-sm font-black py-2.5 px-4 rounded-xl border border-rose-100">
                      Booking Cancelled / Rejected
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
