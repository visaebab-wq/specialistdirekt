// Patientens väg i bokningsflödet. Används på /sa-fungerar-det och i dess
// HowTo-schema. Direktbokning och bokningsförfrågan hålls isär: en förfrågan
// är aldrig en bekräftad bokning.

export const steps = [
  {
    icon: "01",
    title: "Välj specialistområde",
    text: "Välj det område du behöver hjälp med, till exempel ortopedi, kardiologi eller neurologi.",
  },
  {
    icon: "02",
    title: "Läs om besöket och läkaren",
    text: "Se vad besöket gäller och, när det är känt, vilken läkare du träffar, var besöket sker och vad det kostar.",
  },
  {
    icon: "03",
    title: "Välj tid eller skicka förfrågan",
    text: "Ortopedbesök hos Dr. Masoud Sorkhabi i Göteborg bokar du direkt i kalendern. För andra specialiteter skickar du en kostnadsfri bokningsförfrågan.",
  },
  {
    icon: "04",
    title: "Få bekräftelse",
    text: "Vid direktbokning bekräftar du tiden via länken i mejlet. Efter en bokningsförfrågan får du besked om möjlig tid och pris – tiden är bokad först när den bekräftats.",
  },
  {
    icon: "05",
    title: "Besök specialistläkaren",
    text: "Du träffar läkaren, som gör den medicinska bedömningen vid besöket.",
  },
];

export function HowItWorks() {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="relative rounded-2xl border border-ink-200 bg-white p-6"
        >
          <span className="absolute -top-3 left-6 rounded-full bg-brand-700 px-3 py-0.5 text-xs font-bold text-white">
            Steg {i + 1}
          </span>
          <span
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 ring-1 ring-brand-100"
          >
            {step.icon}
          </span>
          <h2 className="mt-3 text-lg font-semibold text-ink-900">{step.title}</h2>
          <p className="mt-2 text-ink-600 leading-relaxed">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
