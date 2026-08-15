# VERDICT: PARTIAL — AGE/SCOPE CONFIRMATION REQUIRED

| | |
|---|---|
| Vinnande ämne | **Ont i knät hos barn** |
| Föreslagen URL | `/artiklar/ont-i-knat-barn` |
| Status | Fullständig specifikation klar. **Ej publicerad.** |
| Blockerare | `BARN_AGE_FLOOR` och `BARN_SCOPE` är tomma (§0) |
| Grind som utlöstes | §1 AGE + SCOPE GATE |

`BARN_SUPPLY_STATUS = CONFIRMED` och `PILLAR_REVIEW_STATUS = YES` är uppfyllda och
har inte ifrågasatts. Men §1 tillåter inte publicering av en kommersiell
barn-CTA innan åldersgolv och scope är kända, och §28 kräver att CTA:n respekterar
båda. Därför levereras research, SERP-analys, ämnesval, komplett
innehållsspecifikation, källor och kannibaliseringsanalys — utan publicering.

Två uppgifter från operatören låser upp bygget (se avsnitt I).

---

# A. Kandidatanalys

## A1. Marknadssignal

Från operatörens Keyword Planner-data (§3), avrundade Google-hinkar:

| Sökord | Ca sökningar/mån |
|---|---:|
| barnortopedi | **500** |
| barnortoped | 50 |
| barnortopedi göteborg | 50 |
| barn ortoped | 50 |
| barn ortopedi | 50 |
| ortoped barn | 50 |

Dessa avser **pelarsidans** intent, som redan ägs av `/artiklar/barnortopedi`.
De ska inte summeras till unika användare.

**För symtomkandidaterna nedan finns ingen keyword-export** (`KEYWORD_EXPORT_PATH`
är tom). Ingen volym har därför uppfunnits (§11). Efterfrågan bedöms i stället på
SERP-evidens: hur många aktörer som aktivt konkurrerar om frågan, och om
1177 har byggt en egen sida för den — båda är indirekta men verifierbara signaler.

GSC bidrar inte här: sajten har aldrig targetat dessa frågor, så noll impressions
är inget veto (§12).

## A2. SERP-evidens per kandidat

Metod: WebSearch (§14). Ingen headless-scraping. Verifierade resultat, inte antaganden.

### `ont i knät barn` / `knäsmärta barn`

| Resultat | Domän | Typ | Medicinsk granskare | Svaghet |
|---|---|---|---|---|
| Knäbesvär hos barn och tonåringar | 1177.se | Myndighet, patientinfo | Ja | Kort; ingen beslutsstruktur, ingen väg vidare |
| Knäbesvär hos barn | mindoktor.se | Digital vårdgivare | Delvis | Leder till egen digital vård |
| **Ont i knät** | doktor.se | **Vuxensida** | Delvis | **Intent-missmatch – rankar på barnfråga med vuxeninnehåll** |
| Hälta hos barn, symtomguide | netdoktor.se | Symtomguide | Delvis | Fel symtom (hälta, inte knä) |
| Knäsmärta hos barn – guide för föräldrar | anodyne.se | **Produktblogg** (smärtlindring) | Nej | Kommersiell produktvinkel |
| När knäsmärta stoppar leken | anodyne.se | **Produktblogg** | Nej | Andra träffen från samma säljare |
| Knäsmärta hos barn | tonuselast.com | **Ortosförsäljare** | Nej | Produktdriven |
| Schlatterknä | naprawell.se | Naprapat, kommersiell | Nej | Endast en diagnos |

**Svårighet: MED. Konfidens: MED.**
Tre av åtta träffar är produkt-/behandlingsförsäljare utan granskare, en är en
vuxensida som rankar på en barnfråga, och en svarar på fel symtom. Ingen enda
sida tar föräldern hela vägen **symtom → vad som är vanligt → röda flaggor →
vilken vårdnivå → när ortoped**. Det är exakt en §15-möjlighet.

### `schlatters sjukdom`

