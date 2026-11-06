// Central platsen för all varumärkes- och kontaktinformation.
// Ändra här så uppdateras hela sajten (header, footer, SEO, structured data).

export const site = {
  name: "Specialistdirekt",
  // Verifierat registrerat firmanamn.
  // "Specialistdirekt" är varumärket/tjänsten; Visaeb Medical Group AB är den juridiska person
  // som driver tjänsten och är personuppgiftsansvarig.
  legalName: "Visaeb Medical Group AB",
  // Kanonisk domän (www omdirigeras till apex i nginx).
  url: "https://specialistdirekt.se",
  locale: "sv_SE",
  lang: "sv",
  country: "SE",
  tagline: "Hitta rätt specialistläkare – snabbt och tryggt",
  description:
    "Privat specialistvård. Hos oss träffar du ortoped Dr. Masoud Sorkhabi i Göteborg och bokar tid direkt. För andra specialiteter skickar du en kostnadsfri tidsförfrågan.",
  // Kontakt. Telefonnummer och postadress publicerades tidigare inte alls, i
  // väntan på verifierade företagsuppgifter. De uppgifterna finns nu:
  // postadressen är bolagets postadress och numret är en separat arbetslinje,
  // bekräftad av uppdragsgivaren 2026-08-30.
  //
  // VIKTIGT: adressen är bolagets kontorsadress – INTE en mottagning. Ortopedi-
  // besöket sker hos läkaren i Göteborg, inte här. Skriv aldrig ut adressen som
  // besöksadress på en behandlings- eller bokningssida.
  //
  // MÅSTE vara en brevlåda som verkligen finns. Adressen står i sidfoten på varje
  // sida, i integritetspolicyn (dit GDPR-frågor ska skickas) och i strukturerad
  // data. "kontakt@" fanns här t.o.m. 18 aug 2026 men saknade brevlåda –
  // mejl dit studsade med "550 User unknown in virtual mailbox table", alltså
  // varje läsare som hörde av sig. Kontrollera adressen mot mailservern innan
  // den ändras.
  email: "info@specialistdirekt.se",
  // Separat arbetsnummer – inte en privat mobil. Visas som tel:-länk och i
  // Organization-schemat. Samma nummer ska stå på Google Företagsprofil och i
  // katalogerna; skiljer de sig åt tappar NAP-signalen sitt värde.
  phone: "+46728697203",
  phoneDisplay: "072-869 72 03",
  // Bolagets postadress. Kontorsadress – ingen mottagning. Se varningen ovan.
  address: {
    street: "Övre Hägnavägen 10",
    postalCode: "436 51",
    city: "Hovås",
    region: "Västra Götalands län",
    country: "SE",
  },
  // Sociala profiler. Används på två ställen: `sameAs` i Organization-schemat
  // (kopplar profilen till entiteten för Google och AI-assistenter) och som
  // länkar i sidfoten. Tom lista döljs på båda ställena.
  //
  // Lägg bara in profiler som verkligen finns och som vi äger – en felstavad
  // eller död URL i `sameAs` är en trasig entitetssignal, inte en neutral rad.
  social: ["https://www.instagram.com/specialistdirekt.se/"] as string[],
  // Används i strukturerad data och “Om oss”.
  foundingYear: 2026,
  // Google Analytics 4 (mätnings-ID). Tomt = av.
  gaMeasurementId: "G-NWLDYNC1TK",

  // Google Ads – ENBART konverteringsmätning, aldrig remarketing. Taggen laddas
  // vid sidan av GA4 och skickar en konvertering när en händelse i listan nedan
  // inträffar. Tomt ID = ingen Ads-tagg alls.
  adsConversionId: "AW-312691003",
  // Händelse -> konverteringsetikett. Bara händelser som står här skickas till
  // Google Ads. `booking_submitted` är kampanjens primära konvertering;
  // `booking_confirmed` följs bara i GA4 och ska INTE ligga här, annars börjar
  // budgivningen räkna samma patient två gånger.
  adsConversionLabels: {
    booking_submitted: "WfEmCP30_eMcELuSjZUB",
  } as Record<string, string>,
};

export type Site = typeof site;

// Huvudnavigering – återanvänds i header, footer och sitemap.
export const mainNav = [
  { href: "/sa-fungerar-det", label: "Så fungerar det" },
  { href: "/specialiteter", label: "Specialiteter" },
  { href: "/artiklar", label: "Artiklar" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/vanliga-fragor", label: "Vanliga frågor" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
