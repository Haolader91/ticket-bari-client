"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaGoogle,
  FaBusAlt,
} from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const toastId = toast.loading("Creating your account...");

    try {
      const { data: resData, error: signUpError } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: data.image,
        role: data.role,
      });

      if (signUpError) {
        toast.error(signUpError.message || "Registration failed.", {
          id: toastId,
        });
        setLoading(false);
        return;
      }

      toast.loading("Logging you in automatically...", { id: toastId });

      const { error: signInError } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (signInError) {
        toast.error(
          "Account created, but automatic login failed. Please login manually.",
          { id: toastId },
        );
        router.push("/login");
      } else {
        toast.success("Welcome to TicketBari! Account created & logged in.", {
          id: toastId,
        });
        router.push("/");
      }
    } catch (err) {
      toast.error("Something went wrong during the process.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-slate-50 font-sans selection:bg-[#6366F1]/20">
      <div className="w-full max-w-md border border-slate-100 bg-white shadow-xl shadow-indigo-500/5 p-8 mx-auto rounded-3xl">
        <div className="flex flex-col items-center pb-6 text-center">
          <div className="p-3 bg-[#6366F1]/10 rounded-2xl border border-[#6366F1]/20 mb-3">
            <FaBusAlt className="text-[#6366F1] text-2xl" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Ticket<span className="text-[#6366F1]">-Bari</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-semibold uppercase tracking-wider">
            Create Your Account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          {/* Full Name */}
          <div className="w-full flex flex-col">
            <label
              htmlFor="name"
              className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-2"
            >
              Full Name
            </label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
              <input
                {...register("name", { required: "Full name is required" })}
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full bg-slate-50 border border-slate-200 hover:border-[#6366F1]/50 focus:border-[#6366F1] focus:bg-white outline-none h-12 pl-11 pr-4 rounded-xl font-medium text-sm text-slate-800 transition-all"
              />
            </div>
            {errors.name && (
              <p className="text-rose-600 text-xs mt-1.5 font-bold pl-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="w-full flex flex-col">
            <label
              htmlFor="email"
              className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-2"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
              <input
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                placeholder="name@example.com"
                className="w-full bg-slate-50 border border-slate-200 hover:border-[#6366F1]/50 focus:border-[#6366F1] focus:bg-white outline-none h-12 pl-11 pr-4 rounded-xl font-medium text-sm text-slate-800 transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-rose-600 text-xs mt-1.5 font-bold pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Profile Image URL */}
          <div className="w-full flex flex-col">
            <label
              htmlFor="image"
              className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-2"
            >
              Profile Image URL
            </label>
            <div className="relative flex items-center">
              <FaImage className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
              <input
                {...register("image", {
                  required: "Profile image URL is required",
                })}
                id="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full bg-slate-50 border border-slate-200 hover:border-[#6366F1]/50 focus:border-[#6366F1] focus:bg-white outline-none h-12 pl-11 pr-4 rounded-xl font-medium text-sm text-slate-800 transition-all"
              />
            </div>
            {errors.image && (
              <p className="text-rose-600 text-xs mt-1.5 font-bold pl-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="w-full flex flex-col">
            <label
              htmlFor="password"
              className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-2"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 hover:border-[#6366F1]/50 focus:border-[#6366F1] focus:bg-white outline-none h-12 pl-11 pr-4 rounded-xl font-medium text-sm text-slate-800 transition-all"
              />
            </div>
            {errors.password && (
              <p className="text-rose-600 text-xs mt-1.5 font-bold pl-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Account Type Selection */}
          <div className="w-full flex flex-col">
            <label
              htmlFor="role"
              className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-2"
            >
              Select Account Type
            </label>
            <div className="relative w-full">
              <select
                id="role"
                {...register("role", {
                  required: "Role selection is required",
                })}
                className="w-full bg-slate-50 text-slate-800 border border-slate-200 hover:border-[#6366F1]/50 focus:border-[#6366F1] focus:bg-white outline-none h-12 px-4 rounded-xl text-sm font-medium transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  backgroundSize: "16px",
                }}
              >
                <option value="user">User (Passenger)</option>
                <option value="vendor">Vendor (Transport Provider)</option>

                <option value="admin">Admin (System Control)</option>
              </select>
            </div>
            {errors.role && (
              <p className="text-rose-600 text-xs mt-1.5 font-bold pl-1">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center bg-[#6366F1] hover:bg-[#5558DD] disabled:bg-indigo-300 text-white font-bold h-12 rounded-xl text-sm tracking-wide transition-all shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 mt-2 active:scale-[0.99]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Register Account"
            )}
          </button>
        </form>

        {/* Redirection Link */}
        <p className="text-center text-sm text-slate-500 mt-6 font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#6366F1] hover:text-[#5558DD] font-bold hover:underline ml-1 transition-colors"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
