"use client";

import { useState } from "react";

export function AnatomyHeroVisual() {
  const [sex, setSex] = useState<"female" | "male">("female");
  const [view, setView] = useState<"front" | "back">("front");

  const images = [
    { id: "female-front", src: "/page-visuals/anatomy-female-front-v6.png" },
    { id: "female-back", src: "/page-visuals/anatomy-female-back-v6.png" },
    { id: "male-front", src: "/page-visuals/anatomy-male-front-breast-tissue-v7.png" },
    { id: "male-back", src: "/page-visuals/anatomy-male-back-v6.png" },
  ] as const;

  const selected = `${sex}-${view}`;

  return (
    <div className="mr-hero-visual">
      <button
        type="button"
        className="absolute inset-0 z-[2] cursor-pointer"
        aria-label={view === "front" ? "Visa kroppen bakifrån" : "Visa kroppen framifrån"}
        onClick={() => setView((value) => (value === "front" ? "back" : "front"))}
      />

      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.src}
          alt=""
          data-visible={selected === image.id ? "true" : "false"}
          className="mr-anatomy-image h-full w-full object-cover object-[72%_50%]"
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : undefined}
        />
      ))}

      <div className="mr-anatomy-controls">
        <div className="mr-anatomy-toggle" aria-label="Välj kropp" role="group">
          <button type="button" data-selected={sex === "female"} onClick={() => setSex("female")}>
            Kvinna
          </button>
          <button type="button" data-selected={sex === "male"} onClick={() => setSex("male")}>
            Man
          </button>
        </div>
        <div className="mr-anatomy-toggle" aria-label="Välj vy" role="group">
          <button type="button" data-selected={view === "front"} onClick={() => setView("front")}>
            Organ fram
          </button>
          <button type="button" data-selected={view === "back"} onClick={() => setView("back")}>
            Skelett bak
          </button>
        </div>
      </div>
    </div>
  );
}
