import { RunState, BattleState, GameState, Enemy, Card, MapNode, Bet, PhysicsModifiers, BoardModifiers, EnemyActionType, EnemyIntent, WheelConfig } from './Types';
import { createStarterDeck, getCardById, CARD_DATABASE, getRandomCardId } from '../cards/CardDatabase';
import { MapGenerator } from '../map/MapGenerator';
import { getSlotColor, RoulettePhysics } from '../physics/RoulettePhysics';
import { CardHandler } from '../cards/CardHandler';
import { WHEEL_TEMPLATES, BOARD_UPGRADES, applyBoardUpgrade, initializeWheelColors, WHEEL_NUMBERS } from './WheelUpgrades';

// Define initial settings
const BASE_MAX_HP = 80;
const INITIAL_CHIPS = 20;

export class GameEngine {
  runState: RunState;
  battleState: BattleState | null = null;
  playerPhysics: RoulettePhysics;
  enemyPhysics: RoulettePhysics;

  get physics(): RoulettePhysics {
    return this.getActivePhysics();
  }
  
  constructor() {
    this.playerPhysics = new RoulettePhysics();
    this.enemyPhysics = new RoulettePhysics();
    this.runState = this.getInitialRunState();
  }

  getInitialRunState(): RunState {
    const map = MapGenerator.generateMap(7, 3);
    return {
      hp: BASE_MAX_HP,
      maxHp: BASE_MAX_HP,
      chips: INITIAL_CHIPS,
      deck: createStarterDeck(),
      relics: [],
      currentFloor: 0,
      mapNodes: map,
      currentNodeId: null,
      gameState: 'MENU',
      selectedWheelId: 'classic',
      playerWheel: JSON.parse(JSON.stringify(WHEEL_TEMPLATES.classic))
    };
  }

  startNewRun() {
    this.runState = this.getInitialRunState();
    this.runState.gameState = 'WHEEL_SELECT';
    this.battleState = null;
  }

  selectNode(nodeId: string) {
    // Find node in current floor
    const floor = this.runState.currentFloor;
    const floorNodes = this.runState.mapNodes[floor];
    const node = floorNodes.find(n => n.id === nodeId);
    
    if (!node) return;
    
    // Check connection validity
    if (this.runState.currentNodeId !== null) {
      // Find current node
      let foundConnection = false;
      for (const floorList of this.runState.mapNodes) {
        const curr = floorList.find(n => n.id === this.runState.currentNodeId);
        if (curr && curr.connections.includes(nodeId)) {
          foundConnection = true;
          break;
        }
      }
      if (!foundConnection) return; // Invalid transition
    }

    this.runState.currentNodeId = nodeId;
    
    // Transition based on node type
    if (node.type === 'combat' || node.type === 'elite' || node.type === 'boss') {
      this.initCombat(node.type);
    } else if (node.type === 'shop') {
      this.runState.gameState = 'SHOP';
    } else if (node.type === 'event') {
      this.runState.gameState = 'EVENT';
    }
  }

  // --- COMBAT SYSTEM ---

