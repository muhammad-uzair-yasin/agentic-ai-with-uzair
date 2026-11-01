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
  | { kind: "chat"; user: string; ai: string }
  | { kind: "waveform"; label?: string }
  | { kind: "split"; before: string; after: string }
  | { kind: "steps"; items: string[] }
  | { kind: "timeline"; label?: string }
  | { kind: "comment" }
  | { kind: "cta"; button?: string; nolink?: boolean };

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

const wrapLines = (s: string, max: number) => {
  const out: string[] = []; let cur = "";
  for (const w of s.split(" ")) {
    if ((cur + " " + w).trim().length > max) { out.push(cur); cur = w; } else cur = (cur + " " + w).trim();
  }
  if (cur) out.push(cur);
  return out;
};

function renderScene(sc: Scene, lf: number, f: number, A: string, B: string): React.ReactNode {
  switch (sc.kind) {
    case "cover": {
      const cover = 1 - clamp01((lf - 26) / 16);
      return cover > 0.01 ? (
        <g transform={`translate(540 740) scale(${lerp(0.7, 1.12, 1 - cover)})`} opacity={cover}>
          <text x={0} y={0} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800}
            fontSize={Math.min(300, Math.floor(860 / (Math.max(3, sc.word.length) * 0.72)))} fill="none" stroke={YELLOW} strokeWidth={14}
            paintOrder="stroke" strokeLinejoin="round">{sc.word}</text>
        </g>
      ) : (
        <g transform="translate(540 720)" opacity={clamp01((lf - 30) / 16)}>
          <text x={0} y={0} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800}
            fontSize={Math.round(Math.min(300, Math.floor(860 / (Math.max(3, sc.word.length) * 0.72))) * 0.74)} fill="none" stroke={YELLOW} strokeWidth={12} paintOrder="stroke">{sc.word}</text>
        </g>
      );
    }
    case "name": {
      const k = pop(lf, 6, 10);
      return (
        <g transform={`translate(540 620) scale(${k})`} opacity={clamp01(k)}>
          {win(-360, -150, 720, 300)}
          <text x={0} y={0} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={Math.min(96, Math.floor(640 / (sc.name.length * 0.6)))} fill={INK}>{sc.name}</text>
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
              fontSize={Math.min(300, Math.floor(860 / (Math.max(3, sc.word.length) * 0.72)))} fill="none" stroke={YELLOW} strokeWidth={14} paintOrder="stroke" strokeLinejoin="round">{sc.word}</text>
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
    case "chat": {
      const ul = wrapLines(sc.user, 28), al = wrapLines(sc.ai, 28);
      const uw = Math.min(780, Math.max(...ul.map((l) => l.length)) * 22 + 64), uh = ul.length * 50 + 40;
      const aw = Math.min(840, Math.max(...al.map((l) => l.length)) * 22 + 64), ah = al.length * 50 + 40;
      const uk = pop(lf, 4, 10), ay = 430 + uh + 36;
      let left = Math.round(clamp01((lf - 28) / 46) * sc.ai.length);
      const aLines = al.map((l) => { const t = l.slice(0, Math.max(0, left)); left -= l.length + 1; return t; });
      return (
        <g>
          <g transform={`translate(0 ${(1 - clamp01(uk)) * 24})`} opacity={clamp01(uk)}>
            <rect x={1020 - uw} y={430} width={uw} height={uh} rx={34} fill={A} />
            {ul.map((l, i) => <text key={i} x={1020 - uw + 32} y={430 + 56 + i * 50} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={36} fill="#fff">{l}</text>)}
          </g>
          {lf >= 12 && lf < 28 && (
            <g transform={`translate(60 ${ay})`}>
              <rect width={170} height={84} rx={42} fill="#fff" stroke="#d6def0" strokeWidth={3} />
              {[0, 1, 2].map((i) => <circle key={i} cx={46 + i * 39} cy={42 - Math.abs(Math.sin(f * 0.35 + i * 0.9)) * 10} r={10} fill={INK2} />)}
            </g>
          )}
          {lf >= 28 && (
            <g transform={`translate(60 ${ay})`}>
              <rect width={aw} height={ah} rx={34} fill="#fff" stroke="#d6def0" strokeWidth={3} />
              {aLines.map((l, i) => <text key={i} x={32} y={56 + i * 50} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={36} fill={INK}>{l}</text>)}
            </g>
          )}
        </g>
      );
    }
    case "waveform": {
      const k = pop(lf, 2, 10), prog = clamp01(lf / 100);
      return (
        <g opacity={clamp01(k)}>
          {sc.label && (
            <g transform="translate(540 470)">
              <rect x={-290} y={-36} width={580} height={72} rx={36} fill="#fff" stroke="#d6def0" strokeWidth={3} />
              <text x={0} y={11} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={32} fill={INK}>{sc.label}</text>
            </g>
          )}
          {Array.from({ length: 34 }).map((_, i) => {
            const env = 0.45 + 0.55 * Math.abs(Math.sin(f * 0.045 + i * 0.28));
            const h = 24 + 190 * env * Math.abs(Math.sin(f * 0.21 + i * 0.55 + 1));
            return <rect key={i} x={110 + i * 26.5} y={760 - h / 2} width={15} height={h} rx={7.5} fill={i % 2 ? A : B} />;
          })}
          <rect x={150} y={1010} width={780} height={14} rx={7} fill="#d6def0" />
          <rect x={150} y={1010} width={780 * prog} height={14} rx={7} fill={B} />
          <circle cx={150 + 780 * prog} cy={1017} r={16} fill={A} />
        </g>
      );
    }
    case "split": {
      const kl = pop(lf, 4, 10), kr = pop(lf, 26, 10);
      const jag = (y0: number) => Array.from({ length: 7 }).map((_, i) => `${40 + i * 60},${y0 + Math.sin(i * 2.3 + f * 0.12) * 18 * (i % 2 ? 1 : -1)}`).join(" ");
      return (
        <g>
          <g transform="translate(70 430)" opacity={clamp01(kl)}>
            <rect width={440} height={520} rx={28} fill="#fff" stroke="#f0b7b2" strokeWidth={5} />
            <rect x={40} y={-30} width={170} height={58} rx={29} fill="#e4473b" />
            <text x={125} y={10} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={30} fill="#fff">BEFORE</text>
            <polyline points={jag(190)} fill="none" stroke="#e4473b" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" opacity={0.55} />
            <polyline points={jag(290)} fill="none" stroke="#e4473b" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" opacity={0.55} />
            <text x={220} y={440} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={36} fill={INK2}>{sc.before}</text>
          </g>
          <g transform={`translate(570 ${430 + (1 - clamp01(kr)) * 30})`} opacity={clamp01(kr)}>
            <rect width={440} height={520} rx={28} fill="#fff" stroke={B} strokeWidth={5} />
            <rect x={40} y={-30} width={170} height={58} rx={29} fill={B} />
            <text x={125} y={10} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={30} fill="#fff">AFTER</text>
            <line x1={40} y1={190} x2={400} y2={190} stroke={B} strokeWidth={9} strokeLinecap="round" />
            <line x1={40} y1={290} x2={400} y2={290} stroke={B} strokeWidth={9} strokeLinecap="round" />
            <text x={220} y={440} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={36} fill={INK}>{sc.after}</text>
          </g>
          <g transform={`translate(540 690) scale(${clamp01(kr)})`}>
            <circle r={38} fill={A} />
            <path d="M-14 0 H14 M4 -12 L16 0 L4 12" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      );
    }
    case "steps":
      return (
        <g>
          {sc.items.map((it, i) => {
            const k = pop(lf, 6 + i * 16, 9); if (k <= 0) return null;
            const y = 520 + i * 150;
            return (
              <g key={i} opacity={clamp01(k)} transform={`translate(0 ${(1 - clamp01(k)) * 14})`}>
                {i > 0 && <line x1={200} y1={y - 150 + 46} x2={200} y2={y - 46} stroke="#c9d3ea" strokeWidth={6} strokeLinecap="round" />}
                <circle cx={200} cy={y} r={44} fill={i === sc.items.length - 1 ? B : A} />
                <text x={200} y={y + 15} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={44} fill="#fff">{i + 1}</text>
                <text x={280} y={y + 15} fontFamily={CAPTION_FONT} fontWeight={800} fontSize={42} fill={INK}>{it}</text>
              </g>
            );
          })}
        </g>
      );
    case "timeline": {
      const prog = clamp01(lf / 110), px = 170 + prog * 760, kp = pop(lf, 2, 10);
      const tracks = [
        { y: 960, c: A, clips: [[170, 300], [490, 220], [730, 200]] },
        { y: 1040, c: B, clips: [[230, 180], [450, 320]] },
        { y: 1120, c: "#f5a623", clips: [[170, 520], [720, 210]] },
      ];
      return (
        <g>
          <g opacity={clamp01(kp)}>
            <clipPath id="tlclip"><rect x={140} y={420} width={800} height={450} rx={26} /></clipPath>
            <rect x={140} y={420} width={800} height={450} rx={26} fill="#16203a" />
            <g clipPath="url(#tlclip)">
              <circle cx={300 + prog * 360} cy={560} r={46} fill="#ffd60a" />
              <path d="M140 870 V790 Q360 690 540 780 T940 760 V870 Z" fill={B} opacity={0.9} />
              {lf > 36 && <g transform={`translate(0 ${(1 - clamp01((lf - 36) / 10)) * 20})`} opacity={clamp01((lf - 36) / 10)}>
                <rect x={230} y={790} width={620} height={58} rx={29} fill="#fff" opacity={0.94} />
                <text x={540} y={830} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={30} fill={INK}>{sc.label ?? "your caption here"}</text>
              </g>}
            </g>
          </g>
          {tracks.map((t, ti) => (
            <g key={ti}>
              <rect x={150} y={t.y - 8} width={780} height={64} rx={14} fill="#e6ebf7" />
              {t.clips.map(([cx0, cw], ci) => {
                const k = pop(lf, 8 + ti * 8 + ci * 6, 9); if (k <= 0) return null;
                return <rect key={ci} x={cx0 - (1 - clamp01(k)) * 160} y={t.y} width={cw} height={48} rx={12} fill={t.c} opacity={clamp01(k)} />;
              })}
            </g>
          ))}
          <line x1={px} y1={930} x2={px} y2={1180} stroke="#e4473b" strokeWidth={5} />
          <path d={`M${px - 12} 922 H${px + 12} L${px} 942 Z`} fill="#e4473b" />
        </g>
      );
    }
    case "comment": {
      const k = pop(lf, 4, 12);
      return (
        <g>
          <g transform={`translate(540 640) scale(${k})`} opacity={clamp01(k)}>
            <rect x={-440} y={-135} width={880} height={270} rx={46} fill="#fff" stroke={A} strokeWidth={6} />
            <text x={0} y={-10} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={74} fill={INK}>{'Comment "LINK"'}</text>
            <text x={0} y={72} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={40} fill={INK2}>and I'll send you the link</text>
          </g>
          {["LINK", "link pls", "LINK!"].map((t, i) => {
            const kk = pop(lf, 26 + i * 14, 9); if (kk <= 0) return null;
            const x = [300, 720, 500][i], y = [930, 990, 1090][i] - Math.sin((lf + i * 20) * 0.1) * 6;
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${kk})`} opacity={clamp01(kk)}>
                <rect x={-120} y={-36} width={240} height={72} rx={36} fill={B} />
                <text x={0} y={12} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={34} fill="#fff">{t}</text>
              </g>
            );
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

  // camera choreography: alternate push-in / pull-back / pan, varied focus points, slide direction
  // focus stays near horizontal centre so wide scenes (chat, split, timeline) never crop at the edges
  const FOCI: [number, number][] = [[540, 760], [500, 640], [580, 700], [540, 980], [510, 880], [570, 820]];
  const shots: ShotDef[] = SENTS.map(([s0], i) => {
    const sc = scenes[Math.min(i, scenes.length - 1)];
    const from = starts[i], to = i < n - 1 ? starts[i + 1] : TOTAL + 1;
    // punch on most scene starts for energy
    KICKS.push([from + 1, sc.kind === "big" || sc.kind === "cover" || sc.kind === "cta" ? 9 : 5]);
    const mode = i % 3;                                   // 0 push-in, 1 pull-back, 2 strong push
    const z0 = mode === 1 ? 1.09 : mode === 2 ? 1.0 : 1.02;
    const z1 = mode === 1 ? 1.0 : mode === 2 ? 1.1 : 1.08;
    const [fx, fy] = FOCI[i % FOCI.length];
    const slide = (i % 2 === 0 ? 1 : -1) * 70;            // alternating slide-in direction
    return {
      from, to, z0, z1, fx, fy, slide,
      render: (lf: number) => {
        const gf = from + lf;
        const body = renderScene(sc, lf, gf, A, B);
        // host placement by scene kind
        let host: React.ReactNode = null;
        if (sc.kind === "cover") host = <HostFig f={gf} x={210} y={1540} s={1.0} seed={seed} cast={cast} wave={lf < 60 ? 1 : 0} />;
        else if (sc.kind === "cta") {
          const k = pop(lf, 6, 12), press = Math.max(0, Math.sin(clamp01((lf - 40) / 10) * Math.PI));
          const linkK = pop(lf, 26, 12);
          host = <g>
            <HostFig f={gf} x={540} y={1150} s={1.05} seed={seed} cast={cast} wave={lf > 24 ? 1 : 0} />
            <g transform={`translate(540 1320) scale(${k})`} opacity={clamp01(k)}>
              <rect x={-240} y={-54} width={480} height={108} rx={54} fill="#e4473b" />
              <text x={0} y={15} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={46} fill="#fff">{sc.button ?? "SUBSCRIBE"}</text>
            </g>
            <Cursor x={610} y={1358 - press * 10} press={press} />
            {!sc.nolink && linkK > 0 && (
              <g transform={`translate(540 1470) scale(${Math.min(1, linkK)})`} opacity={clamp01(linkK)}>
                <rect x={-320} y={-44} width={640} height={88} rx={44} fill="#fff" stroke={brand} strokeWidth={4} />
                <text x={-18} y={14} textAnchor="middle" fontFamily={CAPTION_FONT} fontWeight={800} fontSize={34} fill={INK}>Comment "LINK" to get it</text>
                <path d="M268 -8 l14 18 l14 -18" stroke={brand} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
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
