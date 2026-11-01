import React from "react";
// audio token: projects/comfyui/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "BUILD AI" },
  { kind: "name", name: "ComfyUI", sub: "open source", sub2: "free · GPL" },
  { kind: "window", title: "ComfyUI — graph", rows: 3 },
  { kind: "tags", items: [{ t: "Images" }, { t: "Video" }, { t: "Audio" }] },
  { kind: "bullets", items: ["Save & reuse workflows", "Share with anyone"] },
  { kind: "big", word: "$0", sub: "just your GPU" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "ComfyUI", slug: "comfyui", scenes }} />;
