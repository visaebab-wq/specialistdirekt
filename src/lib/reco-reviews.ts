// Omdömesutdrag från NOPAINCLINICs publika företagsprofil på Reco. Flera
// omdömen nämner Dr. Masoud Sorkhabi, men profilsiffrorna gäller företaget.
// Visas på startsidan med länk till Reco (full transparens –
// alla omdömen, inkl. eventuella negativa, finns på Reco).
// Omdömena gäller NOPAINCLINIC, INTE Specialistdirekt.
//
// Uppdatera vid behov mot https://www.reco.se/nopainclinic (verifiera exakt
// ordalydelse mot källan innan publicering).

export type RecoReview = {
  quote: string;
  author: string;
  /** ISO-datum (YYYY-MM-DD). */
  date: string;
  rating: number;
};

export const recoProfileUrl = "https://www.reco.se/nopainclinic";
export const recoSummary = {
  rating: "4,9",
  count: 64,
  source: "Reco",
  profileName: "NOPAINCLINIC",
};

// "…" markerar utelämnad text (ärligt utdrag, inte omskrivning).
export const recoReviews: RecoReview[] = [
  {
    author: "Kasper S",
    date: "2026-08-07",
    rating: 5,
    quote:
      "Jag är väldigt nöjd med mitt besök! Även fast jag hade otroligt svårt att känna vart smärtan kom från hittade han muskeln som har irriterat mig! Väldigt proffsigt!",
  },
  {
    author: "Nahid N",
    date: "2026-07-01",
    rating: 5,
    quote: "Rekommenderar. Direkt smärtfritt efter sprutan. Proffsigt läkare.",
  },
  {
    author: "Britt-Marie M",
    date: "2026-06-17",
    rating: 5,
    quote: "Bästa bemötande och behandling man kan få. Är så nöjd.",
  },
  {
    author: "Ali A",
    date: "2026-02-14",
    rating: 5,
    quote:
      "Smärtan är helt borta, och jag kan nu röra mig fritt och återuppta mina vanliga aktiviteter.",
  },
  {
    author: "Maenia B",
    date: "2026-07-02",
    rating: 5,
    quote:
      "Han var mycket kunnig, omtänksam och professionell … kan varmt rekommendera både Dr. Masoud Sorkhabi och kliniken.",
  },
  {
    author: "Jessica T",
    date: "2026-07-26",
    rating: 5,
    quote:
      "Dr Masoud får en stor eloge … har fått två fullskaliga behandlingar som har givit mig otroligt positiva resultat. Är så tacksam.",
  },
];
