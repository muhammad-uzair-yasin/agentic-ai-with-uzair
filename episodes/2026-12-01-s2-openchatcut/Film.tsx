import React from "react";
// audio token: projects/s2-openchatcut/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "CHAT TO EDIT"
 },
 {
  "kind": "name",
  "name": "OpenChatCut",
  "sub": "AI video editor",
  "sub2": "open source"
 },
 {
  "kind": "chat",
  "user": "Cut the pauses and add captions",
  "ai": "Done: 14 cuts, captions added."
 },
 {
  "kind": "timeline",
  "label": "edit by transcript"
 },
 {
  "kind": "bullets",
  "items": [
   "Local-first",
   "Your files stay yours"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "YouTubers"
   },
   {
    "t": "Podcasters"
   },
   {
    "t": "Creators"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "OpenChatCut", slug: "s2-openchatcut", scenes }} />;
