import React from "react";
// audio token: projects/s2-flow/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "FREE VIDEO"
 },
 {
  "kind": "name",
  "name": "Google Flow",
  "sub": "by Google",
  "sub2": "free daily credits"
 },
 {
  "kind": "image",
  "prompt": "a car racing through a neon city",
  "tiles": [
   "#1b2a4a",
   "#3a1f5c",
   "#123b4a",
   "#4a1b3a"
  ]
 },
 {
  "kind": "steps",
  "items": [
   "Photo → moving shot",
   "Stitch clips into a story"
  ]
 },
 {
  "kind": "big",
  "word": "50/DAY",
  "sub": "free credits"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Reels"
   },
   {
    "t": "Intros"
   },
   {
    "t": "B-roll"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Google Flow", slug: "s2-flow", scenes }} />;
