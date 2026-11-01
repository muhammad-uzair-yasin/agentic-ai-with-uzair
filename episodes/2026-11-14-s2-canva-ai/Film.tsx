import React from "react";
// audio token: projects/s2-canva/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "THUMBNAILS"
 },
 {
  "kind": "name",
  "name": "Canva AI",
  "sub": "design with AI",
  "sub2": "free plan"
 },
 {
  "kind": "image",
  "prompt": "thumbnail: I tried 10 AI tools",
  "tiles": [
   "#ff7a59",
   "#ffd60a",
   "#7ab8ff",
   "#c9a7ff"
  ]
 },
 {
  "kind": "steps",
  "items": [
   "Describe it",
   "Add your photo",
   "Download"
  ]
 },
 {
  "kind": "bullets",
  "items": [
   "Free AI uses monthly",
   "Limits apply"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Thumbnails"
   },
   {
    "t": "Posts"
   },
   {
    "t": "Posters"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Canva AI", slug: "s2-canva", scenes }} />;
