"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaBusAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const toastId = toast.loading("Verifying your credentials...");

    try {
      const { data: resData, error: signInError } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (signInError) {
        toast.error(signInError.message || "Invalid email or password.", {
          id: toastId,
        });
        setLoading(false);
        return;
      }

      toast.success("Welcome back to TicketBari! ", { id: toastId });
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
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
            Sign In to Your Account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
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

          {/* Password */}
          <div className="w-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="text-slate-700 text-xs font-bold uppercase tracking-wider"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-[#6366F1] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 hover:border-[#6366F1]/50 focus:border-[#6366F1] focus:bg-white outline-none h-12 pl-11 pr-12 rounded-xl font-medium text-sm text-slate-800 transition-all"
              />
              {/* Password Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-base" />
                ) : (
                  <FaEye className="text-base" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-rose-600 text-xs mt-1.5 font-bold pl-1">
                {errors.password.message}
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
              "Sign In"
            )}
          </button>
        </form>

        {/* Redirection Link */}
        <p className="text-center text-sm text-slate-500 mt-6 font-medium">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#6366F1] hover:text-[#5558DD] font-bold hover:underline ml-1 transition-colors"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
