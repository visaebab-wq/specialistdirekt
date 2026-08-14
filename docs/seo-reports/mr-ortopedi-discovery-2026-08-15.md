# VERDICT

| | |
|---|---|
| **Status** | **BLOCKED-INPUT** |
| **Chosen next move** | **NONE** – urvalsgrinden (§0) passerades aldrig |
| **Chosen URL/topic** | **NONE** |
| **Top-3** | Kan inte produceras – se nedan |
| Körningsdatum | 2026-08-15 |
| Faser genomförda | Fas 1 (inventering) + intern länkgraf. Fas 2 (GSC), Fas 3 (SERP), scoring och opportunity cards **ej körda**. |

## Varför BLOCKED-INPUT

`GSC_EXPORT_PATH` och `GSC_DATE_RANGE` levererades som ifyllda platshållare
(`"/ACTUAL/PATH/TO/FRESH/GSC/EXPORT/"` respektive `"YYYY-MM-DD – YYYY-MM-DD"`).

Sökning i filsystemet efter en faktisk export gav inget träffande underlag:

```
find /root /tmp /home /mnt /srv /opt -maxdepth 5 \
  \( -iname "Queries.csv" -o -iname "Pages.csv" -o -iname "*gsc*" \
     -o -iname "*search-console*" \) → 0 träffar
```

Den enda GSC-liknande exporten på maskinen är
`/root/project-artifact-hold/swepto/swepto.se-Performance-on-Search-2026-07-17.zip`.
Den är **fel property** (swepto.se, inte specialistdirekt.se) och **29 dagar
gammal** – den bryter mot både property-kravet och 14-dagarsgränsen.

Enligt §0 HARD INPUT GATE och R3 görs därför **ingen** efterfrågeanalys:
inga uppskattade volymer, inga gissade positioner, inga påhittade kluster.

## Så låser operatören upp körningen

1. Google Search Console → property `specialistdirekt.se` → Prestanda → Sökresultat.
2. Datumintervall: senaste 3 månaderna (slutdatum får inte vara äldre än 14 dagar).
3. Exportera → CSV/zip. Paketet ska innehålla `Queries.csv` och `Pages.csv`.
4. Packa upp på servern, t.ex. `/root/gsc-specialistdirekt-<ÅÅÅÅ-MM-DD>/`.
5. Kör om uppdraget med den faktiska sökvägen och det **datumintervall som står i
   exporten** – inte ett antaget intervall.

Allt nedan är redan gjort och behöver inte köras om.

---

# 1. Inventering (Fas 1)

Källa: produktionens `sitemap.xml` (147 URL:er) filtrerad på begreppslistan i §3,
därefter verifierad live med `curl` – inte enbart mot källkoden.

**23 relevanta URL:er. Samtliga HTTP 200, samtliga indexerbara (ingen `noindex`),
ingen med `Age`-header → ingen CDN-cachad/inaktuell kopia.**

| URL | Typ | Title (live) |
|---|---|---|
| `/privat-mr` | Tjänst/bokning | Boka privat MR – magnetkamera, bedömning och remiss |
| `/artiklar/privat-mr-kostnad` | Artikel (pris) | Privat MR: kostnad, väntetid & magnetkamera |
| `/artiklar/privat-mr-rygg-kostnad` | Artikel (pris, rygg) | Privat MR rygg: kostnad, remiss och bokning |
| `/artiklar/mr-utan-remiss` | Artikel (process) | MR utan remiss – så fungerar privat magnetröntgen 2026 |
| `/artiklar/mr-kna-vad-visar` | Artikel (diagnostik, knä) | MR knä – vad visar magnetkameran? \| Specialistdirekt |
| `/artiklar/vilken-lakare-knasmarta` | Artikel (routing, knä) | Vilken läkare för knäsmärta? Så väljer du rätt |
| `/artiklar/ont-i-ryggen-vilken-lakare` | Artikel (routing, rygg) | Ont i ryggen – vilken läkare? Vårdcentral, ortoped & m… |
| `/artiklar/ryggsmarta-ortoped-eller-fysioterapeut` | Artikel (val av vårdgivartyp) | Ryggsmärta – ortoped eller fysioterapeut? Så väljer du |
| `/artiklar/ortoped-utan-remiss` | Artikel (process, ortoped) | Ortoped utan remiss – så bokar du privat själv |
| `/artiklar/privat-ortoped-kostnad` | Artikel (pris, ortoped) | Privat ortoped kostnad – pris, väntetid & boka besök |
| `/artiklar/privat-smartlakare-kostnad` | Artikel (pris, smärta) | Privat smärtläkare – kostnad, remiss & hur du bokar |
| `/artiklar/domningar-hander-fotter-vilken-lakare` | Artikel (routing, neurologi) | Domningar i händer och fötter – vilken läkare? |
| `/specialiteter/ortoped` | Specialitetshubb | Ortoped – hitta och boka ortopedi |
| `/specialiteter/ortoped/goteborg` | Stad + kommersiell | Privat ortoped Göteborg – boka direkt utan remiss |
| `/specialiteter/ortoped/{karlstad, linkoping, malmo, molndal, orebro, stockholm, uppsala}` | Stadssidor (7 st) | "Privat ortoped i X – hitta och boka" (Örebro avviker: "– pris, remiss och boka tid") |
| `/specialiteter/smartlakare` | Specialitetshubb | Smärtläkare och smärtmottagning – hitta rätt specialist |
| `/specialiteter/smartlakare/goteborg` | Stad + kommersiell | Privat smärtläkare i Göteborg – ortoped och ryggkirurg |

