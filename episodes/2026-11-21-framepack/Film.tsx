import React from "react";
// audio token: projects/framepack/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "LONG VIDEO" },
  { kind: "name", name: "FramePack", sub: "open source", sub2: "low-VRAM video" },
  { kind: "bullets", items: ["Runs on 6GB VRAM", "Cheap GPUs welcome"] },
  { kind: "big", word: "SAME RAM", sub: "1s or 1min video" },
  { kind: "tags", items: [{ t: "up to 2 min" }, { t: "30 fps" }] },
  { kind: "big", word: "FREE", sub: "by ControlNet's creator" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "FramePack", slug: "framepack", scenes }} />;
