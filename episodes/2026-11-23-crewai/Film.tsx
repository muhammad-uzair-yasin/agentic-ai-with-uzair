import React from "react";
// audio token: projects/crewai/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "AI TEAM" },
  { kind: "name", name: "CrewAI", sub: "multi-agent", sub2: "MIT · open source" },
  { kind: "tags", items: [{ t: "Researcher" }, { t: "Writer" }, { t: "Coder" }] },
  { kind: "bullets", items: ["Agents delegate tasks", "They use tools"] },
  { kind: "tags", items: [{ t: "any model" }, { t: "cloud or local" }] },
  { kind: "big", word: "FREE", sub: "pip install crewai" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "CrewAI", slug: "crewai", scenes }} />;