Medicinsk granskare: `src/lib/medical-reviewer.ts` sätter **Dr. Masoud Sorkhabi,
specialist i ortopedi och ryggkirurgi** på *samtliga* artiklar (ej på
tjänste-/stadssidor). Se även governance-observationen i avsnitt 4.

## 1b. Obligatorisk URL-verifiering (§4) – faktiska slugar

| Koncept | Faktisk produktions-URL |
|---|---|
| Privat MR – tjänst/bokning | `/privat-mr` |
| Privat MR – kostnad | `/artiklar/privat-mr-kostnad` |
| MR utan remiss | `/artiklar/mr-utan-remiss` |
| MR knä | `/artiklar/mr-kna-vad-visar` |
| MR rygg | `/artiklar/privat-mr-rygg-kostnad` ⚠️ **pris-vinklad, inte en ren "MR rygg"-informationssida** |
| Knäsmärta | `/artiklar/vilken-lakare-knasmarta` |
| Ryggsmärta | **två URL:er**: `/artiklar/ont-i-ryggen-vilken-lakare` + `/artiklar/ryggsmarta-ortoped-eller-fysioterapeut` |
| Privat ortoped – kostnad | `/artiklar/privat-ortoped-kostnad` |
| Ortopedihubb | `/specialiteter/ortoped` |
| Ortoped Göteborg | `/specialiteter/ortoped/goteborg` |
| Övriga ortopedstäder | Karlstad, Linköping, Malmö, Mölndal, Örebro, Stockholm, Uppsala |

### ABSENT – koncept utan egen URL (data, inte fel)

Ingen sida äger idag: **MR axel**, **MR höft**, **MR nacke/halsrygg**,
**MR menisk**, **MR korsband**, **MR-svar / vad händer efter MR**,
**MR eller röntgen**, samt en **radiologi-/bilddiagnostikhubb**.

Frånvaron är indata till ägarklassificeringen (§10) – men får **inte** tolkas som
en gap-rekommendation utan GSC-belägg. Flera av dem kan visa sig sakna
efterfrågan, eller täckas av befintlig sida.

---

# 2. Intern länkgraf – faktiskt läge

Metod: hämtade samtliga 23 URL:er + startsidan från produktion och extraherade
`<a href>` mot MR-klustrets fem noder, med ankartext.

| Målsida | Roll | Inkommande interna länkar |
|---|---|---|
| `/artiklar/mr-utan-remiss` | Remiss-/process-intent | **20** |
| `/artiklar/privat-mr-kostnad` | Pris-/jämförelse-intent | **18** |
| `/artiklar/privat-mr-rygg-kostnad` | Pris, rygg | **15** |
| `/artiklar/mr-kna-vad-visar` | Diagnostik, knä | **12** |
| **`/privat-mr`** | **Transaktionell (bokning)** | **5** |

## Observation L1 – transaktionsflödet är klustrets svagaste nod

De åtta ortopedsidorna (`/specialiteter/ortoped` + 7 stadssidor) länkar **alla**
till MR-kostnadsartikeln, MR-rygg-artikeln, MR-utan-remiss och MR-knä – men
**ingen av dem länkar till `/privat-mr`**.

Bokningsintentens auktoritetsflöde kommer i dag enbart från:

```
/                            → "Boka privat MR"
/artiklar/mr-utan-remiss     → "boka privat MR"
/artiklar/privat-mr-kostnad  → "boka privat MR"
/artiklar/mr-kna-vad-visar   → "boka privat MR" + "Specialistdirekts MR-flöde"
```

Det innebär att ortopedivertikalens interna auktoritet i praktiken pekas mot
**pris- och processartiklar**, inte mot tjänstesidan – exakt den uppdelning §5
och §18 ber om att separera. Detta är en **strukturell** observation som kan
konstateras utan GSC. Huruvida det *också* orsakar fel ägare i Google
(Class C) kräver query→URL-belägg och är därför **inte** klassificerat här.

