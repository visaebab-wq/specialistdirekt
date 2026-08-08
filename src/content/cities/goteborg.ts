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
    gastroenterolog:
      "Vid långvariga mag- och tarmbesvär finns i Göteborg både regionens vård via Sahlgrenska och privata mag- och tarmmottagningar. Som storstad kan du ofta jämföra flera vårdgivare innan du bestämmer dig. Specialistdirekt hjälper dig kostnadsfritt att hitta en gastroenterolog.",
    allmanmedicin:
      "Som Sveriges näst största stad har Göteborg ett brett utbud av privata läkarmottagningar där du kan få en bred medicinsk bedömning. En specialist i allmänmedicin kan hjälpa dig när symtomen är oklara eller berör flera områden, och vägleda dig rätt vidare. Specialistdirekt hjälper dig kostnadsfritt att hitta en mottagning i Göteborg.",
    kardiolog:
      "Genom Specialistdirekt kan du skicka en tidsförfrågan till ansluten privat kardiologisk specialistkompetens i Göteborg. Den anslutna mottagningen erbjuder kardiologbesök samt EKG, hjärtultraljud, arbets-EKG, långtids-EKG och 24-timmars blodtrycksmätning. Du kan söka som självbetalande patient, och mottagningen kan även ta emot försäkringspatienter efter godkännande från försäkringsbolaget. Priset beror på vilken konsultation eller undersökning som bokas och lämnas innan du bestämmer dig. Specialistdirekt är en förmedlingstjänst och inte vårdgivare – undersökningar, medicinsk bedömning och behandling utförs av den mottagning som tar emot dig.",
    ortoped:
      "Söker du en privat ortoped? Här kan du boka tid hos Dr. Masoud Sorkhabi, specialistläkare i ortopedi med mer än 20 års klinisk erfarenhet – för bland annat rygg-, nack- och knäbesvär samt diskrelaterad, nervrelaterad och långvarig smärta från rörelseapparaten. Besöket kan vara fysiskt i Göteborg (2 000 kr) eller ett digitalt videobesök från hela Sverige (1 000 kr). Du bokar tid direkt i kalendern och betalar i samband med bokningen – beloppet återbetalas om du avbokar.",
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
    ortoped: {
      metaTitle: "Privat ortoped Göteborg – boka direkt utan remiss",
      metaDescription:
        "Boka privat ortoped i Göteborg hos Dr. Masoud Sorkhabi – rygg, nacke, knä. Fysiskt besök 2 000 kr eller digitalt 1 000 kr, utan remiss. Betala vid bokning, återbetalning vid avbokning.",
      h1: "Privat ortoped i Göteborg",
      hideCityIntro: true,
      altLanguage: {
        href: "/en/private-orthopedist-gothenburg",
        label: "In English: Private orthopedist in Gothenburg",
      },
      bookingCta: {
        label: "Boka tid hos Dr. Masoud Sorkhabi",
        url: "/boka/ortoped-goteborg",
        note: "Öppnar bokningskalendern i en ny flik. Du betalar i samband med bokningen – beloppet återbetalas om du avbokar.",
      },
      quickFacts: [
        { label: "Läkare", value: "Dr. Masoud Sorkhabi, specialist i ortopedi" },
        { label: "Besök", value: "Fysiskt i Göteborg eller digitalt i hela Sverige" },
        { label: "Pris", value: "Fysiskt 2 000 kr · digitalt videobesök 1 000 kr" },
        { label: "Specialitet", value: "Ortopedi" },
        { label: "Erfarenhet", value: "Mer än 20 års klinisk erfarenhet" },
        { label: "Kompetensområden", value: "Rygg, nacke, knä och nervrelaterade besvär" },
        { label: "Patienttyp", value: "Självbetalande" },
        { label: "Remiss", value: "Behövs inte" },
        { label: "Publikt omdöme", value: "4,9 av 5 · 63 omdömen på Reco (Dr. Masoud Sorkhabi)" },
        { label: "Betalning", value: "Betala vid bokning – återbetalas om du avbokar" },
        { label: "Roll", value: "Specialistdirekt är förmedlingstjänst – inte vårdgivare" },
      ],
      redFlag: {
        heading: "När ska du söka akut vård i stället?",
        body: "Specialistdirekt är inte en akuttjänst och bedömer inte hur brådskande dina besvär är. Sök vård direkt – ring **112** vid livshotande tillstånd – vid till exempel:",
        bullets: [
          "misstänkt fraktur eller kraftigt våld mot huvud, nacke eller rygg",
          "plötslig svår ryggsmärta med domningar kring underlivet, svårt att kissa eller förlorad kontroll över urin eller avföring",
          "plötslig eller snabbt tilltagande kraftnedsättning eller domning i arm eller ben",
          "en arm eller ett ben som blir kallt, blekt eller känsellöst efter en skada",
          "rygg- eller ledsmärta tillsammans med hög feber och kraftig allmänpåverkan",
        ],
        footnote:
          "Ring **112** vid livshotande tillstånd. Är du osäker kan du ringa **1177** för sjukvårdsrådgivning dygnet runt.",
      },
      sections: [
        {
          id: "om-lakaren-goteborg",
          heading: "Om Dr. Masoud Sorkhabi – ortoped i Göteborg",
          body: [
            "Hos Specialistdirekt kan du boka tid hos **Dr. Masoud Sorkhabi**, specialistläkare i ortopedi i Göteborg med **mer än 20 års klinisk erfarenhet**. Inriktningen omfattar bland annat rygg-, nack- och knäbesvär samt diskrelaterad, nervrelaterad och långvarig smärta från rörelseapparaten.",
            "Du **bokar tid direkt i kalendern** och betalar i samband med bokningen – beloppet återbetalas om du avbokar. Den medicinska bedömningen och behandlingen utförs av Dr. Masoud Sorkhabi; Specialistdirekt förmedlar kontakten och är inte vårdgivare. Läs mer om [Dr. Masoud Sorkhabi](/lakare/masoud-sorkhabi).",
          ],
        },
        {
          id: "kompetens-ortoped-goteborg",
          heading: "Vilka besvär kan vara aktuella för ortopedisk bedömning?",
          body: [
            "Dr. Masoud Sorkhabi är i Göteborg särskilt inriktad på besvär från **rygg, nacke och knä** samt diskrelaterad, nervrelaterad och långvarig smärta från rörelseapparaten. Nedan ser du exempel på när en ortopedisk bedömning kan vara relevant – det är just exempel, inte ett löfte om att varje tillstånd kan tas emot eller behandlas.",
          ],
          bullets: [
            "**Ryggbesvär** – långvarig eller återkommande smärta i ländrygg eller bröstrygg",
            "**Nackbesvär** – smärta och stelhet i nacken, ibland med utstrålning mot arm",
            "**Knäbesvär** – smärta, svullnad, låsningar eller instabilitet i knät",
            "**Diskrelaterade besvär** – misstänkt diskbråck eller diskrelaterad nervpåverkan",
            "**Nervrelaterad smärta** – utstrålande smärta, domningar eller stickningar",
            "**SI-ledsbesvär** – smärta från bäckenets iliosakralleder",
            "**Idrotts- och överbelastningsbesvär** – besvär efter träning eller belastning",
            "**Långvarig smärta från rörelseapparaten** – besvär som inte gått över trots tid och egenvård",
          ],
        },
        {
          id: "rygg-nacke-knä-nerv-goteborg",
          heading: "Rygg, nacke, knä och nervrelaterad smärta – lite mer om vanliga besvär",
          body: [
            "**Rygg- och nackbesvär.** Många rygg- och nackbesvär är godartade och läker med tid, rörelse och avlastning. När smärtan är långvarig, återkommande eller tydligt påverkar vardagen kan en ortoped bedöma dina aktuella besvär och vad som är rimliga nästa steg.",
            "**Knä- och belastningsbesvär.** Knät är särskilt utsatt vid idrott och belastning. Besvär som låser sig, sviktar eller inte förbättras trots träning kan behöva bedömas av en läkare. Osäker på vart du ska vända dig? Se [vilken läkare vid knäsmärta](/artiklar/vilken-lakare-knasmarta).",
            "**Nervrelaterad eller utstrålande smärta.** Smärta som strålar ut i arm eller ben, ibland med domningar eller stickningar, kan höra ihop med nerver i rygg eller nacke. Det är en vanlig anledning att söka ortopedisk bedömning – läs mer om [ortopedisk smärtbehandling i Göteborg](/smartbehandling/goteborg).",
          ],
        },
        {
          id: "hogst-betygsatta-ortoped-goteborg",
          heading: "Högst betygsatta ortopeder i Göteborg – så jämför du rätt",
          body: [
            "Den som söker efter de högst betygsatta ortopederna i Göteborg bör väga in mer än bara snittbetyget. Titta också på hur aktuella omdömena är, vilken kompetens och erfarenhet läkaren har, och om mottagningen arbetar med just de besvär du söker hjälp för.",
            "Dr. Masoud Sorkhabi har fått mycket starka patientomdömen – **4,9 av 5** baserat på 63 publicerade omdömen på Reco. Betyget gäller läkaren som genomför besöket och inte Specialistdirekt. Omdömen kan vara en relevant förtroendesignal, men är ingen garanti för ett visst medicinskt resultat.",
            "När du jämför ortopeder – i Göteborg eller någon annanstans – är det värt att väga in flera saker samtidigt:",
          ],
          bullets: [
            "**Betyg och hur aktuellt det är** – ett högt snitt säger mer om det bygger på färska omdömen.",
            "**Specialistkompetens och erfarenhet** – att läkaren är specialist i ortopedi och har erfarenhet av dina typer av besvär.",
            "**Relevans för dina symtom** – att mottagningen faktiskt arbetar med det du söker hjälp för.",
            "**Transparent pris** – att du får veta vad besöket kostar innan du bokar.",
            "**Tydlig ansvarsfördelning** – vem som är vårdgivare och bär det medicinska ansvaret.",
          ],
        },
        {
          id: "nar-ortoped-ratt-goteborg",
          heading: "När är en ortoped rätt – och när passar annan vård bättre?",
          body: [
            "En ortoped är inte alltid det första steget. Vid många muskel- och ledbesvär är vårdcentral eller fysioterapeut en bra början, medan andra situationer talar för en läkarbedömning. Listan nedan är en förenklad vägledning – den ställer ingen diagnos och avgör inte ditt enskilda fall.",
          ],
          bullets: [
            "**Gradvis muskelvärk utan tydlig skada** → ofta fysioterapeut eller vårdcentral först.",
            "**Låsning, instabilitet eller misstänkt ledskada** → läkarbedömning, ibland ortoped.",
            "**Långvariga besvär trots rekommenderad behandling** → läkarbedömning eller ortoped.",
            "**Domningar, utstrålande smärta eller kraftnedsättning** → läkarbedömning.",
            "**Misstänkt fraktur eller akut svår skada** → akutmottagning eller jourvård.",
            "**Feber tillsammans med en snabbt svullen och mycket smärtsam led** → sök vård skyndsamt.",
          ],
        },
        {
          id: "utan-remiss-ortoped-goteborg",
          heading: "Kan jag söka privat ortoped i Göteborg utan remiss?",
          body: [
            "Ja. Som självbetalande patient behöver du ingen remiss för att boka tid hos Dr. Masoud Sorkhabi i Göteborg.",
            "Några saker är bra att känna till: detta gäller den **privata självbetalar-vägen**. Regionfinansierad vård i Västra Götalandsregionen kan ha andra krav, och vill du använda en privat sjukvårdsförsäkring behöver försäkringsbolaget oftast godkänna besöket först. Du bokar tid direkt i kalendern och betalar i samband med bokningen; om du avbokar återbetalas beloppet. Läs mer i [ortoped utan remiss](/artiklar/ortoped-utan-remiss).",
          ],
        },
        {
          id: "pris-ortoped-goteborg",
          heading: "Pris",
          body: [
            "Priserna hos Dr. Masoud Sorkhabi är fasta och du ser dem innan du bokar:",
          ],
          bullets: [
            "**Fysiskt besök i Göteborg – 2 000 kr**",
            "**Digitalt videobesök – 1 000 kr**, kan bokas från hela Sverige",
          ],
        },
        {
          id: "digitalt-besok-ortoped",
          heading: "Digitalt ortopedbesök – från hela Sverige",
          body: [
            "Bor du inte i Göteborg? Dr. Masoud Sorkhabi tar även emot **digitala videobesök** för patienter i hela Sverige, för 1 000 kr. Ett digitalt besök passar bra för en första bedömning av dina besvär, genomgång av tidigare undersökningar och råd om nästa steg.",
            "Vissa besvär behöver undersökas på plats – då kan läkaren rekommendera ett fysiskt besök i Göteborg. En generell guide om vad privat ortopedi kan kosta finns i [privat ortoped: kostnad](/artiklar/privat-ortoped-kostnad).",
          ],
        },
        {
          id: "sa-bokar-du-tid-ortoped-goteborg",
          heading: "Så bokar du tid hos Dr. Masoud Sorkhabi",
          body: [
            "Vägen till besök är enkel och du har kontroll i varje steg:",
          ],
          bullets: [
            "Välj **fysiskt besök i Göteborg (2 000 kr)** eller **digitalt videobesök (1 000 kr)** i bokningskalendern.",
            "Välj en tid som passar dig.",
            "Du betalar i samband med bokningen.",
            "Behöver du avboka återbetalas beloppet.",
            "Den medicinska bedömningen och behandlingen utförs av Dr. Masoud Sorkhabi; Specialistdirekt är inte vårdgivare.",
          ],
        },
        {
          id: "forbered-ortopedbesok-goteborg",
          heading: "Vad är bra att förbereda inför ett ortopedbesök?",
          body: [
            "Ju tydligare bild du kan ge, desto lättare blir bedömningen. Bra att ha med dig:",
          ],
          bullets: [
            "när besvären började och hur de har utvecklats",
            "var smärtan eller funktionsnedsättningen sitter",
            "hur besvären påverkar rörelse, sömn och vardag",
            "vad du redan provat, till exempel träning eller behandling",
            "din aktuella medicinlista",
            "tidigare röntgen- eller MR-svar, om du har några",
            "uppgifter om tidigare skador i området",
            "försäkringsinformation, om det är aktuellt",
          ],
        },
        {
          id: "forbered-bilddiagnostik-goteborg",
          heading: "Behöver jag ordna MR eller röntgen först?",
          body: [
            "Nej. Du behöver inte ordna MR eller röntgen på egen hand bara för att boka en tid. Har du redan sådant material är det bra att ta med det, men beställ inga undersökningar i onödan – läkaren avgör vad som är motiverat. Om en bildundersökning av ryggen skulle bli aktuell kan du läsa på i [privat MR av ryggen](/artiklar/privat-mr-rygg-kostnad).",
          ],
        },
        {
          id: "kallor-ortoped-goteborg",
          heading: "Källor och senast uppdaterat",
          body: [
            "Den medicinska och vägledande informationen på den här sidan bygger på offentliga primärkällor:",
          ],
          bullets: [
            "[1177 – Skelett, leder och muskler](https://www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/)",
            "[1177 – När och var ska jag söka vård?](https://www.1177.se/sa-fungerar-varden/nar-och-var-ska-jag-soka-vard/)",
          ],
        },
      ],
      leadCta: {
        heading: "Boka tid hos Dr. Masoud Sorkhabi",
        body: "Boka ett fysiskt eller digitalt besök direkt i kalendern. Du betalar i samband med bokningen, och beloppet återbetalas om du avbokar.",
        buttonLabel: "Boka tid",
      },
      faqs: [
        {
          question: "Vem är läkaren jag träffar?",
          answer:
            "Du träffar Dr. Masoud Sorkhabi, specialistläkare i ortopedi i Göteborg med mer än 20 års klinisk erfarenhet, med inriktning på bland annat rygg-, nack- och knäbesvär samt nervrelaterad och långvarig smärta. Den medicinska bedömningen och behandlingen utförs av läkaren; Specialistdirekt förmedlar kontakten och är inte vårdgivare.",
        },
        {
          question: "Kan jag boka tid direkt hos ortopeden?",
          answer:
            "Ja. Du bokar tid direkt i Dr. Masoud Sorkhabis bokningskalender via knappen \"Boka tid\" på sidan. Du betalar i samband med bokningen, och beloppet återbetalas om du avbokar.",
        },
        {
          question: "Behöver jag remiss till privat ortoped i Göteborg?",
          answer:
            "Nej. Som självbetalande patient behöver du ingen remiss för att boka tid hos Dr. Masoud Sorkhabi i Göteborg. Regionfinansierad vård kan ha andra krav, och med privat sjukvårdsförsäkring går du oftast via försäkringsbolaget. Läs mer i [ortoped utan remiss](/artiklar/ortoped-utan-remiss).",
        },
        {
          question: "Vad kostar ett besök hos Dr. Masoud Sorkhabi?",
          answer:
            "Ett fysiskt besök i Göteborg kostar 2 000 kr och ett digitalt videobesök kostar 1 000 kr. Priserna är fasta och du ser dem innan du bokar. En generell guide om privata ortopedpriser finns i [privat ortoped: kostnad](/artiklar/privat-ortoped-kostnad).",
        },
        {
          question: "Kan jag få ett digitalt ortopedbesök om jag inte bor i Göteborg?",
          answer:
            "Ja. Dr. Masoud Sorkhabi tar emot digitala videobesök från hela Sverige för 1 000 kr. Det passar bra för en första bedömning av dina besvär; vissa besvär kan behöva ett fysiskt besök i Göteborg, som kostar 2 000 kr.",
        },
        {
          question: "Hur snabbt kan jag få en tid?",
          answer:
            "Du ser lediga tider direkt i bokningskalendern och väljer den som passar dig. Tillgången varierar, så vi kan inte utlova en viss tid. Du bokar och betalar direkt, och beloppet återbetalas om du avbokar.",
        },
        {
          question: "Kan ortopeden bedöma rygg- och nackbesvär?",
          answer:
            "Ja. Rygg- och nackbesvär hör till den anslutna kompetensens inriktning, inklusive smärta som strålar ut mot arm. Ortopeden gör en medicinsk bedömning av dina aktuella besvär.",
        },
        {
          question: "Kan jag boka tid för knäsmärta?",
          answer:
            "Ja. Knäbesvär – till exempel smärta, svullnad, låsningar eller instabilitet – är ett vanligt skäl att söka ortoped. Vill du först läsa på om vart du ska vända dig finns [vilken läkare vid knäsmärta](/artiklar/vilken-lakare-knasmarta).",
        },
        {
          question: "Kan ortopeden bedöma diskrelaterad eller nervrelaterad smärta?",
          answer:
            "Ja. Diskrelaterade besvär och nervrelaterad, utstrålande smärta hör till den anslutna kompetensens inriktning. Ortopeden bedömer dina aktuella symtom och vad som är rimliga nästa steg.",
        },
        {
          question: "Behöver jag ha gjort MR eller röntgen före besöket?",
          answer:
            "Nej, du behöver inte ordna MR eller röntgen på egen hand bara för att boka en tid. Har du redan sådant material är det bra att ta med det. Läs mer om [privat MR av ryggen](/artiklar/privat-mr-rygg-kostnad) om en bildundersökning skulle bli aktuell.",
        },
        {
          question: "Kan jag använda privat sjukvårdsförsäkring?",
          answer:
            "Kontakta oss om du vill använda privat sjukvårdsförsäkring, så undersöker vi möjligheten. Försäkringsbolaget avgör vanligtvis vad som täcks och kan kräva ett godkännande först.",
        },
        {
          question: "Hur hittar jag de högst betygsatta ortopederna i Göteborg?",
          answer:
            "Väg in mer än snittbetyget: hur aktuella omdömena är, läkarens specialistkompetens och erfarenhet, om läkaren arbetar med just dina besvär, och att du får ett tydligt pris innan du bokar. Dr. Masoud Sorkhabi har 4,9 av 5 baserat på 63 omdömen på Reco – ett betyg som gäller läkaren, inte Specialistdirekt, och som inte är någon garanti för resultat.",
        },
        {
          question: "Vem gäller det publika betyget 4,9 av 5?",
          answer:
            "Betyget 4,9 av 5 gäller Dr. Masoud Sorkhabi och bygger på 63 publika omdömen på Reco – inte på Specialistdirekt.",
        },
        {
          question: "Är ett högt omdömesbetyg en garanti för behandlingsresultat?",
          answer:
            "Nej. Ett omdömesbetyg beskriver tidigare patienters upplevelser och är ingen garanti för ett visst medicinskt resultat i ditt fall.",
        },
        {
          question: "Är Specialistdirekt en privat ortopedklinik?",
          answer:
            "Nej. Specialistdirekt är en förmedlingstjänst, inte en ortopedklinik. Vi hjälper dig att boka tid hos Dr. Masoud Sorkhabi, specialistläkare i ortopedi i Göteborg.",
        },
        {
          question: "Vem ansvarar för den medicinska bedömningen?",
          answer:
            "Den medicinska bedömningen, behandlingen och det medicinska ansvaret ligger hos Dr. Masoud Sorkhabi. Specialistdirekt är inte vårdgivare och ger inte medicinsk rådgivning.",
        },
        {
          question: "När betalar jag – och får jag pengarna tillbaka om jag avbokar?",
          answer:
            "Du betalar i samband med att du bokar tiden. Om du avbokar återbetalas beloppet. Ett fysiskt besök i Göteborg kostar 2 000 kr och ett digitalt videobesök 1 000 kr.",
        },
      ],
    },
    gastroenterolog: {
      metaTitle: "Privat gastroenterolog i Göteborg – magspecialist utan remiss",
      metaDescription:
        "Privat gastroenterolog i Göteborg: långvariga magbesvär, uppblåsthet, diarré och halsbränna. Så fungerar remiss och vad som påverkar priset. Kostnadsfri förmedling.",
      sections: [
        {
          id: "privat-gastroenterolog-goteborg",
          heading: "Privat gastroenterolog i Göteborg – vägen in",
          body: [
            "Vid långvariga mag- och tarmbesvär finns i Göteborg både regionens vård – med **Sahlgrenska Universitetssjukhuset**, **Östra sjukhuset** och **Mölndals sjukhus** – och privata mag- och tarmmottagningar. Som storstad kan du ofta jämföra flera vårdgivare innan du bestämmer dig. Specialistdirekt är fristående: vi är inte vårdgivare och har ingen koppling till Sahlgrenska eller Västra Götalandsregionen, utan hjälper dig kostnadsfritt att hitta en relevant privat mottagning.",
            "En **gastroenterolog** (magspecialist, mag- och tarmläkare) utreder hela matsmältningskanalen samt lever, gallvägar och bukspottkörtel. Vägen in beror på finansieringen: som självbetalande kan du hos många privata mottagningar boka utan remiss, medan regionfinansierad vård oftast kräver remiss från vårdcentralen. Läs mer på [privat gastroenterolog](/privat-gastroenterolog).",
          ],
        },
        {
          id: "vanliga-besvar-gastro-goteborg",
          heading: "Vanliga skäl att söka mag- och tarmspecialist",
          body: [
            "Många magbesvär är ofarliga och går över av sig själva. Men när de är långvariga, återkommande eller påverkar vardagen kan en specialistbedömning hjälpa dig vidare. Vanliga anledningar är:",
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
          id: "undersokningar-gastro-goteborg",
          heading: "Vilka undersökningar kan bli aktuella?",
          body: [
            "Bedömningen börjar med ett samtal och en kroppsundersökning. Läkaren avgör sedan vad som är medicinskt motiverat – allt görs inte rutinmässigt. Det kan handla om blod- och avföringsprover, celiakiprov, kalprotektin, eller endoskopiska undersökningar som **gastroskopi** och **koloskopi**.",
            "Vilken undersökning som passar avgörs av dina symtom. Vill du läsa på i förväg finns [privat gastroskopi](/privat-gastroskopi) och [privat koloskopi](/privat-koloskopi).",
            "Ett privat besök hos gastroenterolog kostar **från cirka 3 000 kr**. Det är ett **frånpris** för själva läkarbesöket – provtagning och endoskopiska undersökningar som gastroskopi eller koloskopi prissätts ofta separat, så slutsumman beror på vad som behövs i ditt fall. Be därför alltid om ett samlat pris i förväg, och kontrollera om en eventuell sjukvårdsförsäkring täcker delar av kostnaden. Se [privat gastroenterolog: kostnad](/artiklar/privat-gastroenterolog-kostnad).",
          ],
        },
        {
          id: "nar-akut-gastro-goteborg",
          heading: "När du ska söka vård direkt",
          body: [
            "Vissa symtom ska inte vänta på en planerad tid. Sök akut vård eller ring **112** vid kraftig eller ihållande buksmärta, blodiga kräkningar, svart eller tjärliknande avföring, större mängder blod i avföringen, eller hög feber tillsammans med buksmärta.",
            "En planerad specialistbedömning är till för besvär som inte är akuta. Specialistdirekt ger inte medicinsk rådgivning och bedömer inte hur brådskande dina besvär är. Är du osäker når du **1177** dygnet runt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Hur bokar jag tid hos en privat gastroenterolog i Göteborg?",
          answer:
            "Du skickar en kostnadsfri förfrågan här på sidan och beskriver kort dina besvär. Vi kontaktar flera anslutna mottagningar och återkommer med den tidigaste tid vi hittar. Det medicinska ansvaret för vården ligger hos mottagningen – Specialistdirekt är inte vårdgivare.",
        },
        {
          question: "Kan jag träffa en gastroenterolog i Göteborg utan remiss?",
          answer:
            "Som självbetalande kan du hos många privata mottagningar boka utan remiss, via egen vårdbegäran. Med sjukvårdsförsäkring går du vanligtvis via försäkringsbolaget, och inom regionfinansierad vård krävs oftast remiss. Reglerna varierar mellan mottagningar – vi hjälper dig kostnadsfritt att reda ut vad som gäller. Se [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
        },
        {
          question: "Vad kostar en privat gastroenterolog i Göteborg?",
          answer:
            "Ett besök kostar från cirka 3 000 kr. Det är ett frånpris för själva läkarbesöket – provtagning och undersökningar som gastroskopi eller koloskopi prissätts ofta separat, så slutsumman beror på vad som behövs. Sjukvårdsförsäkring kan ibland täcka delar av kostnaden. Be alltid om ett samlat pris i förväg. Se [privat gastroenterolog: kostnad](/artiklar/privat-gastroenterolog-kostnad).",
        },
        {
          question: "Kan en gastroenterolog utreda uppblåst mage och långvariga magbesvär?",
          answer:
            "Ja, det är bland de vanligaste anledningarna att söka mag- och tarmspecialist. Läkaren utreder vad som ligger bakom – till exempel IBS, celiaki eller annan orsak. Läs mer i [uppblåst mage](/artiklar/uppblast-mage).",
        },
        {
          question: "Kan jag boka magspecialist för diarré, förstoppning eller halsbränna?",
          answer:
            "Ja. Långvarig diarré, förstoppning, ändrade avföringsvanor samt halsbränna och sväljsvårigheter är vanliga skäl att söka gastroenterolog. Läkaren avgör vilken utredning som är motiverad utifrån dina symtom.",
        },
        {
          question: "Kan gastroenterologen bedöma om jag behöver gastroskopi eller koloskopi?",
          answer:
            "Ja – det är just det bedömningen går ut på. Läkaren träffar dig, går igenom symtom och sjukhistoria och avgör sedan vilken undersökning som är medicinskt motiverad. Allt beställs inte rutinmässigt.",
        },
        {
          question: "När ska jag söka vård direkt i stället för att boka tid?",
          answer:
            "Sök akut vård eller ring 112 vid kraftig eller ihållande buksmärta, blodiga kräkningar, svart eller tjärliknande avföring, större mängder blod i avföringen, eller hög feber med buksmärta. Är du osäker kan du ringa 1177.",
        },
      ],
    },
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
            "En praktisk sak värd att veta: **Mölndal** gränsar direkt till Göteborg, och för många i södra Göteborg är en mottagning där lika nära som en i centrum. Låt inte kommungränsen begränsa dig när du jämför – se [allmänläkare i Mölndal](/specialiteter/allmanmedicin/molndal).",
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
            "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Prover och kompletterande undersökningar prissätts ofta separat från besöket, så slutsumman beror på vad läkaren bedömer att du behöver. Be alltid om ett samlat pris i förväg. Kom också ihåg att ett privat besök **inte ersätter din vårdcentral**, som har din journal och ansvarar för kontinuiteten över tid. Se det som ett komplement eller en snabbare väg till en bedömning.",
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
          question: "Vad kostar en privat allmänläkare i Göteborg?",
          answer:
            "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Prover och kompletterande undersökningar prissätts ofta separat från besöket. Be alltid om ett samlat pris i förväg och fråga vad som ingår.",
        },
        {
          question: "När ska jag söka akut i stället för att boka tid?",
          answer:
            "Ring 112 vid akuta eller livshotande symtom, till exempel bröstsmärta som inte går över, kraftig andnöd, plötslig svaghet eller sluddrigt tal. En bokad tid är till för besvär som inte är akuta; är du osäker kan du ringa 1177.",
        },
        {
          question: "Finns det allmänläkare nära mig?",
          answer:
            "I Göteborgsområdet finns privata läkarmottagningar både centralt och i kranskommunerna, till exempel i [Mölndal](/specialiteter/allmanmedicin/molndal). Vilken som passar dig beror på var du bor och vad besvären gäller. Beskriv var i regionen du befinner dig i din förfrågan, så tar vi hänsyn till det när vi matchar. Det medicinska ansvaret för vården ligger hos mottagningen – Specialistdirekt är inte vårdgivare.",
        },
        {
          question: "Vilken är den bästa privata allmänläkaren i Göteborg?",
          answer:
            "Vi rangordnar inte mottagningar och utser ingen \"bästa\" – vad som passar bäst beror på dina besvär och vad du vill ha ut av besöket. Det du däremot kan väga in är: att läkaren är specialist i allmänmedicin, hur lång konsultationen är, om provtagning ingår, om mottagningen kan följa upp dig över tid, och att du får ett samlat pris i förväg. Berätta vad som är viktigast för dig, så föreslår vi en mottagning som matchar.",
        },
        {
          question: "Finns det engelsktalande läkare i Göteborg?",
          answer:
            "Många läkare i Sverige talar engelska, men det varierar mellan mottagningar och enskilda läkare – vi kan inte utlova ett visst språk i förväg. Ange vilket språk du föredrar i din förfrågan, så tar vi med det när vi matchar dig och stämmer av med mottagningen.",
        },
      ],
    },
    neurolog: {
      metaTitle: "Privat neurolog i Göteborg – utan remiss",
      metaDescription:
        "Privat neurolog i Göteborg utan remiss: migrän, yrsel och domningar, neurologiskt status, MR och vad som påverkar priset. Kostnadsfri förmedling.",
      sections: [
        {
          id: "privat-neurolog-goteborg",
          heading: "Privat neurolog i Göteborg – vägen in vid nervbesvär",
          body: [
            "Göteborg har ett av landets tyngsta neurologiska nav vid **Sahlgrenska Universitetssjukhuset**, med ytterligare vård vid **Östra sjukhuset** och **Mölndals sjukhus**. Vid sidan av regionens vård finns privata neurologmottagningar i staden. Specialistdirekt är fristående – vi är inte vårdgivare och har ingen koppling till Sahlgrenska eller Västra Götalandsregionen.",
            "En **neurolog** utreder sjukdomar och symtom som utgår från hjärna, ryggmärg och nerver. Grunden i bedömningen är samtalet om dina symtom och ett **neurologiskt status**, där läkaren undersöker reflexer, känsel, styrka, koordination och balans. Som storstad gör Göteborg det ofta möjligt att jämföra flera vårdgivare innan du bestämmer dig. Läs mer på vår [översikt om neurolog](/specialiteter/neurolog).",
            "En praktisk sak värd att veta: **Mölndal** gränsar direkt till Göteborg, och för många i södra Göteborg är en mottagning där lika nära som en i centrum. Låt inte kommungränsen begränsa dig när du jämför – se [neurolog i Mölndal](/specialiteter/neurolog/molndal).",
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
            "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Kompletterande undersökningar som MR, EEG eller nervmätning prissätts separat från läkarbesöket, och slutsumman beror på vad läkaren bedömer att du behöver. Be alltid om ett samlat pris i förväg och kontrollera om en eventuell sjukvårdsförsäkring täcker delar av kostnaden. Hur en utredning kan läggas upp beskriver vi i [privat neurolog: utredning](/artiklar/privat-neurolog-utredning).",
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
          question: "Hur bokar jag tid hos en privat neurolog i Göteborg?",
          answer:
            "Du skickar en kostnadsfri förfrågan här på sidan och beskriver kort dina besvär. Vi kontaktar flera anslutna mottagningar och återkommer med den tidigaste tid vi hittar. Det medicinska ansvaret för vården ligger hos mottagningen – Specialistdirekt är inte vårdgivare.",
        },
        {
          question: "Kan jag träffa en neurolog utan remiss?",
          answer:
            "Ja. Som självbetalande kan du hos många privata mottagningar boka utan remiss, via egen vårdbegäran. Inom regionfinansierad vård i Västra Götalandsregionen krävs oftast en remiss från vårdcentralen. Vad som gäller beror på mottagning och finansiering – vi hjälper dig kostnadsfritt att reda ut vägen in. Se även [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
        },
        {
          question: "Kan jag betala själv eller använda sjukvårdsförsäkring?",
          answer:
            "Som självbetalande bokar du och betalar direkt hos mottagningen. Har du en sjukvårdsförsäkring går du normalt via försäkringsbolaget, som avgör vad som täcks och ibland kräver en bedömning först. Vilka betalningsvägar som gäller varierar mellan mottagningar – vi hjälper dig att reda ut det innan du bokar.",
        },
        {
          question: "Kan jag boka neurolog för migrän eller långvarig huvudvärk?",
          answer:
            "Ja, återkommande migrän och svår huvudvärk är bland de vanligaste anledningarna att söka neurolog. Neurologen kan utreda vad som ligger bakom och lägga upp en plan tillsammans med dig. Sidan ger allmän information och ingen behandlingsrekommendation.",
        },
        {
          question: "Kan en neurolog utreda domningar och stickningar?",
          answer:
            "Ja. Domningar, stickningar och nervsmärta är vanliga skäl att söka neurolog. Bedömningen utgår från samtal och neurologiskt status, och kompletteras vid behov med till exempel nervmätning. Läs mer i [domningar i händer och fötter](/artiklar/domningar-hander-fotter-vilken-lakare).",
        },
        {
          question: "Kan jag få hjälp med yrsel och balansproblem?",
          answer:
            "Ja, yrsel och balansbesvär är ett vanligt skäl att söka neurolog – men yrsel kan också ha andra orsaker, till exempel i innerörat. Läkaren avgör vad som är mest relevant att utreda. Se även [yrsel – vilken läkare?](/artiklar/yrsel-vilken-lakare).",
        },
        {
          question: "Kan en neurolog utreda tremor eller muskelsvaghet?",
          answer:
            "Ja. Skakningar (tremor), ofrivilliga rörelser och återkommande muskelsvaghet är neurologiska frågeställningar. Neurologen gör en samlad bedömning utifrån symtom, sjukhistoria och neurologiskt status. Den här sidan ställer ingen diagnos.",
        },
        {
          question: "Kan neurologen bedöma behovet av MR, EEG eller EMG?",
          answer:
            "Ja – det är just det en neurologisk bedömning går ut på. Läkaren träffar dig, gör ett neurologiskt status och avgör sedan vilka undersökningar som är medicinskt motiverade, till exempel MR av hjärnan, EEG eller nervmätning (ENeG/EMG). Allt beställs inte rutinmässigt, utan utifrån dina symtom och tidigare fynd.",
        },
        {
          question: "Vilka undersökningar kan bli aktuella hos en neurolog?",
          answer:
            "Bedömningen utgår från samtal och ett neurologiskt status. Vid behov kompletteras det med MR av hjärnan, EEG eller nervmätning (ENeG/EMG). Vilka undersökningar som blir aktuella avgör neurologen utifrån dina symtom – allt beställs inte rutinmässigt.",
        },
        {
          question: "Vad kostar en privat neurolog i Göteborg?",
          answer:
            "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Kompletterande undersökningar som MR, EEG eller nervmätning prissätts separat från läkarbesöket. Be alltid om ett samlat pris i förväg och kontrollera om en eventuell sjukvårdsförsäkring täcker delar av kostnaden.",
        },
        {
          question: "När ska jag söka akut i stället för att boka neurolog?",
          answer:
            "Ring 112 vid plötslig svaghet eller domning i ansikte, arm eller ben, sluddrigt tal, akut synbortfall eller en plötslig, mycket svår huvudvärk – det kan vara tecken på stroke. En bokad neurologtid är till för besvär som inte är akuta; är du osäker kan du ringa 1177.",
        },
      ],
    },
    kardiolog: {
      metaTitle: "Privat kardiolog Göteborg – undersökningar utan remiss",
      metaDescription:
        "Privat kardiolog i Göteborg utan remiss: kardiologbesök, EKG, hjärtultraljud, arbets-EKG, långtids-EKG och 24-timmars blodtrycksmätning. Pris lämnas innan bokning.",
      quickFacts: [
        { label: "Plats", value: "Göteborg – fysiskt besök" },
        { label: "Specialitet", value: "Kardiologi" },
        { label: "Undersökningar", value: "EKG, hjärtultraljud, arbets-EKG, långtids-EKG, 24-tim blodtryck" },
        { label: "Patienttyp", value: "Självbetalande" },
        { label: "Remiss", value: "Behövs inte för den aktuella tidsförfrågan" },
        { label: "Försäkring", value: "Mottagningen kan ta emot försäkringspatienter efter godkännande" },
        { label: "Pris", value: "Per konsultation/undersökning – lämnas innan bokning" },
        { label: "Tidsförfrågan", value: "Kostnadsfri och utan förpliktelser" },
        { label: "Roll", value: "Specialistdirekt är förmedlingstjänst – inte vårdgivare" },
      ],
      redFlag: {
        heading: "När ska du ringa 112 i stället?",
        body: "Specialistdirekt är inte en akuttjänst. En planerad kardiologbedömning är till för besvär som inte är akuta. Ring **112** direkt vid till exempel:",
        bullets: [
          "bröstsmärta eller tryck över bröstet som inte går över – särskilt med andfåddhet, illamående eller kallsvettning",
          "plötslig svår andnöd",
          "svimning eller svimningskänsla i samband med hjärtklappning",
          "tecken på stroke: plötslig svaghet, hängande mungipa eller sluddrigt tal",
        ],
        footnote:
          "Ring **112** vid livshotande tillstånd. Är du osäker kan du ringa **1177** för sjukvårdsrådgivning dygnet runt.",
      },
      sections: [
        {
          id: "privat-kardiolog-goteborg",
          heading: "Privat kardiolog i Göteborg – vägen in",
          body: [
            "Göteborg är Sveriges näst största stad, och det märks på hjärtsjukvården. Regionens tyngdpunkt ligger vid **Sahlgrenska Universitetssjukhuset**, ett av Nordens största sjukhus, med ytterligare vård vid **Östra sjukhuset** och **Mölndals sjukhus**. Vid sidan av den regiondrivna vården finns flera privata hjärtmottagningar i staden. Specialistdirekt är en fristående förmedlingstjänst – vi är inte vårdgivare och har ingen koppling till Sahlgrenska eller Västra Götalandsregionen.",
            "Genom Specialistdirekt förmedlas din förfrågan till **ansluten privat kardiologisk specialistkompetens i Göteborg** – du behöver inte ringa runt själv, och resvägen blir sällan lång oavsett stadsdel. Vägen in beror på finansieringen: som **självbetalande** patient behöver du ingen remiss för den aktuella tidsförfrågan, medan **regionfinansierad** vård i Västra Götalandsregionen oftast går via en remiss från vårdcentralen. Har du en **sjukvårdsförsäkring** går du normalt via försäkringsbolaget, som kan kräva ett godkännande först. Läs mer på vår [översikt om kardiolog](/specialiteter/kardiolog).",
            "En praktisk sak värd att veta: **Mölndal** gränsar direkt till Göteborg, och för många i södra Göteborg är en mottagning där lika nära som en i centrum. Låt inte kommungränsen begränsa dig när du jämför – se [kardiolog i Mölndal](/specialiteter/kardiolog/molndal).",
          ],
        },
        {
          id: "hjartundersokningar-goteborg",
          heading: "Hjärtundersökningar som kan bokas",
          body: [
            "En kardiologisk bedömning börjar med ett samtal om dina symtom och en kroppsundersökning. Vilka undersökningar som är relevanta avgörs utifrån frågeställningen och den medicinska bedömningen – allt görs inte rutinmässigt för alla. **Varje undersökning har ett separat pris**, och du får information om kostnaden innan bokningen bekräftas.",
            "Den anslutna mottagningen kan erbjuda bland annat:",
          ],
          bullets: [
            "**EKG (vilo-EKG)** – registrerar hjärtats elektriska aktivitet, ofta ett första steg vid hjärtklappning eller rytmbesvär.",
            "**Hjärtultraljud (ekokardiografi, UCG)** – visar hjärtats pumpförmåga, klaffar och struktur.",
            "**Arbets-EKG (arbetsprov)** – visar hur hjärtat svarar på fysisk belastning.",
            "**Långtids-EKG (Holter)** – bärbar registrering över ett eller flera dygn, bra vid besvär som kommer och går.",
            "**24-timmars blodtrycksmätning** – vid frågeställning om [högt blodtryck](/artiklar/hogt-blodtryck-nar-behovs-kardiolog).",
          ],
        },
        {
          id: "remiss-och-pris-goteborg",
          heading: "Remiss och vad som påverkar priset",
          body: [
            "Behöver du remiss? Som självbetalande patient behöver du ingen remiss för den aktuella tidsförfrågan till den anslutna mottagningen. Inom regionfinansierad vård i Västra Götalandsregionen krävs oftast en remiss från vårdcentralen. Se även [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
            "Priset beror på vilken konsultation eller undersökning som bokas. Utöver kardiologbesöket prissätts undersökningar som EKG, hjärtultraljud, långtids-EKG eller arbets-EKG separat, så slutsumman beror på vad som behövs i ditt fall. Du får alltid information om aktuellt pris innan bokningen bekräftas. En generell guide finns i [privat kardiolog: kostnad](/artiklar/privat-kardiolog-kostnad).",
          ],
        },
        {
          id: "forsakring-kardiolog-goteborg",
          heading: "Kan jag använda privat sjukvårdsförsäkring?",
          body: [
            "Den anslutna mottagningen kan ta emot patienter via privat sjukvårdsförsäkring. Kontakta först ditt försäkringsbolag för medicinsk rådgivning och godkännande av ärendet. Försäkringsbolaget avgör vilka besök och undersökningar som omfattas och om en betalningsförbindelse krävs.",
            "Försäkringsärendet och den medicinska vården hanteras av den mottagning som tar emot dig. Specialistdirekt förmedlar tidsförfrågan och är inte vårdgivare.",
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
      leadCta: {
        heading: "Skicka en kostnadsfri tidsförfrågan",
        body: "Beskriv kort dina besvär eller vilken undersökning du är intresserad av, och vilka tider som passar. Vi återkommer så snart som möjligt med besked om möjlig tid och aktuellt pris. Specialistdirekt är en förmedlingstjänst – inte vårdgivare.",
        buttonLabel: "Skicka tidsförfrågan",
      },
      faqs: [
        {
          question: "Kan jag boka privat kardiolog i Göteborg utan remiss?",
          answer:
            "Ja. Som självbetalande patient kan du skicka en tidsförfrågan till ansluten privat kardiologisk specialistkompetens i Göteborg utan remiss. Du får information om möjlig tid, relevant undersökning och aktuellt pris innan du bestämmer dig.",
        },
        {
          question: "Var kan jag göra en privat hjärtundersökning i Göteborg?",
          answer:
            "Den anslutna mottagningen kan erbjuda kardiologbesök samt EKG, hjärtultraljud, arbets-EKG, långtids-EKG och 24-timmars blodtrycksmätning. Vilka undersökningar som är relevanta avgörs av frågeställningen och den medicinska bedömningen.",
        },
        {
          question: "Ingår EKG i ett privat kardiologbesök?",
          answer:
            "Det beror på frågeställningen. Ett vilo-EKG är ofta ett första steg, men varje undersökning prissätts separat och avgörs utifrån den medicinska bedömningen. Du får veta vad som ingår och vad det kostar innan bokningen bekräftas.",
        },
        {
          question: "Kan jag boka hjärtultraljud, arbets-EKG eller långtids-EKG?",
          answer:
            "Ja, den anslutna mottagningen kan erbjuda dessa undersökningar. Vilken som är relevant avgörs av frågeställningen och den medicinska bedömningen, och varje undersökning har ett separat pris som du får veta innan bokning.",
        },
        {
          question: "Tar mottagningen emot privat sjukvårdsförsäkring?",
          answer:
            "Ja, den anslutna mottagningen kan ta emot försäkringspatienter. Kontakta först ditt försäkringsbolag för godkännande av ärendet. Försäkringsärendet hanteras av mottagningen – Specialistdirekt förmedlar tidsförfrågan och är inte vårdgivare.",
        },
        {
          question: "Kan kardiologen utreda hjärtklappning, andfåddhet eller yrsel?",
          answer:
            "Ja, hjärtklappning och andfåddhet är vanliga skäl att söka kardiolog, och läkaren avgör vilka undersökningar som är relevanta. Yrsel kan ha flera orsaker. Vid akuta symtom, se avsnittet om när du ska ringa 112.",
        },
        {
          question: "Får jag priset innan bokningen bekräftas?",
          answer:
            "Ja. Du får alltid information om aktuellt pris för den konsultation eller undersökning som är aktuell innan bokningen bekräftas.",
        },
        {
          question: "Är Specialistdirekt en hjärtmottagning?",
          answer:
            "Nej. Specialistdirekt är en förmedlingstjänst, inte en hjärtmottagning eller vårdgivare. Vi förmedlar din tidsförfrågan till ansluten kardiologisk specialistkompetens i Göteborg.",
        },
        {
          question: "Behöver jag remiss till en privat kardiolog i Göteborg?",
          answer:
            "Det beror på mottagning och finansiering. Som självbetalande kan du hos många privata mottagningar boka mer direkt eller via egen vårdbegäran, medan regionfinansierad vård i Västra Götalandsregionen oftast kräver remiss från vårdcentralen. Vi hjälper dig kostnadsfritt att reda ut vägen in – läs även [boka specialist utan remiss](/artiklar/boka-specialist-utan-remiss).",
        },
        {
          question: "Vad kostar en privat kardiolog i Göteborg?",
          answer:
            "Priser varierar mellan mottagningar och det finns inget enhetligt pris. Undersökningar som EKG, hjärtultraljud, långtids-EKG eller arbetsprov prissätts ofta separat från läkarbesöket. Be alltid om ett samlat pris i förväg och kontrollera om en eventuell sjukvårdsförsäkring täcker delar av kostnaden. Se [privat kardiolog: kostnad](/artiklar/privat-kardiolog-kostnad).",
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
