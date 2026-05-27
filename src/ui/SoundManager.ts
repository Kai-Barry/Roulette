export class SoundManager {
  private ctx: AudioContext | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  
  constructor() {
    // Audio Context is initialized lazily upon first interaction (browser restriction)
  }

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.startAmbientDrone();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(err => console.warn('Failed to resume AudioContext:', err));
    }
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

  // Creepy retro synth click modulated for special physics modifiers
  playSpecialPhysicsClick(type: string, pitchMultiplier = 1.0) {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === 'magnetic') {
      // Sci-fi high-pitched FM ring modulation chime sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400 * pitchMultiplier, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(180 * pitchMultiplier, this.ctx.currentTime);
      osc2.connect(gain2);
      gain2.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc2.connect(this.ctx.destination);
      osc2.start();
      osc2.stop(this.ctx.currentTime + 0.06);
    } else if (type === 'nudge') {
      // Glitchy high-speed double tap chirp
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900 * pitchMultiplier, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1200 * pitchMultiplier, this.ctx.currentTime + 0.015);
      
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
    } else if (type === 'friction') {
      // Damped scratching wood/canvas pop noise
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350 * pitchMultiplier, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);
    } else if (type === 'tilt') {
      // Spooky springy wobble pitch slide
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 * pitchMultiplier, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.065);
    } else if (type === 'mass') {
      // Heavy deep wooden thud
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 * pitchMultiplier, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(15, this.ctx.currentTime + 0.09);
      
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    } else {
      // Standard click fallback
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800 * pitchMultiplier, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.025);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.11);
  }

  // Synthesize a high-pitched metallic ping for deflector peg bounces
  playPegBounce(pitchMultiplier = 1.0) {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400 * pitchMultiplier, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700 * pitchMultiplier, this.ctx.currentTime + 0.035);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playHammerStrike() {
    this.initContext();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    
    // 1. High metallic ring (bell of the anvil)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1200, now);
    osc1.frequency.exponentialRampToValueAtTime(800, now + 0.3);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'highpass';
    filter1.frequency.value = 600;
    
    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // 2. Heavy thud (hammer strike body)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(150, now);
    osc2.frequency.exponentialRampToValueAtTime(40, now + 0.15);
    gain2.gain.setValueAtTime(0.3, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.2);
  }

  private musicInterval: any = null;
  private currentMusicType: 'combat' | 'elite' | 'boss' | 'ambient' | null = null;
  private currentStep = 0;

  private playSynthNote(pitch: number, duration: number, type: 'sine' | 'triangle' | 'square' | 'sawtooth', volume: number, slideToPitch?: number) {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(pitch, now);
    if (slideToPitch) {
      osc.frequency.exponentialRampToValueAtTime(slideToPitch, now + duration);
    }
    
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  playEncounterMusic(type: 'combat' | 'elite' | 'boss' | 'ambient') {
    this.initContext();
    if (!this.ctx) return;

    if (this.currentMusicType === type) return;
    this.stopMusic();

    this.currentMusicType = type;
    this.currentStep = 0;

    let stepDurationMs = 280;
    if (type === 'combat') stepDurationMs = 280;
    else if (type === 'elite') stepDurationMs = 220;
    else if (type === 'boss') stepDurationMs = 180;
    else stepDurationMs = 1200; // ambient

    const midiToFreq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

    this.musicInterval = setInterval(() => {
      if (!this.ctx) return;
      
      const step = this.currentStep;
      
      if (type === 'ambient') {
        // Eerie ambient chimes
        if (Math.random() < 0.4) {
          const notes = [57, 60, 62, 64, 67, 69, 72]; // Am / Dorian pentatonic
          const note = notes[Math.floor(Math.random() * notes.length)];
          this.playSynthNote(midiToFreq(note + 12), 2.5, 'sine', 0.04);
        }
      } else if (type === 'combat') {
        // Tense minor arpeggio
        // Bassline on beat
        if (step % 2 === 0) {
          const bassNotes = [45, 45, 48, 50, 45, 45, 52, 48]; // A2, C3, D3, E3...
          const bass = bassNotes[(step / 2) % bassNotes.length];
          this.playSynthNote(midiToFreq(bass), 0.35, 'triangle', 0.08);
        }
        // Lead arpeggio
        const leadPattern = [57, 64, 60, 69, 62, 69, 65, 67]; // A3, E4, C4, A4...
        const note = leadPattern[step % leadPattern.length];
        this.playSynthNote(midiToFreq(note), 0.2, 'sine', 0.03);
      } else if (type === 'elite') {
        // Diminished tension arpeggio
        if (step % 2 === 0) {
          const bassNotes = [39, 42, 45, 48]; // D#2, F#2, A2, C3
          const bass = bassNotes[(step / 2) % bassNotes.length];
          this.playSynthNote(midiToFreq(bass), 0.28, 'triangle', 0.1);
        }
        const leadPattern = [51, 57, 54, 60, 57, 63, 60, 66]; // D#3, A3, F#3, C4...
        const note = leadPattern[step % leadPattern.length];
        this.playSynthNote(midiToFreq(note), 0.18, 'triangle', 0.04);
      } else if (type === 'boss') {
        // Chromatic industrial
        if (step % 4 === 0) {
          const bassNotes = [40, 41, 40, 39]; // E2, F2, E2, D#2
          const bass = bassNotes[(step / 4) % bassNotes.length];
          this.playSynthNote(midiToFreq(bass), 0.35, 'sawtooth', 0.06);
        }
        // Industrial pulse lead
        const leadPattern = [64, 65, 64, 63, 67, 66, 65, 64, 60, 61, 60, 59, 64, 63, 62, 60];
        const note = leadPattern[step % leadPattern.length];
        if (step % 2 === 0) {
          this.playSynthNote(midiToFreq(note), 0.14, 'square', 0.02);
        } else if (step % 7 === 0) {
          // Creepy pitch slider
          this.playSynthNote(midiToFreq(note + 12), 0.32, 'sawtooth', 0.02, midiToFreq(note));
        }
      }

      this.currentStep = (this.currentStep + 1) % 16;
    }, stepDurationMs);
  }

  stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.currentMusicType = null;
  }
}
