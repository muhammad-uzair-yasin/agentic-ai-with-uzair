import React from "react";
// audio token: projects/s2-removerized/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "REMOVE BG"
 },
 {
  "kind": "name",
  "name": "Removerized",
  "sub": "in your browser",
  "sub2": "free · private"
 },
 {
  "kind": "bullets",
  "items": [
   "Runs on your device",
   "Nothing uploaded"
  ]
 },
 {
  "kind": "split",
  "before": "background",
  "after": "removed"
 },
 {
  "kind": "big",
  "word": "NO LIMITS",
  "sub": "works offline"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Products"
   },
   {
    "t": "Profiles"
   },
   {
    "t": "Thumbnails"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Removerized", slug: "s2-removerized", scenes }} />;
