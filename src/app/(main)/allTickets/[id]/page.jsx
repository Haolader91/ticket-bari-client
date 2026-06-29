"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { Card } from "@heroui/react";

function DetailsCountdown({ departureDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const difference =
        new Date(departureDate).getTime() - new Date().getTime();
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
  }, [departureDate]);

  if (!timeLeft) return null;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono font-bold border ${
        timeLeft === "Expired"
          ? "bg-rose-50 text-rose-600 border-rose-100"
          : "bg-indigo-50 text-indigo-600 border-indigo-100"
      }`}
    >
      <FaClock className={timeLeft !== "Expired" ? "animate-pulse" : ""} />
      <span>
        {timeLeft === "Expired"
          ? "Trip Already Started (Expired)"
          : `Time Left: ${timeLeft}`}
      </span>
    </div>
  );
}

export default function TicketDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingQty, setBookingQty] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/tickets/${id}`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success) {
            setTicket(resData.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching details:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (isPending || loading) {
    return (
      <div className="text-center py-12 font-bold text-slate-400">
        Loading ticket details...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12 font-bold text-rose-400">
        Ticket not found!
      </div>
    );
  }

  const isExpired = new Date(ticket.departureDateTime) < new Date();
  const isSoldOut = ticket.quantity <= 0;
  const isBookButtonDisabled = isExpired || isSoldOut;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const qty = parseInt(bookingQty) || 0;

    if (!session?.user?.email) {
      toast.error("Please login to book a ticket!");
      return;
    }

    if (qty > ticket.quantity) {
      toast.error(`You cannot book more than ${ticket.quantity} tickets!`);
      return;
    }

    setBookingLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: ticket._id,
          userEmail: session.user.email,
          user: session.user.name || "Anonymous User",
          bookingQuantity: qty,
          totalPrice: ticket.price * qty,
        }),
      });

      const resData = await response.json();

      if (resData.success) {
        toast.success(`Successfully Booked ${qty} Tickets!`);
        setIsModalOpen(false);

        router.push("/dashboard/user/my-bookings");
      } else {
        toast.error(resData.error || "Booking failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error, reservation failed.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <FaArrowLeft /> Back to Listings
      </button>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="relative h-72 sm:h-96 w-full bg-slate-200">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <DetailsCountdown departureDate={ticket.departureDateTime} />
            <span className="bg-indigo-50 text-indigo-700 text-xs font-extrabold px-3 py-1.5 rounded-xl uppercase tracking-wide border border-indigo-100">
              {ticket.transportType || "Bus"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
            {ticket.title}
          </h1>

          <div className="mt-6 bg-slate-50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Route
                </p>
                <p className="text-base font-bold text-slate-700">
                  {ticket.from} ➔ {ticket.to}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <FaCalendarAlt size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Departure
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {new Date(ticket.departureDateTime).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
          </div>

          {ticket.perks && ticket.perks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                Available Amenities & Perks
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ticket.perks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-4 py-3 bg-slate-50/70 border border-slate-100 rounded-xl text-sm font-semibold text-slate-700"
                  >
                    <FaCheckCircle
                      className="text-emerald-500 shrink-0"
                      size={16}
                    />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Price (Per Ticket)
              </p>
              <p className="text-3xl font-black text-indigo-600">
                ৳{ticket.price}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Available Seats: {ticket.quantity}
              </p>
            </div>

            {session?.user?.role === "user" ? (
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isBookButtonDisabled || bookingLoading}
                className={`px-8 py-4 rounded-2xl text-sm font-black shadow-lg transition-all duration-200 ${
                  isBookButtonDisabled
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:-translate-y-0.5"
                }`}
              >
                {isExpired
                  ? "Trip Expired"
                  : isSoldOut
                    ? "Sold Out"
                    : "Book Now"}
              </button>
            ) : (
              <Card className="text-red-600 font-bold p-3 bg-red-50 border-red-100">
                Not Authorized for{" "}
                {session?.user?.role?.toUpperCase() || "GUEST"}
              </Card>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-50 relative">
            <h3 className="text-xl font-black text-slate-800 mb-2">
              Confirm Reservation
            </h3>
            <p className="text-xs text-slate-400 mb-4">{ticket.title}</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Ticket Quantity (Max: {ticket.quantity})
                </label>
                <input
                  type="number"
                  min="1"
                  max={ticket.quantity}
                  value={bookingQty}
                  onChange={(e) => setBookingQty(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-indigo-500 text-slate-700"
                  required
                />
              </div>

              <div className="bg-indigo-50/50 rounded-xl p-3 flex justify-between items-center text-sm font-bold text-slate-700">
                <span>Total Amount:</span>
                <span className="text-lg font-black text-indigo-600">
                  ৳{ticket.price * (parseInt(bookingQty) || 0)}
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={bookingLoading}
                  className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all disabled:bg-indigo-400"
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
