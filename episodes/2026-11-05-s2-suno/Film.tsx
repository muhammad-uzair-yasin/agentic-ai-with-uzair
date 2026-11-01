import React from "react";
// audio token: projects/s2-suno/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "MAKE A SONG"
 },
 {
  "kind": "name",
  "name": "Suno",
  "sub": "AI music",
  "sub2": "free daily credits"
 },
 {
  "kind": "chat",
  "user": "A lo-fi song about studying late at night",
  "ai": "Here's your song: Midnight Notes"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Pop"
   },
   {
    "t": "Rap"
   },
   {
    "t": "Rock"
   },
   {
    "t": "Lo-fi"
   }
  ]
 },
 {
  "kind": "big",
  "word": "50/DAY",
  "sub": "free credits"
 },
 {
  "kind": "bullets",
  "items": [
   "Personal use: free",
   "Commercial: paid plan"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Suno", slug: "s2-suno", scenes }} />;