  private initCombat(type: 'combat' | 'elite' | 'boss') {
    let enemyName = 'Dread Gambler';
    let maxHp = 45;
    let spriteName = 'gambler';
    
    if (type === 'combat') {
      const roll = Math.random();
      if (roll < 0.33) {
        enemyName = 'Decay Wheel';
        maxHp = 50;
        spriteName = 'decay_wheel';
      } else if (roll < 0.66) {
        enemyName = 'Grave Croupier';
        maxHp = 40;
        spriteName = 'croupier';
      } else {
        enemyName = 'Blood Wraith';
        maxHp = 60;
        spriteName = 'wraith';
      }
    } else if (type === 'elite') {
      enemyName = "The Dealer's Claw";
      maxHp = 95;
      spriteName = 'dealer_claw';
    } else if (type === 'boss') {
      enemyName = 'THE HOUSE';
      maxHp = 220;
      spriteName = 'the_house';
    }

    const enemy: Enemy = {
      id: `enemy_${Date.now()}`,
      name: enemyName,
      maxHp,
      hp: maxHp,
      intent: { type: 'attack', value: 5, description: 'Prepare to strike (5 damage)' },
      patternIndex: 0,
      spriteName,
      isBoss: type === 'boss'
    };

    // Prepare card piles
    const drawPile = [...this.runState.deck];
    this.shuffle(drawPile);

    const defaultPhysics: PhysicsModifiers = {
      spinSpeed: 1.0,
      ballMass: 1.0,
      friction: 1.0,
      bounceRandomness: 0.1,
      wheelTilt: 0,
      targetZoneBias: 0,
      predictionSize: 0,
      nudgeCheatActive: false
    };

    const defaultBoard: BoardModifiers = {
      extraGreenSlots: 0,
      convertNumbersToRed: [],
      convertNumbersToBlack: [],
      payoutMultipliers: {
        red: 2.0,
        black: 2.0,
        green: 14.0,
        number: 36.0,
        odd: 2.0,
        even: 2.0
      }
    };

    // Determine enemy wheel configuration
    let enemyWheel: WheelConfig;
    if (type === 'boss') {
      const houseNumbers = [...WHEEL_NUMBERS];
      for (let n = 37; n <= 49; n++) houseNumbers.push(n);
      enemyWheel = {
        id: 'house_wheel',
        name: 'The Doomed House Wheel',
        description: 'A massive 50-slot wheel of pure despair.',
        numbers: houseNumbers,
        greenNumbers: [0, 13, 26, 39],
        colors: {},
        payoutMultipliers: { red: 2, black: 2, green: 10, number: 50, odd: 2, even: 2 },
        upgrades: []
      };
      initializeWheelColors(enemyWheel);
    } else if (type === 'elite') {
      enemyWheel = {
        id: 'elite_wheel',
        name: 'Claw Wheel',
        description: 'An elite 3-green slot wheel.',
        numbers: WHEEL_NUMBERS,
        greenNumbers: [0, 17, 34],
        colors: {},
        payoutMultipliers: { red: 2, black: 2, green: 12, number: 36, odd: 2, even: 2 },
        upgrades: []
      };
      initializeWheelColors(enemyWheel);
    } else {
      if (spriteName === 'decay_wheel') {
        enemyWheel = JSON.parse(JSON.stringify(WHEEL_TEMPLATES.dozen));
        enemyWheel.name = "The Decayed Dozen";
        enemyWheel.description = "A rusty, unstable 13-slot wheel.";
      } else if (spriteName === 'wraith') {
        enemyWheel = JSON.parse(JSON.stringify(WHEEL_TEMPLATES.crimson));
        enemyWheel.name = "The Wraith Reservoir";
        enemyWheel.description = "A blood-soaked wheel favoring red slots.";
      } else if (spriteName === 'croupier') {
        enemyWheel = JSON.parse(JSON.stringify(WHEEL_TEMPLATES.void));
        enemyWheel.name = "The Grave Gateway";
        enemyWheel.description = "A dark wheel with multiple green slots.";
      } else {
        enemyWheel = JSON.parse(JSON.stringify(WHEEL_TEMPLATES.classic));
      }
    }

    // Generate initial spin seeds
    const spinSeedAngle = Math.random() * Math.PI * 2;
    const ballSeedAngle = Math.random() * Math.PI * 2;
    const spinSeedSpeed = 2.0 + Math.random() * 1.5;
    const ballSeedSpeed = -10.0 - Math.random() * 5.0;

    this.battleState = {
      enemy,
      turn: 1,
      chipsPool: 10, // Starting chips for combat turn 1
      hand: [],
      drawPile,
      discardPile: [],
      bets: [],
      lastSpinResult: null,
      playerWheel: JSON.parse(JSON.stringify(this.runState.playerWheel)),
      enemyWheel,
      physicsModifiers: defaultPhysics,
      boardModifiers: defaultBoard,
      phase: 'betting',
      activeWheelOwner: 'player',
      playerBlock: 0,
      predictionSector: [],
      spinSeedAngle,
      ballSeedAngle,
      spinSeedSpeed,
      ballSeedSpeed,
      drawsThisTurn: 0
    };

    // Reset physics engines with initial modifiers
    this.playerPhysics.reset(this.battleState!.playerWheel, defaultPhysics);
    this.enemyPhysics.reset(this.battleState!.enemyWheel, defaultPhysics);

    this.runState.gameState = 'COMBAT';
    this.updateEnemyIntent();
    
    // Starting hand: draw 2 cards
    this.drawCard();
    this.drawCard();

    this.createTurnStartBackup();
  }

  private shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  drawCard(): boolean {
    if (!this.battleState) return false;
    
    if (this.battleState.drawPile.length === 0) {
      // Reshuffle discard into draw
      this.battleState.drawPile = [...this.battleState.discardPile];
      this.shuffle(this.battleState.drawPile);
      this.battleState.discardPile = [];
    }

    if (this.battleState.drawPile.length > 0 && this.battleState.hand.length < 8) {
      const card = this.battleState.drawPile.pop()!;
      this.battleState.hand.push(card);
      return true;
    }
    return false;
  }

  getDrawCardCost(): number {
    if (!this.battleState) return 0;
    const draws = this.battleState.drawsThisTurn || 0;
    if (draws === 0) return 0;
    if (draws === 1) return 3;
    if (draws === 2) return 5;
    if (draws === 3) return 7;
    return 9;
  }

  // Buy a card draw. First draw is free, subsequent draws cost more.
  buyCardDraw(): boolean {
    if (!this.battleState) return false;
    if (this.battleState.phase !== 'betting') return false;
    
    // Check if there are any cards left (draw + discard)
    if (this.battleState.drawPile.length === 0 && this.battleState.discardPile.length === 0) {
      return false; // No cards left to draw
    }
    // Hand size limit check
    if (this.battleState.hand.length >= 8) {
      return false;
    }
    
    const cost = this.getDrawCardCost();
    if (this.battleState.chipsPool < cost) return false;
    
    this.battleState.chipsPool -= cost;
    const success = this.drawCard();
    if (success) {
      this.battleState.drawsThisTurn = (this.battleState.drawsThisTurn || 0) + 1;
    } else {
      this.battleState.chipsPool += cost; // refund
    }
    return success;
  }

  placeBet(type: 'red' | 'black' | 'green' | 'number' | 'odd' | 'even', amount: number, numberValue?: number) {
    if (!this.battleState) return false;
    if (amount <= 0 || this.battleState.chipsPool < amount) return false;

    // Deduct chips from pool
    this.battleState.chipsPool -= amount;

    // Check if matching bet exists, merge if so
    const existing = this.battleState.bets.find(b => 
      b.type === type && (type !== 'number' || b.numberValue === numberValue)
    );

    if (existing) {
      existing.amount += amount;
    } else {
      this.battleState.bets.push({ type, amount, numberValue });
    }

    return true;
  }

  clearBets() {
    if (!this.battleState) return;
    // Refund chips
    const totalRefund = this.battleState.bets.reduce((sum, b) => sum + b.amount, 0);
    this.battleState.chipsPool += totalRefund;
    this.battleState.bets = [];
  }

