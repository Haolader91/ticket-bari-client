"use client";
import React from "react";
import { FiUsers, FiCompass, FiAward, FiSmile } from "react-icons/fi";

const Stats = () => {
  const statData = [
    {
      id: 1,
      icon: <FiUsers className="text-2xl" />,
      count: "500K+",
      label: "Happy Travelers",
      description: "Over half a million tickets booked safely.",
    },
    {
      id: 2,
      icon: <FiCompass className="text-2xl" />,
      count: "120+",
      label: "Routes Covered",
      description: "Connecting major cities and remote destinations.",
    },
    {
      id: 3,
      icon: <FiAward className="text-2xl" />,
      count: "50+",
      label: "Partner Operators",
      description: "Top-rated bus, train, and launch operators.",
    },
    {
      id: 4,
      icon: <FiSmile className="text-2xl" />,
      count: "99.9%",
      label: "Success Rate",
      description: "Seamless booking and instant ticket generation.",
    },
  ];

  return (
    <section className="w-full bg-[#0d1527] border-y border-white/5 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statData.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center text-center p-6 transition-all duration-300 relative ${
                index !== statData.length - 1
                  ? "lg:border-r lg:border-white/10"
                  : ""
              }`}
            >
              <div className="p-3 bg-white/5 text-[#6366F1] rounded-2xl border border-white/10 mb-4 flex items-center justify-center backdrop-blur-sm">
                {stat.icon}
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                {stat.count}
              </h3>

              <p className="text-sm font-bold text-slate-300 tracking-wide uppercase mb-2">
                {stat.label}
              </p>

              <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
