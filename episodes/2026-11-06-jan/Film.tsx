import React from "react";
// audio token: projects/jan/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "OFFLINE" },
  { kind: "name", name: "Jan", sub: "open source", sub2: "100% offline" },
  { kind: "window", title: "Jan — Chat", rows: 3 },
  { kind: "bullets", items: ["Custom assistants", "Local API server", "No account"] },
  { kind: "tags", items: [{ t: "Windows" }, { t: "macOS" }, { t: "Linux" }] },
  { kind: "big", word: "PRIVATE", sub: "your data stays home" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Jan", slug: "jan", scenes }} />;
