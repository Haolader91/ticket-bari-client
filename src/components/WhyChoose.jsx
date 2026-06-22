"use client";
import React from "react";
import { FiSliders, FiShield, FiPhoneCall, FiZap } from "react-icons/fi";

const WhyChoose = () => {
  const features = [
    {
      id: 1,
      icon: <FiSliders className="text-2xl" />,
      title: "Easy Booking",
      description:
        "Book your bus, train, launch, or flight tickets in just a few clicks with our super fast user interface.",
    },
    {
      id: 2,
      icon: <FiShield className="text-2xl" />,
      title: "Secure Payment",
      description:
        "100% secure online transactions integrated with global premium payment gateways like Stripe.",
    },
    {
      id: 3,
      icon: <FiPhoneCall className="text-2xl" />,
      title: "24/7 Support",
      description:
        "Our dedicated support team is always awake and ready to help you with any ticketing issues anytime.",
    },
    {
      id: 4,
      icon: <FiZap className="text-2xl" />,
      title: "Real-time Status",
      description:
        "Get instant live tracking, updates, and booking status alerts directly sent to your user dashboard.",
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#6366F1]">
            Why Choose Us
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            We Offer The Best Ticketing Experience
          </p>
          <div className="w-12 h-1 bg-[#6366F1] mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 z-0" />

              <div className="p-3.5 bg-indigo-50 text-[#6366F1] rounded-xl mb-5 group-hover:bg-[#6366F1] group-hover:text-white transition-all duration-300 z-10 shadow-sm">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 z-10 group-hover:text-[#6366F1] transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed z-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