  // Collects all winning numbers based on current bets and wheel state
  private getWinningNumbers(activeWheel: WheelConfig): number[] {
    if (!this.battleState) return [];
    const winningNumbers: number[] = [];
    
    this.battleState.bets.forEach(bet => {
      if (bet.type === 'number' && bet.numberValue !== undefined) {
        winningNumbers.push(bet.numberValue);
      } else if (bet.type === 'green') {
        activeWheel.greenNumbers.forEach(n => winningNumbers.push(n));
      } else if (bet.type === 'red') {
        activeWheel.numbers.forEach(num => {
          if (getSlotColor(num, activeWheel, this.battleState!.boardModifiers) === 'red') {
            winningNumbers.push(num);
          }
        });
      } else if (bet.type === 'black') {
        activeWheel.numbers.forEach(num => {
          if (getSlotColor(num, activeWheel, this.battleState!.boardModifiers) === 'black') {
            winningNumbers.push(num);
          }
        });
      } else if (bet.type === 'odd') {
        activeWheel.numbers.forEach(num => {
          if (!activeWheel.greenNumbers.includes(num) && num % 2 !== 0) {
            winningNumbers.push(num);
          }
        });
      } else if (bet.type === 'even') {
        activeWheel.numbers.forEach(num => {
          if (!activeWheel.greenNumbers.includes(num) && num % 2 === 0) {
            winningNumbers.push(num);
          }
        });
      }
    });
    return winningNumbers;
  }

  // Runs a deterministic background physics simulation to predict the landing slot
  private runPredictionDryRun(activeWheel: WheelConfig, winningNumbers: number[]): number[] {
    if (!this.battleState) return [];
    const predSize = this.battleState.physicsModifiers.predictionSize;
    if (predSize <= 0) return [];

    // Create a throwaway physics instance with the same seeds
    const dryRunPhysics = new RoulettePhysics();
    dryRunPhysics.reset(
      activeWheel,
      this.battleState.physicsModifiers,
      winningNumbers,
      this.battleState.spinSeedAngle,
      this.battleState.ballSeedAngle,
      this.battleState.spinSeedSpeed,
      this.battleState.ballSeedSpeed,
      this.battleState.boardModifiers
    );

    // Simulate at 120Hz until settled (max 60 seconds of sim time)
    const fixedStep = 1 / 120;
    const maxSteps = 60 * 120;
    for (let i = 0; i < maxSteps; i++) {
      dryRunPhysics.update(fixedStep);
      if (dryRunPhysics.isSettled) break;
    }

    if (!dryRunPhysics.isSettled) return [];

    const landedIdx = dryRunPhysics.settledSlotIndex;
    const totalSlots = activeWheel.numbers.length;
    const sector: number[] = [];

    // Build the prediction sector: center slot ± half of predSize
    const halfSpread = Math.floor(predSize / 2);
    for (let offset = -halfSpread; offset <= halfSpread; offset++) {
      const idx = ((landedIdx + offset) % totalSlots + totalSlots) % totalSlots;
      sector.push(activeWheel.numbers[idx]);
    }

    return sector;
  }

  // Prepares the physics spin based on active bets (handles magnetic Lodestone cheat bias)
  spinWheel() {
    if (!this.battleState) return null;
    this.battleState.phase = 'spinning';
    
    const activeWheel = (this.battleState as any).activeWheelOwner === 'enemy' ? this.battleState.enemyWheel : this.battleState.playerWheel;
    const winningNumbers = this.getWinningNumbers(activeWheel);

    // Run prediction dry-run BEFORE the actual spin (uses same seeds)
    if (this.battleState.physicsModifiers.predictionSize > 0) {
      this.battleState.predictionSector = this.runPredictionDryRun(activeWheel, winningNumbers);
    } else {
      this.battleState.predictionSector = [];
    }

    // Reset correct physics engine with current turn modifiers and SAME seeds
    const activePhysics = this.getActivePhysics();
    activePhysics.reset(
      activeWheel,
      this.battleState.physicsModifiers,
      winningNumbers,
      this.battleState.spinSeedAngle,
      this.battleState.ballSeedAngle,
      this.battleState.spinSeedSpeed,
      this.battleState.ballSeedSpeed,
      this.battleState.boardModifiers
    );

    return activePhysics;
  }

  // Evaluates the result once physics settles
  resolveSpin() {
    if (!this.battleState) return;
    this.battleState.phase = 'resolved';
    
    let winningNum = this.playerPhysics.getWinningNumber();
    if (winningNum < 0) return; // Physics not settled!

    const activeWheel = this.battleState.playerWheel;
    const boardModifiers = this.battleState.boardModifiers;
    const hasLuckyCharm = this.battleState.activePlayedCards?.some(c => c.effectId === 'LUCKY_CHARM');
    
    let color = getSlotColor(winningNum, activeWheel, boardModifiers);
    let damageDealt = this.calculateSpinDamage(winningNum, color);

    // 1. LUCKY CHARM reroll logic (100% chance to reroll if damage is 0)
    if (damageDealt === 0 && hasLuckyCharm) {
      const numberBets = this.battleState.bets.filter(b => b.type === 'number');
      if (numberBets.length > 0) {
        winningNum = numberBets[Math.floor(Math.random() * numberBets.length)].numberValue!;
      } else {
        winningNum = activeWheel.numbers[Math.floor(Math.random() * activeWheel.numbers.length)];
      }
      this.playerPhysics.settledSlotIndex = activeWheel.numbers.indexOf(winningNum);
      color = getSlotColor(winningNum, activeWheel, boardModifiers);
      damageDealt = this.calculateSpinDamage(winningNum, color);
    }

    // Apply lucky number checks (Sinner's Seven)
    if (activeWheel.upgrades.includes('lucky_seven') && winningNum === 7) {
      this.runState.hp = Math.min(this.runState.maxHp, this.runState.hp + 6);
    }

    // 2. Apply Zone and Slot Triggers
    if (boardModifiers.chipMines && boardModifiers.chipMines[winningNum] !== undefined) {
      this.battleState.chipsPool += boardModifiers.chipMines[winningNum];
    }
    if (boardModifiers.lifeFountains && boardModifiers.lifeFountains[winningNum] !== undefined) {
      this.runState.hp = Math.min(this.runState.maxHp, this.runState.hp + boardModifiers.lifeFountains[winningNum]);
    }
    if (boardModifiers.shieldGenerators && boardModifiers.shieldGenerators[winningNum] !== undefined) {
      this.battleState.playerBlock += boardModifiers.shieldGenerators[winningNum];
    }
    if (boardModifiers.dangerZones && boardModifiers.dangerZones[winningNum] !== undefined) {
      this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - boardModifiers.dangerZones[winningNum]);
    }
    if (boardModifiers.cursedZones && boardModifiers.cursedZones.includes(winningNum)) {
      boardModifiers.enemyStunTurns = (boardModifiers.enemyStunTurns || 0) + 2;
    }

