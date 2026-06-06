import { PhysicsModifiers, BoardModifiers, WheelConfig, SlotColor, BetColor } from '../core/Types';

export const WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export const RED_NUMBERS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
]);

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];

export function getSlotColor(num: number, wheel?: WheelConfig, boardMods?: BoardModifiers): SlotColor {
  if (boardMods) {
    if (boardMods.convertAllToGold) return 'gold';
    if (boardMods.convertAllToPurple) return 'purple';
    if (boardMods.convertAllToCyan) return 'cyan';
    if (boardMods.convertAllToCrimson) return 'crimson';

    if (boardMods.convertNumbersToGold && boardMods.convertNumbersToGold.includes(num)) return 'gold';
    if (boardMods.convertNumbersToPurple && boardMods.convertNumbersToPurple.includes(num)) return 'purple';
    if (boardMods.convertNumbersToCyan && boardMods.convertNumbersToCyan.includes(num)) return 'cyan';
    if (boardMods.convertNumbersToCrimson && boardMods.convertNumbersToCrimson.includes(num)) return 'crimson';
    if (boardMods.convertNumbersToGreen && boardMods.convertNumbersToGreen.includes(num)) return 'green';

    if (boardMods.convertAllToRed) {
      const baseColor = getSlotColor(num, wheel, undefined);
      if (baseColor === 'red' || baseColor === 'black') return 'red';
    }
    if (boardMods.convertAllToBlack) {
      const baseColor = getSlotColor(num, wheel, undefined);
      if (baseColor === 'red' || baseColor === 'black') return 'black';
    }
    if (boardMods.convertAllToGreen) {
      const baseColor = getSlotColor(num, wheel, undefined);
      if (baseColor === 'red' || baseColor === 'black') return 'green';
    }

    if ((boardMods as any).zeroEclipseActive && num === 0) {
      return 'black';
    }
    if ((boardMods as any).emeraldForestActive && PRIMES.includes(num)) {
      return 'green';
    }
    if (boardMods.extraGreenSlots && boardMods.extraGreenSlots > 3 && (num === 5 || num === 17 || num === 29)) {
      return 'green';
    }
    if (boardMods.extraGreenSlots && boardMods.extraGreenSlots > 1 && (num === 11 || num === 22)) {
      return 'green';
    }
    if (boardMods.convertNumbersToRed && boardMods.convertNumbersToRed.includes(num)) {
      const baseColor: SlotColor = 'red';
      return (boardMods as any).monochromeActive ? 'black' : baseColor;
    }
    if (boardMods.convertNumbersToBlack && boardMods.convertNumbersToBlack.includes(num)) {
      const baseColor: SlotColor = 'black';
      return (boardMods as any).monochromeActive ? 'red' : baseColor;
    }
    if (boardMods.extraGreenSlots && boardMods.extraGreenSlots > 0 && num === 32) return 'green';
  }
  
  let baseColor: SlotColor = 'green';
  if (wheel && wheel.colors && wheel.colors[num] !== undefined) {
    baseColor = wheel.colors[num];
  } else if (num === 0) {
    baseColor = 'green';
  } else {
    baseColor = RED_NUMBERS.has(num) ? 'red' : 'black';
  }

  if (boardMods && (boardMods as any).monochromeActive) {
    if (baseColor === 'red') return 'black';
    if (baseColor === 'black') return 'red';
  }

  return baseColor;
}

// Maps special colors directly for 1:1 bet resolution
export function getBetColor(color: SlotColor): BetColor {
  return color;
}

// Resolves special colors back to their base roulette color (red, black, or green)
export function getEffectiveColor(color: SlotColor, num: number, greenNumbers: number[]): 'red' | 'black' | 'green' {
  if (color === 'red' || color === 'black' || color === 'green') {
    return color;
  }
  // For special colors, fallback to the base roulette color
  if (greenNumbers.includes(num) || num === 0 || num === 37) {
    return 'green';
  }
  return RED_NUMBERS.has(num) ? 'red' : 'black';
}

