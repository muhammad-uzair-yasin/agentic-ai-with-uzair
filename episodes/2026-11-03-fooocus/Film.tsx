import React from "react";
// audio token: projects/fooocus/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "FREE ART" },
  { kind: "name", name: "Fooocus", sub: "free & open source", sub2: "runs offline" },
  { kind: "image", prompt: "a fox in a snowy forest, cinematic", tiles: ["#9ec7ff", "#ffd9a8", "#bfe8cf", "#d8c4ff"] },
  { kind: "tags", items: [{ t: "auto-enhances your prompt" }] },
  { kind: "bullets", items: ["100% offline", "No credits", "No image limits"] },
  { kind: "tags", items: [{ t: "runs on a gaming GPU" }, { t: "seconds per image" }] },
  { kind: "big", word: "$0", sub: "Midjourney-quality" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Fooocus", slug: "fooocus", scenes }} />;
