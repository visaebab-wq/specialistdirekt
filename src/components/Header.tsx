"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/lib/site";
import { specialties } from "@/lib/specialties";

export function Header() {
  const [open, setOpen] = useState(false);
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);

  const navWithoutSpecialties = mainNav.filter((item) => item.href !== "/specialiteter");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
            Specialist<span className="font-semibold text-brand-700">direkt</span>
          </span>
        </Link>

        {/* Desktop-navigering */}
        <nav aria-label="Huvudmeny" className="hidden items-center gap-6 lg:flex">
          {navWithoutSpecialties.slice(0, 1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <Link
              href="/specialiteter"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700 focus:text-brand-700"
              aria-haspopup="true"
            >
              Våra specialister
              <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden>
                <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-[38rem] -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-ink-200 bg-white p-4 shadow-xl">
                <div className="grid grid-cols-3 gap-1">
                  {specialties.map((specialty) => (
                    <Link
                      key={specialty.slug}
                      href={`/specialiteter/${specialty.slug}`}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      {specialty.title}
                    </Link>
                  ))}
                </div>
                <Link href="/specialiteter" className="mt-3 block border-t border-ink-100 px-3 pt-3 text-sm font-semibold text-brand-700 hover:text-brand-800">
                  Se alla specialister →
                </Link>
              </div>
            </div>
          </div>
          {navWithoutSpecialties.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
          {/* Direktbokning finns BARA hos ortopeden. Knappen står i sidhuvudet på
              varje sida – även på hud-, mag- och psykiatrisidorna – så den måste
              säga vad som faktiskt går att boka. "Boka tid" ensamt lovar tider vi
              inte har. */}
          <Link
            href="/boka-tid"
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Boka ortoped
          </Link>
        </nav>

        {/* Mobil meny-knapp */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700 lg:hidden"
          aria-expanded={open}
          aria-controls="mobil-meny"
          aria-label={open ? "Stäng meny" : "Öppna meny"}
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
          className="border-t border-ink-200 bg-white lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {navWithoutSpecialties.slice(0, 1).map((item) => (
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
            <li className="border-y border-ink-100 py-1">
              <button
                type="button"
                onClick={() => setSpecialtiesOpen((value) => !value)}
                className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left text-base font-medium text-ink-700 hover:bg-brand-50"
                aria-expanded={specialtiesOpen}
              >
                Våra specialister
                <span aria-hidden className={`text-brand-700 transition-transform ${specialtiesOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>
              {specialtiesOpen && (
                <div className="grid grid-cols-2 gap-1 pb-3">
                  {specialties.map((specialty) => (
                    <Link
                      key={specialty.slug}
                      href={`/specialiteter/${specialty.slug}`}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-2 py-2 text-sm font-medium text-ink-700 hover:bg-brand-50 hover:text-brand-700"
                    >
                      {specialty.title}
                    </Link>
                  ))}
                  <Link
                    href="/specialiteter"
                    onClick={() => setOpen(false)}
                    className="col-span-2 mt-1 rounded-lg bg-brand-50 px-2 py-2 text-sm font-semibold text-brand-700"
                  >
                    Se alla specialister →
                  </Link>
                </div>
              )}
            </li>
            {navWithoutSpecialties.slice(1).map((item) => (
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
                href="/boka-tid"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-brand-600 px-4 py-3 text-center text-base font-semibold text-white"
              >
                Boka ortoped
              </Link>
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                className="mt-2 block px-4 py-2 text-center text-sm font-semibold text-brand-700"
              >
                Hitta annan specialist
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
