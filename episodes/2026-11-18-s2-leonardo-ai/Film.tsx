import React from "react";
// audio token: projects/s2-leonardo/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "FREE IMAGES"
 },
 {
  "kind": "name",
  "name": "Leonardo AI",
  "sub": "AI images",
  "sub2": "free daily tokens"
 },
 {
  "kind": "image",
  "prompt": "a samurai cat, cinematic",
  "tiles": [
   "#2b3a67",
   "#f2a65a",
   "#8e7dbe",
   "#3fa7d6"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Cinematic"
   },
   {
    "t": "Anime"
   },
   {
    "t": "3D"
   }
  ]
 },
 {
  "kind": "big",
  "word": "150/DAY",
  "sub": "free tokens"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Art"
   },
   {
    "t": "Social posts"
   },
   {
    "t": "Concepts"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Leonardo AI", slug: "s2-leonardo", scenes }} />;
