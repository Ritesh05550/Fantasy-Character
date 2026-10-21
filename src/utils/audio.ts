// Web Audio API synthesized sound effects for character generation
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playRollSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Low parchment thump / drum tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(140, now);
    osc1.frequency.exponentialRampToValueAtTime(45, now + 0.18);
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.22);

    // Shimmering mystical bell chime (two harmonious pitches)
    const pitches = [587.33, 880, 1174.66]; // D5, A5, D6
    pitches.forEach((freq, idx) => {
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      const delay = idx * 0.04;
      chime.type = 'triangle';
      chime.frequency.setValueAtTime(freq, now + delay);
      chimeGain.gain.setValueAtTime(0.08, now + delay);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.45);
      chime.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chime.start(now + delay);
      chime.stop(now + delay + 0.45);
    });
  } catch {
    // Ignore audio errors gracefully
  }
}

export function playClickSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Ignore
  }
}
