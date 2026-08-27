"use client";

import { useState } from "react";

type Sex = "female" | "male";
type View = "front" | "back";
/** Vilken vit organmask området lyser genom. "deep" = hjärta/lever/tarm/
 *  livmoder (r−b ≳ 72), "pale" = lungor/bröstvävnad (r−b 20–70). */
type Mask = "deep" | "pale";
type Region = { id: string; label: string; cx: number; cy: number; rx: number; ry: number; clip: string; specialty: string; href: string; mask?: Mask; hitboxes?: Array<{ cx: number; cy: number; rx: number; ry: number }> };

const frontCommon: Region[] = [
  { id: "blood", label: "Blod & kärl", cx: 320, cy: 300, rx: 18, ry: 165, clip: "polygon(51% 7%, 88% 7%, 91% 86%, 50% 86%)", specialty: "Hematolog", href: "/specialiteter/hematolog" },
  { id: "breast", label: "Bröstvävnad", cx: 320, cy: 220, rx: 84, ry: 42, clip: "polygon(57% 23%, 65% 20%, 69% 23%, 72% 20%, 80% 23%, 81% 32%, 73% 35%, 68% 32%, 63% 35%, 56% 31%)", specialty: "Allmänmedicin", href: "/specialiteter/allmanmedicin", mask: "pale" },
  { id: "lungs", label: "Lungor", cx: 320, cy: 204, rx: 64, ry: 50, clip: "polygon(57% 19%, 65% 17%, 69% 22%, 72% 17%, 79% 20%, 81% 31%, 73% 34%, 69% 31%, 64% 34%, 56% 30%)", specialty: "Allmänmedicin", href: "/specialiteter/allmanmedicin", mask: "pale", hitboxes: [{ cx: 286, cy: 204, rx: 34, ry: 52 }, { cx: 356, cy: 204, rx: 34, ry: 52 }] },
  { id: "heart", label: "Hjärta", cx: 326, cy: 225, rx: 25, ry: 30, clip: "polygon(67% 25%, 70% 23%, 74% 26%, 74% 32%, 71% 35%, 67% 32%)", specialty: "Kardiolog", href: "/specialiteter/kardiolog", mask: "deep" },
  { id: "upper-abdomen", label: "Lever & magsäck", cx: 320, cy: 292, rx: 72, ry: 38, clip: "polygon(58% 34%, 78% 34%, 80% 42%, 73% 45%, 59% 44%, 56% 39%)", specialty: "Gastroenterolog", href: "/specialiteter/gastroenterolog", mask: "deep" },
  { id: "intestines", label: "Tarmar", cx: 320, cy: 342, rx: 52, ry: 38, clip: "polygon(57% 40%, 77% 40%, 79% 47%, 76% 52%, 59% 52%, 56% 47%)", specialty: "Gastroenterolog", href: "/specialiteter/gastroenterolog", mask: "deep" },
];

const backRegions: Region[] = [
  { id: "bones", label: "Skelett", cx: 320, cy: 330, rx: 112, ry: 245, clip: "polygon(50% 5%, 88% 5%, 91% 92%, 49% 92%)", specialty: "Ortoped", href: "/specialiteter/ortoped" },
  { id: "spine", label: "Ryggrad", cx: 320, cy: 285, rx: 27, ry: 175, clip: "polygon(64.5% 11%, 69.5% 11%, 69% 48%, 67.5% 51%, 65% 48%)", specialty: "Ortoped", href: "/specialiteter/ortoped" },
  { id: "joints", label: "Leder", cx: 320, cy: 482, rx: 90, ry: 42, clip: "polygon(52% 63%, 87% 63%, 88% 76%, 51% 76%)", specialty: "Ortoped", href: "/specialiteter/ortoped" },
  { id: "knees", label: "Knän", cx: 320, cy: 505, rx: 76, ry: 32, clip: "polygon(53% 66%, 82% 66%, 82% 74%, 53% 74%)", specialty: "Ortoped", href: "/specialiteter/ortoped", hitboxes: [{ cx: 278, cy: 505, rx: 27, ry: 34 }, { cx: 352, cy: 505, rx: 27, ry: 34 }] },
  { id: "hands", label: "Händer & handleder", cx: 320, cy: 382, rx: 116, ry: 40, clip: "polygon(37% 49%, 48% 44%, 50% 56%, 89% 44%, 96% 50%, 92% 59%, 82% 55%, 79% 48%, 54% 48%, 51% 57%, 39% 59%)", specialty: "Ortoped", href: "/specialiteter/ortoped", hitboxes: [{ cx: 198, cy: 382, rx: 34, ry: 45 }, { cx: 424, cy: 382, rx: 34, ry: 45 }] },
  { id: "ankles", label: "Fötter & fotleder", cx: 320, cy: 660, rx: 72, ry: 34, clip: "polygon(53% 88%, 61% 88%, 63% 99%, 52% 99%, 73% 88%, 81% 88%, 84% 99%, 72% 99%)", specialty: "Ortoped", href: "/specialiteter/ortoped", hitboxes: [{ cx: 276, cy: 660, rx: 25, ry: 30 }, { cx: 358, cy: 660, rx: 25, ry: 30 }] },
];

