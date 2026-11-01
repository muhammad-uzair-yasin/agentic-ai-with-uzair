import React from "react";
// audio token: projects/fasterwhisper/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "TRANSCRIBE" },
  { kind: "name", name: "Faster Whisper", sub: "speech → text", sub2: "MIT · open source" },
  { kind: "bullets", items: ["Several times faster", "Less memory"] },
  { kind: "tags", items: [{ t: "Podcasts" }, { t: "Meetings" }, { t: "Videos" }] },
  { kind: "tags", items: [{ t: "runs on your PC" }, { t: "no fancy GPU" }] },
  { kind: "big", word: "FREE", sub: "pip install" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Faster Whisper", slug: "fasterwhisper", scenes }} />;
