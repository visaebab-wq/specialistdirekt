// Renderar strukturerad data (schema.org / JSON-LD) som Google och
// AI-assistenter läser för att förstå sidan. Återanvänds på alla sidor.

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Innehållet är vår egen, statiska data – ingen användarinmatning.
      // "<" escapas ändå, så att text med "</script>" aldrig kan avsluta taggen.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
