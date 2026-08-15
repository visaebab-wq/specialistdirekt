"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { BodyRegionId, BodyRegionView, BodySelection, BodyView, Gender } from "@/lib/body-map";
import { BodyFigure } from "./BodyFigure";
import { BodyMapControls } from "./BodyMapControls";
import { BodyRegionPanel } from "./BodyRegionPanel";
import { buildZones, VIEW_H, VIEW_W, zoneCentroid } from "./figure-geometry";

// Endast typer importeras från @/lib/body-map (raderas vid kompilering).
// Innehållet kommer färdiglöst från servern via props.

export type BodyMapProps = {
  /** Serverupplösta regioner per vy. */
  views: Record<BodyView, BodyRegionView[]>;
  bookingHref: string;
  bookingLabel: string;
};

/**
 * Kroppskartan. Allt tillstånd är lokalt – att markera ett område ändrar
 * varken URL eller historik. Navigering sker först när besökaren medvetet
 * väljer en artikel, specialitet eller bokningslänk i panelen.
 */
export function BodyMap({ views, bookingHref, bookingLabel }: BodyMapProps) {
  const [gender, setGender] = useState<Gender>("kvinna");
  const [view, setView] = useState<BodyView>("framsida");
  const [selected, setSelected] = useState<BodySelection | null>(null);
  const [hovered, setHovered] = useState<BodySelection | null>(null);
  const [focusedRegion, setFocusedRegion] = useState<BodyRegionId | null>(null);

  const idPrefix = useId().replace(/[^a-zA-Z0-9]/g, "");
  const figureRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Räknare som bara ökar vid tangentbordsnavigering – hindrar att fokus
  // flyttas vid montering eller vid vanliga musklick.
  const keyNavRef = useRef(0);
  const [keyNavTick, setKeyNavTick] = useState(0);

  const regions = views[view];
  const selectedRegion = useMemo(
    () => (selected ? (regions.find((r) => r.id === selected.region) ?? null) : null),
    [selected, regions],
  );

  // Byte av vy får inte lämna kvar ett val som inte finns i den nya vyn
  // (t.ex. Bröstkorg när besökaren vänder till baksidan). Val som finns i båda
  // vyerna behålls. Funktionsuppdatering => effekten körs bara vid vybyte.
  useEffect(() => {
    setSelected((cur) => (cur && !regions.some((r) => r.id === cur.region) ? null : cur));
    setHovered(null);
  }, [regions]);

  // Flytta faktiskt DOM-fokus när piltangenterna byter område.
  useEffect(() => {
    if (keyNavTick === 0) return;
    const el = figureRef.current?.querySelector<SVGPathElement>(
      `[data-zone="${focusedRegion}"], [data-zone="${focusedRegion}-n"]`,
    );
    el?.focus();
  }, [keyNavTick, focusedRegion]);

  const handleSelect = useCallback((selection: BodySelection) => {
    setSelected(selection);
    setFocusedRegion(selection.region);
  }, []);

  const handleKeyNav = useCallback(
    (direction: 1 | -1) => {
      const current = focusedRegion ?? selected?.region ?? regions[0]?.id;
      const i = regions.findIndex((r) => r.id === current);
      const next = regions[(i + direction + regions.length) % regions.length];
      if (!next) return;
      // Piltangent både flyttar och väljer – standard för radiogrupper och gör
      // att panelen följer med utan extra knapptryck.
      setSelected({ region: next.id });
      setFocusedRegion(next.id);
      keyNavRef.current += 1;
      setKeyNavTick(keyNavRef.current);
    },
    [focusedRegion, regions, selected],
  );

  // På mobil ligger panelen under figuren – rulla fram den om den hamnat utanför
  // vyn efter ett val. Respekterar prefers-reduced-motion.
  useEffect(() => {
    if (!selected || !panelRef.current) return;
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;
    const rect = panelRef.current.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < window.innerHeight * 0.72) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }, [selected]);

  // Etikett vid pekaren (endast desktop). Positioneras i procent av samma
  // viewBox som figuren, så den följer med när SVG:n skalas.
  const zones = useMemo(() => buildZones(gender, view), [gender, view]);

  const hoverLabel = useMemo(() => {
    if (!hovered) return null;
    const region = regions.find((r) => r.id === hovered.region);
    if (!region) return null;
    const d = zones[hovered.region];
    if (!d) return null;
    let [x, y] = zoneCentroid(d);
    // Speglade zoner (armar) ritas på andra sidan – spegla även etiketten.
    const mirrored =
      (view === "framsida" && hovered.side === "right") ||
      (view === "baksida" && hovered.side === "left");
    if (mirrored) x = VIEW_W - x;
    return { label: region.label, left: (x / VIEW_W) * 100, top: (y / VIEW_H) * 100 };
  }, [hovered, view, regions, zones]);

  return (
    <div className="bodymap">
      <BodyMapControls
        gender={gender}
        view={view}
        onGenderChange={setGender}
        onViewChange={setView}
        idPrefix={idPrefix}
      />

      {/* Två balanserade spalter, centrerade – annars simmar figuren ensam i en
          bred vänsterspalt på stora skärmar. */}
      <div className="mt-8 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,26rem)] lg:items-start lg:justify-center lg:gap-12">
        <div ref={figureRef} className="bodymap-stage">
          <div className="bodymap-figure-wrap">
            <BodyFigure
              gender={gender}
              view={view}
              regions={regions}
              selected={selected}
              hovered={hovered}
              onSelect={handleSelect}
              onHover={setHovered}
              focusedRegion={focusedRegion}
              onFocusRegion={setFocusedRegion}
              onKeyNav={handleKeyNav}
            />
            {hoverLabel && (
              <span
                aria-hidden
                className="bodymap-hover-label"
                style={{ left: `${hoverLabel.left}%`, top: `${hoverLabel.top}%` }}
              >
                {hoverLabel.label}
              </span>
            )}
          </div>
          <p className="bodymap-hint-text">
            <span className="hidden lg:inline">
              Håll pekaren över kroppen för att se områdets namn – klicka för att välja.
            </span>
            <span className="lg:hidden">Tryck på ett område för att se innehåll.</span>
          </p>
        </div>

        <div ref={panelRef} className="bodymap-panel" aria-live="polite">
          <BodyRegionPanel
            region={selectedRegion}
            bookingHref={bookingHref}
            bookingLabel={bookingLabel}
          />
        </div>
      </div>
    </div>
  );
}
