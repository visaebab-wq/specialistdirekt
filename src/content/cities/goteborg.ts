import type { City } from "@/lib/cities-types";

export const city: City = {
  slug: "goteborg",
  name: "Göteborg",
  region: "Västra Götalandsregionen",
  county: "Västra Götalands län",
  intro:
    "Som Sveriges näst största stad har Göteborg ett brett och varierat utbud av specialistvård, med både regionens stora offentliga sjukhus och en växande andel privata mottagningar. Här finns möjlighet att träffa specialistläkare inom de flesta medicinska områden, ofta med relativt korta resvägar inom stadens olika stadsdelar. Vårdvalet gör att du som patient kan välja mellan flera vårdgivare, även om väntetiderna kan variera beroende på specialitet och säsong. Specialistdirekt hjälper dig kostnadsfritt att hitta en mottagning som passar dina behov.",
  hospitals: [
    "Sahlgrenska Universitetssjukhuset",
    "Östra sjukhuset",
    "Mölndals sjukhus",
  ],
  specialtyIntros: {
    kardiolog:
      "Vid hjärtbesvär finns det i Göteborg flera vägar till en kardiolog, både genom regionens sjukhus och via privata hjärtmottagningar. Utbudet i en storstad gör att du ofta kan jämföra olika vårdgivare innan du bokar tid. Specialistdirekt kan vägleda dig till en mottagning där en kardiolog kan utreda dina symtom.",
    ortoped:
      "Den som har problem med leder, skelett eller idrottsskador kan i Göteborg vända sig till ortopeder på både offentliga och privata mottagningar. Tack vare stadens storlek finns det en rad alternativ spridda över olika stadsdelar. Vi på Specialistdirekt hjälper dig att hitta en ortoped utan att det kostar dig något.",
    hudlakare:
      "Hudbesvär, från återkommande utslag till födelsemärken du vill få kontrollerade, kan bedömas av en hudläkare på någon av Göteborgs många dermatologiska mottagningar. Här samsas offentlig vård med ett flertal privata aktörer, vilket ger valfrihet. Låt Specialistdirekt matcha dig med en hudläkare i området.",
    gynekolog:
      "I Göteborg är tillgången till gynekologer god, med mottagningar inom såväl den regiondrivna vården som hos privata vårdgivare. Det gör att du som söker en gynekolog ofta har flera mottagningar att välja mellan i närheten. Specialistdirekt förmedlar kontakt kostnadsfritt så att du snabbare kan komma vidare.",
    psykiater:
      "För psykisk ohälsa erbjuder Göteborg specialistvård hos psykiatriker både inom den offentliga vården och hos privata mottagningar runt om i staden. Att det finns flera alternativ kan göra det lättare att hitta en mottagning som känns rätt för just dig. Specialistdirekt hjälper dig att komma i kontakt med en psykiater utan kostnad.",
    neurolog:
      "Besvär som rör nervsystemet, exempelvis huvudvärk, yrsel eller domningar, kan utredas av en neurolog i Göteborg. Som storstad har Göteborg ett samlat neurologiskt kunnande, med vård tillgänglig genom både regionens sjukhus och privata specialister. Specialistdirekt vägleder dig kostnadsfritt till en neurolog som kan ta sig an dina frågor.",
  },
  specialtyLocal: {
    kardiolog: {
      metaTitle: "Privat kardiolog i Göteborg – hjärtutredning utan remiss",
      metaDescription:
        "Privat kardiolog i Göteborg: EKG, hjärtultraljud och långtids-EKG, remiss, vad som påverkar priset och när hjärtbesvär är akuta. Kostnadsfri förmedling.",
      sections: [
        {
          id: "privat-kardiolog-goteborg",
          heading: "Privat kardiolog i Göteborg – vägen in",
          body: [
            "Göteborg är Sveriges näst största stad, och det märks på hjärtsjukvården. Regionens tyngdpunkt ligger vid **Sahlgrenska Universitetssjukhuset**, ett av Nordens största sjukhus, med ytterligare vård vid **Östra sjukhuset** och **Mölndals sjukhus**. Vid sidan av den regiondrivna vården finns flera privata hjärtmottagningar i staden. Specialistdirekt är en fristående förmedlingstjänst – vi är inte vårdgivare och har ingen koppling till Sahlgrenska eller Västra Götalandsregionen.",
            "Storstadsläget gör att du oftare kan **jämföra flera vårdgivare** innan du bestämmer dig, och att resvägen sällan blir lång oavsett stadsdel. Vägen in beror på finansieringen: som **självbetalande** kan du hos många privata mottagningar boka mer direkt, medan **regionfinansierad** vård i Västra Götalandsregionen oftast går via en remiss från vårdcentralen. Har du en **sjukvårdsförsäkring** går du normalt via försäkringsbolaget. Läs mer på vår [översikt om kardiolog](/specialiteter/kardiolog).",
          ],
        },
        {
          id: "hjartundersokningar-goteborg",
          heading: "Vanliga hjärtundersökningar",
          body: [
            "En kardiologisk bedömning börjar med ett samtal om dina symtom och en kroppsundersökning. Vilka undersökningar som blir aktuella avgör läkaren utifrån dina besvär – allt görs inte rutinmässigt. De vanligaste är:",
          ],
          bullets: [
            "**EKG** – registrerar hjärtats elektriska aktivitet, ofta det första steget vid hjärtklappning eller rytmbesvär.",
            "**Långtids-EKG (Holter)** – bärbar registrering över ett eller flera dygn, bra vid besvär som kommer och går.",
            "**Ultraljud av hjärtat (UCG)** – visar pumpförmåga, klaffar och struktur.",
            "**Arbetsprov (arbets-EKG)** – visar hur hjärtat svarar på fysisk belastning.",
            "**Dygnsblodtrycksmätning** – vid frågeställning om [högt blodtryck](/artiklar/hogt-blodtryck-nar-behovs-kardiolog).",
          ],
        },
        {
          id: "remiss-och-pris-goteborg",
          heading: "Remiss och vad som påverkar priset",
          body: [
            "Behöver du remiss? Inom regionfinansierad vård krävs oftast en remiss från vårdcentralen, medan du hos många privata mottagningar kan boka mer direkt eller via egen vårdbegäran. Vad som gäller beror på mottagning och finansiering – se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
            "Priset beror på om det är ett nybesök eller återbesök och vilka undersökningar som ingår (EKG, ultraljud, långtids-EKG, arbetsprov). Vi anger inga fasta belopp här eftersom de skiljer sig mellan mottagningar – be alltid om ett samlat pris i förväg, och kontrollera om en eventuell sjukvårdsförsäkring täcker delar av kostnaden. Ungefärliga intervall och vad som driver kostnaden går vi igenom i [privat kardiolog: kostnad](/artiklar/privat-kardiolog-kostnad).",
          ],
        },
        {
          id: "nar-akut-goteborg",
          heading: "När hjärtbesvär är akuta",
          body: [
            "Vissa symtom ska inte vänta på en bokad tid. Ring **112** vid bröstsmärta eller tryck över bröstet som inte går över – särskilt med andfåddhet, illamående eller kallsvettning – vid plötslig svår andnöd, eller vid svimning med hjärtklappning. Läs mer i vår guide [bröstsmärta – kardiolog eller akut vård?](/artiklar/brostsmarta-kardiolog-eller-akut-vard).",
            "En planerad kardiologbedömning är till för besvär som inte är akuta. Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina besvär är. Vid akuta symtom ska du alltid söka akut vård; är du osäker når du 1177 dygnet runt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Behöver jag remiss till en privat kardiolog i Göteborg?",
          answer:
            "Det beror på mottagning och finansiering. Som självbetalande kan du hos många privata mottagningar boka mer direkt eller via egen vårdbegäran, medan regionfinansierad vård i Västra Götalandsregionen oftast kräver remiss från vårdcentralen. Vi hjälper dig kostnadsfritt att reda ut vägen in – läs även [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
        },
        {
          question: "Vad påverkar priset för en privat hjärtutredning?",
          answer:
            "Om det är nybesök eller återbesök, och vilka undersökningar som ingår – EKG, ultraljud av hjärtat, långtids-EKG eller arbetsprov. Sjukvårdsförsäkring kan ibland täcka delar av kostnaden. Vi anger inga fasta belopp; be alltid mottagningen om ett samlat pris i förväg. Se [privat kardiolog: kostnad](/artiklar/privat-kardiolog-kostnad).",
        },
        {
          question: "Vilka hjärtundersökningar kan bli aktuella?",
          answer:
            "Vanligast är EKG, långtids-EKG (Holter), ultraljud av hjärtat och arbetsprov, samt dygnsblodtrycksmätning vid blodtrycksfrågeställning. Vilka som blir aktuella avgör läkaren utifrån dina symtom och din sjukdomshistoria – allt görs inte rutinmässigt.",
        },
        {
          question: "Hur snabbt kan jag få en tid i Göteborg?",
          answer:
            "Privata tider kan ofta erbjudas snabbare än regionfinansierad vård, och som storstad har Göteborg flera vårdgivare att jämföra. Exakt väntetid varierar mellan mottagningar och beror på efterfrågan – vi kan inte garantera en viss tid, men hjälper dig att hitta en mottagning.",
        },
        {
          question: "När ska jag söka akut i stället för att boka kardiolog?",
          answer:
            "Ring 112 vid bröstsmärta som inte går över, svår andnöd, svimning eller misstanke om hjärtinfarkt eller stroke. En bokad tid hos kardiolog är till för utredning av besvär som inte är akuta; är du osäker kan du ringa 1177.",
        },
      ],
    },
  },
};
