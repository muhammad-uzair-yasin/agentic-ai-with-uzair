import React from "react";
// audio token: projects/s2-comictranslate/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "MANGA TRANSLATE"
 },
 {
  "kind": "name",
  "name": "Comic Translate",
  "sub": "open source",
  "sub2": "free"
 },
 {
  "kind": "steps",
  "items": [
   "Detect text",
   "Erase & translate",
   "Re-letter bubbles"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Manga"
   },
   {
    "t": "Manhwa"
   },
   {
    "t": "Comics"
   },
   {
    "t": "PDF/EPUB"
   }
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Japanese"
   },
   {
    "t": "Korean"
   },
   {
    "t": "Chinese"
   },
   {
    "t": "French"
   }
  ]
 },
 {
  "kind": "bullets",
  "items": [
   "Desktop app",
   "Browser extension"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Comic Translate", slug: "s2-comictranslate", scenes }} />;