const sexRegions: Record<Sex, Region> = {
  female: { id: "ovaries", label: "Livmoder & äggstockar", cx: 320, cy: 445, rx: 54, ry: 31, clip: "polygon(59% 49%, 76% 49%, 77% 56%, 69% 58%, 60% 56%)", specialty: "Gynekolog", href: "/specialiteter/gynekolog", mask: "deep" },
  male: { id: "prostate", label: "Prostata", cx: 320, cy: 444, rx: 27, ry: 23, clip: "polygon(65% 51%, 71% 51%, 71% 56%, 65% 56%)", specialty: "Urolog", href: "/specialiteter/urolog", mask: "deep" },
};

const standaloneOrganImages: Partial<Record<string, string>> = {
  blood: "/page-visuals/anatomy-organ-vascular-v1.webp",
  heart: "/page-visuals/anatomy-organ-heart-v1.png",
  intestines: "/page-visuals/anatomy-organ-intestines-v1.png",
  lungs: "/page-visuals/anatomy-organ-lungs-v1.png",
  "upper-abdomen": "/page-visuals/anatomy-organ-liver-stomach-v1.webp",
  ovaries: "/page-visuals/anatomy-organ-uterus-ovaries-v1.webp",
  prostate: "/page-visuals/anatomy-organ-prostate-v1.webp",
  bones: "/page-visuals/anatomy-organ-skeleton-v1.webp",
  spine: "/page-visuals/anatomy-organ-spine-v1.webp",
  joints: "/page-visuals/anatomy-organ-joint-v1.webp",
  knees: "/page-visuals/anatomy-organ-knee-v1.webp",
  hands: "/page-visuals/anatomy-organ-joint-v1.webp",
  ankles: "/page-visuals/anatomy-organ-joint-v1.webp",
};

