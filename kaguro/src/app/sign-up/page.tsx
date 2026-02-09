"use client";

import Link from "next/link";
import { Bird, Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const err = await signUp(name, email, password, role);
    if (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[100vh] items-center justify-center bg-light-bg py-16">
      <div className="w-full max-w-md px-4">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <div className="mb-8 text-center">
            <img className="h-auto max-w-full" src="../../../../assets/images/base/owl.png" alt="Owl image"
              style={{margin: "auto", height: 50}}/>
            <h1 className="text-2xl font-black text-text-dark">Create an Account</h1>
            <p className="mt-1 text-sm text-gray-500">Join the KaGuro Ph community</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-bold text-text-dark">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-text-dark">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-text-dark">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-text-dark">I am a:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="CUSTOMER">Buyer (Looking for materials)</option>
                <option value="VENDOR">Seller (Sharing my materials)</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-white transition-colors hover:bg-sky-500/100 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-bold text-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
