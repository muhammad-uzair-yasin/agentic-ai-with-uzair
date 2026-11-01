import React from "react";
// audio token: projects/s2-stitch/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "APP DESIGN"
 },
 {
  "kind": "name",
  "name": "Stitch",
  "sub": "Google Labs",
  "sub2": "free"
 },
 {
  "kind": "chat",
  "user": "A fitness tracking app",
  "ai": "Here are 4 screens: home, workout, stats, profile."
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Figma"
   },
   {
    "t": "HTML/CSS"
   },
   {
    "t": "Tailwind"
   }
  ]
 },
 {
  "kind": "big",
  "word": "FREE",
  "sub": "hundreds of designs/month"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "App ideas"
   },
   {
    "t": "Student projects"
   },
   {
    "t": "Mockups"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Stitch", slug: "s2-stitch", scenes }} />;
