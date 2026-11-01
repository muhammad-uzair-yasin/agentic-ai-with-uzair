import React from "react";
import { Composition, registerRoot } from "remotion";
import { Film } from "./Film";
import { TOTAL } from "./words";
export const RemotionRoot: React.FC = () => (
  <Composition id="s2-perplexity" component={Film} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
);
registerRoot(RemotionRoot);
