# Specialistdirekt

Kostnadsfri förmedlingstjänst som hjälper privatpersoner i Sverige att hitta rätt
**specialistläkare**. Besökaren beskriver sitt behov via ett lead-formulär, och du (förmedlaren)
matchar hen manuellt med en passande specialist.

Byggd med **Next.js 16 (App Router)**, **React 19**, **TypeScript** och **Tailwind CSS 4** med
fokus på **SEO** och **AI-vänlighet**.

## Kom igång

```bash
npm install
npm run dev      # utvecklingsserver på http://localhost:3000
npm run build    # produktionsbygge
npm run start    # kör produktionsbygget
```

## Projektstruktur

```
src/
  app/
    layout.tsx              # Rotlayout: språk (sv), metadata, header/footer, global JSON-LD
    page.tsx                # Startsida
    sa-fungerar-det/        # Så fungerar det
    specialiteter/          # Översikt + dynamiska sidor /[slug] (en sida per specialitet)
    om-oss/  kontakt/  vanliga-fragor/  integritetspolicy/
    actions.ts              # Server action som tar emot lead-formuläret
    sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx  icon.svg
  components/               # Header, Footer, LeadForm, FaqList, SpecialtyCard, JsonLd m.m.
  lib/
    site.ts                 # ⭐ All varumärkes- och kontaktinfo (ändra här)
    specialties.ts          # ⭐ Specialiteter → driver navigering + landningssidor
    faq.ts                  # Vanliga frågor (delas av sida + FAQ-schema)
    lead.ts                 # Typer/initialvärde för formuläret
    structured-data.ts      # schema.org-hjälpare (Organization, MedicalBusiness, FAQ ...)
public/
  llms.txt                  # Sammanfattning för AI-assistenter
  icon.svg
```

## SEO & AI – vad som ingår

- Server-renderad HTML på alla sidor (fullt indexerbar).
- Unika `<title>`, meta-description och **canonical** per sida.
- **JSON-LD strukturerad data**: Organization, WebSite, MedicalBusiness, MedicalSpecialty,
  BreadcrumbList och FAQPage.
- Open Graph + Twitter-kort med automatiskt genererad delningsbild (`opengraph-image`).
- `sitemap.xml`, `robots.txt`, PWA-`manifest` och `llms.txt`.
- En SEO-landningssida per specialitet (long-tail: "hitta kardiolog" osv.).
- Tillgänglighet: språkattribut, hoppa-till-innehåll, fokusmarkering, semantisk HTML.

## Miljövariabler

Kopiera `.env.example` till `.env.local` och fyll i. De publika innehållssidorna kan byggas utan
hemligheter, men direktbokningen får inte tas i drift utan `BOOKING_SECRET`, beständig lokal
lagring och fungerande SMTP.

| Variabel | Syfte |
| --- | --- |
| `RESEND_API_KEY` | Aktiverar e-postutskick av förfrågningar (skapa nyckel på resend.com) |
| `LEAD_TO_EMAIL` | Vart förfrågningar skickas (annars `site.email`) |
| `LEAD_FROM_EMAIL` | Avsändare (verifierad domän i Resend för produktion) |
| `BOOKING_SECRET` | Hemlig nyckel (minst 16 tecken) för signerade bekräftelse- och avbokningslänkar |
| `BOOKING_BASE_URL` | Publik HTTPS-basadress som används i bokningsmejl |
| `BOOKING_TO_EMAIL` | Mottagare för bokningsnotiser |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Obligatorisk SMTP-kanal för bokningsmejl |
| `BOOKING_LOG_FILE`, `LEAD_LOG_FILE` | Valfria absoluta sökvägar till beständig, privat JSONL-lagring |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Aktiverar cookiefri webbanalys (Plausible) |
| `GOOGLE_SITE_VERIFICATION` | Verifieringskod för Google Search Console |

## Produktionsdrift

Direktbokningen använder en lokal append-only-journal och ett delat fillås. Kör därför appen som
**en enda skrivande Node-instans** med beständig disk, privata filrättigheter och regelbundna
säkerhetskopior. Serverless/ephemeral drift eller flera parallella instanser (till exempel en vanlig
Vercel-deploy) stöds inte för bokningsflödet: data kan annars försvinna och fillåset kan inte hindra
dubbelbokning mellan instanser.

1. Skapa en dedikerad katalog på beständig disk för `.data` och säkerhetskopior.
2. Sätt samtliga obligatoriska boknings- och SMTP-variabler i `.env.local`.
3. Kör `npm run build` och därefter en enda `npm run start`-instans bakom en HTTPS-proxy.
4. Låt proxyn sätta verifierad `X-Real-IP`, respektera appens `no-store` på muterande/känsliga
   svar och aldrig logga signerade boknings-URL:er.
5. Uppdatera `url` i `src/lib/site.ts` om den publika domänen ändras.

## ⚠️ Att göra innan lansering

1. **Domän:** byt `url` i `src/lib/site.ts` till din riktiga domän (canonical, sitemap, OG).
2. **Kontaktuppgifter:** uppdatera e-post, telefon och adress i `src/lib/site.ts`.
3. **E-post och bokning:** konfigurera SMTP, `BOOKING_SECRET`, mottagare och beständig lagring;
   `RESEND_API_KEY` är en valfri extra leveransväg för lead-formuläret.
4. **Integritetspolicy:** `/integritetspolicy` är en mall – låt juridiskt ombud granska.
5. **Omdömen:** byt exempel-omdömena i `src/lib/testimonials.ts` mot riktiga (märk `isExample: false`).
6. **Innehåll:** lägg till fler specialiteter (`src/lib/specialties.ts`), artiklar
   (`src/content/articles/`) eller städer (`src/content/cities/`) vid behov.
