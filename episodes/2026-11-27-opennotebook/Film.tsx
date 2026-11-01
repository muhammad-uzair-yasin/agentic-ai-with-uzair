import React from "react";
// audio token: projects/opennotebook/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "NOTEBOOK" },
  { kind: "name", name: "Open Notebook", sub: "open NotebookLM", sub2: "MIT · self-host" },
  { kind: "window", title: "Open Notebook", rows: 3 },
  { kind: "bullets", items: ["Chat with your sources", "Make audio podcasts"] },
  { kind: "tags", items: [{ t: "self-hosted" }, { t: "your data stays" }] },
  { kind: "big", word: "$0", sub: "MIT · free" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Open Notebook", slug: "opennotebook", scenes }} />;
