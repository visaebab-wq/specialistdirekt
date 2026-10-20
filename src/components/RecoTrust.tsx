import { recoProfileUrl, recoSummary } from "@/lib/reco-reviews";

// Kompakt förtroenderuta med NOPAINCLINICs publika Reco-betyg. Länkar till Reco
// för full transparens. Betyget gäller företagsprofilen, inte Specialistdirekt.
export function RecoTrust() {
  return (
    <aside className="relative mt-8 overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-white via-brand-50 to-amber-50/60 p-6 shadow-[0_18px_45px_rgba(15,118,110,0.12)] sm:p-8">
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-200/30 blur-2xl"
      />
      <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            Patienternas omdömen
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-800 sm:text-lg">
            {recoSummary.profileName} har ett högt betyg på Reco. I omdömena nämns bland annat{" "}
            <strong>bemötande, kompetens och noggrannhet</strong>.
          </p>
        </div>

        <div className="min-w-48 rounded-2xl border border-amber-200/80 bg-white/90 px-5 py-4 text-center shadow-sm">
          <div aria-hidden className="text-xl tracking-[0.12em] text-amber-400">
            ★★★★★
          </div>
          <p className="mt-1 text-3xl font-extrabold leading-none text-ink-900">
            {recoSummary.rating}
            <span className="text-base font-semibold text-ink-500"> / 5</span>
          </p>
          <p className="mt-2 text-sm font-medium text-ink-600">
            {recoSummary.count} omdömen på {recoSummary.source}
          </p>
        </div>
      </div>

      <a
        href={recoProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-700 px-6 py-3.5 font-semibold text-white shadow-[0_10px_24px_rgba(15,118,110,0.2)] transition-all hover:-translate-y-0.5 hover:bg-brand-800 sm:w-auto"
      >
        Läs omdömen om {recoSummary.profileName} på Reco
        <span aria-hidden className="ml-2">→</span>
      </a>
    </aside>
  );
}