| Resultat | Domän | Typ | Granskare | Svaghet |
|---|---|---|---|---|
| Schlatters sjukdom | 1177.se | Myndighet | Ja | Kort |
| Skadekompassen | skadekompassen.se | Kommersiell | Nej | Säljer knäskydd |
| Idrottsskadespecialisterna | – | Klinik | Nej | Behandlingssäljande |
| Joint Academy | jointacademy.com | Kommersiell app | Delvis | Artros-fokus |
| Roslagskliniken, Naprapatlandslaget, Limbra, Idrottsskadeexperten | – | Naprapat/klinik | Nej | Behandlingssäljande |
| Doktor.se | doktor.se | Digital vårdgivare | Delvis | – |

**Svårighet: MED–HIGH. Konfidens: MED.**
Tätt besatt av kommersiella behandlingsaktörer. Ingen ortopedgranskad
föräldersida — men marginalen är mindre än för den bredare knäfrågan, och
Schlatter är en delmängd av knäsmärta. Bättre som **eget spoke i steg 2**, efter
att den breda knäsidan finns att länka från.

### `barn haltar` / `hälta hos barn`

| Resultat | Domän | Typ | Målgrupp | Svaghet |
|---|---|---|---|---|
| Netdoktor symtomguide | netdoktor.se | Symtomguide | Förälder | – |
| **AKO Skåne-riktlinje** | vardgivare.skane.se | **Klinisk riktlinje** | Vårdpersonal | Ej för föräldrar |
| **Behandlingslinje (PDF)** | rvn.se | **Regiondokument** | Vårdpersonal | PDF |
| Rikshandboken BHV | rikshandboken-bhv.se | BHV-handbok | Vårdpersonal | – |
| terveyskyla.fi | terveyskyla.fi | **Finsk** vårdportal | Förälder | Fel land |
| **Familjeliv-tråd** | familjeliv.se | **Forum** | – | Ingen medicinsk kvalitet |
| **Familjeliv-tråd** | familjeliv.se | **Forum** | – | Ingen medicinsk kvalitet |
| Höftbesvär hos barn | mindoktor.se | Vårdgivare | Förälder | – |

**Svårighet: LOW–MED. Konfidens: MED.**
Den svagaste SERP:en av alla — två forumtrådar och tre vårdpersonalsdokument på
sida 1. **Men den vinner ändå inte.** Se A3.

### Övriga kandidater (kortbedömning)

| Kandidat | Bedömning |
|---|---|
| `ont i hälen barn` / `severs` | Rimlig routing-djup-kandidat, inom fot-scope, men mindre efterfrågan och pelaren täcker det kort. Kandidat till steg 3 |
| `skolios barn` | Högre risk (§16), och behandling sker i regionens specialistvård → svag kommersiell passform |
| `plattfot barn` | Låg brådska, svaret är oftast "ingen behandling behövs" → låg kommersiell närhet |
| `ryggont barn` | Rimlig, inom rygg-scope och matchar läkarens ryggkirurgikompetens. Kandidat till steg 2–3 |
| `idrottsskador barn` | För bred; skulle överlappa både knä- och hälspokes. Byggs sist, som nav |

## A3. Poängsättning (§13, max 18)

| Kandidat | Marknad | Brådska | Bokningsnärhet | SERP | Kluster | AI | Kannib. | **Summa** |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| **Ont i knät hos barn** | 2 | 3 | **3** | 2 | 3 | 3 | −1 | **15** |
| Schlatters sjukdom | 2 | 2 | 3 | 2 | 2 | 3 | −1 | 13 |
| Ryggont hos barn | 1 | 2 | 3 | 2 | 2 | 2 | −1 | 11 |
| Ont i hälen / Severs | 1 | 2 | 2 | 2 | 2 | 2 | 0 | 11 |
| **Barn haltar** | 2 | 3 | **0** | **3** | 2 | 3 | 0 | **13** |
| Skolios hos barn | 2 | 2 | 1 | 1 | 2 | 2 | 0 | 10 |
| Plattfot hos barn | 1 | 1 | 1 | 2 | 2 | 2 | 0 | 9 |

### Motivering av de avgörande poängen

