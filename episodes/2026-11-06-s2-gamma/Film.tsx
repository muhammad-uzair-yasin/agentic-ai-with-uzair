import React from "react";
// audio token: projects/s2-gamma/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "AI SLIDES"
 },
 {
  "kind": "name",
  "name": "Gamma",
  "sub": "AI presentations",
  "sub2": "400 free credits"
 },
 {
  "kind": "steps",
  "items": [
   "Type your topic",
   "AI designs the slides",
   "Present or export"
  ]
 },
 {
  "kind": "chat",
  "user": "Make slide 3 more visual",
  "ai": "Done, I added a chart and icons."
 },
 {
  "kind": "big",
  "word": "400",
  "sub": "free credits"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "School"
   },
   {
    "t": "Pitches"
   },
   {
    "t": "Clients"
   }
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Gamma", slug: "s2-gamma", scenes }} />;