## Observation L2 – templatade exakt-matchande ankare

Ankaret `"Privat MR: kostnad, väntetid och magnetkameraundersökning"` återkommer
**identiskt från 11 sidor**, och `"MR utan remiss – så fungerar privat
magnetröntgen"` likaså från 11 sidor. De kommer från det automatiska
relaterade-artiklar-blocket (`ARTICLE_EXTRA_SPECIALTIES` / `relatedSpecialty`),
inte från kontextuella länkar i brödtext.

Kontextuella, varierade ankare finns bara i ett fåtal fall
(`"privat MR av ryggen"` från Göteborgssidan och rygg/fysioterapeut-artikeln,
`"MR knä"` från MR-utan-remiss).

Detta är en kandidat för §18-arbete – men åtgärd bör prioriteras mot GSC-belägg,
inte kosmetiskt.

## Observation L3 – "MR rygg" saknar informationsägare

`/artiklar/privat-mr-rygg-kostnad` är pris-vinklad i både slug, title och
primärt sökord (`privat MR rygg`). Motsvarigheten till `mr-kna-vad-visar`
(diagnostik: *vad visar MR av ryggen*) finns inte. Om GSC visar
diagnostik-efterfrågan för rygg är detta antingen Class B (stärk befintlig) eller
Class D (ny URL) – **avgörs av data, inte av symmetri med knä-artikeln.**

---

# 3. Korsdomän-ägande (§2) – verifierat mot repo

`docs/content-ownership.md` (uppdaterad 2026-08-05) finns och är läst. Avsnitt 2
listar intentioner som tillhör **andrabedomning.se** och aldrig får förekomma på
Specialistdirekt – i URL, Title, H1–H3, ankartext, FAQ, metadata, schema eller
brödtextintention:

- second opinion / andra bedömning / ny medicinsk bedömning
- osäker diagnos / granska diagnos / ifrågasätta tidigare diagnos
- **granska MR-svar / ny tolkning av MR**
- bedömning inför operation / operationsbeslut / "bör jag opereras"
- alternativ till operation / ont efter operation (som primär intent) / omoperation

Dokumentet bekräftar också den distinktion §8 kräver: ordet *bedömning* är
tillåtet när det avser den mottagande ortopedens bedömning av patientens
**aktuella** besvär – inte en ny bedömning av en tidigare diagnos.

**Konsekvens för kommande GSC-körning:** hela MR-svar-klustret måste delas i två
banor innan något klassificeras. "När kommer MR-svar", "vem går igenom
MR-svaret", "behöver jag ortoped efter MR" är potentiellt Specialistdirekt.
"Granska mitt MR-svar", "second opinion MR", "kan jag lita på MR-svaret" är
**Class E – OFF-LIMITS**.

## Ytterligare bindning: doorway-spärren

`content-ownership.md` §4 förbjuder route/sitemap/navigering/indexbar sida för
**kroppsdels- eller subspecialitetssidor utan verifierat utbud** (uttryckligen:
höftkirurg, axelspecialist, handkirurg, fotspecialist, knäkirurg …). Verifierat
utbud i dag: **en** ortopedisk kapacitet i Göteborg.

Detta begränsar vad en framtida rekommendation får föreslå: en **artikel** om
t.ex. MR axel är inte samma sak som en **tjänste-/kroppsdelssida** för axel. Den
senare är blockerad av policy tills utbud verifierats – oavsett vad GSC visar.

---

# 4. Governance-observation (utanför uppdragets fråga, men funnen under §2)

`content-ownership.md` §6 säger att läkarens och mottagningens identitet
**aldrig** publiceras på Specialistdirekt – varken namn, foto, adress, telefon,
profil-URL eller logotyp – och att den anslutna kapaciteten enbart ska beskrivas
som "ansluten ortopedisk specialistkompetens i Göteborg".

Produktionen gör i dag det motsatta: **Dr. Masoud Sorkhabi namnges publikt** på
bl.a. `/lakare/masoud-sorkhabi` (egen profilsida i sitemap), som medicinsk
granskare på samtliga artiklar, samt i brödtext på `/privat-mr`,
`/specialiteter/ortoped/goteborg` och `/specialiteter/smartlakare/goteborg`.

Detta är inte en SEO-fråga och åtgärdas inte här (R1). Men dokumentet och
produktionen kan inte båda ha rätt: antingen är §6 inaktuell och bör uppdateras,
eller så läcker produktionen identitet i strid med policyn. **Operatörsbeslut
krävs** – och det påverkar hur framtida MR-innehåll får formuleras (E-E-A-T med
namngiven granskare vs. anonymitetskravet).

