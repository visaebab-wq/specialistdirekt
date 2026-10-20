import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";
import { PageVisual } from "@/components/PageVisual";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Integritetspolicy – så hanterar vi dina uppgifter",
  description:
    "Så behandlar Specialistdirekt dina personuppgifter enligt GDPR – vilka uppgifter vi samlar in, varför, hur länge och dina rättigheter.",
  path: "/integritetspolicy",
  robots: { index: true, follow: true },
});

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Integritetspolicy", path: "/integritetspolicy" },
];

const visual = {
  src: "/page-visuals/static-integritetspolicy.webp",
  alt: "Trygg hantering av personuppgifter i vårdkontakt - realistisk vårdbild",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="internal-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs items={crumbs} />
          <h1 className="internal-hero-title mt-6">Integritetspolicy</h1>
          <p className="internal-hero-text">
            Din integritet är viktig för oss. Här beskriver vi hur {site.name} behandlar dina
            personuppgifter i enlighet med dataskyddsförordningen (GDPR).
          </p>
          <PageVisual visual={visual} className="mt-10" priority />
        </div>
      </div>

      <div className="content-shell">
      <article className="article-body readable-card mx-auto max-w-3xl space-y-8 px-6 py-8 text-ink-700 sm:px-8">
        <section>
          <h2 className="text-xl font-bold text-ink-900">1. Personuppgiftsansvarig</h2>
          <p className="mt-2">
            {site.legalName}, organisationsnummer {site.orgNumber}, är personuppgiftsansvarig för
            den behandling av personuppgifter som sker inom tjänsten {site.name}.
          </p>
          <p className="mt-2">
            Kontakt:{" "}
            <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
              {site.email}
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink-900">2. Vilka uppgifter vi samlar in</h2>
          <p className="mt-2">
            När du skickar en förfrågan samlar vi in de uppgifter du själv lämnar, till exempel
            namn, e-postadress, telefonnummer, ort och den beskrivning av ditt behov du anger.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink-900">3. Varför vi behandlar uppgifterna</h2>
          <p className="mt-2">
            Vi behandlar uppgifterna för att kunna hantera din förfrågan och
            återkomma till dig. Den rättsliga grunden är ditt samtycke, som du lämnar när du
            skickar in formuläret. Du kan när som helst återkalla ditt samtycke.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink-900">4. Vem vi delar uppgifter med</h2>
          <p className="mt-2">
            Vi delar endast dina uppgifter med den eller de specialister/mottagningar som behövs
            för att hjälpa dig vidare. Vi säljer aldrig dina uppgifter till tredje part.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink-900">5. Hur länge vi sparar uppgifterna</h2>
          <p className="mt-2">
            Vi sparar dina uppgifter endast så länge det behövs för att hantera din förfrågan,
            därefter raderas de. Du kan när som helst be oss radera dina uppgifter tidigare.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink-900">6. Dina rättigheter</h2>
          <p className="mt-2">
            Du har rätt att begära tillgång till, rättelse eller radering av dina uppgifter, samt
            att invända mot eller begränsa behandlingen. Du har också rätt att lämna klagomål till
            Integritetsskyddsmyndigheten (IMY).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink-900">7. Cookies, statistik och annonsmätning</h2>
          <p className="mt-2">
            För att minnas ditt val använder vi den nödvändiga inställningen{" "}
            <code>cookie-consent-v2</code>. Valet (ja eller nej) sparas både i webbläsarens lokala
            lagring och i en förstapartscookie med <code>SameSite=Lax</code>. Cookien sparas i högst
            tolv månader. Ett ja förlängs inte automatiskt vid nya besök; när cookien löper ut
            frågar vi på nytt. Den lokala inställningen finns kvar tills du ändrar valet, ett ja
            löper ut eller du rensar webbläsardata. Båda tas bort när du återkallar valet via
            Cookie-inställningar.
          </p>
          <p className="mt-3">
            Om, och först när, du uttryckligen accepterar använder vi följande mätning:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Besöksstatistik.</strong> Google Analytics, för att förstå hur sajten används
              och kunna förbättra den.
            </li>
            <li>
              <strong>Annonsmätning.</strong> Google Ads-teknik, för att se vilka av våra annonser
              som lett fram till en bokningsförfrågan. Det är enbart en mätning av resultatet av
              våra annonser.
            </li>
            <li>
              <strong>Förstapartsräkning av bokningsklick.</strong> När du går vidare via vår länk
              till ortopedbokningen sparas en storleksbegränsad post på vår server med tidpunkt,
              intern källsida, knappens beteckning och botklassning. User-Agent används tillfälligt
              för botklassningen men sparas inte. Själva klickposten innehåller varken IP-adress,
              User-Agent eller hänvisande webbadress.
            </li>
          </ul>
          <p className="mt-3">
            Vi använder <strong>inte</strong> personanpassad annonsering, remarketing eller
            profilering. Signalen för personanpassning (<code>ad_personalization</code>) hålls
            nekad även när du samtyckt, och vi bygger inga målgrupper av ditt besök.
          </p>
          <p className="mt-3">
            Innan du valt, eller om du nekar, laddas inga analystaggar och ingen klickpost skrivs.
            När du nekar eller återkallar ditt val rensas även de Google-mätcookies som webbplatsen
            kan komma åt. Du kan neka lika enkelt som du accepterar, och du kan när som helst ändra
            eller ta tillbaka ditt val via länken <strong>Cookie-inställningar</strong> längst ned
            på varje sida.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink-900">8. Kontakt</h2>
          <p className="mt-2">
            Har du frågor om hur vi behandlar dina uppgifter? Kontakta oss på{" "}
            <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
              {site.email}
            </a>
            .
          </p>
        </section>
      </article>
      </div>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
