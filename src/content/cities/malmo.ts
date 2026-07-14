import type { City } from "@/lib/cities-types";

export const city: City = {
  slug: "malmo",
  name: "Malmö",
  region: "Region Skåne",
  county: "Skåne län",
  hospitals: [
    "Skånes universitetssjukhus (SUS) i Malmö",
    "Privata specialistmottagningar i Malmö- och Lundområdet",
  ],
  intro:
    "Malmö är Sveriges tredje största stad och en central del av Öresundsregionen, med kort väg till både Lund och övriga Skåne. Här finns ett brett utbud av specialistvård, från Skånes universitetssjukhus (SUS) till en växande flora av privata specialistmottagningar i staden och grannkommunerna. Det gör att du som patient ofta kan välja mellan offentliga och privata alternativ när du söker en specialistläkare. Väntetiderna varierar mellan olika specialiteter och mottagningar, och det kan löna sig att jämföra flera vägar in i vården.",
  specialtyIntros: {
    allmanmedicin:
      "I Malmö kan du vända dig till privata läkarmottagningar för en bred medicinsk bedömning när besvären är svårplacerade. En specialist i allmänmedicin ser helheten och hjälper dig vidare till rätt specialist vid behov. Specialistdirekt förmedlar kontakt kostnadsfritt.",
    kardiolog:
      "Söker du en kardiolog i Malmö finns både hjärtsjukvård vid Skånes universitetssjukhus och flera privata hjärtmottagningar i staden. Vi hjälper dig att hitta en specialist för utredning av till exempel hjärtklappning, högt blodtryck eller bröstsmärta, så att du slipper leta på egen hand. Förmedlingen är kostnadsfri och anpassad efter var i Malmöområdet du befinner dig.",
    ortoped:
      "Behöver du träffa en ortoped i Malmö kan det handla om allt från knä- och axelbesvär till idrottsskador och slitageförändringar. I regionen finns ortopedisk kompetens både inom den offentliga vården och hos privata specialistmottagningar i Malmö och Lund. Vi matchar dig med en ortoped som passar dina besvär, helt utan kostnad för dig.",
    hudlakare:
      "En hudläkare i Malmö kan hjälpa dig med exempelvis födelsemärken, eksem, akne eller andra hudförändringar. Tillgången på dermatologer är ofta bättre hos privata mottagningar, och i Öresundsregionen finns flera att välja mellan. Berätta vad du söker hjälp för, så förmedlar vi kontakt med en lämplig specialist i närheten.",
    gynekolog:
      "Vill du boka tid hos en gynekolog i Malmö finns det flera vägar att gå, både via Skånes universitetssjukhus och genom privata mottagningar i staden. Det kan röra sig om allt från återkommande besvär och hormonfrågor till rådgivning och kontroller. Vi hjälper dig kostnadsfritt att hitta en gynekolog som tar emot patienter i Malmöområdet.",
    psykiater:
      "Att hitta en psykiater i Malmö kan kännas svårt, särskilt när behovet känns akut eller väntetiderna är långa. I regionen erbjuds psykiatrisk vård både offentligt och via privata specialister, vilket ger fler möjligheter att komma vidare. Vi förmedlar kontakt med en psykiater utifrån dina behov, utan att det kostar dig något.",
    neurolog:
      "En neurolog i Malmö utreder och behandlar besvär som rör nervsystemet, till exempel återkommande huvudvärk, yrsel eller domningar. Neurologisk kompetens finns vid Skånes universitetssjukhus och hos privata specialistmottagningar i Öresundsregionen. Vi hjälper dig att hitta rätt neurolog så att du snabbare kan få en bedömning, helt kostnadsfritt.",
  },
};
