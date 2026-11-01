import React from "react";
// audio token: projects/pinokio/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "1 CLICK" },
  { kind: "name", name: "Pinokio", sub: "free & open source", sub2: "runs on your PC" },
  { kind: "tags", items: [{ t: "Image AI" }, { t: "Video AI" }, { t: "Music AI" }, { t: "Chatbots" }] },
  { kind: "terminal", title: "the old way", cmd: "git clone … && pip install -r …", out: ["Traceback (most recent call last)", "ERROR: dependency conflict"] },
  { kind: "bullets", items: ["Runs on your PC", "Private by default", "No subscription"] },
  { kind: "window", title: "Pinokio", rows: 3 },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "pinokio", slug: "pinokio", scenes }} />;
