import type { Article } from "@/lib/articles-types";

// Medicinsk granskare: ingen fabricerad läkare anges. Artikelns author/publisher
// är organisationen (se articleSchema). Ett granskarfält renderas endast när
// verklig granskardata finns.
// TODO: populate when medical reviewer is onboarded

// Symtomartikel (informativ, YMYL). Ingen relatedSpecialty sätts medvetet,
// så att artikelmallens tidiga specialitets-CTA inte renderas före
// röda-flaggor-sektionen. Interna länkar sker i brödtexten i stället.
export const article: Article = {
  slug: "uppblast-mage",
  title: "Uppblåst mage: vanliga orsaker och vad du kan göra",
  metaTitle: "Uppblåst mage – orsaker, tips och när du bör söka vård",
  metaDescription:
    "Uppblåst mage efter mat eller hela tiden? Läs om vanliga orsaker, vad du kan göra själv och när besvären bör utredas av läkare.",
  category: "Mage och tarm",
  primaryKeyword: "uppblåst mage",
  keywords: [
    "uppblåst mage",
    "uppblåst mage efter mat",
    "uppblåst mage hela tiden",
    "gasig och uppblåst mage",
    "gaser och uppblåst mage",
    "uppsvälld mage",
    "uppblåst mage och ont",
  ],
  excerpt:
    "Uppblåst mage är vanligt och beror ofta på gas, mat eller tarmfunktion. Här är orsakerna, vad du kan göra själv – och när besvären bör utredas.",
  published: "2026-07-13",
  updated: "2026-07-13",
  readMinutes: 9,
  wordCount: 1850,
  summary: [
    "Uppblåsthet är mycket vanligt och beror oftast på gas, kost eller tarmfunktion – inte på något farligt.",
    "Besvär efter mat hänger ofta ihop med måltidsstorlek, äthastighet, kolsyra och vissa kolhydrater.",
    "Nytillkomna, ihållande besvär bör bedömas – särskilt om du är över 50 år eller har varningssymtom.",
    "Blod i avföringen, svart avföring, viktnedgång, sväljningssvårigheter eller blodbrist ska alltid utredas.",
  ],
  intro: [
    "Att känna sig uppblåst i magen är ett av de allra vanligaste magbesvären, och nästan alla drabbas då och då. Oftast hänger det ihop med gas, mat, tarmfunktion eller funktionella magtarmbesvär – och är i sig inget farligt.",
    "Samtidigt bör en uppblåst mage som är nytillkommen, ihållande eller förekommer tillsammans med varningssymtom bedömas medicinskt. I den här guiden går vi igenom de vanligaste orsakerna, vad du kan göra själv och när det är dags att söka vård.",
  ],
  sections: [
    {
      id: "vanliga-orsaker",
      heading: "Vanliga orsaker till uppblåst mage",
      body: [
        "Uppblåsthet kan ha många orsaker, och ofta samverkar flera samtidigt. Det behöver inte betyda att något är fel – magen är helt enkelt känslig för hur, vad och hur mycket vi äter. Det är inte heller så att varje uppblåst mage har en kostrelaterad orsak; stress, tarmfunktion och individuell känslighet spelar också in.",
        "Bland de vanligaste bidragande faktorerna finns:",
      ],
      bullets: [
        "**Gasbildning** i tarmen när bakterier bryter ner viss mat",
        "**Sväljd luft** – till exempel vid snabb måltid eller tuggummi",
        "**Stora måltider** som tänjer ut magen",
        "**Förstoppning** som gör att tarminnehållet blir kvar längre",
        "**IBS** (känslig tarm) med uppblåsthet som återkommande symtom",
        "**Laktosintolerans** och andra svårsmälta kolhydrater",
        "**Celiaki** – en autoimmun reaktion på gluten (skiljer sig från vanlig glutenkänslighet)",
        "**Funktionell dyspepsi** – känslig magsäck utan påvisbar sjukdom",
        "**Stress** som påverkar tarmens rörelser",
        "**Hormonella faktorer**, exempelvis under menscykeln",
        "**Individuella kostutlösare** som varierar från person till person",
      ],
    },
    {
      id: "uppblast-mage-efter-mat",
      heading: "Uppblåst mage efter mat",
      body: [
        "Att bli uppblåst efter att ha ätit är extra vanligt, och det finns flera förklaringar. **Måltidens storlek** har stor betydelse – en stor portion tänjer ut magsäcken och kan ge en känsla av spänning. **Äter du snabbt** sväljer du samtidigt mer luft, vilket ökar uppblåstheten.",
        "**Kolsyrade drycker** tillför gas direkt, och vissa **jäsbara kolhydrater** (som finns i till exempel lök, bönor, vissa frukter och sötningsmedel) bryts ner av tarmbakterier och bildar gas. **Laktos** kan ge besvär hos den som har svårt att bryta ner mjölksocker, och **feta måltider** gör att magsäcken töms långsammare, vilket kan förstärka känslan av att vara uppblåst.",
        "Ibland är besvären en del av **funktionell dyspepsi**, där magsäcken reagerar mer känsligt än vanligt på mat. Hur mycket olika livsmedel påverkar skiljer sig kraftigt mellan individer. Ett bra sätt att förstå dina egna mönster är att föra en **symtomdagbok** där du noterar vad du ätit och hur magen reagerar – då blir det lättare att se vilka måltider och livsmedel som återkommer vid besvär.",
      ],
    },
    {
      id: "standigt-uppblast",
      heading: "Ständigt uppblåst mage – när magen aldrig känns bra",
      body: [
        "Ibland handlar det inte om enstaka tillfällen efter maten, utan om att magen känns uppblåst **hela tiden**. En uppblåst mage hela tiden, med dagliga besvär som avviker från hur din mage brukar kännas, är värd att ta på allvar – inte för att det oftast är farligt, utan för att ihållande symtom förtjänar en förklaring.",
        "Fundera på om besvären hänger ihop med dina **avföringsvanor**: växlar det mellan diarré och förstoppning, eller lättar uppblåstheten efter toalettbesök? Sådana mönster kan tala för IBS. Om besvären är en tydlig och ihållande förändring från ditt normala, eller inte förbättras trots att du provat enkla justeringar, bör de bedömas av vården.",
      ],
    },
    {
      id: "gasig-uppblast",
      heading: "Gasig och uppblåst mage",
      body: [
        "En **gasig och uppblåst mage** är en av de vanligaste kombinationerna. Att bilda gas är helt normalt – den kommer dels från luft vi sväljer, dels från när tarmbakterier bryter ner mat. De flesta släpper gaser många gånger per dygn utan att det är något onormalt.",
        "Besvär med **gaser och uppblåst mage** – där magen känns spänd och **uppsvälld** – uppstår ofta när gasproduktionen ökar eller när tarmen är extra känslig för normal mängd gas. Att äta lugnare, minska kolsyrade drycker och se över särskilt gasbildande livsmedel kan hjälpa. Fysisk aktivitet får också tarmen att arbeta, vilket kan lindra.",
      ],
    },
    {
      id: "uppblast-och-ont",
      heading: "Uppblåst mage och ont",
      body: [
        "Lätt spänning och obehag hör ofta ihop med uppblåsthet och är sällan tecken på något allvarligt. Men det finns en skillnad mellan att känna sig **uppblåst med ett visst tryck** och att ha en **påtaglig eller tilltagande smärta**.",
        "Den här sidan ställer ingen diagnos. Är smärtan kraftig, kommer plötsligt, förvärras snabbt eller följs av varningssymtom som feber, kräkningar eller blod i avföringen bör du söka vård – se avsnittet om röda flaggor längre ner.",
      ],
    },
    {
      id: "vad-kan-du-gora",
      heading: "Vad kan du göra själv?",
      body: [
        "Vid ofarlig uppblåsthet finns en del du kan prova på egen hand. Tänk på att göra **en förändring i taget** – annars blir det svårt att veta vad som faktiskt hjälpte.",
      ],
      bullets: [
        "Ät långsammare och tugga maten ordentligt",
        "Minska kolsyrade drycker",
        "Minska tuggummi om det får dig att svälja mer luft",
        "Ät regelbundna måltider i stället för få och stora",
        "Rör på dig regelbundet – fysisk aktivitet hjälper tarmen",
        "Motverka förstoppning, till exempel med vätska, fibrer och rörelse",
        "Observera dina individuella kostutlösare",
        "För en symtomdagbok över mat och besvär",
        "Ta upp ihållande besvär med vårdpersonal",
      ],
      // Ingen sträng eller långvarig lågFODMAP-kost utan professionellt stöd,
      // och inga varumärkes- eller kosttillskottsrekommendationer.
    },
    {
      id: "sok-vard",
      heading: "När bör du söka vård?",
      body: [
        "De flesta som är uppblåsta behöver inte söka vård. Men vissa symtom är **varningstecken** som bör bedömas, ibland skyndsamt. Nytillkomna och ihållande besvär bör bedömas, särskilt om du är över 50 år eller samtidigt har andra varningssymtom.",
      ],
      bullets: [
        "Blod i avföringen",
        "Svart eller tjärliknande avföring",
        "Ofrivillig viktnedgång",
        "Sväljningssvårigheter",
        "Upprepade kräkningar",
        "Feber",
        "Blodbrist eller järnbrist",
        "Symtom som väcker dig på natten",
        "Ihållande, nytillkomna symtom",
        "Nytillkomna ihållande besvär, särskilt efter 50 års ålder",
        "Kraftig eller snabbt förvärrad smärta",
        "Akut och snabb försämring",
      ],
    },
    {
      id: "var-du-soker",
      heading: "Var söker du vård – akut, 1177 eller vårdcentral?",
      body: [
        "Vid **akut fara** – till exempel kraftig smärta, blodiga kräkningar eller svart avföring – ring **112** eller sök akutmottagning. Är du **osäker** och besvären inte är akuta kan du ringa **1177** för sjukvårdsrådgivning dygnet runt.",
        "Vid **ihållande men icke-akuta** symtom börjar du oftast på en **vårdcentral** eller hos en relevant läkare, som gör en första bedömning och vid behov remitterar vidare.",
      ],
    },
    {
      id: "undersokningar",
      heading: "Vilka undersökningar kan bli aktuella?",
      body: [
        "Vilka undersökningar som blir aktuella beror på dina symtom och läkarens bedömning – allt görs inte rutinmässigt. Vanliga steg är:",
      ],
      bullets: [
        "Sjukhistoria (anamnes) och kroppsundersökning",
        "Blodprover",
        "Avföringsprover",
        "Celiakiprov vid misstanke",
        "Kalprotektin i avföring när det är medicinskt motiverat",
        "[Gastroskopi](/privat-gastroskopi) vid besvär från övre magtarmkanalen",
        "[Koloskopi](/privat-koloskopi) vid besvär från tjocktarmen",
        "Andra undersökningar beroende på fynd",
      ],
    },
    {
      id: "nar-gastroenterolog",
      heading: "När kan en gastroenterolog hjälpa?",
      body: [
        "Om besvären är långvariga, återkommande eller svårtolkade kan en bedömning hos en specialist vara till hjälp. En **gastroenterolog** utreder mage, tarm och matsmältning, kan bekräfta eller utesluta diagnoser som IBS och celiaki och lägga upp en plan tillsammans med dig.",
        "Vill du veta mer om specialisten, priser och hur du kommer i kontakt utan remiss? Läs vidare på vår sida om [privat gastroenterolog](/privat-gastroenterolog).",
      ],
    },
    {
      id: "kallor",
      heading: "Källor",
      body: [
        "Innehållet bygger på allmän, publikt tillgänglig medicinsk information. För fördjupning och aktuella råd, se:",
      ],
      bullets: [
        "[1177 – Mage och tarm](https://www.1177.se/sjukdomar--besvar/mage-och-tarm/)",
        "[Internetmedicin – Colon irritabile, IBS (Irritable Bowel Syndrome)](https://www.internetmedicin.se/medicinsk-gastroenterologi-och-hepatologi/colon-irritabile-ibs-irritable-bowel-syndrome)",
        "[Livsmedelsverket – Matvanor, hälsa och miljö](https://www.livsmedelsverket.se/matvanor-halsa--miljo)",
      ],
    },
  ],
  faqs: [
    {
      question: "Varför blir magen uppblåst efter mat?",
      answer:
        "Det beror ofta på måltidens storlek, hur snabbt du äter, kolsyrade drycker och vissa jäsbara kolhydrater som bildar gas i tarmen. Laktos och feta måltider kan också bidra. Hur mycket olika livsmedel påverkar är individuellt – en symtomdagbok hjälper dig att hitta dina egna mönster.",
    },
    {
      question: "Är det farligt att vara uppblåst i magen varje dag?",
      answer:
        "Oftast inte – daglig uppblåsthet beror vanligen på kost, gas eller tarmfunktion. Men om det är en nytillkommen och ihållande förändring, eller förekommer tillsammans med varningssymtom som blod i avföringen, viktnedgång eller sväljningssvårigheter, bör besvären bedömas av vården.",
    },
    {
      question: "Vad hjälper snabbt mot uppblåst mage?",
      answer:
        "Att äta långsammare, minska kolsyrade drycker, röra på sig och motverka förstoppning kan lindra. Apotek kan erbjuda receptfria produkter, men valet bör bero på dina symtom och din hälsa i övrigt. Prova en förändring i taget så att du märker vad som fungerar för just dig.",
    },
    {
      question: "Kan stress göra magen uppblåst?",
      answer:
        "Ja. Stress kan påverka tarmens rörelser och hur känslig magen är, vilket kan bidra till uppblåsthet. Många märker att besvären växlar med hur de mår i övrigt. Regelbundna vanor, rörelse och återhämtning kan därför göra skillnad.",
    },
    {
      question: "När bör en uppblåst mage utredas av läkare?",
      answer:
        "När besvären är nytillkomna och ihållande, särskilt om du är över 50 år eller samtidigt har varningssymtom som blod i avföringen, svart avföring, ofrivillig viktnedgång, sväljningssvårigheter, upprepade kräkningar eller blodbrist. Vid akuta besvär, ring 112; är du osäker, ring 1177.",
    },
  ],
};
