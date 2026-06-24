"use client";
import { FaListUl, FaTrashAlt, FaEdit } from "react-icons/fa";

export default function MyAddedTickets() {
  const dummyTickets = [
    {
      id: 1,
      title: "Green Line Paribahan",
      route: "Dhaka ➔ Cox's Bazar",
      price: 1500,
      seats: 40,
    },
    {
      id: 2,
      title: "Hanif Enterprise",
      route: "Dhaka ➔ Sylhet",
      price: 1200,
      seats: 36,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
          <FaListUl size={20} />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800">
            My Added Tickets
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Manage your active bus fleet and ticket pricing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {dummyTickets.map((t) => (
          <div
            key={t.id}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-slate-800 text-base">{t.title}</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                {t.route}
              </p>
              <div className="flex gap-4 mt-2 text-xs font-medium text-slate-400">
                <span>
                  Seats: <strong className="text-slate-700">{t.seats}</strong>
                </span>
                <span>
                  Price: <strong className="text-[#6366F1]">৳{t.price}</strong>
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-200/60 hover:bg-slate-100 transition-all">
                <FaEdit size={14} />
              </button>
              <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 hover:bg-rose-100 transition-all">
                <FaTrashAlt size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
