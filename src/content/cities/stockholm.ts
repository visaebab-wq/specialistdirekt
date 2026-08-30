import type { City } from "@/lib/cities-types";

export const city: City = {
  slug: "stockholm",
  name: "Stockholm",
  region: "Region Stockholm",
  county: "Stockholms län",
  hospitals: [
    "Karolinska Universitetssjukhuset",
    "Södersjukhuset",
    "Danderyds sjukhus",
    "S:t Görans sjukhus",
  ],
  intro:
    "Stockholm har ett av landets bredaste utbud av specialistvård, med både offentliga sjukhusmottagningar och ett stort antal privata kliniker spridda över hela storstadsområdet. Det betyder att du ofta har många alternativ att välja mellan – men det innebär också att väntetiderna till vissa specialiteter kan variera och att det kan vara svårt att överblicka vart man ska vända sig. Specialistdirekt hjälper dig kostnadsfritt att hitta rätt specialistläkare i Stockholm utifrån dina behov.",
  specialtyIntros: {
    gastroenterolog:
      "I Stockholm finns ett stort utbud av privata mag- och tarmmottagningar vid sidan av regionens vård. Det gör att du som söker en gastroenterolog ofta har flera alternativ att välja mellan. Specialistdirekt vägleder dig kostnadsfritt vidare.",
    allmanmedicin:
      "I Stockholm finns ett stort utbud av privata läkarmottagningar för dig som vill ha en bred medicinsk bedömning utan lång väntan. En allmänläkare kan reda ut oklara symtom och peka ut rätt väg vidare när flera områden är inblandade. Specialistdirekt vägleder dig kostnadsfritt till en mottagning som passar.",
    kardiolog:
      "Söker du en kardiolog i Stockholm finns hjärt- och kärlspecialister på flera av stadens stora sjukhus såväl som på privata mottagningar. Eftersom utredningar av hjärtbesvär ibland kräver särskild utrustning kan det löna sig att jämföra olika mottagningar. Skicka en kostnadsfri förfrågan så återkommer vi med besked.",
    ortoped:
      "I Stockholm finns gott om ortopeder som tar emot patienter med besvär i leder, skelett och idrottsskador. Tillgången är god, men efterfrågan är samtidigt hög i en storstad där många är fysiskt aktiva. Genom Specialistdirekt får du hjälp att snabbt komma i kontakt med en ortoped som passar just dina besvär.",
    hudlakare:
      "Vill du träffa en hudläkare i Stockholm för till exempel eksem, hudutslag eller bedömning av födelsemärken finns både offentliga och privata hudmottagningar att välja mellan. Utbudet är stort, vilket gör det enklare att hitta en tid som passar dig. Vi guidar dig kostnadsfritt till rätt dermatolog i staden.",
    gynekolog:
      "Behöver du en gynekolog i Stockholm möter du ett brett utbud av mottagningar inriktade på kvinnohälsa, från allmän gynekologi till mer specialiserad vård. I en stad av Stockholms storlek kan det dock vara svårt att veta vilken mottagning som passar bäst. Specialistdirekt hjälper dig att hitta en gynekolog utifrån dina önskemål och behov.",
    psykiater:
      "Inom psykisk hälsa, inklusive utredning av ADHD, finns i Stockholm ett stort antal psykiatriska mottagningar och privatpraktiserande psykiatrer. Eftersom efterfrågan är hög kan väntetiderna skilja sig åt mellan olika aktörer. På Specialistdirekt kan du läsa om psykiatri och privata alternativ i Stockholm.",
    neurolog:
      "För besvär från nervsystemet, som migrän eller yrsel, finns neurologisk specialistkompetens på Stockholms sjukhus och hos privata neurologmottagningar. Neurologi är ett område där rätt utredning tidigt kan göra stor skillnad. Genom Specialistdirekt kommer du kostnadsfritt i kontakt med en neurolog i Stockholm som kan ta sig an dina besvär.",
  },
};
