import React from "react";
// audio token: projects/perplexica/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "AI SEARCH" },
  { kind: "name", name: "Perplexica", sub: "self-host Perplexity", sub2: "MIT · free" },
  { kind: "window", title: "Perplexica — Ask", rows: 3 },
  { kind: "bullets", items: ["Searches the live web", "Answers with sources"] },
  { kind: "tags", items: [{ t: "Web" }, { t: "Academic" }, { t: "YouTube" }, { t: "Reddit" }] },
  { kind: "big", word: "$0", sub: "no caps · no tracking" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Perplexica", slug: "perplexica", scenes }} />;