**Ont i knät hos barn — bokningsnärhet 3.** Knä ligger i den sannolika
scope-kärnan, och den typiska åldersgruppen (skolålder–tonår, Schlatter 8–15 år)
är den grupp som med störst sannolikhet ligger **över** ett åldersgolv. Föräldern
söker under pågående problem, inte i allmän nyfikenhet.

**Ont i knät — kannibalisering −1.** Tre grannar måste hållas isär: pelarens
knä-avsnitt, `/artiklar/vilken-lakare-knasmarta` (vuxen) och
`/artiklar/mr-kna-vad-visar`. Hanterbart (avsnitt C), men inte gratis.

**Barn haltar — SERP 3, men bokningsnärhet 0 → förkastad.** Trots den klart
svagaste SERP:en är detta fel affär och fel medicin:

1. §16 klassar hälta som *interpretation-deep / higher-risk* (septisk artrit,
   Perthes, epifysiolys). Den ska inte väljas för att SERP:en är lätt.
2. De vanligaste orsakerna — coxitis simplex/"höftsnuva" — drabbar
   **förskolebarn**, alltså sannolikt **under** varje rimligt åldersgolv.
3. Höftbesvär hos barn nämns i §8 uttryckligen som exempel på vad som kan ligga
   **utanför** bekräftad scope.

Att bygga en sida som rankar på "barn haltar" och sedan inte får konvertera
någon av besökarna är trafik utan affär — och risken att den ändå konverterar fel
patient är precis vad §7–8 förbjuder. **Trafik motiverar inte vilseledande
konvertering.**

---

# B. Vinnare

## `Ont i knät hos barn`

**Varför den vann:** högsta totalpoäng (15/18) och den enda kandidaten som
samtidigt har (a) en SERP där ingen sida löser förälderns hela problem,
(b) en åldersgrupp som sannolikt ligger inom utbudet, (c) direkt koppling till
läkarens faktiska kompetensområde, och (d) en naturlig plats i klustret som nav
för framtida spokes (Schlatter, Severs).

**Varför de andra förlorade:** Schlatter är en delmängd som bör hänga under
knäsidan, inte tvärtom. Hälta är fel ålder, fel scope och högre medicinsk risk.
Skolios och plattfot saknar kommersiell närhet. Idrottsskador är för brett och
skulle äta upp både knä- och hälspokes.

---

# C. Intent-ägande och kannibaliseringsgränser (§31)

**Ny sidas primära intent:** förälder vars barn har ont i knät och vill veta om
det är vanligt/ofarligt, vad som kan ligga bakom, och när barnet behöver
undersökas.

| Granne | Överlappsmekanism | Hur ägandet hålls isär |
|---|---|---|
| `/artiklar/barnortopedi` (pelare) | Har en H2 "Knäsmärta hos barn och tonåringar" | Pelaren behåller **sammanfattningsdjup** och får en kontextuell länk till spoken. Pelaren äger `barnortopedi`/`barnortoped`; spoken äger `ont i knät hos barn`. Pelarens avsnitt **utökas inte** |
| `/artiklar/vilken-lakare-knasmarta` | Samma kroppsdel | Vuxen-/generell routing förblir där. Spoken har `hos barn` i slug, Title, H1 och genomgående språk. Spoken tar aldrig generiskt `knäsmärta` |
| `/artiklar/mr-kna-vad-visar` | Knä + bilddiagnostik | MR-artikeln äger *vad MR visar*. Spoken säger bara **när** bilddiagnostik kan bli aktuell och länkar dit. Spoken innehåller inget MR-fynddjup |
| `/specialiteter/ortoped/goteborg` | Kommersiell | Spoken är nationell och informativ. All bokningsintent skickas dit. Spoken får **ingen** ortsvariant (§30) |
| Framtida Schlatter-spoke | Delmängd | Spoken nämner Schlatter kort och länkar; går **inte** in på behandling/övningar/förlopp |

**Title/H1-gräns:** varken `barnortoped`, `barnortopedi` eller `Göteborg` får
förekomma i Title eller H1 (§20). Klustertillhörigheten skapas semantiskt och via
interna länkar.

