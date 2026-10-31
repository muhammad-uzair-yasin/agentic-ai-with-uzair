# AGENTS.md — handoff manual (Agentic Ai with Uzair)

You are continuing the production of **Agentic Ai with Uzair** (@agenticaiwithuzair, channel_id `UCqmcLDjI298RwYjOjb17d8w`).
Read this file, then `docs/rules.md`, then `docs/content-plan.md`. Everything you need is in this repo.

## The job
**Daily AI tools** — one useful, new or free AI tool (or trending open-source repo) per day: what it does, a demo, what's free, who it's for.
One video per day. End line of every video: *"Subscribe for a new AI tool every day."*

## Who does what
- **Uzair (owner):** approves, records the narration in his ElevenLabs cloned voice from your script, uploads finished MP4s to Postsiva when asked (the agent workspace can't reach the upload server), gives direction.
- **You (agent):** research + verify facts, write scripts, build the film in code, QA, publish via Postsiva MCP, keep this repo up to date.

## Current status (update this block after every video)
- One video so far (Oct 30, light re-cut of the agent-safety story).
- Daily tools format defined (docs/content-plan.md); first tool video due Nov 1.

## Next actions
1. Each morning, pick the day's tool from the Daily AI News Digest (sections 2, 3, 4, 7) or trending GitHub; verify pricing/limits on the official page.
2. Write the ~1 min script (hook = the tool's superpower), send to Uzair to record.
3. Build a bright product-demo world with cursor/typing/UI from the element library; post to this channel; cross-post.

## Definition of done for a video
1. Script follows docs/rules.md (hook = topic, verified facts, CTA last) and Uzair recorded it.
2. Film built with the engine: word-highlight captions, lip-sync, both hands, motion on every shot, cover frame.
3. QA stills checked; final MP4 sent to Uzair; approved.
4. Published (YouTube first, then cross-posts if requested) with description per docs/posting.md.
5. **Committed + pushed**: `episodes/<date>-<slug>/` (script.md, sents.json, words.ts, Film.tsx, entry.tsx, narration.mp3, BRIEF.md with link + sources, contact_sheet.jpg) + `docs/publish-log.md` + the status block above.

## Don'ts
- Don't change the channel's purpose or the rules without Uzair.
- Don't commit rendered MP4s (they live on YouTube) or any API keys/tokens.
- Don't invent facts, prices or links — verify or cut.
