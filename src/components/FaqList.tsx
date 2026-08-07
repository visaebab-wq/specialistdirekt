import type { Faq } from "@/lib/faq";
import { renderInline } from "@/components/RichText";

// Använder native <details>/<summary> – tillgängligt, fungerar utan JS
// och är lätt för sökmotorer att läsa. Svaren stöder samma säkra inline-markup
// som artiklar ([text](/intern/sökväg) och **fet**) så att interna länkar i
// FAQ-svar blir riktiga <a>-taggar i initial HTML.
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="readable-card divide-y divide-ink-200/80 overflow-hidden bg-white">
      {items.map((faq) => (
        <details key={faq.question} className="group px-5 transition-colors open:bg-brand-50/45">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-ink-900 marker:content-['']">
            {faq.question}
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg leading-none text-brand-700 ring-1 ring-brand-100 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-5 leading-relaxed text-ink-600">{renderInline(faq.answer)}</p>
        </details>
      ))}
    </div>
  );
}
