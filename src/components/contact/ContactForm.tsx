"use client";

import { useState } from "react";
import {
  contactForm,
  contactUseCaseCustomId,
  contactUseCaseOptions,
  type ContactUseCaseId,
} from "@/content/contact";

const fieldClass =
  "w-full rounded-lg border border-border bg-background/90 px-3 py-2 text-sm text-foreground placeholder:text-muted/60 transition-[border-color,box-shadow] focus:border-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const labelClass = "block text-xs font-medium text-foreground";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [useCase, setUseCase] = useState<ContactUseCaseId | "">("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const isCustom = useCase === contactUseCaseCustomId;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (isCustom && !message.trim()) {
      setStatus("error");
      setErrorMessage("Please describe your workflow when selecting something custom.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          useCase,
          message: message || undefined,
          company: company || undefined,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setUseCase("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex min-h-[12rem] flex-col items-center justify-center px-2 text-center"
        role="status"
      >
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent"
          aria-hidden
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-3 text-base font-semibold text-foreground">
          {contactForm.successTitle}
        </p>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
          {contactForm.successDescription}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${fieldClass} mt-1`}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${fieldClass} mt-1`}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-company" className={labelClass}>
            Company{" "}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={`${fieldClass} mt-1`}
          />
        </div>

        <div>
          <label htmlFor="contact-use-case" className={labelClass}>
            {contactForm.useCaseLabel}
          </label>
          <select
            id="contact-use-case"
            name="useCase"
            required
            value={useCase}
            onChange={(e) => setUseCase(e.target.value as ContactUseCaseId)}
            className={`${fieldClass} mt-1`}
          >
            <option value="" disabled>
              {contactForm.useCasePlaceholder}
            </option>
            {contactUseCaseOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {isCustom ? contactForm.messageLabelCustom : contactForm.messageLabel}{" "}
          {!isCustom ? (
            <span className="font-normal text-muted">(optional)</span>
          ) : null}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required={isCustom}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} mt-1 resize-none`}
          placeholder={
            isCustom
              ? contactForm.messagePlaceholder
              : contactForm.messagePlaceholderUseCase
          }
        />
      </div>

      {status === "error" ? (
        <p
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg border border-accent/35 bg-accent/12 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
      >
        {status === "submitting" ? contactForm.formSubmitting : contactForm.formSubmit}
      </button>
    </form>
  );
}
