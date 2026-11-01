import React from "react";
// audio token: projects/s2-sokuji/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "LIVE TRANSLATE"
 },
 {
  "kind": "name",
  "name": "Sokuji",
  "sub": "open source",
  "sub2": "free"
 },
 {
  "kind": "chat",
  "user": "Hola, ¿cómo estás?",
  "ai": "Hello, how are you?"
 },
 {
  "kind": "bullets",
  "items": [
   "Fully offline mode",
   "No API key"
  ]
 },
 {
  "kind": "big",
  "word": "55+",
  "sub": "languages translated"
 },
 {
  "kind": "bullets",
  "items": [
   "Desktop app",
   "Browser extension"
  ]
 },
 {
  "kind": "comment"
 },
 {
  "kind": "cta",
  "nolink": true
 }
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Sokuji", slug: "s2-sokuji", scenes }} />;
