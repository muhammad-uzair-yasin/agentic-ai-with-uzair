import React from "react";
// audio token: projects/s2-designer/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "FREE DESIGNS"
 },
 {
  "kind": "name",
  "name": "MS Designer",
  "sub": "by Microsoft",
  "sub2": "free"
 },
 {
  "kind": "image",
  "prompt": "birthday invite, pastel balloons",
  "tiles": [
   "#ffc8dd",
   "#bde0fe",
   "#cdb4db",
   "#a2d2ff"
  ]
 },
 {
  "kind": "split",
  "before": "with background",
  "after": "removed"
 },
 {
  "kind": "big",
  "word": "15/DAY",
  "sub": "fast boosts, then standard"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "free Microsoft account"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "MS Designer", slug: "s2-designer", scenes }} />;
