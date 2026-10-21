"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export function Login() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  return (
    <main className="login-shell" id="main">
      <div className="login-card">
        <Link href="/" className="brand">
          Techcyme
        </Link>
        <h1>Sign in to your workspace</h1>
        <p>Access is limited to approved team accounts.</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setPending(true);
            setError("");
            const data = new FormData(e.currentTarget);
            try {
              const res = await fetch("/api/auth/sign-in/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: data.get("email"),
                  password: data.get("password"),
                  rememberMe: true,
                }),
              });
              if (!res.ok) {
                setError(
                  "Sign-in failed. Check your details or contact the account owner.",
                );
                return;
              }
              router.replace("/admin");
              router.refresh();
            } catch {
              setError("The server could not be reached. Please try again.");
            } finally {
              setPending(false);
            }
          }}
        >
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <p className="form-error" role="alert">
            {error}
          </p>
          <button className="button button-primary" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p>
          Need access? Ask the account owner to provision an account. Public
          registration is disabled.
        </p>
      </div>
    </main>
  );
}
