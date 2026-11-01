import React from "react";
// audio token: projects/kokoro/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "FREE VOICES" },
  { kind: "name", name: "Kokoro", sub: "open-source TTS", sub2: "Apache · free" },
  { kind: "bullets", items: ["Only 82M params", "Runs on almost anything"] },
  { kind: "tags", items: [{ t: "rivals ElevenLabs" }, { t: "100x real-time" }] },
  { kind: "tags", items: [{ t: "English" }, { t: "+ more languages" }] },
  { kind: "big", word: "$0", sub: "for any project" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Kokoro", slug: "kokoro", scenes }} />;
