import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description:
    "Så behandlar Specialistdirekt dina personuppgifter enligt GDPR – vilka uppgifter vi samlar in, varför, hur länge och dina rättigheter.",
  alternates: { canonical: "/integritetspolicy" },
  robots: { index: true, follow: true },
};

const crumbs = [
  { name: "Hem", path: "/" },
  { name: "Integritetspolicy", path: "/integritetspolicy" },
];

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-section">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink-900">
            Integritetspolicy
          </h1>
          <p className="mt-4 text-ink-600">
            Din integritet är viktig för oss. Här beskriver vi hur {site.name} behandlar dina
            personuppgifter i enlighet med dataskyddsförordningen (GDPR).
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-3xl space-y-8 px-4 py-12 text-ink-700 sm:px-6">
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
            Vi behandlar uppgifterna för att kunna matcha dig med en lämplig specialist och
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
          <h2 className="text-xl font-bold text-ink-900">7. Cookies och statistik</h2>
          <p className="mt-2">
            Utöver nödvändiga cookies använder vi Google Analytics för anonym besöksstatistik, i
            syfte att förbättra sajten. Dessa cookies sätts endast om du samtycker via vår
            cookiebanner – innan dess är analys-cookies avstängda (Google Consent Mode). Du kan
            när som helst ändra ditt val genom att rensa webbplatsens cookies. Vi sätter inga
            cookies för annonsering eller profilering.
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

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
