import React from "react";
// audio token: projects/s2-nanobanana/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "EDIT BY TEXT"
 },
 {
  "kind": "name",
  "name": "Nano Banana",
  "sub": "in the Gemini app",
  "sub2": "free daily"
 },
 {
  "kind": "chat",
  "user": "Put me on a beach at sunset",
  "ai": "Done! Here's your new photo."
 },
 {
  "kind": "split",
  "before": "original",
  "after": "edited"
 },
 {
  "kind": "bullets",
  "items": [
   "Free daily edits",
   "Resets every day"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Profile pics"
   },
   {
    "t": "Thumbnails"
   },
   {
    "t": "Products"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Nano Banana", slug: "s2-nanobanana", scenes }} />;
