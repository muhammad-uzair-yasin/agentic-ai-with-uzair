import React from "react";
// audio token: projects/s2-pandrator/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "AUDIOBOOK"
 },
 {
  "kind": "name",
  "name": "Pandrator",
  "sub": "open source",
  "sub2": "free"
 },
 {
  "kind": "waveform",
  "label": "chapter 1 narration"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Transcribe"
   },
   {
    "t": "Translate subs"
   },
   {
    "t": "Voiceovers"
   }
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Windows"
   },
   {
    "t": "Linux"
   }
  ]
 },
 {
  "kind": "big",
  "word": "$0",
  "sub": "books → audio"
 },
 {
  "kind": "comment"
 },
 {
  "kind": "cta",
  "nolink": true
 }
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Pandrator", slug: "s2-pandrator", scenes }} />;