// Returns a description of the special effect for a slot color, or null if no effect
export function getSlotEffect(color: SlotColor, isPlayerLosing: boolean): { description: string; type: string } | null {
  switch (color) {
    case 'gold':
      return { description: 'GOLD — Transformed slots to Gold and gained +15 PTS!', type: 'gold_points' };
    case 'purple':
      return { description: 'PURPLE CURSE — Gained +20 PTS and stunned opponent!', type: 'purple_curse' };
    case 'cyan':
      return { description: 'CYAN ESSENCE — Gained +10 PTS, refilled chips, and drew 2 cards!', type: 'cyan_shield' };
    case 'crimson':
      if (isPlayerLosing) {
        return { description: 'CRIMSON — Currently losing! 12x payout multiplier!', type: 'crimson_active' };
      } else {
        return { description: 'CRIMSON — Currently winning/tied. 6x payout multiplier', type: 'crimson_inactive' };
      }
    default:
      return null;
  }
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

export interface BallState {
  id: number;
  ballAngle: number;
  ballOmega: number;
  ballRadius: number;
  ballHeight: number;
  ballRadVel: number;
  ballHeightVel: number;
  isSettled: boolean;
  settledSlotIndex: number;
  phase: 'outer' | 'dropping' | 'bouncing' | 'settled';
  shotgunTimer?: number;
  splitCooldown?: number;
}

export class RoulettePhysics {
  // Wheel physics state
  wheelAngle = 0;
  wheelOmega = 0;
  
  // Backwards compatibility single-ball fields
  ballAngle = 0;
  ballOmega = 0;
  ballRadius = 1.0;
  ballHeight = 0.1;
  isSettled = false;
  settledSlotIndex = -1;
  
  // Active balls array
  balls: BallState[] = [];
  nextBallId = 1;

  // Collision flags for audio triggering
  justHitPin = false;
  justHitDivider = false;
  
  // Real-time velocity state (backwards compatibility)
  ballRadVel = 0;
  ballHeightVel = 0;
  
  // Track parameters
  readonly R_OUTER = 1.0;
  readonly R_INNER = 0.65;
  readonly BALL_DECAY = 2.4; // Natural speed decay of the ball (increased from 0.85 to speed up settling)
  readonly WHEEL_DECAY = 0.45; // Natural speed decay of the wheel (increased from 0.15 to speed up settling)

  // Current simulation phase (backwards compatibility)
  phase: 'outer' | 'dropping' | 'bouncing' | 'settled' = 'outer';
  
  // Modifiers cached for the current spin
  private mods!: PhysicsModifiers;
  private biasTargetAngle = -1; // If biased, target angle in wheel space
  private winningTargets: number[] = [];
  
  // Active wheel configuration
  wheelNumbers: number[] = WHEEL_NUMBERS;
  slotCount = 37;
  greenNumbers: number[] = [0];
  random: () => number = Math.random;

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
        predictionSize: 0,
        nudgeCheatActive: false
      }
    );
  }

  reset(
    wheel: WheelConfig, 
    mods: PhysicsModifiers, 
    winningTargets?: number[],
    seedWheelAngle?: number,
    seedBallAngle?: number,
    seedWheelSpeed?: number,
    seedBallSpeed?: number,
    boardMods?: BoardModifiers
  ) {
    this.mods = mods;
    this.winningTargets = winningTargets || [];
    this.wheelNumbers = wheel.numbers;
    this.slotCount = wheel.numbers.length;
    this.greenNumbers = wheel.greenNumbers;
    this.isSettled = false;
    this.settledSlotIndex = -1;
    this.justHitPin = false;
    this.justHitDivider = false;
    this.ballRadVel = 0;
    this.ballHeightVel = 0;
    this.phase = 'outer';
    this.ballRadius = this.R_OUTER;
    this.ballHeight = 0.15;
    this.balls = [];
    this.nextBallId = 1;
    
    // Resolve initial seeds (using Math.random if undefined, but ensuring stable seeded generator)
    const wAngle = seedWheelAngle !== undefined ? seedWheelAngle : (Math.random() * Math.PI * 2);
    const bAngle = seedBallAngle !== undefined ? seedBallAngle : (Math.random() * Math.PI * 2);
    const wSpeed = seedWheelSpeed !== undefined ? seedWheelSpeed : (2.0 + Math.random() * 1.5);
    const bSpeed = seedBallSpeed !== undefined ? seedBallSpeed : (-10.0 - Math.random() * 5.0);

    const seedAngleVal = wAngle + bAngle * 100;
    const seedSpeedVal = wSpeed * 1000 + bSpeed * 100000;
    const combinedVal = Math.abs(seedAngleVal + seedSpeedVal);
    let seed = Math.floor(combinedVal) % 2147483647;
    if (seed <= 0) seed = 12345;

    this.random = () => {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    this.wheelOmega = wSpeed * mods.spinSpeed;
    this.wheelAngle = wAngle;

    // Handle Bias (cheating physics)
    this.biasTargetAngle = -1;
    let filteredWinningTargets = [...this.winningTargets];
    if (mods.biasRedOnly) {
      filteredWinningTargets = filteredWinningTargets.filter(num => getSlotColor(num, wheel, boardMods) === 'red');
    }
    if (mods.biasBlackOnly) {
      filteredWinningTargets = filteredWinningTargets.filter(num => getSlotColor(num, wheel, boardMods) === 'black');
    }

    if (mods.targetZoneBias > 0 && filteredWinningTargets.length > 0) {
      // Pick one of the winning targets and find its slot position
      const targetNum = filteredWinningTargets[Math.floor(this.random() * filteredWinningTargets.length)];
      const slotIdx = this.wheelNumbers.indexOf(targetNum);
      if (slotIdx >= 0) {
        // Target angle on the wheel: index * (2pi/slotCount)
        this.biasTargetAngle = slotIdx * (Math.PI * 2 / this.slotCount);
      }
    }

    // Spawn initial balls
    const count = mods.multiballCount || 1;
    const initialOmega = bSpeed / Math.sqrt(mods.ballMass);
    for (let i = 0; i < count; i++) {
      const offsetAngle = i * (Math.PI * 2 / count);
      const angle = (bAngle + offsetAngle) % (Math.PI * 2);
      this.balls.push({
        id: this.nextBallId++,
        ballAngle: angle,
        ballOmega: initialOmega,
        ballRadius: this.R_OUTER,
        ballHeight: 0.15,
        ballRadVel: 0,
        ballHeightVel: 0,
        isSettled: false,
        settledSlotIndex: -1,
        phase: 'outer',
        shotgunTimer: mods.shotgunTime ? mods.shotgunTime : undefined
      });
    }

    // Sync initial state to class fields
    if (this.balls.length > 0) {
      const first = this.balls[0];
      this.ballAngle = first.ballAngle;
      this.ballOmega = first.ballOmega;
      this.ballRadius = first.ballRadius;
      this.ballHeight = first.ballHeight;
      this.ballRadVel = first.ballRadVel;
      this.ballHeightVel = first.ballHeightVel;
      this.isSettled = false;
      this.settledSlotIndex = -1;
      this.phase = first.phase;
    }
  }

  update(dt: number) {
    // 1. Update Wheel Angle & Friction
    this.wheelAngle = (this.wheelAngle + this.wheelOmega * dt) % (Math.PI * 2);
    
    const allSettled = this.balls.length > 0 && this.balls.every(b => b.isSettled);
    if (allSettled) {
      this.wheelOmega = Math.max(0, this.wheelOmega - this.WHEEL_DECAY * this.mods.friction * dt);
    } else {
      this.wheelOmega = Math.max(0.15, this.wheelOmega - this.WHEEL_DECAY * this.mods.friction * dt);
    }

    this.justHitPin = false;
    this.justHitDivider = false;

    const startingLength = this.balls.length;
    for (let idx = 0; idx < startingLength; idx++) {
      const ball = this.balls[idx];

      if (ball.isSettled) {
        // Keep the ball locked in the settled slot relative to the wheel
        const slotAngleWidth = (Math.PI * 2) / this.slotCount;
        const targetAngleInWheel = ball.settledSlotIndex * slotAngleWidth;
        
        ball.ballAngle = (this.wheelAngle + targetAngleInWheel) % (Math.PI * 2);
        if (ball.ballAngle < 0) ball.ballAngle += Math.PI * 2;
        
        ball.ballRadius = this.R_INNER;
        ball.ballHeight = 0.02;
        ball.ballOmega = this.wheelOmega;
        continue;
      }

      // Update split cooldown
      if (ball.splitCooldown !== undefined && ball.splitCooldown > 0) {
        ball.splitCooldown -= dt;
      }

      // Update shotgun timer
      if (ball.shotgunTimer !== undefined) {
        ball.shotgunTimer -= dt;
        if (ball.shotgunTimer <= 0) {
          ball.shotgunTimer = undefined;
          
          // Spawn 4 extra scattered balls from current position
          const numExtra = 4;
          for (let j = 0; j < numExtra; j++) {
            if (this.balls.length >= 8) break; // limit max balls to avoid crazy performance hit
            const spreadAngle = (j - 1.5) * 0.15;
            const extraAngle = (ball.ballAngle + spreadAngle) % (Math.PI * 2);
            const extraOmega = ball.ballOmega * (0.8 + this.random() * 0.4);
            const extraRadVel = ball.ballRadVel + (this.random() - 0.5) * 1.5;
            const extraHeightVel = ball.ballHeightVel + this.random() * 2.0 + 1.0; // pop up!
            
            this.balls.push({
              id: this.nextBallId++,
              ballAngle: extraAngle,
              ballOmega: extraOmega,
              ballRadius: ball.ballRadius,
              ballHeight: ball.ballHeight,
              ballRadVel: extraRadVel,
              ballHeightVel: extraHeightVel,
              isSettled: false,
              settledSlotIndex: -1,
              phase: 'dropping'
            });
          }
        }
      }

      // 2. Apply forces depending on radius
      const frictionDecay = this.BALL_DECAY * this.mods.friction;
      if (ball.ballRadius > 0.88) {
        // Outer track sliding
        if (ball.ballOmega > 0) {
          ball.ballOmega = Math.max(0, ball.ballOmega - frictionDecay * dt);
        } else {
          ball.ballOmega = Math.min(0, ball.ballOmega + frictionDecay * dt);
        }
      } else {
        // Inner wheel drag
        const relOmega = ball.ballOmega - this.wheelOmega;
        const dragFactor = 1.8 * this.mods.friction;
        ball.ballOmega -= relOmega * dragFactor * dt;
      }

      // Wheel tilt gravity
      if (this.mods.wheelTilt > 0) {
        const bottomAngle = Math.PI * 0.5;
        const angleDiff = bottomAngle - ball.ballAngle;
        const gravityForce = Math.sin(angleDiff) * this.mods.wheelTilt * 6.5;
        ball.ballOmega += gravityForce * dt;
      }

      // 3. Radial physics: centrifugal force vs gravity slope pull
      const centrifugalForce = (ball.ballOmega * ball.ballOmega) * ball.ballRadius;
      let inwardGravity = 9.0;
      if (ball.ballRadius > 0.92) {
        inwardGravity = 3.0;
      } else if (ball.ballRadius > 0.78) {
        inwardGravity = 4.5;
      }
      
      // Magnetic bias
      if (this.mods.targetZoneBias > 0 && this.biasTargetAngle >= 0 && ball.ballRadius < 0.9) {
        let angleInWheel = (ball.ballAngle - this.wheelAngle);
        if (angleInWheel < 0) angleInWheel += Math.PI * 2;
        angleInWheel = angleInWheel % (Math.PI * 2);
        
        let diff = this.biasTargetAngle - angleInWheel;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        
        ball.ballOmega += Math.sin(diff) * this.mods.targetZoneBias * 25.0 * dt;
        inwardGravity += this.mods.targetZoneBias * 8.0;
      }

      ball.ballRadVel += (centrifugalForce - inwardGravity) * dt;
      ball.ballRadVel = Math.max(-4.0, Math.min(4.0, ball.ballRadVel));
      ball.ballRadius += ball.ballRadVel * dt;

      if (ball.ballRadius >= this.R_OUTER) {
        ball.ballRadius = this.R_OUTER;
        ball.ballRadVel = -Math.abs(ball.ballRadVel) * 0.15;
      } else if (ball.ballRadius <= this.R_INNER) {
        ball.ballRadius = this.R_INNER;
        ball.ballRadVel = Math.abs(ball.ballRadVel) * 0.25;
      }
      
      // 4. Vertical physics
      ball.ballHeightVel -= 18.0 * dt;
      ball.ballHeight += ball.ballHeightVel * dt;

      let targetFloorHeight = 0.02;
      if (ball.ballRadius > 0.88) {
        targetFloorHeight = 0.15;
      } else if (ball.ballRadius > this.R_INNER) {
        const t = (ball.ballRadius - this.R_INNER) / (0.88 - this.R_INNER);
        targetFloorHeight = 0.02 + 0.13 * t;
      }

      if (ball.ballHeight <= targetFloorHeight) {
        ball.ballHeight = targetFloorHeight;
        const restitution = 0.35 / Math.sqrt(this.mods.ballMass);
        ball.ballHeightVel = -ball.ballHeightVel * restitution;
        ball.ballRadVel *= 0.7;
      }

      // 5. Angle update
      const lastAngle = ball.ballAngle;
      ball.ballAngle = (ball.ballAngle + ball.ballOmega * dt);
      if (ball.ballAngle < 0) ball.ballAngle += Math.PI * 2;
      ball.ballAngle = ball.ballAngle % (Math.PI * 2);

      if (ball.ballRadius > 0.88) {
        const spacing = Math.PI / 8;
        const prevIdx = Math.floor(lastAngle / spacing);
        const currIdx = Math.floor(ball.ballAngle / spacing);
        if (prevIdx !== currIdx) {
          this.justHitDivider = true;
          ball.phase = 'outer';
        }
      }

      // 6. Collision with deflector pins
      const checkMaxRad = this.mods.splitPegActive ? 0.93 : 0.9;
      const checkMinRad = this.mods.splitPegActive ? 0.75 : 0.78;
      if (ball.ballRadius < checkMaxRad && ball.ballRadius > checkMinRad) {
        const pinCount = 8;
        const spacing = (Math.PI * 2) / pinCount;
        const R_PIN = 0.82;
        const ballSize = this.mods.splitPegActive ? 0.065 : 0.035;
        const pinSize = this.mods.splitPegActive ? 0.025 : 0.015;
        const collisionDist = ballSize + pinSize;

        for (let i = 0; i < pinCount; i++) {
          const pinAngle = i * spacing;
          const px = R_PIN * Math.cos(pinAngle);
          const pz = R_PIN * Math.sin(pinAngle);
          const bx = ball.ballRadius * Math.cos(ball.ballAngle);
          const bz = ball.ballRadius * Math.sin(ball.ballAngle);
          
          const dx = bx - px;
          const dz = bz - pz;
          const dist = Math.sqrt(dx * dx + dz * dz);
          
          if (dist < collisionDist) {
            this.justHitPin = true;
            ball.phase = 'dropping';
            const normalX = dx / dist;
            const normalZ = dz / dist;
            
            const newBx = px + normalX * collisionDist * 1.05;
            const newBz = pz + normalZ * collisionDist * 1.05;
            
            ball.ballRadius = Math.sqrt(newBx * newBx + newBz * newBz);
            ball.ballAngle = Math.atan2(newBz, newBx);
            if (ball.ballAngle < 0) ball.ballAngle += Math.PI * 2;

            const bounceEnergy = (Math.abs(ball.ballOmega) * 0.35 + 0.5) / Math.sqrt(this.mods.ballMass);
            ball.ballRadVel = normalX * bounceEnergy * 1.2;
            ball.ballOmega = -ball.ballOmega * 0.45 + (this.random() - 0.5) * this.mods.bounceRandomness * 18.0;
            ball.ballHeightVel = bounceEnergy * 0.8;

            // Split peg active
            if (this.mods.splitPegActive && this.balls.length < 6 && (!ball.splitCooldown || ball.splitCooldown <= 0)) {
              ball.splitCooldown = 0.3;
              const cloneOmega = -ball.ballOmega;
              const cloneRadVel = -ball.ballRadVel;
              const cloneHeightVel = ball.ballHeightVel * 0.9;
              const cloneAngle = (ball.ballAngle + 0.05) % (Math.PI * 2);
              this.balls.push({
                id: this.nextBallId++,
                ballAngle: cloneAngle,
                ballOmega: cloneOmega,
                ballRadius: ball.ballRadius,
                ballHeight: ball.ballHeight,
                ballRadVel: cloneRadVel,
                ballHeightVel: cloneHeightVel,
                isSettled: false,
                settledSlotIndex: -1,
                phase: 'bouncing',
                splitCooldown: 0.3
              });
            }
            break;
          }
        }
      }

      // 7. Divider collisions
      const slotAngleWidth = (Math.PI * 2) / this.slotCount;
      if (ball.ballRadius < 0.78) {
        let angleInWheel = (ball.ballAngle - this.wheelAngle);
        if (angleInWheel < 0) angleInWheel += Math.PI * 2;
        angleInWheel = angleInWheel % (Math.PI * 2);

        const angleForWall = angleInWheel - slotAngleWidth * 0.5;
        const localAngle = (angleForWall % slotAngleWidth + slotAngleWidth) % slotAngleWidth;
        const wallThreshold = 0.04;
        
        const isNearLeftWall = localAngle < wallThreshold;
        const isNearRightWall = localAngle > slotAngleWidth - wallThreshold;

        if ((isNearLeftWall || isNearRightWall) && (ball.ballHeight - targetFloorHeight) < 0.025) {
          this.justHitDivider = true;
          ball.phase = 'bouncing';
          const relOmega = ball.ballOmega - this.wheelOmega;
          const restitution = 0.4 / Math.sqrt(this.mods.ballMass);
          
          ball.ballOmega = this.wheelOmega - relOmega * restitution + (this.random() - 0.5) * this.mods.bounceRandomness * 8.0;
          ball.ballHeightVel = Math.max(0.1, Math.abs(relOmega) * 0.15);
          ball.ballRadVel = Math.max(0.1, Math.abs(relOmega) * 0.2);
          
          if (isNearLeftWall) {
            angleInWheel += wallThreshold * 1.05;
          } else {
            angleInWheel -= wallThreshold * 1.05;
          }
          ball.ballAngle = (this.wheelAngle + angleInWheel) % (Math.PI * 2);
          if (ball.ballAngle < 0) ball.ballAngle += Math.PI * 2;

          // Split peg active on divider collisions
          if (this.mods.splitPegActive && this.balls.length < 6 && (!ball.splitCooldown || ball.splitCooldown <= 0)) {
            ball.splitCooldown = 0.35;
            const cloneOmega = -ball.ballOmega;
            const cloneRadVel = -ball.ballRadVel;
            const cloneHeightVel = ball.ballHeightVel * 0.9;
            const cloneAngle = (ball.ballAngle + 0.05) % (Math.PI * 2);
            this.balls.push({
              id: this.nextBallId++,
              ballAngle: cloneAngle,
              ballOmega: cloneOmega,
              ballRadius: ball.ballRadius,
              ballHeight: ball.ballHeight,
              ballRadVel: cloneRadVel,
              ballHeightVel: cloneHeightVel,
              isSettled: false,
              settledSlotIndex: -1,
              phase: 'bouncing',
              splitCooldown: 0.35
            });
          }
        }
      }

      // 8. Settle check
      const relSpeed = Math.abs(ball.ballOmega - this.wheelOmega);
      if (
        ball.ballRadius <= this.R_INNER + 0.04 &&
        ball.ballHeight <= 0.021 &&
        relSpeed < 0.8 &&
        Math.abs(ball.ballRadVel) < 0.15
      ) {
        let angleInWheel = (ball.ballAngle - this.wheelAngle);
        if (angleInWheel < 0) angleInWheel += Math.PI * 2;
        angleInWheel = angleInWheel % (Math.PI * 2);

        const slotIdx = Math.floor((angleInWheel + slotAngleWidth * 0.5) / slotAngleWidth) % this.slotCount;
        let finalSlotIdx = (slotIdx + this.slotCount) % this.slotCount;
        
        // Nudge cheat
        if (this.mods.nudgeCheatActive && this.winningTargets.length > 0) {
          const currentNum = this.wheelNumbers[finalSlotIdx];
          if (!this.winningTargets.includes(currentNum)) {
            const dist = (this.mods as any).nudgeDistance || 1;
            let foundIdx = -1;
            for (let d = 1; d <= dist; d++) {
              const prevIdx = (finalSlotIdx - d + this.slotCount) % this.slotCount;
              const prevNum = this.wheelNumbers[prevIdx];
              if (this.winningTargets.includes(prevNum)) {
                foundIdx = prevIdx;
                break;
              }
              const nextIdx = (finalSlotIdx + d + this.slotCount) % this.slotCount;
              const nextNum = this.wheelNumbers[nextIdx];
              if (this.winningTargets.includes(nextNum)) {
                foundIdx = nextIdx;
                break;
              }
            }
            if (foundIdx !== -1) {
              finalSlotIdx = foundIdx;
            }
          }
        }
        
        ball.settledSlotIndex = finalSlotIdx;
        ball.isSettled = true;
        ball.phase = 'settled';
      }
    }

    // Sync fields back to first ball for backwards compatibility
    if (this.balls.length > 0) {
      const first = this.balls[0];
      this.ballAngle = first.ballAngle;
      this.ballOmega = first.ballOmega;
      this.ballRadius = first.ballRadius;
      this.ballHeight = first.ballHeight;
      this.ballRadVel = first.ballRadVel;
      this.ballHeightVel = first.ballHeightVel;
      this.isSettled = this.balls.every(b => b.isSettled);
      this.settledSlotIndex = first.settledSlotIndex;
      this.phase = first.phase;
    } else {
      this.isSettled = true;
    }
  }

  getWinningNumber(): number {
    if (!this.isSettled || this.balls.length === 0) return -1;
    return this.wheelNumbers[this.balls[0].settledSlotIndex];
  }

  getWinningNumbers(): number[] {
    if (!this.isSettled) return [];
    return this.balls.map(b => this.wheelNumbers[b.settledSlotIndex]);
  }
}
