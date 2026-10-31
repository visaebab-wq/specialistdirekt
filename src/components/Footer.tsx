import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { PhoneLink } from "@/components/PhoneLink";
import { mainNav, site } from "@/lib/site";
import { specialties } from "@/lib/specialties";
import { getArticle } from "@/lib/articles";

/**
 * Läsbart namn för en social profil-URL. Okända domäner faller tillbaka på
 * värdnamnet i stället för att gissa – då syns felet i stället för att döljas.
 */
function socialLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const known: Record<string, string> = {
      "instagram.com": "Instagram",
      "linkedin.com": "LinkedIn",
      "facebook.com": "Facebook",
      "youtube.com": "YouTube",
      "x.com": "X",
    };
    return known[host] ?? host;
  } catch {
    return url;
  }
}

// Utvalda guider för footern – ger internlänkar till artiklarna från varje sida.
const footerGuideSlugs = [
  "privat-kardiolog-kostnad",
  "privat-ortoped-kostnad",
  "privat-hudlakare-priser",
  "privat-psykiater-kostnad",
  "privat-gynekolog-boka",
  "privat-neurolog-utredning",
];

export function Footer() {
  const year = site.foundingYear; // Statiskt byggvärde – inget runtime-datum.
  // Alla specialiteter, inte slice(0, 6): de sex första var bara arrayordning, inte
  // ett popularitetsmått, och urvalet uteslöt bl.a. allmänmedicin helt ur den
  // sajtövergripande navigationen. Hela listan är dessutom mer användbar för besökaren.
  const topSpecialties = specialties;
  const guides = footerGuideSlugs.map((s) => getArticle(s)).filter((a) => a !== undefined);

  return (
    <footer className="mt-auto border-t border-ink-200 bg-ink-900 text-ink-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white"
            >
              +
            </span>
            Specialistdirekt
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">
            {/* Sajtövergripande: bara ortopedin har egna tider, övriga specialiteter
                går via tidsförfrågan – texten får inte påstå direktbokning för alla. */}
            <Link href="/boka-tid" className="font-medium text-brand-300 hover:text-white">
              Boka ortopedbesök
            </Link>{" "}
            direkt i kalendern i Göteborg. För andra specialiteter skickar du en kostnadsfri
            tidsförfrågan till rätt specialistläkare i Sverige.
          </p>
        </div>

        <nav aria-label="Sidlänkar">
          <h2 className="text-sm font-semibold text-white">Sidor</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-300 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/for-vardgivare" className="text-ink-300 hover:text-white">
                För vårdgivare
              </Link>
            </li>
            <li>
              <Link
                href="/en"
                hrefLang="en"
                className="text-ink-300 hover:text-white"
              >
                English
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Specialiteter">
          <h2 className="text-sm font-semibold text-white">Specialiteter</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {topSpecialties.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/specialiteter/${s.slug}`}
                  className="text-ink-300 hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Populära guider">
          <h2 className="text-sm font-semibold text-white">Populära guider</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {guides.map((a) => (
              <li key={a.slug}>
                <Link href={`/artiklar/${a.slug}`} className="text-ink-300 hover:text-white">
                  {a.category}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/artiklar" className="font-medium text-brand-300 hover:text-white">
                Alla artiklar →
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">Kontakt</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-300">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <PhoneLink className="hover:text-white" />
            </li>
            {/* Bolagets postadress. Står här för att namn, adress och telefon
                ska vara samma på sajten, i Organization-schemat och i Google
                Företagsprofil – glider de isär tappar signalen sitt värde.
                Det är ett kontor, inte en mottagning; besöket sker hos läkaren. */}
            <li className="pt-1 not-italic text-ink-400">
              <address className="not-italic">
                {site.legalName}
                <br />
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </address>
            </li>
            <li className="pt-1 text-ink-400">
              <Link href="/kontakt" className="hover:text-white">
                Kontakta oss via formuläret
              </Link>
            </li>
            {/* Sociala profiler ur site.social – samma lista som `sameAs` i
                Organization-schemat, så det synliga och det strukturerade
                aldrig kan glida isär. Tom lista renderar ingenting. */}
            {site.social.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  rel="me noopener noreferrer"
                  target="_blank"
                  className="hover:text-white"
                >
                  {socialLabel(url)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-ink-400 sm:flex-row sm:px-6">
          <p>
            © {year} {site.name}. Alla rättigheter förbehållna.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/integritetspolicy" className="hover:text-white">
              Integritetspolicy
            </Link>
            <span aria-hidden>·</span>
            {/* Samtycket ska gå att ta tillbaka lika enkelt som det gavs. */}
            <CookieSettingsButton className="hover:text-white" />
            <span aria-hidden>·</span>
            <p>Inte en akuttjänst – ring 112 vid nödfall.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
