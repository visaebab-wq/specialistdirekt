"use client";

import { useId, useMemo } from "react";
import type { BodyRegionId, BodyRegionView, BodySelection, BodySide, BodyView } from "@/lib/body-map";

// Endast typer importeras från @/lib/body-map (raderas vid kompilering) – annars
// följer hela artikelregistret med in i klientbundlen.
import {
  buildFigure,
  buildHints,
  buildZones,
  MIRROR_TRANSFORM,
  MIRRORED_ZONES,
  VIEW_H,
  VIEW_W,
  type Gender,
} from "./figure-geometry";

/**
 * Ritordning uppifrån och ned. Armarna ritas sist så att deras träffytor vinner
 * över bålens där formerna möts vid armhålan.
 */
const DRAW_ORDER: BodyRegionId[] = [
  "huvud",
  "nacke",
  "brostkorg",
  "ovre-rygg",
  "mage",
  "landrygg",
  "hoft",
  "lar",
  "kna",
  "underben",
  "fot",
  "axel",
  "armbage",
  "hand",
];

/**
 * Sidan anges alltid ur patientens perspektiv (medicinsk konvention). På
 * framsidan möter betraktarens vänstra sida patientens högra, på baksidan är
 * det tvärtom.
 */
function patientSide(mirrored: boolean, view: BodyView): BodySide {
  if (view === "framsida") return mirrored ? "right" : "left";
  return mirrored ? "left" : "right";
}

const SIDE_LABEL: Record<BodySide, string> = { left: "vänster sida", right: "höger sida" };

type ZoneInstance = {
  key: string;
  region: BodyRegionView;
  d: string;
  mirrored: boolean;
  side?: BodySide;
};

function zoneInstances(regions: BodyRegionView[], gender: Gender, view: BodyView): ZoneInstance[] {
  const zones = buildZones(gender, view);
  const byId = new Map(regions.map((r) => [r.id, r]));
  const out: ZoneInstance[] = [];

  for (const id of DRAW_ORDER) {
    const region = byId.get(id);
    const d = zones[id];
    if (!region || !d) continue;

    if (MIRRORED_ZONES.has(id)) {
      for (const mirrored of [false, true]) {
        out.push({
          key: `${id}-${mirrored ? "m" : "n"}`,
          region,
          d,
          mirrored,
          side: patientSide(mirrored, view),
        });
      }
    } else {
      out.push({ key: id, region, d, mirrored: false });
    }
  }

  return out;
}

/**
 * Ett val kan sakna sida (t.ex. vid tangentbordsval). Då räknas den ospeglade
 * instansen som markerad, så att aria-checked aldrig blir falskt för alla
 * alternativ medan panelen visar ett valt område.
 */
function matches(sel: BodySelection | null, z: ZoneInstance): boolean {
  if (!sel || sel.region !== z.region.id) return false;
  return sel.side ? sel.side === z.side : !z.mirrored;
}

export type BodyFigureProps = {
  gender: Gender;
  view: BodyView;
  regions: BodyRegionView[];
  selected: BodySelection | null;
  hovered: BodySelection | null;
  onSelect: (selection: BodySelection) => void;
  onHover: (selection: BodySelection | null) => void;
  /** Sätts av föräldern för rovande tabindex – endast ett fokusstopp i gruppen. */
  focusedRegion: BodyRegionId | null;
  onFocusRegion: (id: BodyRegionId) => void;
  onKeyNav: (direction: 1 | -1) => void;
};

