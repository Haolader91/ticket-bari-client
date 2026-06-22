"use client";
import React, { useState } from "react";
import { FiSearch, FiMapPin, FiCalendar } from "react-icons/fi";

const Banner = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching tickets for:", formData);
  };

  return (
    <section className="relative w-full min-h-125 lg:h-142.5 flex items-center bg-[#1e2538] overflow-hidden ">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('/banner-bus.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-l from-slate-950/90 via-slate-900/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
        <div className="lg:col-span-5 hidden lg:block" />

        <div className="lg:col-span-7 space-y-6 md:space-y-8 text-white lg:order-last">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Your Journey <br />
              <span className="text-[#6366F1] inline-block mt-1">
                Starts Here
              </span>
            </h1>
            <p className="text-slate-200 text-base sm:text-lg font-medium max-w-md leading-relaxed">
              Book bus, train, launch & flight tickets easily and securely.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="w-full max-w-2xl bg-white p-2 rounded-2xl sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-slate-100"
          >
            {/* From Input */}
            <div className="w-full sm:w-1/3 flex items-center gap-2 px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
              <FiSearch className="text-gray-400 text-lg flex-shrink-0" />
              <input
                type="text"
                placeholder="From"
                className="w-full bg-transparent text-slate-800 placeholder-gray-400 text-sm font-medium focus:outline-none"
                value={formData.from}
                onChange={(e) =>
                  setFormData({ ...formData, from: e.target.value })
                }
              />
            </div>

            {/* To Input */}
            <div className="w-full sm:w-1/3 flex items-center gap-2 px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
              <FiMapPin className="text-gray-400 text-lg flex-shrink-0" />
              <input
                type="text"
                placeholder="To"
                className="w-full bg-transparent text-slate-800 placeholder-gray-400 text-sm font-medium focus:outline-none"
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
              />
            </div>

            {/* Date Input */}
            <div className="w-full sm:w-1/3 flex items-center gap-2 px-4 py-2">
              <FiCalendar className="text-gray-400 text-lg shrink-0" />
              <input
                type="text"
                placeholder="Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                className="w-full bg-transparent text-slate-800 placeholder-gray-400 text-sm font-medium focus:outline-none"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#6366F1] hover:bg-[#5558DD] text-white px-8 py-3 rounded-xl sm:rounded-full font-semibold text-sm tracking-wide transition-all shadow-md shadow-indigo-500/20 active:scale-95 flex-shrink-0"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Banner;
