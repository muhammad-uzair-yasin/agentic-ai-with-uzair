import React from "react";
// audio token: projects/s2-adobeenhance/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "STUDIO VOICE"
 },
 {
  "kind": "name",
  "name": "Adobe Podcast",
  "sub": "Enhance Speech",
  "sub2": "free"
 },
 {
  "kind": "split",
  "before": "noisy",
  "after": "clean"
 },
 {
  "kind": "waveform",
  "label": "enhanced voice"
 },
 {
  "kind": "big",
  "word": "FREE",
  "sub": "from Adobe"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Voiceovers"
   },
   {
    "t": "Podcasts"
   },
   {
    "t": "Classes"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Adobe Enhance", slug: "s2-adobeenhance", scenes }} />;
