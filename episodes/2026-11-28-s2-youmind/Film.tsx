import React from "react";
// audio token: projects/s2-youmind/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "30K PROMPTS"
 },
 {
  "kind": "name",
  "name": "YouMind",
  "sub": "prompt library",
  "sub2": "free to browse"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Images"
   },
   {
    "t": "Videos"
   },
   {
    "t": "Web pages"
   }
  ]
 },
 {
  "kind": "big",
  "word": "DAILY",
  "sub": "new trending prompts"
 },
 {
  "kind": "split",
  "before": "image",
  "after": "prompt"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "ChatGPT"
   },
   {
    "t": "Gemini"
   },
   {
    "t": "more"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "YouMind", slug: "s2-youmind", scenes }} />;
