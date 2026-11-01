import React from "react";
// audio token: projects/s2-edits/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "FREE EDITOR"
 },
 {
  "kind": "name",
  "name": "Edits",
  "sub": "by Instagram",
  "sub2": "free · no watermark"
 },
 {
  "kind": "timeline",
  "label": "auto captions on"
 },
 {
  "kind": "bullets",
  "items": [
   "Teleprompter",
   "Green screen",
   "AI photo animation"
  ]
 },
 {
  "kind": "big",
  "word": "4K",
  "sub": "no watermark"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Reels"
   },
   {
    "t": "Shorts"
   },
   {
    "t": "TikTok"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Edits", slug: "s2-edits", scenes }} />;
