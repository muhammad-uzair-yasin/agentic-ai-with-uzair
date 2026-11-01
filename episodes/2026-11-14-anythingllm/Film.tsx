import React from "react";
// audio token: projects/anythingllm/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "YOUR DOCS" },
  { kind: "name", name: "AnythingLLM", sub: "open source", sub2: "MIT · free" },
  { kind: "tags", items: [{ t: "PDF" }, { t: "Word" }, { t: "GitHub" }, { t: "YouTube" }] },
  { kind: "bullets", items: ["Local model", "Nothing leaves your PC"] },
  { kind: "tags", items: [{ t: "Mac" }, { t: "Windows" }, { t: "Linux" }] },
  { kind: "big", word: "$0", sub: "no paid tier" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "AnythingLLM", slug: "anythingllm", scenes }} />;
