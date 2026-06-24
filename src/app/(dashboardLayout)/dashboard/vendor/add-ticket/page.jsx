"use client";
import { useState } from "react";
import {
  FaPlusCircle,
  FaBus,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function AddTicket() {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  if (isPending) {
    return (
      <div className="p-8 text-center font-bold text-slate-500">
        Checking authentication...
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 text-center font-semibold">
        You must be logged in as a vendor to publish tickets.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const userEmail = session.user.email;

    const ticketData = {
      title: form.title.value,
      from: form.from.value,
      to: form.to.value,
      price: form.price.value,
      quantity: form.quantity.value,
      departureDateTime: form.departureDateTime.value,
      image: form.image.value,
      vendorEmail: userEmail,
    };

    try {
      const res = await fetch("http://localhost:8080/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        toast.success("Ticket published successfully!");
        form.reset();
      } else {
        toast.error(data.error || "Failed to add ticket");
      }
    } catch (error) {
      toast.error("Server connection lost! Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-50 text-[#6366F1] rounded-2xl">
          <FaPlusCircle size={22} />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800">
            Add New Bus Ticket
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Publish a new available route for passengers
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
            Ticket / Bus Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Green Line Paribahan - Volvo Sleeper"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
              From
            </label>
            <input
              type="text"
              name="from"
              placeholder="e.g., Dhaka"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
              To
            </label>
            <input
              type="text"
              name="to"
              placeholder="e.g., Cox's Bazar"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
              Price (BDT)
            </label>
            <input
              type="number"
              name="price"
              placeholder="1200"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
              Total Seats
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="40"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
              Departure Time
            </label>
            <input
              type="datetime-local"
              name="departureDateTime"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
            Bus Image URL
          </label>
          <input
            type="url"
            name="image"
            placeholder="https://example.com/bus.jpg"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#6366F1] hover:bg-[#5558DD] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-indigo-500/10 transition-all mt-4 active:scale-[0.99] ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Publishing Ticket..." : "Publish Ticket"}
        </button>
      </form>
    </div>
  );
}
