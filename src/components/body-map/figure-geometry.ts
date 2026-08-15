// Geometri för kroppsfiguren i "Var har du besvär?".
//
// Designbeslut: EN basfigur (kvinna, framsida) är sanningen. Mannen härleds
// proportionellt från samma parameterobjekt (axelbredd, midja, höft, bröstkorg)
// och baksidan återanvänder samma silhuett. Det garanterar att alla fyra vyer
// har identiskt visuellt språk och halverar felytan jämfört med fyra handritade
// figurer.
//
// Kroppen byggs som en UNION av överlappande delformer (huvud, hals, bål, armar,
// ben). Konturen ritas som ett underlägg – samma former, fyllda och streckade i
// konturfärgen – varpå kroppens fyllning läggs ovanpå och döljer alla inre
// skarvar. Kvar syns bara den yttre silhuetten, utan att formerna behöver slås
// samman matematiskt.
//
// Allt lever i ett fast viewBox-koordinatsystem (VIEW_W × VIEW_H). Eftersom både
// kroppen och träffytorna ritas där följs de alltid åt när SVG:n skalas
// responsivt – inga hårdkodade pixelpositioner.

export const VIEW_W = 240;
export const VIEW_H = 470;
export const CX = VIEW_W / 2;

export type Pt = [number, number];

/** Kubisk bézier-segment: två kontrollpunkter + slutpunkt. */
type Seg = { c1: Pt; c2: Pt; to: Pt };

/** Halv kontur som speglas till en symmetrisk, sluten form. */
type HalfPath = { start: Pt; segs: Seg[] };

const n = (v: number) => Math.round(v * 100) / 100;

function forward(h: HalfPath): string {
  let d = `M${n(h.start[0])} ${n(h.start[1])}`;
  for (const s of h.segs) {
    d += `C${n(s.c1[0])} ${n(s.c1[1])} ${n(s.c2[0])} ${n(s.c2[1])} ${n(s.to[0])} ${n(s.to[1])}`;
  }
  return d;
}

/**
 * Speglar halvkonturen i x = CX och skriver ut den baklänges, så att den kan
 * fogas direkt efter `forward()`. Symmetrin blir exakt – vänster sida ritas
 * aldrig för hand.
 */
function mirroredBack(h: HalfPath): string {
  const mx = (x: number) => 2 * CX - x;
  const pts: Pt[] = [h.start, ...h.segs.map((s) => s.to)];
  let d = "";
  for (let i = h.segs.length - 1; i >= 0; i--) {
    const s = h.segs[i];
    const from = pts[i];
    d += `C${n(mx(s.c2[0]))} ${n(s.c2[1])} ${n(mx(s.c1[0]))} ${n(s.c1[1])} ${n(mx(from[0]))} ${n(from[1])}`;
  }
  return d;
}

function symmetric(h: HalfPath): string {
  return `${forward(h)}${mirroredBack(h)}Z`;
}

function poly(points: Pt[]): string {
  return `M${points.map(([x, y]) => `${n(x)} ${n(y)}`).join("L")}Z`;
}

/** Linjär interpolation genom en stigande serie (y → halvbredd/mittlinje). */
function track(points: Pt[], y: number): number {
  if (y <= points[0][1]) return points[0][0];
  const last = points[points.length - 1];
  if (y >= last[1]) return last[0];
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (y <= y1) return x0 + ((x1 - x0) * (y - y0)) / (y1 - y0 || 1);
  }
  return last[0];
}

// ---------------------------------------------------------------------------
// Parametrar
// ---------------------------------------------------------------------------

