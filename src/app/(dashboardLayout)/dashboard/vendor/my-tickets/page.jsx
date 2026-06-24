"use client";
import { useState, useEffect } from "react";
import { FaListUl, FaTrashAlt, FaEdit, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function MyAddedTickets() {
  const { data: session, isPending } = useSession();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

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

  const openEditModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const form = e.target;
    const updatedTicketData = {
      title: form.title.value,
      from: form.from.value,
      to: form.to.value,
      price: form.price.value,
      quantity: form.quantity.value,
      departureDateTime: form.departureDateTime.value,
      image: form.image.value,
    };

    try {
      const res = await fetch(
        `http://localhost:8080/api/tickets/${selectedTicket._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTicketData),
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Ticket updated successfully!");

        setTickets(
          tickets.map((t) =>
            t._id === selectedTicket._id
              ? { ...t, ...updatedTicketData, status: "pending" }
              : t,
          ),
        );
        setIsModalOpen(false);
      } else {
        toast.error(data.error || "Failed to update ticket");
      }
    } catch (error) {
      toast.error("Server connection error during update.");
    } finally {
      setUpdateLoading(false);
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
    <div className="max-w-4xl mx-auto p-4 relative">
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
                <button
                  onClick={() => openEditModal(t)}
                  className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-200/60 hover:bg-slate-100 transition-all"
                >
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

      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-lg font-black text-slate-800 mb-4">
              Edit Ticket Details
            </h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Bus Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedTicket.title}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    name="from"
                    defaultValue={selectedTicket.from}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    name="to"
                    defaultValue={selectedTicket.to}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={selectedTicket.price}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Seats
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={selectedTicket.quantity}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Time
                  </label>
                  <input
                    type="datetime-local"
                    name="departureDateTime"
                    defaultValue={selectedTicket.departureDateTime}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Bus Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  defaultValue={selectedTicket.image}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="w-2/3 bg-[#6366F1] hover:bg-[#5558DD] text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-70"
                >
                  {updateLoading ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
