import React from "react";
// audio token: projects/hailuo/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "TEXT→VIDEO" },
  { kind: "name", name: "Hailuo", sub: "by MiniMax", sub2: "text → video" },
  { kind: "image", prompt: "a neon city in the rain", tiles: ["#1b2a4a", "#2a1b4a", "#3a2a5a", "#1b3a4a"] },
  { kind: "bullets", items: ["Free credits daily", "720p clips", "Smooth motion"] },
  { kind: "tags", items: [{ t: "free limits change — check in-app" }] },
  { kind: "tags", items: [{ t: "Reels" }, { t: "Intros" }, { t: "B-roll" }] },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Hailuo", slug: "hailuo", scenes }} />;
