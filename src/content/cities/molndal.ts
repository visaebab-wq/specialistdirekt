import type { City } from "@/lib/cities-types";

export const city: City = {
  slug: "molndal",
  name: "Mölndal",
  region: "Västra Götalandsregionen",
  county: "Västra Götalands län",
  intro:
    "Mölndal ligger strax söder om Göteborg och är en egen stad med snabb koppling till storstadens vårdutbud. Här finns Mölndals sjukhus, som är en del av Sahlgrenska Universitetssjukhuset, och dessutom en växande andel privata specialistmottagningar i området. Närheten till Göteborg gör att du praktiskt taget kan välja mellan båda städernas vårdgivare, ofta med kort restid via E6, tåg eller spårvagn. Specialistdirekt hjälper dig kostnadsfritt att hitta en mottagning i Mölndal eller Göteborg som passar dina behov.",
  hospitals: ["Mölndals sjukhus (del av Sahlgrenska Universitetssjukhuset)"],
  specialtyIntros: {
    allmanmedicin:
      "I Mölndal kan du få en bred medicinsk bedömning hos privata läkarmottagningar, med Göteborgs utbud bara några minuter bort. En specialist i allmänmedicin hjälper dig när symtomen är oklara eller berör flera områden. Specialistdirekt vägleder dig kostnadsfritt vidare.",
    kardiolog:
      "Vid hjärtbesvär finns i Mölndal både regionens vård via Mölndals sjukhus och privata hjärtmottagningar i området. Närheten till Göteborg gör att du ofta kan jämföra flera vårdgivare innan du bokar. Specialistdirekt matchar dig kostnadsfritt med en kardiolog som passar din situation.",
    neurolog:
      "Besvär från nervsystemet – migrän, yrsel eller domningar – kan utredas av en neurolog i Mölndal eller i närliggande Göteborg. Regionens neurologiska tyngdpunkt finns vid Sahlgrenska, och vid sidan av den finns privata mottagningar. Specialistdirekt hjälper dig kostnadsfritt vidare.",
    gastroenterolog:
      "Vid långvariga mag- och tarmbesvär kan en gastroenterolog i Mölndal eller Göteborg utreda vad som ligger bakom. I området finns både regionens vård och privata mottagningar. Specialistdirekt hjälper dig kostnadsfritt att hitta en mag- och tarmspecialist.",
    ortoped:
      "Har du besvär i leder, skelett eller efter en idrottsskada finns ortopedisk kompetens i Mölndal, med Mölndals sjukhus som nav och privata mottagningar i området. Specialistdirekt hjälper dig kostnadsfritt att hitta en ortoped.",
    hudlakare:
      "För hudbesvär som eksem, utslag eller bedömning av födelsemärken kan du vända dig till hudmottagningar i Mölndal och Göteborg. Det korta avståndet ger dig fler alternativ att välja mellan. Vi guidar dig kostnadsfritt till rätt dermatolog.",
    gynekolog:
      "Söker du en gynekolog i Mölndal finns vård inom kvinnohälsa både i regionens vård och hos privata mottagningar, med Göteborgs utbud nära. Specialistdirekt förmedlar kontakt kostnadsfritt.",
    psykiater:
      "Inom psykisk hälsa finns psykiatrisk kompetens i Mölndal och i angränsande Göteborg, både i regionens vård och hos privatpraktiserande psykiatrer. Vi hjälper dig kostnadsfritt att komma i kontakt med en psykiater.",
  },
  specialtyLocal: {
    kardiolog: {
      metaTitle: "Privat kardiolog i Mölndal – utan remiss",
      metaDescription:
        "Privat kardiolog i Mölndal utan remiss: hjärtundersökningar, från cirka 3 000 kr, remiss och när hjärtbesvär är akuta. Kostnadsfri förmedling.",
      sections: [
        {
          id: "privat-kardiolog-molndal",
          heading: "Privat kardiolog i Mölndal – vägen in",
          body: [
            "Mölndal har hjärtsjukvård både via **Mölndals sjukhus**, som är en del av Sahlgrenska Universitetssjukhuset, och via privata mottagningar i området. Eftersom Göteborg ligger några minuter bort kan du i praktiken välja bland båda städernas vårdgivare. Specialistdirekt är fristående – vi är inte vårdgivare och har ingen koppling till Sahlgrenska eller Västra Götalandsregionen.",
            "Vägen in beror på finansieringen. Som **självbetalande** kan du hos många privata mottagningar boka utan remiss, via egen vårdbegäran. Inom **regionfinansierad** vård krävs oftast en remiss från vårdcentralen, och har du en **sjukvårdsförsäkring** går du normalt via försäkringsbolaget. Läs mer på vår [översikt om kardiolog](/specialiteter/kardiolog).",
          ],
        },
        {
          id: "hjartundersokningar-molndal",
          heading: "Vanliga hjärtundersökningar",
          body: [
            "Ett besök börjar med ett samtal om dina symtom och en kroppsundersökning. Läkaren avgör sedan vilka undersökningar som är medicinskt motiverade – allt görs inte rutinmässigt. De vanligaste är:",
          ],
          bullets: [
            "**EKG** – registrerar hjärtats elektriska aktivitet, ofta första steget vid hjärtklappning.",
            "**Långtids-EKG (Holter)** – registrering över ett eller flera dygn, bra vid besvär som kommer och går.",
            "**Ultraljud av hjärtat (UCG)** – visar pumpförmåga, klaffar och struktur.",
            "**Arbetsprov** – visar hur hjärtat svarar på fysisk belastning.",
            "**Dygnsblodtrycksmätning** – vid frågeställning om [högt blodtryck](/artiklar/hogt-blodtryck-nar-behovs-kardiolog).",
          ],
        },
        {
          id: "remiss-och-pris-kardiolog-molndal",
          heading: "Remiss och vad som påverkar priset",
          body: [
            "Ett privat kardiologbesök kostar **från cirka 3 000 kr**. Det är ett **frånpris** för själva läkarbesöket – tillkommande undersökningar som EKG, hjärtultraljud, långtids-EKG eller arbetsprov prissätts ofta separat, och slutsumman beror på vad läkaren bedömer att du behöver.",
            "Be därför alltid om ett samlat pris i förväg, och kontrollera om en eventuell sjukvårdsförsäkring täcker delar av kostnaden. Vad som driver kostnaden går vi igenom i [privat kardiolog: kostnad](/artiklar/privat-kardiolog-kostnad), och remissreglerna i [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
          ],
        },
        {
          id: "goco-health-innovation-city-molndal",
          heading: "GoCo Health Innovation City – vårdklustret i Mölndal",
          body: [
            "En stor del av den privata specialistvården i Mölndal finns samlad i **GoCo Health Innovation City** vid Vetenskapens gränd. Det är ett life science-område där specialistmottagningar, diagnostik, kirurgi och forskning ligger på samma plats, strax söder om Göteborg. Flera av mottagningarna vi förmedlar kontakt med finns här.",
            "Praktiskt betyder det två saker för dig. Dels att flera vårdgivare ligger inom samma område, så att ett byte av mottagning sällan innebär en ny resa åt ett helt annat håll. Dels att området nås enkelt från både Mölndals centrum och södra Göteborg – för många i södra Göteborg är det närmare hit än in till centrum.",
            "Specialistdirekt är fristående och har ingen koppling till GoCo Health Innovation City, och vi driver ingen verksamhet där. Vi förmedlar kostnadsfritt kontakt med privata mottagningar i området. Vilka vårdgivare som finns på plats förändras över tid – hör av dig så återkommer vi med vad som är aktuellt för dina besvär.",
          ],
        },
        {
          id: "nar-akut-kardiolog-molndal",
          heading: "När hjärtbesvär är akuta",
          body: [
            "Vissa symtom ska inte vänta på en bokad tid. Ring **112** vid bröstsmärta eller tryck över bröstet som inte går över – särskilt med andfåddhet, illamående eller kallsvettning – vid plötslig svår andnöd, eller vid svimning med hjärtklappning. Läs mer i [bröstsmärta – kardiolog eller akut vård?](/artiklar/brostsmarta-kardiolog-eller-akut-vard).",
            "En planerad kardiologbedömning är till för besvär som inte är akuta. Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina besvär är. Är du osäker når du **1177** dygnet runt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Hur bokar jag tid hos en privat kardiolog i Mölndal?",
          answer:
            "Du skickar en kostnadsfri förfrågan här på sidan och beskriver kort dina besvär. Vi matchar dig med en relevant privat mottagning i Mölndal eller Göteborg och återkommer med förslag – tiden bokar du sedan direkt med mottagningen. Specialistdirekt är en förmedlingstjänst; vi är inte vårdgivare och bokar inte tider åt dig.",
        },
        {
          question: "Kan jag träffa en kardiolog i Mölndal utan remiss?",
          answer:
            "Ja. Som självbetalande kan du hos många privata mottagningar boka utan remiss, via egen vårdbegäran. Inom regionfinansierad vård krävs oftast remiss från vårdcentralen. Vad som gäller beror på mottagning och finansiering – vi hjälper dig kostnadsfritt att reda ut vägen in.",
        },
        {
          question: "Vad kostar ett privat besök hos kardiolog i Mölndal?",
          answer:
            "Från cirka 3 000 kr. Det är ett frånpris för själva läkarbesöket – undersökningar som EKG, hjärtultraljud, långtids-EKG eller arbetsprov prissätts ofta separat, så slutsumman beror på vad läkaren bedömer att du behöver. Be alltid om ett samlat pris i förväg.",
        },
        {
          question: "Kan jag boka kardiolog för hjärtklappning eller oregelbunden puls?",
          answer:
            "Ja, hjärtklappning och oregelbunden puls är bland de vanligaste anledningarna att söka kardiolog. Läkaren utreder vad som ligger bakom, ofta med EKG som första steg. Läs mer i [hjärtklappning – vilken läkare?](/artiklar/hjartklappning-vilken-lakare).",
        },
        {
          question: "Kan jag boka kardiolog för högt blodtryck?",
          answer:
            "De flesta med högt blodtryck sköts i primärvården. En kardiolog kan bli aktuell vid svårbehandlat blodtryck, mycket högt blodtryck eller misstanke om bakomliggande orsak. Läs mer i [högt blodtryck – när behövs en kardiolog?](/artiklar/hogt-blodtryck-nar-behovs-kardiolog).",
        },
        {
          question: "Finns det privata specialistmottagningar i GoCo i Mölndal?",
          answer:
            "Ja. GoCo Health Innovation City vid Vetenskapens gränd i Mölndal är ett life science-område där flera privata specialistmottagningar, diagnostik och forskning finns samlade. Flera av mottagningarna vi förmedlar kontakt med ligger där. Specialistdirekt är fristående och har ingen koppling till GoCo – vi driver ingen verksamhet i området. Beskriv dina besvär i en kostnadsfri förfrågan, så återkommer vi med förslag.",
        },
        {
          question: "När ska jag söka akut i stället för att boka kardiolog?",
          answer:
            "Ring 112 vid bröstsmärta som inte går över, svår andnöd, svimning eller misstanke om hjärtinfarkt eller stroke. En bokad tid är till för besvär som inte är akuta; är du osäker kan du ringa 1177.",
        },
      ],
    },
    neurolog: {
      metaTitle: "Privat neurolog i Mölndal – utan remiss",
      metaDescription:
        "Privat neurolog i Mölndal utan remiss: migrän, yrsel och domningar, MR/EEG/EMG-bedömning och pris från cirka 3 000 kr. Kostnadsfri förmedling.",
      sections: [
        {
          id: "privat-neurolog-molndal",
          heading: "Privat neurolog i Mölndal – vägen in vid nervbesvär",
          body: [
            "Regionens neurologiska tyngdpunkt finns vid **Sahlgrenska Universitetssjukhuset**, med vård även vid **Mölndals sjukhus** som är en del av samma sjukhus. Vid sidan av regionens vård finns privata neurologmottagningar i Mölndal och Göteborg. Specialistdirekt är fristående – vi är inte vårdgivare och har ingen koppling till Sahlgrenska eller Västra Götalandsregionen.",
            "En **neurolog** utreder symtom och sjukdomar som utgår från hjärna, ryggmärg och nerver. Grunden är samtalet om dina symtom och ett **neurologiskt status**, där läkaren undersöker reflexer, känsel, styrka, koordination och balans. Läs mer på vår [översikt om neurolog](/specialiteter/neurolog).",
          ],
        },
        {
          id: "vanliga-besvar-neurolog-molndal",
          heading: "Vanliga skäl att söka neurolog",
          body: [
            "Vilka undersökningar som blir aktuella avgör läkaren utifrån dina symtom – allt beställs inte rutinmässigt. Vanliga anledningar är:",
          ],
          bullets: [
            "**Migrän och återkommande svår huvudvärk** (allmän information, ingen behandlingsrekommendation här).",
            "**Yrsel och balansbesvär** – se även [yrsel – vilken läkare?](/artiklar/yrsel-vilken-lakare).",
            "**Domningar, stickningar och nervsmärta** – se [domningar i händer och fötter](/artiklar/domningar-hander-fotter-vilken-lakare).",
            "**Skakningar (tremor) och muskelsvaghet** – neurologiska frågeställningar som kräver samlad bedömning.",
            "**Kompletterande undersökningar** – MR av hjärnan, EEG eller nervmätning (ENeG/EMG) när den kliniska bedömningen behöver stöd.",
          ],
        },
        {
          id: "remiss-och-pris-neurolog-molndal",
          heading: "Remiss och vad som påverkar priset",
          body: [
            "Ett privat neurologbesök kostar **från cirka 3 000 kr**. Det är ett **frånpris** för själva läkarbesöket – kompletterande undersökningar som MR, EEG eller nervmätning prissätts separat, och slutsumman beror på vad läkaren bedömer att du behöver.",
            "Som självbetalande kan du hos många privata mottagningar boka utan remiss; inom regionfinansierad vård krävs oftast remiss från vårdcentralen, och med sjukvårdsförsäkring går du via försäkringsbolaget. Se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss) och [privat neurolog: utredning](/artiklar/privat-neurolog-utredning).",
          ],
        },
        {
          id: "goco-health-innovation-city-molndal",
          heading: "GoCo Health Innovation City – vårdklustret i Mölndal",
          body: [
            "En stor del av den privata specialistvården i Mölndal finns samlad i **GoCo Health Innovation City** vid Vetenskapens gränd. Det är ett life science-område där specialistmottagningar, diagnostik, kirurgi och forskning ligger på samma plats, strax söder om Göteborg. Flera av mottagningarna vi förmedlar kontakt med finns här.",
            "Praktiskt betyder det två saker för dig. Dels att flera vårdgivare ligger inom samma område, så att ett byte av mottagning sällan innebär en ny resa åt ett helt annat håll. Dels att området nås enkelt från både Mölndals centrum och södra Göteborg – för många i södra Göteborg är det närmare hit än in till centrum.",
            "Specialistdirekt är fristående och har ingen koppling till GoCo Health Innovation City, och vi driver ingen verksamhet där. Vi förmedlar kostnadsfritt kontakt med privata mottagningar i området. Vilka vårdgivare som finns på plats förändras över tid – hör av dig så återkommer vi med vad som är aktuellt för dina besvär.",
          ],
        },
        {
          id: "nar-akut-neurolog-molndal",
          heading: "När neurologiska symtom är akuta",
          body: [
            "Vissa symtom ska aldrig vänta på en planerad tid. Ring **112** vid plötslig svaghet eller domning i ansikte, arm eller ben, hängande mungipa, sluddrigt tal, akut synbortfall eller en plötslig och mycket kraftig huvudvärk – det kan vara tecken på stroke, där varje minut räknas. Det gäller även om symtomen är milda eller har gått över.",
            "En planerad neurologtid är till för besvär som inte är akut livshotande. Specialistdirekt gör ingen medicinsk bedömning eller triage. Är du osäker når du **1177** dygnet runt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Hur bokar jag tid hos en privat neurolog i Mölndal?",
          answer:
            "Du skickar en kostnadsfri förfrågan här på sidan och beskriver kort dina besvär. Vi matchar dig med en relevant privat mottagning i Mölndal eller Göteborg och återkommer med förslag – tiden bokar du sedan direkt med mottagningen. Vi är en förmedlingstjänst och bokar inte tider åt dig.",
        },
        {
          question: "Kan jag träffa en neurolog i Mölndal utan remiss?",
          answer:
            "Ja. Som självbetalande kan du hos många privata mottagningar boka utan remiss, via egen vårdbegäran. Inom regionfinansierad vård krävs oftast remiss från vårdcentralen. Vi hjälper dig kostnadsfritt att reda ut vägen in.",
        },
        {
          question: "Vad kostar ett privat neurologbesök i Mölndal?",
          answer:
            "Från cirka 3 000 kr. Det är ett frånpris för själva läkarbesöket – kompletterande undersökningar som MR, EEG eller nervmätning prissätts separat, så slutsumman beror på vad läkaren bedömer att du behöver. Be alltid om ett samlat pris i förväg.",
        },
        {
          question: "Kan jag boka neurolog för migrän eller långvarig huvudvärk?",
          answer:
            "Ja, återkommande migrän och svår huvudvärk är bland de vanligaste anledningarna att söka neurolog. Neurologen kan utreda vad som ligger bakom och lägga upp en plan tillsammans med dig. Sidan ger allmän information och ingen behandlingsrekommendation.",
        },
        {
          question: "Kan neurologen bedöma behovet av MR, EEG eller EMG?",
          answer:
            "Ja – det är just det en neurologisk bedömning går ut på. Läkaren träffar dig, gör ett neurologiskt status och avgör sedan vilka undersökningar som är medicinskt motiverade. Allt beställs inte rutinmässigt, utan utifrån dina symtom och tidigare fynd.",
        },
        {
          question: "Finns det privata specialistmottagningar i GoCo i Mölndal?",
          answer:
            "Ja. GoCo Health Innovation City vid Vetenskapens gränd i Mölndal är ett life science-område där flera privata specialistmottagningar, diagnostik och forskning finns samlade. Flera av mottagningarna vi förmedlar kontakt med ligger där. Specialistdirekt är fristående och har ingen koppling till GoCo – vi driver ingen verksamhet i området. Beskriv dina besvär i en kostnadsfri förfrågan, så återkommer vi med förslag.",
        },
        {
          question: "När ska jag söka akut i stället för att boka neurolog?",
          answer:
            "Ring 112 vid plötslig svaghet eller domning i ansikte, arm eller ben, sluddrigt tal, akut synbortfall eller en plötslig, mycket svår huvudvärk – det kan vara tecken på stroke, även om symtomen är milda eller gått över. En bokad tid är till för besvär som inte är akuta; är du osäker kan du ringa 1177.",
        },
      ],
    },
    allmanmedicin: {
      metaTitle: "Privat allmänläkare i Mölndal – utan remiss",
      metaDescription:
        "Privat allmänläkare i Mölndal utan remiss: bred medicinsk bedömning vid oklara symtom, från cirka 3 000 kr. Kostnadsfri förmedling via Specialistdirekt.",
      sections: [
        {
          id: "privat-allmanlakare-molndal",
          heading: "Privat allmänläkare i Mölndal – när bredden är rätt väg",
          body: [
            "I Mölndal finns privata läkarmottagningar vid sidan av regionens vårdcentraler och **Mölndals sjukhus**, som är en del av Sahlgrenska Universitetssjukhuset. Närheten till Göteborg ger dig fler alternativ inom kort restid. Specialistdirekt är fristående och har ingen koppling till Västra Götalandsregionen.",
            "En **specialist i allmänmedicin** har bredden som specialitet: att väga samman symtom, sjukhistoria, läkemedel och prover till en helhetsbild. Det är särskilt användbart när det är oklart vad besvären beror på. Vet du redan vilket organ det gäller kan en organspecialist vara mer effektiv – se vår [översikt om allmänmedicin](/specialiteter/allmanmedicin).",
          ],
        },
        {
          id: "nar-allmanlakare-molndal",
          heading: "Vanliga skäl att söka en bred bedömning",
          body: [
            "Vilka prover och undersökningar som blir aktuella avgör läkaren utifrån dina symtom. Vanliga anledningar är:",
          ],
          bullets: [
            "**Oklara symtom** som inte självklart hör till ett enskilt organ.",
            "**Långvarig trötthet** eller återkommande besvär utan tydlig förklaring.",
            "**Genomgång av provsvar** du inte förstår, eller en samlad bedömning av tidigare utredningar.",
            "**Läkemedelsgenomgång** – särskilt om du har flera mediciner.",
            "**Vägledning vidare** till rätt specialist när det behövs.",
          ],
        },
        {
          id: "remiss-och-pris-allmanmedicin-molndal",
          heading: "Remiss, pris och förhållandet till din vårdcentral",
          body: [
            "Ett privat läkarbesök kostar **från cirka 3 000 kr**. Det är ett **frånpris** för själva besöket – prover och kompletterande undersökningar prissätts ofta separat, och slutsumman beror på vad läkaren bedömer att du behöver. Som självbetalande kan du oftast boka utan remiss; med sjukvårdsförsäkring går du normalt via försäkringsbolaget.",
            "Kom ihåg att ett privat besök **inte ersätter din vårdcentral**, som har din journal och ansvarar för kontinuiteten över tid. Se det som ett komplement eller en snabbare väg till en bedömning. Se även [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
          ],
        },
        {
          id: "goco-health-innovation-city-molndal",
          heading: "GoCo Health Innovation City – vårdklustret i Mölndal",
          body: [
            "En stor del av den privata specialistvården i Mölndal finns samlad i **GoCo Health Innovation City** vid Vetenskapens gränd. Det är ett life science-område där specialistmottagningar, diagnostik, kirurgi och forskning ligger på samma plats, strax söder om Göteborg. Flera av mottagningarna vi förmedlar kontakt med finns här.",
            "Praktiskt betyder det två saker för dig. Dels att flera vårdgivare ligger inom samma område, så att ett byte av mottagning sällan innebär en ny resa åt ett helt annat håll. Dels att området nås enkelt från både Mölndals centrum och södra Göteborg – för många i södra Göteborg är det närmare hit än in till centrum.",
            "Specialistdirekt är fristående och har ingen koppling till GoCo Health Innovation City, och vi driver ingen verksamhet där. Vi förmedlar kostnadsfritt kontakt med privata mottagningar i området. Vilka vårdgivare som finns på plats förändras över tid – hör av dig så återkommer vi med vad som är aktuellt för dina besvär.",
          ],
        },
        {
          id: "nar-akut-allmanmedicin-molndal",
          heading: "När du ska söka akut i stället",
          body: [
            "En planerad läkartid är till för besvär som inte är akuta. Ring **112** vid akuta eller livshotande symtom – till exempel bröstsmärta som inte går över, kraftig andnöd, plötslig svaghet, sluddrigt tal eller kraftigt påverkat allmäntillstånd.",
            "Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina besvär är. Är du osäker når du **1177** dygnet runt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Hur bokar jag tid hos en privat allmänläkare i Mölndal?",
          answer:
            "Du skickar en kostnadsfri förfrågan här på sidan och beskriver kort dina besvär. Vi matchar dig med en relevant privat mottagning i Mölndal eller Göteborg och återkommer med förslag – tiden bokar du sedan direkt med mottagningen. Vi är en förmedlingstjänst och bokar inte tider åt dig.",
        },
        {
          question: "Kan jag boka privat allmänläkare i Mölndal utan remiss?",
          answer:
            "Ja. Som självbetalande kan du oftast boka direkt, utan remiss. Har du en sjukvårdsförsäkring går du normalt via försäkringsbolaget. Reglerna varierar mellan mottagningar – vi hjälper dig kostnadsfritt att reda ut vägen in.",
        },
        {
          question: "Vad kostar ett besök hos privat allmänläkare i Mölndal?",
          answer:
            "Från cirka 3 000 kr. Det är ett frånpris för själva besöket – prover och kompletterande undersökningar prissätts ofta separat, så slutsumman beror på vad läkaren bedömer att du behöver. Be alltid om ett samlat pris i förväg.",
        },
        {
          question: "Vad kan en allmänläkare hjälpa till med?",
          answer:
            "En bred medicinsk bedömning: oklara symtom, långvarig trötthet, genomgång av provsvar, läkemedelsgenomgång och vägledning vidare till rätt specialist. Läkaren kan också beställa prover och vid behov remittera vidare.",
        },
        {
          question: "Vad är skillnaden mellan allmänläkare och vårdcentral?",
          answer:
            "En specialist i allmänmedicin är samma specialitet som arbetar på vårdcentral. Skillnaden är formen: en privat mottagning kan ofta ge en snabbare bedömning, medan vårdcentralen har din journal och ansvarar för kontinuiteten över tid. Ett privat besök är ett komplement, inte en ersättning.",
        },
        {
          question: "Finns det privata specialistmottagningar i GoCo i Mölndal?",
          answer:
            "Ja. GoCo Health Innovation City vid Vetenskapens gränd i Mölndal är ett life science-område där flera privata specialistmottagningar, diagnostik och forskning finns samlade. Flera av mottagningarna vi förmedlar kontakt med ligger där. Specialistdirekt är fristående och har ingen koppling till GoCo – vi driver ingen verksamhet i området. Beskriv dina besvär i en kostnadsfri förfrågan, så återkommer vi med förslag.",
        },
        {
          question: "När ska jag boka allmänläkare och när söka akut?",
          answer:
            "En bokad tid är till för besvär som inte är akuta. Ring 112 vid akuta eller livshotande symtom, till exempel bröstsmärta som inte går över, kraftig andnöd, plötslig svaghet eller sluddrigt tal. Är du osäker kan du ringa 1177 dygnet runt.",
        },
      ],
    },
    gastroenterolog: {
      metaTitle: "Privat gastroenterolog i Mölndal – magspecialist utan remiss",
      metaDescription:
        "Privat gastroenterolog i Mölndal: välja mottagning i Mölndal eller Göteborg, hur en magutredning läggs upp steg för steg och hur du förbereder dig. Kostnadsfri förmedling.",
      sections: [
        {
          id: "molndal-eller-goteborg-gastro",
          heading: "Mölndal eller Göteborg – var ska du söka?",
          body: [
            "Mölndal är en egen kommun med drygt 70 000 invånare, men ligger tätt inpå Göteborg – och just det gör valet av mottagning till en praktisk fråga snarare än en medicinsk. **Mölndals sjukhus** är sedan länge en del av Sahlgrenska Universitetssjukhuset, vilket betyder att den regionfinansierade mag- och tarmvården på orten hänger ihop med Göteborgs. För dig som söker privat är upptagningsområdet i praktiken hela Göteborgsregionen.",
            "Det innebär att du sällan behöver begränsa dig till mottagningar med Mölndals-adress. Många som bor i Mölndal, Kållered eller Lindome har kortare restid till en mottagning i södra Göteborg än till centrala Mölndal. Vår rekommendation: väg restid mot hur snart mottagningen kan ta emot dig, och låt inte kommungränsen styra. Bor du närmare centrum kan du jämföra med [gastroenterolog i Göteborg](/specialiteter/gastroenterolog/goteborg).",
            "Specialistdirekt är fristående och har ingen koppling till Sahlgrenska eller Västra Götalandsregionen. Vi är inte vårdgivare – vi hjälper dig kostnadsfritt att hitta en relevant privat mottagning i området.",
          ],
        },
        {
          id: "utredning-steg-for-steg-molndal",
          heading: "Så läggs en magutredning upp – steg för steg",
          body: [
            "En **gastroenterolog** utreder hela matsmältningskanalen samt lever, gallvägar och bukspottkörtel. Utredningen är sällan ett enda besök, utan en kedja där varje steg avgör nästa:",
            "Poängen är att inget beställs rutinmässigt. Läkaren väljer utifrån dina symtom, din ålder och din sjukhistoria – och en stor del av utredningarna stannar redan vid samtal och prover. Vill du läsa på om undersökningarna finns [privat gastroskopi](/privat-gastroskopi) och [privat koloskopi](/privat-koloskopi).",
          ],
          bullets: [
            "**Samtalet** – när besvären började, hur de utvecklats, vad som lindrar eller förvärrar. Det här är det som styr mest.",
            "**Kroppsundersökning** – bland annat bukpalpation.",
            "**Prover** – blodprover, avföringsprover, celiakiprov eller kalprotektin vid frågeställning om tarminflammation.",
            "**Eventuell endoskopi** – gastroskopi eller koloskopi, om det som framkommit motiverar det.",
            "**Återkoppling** – provsvar tar tid, så bedömningen behöver ibland ett återbesök innan en plan är klar.",
          ],
        },
        {
          id: "forbered-dig-gastro-molndal",
          heading: "Förbered dig – det gör bedömningen bättre",
          body: [
            "Magbesvär är svåra att beskriva i efterhand, och samtalet väger tyngst. Några saker gör verklig skillnad för vad läkaren kan få ut av besöket:",
            "Har du redan gjort utredningar i regionen – ta med svaren. Det kan bespara dig att göra om undersökningar i onödan.",
          ],
          bullets: [
            "**Notera besvären i några veckor innan**: när på dygnet, koppling till mat, hur avföringen ser ut.",
            "**Ta med en läkemedelslista**, inklusive receptfritt – exempelvis järntabletter och NSAID påverkar magen.",
            "**Skriv ner din viktigaste fråga först** – du hinner sällan med allt.",
            "**Notera ärftlighet** för tarmsjukdom, celiaki eller cancer i magtarmkanalen.",
            "**Nämn ofrivillig viktnedgång** – det är information läkaren särskilt vill ha.",
          ],
        },
        {
          id: "remiss-och-kostnad-gastro-molndal",
          heading: "Remiss, betalning och vad som styr priset",
          body: [
            "Vägen in beror på hur besöket finansieras. Som **självbetalande** kan du hos många privata mottagningar boka utan remiss, via egen vårdbegäran. Har du **sjukvårdsförsäkring** går du normalt via försäkringsbolaget, som avgör vad som täcks. Inom **regionfinansierad vård** krävs oftast remiss från vårdcentralen. Se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
            "Kostnaden går inte att ange som ett fast belopp: konsultation, provtagning och eventuell endoskopi prissätts ofta var för sig, och vad som ingår skiljer sig mellan mottagningar. Be därför alltid om ett **samlat pris i förväg** och fråga vad som ingår – annars går mottagningar inte att jämföra rättvist. Se [privat gastroenterolog: kostnad](/artiklar/privat-gastroenterolog-kostnad).",
          ],
        },
        {
          id: "nar-akut-gastro-molndal",
          heading: "När magbesvär inte kan vänta",
          body: [
            "Vissa symtom ska inte vänta på en planerad tid. Sök akut vård eller ring **112** vid kraftig eller ihållande buksmärta, blodiga kräkningar, svart eller tjärliknande avföring, större mängder blod i avföringen, eller hög feber tillsammans med buksmärta.",
            "En planerad specialistbedömning är till för besvär som inte är akuta. Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina besvär är. Är du osäker når du **1177** dygnet runt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Ska jag välja en mottagning i Mölndal eller i Göteborg?",
          answer:
            "Låt inte kommungränsen avgöra. Mölndal gränsar direkt till Göteborg och det privata utbudet är i praktiken gemensamt för hela regionen – för många i Mölndal, Kållered och Lindome är en mottagning i södra Göteborg närmare än centrala Mölndal. Väg restid mot när mottagningen kan ta emot dig. Beskriv var du bor i din förfrågan, så tar vi hänsyn till det.",
        },
        {
          question: "Hur bokar jag tid hos en privat gastroenterolog i Mölndal?",
          answer:
            "Du skickar en kostnadsfri förfrågan här på sidan och beskriver kort dina besvär. Vi matchar dig med en relevant privat mottagning i Mölndal eller Göteborgsområdet och återkommer med förslag – tiden bokar du sedan direkt med mottagningen. Specialistdirekt är en förmedlingstjänst; vi är inte vårdgivare och bokar inte tider åt dig.",
        },
        {
          question: "Kan jag träffa en gastroenterolog i Mölndal utan remiss?",
          answer:
            "Som självbetalande kan du hos många privata mottagningar boka utan remiss, via egen vårdbegäran. Med sjukvårdsförsäkring går du vanligtvis via försäkringsbolaget, och inom regionfinansierad vård krävs oftast remiss. Reglerna varierar mellan mottagningar – vi hjälper dig kostnadsfritt att reda ut vad som gäller.",
        },
        {
          question: "Hör Mölndals sjukhus till Sahlgrenska?",
          answer:
            "Ja, Mölndals sjukhus är en del av Sahlgrenska Universitetssjukhuset inom Västra Götalandsregionen. Det gäller den regionfinansierade vården. Specialistdirekt är fristående och har ingen koppling till Sahlgrenska eller regionen – vi förmedlar kontakt med privata mottagningar.",
        },
        {
          question: "Vad bör jag förbereda inför besöket?",
          answer:
            "Notera besvären några veckor i förväg: när på dygnet de kommer, kopplingen till mat och hur avföringen ser ut. Ta med en komplett läkemedelslista inklusive receptfritt, tidigare provsvar och undersökningar, samt uppgift om ärftlighet. Nämn särskilt ofrivillig viktnedgång. Samtalet väger tyngst i bedömningen.",
        },
        {
          question: "Måste jag göra gastroskopi eller koloskopi?",
          answer:
            "Nej, inget beställs rutinmässigt. Läkaren träffar dig, går igenom symtom och sjukhistoria och avgör sedan vad som är medicinskt motiverat. En stor del av utredningarna stannar vid samtal och prover.",
        },
        {
          question: "Vad kostar ett privat besök hos gastroenterolog?",
          answer:
            "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Konsultation, provtagning och eventuell endoskopi prissätts ofta separat. Vi anger inga fasta belopp – be alltid om ett samlat pris i förväg och fråga vad som ingår. Se [privat gastroenterolog: kostnad](/artiklar/privat-gastroenterolog-kostnad).",
        },
        {
          question: "När ska jag söka vård direkt i stället för att boka tid?",
          answer:
            "Sök akut vård eller ring 112 vid kraftig eller ihållande buksmärta, blodiga kräkningar, svart eller tjärliknande avföring, större mängder blod i avföringen, eller hög feber med buksmärta. Är du osäker kan du ringa 1177.",
        },
      ],
    },
  },
};
