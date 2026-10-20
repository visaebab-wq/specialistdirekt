"use client";

import { useEffect, useRef, useState } from "react";
import { recoReviews, recoSummary, recoProfileUrl } from "@/lib/reco-reviews";

export function RecoReviews() {
  const n = recoReviews.length;
  const [i, setI] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pointerPaused, setPointerPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const userControlledAutoRotate = useRef(false);
  const paused = !autoRotate || pointerPaused || focusPaused;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      if (!userControlledAutoRotate.current) {
        setAutoRotate(!reducedMotion.matches);
      }
    };

    syncPreference();
    reducedMotion.addEventListener("change", syncPreference);
    return () => reducedMotion.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (paused || n <= 1) return;
    const id = setInterval(() => setI((p) => (p + 1) % n), 6000);
    return () => clearInterval(id);
  }, [paused, n]);

  if (n === 0) return null;
  const r = recoReviews[i];

  return (
    <section
      aria-label="Patientomdömen"
      className="bg-white"
      onMouseEnter={() => setPointerPaused(true)}
      onMouseLeave={() => setPointerPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocusPaused(false);
        }
      }}
    >
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-ink-900">Vad patienterna säger</h2>
        <a
          href={recoProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 hover:underline"
        >
          <span aria-hidden className="text-amber-400">
            ★★★★★
          </span>
          <span className="text-lg font-bold text-ink-900">{recoSummary.rating} av 5</span>
          <span className="text-ink-500">
            · {recoSummary.count} omdömen på {recoSummary.source}
          </span>
        </a>

        <div className="relative mt-8">
          <blockquote
            aria-live={paused ? "polite" : "off"}
            aria-atomic="true"
            className="readable-card mx-auto flex min-h-[210px] flex-col justify-center p-8"
          >
            <div aria-hidden className="text-xl tracking-widest text-amber-400">
              {"★".repeat(r.rating)}
            </div>
            <p className="mt-4 text-lg leading-relaxed text-ink-800">“{r.quote}”</p>
            <footer className="mt-4 text-sm font-semibold text-ink-600">
              {r.author} · {r.date}
            </footer>
          </blockquote>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setI((p) => (p - 1 + n) % n)}
              aria-label="Föregående omdöme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-xl text-ink-700 transition-colors hover:bg-sky-50"
            >
              ‹
            </button>
            <div className="flex">
              {recoReviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Visa omdöme ${idx + 1} av ${n}`}
                  aria-current={idx === i}
                  className="group flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-600"
                >
                  <span
                    aria-hidden
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      idx === i ? "bg-brand-600" : "bg-ink-200 group-hover:bg-ink-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setI((p) => (p + 1) % n)}
              aria-label="Nästa omdöme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-xl text-ink-700 transition-colors hover:bg-sky-50"
            >
              ›
            </button>
            <button
              type="button"
              data-carousel-autoplay-control
              aria-pressed={!autoRotate}
              onClick={() => {
                userControlledAutoRotate.current = true;
                // Fokus pausar alltid karusellen. Bara ett uttryckligt klick på
                // kontrollen får häva fokuspausen och starta den igen.
                setFocusPaused(false);
                setAutoRotate((current) => !current);
              }}
              className="rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-sky-50"
            >
              {autoRotate ? "Pausa automatisk växling" : "Fortsätt automatisk växling"}
            </button>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-sm text-ink-500">
          Omdömena är hämtade från {recoSummary.profileName}:s företagsprofil på{" "}
          <a
            href={recoProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 hover:underline"
          >
            Reco
          </a>
          . De är inte omdömen om Specialistdirekt.
        </p>
      </div>
    </section>
  );
}
