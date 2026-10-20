import Link from "next/link";

import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { PhoneLink } from "@/components/PhoneLink";
import { site } from "@/lib/site";

export function FooterEn() {
  return (
    <footer className="mt-auto border-t border-ink-200 bg-ink-900 text-ink-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <Link href="/en" className="text-lg font-bold text-white">
            Specialistdirekt
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">
            Information and routes to private specialist care in Sweden.
          </p>
        </div>

        <nav aria-label="Pages">
          <h2 className="text-sm font-semibold text-white">Pages</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/en" className="text-ink-300 hover:text-white">Home</Link></li>
            <li>
              <Link href="/en/private-orthopedist-gothenburg" className="text-ink-300 hover:text-white">
                Orthopedist in Gothenburg
              </Link>
            </li>
            <li><Link href="/" hrefLang="sv" className="text-ink-300 hover:text-white">Swedish website</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-300">
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li><PhoneLink className="hover:text-white" /></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-ink-400 sm:flex-row sm:px-6">
          <p>
            © {site.foundingYear} {site.name}. All rights reserved.
            <span className="mt-1 block">Operated by {site.legalName}, company no. {site.orgNumber}.</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/integritetspolicy" hrefLang="sv" className="hover:text-white">Privacy policy (Swedish)</Link>
            <span aria-hidden>·</span>
            <CookieSettingsButton className="hover:text-white" label="Cookie settings" />
            <span aria-hidden>·</span>
            <p>Not an emergency service – call 112 in an emergency.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