export type FigureParams = {
  head: { top: number; chin: number; halfW: number; jawY: number; jawHalfW: number };
  neck: { halfW: number; bottom: number };
  torso: {
    /** Där kappmuskeln möter deltoiden. */
    shoulderX: number;
    shoulderY: number;
    /** Bröstkorgens bredaste punkt (byst för kvinnofiguren). */
    chestX: number;
    chestY: number;
    waistX: number;
    waistY: number;
    hipX: number;
    hipY: number;
    /** Bäckenets rundade underkant. */
    pelvisX: number;
    pelvisY: number;
  };
  /** Armens leder anges för HÖGER sida; vänster arm speglas. */
  arm: {
    shoulder: Pt;
    elbow: Pt;
    wrist: Pt;
    fingerTip: Pt;
    shoulderHalfW: number;
    elbowHalfW: number;
    wristHalfW: number;
    handHalfW: number;
  };
  leg: {
    hipTopY: number;
    hipOuterX: number;
    thighBulge: number;
    crotch: Pt;
    knee: Pt;
    kneeHalfW: number;
    calfY: number;
    calfBulge: number;
    ankle: Pt;
    ankleHalfW: number;
    footToeY: number;
  };
};

/** Basfiguren (kvinna, framsida). Höjdled delas av båda könen. */
const BASE: FigureParams = {
  head: { top: 20, chin: 80.5, halfW: 19.5, jawY: 72, jawHalfW: 11.5 },
  neck: { halfW: 9, bottom: 100 },
  torso: {
    shoulderX: 25,
    shoulderY: 110,
    chestX: 30.6,
    chestY: 148,
    waistX: 21.5,
    waistY: 192,
    hipX: 31,
    hipY: 232,
    pelvisX: 22,
    pelvisY: 259,
  },
  arm: {
    shoulder: [CX + 25, 118],
    elbow: [CX + 49, 206],
    wrist: [CX + 63, 270],
    fingerTip: [CX + 68, 306],
    shoulderHalfW: 11.5,
    elbowHalfW: 8,
    wristHalfW: 5.4,
    handHalfW: 6.4,
  },
  leg: {
    hipTopY: 224,
    hipOuterX: 28.5,
    thighBulge: 3.6,
    crotch: [CX + 2, 262],
    knee: [CX + 18, 342],
    kneeHalfW: 11,
    calfY: 376,
    calfBulge: 3.2,
    ankle: [CX + 20.4, 430],
    ankleHalfW: 6.5,
    footToeY: 450,
  },
};

/**
 * Mannen: samma figur, proportionellt justerad. Bredare axlar, bröstkorg och
 * midja, smalare höft, plan bröstlinje, något kraftigare hals och lemmar.
 */
function toMale(p: FigureParams): FigureParams {
  const dx = 6;
  return {
    head: {
      ...p.head,
      halfW: p.head.halfW + 1,
      jawHalfW: p.head.jawHalfW + 1.6,
      chin: p.head.chin - 0.5,
    },
    neck: { ...p.neck, halfW: p.neck.halfW + 1.7 },
    torso: {
      ...p.torso,
      shoulderX: p.torso.shoulderX + 4,
      shoulderY: p.torso.shoulderY - 2,
      chestX: p.torso.chestX + 3.4,
      chestY: p.torso.chestY - 10,
      waistX: p.torso.waistX + 4.6,
      hipX: p.torso.hipX - 3.2,
      pelvisX: p.torso.pelvisX - 1.5,
      pelvisY: p.torso.pelvisY - 2,
    },
    arm: {
      shoulder: [p.arm.shoulder[0] + dx, p.arm.shoulder[1] - 2],
      elbow: [p.arm.elbow[0] + dx, p.arm.elbow[1]],
      wrist: [p.arm.wrist[0] + dx - 1, p.arm.wrist[1]],
      fingerTip: [p.arm.fingerTip[0] + dx - 1, p.arm.fingerTip[1] + 2],
      shoulderHalfW: p.arm.shoulderHalfW + 1.6,
      elbowHalfW: p.arm.elbowHalfW + 1.2,
      wristHalfW: p.arm.wristHalfW + 0.9,
      handHalfW: p.arm.handHalfW + 0.8,
    },
    leg: {
      ...p.leg,
      hipOuterX: p.leg.hipOuterX - 3.2,
      thighBulge: p.leg.thighBulge + 0.6,
      crotch: [p.leg.crotch[0] + 0.5, p.leg.crotch[1] - 2],
      knee: [p.leg.knee[0] - 1, p.leg.knee[1]],
      kneeHalfW: p.leg.kneeHalfW + 1.2,
      calfBulge: p.leg.calfBulge + 0.7,
      ankle: [p.leg.ankle[0] - 1, p.leg.ankle[1]],
      ankleHalfW: p.leg.ankleHalfW + 0.8,
    },
  };
}

