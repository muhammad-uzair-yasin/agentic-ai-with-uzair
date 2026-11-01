import React from "react";
// audio token: projects/heygen/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "AI AVATAR" },
  { kind: "name", name: "HeyGen", sub: "AI avatars", sub2: "free tier" },
  { kind: "window", title: "HeyGen — Avatar", rows: 3 },
  { kind: "tags", items: [{ t: "170+ languages" }, { t: "keeps your voice" }] },
  { kind: "bullets", items: ["3 free videos / month", "Up to 1 min, 720p"] },
  { kind: "tags", items: [{ t: "faceless channels" }, { t: "Ads" }, { t: "Tutorials" }] },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "HeyGen", slug: "heygen", scenes }} />;
