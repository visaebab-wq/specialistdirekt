"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { site } from "@/lib/site";

const links = [
  { href: "/en", label: "Home" },
  { href: "/en/private-orthopedist-gothenburg", label: "Orthopedist in Gothenburg" },
] as const;

export function HeaderEn() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/en"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-lg font-bold text-ink-900"
          aria-label={`${site.name} – English home page`}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden fill="none">
            <circle cx="12" cy="12" r="2.4" fill="var(--color-navy-800)" />
            <circle cx="12" cy="5.5" r="2.1" fill="var(--color-brand-500)" />
            <circle cx="12" cy="18.5" r="2.1" fill="var(--color-brand-500)" />
            <circle cx="5.5" cy="12" r="2.1" fill="var(--color-brand-500)" />
            <circle cx="18.5" cy="12" r="2.1" fill="var(--color-brand-500)" />
          </svg>
          <span className="text-navy-800">
            Specialist<span className="font-semibold text-brand-700">direkt</span>
          </span>
        </Link>

        <nav aria-label="Main menu" className="hidden items-center gap-6 md:flex">
          {links.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            hrefLang="sv"
            className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
          >
            Svenska
          </Link>
          <Link
            href="/boka-tid"
            hrefLang="sv"
            aria-label="Book an orthopedist (booking form in Swedish)"
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Book an orthopedist
          </Link>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu-en"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span aria-hidden className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu-en" aria-label="Mobile menu" className="border-t border-ink-200 bg-white md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-ink-700 hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-ink-100 py-2">
              <Link
                href="/boka-tid"
                hrefLang="sv"
                aria-label="Book an orthopedist (booking form in Swedish)"
                onClick={() => setOpen(false)}
                className="mb-1 block rounded-lg bg-brand-600 px-4 py-3 text-center text-base font-semibold text-white hover:bg-brand-700"
              >
                Book an orthopedist
              </Link>
              <Link
                href="/"
                hrefLang="sv"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-3 text-base font-medium text-ink-700 hover:bg-brand-50"
              >
                Svenska
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