export type Gender = "kvinna" | "man";
export type BodyView = "framsida" | "baksida";

export const FIGURE_PARAMS: Record<Gender, FigureParams> = {
  kvinna: BASE,
  man: toMale(BASE),
};

// ---------------------------------------------------------------------------
// Kroppens delformer
// ---------------------------------------------------------------------------

/** Huvud – äggform med markerad käklinje, ritas ovanpå halsen. */
function buildHead(p: FigureParams): string {
  const h = p.head;
  return symmetric({
    start: [CX, h.top],
    segs: [
      { c1: [CX + h.halfW * 0.6, h.top], c2: [CX + h.halfW, h.top + 9], to: [CX + h.halfW, h.top + 25] },
      {
        c1: [CX + h.halfW, h.top + 37],
        c2: [CX + h.jawHalfW + 4.5, h.jawY - 2],
        to: [CX + h.jawHalfW, h.jawY + 2],
      },
      { c1: [CX + h.jawHalfW - 2.5, h.chin - 3], c2: [CX + 5, h.chin], to: [CX, h.chin] },
    ],
  });
}

/** Hals – enkel form som huvudet och bålen överlappar. */
function buildNeck(p: FigureParams): string {
  const k = p.neck;
  const top = p.head.jawY - 6;
  return symmetric({
    start: [CX, top],
    segs: [
      { c1: [CX + k.halfW * 0.8, top], c2: [CX + k.halfW, top + 4], to: [CX + k.halfW, top + 16] },
      { c1: [CX + k.halfW + 0.6, k.bottom - 6], c2: [CX + k.halfW + 2, k.bottom - 2], to: [CX + k.halfW + 3, k.bottom] },
      { c1: [CX + k.halfW, k.bottom + 2], c2: [CX + 4, k.bottom + 2], to: [CX, k.bottom + 2] },
    ],
  });
}

/** Bål – kappmuskel, bröstkorg, midja, höft och rundat bäcken. */
function buildTorso(p: FigureParams): string {
  const t = p.torso;
  const top = t.shoulderY - 18;
  return symmetric({
    start: [CX, top],
    segs: [
      // Kappmuskeln ut mot axeln.
      { c1: [CX + 9, top], c2: [CX + 16, top + 4], to: [CX + t.shoulderX, t.shoulderY] },
      // Bröstkorgens bredaste punkt.
      {
        c1: [CX + t.shoulderX + 4, t.shoulderY + 12],
        c2: [CX + t.chestX, t.chestY - 14],
        to: [CX + t.chestX, t.chestY],
      },
      // In mot midjan.
      {
        c1: [CX + t.chestX, t.chestY + 17],
        c2: [CX + t.waistX + 1, t.waistY - 14],
        to: [CX + t.waistX, t.waistY],
      },
      // Ut över höftkammen.
      {
        c1: [CX + t.waistX - 1, t.waistY + 14],
        c2: [CX + t.hipX - 2, t.hipY - 16],
        to: [CX + t.hipX, t.hipY],
      },
      // Bäckenets ytterkant ned mot underkanten.
      {
        c1: [CX + t.hipX + 0.5, t.hipY + 12],
        c2: [CX + t.pelvisX + 6, t.pelvisY - 5],
        to: [CX + t.pelvisX, t.pelvisY],
      },
      // Rundad underkant in till mitten.
      { c1: [CX + t.pelvisX - 8, t.pelvisY + 3], c2: [CX + 7, t.pelvisY + 3], to: [CX, t.pelvisY + 3] },
    ],
  });
}

