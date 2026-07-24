import { Bet, BoardModifiers, PhysicsModifiers, WheelConfig, Card } from '../Types';
import { RoulettePhysics, WHEEL_NUMBERS } from '../../physics/RoulettePhysics';
import { CardEVCalculator, SlotPayoutInfo } from './CardEVCalculator';

export interface PhysicsSimulationResult {
  simulationsCount: number;
  empiricalEV: number;
  theoreticalEV: number;
  hitCount: number;
  hitRate: number;
  slotFrequencies: Record<number, number>;
  slotProbabilities: Record<number, number>;
  slotPayouts: SlotPayoutInfo[];
  executionTimeMs: number;
}

export class PhysicsEVSimulator {
  /**
   * Run Monte Carlo physics simulations using the game's actual RoulettePhysics engine.
   */
  static runSimulation(
    wheel: WheelConfig,
    bets: Bet[],
    physicsMods: PhysicsModifiers,
    boardMods: BoardModifiers,
    iterations: number = 1000,
    activePlayedCards: Card[] = []
  ): PhysicsSimulationResult {
    const startTime = performance.now();
    const winningNumbers: number[] = [];

    // Collect winning numbers for target zone bias calculations
    bets.forEach(b => {
      if (b.type === 'number' && b.numberValue !== undefined) {
        winningNumbers.push(b.numberValue);
      }
    });

    const slotFrequencies: Record<number, number> = {};
    wheel.numbers.forEach(num => {
      slotFrequencies[num] = 0;
    });

    let totalDamage = 0;
    let hitCount = 0;

    const fixedStep = 1 / 120;
    const maxStepsPerSpin = 30 * 120; // 30 seconds max physics per spin

    for (let sim = 0; sim < iterations; sim++) {
      const dryPhysics = new RoulettePhysics();

      // Seed pseudo-random initial parameters
      const spinSeedAngle = Math.random() * Math.PI * 2;
      const ballSeedAngle = Math.random() * Math.PI * 2;
      const spinSeedSpeed = 1.0 + (Math.random() - 0.5) * 0.4;
      const ballSeedSpeed = 1.0 + (Math.random() - 0.5) * 0.4;

      dryPhysics.reset(
        wheel,
        physicsMods,
        winningNumbers,
        spinSeedAngle,
        ballSeedAngle,
        spinSeedSpeed,
        ballSeedSpeed,
        boardMods
      );

      for (let step = 0; step < maxStepsPerSpin; step++) {
        dryPhysics.update(fixedStep);
        if (dryPhysics.isSettled) break;
      }

      const landedIdx = dryPhysics.settledSlotIndex;
      const landedNum = WHEEL_NUMBERS[landedIdx] ?? 0;

      slotFrequencies[landedNum] = (slotFrequencies[landedNum] || 0) + 1;

      const { damage } = CardEVCalculator.calculateSlotDamage(
        landedNum,
        bets,
        wheel,
        boardMods,
        activePlayedCards
      );

      totalDamage += damage;
      if (damage > 0) {
        hitCount++;
      }
    }

    const slotProbabilities: Record<number, number> = {};
    wheel.numbers.forEach(num => {
      slotProbabilities[num] = (slotFrequencies[num] || 0) / iterations;
    });

    const empiricalEV = totalDamage / iterations;
    const hitRate = hitCount / iterations;

    const analyticalResult = CardEVCalculator.calculateEV(
      bets,
      wheel,
      boardMods,
      activePlayedCards,
      slotProbabilities
    );

    const executionTimeMs = performance.now() - startTime;

    return {
      simulationsCount: iterations,
      empiricalEV,
      theoreticalEV: analyticalResult.ev,
      hitCount,
      hitRate,
      slotFrequencies,
      slotProbabilities,
      slotPayouts: analyticalResult.slotPayouts,
      executionTimeMs
    };
  }
}
