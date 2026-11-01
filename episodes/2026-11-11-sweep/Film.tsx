import React from "react";
// audio token: projects/sweep/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "ISSUE → PR" },
  { kind: "name", name: "Sweep", sub: "AI junior dev", sub2: "free for OSS" },
  { kind: "terminal", title: "GitHub issue", cmd: "@sweep fix the login bug", out: ["reading repo…", "writing code…", "opened PR #42"] },
  { kind: "bullets", items: ["Reads your repo", "Writes the code", "Opens a PR"] },
  { kind: "tags", items: [{ t: "bug fixes" }, { t: "cleanups" }, { t: "small features" }] },
  { kind: "big", word: "FREE", sub: "for open source" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Sweep", slug: "sweep", scenes }} />;
