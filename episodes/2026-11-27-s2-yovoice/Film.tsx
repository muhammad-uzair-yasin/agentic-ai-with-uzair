import React from "react";
// audio token: projects/s2-yovoice/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "VOICE + MUSIC"
 },
 {
  "kind": "name",
  "name": "yovoice",
  "sub": "open source",
  "sub2": "100% offline"
 },
 {
  "kind": "waveform",
  "label": "your text → speech"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Songs"
   },
   {
    "t": "Lyrics"
   },
   {
    "t": "Multi-track"
   }
  ]
 },
 {
  "kind": "big",
  "word": "$0",
  "sub": "no per-character fees"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Mac"
   },
   {
    "t": "Windows"
   },
   {
    "t": "Linux"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "yovoice", slug: "s2-yovoice", scenes }} />;