/** Höger arm som sluten form (vänster arm speglas med transform). */
function buildArm(p: FigureParams): string {
  const a = p.arm;
  const [sx, sy] = a.shoulder;
  const [ex, ey] = a.elbow;
  const [wx, wy] = a.wrist;
  const [fx, fy] = a.fingerTip;
  const sw = a.shoulderHalfW;
  const ew = a.elbowHalfW;
  const ww = a.wristHalfW;
  const hw = a.handHalfW;

  return [
    // Deltoidkapseln startar inne på bålen, så att formerna smälter ihop.
    `M${n(sx - sw - 9)} ${n(sy - 12)}`,
    `C${n(sx - sw - 3)} ${n(sy - 18)} ${n(sx + sw - 4)} ${n(sy - 17)} ${n(sx + sw)} ${n(sy - 6)}`,
    // Överarmens utsida ned till armbågen.
    `C${n(sx + sw + 1.5)} ${n(sy + 22)} ${n(ex + ew + 4)} ${n(ey - 31)} ${n(ex + ew)} ${n(ey)}`,
    // Underarmens utsida ned till handleden.
    `C${n(ex + ew - 0.5)} ${n(ey + 26)} ${n(wx + ww + 3)} ${n(wy - 26)} ${n(wx + ww)} ${n(wy)}`,
    // Handen: tumsida ut, rundade fingertoppar, tillbaka på lillfingersidan.
    `C${n(wx + hw + 2.6)} ${n(wy + 7)} ${n(fx + hw + 0.6)} ${n(fy - 19)} ${n(fx + hw - 1.4)} ${n(fy - 9)}`,
    `C${n(fx + hw - 2.2)} ${n(fy - 2)} ${n(fx - 1.5)} ${n(fy + 1.5)} ${n(fx - 4)} ${n(fy - 2)}`,
    `C${n(fx - 6.5)} ${n(fy - 5.5)} ${n(wx - hw + 0.5)} ${n(wy + 14)} ${n(wx - ww)} ${n(wy)}`,
    // Underarmens insida upp till armbågen.
    `C${n(wx - ww - 3)} ${n(wy - 26)} ${n(ex - ew - 1)} ${n(ey + 26)} ${n(ex - ew)} ${n(ey)}`,
    // Överarmens insida upp till armhålan.
    `C${n(ex - ew - 1.5)} ${n(ey - 34)} ${n(sx - sw + 3)} ${n(sy + 26)} ${n(sx - sw + 2)} ${n(sy + 4)}`,
    `C${n(sx - sw)} ${n(sy - 4)} ${n(sx - sw - 5)} ${n(sy - 8)} ${n(sx - sw - 9)} ${n(sy - 12)}`,
    "Z",
  ].join("");
}

