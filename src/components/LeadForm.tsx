"use client";

import { type FormEvent, useEffect, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

type SendPayload = {
  ok?: unknown;
  error?: unknown;
};

const PHONE_INPUT_ID = "lead-form-phone";
const COOLDOWN_KEY = "ktek-lead-cooldown-until";
const COOLDOWN_MS = 60_000;

const PHONE_INVALID_MSG =
  "Будь ласка, введіть коректний номер телефону (від 10 до 15 цифр).";

function sanitizePhoneInput(value: string): string {
  return value.replace(/[^\d+\s().-]/g, "");
}

function countPhoneDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

function isValidPhoneClient(value: string): boolean {
  const digits = countPhoneDigits(value);
  return digits >= 10 && digits <= 15;
}

function getCooldownRemainingSec(): number {
  if (typeof window === "undefined") return 0;
  const untilRaw = localStorage.getItem(COOLDOWN_KEY);
  if (!untilRaw) return 0;
  const until = Number.parseInt(untilRaw, 10);
  if (!Number.isFinite(until)) return 0;
  const remainingMs = until - Date.now();
  return remainingMs > 0 ? Math.ceil(remainingMs / 1000) : 0;
}

function setSubmitCooldown(): void {
  localStorage.setItem(COOLDOWN_KEY, String(Date.now() + COOLDOWN_MS));
}

type LeadFormProps = {
  embedded?: boolean;
};

export default function LeadForm({ embedded = false }: LeadFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [cooldownSec, setCooldownSec] = useState(0);

  const isLoading = status === "loading";
  const isCooldown = cooldownSec > 0;
  const formDisabled = isLoading || isCooldown;

  useEffect(() => {
    const tick = () => setCooldownSec(getCooldownRemainingSec());
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isCooldown) return;

    if (!isValidPhoneClient(phone)) {
      setServerMessage(PHONE_INVALID_MSG);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setServerMessage(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, system_req: honeypot }),
      });

      let data: SendPayload = {};
      try {
        data = (await response.json()) as SendPayload;
      } catch {
        data = {};
      }

      if (!response.ok) {
        const fallback =
          "Не вдалося надіслати заявку. Перевірте номер або спробуйте пізніше.";
        const message =
          typeof data.error === "string" && data.error.trim().length > 0
            ? data.error
            : fallback;
        setServerMessage(message);
        setStatus("error");
        return;
      }

      setSubmitCooldown();
      setCooldownSec(getCooldownRemainingSec());
      setStatus("success");
    } catch {
      setServerMessage(
        "Помилка мережі. Перевірте з'єднання та спробуйте ще раз.",
      );
      setStatus("error");
    }
  }

  function handlePhoneChange(raw: string) {
    setPhone(sanitizePhoneInput(raw));
    if (status === "error") {
      setStatus("idle");
      setServerMessage(null);
    }
  }

  const submitLabel = isLoading
    ? "Відправка..."
    : isCooldown
      ? `Спробуйте через ${cooldownSec} сек`
      : "Замовити прорахунок";

  const content = (
    <>
      <h2
        id={`${PHONE_INPUT_ID}-title`}
        className="text-lg font-semibold tracking-tight text-white sm:text-xl md:text-2xl"
      >
        Залиште заявку
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-[#d8d8d8] sm:text-[15px] sm:leading-relaxed">
        Вкажіть ваш номер телефону. Ми передзвонимо вам протягом 15 хвилин для
        розрахунку вартості доставки.
      </p>

      {status === "success" ? (
        <p
          className="mt-6 rounded-lg border border-emerald-700/60 bg-[#0A0A0A] px-4 py-3 text-sm font-medium leading-relaxed text-emerald-200"
          role="status"
          aria-live="polite"
        >
          ✓ Заявку успішно відправлено! Менеджер звʼяжеться з вами найближчим
          часом.
        </p>
      ) : (
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="system_req"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden opacity-0"
            aria-hidden
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor={PHONE_INPUT_ID}
              className="text-sm font-medium text-[#eaeaea] transition-colors duration-300 ease-in-out"
            >
              Номер телефону
            </label>
            <input
              id={PHONE_INPUT_ID}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              disabled={formDisabled}
              placeholder="+38 (097) 123-45-67"
              aria-invalid={status === "error"}
              aria-describedby={
                status === "error" && serverMessage
                  ? `${PHONE_INPUT_ID}-alert`
                  : undefined
              }
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={`min-h-11 w-full min-w-0 touch-manipulation rounded-lg border bg-[#0A0A0A] px-4 py-3 text-base text-white outline-none transition-[border-color] duration-300 ease-in-out placeholder:text-[#B59410]/45 focus:border-[#D4AF37] focus-visible:border-[#D4AF37] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none ${
                status === "error"
                  ? "border-red-400/65 focus:border-[#D4AF37] focus-visible:border-[#D4AF37]"
                  : "border-[#B59410]/35"
              }`}
            />
          </div>

          {status === "error" && serverMessage ? (
            <p
              id={`${PHONE_INPUT_ID}-alert`}
              className="rounded-lg border border-red-700/65 bg-[#0A0A0A] px-4 py-3 text-sm leading-relaxed text-red-100"
              role="alert"
            >
              {serverMessage}
            </p>
          ) : null}

          {isCooldown ? (
            <p
              className="rounded-lg border border-[#B59410]/35 bg-[#0A0A0A] px-4 py-3 text-sm leading-relaxed text-slate-300"
              role="status"
              aria-live="polite"
            >
              Заявку надіслано. Повторна відправка буде доступна через{" "}
              {cooldownSec} сек.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={formDisabled}
            className="btn-primary min-h-11 touch-manipulation active:scale-[0.98] motion-reduce:active:scale-100 disabled:opacity-60"
          >
            {submitLabel}
          </button>
        </form>
      )}
    </>
  );

  const titleId = `${PHONE_INPUT_ID}-title`;

  if (embedded) {
    return (
      <div
        id="lead-form"
        role="region"
        aria-labelledby={titleId}
        className="relative scroll-mt-28 w-full min-w-0 rounded-none border-0 bg-transparent px-4 py-8 shadow-none ring-0 outline-none sm:px-6 sm:py-10 lg:px-8"
      >
        {content}
      </div>
    );
  }

  return (
    <section
      id="lead-form"
      aria-labelledby={titleId}
      className="relative scroll-mt-28 mx-auto w-full min-w-0 max-w-md rounded-xl border border-[#B59410]/22 bg-[#161616] px-5 py-8 shadow-[0_26px_64px_-24px_rgba(0,0,0,0.55)] sm:px-7 sm:py-9"
    >
      {content}
    </section>
  );
}
