"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BOOKING_CLINIC_ADDRESS, bookingMapUrl } from "@/lib/booking-appointment";
import { site } from "@/lib/site";

// Robot-hjälpruta (ägarens kod 2026-11-23), anpassad till sajtens egna uppgifter:
// mottagningens adress och kartlänk från booking-appointment.ts, e-post från
// site.ts, bokning på /boka-tid och samma svarstidslöfte som resten av sajten.
//
// Renderas bara i webbläsaren (precis som originalskriptet). Serverns HTML
// ändras alltså inte, och samma text hamnar inte i varje sidas innehåll.

type Fraga = { fraga: string; svar: string[]; lankar: { text: string; href: string }[] };

const [GATA, POSTORT] = BOOKING_CLINIC_ADDRESS.split(", ");

const TEXT: Record<"sv" | "en", { rubrik: string; oppna: string; titel: string; etikett: string; fragor: Fraga[]; fotrad: string }> = {
  sv: {
    rubrik: "Snabba svar",
    oppna: "Frågor? Öppna hjälp",
    titel: "Frågor?",
    etikett: "Har du frågor?",
    fragor: [
      { fraga: "Var ligger ni?", svar: [GATA, POSTORT], lankar: [{ text: "Visa på karta", href: bookingMapUrl() }] },
      {
        fraga: "Hur bokar jag en tid?",
        svar: [
          "Ortopedbesök bokar du direkt här – välj en ledig tid i kalendern.",
          "Övriga specialister: skicka en kostnadsfri tidsförfrågan så hjälper vi dig vidare.",
        ],
        lankar: [
          { text: "Boka ortopedbesök →", href: "/boka-tid" },
          { text: "Hitta annan specialist →", href: "/#valj-specialist" },
        ],
      },
      {
        fraga: "Har du en fråga?",
        svar: ["Skriv till oss, så återkommer vi normalt inom en arbetsdag."],
        lankar: [{ text: site.email, href: `mailto:${site.email}` }],
      },
    ],
    fotrad: "Vid akuta tillstånd, ring 112.",
  },
  en: {
    rubrik: "Quick answers",
    oppna: "Questions? Open help",
    titel: "Questions?",
    etikett: "Any questions?",
    fragor: [
      { fraga: "Where are you located?", svar: [GATA, POSTORT], lankar: [{ text: "Show on map", href: bookingMapUrl() }] },
      {
        fraga: "How do I book an appointment?",
        svar: [
          "Orthopedic appointments are booked directly here – choose an available time in the calendar.",
          "Other specialists: send a free appointment request and we will help you further.",
        ],
        lankar: [
          { text: "Book an orthopedic visit →", href: "/boka-tid" },
          { text: "Find another specialist →", href: "/kontakt" },
        ],
      },
      {
        fraga: "Do you have a question?",
        svar: ["Write to us and we will normally get back to you within one working day."],
        lankar: [{ text: site.email, href: `mailto:${site.email}` }],
      },
    ],
    fotrad: "In an emergency, call 112.",
  },
};

// Privata bokningsvyer (bekräftelse, avbokning) får ingen hjälpruta.
const DOLD = /^\/boka-tid\/(bekrafta|bekraftad|bokad|avboka)(\/|$)/;

const CSS = `
.rh{--rh-farg:#0f766e;position:fixed;right:16px;bottom:16px;z-index:80;font:15px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#222}
.rh:not([open]) .rh__panel{display:none}
.rh__knapp{display:block;position:relative;cursor:pointer;list-style:none}
.rh__ikon{position:relative;display:flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;background:var(--rh-farg);color:#fff;border:3px solid #fff;box-sizing:border-box;box-shadow:0 8px 24px rgba(15,118,110,.45),0 2px 6px rgba(0,0,0,.2);transition:transform .2s ease}
.rh__ikon::before{content:'';position:absolute;inset:-3px;border-radius:50%;border:3px solid var(--rh-farg);opacity:0;animation:rh-puls 2.2s ease-out 1.2s 6;pointer-events:none}
.rh__knapp:hover .rh__ikon,.rh__knapp:focus-visible .rh__ikon{transform:scale(1.07)}
.rh__etikett{position:absolute;right:76px;top:50%;transform:translateY(-50%);white-space:nowrap;padding:.5rem .85rem;border-radius:999px;background:#fff;color:#0f3d3a;font-weight:700;font-size:.95rem;box-shadow:0 6px 20px rgba(0,0,0,.18);border:1px solid #d6efec;animation:rh-in .45s ease-out .8s both}
.rh__etikett::after{content:'';position:absolute;right:-6px;top:50%;width:12px;height:12px;background:#fff;border-right:1px solid #d6efec;border-top:1px solid #d6efec;transform:translateY(-50%) rotate(45deg)}
.rh[open] .rh__etikett,.rh--sedd .rh__etikett{display:none}
.rh[open] .rh__ikon::before{animation:none}
@keyframes rh-puls{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.55);opacity:0}}
@keyframes rh-in{from{opacity:0;transform:translate(8px,-50%)}to{opacity:1;transform:translate(0,-50%)}}
@media (prefers-reduced-motion:reduce){.rh__ikon::before,.rh__etikett{animation:none}.rh__ikon{transition:none}}
.rh__knapp::-webkit-details-marker,.rh__fraga::-webkit-details-marker{display:none}
.rh__knapp::marker,.rh__fraga::marker{content:''}
.rh .rh-x{display:none}.rh[open] .rh-robot{display:none}.rh[open] .rh-x{display:block}
.rh__panel{position:absolute;right:0;bottom:76px;width:340px;max-width:calc(100vw - 32px);max-height:calc(100vh - 110px);overflow-y:auto;box-sizing:border-box;padding:1rem 1.1rem;border:1px solid #ddd;border-radius:14px;background:#fff;box-shadow:0 16px 40px rgba(0,0,0,.18);text-align:left}
.rh__rubrik{margin:0 0 .6rem;font-size:1.15rem;font-weight:600}
.rh__del{border-top:1px solid #e5e5e5;padding:.7rem 0}
.rh__fraga{display:flex;justify-content:space-between;align-items:center;gap:.5rem;font-weight:700;cursor:pointer;list-style:none}
.rh__fraga::after{content:'+';color:var(--rh-farg);font-size:1.25rem;line-height:1}
.rh__del[open]>.rh__fraga::after{content:'\\2212'}
.rh__del:not([open])>.rh__svar{display:none}
.rh__svar{padding-top:.45rem}.rh__svar p{margin:0 0 .3rem}
.rh__svar a{color:var(--rh-farg);font-weight:700}
.rh__fot{margin:.4rem 0 0;padding-top:.6rem;border-top:1px solid #e5e5e5;font-size:.88rem;color:#666}
@media (max-width:480px){.rh{right:12px;bottom:12px}.rh__ikon{width:58px;height:58px}.rh__etikett{right:68px;font-size:.88rem;padding:.4rem .7rem}.rh__panel{width:calc(100vw - 24px);max-width:calc(100vw - 24px);bottom:70px}}
`;

