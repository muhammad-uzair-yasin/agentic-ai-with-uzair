# BRIEF — unslop (daily AI tool, 2026-11-01)

**Title (= hook):** This Free Tool Makes Your AI App Stop Looking "AI-Made"
**Published:** (pending)

## The tool (verified facts)
- **Name:** unslop — a free **skill for Claude Code** (also works in Codex/`.agents/skills/`).
- **Creator:** Damir Sokolovsky (@heydamir).
- **What it does:** turns "vibecoded," AI-looking UI into a properly designed interface with its own character.
- **The "AI slop" it fixes:** purple gradients, glowing buttons, emoji labels, shouty copy, uneven spacing.
- **How it works:** audits the screen → lists every sign of slop and where it lives → proposes a direction from your product → fixes it pass by pass (spacing, color, copy, layout, motion), like a designer doing a redline review.
- **Works with:** React, Vue, Svelte, Tailwind, or plain HTML/CSS — dashboards, apps, landing pages, and even a **live site from just a URL**.
- **Price:** FREE, open-source. License **CC BY 4.0** (commercial use OK with attribution + repo link).
- **Install/use:** drop into `.claude/skills/`, invoke with `/unslop` (or `$unslop`) + your request.
- **Traction:** ~4,000 GitHub stars, +~2,000 in a day (trending Oct 31–Nov 1, 2026).

## Sources
- GitHub repo: https://github.com/heydamir/unslop

## Script (as written — see script.md)
Hook states the topic; `...` pauses; CTA last. ~135 words, ~46s narration.

## Voice (2026-11-01 change)
- Uzair's ElevenLabs credits ran out, and the rule is ElevenLabs-only-for-voice — so for this episode the narration was generated **locally and free with Chatterbox TTS (Resemble AI, MIT)**, zero-shot **cloning Uzair's voice** from the Oct 30 `voice.mp3` reference (16s clean segment).
- Runs on CPU in `~/.../scratchpad/cb-venv` (Python 3.11, torch). ~13 min one-time model load + ~90s/sentence. Reproducible going forward.
- Pending Uzair's sign-off on using this as the standing free voice path (do not change docs/rules.md without him).

## Scene plan (to build after narration timings)
- **Cover frame:** big yellow-outline keyword `SLOP`.
- **Host:** #6 Hacker (cast) — energetic, both hands, lip-sync to narration.
- **Core demo beat:** a mock app FULL of slop (purple gradient, glowing buttons, 🚀 emoji labels, SHOUTY copy) that a `/unslop` cursor runs over → morphs (not fades) into a clean, designed UI. Use WEB UI / cursor / code elements from the 204-element library.
- Title visible the whole video (top-left/right). Word-by-word pill captions. Motion every shot. No/minimal SFX.

## TODO
- [ ] Final narration.mp3 (Chatterbox, Uzair clone)
- [ ] sents.json (silencedetect) + words.ts (gen_words.py)
- [ ] Film.tsx + entry.tsx (Remotion), QA stills, render, contact_sheet.jpg
- [ ] Send MP4 to Uzair → approve → publish (YouTube first) → cross-post
- [ ] Update publish-log.md + AGENTS.md status; commit + push