/** Höger ben som sluten form (vänster ben speglas med transform). */
function buildLeg(p: FigureParams, view: BodyView): string {
  const l = p.leg;
  const [kx, ky] = l.knee;
  const [ax, ay] = l.ankle;
  const [crx, cry] = l.crotch;
  const outerTop = CX + l.hipOuterX;
  const kneeOut = kx + l.kneeHalfW;
  const kneeIn = kx - l.kneeHalfW;
  const ankleOut = ax + l.ankleHalfW;
  const ankleIn = ax - l.ankleHalfW;

  // Framifrån syns fotryggen (bredare, längre), bakifrån hälen (kortare).
  const toeY = view === "framsida" ? l.footToeY : l.footToeY - 7;
  const footOut = ax + (view === "framsida" ? 9.5 : 7.5);
  const footIn = ax - (view === "framsida" ? 9 : 7.5);

  return [
    `M${n(outerTop)} ${n(l.hipTopY)}`,
    // Lårets utsida, med lätt muskelbukt, ned till knät.
    `C${n(outerTop + l.thighBulge)} ${n(l.hipTopY + 26)} ${n(kneeOut + 3)} ${n(ky - 52)} ${n(kneeOut)} ${n(ky)}`,
    // Vaden ned till fotleden.
    `C${n(kneeOut + l.calfBulge)} ${n(l.calfY - 22)} ${n(ankleOut + l.calfBulge + 1.5)} ${n(l.calfY + 8)} ${n(ankleOut)} ${n(ay)}`,
    // Foten.
    `C${n(footOut)} ${n(ay + 7)} ${n(footOut + 1)} ${n(toeY - 7)} ${n(footOut - 1.5)} ${n(toeY - 1)}`,
    `C${n(footOut - 5)} ${n(toeY + 3)} ${n(footIn + 4)} ${n(toeY + 3)} ${n(footIn)} ${n(toeY - 2)}`,
    `C${n(footIn - 1)} ${n(toeY - 9)} ${n(ankleIn - 1.5)} ${n(ay + 7)} ${n(ankleIn)} ${n(ay)}`,
    // Underbenets insida upp till knät.
    `C${n(ankleIn - 2)} ${n(l.calfY + 6)} ${n(kneeIn - l.calfBulge * 0.7)} ${n(l.calfY - 20)} ${n(kneeIn)} ${n(ky)}`,
    // Lårets insida upp till ljumsken.
    `C${n(kneeIn - 2)} ${n(ky - 50)} ${n(crx + 4)} ${n(cry + 26)} ${n(crx)} ${n(cry)}`,
    // Ljumsklinjen tillbaka upp till höften (ligger dold under bålen).
    `C${n(crx + 10)} ${n(cry - 14)} ${n(outerTop - 12)} ${n(l.hipTopY + 12)} ${n(outerTop)} ${n(l.hipTopY)}`,
    "Z",
  ].join("");
}

export type FigureShapes = { parts: { d: string; mirror?: boolean }[] };

export function buildFigure(gender: Gender, view: BodyView): FigureShapes {
  const p = FIGURE_PARAMS[gender];
  const arm = buildArm(p);
  const leg = buildLeg(p, view);

  return {
    parts: [
      { d: buildNeck(p) },
      { d: buildTorso(p) },
      { d: leg },
      { d: leg, mirror: true },
      { d: arm },
      { d: arm, mirror: true },
      { d: buildHead(p) },
    ],
  };
}

/** Transform som speglar en högersidig form till vänster sida. */
export const MIRROR_TRANSFORM = `translate(${VIEW_W} 0) scale(-1 1)`;

// ---------------------------------------------------------------------------
// Diskreta anatomiska ledtrådar (aldrig ett helt skelett)
// ---------------------------------------------------------------------------

export type Hint = { d: string; mirror?: boolean };

export type FigureHints = { lines: Hint[] };

/**
 * Diskreta anatomiska ledtrådar. Lederna markeras som veck (korta bågar) i
 * stället för ringar: ringar på bål och höft läses som prickar snarare än
 * anatomi, medan ett veck följer kroppen och ger figuren medicinsk karaktär
 * utan att bli ett skelett.
 */
