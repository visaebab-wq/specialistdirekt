// Omdömen som visas på startsidan. BYT UT mot riktiga, verifierade omdömen
// innan lansering – de nedan är tydligt märkta som exempel.
//
// Viktigt: publicera bara omdömen du faktiskt fått tillstånd att visa.

export type Testimonial = {
  quote: string;
  author: string;
  /** Sätt false när det är ett riktigt, verifierat omdöme. */
  isExample: boolean;
};

// Lägg till riktiga omdömen här när du har fått tillstånd att visa dem, t.ex.:
//   { quote: "…", author: "Anna, Göteborg", isExample: false }
// Tills listan har innehåll visar startsidan en faktabaserad trygghetspanel
// i stället för omdömen (inga påhittade citat visas).
export const testimonials: Testimonial[] = [];
