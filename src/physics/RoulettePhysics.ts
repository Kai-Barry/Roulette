import { PhysicsModifiers, BoardModifiers, WheelConfig } from '../core/Types';

export const WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export const RED_NUMBERS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
]);

export function getSlotColor(num: number, wheel?: WheelConfig, boardMods?: BoardModifiers): 'red' | 'black' | 'green' {
  if (boardMods) {
    if (boardMods.convertNumbersToRed && boardMods.convertNumbersToRed.includes(num)) return 'red';
    if (boardMods.convertNumbersToBlack && boardMods.convertNumbersToBlack.includes(num)) return 'black';
    if (boardMods.extraGreenSlots && boardMods.extraGreenSlots > 0 && num === 32) return 'green';
  }
  
  if (wheel && wheel.colors && wheel.colors[num] !== undefined) {
    return wheel.colors[num];
  }

  if (num === 0) return 'green';
  return RED_NUMBERS.has(num) ? 'red' : 'black';
}

const DEFAULT_WHEEL: WheelConfig = {
  id: 'classic',
  name: 'Default',
  description: '',
  numbers: WHEEL_NUMBERS,
  greenNumbers: [0],
  colors: {},
  payoutMultipliers: { red: 2, black: 2, green: 14, number: 36, odd: 2, even: 2 },
  upgrades: []
};

export class RoulettePhysics {
  // Wheel physics state
  wheelAngle = 0;
  wheelOmega = 0;
  
  // Ball physics state
  ballAngle = 0;
  ballOmega = 0;
  ballRadius = 1.0;
  ballHeight = 0.1;
  isSettled = false;
  settledSlotIndex = -1;
  
  // Track parameters
  readonly R_OUTER = 1.0;
  readonly R_INNER = 0.65;
  readonly BALL_DECAY = 0.85; // Natural speed decay of the ball
  readonly WHEEL_DECAY = 0.15; // Natural speed decay of the wheel

  // Current simulation phase
  // 'outer' -> 'dropping' -> 'bouncing' -> 'settled'
  phase: 'outer' | 'dropping' | 'bouncing' | 'settled' = 'outer';
  
  // Modifiers cached for the current spin
  private mods!: PhysicsModifiers;
  private biasTargetAngle = -1; // If biased, target angle in wheel space
  
  // Active wheel configuration
  wheelNumbers: number[] = WHEEL_NUMBERS;
  slotCount = 37;
  greenNumbers: number[] = [0];

  constructor() {
    this.reset(
      DEFAULT_WHEEL,
      {
        spinSpeed: 1,
        ballMass: 1,
        friction: 1,
        bounceRandomness: 0.1,
        wheelTilt: 0,
        targetZoneBias: 0,
      }
    );
  }

  reset(wheel: WheelConfig, mods: PhysicsModifiers, winningTargets?: number[]) {
    this.mods = mods;
    this.wheelNumbers = wheel.numbers;
    this.slotCount = wheel.numbers.length;
    this.greenNumbers = wheel.greenNumbers;
    this.isSettled = false;
    this.settledSlotIndex = -1;
    this.phase = 'outer';
    this.ballRadius = this.R_OUTER;
    this.ballHeight = 0.15;
    
    // Inject wheel and ball in opposite directions
    // Speed scales with mods.spinSpeed
    const baseWheelSpeed = 2.0 + Math.random() * 1.5;
    const baseBallSpeed = -10.0 - Math.random() * 5.0; // Negative means opposite direction

    this.wheelOmega = baseWheelSpeed * mods.spinSpeed;
    this.ballOmega = baseBallSpeed / Math.sqrt(mods.ballMass);
    
    // Randomize initial positions
    this.wheelAngle = Math.random() * Math.PI * 2;
    this.ballAngle = Math.random() * Math.PI * 2;

    // Handle Bias (cheating physics)
    this.biasTargetAngle = -1;
    if (mods.targetZoneBias > 0 && winningTargets && winningTargets.length > 0) {
      // Pick one of the winning targets and find its slot position
      const targetNum = winningTargets[Math.floor(Math.random() * winningTargets.length)];
      const slotIdx = this.wheelNumbers.indexOf(targetNum);
      if (slotIdx >= 0) {
        // Target angle on the wheel: index * (2pi/slotCount)
        this.biasTargetAngle = slotIdx * (Math.PI * 2 / this.slotCount);
      }
    }
  }

