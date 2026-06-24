"use client";
import { useState } from "react";
import {
  FaPlusCircle,
  FaBus,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function AddTicket() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Ticket added successfully! (Static Demo)");
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
            placeholder="https://example.com/bus.jpg"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#6366F1] hover:bg-[#5558DD] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-indigo-500/10 transition-all mt-4"
        >
          Publish Ticket
        </button>
      </form>
    </div>
  );
}
