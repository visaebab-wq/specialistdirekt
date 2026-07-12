// Gemensam FAQ-data. Återanvänds på startsidan, /vanliga-fragor och i
// FAQ-strukturerad data. Att hålla frågor/svar på ett ställe gör att
// sökmotorernas rich results alltid matchar det besökaren ser.

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Vad är Specialistdirekt?",
    answer:
      "Specialistdirekt är en kostnadsfri förmedlingstjänst som hjälper dig att hitta och komma i kontakt med rätt specialistläkare i Sverige. Du beskriver ditt behov, så matchar vi dig med en passande specialist.",
  },
  {
    question: "Kostar det något att använda tjänsten?",
    answer:
      "Nej. Att skicka in en förfrågan och bli matchad med en specialist är helt kostnadsfritt och utan förpliktelser. Eventuell kostnad för själva vårdbesöket avtalar du direkt med mottagningen.",
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
