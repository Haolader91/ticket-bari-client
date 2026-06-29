"use client";
import { useState } from "react";
import {
  FaPlusCircle,
  FaBus,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imgUpload";

export default function AddTicket() {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  // new added
  const [transportType, setTransportType] = useState("Bus");
  const [selectedPerks, setSelectedPerks] = useState([]);

  const handlePerkChange = (perk) => {
    if (selectedPerks.includes(perk)) {
      setSelectedPerks(selectedPerks.filter((p) => p !== perk));
    } else {
      setSelectedPerks([...selectedPerks, perk]);
    }
  };

  if (isPending) {
    return (
      <div className="p-8 text-center font-bold text-slate-500">
        Checking authentication...
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 text-center font-semibold">
        You must be logged in as a vendor to publish tickets.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const userEmail = session.user.email;
    const userName = session.user.name || "Unknown Vendor";

    const imageFile = form.image.files[0];

    if (!imageFile) {
      toast.error("Please select a vehicle image!");
      setLoading(false);
      return;
    }

    try {
      toast.loading("Uploading image to ImgBB...", { id: "imgLoading" });
      const uploadedImageUrl = await imageUpload(imageFile);
      toast.dismiss("imgLoading");

      const ticketData = {
        title: form.title.value,
        from: form.from.value,
        to: form.to.value,
        price: Number(form.price.value),
        quantity: Number(form.quantity.value),
        departureDateTime: form.departureDateTime.value,
        image: uploadedImageUrl,
        vendorEmail: userEmail,
        vendorName: userName,
        transportType: transportType,
        perks: selectedPerks,
        status: "pending",
        isAdvertised: false,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketData),
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Ticket published successfully!");
        form.reset();
        setSelectedPerks([]);
        setTransportType("Bus");
      } else {
        toast.error(data.error || "Failed to add ticket");
      }
    } catch (error) {
      toast.dismiss("imgLoading");
      toast.error(
        error.message || "Server connection lost! Please check your backend.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-50 text-[#6366F1] rounded-2xl">
          <FaPlusCircle size={22} />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800">Add New Ticket</h1>
          <p className="text-xs text-slate-400 font-medium">
            Publish a new available route for passengers
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
            Ticket / Route Title
          </label>
          <input
            type="text"
            name="title"
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
              name="from"
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
              name="to"
              placeholder="e.g., Cox's Bazar"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
              required
            />
          </div>
        </div>

        {/* new added */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
            Transport Type
          </label>
          <select
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-hidden focus:border-[#6366F1] font-medium text-slate-700 cursor-pointer"
          >
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Air">Air / Flight</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
              Price (BDT)
            </label>
            <input
              type="number"
              name="price"
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
              name="quantity"
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
              name="departureDateTime"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366F1]"
              required
            />
          </div>
        </div>

        {/* new added */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
            Perks / Available Facilities
          </label>
          <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4">
            {["AC", "WiFi", "Food", "TV", "Charging Port", "Breakfast"].map(
              (perk) => (
                <label
                  key={perk}
                  className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedPerks.includes(perk)}
                    onChange={() => handlePerkChange(perk)}
                    className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span>{perk}</span>
                </label>
              ),
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
            Vehicle Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 focus:outline-hidden cursor-pointer"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#6366F1] hover:bg-[#5558DD] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-indigo-500/10 transition-all mt-4 active:scale-[0.99] ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Publishing Ticket..." : "Publish Ticket"}
        </button>
      </form>
    </div>
  );
}
