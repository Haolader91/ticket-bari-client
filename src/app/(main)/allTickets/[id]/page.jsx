"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaBus,
  FaArrowLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";

const MOCK_TICKETS_DATABASE = {
  t1: {
    _id: "t1",
    title: "Hanif Enterprise - Scania Multi-Axle",
    from: "Dhaka",
    to: "Cox's Bazar",
    transportType: "AC Sleeper",
    price: 1200,
    quantity: 12,
    perks: ["WiFi", "Water Bottle", "Blanket", "USB Charger"],
    departureDateTime: "2026-07-15T22:30:00",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600",
  },
  t2: {
    _id: "t2",
    title: "Green Line Paribahan - Volvo Sleeper",
    from: "Dhaka",
    to: "Sylhet",
    transportType: "AC Sleeper",
    price: 1500,
    quantity: 0,
    perks: ["Snacks", "WiFi", "Premium Seats", "Reading Light"],
    departureDateTime: "2026-06-30T08:15:00",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=600",
  },
  t3: {
    _id: "t3",
    title: "Ena Transport - Hyundai Universe",
    from: "Chittagong",
    to: "Dhaka",
    transportType: "Non-AC Business",
    price: 800,
    quantity: 24,
    perks: ["Water Bottle", "Movie Screen"],
    departureDateTime: "2026-07-20T14:00:00",
    image:
      "https://images.unsplash.com/photo-1562620644-65db4039121b?q=80&w=600",
  },
};

function DetailsCountdown({ departureDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
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

  const [ticket, setTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingQty, setBookingQty] = useState(1);

  useEffect(() => {
    if (id && MOCK_TICKETS_DATABASE[id]) {
      setTicket(MOCK_TICKETS_DATABASE[id]);
    } else {
      setTicket(MOCK_TICKETS_DATABASE["t1"]);
    }
  }, [id]);

  if (!ticket)
    return (
      <div className="text-center py-12 font-bold text-slate-400">
        Loading dynamic view...
      </div>
    );

  const isExpired = new Date(ticket.departureDateTime) < new Date();
  const isSoldOut = ticket.quantity <= 0;
  const isBookButtonDisabled = isExpired || isSoldOut;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (Number(bookingQty) > ticket.quantity) {
      toast.error(`You cannot book more than ${ticket.quantity} tickets!`);
      return;
    }
    toast.success(
      `Successfully Booked ${bookingQty} Tickets! Saved as 'Pending'.`,
    );
    setIsModalOpen(false);
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
            <span className="bg-slate-100 text-slate-800 text-xs font-extrabold px-3 py-1.5 rounded-xl uppercase">
              {ticket.transportType}
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

          <div className="mt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Included Perks
            </h4>
            <div className="flex flex-wrap gap-2">
              {ticket.perks.map((perk, i) => (
                <span
                  key={i}
                  className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-xl text-xs font-bold"
                >
                  ✓ {perk}
                </span>
              ))}
            </div>
          </div>

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

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isBookButtonDisabled}
              className={`px-8 py-4 rounded-2xl text-sm font-black shadow-lg transition-all duration-200 ${
                isBookButtonDisabled
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:-translate-y-0.5"
              }`}
            >
              {isExpired ? "Trip Expired" : isSoldOut ? "Sold Out" : "Book Now"}
            </button>
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
                  className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
