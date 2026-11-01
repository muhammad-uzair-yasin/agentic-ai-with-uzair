import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import {
  Shots, ShotDef, FontStyle, CAPTION_FONT,
  ramp, lerp, clamp01, eout, eio, mix, pop, keys, blinkAt,
} from "./kit";
import { WORDS, CHUNKS, ENV, TOTAL } from "./words";
import { Person, CAST } from "./Humans";

// audio: narration.wav (render.sh writes it from narration.mp3). SLUG token: projects/unslop/
const AUDIO = "projects/unslop/narration.wav";

// ------- cue frames (from gen_words cue table) -------
const F = {
  hook: 15, name: 151, look: 302, slopList: 340, slopStamp: 480,
  hunts: 530, scans: 581, passes: 691, staccato: 745, designer: 823,
  frameworks: 876, livesite: 1059, price: 1135, open: 1190, install: 1222,
  payoff: 1315, cta: 1481,
};
const KICKS: [number, number][] = [[F.slopStamp, 9], [F.staccato, 6], [F.price, 8], [F.cta, 7]];

// ------- palette (bright product-demo) -------
const BG0 = "#eef2fb", BG1 = "#e3e9f7";
const INK = "#15161d", INK2 = "#5b6475";
const BRAND = "#2f6df0", BRAND2 = "#17c4a8", ACCENT = "#f5a623";
const YELLOW = "#ffd60a";
const SLOP_A = "#8b2ff7", SLOP_B = "#ff2f8f", SLOP_NEON = "#00ffc6";

