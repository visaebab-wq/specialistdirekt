# Google Ads: "Knä låser sig – Göteborg"

**Status: EJ AKTIVERAD.** Allt i den här mappen är importfärdigt men ligger som
`Paused`. Kampanjen får aktiveras när `booking_submitted` registreras som
konvertering i Google Ads (checklistan sist i dokumentet).

**Konverteringsmålet är `booking_submitted`** – händelsen som skickas när
besökaren skickat bokningsformuläret på landningssidan. Kampanjen är
lead generation, inte trafik: budgivningen ska styras av den signal som faktiskt
sker på sajten. `booking_confirmed` kräver att patienten klickar i ett mejl och
läcker för mycket för att kunna styra Smart Bidding – den följs som sekundär
signal. Att koppla den bekräftade bokningen som offline-konvertering är en
förbättring **efter** launch och inget som stoppar aktivering.

Landningssida: <https://specialistdirekt.se/kna-laser-sig>

## Vad som är verifierat i sajten (2026-08-18)

| Sak | Status |
|---|---|
| Bokningsflödet end-to-end (riktig bokning → bekräftelse → avbokning) | Verifierat i skarp miljö |
| `booking_submitted` skickas till GA4 (`G-NWLDYNC1TK`) från /kna-laser-sig | Verifierat i webbläsare 18 aug 2026: riktig bokning genom formuläret → händelsen skickad, HTTP 204 |
| `booking_confirmed` skickas till GA4 | Verifierat efter buggfix (se nedan) |
| Pris (2 000 kr), besökslängd (40 min), avbokning (3 tim) | Läses från bokningens kod |

Buggen som testet hittade: `TrackEvent` anropade `gtag` direkt vid montering, men
GA-skriptet laddas `afterInteractive`. På bekräftelsesidan hann effekten före
`window.gtag`, och `gtag?.()` blev en tyst no-op – den bekräftade bokningen hade
**aldrig** registrerats som konvertering. Komponenten väntar nu in `gtag`.

## Steg som kräver Google-konto (kan inte göras härifrån)

Konverteringen är **taggbaserad** sedan 18 aug 2026: sajten skjuter den direkt till
`AW-312691003/WfEmCP30_eMcELuSjZUB` när bokningsformuläret skickats. Ingen
GA4-import behövs för den.

1. **Google Ads → Mål → Konverteringar** – öppna konverteringsåtgärden med etikett
   `WfEmCP30_eMcELuSjZUB` och sätt den till **Primär**. Räkning: *En* per klick
   (en patient som bokar två tider är fortfarande en patient).
2. ⚠️ **Importera INTE `booking_submitted` från GA4 som en egen
   konverteringsåtgärd.** Då räknas samma bokning två gånger och budgivningen
   börjar betala dubbelt. Välj antingen taggen (som nu) eller GA4-importen –
   aldrig båda för samma händelse.
3. **GA4 → Admin → Produktlänkar → Google Ads** – länka ändå kontot. Det behövs
   inte för konverteringen, men ger kampanjdata i GA4-rapporterna.
4. **GA4 → Admin → Händelser** – markera `booking_confirmed` som nyckelhändelse.
   Den följs bara i GA4, som kvalitetsmått; den ska inte in i Ads.
5. **Kampanj → Inställningar → Konverteringsmål → "Använd kampanjspecifika mål"** –
   välj enbart målet som innehåller `booking_submitted`.
6. Kontrollera status i Ads: *Registrerar konverteringar*. Taggbaserade
   konverteringar syns normalt inom några timmar.

### Efter launch (ingen blockerare)

Andelen `booking_submitted` som blir `booking_confirmed` är kvoten som avgör om
budgivningen jagar rätt sak. Följ den i GA4 från dag ett. Vill man senare låta
budgivningen styras av den bekräftade bokningen laddas den upp som
offline-konvertering (Ads → Konverteringar → Importera → Offline), vilket kräver
att gclid sparas vid bokningen – finns inte i dag.

## Kampanjinställningar

| Inställning | Värde |
|---|---|
| Typ | Sök, utan Display Expansion |
| Nätverk | Endast Google Sök (sökpartners **av** initialt) |
| Plats | Göteborg + 25 km radie |
| Platsalternativ | *Närvaro* ("personer på eller regelbundet på platsen") – inte intresse |
| Språk | Svenska |
| Budgivning | Maximera konverteringar utan mål-CPA. Byt till mål-CPA först efter ~30 konverteringar |
| Budget | Sätts av annonsören. Riktmärke: minst 3–5 × klickpris × 10 klick/dag |
| Annonsschema | Dygnet runt – bokningen är självbetjäning |
| Annonsrotation | Optimera |
| Slutlig URL-expansion | **Av** (kampanjen ska bara leda till landningssidan) |

