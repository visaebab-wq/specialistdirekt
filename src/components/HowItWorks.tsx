// Stegen i förmedlingsflödet. Återanvänds på startsidan och /sa-fungerar-det.

import type { ReactNode } from "react";

const ico = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Step = {
  icon: ReactNode;
  title: string;
  text: string;
};

export const steps: Step[] = [
  {
    icon: (
      <>
        <path d="M5 5.5h8.5" />
        <path d="M5 10h6" />
        <path d="M5 14.5h4.5" />
        <path d="M14.5 19.5l4.8-4.8a1.8 1.8 0 0 0-2.5-2.5L12 17v2.5h2.5z" />
        <path d="M4 21h16" />
      </>
    ),
    title: "Beskriv ditt behov",
    text: "Fyll i ett kort formulär och berätta vad du söker hjälp med. Det tar bara någon minut.",
  },
  {
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="M14.7 14.7 20 20" />
        <path d="M8.4 10.5h4.2" />
        <path d="M10.5 8.4v4.2" />
      </>
    ),
    title: "Vi matchar dig",
    text: "Vi går igenom din förfrågan och hittar en eller flera specialister som passar just ditt behov.",
  },
  {
    icon: (
      <>
        <path d="M7 12.4 4.8 10.2a2.4 2.4 0 0 1 3.4-3.4l1.5 1.5" />
        <path d="M17 12.4l2.2-2.2a2.4 2.4 0 0 0-3.4-3.4l-1.5 1.5" />
        <path d="M8.7 14.1 12 17.4l3.3-3.3" />
        <path d="M12 17.4V8.7" />
        <path d="M7 12.4c1.3 4 3.2 6.3 5 7.1 1.8-.8 3.7-3.1 5-7.1" />
      </>
    ),
    title: "Kom i kontakt",
    text: "Du får kontaktförslag och kan boka tid direkt med specialisten. Kostnadsfritt och utan förpliktelser.",
  },
];

export function HowItWorks() {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="relative rounded-2xl border border-ink-200 bg-white p-6"
        >
          <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-bold text-white">
            Steg {i + 1}
          </span>
          <span aria-hidden className="neon-icon-badge neon-icon-badge-card">
            <svg viewBox="0 0 24 24" className="h-6 w-6" {...ico}>
              {step.icon}
            </svg>
          </span>
          <h3 className="mt-3 text-lg font-semibold text-ink-900">{step.title}</h3>
          <p className="mt-2 text-ink-600 leading-relaxed">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
