"use client";

import type { BodyView, Gender } from "@/lib/body-map";

type Option<T extends string> = { value: T; label: string };

const GENDERS: Option<Gender>[] = [
  { value: "kvinna", label: "Kvinna" },
  { value: "man", label: "Man" },
];

const VIEWS: Option<BodyView>[] = [
  { value: "framsida", label: "Framsida" },
  { value: "baksida", label: "Baksida" },
];

/**
 * Segmenterad kontroll. Använder radiogrupp-semantik: valet är ett av två, och
 * skärmläsare får både gruppens namn och det valda alternativet.
 */
function Segmented<T extends string>({
  legend,
  options,
  value,
  onChange,
  name,
}: {
  legend: string;
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <fieldset className="bodymap-segmented">
      <legend className="sr-only">{legend}</legend>
      {options.map((o) => {
        const id = `${name}-${o.value}`;
        return (
          <div key={o.value} className="bodymap-segment">
            <input
              type="radio"
              id={id}
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <label htmlFor={id}>{o.label}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

export function BodyMapControls({
  gender,
  view,
  onGenderChange,
  onViewChange,
  idPrefix,
}: {
  gender: Gender;
  view: BodyView;
  onGenderChange: (g: Gender) => void;
  onViewChange: (v: BodyView) => void;
  idPrefix: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Segmented
        legend="Välj kroppstyp"
        options={GENDERS}
        value={gender}
        onChange={onGenderChange}
        name={`${idPrefix}-gender`}
      />
      <Segmented
        legend="Välj framsida eller baksida"
        options={VIEWS}
        value={view}
        onChange={onViewChange}
        name={`${idPrefix}-view`}
      />
    </div>
  );
}
