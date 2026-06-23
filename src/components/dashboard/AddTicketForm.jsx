"use client";

import React, { useState } from "react";
import {
  FaPlusCircle,
  FaBus,
  FaDollarSign,
  FaTags,
  FaCalendarAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function AddTicketForm() {
  const [formData, setFormData] = useState({
    title: "",
    from: "",
    to: "",
    transportType: "",
    price: "",
    quantity: "",
    departureDateTime: "",
    image: "",
    vendorName: "vendor",
    vendorEmail: "vendor123@gmail.com",
    perks: {
      ac: false,
      wifi: false,
      food: false,
      tv: false,
      chargingPort: false,
      breakfast: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      perks: { ...prev.perks, [name]: checked },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Ticket Data: ", formData);
    toast.success("Ticket added successfully! 🎫");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 my-6">
      {/* ফর্ম হেডার */}
      <div className="flex items-center justify-center gap-3 pb-6 border-b border-slate-100 mb-6">
        <FaPlusCircle className="text-[#6366F1] text-2xl md:text-3xl" />
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
          Add New Ticket
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Ticket Title */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Ticket Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="E.g., Hanif Enterprise - Non AC"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all text-slate-800"
          />
        </div>

        {/* From & To Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              From (Location)
            </label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Departure City"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all text-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              To (Location)
            </label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Destination City"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Transport Type Select */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Select Transport Type
          </label>
          <select
            name="transportType"
            value={formData.transportType}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all text-slate-700"
          >
            <option value="">Choose Type</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="launch">Launch</option>
            <option value="flight">Flight</option>
          </select>
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Price (per unit)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="💰 Ticket Price"
              required
              min="0"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all text-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Ticket Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="🔢 Available Seats"
              required
              min="1"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Departure Date & Time */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Departure Date & Time
          </label>
          <input
            type="datetime-local"
            name="departureDateTime"
            value={formData.departureDateTime}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all text-slate-700"
          />
        </div>

        {/* Perks (Checkboxes) */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
            Perks
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            {Object.keys(formData.perks).map((perk) => (
              <label
                key={perk}
                className="flex items-center gap-2.5 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  name={perk}
                  checked={formData.perks[perk]}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-[#6366F1] border-slate-300 rounded focus:ring-[#6366F1]"
                />
                <span className="text-sm font-medium text-slate-700 capitalize">
                  {perk === "ac"
                    ? "AC"
                    : perk === "tv"
                      ? "TV"
                      : perk.replace(/([A-Z])/g, " $1")}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/bus-image.jpg"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all text-slate-800"
          />
        </div>

        {/* Vendor Info (Read-only / Disabled fields) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Vendor Name
            </label>
            <input
              type="text"
              value={formData.vendorName}
              disabled
              className="w-full bg-slate-100/70 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Vendor Email
            </label>
            <input
              type="email"
              value={formData.vendorEmail}
              disabled
              className="w-full bg-slate-100/70 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed font-medium"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] active:scale-[0.99] transition-all shadow-lg shadow-emerald-500/10"
          >
            Add Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
