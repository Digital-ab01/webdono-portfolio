"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glow-field flex min-h-svh items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="glass w-full max-w-sm rounded-2xl p-8"
      >
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15">
            <Lock size={18} />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold">Webdono Admin</h1>
            <p className="mt-1 text-sm text-muted">Sign in to manage portfolio projects.</p>
          </div>
        </div>

        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-2">
          Password
        </label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors focus:border-accent-blue"
          placeholder="••••••••"
        />

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-bg transition-opacity disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
