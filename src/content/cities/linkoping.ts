import type { City } from "@/lib/cities-types";

export const city: City = {
  slug: "linkoping",
  name: "Linköping",
  region: "Region Östergötland",
  county: "Östergötlands län",
  hospitals: ["Universitetssjukhuset i Linköping (US)"],
  intro:
    "Linköping är ett av Östergötlands viktigaste vårdnav och hem för Universitetssjukhuset i Linköping (US), där specialistvård bedrivs inom en lång rad områden. Som universitetssjukhus kombinerar US patientvård med forskning och utbildning, vilket bidrar till bred kompetens på orten. Vid sidan av den offentliga vården finns även privata specialistmottagningar i staden, vilket ger dig flera vägar in i vården. Specialistdirekt hjälper dig kostnadsfritt att hitta rätt specialistläkare i Linköping utifrån just dina behov.",
  specialtyIntros: {
    kardiolog:
      "Letar du efter en kardiolog i Linköping finns hjärt- och kärlkompetens både på Universitetssjukhuset i Linköping (US) och hos privata mottagningar i regionen. Eftersom utredning av hjärtbesvär ibland kräver särskild utrustning kan det vara värt att jämföra olika alternativ. Vi matchar dig kostnadsfritt med en hjärtspecialist som passar din situation.",
    ortoped:
      "Har du besvär i leder, skelett eller efter en idrottsskada kan en ortoped i Linköping hjälpa dig vidare. Här finns ortopedisk vård kopplad till Universitetssjukhuset i Linköping (US) liksom privata aktörer i Östergötland. Genom Specialistdirekt kommer du snabbt i kontakt med en ortoped som passar just dina besvär.",
    hudlakare:
      "Vill du träffa en hudläkare i Linköping för exempelvis eksem, hudutslag eller en bedömning av födelsemärken finns både offentliga och privata hudmottagningar att vända sig till. Att det finns flera alternativ gör det ofta enklare att hitta en tid som fungerar för dig. Vi guidar dig kostnadsfritt till rätt dermatolog på orten.",
    gynekolog:
      "Behöver du en gynekolog i Linköping möter du mottagningar inriktade på kvinnohälsa, från allmän gynekologi till mer specialiserad vård kopplad till Universitetssjukhuset i Linköping (US). Det kan ibland vara svårt att veta vart man ska vända sig först. Specialistdirekt hjälper dig att hitta en gynekolog utifrån dina önskemål och behov.",
    psykiater:
      "Inom psykisk hälsa, inklusive utredning av ADHD, finns i Linköping psykiatrisk kompetens både i den regiondrivna vården och hos privatpraktiserande psykiatrer. Att hitta rätt väg in kan kännas svårt när man mår dåligt. Vi hjälper dig att komma i kontakt med en psykiater i Linköping och att ta nästa steg.",
    neurolog:
      "För besvär från nervsystemet, som migrän eller yrsel, finns neurologisk specialistkompetens vid Universitetssjukhuset i Linköping (US) och hos privata neurologmottagningar i regionen. Neurologi är ett område där en tidig och rätt utredning kan göra stor skillnad. Genom Specialistdirekt kommer du kostnadsfritt i kontakt med en neurolog i Linköping.",
  },
  specialtyLocal: {
    neurolog: {
      metaTitle: "Privat neurolog i Linköping – pris, remiss och boka tid",
      metaDescription:
        "Privat neurolog i Linköping: migrän, yrsel och domningar, neurologiskt status, vad som påverkar priset och remiss. Kostnadsfri förmedling via Specialistdirekt.",
      sections: [
        {
          id: "privat-neurolog-linkoping",
          heading: "Privat neurolog i Linköping – utredning av nervsystemet",
          body: [
            "Vid besvär från nervsystemet finns i Linköping neurologisk kompetens både vid Universitetssjukhuset i Linköping (US) och hos privata mottagningar i Östergötland. En privat mottagning är fristående från regionvården – Specialistdirekt förmedlar kontakt men är inte en vårdgivare och har ingen koppling till US eller Region Östergötland. En **neurolog** utreder sjukdomar i hjärna, ryggmärg och nerver, och en bedömning bygger på ett samtal och ett neurologiskt status där läkaren testar reflexer, känsel, styrka och balans.",
            "Bland de vanligaste anledningarna att söka neurolog är återkommande **migrän** och svår huvudvärk, **yrsel** och balansbesvär samt **domningar** och stickningar. Vid behov kompletteras bedömningen med undersökningar som MR av hjärnan, EEG eller nervmätning. Läs mer på vår [översikt om neurolog](/specialiteter/neurolog).",
          ],
          bullets: [
            "**Migrän och svår huvudvärk** – utredning och förebyggande behandling (allmän information, ingen behandlingsrekommendation här).",
            "**Yrsel och balansbesvär** – se även [yrsel – vilken läkare?](/artiklar/yrsel-vilken-lakare).",
            "**Domningar och stickningar** – se [domningar i händer och fötter](/artiklar/domningar-hander-fotter-vilken-lakare).",
            "**Neurologiskt status** – strukturerad undersökning av reflexer, känsel, styrka och balans.",
          ],
        },
        {
          id: "remiss-och-pris-neurolog-linkoping",
          heading: "Remiss och vad som påverkar priset",
          body: [
            "Behöver du remiss? I regionfinansierad vård krävs ofta en remiss från vårdcentralen, medan du hos många privata mottagningar kan boka mer direkt. Vad som gäller varierar – se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
            "Priset beror på om det är ett nybesök och vilka undersökningar som tillkommer, till exempel MR. Har du en sjukvårdsförsäkring kan den ibland täcka kostnaden. Hur en privat neurologisk utredning kan gå till beskriver vi i [privat neurolog: utredning](/artiklar/privat-neurolog-utredning).",
          ],
        },
        {
          id: "nar-akut-neurolog-linkoping",
          heading: "När neurologiska symtom är akuta",
          body: [
            "Vissa symtom kräver akut vård. Ring **112** vid plötslig svaghet eller domning i ansikte, arm eller ben, hängande mungipa, sluddrigt tal, akut synbortfall eller en plötslig, mycket svår huvudvärk – det kan vara tecken på stroke. En planerad neurologbedömning är till för besvär som inte är akut livshotande.",
            "Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina symtom är. Vid akuta symtom ska du alltid söka akut vård.",
          ],
        },
      ],
      faqs: [
        {
          question: "Behöver jag remiss till en privat neurolog i Linköping?",
          answer:
            "I offentlig vård krävs ofta en remiss från vårdcentralen, medan du hos många privata mottagningar kan boka tid själv. Reglerna varierar mellan mottagningar och finansiering – vi hjälper dig kostnadsfritt att hitta rätt väg.",
        },
        {
          question: "Kan en neurolog i Linköping hjälpa vid migrän?",
          answer:
            "Migrän och annan svår återkommande huvudvärk är en av de vanligaste anledningarna att söka neurolog. Neurologen kan utreda besvären och lägga upp en plan tillsammans med dig. Den här sidan ger allmän information och ingen behandlingsrekommendation.",
        },
        {
          question: "När ska jag söka akut i stället för att boka neurolog?",
          answer:
            "Ring 112 vid plötslig svaghet eller domning i ansikte, arm eller ben, sluddrigt tal eller en plötslig, mycket svår huvudvärk – det kan vara tecken på stroke. En bokad neurologtid är till för besvär som inte är akuta.",
        },
      ],
    },
  },
};
