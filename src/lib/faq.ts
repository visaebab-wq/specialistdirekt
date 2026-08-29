// Gemensam FAQ-data. Återanvänds på startsidan, /vanliga-fragor och i
// FAQ-strukturerad data. Att hålla frågor/svar på ett ställe gör att
// sökmotorernas rich results alltid matchar det besökaren ser.

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Vad är Specialistdirekt?",
    answer:
      "Specialistdirekt hjälper dig att komma till rätt specialistläkare i Sverige. Du beskriver ditt behov, vi kontaktar flera anslutna mottagningar och återkommer med den tidigaste tid vi hittar. Det medicinska ansvaret för vården ligger hos mottagningen.",
  },
  // Betalningsfrågorna är medvetet uppdelade per bokningsväg. Ett universellt
  // svar går inte att ge: vid direktbokning i Göteborg betalas 2 000 kr på
  // plats hos vårdgivaren (se src/content/cities/goteborg.ts), medan upplägget
  // för förmedlade besök kan skilja sig åt. Tidigare stod här att betalningen
  // alltid går till Specialistdirekt och att avbokning/återbetalning sköts av
  // oss – det stämde inte för direktbokningen, alltså sajtens enda tjänst med
  // egen kalender. Skriv aldrig tillbaka ett generellt betalningspåstående här.
  {
    question: "Kostar det något att använda tjänsten?",
    answer:
      "Kostnaden beror på vilken tjänst du bokar. Vid direktbokning hos Dr. Masoud Sorkhabi i Göteborg kostar ortopedbesöket 2 000 kr. Du betalar direkt till vårdgivaren på plats vid besöket och ingen betalning görs i samband med bokningen via Specialistdirekt.\n\nFör andra specialistbesök som förmedlas via Specialistdirekt kan pris och betalningsupplägg skilja sig mellan olika tjänster. Den aktuella informationen ska alltid framgå innan du går vidare med en bokning eller förfrågan.",
  },
  {
    question: "Vem betalar jag till – Specialistdirekt eller vårdgivaren?",
    answer:
      "Vid direktbokning hos Dr. Masoud Sorkhabi i Göteborg betalar du 2 000 kr direkt till vårdgivaren på plats vid besöket. Ingen betalning görs till Specialistdirekt i samband med bokningen.\n\nFör andra specialistbesök som förmedlas via Specialistdirekt kan betalningsupplägget vara annorlunda beroende på tjänsten.\n\nSpecialistdirekt är en förmedlingstjänst. Det medicinska ansvaret för undersökning, bedömning och behandling ligger hos den vårdgivare som utför vården.",
  },
  {
    question: "Hur snabbt får jag svar?",
    answer:
      "Vi återkommer normalt inom en arbetsdag med förslag på en eller flera specialister som passar ditt behov. Vid hög belastning kan det ta upp till två arbetsdagar.",
  },
  {
    question: "Ger ni medicinska råd eller diagnoser?",
    answer:
      "Nej. Specialistdirekt ger inte medicinsk rådgivning och ställer inga diagnoser. Vi förmedlar kontakt med legitimerade specialister som gör den medicinska bedömningen.",
  },
  {
    question: "Hur hanteras mina personuppgifter?",
    answer:
      "Vi behandlar dina uppgifter enligt GDPR och delar dem endast med den specialist som behövs för att hjälpa dig. Du kan när som helst begära att vi raderar dina uppgifter. Läs mer i vår integritetspolicy.",
  },
  {
    question: "Måste jag ha en remiss?",
    answer:
      "Inte nödvändigtvis. Många specialister tar emot egenanmälan. Om en remiss krävs för ditt ärende guidar vi dig kring hur du går vidare.",
  },
  {
    question: "Vilka specialiteter kan jag få hjälp med?",
    answer:
      "Vi förmedlar kontakt inom en rad områden – bland annat kardiologi, ortopedi, dermatologi, gynekologi, neurologi och psykiatri. Ser du inte din specialitet? Hör av dig ändå, så hjälper vi dig vidare.",
  },
  {
    question: "Är det här en akuttjänst?",
    answer:
      "Nej. Vid akuta och livshotande tillstånd ska du alltid ringa 112. För brådskande men icke livshotande besvär, ring 1177 Vårdguiden.",
  },
];
