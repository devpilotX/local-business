"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, LoaderCircle } from "lucide-react";
import { BrandMark } from "@/components/site/header";

export function Login() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  return (
    <main className="login-shell" id="main">
      <aside className="login-side" aria-hidden="true">
        <span className="brand">
          <BrandMark />
          Techcyme
        </span>
        <div className="login-quote">
          <h2>Every enquiry, project and page in one workspace.</h2>
          <p>Review leads, convert them to clients and keep delivery moving.</p>
          <ul>
            <li>
              <Check size={16} /> Version-checked edits
            </li>
            <li>
              <Check size={16} /> Audit trail for every change
            </li>
            <li>
              <Check size={16} /> CSV exports with injection protection
            </li>
          </ul>
        </div>
        <span className="login-side-foot">Approved team accounts only.</span>
      </aside>
      <div className="login-main">
        <div className="login-card">
          <Link href="/" className="login-back">
            <ArrowLeft size={14} aria-hidden="true" /> Back to website
          </Link>
          <h1>Sign in to your workspace</h1>
          <p>Access is limited to approved team accounts.</p>
          <form
            className="login-form"
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
              style={{ marginBottom: 18 }}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              style={{ marginBottom: 20 }}
            />
            <p className="form-error" role="alert">
              {error}
            </p>
            <button className="button button-primary" disabled={pending}>
              {pending ? (
                <>
                  <LoaderCircle className="spin" size={16} aria-hidden="true" />
                  Signing in
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <p className="login-help">
            Need access? Ask the account owner to provision an account. Public
            registration is disabled.
          </p>
        </div>
      </div>
    </main>
  );
}
