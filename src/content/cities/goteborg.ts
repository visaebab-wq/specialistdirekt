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
    allmanmedicin:
      "Som Sveriges näst största stad har Göteborg ett brett utbud av privata läkarmottagningar där du kan få en bred medicinsk bedömning. En specialist i allmänmedicin kan hjälpa dig när symtomen är oklara eller berör flera områden, och vägleda dig rätt vidare. Specialistdirekt hjälper dig kostnadsfritt att hitta en mottagning i Göteborg.",
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
    allmanmedicin: {
      metaTitle: "Privat allmänläkare i Göteborg – bred bedömning utan remiss",
      metaDescription:
        "Privat allmänläkare i Göteborg: bred medicinsk bedömning vid oklara symtom, prover, remiss och vad som påverkar priset. Kostnadsfri förmedling.",
      sections: [
        {
          id: "privat-allmanlakare-goteborg",
          heading: "Privat allmänläkare i Göteborg – när bredden är rätt väg",
          body: [
            "I Göteborg finns ett brett utbud av privata läkarmottagningar vid sidan av regionens vårdcentraler och sjukhusen **Sahlgrenska**, **Östra** och **Mölndal**. Specialistdirekt är fristående – vi är inte vårdgivare och har ingen koppling till Västra Götalandsregionen.",
            "En **specialist i allmänmedicin** har bredden som specialitet: att väga samman symtom, sjukhistoria, läkemedel och prover till en helhetsbild. Det är särskilt användbart när det är oklart vad besvären beror på, eller när de berör flera områden samtidigt. Vet du redan vilket organ det gäller kan en organspecialist vara mer effektiv – se vår [översikt om allmänmedicin](/specialiteter/allmanmedicin).",
          ],
        },
        {
          id: "nar-allmanlakare-goteborg",
          heading: "Vanliga skäl att söka en bred bedömning",
          body: [
            "Vilka prover och undersökningar som blir aktuella avgör läkaren utifrån dina symtom. Vanliga anledningar att söka är:",
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
          id: "remiss-och-pris-allmanmedicin-goteborg",
          heading: "Remiss, pris och förhållandet till din vårdcentral",
          body: [
            "Som självbetalande kan du oftast boka en privat allmänläkare direkt, utan remiss. Har du en sjukvårdsförsäkring går du normalt via försäkringsbolaget. Vad som gäller varierar mellan mottagningar – se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
            "Priset beror på besökets längd och vilka prover som ingår; provtagning och analys prissätts ofta separat. Vi anger inga fasta belopp – be alltid om ett samlat pris i förväg. Kom också ihåg att ett privat besök **inte ersätter din vårdcentral**, som har din journal och ansvarar för kontinuiteten över tid. Se det som ett komplement eller en snabbare väg till en bedömning.",
          ],
        },
        {
          id: "nar-akut-allmanmedicin-goteborg",
          heading: "När du ska söka akut i stället",
          body: [
            "En planerad läkartid är till för besvär som inte är akuta. Ring **112** vid akuta eller livshotande symtom – till exempel bröstsmärta som inte går över, kraftig andnöd, plötslig svaghet, sluddrigt tal eller kraftigt påverkat allmäntillstånd.",
            "Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina besvär är. Är du osäker når du **1177** dygnet runt för sjukvårdsrådgivning.",
          ],
        },
      ],
      faqs: [
        {
          question: "Behöver jag remiss till en privat allmänläkare i Göteborg?",
          answer:
            "Som självbetalande kan du oftast boka direkt, utan remiss. Har du en sjukvårdsförsäkring går du normalt via försäkringsbolaget. Reglerna varierar mellan mottagningar – vi hjälper dig kostnadsfritt att reda ut vägen in.",
        },
        {
          question: "Vad är skillnaden mot att gå till en organspecialist?",
          answer:
            "Vet du redan vilket område besvären hör till – till exempel hjärtat – kan det vara mest effektivt att gå direkt till rätt specialist. Är bilden oklar, eller berör flera områden, är en bred bedömning ofta ett bättre första steg.",
        },
        {
          question: "Ersätter det min vårdcentral?",
          answer:
            "Nej. Din vårdcentral har din journal och ansvarar för kontinuiteten över tid, inklusive uppföljning och recept. En privat allmänläkare är ett komplement eller en snabbare väg till en bedömning – inte en ersättning.",
        },
        {
          question: "Vad påverkar priset?",
          answer:
            "Besökets längd och vilka prover som ingår. Provtagning och analys prissätts ofta separat. Vi anger inga fasta belopp – be alltid mottagningen om ett samlat pris i förväg.",
        },
        {
          question: "När ska jag söka akut i stället för att boka tid?",
          answer:
            "Ring 112 vid akuta eller livshotande symtom, till exempel bröstsmärta som inte går över, kraftig andnöd, plötslig svaghet eller sluddrigt tal. En bokad tid är till för besvär som inte är akuta; är du osäker kan du ringa 1177.",
        },
      ],
    },
    neurolog: {
      metaTitle: "Privat neurolog i Göteborg – utredning, remiss och pris",
      metaDescription:
        "Privat neurolog i Göteborg: migrän, yrsel och domningar, neurologiskt status, MR, remiss och vad som påverkar priset. Kostnadsfri förmedling.",
      sections: [
        {
          id: "privat-neurolog-goteborg",
          heading: "Privat neurolog i Göteborg – vägen in vid nervbesvär",
          body: [
            "Göteborg har ett av landets tyngsta neurologiska nav vid **Sahlgrenska Universitetssjukhuset**, med ytterligare vård vid **Östra sjukhuset** och **Mölndals sjukhus**. Vid sidan av regionens vård finns privata neurologmottagningar i staden. Specialistdirekt är fristående – vi är inte vårdgivare och har ingen koppling till Sahlgrenska eller Västra Götalandsregionen.",
            "En **neurolog** utreder sjukdomar och symtom som utgår från hjärna, ryggmärg och nerver. Grunden i bedömningen är samtalet om dina symtom och ett **neurologiskt status**, där läkaren undersöker reflexer, känsel, styrka, koordination och balans. Som storstad gör Göteborg det ofta möjligt att jämföra flera vårdgivare innan du bestämmer dig. Läs mer på vår [översikt om neurolog](/specialiteter/neurolog).",
          ],
        },
        {
          id: "vanliga-besvar-neurolog-goteborg",
          heading: "Vanliga skäl att söka neurolog",
          body: [
            "Vilka undersökningar som blir aktuella avgör läkaren utifrån dina symtom – allt görs inte rutinmässigt. Vanliga anledningar att söka är:",
          ],
          bullets: [
            "**Migrän och återkommande svår huvudvärk** – en av de vanligaste orsakerna (allmän information, ingen behandlingsrekommendation här).",
            "**Yrsel och balansbesvär** – se även [yrsel – vilken läkare?](/artiklar/yrsel-vilken-lakare).",
            "**Domningar och stickningar** – se [domningar i händer och fötter](/artiklar/domningar-hander-fotter-vilken-lakare).",
            "**Kompletterande undersökningar** – MR av hjärnan, EEG eller nervmätning (ENeG/EMG) när den kliniska bedömningen behöver stöd.",
          ],
        },
        {
          id: "remiss-och-pris-neurolog-goteborg",
          heading: "Remiss och vad som påverkar priset",
          body: [
            "Behöver du remiss? Inom regionfinansierad vård i Västra Götalandsregionen krävs oftast en remiss från vårdcentralen, medan du hos många privata mottagningar kan boka mer direkt eller via egen vårdbegäran. Vad som gäller beror på mottagning och finansiering – se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
            "Priset beror på om det är ett nybesök eller en uppföljning och vilka undersökningar som tillkommer, till exempel MR. Vi anger inga fasta belopp eftersom de skiljer sig mellan mottagningar – be alltid om ett pris i förväg och kontrollera om en eventuell sjukvårdsförsäkring täcker delar av kostnaden. Hur en utredning kan läggas upp beskriver vi i [privat neurolog: utredning](/artiklar/privat-neurolog-utredning).",
          ],
        },
        {
          id: "nar-akut-neurolog-goteborg",
          heading: "När neurologiska symtom är akuta",
          body: [
            "Vissa symtom ska aldrig vänta på en planerad tid. Ring **112** vid plötslig svaghet eller domning i ansikte, arm eller ben, hängande mungipa, sluddrigt tal, akut synbortfall eller en plötslig och mycket kraftig huvudvärk – det kan vara tecken på stroke, där varje minut räknas.",
            "En planerad neurologtid är till för besvär som inte är akut livshotande. Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina symtom är. Vid akuta symtom söker du alltid akut vård; för rådgivning dygnet runt når du **1177**.",
          ],
        },
      ],
      faqs: [
        {
          question: "Behöver jag remiss till en privat neurolog i Göteborg?",
          answer:
            "Inom regionvården i Västra Götalandsregionen krävs oftast en remiss från vårdcentralen, medan många privata mottagningar tar emot egen vårdbegäran. Vad som gäller beror på mottagning och finansiering – vi hjälper dig kostnadsfritt att hitta rätt väg in. Se även [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
        },
        {
          question: "Vilka undersökningar kan bli aktuella hos en neurolog?",
          answer:
            "Bedömningen utgår från samtal och ett neurologiskt status. Vid behov kompletteras det med MR av hjärnan, EEG eller nervmätning (ENeG/EMG). Vilka undersökningar som blir aktuella avgör neurologen utifrån dina symtom – allt beställs inte rutinmässigt.",
        },
        {
          question: "Kan en neurolog i Göteborg hjälpa vid migrän?",
          answer:
            "Ja, återkommande migrän och svår huvudvärk är bland de vanligaste anledningarna att söka neurolog. Neurologen kan utreda vad som ligger bakom och lägga upp en plan tillsammans med dig. Sidan ger allmän information och ingen behandlingsrekommendation.",
        },
        {
          question: "Vad påverkar priset för en privat neurologutredning?",
          answer:
            "Om det är nybesök eller uppföljning, och vilka undersökningar som tillkommer – till exempel MR. Sjukvårdsförsäkring kan ibland täcka delar av kostnaden. Vi anger inga fasta belopp; be alltid mottagningen om ett pris i förväg.",
        },
        {
          question: "När ska jag söka akut i stället för att boka neurolog?",
          answer:
            "Ring 112 vid plötslig svaghet eller domning i ansikte, arm eller ben, sluddrigt tal, akut synbortfall eller en plötslig, mycket svår huvudvärk – det kan vara tecken på stroke. En bokad neurologtid är till för besvär som inte är akuta; är du osäker kan du ringa 1177.",
        },
      ],
    },
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
