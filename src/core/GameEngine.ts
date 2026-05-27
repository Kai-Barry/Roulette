import { RunState, BattleState, GameState, Enemy, Card, MapNode, Bet, PhysicsModifiers, BoardModifiers, EnemyActionType, EnemyIntent, WheelConfig, StoreItem, SlotColor, BetColor, ForgeCard } from './Types';
import { createStarterDeck, getCardById, CARD_DATABASE, getRandomCardId } from '../cards/CardDatabase';
import { MapGenerator } from '../map/MapGenerator';
import { getSlotColor, getBetColor, getEffectiveColor, getSlotEffect, RoulettePhysics } from '../physics/RoulettePhysics';
import { CardHandler } from '../cards/CardHandler';
import { WHEEL_TEMPLATES, BOARD_UPGRADES, applyBoardUpgrade, initializeWheelColors, WHEEL_NUMBERS, WHEEL_POOL, generateStoreWheels, getRandomCommonWheel, getAllWheels } from './WheelUpgrades';

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
      deck: [],
      relics: [],
      currentFloor: 0,
      mapNodes: map,
      currentNodeId: null,
      gameState: 'MENU',
      selectedWheelId: 'classic',
      playerWheel: JSON.parse(JSON.stringify(WHEEL_TEMPLATES.classic)),
      combatMode: 'points'
    };
  }

  startNewRun() {
    this.runState = this.getInitialRunState();
    this.battleState = null;
    this.initStore();
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
    } else if (node.type === 'forge') {
      this.runState.gameState = 'FORGE';
      this.initForge();
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

    let difficulty = 0.25;
    if (type === 'boss') difficulty = 1.0;
    else if (type === 'elite') difficulty = 0.85;
    else if (spriteName === 'wraith') difficulty = 0.7;
    else if (spriteName === 'croupier') difficulty = 0.5;

    const enemy: Enemy = {
      id: `enemy_${Date.now()}`,
      name: enemyName,
      maxHp,
      hp: maxHp,
      intent: { type: 'attack', value: 5, description: 'Prepare to strike (5 damage)' },
      patternIndex: 0,
      spriteName,
      isBoss: type === 'boss',
      isElite: type === 'elite',
      difficulty
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

    const playerWheel = this.runState.playerWheel;
    const defaultBoard: BoardModifiers = {
      extraGreenSlots: 0,
      convertNumbersToRed: [],
      convertNumbersToBlack: [],
      payoutMultipliers: {
        red: playerWheel.payoutMultipliers.red,
        black: playerWheel.payoutMultipliers.black,
        green: playerWheel.payoutMultipliers.green,
        number: playerWheel.payoutMultipliers.number,
        odd: playerWheel.payoutMultipliers.odd,
        even: playerWheel.payoutMultipliers.even
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
        enemyWheel = JSON.parse(JSON.stringify(WHEEL_TEMPLATES.crimson_tide));
        enemyWheel.name = "The Wraith Reservoir";
        enemyWheel.description = "A blood-soaked wheel favoring red slots.";
      } else if (spriteName === 'croupier') {
        enemyWheel = JSON.parse(JSON.stringify(WHEEL_TEMPLATES.verdant));
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
      encounterType: type,
      turn: 1,
      playerScore: 0,
      enemyScore: 0,
      isSuddenDeath: false,
      maxRounds: type === 'elite' ? 5 : type === 'boss' ? 8 : 3,
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
      drawsThisTurn: 0,
      isResolving: false
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

  placeBet(type: 'red' | 'black' | 'green' | 'number' | 'odd' | 'even' | 'gold' | 'purple' | 'cyan' | 'crimson', amount: number, numberValue?: number) {
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

    this.updatePrediction();
    return true;
  }

  clearBets() {
    if (!this.battleState) return;
    // Refund chips
    const totalRefund = this.battleState.bets.reduce((sum, b) => sum + b.amount, 0);
    this.battleState.chipsPool += totalRefund;
    this.battleState.bets = [];
    this.updatePrediction();
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
    let betColor = getBetColor(color);
    let damageDealt = this.calculateSpinDamage(winningNum, color, betColor);

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
      betColor = getBetColor(color);
      damageDealt = this.calculateSpinDamage(winningNum, color, betColor);
    }

    // Apply lucky number checks (Sinner's Seven)
    if (activeWheel.upgrades.includes('lucky_seven') && winningNum === 7) {
      this.runState.hp = Math.min(this.runState.maxHp, this.runState.hp + 6);
    }

    // 2. Apply special color effects
    const hpPercent = this.runState.hp / this.runState.maxHp;
    const slotEffect = getSlotEffect(color, hpPercent);
    let slotEffectDesc: string | undefined;
    const isPointsMode = this.runState.combatMode === 'points';

    if (slotEffect) {
      slotEffectDesc = slotEffect.description;
      switch (slotEffect.type) {
        case 'gold_heal':
          this.runState.hp = Math.min(this.runState.maxHp, this.runState.hp + 3);
          if (isPointsMode) {
            this.battleState.playerScore = (this.battleState.playerScore || 0) + 10;
            slotEffectDesc = 'GOLD — Healed 3 HP and gained +10 PTS!';
          }
          break;
        case 'purple_curse':
          this.runState.hp = Math.max(1, this.runState.hp - 3);
          if (isPointsMode) {
            this.battleState.playerScore = (this.battleState.playerScore || 0) + 15;
            slotEffectDesc = 'PURPLE CURSE — Gained +15 PTS, but lost 3 HP!';
          }
          break;
        case 'cyan_shield':
          this.battleState.playerBlock += 8;
          if (isPointsMode) {
            this.battleState.playerScore = (this.battleState.playerScore || 0) + 5;
            slotEffectDesc = 'CYAN SHIELD — Gained 8 block and +5 PTS!';
          }
          break;
        case 'crimson_active':
          if (isPointsMode) {
            this.battleState.playerScore = (this.battleState.playerScore || 0) + 10;
            slotEffectDesc = 'CRIMSON BLOOD — HP below 50%! Gained +10 PTS!';
          }
          break;
        case 'crimson_inactive':
          if (isPointsMode) {
            this.battleState.playerScore = (this.battleState.playerScore || 0) + 3;
            slotEffectDesc = 'CRIMSON — HP above 50%. Gained +3 PTS!';
          }
          break;
      }
    }

    // 3. Apply Zone and Slot Triggers
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
      const dangerDmg = boardModifiers.dangerZones[winningNum];
      if (isPointsMode) {
        this.battleState.playerScore = (this.battleState.playerScore || 0) + dangerDmg;
      } else {
        this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - dangerDmg);
      }
    }
    if (boardModifiers.cursedZones && boardModifiers.cursedZones.includes(winningNum)) {
      boardModifiers.enemyStunTurns = (boardModifiers.enemyStunTurns || 0) + 2;
    }

    // Apply damage or points to enemy/player
    if (isPointsMode) {
      this.battleState.playerScore = (this.battleState.playerScore || 0) + damageDealt;
    } else {
      this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - damageDealt);
    }

    // Apply Stun Strike check
    const hasStunStrike = this.battleState.activePlayedCards?.some(c => c.effectId === 'STUN_STRIKE');
    if (hasStunStrike && damageDealt >= 5) {
      boardModifiers.enemyStunTurns = (boardModifiers.enemyStunTurns || 0) + 2;
    }

    // 4. Insurance Policy Refund Check
    if (boardModifiers.insuranceActive) {
      if (damageDealt === 0) {
        let refund = 0;
        this.battleState.bets.forEach(b => refund += b.amount);
        this.battleState.chipsPool += refund;
      }
      boardModifiers.insuranceActive = false;
    }

    // 5. Streak Tracking (uses betColor for streak tracking)
    if (boardModifiers.redStreakActive || boardModifiers.blackStreakActive) {
      if (betColor === 'red') {
        boardModifiers.redStreakCount = (boardModifiers.redStreakCount || 0) + 1;
        boardModifiers.blackStreakCount = 0;
      } else if (betColor === 'black') {
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
      betColor,
      damageDealt,
      playerDamageTaken: 0,
      betsEvaluated: this.battleState.bets.map(b => ({ ...b })),
      cardsActive: [...(this.battleState.activePlayedCards || [])],
      slotEffect: slotEffectDesc
    };

    // Discard played bets (they are consumed/gone)
    this.battleState.bets = [];
  }

  private calculateSpinDamage(winningNum: number, color: SlotColor, betColor: BetColor): number {
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
      const effColor = getEffectiveColor(color, winningNum, activeWheel.greenNumbers);

      if (bet.type === 'red' && effColor === 'red') {
        isWin = true;
        multiplier = boardModifiers.payoutMultipliers.red;
      } else if (bet.type === 'black' && effColor === 'black') {
        isWin = true;
        multiplier = boardModifiers.payoutMultipliers.black;
      } else if (bet.type === 'green') {
        const isGreenSlot = activeWheel.greenNumbers.includes(winningNum) || 
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
          
          const hasGreenRipple = this.battleState?.activePlayedCards?.some(c => c.effectId === 'GREEN_RIPPLE');
          if (hasGreenRipple) {
            const greenSlotsCount = activeWheel.greenNumbers.length + (boardModifiers.extraGreenSlots || 0);
            multiplier += 5 * greenSlotsCount;
          }
        }
      } else if (bet.type === 'gold' && color === 'gold') {
        isWin = true;
        multiplier = activeWheel.payoutMultipliers.gold || 4.0;
      } else if (bet.type === 'purple' && color === 'purple') {
        isWin = true;
        multiplier = activeWheel.payoutMultipliers.purple || 4.0;
      } else if (bet.type === 'cyan' && color === 'cyan') {
        isWin = true;
        multiplier = activeWheel.payoutMultipliers.cyan || 4.0;
      } else if (bet.type === 'crimson' && color === 'crimson') {
        isWin = true;
        const baseCrimsonMult = activeWheel.payoutMultipliers.crimson || 6.0;
        const hpPercent = this.runState.hp / this.runState.maxHp;
        multiplier = hpPercent < 0.5 ? baseCrimsonMult * 2.0 : baseCrimsonMult;
      } else if (bet.type === 'number' && (bet.numberValue === winningNum || mirrorSlots[winningNum] === bet.numberValue)) {
        isWin = true;
        multiplier = customNumberMultipliers[winningNum] || boardModifiers.payoutMultipliers.number;
        
        const hasSplitBets = this.battleState?.activePlayedCards?.some(c => c.effectId === 'SPLIT_BETS');
        if (hasSplitBets) {
          multiplier += 2;
        }
      } else if (bet.type === 'odd' && !activeWheel.greenNumbers.includes(winningNum) && winningNum % 2 !== 0) {
        isWin = true;
        multiplier = boardModifiers.payoutMultipliers.odd;
      } else if (bet.type === 'even' && !activeWheel.greenNumbers.includes(winningNum) && winningNum % 2 === 0) {
        isWin = true;
        multiplier = boardModifiers.payoutMultipliers.even;
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

    if (boardModifiers.redStreakActive && betColor === 'red' && boardModifiers.redStreakCount) {
      const mult = Math.min(4.0, 1.0 + boardModifiers.redStreakCount * 0.5);
      damageDealt *= mult;
    }
    if (boardModifiers.blackStreakActive && betColor === 'black' && boardModifiers.blackStreakCount) {
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
    const betColor = getBetColor(color);
    let isWin = false;

    // Check if the enemy's bet matches the settled slot
    this.battleState.bets.forEach(bet => {
      const effColor = getEffectiveColor(color, winningNum, activeWheel.greenNumbers);
      if (bet.type === 'red' && effColor === 'red') {
        isWin = true;
      } else if (bet.type === 'black' && effColor === 'black') {
        isWin = true;
      } else if (bet.type === 'green') {
        const isGreenSlot = activeWheel.greenNumbers.includes(winningNum) || effColor === 'green';
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
        const isPointsMode = this.runState.combatMode === 'points';
        if (isPointsMode) {
          this.battleState.enemyScore = (this.battleState.enemyScore || 0) + playerDamageTaken;
        } else {
          this.runState.hp = Math.max(0, this.runState.hp - playerDamageTaken);
        }

        // Aegis Ward reflection check
        const hasAegisWard = this.battleState.activePlayedCards?.some(c => c.effectId === 'AEGIS_WARD');
        if (hasAegisWard) {
          if (isPointsMode) {
            this.battleState.playerScore = (this.battleState.playerScore || 0) + 4;
          } else {
            this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - 4);
          }
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
      betColor,
      damageDealt: 0,
      playerDamageTaken,
      betsEvaluated: this.battleState.bets.map(b => ({ ...b })),
      cardsActive: [...(this.battleState.activePlayedCards || [])],
      enemyWon: isWin
    };

    // Discard enemy bets
    this.battleState.bets = [];
  }

  // Executes enemy turn actions
  resolveEnemyTurn() {
    if (!this.battleState) return;
    const isPointsMode = this.runState.combatMode === 'points';

    // 1. Check player death (always check, as HP is spent for card costs)
    if (this.runState.hp <= 0) {
      this.runState.gameState = 'GAME_OVER';
      return;
    }

    // 2. Perform winner checks based on combat mode
    if (isPointsMode) {
      if (this.battleState.turn >= (this.battleState.maxRounds || 3)) {
        const pScore = this.battleState.playerScore || 0;
        const eScore = this.battleState.enemyScore || 0;
        if (pScore > eScore) {
          this.handleCombatVictory();
          return;
        } else if (pScore < eScore) {
          this.runState.hp = 0;
          this.runState.gameState = 'GAME_OVER';
          return;
        } else {
          // Tie! Trigger Sudden Death and extend rounds
          this.battleState.isSuddenDeath = true;
          this.battleState.maxRounds = (this.battleState.maxRounds || 3) + 1;
        }
      }
    } else {
      // Legacy HP Damage mode checks
      if (this.battleState.enemy.hp <= 0) {
        this.handleCombatVictory();
        return;
      }
    }

    // RETAIN hand cards across turns! Only discard activePlayedCards
    if (this.battleState.activePlayedCards) {
      this.battleState.discardPile.push(...this.battleState.activePlayedCards);
    }
    this.battleState.activePlayedCards = [];
    this.battleState.enemy.activeCard = null;

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

  updatePrediction() {
    if (!this.battleState) return;
    if (this.battleState.physicsModifiers.predictionSize > 0) {
      const activeWheel = (this.battleState as any).activeWheelOwner === 'enemy' ? this.battleState.enemyWheel : this.battleState.playerWheel;
      const winningNumbers = this.getWinningNumbers(activeWheel);
      this.battleState.predictionSector = this.runPredictionDryRun(activeWheel, winningNumbers);
    } else {
      this.battleState.predictionSector = [];
    }
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
    
    this.updatePrediction();
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
      if (this.runState.combatMode === 'points') {
        this.battleState.playerScore = (this.battleState.playerScore || 0) + amount;
      } else {
        this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - amount);
        if (this.battleState.enemy.hp === 0) {
          this.handleCombatVictory();
        }
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

  devTeleport(nodeType: 'combat' | 'elite' | 'boss' | 'shop' | 'event' | 'forge') {
    // Clear active combat if teleporting
    this.battleState = null;
    
    if (nodeType === 'combat' || nodeType === 'elite' || nodeType === 'boss') {
      this.initCombat(nodeType);
    } else if (nodeType === 'shop') {
      this.runState.gameState = 'SHOP';
    } else if (nodeType === 'event') {
      this.runState.gameState = 'EVENT';
    } else if (nodeType === 'forge') {
      this.runState.gameState = 'FORGE';
      this.initForge();
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

  // --- STORE / LOADOUT SYSTEM ---

  initStore() {
    // 1. Generate starter loadout: 5 random commons + 1 random common wheel
    this.runState.deck = [];
    const commonKeys = Object.keys(CARD_DATABASE).filter(k => CARD_DATABASE[k].rarity === 'common');
    const usedKeys: string[] = [];
    for (let i = 0; i < 5; i++) {
      const available = commonKeys.filter(k => !usedKeys.includes(k));
      if (available.length > 0) {
        const randKey = available[Math.floor(Math.random() * available.length)];
        this.runState.deck.push(getCardById(randKey));
        usedKeys.push(randKey);
      }
    }

    // Assign random common wheel
    const starterWheel = getRandomCommonWheel();
    this.runState.selectedWheelId = starterWheel.id;
    this.runState.playerWheel = starterWheel;

    // 2. Generate store inventory: 6 cards (4 uncommon + 2 rare) + 3 wheels (2 uncommon + 1 rare)
    const storeItems: StoreItem[] = [];
    
    // Cards
    const uncommonCardKeys = Object.keys(CARD_DATABASE).filter(k => CARD_DATABASE[k].rarity === 'uncommon');
    const rareCardKeys = Object.keys(CARD_DATABASE).filter(k => CARD_DATABASE[k].rarity === 'rare');
    this.shuffle(uncommonCardKeys);
    this.shuffle(rareCardKeys);
    
    for (let i = 0; i < 4 && i < uncommonCardKeys.length; i++) {
      const key = uncommonCardKeys[i];
      const card = CARD_DATABASE[key];
      storeItems.push({
        id: `store_card_${i}`,
        type: 'card',
        itemId: key,
        name: card.name,
        description: card.description,
        rarity: 'uncommon',
        pointsCost: 3,
        purchased: false
      });
    }
    for (let i = 0; i < 2 && i < rareCardKeys.length; i++) {
      const key = rareCardKeys[i];
      const card = CARD_DATABASE[key];
      storeItems.push({
        id: `store_card_rare_${i}`,
        type: 'card',
        itemId: key,
        name: card.name,
        description: card.description,
        rarity: 'rare',
        pointsCost: 7,
        purchased: false
      });
    }

    // Wheels
    const storeWheels = generateStoreWheels();
    storeWheels.forEach((w, idx) => {
      storeItems.push({
        id: `store_wheel_${idx}`,
        type: 'wheel',
        itemId: w.id,
        name: w.name,
        description: w.description,
        rarity: w.rarity || 'common',
        pointsCost: w.pointsCost || 5,
        purchased: false
      });
    });

    this.runState.storePoints = 10;
    this.runState.storeItems = storeItems;
    this.runState.gameState = 'LOADOUT_STORE';
  }

  purchaseStoreItem(itemId: string): boolean {
    if (!this.runState.storeItems || this.runState.storePoints === undefined) return false;
    
    const item = this.runState.storeItems.find(i => i.id === itemId);
    if (!item || item.purchased) return false;
    if (this.runState.storePoints < item.pointsCost) return false;

    this.runState.storePoints -= item.pointsCost;
    item.purchased = true;

    if (item.type === 'card') {
      this.runState.deck.push(getCardById(item.itemId));
    } else if (item.type === 'wheel') {
      const allWheels = getAllWheels();
      const wheel = allWheels.find(w => w.id === item.itemId);
      if (wheel) {
        this.runState.selectedWheelId = wheel.id;
        this.runState.playerWheel = JSON.parse(JSON.stringify(wheel));
      }
    }

    return true;
  }

  completeStore() {
    this.runState.storeItems = undefined;
    this.runState.storePoints = undefined;
    this.runState.gameState = 'MAP';
  }

  // Legacy compatibility
  selectStartingWheel(wheelId: string): boolean {
    const template = WHEEL_TEMPLATES[wheelId];
    if (template) {
      this.runState.selectedWheelId = wheelId;
      this.runState.playerWheel = JSON.parse(JSON.stringify(template));
    }
    return false;
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

  // --- FORGE / BUILDER SYSTEM ---

  initForge() {
    this.runState.forgeRerollCount = 0;
    this.runState.forgeCards = this.generateForgeOffers();
  }

  generateForgeOffers(): ForgeCard[] {
    const offers: ForgeCard[] = [];
    const wheel = this.runState.playerWheel;

    while (offers.length < 3) {
      // Pick Rarity
      const rarityRoll = Math.random();
      let rarity: 'bronze' | 'silver' | 'gold' = 'bronze';
      if (rarityRoll < 0.15) {
        rarity = 'gold';
      } else if (rarityRoll < 0.50) { // 35% silver, 50% bronze
        rarity = 'silver';
      }

      // Roll card type based on rarity
      let type: 'destroy_random' | 'remove_color' | 'remove_green' | 'add_color' | 'convert_color' | 'upgrade_multiplier';
      
      if (rarity === 'bronze') {
        const pool: ('destroy_random' | 'remove_color' | 'add_color' | 'upgrade_multiplier')[] = [
          'destroy_random', 'remove_color', 'add_color', 'upgrade_multiplier'
        ];
        type = pool[Math.floor(Math.random() * pool.length)];
      } else if (rarity === 'silver') {
        const pool: ('destroy_random' | 'remove_color' | 'remove_green' | 'add_color' | 'convert_color' | 'upgrade_multiplier')[] = [
          'destroy_random', 'remove_color', 'remove_green', 'add_color', 'convert_color', 'upgrade_multiplier'
        ];
        type = pool[Math.floor(Math.random() * pool.length)];
      } else { // gold
        const pool: ('destroy_random' | 'add_color' | 'convert_color' | 'upgrade_multiplier')[] = [
          'destroy_random', 'add_color', 'convert_color', 'upgrade_multiplier'
        ];
        type = pool[Math.floor(Math.random() * pool.length)];
      }

      let name = '';
      let description = '';
      let cost = 10;
      let effectParams: any = {};
      let isValid = true;

      if (type === 'destroy_random') {
        const count = rarity === 'bronze' ? 2 : rarity === 'silver' ? 3 : 4;
        cost = rarity === 'bronze' ? 10 : rarity === 'silver' ? 15 : 20;
        name = `${rarity.toUpperCase()} CRUCIBLE`;
        description = `Destroy ${count} random slots on your wheel.`;
        effectParams = { count };
        
        // Validation: must keep at least 2 slots after destruction
        if (wheel.numbers.length - count < 2) {
          isValid = false;
        }
      } else if (type === 'remove_color') {
        const count = rarity === 'bronze' ? 1 : rarity === 'silver' ? 2 : 3;
        cost = rarity === 'bronze' ? 8 : rarity === 'silver' ? 12 : 18;
        const color = Math.random() < 0.5 ? 'red' : 'black';
        name = `${color.toUpperCase()} PURGE`;
        description = `Destroy ${count} random ${color} slots on your wheel.`;
        effectParams = { count, color };

        // Validation: must have enough slots of that color, and keep at least 2 slots
        const matchingSlots = wheel.numbers.filter(n => getSlotColor(n, wheel) === color);
        if (matchingSlots.length < count || wheel.numbers.length - count < 2) {
          isValid = false;
        }
      } else if (type === 'remove_green') {
        cost = 10;
        name = 'GREEN EXORCISM';
        description = 'Destroy 1 random green or gold slot on your wheel.';
        effectParams = { count: 1, color: 'green' };

        // Validation: must have at least one green/gold slot, and keep at least 2 slots
        const greenSlots = wheel.numbers.filter(n => getSlotColor(n, wheel) === 'green' || getSlotColor(n, wheel) === 'gold');
        if (greenSlots.length < 1 || wheel.numbers.length - 1 < 2) {
          isValid = false;
        }
      } else if (type === 'add_color') {
        let color: SlotColor = 'red';
        let count = 1;
        if (rarity === 'bronze') {
          color = Math.random() < 0.5 ? 'red' : 'black';
          count = Math.random() < 0.5 ? 1 : 2;
          cost = count === 1 ? 8 : 12;
          name = `${color.toUpperCase()} INJECTION`;
          description = `Add ${count} missing slots to your wheel as ${color}.`;
        } else if (rarity === 'silver') {
          const colorsPool: SlotColor[] = ['red', 'black', 'gold', 'purple', 'cyan'];
          color = colorsPool[Math.floor(Math.random() * colorsPool.length)];
          if (color === 'red' || color === 'black') {
            count = 2;
            cost = 12;
          } else {
            count = 1;
            cost = 15;
          }
          name = `${color.toUpperCase()} FORGE`;
          description = `Add ${count} missing slots to your wheel as ${color.toUpperCase()}.`;
        } else { // gold
          const colorsPool: SlotColor[] = ['gold', 'purple', 'cyan', 'crimson'];
          color = colorsPool[Math.floor(Math.random() * colorsPool.length)];
          count = color === 'crimson' ? 1 : 2;
          cost = 22;
          name = `${color.toUpperCase()} INFUSION`;
          description = `Add ${count} missing slots to your wheel as ${color.toUpperCase()}.`;
        }
        effectParams = { count, color };

        // Validation: find missing numbers in 0-36
        const missing = [];
        for (let i = 0; i <= 36; i++) {
          if (!wheel.numbers.includes(i)) missing.push(i);
        }
        if (missing.length < count) {
          isValid = false;
        }
      } else if (type === 'convert_color') {
        let fromColor: SlotColor = 'red';
        let toColor: SlotColor = 'green';
        let count = 2;
        
        if (rarity === 'silver') {
          fromColor = Math.random() < 0.5 ? 'red' : 'black';
          const toPool: SlotColor[] = ['green', 'gold', 'purple', 'cyan'];
          toColor = toPool[Math.floor(Math.random() * toPool.length)];
          count = 2;
          cost = 14;
          name = `${fromColor.toUpperCase()} MUTATION`;
          description = `Convert ${count} random ${fromColor.toUpperCase()} slots to ${toColor.toUpperCase()}.`;
        } else { // gold
          fromColor = Math.random() < 0.5 ? 'red' : 'black';
          const toPool: SlotColor[] = ['green', 'gold', 'purple', 'cyan', 'crimson'];
          toColor = toPool[Math.floor(Math.random() * toPool.length)];
          count = toColor === 'crimson' ? 2 : 3;
          cost = toColor === 'crimson' ? 25 : 20;
          name = `${fromColor.toUpperCase()} ALCHEMY`;
          description = `Convert ${count} random ${fromColor.toUpperCase()} slots to ${toColor.toUpperCase()}.`;
        }
        
        effectParams = { count, fromColor, toColor };

        // Validation: wheel must have at least 'count' slots of 'fromColor'
        const matchingSlots = wheel.numbers.filter(n => getSlotColor(n, wheel) === fromColor);
        if (matchingSlots.length < count) {
          isValid = false;
        }
      } else if (type === 'upgrade_multiplier') {
        cost = rarity === 'bronze' ? 10 : rarity === 'silver' ? 18 : 25;
        const categories: ('red' | 'black' | 'green' | 'number' | 'odd' | 'even')[] = ['red', 'black', 'green', 'number', 'odd', 'even'];
        let category = categories[Math.floor(Math.random() * categories.length)];
        
        if (rarity === 'gold') {
          category = Math.random() < 0.5 ? 'green' : 'number';
        } else if (rarity === 'silver') {
          category = Math.random() < 0.4 ? 'green' : Math.random() < 0.8 ? 'number' : 'red';
        } else {
          category = Math.random() < 0.25 ? 'red' : Math.random() < 0.5 ? 'black' : Math.random() < 0.75 ? 'odd' : 'even';
        }

        let upgradeAmount = 0.2;
        if (category === 'green' || category === 'number') {
          upgradeAmount = rarity === 'silver' ? 2.0 : rarity === 'gold' ? 5.0 : 1.0;
        } else {
          upgradeAmount = rarity === 'gold' ? 0.5 : 0.2;
        }

        name = `${category.toUpperCase()} BOOST`;
        description = `Upgrade ${category} bet payout multiplier by +${upgradeAmount}x.`;
        effectParams = { upgradeType: category, upgradeAmount };
      }

      if (isValid) {
        if (!offers.some(o => o.name === name)) {
          offers.push({
            id: `forge-card-${offers.length}-${Date.now()}`,
            name,
            description,
            rarity,
            cost,
            effect: { type: type as any, params: effectParams },
            purchased: false
          });
        }
      }
    }

    return offers;
  }

  purchaseForgeCard(cardId: string): boolean {
    if (!this.runState.forgeCards) return false;
    const card = this.runState.forgeCards.find(c => c.id === cardId);
    if (!card || card.purchased) return false;
    if (this.runState.chips < card.cost) return false;

    // Deduct cost
    this.runState.chips -= card.cost;
    card.purchased = true;

    const wheel = this.runState.playerWheel;
    const effect = card.effect;

    const updateSlotColor = (num: number, newColor: SlotColor) => {
      wheel.colors[num] = newColor;
      if (newColor === 'green') {
        if (!wheel.greenNumbers.includes(num)) {
          wheel.greenNumbers.push(num);
        }
      } else {
        wheel.greenNumbers = wheel.greenNumbers.filter(n => n !== num);
      }
    };

    if (effect.type === 'destroy_random') {
      const count = effect.params.count || 1;
      const slots = [...wheel.numbers];
      for (let i = 0; i < count; i++) {
        if (slots.length <= 2) break;
        const ridx = Math.floor(Math.random() * slots.length);
        const removedNum = slots.splice(ridx, 1)[0];
        wheel.numbers = wheel.numbers.filter(n => n !== removedNum);
        wheel.greenNumbers = wheel.greenNumbers.filter(n => n !== removedNum);
        delete wheel.colors[removedNum];
      }
    } else if (effect.type === 'remove_color') {
      const count = effect.params.count || 1;
      const color = effect.params.color!;
      for (let i = 0; i < count; i++) {
        const matching = wheel.numbers.filter(n => getSlotColor(n, wheel) === color);
        if (matching.length === 0 || wheel.numbers.length <= 2) break;
        const removedNum = matching[Math.floor(Math.random() * matching.length)];
        wheel.numbers = wheel.numbers.filter(n => n !== removedNum);
        wheel.greenNumbers = wheel.greenNumbers.filter(n => n !== removedNum);
        delete wheel.colors[removedNum];
      }
    } else if (effect.type === 'remove_green') {
      const count = effect.params.count || 1;
      for (let i = 0; i < count; i++) {
        const matching = wheel.numbers.filter(n => getSlotColor(n, wheel) === 'green' || getSlotColor(n, wheel) === 'gold');
        if (matching.length === 0 || wheel.numbers.length <= 2) break;
        const removedNum = matching[Math.floor(Math.random() * matching.length)];
        wheel.numbers = wheel.numbers.filter(n => n !== removedNum);
        wheel.greenNumbers = wheel.greenNumbers.filter(n => n !== removedNum);
        delete wheel.colors[removedNum];
      }
    } else if (effect.type === 'add_color') {
      const count = effect.params.count || 1;
      const color = effect.params.color!;
      for (let i = 0; i < count; i++) {
        const missing = [];
        for (let j = 0; j <= 36; j++) {
          if (!wheel.numbers.includes(j)) missing.push(j);
        }
        if (missing.length === 0) break;
        const addedNum = missing[Math.floor(Math.random() * missing.length)];
        wheel.numbers.push(addedNum);
        updateSlotColor(addedNum, color);
      }
    } else if (effect.type === 'convert_color') {
      const count = effect.params.count || 1;
      const fromColor = effect.params.fromColor!;
      const toColor = effect.params.toColor!;
      
      for (let i = 0; i < count; i++) {
        const matching = wheel.numbers.filter(n => getSlotColor(n, wheel) === fromColor);
        if (matching.length === 0) break;
        const targetNum = matching[Math.floor(Math.random() * matching.length)];
        updateSlotColor(targetNum, toColor);
      }
    } else if (effect.type === 'upgrade_multiplier') {
      const ut = effect.params.upgradeType!;
      const val = effect.params.upgradeAmount!;
      wheel.payoutMultipliers[ut] = parseFloat((wheel.payoutMultipliers[ut] + val).toFixed(1));
    }

    return true;
  }

  rerollForge(): boolean {
    if (this.runState.chips < 5) return false;
    this.runState.chips -= 5;
    this.runState.forgeRerollCount = (this.runState.forgeRerollCount || 0) + 1;
    this.runState.forgeCards = this.generateForgeOffers();
    return true;
  }

  chooseEnemyPlay(): { betType: string; card: Card | null; numberValue?: number } {
    if (!this.battleState) return { betType: 'red', card: null };
    const enemy = this.battleState.enemy;
    const difficulty = enemy.difficulty !== undefined ? enemy.difficulty : 0.5;
    const activeWheel = this.battleState.enemyWheel;
    
    // 1. Determine enemy card pool based on theme
    const themeCards: string[] = [];
    if (enemy.spriteName === 'wraith') {
      themeCards.push('crimson_surge', 'dark_fury', 'attraction_coil', 'repulsion_coil');
    } else if (enemy.spriteName === 'croupier') {
      themeCards.push('green_greed', 'steel_barricade', 'scrap_shield');
    } else if (enemy.spriteName === 'decay_wheel') {
      themeCards.push('friction_oil', 'focus_sight');
    } else if (enemy.isBoss) {
      themeCards.push('crimson_surge', 'dark_fury', 'green_greed', 'predictive_sight', 'eagle_eye', 'fortress_shield');
    } else if (enemy.isElite) {
      themeCards.push('predictive_sight', 'steel_barricade', 'attraction_coil', 'repulsion_coil');
    } else {
      // Default gambler
      themeCards.push('scrap_shield', 'focus_sight');
    }

    // Pick 2 random cards from their theme pool to represent their "hand" for this turn
    const shuffled = [...themeCards].sort(() => Math.random() - 0.5);
    const hand = shuffled.slice(0, 2).map(id => getCardById(id)).filter(Boolean) as Card[];
    // Add "no card" option
    const options: (Card | null)[] = [null, ...hand];

    // 2. Determine Risk Tolerance based on scores
    const isPointsMode = this.runState.combatMode === 'points';
    let riskTolerance = 0.1;
    if (isPointsMode && this.battleState) {
      const pScore = this.battleState.playerScore || 0;
      const eScore = this.battleState.enemyScore || 0;
      const roundsPlayed = this.battleState.turn;
      const maxRounds = this.battleState.maxRounds || 3;
      
      if (eScore < pScore) {
        // Losing! Scale risk tolerance
        riskTolerance = Math.min(1.0, 0.1 + (pScore - eScore) * 0.08);
      }
      
      // If it's the final round and they are losing, maximize risk!
      if (roundsPlayed >= maxRounds && eScore < pScore) {
        riskTolerance = 1.0;
      }
    }

    // Helper to evaluate a bet and get its score
    const evaluateOption = (card: Card | null, betType: string, numberValue?: number) => {
      // Create temporary battleState backup
      const originalPhysics = JSON.parse(JSON.stringify(this.battleState!.physicsModifiers));
      const originalBoard = JSON.parse(JSON.stringify(this.battleState!.boardModifiers));
      
      // Apply card if any
      if (card) {
        const cardCopy = { ...card, cost: 0 };
        CardHandler.applyEffect(cardCopy, this.runState, this.battleState!);
      }
      
      // Calculate prediction sector with current physics mods
      let tempPredictionSector: number[] = [];
      if (this.battleState!.physicsModifiers.predictionSize > 0) {
        const winningNumbers = this.getWinningNumbers(activeWheel);
        tempPredictionSector = this.runPredictionDryRun(activeWheel, winningNumbers);
      }
      
      // Calculate EV
      const ev = this.calculateBetEV(betType, numberValue, activeWheel, tempPredictionSector, this.battleState!.boardModifiers);
      
      // Determine Risk
      let risk = 0.1;
      if (betType === 'number') risk = 1.0;
      else if (betType === 'green') risk = 0.8;
      else if (['gold', 'purple', 'cyan', 'crimson'].includes(betType)) risk = 0.5;
      
      // Score = EV * (1.0 - abs(risk - riskTolerance))
      const score = ev * (1.0 - Math.abs(risk - riskTolerance));
      
      // Restore modifiers
      this.battleState!.physicsModifiers = originalPhysics;
      this.battleState!.boardModifiers = originalBoard;
      
      return score;
    };

    // 3. Evaluate all plays (card + bet combination)
    const allPlays: { card: Card | null; betType: string; numberValue?: number; score: number }[] = [];
    
    // Standard bets to evaluate
    const baseBets = ['red', 'black', 'green', 'odd', 'even'];
    const hasColor = (c: SlotColor) => activeWheel.numbers.some(n => getSlotColor(n, activeWheel) === c);
    if (hasColor('gold')) baseBets.push('gold');
    if (hasColor('purple')) baseBets.push('purple');
    if (hasColor('cyan')) baseBets.push('cyan');
    if (hasColor('crimson')) baseBets.push('crimson');

    options.forEach(card => {
      // Evaluate base bets
      baseBets.forEach(bet => {
        const score = evaluateOption(card, bet);
        allPlays.push({ card, betType: bet, score });
      });
      
      // Temporarily apply card to see predicted sector
      const originalPhysics = JSON.parse(JSON.stringify(this.battleState!.physicsModifiers));
      const originalBoard = JSON.parse(JSON.stringify(this.battleState!.boardModifiers));
      if (card) {
        const cardCopy = { ...card, cost: 0 };
        CardHandler.applyEffect(cardCopy, this.runState, this.battleState!);
      }
      
      let tempPredictionSector: number[] = [];
      if (this.battleState!.physicsModifiers.predictionSize > 0) {
        const winningNumbers = this.getWinningNumbers(activeWheel);
        tempPredictionSector = this.runPredictionDryRun(activeWheel, winningNumbers);
      }
      
      // Restore
      this.battleState!.physicsModifiers = originalPhysics;
      this.battleState!.boardModifiers = originalBoard;
      
      // Evaluate betting on each number in predicted sector
      tempPredictionSector.forEach(num => {
        const score = evaluateOption(card, 'number', num);
        allPlays.push({ card, betType: 'number', numberValue: num, score });
      });
    });

    // Sort plays by score descending
    allPlays.sort((a, b) => b.score - a.score);

    // 4. Implement difficulty choice (choose optimal vs random)
    let selectedPlay = allPlays[0]; // default to optimal
    if (Math.random() > difficulty && allPlays.length > 1) {
      // Choose a less optimal play
      const randomIdx = Math.floor(Math.random() * Math.min(10, allPlays.length));
      selectedPlay = allPlays[randomIdx];
    }

    // 5. Apply the selected card to battleState immediately
    if (selectedPlay.card) {
      this.applyEnemyCard(selectedPlay.card);
      enemy.activeCard = selectedPlay.card;
    } else {
      enemy.activeCard = null;
    }

    return {
      betType: selectedPlay.betType,
      card: selectedPlay.card,
      numberValue: selectedPlay.numberValue
    };
  }

  // Helper to calculate EV of a bet
  private calculateBetEV(betType: string, numberValue: number | undefined, wheel: WheelConfig, predictionSector: number[], boardMods: BoardModifiers): number {
    let payoutMultiplier = 2.0;
    if (betType === 'red') payoutMultiplier = boardMods.payoutMultipliers.red;
    else if (betType === 'black') payoutMultiplier = boardMods.payoutMultipliers.black;
    else if (betType === 'green') payoutMultiplier = boardMods.payoutMultipliers.green;
    else if (betType === 'number') payoutMultiplier = boardMods.payoutMultipliers.number;
    else if (betType === 'gold') payoutMultiplier = wheel.payoutMultipliers.gold || 4;
    else if (betType === 'purple') payoutMultiplier = wheel.payoutMultipliers.purple || 4;
    else if (betType === 'cyan') payoutMultiplier = wheel.payoutMultipliers.cyan || 4;
    else if (betType === 'crimson') payoutMultiplier = wheel.payoutMultipliers.crimson || 6;
    else if (betType === 'odd') payoutMultiplier = boardMods.payoutMultipliers.odd;
    else if (betType === 'even') payoutMultiplier = boardMods.payoutMultipliers.even;

    const totalSlots = wheel.numbers.length;
    
    if (predictionSector.length > 0) {
      let wins = 0;
      predictionSector.forEach(num => {
        if (this.isBetWinning(betType, numberValue, num, wheel, boardMods)) {
          wins++;
        }
      });
      return (wins / predictionSector.length) * payoutMultiplier;
    } else {
      let wins = 0;
      wheel.numbers.forEach(num => {
        if (this.isBetWinning(betType, numberValue, num, wheel, boardMods)) {
          wins++;
        }
      });
      return (wins / totalSlots) * payoutMultiplier;
    }
  }

  // Helper to check if a specific landed number makes a bet win
  private isBetWinning(betType: string, numberValue: number | undefined, landedNum: number, wheel: WheelConfig, boardMods: BoardModifiers): boolean {
    const color = getSlotColor(landedNum, wheel, boardMods);
    const baseCol = getEffectiveColor(color, landedNum, wheel.greenNumbers);
    
    if (betType === 'red' && baseCol === 'red') return true;
    if (betType === 'black' && baseCol === 'black') return true;
    if (betType === 'green' && baseCol === 'green') return true;
    if (betType === 'number' && numberValue === landedNum) return true;
    if (betType === 'odd' && !wheel.greenNumbers.includes(landedNum) && landedNum % 2 !== 0) return true;
    if (betType === 'even' && !wheel.greenNumbers.includes(landedNum) && landedNum % 2 === 0) return true;
    if (betType === 'gold' && color === 'gold') return true;
    if (betType === 'purple' && color === 'purple') return true;
    if (betType === 'cyan' && color === 'cyan') return true;
    if (betType === 'crimson' && color === 'crimson') return true;
    return false;
  }

  // Helper to apply card effects for the enemy
  applyEnemyCard(card: Card) {
    if (!this.battleState) return;
    const cardCopy = { ...card, cost: 0 };
    CardHandler.applyEffect(cardCopy, this.runState, this.battleState);
    this.updatePrediction();
  }
}
