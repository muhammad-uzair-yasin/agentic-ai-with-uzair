import React from "react";
// audio token: projects/browseruse/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "WEB AGENT" },
  { kind: "name", name: "Browser Use", sub: "open source", sub2: "MIT · Python" },
  { kind: "window", title: "Agent — running", rows: 3 },
  { kind: "bullets", items: ["Research", "Book & buy", "Pull data"] },
  { kind: "tags", items: [{ t: "any LLM" }, { t: "or local Ollama" }] },
  { kind: "big", word: "20k+", sub: "stars · free on GitHub" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Browser Use", slug: "browseruse", scenes }} />;
