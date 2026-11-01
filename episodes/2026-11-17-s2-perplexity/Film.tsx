import React from "react";
// audio token: projects/s2-perplexity/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "AI SEARCH"
 },
 {
  "kind": "name",
  "name": "Perplexity",
  "sub": "answers + sources",
  "sub2": "free"
 },
 {
  "kind": "chat",
  "user": "Best laptop for students under $800?",
  "ai": "Here are 3 picks, with sources [1][2][3]."
 },
 {
  "kind": "bullets",
  "items": [
   "Every source linked",
   "Check it yourself"
  ]
 },
 {
  "kind": "big",
  "word": "FREE",
  "sub": "unlimited quick searches"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Research"
   },
   {
    "t": "Homework"
   },
   {
    "t": "Fact-checking"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Perplexity", slug: "s2-perplexity", scenes }} />;
