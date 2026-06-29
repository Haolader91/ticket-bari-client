"use client";

import { useState, useEffect } from "react";
import {
  FaUsers,
  FaUserShield,
  FaBus,
  FaExclamationTriangle,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`,
      );
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      toast.error("Failed to load users!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole, name) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success(`${name} is now an ${newRole.toUpperCase()}!`);
        fetchUsers();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleMarkAsFraud = async (id, name) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/fraud`,
        {
          method: "PATCH",
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.error(
          `${name} marked as fraud! Permission revoked & tickets hidden.`,
          {
            // icon: "🚫",
            duration: 5000,
          },
        );
        fetchUsers();
      }
    } catch (error) {
      toast.error("Failed to mark as fraud");
    }
  };

  if (loading) {
    return <div className="text-center p-10 font-bold">Loading Users...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-50 text-[#6366F1] rounded-2xl border border-indigo-100">
          <FaUsers size={22} />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800">
            Manage Users & Roles
          </h1>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">
            Control member roles, access permissions, and handle fraudulent
            accounts
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-5">Name & Email</th>
                <th className="p-5">Current Role</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5 text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
              {users.map((member) => (
                <tr
                  key={member._id}
                  className={`transition-colors ${
                    member.isFraud
                      ? "bg-rose-50/30 hover:bg-rose-50/50"
                      : "hover:bg-slate-50/40"
                  }`}
                >
                  <td className="p-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        {member.name}
                        {member.isFraud && (
                          <span
                            className="text-rose-500 text-xs"
                            title="Fraudulent Vendor"
                          >
                            <FaExclamationTriangle />
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {member.email}
                      </span>
                    </div>
                  </td>

                  <td className="p-5">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        member.role === "admin"
                          ? "bg-rose-50 text-rose-600 border border-rose-100"
                          : member.role === "vendor"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                      }`}
                    >
                      {member.role === "admin" && (
                        <FaUserShield className="text-[10px]" />
                      )}
                      {member.role === "vendor" && (
                        <FaBus className="text-[10px]" />
                      )}
                      {member.role || "user"}
                    </span>
                  </td>

                  <td className="p-5 text-center">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        member.isFraud
                          ? "text-rose-600 bg-rose-100/60"
                          : "text-emerald-600 bg-emerald-100/60"
                      }`}
                    >
                      {member.isFraud ? "SUSPENDED (FRAUD)" : "ACTIVE"}
                    </span>
                  </td>

                  <td className="p-5 text-right pr-8">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() =>
                          handleRoleChange(member._id, "admin", member.name)
                        }
                        disabled={member.role === "admin" || member.isFraud}
                        className="px-3 py-2 bg-slate-50 text-slate-700 hover:bg-rose-500 hover:text-white border border-slate-200 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:hover:bg-slate-50 disabled:hover:text-slate-700 disabled:cursor-not-allowed active:scale-[0.97]"
                      >
                        Make Admin
                      </button>

                      <button
                        onClick={() =>
                          handleRoleChange(member._id, "vendor", member.name)
                        }
                        disabled={member.role === "vendor" || member.isFraud}
                        className="px-3 py-2 bg-slate-50 text-slate-700 hover:bg-amber-500 hover:text-white border border-slate-200 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:hover:bg-slate-50 disabled:hover:text-slate-700 disabled:cursor-not-allowed active:scale-[0.97]"
                      >
                        Make Vendor
                      </button>

                      {member.role === "vendor" && (
                        <button
                          onClick={() =>
                            handleMarkAsFraud(member._id, member.name)
                          }
                          disabled={member.isFraud}
                          className={`px-3 py-2 text-xs font-bold border rounded-xl transition-all ${
                            member.isFraud
                              ? "bg-rose-100 text-rose-400 border-rose-200 cursor-not-allowed"
                              : "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-500/10 active:scale-[0.97]"
                          }`}
                        >
                          {member.isFraud ? "Fraud Marked" : "Mark As Fraud"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
