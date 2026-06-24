"use client";
import { useState, useEffect } from "react";
import { FaListUl, FaTrashAlt, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function MyAddedTickets() {
  const { data: session, isPending } = useSession();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && session?.user?.email) {
      const vendorEmail = session.user.email;

      fetch(`http://localhost:8080/api/vendor/tickets?email=${vendorEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTickets(data.data);
          } else {
            toast.error(data.error || "Failed to load your tickets");
          }
        })
        .catch(() => toast.error("Server connection lost!"))
        .finally(() => setLoading(false));
    } else if (!isPending && !session?.user?.email) {
      setLoading(false);
    }
  }, [session, isPending]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/tickets/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("Delete Response:", data);

      if (data.success) {
        toast.success("Ticket deleted successfully!");
        setTickets(tickets.filter((ticket) => ticket._id !== id));
      } else {
        toast.error(data.error || "Failed to delete ticket");
      }
    } catch (error) {
      toast.error("Could not connect to server to delete.");
    }
  };

  if (isPending || (loading && session?.user?.email)) {
    return (
      <div className="p-8 text-center font-bold text-slate-500">
        Loading your fleet tickets...
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 text-center font-semibold">
        Please log in to view your added tickets.
      </div>
    );
  }

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
        {tickets.length === 0 ? (
          <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-semibold">
            You haven't added any tickets yet.
          </div>
        ) : (
          tickets.map((t) => (
            <div
              key={t._id}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h3 className="font-bold text-slate-800 text-base">
                  {t.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  {t.from} ➔ {t.to}
                </p>
                <div className="flex flex-wrap gap-4 mt-2 text-xs font-medium text-slate-400">
                  <span>
                    Seats:{" "}
                    <strong className="text-slate-700">{t.quantity}</strong>
                  </span>
                  <span>
                    Price:{" "}
                    <strong className="text-[#6366F1]">৳{t.price}</strong>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                      t.status === "approved"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-200/60 hover:bg-slate-100 transition-all">
                  <FaEdit size={14} />
                </button>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 hover:bg-rose-100 transition-all"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
