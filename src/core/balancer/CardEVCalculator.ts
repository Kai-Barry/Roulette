import { Bet, BoardModifiers, Card, WheelConfig, SlotColor, BattleState, RunState } from '../Types';
import { getSlotColor, getEffectiveColor, RED_NUMBERS } from '../../physics/RoulettePhysics';
import { CardHandler } from '../../cards/CardHandler';

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];

export interface SlotPayoutInfo {
  number: number;
  color: SlotColor;
  effectiveColor: 'red' | 'black' | 'green';
  damage: number;
  probability: number;
  winningBetsCount: number;
}

export interface EVResult {
  ev: number;
  hitChance: number;
  maxDamage: number;
  minDamage: number;
  variance: number;
  stdDev: number;
  totalBetAmount: number;
  netEV: number; // EV - totalBetAmount
  roi: number; // EV / totalBetAmount
  slotPayouts: SlotPayoutInfo[];
}

export interface CardEVAnalysis {
  card: Card;
  baseline: EVResult;
  modified: EVResult;
  optimalBets: Bet[];
  optimalStrategyName: string;
  deltaEV: number;
  efficiency: number; // deltaEV / cost
  cost: number;
  suggestedCost: number;
  suggestedAdjustment: string;
  balanceRating: 'OVERPOWERED' | 'BALANCED' | 'UNDERPOWERED' | 'DEAD' | 'PHYSICS_DEPENDENT';
  recommendation: string;
}

export class CardEVCalculator {
  /**
   * Calculate damage dealt when a spin lands on a specific number given bets and board modifiers.
   */
  static calculateSlotDamage(
    winningNum: number,
    bets: Bet[],
    wheel: WheelConfig,
    boardModifiers: BoardModifiers,
    activePlayedCards: Card[] = [],
    playerScore: number = 0,
    enemyScore: number = 0
  ): { damage: number; winningBetsCount: number } {
    if (!bets || bets.length === 0) {
      return { damage: 0, winningBetsCount: 0 };
    }

    const color = getSlotColor(winningNum, wheel, boardModifiers);
    const effColor = getEffectiveColor(color, winningNum, wheel.greenNumbers);
    
    const dozenMultipliers = boardModifiers.dozenMultipliers || {};
    const columnMultipliers = boardModifiers.columnMultipliers || {};
    const customNumberMultipliers = boardModifiers.customNumberMultipliers || {};
    const luckyZones = boardModifiers.luckyZones || [];
    const mirrorSlots = boardModifiers.mirrorSlots || {};

    let totalSlotDamage = 0;
    let winningBetsCount = 0;

    bets.forEach(bet => {
      let isWin = false;
      let multiplier = 0;

      if (bet.type === 'red' && effColor === 'red') {
        isWin = true;
        multiplier = boardModifiers.payoutMultipliers.red;
      } else if (bet.type === 'black' && effColor === 'black') {
        isWin = true;
        multiplier = boardModifiers.payoutMultipliers.black;
      } else if (bet.type === 'green') {
        const isGreenSlot =
          wheel.greenNumbers.includes(winningNum) ||
          (boardModifiers.extraGreenSlots && boardModifiers.extraGreenSlots > 0 && winningNum === 32) ||
          (boardModifiers.extraGreenSlots && boardModifiers.extraGreenSlots > 1 && (winningNum === 11 || winningNum === 22)) ||
          (boardModifiers.extraGreenSlots && boardModifiers.extraGreenSlots > 3 && (winningNum === 5 || winningNum === 17 || winningNum === 29)) ||
          ((boardModifiers as any).emeraldForestActive && PRIMES.includes(winningNum)) ||
          color === 'green';

        if (isGreenSlot) {
          isWin = true;
          let greenMult = boardModifiers.payoutMultipliers.green;
          if ((boardModifiers as any).emeraldForestActive) {
            greenMult *= 2;
          }
          multiplier = greenMult;

          const hasGreenRipple = activePlayedCards.some(c => c.effectId === 'GREEN_RIPPLE');
          if (hasGreenRipple) {
            const greenSlotsCount = wheel.greenNumbers.length + (boardModifiers.extraGreenSlots || 0);
            multiplier += 5 * greenSlotsCount;
          }
        }
      } else if (bet.type === 'gold' && color === 'gold') {
        isWin = true;
        multiplier = wheel.payoutMultipliers.gold || 4.0;
      } else if (bet.type === 'purple' && color === 'purple') {
        isWin = true;
        multiplier = wheel.payoutMultipliers.purple || 4.0;
      } else if (bet.type === 'cyan' && color === 'cyan') {
        isWin = true;
        multiplier = wheel.payoutMultipliers.cyan || 4.0;
      } else if (bet.type === 'crimson' && color === 'crimson') {
        isWin = true;
        const baseCrimson = wheel.payoutMultipliers.crimson || 6.0;
        const isLosing = playerScore < enemyScore;
        multiplier = isLosing ? baseCrimson * 2.0 : baseCrimson;
      } else if (bet.type === 'number' && (bet.numberValue === winningNum || mirrorSlots[winningNum] === bet.numberValue)) {
        isWin = true;
        multiplier = customNumberMultipliers[winningNum] || boardModifiers.payoutMultipliers.number;

        const hasSplitBets = activePlayedCards.some(c => c.effectId === 'SPLIT_BETS');
        if (hasSplitBets) {
          multiplier += 2;
        }
      } else if (bet.type === 'odd' && !wheel.greenNumbers.includes(winningNum) && winningNum % 2 !== 0) {
        isWin = true;
        multiplier = boardModifiers.payoutMultipliers.odd;
      } else if (bet.type === 'even' && !wheel.greenNumbers.includes(winningNum) && winningNum % 2 === 0) {
        isWin = true;
        multiplier = boardModifiers.payoutMultipliers.even;
      }

      if (isWin) {
        winningBetsCount++;
        let baseDamage = bet.amount * multiplier;

        if (winningNum >= 1 && winningNum <= 18 && boardModifiers.lowMultiplier !== undefined) {
          baseDamage *= boardModifiers.lowMultiplier;
        }
        if (winningNum >= 19 && winningNum <= 36 && boardModifiers.highMultiplier !== undefined) {
          baseDamage *= boardModifiers.highMultiplier;
        }

        const dozenIdx = Math.ceil(winningNum / 12);
        if (dozenMultipliers[dozenIdx] !== undefined) {
          baseDamage *= dozenMultipliers[dozenIdx];
        }

        const colIdx = winningNum > 0 ? ((winningNum - 1) % 3) + 1 : 0;
        if (columnMultipliers[colIdx] !== undefined) {
          baseDamage *= columnMultipliers[colIdx];
        }

        if (PRIMES.includes(winningNum) && boardModifiers.primeMultiplier !== undefined) {
          baseDamage *= boardModifiers.primeMultiplier;
        }

        if (luckyZones.includes(winningNum)) {
          baseDamage *= 1.5;
        }

        if (boardModifiers.goldFoils && boardModifiers.goldFoils.includes(winningNum)) {
          baseDamage *= 3.0;
        }

        if (boardModifiers.copperPlates && boardModifiers.copperPlates.includes(winningNum)) {
          baseDamage *= 1.5;
        }

        totalSlotDamage += baseDamage;
      }
    });

    if (boardModifiers.doubleNextPayout) {
      totalSlotDamage *= 2;
    }

    if (boardModifiers.globalMultiplier) {
      totalSlotDamage *= boardModifiers.globalMultiplier;
    }

    return { damage: totalSlotDamage, winningBetsCount };
  }