export function buildHints(gender: Gender, view: BodyView): FigureHints {
  const p = FIGURE_PARAMS[gender];
  const t = p.torso;
  const a = p.arm;
  const l = p.leg;
  const lines: Hint[] = [];

  /** Kort veckbåge, buktar nedåt med `depth`. */
  const crease = (cx: number, cy: number, halfW: number, depth: number): string =>
    `M${n(cx - halfW)} ${n(cy)}C${n(cx - halfW * 0.45)} ${n(cy + depth)} ${n(cx + halfW * 0.45)} ${n(cy + depth)} ${n(cx + halfW)} ${n(cy)}`;

  const both = (d: string) => {
    lines.push({ d });
    lines.push({ d, mirror: true });
  };

  // Deltoidens fäste och armbågsvecket – på båda sidor.
  both(crease(a.shoulder[0] + 1, a.shoulder[1] + 13, 8, 3.4));
  both(crease(a.elbow[0], a.elbow[1] - 1, 6, 2.8));

  if (view === "baksida") {
    // Ryggraden från nacke till bäcken.
    lines.push({
      d:
        `M${CX} ${n(t.shoulderY - 8)}` +
        `C${n(CX - 1.4)} ${n(t.chestY)} ${n(CX + 1.4)} ${n(t.waistY - 4)} ${CX} ${n(t.waistY + 16)}` +
        `C${n(CX - 1)} ${n(t.hipY - 8)} ${CX} ${n(t.hipY - 4)} ${CX} ${n(t.hipY + 6)}`,
    });
    // Skulderbladens innerkant.
    both(
      `M${n(CX + 7)} ${n(t.shoulderY + 6)}C${n(CX + 16)} ${n(t.shoulderY + 6)} ${n(CX + t.chestX - 8)} ${n(t.shoulderY + 20)} ${n(CX + t.chestX - 11)} ${n(t.chestY - 10)}`,
    );
    // Sätesvecket.
    both(crease(CX + t.hipX - 15, l.crotch[1] + 2, 13, 4));
    // Knävecket bakifrån.
    both(crease(l.knee[0], l.knee[1] - 2, 6.5, 3.4));
  } else {
    // Nyckelbenen – ger figuren en tydlig framsida utan att bli skelett.
    both(
      `M${n(CX + 2.5)} ${n(t.shoulderY + 3)}C${n(CX + 10)} ${n(t.shoulderY + 6)} ${n(CX + t.shoulderX - 6)} ${n(t.shoulderY + 5)} ${n(CX + t.shoulderX - 1)} ${n(t.shoulderY + 1)}`,
    );
    // Ljumskvecket – den naturliga linjen mellan bäcken och lår.
    both(
      `M${n(CX + t.hipX - 5)} ${n(t.hipY + 4)}C${n(CX + t.hipX - 12)} ${n(t.hipY + 16)} ${n(CX + 12)} ${n(l.crotch[1] - 12)} ${n(CX + 5)} ${n(l.crotch[1] - 4)}`,
    );
    // Knäskålen framifrån.
    both(
      `M${n(l.knee[0] - 5.5)} ${n(l.knee[1] - 5)}C${n(l.knee[0] - 6)} ${n(l.knee[1] + 4)} ${n(l.knee[0] + 6)} ${n(l.knee[1] + 4)} ${n(l.knee[0] + 5.5)} ${n(l.knee[1] - 5)}`,
    );
  }

  // Fotleden.
  both(crease(l.ankle[0], l.ankle[1] - 1, 5, 2.4));

  return { lines };
}

// ---------------------------------------------------------------------------
// Träffytor
// ---------------------------------------------------------------------------

/**
 * Träffytorna är polygoner som kaklar kroppen. De ritas två gånger: en gång
 * klippta mot kroppens siluett (markeringen följer då kroppen exakt) och en
 * gång oklippta som osynliga pekmål (en tumme strax utanför konturen träffar
 * ändå rätt område).
 *
 * Polygonerna byggs ur samma parametrar som kroppen, så de följer automatiskt
 * med när proportionerna justeras eller könet byts. Bålens zoner följer
 * siluettens lutning i stället för att vara rektanglar – annars syns hårda
 * hörn tvärs över axlarna när ett område markeras.
 */
