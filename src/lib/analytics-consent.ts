/** Gemensam samtyckesstatus för all klientmätning. */
export const CONSENT_KEY = "cookie-consent-v2";

/** Sidfoten använder händelsen för att öppna samtyckesdialogen igen. */
export const CONSENT_REOPEN_EVENT = "specialistdirekt:cookie-settings";

/**
 * Samma-flik-händelse för samtyckesändringar. `storage`-händelsen skickas bara
 * till andra flikar, så analyskomponenten behöver en uttrycklig signal också.
 */
export const CONSENT_CHANGE_EVENT = "specialistdirekt:analytics-consent";

/** Lokal signal när en ändring från en annan flik har lästs och verifierats. */
export const CONSENT_SYNC_EVENT = "specialistdirekt:analytics-consent-sync";

/** Samma signal mellan redan öppna flikar när localStorage-händelsen uteblir. */
export const CONSENT_BROADCAST_CHANNEL = "specialistdirekt:analytics-consent-v1";

/** Kortlivad markör för fokusåtergång om samtyckesåterkallelse krävde omladdning. */
export const CONSENT_RETURN_FOCUS_KEY = "sd-cookie-settings-return-focus";

export type AnalyticsConsent = "granted" | "denied";

const CONSENT_COOKIE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;
const SAFE_COOKIE_NAME = /^[A-Za-z0-9_.-]+$/;

type StoredConsentSnapshot = {
  readable: boolean;
  raw: string | null;
  value: AnalyticsConsent | null;
};

function readStoredConsentSnapshot(): StoredConsentSnapshot {
  if (typeof window === "undefined") return { readable: false, raw: null, value: null };

  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return {
      readable: true,
      raw,
      value: raw === "granted" || raw === "denied" ? raw : null,
    };
  } catch {
    return { readable: false, raw: null, value: null };
  }
}

function isGoogleMeasurementCookie(name: string): boolean {
  if (!SAFE_COOKIE_NAME.test(name)) return false;
  return (
    name.startsWith("_ga") ||
    name === "_gid" ||
    name.startsWith("_gat") ||
    name.startsWith("_gac") ||
    name.startsWith("_gcl")
  );
}

function secureCookieAttribute(): string {
  return window.location.protocol === "https:" ? "; Secure" : "";
}

function expireCookie(name: string, path: string, domain?: string): void {
  const domainAttribute = domain ? `; Domain=${domain}` : "";
  document.cookie = `${name}=; Path=${path}${domainAttribute}; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${secureCookieAttribute()}`;
}

function relevantCookiePaths(): string[] {
  const paths = new Set<string>(["/"]);
  const segments = window.location.pathname.split("/").filter(Boolean);

  let path = "";
  for (const segment of segments) {
    // Semikolon och andra attributtecken får aldrig hamna i en cookie-sträng.
    if (!/^[A-Za-z0-9%._~-]+$/.test(segment)) break;
    path += `/${segment}`;
    paths.add(path);
    paths.add(`${path}/`);
  }

  return [...paths];
}

function relevantCookieDomains(): Array<string | undefined> {
  const domains = new Set<string | undefined>([undefined]);
  const hostname = window.location.hostname.toLowerCase();

  // Både värdspecifika cookies och domäncookies kan förekomma beroende på
  // vilken Google-tagg som skapade dem och om besökaren använde www-värden.
  if (hostname && hostname !== "localhost" && !/^\[?[\d.:]+\]?$/.test(hostname)) {
    domains.add(hostname);
    domains.add(`.${hostname}`);

    if (hostname === "specialistdirekt.se" || hostname.endsWith(".specialistdirekt.se")) {
      domains.add("specialistdirekt.se");
      domains.add(".specialistdirekt.se");
    }
  }

  return [...domains];
}

function expireConsentCookie(): void {
  for (const path of relevantCookiePaths()) {
    for (const domain of relevantCookieDomains()) {
      expireCookie(CONSENT_KEY, path, domain);
    }
  }
}

function writeConsentCookie(value: AnalyticsConsent): void {
  // Rensa eventuella äldre path/domain-varianter så att servern aldrig får två
  // motstridiga värden för samma samtyckesnyckel.
  expireConsentCookie();
  document.cookie = `${CONSENT_KEY}=${value}; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secureCookieAttribute()}`;
}

