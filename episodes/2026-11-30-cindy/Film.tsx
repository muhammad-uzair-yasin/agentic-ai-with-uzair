import React from "react";
// audio token: projects/cindy/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "AI AGENT" },
  { kind: "name", name: "Cindy", sub: "desktop + mobile", sub2: "Apache · free" },
  { kind: "bullets", items: ["Reads your files", "Controls browser & apps"] },
  { kind: "tags", items: [{ t: "GitHub" }, { t: "Jira" }, { t: "Google Workspace" }] },
  { kind: "tags", items: [{ t: "Desktop" }, { t: "Mobile" }] },
  { kind: "big", word: "FREE", sub: "open source" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Cindy", slug: "cindy", scenes }} />;
