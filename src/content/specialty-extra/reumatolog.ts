import type { SpecialtyExtra } from "@/lib/specialty-extra-types";

export const extra: SpecialtyExtra = {
  sections: [
    {
      id: "vad-reumatologen-undersoker",
      heading: "Vad en reumatolog gör – och vanliga undersökningar",
      body: [
        "En reumatolog är en specialistläkare inom inflammatoriska sjukdomar i leder, muskler och bindväv – till exempel ledgångsreumatism (RA), psoriasisartrit, ankyloserande spondylit och systemiska bindvävssjukdomar.",
        "En viktig del av arbetet är att skilja **inflammatorisk** ledsmärta från **belastnings- och slitagerelaterad** smärta, som ofta hör hemma hos ortoped eller fysioterapeut. Vanliga moment är:",
        "Vilka prover och undersökningar som blir aktuella beror på frågeställningen – det är läkaren som avgör vad som är motiverat.",
      ],
      bullets: [
        "**Ledstatus** – systematisk undersökning av leder: svullnad, ömhet, rörlighet och värme.",
        "**Blodprover** – t.ex. CRP och SR (inflammation), samt antikroppar som RF och anti-CCP vid frågeställning om RA.",
        "**Ultraljud av leder** – kan visa inflammation i ledhinnan som inte alltid syns utanpå.",
        "**Röntgen eller MR** – bedömer leder och eventuella förändringar över tid.",
      ],
    },
    {
      id: "reumatolog-eller-vardcentral",
      heading: "Reumatolog, ortoped eller vårdcentral – vad är skillnaden?",
      body: [
        "**Vårdcentralen** är oftast första kontakten vid ledbesvär och kan ta basprover och skriva remiss vidare. **Ortopeden** arbetar med skador, slitage och kirurgi i rörelseapparaten. **Reumatologen** kommer in när besvären misstänks vara inflammatoriska eller när flera leder är engagerade.",
        "En vanlig ledtråd är mönstret: inflammatorisk ledsmärta ger ofta **morgonstelhet som varar länge**, svullnad och besvär som lindras av rörelse – medan slitagesmärta typiskt förvärras av belastning. Men mönstren överlappar, och det är läkaren som gör bedömningen. Vill du veta mer om kostnader finns [privat reumatolog: kostnad](/artiklar/privat-reumatolog-kostnad).",
        "Vid **hög feber tillsammans med en kraftigt svullen, röd och mycket smärtande led** ska du söka akut vård – det kan vara en infektion i leden. Vid plötsliga neurologiska symtom, som svaghet eller domningar, sök också akut. Det här innehållet är allmän information, ger inga läkemedelsråd och ersätter inte en läkarbedömning.",
      ],
    },
    {
      id: "forsta-besoket",
      heading: "Så går ett första besök till",
      body: [
        "Besöket börjar med ett samtal: vilka leder som är drabbade, hur länge besvären funnits, om du har morgonstelhet och hur länge den varar, samt om du har hudbesvär, ögoninflammation, feber eller trötthet. Läkaren frågar också om ärftlighet, t.ex. psoriasis eller reumatisk sjukdom i familjen.",
        "Därefter görs ett ledstatus där läkaren undersöker lederna en och en. Blodprover är nästan alltid centrala, och ibland görs ultraljud i samband med besöket. Eftersom vissa svar tar tid kan bedömningen behöva kompletteras vid ett återbesök – reumatologiska diagnoser ställs sällan på ett enda prov.",
        "Specialistdirekt är en kostnadsfri förmedling som matchar dig med en specialist utifrån dina besvär. Hör av dig via [kontakt](/kontakt), eller läs hur det fungerar på [så fungerar det](/sa-fungerar-det).",
      ],
    },
    {
      id: "forbered-dig",
      heading: "Hur du förbereder dig inför besöket",
      body: [
        "Eftersom mönstret i besvären är så viktigt gör förberedelser stor skillnad:",
        "Ta gärna med tidigare provsvar och röntgensvar – de gör det lättare att se utvecklingen över tid.",
      ],
      bullets: [
        "Notera **vilka leder** som besvärar dig och om det är symmetriskt (samma led på båda sidor).",
        "Skriv ner hur länge **morgonstelheten** varar – minuter eller timmar.",
        "Fota gärna svullna leder när de är som mest svullna; svullnaden kan variera.",
        "Lista läkemedel och berätta om hudbesvär, psoriasis, ögoninflammation eller mag-tarmbesvär.",
      ],
    },
  ],
  faqs: [
    {
      question: "Behöver jag remiss för att träffa en reumatolog?",
      answer:
        "Som självbetalande kan du oftast boka en privat reumatolog direkt, utan remiss. Med sjukvårdsförsäkring går du vanligtvis via försäkringsbolaget, och inom regionfinansierad vård krävs oftast remiss. Reglerna varierar – läs mer i [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
    },
    {
      question: "Vad kostar ett besök hos en privat reumatolog?",
      answer:
        "Priser varierar mellan mottagningar och beror på vilka prover och undersökningar som ingår. Provtagning och bilddiagnostik prissätts ofta separat. Vi anger inga fasta belopp – be alltid om ett samlat pris i förväg. Se [privat reumatolog: kostnad](/artiklar/privat-reumatolog-kostnad).",
    },
    {
      question: "Vad skiljer inflammatorisk ledsmärta från slitage?",
      answer:
        "Inflammatorisk smärta ger ofta långvarig morgonstelhet, svullnad och besvär som lindras av rörelse, medan slitagesmärta typiskt förvärras av belastning. Mönstren överlappar dock, och det är läkaren som avgör – symtomen i sig ställer ingen diagnos.",
    },
    {
      question: "Ska jag gå till reumatolog eller ortoped?",
      answer:
        "Vid misstanke om inflammatorisk sjukdom, flera engagerade leder eller allmänsymtom är reumatolog oftast rätt. Vid skada, slitage eller frågeställning om operation är ortoped mer relevant. Är du osäker kan vårdcentralen hjälpa dig att välja väg.",
    },
    {
      question: "När ska jag söka akut i stället för att boka tid?",
      answer:
        "Sök akut vård vid hög feber tillsammans med en kraftigt svullen, röd och mycket smärtande led, eller vid plötsliga neurologiska symtom. En bokad tid är till för besvär som inte är akuta; är du osäker kan du ringa 1177.",
    },
  ],
};
