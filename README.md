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

Kopiera `.env.example` till `.env.local` och fyll i. Alla är valfria – sajten fungerar utan dem,
men lead-formuläret skickar bara e-post när Resend är konfigurerat.

| Variabel | Syfte |
| --- | --- |
| `RESEND_API_KEY` | Aktiverar e-postutskick av förfrågningar (skapa nyckel på resend.com) |
| `LEAD_TO_EMAIL` | Vart förfrågningar skickas (annars `site.email`) |
| `LEAD_FROM_EMAIL` | Avsändare (verifierad domän i Resend för produktion) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Aktiverar cookiefri webbanalys (Plausible) |
| `GOOGLE_SITE_VERIFICATION` | Verifieringskod för Google Search Console |

## Deploya (Vercel – rekommenderat)

1. Lägg koden på GitHub (`git push`).
2. Importera repot på [vercel.com](https://vercel.com) (Next.js detekteras automatiskt).
3. Lägg in miljövariablerna ovan i Vercels projektinställningar.
4. Peka din domän till Vercel och uppdatera `url` i `src/lib/site.ts`.

## ⚠️ Att göra innan lansering

1. **Domän:** byt `url` i `src/lib/site.ts` till din riktiga domän (canonical, sitemap, OG).
2. **Kontaktuppgifter:** uppdatera e-post, telefon och adress i `src/lib/site.ts`.
3. **E-post:** sätt `RESEND_API_KEY` + `LEAD_TO_EMAIL` så att förfrågningar når fram.
4. **Integritetspolicy:** `/integritetspolicy` är en mall – låt juridiskt ombud granska.
5. **Omdömen:** byt exempel-omdömena i `src/lib/testimonials.ts` mot riktiga (märk `isExample: false`).
6. **Innehåll:** lägg till fler specialiteter (`src/lib/specialties.ts`), artiklar
   (`src/content/articles/`) eller städer (`src/content/cities/`) vid behov.
