import React from "react";
// audio token: projects/khoj/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "YOUR NOTES" },
  { kind: "name", name: "Khoj", sub: "open source", sub2: "self-host · free" },
  { kind: "tags", items: [{ t: "PDF" }, { t: "Markdown" }, { t: "Obsidian" }, { t: "Notion" }] },
  { kind: "window", title: "Khoj — Ask", rows: 3 },
  { kind: "bullets", items: ["Cloud or offline model", "Notes never leave your PC"] },
  { kind: "tags", items: [{ t: "Desktop" }, { t: "Web" }, { t: "Obsidian" }, { t: "WhatsApp" }] },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Khoj", slug: "khoj", scenes }} />;
