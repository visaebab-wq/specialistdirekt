"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-ink-900"
          aria-label={`${site.name} – startsida`}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden fill="none">
            <circle cx="12" cy="12" r="2.4" fill="var(--color-navy-800)" />
            <circle cx="12" cy="5.5" r="2.1" fill="var(--color-brand-500)" />
            <circle cx="12" cy="18.5" r="2.1" fill="var(--color-brand-500)" />
            <circle cx="5.5" cy="12" r="2.1" fill="var(--color-brand-500)" />
            <circle cx="18.5" cy="12" r="2.1" fill="var(--color-brand-500)" />
          </svg>
          <span className="text-navy-800">
            Specialist<span className="font-semibold text-brand-600">direkt</span>
          </span>
        </Link>

        {/* Desktop-navigering */}
        <nav aria-label="Huvudmeny" className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Hitta specialist
          </Link>
        </nav>

        {/* Mobil meny-knapp */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700 md:hidden"
          aria-expanded={open}
          aria-controls="mobil-meny"
          aria-label="Öppna meny"
        >
          <span aria-hidden className="text-xl">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobil meny */}
      {open && (
        <nav
          id="mobil-meny"
          aria-label="Mobilmeny"
          className="border-t border-ink-200 bg-white md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {mainNav.map((item) => (
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
            <li className="py-2">
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-brand-600 px-4 py-3 text-center text-base font-semibold text-white"
              >
                Hitta specialist
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
