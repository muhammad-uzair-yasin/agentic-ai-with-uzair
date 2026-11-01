import React from "react";
// audio token: projects/s2-notebooklm/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "PDF → PODCAST"
 },
 {
  "kind": "name",
  "name": "NotebookLM",
  "sub": "by Google",
  "sub2": "free"
 },
 {
  "kind": "waveform",
  "label": "AI podcast from your PDF"
 },
 {
  "kind": "chat",
  "user": "What is chapter 3 about?",
  "ai": "It explains supply and demand [source 2]."
 },
 {
  "kind": "bullets",
  "items": [
   "3 audio overviews/day",
   "50 sources per notebook"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Students"
   },
   {
    "t": "Revision"
   },
   {
    "t": "Commute"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "NotebookLM", slug: "s2-notebooklm", scenes }} />;