---

# D. Implementationsspecifikation

```text
Slug:   /artiklar/ont-i-knat-barn
Title:  Ont i knät hos barn – när bör barnet undersökas?
H1:     Ont i knät hos barn – orsaker och när barnet bör undersökas
Meta:   Barn får ofta ont i knät vid aktivitet och växande. Läs om vanliga
        orsaker, vad som brukar gå över av sig själv och när barnet bör
        bedömas av läkare.
primaryKeyword: "ont i knät hos barn"
category: Ortopedi   ·   relatedSpecialty: ortoped
```

**Direktsvar högst upp (§21), som ska matcha verifierad evidens:**

> **Kort svar:** Ont i knät är vanligt hos barn och tonåringar, ofta i samband med
> idrott och växande, och besvären går ofta över av sig själva. Barnet bör
> bedömas om smärtan inte går över eller återkommer, om knät svullnar, om barnet
> haltar eller om besvären tydligt påverkar aktivitet och vardag.

## Sektionsordning (röda flaggor före första kommersiella CTA — §24)

| # | H2 | Innehåll |
|---|---|---|
| 1 | Varför får barn ont i knät? | Belastning/växande/skada. Etablerar att det oftast är ofarligt |
| 2 | Vanliga orsaker till knäsmärta hos barn | Belastningsbesvär, Schlatter (kort + länk), främre knäsmärta, skada, Bakercysta |
| 3 | Är det farligt att barn har ont i knät? | Kalibrerar oro nedåt, utan att över-triagera |
| 4 | **När ska man söka vård snabbt?** | **Röda flaggor. Ligger före all kommersiell CTA i DOM-ordning** |
| 5 | När bör barnet undersökas (men inte akut)? | Kvarstående/återkommande smärta, hälta, svullnad, funktionspåverkan |
| 6 | Vilken vårdnivå passar? | Vårdcentral / fysioterapeut / ortoped — beslutsstöd, inte reklam |
| 7 | Behövs röntgen eller MR? | "Inte alltid". Länk till `/artiklar/mr-kna-vad-visar` |
| 8 | Vad kan man göra hemma under tiden? | Belastningsanpassning. Inga behandlingslöften |
| 9 | När kan en ortopedisk bedömning vara aktuell? | **Enda kommersiella avsnittet.** CTA här |
| 10 | Källor | 1177-länkar, utan spårningsparametrar |

FAQ: används **endast** om verkliga föräldrafrågor återstår efter ovanstående
(§34). Preliminärt 5–6 frågor, 1:1 med synlig text. Inte 15 för schemats skull.

## CTA (§28) — kan inte färdigställas ännu

```
Rubrik:  När kan en ortopedisk bedömning vara aktuell?
Text:    Om barnet har kvarstående knäbesvär och ni önskar en privat
         specialistbedömning kan ni boka tid hos specialistläkare i ortopedi
         i Göteborg.
Knapp:   Boka ortopedisk bedömning för barn
Mål:     /specialiteter/ortoped/goteborg
Villkor: <BARN_AGE_FLOOR>  ·  <BARN_SCOPE>
```

Åldersvillkoret måste stå **i klartext intill CTA:n**, t.ex. "gäller barn från
X år". Yngre barn routas i stället till vårdcentral/BVC/akut. Utan värdet kan
avsnittet inte skrivas färdigt.

## Interna länkar

| Riktning | Från → Till | Ankartext |
|---|---|---|
| Spoke → pelare (§26) | ny → `/artiklar/barnortopedi` | `ortopedisk bedömning för barn` |
| Pelare → spoke (§25) | `/artiklar/barnortopedi`, befintlig H2 `knasmarta-hos-barn` | `ont i knät hos barn och när besvären bör bedömas` |
| Spoke → kommersiell (§27) | ny → `/specialiteter/ortoped/goteborg` | `ortoped för barn i Göteborg` |
| Spoke → MR | ny → `/artiklar/mr-kna-vad-visar` | `vad MR av knät kan visa` |
| Spoke → vuxen | ny → `/artiklar/vilken-lakare-knasmarta` | `knäsmärta hos vuxna` |

