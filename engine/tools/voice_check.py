"""Transcribe each narration with faster-whisper and compare to the script (per sentence window).
Flags missing/garbled speech. Usage: voice_check.py batch.json [dir ...]"""
import json, sys, os, re, difflib
from faster_whisper import WhisperModel
REPO = "/home/carlow/Documents/agentic-ai-with-uzair"
batch = json.load(open(sys.argv[1]))
only = set(sys.argv[2:])
model = WhisperModel("small.en", device="cpu", compute_type="int8")
norm = lambda s: re.sub(r"[^a-z0-9 ]", "", s.lower().replace("-", " "))
out = {}
for d, sents in batch.items():
    if only and d not in only: continue
    nar = os.path.join(REPO, "episodes", d, "narration.mp3")
    if not os.path.exists(nar): continue
    segs, _ = model.transcribe(nar, beam_size=1, word_timestamps=False, vad_filter=False)
    heard = norm(" ".join(s.text for s in segs))
    want = norm(" ".join(sents))
    ratio = difflib.SequenceMatcher(None, heard.split(), want.split()).ratio()
    last_ok = norm(sents[-1])[:20] in heard  # CTA present
    words_h, words_w = len(heard.split()), len(want.split())
    ok = ratio >= 0.85 and last_ok and words_h <= words_w * 1.15
    out[d] = dict(ok=ok, ratio=round(ratio, 3), heard_words=words_h, script_words=words_w, cta=last_ok)
    print(f"{'OK ' if ok else 'BAD'} {d:<40} sim={ratio:.2f} words {words_h}/{words_w} cta={last_ok}")
prev = {}
p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "voice_check.json")
if os.path.exists(p): prev = json.load(open(p))
prev.update(out); json.dump(prev, open(p, "w"), indent=1)
