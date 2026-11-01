import React from "react";
// audio token: projects/gpt4all/narration.wav
import { ToolFilm, Scene } from "./dailytool";

const scenes: Scene[] = [
  { kind: "cover", word: "PRIVATE AI" },
  { kind: "name", name: "GPT4All", sub: "by Nomic", sub2: "free · open source" },
  { kind: "bullets", items: ["Runs on CPU", "No GPU needed"] },
  { kind: "tags", items: [{ t: "no internet" }, { t: "no data sharing" }] },
  { kind: "bullets", items: ["Chat with your docs", "Fully offline"] },
  { kind: "tags", items: [{ t: "Windows" }, { t: "Mac" }, { t: "Linux" }] },
  { kind: "cta" },
];

export const Film: React.FC = () => <ToolFilm cfg={{ tag: "GPT4All", slug: "gpt4all", scenes }} />;