const LINJE = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, fill: "none" };

export function RobotHelp() {
  const pathname = usePathname() ?? "/";
  const [klar, setKlar] = useState(false);
  const [sedd, setSedd] = useState(false);
  const ruta = useRef<HTMLDetailsElement>(null);
  const knapp = useRef<HTMLElement>(null);

  useEffect(() => {
    setKlar(true);
    try {
      if (sessionStorage.getItem("rh-sedd") === "1") setSedd(true);
    } catch {}
  }, []);
  const vaxla = () => {
    if (ruta.current?.open && !sedd) {
      setSedd(true);
      try {
        sessionStorage.setItem("rh-sedd", "1");
      } catch {}
    }
  };

  // Stäng vid sidbyte, klick utanför och Escape (som originalet).
  useEffect(() => {
    if (ruta.current) ruta.current.open = false;
  }, [pathname]);
  useEffect(() => {
    if (!klar) return;
    const klick = (e: MouseEvent) => {
      const r = ruta.current;
      if (r?.open && !r.contains(e.target as Node)) r.open = false;
    };
    const tangent = (e: KeyboardEvent) => {
      const r = ruta.current;
      if (e.key === "Escape" && r?.open) {
        r.open = false;
        knapp.current?.focus();
      }
    };
    document.addEventListener("click", klick);
    document.addEventListener("keydown", tangent);
    return () => {
      document.removeEventListener("click", klick);
      document.removeEventListener("keydown", tangent);
    };
  }, [klar]);

  if (!klar || DOLD.test(pathname)) return null;
  const t = TEXT[pathname === "/en" || pathname.startsWith("/en/") ? "en" : "sv"];

  return (
    <>
      <style>{CSS}</style>
      <details className={sedd ? "rh rh--sedd" : "rh"} id="robot-hjalp" ref={ruta} onToggle={vaxla}>
        <summary className="rh__knapp" aria-label={t.oppna} title={t.titel} ref={knapp}>
          <span className="rh__etikett" aria-hidden="true">
            {t.etikett}
          </span>
          <span className="rh__ikon">
          <svg className="rh-robot" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
            <line {...LINJE} x1="12" y1="2.5" x2="12" y2="5.5" />
            <circle cx="12" cy="2.5" r="1.3" fill="currentColor" />
            <rect {...LINJE} x="4" y="6" width="16" height="12.5" rx="3.5" />
            <circle cx="9" cy="11.5" r="1.6" fill="currentColor" />
            <circle cx="15" cy="11.5" r="1.6" fill="currentColor" />
            <path {...LINJE} d="M9 15.2h6" />
            <path {...LINJE} d="M2 11v3M22 11v3" />
          </svg>
          <svg className="rh-x" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          </span>
        </summary>
        <div className="rh__panel">
          <p className="rh__rubrik">{t.rubrik}</p>
          {t.fragor.map((f) => {
            return (
              <details className="rh__del" key={f.fraga}>
                <summary className="rh__fraga">{f.fraga}</summary>
                <div className="rh__svar">
                  {f.svar.map((rad) => (
                    <p key={rad}>{rad}</p>
                  ))}
                  {f.lankar.map((l) => (
                    <p key={l.href}>
                      <a href={l.href} {...(/^https?:/i.test(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {l.text}
                      </a>
                    </p>
                  ))}
                </div>
              </details>
            );
          })}
          <p className="rh__fot">{t.fotrad}</p>
        </div>
      </details>
    </>
  );
}
