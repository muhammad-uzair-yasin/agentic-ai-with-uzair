import React from "react";
// audio token: projects/lovable/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "IDEA → APP" },
  { kind: "name", name: "Lovable", sub: "describe → app", sub2: "free daily credits" },
  { kind: "terminal", title: "your prompt", cmd: "build a habit tracker app", out: ["building frontend…", "adding database…", "deploy ready"] },
  { kind: "tags", items: [{ t: "React" }, { t: "Supabase" }, { t: "1-click deploy" }] },
  { kind: "bullets", items: ["Free builds daily", "Public projects free"] },
  { kind: "big", word: "MINUTES", sub: "idea → live app" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Lovable", slug: "lovable", scenes }} />;
