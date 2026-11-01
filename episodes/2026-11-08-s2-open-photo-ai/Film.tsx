import React from "react";
// audio token: projects/s2-openphoto/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "FIX OLD PHOTOS"
 },
 {
  "kind": "name",
  "name": "Open Photo AI",
  "sub": "open source",
  "sub2": "free"
 },
 {
  "kind": "split",
  "before": "blurry",
  "after": "sharp"
 },
 {
  "kind": "big",
  "word": "COLOR",
  "sub": "for black & white photos"
 },
 {
  "kind": "bullets",
  "items": [
   "Autopilot picks fixes",
   "Sharpen · denoise · upscale"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Windows"
   },
   {
    "t": "Mac"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Open Photo AI", slug: "s2-openphoto", scenes }} />;
