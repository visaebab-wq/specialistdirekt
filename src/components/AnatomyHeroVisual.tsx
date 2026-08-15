"use client";

import { useState } from "react";

type Sex = "female" | "male";
type View = "front" | "back";
type Region = { id: string; label: string; cx: number; cy: number; rx: number; ry: number; specialty: string; href: string };

const frontCommon: Region[] = [
  { id: "blood", label: "Blod & kärl", cx: 240, cy: 320, rx: 102, ry: 230, specialty: "Hematolog", href: "/specialiteter/hematolog" },
  { id: "lungs", label: "Lungor", cx: 240, cy: 204, rx: 64, ry: 50, specialty: "Allmänmedicin", href: "/specialiteter/allmanmedicin" },
  { id: "heart", label: "Hjärta", cx: 246, cy: 225, rx: 25, ry: 30, specialty: "Kardiolog", href: "/specialiteter/kardiolog" },
  { id: "breast", label: "Bröstvävnad", cx: 240, cy: 220, rx: 84, ry: 42, specialty: "Allmänmedicin", href: "/specialiteter/allmanmedicin" },
  { id: "upper-abdomen", label: "Lever & magsäck", cx: 240, cy: 292, rx: 72, ry: 38, specialty: "Gastroenterolog", href: "/specialiteter/gastroenterolog" },
  { id: "intestines", label: "Tarmar", cx: 240, cy: 365, rx: 70, ry: 61, specialty: "Gastroenterolog", href: "/specialiteter/gastroenterolog" },
];

const backRegions: Region[] = [
  { id: "bones", label: "Skelett", cx: 240, cy: 330, rx: 112, ry: 245, specialty: "Ortoped", href: "/specialiteter/ortoped" },
  { id: "spine", label: "Ryggrad", cx: 240, cy: 285, rx: 27, ry: 175, specialty: "Ortoped", href: "/specialiteter/ortoped" },
  { id: "joints", label: "Leder", cx: 240, cy: 482, rx: 90, ry: 42, specialty: "Reumatolog", href: "/specialiteter/reumatolog" },
];

const sexRegions: Record<Sex, Region> = {
  female: { id: "ovaries", label: "Livmoder & äggstockar", cx: 240, cy: 445, rx: 54, ry: 31, specialty: "Gynekolog", href: "/specialiteter/gynekolog" },
  male: { id: "prostate", label: "Prostata", cx: 240, cy: 444, rx: 27, ry: 23, specialty: "Urolog", href: "/specialiteter/urolog" },
};

export function AnatomyHeroVisual() {
  const [sex, setSex] = useState<Sex>("female");
  const [view, setView] = useState<View>("front");
  const [selected, setSelected] = useState<string | null>(null);
  const images = [
    { id: "female-front", src: "/page-visuals/anatomy-female-front-v6.png" },
    { id: "female-back", src: "/page-visuals/anatomy-female-back-v6.png" },
    { id: "male-front", src: "/page-visuals/anatomy-male-front-breast-tissue-v7.png" },
    { id: "male-back", src: "/page-visuals/anatomy-male-back-v6.png" },
  ] as const;
  const selectedImage = `${sex}-${view}`;
  const regions = view === "front" ? [...frontCommon, sexRegions[sex]] : backRegions;
  const activeRegion = regions.find((region) => region.id === selected);
  const choose = (id: string) => setSelected((value) => (value === id ? null : id));
  const changeView = (nextView: View) => { setView(nextView); setSelected(null); };

  return (
    <div className="mr-hero-visual" data-has-selection={selected ? "true" : "false"}>
      {images.map((image, index) => (
        <img key={image.id} src={image.src} alt="" data-visible={selectedImage === image.id ? "true" : "false"} className="mr-anatomy-image h-full w-full object-cover object-[72%_50%]" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : undefined} />
      ))}

      <svg className="anatomy-hitboxes" viewBox="0 0 480 720" role="group" aria-label="Välj del av kroppen">
        {regions.map((region) => (
          <ellipse key={region.id} role="button" tabIndex={0} aria-label={region.label} aria-pressed={selected === region.id} className={selected === region.id ? "is-active" : ""} cx={region.cx} cy={region.cy} rx={region.rx} ry={region.ry} onClick={() => choose(region.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(region.id); } }} />
        ))}
        {selected === "blood" && view === "front" && (
          <g className="blood-flow" aria-hidden>
            <path d="M240 150 C220 205 223 260 240 315 C257 370 250 455 240 560" />
            <path d="M240 215 C192 236 175 292 166 360" />
            <path d="M240 215 C288 236 305 292 314 360" />
            <path d="M240 320 C205 350 201 430 197 540" />
            <path d="M240 320 C275 350 279 430 283 540" />
          </g>
        )}
      </svg>

      <div className="anatomy-region-labels" aria-label="Valbara kroppsdelar">
        {regions.map((region) => <button key={region.id} type="button" data-selected={selected === region.id} onClick={() => choose(region.id)}>{region.label}</button>)}
      </div>

      {activeRegion && <div className="anatomy-selection-card" aria-live="polite"><span>{activeRegion.label}</span><a href={activeRegion.href}>{activeRegion.specialty} →</a></div>}

      <div className="mr-anatomy-controls">
        <div className="mr-anatomy-toggle" aria-label="Välj kropp" role="group">
          <button type="button" data-selected={sex === "female"} onClick={() => { setSex("female"); setSelected(null); }}>Kvinna</button>
          <button type="button" data-selected={sex === "male"} onClick={() => { setSex("male"); setSelected(null); }}>Man</button>
        </div>
        <div className="mr-anatomy-toggle" aria-label="Välj vy" role="group">
          <button type="button" data-selected={view === "front"} onClick={() => changeView("front")}>Organ fram</button>
          <button type="button" data-selected={view === "back"} onClick={() => changeView("back")}>Skelett bak</button>
        </div>
      </div>
    </div>
  );
}