export function AnatomyHeroVisual() {
  const [sex, setSex] = useState<Sex>("female");
  const [view, setView] = useState<View>("front");
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const images = [
    { id: "female-front", src: "/page-visuals/anatomy-female-front-v6.webp" },
    { id: "female-back", src: "/page-visuals/anatomy-female-back-v6.webp" },
    { id: "male-front", src: "/page-visuals/anatomy-male-front-breast-tissue-v7.webp" },
    { id: "male-back", src: "/page-visuals/anatomy-male-back-v6.webp" },
  ] as const;
  const selectedImage = `${sex}-${view}`;
  const regions = view === "front" ? [...frontCommon, sexRegions[sex]] : backRegions;
  const activeRegion = regions.find((region) => region.id === selected);
  // Resultatkortet följer bara ett uttryckligt klick/val. Hover används enbart
  // för visuell återkoppling i listan och får inte byta ett redan valt resultat.
  const visualRegion = activeRegion;
  const activeImage = images.find((image) => image.id === selectedImage)!;
  const vascularImage = sex === "female" ? "/page-visuals/anatomy-female-vascular-v8.webp" : "/page-visuals/anatomy-male-vascular-v8.webp";
  // Ett val ska alltid leda vidare. Tidigare fungerade ett andra klick som
  // avmarkering och lämnade användaren utan resultat eller nästa steg.
  const choose = (id: string) => setSelected(id);
  const changeView = (nextView: View) => { setView(nextView); setSelected(null); setHovered(null); };
  const previewScale = visualRegion
    ? visualRegion.id === "intestines"
      ? 1.75
      : Math.min(2.2, Math.max(1.15, Math.min(150 / (visualRegion.rx * 2), 104 / (visualRegion.ry * 2))))
    : 1;
  const previewSrc = visualRegion?.id === "blood"
    ? vascularImage
    : activeImage.src;
  const standalonePreview = visualRegion
    ? visualRegion.id === "breast"
      ? `/page-visuals/anatomy-organ-breast-${sex}-v1.webp`
      : standaloneOrganImages[visualRegion.id]
    : undefined;
  const previewStyle = visualRegion ? {
    width: 480,
    height: 720,
    left: 88 - visualRegion.cx * previewScale,
    top: 58 - (visualRegion.id === "intestines" ? 306 : visualRegion.cy) * previewScale,
    transform: `scale(${previewScale})`,
    transformOrigin: "top left",
  } : undefined;

  return (
    <div
      className="mr-hero-visual"
      data-has-selection={selected ? "true" : "false"}
      data-has-highlight={visualRegion ? "true" : "false"}
    >
      {images.map((image, index) => (
        <img key={image.id} src={image.src} alt="" data-visible={selectedImage === image.id ? "true" : "false"} className="mr-anatomy-image h-full w-full object-cover object-[72%_50%]" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : undefined} />
      ))}

      {selected === "blood" && view === "front" && (
        <>
          <img src={vascularImage} alt="" className="mr-anatomy-image anatomy-vascular-base h-full w-full object-cover object-[72%_50%]" />
          <img src={vascularImage} alt="" className="mr-anatomy-image anatomy-vascular-pulse h-full w-full object-cover object-[72%_50%]" />
        </>
      )}

      <svg className="anatomy-hitboxes" viewBox="0 0 480 720" role="group" aria-label="Välj del av kroppen">
        {regions.flatMap((region) => (region.hitboxes ?? [region]).map((hitbox, index) => (
          <ellipse key={`${region.id}-${index}`} role="button" tabIndex={0} aria-label={region.label} aria-pressed={selected === region.id} className={selected === region.id ? "is-active" : ""} cx={hitbox.cx} cy={hitbox.cy} rx={hitbox.rx} ry={hitbox.ry} onMouseEnter={() => setHovered(region.id)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(region.id)} onBlur={() => setHovered(null)} onClick={() => choose(region.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(region.id); } }} />
        )))}
      </svg>

      <div className="anatomy-region-labels" aria-label="Valbara kroppsdelar">
        {regions.map((region) => <button key={region.id} type="button" data-selected={selected === region.id} data-hovered={hovered === region.id} onMouseEnter={() => setHovered(region.id)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(region.id)} onBlur={() => setHovered(null)} onClick={() => choose(region.id)}>{region.label}</button>)}
      </div>

      <aside className="anatomy-organ-preview" aria-live="polite" data-empty={activeRegion ? "false" : "true"}>
        {activeRegion ? (
          <>
            <div className="anatomy-organ-preview-image" aria-hidden="true">
              {standalonePreview ? (
                <img key={standalonePreview} className="anatomy-organ-preview-standalone" src={standalonePreview} alt="" decoding="sync" />
              ) : (
                <div className="anatomy-organ-preview-stage" style={previewStyle}>
                  <img src={previewSrc} alt="" />
                </div>
              )}
            </div>
            <div className="anatomy-organ-preview-copy">
              <small>Ditt val</small>
              <strong>{activeRegion.label}</strong>
              <p>Rätt första väg: <b>{activeRegion.specialty}</b></p>
              <a className="anatomy-result-cta" href={activeRegion.href}>
                Gå vidare till {activeRegion.specialty.toLowerCase()} →
              </a>
              <em>Guiden ställer ingen diagnos.</em>
            </div>
          </>
        ) : (
          <div className="anatomy-organ-preview-copy anatomy-organ-preview-empty">
            <span aria-hidden className="anatomy-result-icon">↗</span>
            <strong>Välj ett område</strong>
            <p>Klicka på kroppen eller välj i listan. Därefter visar vi rätt specialist och nästa steg.</p>
            <a className="anatomy-result-secondary" href="/specialiteter">Se alla specialister →</a>
          </div>
        )}
      </aside>

      <div className="mr-anatomy-controls">
        <div className="mr-anatomy-toggle" aria-label="Välj kropp" role="group">
          <button type="button" data-selected={sex === "female"} onClick={() => { setSex("female"); setSelected(null); setHovered(null); }}>Kvinna</button>
          <button type="button" data-selected={sex === "male"} onClick={() => { setSex("male"); setSelected(null); setHovered(null); }}>Man</button>
        </div>
        <div className="mr-anatomy-toggle" aria-label="Välj vy" role="group">
          <button type="button" data-selected={view === "front"} onClick={() => changeView("front")}>Organ fram</button>
          <button type="button" data-selected={view === "back"} onClick={() => changeView("back")}>Skelett bak</button>
        </div>
      </div>
    </div>
  );
}
