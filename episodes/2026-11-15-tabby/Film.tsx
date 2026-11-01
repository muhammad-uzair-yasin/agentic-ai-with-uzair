import React from "react";
// audio token: projects/tabby/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "YOUR COPILOT" },
  { kind: "name", name: "Tabby", sub: "self-hosted", sub2: "open source" },
  { kind: "terminal", title: "your editor", cmd: "def send_email(", out: ["AI completes your code", "✓ accepted"] },
  { kind: "bullets", items: ["Runs on your own GPU", "Code stays private"] },
  { kind: "tags", items: [{ t: "VS Code" }, { t: "Vim" }, { t: "IntelliJ" }] },
  { kind: "big", word: "FREE", sub: "for your whole team" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Tabby", slug: "tabby", scenes }} />;
