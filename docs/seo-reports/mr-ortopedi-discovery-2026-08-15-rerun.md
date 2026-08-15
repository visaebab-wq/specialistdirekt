# VERDICT

| | |
|---|---|
| **Status** | **COMPLETE** |
| **Chosen next move** | **Option C — NO-NEW-ARTICLE** |
| **Chosen URL** | **`/specialiteter/ortoped/goteborg`** (stärk den) |
| GSC-underlag | `Queries.csv`, `Pages.csv`, `Chart.csv`, `Devices.csv`, `Countries.csv` |
| GSC-datumintervall | **2026-06-20 – 2026-08-12** (54 dagar – propertyn har ingen data före 20 juni) |
| Körningsdatum | 2026-08-15 (slutdatum 3 dagar gammalt → grinden i §0 passerad) |
| Sajtens totaler i fönstret | **62 klick / 8 375 impressions / CTR 0,74 %** |

## Kort motivering

**MR-klustret har i praktiken ingen efterfrågan att bygga på.** Samtliga MR-relaterade
frågor i exporten summerar till **23 impressions, 0 klick, viktad position 51,1**.
Ortopedin har 13× mer efterfrågan (315 impressions). Att publicera ännu en
MR-artikel – eller att bygga vidare på `/privat-mr` – går inte att motivera med data.

`/privat-mr`, `/artiklar/mr-utan-remiss`, `/artiklar/mr-kna-vad-visar` och
`/artiklar/barnortopedi` finns **inte alls** i exporten: de publicerades efter
fönstrets slut. De har alltså varken bevisad eller motbevisad efterfrågan än.

Den enskilt största outnyttjade tillgången är i stället en sida som redan finns:
`/specialiteter/ortoped/goteborg` har **270 impressions – flest av alla
ortopedisidor – men viktad position 40,4 och 1 klick**. Efterfrågan finns, ägaren
finns, rankningen gör den värdelös.

## Top-3

| # | Möjlighet | Klass | Evidens (GSC) | Poäng | Rekommendation |
|---|---|---|---|---|---|
| 1 | Ortoped Göteborg – lokal kommersiell | **B** | 191 impr / 0 klick / viktad pos **41,3**; ägarsidan 270 impr, pos 40,4 | **8** | Stärk `/specialiteter/ortoped/goteborg` |
| 2 | Topp-10-sidor utan klick (CTR-reparation) | **A** | 16 sidor, **277 impr, 0 klick**, snittposition ≤10 | **7** | Title/meta på befintliga URL:er – inget nytt innehåll |
| 3 | "vad gör en ortoped" – informativt | **D** | 46 impr / 0 klick / viktad pos ~30 | **6** | Vänta. Enda äkta gapet, men svagast kommersiellt |

## Operatörens manuella kontroller

Se avsnitt 12. Kortversion: två Ahrefs-uppslag och tre GSC-UI-kontroller för
MED/LOW-konfidensmappningar. Inget annat.

---

# 1. Inventering

Oförändrad sedan förra körningen (2026-08-15, BLOCKED-INPUT-rapporten): 23
relevanta URL:er, samtliga HTTP 200, indexerbara, ingen CDN-cache. Sedan dess har
`/artiklar/barnortopedi` tillkommit (publicerad 2026-08-15, alltså också utanför
GSC-fönstret).

## Sidor i MR/ortopedi-klustret enligt GSC

| Sida | Klick | Impr | Pos |
|---|---:|---:|---:|
| `/specialiteter/ortoped/goteborg` | 1 | **270** | 40,4 |
| `/specialiteter/ortoped/malmo` | 1 | 151 | 28,7 |
| `/artiklar/privat-ortoped-kostnad` | 2 | 148 | 12,9 |
| `/specialiteter/ortoped` | 0 | 62 | 25,4 |
| `/specialiteter/ortoped/linkoping` | 2 | 60 | 14,7 |
| `/artiklar/vilken-lakare-knasmarta` | **0** | 57 | **10,6** |
| `/specialiteter/ortoped/orebro` | 1 | 53 | 12,8 |
| `/specialiteter/ortoped/karlstad` | 0 | 41 | 17,5 |
| `/artiklar/privat-mr-rygg-kostnad` | 1 | 40 | 26,5 |
| `/artiklar/privat-mr-kostnad` | **0** | 39 | **8,1** |
| `/specialiteter/ortoped/molndal` | 1 | 21 | 33,8 |
| `/specialiteter/ortoped/uppsala` | 0 | 20 | 30,3 |
| `/artiklar/ortoped-utan-remiss` | 0 | 13 | 19,0 |
| `/en/private-orthopedist-gothenburg` | 1 | 13 | 9,9 |
| `/lakare/masoud-sorkhabi` | 0 | 4 | 6,5 |
| `/specialiteter/smartlakare` | 0 | 3 | 12,3 |
| `/artiklar/privat-smartlakare-kostnad` | 0 | 3 | 5,0 |
| `/specialiteter/ortoped/stockholm` | 0 | 1 | 6,0 |
| `/artiklar/ryggsmarta-ortoped-eller-fysioterapeut` | 0 | 1 | 8,0 |
| **Summa** | **10** | **1 000** | CTR 1,00 % |

