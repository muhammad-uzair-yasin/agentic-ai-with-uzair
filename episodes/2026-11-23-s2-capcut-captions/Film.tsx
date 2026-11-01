import React from "react";
// audio token: projects/s2-capcut/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "AUTO CAPTIONS"
 },
 {
  "kind": "name",
  "name": "CapCut",
  "sub": "auto captions",
  "sub2": "free"
 },
 {
  "kind": "timeline",
  "label": "auto captions synced"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Styles"
   },
   {
    "t": "Colors"
   },
   {
    "t": "Animations"
   }
  ]
 },
 {
  "kind": "bullets",
  "items": [
   "Free plan",
   "Limits on long videos"
  ]
 },
 {
  "kind": "big",
  "word": "WATCH TIME",
  "sub": "captions keep people watching"
 },
 {
  "kind": "comment"
 },
 {
  "kind": "cta",
  "nolink": true
 }
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "CapCut", slug: "s2-capcut", scenes }} />;
