import sys, json, re, subprocess

narration, batch_json, slug, out = sys.argv[1:5]
sents = json.load(open(batch_json))[slug]
N = len(sents)

# duration
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
      "-of", "default=nokey=1:noprint_wrappers=1", narration], capture_output=True, text=True).stdout.strip())

# silence intervals
p = subprocess.run(["ffmpeg", "-i", narration, "-af", "silencedetect=noise=-33dB:d=0.25", "-f", "null", "-"],
                   capture_output=True, text=True)
log = p.stderr
starts = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", log)]
ends = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", log)]
# pair them
pairs = []
ei = 0
for s in starts:
    e = next((x for x in ends if x > s), None)
    if e is None:
        e = dur
    pairs.append((s, e, e - s))
pairs = [p for p in pairs if p[0] > 0.05 and p[1] < dur - 0.05]  # ignore leading + trailing silence
# pick N-1 longest gaps as sentence boundaries
pairs.sort(key=lambda z: -z[2])
bounds = sorted(pairs[:N - 1], key=lambda z: z[0])
# build windows: speech = [prev_gap_end, next_gap_start]
wins = []
prev_end = 0.0
for (s, e, d) in bounds:
    wins.append((prev_end, s))
    prev_end = e
wins.append((prev_end, dur))

if len(wins) != N:
    print(f"WARN: got {len(wins)} windows for {N} sentences", file=sys.stderr)

data = [[sents[i], round(wins[i][0], 3), round(wins[i][1], 3)] for i in range(min(N, len(wins)))]
json.dump(data, open(out, "w"), indent=1)
for row in data:
    print(f"  {row[1]:6.2f}-{row[2]:6.2f}  {row[0][:50]}")
print(f"SAVED {out} ({len(data)} sentences)")
