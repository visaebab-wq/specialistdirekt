import { recoProfileUrl, recoSummary } from "@/lib/reco-reviews";

// Kompakt förtroenderuta med Dr. Sorkhabis publika Reco-betyg. Länkar till Reco
// för full transparens. Betyget gäller läkaren, inte Specialistdirekt.
export function RecoTrust() {
  return (
    <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6">
      <p className="text-ink-800">
        Dr. Masoud Sorkhabi har fått mycket starka patientomdömen på Reco, där patienter
        återkommande lyfter hans bemötande, kompetens och noggrannhet.
      </p>
      <p className="mt-3 flex flex-wrap items-center gap-2">
        <span aria-hidden className="text-amber-400">
          ★★★★★
        </span>
        <span className="font-bold text-ink-900">
          {recoSummary.rating} av 5 på {recoSummary.source}
        </span>
        <span className="text-ink-500">· {recoSummary.count} omdömen</span>
      </p>
      <a
        href={recoProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center font-semibold text-brand-700 hover:underline"
      >
        Läs patientomdömen på Reco →
      </a>
    </div>
  );
}
