"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Phone, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { clsx } from "@/lib/clsx";

type ProjectType = "pool" | "spa" | "both" | "unsure";
type FieldErrors = Partial<Record<"name" | "phone" | "email" | "projectType" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const PROJECT_OPTIONS: { value: ProjectType; label: string }[] = [
  { value: "pool", label: "A custom pool" },
  { value: "spa", label: "A spa" },
  { value: "both", label: "Both a pool and spa" },
  { value: "unsure", label: "I'm not sure yet" },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  projectType: "unsure" as ProjectType,
  message: "",
  company: "", // honeypot — must stay empty
};

export function ConsultForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof FieldErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setFormError(null);
    setErrors({});

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }

      if (data.fields) setErrors(data.fields as FieldErrors);
      setFormError(
        (data.error as string) || "Something went wrong. Please call us."
      );
      setStatus("error");
    } catch {
      setFormError("Network error. Please check your connection or call us.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[28px] border border-navy/10 bg-mist p-8 sm:p-10">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-blue/10 text-blue">
          <CheckCircle2 size={26} strokeWidth={2} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-navy">
          Thanks, {form.name.split(" ")[0] || "neighbor"}.
        </h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate">
          We&apos;ve got your request and will reach out shortly to schedule your
          free in-home consultation. Want to talk sooner?
        </p>
        <a
          href={site.phoneHref}
          className="mt-5 inline-flex items-center gap-2 font-display text-lg font-bold text-navy transition-colors hover:text-blue"
        >
          <Phone size={18} strokeWidth={2} className="text-blue" />
          {site.phoneDisplay}
        </a>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[28px] border border-navy/10 bg-mist p-6 sm:p-8"
    >
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px]" inert>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Field
          label="Name"
          id="name"
          error={errors.name}
          input={
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputCls(!!errors.name)}
              placeholder="Jordan Reyes"
            />
          }
        />

        <Field
          label="Phone"
          id="phone"
          error={errors.phone}
          input={
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputCls(!!errors.phone)}
              placeholder="(915) 555-0123"
            />
          }
        />

        <Field
          label="Email"
          id="email"
          optional
          error={errors.email}
          input={
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputCls(!!errors.email)}
              placeholder="you@example.com"
            />
          }
        />

        <Field
          label="What are you planning?"
          id="projectType"
          error={errors.projectType}
          input={
            <div className="relative">
              <select
                id="projectType"
                name="projectType"
                value={form.projectType}
                onChange={(e) => update("projectType", e.target.value as ProjectType)}
                className={clsx(inputCls(false), "cursor-pointer appearance-none bg-white pr-10")}
              >
                {PROJECT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                strokeWidth={2}
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate"
              />
            </div>
          }
        />

        <Field
          label="Anything you'd like us to know?"
          id="message"
          optional
          error={errors.message}
          input={
            <textarea
              id="message"
              name="message"
              rows={3}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={clsx(inputCls(!!errors.message), "resize-none")}
              placeholder="Timeline, budget range, a feature you love..."
            />
          }
        />
      </div>

      {formError && (
        <p role="alert" className="mt-5 text-sm font-medium text-red-600">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue px-7 py-3.5 font-display text-base font-semibold text-white shadow-[0_8px_24px_-10px_rgba(26,143,209,0.7)] transition-[background-color,transform] duration-150 hover:bg-blue-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : (
          "Request my free consultation"
        )}
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-slate">
        No obligation. We&apos;ll only use your details to plan your
        consultation.
      </p>
    </form>
  );
}

function inputCls(hasError: boolean) {
  return clsx(
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate/45",
    "outline-none transition-[border-color,box-shadow] duration-150",
    "focus:border-blue focus:ring-2 focus:ring-blue/25",
    hasError ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : "border-navy/15"
  );
}

function Field({
  label,
  id,
  input,
  error,
  optional,
}: {
  label: string;
  id: string;
  input: React.ReactNode;
  error?: string;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {optional && <span className="ml-1.5 font-normal text-slate/70">(optional)</span>}
      </label>
      {input}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
