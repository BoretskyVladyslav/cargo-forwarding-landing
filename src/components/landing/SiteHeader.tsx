"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/contact";

const LOGO_WIDTH = 1436;
const LOGO_HEIGHT = 1360;

function PhoneGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={`transition-[color,transform] duration-300 ease-in-out ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V21c0 .55-.45 1-1 1C10.73 22 3 14.27 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SiteHeader() {
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 8;
      setElevated((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phoneLabel = `Зателефонувати: ${CONTACT_PHONE_DISPLAY}`;

  return (
    <header
      className={`sticky top-0 z-50 transition-[backdrop-filter,border-color,background-color] duration-500 ease-in-out motion-reduce:transition-none ${
        elevated
          ? "border-b border-white/12 bg-brand-background/78 backdrop-blur-xl supports-[backdrop-filter]:bg-brand-background/72"
          : "border-b border-transparent bg-transparent backdrop-blur-0 supports-[backdrop-filter]:bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-6">
          <a
            href="#hero"
            className="group inline-flex shrink-0 touch-manipulation items-center rounded-md transition-[opacity,transform] duration-300 ease-in-out hover:opacity-95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            <Image
              src="/img/logo.png"
              alt="KTEK"
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              priority
              className="h-16 w-auto md:h-20"
            />
          </a>

          <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-4">
            <a
              href={CONTACT_PHONE_HREF}
              aria-label={phoneLabel}
              className="inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-brand-gold-muted/55 text-brand-gold transition-[color,border-color,background-color,transform] duration-300 ease-in-out hover:border-brand-gold hover:bg-brand-gold-muted/15 hover:text-brand-amber active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background motion-reduce:transition-none motion-reduce:active:scale-100 md:hidden"
            >
              <PhoneGlyph className="h-5 w-5" />
            </a>

            <nav
              aria-label="Контакти та дії"
              className="hidden items-center gap-x-10 text-[15px] md:flex md:flex-wrap md:justify-end"
            >
              <a
                href={CONTACT_PHONE_HREF}
                className="nav-underline inline-flex min-h-11 touch-manipulation items-center py-2 font-medium text-brand-foreground hover:text-brand-gold focus-visible:text-brand-gold focus-visible:outline-none active:scale-[0.98]"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
              <a
                href={CONTACT_MAILTO_HREF}
                className="nav-underline inline-flex min-h-11 touch-manipulation items-center py-2 text-[#d0d0d0] hover:text-white focus-visible:outline-none active:scale-[0.98]"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href="#lead-form"
                className="relative isolate inline-flex min-h-11 shrink-0 touch-manipulation items-center justify-center overflow-hidden rounded-lg border border-brand-gold px-5 py-2 text-center text-sm font-semibold text-brand-gold transition-[color,border-color,transform] duration-300 ease-in-out before:absolute before:inset-0 before:-z-10 before:bg-brand-gold before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:border-brand-gold hover:text-brand-background hover:before:opacity-100 focus-visible:border-brand-gold active:scale-[0.98] focus-visible:bg-brand-gold focus-visible:text-brand-background focus-visible:outline-none sm:min-h-[2.625rem] sm:px-6 sm:text-[15px] motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                <span className="relative">Замовити дзвінок</span>
              </a>
            </nav>
          </div>
        </div>

        <a
          href="#lead-form"
          className="relative isolate mt-3 flex min-h-11 w-full touch-manipulation items-center justify-center overflow-hidden rounded-lg border border-brand-gold px-5 py-2.5 text-center text-sm font-semibold text-brand-gold transition-[color,border-color,transform] duration-300 ease-in-out before:absolute before:inset-0 before:-z-10 before:bg-brand-gold before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:border-brand-gold hover:text-brand-background hover:before:opacity-100 active:scale-[0.98] focus-visible:border-brand-gold focus-visible:bg-brand-gold focus-visible:text-brand-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background motion-reduce:transition-none motion-reduce:active:scale-100 md:hidden"
        >
          <span className="relative">Замовити дзвінок</span>
        </a>
      </div>
    </header>
  );
}
