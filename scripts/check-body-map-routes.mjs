// Verifierar att VARJE destination i kroppskartan pekar på en sida som
// faktiskt finns i det här bygget. Körs som test – misslyckas hellre här än
// att skicka en död länk till produktion.
//
//   node scripts/check-body-map-routes.mjs
//
// Kontrollen läser konfigurationen som text (ingen TS-runtime behövs) och
// jämför mot filsystemet: artiklar mot src/content/articles + registret i
// src/lib/articles.ts, specialiteter mot src/lib/specialties.ts och statiska
// sidor mot app-routern.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (p) => readFileSync(join(root, p), "utf8");

const config = read("src/lib/body-map.ts");
const articlesRegistry = read("src/lib/articles.ts");
const specialtiesSrc = read("src/lib/specialties.ts");

const failures = [];
const notes = [];

// --- Register som faktiskt renderas -----------------------------------------

// En artikel är nåbar bara om den både har en fil OCH är importerad i registret.
const articleFiles = new Set(
  readdirSync(join(root, "src/content/articles"))
    .filter((f) => f.endsWith(".ts"))
    .map((f) => f.replace(/\.ts$/, "")),
);
const importedArticles = new Set(
  [...articlesRegistry.matchAll(/@\/content\/articles\/([a-z0-9-]+)/g)].map((m) => m[1]),
);
const liveArticles = new Set([...articleFiles].filter((s) => importedArticles.has(s)));

const liveSpecialties = new Set(
  [...specialtiesSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
);

// Statiska sidor: page.tsx-filer under src/app (utan dynamiska segment).
function collectRoutes(dir, prefix = "") {
  const out = [];
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith("[")) continue;
      out.push(...collectRoutes(join(dir, entry.name), `${prefix}/${entry.name}`));
    } else if (entry.name === "page.tsx") {
      out.push(prefix === "" ? "/" : prefix);
    }
  }
  return out;
}
const liveRoutes = new Set(collectRoutes("src/app"));

// --- Destinationer i konfigurationen ----------------------------------------

const articleRefs = [...config.matchAll(/kind:\s*"article",\s*slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const specialtyRefs = [...config.matchAll(/kind:\s*"specialty",\s*slug:\s*"([^"]+)"/g)].map(
  (m) => m[1],
);
const pageRefs = [...config.matchAll(/^\s*"(\/[a-z0-9/-]*)":\s*"/gm)].map((m) => m[1]);

if (articleRefs.length === 0 || specialtyRefs.length === 0 || pageRefs.length === 0) {
  failures.push("Kunde inte läsa ut destinationer ur src/lib/body-map.ts – har formatet ändrats?");
}

for (const slug of new Set(articleRefs)) {
  if (liveArticles.has(slug)) continue;
  if (articleFiles.has(slug)) {
    failures.push(`Artikeln "${slug}" finns som fil men är inte importerad i src/lib/articles.ts`);
  } else {
    // Saknad artikel är inte ett fel: resolveDestinations filtrerar bort den, så
    // ingen död länk kan renderas. Men det ska synas i loggen.
    notes.push(`Artikeln "${slug}" finns inte i den här grenen – länken utelämnas automatiskt.`);
  }
}

for (const slug of new Set(specialtyRefs)) {
  if (!liveSpecialties.has(slug)) {
    failures.push(`Specialiteten "${slug}" finns inte i src/lib/specialties.ts`);
  }
}

for (const href of new Set(pageRefs)) {
  if (!liveRoutes.has(href)) {
    failures.push(`Sidan "${href}" finns inte som route under src/app`);
  }
}

// --- Varje aktivt område måste ha minst en giltig destination ----------------

const regionBlocks = config.split(/\n  \{\n    id: "/).slice(1);
for (const block of regionBlocks) {
  const id = block.slice(0, block.indexOf('"'));
  if (/enabled:\s*false/.test(block)) continue;
  const arts = [...block.matchAll(/kind:\s*"article",\s*slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const specs = [...block.matchAll(/kind:\s*"specialty",\s*slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const valid =
    arts.filter((s) => liveArticles.has(s)).length + specs.filter((s) => liveSpecialties.has(s)).length;
  if (valid === 0) {
    failures.push(`Området "${id}" är aktivt men har ingen destination som finns i bygget`);
  }
}

// --- Resultat ---------------------------------------------------------------

const checked = new Set([...articleRefs, ...specialtyRefs, ...pageRefs]).size;
for (const note of notes) console.log(`ANM  ${note}`);

if (failures.length > 0) {
  console.error(`\nFEL: ${failures.length} problem i kroppskartans länkar:`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`OK: ${checked} unika destinationer verifierade, inga döda länkar.`);