  /**
   * Calculates full analytical Expected Value (EV) breakdown for a wheel and bet configuration.
   */
  static calculateEV(
    bets: Bet[],
    wheel: WheelConfig,
    boardModifiers: BoardModifiers,
    activePlayedCards: Card[] = [],
    slotProbabilities?: Record<number, number>
  ): EVResult {
    const totalSlots = wheel.numbers.length;
    const defaultProb = 1 / Math.max(1, totalSlots);
    const totalBetAmount = bets.reduce((sum, b) => sum + b.amount, 0);

    const slotPayouts: SlotPayoutInfo[] = [];
    let ev = 0;
    let maxDamage = 0;
    let minDamage = Infinity;
    let winSlots = 0;

    wheel.numbers.forEach(num => {
      const color = getSlotColor(num, wheel, boardModifiers);
      const effectiveColor = getEffectiveColor(color, num, wheel.greenNumbers);
      const prob = slotProbabilities && slotProbabilities[num] !== undefined ? slotProbabilities[num] : defaultProb;

      const { damage, winningBetsCount } = this.calculateSlotDamage(num, bets, wheel, boardModifiers, activePlayedCards);
      
      slotPayouts.push({
        number: num,
        color,
        effectiveColor,
        damage,
        probability: prob,
        winningBetsCount
      });

      ev += damage * prob;
      if (damage > 0) winSlots++;
      if (damage > maxDamage) maxDamage = damage;
      if (damage < minDamage) minDamage = damage;
    });

    if (minDamage === Infinity) minDamage = 0;

    let variance = 0;
    slotPayouts.forEach(sp => {
      variance += sp.probability * Math.pow(sp.damage - ev, 2);
    });

    const stdDev = Math.sqrt(variance);
    const hitChance = totalSlots > 0 ? winSlots / totalSlots : 0;
    const netEV = ev - totalBetAmount;
    const roi = totalBetAmount > 0 ? ev / totalBetAmount : 0;

    return {
      ev,
      hitChance,
      maxDamage,
      minDamage,
      variance,
      stdDev,
      totalBetAmount,
      netEV,
      roi,
      slotPayouts
    };
  }

