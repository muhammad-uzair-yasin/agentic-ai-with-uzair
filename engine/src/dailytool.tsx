import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Shots, ShotDef, FontStyle, CAPTION_FONT, ramp, lerp, clamp01, eout, eio, mix, pop } from "./kit";
import { WORDS, CHUNKS, SENTS, ENV, TOTAL } from "./words";
import { Person, CAST } from "./Humans";

// ======= shared look =======
const INK = "#15161d", INK2 = "#5b6475";
const YELLOW = "#ffd60a";
export const THEME = { bg0: "#eef2fb", bg1: "#e3e9f7", brand: "#2f6df0", brand2: "#17c4a8", accent: "#f5a623" };

// ======= scene config types =======
export type Scene =
  | { kind: "cover"; word: string }
  | { kind: "name"; name: string; sub?: string; sub2?: string }
  | { kind: "terminal"; title?: string; cmd: string; out?: string[] }
  | { kind: "window"; title: string; rows?: number }
  | { kind: "bullets"; heading?: string; items: string[] }
  | { kind: "tags"; items: { t: string; c?: string }[] }
  | { kind: "big"; word: string; sub?: string }
  | { kind: "image"; prompt: string; tiles?: string[] }
  | { kind: "cta"; button?: string };

export type ToolCfg = {
  tag: string;                 // title-bar right (tool name)
  scenes: Scene[];             // one per narration sentence (clamped)
  accent?: string;
  brand?: string;
  cast?: number;               // CAST index (default 5 = Hacker)
  seed?: number;
  audio?: string;              // staticFile path; default projects/<slug>/narration.wav
  slug?: string;               // used to build default audio path
};

