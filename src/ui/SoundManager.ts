export class SoundManager {
  private ctx: AudioContext | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  
  constructor() {
    // Audio Context is initialized lazily upon first interaction (browser restriction)
  }

  private initContext() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.startAmbientDrone();
  }

  // Creepy background ambient drone (low frequency hum)
  private startAmbientDrone() {
    if (!this.ctx) return;
    
    this.droneOsc = this.ctx.createOscillator();
    this.droneGain = this.ctx.createGain();
    
    // Low frequency drone
    this.droneOsc.type = 'sawtooth';
    this.droneOsc.frequency.value = 45; // very low hum
    
    // Low pass filter to make it rumble
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 120;
    filter.Q.value = 3.0;

    // LFO to modulate volume (creeping wobble)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.2; // slow wobble
    lfoGain.gain.value = 0.08;

    lfo.connect(lfoGain);
    lfoGain.connect(this.droneGain.gain);
    
    this.droneOsc.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);
    
    this.droneGain.gain.value = 0.15;
    
    this.droneOsc.start(0);
    lfo.start(0);
  }

  // Card slide/swoosh sound (filtered noise)
  playCardSwoosh() {
    this.initContext();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.35; // 0.35 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, this.ctx.currentTime);
    // sweep filter frequency up then down
    filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.3);
    filter.Q.value = 2.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noiseNode.start();
  }

  // Tactile Roulette click (metallic tap)
  playRouletteClick(pitchMultiplier = 1.0) {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // metallic click: short square/triangle
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 * pitchMultiplier, this.ctx.currentTime);
    // rapidly drop frequency
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  // Card Draw click
  playDraw() {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // Damage deal sound (heavy rumble)
  playDamageDealt() {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(40, this.ctx.currentTime + 0.4);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 150;

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  // Synthesize a creepy, resonant bell chime
  playBell() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Bell harmonic frequencies (C5, G5, C6, E6)
    const frequencies = [523.25, 783.99, 1046.50, 1318.51];
    const gains = [0.12, 0.08, 0.06, 0.04];
    const decay = 2.0;

    frequencies.forEach((freq, index) => {
      const osc = this.ctx!.createOscillator();
      const gainNode = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(gains[index], now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      // Add a slight frequency decay/wobble for retro realism
      osc.frequency.linearRampToValueAtTime(freq - 2.0, now + decay);

      osc.connect(gainNode);
      gainNode.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  }
}
