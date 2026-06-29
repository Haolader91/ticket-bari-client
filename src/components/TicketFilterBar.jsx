"use client";

import { FaSearch, FaSlidersH, FaSortAmountDown } from "react-icons/fa";

export default function TicketFilterBar({
  searchFrom,
  setSearchFrom,
  searchTo,
  setSearchTo,
  transportFilter,
  setTransportFilter,
  priceSort,
  setPriceSort,
}) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end shadow-xs">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
          <FaSearch size={10} /> From (Location)
        </label>
        <input
          type="text"
          placeholder="e.g. Dhaka"
          value={searchFrom}
          onChange={(e) => setSearchFrom(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
          <FaSearch size={10} /> To (Location)
        </label>
        <input
          type="text"
          placeholder="e.g. Cox's Bazar"
          value={searchTo}
          onChange={(e) => setSearchTo(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
          <FaSlidersH size={10} /> Transport Type
        </label>
        <select
          value={transportFilter}
          onChange={(e) => setTransportFilter(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-hidden focus:border-indigo-500 transition-all cursor-pointer"
        >
          <option value="All">All Transports</option>
          <option value="Bus">Bus</option>
          <option value="Train">Train</option>
          <option value="Air">Air/Flight</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
          <FaSortAmountDown size={10} /> Sort By Price
        </label>
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-hidden focus:border-indigo-500 transition-all cursor-pointer"
        >
          <option value="">Default Order</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
