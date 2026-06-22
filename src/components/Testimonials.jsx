import Image from "next/image";
import React from "react";

const Testimonials = () => {
  return (
    // ১. এই মেইন কন্টেইনারটি w-full এবং bg-white থাকবে, যাতে স্ক্রিনের দুই পাশের কালো অংশ পুরোপুরি চলে যায় এবং সাদা হয়ে যায়।
    <section className="w-full bg-white py-24">
      {/* ২. ভেতরের কন্টেন্টগুলোকে max-w-7xl mx-auto দিয়ে মাঝখানে সুন্দরভাবে সাজানো হয়েছে */}
      <div className="max-w-7xl mx-auto px-6">
        {/* সেকশন হেডার */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl font-sans">
            Client Testimonials
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm mt-3">
            Don't just take our word for it. Hear from leading organizers and
            attendees enjoying the platform.
          </p>
        </div>

        {/* কার্ডস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* প্রথম কার্ড */}
          <div className="bg-[#090e1a] border border-white/5 hover:border-[#6366F1]/50 transition-all duration-300 p-8 rounded-2xl space-y-6 relative hover:-translate-y-1 shadow-2xl shadow-slate-950/20">
            <p className="text-slate-300 italic text-md leading-relaxed">
              "Creating events with Ticketo has completely transformed how our
              organization connects with tech enthusiasts. Setting up ticket
              pricing and tracking seat availability takes seconds, and Stripe
              handles the checkout seamlessly."
            </p>
            <div className="flex items-center gap-4">
              <Image
                width={48}
                height={48}
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                className="rounded-full h-12 w-12 object-cover shrink-0 border border-white/10"
                alt="user image"
              />
              <div>
                <h4 className="text-white font-bold text-sm">Sarah Jenkins</h4>
                <p className="text-[#6366F1] text-xs font-semibold mt-0.5">
                  Director, TechVibe Events
                </p>
              </div>
            </div>
          </div>

          {/* দ্বিতীয় কার্ড */}
          <div className="bg-[#090e1a] border border-white/5 hover:border-[#6366F1]/50 transition-all duration-300 p-8 rounded-2xl space-y-6 relative hover:-translate-y-1 shadow-2xl shadow-slate-950/20">
            <p className="text-slate-300 italic text-md leading-relaxed">
              "As an attendee, I appreciate the modern, clean interface.
              Searching and filtering by category or location works instantly,
              and my dashboard keeps all my ticket barcodes and payment history
              perfectly organized."
            </p>
            <div className="flex items-center gap-4">
              <Image
                width={48}
                height={48}
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                className="rounded-full w-12 h-12 object-cover shrink-0 border border-white/10"
                alt="user image"
              />
              <div>
                <h4 className="text-white font-bold text-sm">Marcus Brody</h4>
                <p className="text-[#6366F1] text-xs font-semibold mt-0.5">
                  Fervent Event Attendee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
