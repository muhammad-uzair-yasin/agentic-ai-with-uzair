import sys, json, time, os, subprocess, torch, torchaudio as ta
from chatterbox.tts import ChatterboxTTS

batch_json = sys.argv[1]
ref = sys.argv[2]
epdir = sys.argv[3]  # repo episodes dir

torch.set_num_threads(8)
data = json.load(open(batch_json))
t0 = time.time()
print("loading model...", flush=True)
model = ChatterboxTTS.from_pretrained(device="cpu")
sr = model.sr
gap = torch.zeros(1, int(sr * 0.38))
print(f"model loaded in {time.time()-t0:.0f}s", flush=True)

for slug, sents in data.items():
    out_mp3 = os.path.join(epdir, slug, "narration.mp3")
    if os.path.exists(out_mp3):
        print(f"skip {slug} (exists)", flush=True); continue
    ts = time.time()
    segs = []
    for s in sents:
        wav = model.generate(s, audio_prompt_path=ref, exaggeration=0.5, cfg_weight=0.5)
        segs.append(wav); segs.append(gap)
    full = torch.cat(segs, dim=1)
    wavp = os.path.join(epdir, slug, "_raw.wav")
    ta.save(wavp, full, sr)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", wavp, "-af",
                    "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "44100", "-b:a", "192k", out_mp3], check=True)
    os.remove(wavp)
    dur = full.shape[1] / sr
    print(f"DONE {slug}  {time.time()-ts:.0f}s  dur {dur:.1f}s", flush=True)

print(f"ALL DONE  total {time.time()-t0:.0f}s", flush=True)
