// Stegen i förmedlingsflödet. Återanvänds på startsidan och /sa-fungerar-det.

export const steps = [
  {
    icon: "📝",
    title: "Beskriv ditt behov",
    text: "Fyll i ett kort formulär och berätta vad du söker hjälp med. Det tar bara någon minut.",
  },
  {
    icon: "🔎",
    title: "Vi matchar dig",
    text: "Vi går igenom din förfrågan och hittar en eller flera specialister som passar just ditt behov.",
  },
  {
    icon: "🤝",
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
          <span aria-hidden className="text-3xl">
            {step.icon}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-ink-900">{step.title}</h3>
          <p className="mt-2 text-ink-600 leading-relaxed">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
