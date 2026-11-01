import React from "react";
// audio token: projects/s2-framer/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "AI WEBSITE"
 },
 {
  "kind": "name",
  "name": "Framer",
  "sub": "AI site builder",
  "sub2": "free to publish"
 },
 {
  "kind": "chat",
  "user": "A portfolio for a photographer",
  "ai": "Your site is ready: hero, gallery, contact."
 },
 {
  "kind": "window",
  "title": "yourname.framer.website",
  "rows": 3
 },
 {
  "kind": "bullets",
  "items": [
   "Free publish",
   "Framer subdomain + badge"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Portfolio"
   },
   {
    "t": "Landing page"
   },
   {
    "t": "Side project"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Framer", slug: "s2-framer", scenes }} />;