// ======= small pieces =======
const Cursor: React.FC<{ x: number; y: number; press?: number }> = ({ x, y, press = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${1 - press * 0.15})`}>
    <path d="M0 0 L0 30 L8 23 L13 34 L18 32 L13 21 L23 21 Z" fill="#fff" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    {press > 0 && <circle cx={2} cy={2} r={16 * press} fill="none" stroke={THEME.brand} strokeWidth={3} opacity={1 - press} />}
  </g>
);
const HostFig: React.FC<{ f: number; x: number; y: number; s?: number; seed: number; cast: number; wave?: number; mood?: "happy" | "neutral" | "surprised" }> =
  ({ f, x, y, s = 1, seed, cast, wave = 0, mood = "happy" }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Person d={CAST[cast]} f={f} seed={seed} talk={ENV[f - 15] ?? 0} wave={wave} mood={mood} />
    </g>
  );

// ======= scene renderers (SVG; lf = local frame within shot) =======
const win = (x: number, y: number, w: number, h: number, stroke = "#d6def0") =>
  <rect x={x} y={y} width={w} height={h} rx={26} fill="#fff" stroke={stroke} strokeWidth={3} />;

function renderScene(sc: Scene, lf: number, f: number, A: string, B: string): React.ReactNode {
  switch (sc.kind) {
    case "cover": {
      const cover = 1 - clamp01((lf - 26) / 16);
      return cover > 0.01 ? (
        <g transform={`translate(540 740) scale(${lerp(0.7, 1.12, 1 - cover)})`} opacity={cover}>
          <text x={0} y={0} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800}
            fontSize={sc.word.length > 6 ? 200 : 300} fill="none" stroke={YELLOW} strokeWidth={14}
            paintOrder="stroke" strokeLinejoin="round">{sc.word}</text>
        </g>
      ) : (
        <g transform="translate(540 720)" opacity={clamp01((lf - 30) / 16)}>
          <text x={0} y={0} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800}
            fontSize={sc.word.length > 6 ? 150 : 220} fill="none" stroke={YELLOW} strokeWidth={12} paintOrder="stroke">{sc.word}</text>
        </g>
      );
    }
    case "name": {
      const k = pop(lf, 6, 10);
      return (
        <g transform={`translate(540 620) scale(${k})`} opacity={clamp01(k)}>
          {win(-360, -150, 720, 300)}
          <text x={0} y={0} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={96} fill={INK}>{sc.name}</text>
          {sc.sub && <g transform="translate(-150 80)"><rect x={-130} y={-30} width={260} height={56} rx={28} fill={A} /><text x={0} y={9} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={25} fill="#fff">{sc.sub}</text></g>}
          {sc.sub2 && <g transform="translate(160 80)"><rect x={-130} y={-30} width={260} height={56} rx={28} fill={INK2} /><text x={0} y={9} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={25} fill="#fff">{sc.sub2}</text></g>}
        </g>
      );
    }
    case "terminal": {
      const type = clamp01((lf - 6) / 20);
      const cmd = sc.cmd.slice(0, Math.round(type * sc.cmd.length));
      return (
        <g>
          <rect x={120} y={430} width={840} height={200} rx={20} fill="#0f1420" />
          <circle cx={168} cy={478} r={10} fill="#ff5f57" /><circle cx={200} cy={478} r={10} fill="#febc2e" /><circle cx={232} cy={478} r={10} fill="#28c840" />
          {sc.title && <text x={266} y={487} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={26} fill={INK2}>{sc.title}</text>}
          <text x={160} y={570} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={46} fill={B}>{cmd}<tspan fill="#fff">{f % 20 < 10 ? "▌" : ""}</tspan></text>
          {(sc.out ?? []).map((line, i) => {
            const at = 30 + i * 16; const k = pop(lf, at, 8); if (k <= 0) return null;
            return <text key={i} x={160} y={700 + i * 60} opacity={clamp01(k)} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={34} fill={i === 0 ? B : INK2}>{line}</text>;
          })}
        </g>
      );
    }
    case "window": {
      const k = pop(lf, 6, 10);
      const rows = sc.rows ?? 3;
      return (
        <g transform={`translate(540 780) scale(${k})`} opacity={clamp01(k)}>
          {win(-280, -360, 560, 720)}
          <path d="M-280 -360 h560 v90 h-560 Z" fill={A} transform="translate(0 0)" />
          <rect x={-280} y={-360} width={560} height={90} rx={26} fill={A} />
          <rect x={-280} y={-320} width={560} height={50} fill={A} />
          <text x={-240} y={-300} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={34} fill="#fff">{sc.title}</text>
          {Array.from({ length: rows }).map((_, i) => {
            const at = 10 + i * 8; const kk = pop(lf, at, 8); if (kk <= 0) return null;
            return <g key={i} opacity={clamp01(kk)}><rect x={-240} y={-230 + i * 80} width={480} height={56} rx={12} fill="#f1f5fc" /><rect x={-220} y={-212 + i * 80} width={300 - i * 40} height={18} rx={9} fill={INK2} opacity={0.5} /></g>;
          })}
          <rect x={-240} y={250} width={220} height={64} rx={14} fill={A} /><text x={-130} y={290} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={26} fill="#fff">Get started</text>
        </g>
      );
    }
    case "bullets": {
      return (
        <g>
          {sc.heading && <text x={540} y={420} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={54} fill={INK}>{sc.heading}</text>}
          {sc.items.map((it, i) => {
            const at = 8 + i * 16; const k = pop(lf, at, 9); if (k <= 0) return null;
            return (
              <g key={i} transform={`translate(0 ${(1 - clamp01(k)) * 12})`} opacity={clamp01(k)}>
                <circle cx={200} cy={540 + i * 120} r={18} fill={B} />
                <path d={`M190 ${540 + i * 120} l7 8 l14 -16`} stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />
                <text x={246} y={554 + i * 120} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={40} fill={INK}>{it}</text>
              </g>
            );
          })}
        </g>
      );
    }
    case "tags": {
      return (
        <g>
          {sc.items.map((tg, i) => {
            const at = 8 + i * 16; const k = pop(lf, at, 9); if (k <= 0) return null;
            const cols = 2, cw = 420, cx = 540 + (i % cols === 0 ? -1 : 1) * 230, cy = 500 + Math.floor(i / cols) * 150;
            const w = tg.t.length * 22 + 60;
            return (
              <g key={i} transform={`translate(${cx} ${cy}) scale(${k})`} opacity={clamp01(k)}>
                <rect x={-w / 2} y={-38} width={w} height={76} rx={38} fill={tg.c ?? A} />
                <text x={0} y={12} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={34} fill="#fff">{tg.t}</text>
              </g>
            );
          })}
        </g>
      );
    }
    case "big": {
      const k = pop(lf, 2, 10);
      return (
        <g>
          {sc.sub && <text x={540} y={560} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={54} fill={INK}>{sc.sub}</text>}
          <g transform={`translate(540 760) scale(${k})`} opacity={clamp01(k)}>
            <text x={0} y={0} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800}
              fontSize={sc.word.length > 5 ? 180 : 300} fill="none" stroke={YELLOW} strokeWidth={14} paintOrder="stroke" strokeLinejoin="round">{sc.word}</text>
          </g>
        </g>
      );
    }
    case "image": {
      const typed = clamp01((lf - 6) / 18);
      const shown = sc.prompt.slice(0, Math.round(typed * sc.prompt.length));
      const tiles = sc.tiles ?? ["#7ab8ff", "#ffb37a", "#8fe0c2", "#c9a7ff"];
      return (
        <g>
          <rect x={160} y={430} width={760} height={92} rx={46} fill="#fff" stroke="#d6def0" strokeWidth={3} />
          <text x={200} y={490} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={34} fill={INK2}>{shown}<tspan fill={THEME.brand}>{f % 20 < 10 ? "▌" : ""}</tspan></text>
          {tiles.map((c, i) => {
            const at = 34 + i * 10; const k = pop(lf, at, 10); if (k <= 0) return null;
            const cx = 300 + (i % 2) * 300, cy = 640 + Math.floor(i / 2) * 320;
            return <g key={i} transform={`translate(${cx} ${cy}) scale(${k})`} opacity={clamp01(k)}><rect x={-140} y={-140} width={280} height={280} rx={20} fill={c} /><rect x={-140} y={-140} width={280} height={280} rx={20} fill="none" stroke="#fff" strokeWidth={4} opacity={0.5} /></g>;
          })}
        </g>
      );
    }
    case "cta":
      return null; // handled with host overlay below
    default:
      return null;
  }
}

// ======= captions (dark ink for bright world) =======
const LightCaptions: React.FC<{ f: number; brand: string }> = ({ f, brand }) => {
  const c = CHUNKS.find(([a, b], k) => f >= WORDS[a][0] - 2 && f < (CHUNKS[k + 1] ? Math.min(WORDS[CHUNKS[k + 1][0]][0] - 2, WORDS[b][1] + 24) : WORDS[b][1] + 24));
  if (!c) return null;
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 1655, textAlign: "center", fontFamily: CAPTION_FONT, fontWeight: 800, fontSize: 62, lineHeight: 1.3 }}>
      {WORDS.slice(c[0], c[1] + 1).map(([w0, w1, t], i) => {
        const active = f >= w0 && f <= w1 + 2, said = f > w1 + 2;
        const k = active ? 1 + 0.08 * Math.sin(clamp01((f - w0) / 5) * Math.PI) : 1;
        return <span key={i} style={{ display: "inline-block", margin: "0 8px", transform: `scale(${k})`,
          color: active ? "#fff" : said ? INK : "rgba(21,22,29,0.4)", background: active ? brand : "transparent",
          borderRadius: 14, padding: active ? "2px 16px" : "2px 0", boxShadow: active ? "0 8px 20px rgba(47,109,240,0.4)" : "none" }}>{t}</span>;
      })}
    </div>
  );
};

const TopTitle: React.FC<{ tag: string; brand: string }> = ({ tag, brand }) => (
  <div style={{ position: "absolute", top: 46, left: 40, right: 40, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: CAPTION_FONT, fontWeight: 800 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.9)", border: `3px solid ${brand}`, borderRadius: 40, padding: "10px 22px" }}>
      <div style={{ width: 22, height: 22, borderRadius: 7, background: brand }} />
      <span style={{ fontSize: 30, color: INK, letterSpacing: 0.5 }}>AGENTIC AI · UZAIR</span>
    </div>
    <div style={{ background: YELLOW, borderRadius: 40, padding: "10px 24px", fontSize: 30, color: INK }}>{tag}</div>
  </div>
);

// ======= main template =======
export const ToolFilm: React.FC<{ cfg: ToolCfg }> = ({ cfg }) => {
  const f = useCurrentFrame();
  const A = cfg.accent ?? THEME.brand, B = cfg.brand2 as any ?? THEME.brand2;
  const brand = cfg.brand ?? THEME.brand;
  const cast = cfg.cast ?? 5, seed = cfg.seed ?? 6;
  const scenes = cfg.scenes;
  const n = SENTS.length;
  const starts = SENTS.map(([s], i) => (i === 0 ? 0 : s - 4));
  const KICKS: [number, number][] = [];

  const shots: ShotDef[] = SENTS.map(([s0], i) => {
    const sc = scenes[Math.min(i, scenes.length - 1)];
    const from = starts[i], to = i < n - 1 ? starts[i + 1] : TOTAL + 1;
    if (sc.kind === "big" || sc.kind === "cover") KICKS.push([from + 2, 7]);
    return {
      from, to, z0: 1.0, z1: 1.06, fx: 540, fy: 820,
      render: (lf: number) => {
        const gf = from + lf;
        const body = renderScene(sc, lf, gf, A, B);
        // host placement by scene kind
        let host: React.ReactNode = null;
        if (sc.kind === "cover") host = <HostFig f={gf} x={210} y={1540} s={1.0} seed={seed} cast={cast} wave={lf < 60 ? 1 : 0} />;
        else if (sc.kind === "cta") {
          const k = pop(lf, 6, 12), press = Math.max(0, Math.sin(clamp01((lf - 40) / 10) * Math.PI));
          host = <g>
            <HostFig f={gf} x={540} y={1300} s={1.3} seed={seed} cast={cast} wave={lf > 30 ? 1 : 0} />
            <g transform={`translate(540 1480) scale(${k})`} opacity={clamp01(k)}>
              <rect x={-250} y={-58} width={500} height={116} rx={58} fill="#e4473b" />
              <text x={0} y={16} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={48} fill="#fff">{sc.button ?? "SUBSCRIBE"}</text>
            </g>
            <Cursor x={620} y={1520 - press * 10} press={press} />
          </g>;
        } else if (sc.kind === "name" || sc.kind === "big") host = <HostFig f={gf} x={210} y={1580} s={0.86} seed={seed} cast={cast} />;
        else host = <HostFig f={gf} x={900} y={1590} s={0.7} seed={seed} cast={cast} />;
        return <g>{body}{host}</g>;
      },
    };
  });

  const audio = cfg.audio ?? `projects/${cfg.slug}/narration.wav`;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 34%, ${THEME.bg0}, ${THEME.bg1})` }}>
      <FontStyle />
      <Shots f={f} shots={shots} kicks={KICKS} />
      <TopTitle tag={cfg.tag} brand={brand} />
      <LightCaptions f={f} brand={brand} />
      <Sequence from={15} durationInFrames={TOTAL - 15}><Audio src={staticFile(audio)} /></Sequence>
    </AbsoluteFill>
  );
};