## Filer att importera (Google Ads Editor → Konto → Importera → Från fil)

| Fil | Innehåll |
|---|---|
| `keywords.csv` | 3 annonsgrupper, exakt + fras-matchning, status `Paused` |
| `negatives.csv` | Kampanjnegativa ord (övningar, operation pris, fysioterapeut, akut, 1177 m.fl.) |
| `ads-rsa.csv` | En responsiv sökannons per annonsgrupp: 15 rubriker, 4 beskrivningar |
| `assets.csv` | 4 sitelinks + 6 utökade texter |

Alla texter är längdvaliderade mot Googles gränser (rubrik 30, beskrivning 90,
sökväg 15, sitelink-text 25, sitelink-rader 35, utökad text 25 tecken).

## Annonsgrupper

- **Knä låser sig** – `[knä låser sig]`, `[knät låser sig]`, `[knä som låser sig]`, `[låsning i knä]`, `[knä låsning]` + fras
- **Knä hakar upp sig** – `[knä hakar upp sig]`, `[knät hakar upp sig]`, `[knä hakar upp]` + fras
- **Knäspecialist Göteborg** – `[knäspecialist göteborg]`, `[knäläkare göteborg]`, `[ortoped knä göteborg]`, `[privat knäläkare göteborg]` + fras

Medvetet **inte** med (annan avsikt, enligt specen): meniskoperation, operation
pris, akut knä, rehabilitering, övningar, knäskydd/ortos, fysioterapi.

## Medicinska ramar för annonstexten

Ingen text får påstå diagnos, operation eller garanterad MR. Godkända formuleringar
är "ortopedisk bedömning", "klinisk undersökning", "bedömning av behov av vidare
utredning eller behandling". Inga superlativ, inga behandlingsutfall, ingen
tidsgaranti utöver de lediga tider som faktiskt visas.

## Checklista före aktivering

- [x] `booking_submitted` skjuts till AW-312691003/WfEmCP30_eMcELuSjZUB (verifierat i produktion)
- [x] Inga andra konverterings-ID skickas från sajten (endast AW-312691003 finns i koden)
- [x] Auto-tagging fungerar på sajtens sida – gclid överlever till landningssidan
- [ ] **Auto-tagging = PÅ** i Ads (Inställningar → Kontoinställningar) – görs i Ads
- [ ] Konverteringsåtgärden satt som **primär** i Ads
- [ ] Kontrollerat att åtgärden tillhör SpecialistDirekt, inte Snabbintyg
- [ ] `booking_submitted` INTE också importerad från GA4 (dubbelräkning)
- [ ] Kampanjspecifika konverteringsmål valda på kampanjen
- [ ] Ads visar "Registrerar konverteringar" för `booking_submitted`
- [x] Samtycke för annonsmätning implementerat och verifierat (se "Samtycke" nedan)
- [ ] Slutlig URL-expansion av, sökpartners av
- [ ] Negativa ord importerade
- [ ] Lediga tider finns i kalendern (lör/sön 10–16) när kampanjen startar
- [ ] Budget och maxbud satta av annonsören

Så länge någon ruta är otickad ska kampanjen förbli pausad.

## Samtycke – avgjort och implementerat (18 aug 2026)

Annonsören valde att bevilja samtycke för **annonsmätning, men inte
personalisering**. Efter aktivt klick på "Acceptera" skickas:

| Signal | Värde | Varför |
|---|---|---|
| `analytics_storage` | granted | besöksstatistik |
| `ad_storage` | granted | knyta konverteringen till annonsklicket |
| `ad_user_data` | granted | krävs för taggbaserad konverteringsmätning |
| `ad_personalization` | **denied** | ingen remarketing, inga målgrupper, ingen profilering |

Innan besökaren svarat är allt nekat (Consent Mode v2, `wait_for_update: 500`).

Bannern följer PTS vägledning: inget är förvalt, "Neka" har exakt samma storlek
och vikt som "Acceptera", och samtycket går att ta tillbaka via
**Cookie-inställningar** i sidfoten – den nollställer valet och nekar allt direkt.

Samtyckesnyckeln är versionerad (`cookie-consent-v2`). Den som accepterade den
gamla bannern – som bara nämnde besöksstatistik – har inte samtyckt till
annonsmätning och tillfrågas därför på nytt. **Höj nyckeln igen om omfattningen
ändras.** Integritetspolicyns avsnitt 7 beskriver båda ändamålen och att
personanpassad annonsering inte används.

