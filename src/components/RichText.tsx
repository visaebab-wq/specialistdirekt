import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// Tolkar en begränsad, säker delmängd av markdown till React-noder:
//   [text](/intern/sökväg)  → <Link> (endast interna sökvägar som börjar med /)
//   **fet**                 → <strong>
// Eftersom vi bygger React-element (inte HTML-strängar) finns ingen XSS-risk.

const TOKEN = /\[([^\]]+)\]\((\/[^)]*)\)|\*\*([^*]+)\*\*/g;

export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    if (match[1] && match[2]) {
      // Intern länk – bra för internlänkning/SEO.
      nodes.push(
        <Link key={key++} href={match[2]} className="font-medium text-brand-700 hover:underline">
          {match[1]}
        </Link>,
      );
    } else if (match[3]) {
      nodes.push(<strong key={key++}>{match[3]}</strong>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}

/** Renderar en lista med stycken som <p>. */
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className="mt-4 leading-relaxed text-ink-700">
          {renderInline(p)}
        </p>
      ))}
    </>
  );
}
