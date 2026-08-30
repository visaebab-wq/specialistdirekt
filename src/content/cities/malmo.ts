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
    gastroenterolog:
      "Söker du en gastroenterolog i Malmö finns mag- och tarmvård både i regionens vård och hos privata mottagningar i Skåne. Specialistdirekt hjälper dig kostnadsfritt att hitta en magspecialist som passar dina besvär.",
    allmanmedicin:
      "I Malmö kan du vända dig till privata läkarmottagningar för en bred medicinsk bedömning när besvären är svårplacerade. En specialist i allmänmedicin ser helheten och hjälper dig vidare till rätt specialist vid behov. Specialistdirekt tar emot förfrågningar kostnadsfritt.",
    kardiolog:
      "Söker du en kardiolog i Malmö finns både hjärtsjukvård vid Skånes universitetssjukhus och flera privata hjärtmottagningar i staden. Du kan läsa om och skicka en förfrågan till en specialist för utredning av till exempel hjärtklappning, högt blodtryck eller bröstsmärta, så att du slipper leta på egen hand. Tjänsten är kostnadsfri och anpassad efter var i Malmöområdet du befinner dig.",
    ortoped:
      "Behöver du träffa en ortoped i Malmö kan det handla om allt från knä- och axelbesvär till idrottsskador och slitageförändringar. I regionen finns ortopedisk kompetens både inom den offentliga vården och hos privata specialistmottagningar i Malmö och Lund. Skicka en kostnadsfri förfrågan så återkommer vi med besked.",
    hudlakare:
      "En hudläkare i Malmö kan hjälpa dig med exempelvis födelsemärken, eksem, akne eller andra hudförändringar. Tillgången på dermatologer är ofta bättre hos privata mottagningar, och i Öresundsregionen finns flera att välja mellan. Berätta vad du söker hjälp för i en tidsförfrågan via Specialistdirekt.",
    gynekolog:
      "Vill du boka tid hos en gynekolog i Malmö finns det flera vägar att gå, både via Skånes universitetssjukhus och genom privata mottagningar i staden. Det kan röra sig om allt från återkommande besvär och hormonfrågor till rådgivning och kontroller. Vi hjälper dig kostnadsfritt att hitta en gynekolog som tar emot patienter i Malmöområdet.",
    psykiater:
      "Att hitta en psykiater i Malmö kan kännas svårt, särskilt när behovet känns akut eller väntetiderna är långa. I regionen erbjuds psykiatrisk vård både offentligt och via privata specialister, vilket ger fler möjligheter att komma vidare. Vi tar emot förfrågningar om en psykiater utifrån dina behov, utan att det kostar dig något.",
    neurolog:
      "En neurolog i Malmö utreder och behandlar besvär som rör nervsystemet, till exempel återkommande huvudvärk, yrsel eller domningar. Neurologisk kompetens finns vid Skånes universitetssjukhus och hos privata specialistmottagningar i Öresundsregionen. Du kan läsa om neurologi och skicka en förfrågan så att du snabbare kan få en bedömning, helt kostnadsfritt.",
  },
  specialtyLocal: {
    gastroenterolog: {
      metaTitle: "Privat gastroenterolog i Malmö – magspecialist utan remiss",
      metaDescription:
        "Privat gastroenterolog i Malmö från cirka 3 000 kr. Långvariga magbesvär och halsbränna – så fungerar remiss och vad som ingår.",
      sections: [
        {
          id: "privat-gastroenterolog-malmo",
          heading: "Privat gastroenterolog i Malmö – vägen in",
          body: [
            "Malmö är Sveriges tredje största stad och har ett av landets tätaste vårdutbud. Den regionfinansierade mag- och tarmvården är knuten till **Skånes universitetssjukhus**, med verksamhet i både Malmö och Lund. Vid sidan av den finns privata mag- och tarmmottagningar i Malmö och i Öresundsregionen i övrigt. Specialistdirekt är fristående och har ingen koppling till Skånes universitetssjukhus eller Region Skåne – vi hjälper dig kostnadsfritt att hitta en relevant privat mottagning.",
            "En **gastroenterolog** (magspecialist, mag- och tarmläkare) utreder hela matsmältningskanalen samt lever, gallvägar och bukspottkörtel. Vägen in beror på finansieringen: som självbetalande kan du hos många privata mottagningar boka utan remiss, medan regionfinansierad vård oftast kräver remiss från vårdcentralen. Läs mer på [privat gastroenterolog](/privat-gastroenterolog).",
          ],
        },
        {
          id: "vanliga-besvar-gastro-malmo",
          heading: "Vanliga skäl att söka magspecialist",
          body: [
            "Många magbesvär är ofarliga och går över av sig själva. Det som gör en specialistbedömning motiverad är när besvären är **långvariga, återkommande eller ändrar karaktär**. Vanliga anledningar:",
          ],
          bullets: [
            "**Långvarig eller återkommande magont**",
            "**Uppblåst mage** som inte ger med sig – se [uppblåst mage](/artiklar/uppblast-mage).",
            "**Långvarig diarré eller förstoppning**, eller ändrade avföringsvanor",
            "**Halsbränna, sura uppstötningar och sväljsvårigheter**",
            "**Blod i avföringen** – ska alltid bedömas, se [blod i avföringen](/artiklar/blod-i-avforingen-gastroenterolog-koloskopi-akut-vard).",
            "**IBS, celiaki eller misstänkt inflammatorisk tarmsjukdom**",
          ],
        },
        {
          id: "vad-ingar-gastro-malmo",
          heading: "Vad kostar besöket – och vad ingår?",
          body: [
            "Ett privat besök hos en gastroenterolog kostar **från cirka 3 000 kr**. Det är ett **frånpris** för själva läkarbesöket: samtalet, kroppsundersökningen och läkarens bedömning av vad som behöver utredas vidare.",
            "Det som kan tillkomma prissätts ofta **separat** – blod- och avföringsprover, celiakiprov, kalprotektin, och endoskopiska undersökningar som **gastroskopi** eller **koloskopi**. Slutsumman beror alltså på vad som är medicinskt motiverat i ditt fall, och det avgörs först efter bedömningen. Be därför alltid om ett samlat pris i förväg och fråga vad som ingår, annars går mottagningar inte att jämföra rättvist. Kontrollera också om en eventuell sjukvårdsförsäkring täcker delar av kostnaden. Se [privat gastroenterolog: kostnad](/artiklar/privat-gastroenterolog-kostnad).",
          ],
        },
        {
          id: "undersokningar-gastro-malmo",
          heading: "Vilka undersökningar kan bli aktuella?",
          body: [
            "Bedömningen börjar med ett samtal och en kroppsundersökning – och det är samtalet som styr mest. Utifrån det avgör läkaren vad som är medicinskt motiverat. Inget beställs rutinmässigt, och en stor del av utredningarna stannar vid samtal och prover.",
            "Blir en endoskopisk undersökning aktuell kan du läsa på i förväg: [privat gastroskopi](/privat-gastroskopi) undersöker matstrupe, magsäck och tolvfingertarm, medan [privat koloskopi](/privat-koloskopi) undersöker tjocktarm och ändtarm. Vilken som passar avgörs av dina symtom.",
          ],
        },
        {
          id: "nar-akut-gastro-malmo",
          heading: "När du ska söka vård direkt",
          body: [
            "Vissa symtom ska inte vänta på en planerad tid. Sök akut vård eller ring **112** vid kraftig eller ihållande buksmärta, blodiga kräkningar, svart eller tjärliknande avföring, större mängder blod i avföringen, eller hög feber tillsammans med buksmärta.",
            "En planerad specialistbedömning är till för besvär som inte är akuta. Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina besvär är. Är du osäker når du 1177 dygnet runt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Vad kostar en privat gastroenterolog i Malmö?",
          answer:
            "Ett besök kostar från cirka 3 000 kr. Det är ett frånpris för själva läkarbesöket – provtagning och undersökningar som gastroskopi eller koloskopi prissätts ofta separat, så slutsumman beror på vad som behövs. Sjukvårdsförsäkring kan ibland täcka delar av kostnaden. Be alltid om ett samlat pris i förväg. Se [privat gastroenterolog: kostnad](/artiklar/privat-gastroenterolog-kostnad).",
        },
        {
          question: "Hur bokar jag tid hos en privat gastroenterolog i Malmö?",
          answer:
            "Du skickar en kostnadsfri förfrågan här på sidan och beskriver kort dina besvär. Vi kontaktar flera anslutna mottagningar och återkommer med den tidigaste tid vi hittar. Det medicinska ansvaret för vården ligger hos mottagningen.",
        },
        {
          question: "Kan jag träffa en gastroenterolog i Malmö utan remiss?",
          answer:
            "Som självbetalande kan du hos många privata mottagningar boka utan remiss, via egen vårdbegäran. Med sjukvårdsförsäkring går du vanligtvis via försäkringsbolaget, och inom regionfinansierad vård krävs oftast remiss. Reglerna varierar mellan mottagningar – vi hjälper dig kostnadsfritt att reda ut vad som gäller. Se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
        },
        {
          question: "Ingår gastroskopi eller koloskopi i priset?",
          answer:
            "Nej, endoskopiska undersökningar prissätts normalt separat från läkarbesöket. Frånpriset från cirka 3 000 kr avser konsultationen. Om en undersökning blir aktuell avgörs det först efter bedömningen – be mottagningen om ett samlat pris innan du bokar.",
        },
        {
          question: "Kan en gastroenterolog utreda uppblåst mage och långvariga magbesvär?",
          answer:
            "Ja, det är bland de vanligaste anledningarna att söka mag- och tarmspecialist. Läkaren utreder vad som ligger bakom – till exempel IBS, celiaki eller annan orsak. Läs mer i [uppblåst mage](/artiklar/uppblast-mage).",
        },
        {
          question: "Måste jag göra en endoskopisk undersökning?",
          answer:
            "Nej, inget beställs rutinmässigt. Läkaren träffar dig, går igenom symtom och sjukhistoria och avgör sedan vad som är medicinskt motiverat. En stor del av utredningarna stannar vid samtal och prover.",
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
