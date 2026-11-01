import React from "react";
// audio token: projects/s2-fathom/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "AI NOTES"
 },
 {
  "kind": "name",
  "name": "Fathom",
  "sub": "AI notetaker",
  "sub2": "free"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Zoom"
   },
   {
    "t": "Google Meet"
   },
   {
    "t": "Teams"
   }
  ]
 },
 {
  "kind": "chat",
  "user": "Summarize today's call",
  "ai": "3 decisions, 4 action items, next call Friday."
 },
 {
  "kind": "big",
  "word": "UNLIMITED",
  "sub": "free recordings"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Students"
   },
   {
    "t": "Freelancers"
   },
   {
    "t": "Remote teams"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Fathom", slug: "s2-fathom", scenes }} />;
