import React from "react";
// audio token: projects/lmstudio/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "LOCAL LLM" },
  { kind: "name", name: "LM Studio", sub: "run models locally", sub2: "free" },
  { kind: "window", title: "LM Studio — Chat", rows: 3 },
  { kind: "bullets", items: ["No command line", "100% offline & private"] },
  { kind: "tags", items: [{ t: "local API server" }, { t: "Hugging Face" }] },
  { kind: "tags", items: [{ t: "Mac" }, { t: "Windows" }, { t: "Linux" }] },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "LM Studio", slug: "lmstudio", scenes }} />;
