"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaBusAlt } from "react-icons/fa";
import { FiChevronDown, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const isLoggedIn = !!session;
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully! 👋");
      setIsDropdownOpen(false);
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out. Try again.");
    }
  };

  const defaultAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 backdrop-blur-md bg-opacity-95 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* logo  */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-[#6366F1]/10 rounded-xl border border-[#6366F1]/20 group-hover:bg-[#6366F1]/20 transition-all">
            <FaBusAlt className="text-[#6366F1] text-xl" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
            Ticket<span className="text-[#6366F1]">-Bari</span>
          </span>
        </Link>

        {/* menu  */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${
              pathname === "/"
                ? "text-[#6366F1]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Home
          </Link>
          <Link
            href="/allTickets"
            className={`text-sm font-semibold transition-colors ${
              pathname.startsWith("/allTickets")
                ? "text-[#6366F1]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Tickets
          </Link>

          {isMounted && isLoggedIn && (
            <Link
              href="/dashboard"
              className={`text-sm font-semibold transition-colors ${
                pathname.startsWith("/dashboard")
                  ? "text-[#6366F1]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* login and user  */}
        <div className="hidden md:flex items-center gap-4">
          {!isMounted || isPending ? (
            <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse" />
          ) : !isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#6366F1] hover:bg-[#5558DD] text-white px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md shadow-indigo-500/10 active:scale-[0.98]"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-3 p-1.5 pr-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-full transition-all focus:outline-none"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                  <Image
                    src={user?.image || defaultAvatar}
                    alt="user avatar"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-slate-800 leading-none capitalize">
                    {user?.name}
                  </p>
                </div>
                <FiChevronDown
                  className={`text-slate-500 text-sm transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl p-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      pathname.startsWith("/dashboard/profile")
                        ? "text-[#6366F1] bg-indigo-50/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <FiUser
                      className={
                        pathname.startsWith("/dashboard/profile")
                          ? "text-[#6366F1]"
                          : "text-slate-400"
                      }
                    />
                    <span>My Profile</span>
                  </Link>
                  <div className="h-[1px] bg-slate-100 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all text-left"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* menu icons  */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-slate-700 hover:text-slate-900 focus:outline-none p-1"
          >
            {isOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* mobail menu  */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={toggleMenu}
              className={`text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "text-[#6366F1]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/all-tickets"
              onClick={toggleMenu}
              className={`text-sm font-semibold transition-colors ${
                pathname.startsWith("/all-tickets")
                  ? "text-[#6366F1]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Tickets
            </Link>
            {isMounted && isLoggedIn && (
              <Link
                href="/dashboard"
                onClick={toggleMenu}
                className={`text-sm font-semibold transition-colors ${
                  pathname.startsWith("/dashboard")
                    ? "text-[#6366F1]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="h-[1px] bg-slate-100 my-4" />

          {!isMounted || isPending ? (
            <div className="w-full h-10 rounded-xl bg-slate-50 animate-pulse" />
          ) : !isLoggedIn ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={toggleMenu}
                className="w-full text-center text-sm font-bold text-slate-600 hover:text-slate-900 py-2.5 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={toggleMenu}
                className="w-full text-center bg-[#6366F1] hover:bg-[#5558DD] text-white py-3 rounded-xl text-sm font-bold tracking-wide transition-all"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-1">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                  <Image
                    src={user?.image || defaultAvatar}
                    alt="user avatar"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 capitalize">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500 capitalize">
                    {user?.role || "Passenger"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/dashboard/profile"
                  onClick={toggleMenu}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    pathname.startsWith("/dashboard/profile")
                      ? "bg-indigo-50 border-[#6366F1]/30 text-[#6366F1]"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200/60"
                  }`}
                >
                  <FiUser className="text-[#6366F1]" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2.5 rounded-xl text-xs font-bold transition-all"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
