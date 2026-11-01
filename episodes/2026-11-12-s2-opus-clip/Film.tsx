import React from "react";
// audio token: projects/s2-opusclip/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "LONG → SHORTS"
 },
 {
  "kind": "name",
  "name": "Opus Clip",
  "sub": "AI clipping",
  "sub2": "60 free min/month"
 },
 {
  "kind": "timeline",
  "label": "best moment found"
 },
 {
  "kind": "split",
  "before": "16:9 long",
  "after": "9:16 short"
 },
 {
  "kind": "bullets",
  "items": [
   "60 min/month free",
   "Watermark on free"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Podcasts"
   },
   {
    "t": "Streams"
   },
   {
    "t": "Interviews"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Opus Clip", slug: "s2-opusclip", scenes }} />;
