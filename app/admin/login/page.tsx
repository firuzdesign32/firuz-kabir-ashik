"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-md bg-surface border border-border p-8 rounded-2xl">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center border border-border">
            <Lock className="w-8 h-8 text-accent" />
          </div>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-center text-text mb-2">CMS Access</h1>
        <p className="text-center text-text-muted mb-8">Sign in to manage your portfolio.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-accent hover:bg-accent-hover text-white p-4 rounded-xl font-medium transition-all disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