Klustret står för **12 % av sajtens impressions** och **16 % av klicken**.

**ABSENT i fönstret** (publicerade efteråt, alltså ingen data): `/privat-mr`,
`/artiklar/mr-utan-remiss`, `/artiklar/mr-kna-vad-visar`, `/artiklar/barnortopedi`.

---

# 2. Intern länkgraf

Oförändrad sedan förra rapporten. Sammanfattning: `/privat-mr` har **5**
inkommande interna länkar; MR-artiklarna har 12–20. Ingen av de åtta
ortopedsidorna länkar till `/privat-mr`.

**Ny bedömning i ljuset av data:** det är inte längre den viktigaste bristen.
Att pumpa intern auktoritet mot `/privat-mr` skulle rikta länkkraft mot ett
kluster med 23 impressions. Åtgärden nedprioriteras tills MR-klustret visar
efterfrågan (se §10, Class D-MR).

---

# 3. GSC-klusteranalys

Impressionsviktad position genomgående (aldrig enkelt medelvärde).

| Kluster | Klick | Impr | Viktad pos |
|---|---:|---:|---:|
| **MR / bilddiagnostik** | 0 | **23** | **51,1** |
| Ortoped Göteborg (lokalt kommersiellt) | 0 | 191 | 41,3 |
| Ortoped nationellt / informativt | 0 | 124 | 36,0 |
| Knä/rygg-symtom (ortopedisk routing) | 0 | 19 | 39,4 |
| Barnortopedi | 0 | 1 | 23,0 |
| *(jämförelse)* ADHD/NPF | 0 | 642 | 63,9 |

## 3a. MR-klustret i sin helhet

Detta är **samtliga** MR-/röntgenfrågor i exporten:

| Fråga | Klick | Impr | Pos |
|---|---:|---:|---:|
| mr rygg | 0 | 16 | 50,5 |
| stående mr sverige | 0 | 2 | 73,5 |
| mr rygg pris | 0 | 1 | 40,0 |
| vad kostar magnetröntgen privat | 0 | 1 | 27,0 |
| vad kostar magnetröntgen med remiss | 0 | 1 | 27,0 |
| vad kostar röntgen med remiss | 0 | 1 | 66,0 |
| mri scan cost | 0 | 1 | 60,0 |

Noll förekomster av: *MR knä, MR axel, MR höft, MR nacke, MR menisk, MR korsband,
MR utan remiss, magnetkamera privat, MR svar, vad visar MR, MR ortoped.*

Det betyder inte att sökvolym saknas nationellt – GSC visar bara var **den här
sajten** syns. Men det betyder att sajten i dag inte har någon synlighet alls att
bygga vidare på i MR-klustret, och att inget MR-ämne kan rankas som Top-3 på
evidens.

## 3b. Öppen query-mining – vad datan faktiskt visade

Utöver den fastställda listan sökte jag brett. Fynd som inte fanns i uppdragets
lista:

- **`ortopedi göteborg akut` (46 impr, pos 39,1)** är den enskilt största
  Göteborgs-ortopedfrågan – större än `ortoped göteborg` (44). Akutintent, som
  sajten varken kan eller bör betjäna kommersiellt. Ska besvaras med tydlig
  akut-routing, inte med bokningserbjudande.
- **`ortopeder göteborg anslutna till försäkringskassan` (4 impr, pos 29,8)** och
  flera försäkringsfrågor – en sub-intent ingen sida äger.
