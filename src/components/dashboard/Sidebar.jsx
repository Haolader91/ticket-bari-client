"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FaBusAlt,
  FaUser,
  FaTicketAlt,
  FaHistory,
  FaPlusCircle,
  FaListUl,
  FaInbox,
  FaChartPie,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const role = user?.role?.toLowerCase() || "user";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const userLinks = [
    { name: "User Profile", href: "/dashboard", icon: FaUser },
    {
      name: "My Booked Tickets",
      href: "/dashboard/user/my-bookings",
      icon: FaTicketAlt,
    },
    {
      name: "Transaction History",
      href: "/dashboard/user/transactions",
      icon: FaHistory,
    },
  ];

  const vendorLinks = [
    { name: "Vendor Profile", href: "/dashboard", icon: FaUser },
    {
      name: "Add Ticket",
      href: "/dashboard/vendor/add-ticket",
      icon: FaPlusCircle,
    },
    {
      name: "My Added Tickets",
      href: "/dashboard/vendor/my-tickets",
      icon: FaListUl,
    },
    {
      name: "Requested Bookings",
      href: "/dashboard/vendor/requested-bookings",
      icon: FaInbox,
    },
    {
      name: "Revenue Overview",
      href: "/dashboard/vendor/revenue",
      icon: FaChartPie,
    },
  ];

  const adminLinks = [
    { name: "Admin Profile", href: "/dashboard", icon: FaUserShield },
    {
      name: "Manage Tickets",
      href: "/dashboard/admin/manage-tickets",
      icon: FaListUl,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: FaUsers,
    },
    {
      name: "Advertise Tickets",
      href: "/dashboard/admin/advertise-tickets",
      icon: FaChartPie,
    },
  ];

  const menuItems =
    role === "admin" ? adminLinks : role === "vendor" ? vendorLinks : userLinks;

  const defaultAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100";

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await signOut();
      toast.success("Logged out successfully! 👋", { id: toastId });
      setIsOpen(false);
      router.push("/login");
    } catch (error) {
      toast.error("Failed to log out. Try again.", { id: toastId });
    }
  };

  return (
    <>
      <div className="lg:hidden w-full bg-[#1e2538] text-white p-4 flex justify-between items-center fixed top-0 left-0 z-50 shadow-md">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-[#6366F1]/10 rounded-xl border border-[#6366F1]/20 group-hover:bg-[#6366F1]/20 transition-all">
            <FaBusAlt className="text-[#6366F1] text-xl" />
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight font-sans">
            Ticket<span className="text-[#6366F1]">-Bari</span>
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none p-1 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1e2538] text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out transform 
        lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:h-screen pt-16 lg:pt-0`}
      >
        <div className="px-4 py-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group px-3 pb-6 border-b border-slate-800"
          >
            <div className="p-2 bg-[#6366F1]/10 rounded-xl border border-[#6366F1]/20 group-hover:bg-[#6366F1]/20 transition-all">
              <FaBusAlt className="text-[#6366F1] text-xl" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight font-sans">
              Ticket<span className="text-[#6366F1]">-Bari</span>
            </span>
          </Link>

          <nav className="mt-6 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all group duration-200 ${
                    isActive
                      ? "bg-[#6366F1] text-white shadow-lg shadow-indigo-500/10 font-semibold"
                      : "hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`text-lg transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/30">
          {!isMounted || isPending ? (
            <div className="flex items-center gap-3 px-2 pb-4 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-slate-700" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-700 rounded-sm w-3/4" />
                <div className="h-2 bg-slate-700 rounded-sm w-1/2" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-2 pb-4">
              <div className="relative w-10 h-10 border-2 border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={user?.image || defaultAvatar}
                  alt={user?.name || "User Avatar"}
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority={true}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate capitalize">
                  {user?.name || "Guest User"}
                </p>

                <p
                  className={`text-xs font-semibold uppercase tracking-wider truncate ${role === "admin" ? "text-rose-400" : "text-amber-400"}`}
                >
                  {role}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all duration-200"
          >
            <FaSignOutAlt className="text-base" />
            Logout Account
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-30 lg:hidden"
        />
      )}
    </>
  );
}
