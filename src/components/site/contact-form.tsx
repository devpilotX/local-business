"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { services } from "@/lib/content";
import { Button } from "@/components/ui/button";
export function ContactForm({
  initialService = "websites",
  email,
}: {
  initialService?: string;
  email: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "saved" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const requestId = useRef<string>("");
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState("sending");
    setMessage("");
    requestId.current ||= crypto.randomUUID();
    const payload = {
      name: form.get("name"),
      business: form.get("business"),
      email: form.get("email"),
      phone: form.get("phone") || "",
      service: form.get("service"),
      message: form.get("message"),
      consent: form.get("consent") === "on",
      website: form.get("website") || "",
      requestId: requestId.current,
    };
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Your enquiry was not saved. Please try again.",
        );
      setState("saved");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Your enquiry was not saved. Please try again.",
      );
    }
  }
  if (state === "saved")
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={38} aria-hidden="true" />
        <h2>Your enquiry is saved.</h2>
        <p>
          The team can now review your request. No booking or paid work has been
          confirmed.
        </p>
        <p>
          If you need to add something, email{" "}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            requestId.current = "";
            setState("idle");
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-label="Project enquiry"
    >
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label>
          Business name
          <input
            name="business"
            autoComplete="organization"
            required
            minLength={2}
            maxLength={160}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Email address
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label>
          Phone <span className="muted">(optional)</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={32} />
        </label>
      </div>
      <label>
        Where would you like to start?
        <select
          name="service"
          defaultValue={
            services.some((s) => s.id === initialService)
              ? initialService
              : "websites"
          }
        >
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Tell us what you need
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={3000}
          rows={5}
          placeholder="What does your business do, and what would you like to improve?"
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-help">
        Do not include passwords, payment details or sensitive personal
        information.
      </p>
      <label className="checkbox-label">
        <input name="consent" type="checkbox" required />
        <span>
          I agree to be contacted about this enquiry. I've read the{" "}
          <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      {state === "error" && (
        <p className="form-error" role="alert">
          {message} You can also email <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
      <Button type="submit" disabled={state === "sending"}>
        {state === "sending" ? (
          <>
            <LoaderCircle className="spin" size={18} aria-hidden="true" />
            Saving enquiry
          </>
        ) : (
          <>
            Send enquiry
            <ArrowRight size={18} aria-hidden="true" />
          </>
        )}
      </Button>
      <p className="form-help">
        This sends an enquiry. It does not start paid work or subscribe you to
        marketing.
      </p>
    </form>
  );
}
