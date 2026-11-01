import React from "react";
// audio token: projects/chatterbox/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "VOICE CLONE" },
  { kind: "name", name: "Chatterbox", sub: "by Resemble AI", sub2: "MIT · open source" },
  { kind: "bullets", items: ["Few-second sample", "Any text, any emotion"] },
  { kind: "tags", items: [{ t: "23 languages" }, { t: "beats ElevenLabs" }] },
  { kind: "tags", items: [{ t: "this video's voice = Chatterbox" }] },
  { kind: "big", word: "FREE", sub: "commercial use OK" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Chatterbox", slug: "chatterbox", scenes }} />;
