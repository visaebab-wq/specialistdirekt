import type { City } from "@/lib/cities-types";

export const city: City = {
  slug: "orebro",
  name: "Örebro",
  region: "Region Örebro län",
  county: "Örebro län",
  hospitals: ["Universitetssjukhuset Örebro (USÖ)"],
  intro:
    "Örebro ligger centralt i Mellansverige och fungerar som ett naturligt vårdnav för regionen. Här finns Universitetssjukhuset Örebro (USÖ), som samlar bred specialistkompetens och bedriver både vård och forskning. Vid sidan av den offentliga vården finns även privata mottagningar i staden, vilket ger fler vägar in till specialisthjälp. Specialistdirekt hjälper dig kostnadsfritt att hitta rätt specialistläkare i Örebro utifrån dina behov.",
  specialtyIntros: {
    gastroenterolog:
      "I Örebro finns mag- och tarmkompetens vid Universitetssjukhuset Örebro (USÖ) och hos privata mottagningar. Specialistdirekt hjälper dig kostnadsfritt att hitta en gastroenterolog i staden.",
    allmanmedicin:
      "I Örebro kan du få en bred medicinsk bedömning hos privata läkarmottagningar, som komplement till regionens vård. En allmänläkare ser helheten och hjälper dig hitta rätt väg vidare. Specialistdirekt tar emot förfrågningar kostnadsfritt.",
    kardiolog:
      "Vid hjärt- och kärlbesvär kan du i Örebro vända dig till specialistkompetens kopplad till Universitetssjukhuset Örebro samt till privata mottagningar i staden. Utredning av hjärtat kräver ibland särskild utrustning, vilket gör det värt att jämföra alternativen. Skicka en kostnadsfri förfrågan så återkommer vi med besked.",
    ortoped:
      "Har du besvär i leder, skelett eller en idrottsskada finns ortopedisk kompetens i Örebro, både inom regionens vård och hos privata aktörer. Som ett vårdnav i Mellansverige tar staden emot patienter från ett större upptagningsområde. Genom Specialistdirekt kommer du snabbt i kontakt med en ortoped som passar just dina besvär.",
    hudlakare:
      "För hudbesvär som eksem, utslag eller bedömning av födelsemärken kan du träffa en hudläkare i Örebro via såväl offentlig som privat mottagning. Det centrala läget gör staden lättillgänglig även för dig som bor i kringliggande orter. Vi guidar dig kostnadsfritt till rätt dermatolog.",
    gynekolog:
      "Söker du en gynekolog i Örebro finns vård inom kvinnohälsa kopplad till Universitetssjukhuset Örebro och till privata mottagningar i staden. Det kan vara svårt att veta vilken mottagning som passar bäst för just dina frågor. Specialistdirekt hjälper dig att hitta en gynekolog utifrån dina önskemål och behov.",
    psykiater:
      "Inom psykisk hälsa, inklusive utredning av exempelvis ADHD, finns psykiatrisk kompetens i Örebro genom regionens vård och privatpraktiserande psykiatrer. Vägen in i den psykiatriska vården kan ibland upplevas som otydlig. På Specialistdirekt kan du läsa om psykiatri och skicka en förfrågan i Örebro.",
    neurolog:
      "Vid besvär från nervsystemet, som migrän eller yrsel, finns neurologisk specialistkompetens vid Universitetssjukhuset Örebro och hos privata mottagningar i staden. Neurologi är ett område där en tidig och rätt utredning kan göra stor skillnad. Genom Specialistdirekt kommer du kostnadsfritt i kontakt med en neurolog i Örebro.",
  },
  specialtyLocal: {
    psykiater: {
      metaTitle: "Privat psykiater i Örebro – ADHD-utredning, pris och remiss",
      metaDescription:
        "Privat psykiater i Örebro: neuropsykiatrisk utredning (ADHD, NPF, autism), remiss, vad som påverkar priset och hur du bokar. Kostnadsfri förfrågan.",
      sections: [
        {
          id: "privat-psykiatri-orebro",
          heading: "Privat psykiatri i Örebro – vägen in",
          body: [
            "I Örebro finns psykiatrisk kompetens både inom den regiondrivna vården, med Universitetssjukhuset Örebro (USÖ) som nav, och hos privatpraktiserande psykiatrer i staden. En privat mottagning är fristående från regionens psykiatri – Specialistdirekt har ingen koppling till USÖ eller Region Örebro län, utan hjälper dig kostnadsfritt att hitta en privat **psykiater** i Örebro som passar dina behov.",
            "Vägen in ser olika ut. I offentlig vård börjar du oftast på **vårdcentralen**, som gör en första bedömning och vid behov skriver en **remiss** till psykiatrin. Hos många privata mottagningar kan du i stället boka mer direkt, ibland via en egen vårdbegäran. Hur det fungerar att söka på egen hand beskriver vi i [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
            "Läs mer om vad en psykiater gör på vår [översikt om psykiater](/specialiteter/psykiater), eller om vad vården kan kosta i guiden [privat psykiater: kostnad](/artiklar/privat-psykiater-kostnad).",
          ],
        },
        {
          id: "adhd-npf-utredning-orebro",
          heading: "ADHD-, NPF- och autismutredning i Örebro",
          body: [
            "En vanlig anledning att söka psykiatrisk hjälp i Örebro är frågan om en **neuropsykiatrisk utredning** – alltså en utredning av ADHD, ADD, autism eller annan neuropsykiatrisk funktionsnedsättning (NPF). En sådan **ADHD-utredning** är inte ett enskilt test utan en samlad bedömning över flera besök: anamnes, frågeformulär, en strukturerad intervju och ibland psykologiska tester. Det är en legitimerad psykiater eller psykolog inom ett team som ansvarar för bedömningen.",
            "Behöver du remiss? I offentlig vård går vägen oftast via vårdcentralen, medan en **privat ADHD- eller NPF-utredning** i många fall kan påbörjas mer direkt. Priset för en privat utredning **varierar mycket** beroende på hur omfattande den är och vad som ingår – vi anger inga fasta belopp här eftersom de skiljer sig åt mellan mottagningar. Be alltid den aktuella mottagningen om en samlad offert i förväg.",
            "En djupare genomgång av hur en utredning går till, vad som påverkar priset och vad som händer efter en diagnos finns i vår artikel [ADHD-utredning som vuxen](/artiklar/adhd-utredning-vuxen). Söker du hjälp i Örebro skickar du en kostnadsfri förfrågan så återkommer vi med besked.",
          ],
          bullets: [
            "**Neuropsykiatrisk utredning** – samlad bedömning av ADHD, ADD, autism eller annan NPF.",
            "**Anamnes och intervju** – samtal om nuläge och din historik ända från barndomen.",
            "**Frågeformulär och tester** – självskattningar och ibland psykologiska tester av uppmärksamhet och minne.",
            "**Återkoppling** – genomgång av resultatet och en plan för stöd, oavsett utfall.",
          ],
        },
        {
          id: "nar-psykisk-ohalsa-akut",
          heading: "När psykisk ohälsa behöver akut hjälp",
          body: [
            "En planerad psykiaterkontakt är till för besvär som inte är akuta. Vid **allvarliga tankar på att skada dig själv eller andra, eller vid en psykiatrisk kris**, ska du inte vänta – ring **112** eller kontakta närmaste psykiatriska akutmottagning. För sjukvårdsrådgivning dygnet runt når du **1177**.",
            "Specialistdirekt ger inte medicinsk rådgivning, ställer inga diagnoser och erbjuder ingen akut hjälp eller triage. Vi hjälper dig att hitta rätt privat mottagning för en planerad bedömning.",
          ],
        },
      ],
      faqs: [
        {
          question: "Behöver jag remiss för en ADHD-utredning i Örebro?",
          answer:
            "I offentlig vård börjar du oftast på vårdcentralen, som vid behov skriver en remiss till en specialiserad enhet. Hos många privata mottagningar kan en ADHD- eller NPF-utredning påbörjas mer direkt. Vad som gäller varierar mellan mottagningar – vi hjälper dig kostnadsfritt att reda ut vägen in. Läs mer om att [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
        },
        {
          question: "Vad påverkar priset för en privat ADHD-utredning?",
          answer:
            "Priset **varierar mycket** och beror på hur omfattande utredningen är: antal besök, vilka formulär och tester som ingår, om ett skriftligt utlåtande ingår och om du har en sjukvårdsförsäkring. Vi anger inga fasta belopp eftersom de skiljer sig åt – be alltid mottagningen om en samlad offert. Läs mer i [ADHD-utredning som vuxen](/artiklar/adhd-utredning-vuxen).",
        },
        {
          question: "Kan jag göra en NPF- eller autismutredning privat i Örebro?",
          answer:
            "Ja, det finns privatpraktiserande psykiatrer och mottagningar som arbetar med neuropsykiatriska utredningar. Omfattning, väntetid och pris skiljer sig åt mellan mottagningar, så be om besked i förväg. Skicka en kostnadsfri förfrågan så återkommer vi med besked.",
        },
      ],
    },
    kardiolog: {
      metaTitle: "Privat kardiolog i Örebro – pris, remiss och boka tid",
      metaDescription:
        "Privat kardiolog i Örebro: EKG, ultraljud och hjärtutredning, vad som påverkar priset, remiss och när hjärtbesvär är akut. Kostnadsfri förfrågan.",
      sections: [
        {
          id: "privat-kardiolog-orebro",
          heading: "Privat kardiolog i Örebro – utredning av hjärtat",
          body: [
            "Vid hjärt- och kärlbesvär finns i Örebro kardiologisk kompetens både kopplad till Universitetssjukhuset Örebro (USÖ) och hos privata mottagningar. En privat mottagning är fristående från regionens vård – Specialistdirekt tar emot förfrågningar och har ingen koppling till USÖ. En **kardiolog** utreder besvär som hjärtklappning, bröstobehag, andfåddhet, högt blodtryck och avvikande EKG.",
            "En kardiologisk bedömning börjar med ett samtal och en kroppsundersökning, och kompletteras vid behov med undersökningar. Vilka som blir aktuella avgör läkaren utifrån dina symtom. Läs mer på vår [översikt om kardiolog](/specialiteter/kardiolog).",
          ],
          bullets: [
            "**EKG** – registrerar hjärtats elektriska aktivitet, ofta grundläggande vid hjärtklappning och rytmbesvär.",
            "**Långtids-EKG (Holter)** – vid besvär som kommer och går.",
            "**Ultraljud av hjärtat (UCG)** – bedömer pumpförmåga, klaffar och struktur.",
            "**Arbetsprov** – visar hur hjärtat svarar på fysisk belastning.",
          ],
        },
        {
          id: "remiss-och-pris-orebro",
          heading: "Remiss och vad som påverkar priset",
          body: [
            "Behöver du remiss? I regionfinansierad vård går vägen ofta via vårdcentralen, medan du hos många privata mottagningar kan boka mer direkt eller via egen vårdbegäran. Vad som gäller beror på mottagning och finansiering – se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
            "Priset för en privat hjärtutredning beror på om det är ett nybesök eller återbesök och vilka undersökningar som ingår (EKG, ultraljud, långtids-EKG, arbetsprov). Har du en sjukvårdsförsäkring kan den ibland täcka kostnaden. Ungefärliga prisintervall och vad som driver kostnaden går vi igenom i [privat kardiolog: kostnad](/artiklar/privat-kardiolog-kostnad).",
          ],
        },
        {
          id: "nar-akut-orebro",
          heading: "När hjärtbesvär är akut",
          body: [
            "Vissa symtom ska inte vänta på en bokad tid. Ring **112** vid bröstsmärta eller tryck över bröstet som inte går över, särskilt med andfåddhet, illamående eller kallsvettning, vid plötslig svår andnöd eller svimning med hjärtklappning. En planerad kardiologbedömning är till för besvär som inte är akuta.",
            "Specialistdirekt ger inte medicinsk rådgivning och gör ingen bedömning av hur brådskande dina besvär är. Vid akuta symtom ska du alltid söka akut vård.",
          ],
        },
      ],
      faqs: [
        {
          question: "Behöver jag remiss till en privat kardiolog i Örebro?",
          answer:
            "Det beror på mottagning och finansiering. Vissa mottagningar tar emot egen vårdbegäran eller privat bokning, medan regionfinansierad vård och vissa försäkringar kan kräva remiss. Vi hjälper dig kostnadsfritt att hitta rätt väg – läs även [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
        },
        {
          question: "Vad påverkar priset för en privat hjärtutredning?",
          answer:
            "Om det är nybesök eller återbesök, och om EKG, ultraljud, långtids-EKG eller arbetsprov ingår. Sjukvårdsförsäkring kan ibland täcka delar av kostnaden. Ungefärliga intervall finns i [privat kardiolog: kostnad](/artiklar/privat-kardiolog-kostnad) – be alltid mottagningen om ett pris i förväg.",
        },
        {
          question: "När ska jag söka akut i stället för att boka kardiolog?",
          answer:
            "Ring 112 vid bröstsmärta som inte går över, svår andnöd, svimning eller misstanke om hjärtinfarkt eller stroke. En bokad tid hos en kardiolog är till för utredning av besvär som inte är akuta.",
        },
      ],
    },
    ortoped: {
      metaTitle: "Privat ortoped i Örebro – pris, remiss och boka tid",
      metaDescription:
        "Privat ortoped i Örebro: knä-, höft- och axelbesvär, röntgen och MR, vad som påverkar priset och remiss. Kostnadsfri förfrågan via Specialistdirekt.",
      sections: [
        {
          id: "privat-ortoped-orebro",
          heading: "Privat ortoped i Örebro – besvär i leder och skelett",
          body: [
            "Har du besvär i leder, skelett eller efter en idrottsskada finns ortopedisk kompetens i Örebro både inom regionens vård, med Universitetssjukhuset Örebro (USÖ) som nav, och hos privata mottagningar. En privat mottagning är fristående från regionvården – Specialistdirekt tar emot förfrågningar. En **ortoped** utreder rörelseapparaten: skelett, leder, muskler och senor.",
            "Ett ortopedbesök börjar med ett samtal och en klinisk undersökning där läkaren testar rörlighet, kraft och stabilitet. Vid behov kompletteras det med bilddiagnostik. Läs mer på vår [översikt om ortoped](/specialiteter/ortoped).",
          ],
          bullets: [
            "**Knäbesvär** – smärta, instabilitet eller låsningar, ofta kopplat till menisk eller ligament.",
            "**Höftbesvär** – värk och stelhet, vanligt vid artros.",
            "**Axelbesvär** – smärta vid lyft eller nedsatt rörlighet.",
            "**Röntgen och MR** – röntgen visar skelett och ledspringor, MR visar mjukdelar som menisk och korsband.",
          ],
        },
        {
          id: "remiss-och-pris-ortoped-orebro",
          heading: "Remiss och vad som påverkar priset",
          body: [
            "Många privata ortopedmottagningar tar emot **utan remiss**, men i vissa fall krävs remiss för att en sjukvårdsförsäkring eller regionen ska täcka kostnaden. Kontrollera vad som gäller i ditt fall – se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
            "Priset beror på om bilddiagnostik som röntgen eller MR ingår, och på om det gäller ett besök eller en eventuell operation. Ungefärliga prisintervall och vad som påverkar kostnaden går vi igenom i [privat ortoped: kostnad](/artiklar/privat-ortoped-kostnad).",
          ],
        },
        {
          id: "nar-akut-ortoped-orebro",
          heading: "När en skada behöver akut vård",
          body: [
            "Vid en akut, kraftig skada – till exempel misstänkt benbrott med felställning, oförmåga att stödja på benet, kraftig svullnad direkt efter ett trauma eller domningar och bortfall efter en olycka – ska du söka akut vård. En planerad ortopedbedömning är till för besvär som inte är akuta.",
            "Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina besvär är. Vid akuta skador ska du alltid söka akut vård eller ringa 1177 för rådgivning.",
          ],
        },
      ],
      faqs: [
        {
          question: "Behöver jag remiss till en privat ortoped i Örebro?",
          answer:
            "Många privata ortopedmottagningar tar emot utan remiss, så du kan ofta boka tid själv. I vissa fall krävs ändå remiss för att en sjukvårdsförsäkring eller regionen ska täcka kostnaden. Vi hjälper dig kostnadsfritt att reda ut vad som gäller.",
        },
        {
          question: "Vad kostar det att gå till en privat ortoped?",
          answer:
            "Priset varierar med mottagning och om röntgen eller MR ingår. Ungefärliga intervall för besök, bildundersökningar och eventuell operation finns i [privat ortoped: kostnad](/artiklar/privat-ortoped-kostnad). Be alltid kliniken om en offert i förväg.",
        },
        {
          question: "Måste jag göra röntgen innan besöket?",
          answer:
            "Nej, oftast inte. Ortopeden börjar med samtal och en klinisk undersökning och avgör därefter om röntgen eller MR behövs. Bilddiagnostik beställs vid behov och anpassas till dina besvär.",
        },
      ],
    },
    neurolog: {
      metaTitle: "Privat neurolog i Örebro – pris, remiss och boka tid",
      metaDescription:
        "Privat neurolog i Örebro: migrän, yrsel och domningar, neurologiskt status, vad som påverkar priset och remiss. Kostnadsfri förfrågan via Specialistdirekt.",
      sections: [
        {
          id: "privat-neurolog-orebro",
          heading: "Privat neurolog i Örebro – utredning av nervsystemet",
          body: [
            "Vid besvär från nervsystemet finns i Örebro neurologisk kompetens både vid Universitetssjukhuset Örebro (USÖ) och hos privata mottagningar. En privat mottagning är fristående från regionvården – Specialistdirekt tar emot förfrågningar och har ingen koppling till USÖ. En **neurolog** utreder sjukdomar i hjärna, ryggmärg och nerver, och en bedömning bygger på ett samtal och ett så kallat neurologiskt status där läkaren testar reflexer, känsel, styrka och balans.",
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
          id: "remiss-och-pris-neurolog-orebro",
          heading: "Remiss och vad som påverkar priset",
          body: [
            "Behöver du remiss? I regionfinansierad vård krävs ofta en remiss från vårdcentralen, medan du hos många privata mottagningar kan boka mer direkt. Vad som gäller varierar – se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
            "Priset beror på om det är ett nybesök och vilka undersökningar som tillkommer, till exempel MR. Har du en sjukvårdsförsäkring kan den ibland täcka kostnaden. Hur en privat neurologisk utredning kan gå till beskriver vi i [privat neurolog: utredning](/artiklar/privat-neurolog-utredning).",
          ],
        },
        {
          id: "nar-akut-neurolog-orebro",
          heading: "När neurologiska symtom är akuta",
          body: [
            "Vissa symtom kräver akut vård. Ring **112** vid plötslig svaghet eller domning i ansikte, arm eller ben, hängande mungipa, sluddrigt tal, akut synbortfall eller en plötslig, mycket svår huvudvärk – det kan vara tecken på stroke. En planerad neurologbedömning är till för besvär som inte är akut livshotande.",
            "Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina symtom är. Vid akuta symtom ska du alltid söka akut vård.",
          ],
        },
      ],
      faqs: [
        {
          question: "Behöver jag remiss till en privat neurolog i Örebro?",
          answer:
            "I offentlig vård krävs ofta en remiss från vårdcentralen, medan du hos många privata mottagningar kan boka tid själv. Reglerna varierar mellan mottagningar och finansiering – vi hjälper dig kostnadsfritt att hitta rätt väg.",
        },
        {
          question: "Kan en neurolog i Örebro hjälpa vid migrän?",
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