export function buildZones(gender: Gender, view: BodyView): Record<string, string> {
  const p = FIGURE_PARAMS[gender];
  const { head: h, neck: k, torso: t, arm: a, leg: l } = p;

  // Armens mittlinje och halva bredd vid en given höjd.
  const armCenter = (y: number) =>
    track(
      [
        [a.shoulder[0], a.shoulder[1]],
        [a.elbow[0], a.elbow[1]],
        [a.wrist[0], a.wrist[1]],
        [a.fingerTip[0], a.fingerTip[1]],
      ],
      y,
    );
  const armHalf = (y: number) =>
    track(
      [
        [a.shoulderHalfW, a.shoulder[1]],
        [a.elbowHalfW, a.elbow[1]],
        [a.wristHalfW, a.wrist[1]],
        [a.handHalfW, a.fingerTip[1]],
      ],
      y,
    );
  const armInner = (y: number) => armCenter(y) - armHalf(y);

  // Bålens halva bredd vid en given höjd (följer siluettens kontrollpunkter).
  const torsoHalf = (y: number) =>
    track(
      [
        [k.halfW + 2, t.shoulderY - 14],
        [t.shoulderX, t.shoulderY],
        [t.chestX, t.chestY],
        [t.waistX, t.waistY],
        [t.hipX, t.hipY],
        [t.pelvisX, t.pelvisY],
      ],
      y,
    );

  /**
   * Bålzon. Ytterkanten följer den anatomiska gränsen nyckelben → armhåla →
   * flank, och läggs medvetet UTANFÖR kroppen där armen inte är i vägen, så att
   * klippningen mot siluetten formar markeringen. En rak, lodrät kant inne på
   * bröstkorgen ser omedelbart ut som en pålagd rektangel.
   */
  const torsoZone = (topY: number, botY: number): string => {
    const right: Pt[] = [];
    const armpitY = t.shoulderY + 20;

    if (topY <= t.shoulderY + 6) {
      // Övre bålzonen börjar vid halsroten och går ut längs nyckelbenet.
      right.push([CX + t.shoulderX - 3, topY]);
      right.push([Math.min(CX + torsoHalf(t.shoulderY + 8) + 12, armInner(t.shoulderY + 8) + 1), t.shoulderY + 8]);
    }

    const from = Math.max(topY, topY <= t.shoulderY + 6 ? armpitY - 6 : topY);
    const steps = 7;
    for (let i = 0; i <= steps; i++) {
      const y = from + ((botY - from) * i) / steps;
      // Utanför kroppen där det går; annars längs armens innerkant.
      right.push([Math.min(CX + torsoHalf(y) + 13, armInner(y) + 4), y]);
    }

    const left = right.map(([x, y]) => [2 * CX - x, y] as Pt).reverse();
    return poly([...right, ...left]);
  };

  /** Benzon: symmetrisk kring båda benen. */
  const legZone = (topY: number, botY: number, halfTop: number, halfBot: number): string =>
    poly([
      [2 * CX - (CX + halfTop), topY],
      [CX + halfTop, topY],
      [CX + halfBot, botY],
      [2 * CX - (CX + halfBot), botY],
    ]);

  /**
   * Armzon. Samplas längs armens verkliga kontur i stället för att dras som en
   * rak fyrhörning – annars skär axelzonens innerkant snett tvärs över
   * bröstkorgen i stället för att följa armhålan.
   */
  const armZone = (topY: number, botY: number): string => {
    const steps = 6;
    const inner: Pt[] = [];
    const outer: Pt[] = [];
    for (let i = 0; i <= steps; i++) {
      const y = topY + ((botY - topY) * i) / steps;
      // Ovanför armhålan skulle armens innerkant annars skära in mot halsen.
      // Håll gränsen ute vid kappmuskelns kant, proportionellt mot bålbredden.
      inner.push([Math.max(armCenter(y) - armHalf(y) - 4, CX + torsoHalf(y) * 0.82), y]);
      outer.push([armCenter(y) + armHalf(y) + 10, y]);
    }
    return poly([...inner, ...outer.reverse()]);
  };

  const neckBotY = t.shoulderY - 2;
  const chestBotY = view === "framsida" ? t.chestY + 18 : t.waistY - 4;
  const bellyBotY = t.hipY - 6;
  const hipBotY = l.crotch[1] + 18;
  const thighBotY = l.knee[1] - 26;
  const kneeBotY = l.knee[1] + 26;
  const shinBotY = l.ankle[1] - 12;

  const upper = view === "framsida" ? "brostkorg" : "ovre-rygg";
  const lower = view === "framsida" ? "mage" : "landrygg";

  const zones: Record<string, string> = {
    huvud: poly([
      [CX - h.halfW - 9, h.top - 12],
      [CX + h.halfW + 9, h.top - 12],
      [CX + h.halfW + 9, h.jawY],
      [CX + k.halfW + 7, h.chin + 2],
      [CX - k.halfW - 7, h.chin + 2],
      [CX - h.halfW - 9, h.jawY],
    ]),
    nacke: poly([
      [CX - k.halfW - 7, h.chin + 2],
      [CX + k.halfW + 7, h.chin + 2],
      [CX + t.shoulderX - 3, neckBotY],
      [CX - t.shoulderX + 3, neckBotY],
    ]),
  };

  zones[upper] = torsoZone(neckBotY, chestBotY);
  zones[lower] = torsoZone(chestBotY, bellyBotY);

  zones.hoft = poly([
    [2 * CX - (CX + torsoHalf(bellyBotY) + 9), bellyBotY],
    [CX + torsoHalf(bellyBotY) + 9, bellyBotY],
    [CX + t.hipX + 9, t.hipY + 6],
    [CX + t.hipX + 2, hipBotY],
    [CX - t.hipX - 2, hipBotY],
    [CX - t.hipX - 9, t.hipY + 6],
  ]);

  zones.lar = legZone(hipBotY, thighBotY, t.hipX + 9, l.kneeHalfW + l.knee[0] - CX + 8);
  zones.kna = legZone(
    thighBotY,
    kneeBotY,
    l.kneeHalfW + l.knee[0] - CX + 8,
    l.kneeHalfW + l.knee[0] - CX + 8,
  );
  zones.underben = legZone(
    kneeBotY,
    shinBotY,
    l.kneeHalfW + l.knee[0] - CX + 8,
    l.ankleHalfW + l.ankle[0] - CX + 9,
  );
  zones.fot = legZone(
    shinBotY,
    l.footToeY + 11,
    l.ankleHalfW + l.ankle[0] - CX + 9,
    l.ankleHalfW + l.ankle[0] - CX + 13,
  );

  zones.axel = armZone(t.shoulderY - 9, a.elbow[1] - 22);
  zones.armbage = armZone(a.elbow[1] - 22, a.wrist[1] - 12);
  zones.hand = poly([
    [armCenter(a.wrist[1] - 12) - armHalf(a.wrist[1] - 12) - 4, a.wrist[1] - 12],
    [armCenter(a.wrist[1] - 12) + armHalf(a.wrist[1] - 12) + 10, a.wrist[1] - 12],
    [a.fingerTip[0] + a.handHalfW + 9, a.fingerTip[1] + 11],
    [a.fingerTip[0] - a.handHalfW - 10, a.fingerTip[1] + 11],
  ]);

  return zones;
}

/** Zoner som ritas på båda sidor (en semantisk region, två kroppssidor). */
export const MIRRORED_ZONES = new Set(["axel", "armbage", "hand"]);

/**
 * Punkt att fästa hover-etiketten vid – zonens tyngdpunkt, så att etiketten
 * hamnar mitt på området oavsett kön och vy.
 */
export function zoneCentroid(d: string): Pt {
  const nums = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) {
    xs.push(nums[i]);
    ys.push(nums[i + 1]);
  }
  const avg = (v: number[]) => v.reduce((s, x) => s + x, 0) / (v.length || 1);
  return [n(avg(xs)), n(avg(ys))];
}
