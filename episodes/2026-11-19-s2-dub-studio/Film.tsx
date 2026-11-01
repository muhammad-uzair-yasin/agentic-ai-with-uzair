import React from "react";
// audio token: projects/s2-dubstudio/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "AI DUBBING"
 },
 {
  "kind": "name",
  "name": "Dub Studio",
  "sub": "Windows",
  "sub2": "free · offline"
 },
 {
  "kind": "steps",
  "items": [
   "Translate speech",
   "Clone the voice",
   "Dub the video"
  ]
 },
 {
  "kind": "split",
  "before": "English",
  "after": "Spanish"
 },
 {
  "kind": "big",
  "word": "$0",
  "sub": "runs on your PC"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "YouTube"
   },
   {
    "t": "Courses"
   },
   {
    "t": "Reels"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Dub Studio", slug: "s2-dubstudio", scenes }} />;
