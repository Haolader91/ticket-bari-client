"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBusAlt } from "react-icons/fa";
import { FiChevronDown, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
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
            href="/all-tickets"
            className={`text-sm font-semibold transition-colors ${
              pathname.startsWith("/all-tickets")
                ? "text-[#6366F1]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Tickets
          </Link>
          {isLoggedIn && (
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
          {!isLoggedIn ? (
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
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="user avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-slate-800 leading-none">
                    ak haowlader
                  </p>
                </div>
                <FiChevronDown
                  className={`text-slate-500 text-sm transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* ড্রপডাউন মেনু বক্স */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/dashboard/profile"
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
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsLoggedIn(false);
                    }}
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
    </nav>
  );
};

export default Navbar;
