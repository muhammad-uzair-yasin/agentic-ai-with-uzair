import React from "react";
// audio token: projects/reor/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "SMART NOTES" },
  { kind: "name", name: "Reor", sub: "AI notes", sub2: "local · open source" },
  { kind: "window", title: "Reor — Notes", rows: 3 },
  { kind: "bullets", items: ["Auto-links your ideas", "Chat with your notes"] },
  { kind: "tags", items: [{ t: "runs locally" }, { t: "fully private" }] },
  { kind: "tags", items: [{ t: "Mac" }, { t: "Windows" }, { t: "Linux" }] },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Reor", slug: "reor", scenes }} />;
