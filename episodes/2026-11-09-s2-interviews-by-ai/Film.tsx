import React from "react";
// audio token: projects/s2-interviews/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "MOCK INTERVIEW"
 },
 {
  "kind": "name",
  "name": "Interviews by AI",
  "sub": "AI interviewer",
  "sub2": "free to try"
 },
 {
  "kind": "chat",
  "user": "Job: Marketing Manager",
  "ai": "Q1: Tell me about a campaign you led."
 },
 {
  "kind": "steps",
  "items": [
   "Answer out loud",
   "Get scored feedback",
   "Improve"
  ]
 },
 {
  "kind": "bullets",
  "items": [
   "Free: 3 questions/month",
   "Pro: $9/month"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Job seekers"
   },
   {
    "t": "Students"
   },
   {
    "t": "Career switch"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Interviews by AI", slug: "s2-interviews", scenes }} />;
