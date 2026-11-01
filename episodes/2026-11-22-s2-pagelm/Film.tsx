import React from "react";
// audio token: projects/s2-pagelm/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "STUDY AI"
 },
 {
  "kind": "name",
  "name": "PageLM",
  "sub": "open source",
  "sub2": "free"
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Notes"
   },
   {
    "t": "Flashcards"
   },
   {
    "t": "Quizzes"
   },
   {
    "t": "Podcasts"
   }
  ]
 },
 {
  "kind": "bullets",
  "items": [
   "ExamLab mock exams",
   "Feedback on answers"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Gemini"
   },
   {
    "t": "ChatGPT"
   },
   {
    "t": "Claude"
   },
   {
    "t": "Local"
   }
  ]
 },
 {
  "kind": "big",
  "word": "FREE",
  "sub": "study partner"
 },
 {
  "kind": "comment"
 },
 {
  "kind": "cta",
  "nolink": true
 }
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "PageLM", slug: "s2-pagelm", scenes }} />;