  /**
   * Automatically finds the OPTIMAL bet strategy for a given chip budget (e.g. 10 chips)
   * that maximizes Expected Value after applying board modifiers and card effects!
   */
  static findOptimalBets(
    wheel: WheelConfig,
    boardMods: BoardModifiers,
    activePlayedCards: Card[] = [],
    chipBudget: number = 10
  ): { optimalBets: Bet[]; strategyName: string; maxEVResult: EVResult } {
    const candidateBetsList: Array<{ name: string; bets: Bet[] }> = [
      { name: `🔴 Max Red (${chipBudget} chips)`, bets: [{ type: 'red', amount: chipBudget }] },
      { name: `🖤 Max Black (${chipBudget} chips)`, bets: [{ type: 'black', amount: chipBudget }] },
      { name: `🟢 Max Green (${chipBudget} chips)`, bets: [{ type: 'green', amount: chipBudget }] },
      { name: `⚡ Odd Numbers (${chipBudget} chips)`, bets: [{ type: 'odd', amount: chipBudget }] },
      { name: `⚡ Even Numbers (${chipBudget} chips)`, bets: [{ type: 'even', amount: chipBudget }] },
      { name: `🏆 Gold Slots (${chipBudget} chips)`, bets: [{ type: 'gold', amount: chipBudget }] },
      { name: `💜 Purple Slots (${chipBudget} chips)`, bets: [{ type: 'purple', amount: chipBudget }] },
      { name: `💎 Cyan Slots (${chipBudget} chips)`, bets: [{ type: 'cyan', amount: chipBudget }] },
      { name: `🩸 Crimson Slots (${chipBudget} chips)`, bets: [{ type: 'crimson', amount: chipBudget }] }
    ];

    const keyNumbers = [0, 7, 11, 13, 21, 6, 16, 26, 32];
    keyNumbers.forEach(n => {
      if (wheel.numbers.includes(n)) {
        candidateBetsList.push({
          name: `🎯 Straight Number #${n} (${chipBudget} chips)`,
          bets: [{ type: 'number', numberValue: n, amount: chipBudget }]
        });
      }
    });

    let maxEV = -Infinity;
    let bestStrategy = candidateBetsList[0];
    let bestEVResult = this.calculateEV(bestStrategy.bets, wheel, boardMods, activePlayedCards);

    candidateBetsList.forEach(candidate => {
      const res = this.calculateEV(candidate.bets, wheel, boardMods, activePlayedCards);
      if (res.ev > maxEV) {
        maxEV = res.ev;
        bestStrategy = candidate;
        bestEVResult = res;
      }
    });

    return {
      optimalBets: bestStrategy.bets,
      strategyName: bestStrategy.name,
      maxEVResult: bestEVResult
    };
  }

