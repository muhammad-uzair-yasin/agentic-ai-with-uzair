import React from "react";
// audio token: projects/marker/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "PDF → MD" },
  { kind: "name", name: "Marker", sub: "by Datalab", sub2: "open source" },
  { kind: "bullets", items: ["Keeps tables", "Keeps equations", "Keeps images"] },
  { kind: "tags", items: [{ t: "PDF" }, { t: "Word" }, { t: "PPT" }, { t: "90+ langs" }] },
  { kind: "big", word: "FAST", sub: "pages per second" },
  { kind: "tags", items: [{ t: "feed any AI" }] },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Marker", slug: "marker", scenes }} />;
