import React from "react";
// audio token: projects/s2-ideogram/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "TEXT IN IMAGES"
 },
 {
  "kind": "name",
  "name": "Ideogram",
  "sub": "AI images",
  "sub2": "free plan"
 },
 {
  "kind": "image",
  "prompt": "poster that says GRAND OPENING",
  "tiles": [
   "#ffd27a",
   "#9ad1ff",
   "#ffb3c7",
   "#b8f0c8"
  ]
 },
 {
  "kind": "big",
  "word": "ABC",
  "sub": "spelling that works"
 },
 {
  "kind": "bullets",
  "items": [
   "Free plan",
   "Images public by default"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Posters"
   },
   {
    "t": "Logos"
   },
   {
    "t": "Thumbnails"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Ideogram", slug: "s2-ideogram", scenes }} />;