- **`barnortopedi malmö` (1 impr, pos 23)** – enda barnortopedifrågan i hela
  fönstret. Den nyss publicerade `/artiklar/barnortopedi` har alltså ~1
  impressions demand floor bakom sig, och den är dessutom Malmö, inte Göteborg.
- **Mobil vs desktop:** mobil 44 klick / 2 580 impr / pos 27,9. Desktop 18 klick /
  5 731 impr / pos 53,0. Nästan all faktisk trafik är mobil; desktop-impressions
  är mest djupa positioner.

## 3c. Class E-kontroll (andrabedomning.se)

**Noll** förekomster i exporten av: second opinion, andra bedömning, ny medicinsk
bedömning, granska diagnos, granska MR-svar, osäker på MR-svar, alternativ till
operation, omoperation. Ingen intent behövde exkluderas – men regeln i
`docs/content-ownership.md` §2 gäller fortsatt för framtida innehåll.

---

# 4. Ägarklassificering

| Intent | Klass | Ägare | Motivering |
|---|---|---|---|
| Ortoped Göteborg, lokalt kommersiellt | **B** | `/specialiteter/ortoped/goteborg` | Rätt ägare finns; viktad pos 41,3 (sämre än B-bandets 11–30, men logiken är densamma: stärk – duplicera aldrig) |
| Privat ortoped, pris | **A** | `/artiklar/privat-ortoped-kostnad` | Pos 12,9, 2 klick – bäst presterande ortopedsidan |
| Knäsmärta-routing | **A (CTR-defekt)** | `/artiklar/vilken-lakare-knasmarta` | Pos 10,6 med 57 impr och **0 klick** |
| Privat MR, pris | **A (CTR-defekt)** | `/artiklar/privat-mr-kostnad` | Pos 8,1 med 39 impr och **0 klick** |
| MR rygg | **B** | `/artiklar/privat-mr-rygg-kostnad` | Pos 26,5; `mr rygg` (16 impr) ligger på pos 50,5 → sannolikt annan sida som rankar. **Manuell GSC-kontroll krävs** |
| "vad gör en ortoped" m.fl. | **D** | ingen | Hubben `/specialiteter/ortoped` är kommersiell, inte en förklaringssida |
| Ortopedi Göteborg **akut** | **D (bör ej tas)** | ingen | Akutintent – sajten ska inte konkurrera om den |
| MR knä / axel / höft / MR-svar | **D utan efterfrågan** | (nya sidor finns) | 0 impressions i fönstret. Class D ≠ möjlighet när demand floor är noll |
| Second opinion-banan | **E** | andrabedomning.se | Förekom inte i datan |

---

# 5. SERP-recon

Metod: WebSearch (R5 – ingen headless-scraping av google.se). Approximerar svenska
resultat; se §13 om konfidens.

## `ortoped göteborg` / `ortoped göteborg privat boka tid`

| Resultat | Domän | Typ | Intent-match | Auktoritet | Svaghet |
|---|---|---|---|---|---|
| Aleris Axesshuset | aleris.se | Klinik, digital bokning | Hög | Mycket hög | – |
| Vården.se | varden.se | Aggregator | Hög | Hög | Tunn per klinik |
| Ortomed | ortomed.se | Klinik + priser (930/790 kr) | Hög | Medel | – |
| **NoPainClinic** | nopainclinic.se | **Dr. Sorkhabis egen klinik** | Hög | Medel | – |
| Ortopedimottagning Sahlgrenska | 1177.se | Offentlig vård | Medel | Mycket hög | Ej privat |
| Capio Ortho Center | capio.se | Klinik | Hög | Mycket hög | – |
| Vasakliniken | vasakliniken.se | Klinik | Hög | Hög | – |

**Svårighet: HIGH. Konfidens: HIGH.**

Kritiskt fynd: **den läkare Specialistdirekt förmedlar till rankar redan själv på
sida 1** med sin egen klinik. Sajten konkurrerar alltså om samma fråga som sin
egen leverantör, med ett extra mellanled och utan möjlighet att visa klinikens
namn/adress. Google har redan de faktiska vårdgivarna på sida 1; en förmedlare
måste erbjuda något annat än ännu en "boka tid"-sida för att ta plats.

## `vad gör en ortoped`

