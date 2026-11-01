import React from "react";
// audio token: projects/s2-chatpdf/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
 {
  "kind": "cover",
  "word": "CHAT WITH PDF"
 },
 {
  "kind": "name",
  "name": "ChatPDF",
  "sub": "ask your PDF",
  "sub2": "free daily"
 },
 {
  "kind": "chat",
  "user": "What's the deadline in this contract?",
  "ai": "Within 30 days, see section 4 on page 3."
 },
 {
  "kind": "bullets",
  "items": [
   "Answers from the doc",
   "Shows the page"
  ]
 },
 {
  "kind": "bullets",
  "items": [
   "2 PDFs/day",
   "50 questions/day"
  ]
 },
 {
  "kind": "tags",
  "items": [
   {
    "t": "Textbooks"
   },
   {
    "t": "Contracts"
   },
   {
    "t": "Papers"
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

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "ChatPDF", slug: "s2-chatpdf", scenes }} />;
