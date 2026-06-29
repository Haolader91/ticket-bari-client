import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaBus,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-[#6366F1]">
              <FaBus className="text-2xl" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#1E1B4B]">
              Ticket<span className="text-[#6366F1]">-Bari</span>
            </span>
          </Link>

          <p className="text-gray-500 text-sm leading-relaxed">
            The next-generation event discovery and seamless ticket booking
            platform connecting passionate organizers with eager attendees.
          </p>

          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-[#6366F1] transition-colors">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="hover:text-[#6366F1] transition-colors">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-[#6366F1] transition-colors">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-[#6366F1] transition-colors">
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-4">
            Quick Link
          </h3>

          <ul className="space-y-2 text-gray-500 text-sm">
            <li>
              <Link href="/" className="hover:text-[#6366F1] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-[#6366F1] transition-colors"
              >
                All Ticket
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-[#6366F1] transition-colors">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-4">
            For Organizers
          </h3>

          <ul className="space-y-2 text-gray-500 text-sm">
            <li>
              <Link
                href="/register?role=organizer"
                className="hover:text-[#6366F1] transition-colors"
              >
                Create Organization
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-[#6366F1] transition-colors"
              >
                Host an Event
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-[#6366F1] transition-colors"
              >
                Premium Packages
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-[#6366F1] transition-colors">
                Pricing & Fees
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-4">
            Company
          </h3>

          <ul className="space-y-2 text-gray-500 text-sm">
            <li>
              <a href="#" className="hover:text-[#6366F1] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#6366F1] transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#6366F1] transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#6366F1] transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-xs">
        <p>
          &copy; {new Date().getFullYear()} Ticket-Bari Inc. All rights
          reserved. Developed by Antigravity AI.
        </p>
      </div>
    </footer>
  );
}
