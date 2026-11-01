import React from "react";
// audio token: projects/s2-emergent/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "BUILD AN APP"
 },
 {
  "kind": "name",
  "name": "Emergent",
  "sub": "AI app builder",
  "sub2": "free credits"
 },
 {
  "kind": "chat",
  "user": "A booking app for my salon",
  "ai": "Building frontend, backend and database..."
 },
 {
  "kind": "steps",
  "items": [
   "Add features",
   "Fix bugs",
   "Deploy"
  ]
 },
 {
  "kind": "big",
  "word": "10/MO",
  "sub": "free credits"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Founders"
   },
   {
    "t": "Small business"
   },
   {
    "t": "App ideas"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Emergent", slug: "s2-emergent", scenes }} />;