| Resultat | Domän | Typ | Intent-match | Medicinsk auktoritet | Svaghet |
|---|---|---|---|---|---|
| Indeed karriärråd | se.indeed.com | **Jobbguide** | Låg (patient) | Ingen | Yrkes-/karriärvinkel |
| Joint Academy | jointacademy.com | Kommersiell (artros) | Delvis | Medel | Endast artros |
| Jobbland yrkesguide | jobbland.se | **Jobbguide** | Låg | Ingen | Karriär |
| Medrek | medrek.se | **Rekrytering** | Låg | Ingen | Karriär |
| Gymnasium.se | gymnasium.se | **Utbildningsguide** | Låg | Ingen | "Så blir du ortoped" |
| Vården.se blogg | varden.se | Blogg | Medel | Låg | Ortoped vs ortopedingenjör |

**Svårighet: MED. Konfidens: MED.**

Detta är en tydlig SERP-svaghet enligt §14: fyra av sex resultat är karriär- och
rekryteringssidor för en fråga som en patient ställer innan hen bokar. Ingen har
medicinsk granskare, och ingen kopplar svaret till nästa steg (när ska jag söka,
behöver jag remiss, vart går jag).

---

# 6. AI-sökanalys

## Möjlighet 1 – Göteborgssidan

Entitetsrelationen finns redan (ortoped → Göteborg → ingen remiss → pris →
bokning) men är svår för en AI att citera eftersom vårdgivaren beskrivs
inkonsekvent på sajten och kliniknamnet saknas. En AI kan svara "vem" bara genom
läkarens namn – inte genom en mottagning med adress, vilket är vad de flesta
konkurrentsidor erbjuder. **AI-möjlighet: MEDEL.**

## Möjlighet 2 – CTR-reparation

Påverkar inte AI-retrieval alls; sidorna är redan indexerade och rankar.
**AI-möjlighet: LÅG** (men kostnaden är nära noll).

## Möjlighet 3 – "vad gör en ortoped"

Starkast av de tre för AI: frågan är en ren naturlig-språk-fråga, svaret är ett
kort answer-unit, och entiteterna (ortoped → rörelseapparat → utredning →
behandling → när remiss behövs → var man bokar) är exakt den typ av kedja
AI-system citerar. Ingen av dagens rankande sidor är medicinskt granskad.
**AI-möjlighet: HÖG.** Men se poängsättningen: kommersiell närhet är låg.

---

# 7. Opportunity cards

## Möjlighet 1 — Ortoped Göteborg, lokal kommersiell

- **Klass:** B — OWNED-WEAK
- **Nuvarande ägare:** `/specialiteter/ortoped/goteborg`
- **GSC:** kluster 191 impr / 0 klick / viktad pos 41,3. Ägarsidan: 1 klick, 270
  impr, pos 40,4. Representativa frågor: `ortopedi göteborg akut` (46, 39,1),
  `ortoped läkare göteborg` (45, 35,0), `ortoped göteborg` (44, 45,2),
  `ryggspecialist göteborg` (7, 56), `ortoped göteborg privat` (6, 38).
- **Intent:** lokal kommersiell, hitta/boka ortoped i Göteborg.
- **Funnel:** botten.
- **Kommersiellt värde:** högst av allt i datan – detta är den enda vertikal där
  sajten har verifierat utbud och en faktisk bokningsväg.
- **SERP-svårighet:** HIGH (HIGH konfidens).
- **AI-möjlighet:** MEDEL.
- **Kannibalisering:** ingen ny URL föreslås → ingen risk. Prisintent ligger kvar
  på `/artiklar/privat-ortoped-kostnad`, remissintent på `/artiklar/ortoped-utan-remiss`.
- **andrabedomning.se:** ingen konflikt.
- **Rekommenderad åtgärd:** **stärk befintlig URL.**
- **Vad ägaren saknar (§21, precist – inte "skriv om sidan"):**
  1. **Ingen sida äger `ortopedi göteborg akut` (46 impr).** Sidan saknar ett
     tydligt akut-avsnitt som svarar "det här är inte akutvård – gör så här i
     stället". I dag matchar Google frågan mot en bokningssida, vilket ger 0 klick.
  2. **Försäkringsintenten saknas** (`ortopeder göteborg anslutna till
     försäkringskassan`, `privat sjukvårdsförsäkring`) – finns bara som en kort FAQ.
  3. **`ryggspecialist göteborg` (7 impr, pos 56) och `ryggkirurgi göteborg`**
     matchar läkarens faktiska kompetens (ryggkirurgi) men syns inte i sidans
     rubriker.
  4. Title är `Privat ortoped Göteborg – boka direkt utan remiss`. Sidan rankar
     på pos 40 – detta är i första hand ett relevans-/auktoritetsproblem, inte
     ett title-problem. Titeländring ensam löser inget.
