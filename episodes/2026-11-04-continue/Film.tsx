import React from "react";
// audio token: projects/continue/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "COPILOT" },
  { kind: "name", name: "Continue", sub: "open source", sub2: "VS Code · JetBrains" },
  { kind: "terminal", title: "in your editor", cmd: "// explain this function", out: ["autocomplete", "chat", "edits"] },
  { kind: "bullets", items: ["Your code stays local", "Plug in any model", "Nothing sent to cloud"] },
  { kind: "big", word: "FREE", sub: "with a local model" },
  { kind: "tags", items: [{ t: "banks" }, { t: "healthcare" }, { t: "gov" }, { t: "privacy-first teams" }] },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Continue", slug: "continue", scenes }} />;
