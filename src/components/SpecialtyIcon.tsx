// Ämnesrelaterad illustration per specialitet (inga läkarfoton). Rena
// linjeikoner i SVG – snabba, skarpa i alla storlekar och tematiskt kopplade
// till specialiteten (hjärta för kardiolog, hjärna för neurolog osv.).

import type { SVGProps } from "react";

const paths: Record<string, React.ReactNode> = {
  // Hjärta + EKG-linje
  kardiolog: (
    <>
      <path d="M12 20.5C7 17 3.5 13.8 3.5 9.8 3.5 7 5.7 5 8.2 5c1.7 0 3.1.9 3.8 2.2C12.7 5.9 14 5 15.8 5 18.3 5 20.5 7 20.5 9.8c0 4-3.5 7.2-8.5 10.7z" />
      <path d="M5 12.2h3l1.4-2.6 2.1 5 1.4-2.4h2.8" />
    </>
  ),
  // Ben/skelett
  ortoped: (
    <>
      <path d="M9.6 14.4l4.8-4.8" />
      <circle cx="7.8" cy="14.2" r="2.1" />
      <circle cx="9.8" cy="16.2" r="2.1" />
      <circle cx="16.2" cy="9.8" r="2.1" />
      <circle cx="14.2" cy="7.8" r="2.1" />
    </>
  ),
  // Hudkontroll: förstoringsglas över ett födelsemärke
  hudlakare: (
    <>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <line x1="14.6" y1="14.6" x2="20" y2="20" />
      <circle cx="10.5" cy="10.5" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  // Venussymbol (kvinnohälsa)
  gynekolog: (
    <>
      <circle cx="12" cy="9" r="5" />
      <line x1="12" y1="14" x2="12" y2="21" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </>
  ),
  // Hjärna
  neurolog: (
    <>
      <path d="M12 5c-3 0-5 1.8-5 4 0 .9-1 1.3-1 3s1 2.1 1 3c0 2.2 2 4 5 4s5-1.8 5-4c0-.9 1-1.3 1-3s-1-2.1-1-3c0-2.2-2-4-5-4z" />
      <path d="M12 5v14" />
      <path d="M9 8.2c1 .5 1 2 0 2.6" />
      <path d="M15 8.2c-1 .5-1 2 0 2.6" />
    </>
  ),
  // Huvud i profil med hjärta (psykisk hälsa)
  psykiater: (
    <>
      <path d="M16.5 20.5v-2.3a3 3 0 0 0-1-2.2 5.5 5.5 0 1 0-8.7-4.4c0 .5-.1.7-.7 1.6l-1 1.5a.8.8 0 0 0 .7 1.2H7v2.1a2 2 0 0 0 2 2h1" />
      <path d="M12.3 8.6c.6-.9 2-.6 2.2.4.2.9-1 1.8-2.2 2.6-1.2-.8-2.4-1.7-2.2-2.6.2-1 1.6-1.3 2.2-.4z" fill="currentColor" stroke="none" />
    </>
  ),
  // Öga
  ogonlakare: (
    <>
      <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  // Öra
  "oron-nasa-hals": (
    <>
      <path d="M8 9.2a4 4 0 0 1 8-.2c0 2.6-2.6 3.2-2.6 5.5a2.4 2.4 0 0 1-4.8.3" />
      <path d="M9.7 9a2.3 2.3 0 0 1 4.6 0" />
    </>
  ),
  // Njure (urologi)
  urolog: (
    <>
      <path d="M14 5c-4 0-7 3.5-7 8.5S10 22 14 22c1.7 0 2.6-1.3 2.6-3 0-1.5-.8-2-.8-3.8s.8-2.3.8-3.7C16.6 6.3 15.7 5 14 5z" />
      <path d="M13.4 12.5c-1 .6-1 2.4 0 3" />
    </>
  ),
  // Magsäck
  gastroenterolog: (
    <>
      <path d="M10 4v4.3c-2.2.9-3.7 3-3.7 5.5C6.3 17.4 9 20 12.3 20c2.8 0 5-1.9 5-4.5 0-1.9-1.2-3-3-3.2" />
      <path d="M10 4c0 1.6 1.4 2.6 3 2.6" />
    </>
  ),
  // Sköldkörtel (fjäril) – hormoner
  endokrinolog: (
    <>
      <path d="M12 9.5c-1.4-2.2-3.4-3.4-5-2.8-2.2.8-2.3 4.3 0 6.3 1.4 1.2 3.2 1.2 5 .4" />
      <path d="M12 9.5c1.4-2.2 3.4-3.4 5-2.8 2.2.8 2.3 4.3 0 6.3-1.4 1.2-3.2 1.2-5 .4" />
      <path d="M12 9.5v6.5" />
    </>
  ),
  // Hand/leder (reumatologi)
  reumatolog: (
    <>
      <path d="M9 12V6a1.4 1.4 0 0 1 2.8 0v4.5" />
      <path d="M11.8 10.5V5a1.4 1.4 0 0 1 2.8 0v6" />
      <path d="M14.6 11V6.5a1.4 1.4 0 0 1 2.8 0V14c0 3.2-2.3 6-5.8 6-2.2 0-3.4-1-4.4-2.8l-1.5-2.8a1.5 1.5 0 0 1 2.5-1.7L11 13" />
    </>
  ),
};

const fallback = <path d="M12 5v14M5 12h14" />;

export function SpecialtyIcon({
  slug,
  ...props
}: { slug: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {paths[slug] ?? fallback}
    </svg>
  );
}