- **Auktoritetsflöde:** ortopedartiklarna länkar redan hit via relaterade-block;
  variera ankartexterna (i dag identiska från 11 sidor).
- **Granskarkrav:** ingen ny medicinsk text krävs för åtgärd 1–3 utöver
  akut-routing, som bör följa 1177:s formuleringar. Dr. Sorkhabi inom sin kompetens.
- **Poäng:** demand 2 + kommersiell 3 + winnability 1 + kluster 2 + AI 1 − kannib. 0 = **8/15**

## Möjlighet 2 — Topp-10-sidor utan klick (CTR-reparation)

- **Klass:** A — OWNED-STRONG med CTR-defekt
- **GSC:** **16 sidor med snittposition ≤10, 277 impressions, 0 klick.** I
  klustret: `/artiklar/privat-mr-kostnad` (39 impr, pos 8,1),
  `/artiklar/vilken-lakare-knasmarta` (57 impr, pos 10,6),
  `/artiklar/privat-smartlakare-kostnad` (3, pos 5,0), `/lakare/masoud-sorkhabi`
  (4, pos 6,5). Utanför klustret samma mönster: `privat-urolog-kostnad` (41, 7,7),
  `privat-reumatolog-kostnad` (35, 7,8), `privat-koloskopi-kostnad` (16, 5,9).
- **Intent:** varierar; gemensamt att sidan redan rankar men inte klickas.
- **Kommersiellt värde:** medelhögt – men **kostnaden är nästan noll** och ingen
  ny rankning behövs.
- **SERP-svårighet:** ej tillämplig (sidorna rankar redan).
- **AI-möjlighet:** LÅG.
- **Kannibalisering:** ingen.
- **Rekommenderad åtgärd:** **stärk befintliga URL:er** – title/meta/snippet.
- **Vad ägarna saknar:** titlarna är byggda för sökord, inte för klick. Flera är
  nästan identiska (`Privat X – kostnad, väntetid & …`) vilket gör dem osynliga i
  en SERP där konkurrenterna anger konkreta priser. Datan pekar ut mönstret; exakt
  vilken fråga varje sida rankar på kräver GSC-UI-kontroll (se §12).
- **Poäng:** demand 2 + kommersiell 2 + winnability 3 + kluster 1 + AI 0 − kannib. 0 = **7/15** (utan ranking-risk)

## Möjlighet 3 — "vad gör en ortoped" (informativt)

- **Klass:** D — UNOWNED
- **GSC:** `vad gör en ortoped` (21, 28,9), `vad är en ortoped` (9, 54,3),
  `vad gör ortopeden` (5, 12,0), `vad gör en ortopedläkare` (4, 23,0),
  `vad är ortoped` (3, 32,0), `vad är ortopedi` (2, 44,5), `vad gör man hos en
  ortoped` (1, 54,0), `vad gör en ortoped?` (1, 1,0). **Summa 46 impr, 0 klick,
  viktad pos ~30.**
- **Intent:** informativt, tidigt i funneln, blandat patient/karriär.
- **Kommersiellt värde:** LÅGT–MEDEL. Kan routa till ortopedhubben och vidare
  till Göteborg, men konverterar inte direkt.
- **SERP-svårighet:** MED (MED konfidens) – incumbenterna är jobbsajter.
- **AI-möjlighet:** HÖG.
- **Kannibalisering:** måste hållas isär från `/specialiteter/ortoped` (kommersiell
  hubb, "hitta och boka") och från `/artiklar/ortoped-utan-remiss` (remissvägen).
  Får inte ta pris- eller bokningsintent.
- **Rekommenderad åtgärd:** **vänta.** Se §8.
- **Poäng:** demand 1 + kommersiell 1 + winnability 2 + kluster 1 + AI 3 − kannib. 1 = **6/15**

