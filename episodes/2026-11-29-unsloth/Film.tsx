import React from "react";
// audio token: projects/unsloth/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "TRAIN AI" },
  { kind: "name", name: "Unsloth", sub: "fine-tune models", sub2: "Apache · free" },
  { kind: "bullets", items: ["2x faster training", "Up to 70% less VRAM"] },
  { kind: "tags", items: [{ t: "Llama" }, { t: "Gemma" }, { t: "Qwen" }] },
  { kind: "big", word: "1 GPU", sub: "train on your own card" },
  { kind: "big", word: "FREE", sub: "open source" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Unsloth", slug: "unsloth", scenes }} />;
