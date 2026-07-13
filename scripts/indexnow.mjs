// IndexNow-submittering. Meddelar sökmotorer (Bing, Yandex m.fl.) om nya/ändrade
// URL:er så att de kan crawlas snabbare. Google använder INTE IndexNow – Google
// submittas manuellt via Search Console.
//
// Krav innan körning:
//   1. En IndexNow-nyckel måste finnas publikt på sajten:
//      https://specialistdirekt.se/<KEY>.txt (filens innehåll = nyckeln).
//   2. Sätt nyckeln som miljövariabel INDEXNOW_KEY.
//   3. Sidorna måste vara LIVE (deployade) – annars 404:ar de vid crawl.
//
// Användning:
//   INDEXNOW_KEY=<key> node scripts/indexnow.mjs \
//     https://specialistdirekt.se/privat-gastroenterolog \
//     https://specialistdirekt.se/privat-gastroskopi \
//     https://specialistdirekt.se/privat-koloskopi \
//     https://specialistdirekt.se/artiklar/uppblast-mage

const HOST = "specialistdirekt.se";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const key = process.env.INDEXNOW_KEY;
const urls = process.argv.slice(2);

if (!key) {
  console.error("Saknar INDEXNOW_KEY. Avbryter.");
  process.exit(1);
}
if (urls.length === 0) {
  console.error("Inga URL:er angivna. Avbryter.");
  process.exit(1);
}

const body = {
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${key}.txt`,
  urlList: urls,
};

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

const text = await res.text();
console.log(`IndexNow HTTP ${res.status}`);
console.log(text || "(tomt svar)");
// 200/202 = accepterat. 403 = nyckeln kunde inte verifieras (kontrollera key-filen).
process.exit(res.ok ? 0 : 1);