---

# 8. Varför inte ett nytt MR-ämne – och varför inte `/privat-mr` ännu

Uppdraget frågade specifikt om nästa MR-artikel eller förstärkning av `/privat-mr`.
Svaret på båda är nej, av två olika skäl:

**Ny MR-artikel:** MR-klustret har 23 impressions och 0 klick i 54 dagar. Att
välja nästa ämne därifrån vore precis det den bindande principen förbjuder – att
välja från en lista i stället för från evidens. `MR axel`, `MR höft` och `MR-svar`
har **noll** impressions.

**Förstärkning av `/privat-mr`:** sidan finns inte i exporten alls (publicerad
efter fönstret). Att optimera en sida utan en enda datapunkt är gissning. Rätt
åtgärd är att **vänta 4–6 veckor och köra om denna analys** – då finns ett
fönster där `/privat-mr`, `mr-utan-remiss`, `mr-kna-vad-visar` och `barnortopedi`
har hunnit indexeras och samla impressions. Först då går det att säga om
MR-satsningen bär.

Det är också värt att notera var efterfrågan faktiskt finns: **ADHD/NPF-klustret
har 642 impressions** – 28× MR-klustret – på viktad position 63,9. Det ligger
utanför detta uppdrags scope, men om målet är trafik snarare än MR-vertikalen är
det där det största outnyttjade utrymmet ligger. Rekommenderas som eget
discovery-uppdrag, inte som en sidoåtgärd här.

---

# 9. Kannibaliseringsanalys

Ingen ny URL rekommenderas → ingen ny kannibaliseringsrisk införs.

Kontroll av befintliga ägare mot varandra:

| Risk | Bedömning |
|---|---|
| `/privat-mr` vs `/artiklar/privat-mr-kostnad` | Kan inte bedömas – `/privat-mr` saknar data. Bevaka i nästa körning: om båda börjar ranka på `privat MR` är det Class C |
| `mr rygg` (16 impr, pos 50,5) vs `/artiklar/privat-mr-rygg-kostnad` (pos 26,5) | Positionsgapet antyder att en **annan** sida rankar på `mr rygg`. **Manuell GSC-kontroll krävs** |
| `/specialiteter/ortoped` vs `/specialiteter/ortoped/goteborg` | Ingen konflikt i datan – hubben rankar på generiska frågor (pos 25,4), stadssidan på Göteborgsfrågor |
| `/artiklar/mr-kna-vad-visar` vs `/artiklar/vilken-lakare-knasmarta` | Ingen data ännu. Bevaka: knä-routing vs MR-diagnostik måste förbli åtskilda |
| `/artiklar/barnortopedi` vs `/specialiteter/ortoped/goteborg` | Ingen data ännu. Artikeln är nationell + routing, stadssidan lokal + bokning |

---

# 10. Slutlig rekommendation

> **NO-NEW-ARTICLE — stärk `/specialiteter/ortoped/goteborg` i stället.**

Konkret, i prioritetsordning:

1. Ge sidan ett akut-avsnitt som ärligt svarar på `ortopedi göteborg akut`
   (46 impr) med routing till akutvård/1177 – inte med ett bokningserbjudande.
2. Täck försäkringsintenten explicit.
3. Lyft ryggkirurgi-kompetensen till rubriknivå (`ryggspecialist göteborg`,
   `ryggkirurgi göteborg` – 9 impr, pos 56–58).
4. Parallellt, som separat och nästan gratis insats: title/meta för de 16
   topp-10-sidorna utan klick.

**Gör inte** detta nu: ny MR-artikel, ny barnortopedi-sida, nya kroppsdelssidor,
intern länkomdirigering mot `/privat-mr`.

**Kör om analysen omkring 2026-09-26** (≈6 veckor) med ett fönster som täcker de
fyra nypublicerade sidorna.

---

# 11. Granskarkrav

| Åtgärd | Granskning |
|---|---|
| Akut-routing på Göteborgssidan | Bör följa 1177:s formuleringar; medicinsk granskning **krävs** |
| Försäkrings-/ryggkirurgi-text | Ingen ny klinisk utsaga → ingen granskning utöver befintlig |
| Title/meta-ändringar | Ingen |
| (Framtida) "vad gör en ortoped" | Medicinsk granskning krävs; inom Dr. Sorkhabis kompetens |

