// Gemensam FAQ-data. Återanvänds på startsidan, /vanliga-fragor och i
// FAQ-strukturerad data. Att hålla frågor/svar på ett ställe gör att
// sökmotorernas rich results alltid matchar det besökaren ser.

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Vad är Specialistdirekt?",
    answer:
      "Specialistdirekt hjälper dig att komma till rätt specialistläkare i Sverige. Du beskriver ditt behov, vi kontaktar flera anslutna mottagningar och återkommer med den tidigaste tid vi hittar. Vi är inte vårdgivare – det medicinska ansvaret för vården ligger hos mottagningen.",
  },
  {
    question: "Kostar det något att använda tjänsten?",
    answer:
      "Att skicka in en förfrågan och få förslag på tid är kostnadsfritt och utan förpliktelser. Du betalar först när du tackar ja till en tid, och betalningen för besöket gör du via Specialistdirekt. Priset framgår alltid innan du bekräftar.",
  },
  {
    question: "Vem betalar jag till – er eller mottagningen?",
    answer:
      "Du betalar besöket till Specialistdirekt (ViSaeb AB), inte till mottagningen. Det är alltså oss du vänder dig till om du behöver avboka eller få pengarna tillbaka. Det medicinska ansvaret för själva vården ligger däremot alltid hos mottagningen – vi är inte vårdgivare.",
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