export function BodyFigure({
  gender,
  view,
  regions,
  selected,
  hovered,
  onSelect,
  onHover,
  focusedRegion,
  onFocusRegion,
  onKeyNav,
}: BodyFigureProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `${uid}-clip`;
  const fillId = `${uid}-fill`;
  const sheenId = `${uid}-sheen`;

  // Geometrin beror bara på kön och vy. Utan memoisering byggs varenda
  // path-sträng om vid varje hover-rendering.
  const figure = useMemo(() => buildFigure(gender, view), [gender, view]);
  const hints = useMemo(() => buildHints(gender, view), [gender, view]);
  const instances = useMemo(
    () => zoneInstances(regions, gender, view),
    [regions, gender, view],
  );

  const parts = useMemo(
    () =>
      figure.parts.map((part, i) => (
        <path key={i} d={part.d} transform={part.mirror ? MIRROR_TRANSFORM : undefined} />
      )),
    [figure],
  );

  // Rovande tabindex: gruppen har exakt ett fokusstopp.
  const tabTarget = focusedRegion ?? selected?.region ?? regions[0]?.id ?? null;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="bodymap-svg"
      role="radiogroup"
      aria-label={`Välj område på kroppen – ${gender === "kvinna" ? "kvinna" : "man"}, ${view}`}
    >
      <defs>
        <clipPath id={clipId}>{parts}</clipPath>

        {/* userSpaceOnUse är avgörande: annars mappas gradienten mot VARJE
            delforms egen bounding box, och skarvarna mellan bål, armar och ben
            syns som falska konturlinjer tvärs över kroppen. */}
        <linearGradient
          id={fillId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2={VIEW_H}
        >
          <stop offset="0" className="bodymap-stop-top" />
          <stop offset="1" className="bodymap-stop-bottom" />
        </linearGradient>
        <linearGradient
          id={sheenId}
          gradientUnits="userSpaceOnUse"
          x1={VIEW_W * 0.18}
          y1="0"
          x2={VIEW_W * 0.86}
          y2={VIEW_H * 0.5}
        >
          <stop offset="0" className="bodymap-sheen-a" />
          <stop offset="0.6" className="bodymap-sheen-b" />
        </linearGradient>
      </defs>

      {/* Konturen ritas som underlägg: fyllda + streckade former under kroppens
          fyllning. De inre skarvarna täcks av fyllningen ovanpå, så bara den
          yttre silhuetten syns – en ren kontur utan att formerna behöver
          slås ihop matematiskt. */}
      <g className="bodymap-outline" aria-hidden>
        {parts}
      </g>
      <g className="bodymap-body" fill={`url(#${fillId})`} aria-hidden>
        {parts}
      </g>
      <g clipPath={`url(#${clipId})`} aria-hidden>
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill={`url(#${sheenId})`} />
      </g>

      {/* Markeringar – klippta mot kroppen så att färgen följer silhuetten exakt. */}
      <g clipPath={`url(#${clipId})`} aria-hidden>
        {instances.map((z) => {
          const isSelected = matches(selected, z);
          const isHovered = matches(hovered, z);
          const state = isSelected ? "selected" : isHovered ? "hover" : "idle";

          return (
            <path
              key={`fill-${z.key}`}
              d={z.d}
              data-state={state}
              className="bodymap-zone-fill"
              transform={z.mirrored ? MIRROR_TRANSFORM : undefined}
            />
          );
        })}
      </g>

      {/* Diskreta anatomiska ledtrådar. */}
      <g className="bodymap-hints" clipPath={`url(#${clipId})`} aria-hidden>
        {hints.lines.map((s, i) => (
          <path
            key={`ln-${i}`}
            d={s.d}
            className="bodymap-hint-line"
            transform={s.mirror ? MIRROR_TRANSFORM : undefined}
          />
        ))}
      </g>

      {/* Träffytor. Medvetet något generösare än kroppen (oklippta) så att en
          tumme strax utanför konturen ändå träffar rätt område på mobil. */}
      <g>
        {instances.map((z) => {
          const isSelected = matches(selected, z);
          const label = z.region.label;
          const aria = z.side ? `${label}, ${SIDE_LABEL[z.side]}` : label;

          return (
            <path
              key={`hit-${z.key}`}
              d={z.d}
              className="bodymap-zone-hit"
              data-zone={z.key}
              transform={z.mirrored ? MIRROR_TRANSFORM : undefined}
              role="radio"
              aria-checked={isSelected}
              aria-label={aria}
              tabIndex={tabTarget === z.region.id && !z.mirrored ? 0 : -1}
              onClick={() => onSelect({ region: z.region.id, side: z.side })}
              onMouseEnter={() => onHover({ region: z.region.id, side: z.side })}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onFocusRegion(z.region.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect({ region: z.region.id, side: z.side });
                } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault();
                  onKeyNav(1);
                } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  onKeyNav(-1);
                }
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}

export { zoneInstances };
