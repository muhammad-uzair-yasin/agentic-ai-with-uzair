"""QA + voice-sync check for rendered episodes listed in a meta json.
Checks: render exists, video+audio streams, mp4 duration == TOTAL/30, 8 sentence windows in order,
narration fits the word timeline, audio actually audible, and voice onset lands at the 0.5 s lead-in."""
import json, re, subprocess, sys, os

REPO = "/home/carlow/Documents/agentic-ai-with-uzair"
meta = json.load(open(sys.argv[1]))
want_sents = int(sys.argv[2]) if len(sys.argv) > 2 else 8

def run(a):
    return subprocess.run(a, capture_output=True, text=True)

def probe(path, entries):
    return run(["ffprobe", "-v", "error", "-show_entries", entries, "-of", "json", path]).stdout

results = {}
for m in meta:
    ep = os.path.join(REPO, "episodes", m["dir"]); mp4 = os.path.join(ep, "render.mp4")
    errs = []
    if not os.path.exists(mp4):
        results[m["dir"]] = "PENDING"; continue
    js = json.loads(probe(mp4, "format=duration:stream=codec_type"))
    kinds = [s["codec_type"] for s in js.get("streams", [])]
    dur = float(js["format"]["duration"])
    if "video" not in kinds or "audio" not in kinds: errs.append(f"streams={kinds}")
    w = open(os.path.join(ep, "words.ts")).read()
    total = int(re.search(r"TOTAL = (\d+)", w).group(1)); vend = int(re.search(r"VOICE_END = (\d+)", w).group(1))
    sents = json.loads(re.search(r"SENTS: \[number, number\]\[\] = (\[.*?\]);", w).group(1))
    if len(sents) != want_sents: errs.append(f"sents={len(sents)}")
    for i, (a, b) in enumerate(sents):
        if b - a < 12: errs.append(f"short sentence {i}")
        if i and a < sents[i - 1][1]: errs.append(f"overlap {i}")
    if abs(dur - total / 30) > 0.25: errs.append(f"dur {dur:.2f} vs {total/30:.2f}")
    nd = float(json.loads(probe(os.path.join(ep, "narration.mp3"), "format=duration"))["format"]["duration"])
    if abs((vend - 15) / 30 - nd) > 1.5: errs.append(f"voice_end {(vend-15)/30:.1f}s vs narration {nd:.1f}s")
    # loudness + onset of the voice inside the final mp4
    vol = run(["ffmpeg", "-i", mp4, "-af", "volumedetect", "-f", "null", "-"]).stderr
    mv = re.search(r"mean_volume: (-?[\d.]+) dB", vol)
    if not mv or float(mv.group(1)) < -35: errs.append(f"quiet audio {mv.group(1) if mv else '?'}")
    sil = run(["ffmpeg", "-i", mp4, "-af", "silencedetect=noise=-35dB:d=0.2", "-f", "null", "-"]).stderr
    first_end = re.search(r"silence_end: ([\d.]+)", sil)
    onset = float(first_end.group(1)) if first_end and re.search(r"silence_start: 0(\.0+)?\b", sil) else 0.0
    if not (0.35 <= onset <= 1.2): errs.append(f"voice onset {onset:.2f}s (expected ~0.5s)")
    results[m["dir"]] = "PASS" if not errs else "FAIL: " + "; ".join(errs)
    print(f"{m['dir']:<40} {dur:5.1f}s  {results[m['dir']]}")
json.dump(results, open(sys.argv[1].replace(".json", "_qa.json"), "w"), indent=1)
print("PASS", sum(v == "PASS" for v in results.values()), "| FAIL", sum(v.startswith("FAIL") for v in results.values()),
      "| PENDING", sum(v == "PENDING" for v in results.values()))