  /**
   * Evaluates the EV impact of playing a specific card.
   * If useOptimalPlay is true, it automatically determines the optimal betting strategy for the card!
   */
  static evaluateCard(
    card: Card,
    userBets: Bet[],
    wheel: WheelConfig,
    baseBoardMods: BoardModifiers,
    sampleRunState?: RunState,
    useOptimalPlay: boolean = true
  ): CardEVAnalysis {
    const chipBudget = userBets.reduce((sum, b) => sum + b.amount, 0) || 10;
    const baseline = this.calculateEV(userBets, wheel, baseBoardMods);

    const testBoardMods: BoardModifiers = JSON.parse(JSON.stringify(baseBoardMods));
    const testWheel: WheelConfig = JSON.parse(JSON.stringify(wheel));
    const testBets: Bet[] = JSON.parse(JSON.stringify(userBets));

    const dummyRunState: RunState = sampleRunState || {
      hp: 100,
      maxHp: 100,
      chips: 50,
      deck: [],
      relics: [],
      currentFloor: 1,
      mapNodes: [],
      currentNodeId: null,
      gameState: 'COMBAT',
      selectedWheelId: wheel.id,
      playerWheel: testWheel
    };

    const dummyBattleState: BattleState = {
      enemy: {
        id: 'training_dummy',
        name: 'Training Dummy',
        maxHp: 100,
        hp: 100,
        intent: { type: 'attack', value: 5, description: 'Attacks for 5' },
        patternIndex: 0,
        spriteName: 'dummy',
        isBoss: false
      },
      turn: 1,
      chipsPool: 50,
      hand: [card],
      drawPile: [],
      discardPile: [],
      bets: testBets,
      drawsThisTurn: 0,
      playerWheel: testWheel,
      enemyWheel: testWheel,
      lastSpinResult: null,
      physicsModifiers: {
        spinSpeed: 1,
        ballMass: 1,
        friction: 1,
        bounceRandomness: 0.1,
        wheelTilt: 0,
        targetZoneBias: 0,
        predictionSize: 0,
        nudgeCheatActive: false
      },
      boardModifiers: testBoardMods,
      phase: 'betting',
      activeWheelOwner: 'player',
      activePlayedCards: [card]
    };

    try {
      CardHandler.applyEffect(card, dummyRunState, dummyBattleState);
    } catch (e) {
      console.warn(`Card effect evaluation error for ${card.name}:`, e);
    }

    const cost = card.cost;
    let finalBets = dummyBattleState.bets;
    let optimalStrategyName = 'Custom Bets';

    if (useOptimalPlay) {
      const opt = this.findOptimalBets(
        dummyBattleState.playerWheel,
        dummyBattleState.boardModifiers,
        dummyBattleState.activePlayedCards || [card],
        chipBudget
      );
      finalBets = opt.optimalBets;
      optimalStrategyName = opt.strategyName;
    }

    const modified = this.calculateEV(
      finalBets,
      dummyBattleState.playerWheel,
      dummyBattleState.boardModifiers,
      dummyBattleState.activePlayedCards || [card]
    );

    const deltaEV = modified.ev - baseline.ev;
    const efficiency = cost > 0 ? deltaEV / cost : deltaEV;

    // Rarity-weighted expected value thresholds
    const rarityScale: Record<string, { minTarget: number; maxTarget: number }> = {
      common: { minTarget: 2.5, maxTarget: 10.0 },
      uncommon: { minTarget: 6.0, maxTarget: 22.0 },
      rare: { minTarget: 12.0, maxTarget: 45.0 },
      legendary: { minTarget: 25.0, maxTarget: 120.0 }
    };

    const target = rarityScale[card.rarity || 'common'] || rarityScale.common;
    const targetMid = (target.minTarget + target.maxTarget) / 2;

    // Auto-calculate suggested cost adjustment to reach ideal efficiency
    let suggestedCost = card.cost;
    if (deltaEV > 0) {
      suggestedCost = Math.max(1, Math.min(5, Math.round(deltaEV / targetMid)));
    }

    let balanceRating: 'OVERPOWERED' | 'BALANCED' | 'UNDERPOWERED' | 'DEAD' | 'PHYSICS_DEPENDENT' = 'BALANCED';
    let recommendation = '';
    let suggestedAdjustment = `Keep cost at ${card.cost}⚡ (Card is balanced)`;

    if (card.type === 'physics') {
      balanceRating = 'PHYSICS_DEPENDENT';
      recommendation = `Physics modifier (${card.rarity}). Evaluated via Monte Carlo Physics Simulator. Optimal Strategy: ${optimalStrategyName}.`;
      suggestedAdjustment = `Evaluate physics trajectories in simulator.`;
    } else if (deltaEV <= 0 && cost > 0) {
      balanceRating = 'DEAD';
      recommendation = `Card costs ${cost}⚡ but yields zero or negative net EV gain (+${deltaEV.toFixed(1)} EV). Needs buff.`;
      suggestedAdjustment = `Reduce cost to 1⚡ or increase effect multiplier.`;
    } else if (efficiency > target.maxTarget) {
      balanceRating = 'OVERPOWERED';
      recommendation = `Exceeds target efficiency for ${card.rarity.toUpperCase()} rarity under ${optimalStrategyName} (+${deltaEV.toFixed(1)} EV for ${cost}⚡ cost, ${efficiency.toFixed(1)} EV/cost vs max target ${target.maxTarget}).`;
      suggestedAdjustment = `Increase cost from ${cost}⚡ to ${suggestedCost}⚡`;
    } else if (efficiency < target.minTarget && cost >= 1) {
      balanceRating = 'UNDERPOWERED';
      recommendation = `Below target efficiency for ${card.rarity.toUpperCase()} rarity under ${optimalStrategyName} (+${deltaEV.toFixed(1)} EV for ${cost}⚡ cost, ${efficiency.toFixed(1)} EV/cost vs min target ${target.minTarget}).`;
      suggestedAdjustment = `Reduce cost from ${cost}⚡ to ${suggestedCost}⚡ (or boost multiplier)`;
    } else {
      balanceRating = 'BALANCED';
      recommendation = `Well balanced for ${card.rarity.toUpperCase()} rarity under ${optimalStrategyName} (+${deltaEV.toFixed(1)} EV for ${cost}⚡ cost, ${efficiency.toFixed(1)} EV/cost, target range ${target.minTarget}-${target.maxTarget}).`;
    }

    return {
      card,
      baseline,
      modified,
      optimalBets: finalBets,
      optimalStrategyName,
      deltaEV,
      efficiency,
      cost,
      suggestedCost,
      suggestedAdjustment,
      balanceRating,
      recommendation
    };
  }
}
