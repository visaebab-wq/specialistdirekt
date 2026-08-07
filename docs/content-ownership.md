# Innehållsägande & intent-register – ortopedi

Detta register styr vilken URL som "äger" vilken sökintention, så att sidorna
inte konkurrerar med varandra (kannibalisering) och inte konkurrerar med
systersajten **andrabedomning.se**. Uppdatera detta dokument när nya sidor eller
intentioner tillkommer.

Status: uppdaterad 2026-08-05. Gäller ortopedivertikalen.

## 1. Specialistdirekt-ägda intentioner → URL

| Intent-kluster | Ägande URL |
|---|---|
| Lokal kommersiell + rating + bokning (Göteborg) | `/specialiteter/ortoped/goteborg` |
| Nationell kostnad/pris | `/artiklar/privat-ortoped-kostnad` |
| Knä-routing (vilken läkare vid knäsmärta) | `/artiklar/vilken-lakare-knasmarta` |
| Rygg-routing (ont i ryggen – vilken läkare) | `/artiklar/ont-i-ryggen-vilken-lakare` |
| Rygg-routing (ortoped **eller** fysioterapeut) | `/artiklar/ryggsmarta-ortoped-eller-fysioterapeut` |
| Ortoped utan remiss (nationellt) | `/artiklar/ortoped-utan-remiss` |
| Specialist utan remiss (alla specialiteter) | `/artiklar/boka-specialist-utan-remiss` |
| Nationell översikt | `/specialiteter/ortoped` |

### Regler mot kannibalisering
- **Lokala + rating + bokningsfrågor** (utan remiss i Göteborg, pris i Göteborg,
  tid i Göteborg, 4,9-betyget, "högst betygsatta ortopeder i Göteborg") →
  ENDAST på Göteborgssidan.
- **Ren prisfråga** (vad kostar en privat ortoped) → ENDAST kostnadsartikeln.
  Göteborgssidan får nämna pris kort och länka dit, men äger inte prisintenten.
- **Ortoped utan remiss (nationellt, generisk självbetalar-väg)** →
  `ortoped-utan-remiss`. Den generella `boka-specialist-utan-remiss` täcker alla
  specialiteter och egenremiss steg-för-steg; ortoped-artikeln fokuserar på just
  ortopedvägen och länkar till den generella. De ska korslänka, inte upprepa.
- **Rygg: ortoped eller fysioterapeut** → `ryggsmarta-ortoped-eller-fysioterapeut`
  äger *valet mellan vårdgivartyper*. `ont-i-ryggen-vilken-lakare` äger den
  bredare "vilken läkare"-frågan. Håll vinklarna åtskilda och korslänka.

## 2. Andrabedomning.se-ägda intentioner – ALDRIG på Specialistdirekt

Får inte förekomma i URL, Title, H1–H3, ankartext, FAQ-fråga, metadata,
schema-beskrivning, navigering, CTA eller brödtext-intention:

- second opinion / andra bedömning / ny medicinsk bedömning
- osäker diagnos / granska diagnos / ifrågasätta tidigare diagnos
- granska MR-svar / ny tolkning av MR
- bedömning inför operation / operationsbeslut / "bör jag opereras"
- alternativ till operation / ont efter operation (som primär intent) / omoperation

Tillåtet: ordet **bedömning** när det betyder att den mottagande ortopeden
bedömer patientens **aktuella** besvär ("Ortopeden gör en medicinsk bedömning av
dina aktuella besvär"). Inte tillåtet: "få en ny bedömning av en tidigare
diagnos".

## 3. Rating-frasstyrning
- H2 `Högst betygsatta ortopeder i Göteborg – så jämför du rätt` är godkänd som
  jämförelse-/sökintention på Göteborgssidan.
- Det auktoriserar INTE ett påstående att den anslutna mottagningen objektivt är
  högst betygsatt eller "bäst" i Göteborg.
- Det publika betyget **4,9 av 5** (kontrollerat 2026-08-04) får publiceras som
  synlig text med följande krav: gäller den mottagande vårdgivaren – inte
  Specialistdirekt; ange senast-kontrollerat-datum; namnge inte plattformen;
  publicera inte antal omdömen; **ingen AggregateRating- eller Review-schema**.

## 4. Doorway-spärr (ingen sida utan verifierat utbud)
Skapa INTE route/sitemap/navigering/indexbar sida för kroppsdels- eller
subspecialitetssidor utan verifierat utbud, t.ex.: höftkirurg, axelspecialist,
handkirurg, fotspecialist, barnortoped, protes-/rygg-/knäkirurg i Göteborg.
Nuvarande verifierade utbud: **en** anonym ortopedisk kapacitet i Göteborg
(fysiskt besök, självbetalande, ingen remiss krävs).

## 5. Enkapacitets-ärlighet (Göteborg ortoped)
Det finns just nu **en** ansluten anonym ortopedisk kapacitet i Göteborg.

**Tillåtet:** "Vi förmedlar din tidsförfrågan till ansluten ortopedisk
specialistkompetens i Göteborg."

**Ej tillåtet:** "vi jämför flera ortopeder", "vårt nätverk av ortopeder", "flera
anslutna ortopeder", "vi hittar den bästa ortopeden", "vi kontrollerar
tillgänglighet hos flera mottagningar".

Uppdateras i en separat dokumenterad release när mer verifierat utbud tillkommer.

## 6. Anonymitet
Läkarens och mottagningens identitet publiceras aldrig på Specialistdirekt
(namn, foto, adress, telefon, profil-URL, logotyp) och får inte läcka via
metadata, schema, bildfilnamn, alt-text eller dolda fält. Beskriv endast som
"ansluten ortopedisk specialistkompetens i Göteborg".