Distinktionen radiolog/ortoped berörs inte av någon rekommendation här.

---

# 12. Manuella kontroller

## Ahrefs (endast dessa två)

1. `ortoped göteborg` + `ortoped läkare göteborg` + `ortopedi göteborg akut` –
   svensk volym och KD. Avgör om Möjlighet 1 är värd insatsen mot en SERP med
   Aleris/Capio/Vården.se.
2. `vad gör en ortoped` – volym och KD. Avgör om Möjlighet 3 någonsin ska byggas.

## GSC UI (endast MED/LOW-konfidensmappningar som påverkar rankningen)

1. Performance → Pages → `/specialiteter/ortoped/goteborg` → Queries. Verifiera
   att `ortopedi göteborg akut`, `ortoped läkare göteborg` och `ortoped göteborg`
   faktiskt tillhör den sidan. *(MED konfidens – styr Möjlighet 1.)*
2. Performance → Queries → filter `mr rygg` → Pages. Ta reda på vilken sida som
   rankar på pos 50,5. *(LOW konfidens – styr kannibaliseringsbedömningen.)*
3. Performance → Pages → `/artiklar/privat-mr-kostnad` och
   `/artiklar/vilken-lakare-knasmarta` → Queries. Vilka frågor ger topp-10 utan
   klick? *(MED konfidens – styr Möjlighet 2:s title-arbete.)*

Ingen begäran om indexering – inget har ändrats.

---

# 13. Begränsningar

**GSC-fönstret är 54 dagar, inte 90.** Filtret var "Last 3 months", men propertyn
har ingen data före 2026-06-20. Alla absoluta tal ska läsas mot det.

**Ingen query×page-join.** Standardexporten saknar den. Alla kopplingar mellan
frågekluster och ägarsida är konfidensmärkta; de tre som påverkar slutsatsen
finns i §12.

**Impressions är ett efterfrågegolv,** inte sökvolym. Att MR-klustret har 23
impressions betyder att *sajten* knappt syns – inte att svenskar inte söker på MR.
Ahrefs är utestående.

**Fyra sidor saknas helt** ur underlaget (publicerade efter fönstret):
`/privat-mr`, `/artiklar/mr-utan-remiss`, `/artiklar/mr-kna-vad-visar`,
`/artiklar/barnortopedi`. Slutsatsen "investera inte mer i MR" gäller **på
nuvarande evidens** och ska omprövas när de fått data.

**Sajten är ung och volymerna små** – 62 klick totalt. Enskilda tal är brusiga;
slutsatserna vilar på storleksordningar (23 vs 191 vs 642 impressions), inte på
enskilda rader.

**SERP.** WebSearch approximerar svenska Google men är inte identisk med en
personaliserad google.se-SERP. Svårighetsgrad är konfidensmärkt i §5. Ingen
headless-browser användes (R5).

**Scope.** Read-only. Inget innehåll, ingen länk, ingen `content-ownership.md`,
ingen deploy ändrades i denna körning. Datumfältet i leadformuläret berördes inte
(R6). Playwright/Chromium lämnades installerat och orört (R5).

---

# 14. Självgranskning (§31)

| Fråga | Svar |
|---|---|
| Färsk faktisk GSC-data? | Ja – 2026-06-20–2026-08-12, slutdatum 3 dagar gammalt |
| A–E-klassificering på varje meningsfull query? | Ja – §4 |
| Kandidat jämförd mot alla befintliga ägare? | Ja – §9 |
| andrabedomning.se uteslutet? | Ja – noll förekomster i datan; regeln kvarstår |
| Aktuella svenska SERP:ar inspekterade? | Ja – två, med WebSearch; inga konkurrenter påstådda ur minnet |
| Kommersiellt relevant? | Ja – rekommendationen pekar på den enda vertikal med verifierat utbud |
| AI-retrieval bedömd? | Ja – §6, och den vann inte ensam (Möjlighet 3 nedprioriterad trots högst AI-poäng) |
| Medicinskt djup vs granskning? | Ja – §11; akut-routing kräver granskning |
| Playwright/Chromium och datumfält orörda? | Ja |
| Skulle jag rekommendera detta även om nya artiklar vore förbjudna? | **Ja – rekommendationen innehåller ingen ny artikel** |