// ======================================================================
// Reusable bits
// ======================================================================
const Cursor: React.FC<{ x: number; y: number; press?: number }> = ({ x, y, press = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${1 - press * 0.15})`}>
    <path d="M0 0 L0 30 L8 23 L13 34 L18 32 L13 21 L23 21 Z" fill="#fff" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    {press > 0 && <circle cx={2} cy={2} r={16 * press} fill="none" stroke={BRAND} strokeWidth={3} opacity={1 - press} />}
  </g>
);

// little slop "sticker" shapes (stand in for emoji labels) — no real emoji glyphs (avoid tofu)
const Star: React.FC<{ x: number; y: number; r: number; c: string; o?: number }> = ({ x, y, r, c, o = 1 }) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r;
    return `${x + Math.cos(a) * rr},${y + Math.sin(a) * rr}`;
  }).join(" ");
  return <polygon points={pts} fill={c} opacity={o} />;
};

// The mock app. t=0 full "AI slop", t=1 clean designed UI.
const MockApp: React.FC<{ f: number; t: number; cx: number; cy: number; w?: number; h?: number }> = ({ f, t, cx, cy, w = 560, h = 760 }) => {
  const uid = React.useId().replace(/[:]/g, "");
  const gradId = `slophead${uid}`, clipId = `appclip${uid}`;
  const x = cx - w / 2, y = cy - h / 2;
  const jit = (1 - t) * 1; // uneven-spacing wobble in slop state
  const headerFill = mix(SLOP_A, "#ffffff", t);
  const headerH = lerp(150, 120, t);
  const titleCol = mix("#ffffff", INK, t);
  const btnA = mix(SLOP_NEON, BRAND, t);
  const btnB = mix("#ffe600", BRAND2, t);
  const glow = (1 - t);
  const rowY = (i: number) => y + headerH + 56 + i * (60 + jit * 10) + Math.sin(i * 2) * jit * 8;
  return (
    <g>
      {/* window */}
      <rect x={x} y={y} width={w} height={h} rx={28} fill="#ffffff" stroke={mix(SLOP_B, "#d6def0", t)} strokeWidth={lerp(6, 3, t)} />
      {glow > 0.02 && <rect x={x} y={y} width={w} height={h} rx={28} fill="none" stroke={SLOP_NEON} strokeWidth={10} opacity={glow * 0.5} />}
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={mix(SLOP_A, BRAND, t)} />
          <stop offset="1" stopColor={mix(SLOP_B, BRAND, t)} />
        </linearGradient>
        <clipPath id={clipId}><rect x={x} y={y} width={w} height={h} rx={28} /></clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {/* header */}
        <rect x={x} y={y} width={w} height={headerH} fill={`url(#${gradId})`} />
        <text x={x + 36} y={y + headerH / 2 + 14} fontFamily={CAPTION_FONT} fontWeight={800}
          fontSize={lerp(46, 38, t)} fill={titleCol} letterSpacing={lerp(2, 0, t)}>
          {t < 0.5 ? "WELCOME!!!" : "Welcome"}
        </text>
        {/* slop stars / badges fade out */}
        {glow > 0.02 && <>
          <Star x={x + w - 60} y={y + 46} r={26} c="#ffe600" o={glow} />
          <Star x={x + w - 110} y={y + 90} r={16} c={SLOP_NEON} o={glow} />
          <Star x={x + 40} y={y + headerH - 20} r={14} c="#ffffff" o={glow} />
        </>}
        {/* body rows */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${jit * Math.sin(i + f * 0.03) * 6} 0)`}>
            <rect x={x + 36} y={rowY(i)} width={w - 72} height={44} rx={lerp(6, 12, t)}
              fill={mix("#fff0fb", "#f1f5fc", t)} stroke={mix(SLOP_B, "#e3e9f5", t)} strokeWidth={lerp(3, 1.5, t)} />
            <rect x={x + 52} y={rowY(i) + 14} width={lerp(300, 240, t) - i * 30} height={16} rx={8} fill={mix(SLOP_A, INK2, t)} opacity={lerp(0.9, 0.55, t)} />
          </g>
        ))}
        {/* buttons */}
        <g>
          <rect x={x + 36} y={y + h - 96} width={(w - 92) / 2} height={60} rx={lerp(30, 14, t)} fill={btnA} />
          {glow > 0.02 && <rect x={x + 36} y={y + h - 96} width={(w - 92) / 2} height={60} rx={30} fill="none" stroke={SLOP_NEON} strokeWidth={6} opacity={glow * 0.7} />}
          <text x={x + 36 + (w - 92) / 4} y={y + h - 58} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={lerp(30, 24, t)} fill={mix("#10263a", "#ffffff", t)} letterSpacing={lerp(2, 0, t)}>{t < 0.5 ? "CLICK NOW" : "Get started"}</text>
          <rect x={x + w / 2 + 10} y={y + h - 96} width={(w - 92) / 2} height={60} rx={lerp(30, 14, t)} fill={mix("#ffe600", "#eef3fc", t)} stroke={mix(SLOP_B, "#d6def0", t)} strokeWidth={lerp(4, 1.5, t)} />
          <text x={x + w / 2 + 10 + (w - 92) / 4} y={y + h - 58} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={lerp(30, 24, t)} fill={mix("#7a0033", INK, t)} letterSpacing={lerp(2, 0, t)}>{t < 0.5 ? "MAYBE?!" : "Learn more"}</text>
        </g>
      </g>
    </g>
  );
};

// pill tag
const Tag: React.FC<{ x: number; y: number; text: string; c: string; f: number; at: number }> = ({ x, y, text, c, f, at }) => {
  const k = pop(f, at, 10); if (k <= 0) return null;
  const w = text.length * 20 + 44;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} opacity={clamp01(k)}>
      <rect x={-w / 2} y={-26} width={w} height={52} rx={26} fill={c} />
      <text x={0} y={9} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={27} fill="#fff">{text}</text>
    </g>
  );
};

const Host: React.FC<{ f: number; x: number; y: number; s?: number; wave?: number; mood?: "happy" | "neutral" | "surprised" }> = ({ f, x, y, s = 1, wave = 0, mood = "happy" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Person d={CAST[5]} f={f} seed={6} talk={ENV[f - 15] ?? 0} wave={wave} mood={mood} />
  </g>
);

// ======================================================================
// SHOTS
// ======================================================================
const SHOTS: ShotDef[] = [
  // HOOK — cover frame: big SLOP keyword, then host + slop app
  { from: 0, to: F.name, z0: 1, z1: 1.05, fx: 540, fy: 820, render: (lf, p) => {
    const gf = lf; // local == global here (from 0)
    const cover = 1 - clamp01((gf - 24) / 16);      // SLOP big at start
    const appIn = eout(ramp(gf, 70, 100));
    return (
      <g>
        {/* big yellow cover keyword */}
        {cover > 0.01 && (
          <g transform={`translate(540 760) scale(${lerp(0.7, 1.15, 1 - cover)})`} opacity={cover}>
            <text x={0} y={0} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={300}
              fill="none" stroke={YELLOW} strokeWidth={14} paintOrder="stroke" strokeLinejoin="round">SLOP</text>
          </g>
        )}
        {appIn > 0.01 && <g opacity={appIn} transform={`translate(${(1 - appIn) * 80} 0)`}><MockApp f={gf} t={0} cx={560} cy={760} w={520} h={680} /></g>}
        <Host f={gf} x={210} y={1540} s={1.02} wave={gf < 60 ? 1 : 0} />
      </g>
    );
  } },

  // NAME — unslop, free skill for Claude Code, by Damir
  { from: F.name, to: F.look, z0: 1, z1: 1.06, fx: 540, fy: 760, render: (lf) => {
    const gf = F.name + lf;
    return (
      <g>
        <MockApp f={gf} t={0} cx={560} cy={820} w={460} h={560} />
        <rect x={190} y={360} width={700} height={190} rx={28} fill="#fff" stroke="#d6def0" strokeWidth={3} />
        <text x={540} y={448} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={96} fill={INK}>unslop</text>
        <Tag x={400} y={510} text="Claude Code skill" c={BRAND} f={gf} at={F.name + 26} />
        <Tag x={720} y={510} text="by @heydamir" c={INK2} f={gf} at={F.name + 46} />
        <Host f={gf} x={210} y={1560} s={0.92} />
      </g>
    );
  } },

  // YOU KNOW THE LOOK + slop list (You know the look / purple gradients...)
  { from: F.look, to: F.slopStamp, z0: 1.02, z1: 1.09, fx: 560, fy: 820, render: (lf) => {
    const gf = F.look + lf;
    return (
      <g>
        <MockApp f={gf} t={0} cx={560} cy={800} w={560} h={820} />
        <Tag x={300} y={430} text="purple gradients" c={SLOP_A} f={gf} at={F.slopList + 10} />
        <Tag x={790} y={560} text="glowing buttons" c={SLOP_B} f={gf} at={F.slopList + 55} />
        <Tag x={300} y={1000} text="emoji labels" c={ACCENT} f={gf} at={F.slopList + 95} />
        <Tag x={780} y={1120} text="SHOUTY copy" c="#e4473b" f={gf} at={F.slopList + 125} />
      </g>
    );
  } },

  // THAT'S AI SLOP — stamp
  { from: F.slopStamp, to: F.hunts, z0: 1.06, z1: 1.0, fx: 540, fy: 820, render: (lf) => {
    const gf = F.slopStamp + lf;
    const k = pop(gf, F.slopStamp + 2, 8);
    return (
      <g>
        <MockApp f={gf} t={0} cx={560} cy={860} w={540} h={760} />
        <g transform={`translate(540 760) rotate(-11) scale(${k})`} opacity={clamp01(k)}>
          <rect x={-300} y={-80} width={600} height={160} rx={20} fill="none" stroke="#e4473b" strokeWidth={12} />
          <text x={0} y={34} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={120} fill="#e4473b">AI SLOP</text>
        </g>
      </g>
    );
  } },

  // UNSLOP HUNTS IT DOWN + scans + audit list (hunts / scans / then fixes...)
  { from: F.hunts, to: F.passes, z0: 1.0, z1: 1.06, fx: 560, fy: 760, render: (lf) => {
    const gf = F.hunts + lf;
    const type = clamp01((gf - F.hunts - 6) / 16);
    const cmd = "/unslop".slice(0, Math.round(type * 7));
    const items = ["Spacing — uneven gaps", "Color — 4 clashing hues", "Copy — shouty caps", "Buttons — neon glow"];
    return (
      <g>
        {/* editor / audit panel */}
        <rect x={120} y={360} width={840} height={180} rx={20} fill="#0f1420" />
        <circle cx={168} cy={408} r={10} fill="#ff5f57" /><circle cx={200} cy={408} r={10} fill="#febc2e" /><circle cx={232} cy={408} r={10} fill="#28c840" />
        <text x={160} y={500} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={54} fill={BRAND2}>{cmd}<tspan fill="#fff">{gf % 20 < 10 ? "▌" : ""}</tspan></text>
        <rect x={120} y={580} width={840} height={620} rx={20} fill="#fff" stroke="#d6def0" strokeWidth={3} />
        <text x={160} y={650} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={40} fill={INK}>Audit</text>
        {items.map((it, i) => {
          const at = F.scans + 20 + i * 24; const k = pop(gf, at, 8); if (k <= 0) return null;
          return (
            <g key={i} transform={`translate(0 ${(1 - clamp01(k)) * 12})`} opacity={clamp01(k)}>
              <circle cx={180} cy={722 + i * 110} r={16} fill="none" stroke="#e4473b" strokeWidth={6} />
              <path d={`M172 ${722 + i * 110} l6 7 l12 -14`} stroke="#e4473b" strokeWidth={6} fill="none" strokeLinecap="round" />
              <text x={220} y={736 + i * 110} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={38} fill={INK2}>{it}</text>
            </g>
          );
        })}
        <Host f={gf} x={880} y={1600} s={0.8} />
      </g>
    );
  } },

  // PASS BY PASS — the morph slop -> clean + staccato pass labels
  { from: F.passes, to: F.designer, z0: 1.02, z1: 1.08, fx: 540, fy: 780, render: (lf) => {
    const gf = F.passes + lf;
    const t = eio(clamp01((gf - F.passes - 10) / (F.designer - F.passes - 10)));
    const labels = ["Spacing", "Color", "Copy", "Layout"];
    return (
      <g>
        <MockApp f={gf} t={t} cx={540} cy={820} w={560} h={820} />
        {labels.map((l, i) => {
          const at = F.staccato + i * 14; const k = pop(gf, at, 8); if (k <= 0) return null;
          const done = gf > at + 10;
          return (
            <g key={i} transform={`translate(${200 + i * 180} 360) scale(${k})`} opacity={clamp01(k)}>
              <rect x={-78} y={-28} width={156} height={56} rx={28} fill={done ? BRAND2 : "#fff"} stroke={BRAND2} strokeWidth={3} />
              <text x={0} y={10} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={26} fill={done ? "#fff" : BRAND2}>{l}</text>
            </g>
          );
        })}
      </g>
    );
  } },

  // DESIGNER — host, clean app
  { from: F.designer, to: F.frameworks, z0: 1.0, z1: 1.06, fx: 560, fy: 820, render: (lf) => {
    const gf = F.designer + lf;
    return (
      <g>
        <MockApp f={gf} t={1} cx={620} cy={820} w={520} h={720} />
        <Host f={gf} x={210} y={1560} s={1.0} mood="happy" />
        <Tag x={620} y={360} text="like a real designer" c={BRAND} f={gf} at={F.designer + 12} />
      </g>
    );
  } },

  // FRAMEWORKS + live site
  { from: F.frameworks, to: F.price, z0: 1.02, z1: 1.07, fx: 540, fy: 820, render: (lf) => {
    const gf = F.frameworks + lf;
    const fw = ["React", "Vue", "Svelte", "Tailwind", "HTML"];
    const urlIn = eout(ramp(gf, F.livesite, F.livesite + 20));
    return (
      <g>
        <text x={540} y={430} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={54} fill={INK}>Works anywhere</text>
        {fw.map((n, i) => {
          const at = F.frameworks + 16 + i * 20; const k = pop(gf, at, 9); if (k <= 0) return null;
          const col = [BRAND, BRAND2, "#e4473b", "#38bdf8", ACCENT][i];
          const cxp = 300 + (i % 3) * 240, cyp = 560 + Math.floor(i / 3) * 150;
          return (
            <g key={i} transform={`translate(${cxp} ${cyp}) scale(${k})`} opacity={clamp01(k)}>
              <rect x={-96} y={-40} width={192} height={80} rx={18} fill="#fff" stroke={col} strokeWidth={4} />
              <text x={0} y={14} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={36} fill={col}>{n}</text>
            </g>
          );
        })}
        {urlIn > 0.01 && (
          <g opacity={urlIn} transform={`translate(0 ${(1 - urlIn) * 20})`}>
            <rect x={160} y={980} width={760} height={92} rx={46} fill="#fff" stroke="#d6def0" strokeWidth={3} />
            <circle cx={214} cy={1026} r={14} fill="none" stroke={BRAND2} strokeWidth={5} /><path d="M224 1036 l18 18" stroke={BRAND2} strokeWidth={5} strokeLinecap="round" />
            <text x={266} y={1040} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={38} fill={INK2}>yoursite.com</text>
            <Tag x={540} y={1160} text="even a live URL" c={BRAND} f={gf} at={F.livesite + 10} />
          </g>
        )}
        <Host f={gf} x={880} y={1590} s={0.72} />
      </g>
    );
  } },

  // PRICE — FREE / open source
  { from: F.price, to: F.install, z0: 1.08, z1: 1.0, fx: 540, fy: 760, render: (lf) => {
    const gf = F.price + lf;
    const k = pop(gf, F.price + 2, 10);
    const osIn = pop(gf, F.open, 10);
    return (
      <g>
        <g transform={`translate(540 720) scale(${k})`} opacity={clamp01(k)}>
          <text x={0} y={0} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={360} fill="none" stroke={YELLOW} strokeWidth={14} paintOrder="stroke" strokeLinejoin="round">FREE</text>
        </g>
        <text x={540} y={620} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={60} fill={INK}>The price?</text>
        {osIn > 0 && <g transform={`scale(${osIn})`} style={{ transformOrigin: "540px 1020px" } as any} opacity={clamp01(osIn)}>
          <Tag x={540} y={1020} text="open source · CC BY 4.0" c={BRAND2} f={gf} at={F.open} />
        </g>}
        <Host f={gf} x={210} y={1600} s={0.86} mood="surprised" />
      </g>
    );
  } },

  // INSTALL — type /unslop
  { from: F.install, to: F.payoff, z0: 1.0, z1: 1.06, fx: 540, fy: 820, render: (lf) => {
    const gf = F.install + lf;
    const type = clamp01((gf - F.install - 14) / 40);
    const full = "/unslop fix my landing page";
    const shown = full.slice(0, Math.round(type * full.length));
    return (
      <g>
        <rect x={120} y={560} width={840} height={360} rx={24} fill="#0f1420" />
        <circle cx={168} cy={612} r={10} fill="#ff5f57" /><circle cx={200} cy={612} r={10} fill="#febc2e" /><circle cx={232} cy={612} r={10} fill="#28c840" />
        <text x={160} y={640} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={30} fill={INK2}>Claude Code</text>
        <text x={160} y={740} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={44} fill={BRAND2}>{shown}<tspan fill="#fff">{gf % 20 < 10 ? "▌" : ""}</tspan></text>
        <text x={160} y={840} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={34} fill="#4a5568">drop it in .claude/skills/</text>
        <Host f={gf} x={880} y={1600} s={0.8} />
      </g>
    );
  } },

  // PAYOFF — before / after
  { from: F.payoff, to: F.cta, z0: 1.02, z1: 1.08, fx: 540, fy: 780, render: (lf) => {
    const gf = F.payoff + lf;
    const swipe = eio(clamp01((gf - F.payoff - 30) / 60));
    return (
      <g>
        <text x={300} y={420} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={40} fill="#e4473b">Before</text>
        <text x={780} y={420} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={40} fill={BRAND2}>After</text>
        <g transform="scale(0.62)"><g transform="translate(-40 760)"><MockApp f={gf} t={0} cx={520} cy={520} w={560} h={820} /></g></g>
        <g transform="scale(0.62)"><g transform="translate(900 760)"><MockApp f={gf} t={1} cx={520} cy={520} w={560} h={820} /></g></g>
        <g transform={`translate(540 ${lerp(1180, 1120, swipe)})`} opacity={swipe}>
          <path d="M-70 0 L40 0 M10 -24 L44 0 L10 24" stroke={BRAND} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    );
  } },

  // CTA
  { from: F.cta, to: TOTAL + 1, z0: 1.0, z1: 1.05, fx: 540, fy: 860, render: (lf) => {
    const gf = F.cta + lf;
    const k = pop(gf, F.cta + 6, 12);
    const press = Math.max(0, Math.sin(clamp01((gf - F.cta - 40) / 10) * Math.PI));
    return (
      <g>
        <Host f={gf} x={540} y={1300} s={1.3} wave={gf > F.cta + 30 ? 1 : 0} mood="happy" />
        <g transform={`translate(540 1480) scale(${k})`} opacity={clamp01(k)}>
          <rect x={-250} y={-58} width={500} height={116} rx={58} fill="#e4473b" />
          <text x={0} y={16} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={48} fill="#fff">SUBSCRIBE</text>
        </g>
        <Cursor x={620} y={1520 - press * 10} press={press} />
      </g>
    );
  } },
];

// persistent title bar (visible the WHOLE video) — rule: on-screen title top
const TopTitle: React.FC = () => (
  <div style={{ position: "absolute", top: 46, left: 40, right: 40, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: CAPTION_FONT, fontWeight: 800 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.9)", border: `3px solid ${BRAND}`, borderRadius: 40, padding: "10px 22px" }}>
      <div style={{ width: 22, height: 22, borderRadius: 7, background: BRAND }} />
      <span style={{ fontSize: 30, color: INK, letterSpacing: 0.5 }}>AGENTIC AI · UZAIR</span>
    </div>
    <div style={{ background: YELLOW, borderRadius: 40, padding: "10px 24px", fontSize: 30, color: INK }}>unslop</div>
  </div>
);

// dark-ink captions for the bright world (rule 8 + lessons-learned)
const LightCaptions: React.FC<{ f: number }> = ({ f }) => {
  const words = WORDS, chunks = CHUNKS;
  const c = chunks.find(([a, b], k) => f >= words[a][0] - 2 && f < (chunks[k + 1] ? Math.min(words[chunks[k + 1][0]][0] - 2, words[b][1] + 24) : words[b][1] + 24));
  if (!c) return null;
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 1655, textAlign: "center", fontFamily: CAPTION_FONT, fontWeight: 800, fontSize: 62, lineHeight: 1.3 }}>
      {words.slice(c[0], c[1] + 1).map(([w0, w1, t], i) => {
        const active = f >= w0 && f <= w1 + 2;
        const said = f > w1 + 2;
        const k = active ? 1 + 0.08 * Math.sin(clamp01((f - w0) / 5) * Math.PI) : 1;
        return (
          <span key={i} style={{ display: "inline-block", margin: "0 8px", transform: `scale(${k})`,
            color: active ? "#ffffff" : said ? INK : "rgba(21,22,29,0.4)",
            background: active ? BRAND : "transparent", borderRadius: 14, padding: active ? "2px 16px" : "2px 0",
            boxShadow: active ? "0 8px 20px rgba(47,109,240,0.4)" : "none" }}>{t}</span>
        );
      })}
    </div>
  );
};

export const Film: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 34%, ${BG0}, ${BG1})` }}>
      <FontStyle />
      <Shots f={f} shots={SHOTS} kicks={KICKS} />
      <TopTitle />
      <LightCaptions f={f} />
      <Sequence from={15} durationInFrames={TOTAL - 15}>
        <Audio src={staticFile(AUDIO)} />
      </Sequence>
    </AbsoluteFill>
  );
};