  update(dt: number) {
    if (this.isSettled) {
      // 1. Update wheel angle and omega (slows down to a stop eventually)
      this.wheelAngle = (this.wheelAngle + this.wheelOmega * dt) % (Math.PI * 2);
      this.wheelOmega = Math.max(0, this.wheelOmega - this.WHEEL_DECAY * this.mods.friction * dt);

      // 2. Compute ball angle in wheel space
      let ballAngleInWheel = (this.ballAngle - this.wheelAngle);
      // Normalize to [-PI, PI]
      ballAngleInWheel = Math.atan2(Math.sin(ballAngleInWheel), Math.cos(ballAngleInWheel));

      const slotAngleWidth = (Math.PI * 2) / this.slotCount;
      const targetAngleInWheel = this.settledSlotIndex * slotAngleWidth;
      
      // Compute delta to target
      let angleDiff = targetAngleInWheel - ballAngleInWheel;
      // Normalize diff to [-PI, PI] for shortest path
      angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

      // Spring-damper force pulling the ball to the center of the slot
      const k = 180.0; // spring stiffness
      const c = 12.0;  // damping coefficient
      
      // Relative omega
      const ballOmegaInWheel = this.ballOmega - this.wheelOmega;
      const springAcc = k * angleDiff - c * ballOmegaInWheel;
      
      // Update ball angular velocity and angle
      const newBallOmegaInWheel = ballOmegaInWheel + springAcc * dt;
      this.ballOmega = this.wheelOmega + newBallOmegaInWheel;
      
      const newBallAngleInWheel = ballAngleInWheel + newBallOmegaInWheel * dt;
      this.ballAngle = (this.wheelAngle + newBallAngleInWheel);
      if (this.ballAngle < 0) this.ballAngle += Math.PI * 2;
      this.ballAngle = this.ballAngle % (Math.PI * 2);

      this.ballRadius = this.R_INNER;
      
      // Height wiggles slightly if it is still settling
      const settlingIntensity = Math.min(1.0, Math.abs(newBallOmegaInWheel) / 3.0);
      this.ballHeight = 0.02 + settlingIntensity * 0.015 * Math.abs(Math.sin(angleDiff * 10));
      return;
    }

    // 1. Update Wheel
    this.wheelAngle = (this.wheelAngle + this.wheelOmega * dt) % (Math.PI * 2);
    this.wheelOmega = Math.max(0.2, this.wheelOmega - this.WHEEL_DECAY * this.mods.friction * dt);

    // 2. Apply Tilt gravity force to ball
    // If wheel is tilted, gravity pulls the ball towards the "bottom" (e.g. angle PI/2)
    let gravityForce = 0;
    if (this.mods.wheelTilt > 0) {
      const bottomAngle = Math.PI * 0.5;
      const angleDiff = bottomAngle - this.ballAngle;
      // Force accelerates ball towards bottom and slows it when moving away
      gravityForce = Math.sin(angleDiff) * this.mods.wheelTilt * 4.0;
    }

    // 3. Update Ball Omega and position
    // Ball naturally slows down due to friction
    const frictionDecay = this.BALL_DECAY * this.mods.friction;
    
    // Update angular speed
    const prevBallOmega = this.ballOmega;
    this.ballOmega += (gravityForce * dt);
    
    // Apply friction (damping)
    if (this.ballOmega > 0) {
      this.ballOmega = Math.max(0, this.ballOmega - frictionDecay * dt);
    } else {
      this.ballOmega = Math.min(0, this.ballOmega + frictionDecay * dt);
    }

    this.ballAngle = (this.ballAngle + this.ballOmega * dt);
    if (this.ballAngle < 0) this.ballAngle += Math.PI * 2;
    this.ballAngle = this.ballAngle % (Math.PI * 2);

    // 4. State Transitions & Radius logic
    const relSpeed = Math.abs(this.ballOmega - this.wheelOmega);

    if (this.phase === 'outer') {
      // Outer rim phase: Centrifugal force holds it
      // centrifugal acceleration = omega^2 * R
      const centrifugalAcc = (this.ballOmega * this.ballOmega) * this.R_OUTER;
      const gravity = 9.8; // Simple threshold
      
      if (centrifugalAcc < gravity * (1.2 + this.mods.wheelTilt)) {
        this.phase = 'dropping';
      }
    } else if (this.phase === 'dropping') {
      // Ball drops towards R_INNER
      const dropSpeed = 0.5 * (1.0 / this.mods.ballMass);
      this.ballRadius = Math.max(this.R_INNER, this.ballRadius - dropSpeed * dt);
      
      // Interpolate ballHeight down to slot level
      const t = (this.ballRadius - this.R_INNER) / (this.R_OUTER - this.R_INNER);
      this.ballHeight = 0.02 + 0.13 * t;

      if (this.ballRadius <= this.R_INNER) {
        this.phase = 'bouncing';
      }

      // Occasional collision with deflectors
      const pinCount = 8;
      const spacing = (Math.PI * 2) / pinCount;
      const currentPinSector = Math.floor(this.ballAngle / spacing);
      const prevPinSector = Math.floor((this.ballAngle - this.ballOmega * dt) / spacing);
      
      if (currentPinSector !== prevPinSector && Math.random() < 0.7) {
        // Hit deflector!
        this.ballOmega = -this.ballOmega * 0.4 + (Math.random() - 0.5) * this.mods.bounceRandomness * 12;
      }
    } else if (this.phase === 'bouncing') {
      // Ball is bouncing on the slot separators
      this.ballRadius = this.R_INNER;
      this.ballHeight = 0.02 + Math.abs(Math.sin(this.ballAngle * this.slotCount)) * 0.03 * (relSpeed / 5.0);

      // Check divider crossings
      // Convert ball angle to wheel space
      let angleInWheelSpace = (this.ballAngle - this.wheelAngle);
      if (angleInWheelSpace < 0) angleInWheelSpace += Math.PI * 2;
      angleInWheelSpace = angleInWheelSpace % (Math.PI * 2);

      const slotAngleWidth = (Math.PI * 2) / this.slotCount;
      const currentSlotIndex = Math.floor((angleInWheelSpace + slotAngleWidth * 0.5) / slotAngleWidth) % this.slotCount;
      
      const prevAngleInWheel = (((angleInWheelSpace - (this.ballOmega - this.wheelOmega) * dt) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const prevSlotIndex = Math.floor((prevAngleInWheel + slotAngleWidth * 0.5) / slotAngleWidth) % this.slotCount;

      if (currentSlotIndex !== prevSlotIndex) {
        // Ball hit a slot divider!
        if (relSpeed > 0.8) {
          // Bounce off: reverse relative speed partially, add randomness
          const coefRestitution = 0.35 / this.mods.ballMass;
          const relativeSpeedSign = Math.sign(this.ballOmega - this.wheelOmega);
          
          this.ballOmega = this.wheelOmega - relativeSpeedSign * relSpeed * coefRestitution + (Math.random() - 0.5) * this.mods.bounceRandomness * 8;
        } else {
          // Low relative speed: Bias cheat triggers here if active, or it settles normally
          if (this.biasTargetAngle >= 0 && Math.random() < this.mods.targetZoneBias) {
            // Force landing in target slot!
            const targetSlotIdx = Math.round(this.biasTargetAngle / slotAngleWidth) % this.slotCount;
            this.settleInSlot(targetSlotIdx);
          } else {
            // Settle in current slot
            this.settleInSlot(currentSlotIndex);
          }
        }
      }
    }
  }

  private settleInSlot(slotIdx: number) {
    this.settledSlotIndex = (slotIdx + this.slotCount) % this.slotCount;
    this.isSettled = true;
    this.phase = 'settled';
  }

  getWinningNumber(): number {
    if (!this.isSettled) return -1;
    return this.wheelNumbers[this.settledSlotIndex];
  }
}
