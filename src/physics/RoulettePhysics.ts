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

// Returns a description of the special effect for a slot color, or null if no effect
export function getSlotEffect(color: SlotColor, playerHpPercent: number): { description: string; type: string } | null {
  switch (color) {
    case 'gold':
      return { description: 'GOLD — Healed 3 HP and gained 3x payout', type: 'gold_heal' };
    case 'purple':
      return { description: 'PURPLE CURSE — 2x damage to enemy, but costs 3 HP', type: 'purple_curse' };
    case 'cyan':
      return { description: 'CYAN SHIELD — Gained 8 block and 2x payout', type: 'cyan_shield' };
    case 'crimson':
      if (playerHpPercent < 0.5) {
        return { description: 'CRIMSON BLOOD — HP below 50%! 5x payout!', type: 'crimson_active' };
      } else {
        return { description: 'CRIMSON — HP above 50%, only 1x payout', type: 'crimson_inactive' };
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
  
  // Collision flags for audio triggering
  justHitPin = false;
  justHitDivider = false;
  
  // Real-time velocity state
  ballRadVel = 0;
  ballHeightVel = 0;
  
  // Track parameters
  readonly R_OUTER = 1.0;
  readonly R_INNER = 0.65;
  readonly BALL_DECAY = 2.4; // Natural speed decay of the ball (increased from 0.85 to speed up settling)
  readonly WHEEL_DECAY = 0.45; // Natural speed decay of the wheel (increased from 0.15 to speed up settling)

  // Current simulation phase
  // 'outer' -> 'dropping' -> 'bouncing' -> 'settled'
  phase: 'outer' | 'dropping' | 'bouncing' | 'settled' = 'outer';
  
  // Modifiers cached for the current spin
  private mods!: PhysicsModifiers;
  private biasTargetAngle = -1; // If biased, target angle in wheel space
  private winningTargets: number[] = [];
  
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
    
    // Inject wheel and ball in opposite directions
    // Speed scales with mods.spinSpeed
    const baseWheelSpeed = seedWheelSpeed !== undefined ? seedWheelSpeed : (2.0 + Math.random() * 1.5);
    const baseBallSpeed = seedBallSpeed !== undefined ? seedBallSpeed : (-10.0 - Math.random() * 5.0); // Negative means opposite direction

    this.wheelOmega = baseWheelSpeed * mods.spinSpeed;
    this.ballOmega = baseBallSpeed / Math.sqrt(mods.ballMass);
    
    // Randomize or seed initial positions
    this.wheelAngle = seedWheelAngle !== undefined ? seedWheelAngle : (Math.random() * Math.PI * 2);
    this.ballAngle = seedBallAngle !== undefined ? seedBallAngle : (Math.random() * Math.PI * 2);

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
      const targetNum = filteredWinningTargets[Math.floor(Math.random() * filteredWinningTargets.length)];
      const slotIdx = this.wheelNumbers.indexOf(targetNum);
      if (slotIdx >= 0) {
        // Target angle on the wheel: index * (2pi/slotCount)
        this.biasTargetAngle = slotIdx * (Math.PI * 2 / this.slotCount);
      }
    }
  }

  update(dt: number) {
    if (this.isSettled) {
      // 1. Update wheel angle and slow down to a stop eventually
      this.wheelAngle = (this.wheelAngle + this.wheelOmega * dt) % (Math.PI * 2);
      this.wheelOmega = Math.max(0, this.wheelOmega - this.WHEEL_DECAY * this.mods.friction * dt);

      // 2. Keep the ball locked in the settled slot relative to the wheel
      const slotAngleWidth = (Math.PI * 2) / this.slotCount;
      const targetAngleInWheel = this.settledSlotIndex * slotAngleWidth;
      
      this.ballAngle = (this.wheelAngle + targetAngleInWheel) % (Math.PI * 2);
      if (this.ballAngle < 0) this.ballAngle += Math.PI * 2;
      
      this.ballRadius = this.R_INNER;
      this.ballHeight = 0.02;
      this.ballOmega = this.wheelOmega;
      return;
    }

    // 1. Update Wheel Angle & Friction
    this.wheelAngle = (this.wheelAngle + this.wheelOmega * dt) % (Math.PI * 2);
    this.wheelOmega = Math.max(0.15, this.wheelOmega - this.WHEEL_DECAY * this.mods.friction * dt);

    // 2. Apply forces to the ball depending on its radius
    const frictionDecay = this.BALL_DECAY * this.mods.friction;
    
    // Check if the ball is on the static outer rim versus the spinning inner wheel
    if (this.ballRadius > 0.88) {
      // Outer track: slides on static track (decelerates towards 0)
      if (this.ballOmega > 0) {
        this.ballOmega = Math.max(0, this.ballOmega - frictionDecay * dt);
      } else {
        this.ballOmega = Math.min(0, this.ballOmega + frictionDecay * dt);
      }
    } else {
      // Inner wheel: dragged by the rotating wheel cone
      const relOmega = this.ballOmega - this.wheelOmega;
      const dragFactor = 1.8 * this.mods.friction;
      this.ballOmega -= relOmega * dragFactor * dt;
    }

    // Apply Tilt gravity force (if active)
    if (this.mods.wheelTilt > 0) {
      const bottomAngle = Math.PI * 0.5;
      const angleDiff = bottomAngle - this.ballAngle;
      const gravityForce = Math.sin(angleDiff) * this.mods.wheelTilt * 6.5;
      this.ballOmega += gravityForce * dt;
    }

    // 3. Radial physics: centrifugal force vs gravity slope pull
    const centrifugalForce = (this.ballOmega * this.ballOmega) * this.ballRadius;
    
    // Sloped cone gravity pull (pulls inwards)
    let inwardGravity = 9.0; // firm pull in slots to settle
    if (this.ballRadius > 0.92) {
      inwardGravity = 3.0; // stable outer rim orbit
    } else if (this.ballRadius > 0.78) {
      inwardGravity = 4.5; // gentle drop pull for long horizontal spiral
    }
    
    // Lodestone magnetic bias (pulls towards the target zone when near the cone)
    let magneticForce = 0;
    if (this.mods.targetZoneBias > 0 && this.biasTargetAngle >= 0 && this.ballRadius < 0.9) {
      let angleInWheel = (this.ballAngle - this.wheelAngle);
      if (angleInWheel < 0) angleInWheel += Math.PI * 2;
      angleInWheel = angleInWheel % (Math.PI * 2);
      
      let diff = this.biasTargetAngle - angleInWheel;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      
      // Accelerate ball omega towards the target angle
      this.ballOmega += Math.sin(diff) * this.mods.targetZoneBias * 25.0 * dt;
      // Also pull the ball inwards faster to force it to settle in that zone
      inwardGravity += this.mods.targetZoneBias * 8.0;
    }

    // Update radial velocity and position
    this.ballRadVel += (centrifugalForce - inwardGravity) * dt;
    // Limit radial velocity to avoid clipping
    this.ballRadVel = Math.max(-4.0, Math.min(4.0, this.ballRadVel));
    
    this.ballRadius += this.ballRadVel * dt;

    // Constrain radius between outer and inner track
    if (this.ballRadius >= this.R_OUTER) {
      this.ballRadius = this.R_OUTER;
      this.ballRadVel = -Math.abs(this.ballRadVel) * 0.15; // low bounce off outer wall
    } else if (this.ballRadius <= this.R_INNER) {
      this.ballRadius = this.R_INNER;
      this.ballRadVel = Math.abs(this.ballRadVel) * 0.25; // bounce outwards
    }
    
    // 4. Vertical physics: gravity vs floor collisions
    this.ballHeightVel -= 18.0 * dt;
    this.ballHeight += this.ballHeightVel * dt;

    // Calculate floor height at current radius
    let targetFloorHeight = 0.02; // slot floor height
    if (this.ballRadius > 0.88) {
      targetFloorHeight = 0.15; // outer track height
    } else if (this.ballRadius > this.R_INNER) {
      // Cone slope interpolation
      const t = (this.ballRadius - this.R_INNER) / (0.88 - this.R_INNER);
      targetFloorHeight = 0.02 + 0.13 * t;
    }

    // Floor collision
    if (this.ballHeight <= targetFloorHeight) {
      this.ballHeight = targetFloorHeight;
      const restitution = 0.35 / Math.sqrt(this.mods.ballMass);
      this.ballHeightVel = -this.ballHeightVel * restitution;
      
      // Damp radial speed on floor impact
      this.ballRadVel *= 0.7;
    }

    // 5. Update ball angle
    const lastAngle = this.ballAngle;
    this.ballAngle = (this.ballAngle + this.ballOmega * dt);
    if (this.ballAngle < 0) this.ballAngle += Math.PI * 2;
    this.ballAngle = this.ballAngle % (Math.PI * 2);

    // Track outer rim rolling ticks
    if (this.ballRadius > 0.88) {
      const spacing = Math.PI / 8; // 16 ticks per revolution
      const prevIdx = Math.floor(lastAngle / spacing);
      const currIdx = Math.floor(this.ballAngle / spacing);
      if (prevIdx !== currIdx) {
        this.justHitDivider = true;
      }
    }

    // 6. Collision with deflector pins (spaced at 45 degrees, R = 0.82)
    if (this.ballRadius < 0.9 && this.ballRadius > 0.78) {
      const pinCount = 8;
      const spacing = (Math.PI * 2) / pinCount;
      const R_PIN = 0.82;
      const ballSize = 0.035;
      const pinSize = 0.015;
      const collisionDist = ballSize + pinSize;

      for (let i = 0; i < pinCount; i++) {
        const pinAngle = i * spacing;
        const px = R_PIN * Math.cos(pinAngle);
        const pz = R_PIN * Math.sin(pinAngle);
        const bx = this.ballRadius * Math.cos(this.ballAngle);
        const bz = this.ballRadius * Math.sin(this.ballAngle);
        
        const dx = bx - px;
        const dz = bz - pz;
        const dist = Math.sqrt(dx * dx + dz * dz);
        
        if (dist < collisionDist) {
          // Bounce off pin!
          this.justHitPin = true;
          // Push ball outwards and change its angular velocity
          const normalX = dx / dist;
          const normalZ = dz / dist;
          
          // Re-calculate radius and angle from new position
          const newBx = px + normalX * collisionDist * 1.05;
          const newBz = pz + normalZ * collisionDist * 1.05;
          
          this.ballRadius = Math.sqrt(newBx * newBx + newBz * newBz);
          this.ballAngle = Math.atan2(newBz, newBx);
          if (this.ballAngle < 0) this.ballAngle += Math.PI * 2;

          // Re-calculate velocities
          const bounceEnergy = (Math.abs(this.ballOmega) * 0.35 + 0.5) / Math.sqrt(this.mods.ballMass);
          this.ballRadVel = normalX * bounceEnergy * 1.2;
          this.ballOmega = -this.ballOmega * 0.45 + (Math.random() - 0.5) * this.mods.bounceRandomness * 18.0;
          this.ballHeightVel = bounceEnergy * 0.8; // pop up!
          
          break;
        }
      }
    }

    // 7. Collision with slot dividers
    const slotAngleWidth = (Math.PI * 2) / this.slotCount;
    if (this.ballRadius < 0.78) {
      let angleInWheel = (this.ballAngle - this.wheelAngle);
      if (angleInWheel < 0) angleInWheel += Math.PI * 2;
      angleInWheel = angleInWheel % (Math.PI * 2);

      // Offset by half a slot width to align dividers to the visual boundaries (pegs)
      const angleForWall = angleInWheel - slotAngleWidth * 0.5;
      const localAngle = (angleForWall % slotAngleWidth + slotAngleWidth) % slotAngleWidth;
      const wallThreshold = 0.04; // collision width in radians
      
      const isNearLeftWall = localAngle < wallThreshold;
      const isNearRightWall = localAngle > slotAngleWidth - wallThreshold;

      if ((isNearLeftWall || isNearRightWall) && (this.ballHeight - targetFloorHeight) < 0.025) {
        // Hit divider wall!
        this.justHitDivider = true;
        const relOmega = this.ballOmega - this.wheelOmega;
        const restitution = 0.4 / Math.sqrt(this.mods.ballMass);
        
        // Bounce angular speed
        this.ballOmega = this.wheelOmega - relOmega * restitution + (Math.random() - 0.5) * this.mods.bounceRandomness * 8.0;
        
        // Pop ball up and out
        this.ballHeightVel = Math.max(0.1, Math.abs(relOmega) * 0.15);
        this.ballRadVel = Math.max(0.1, Math.abs(relOmega) * 0.2);
        
        // Adjust angle slightly away from wall to prevent stuck triggers
        if (isNearLeftWall) {
          angleInWheel += wallThreshold * 1.05;
        } else {
          angleInWheel -= wallThreshold * 1.05;
        }
        this.ballAngle = (this.wheelAngle + angleInWheel) % (Math.PI * 2);
        if (this.ballAngle < 0) this.ballAngle += Math.PI * 2;
      }
    }

    // 8. Settle check
    // If the ball is deep in the slots, has low relative speed, low radial velocity, and has landed on the floor
    const relSpeed = Math.abs(this.ballOmega - this.wheelOmega);
    if (
      this.ballRadius <= this.R_INNER + 0.04 &&
      this.ballHeight <= 0.021 &&
      relSpeed < 0.8 &&
      Math.abs(this.ballRadVel) < 0.15
    ) {
      // Find closest slot
      let angleInWheel = (this.ballAngle - this.wheelAngle);
      if (angleInWheel < 0) angleInWheel += Math.PI * 2;
      angleInWheel = angleInWheel % (Math.PI * 2);

      const slotIdx = Math.floor((angleInWheel + slotAngleWidth * 0.5) / slotAngleWidth) % this.slotCount;
      this.settleInSlot(slotIdx);
    }
  }

  private settleInSlot(slotIdx: number) {
    let finalSlotIdx = (slotIdx + this.slotCount) % this.slotCount;
    
    // Apply nudge cheat if active
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
    
    this.settledSlotIndex = finalSlotIdx;
    this.isSettled = true;
    this.phase = 'settled';
  }

  getWinningNumber(): number {
    if (!this.isSettled) return -1;
    return this.wheelNumbers[this.settledSlotIndex];
  }
}