## Verifierat i webbläsare (18 aug 2026)

Kört som ett riktigt annonsklick mot landningssidan
(`/kna-laser-sig?gclid=…&utm_source=google&utm_medium=cpc`), med samtycke och en
riktig bokning genom formuläret:

| Kontroll | Utfall |
|---|---|
| Samtyckesläge före svar | `gcs=G100` (allt nekat) |
| Samtyckesläge efter "Acceptera" | `gcs=G111` (analys + annons beviljat) |
| `ad_personalization` efter samtycke | `denied` |
| `booking_submitted` skickad till `G-NWLDYNC1TK` | Ja, HTTP 204 |
| `gclid` med i konverteringsträffen | Ja – annonsklickets id följer med händelsens sid-URL |

Det betyder att GA4 tar emot konverteringen tillsammans med annonsklickets id och
kan attribuera den vid importen till Google Ads.

**Google Ads-taggen är installerad.** `AW-312691003` laddas vid sidan av GA4 på
samma gtag.js, med `allow_ad_personalization_signals: false` – vi mäter resultat,
vi bygger inga målgrupper. Konverterings-ID och etikett ligger i
`src/lib/site.ts` (`adsConversionId`, `adsConversionLabels`), och `TrackEvent`
skickar konverteringen för de händelser som står i den listan. Lägg **inte** in
`booking_confirmed` där – se varningen om dubbelräkning ovan.

Verifierat i webbläsare 18 aug 2026, samma annonsklick som ovan:

| Kontroll | Utfall |
|---|---|
| `_gcl_aw` sätts vid samtycke | Ja – `GCL.…​.TESTgclid_XYZ789`, alltså klickets id sparat |
| Konvertering skickad | Ja – `/pagead/conversion/312691003/` med etiketten, `gcs=G111` |
| `booking_submitted` till GA4 | Ja, oförändrat |
| `ad_storage` / `ad_user_data` | granted |
| `ad_personalization` | denied |

Med taggen på plats sparas annonsklicket i `_gcl_aw`, så attributionen håller
även om besökaren återvänder senare för att boka – den tidigare begränsningen är
därmed borta.

**Tag Assistant:** kontrollen ovan gjordes programmatiskt (Playwright, riktig
Chromium) eftersom Tag Assistants gränssnitt kräver inloggning. Vill man ha
Googles egen bild: kör Tag Assistant mot den publika URL:en med `?gclid=test`,
acceptera bannern och gör en bokning – samma händelse ska synas.

## Produktionstest 19 aug 2026

Kört mot skarpa sajten som ett annonsklick
(`https://specialistdirekt.se/kna-laser-sig?gclid=TESTAUTOTAG_PROD_001&utm_source=google&utm_medium=cpc`),
med samtycke och en riktig bokning genom formuläret. Bokningen är sedan raderad.

| Kontroll | Utfall |
|---|---|
| `gclid` överlever till landningssidan | Ja – 200, noll omdirigeringar, URL:en orörd |
| `_gcl_aw` skrivs vid samtycke | Ja – `GCL.…​.TESTAUTOTAG_PROD_001` |
| `booking_submitted` till GA4 | Ja, `G-NWLDYNC1TK`, `gcs=G111` |
| Konvertering skickad | Ja – `id=312691003`, `label=WfEmCP30_eMcELuSjZUB` |
| Andra konverterings-ID från sajten | Inga – `AW-312691003` är det enda som finns i koden |

**Detta ska synas i Ads inom några timmar: exakt EN konvertering** på åtgärden med
etikett `WfEmCP30_eMcELuSjZUB`. Den är oattribuerad (testets gclid är påhittat) –
det är väntat och bevisar bara att mätpunkten registrerar.

### Två saker går inte att kontrollera härifrån

1. **Auto-tagging** är en kontoinställning i Google Ads. Sajten är förberedd –
   gclid tas emot och sparas – men reglaget måste slås på i Ads.
2. **Att konverteringsåtgärden tillhör SpecialistDirekt och inte Snabbintyg.**
   Sajten skickar bara det ID som står i `site.ts`, men vilket konto och vilken
   webbplats åtgärden hör till syns bara i Ads-kontot. Kontrollera i
   **Mål → Konverteringar** att åtgärden med etikett `WfEmCP30_eMcELuSjZUB`
   ligger i det konto kampanjen körs i och att källan pekar på specialistdirekt.se.
   Firar man fel åtgärd optimerar Smart Bidding mot en annan sajts mål.