Pelarens knä-avsnitt får **en mening + länk**, inget mer.

---

# E. Medicinsk QA

## Källor (§23) — samtliga verifierade live, utan `utm_source`

| Källa | URL | Status |
|---|---|---|
| 1177 – Knäbesvär hos barn och tonåringar | `www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/leder/knabesvar-hos-barn-och-tonaringar/` | 200 |
| 1177 – Schlatters sjukdom | `www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/ben-och-fotter/schlatters-sjukdom/` | 200 |
| 1177 – Växtvärk | `www.1177.se/sjukdomar--besvar/skelett-leder-och-muskler/vaxtvark/` | 200 |
| 1177 Vårdpersonal – Hälta hos barn | `vardpersonal.1177.se/kunskapsstod/kliniska-kunskapsstod/halta-hos-barn/` | 200 |

Kommersiella konkurrenter (Anodyne, Tonus Elast, naprapatsajter) har använts
**enbart** för SERP-analys och används inte som medicinskt underlag.

## Röda flaggor som ska finnas (§24)

Underbyggda av 1177: knä som låst sig och inte går att böja/sträcka, oförmåga att
belasta benet efter skada, kraftig svullnad kort efter skada, tydlig felställning,
samt hälta eller ledsmärta i kombination med feber eller påverkat allmäntillstånd.
Formuleras utan att skrämma vid vanliga godartade besvär.

## Medicinskt djup (§16)

**Routing-djup.** Sidan förklarar vad som är vanligt, vad som brukar gå över och
när bedömning behövs. Den ställer ingen diagnos, tolkar inga bilder och går inte
in på differentialdiagnostik. Det håller den inom det som säkert kan granskas.

## Ålder/scope-efterlevnad

**Kan inte verifieras än.** Se avsnitt I.

## Granskarstatus (§17)

`reviewedBy` sätts av plattformen på alla artiklar. Enligt `PILLAR_REVIEW_STATUS:
YES` granskar Dr. Sorkhabi sajtens artiklar före publicering. **Den här texten är
inte skriven än och därmed inte granskad.** Granskningsetiketten får inte sättas
förrän den faktiska slutversionen är godkänd — den ordningen ska följas även här.

---

# F. AI-retrieval-QA (förväntad)

| Dimension | Bedömning |
|---|---|
| Direktsvar | Ett fristående stycke högst upp, citerbart utan kontext |
| Entitetsklarhet | `knäsmärta hos barn → belastning/växande/skada → klinisk bedömning → fysioterapeut/läkare/ortoped → bilddiagnostik endast vid indikation` |
| Frågeextraherbarhet | Åtta av tio H2 är naturliga föräldrafrågor med svaret i första meningen |
| Tvetydighet | Låg: "barn" kvalificeras genomgående; vuxenknä hänvisas explicit vidare |
| Semantisk täckning | knäsmärta, knäbesvär, Schlatter, växtvärk, hälta, svullnad, belastning, ortoped, fysioterapeut, röntgen, MR |
| Risk | Måste undvika att bli en Schlatter-sida — det skulle förstöra både ägande och extraherbarhet |

---

# G. Produktions-QA

Ej tillämplig — inget publicerat. Full QA enligt §38–39 körs vid bygget:
publikt HTTP 200 med cache-busting, canonical, exakt en H1, raw-HTML-kontroll av
att röd-flagg-avsnittet ligger före första CTA i DOM-ordning, sitemap,
artikellista, länkar 200, pelare↔spoke, FAQ/schema-paritet, källänkar utan
spårningsparametrar, samt visuell QA i Playwright på 390 px och desktop.

## Phase 0 — fynd på live produktion (§2)

| Sida | HTTP | Title | H1 | Canonical | reviewedBy | Cache |
|---|---|---|---|---|---|---|
| `/artiklar/barnortopedi` | 200 | Barnortopedi Göteborg – privat ortoped för barn | 1 st | korrekt | ja | ingen `Age` |
| `/specialiteter/ortoped/goteborg` | 200 | Privat ortoped Göteborg – boka direkt utan remiss | 1 st | korrekt | – | ingen `Age` |

