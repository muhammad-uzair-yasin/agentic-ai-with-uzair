import React from "react";
// audio token: projects/aistudio/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "FREE GEMINI" },
  { kind: "name", name: "AI Studio", sub: "free Gemini", sub2: "in your browser" },
  { kind: "window", title: "Google AI Studio", rows: 3 },
  { kind: "bullets", items: ["1,000 images/day", "Transcribe hours of audio", "Build real apps"] },
  { kind: "big", word: "1M", sub: "token memory" },
  { kind: "tags", items: [{ t: "no setup" }, { t: "no code needed" }] },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "AI Studio", slug: "aistudio", scenes }} />;
