/**
 * Vyer som bär en bokningsnyckel i URL:en och därför aldrig får mätas.
 *
 * BAKGRUND. Bekräftelse- och avbokningslänkarna ser ut så här:
 *   /boka-tid/bekrafta?id=<boknings-id>&sig=<signatur>
 *   /boka-tid/avboka?id=<boknings-id>&sig=<signatur>
 *
 * Google-taggen skickar automatiskt hela sidadressen som `page_location` (fältet
 * `dl`). Då hamnar både id och signatur hos GA4 och Google Ads. Servern kräver
 * exakt id + giltig sig för att visa, bekräfta OCH avboka – ingen session, ingen
 * ytterligare behörighet. Paret är alltså inte "bara en identifierare" utan den
 * enda nyckeln till en enskild patients tid.
 *
 * VIKTIGT: listan styr både om taggen över huvud taget renderas och de
 * skärpta svarsheadrarna i next.config.ts. Lägg till en väg på BÅDA ställena
 * om en ny token-bärande vy tillkommer.
 *
 * /boka-tid och /boka-tid/barn står medvetet INTE här: de har ingen token i
 * URL:en, och där ligger konverteringen `booking_submitted`. Att stänga av
 * mätning där hade varit en bred avstängning utan att lösa läckaget.
 */
export const SENSITIVE_PATH_PREFIXES = [
  "/boka-tid/bekrafta",
  "/boka-tid/avboka",
] as const;

export function isSensitivePath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const p = pathname.split("?")[0];
  return SENSITIVE_PATH_PREFIXES.some((s) => p === s || p.startsWith(`${s}/`));
}

/**
 * Utgångsfilter som installeras I SAMMA ÖGONBLICK som Google-taggen – alltså
 * bara i dokument där taggen finns, och alltid före taggens första anrop.
 *
 * VARFÖR DET BEHÖVS trots att taggen inte renderas på de känsliga vyerna:
 * en besökare kan komma till en känslig vy genom klientnavigering (router,
 * bakåt/framåt) i ett dokument där gtag.js redan är laddat. Uppmätt lokalt:
 *   - Ads-taggen skickade då en BILD-GET till google.com/ccm/collect med hela
 *     adressen i `dl`, innan någon React-effekt hunnit köra.
 *   - GA4 KÖADE sidvisningen och skickade den först efter att vyn lämnats –
 *     med den känsliga adressen kvar i `dl`.
 * En spärr som slås på/av per vy förlorar alltså båda kapplöpningarna.
 *
 * Filtret är därför permanent och synkront: varje utgående anrop till en
 * mät-/annonsdomän granskas i sändningsögonblicket och KASTAS om
 *   (a) sidan just nu är en känslig vy, eller
 *   (b) anropets URL eller textkropp innehåller en känslig sökväg
 *       (täcker köade träffar och page_referrer efter att vyn lämnats).
 * Inget köas, inget skrivs om, inget skickas senare. På vanliga sidor utan
 * känsligt innehåll i anropet är filtret en ren genomsläppning.
 *
 * Täcker sendBeacon, fetch, XMLHttpRequest och bild-pixlar (img.src).
 */
export function outboundFilterSnippet(): string {
  return `(function(){
  if (window.__sdOutboundFilter) return; window.__sdOutboundFilter = true;
  var SENS = ${JSON.stringify(SENSITIVE_PATH_PREFIXES)};
  var HOSTS = /(^|\\.)google-analytics\\.com$|(^|\\.)analytics\\.google\\.com$|(^|\\.)googletagmanager\\.com$|(^|\\.)doubleclick\\.net$|(^|\\.)googleadservices\\.com$|(^|\\.)google\\.com$|(^|\\.)plausible\\.io$/i;
  function hasSens(t){ if(!t) return false; var s=String(t); try{ s+=' '+decodeURIComponent(s); }catch(e){}
    for(var i=0;i<SENS.length;i++){ if(s.indexOf(SENS[i])!==-1) return true; } return false; }
  function hereSens(){ var p=location.pathname;
    for(var i=0;i<SENS.length;i++){ if(p===SENS[i]||p.indexOf(SENS[i]+'/')===0) return true; } return false; }
  function isTracker(u){ try{ return HOSTS.test(new URL(String(u), location.href).hostname); }catch(e){ return false; } }
  function drop(u, body){ if(!isTracker(u)) return false;
    var d = hereSens() || hasSens(u) || (typeof body==='string' && hasSens(body));
    if(d) window.__sdDropped = (window.__sdDropped||0)+1; return d; }
  if (navigator.sendBeacon) { var ob = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function(u, data){ if(drop(u, data)) return true; return ob(u, data); }; }
  if (window.fetch) { var of = window.fetch;
    window.fetch = function(input, init){ var u = (typeof input==='string'||input instanceof URL) ? input : (input&&input.url);
      if(drop(u, init&&init.body)) return Promise.resolve(new Response(null, {status:204})); return of.apply(this, arguments); }; }
  var xo = XMLHttpRequest.prototype.open, xs = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(m, u){ this.__sdUrl = u; return xo.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function(body){ if(drop(this.__sdUrl, body)){ try{ this.abort(); }catch(e){} return; } return xs.apply(this, arguments); };
  var idesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  if (idesc && idesc.set) { Object.defineProperty(HTMLImageElement.prototype, 'src', { configurable:true, enumerable:idesc.enumerable,
    get: idesc.get, set: function(v){ if(drop(v)) return; idesc.set.call(this, v); } }); }
})();`;
}