---

# 5. Ej genomförda avsnitt

Följande kräver GSC-data och har därför **inte** utförts – varken helt eller
delvis, och inga preliminära slutsatser har dragits:

| Avsnitt | Status | Varför |
|---|---|---|
| §6–7 GSC-efterfrågan, kluster, viktad position | **Ej körd** | Ingen export |
| §8 MR-svar-uppdelning mot faktiska queries | **Ej körd** | Kräver queries |
| §9 query→URL-mappning med konfidens | **Ej körd** | Kräver queries |
| §10 Ägarklassificering A–E | **Ej körd** | Kräver efterfrågebelägg |
| §13–15 SERP-recon och svårighet | **Ej körd** | Körs enligt §13 endast för meningsfulla B/C/D-kluster, vilka inte kan identifieras utan §10 |
| §16 Kommersiellt värde | **Ej körd** | – |
| §17 Kannibaliseringsanalys per möjlighet | **Ej körd** | – |
| §19–20 Scoring och opportunity cards | **Ej körd** | – |
| §23–25 Top-3 och nästa drag | **Ej körd** | – |

SERP-recon avstods medvetet: att inventera svenska SERP:ar för godtyckligt valda
fraser utan efterfrågebelägg vore att välja ämne från lista i stället för från
data, vilket den bindande principen förbjuder.

---

# 6. Operatörens manuella kontroller

## Krävs för att låsa upp körningen

1. Färsk GSC-export för `specialistdirekt.se`, 3 månader, slutdatum ≤14 dagar
   gammalt, innehållande `Queries.csv` och `Pages.csv`. Ange **exportens egna**
   datumintervall.

## Ahrefs

Inga Ahrefs-kontroller beställs i denna körning. Att lista sökord för
volym-/KD-uppslag innan GSC visat vilka kluster som faktiskt är relevanta vore
att gissa efterfrågan – vilket R3 förbjuder. Ahrefs-listan produceras i den
upplåsta körningen.

## GSC UI

Inga – det finns ingen MED/LOW-konfidensmappning att verifiera eftersom ingen
mappning gjorts.

## Beslut som väntar på operatören

- Governance-konflikten i avsnitt 4 (anonymitet vs. namngiven granskare).

---

# 7. Begränsningar

**GSC.** Ingen export fanns tillgänglig; noll efterfrågedata användes. När
exporten finns gäller fortfarande att standardexporten saknar en äkta
query×page-join – mappningar måste konfidensmärkas enligt §9.

**Sökvolym.** GSC-impressions är ett efterfrågegolv, inte total sökvolym.
Ahrefs-data är utestående.

**SERP.** Ingen SERP-recon gjordes. När den görs approximerar webbsökning svenska
Google-resultat men är inte identisk med en enskild användares personaliserade
google.se-SERP; svårighetsgrad ska därför konfidensmärkas.

**Länkgraf.** Extraherad från renderad produktions-HTML. Länkar som ligger i
navigering/sidfot på samtliga sidor har inte separerats ut från brödtextlänkar i
räkningen, men de fem MR-noderna förekommer inte i global navigering, så
räkningen speglar innehållslänkar.

**Miljö.** Playwright/Chromium lämnades orört och användes inte (R5). Ingen
SERP-scraping med headless browser gjordes. Datumfältet i leadformuläret är
inte inventerat, analyserat eller kommenterat (R6). Inget innehåll skapades,
ändrades eller deployades (R1).

---

# 8. Självgranskning (§31)

| Fråga | Svar |
|---|---|
| Använde jag färsk faktisk GSC-data? | **Nej – den saknas. Därför BLOCKED-INPUT, inte COMPLETE.** |
| Fick varje meningsfull query en A–E-klass? | Nej – blockerat före §10, inget klassificerades |
| Jämförde jag kandidat mot alla befintliga ägare? | Ingen kandidat föreslogs |
| Uteslöt jag andrabedomning.se-intentioner? | Ja – dokumenterade och avgränsade i avsnitt 3 |
| Inspekterade jag aktuella svenska SERP:ar? | Nej – och inga konkurrenter påstås ur minnet |
| Är rekommendationen kommersiellt relevant? | Ingen rekommendation gavs |
| AI-retrieval bedömd? | Nej – kräver identifierade möjligheter |
| Medicinskt djup vs. granskning? | Ej tillämpligt utan kandidat |
| Playwright/Chromium och datumfält orörda? | **Ja** (R5, R6) |
| Skulle jag rekommendera detta även om nya artiklar vore förbjudna? | Ja – observation L1 (transaktionsflödets 5 inlänkar) är en åtgärd som inte kräver någon ny sida |

Ingen del av rapporten deklareras COMPLETE.