    // Apply damage to enemy
    this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - damageDealt);

    // Apply Stun Strike check
    const hasStunStrike = this.battleState.activePlayedCards?.some(c => c.effectId === 'STUN_STRIKE');
    if (hasStunStrike && damageDealt >= 5) {
      boardModifiers.enemyStunTurns = (boardModifiers.enemyStunTurns || 0) + 2;
    }

    // 3. Insurance Policy Refund Check
    if (boardModifiers.insuranceActive) {
      if (damageDealt === 0) {
        let refund = 0;
        this.battleState.bets.forEach(b => refund += b.amount);
        this.battleState.chipsPool += refund;
      }
      boardModifiers.insuranceActive = false;
    }

    // 4. Streak Tracking
    if (boardModifiers.redStreakActive || boardModifiers.blackStreakActive) {
      if (color === 'red') {
        boardModifiers.redStreakCount = (boardModifiers.redStreakCount || 0) + 1;
        boardModifiers.blackStreakCount = 0;
      } else if (color === 'black') {
        boardModifiers.blackStreakCount = (boardModifiers.blackStreakCount || 0) + 1;
        boardModifiers.redStreakCount = 0;
      } else {
        boardModifiers.redStreakCount = 0;
        boardModifiers.blackStreakCount = 0;
      }
    }

    // Record results
    this.battleState.lastSpinResult = {
      number: winningNum,
      color,
      damageDealt,
      playerDamageTaken: 0,
      betsEvaluated: this.battleState.bets.map(b => ({ ...b })),
      cardsActive: [...(this.battleState.activePlayedCards || [])]
    };

    // Discard played bets (they are consumed/gone)
    this.battleState.bets = [];
  }

  private calculateSpinDamage(winningNum: number, color: 'red' | 'black' | 'green'): number {
    if (!this.battleState) return 0;
    const activeWheel = this.battleState.playerWheel;
    const boardModifiers = this.battleState.boardModifiers;
    const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];

    const dozenMultipliers = boardModifiers.dozenMultipliers || {};
    const columnMultipliers = boardModifiers.columnMultipliers || {};
    const customNumberMultipliers = boardModifiers.customNumberMultipliers || {};
    const luckyZones = boardModifiers.luckyZones || [];
    const goldFoils = boardModifiers.goldFoils || [];
    const copperPlates = boardModifiers.copperPlates || [];
    const mirrorSlots = boardModifiers.mirrorSlots || {};

    let damageDealt = 0;

    this.battleState.bets.forEach(bet => {
      let isWin = false;
      let multiplier = 0;

      if (bet.type === 'red' && color === 'red') {
        isWin = true;
        multiplier = activeWheel.payoutMultipliers.red;
      } else if (bet.type === 'black' && color === 'black') {
        isWin = true;
        multiplier = activeWheel.payoutMultipliers.black;
      } else if (bet.type === 'green') {
        const isGreenSlot = activeWheel.greenNumbers.includes(winningNum) || 
                            (boardModifiers.extraGreenSlots && boardModifiers.extraGreenSlots > 0 && winningNum === 32) ||
                            (boardModifiers.extraGreenSlots && boardModifiers.extraGreenSlots > 1 && (winningNum === 11 || winningNum === 22)) ||
                            (boardModifiers.extraGreenSlots && boardModifiers.extraGreenSlots > 3 && (winningNum === 5 || winningNum === 17 || winningNum === 29)) ||
                            ((boardModifiers as any).emeraldForestActive && PRIMES.includes(winningNum));
        if (isGreenSlot) {
          isWin = true;
          let greenMult = activeWheel.payoutMultipliers.green;
          if ((boardModifiers as any).emeraldForestActive) {
            greenMult *= 2;
          }
          multiplier = greenMult;
          
          const hasGreenRipple = this.battleState?.activePlayedCards?.some(c => c.effectId === 'GREEN_RIPPLE');
          if (hasGreenRipple) {
            const greenSlotsCount = activeWheel.greenNumbers.length + (boardModifiers.extraGreenSlots || 0);
            multiplier += 5 * greenSlotsCount;
          }
        }
      } else if (bet.type === 'number' && (bet.numberValue === winningNum || mirrorSlots[winningNum] === bet.numberValue)) {
        isWin = true;
        multiplier = customNumberMultipliers[winningNum] || activeWheel.payoutMultipliers.number;
        
        const hasSplitBets = this.battleState?.activePlayedCards?.some(c => c.effectId === 'SPLIT_BETS');
        if (hasSplitBets) {
          multiplier += 2;
        }
      } else if (bet.type === 'odd' && !activeWheel.greenNumbers.includes(winningNum) && winningNum % 2 !== 0) {
        isWin = true;
        multiplier = activeWheel.payoutMultipliers.odd;
      } else if (bet.type === 'even' && !activeWheel.greenNumbers.includes(winningNum) && winningNum % 2 === 0) {
        isWin = true;
        multiplier = activeWheel.payoutMultipliers.even;
      }

      if (isWin) {
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
        if (goldFoils.includes(winningNum)) {
          baseDamage *= 10.0;
        }
        if (copperPlates.includes(winningNum)) {
          baseDamage *= 1.5;
        }

        damageDealt += baseDamage;
      }
    });

    if (boardModifiers.doubleNextPayout && damageDealt > 0) {
      damageDealt *= 2;
      boardModifiers.doubleNextPayout = false;
    }

    if (boardModifiers.redStreakActive && color === 'red' && boardModifiers.redStreakCount) {
      const mult = Math.min(4.0, 1.0 + boardModifiers.redStreakCount * 0.5);
      damageDealt *= mult;
    }
    if (boardModifiers.blackStreakActive && color === 'black' && boardModifiers.blackStreakCount) {
      const mult = Math.min(4.0, 1.0 + boardModifiers.blackStreakCount * 0.5);
      damageDealt *= mult;
    }

    if (boardModifiers.globalMultiplier !== undefined) {
      damageDealt *= boardModifiers.globalMultiplier;
    }

    const hasTurboSpin = this.battleState?.activePlayedCards?.some(c => c.effectId === 'TURBO_SPIN');
    if (hasTurboSpin) {
      damageDealt *= 1.5;
    }

    if ((boardModifiers as any).omniscienceDamageMult !== undefined && this.battleState.predictionSector && this.battleState.predictionSector.includes(winningNum)) {
      damageDealt *= (boardModifiers as any).omniscienceDamageMult;
    }

    return Math.floor(damageDealt);
  }

  // Evaluates enemy spin results
  resolveEnemySpin() {
    if (!this.battleState) return;
    this.battleState.phase = 'resolved';
    
    const winningNum = this.enemyPhysics.getWinningNumber();
    if (winningNum < 0) return; // Physics not settled!

    const activeWheel = this.battleState.enemyWheel;
    const color = getSlotColor(winningNum, activeWheel, this.battleState.boardModifiers);
    let isWin = false;

    // Check if the enemy's bet matches the settled slot
    this.battleState.bets.forEach(bet => {
      if (bet.type === 'red' && color === 'red') {
        isWin = true;
      } else if (bet.type === 'black' && color === 'black') {
        isWin = true;
      } else if (bet.type === 'green') {
        const isGreenSlot = activeWheel.greenNumbers.includes(winningNum);
        if (isGreenSlot) isWin = true;
      } else if (bet.type === 'number' && bet.numberValue === winningNum) {
        isWin = true;
      } else if (bet.type === 'odd' && !activeWheel.greenNumbers.includes(winningNum) && winningNum % 2 !== 0) {
        isWin = true;
      } else if (bet.type === 'even' && !activeWheel.greenNumbers.includes(winningNum) && winningNum % 2 === 0) {
        isWin = true;
      }
    });

    const intent = this.battleState.enemy.intent;
    let playerDamageTaken = 0;

    if (isWin) {
      if (intent.type === 'attack') {
        let incomingDmg = intent.value;
        
        // Apply block shield first
        if (this.battleState.playerBlock > 0) {
          const blocked = Math.min(this.battleState.playerBlock, incomingDmg);
          incomingDmg -= blocked;
          this.battleState.playerBlock -= blocked;
        }
        
        playerDamageTaken = incomingDmg;
        this.runState.hp = Math.max(0, this.runState.hp - playerDamageTaken);

        // Aegis Ward reflection check
        const hasAegisWard = this.battleState.activePlayedCards?.some(c => c.effectId === 'AEGIS_WARD');
        if (hasAegisWard) {
          this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - 4);
        }
      } else if (intent.type === 'steal_chips') {
        this.battleState.chipsPool = Math.max(0, this.battleState.chipsPool - intent.value);
      } else if (intent.type === 'physics_debuff') {
        this.battleState.physicsModifiers.friction *= 2.0;
      }
    }

    this.battleState.lastSpinResult = {
      number: winningNum,
      color,
      damageDealt: 0,
      playerDamageTaken,
      betsEvaluated: this.battleState.bets.map(b => ({ ...b })),
      cardsActive: [...(this.battleState.activePlayedCards || [])]
    };

    // Discard enemy bets
    this.battleState.bets = [];
  }

  // Executes enemy turn actions
  resolveEnemyTurn() {
    if (!this.battleState) return;
    if (this.battleState.enemy.hp <= 0) {
      this.handleCombatVictory();
      return;
    }

    // Check player death (damage is already applied in resolveEnemySpin)
    if (this.runState.hp <= 0) {
      this.runState.gameState = 'GAME_OVER';
      return;
    }

    // RETAIN hand cards across turns! Only discard activePlayedCards
    if (this.battleState.activePlayedCards) {
      this.battleState.discardPile.push(...this.battleState.activePlayedCards);
    }
    this.battleState.activePlayedCards = [];

    // Next turn prep
    this.battleState.turn += 1;
    let chipsGained = 8;
    if ((this.battleState.boardModifiers as any).riskCapitalActive) {
      chipsGained -= 2;
    }
    if ((this.battleState.boardModifiers as any).predictiveSightPlusActive) {
      chipsGained -= 2;
      (this.battleState.boardModifiers as any).predictiveSightPlusActive = false; // Reset penalty flag
    }
    this.battleState.chipsPool += Math.max(0, chipsGained); // Gain base 8 chips per turn (minus penalties)
    this.battleState.phase = 'betting';
    (this.battleState as any).activeWheelOwner = 'player';
    this.battleState.drawsThisTurn = 0;

    // Reset physics modifiers for next turn
    this.battleState.physicsModifiers = {
      spinSpeed: 1.0,
      ballMass: 1.0,
      friction: 1.0,
      bounceRandomness: 0.1,
      wheelTilt: 0,
      targetZoneBias: 0,
      predictionSize: 0,
      nudgeCheatActive: false
    };

    // Reset block and prediction for new turn
    this.battleState.playerBlock = 0;
    this.battleState.predictionSector = [];

    // Generate fresh spin seeds for next turn
    this.battleState.spinSeedAngle = Math.random() * Math.PI * 2;
    this.battleState.ballSeedAngle = Math.random() * Math.PI * 2;
    this.battleState.spinSeedSpeed = 2.0 + Math.random() * 1.5;
    this.battleState.ballSeedSpeed = -10.0 - Math.random() * 5.0;

    // Update intent
    this.updateEnemyIntent();
    
    // New deck system: NO auto-draw. Player must buy draws with chips.
    const drawNextCount = (this.battleState.boardModifiers as any).empPulseDrawNext || 0;
    if (drawNextCount > 0) {
      for (let i = 0; i < drawNextCount; i++) {
        this.drawCard();
      }
      (this.battleState.boardModifiers as any).empPulseDrawNext = 0;
    }

    this.createTurnStartBackup();
  }

  private updateEnemyIntent() {
    if (!this.battleState) return;
    const enemy = this.battleState.enemy;
    enemy.patternIndex = (enemy.patternIndex + 1) % 4;

    let intent: EnemyIntent;

    if (enemy.spriteName === 'decay_wheel') {
      // Decay Wheel Pattern
      const patterns: EnemyIntent[] = [
        { type: 'attack', value: 4, description: 'Spin slam (4 damage)' },
        { type: 'physics_debuff', value: 0, description: 'Rusting Gaze (Doubles friction next turn)' },
        { type: 'attack', value: 8, description: 'Heavy Slam (8 damage)' },
        { type: 'attack', value: 5, description: 'Grinding edge (5 damage)' }
      ];
      intent = patterns[enemy.patternIndex];
    } else if (enemy.spriteName === 'croupier') {
      // Croupier Pattern
      const patterns: EnemyIntent[] = [
        { type: 'steal_chips', value: 4, description: 'Rake chips (Steals 4 chips)' },
        { type: 'attack', value: 6, description: 'Card slice (6 damage)' },
        { type: 'attack', value: 8, description: 'Cold gaze (8 damage)' },
        { type: 'steal_chips', value: 3, description: 'Taxation (Steals 3 chips)' }
      ];
      intent = patterns[enemy.patternIndex];
    } else if (enemy.spriteName === 'wraith') {
      // Wraith Pattern
      const patterns: EnemyIntent[] = [
        { type: 'attack', value: 5, description: 'Shriek (5 damage)' },
        { type: 'attack', value: 10, description: 'Soul drain (10 damage)' },
        { type: 'attack', value: 5, description: 'Essence siphon (5 damage)' },
        { type: 'attack', value: 12, description: 'Nightmare strike (12 damage)' }
      ];
      intent = patterns[enemy.patternIndex];
    } else if (enemy.spriteName === 'dealer_claw') {
      // Elite: Dealer's Claw
      const patterns: EnemyIntent[] = [
        { type: 'attack', value: 9, description: 'Crush (9 damage)' },
        { type: 'steal_chips', value: 6, description: 'Greedy clutch (Steals 6 chips)' },
        { type: 'attack', value: 15, description: 'Guillotine (15 damage)' },
        { type: 'attack', value: 10, description: 'Rend (10 damage)' }
      ];
      intent = patterns[enemy.patternIndex];
    } else if (enemy.spriteName === 'the_house') {
      // Boss: The House
      const patterns: EnemyIntent[] = [
        { type: 'attack', value: 12, description: 'Roof collapse (12 damage)' },
        { type: 'steal_chips', value: 8, description: 'Bankruptcy (Steals 8 chips)' },
        { type: 'attack', value: 20, description: 'Crushing Debt (20 damage)' },
        { type: 'physics_debuff', value: 0, description: 'Earthquake (Doubles friction next turn)' }
      ];
      intent = patterns[enemy.patternIndex];
    } else {
      // Default Gambler
      const patterns: EnemyIntent[] = [
        { type: 'attack', value: 5, description: 'Slash (5 damage)' },
        { type: 'attack', value: 7, description: 'Gamble slash (7 damage)' },
        { type: 'attack', value: 4, description: 'Weak poke (4 damage)' },
        { type: 'attack', value: 8, description: 'Heavy smash (8 damage)' }
      ];
      intent = patterns[enemy.patternIndex];
    }

    enemy.intent = { ...intent };
  }

  private handleCombatVictory() {
    if (!this.battleState) return;

    // Set current node as completed
    const floor = this.runState.currentFloor;
    const floorNodes = this.runState.mapNodes[floor];
    const node = floorNodes.find(n => n.id === this.runState.currentNodeId);
    if (node) node.completed = true;

    // Gain chips reward (e.g. 10 chips base + random bonus)
    const chipsReward = 15 + Math.floor(Math.random() * 8);
    this.runState.chips += chipsReward;

    // Progress floor
    this.runState.currentFloor += 1;

    if (this.runState.currentFloor >= this.runState.mapNodes.length) {
      this.runState.gameState = 'VICTORY';
    } else {
      // Offer card reward phase
      this.runState.gameState = 'MAP';
    }

    this.battleState = null;
  }

  createTurnStartBackup() {
    if (!this.battleState) return;
    this.battleState.activePlayedCards = [];
    this.battleState.turnStartBackup = {
      chipsPool: this.battleState.chipsPool,
      hp: this.runState.hp,
      playerBlock: this.battleState.playerBlock,
      physicsModifiers: JSON.parse(JSON.stringify(this.battleState.physicsModifiers)),
      boardModifiers: JSON.parse(JSON.stringify(this.battleState.boardModifiers)),
      enemyIntent: JSON.parse(JSON.stringify(this.battleState.enemy.intent)),
      playerWheel: JSON.parse(JSON.stringify(this.battleState.playerWheel)),
      enemyWheel: JSON.parse(JSON.stringify(this.battleState.enemyWheel)),
      spinSeedAngle: this.battleState.spinSeedAngle,
      ballSeedAngle: this.battleState.ballSeedAngle,
      spinSeedSpeed: this.battleState.spinSeedSpeed,
      ballSeedSpeed: this.battleState.ballSeedSpeed
    };
  }

  reapplyActiveCards(): boolean {
    if (!this.battleState || !this.battleState.turnStartBackup) return false;
    
    const backup = this.battleState.turnStartBackup;
    
    // 1. Assign backup values
    this.battleState.chipsPool = backup.chipsPool;
    this.runState.hp = backup.hp;
    this.battleState.playerBlock = backup.playerBlock;
    this.battleState.physicsModifiers = JSON.parse(JSON.stringify(backup.physicsModifiers));
    this.battleState.boardModifiers = JSON.parse(JSON.stringify(backup.boardModifiers));
    this.battleState.enemy.intent = JSON.parse(JSON.stringify(backup.enemyIntent));
    this.battleState.playerWheel = JSON.parse(JSON.stringify(backup.playerWheel));
    this.battleState.enemyWheel = JSON.parse(JSON.stringify(backup.enemyWheel));
    
    // 2. Apply each card
    for (const card of this.battleState.activePlayedCards || []) {
      const success = CardHandler.applyEffect(card, this.runState, this.battleState);
      if (!success) {
        return false;
      }
    }
    
    // 3. Deduct placed bets
    const betsTotal = this.battleState.bets.reduce((sum, b) => sum + b.amount, 0);
    this.battleState.chipsPool -= betsTotal;
    
    // 4. Check if final chipsPool is negative
    if (this.battleState.chipsPool < 0) {
      return false;
    }
    
    return true;
  }

  playCard(cardId: string): boolean {
    if (!this.battleState || this.battleState.phase !== 'betting') return false;
    
    const cardIndex = this.battleState.hand.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return false;
    
    const card = this.battleState.hand[cardIndex];
    
    // Save current active cards, hand, and bets in case we need to roll back
    const prevActiveCards = [...(this.battleState.activePlayedCards || [])];
    const prevHand = [...this.battleState.hand];
    const prevBets = this.battleState.bets.map(b => ({ ...b }));
    const prevChipsPool = this.battleState.chipsPool;
    const prevHp = this.runState.hp;
    const prevPhysics = JSON.parse(JSON.stringify(this.battleState.physicsModifiers));
    const prevBoard = JSON.parse(JSON.stringify(this.battleState.boardModifiers));
    const prevIntent = JSON.parse(JSON.stringify(this.battleState.enemy.intent));
    
    // Move card from hand to activePlayedCards
    this.battleState.hand.splice(cardIndex, 1);
    if (!this.battleState.activePlayedCards) {
      this.battleState.activePlayedCards = [];
    }
    this.battleState.activePlayedCards.push(card);
    
    // Reapply all active cards
    const success = this.reapplyActiveCards();
    
    if (!success) {
      // Rollback
      this.battleState.activePlayedCards = prevActiveCards;
      this.battleState.hand = prevHand;
      this.battleState.bets = prevBets;
      this.battleState.chipsPool = prevChipsPool;
      this.runState.hp = prevHp;
      this.battleState.physicsModifiers = prevPhysics;
      this.battleState.boardModifiers = prevBoard;
      this.battleState.enemy.intent = prevIntent;
      return false;
    }
    
    return true;
  }

  removeCard(cardId: string): boolean {
    if (!this.battleState || this.battleState.phase !== 'betting') return false;
    if (!this.battleState.activePlayedCards) return false;
    
    const cardIndex = this.battleState.activePlayedCards.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return false;
    
    const card = this.battleState.activePlayedCards[cardIndex];
    
    // Save current state for rollback
    const prevActiveCards = [...this.battleState.activePlayedCards];
    const prevHand = [...this.battleState.hand];
    const prevBets = this.battleState.bets.map(b => ({ ...b }));
    const prevChipsPool = this.battleState.chipsPool;
    const prevHp = this.runState.hp;
    const prevPhysics = JSON.parse(JSON.stringify(this.battleState.physicsModifiers));
    const prevBoard = JSON.parse(JSON.stringify(this.battleState.boardModifiers));
    const prevIntent = JSON.parse(JSON.stringify(this.battleState.enemy.intent));
    
    // Move card from activePlayedCards to hand
    this.battleState.activePlayedCards.splice(cardIndex, 1);
    this.battleState.hand.push(card);
    
    // Reapply all active cards
    const success = this.reapplyActiveCards();
    
    if (!success) {
      // Rollback
      this.battleState.activePlayedCards = prevActiveCards;
      this.battleState.hand = prevHand;
      this.battleState.bets = prevBets;
      this.battleState.chipsPool = prevChipsPool;
      this.runState.hp = prevHp;
      this.battleState.physicsModifiers = prevPhysics;
      this.battleState.boardModifiers = prevBoard;
      this.battleState.enemy.intent = prevIntent;
      return false;
    }
    
    return true;
  }

  // --- SHOP AND EVENT INTERACTION ---

  buyCardInShop(cardId: string, cost: number) {
    if (this.runState.chips >= cost) {
      this.runState.chips -= cost;
      this.runState.deck.push(getCardById(cardId));
      return true;
    }
    return false;
  }

  healInShop(amount: number, cost: number) {
    if (this.runState.chips >= cost && this.runState.hp < this.runState.maxHp) {
      this.runState.chips -= cost;
      this.runState.hp = Math.min(this.runState.maxHp, this.runState.hp + amount);
      return true;
    }
    return false;
  }

  // --- DEV TOOLS CHEATS API ---

  devAddChips(amount: number) {
    this.runState.chips += amount;
    if (this.battleState) {
      this.battleState.chipsPool += amount;
    }
  }

  devAdjustHp(amount: number) {
    this.runState.hp = Math.max(0, Math.min(this.runState.maxHp, this.runState.hp + amount));
  }

  devDefeatEnemy() {
    if (this.battleState) {
      this.battleState.enemy.hp = 0;
      this.handleCombatVictory();
    }
  }

  devDamageEnemy(amount: number) {
    if (this.battleState) {
      this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - amount);
      if (this.battleState.enemy.hp === 0) {
        this.handleCombatVictory();
      }
    }
  }

  devSpawnCard(cardId: string) {
    if (this.battleState && this.battleState.hand.length < 6) {
      const card = getCardById(cardId);
      this.battleState.hand.push(card);
    }
  }

  devAddCardToDeck(cardId: string) {
    this.runState.deck.push(getCardById(cardId));
  }

  devTeleport(nodeType: 'combat' | 'elite' | 'boss' | 'shop' | 'event') {
    // Clear active combat if teleporting
    this.battleState = null;
    
    if (nodeType === 'combat' || nodeType === 'elite' || nodeType === 'boss') {
      this.initCombat(nodeType);
    } else if (nodeType === 'shop') {
      this.runState.gameState = 'SHOP';
    } else if (nodeType === 'event') {
      this.runState.gameState = 'EVENT';
    }
  }

  devSkipFloor() {
    this.runState.currentFloor += 1;
    this.runState.currentNodeId = null;
    this.battleState = null;
    
    if (this.runState.currentFloor >= this.runState.mapNodes.length) {
      this.runState.gameState = 'VICTORY';
    } else {
      this.runState.gameState = 'MAP';
    }
  }

  getActivePhysics(): RoulettePhysics {
    if (this.battleState && (this.battleState as any).activeWheelOwner === 'enemy') {
      return this.enemyPhysics;
    }
    return this.playerPhysics;
  }

  selectStartingWheel(wheelId: string): boolean {
    const template = WHEEL_TEMPLATES[wheelId];
    if (template) {
      this.runState.selectedWheelId = wheelId;
      this.runState.playerWheel = JSON.parse(JSON.stringify(template));
      if (wheelId === 'custom') {
        return true;
      }
      // Transition to deck draft instead of directly to map
      this.initDraft();
    }
    return false;
  }

  selectCustomWheel(customConfig: WheelConfig) {
    this.runState.selectedWheelId = 'custom';
    this.runState.playerWheel = customConfig;
    this.initDraft();
  }

  // --- DECK DRAFT SYSTEM ---

  initDraft() {
    this.runState.deck = []; // Start with empty deck

    // 1. Add 5 random Common cards to the starting deck
    const commonKeys = Object.keys(CARD_DATABASE).filter(k => CARD_DATABASE[k].rarity === 'common');
    for (let i = 0; i < 5; i++) {
      if (commonKeys.length > 0) {
        const randKey = commonKeys[Math.floor(Math.random() * commonKeys.length)];
        this.runState.deck.push(getCardById(randKey));
      }
    }

    // 2. Prepare 3 Rare cards for Pick 1
    const rareKeys = Object.keys(CARD_DATABASE).filter(k => CARD_DATABASE[k].rarity === 'rare');
    const shuffledRare = [...rareKeys];
    this.shuffle(shuffledRare);
    const rareChoices = shuffledRare.slice(0, 3).map(k => getCardById(k));

    // 3. Prepare 3 Uncommon cards for Pick 2
    const uncommonKeys = Object.keys(CARD_DATABASE).filter(k => CARD_DATABASE[k].rarity === 'uncommon');
    const shuffledUncommon = [...uncommonKeys];
    this.shuffle(shuffledUncommon);
    const uncommonChoices = shuffledUncommon.slice(0, 3).map(k => getCardById(k));

    // Combine into draft pile: [0, 1, 2] = Rare, [3, 4, 5] = Uncommon
    this.runState.draftPile = [...rareChoices, ...uncommonChoices];
    this.runState.draftProgress = 0;
    this.runState.gameState = 'DECK_DRAFT';
  }

  getDraftChoices(): Card[] {
    if (!this.runState.draftPile || this.runState.draftProgress === undefined) return [];
    if (this.runState.draftProgress >= 2) return [];
    const start = (this.runState.draftProgress) * 3;
    return this.runState.draftPile.slice(start, start + 3);
  }

  pickDraftCard(cardId: string): boolean {
    if (!this.runState.draftPile || this.runState.draftProgress === undefined) return false;
    if (this.runState.draftProgress >= 2) return false;
    
    const choices = this.getDraftChoices();
    const picked = choices.find(c => c.id === cardId);
    if (!picked) return false;
    
    this.runState.deck.push(picked);
    this.runState.draftProgress! += 1;
    
    return true;
  }

  completeDraft() {
    this.runState.draftPile = undefined;
    this.runState.draftProgress = undefined;
    this.runState.gameState = 'MAP';
  }

  // --- CARD CODEX ---

  static getAllCardTemplates(): { key: string; name: string; description: string; cost: number; type: string; rarity: string; effectId: string }[] {
    return Object.keys(CARD_DATABASE).map(key => {
      const card = CARD_DATABASE[key];
      return {
        key,
        name: card.name,
        description: card.description,
        cost: card.cost,
        type: card.type,
        rarity: card.rarity,
        effectId: card.effectId
      };
    });
  }

  buyBoardUpgrade(upgradeId: string): boolean {
    const upgrade = BOARD_UPGRADES[upgradeId];
    if (!upgrade) return false;
    
    if (this.runState.chips >= upgrade.cost) {
      this.runState.chips -= upgrade.cost;
      applyBoardUpgrade(this.runState.playerWheel, upgrade);
      return true;
    }
    return false;
  }
}
