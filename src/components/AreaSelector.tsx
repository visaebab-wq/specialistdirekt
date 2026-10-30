"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { specialties } from "@/lib/specialties";
import { cities, publishesPair } from "@/lib/cities";

// Bara kombinationer som faktiskt genereras – annars hamnar besökaren på en 404
// (t.ex. Lund, som bara publicerar kardiologi).
function hasCityPage(specialty: string, city: string): boolean {
  const c = cities.find((x) => x.slug === city);
  return Boolean(c && publishesPair(c, specialty));
}

const selectClass =
  "w-full rounded-xl border border-ink-500 bg-white/95 px-4 py-3 text-ink-900 shadow-sm transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200 focus:outline-none";

export function AreaSelector() {
  const router = useRouter();
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");

  function go() {
    if (specialty && city && hasCityPage(specialty, city)) {
      router.push(`/specialiteter/${specialty}/${city}`);
    } else if (specialty) {
      router.push(`/specialiteter/${specialty}`);
    } else {
      router.push("/kontakt");
    }
  }

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_320px]">
      <div className="grid content-center gap-4 rounded-2xl bg-gradient-to-br from-white via-sky-50/70 to-brand-50/70 p-5 ring-1 ring-sky-100 sm:grid-cols-2 sm:p-6">
        <div>
          <label htmlFor="vs-specialty" className="mb-1 block text-sm font-medium text-ink-700">
            Specialist
          </label>
          <select
            id="vs-specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className={selectClass}
          >
            <option value="">Välj specialist…</option>
            {specialties.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="vs-city" className="mb-1 block text-sm font-medium text-ink-700">
            Stad
          </label>
          <select
            id="vs-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={selectClass}
          >
            <option value="">Hela Sverige</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <button
            type="button"
            onClick={go}
            className="w-full rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-[0_12px_28px_rgba(13,148,136,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_16px_34px_rgba(13,148,136,0.34)] sm:w-auto"
          >
            Visa tillgängliga mottagningar
          </button>
          {specialty && city && !hasCityPage(specialty, city) && (
            <p className="mt-2 text-sm text-ink-500">
              Stadsval finns ännu inte för denna specialitet – vi visar specialitetssidan.
            </p>
          )}
        </div>
      </div>

      <div className="specialist-map-panel mx-auto min-h-[260px] w-full max-w-[320px]">
        <img
          src="/specialist-neon/city-satellite-map.webp"
          alt=""
          className="city-map-image"
          loading="lazy"
        />
      </div>
    </div>
  );
}
