import React from "react";
// audio token: projects/napkin/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "DIAGRAMS" },
  { kind: "name", name: "Napkin AI", sub: "text → visuals", sub2: "free weekly credits" },
  { kind: "tags", items: [{ t: "Flowcharts" }, { t: "Infographics" }, { t: "Mind maps" }] },
  { kind: "bullets", items: ["Pick a style", "Tweak colors & icons"] },
  { kind: "big", word: "FREE", sub: "hundreds of credits/week" },
  { kind: "tags", items: [{ t: "Slides" }, { t: "Posts" }, { t: "Explainers" }] },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Napkin AI", slug: "napkin", scenes }} />;
