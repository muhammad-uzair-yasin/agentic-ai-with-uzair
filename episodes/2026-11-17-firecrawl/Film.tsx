import React from "react";
// audio token: projects/firecrawl/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "WEB → AI" },
  { kind: "name", name: "Firecrawl", sub: "open source", sub2: "web → markdown" },
  { kind: "terminal", title: "one API call", cmd: "firecrawl.scrape('site.com')", out: ["# Clean markdown ready"] },
  { kind: "bullets", items: ["Handles JavaScript", "Beats bot blocks"] },
  { kind: "tags", items: [{ t: "Chatbots" }, { t: "RAG" }, { t: "AI apps" }] },
  { kind: "big", word: "FREE", sub: "1,000 pages/mo · self-host" },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "Firecrawl", slug: "firecrawl", scenes }} />;
