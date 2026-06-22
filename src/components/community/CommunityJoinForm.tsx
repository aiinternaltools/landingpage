"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type {
  getCommunityInterests,
  getCommunityRoles,
} from "@/content/index";

type CommunityRole = ReturnType<typeof getCommunityRoles>[number]["value"];

const fieldClass =
  "w-full rounded-lg border border-border bg-background/90 px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-[border-color,box-shadow] focus:border-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const labelClass = "block text-xs font-medium text-foreground sm:text-sm";

type CommunityJoinFormProps = {
  roles: ReturnType<typeof getCommunityRoles>;
  interests: ReturnType<typeof getCommunityInterests>;
};

export function CommunityJoinForm({
  roles,
  interests,
}: CommunityJoinFormProps) {
  const t = useTranslations("communityForm");
  const tCommon = useTranslations("common");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CommunityRole | "">("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [challenge, setChallenge] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  function toggleInterest(interest: string) {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role,
          interests: selectedInterests,
          challenge: challenge || undefined,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? tCommon("errors.generic"));
      }

      setStatus("success");
      setName("");
      setEmail("");
      setRole("");
      setSelectedInterests([]);
      setChallenge("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : tCommon("errors.generic"),
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[16rem] flex-col items-center justify-center px-2 text-center md:min-h-0" role="status">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent"
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-3 text-lg font-semibold text-foreground">
          {t("successTitle")}
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          {t("successDescription")}
        </p>
      </div>
    );
  }

  const interestChipClass = (selected: boolean) =>
    selected
      ? "border-accent/45 bg-accent/15 text-foreground"
      : "border-border/80 bg-background/70 text-muted hover:border-accent/30 hover:text-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="community-name" className={labelClass}>
            {t("name")}
          </label>
          <input
            id="community-name"
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
          <label htmlFor="community-email" className={labelClass}>
            {t("email")}
          </label>
          <input
            id="community-email"
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

      <div>
        <label htmlFor="community-role" className={labelClass}>
          {t("roleLabel")}
        </label>
        <select
          id="community-role"
          name="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value as CommunityRole)}
          className={`${fieldClass} mt-1`}
        >
          <option value="" disabled>
            {t("rolePlaceholder")}
          </option>
          {roles.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="rounded-xl border border-border/70 bg-background/25 p-3.5 sm:p-4">
        <div className="flex items-baseline justify-between gap-2">
          <legend className={labelClass}>{t("interestsLabel")}</legend>
          <span className="text-[11px] text-muted sm:text-xs" aria-live="polite">
            {selectedInterests.length > 0
              ? t("interestsSelected", { count: selectedInterests.length })
              : t("interestsOptional")}
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {interests.map(({ id, label }) => {
            const selected = selectedInterests.includes(id);
            return (
              <label
                key={id}
                className={`flex min-h-[2.3rem] cursor-pointer items-center rounded-lg border px-2.5 py-1.5 text-[11px] font-medium leading-snug transition-colors sm:px-3 sm:text-xs ${interestChipClass(selected)}`}
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={id}
                  checked={selected}
                  onChange={() => toggleInterest(id)}
                  className="sr-only"
                />
                {label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="community-challenge" className={labelClass}>
          {t("challengeLabel")}{" "}
          <span className="font-normal text-muted">{t("challengeOptional")}</span>
        </label>
        <input
          id="community-challenge"
          name="challenge"
          type="text"
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          className={`${fieldClass} mt-1`}
          placeholder={t("challengePlaceholder")}
        />
      </div>

      {status === "error" ? (
        <p
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300 sm:text-sm"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg border border-accent/35 bg-accent/12 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
      >
        {status === "submitting" ? t("formSubmitting") : t("formSubmit")}
      </button>
    </form>
  );
}
