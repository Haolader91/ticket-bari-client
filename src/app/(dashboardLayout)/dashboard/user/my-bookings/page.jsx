"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTicketAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

function CountdownTimer({ departureDate, status }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (status === "rejected" || status === "paid") {
      setTimeLeft("");
      return;
    }

    const updateTimer = () => {
      const diff = new Date(departureDate).getTime() - new Date().getTime();

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
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
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const fetchUserBookings = useCallback((email) => {
    if (!email) return;
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/bookings?email=${encodeURIComponent(email)}`,
    )
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) setBookings(resData.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!isPending && session?.user?.email) {
      fetchUserBookings(session.user.email);
    } else if (!isPending) {
      setLoading(false);
    }
  }, [isPending, session, fetchUserBookings]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paymentStatus = query.get("payment");
    const bookingId = query.get("bookingId");

    if (paymentStatus === "success" && bookingId && session?.user?.email) {
      window.history.replaceState({}, document.title, window.location.pathname);

      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${bookingId}/pay-success`,
        {
          method: "PATCH",
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Payment successful! Your ticket is confirmed.");

            fetchUserBookings(session.user.email);
          } else {
            toast.error(data.error || "Something went wrong updating status.");
          }
        })
        .catch((err) => {
          console.error("Payment status update error:", err);
        });
    } else if (paymentStatus === "cancel") {
      toast.error("Payment cancelled. You can try again anytime.");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [session?.user?.email, fetchUserBookings]);

  const handlePayment = async (bookingId) => {
    setPaymentProcessing(true);

    const toastId = toast.loading("Redirecting to Stripe Payment Gateway...");

    try {
      const response = await fetch(
        ` ${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-checkout-session`,

        {
          method: "POST",

          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({ bookingId }),
        },
      );

      const resData = await response.json();

      if (resData.success && resData.stripeUrl) {
        toast.dismiss(toastId);

        window.location.href = resData.stripeUrl;
      } else {
        toast.error(resData.error || "Failed to initiate payment.", {
          id: toastId,
        });

        setPaymentProcessing(false);
      }
    } catch (err) {
      console.error(err);

      toast.error("Network error, please try again.", { id: toastId });

      setPaymentProcessing(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="text-center py-12 font-bold text-slate-400">
        Loading your bookings...
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="text-center py-12 font-bold text-rose-500">
        Please login to view your booked tickets.
      </div>
    );
  }

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
            const isExpired =
              new Date(ticket.departureDate).getTime() < new Date().getTime();

            const statusStyles =
              {
                pending: "bg-amber-100 text-amber-700 border-amber-200",
                accepted: "bg-blue-100 text-blue-700 border-blue-200",
                paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
                rejected: "bg-rose-100 text-rose-700 border-rose-200",
              }[ticket.status] ||
              "bg-amber-100 text-amber-700 border-amber-200";

            return (
              <div
                key={ticket._id}
                className="bg-white rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-100">
                    <Image
                      src={ticket.ticketImage || "/placeholder.jpg"}
                      alt="Ticket Image"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 text-xs font-extrabold rounded-xl border uppercase ${statusStyles}`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-black text-slate-800 line-clamp-1">
                      {ticket.ticketTitle}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-600">
                      <FaMapMarkerAlt className="text-[#6366F1]" />
                      <span>{ticket.from}</span>{" "}
                      <span className="text-slate-300">➔</span>{" "}
                      <span>{ticket.to}</span>
                    </div>

                    <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <FaCalendarAlt />

                      <span>
                        {ticket.departureDate
                          ? new Date(ticket.departureDate).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Seats
                        </p>
                        <p className="text-sm font-extrabold text-slate-700">
                          {ticket.bookingQuantity} Tickets
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
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
                      disabled={isExpired || paymentProcessing}
                      className={`flex-1 text-center text-white text-sm font-black py-2.5 px-4 rounded-xl shadow-md transition-all ${
                        isExpired
                          ? "bg-slate-300 cursor-not-allowed shadow-none"
                          : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                      }`}
                    >
                      {isExpired ? "Expired (Cannot Pay)" : "Pay Now (Stripe)"}
                    </button>
                  )}

                  {ticket.status === "paid" && (
                    <div className="flex-1 text-center bg-emerald-50 text-emerald-600 text-sm font-black py-2.5 px-4 rounded-xl border border-emerald-100">
                      ✓ Paid Successfully
                    </div>
                  )}

                  {ticket.status === "pending" && (
                    <div className="flex-1 text-right">
                      <p className="text-xs font-semibold text-slate-400 italic">
                        Waiting for vendor approval...
                      </p>
                    </div>
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