Pelaren bekräftar att läkaren tar emot barn, använder korrekt titel (aldrig
`barnortoped` som yrkestitel), och länkar till den kommersiella sidan.

### ⚠️ Faktisk inkonsekvens att flagga

Båda live-sidorna **routar redan barn till bokning utan åldersgolv och utan
scope-avgränsning**, och pelaren anger dessutom pris (2 000 kr) för barnbesök.
Det är samma sak som §1/§7/§8 nu förbjuder för nya sidor.

Detta rapporteras men åtgärdas inte här (§2: skriv inte om sidor enbart för att
formuleringen kunde vara annorlunda — men detta är en faktisk inkonsekvens, inte
en formuleringsfråga). Så snart `BARN_AGE_FLOOR` och `BARN_SCOPE` är kända bör
**samma villkor propageras till de två befintliga sidorna**, inte bara till den
nya. Det är en enradig ändring på vardera sida.

---

# H. Nästa 3 spokes (byggs inte nu)

1. **`Schlatters sjukdom hos barn`** — namngiven diagnos, exakt i knä-scope,
   åldersband 8–15 år ligger sannolikt över golvet. Byggs **efter** knäsidan så
   att den kan länkas nedåt utan kannibalisering. SERP: MED–HIGH, tätt av
   behandlingssäljare men ingen ortopedgranskad.
2. **`Ryggont hos barn och tonåringar`** — matchar läkarens ryggkirurgikompetens,
   egen kroppsdel (ingen överlappning med knäspoken), och pelaren täcker det bara
   kort. Kontrollera gränsen mot `/artiklar/ont-i-ryggen-vilken-lakare` (vuxen).
3. **`Ont i hälen hos barn (Severs)`** — fot-scope, tydlig idrottskoppling, låg
   medicinsk risk, och en SERP som liknar Schlatters men tunnare.

Bygg dem **en i taget**, med SERP-kontroll per ämne — inte som en serie.

Avsiktligt **inte** på listan: `barn haltar`, `skolios barn`, `plattfot barn` —
skäl i avsnitt A3.

---

# I. Operatörssteg

## Krävs för att låsa upp bygget

1. **`BARN_AGE_FLOOR`** — lägsta ålder Dr. Sorkhabi tar emot. Exempelformat:
   `från 8 år`. Får inte gissas.
2. **`BARN_SCOPE`** — vilka barnortopediska besvär som faktiskt tas emot.
   Exempelformat: `knä, rygg, fot, idrottsskador inom rörelseapparaten`. Får inte
   härledas ur vuxenkompetens.

Med de två värdena kan artikeln skrivas, granskas, QA:as och deployas i ett svep.

## Rekommenderas samtidigt

3. Propagera samma ålders-/scope-villkor till `/artiklar/barnortopedi` och
   `/specialiteter/ortoped/goteborg` (avsnitt G).
4. `BARN_PRICE_DIGITAL` — finns digitalt barnbesök alls? Om nej: `ej aktuellt för
   barn`. Pelaren nämner i dag bara fysiskt pris, vilket är korrekt så länge
   digitalt inte erbjuds barn.

## Efter publicering

5. GSC → URL Inspection → Request Indexing för den nya URL:en. Görs manuellt av
   operatören; ingen automatik.
6. Ahrefs-uppslag på `ont i knät barn`, `knäsmärta barn`, `schlatterknä` för
   volym/KD. **Ahrefs-connectorn i claude.ai är inte auktoriserad** — den behöver
   godkännas i claude.ai:s connector-inställningar innan den kan användas.

---

# J. Verdict

> **PARTIAL — AGE/SCOPE CONFIRMATION REQUIRED**

Ämnet är valt på evidens, specifikationen är komplett och
kannibaliseringsgränserna är satta. Publicering är blockerad av en enda sak: en
kommersiell barn-CTA får inte gå live innan det är känt vilka åldrar och vilka
tillstånd som faktiskt kan tas emot.