/** Läs den förstapartscookie som serverns samtyckesgrind använder. */
export function readAnalyticsConsentCookie(): AnalyticsConsent | null {
  if (typeof document === "undefined") return null;

  try {
    let granted = false;
    for (const part of document.cookie.split(";")) {
      const separator = part.indexOf("=");
      if (separator < 0 || part.slice(0, separator).trim() !== CONSENT_KEY) continue;

      const value = part.slice(separator + 1).trim();
      // Ett uttryckligt nej vinner alltid över äldre eller dubbla granted-cookies.
      if (value === "denied") return "denied";
      if (value === "granted") granted = true;
    }
    return granted ? "granted" : null;
  } catch {
    return null;
  }
}

/** Rensa de Google-mätcookies som är åtkomliga från den aktuella sidan. */
export function clearGoogleMeasurementCookies(): void {
  if (typeof window === "undefined") return;

  try {
    const names = new Set(["_ga", "_gid", "_gat", "_gac", "_gcl_au"]);
    for (const part of document.cookie.split(";")) {
      const name = part.trim().split("=", 1)[0];
      if (isGoogleMeasurementCookie(name)) names.add(name);
    }

    const paths = relevantCookiePaths();
    const domains = relevantCookieDomains();
    for (const name of names) {
      for (const path of paths) {
        for (const domain of domains) {
          expireCookie(name, path, domain);
        }
      }
    }
  } catch {
    // Cookie-städning får inte göra samtyckesdialogen obrukbar.
  }
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;

  const stored = readStoredConsentSnapshot();
  if (stored.value === "denied") return "denied";
  if (stored.value === "granted") {
    const cookie = readAnalyticsConsentCookie();
    // Ett uttryckligt nej i cookien är fail-closed och får inte skrivas över av
    // ett äldre granted-värde som webbläsaren vägrar ändra i localStorage.
    if (cookie === "denied") return "denied";
    // Ja kräver båda lagringsdelarna. När 12-månaderscookien löper ut blir
    // samtycket ogiltigt i stället för att återskapas och förlängas för evigt.
    return cookie === "granted" ? "granted" : null;
  }
  // Saknade eller korrupta localStorage-värden förblir null så att bannern visas.
  return null;
}

export function analyticsConsentGranted(): boolean {
  return readAnalyticsConsent() === "granted";
}

export function announceAnalyticsConsent(value: AnalyticsConsent): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<AnalyticsConsent>(CONSENT_CHANGE_EVENT, { detail: value }));
  try {
    const channel = new BroadcastChannel(CONSENT_BROADCAST_CHANNEL);
    channel.postMessage(value);
    channel.close();
  } catch {
    // Fokus/visibility-kontrollen i Analytics är reservväg i äldre webbläsare.
  }
}

/**
 * Spara ett uttryckligt val i både lokal lagring och en förstapartscookie.
 * Ett ja blir giltigt först när det går att läsa tillbaka ur localStorage.
 */
export function persistAnalyticsConsent(value: AnalyticsConsent): AnalyticsConsent {
  if (typeof window === "undefined") return "denied";

  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Analyskomponenten kräver att ett ja kan läsas tillbaka innan taggar laddas.
  }

  const stored = readStoredConsentSnapshot();
  const effectiveValue = value === "granted" && stored.raw !== "granted" ? "denied" : value;

  try {
    writeConsentCookie(effectiveValue);
  } catch {
    // Ett blockerat cookie-API får inte göra samtyckesdialogen obrukbar.
  }

  if (effectiveValue === "denied") clearGoogleMeasurementCookies();
  announceAnalyticsConsent(effectiveValue);
  return effectiveValue;
}

/** Återkalla valet helt och öppna för ett nytt val. */
export function withdrawAnalyticsConsent(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }

  const stored = readStoredConsentSnapshot();
  try {
    if (stored.readable && stored.raw === null) {
      expireConsentCookie();
    } else {
      // Om borttagningen inte kan verifieras måste ett uttryckligt nej ligga
      // kvar och vinna över ett eventuellt stale granted i localStorage.
      writeConsentCookie("denied");
    }
  } catch {
    /* ignore */
  }

  clearGoogleMeasurementCookies();
  announceAnalyticsConsent("denied");
}

/** Ta bort markörer som äldre versioner sparade permanent efter en bokning. */
export function clearLegacyBookingEventMarkers(): void {
  if (typeof window === "undefined") return;
  try {
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const key = window.localStorage.key(i);
      if (key?.startsWith("sd-booking-confirmed:")) window.localStorage.removeItem(key);
    }
  } catch {
    // Integritetsstädningen får inte göra sidan obrukbar om lagring är blockerad.
  }
}
