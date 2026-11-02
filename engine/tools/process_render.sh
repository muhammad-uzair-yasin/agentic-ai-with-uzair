#!/usr/bin/env bash
# process_render.sh <batch.json>  — for each dir key: wait for narration, build sents+words, render mp4
set -uo pipefail
REPO=/home/carlow/Documents/agentic-ai-with-uzair
SCR=/tmp/claude-1000/-home-carlow-Documents-agentic-ai-with-uzair/79ceae97-295c-4e8e-9821-3eaa29fbf68e/scratchpad
BATCH="$1"
export REMOTION_CHROME=/usr/bin/google-chrome
cd "$REPO"
DIRS=$(python3 -c "import json,sys;print(' '.join(json.load(open('$BATCH')).keys()))")
for dir in $DIRS; do
  ep="episodes/$dir"
  for i in $(seq 1 160); do [ -f "$ep/narration.mp3" ] && break; sleep 15; done
  [ -f "$ep/narration.mp3" ] || { echo "SKIP $dir (no narration)"; continue; }
  echo "=== $dir ==="
  python3 "$SCR/build_sents.py" "$ep/narration.mp3" "$BATCH" "$dir" "$ep/sents.json" || { echo "sents FAIL $dir"; continue; }
  python3 engine/gen_words.py "$ep/sents.json" "$ep/narration.mp3" "$ep/words.ts" --tail 55 >/dev/null || { echo "words FAIL $dir"; continue; }
  bash engine/render.sh "$ep" >/dev/null 2>&1 && echo "RENDERED $dir" || echo "RENDER FAIL $dir"
  cp "$ep/render_sheet.jpg" "$ep/contact_sheet.jpg" 2>/dev/null
  rm -f "$ep"/still_*.png "$ep"/_raw.wav
done
echo "RENDER BATCH COMPLETE: $BATCH"
