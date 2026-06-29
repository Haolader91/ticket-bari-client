"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client"; // ✅ ভেন্ডরের নিজের সেশন ট্র্যাকিং এর জন্য

export default function ManageVendorTickets() {
  const { data: session, isPending: isAuthPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. শুধুমাত্র লগইন করা ভেন্ডরের আন্ডারে আসা ইউজার বুকিং রিকোয়েস্টগুলো ফেচ করার ফাংশন
  const fetchVendorBookings = useCallback(() => {
    if (!session?.user?.email) return;

    // ভেন্ডরের ইমেইল প্যারামিটার হিসেবে পাঠানো হচ্ছে যাতে ব্যাকএন্ড শুধু এই ভেন্ডরের টিকিট বুকিংগুলো দেয়
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/vendor/bookings?email=${encodeURIComponent(session.user.email)}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((resData) => {
        if (resData.success) {
          setBookings(resData.data || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vendor bookings:", err);
        setLoading(false);
      });
  }, [session?.user?.email]);

  useEffect(() => {
    if (!isAuthPending && session?.user?.email) {
      fetchVendorBookings();
    } else if (!isAuthPending && !session?.user?.email) {
      setLoading(false);
    }
  }, [isAuthPending, session, fetchVendorBookings]);

  // ২. বুকিং রিকোয়েস্ট Approve বা Reject করার হ্যান্ডলার
  const handleBookingStatus = async (bookingId, action) => {
    const status = action === "approve" ? "accepted" : "rejected"; // ✅ ইউজারের পেজে 'accepted' হলেই 'Pay Now' বাটন শো করবে
    const loadingToast = toast.loading(
      `Updating booking status to ${status}...`,
    );

    try {
      // ইউজার বুকিং আইডির সাপেক্ষে ব্যাকএন্ডে স্ট্যাটাস আপডেটের এপিআই কল
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/vendor/bookings/${bookingId}/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success(
          `Booking request ${status === "accepted" ? "Approved" : "Rejected"} successfully!`,
          { id: loadingToast },
        );
        fetchVendorBookings(); // টেবিল রি-লোড করার জন্য পুনরায় কল
      } else {
        toast.error(data.error || "Failed to update status.", {
          id: loadingToast,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not connect to server to update status.", {
        id: loadingToast,
      });
    }
  };

  if (isAuthPending || loading) {
    return (
      <div className="text-center py-12 font-bold text-slate-400">
        Loading incoming booking requests...
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="text-center py-12 font-bold text-rose-500">
        Please login as a vendor to manage bookings.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* হেডার সেকশন */}
      <div className="mb-6">
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">
          Manage Incoming Bookings
        </h1>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
          Review, Approve, or Reject Customer Ticket Bookings
        </p>
      </div>

      {/* টেবিল কন্টেইনার */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {bookings.length === 0 ? (
            <div className="text-center py-12 font-bold text-slate-400">
              No booking requests received yet.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Customer Info</th>
                  <th className="p-4">Ticket & Route</th>
                  <th className="p-4">Seats & Total Price</th>
                  <th className="p-4 text-center">Current Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* কাস্টমার ইনফো */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800 break-all">
                        {booking.userEmail}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Buyer Account
                      </div>
                    </td>

                    {/* টিকিট ও রুট ডিটেইলস */}
                    <td className="p-4">
                      <div className="font-bold text-slate-700">
                        {booking.ticketTitle}
                      </div>
                      <div className="mt-1">
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-md inline-block whitespace-nowrap">
                          {booking.from} ➔ {booking.to}
                        </span>
                      </div>
                    </td>

                    {/* বুকিং সিট ও মোট টাকা */}
                    <td className="p-4">
                      <div className="text-slate-800 font-extrabold">
                        {booking.bookingQuantity} Tickets
                      </div>
                      <div className="text-indigo-600 font-black text-xs mt-0.5">
                        Total: ৳{booking.totalPrice}
                      </div>
                    </td>

                    {/* স্ট্যাটাস ব্যাজ */}
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                          booking.status === "accepted"
                            ? "bg-blue-50 text-blue-600"
                            : booking.status === "paid"
                              ? "bg-emerald-50 text-emerald-600"
                              : booking.status === "rejected"
                                ? "bg-rose-50 text-rose-600"
                                : "bg-amber-50 text-amber-500"
                        }`}
                      >
                        {booking.status === "accepted"
                          ? "Accepted (Unpaid)"
                          : booking.status || "pending"}
                      </span>
                    </td>

                    {/* অ্যাকশন বাটন গ্রুপ */}
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        {/* যদি টিকিট অলরেডি পেইড হয়ে যায়, তবে কোনো অ্যাকশন বাটন থাকবে না */}
                        {booking.status === "paid" ? (
                          <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                            ✓ Payment Completed
                          </span>
                        ) : (
                          <>
                            <button
                              disabled={
                                booking.status === "accepted" ||
                                booking.status === "rejected"
                              }
                              onClick={() =>
                                handleBookingStatus(booking._id, "approve")
                              }
                              className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-bold transition-all whitespace-nowrap"
                            >
                              ✓ Approve
                            </button>
                            <button
                              disabled={
                                booking.status === "accepted" ||
                                booking.status === "rejected"
                              }
                              onClick={() =>
                                handleBookingStatus(booking._id, "reject")
                              }
                              className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-bold transition-all whitespace-nowrap"
                            >
                              ✕ Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
