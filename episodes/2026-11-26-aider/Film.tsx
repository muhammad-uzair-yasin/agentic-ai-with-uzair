import React from "react";
// audio token: projects/aider/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "TERMINAL AI" },
  { kind: "name", name: "Aider", sub: "pair programmer", sub2: "open source" },
  { kind: "terminal", title: "aider", cmd: "add dark mode to the navbar", out: ["editing navbar.tsx…", "✓ git commit"] },
  { kind: "bullets", items: ["Edits your whole repo", "Auto git commits"] },
  { kind: "tags", items: [{ t: "Claude" }, { t: "GPT" }, { t: "DeepSeek" }, { t: "local" }] },
  { kind: "big", word: "FREE", sub: "pay only your model" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Aider", slug: "aider", scenes }} />;
