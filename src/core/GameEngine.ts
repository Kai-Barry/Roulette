import { RunState, BattleState, GameState, Enemy, Card, MapNode, Bet, PhysicsModifiers, BoardModifiers, EnemyActionType, EnemyIntent, WheelConfig, StoreItem, SlotColor, BetColor, ForgeCard, Curse } from './Types';
import { createStarterDeck, getCardById, CARD_DATABASE, getRandomCardId } from '../cards/CardDatabase';
import { MapGenerator } from '../map/MapGenerator';
import { getSlotColor, getBetColor, getEffectiveColor, getSlotEffect, RoulettePhysics } from '../physics/RoulettePhysics';
import { CardHandler } from '../cards/CardHandler';
import { WHEEL_TEMPLATES, BOARD_UPGRADES, applyBoardUpgrade, initializeWheelColors, WHEEL_NUMBERS, WHEEL_POOL, generateStoreWheels, getRandomCommonWheel, getAllWheels } from './WheelUpgrades';

const CURSES: Curse[] = [
  { id: 'faraday', name: 'Faraday Curse', description: 'Magnetic cheats (Lodestones, Coils) are disabled.', icon: '🧲' },
  { id: 'fog', name: 'Fog Curse', description: 'Predictions are disabled (prediction size is 0).', icon: '🌫️' },
  { id: 'rust', name: 'Rust Curse', description: 'Double friction on all player spins.', icon: '⚙️' },
  { id: 'greed', name: 'Greed Curse', description: 'Turn chip pool is halved (gain 5 instead of 10).', icon: '💰' },
  { id: 'avarice', name: 'Avarice Curse', description: 'Drawing cards costs a flat 3 chips.', icon: '💸' },
  { id: 'fragile', name: 'Fragile Curse', description: 'You cannot heal HP (restoring HP is disabled).', icon: '🏺' },
  { id: 'eclipse', name: 'Eclipse Curse', description: 'All Green sector bets deal 0 damage.', icon: '🌑' },
  { id: 'curse', name: 'Curse of Blood', description: 'Lose 2 HP at the start of each round.', icon: '💀' },
  { id: 'lead', name: 'Lead Curse', description: 'Bets per slot are capped at 5 chips.', icon: '🪨' },
  { id: 'choked', name: 'Choked Curse', description: 'Maximum hand size is reduced by 3 (max 5).', icon: '🎴' }
];

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

  getColorLevel(color: SlotColor): number {
    return this.runState.colorLevels?.[color] || 1;
  }

  getScaledPayoutMultiplier(color: SlotColor, baseVal: number): number {
    const level = this.getColorLevel(color);
    if (color === 'red' || color === 'black') {
      return parseFloat((baseVal + (level - 1) * 0.2).toFixed(1));
    }
    if (color === 'green') {
      return parseFloat((baseVal + (level - 1) * 2.0).toFixed(1));
    }
    if (color === 'gold' || color === 'purple' || color === 'cyan') {
      return parseFloat((baseVal + (level - 1) * 0.5).toFixed(1));
    }
    if (color === 'crimson') {
      return parseFloat((baseVal + (level - 1) * 0.5).toFixed(1));
    }
    return baseVal;
  }

  getInitialRunState(floors = 7): RunState {
    const map = MapGenerator.generateMap(floors, 3);
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
      combatMode: 'points',
      colorLevels: {
        red: 1,
        black: 1,
        green: 1,
        gold: 1,
        purple: 1,
        cyan: 1,
        crimson: 1
      },
      colorUnlocks: {
        red_ability: false,
        black_ability: false,
        green_ability: false
      }
    };
  }

  startNewRun(floors = 7) {
    this.runState = this.getInitialRunState(floors);
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

  devStartTestCombat() {
    this.initCombat('combat');
    if (this.battleState) {
      (this.battleState as any).isTestCombatMode = true;
      this.battleState.enemy.name = "DUMMY TARGET (TEST)";
      this.battleState.enemy.maxHp = 999;
      this.battleState.enemy.hp = 999;
      this.battleState.enemy.intent = { type: 'attack', value: 0, description: 'Test Dummy (does nothing)' };
    }
  }

  private initCombat(type: 'combat' | 'elite' | 'boss') {
    let curse: Curse | undefined;
    if (type === 'elite' || type === 'boss') {
      curse = CURSES[Math.floor(Math.random() * CURSES.length)];
    }
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
      convertNumbersToGreen: [],
      convertNumbersToGold: [],
      convertNumbersToPurple: [],
      convertNumbersToCyan: [],
      convertNumbersToCrimson: [],
      capitalVentureCount: 0,
      customSlotColors: {},
      payoutMultipliers: {
        red: this.getScaledPayoutMultiplier('red', playerWheel.payoutMultipliers.red),
        black: this.getScaledPayoutMultiplier('black', playerWheel.payoutMultipliers.black),
        green: this.getScaledPayoutMultiplier('green', playerWheel.payoutMultipliers.green),
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
      curse,
      turn: 1,
      playerScore: curse?.id === 'greed' ? 15 : 30,
      enemyScore: 30,
      isSuddenDeath: false,
      maxRounds: type === 'elite' ? 5 : type === 'boss' ? 8 : 3,
      chipsPool: curse?.id === 'greed' ? 15 : 30, // Starting chips for the whole combat
      enemyChipsPool: 30,
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
      predictionSector: [],
      predictionOffset: Math.random(),
      spinSeedAngle,
      ballSeedAngle,
      spinSeedSpeed,
      ballSeedSpeed,
      drawsThisTurn: 0,
      isResolving: false,
      activePlayedCards: []
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

    const maxHandSize = this.battleState.curse?.id === 'choked' ? 5 : 8;
    if (this.battleState.drawPile.length > 0 && this.battleState.hand.length < maxHandSize) {
      const card = this.battleState.drawPile.pop()!;
      this.battleState.hand.push(card);
      return true;
    }
    return false;
  }

  getDrawCardCost(): number {
    if (!this.battleState) return 0;
    if (this.battleState.curse?.id === 'avarice') return 3;
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
    const maxHandSize = this.battleState.curse?.id === 'choked' ? 5 : 8;
    if (this.battleState.hand.length >= maxHandSize) {
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

    // Check if matching bet exists, merge if so
    const existing = this.battleState.bets.find(b => 
      b.type === type && (type !== 'number' || b.numberValue === numberValue)
    );

    let actualAmount = amount;
    if (this.battleState.curse?.id === 'lead') {
      const existingAmount = existing ? existing.amount : 0;
      actualAmount = Math.min(amount, 5 - existingAmount);
      if (actualAmount <= 0) return false;
    }

    if (this.battleState.chipsPool < actualAmount) return false;

    // Deduct chips from pool
    this.battleState.chipsPool -= actualAmount;

    if (existing) {
      existing.amount += actualAmount;
    } else {
      this.battleState.bets.push({ type, amount: actualAmount, numberValue });
    }

    this.updatePrediction();
    return true;
  }

  removeBet(type: string, numberValue?: number) {
    if (!this.battleState) return false;
    const index = this.battleState.bets.findIndex(b => 
      b.type === type && (type !== 'number' || b.numberValue === numberValue)
    );
    if (index !== -1) {
      const bet = this.battleState.bets[index];
      this.battleState.chipsPool += bet.amount;
      this.battleState.bets.splice(index, 1);
      this.updatePrediction();
      return true;
    }
    return false;
  }

  clearBets() {
    if (!this.battleState) return;
    // Refund chips
    const totalRefund = this.battleState.bets.reduce((sum, b) => sum + b.amount, 0);
    this.battleState.chipsPool += totalRefund;
    this.battleState.bets = [];
    this.updatePrediction();
  }

  subtractBet(type: 'red' | 'black' | 'green' | 'number' | 'odd' | 'even' | 'gold' | 'purple' | 'cyan' | 'crimson', amount: number, numberValue?: number) {
    if (!this.battleState) return false;
    if (amount <= 0) return false;
    const existingIndex = this.battleState.bets.findIndex(b => 
      b.type === type && (type !== 'number' || b.numberValue === numberValue)
    );
    if (existingIndex === -1) return false;
    
    const existing = this.battleState.bets[existingIndex];
    const deductAmount = Math.min(amount, existing.amount);
    
    existing.amount -= deductAmount;
    this.battleState.chipsPool += deductAmount;
    
    if (existing.amount <= 0) {
      this.battleState.bets.splice(existingIndex, 1);
    }
    
    this.updatePrediction();
    return true;
  }

  rebet(): boolean {
    if (!this.battleState) return false;
    const backup = (this.battleState as any).lastPlayerBetsBackup as any[];
    if (!backup || backup.length === 0) return false;
    
    // Calculate total cost
    const totalCost = backup.reduce((sum, b) => sum + b.amount, 0);
    if (this.battleState.chipsPool < totalCost) return false;
    
    // Clear any current bets
    this.clearBets();
    
    // Apply backup bets
    backup.forEach(b => {
      this.placeBet(b.type, b.amount, b.numberValue);
    });
    
    return true;
  }

  sacrificeForChips(): boolean {
    if (!this.battleState) return false;
    const isPointsMode = this.runState.combatMode === 'points';
    if (isPointsMode) {
      const pScore = this.battleState.playerScore || 0;
      if (pScore >= 10) {
        this.battleState.playerScore = pScore - 10;
        this.battleState.chipsPool += 5;
        return true;
      }
    } else {
      const hp = this.runState.hp;
      if (hp > 5) {
        this.runState.hp = hp - 5;
        this.battleState.chipsPool += 5;
        return true;
      }
    }
    return false;
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

    // Let the correct landing slot be at a deterministic random position within the predicted sector
    const offsetRatio = this.battleState.predictionOffset ?? 0.5;
    const targetIdx = Math.floor(offsetRatio * predSize);

    for (let i = 0; i < predSize; i++) {
      const offset = i - targetIdx;
      const idx = ((landedIdx + offset) % totalSlots + totalSlots) % totalSlots;
      sector.push(activeWheel.numbers[idx]);
    }

    return sector;
  }

  // Prepares the physics spin based on active bets (handles magnetic Lodestone cheat bias)
  spinWheel() {
    if (!this.battleState) return null;
    this.battleState.phase = 'spinning';
    
    const isEnemyWheel = (this.battleState as any).activeWheelOwner === 'enemy';
    const activeWheel = isEnemyWheel ? this.battleState.enemyWheel : this.battleState.playerWheel;
    const winningNumbers = this.getWinningNumbers(activeWheel);

    // Run prediction dry-run BEFORE the actual spin (uses same seeds) - player only
    if (!isEnemyWheel && this.battleState.physicsModifiers.predictionSize > 0) {
      this.battleState.predictionSector = this.runPredictionDryRun(activeWheel, winningNumbers);
    } else {
      this.battleState.predictionSector = [];
    }

    // Set isLocked to true on all played cards when spin starts to prevent retraction
    if (this.battleState.activePlayedCards) {
      this.battleState.activePlayedCards.forEach(c => {
        (c as any).isLocked = true;
      });
    }

    // Reset correct physics engine with current turn modifiers and SAME seeds
    const activePhysics = this.getActivePhysics();
    const physMods = this.battleState.physicsModifiers;
    const boardMods = this.battleState.boardModifiers;

    activePhysics.reset(
      activeWheel,
      physMods,
      winningNumbers,
      this.battleState.spinSeedAngle,
      this.battleState.ballSeedAngle,
      this.battleState.spinSeedSpeed,
      this.battleState.ballSeedSpeed,
      boardMods
    );

    return activePhysics;
  }

  healHp(amount: number) {
    if (this.battleState?.curse?.id === 'fragile') return;
    this.runState.hp = Math.min(this.runState.maxHp, this.runState.hp + amount);
  }

  // Evaluates the result once physics settles
  resolveSpin() {
    if (!this.battleState) return;
    this.battleState.phase = 'resolved';
    
    const winningNums = this.playerPhysics.getWinningNumbers();
    if (winningNums.length === 0) return; // Physics not settled!

    const activeWheel = this.battleState.playerWheel;
    const boardModifiers = this.battleState.boardModifiers;
    const hasLuckyCharm = this.battleState.activePlayedCards?.some(c => c.effectId === 'LUCKY_CHARM');
    
    let totalDamageDealt = 0;
    const slotEffectDescs: string[] = [];
    const isPointsMode = this.runState.combatMode === 'points';
    const isPlayerLosing = (this.battleState.playerScore || 0) < (this.battleState.enemyScore || 0);
    const hpPercent = this.runState.hp / this.runState.maxHp;
    
    let allBallsZeroDamage = true;
    let redBallsCount = 0;
    let blackBallsCount = 0;
    let greenBallsCount = 0;

    for (let i = 0; i < winningNums.length; i++) {
      let winningNum = winningNums[i];
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
        color = getSlotColor(winningNum, activeWheel, boardModifiers);
        betColor = getBetColor(color);
        damageDealt = this.calculateSpinDamage(winningNum, color, betColor);
      }

      if (damageDealt > 0) {
        allBallsZeroDamage = false;
      }

      // Track colors for streaks
      if (betColor === 'red') redBallsCount++;
      else if (betColor === 'black') blackBallsCount++;
      else if (betColor === 'green') greenBallsCount++;

      // Apply lucky number checks (Sinner's Seven)
      if (activeWheel.upgrades.includes('lucky_seven') && winningNum === 7) {
        this.healHp(6);
      }

      // 2. Apply special color effects
      const slotEffect = getSlotEffect(color, isPlayerLosing);
      if (slotEffect) {
        let desc = slotEffect.description;
        switch (slotEffect.type) {
          case 'gold_points':
            // Transform slots
            const landedIdx = activeWheel.numbers.indexOf(winningNum);
            if (landedIdx !== -1) {
              activeWheel.colors[winningNum] = 'gold';
              const adjacentIdx = (landedIdx + 1) % activeWheel.numbers.length;
              const adjacentNum = activeWheel.numbers[adjacentIdx];
              activeWheel.colors[adjacentNum] = 'gold';
            }
            const goldLvl = this.getColorLevel('gold');
            const goldChips = 15 + (goldLvl - 1) * 5;
            const goldPts = 15 + (goldLvl - 1) * 5;
            this.runState.chips += goldChips;
            this.battleState.chipsPool += goldPts;
            desc = `GOLD — Transformed slots to Gold, gained +${goldPts} PTS and +${goldChips} Shop Chips!`;
            if (boardModifiers && (boardModifiers as any).goldenHeistActive) {
              this.runState.chips += 30;
              desc += " (+30 Golden Heist Chips!)";
            }
            break;
          case 'purple_curse':
            const purpleLvl = this.getColorLevel('purple');
            const purplePts = 20 + (purpleLvl - 1) * 5;
            const purpleStun = 1 + Math.floor((purpleLvl - 1) / 2);
            this.battleState.chipsPool += purplePts;
            boardModifiers.enemyNextStun = true;
            if (purpleStun > 1) {
              boardModifiers.enemyStunTurns = (boardModifiers.enemyStunTurns || 0) + (purpleStun - 1);
            }
            desc = `PURPLE CURSE — Gained +${purplePts} PTS and stunned opponent for ${purpleStun} turn${purpleStun > 1 ? 's' : ''}!`;
            break;
          case 'cyan_shield':
            const cyanLvl = this.getColorLevel('cyan');
            const cyanPts = 10 + (cyanLvl - 1) * 3;
            const cyanCards = 2 + (cyanLvl - 1);
            this.battleState.chipsPool += cyanPts;
            if (this.battleState.turnStartBackup) {
              this.battleState.chipsPool = Math.max(this.battleState.chipsPool, this.battleState.turnStartBackup.chipsPool);
            }
            for (let c = 0; c < cyanCards; c++) {
              this.drawCard();
            }
            desc = `CYAN ESSENCE — Gained +${cyanPts} PTS, refilled chips, and drew ${cyanCards} cards!`;
            break;
          case 'crimson_active':
            const crimActLvl = this.getColorLevel('crimson');
            const crimActPts = 15 + (crimActLvl - 1) * 5;
            this.battleState.chipsPool += crimActPts;
            desc = `CRIMSON — Currently losing! Gained +${crimActPts} PTS and 12x payout multiplier!`;
            break;
          case 'crimson_inactive':
            const crimInactLvl = this.getColorLevel('crimson');
            const crimInactPts = 5 + (crimInactLvl - 1) * 2;
            this.battleState.chipsPool += crimInactPts;
            desc = `CRIMSON — Currently winning/tied. Gained +${crimInactPts} PTS and 6x payout multiplier`;
            break;
        }
        slotEffectDescs.push(desc);
      }

      // Synapse synergy check
      const greenStreakUnlocked = !!this.runState.colorUnlocks?.green_ability;
      if (betColor === 'green' && greenStreakUnlocked) {
        (boardModifiers as any).freeCardsNextTurn = true;
        const greenLvl = this.getColorLevel('green');
        let bonusText = "";
        if (greenLvl > 1) {
          const extraDraw = greenLvl - 1;
          const refillChips = (greenLvl - 1) * 5;
          for (let d = 0; d < extraDraw; d++) {
            this.drawCard();
          }
          this.battleState.chipsPool += refillChips;
          bonusText = ` (+${extraDraw} card draw, +${refillChips} chips)`;
        }
        slotEffectDescs.push(`SYNAPSE SYNERGY! All cards cost 0 next turn!${bonusText}`);
      }

      // 3. Apply Zone and Slot Triggers
      if (boardModifiers.chipMines && boardModifiers.chipMines[winningNum] !== undefined) {
        this.battleState.chipsPool += boardModifiers.chipMines[winningNum];
      }
      if (boardModifiers.lifeFountains && boardModifiers.lifeFountains[winningNum] !== undefined) {
        this.healHp(boardModifiers.lifeFountains[winningNum]);
      }

      if (boardModifiers.dangerZones && boardModifiers.dangerZones[winningNum] !== undefined) {
        const dangerDmg = boardModifiers.dangerZones[winningNum];
        if (isPointsMode) {
          this.battleState.chipsPool += dangerDmg;
        } else {
          this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - dangerDmg);
        }
      }
      if (boardModifiers.cursedZones && boardModifiers.cursedZones.includes(winningNum)) {
        boardModifiers.enemyStunTurns = (boardModifiers.enemyStunTurns || 0) + 2;
      }

      // Add to total damage dealt
      totalDamageDealt += damageDealt;

      // Add payout back to the player's chip pool
      this.battleState.chipsPool += damageDealt;

      // Apply Stun Strike check
      const hasStunStrike = this.battleState.activePlayedCards?.some(c => c.effectId === 'STUN_STRIKE');
      if (hasStunStrike && damageDealt >= 5) {
        boardModifiers.enemyStunTurns = (boardModifiers.enemyStunTurns || 0) + 2;
      }
    }

    // Apply damage or points to enemy/player
    if (!isPointsMode) {
      this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - totalDamageDealt);
    }

    // Apply Heavy Nudge failure refund (+15 Essence) if ALL balls dealt 0 damage
    const hasHeavyNudge = this.battleState.activePlayedCards?.some(c => c.effectId === 'HEAVY_NUDGE');
    if (hasHeavyNudge && allBallsZeroDamage) {
      this.battleState.chipsPool += 15;
    }

    // 4. Insurance Policy Refund Check
    if (boardModifiers.insuranceActive) {
      if (allBallsZeroDamage) {
        let refund = 0;
        this.battleState.bets.forEach(b => refund += b.amount);
        this.battleState.chipsPool += refund;
      }
      boardModifiers.insuranceActive = false;
    }

    // 5. Streak Tracking (uses betColor for streak tracking)
    const redStreakUnlocked = !!this.runState.colorUnlocks?.red_ability;
    const blackStreakUnlocked = !!this.runState.colorUnlocks?.black_ability;

    if (boardModifiers.redStreakActive || redStreakUnlocked || boardModifiers.blackStreakActive || blackStreakUnlocked) {
      if (redBallsCount > 0 && blackBallsCount === 0 && greenBallsCount === 0) {
        if (boardModifiers.redStreakActive || redStreakUnlocked) {
          boardModifiers.redStreakCount = (boardModifiers.redStreakCount || 0) + 1;
          boardModifiers.blackStreakCount = 0;
          
          if (boardModifiers.redStreakCount >= 3) {
            const redLvl = this.getColorLevel('red');
            boardModifiers.payoutMultipliers.red = parseFloat((3.5 + (redLvl - 1) * 0.5).toFixed(1));
            slotEffectDescs.push(`HEAT COMBO! Red bets multiplier boosted to ${boardModifiers.payoutMultipliers.red}x!`);
          }
        } else {
          boardModifiers.blackStreakCount = 0;
        }
      } else if (blackBallsCount > 0 && redBallsCount === 0 && greenBallsCount === 0) {
        if (boardModifiers.blackStreakActive || blackStreakUnlocked) {
          boardModifiers.blackStreakCount = (boardModifiers.blackStreakCount || 0) + 1;
          boardModifiers.redStreakCount = 0;
          
          if (boardModifiers.blackStreakCount >= 3) {
            const enemyPool = this.battleState.enemyChipsPool !== undefined ? this.battleState.enemyChipsPool : (this.battleState.enemyScore || 30);
            const blackLvl = this.getColorLevel('black');
            const drainAmount = 10 + (blackLvl - 1) * 3;
            this.battleState.enemyChipsPool = Math.max(0, enemyPool - drainAmount);
            slotEffectDescs.push(`GLACIER SHIELD! Drained ${drainAmount} PTS from opponent's score!`);
          }
        } else {
          boardModifiers.redStreakCount = 0;
        }
      } else {
        boardModifiers.redStreakCount = 0;
        boardModifiers.blackStreakCount = 0;
      }
    }

    // Record results
    const primaryNum = winningNums[0];
    const primaryColor = getSlotColor(primaryNum, activeWheel, boardModifiers);
    const primaryBetColor = getBetColor(primaryColor);
    
    const outcomes = winningNums.map(num => ({
      number: num,
      color: getSlotColor(num, activeWheel, boardModifiers)
    }));
    
    this.battleState.lastSpinResult = {
      number: primaryNum,
      color: primaryColor,
      betColor: primaryBetColor,
      damageDealt: totalDamageDealt,
      playerDamageTaken: 0,
      betsEvaluated: this.battleState.bets.map(b => ({ ...b })),
      cardsActive: [...(this.battleState.activePlayedCards || [])],
      slotEffect: slotEffectDescs.join(', ') || undefined,
      allOutcomes: outcomes
    };

    // Back up current bets for Rebet
    (this.battleState as any).lastPlayerBetsBackup = this.battleState.bets.map(b => ({ ...b }));

    // Discard played bets (they are consumed/gone)
    this.battleState.bets = [];
  }

  private calculateSpinDamage(winningNum: number, color: SlotColor, betColor: BetColor, wheel?: WheelConfig): number {
    if (!this.battleState) return 0;
    const activeWheel = wheel || this.battleState.playerWheel;
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

    // Calculate prediction penalty (House notices you cheating)
    let predictionPenalty = 1.0;
    if (this.battleState.predictionSector && this.battleState.predictionSector.includes(winningNum)) {
      const s = this.battleState.predictionSector.length;
      if (s === 9 || s === 7) {
        predictionPenalty = 0.3; // 70% penalty
      } else if (s === 5 || s === 3) {
        predictionPenalty = 0.5; // 50% penalty
      } else if (s === 1) {
        predictionPenalty = 1.0; // 0% penalty
      } else if (s > 0) {
        if (s >= 7) predictionPenalty = 0.3;
        else if (s >= 3) predictionPenalty = 0.5;
      }
    }

    // Low rarity physics penalty (70% payout reduction for Common/Uncommon cheats)
    const activePlayed = this.battleState.activePlayedCards || [];
    const hasLowRarityPhysics = activePlayed.some(c => 
      c.type === 'physics' && (c.rarity === 'common' || c.rarity === 'uncommon')
    );
    const cheatingPenalty = hasLowRarityPhysics ? 0.3 : 1.0;
    const finalCheatingMultiplier = Math.min(predictionPenalty, cheatingPenalty);

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
        const baseGold = activeWheel.payoutMultipliers.gold || 4.0;
        multiplier = this.getScaledPayoutMultiplier('gold', baseGold);
      } else if (bet.type === 'purple' && color === 'purple') {
        isWin = true;
        const basePurple = activeWheel.payoutMultipliers.purple || 4.0;
        multiplier = this.getScaledPayoutMultiplier('purple', basePurple);
      } else if (bet.type === 'cyan' && color === 'cyan') {
        isWin = true;
        const baseCyan = activeWheel.payoutMultipliers.cyan || 4.0;
        multiplier = this.getScaledPayoutMultiplier('cyan', baseCyan);
      } else if (bet.type === 'crimson' && color === 'crimson') {
        isWin = true;
        const baseCrimsonMult = activeWheel.payoutMultipliers.crimson || 6.0;
        const scaledCrimson = this.getScaledPayoutMultiplier('crimson', baseCrimsonMult);
        const isLosing = (this.battleState?.playerScore || 0) < (this.battleState?.enemyScore || 0);
        multiplier = isLosing ? scaledCrimson * 2.0 : scaledCrimson;
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

      if (this.battleState?.curse?.id === 'eclipse' && bet.type === 'green') {
        isWin = false;
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

        // Apply prediction penalty
        baseDamage *= finalCheatingMultiplier;

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

  passPlayerTurn() {
    if (!this.battleState) return;
    this.battleState.phase = 'resolved';
    
    if (this.battleState.activePlayedCards) {
      this.battleState.activePlayedCards.forEach(c => {
        (c as any).isLocked = true;
      });
    }

    this.battleState.lastSpinResult = {
      number: 0,
      color: 'green',
      betColor: 'green',
      damageDealt: 0,
      playerDamageTaken: 0,
      betsEvaluated: [],
      cardsActive: [...(this.battleState.activePlayedCards || [])]
    };
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
    const betPayout = this.calculateSpinDamage(winningNum, color, betColor, activeWheel);
    const isWin = betPayout > 0;

    const intent = this.battleState.enemy.intent;
    let playerDamageTaken = 0;
    const isPointsMode = this.runState.combatMode === 'points';

    if (isPointsMode) {
      if (isWin) {
        if (intent.type === 'attack') {
          playerDamageTaken = intent.value;
          this.battleState.enemyChipsPool = (this.battleState.enemyChipsPool || 0) + playerDamageTaken + betPayout;
        } else if (intent.type === 'steal_chips') {
          const stolen = Math.min(this.battleState.chipsPool, intent.value);
          this.battleState.chipsPool = Math.max(0, this.battleState.chipsPool - stolen);
          playerDamageTaken = stolen;
          this.battleState.enemyChipsPool = (this.battleState.enemyChipsPool || 0) + stolen + betPayout;
        } else {
          this.battleState.enemyChipsPool = (this.battleState.enemyChipsPool || 0) + betPayout;
        }
      }
    } else {
      if (isWin) {
        if (intent.type === 'attack') {
          playerDamageTaken = intent.value;
          this.runState.hp = Math.max(0, this.runState.hp - playerDamageTaken);
        } else if (intent.type === 'steal_chips') {
          this.battleState.chipsPool = Math.max(0, this.battleState.chipsPool - intent.value);
        } else if (intent.type === 'physics_debuff') {
          this.battleState.physicsModifiers.friction *= 2.0;
        }
      }
    }

    const enemyWinningNums = this.enemyPhysics.getWinningNumbers();
    const outcomes = enemyWinningNums.length > 0 ? enemyWinningNums.map(num => ({
      number: num,
      color: getSlotColor(num, activeWheel, this.battleState!.boardModifiers)
    })) : [{ number: winningNum, color }];

    this.battleState.lastSpinResult = {
      number: winningNum,
      color,
      betColor,
      damageDealt: betPayout,
      playerDamageTaken,
      betsEvaluated: this.battleState.bets.map(b => ({ ...b })),
      cardsActive: [...(this.battleState.activePlayedCards || [])],
      enemyWon: isWin,
      allOutcomes: outcomes
    };

    // Discard enemy bets
    this.battleState.bets = [];
  }

  resolveEnemyTurn() {
    if (!this.battleState) return;

    if ((this.battleState as any).playerTurnModifiersBackup) {
      const backup = (this.battleState as any).playerTurnModifiersBackup;
      this.battleState.physicsModifiers = backup.physicsModifiers;
      this.battleState.boardModifiers = backup.boardModifiers;
      this.battleState.predictionSector = backup.predictionSector;
      delete (this.battleState as any).playerTurnModifiersBackup;
    }

    const isPointsMode = this.runState.combatMode === 'points';

    // 1. Check player death (always check, as HP is spent for card costs)
    if (this.runState.hp <= 0) {
      this.runState.gameState = 'GAME_OVER';
      return;
    }

    // 2. Perform winner checks based on combat mode (if not test mode)
    if (!(this.battleState as any).isTestCombatMode) {
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
    }

    // Decay and expire temporary board modifiers FIRST
    const boardModifiers = this.battleState.boardModifiers;
    if (boardModifiers.tempDurations) {
      const keys = Object.keys(boardModifiers.tempDurations);
      keys.forEach(key => {
        if (boardModifiers.tempDurations![key] > 0) {
          boardModifiers.tempDurations![key]--;
          if (boardModifiers.tempDurations![key] === 0) {
            const defaultPayout = this.battleState!.playerWheel.payoutMultipliers;
            if (key === 'greenMultiplier') {
              boardModifiers.payoutMultipliers.green = this.getScaledPayoutMultiplier('green', defaultPayout.green);
            } else if (key === 'primeMultiplier') {
              delete boardModifiers.primeMultiplier;
            } else if (key === 'highMultiplier') {
              delete boardModifiers.highMultiplier;
            } else if (key === 'lowMultiplier') {
              delete boardModifiers.lowMultiplier;
            } else if (key === 'evenMultiplier') {
              boardModifiers.payoutMultipliers.even = defaultPayout.even;
            } else if (key === 'oddMultiplier') {
              boardModifiers.payoutMultipliers.odd = defaultPayout.odd;
            } else if (key === 'dozenMultiplier_1') {
              if (boardModifiers.dozenMultipliers) delete boardModifiers.dozenMultipliers[1];
            } else if (key === 'dozenMultiplier_2') {
              if (boardModifiers.dozenMultipliers) delete boardModifiers.dozenMultipliers[2];
            } else if (key === 'dozenMultiplier_3') {
              if (boardModifiers.dozenMultipliers) delete boardModifiers.dozenMultipliers[3];
            } else if (key === 'singleOutMultiplier') {
              boardModifiers.payoutMultipliers.number = defaultPayout.number;
            } else if (key === 'columnMultiplier_1') {
              if (boardModifiers.columnMultipliers) delete boardModifiers.columnMultipliers[1];
            } else if (key === 'columnMultiplier_2') {
              if (boardModifiers.columnMultipliers) delete boardModifiers.columnMultipliers[2];
            } else if (key === 'columnMultiplier_3') {
              if (boardModifiers.columnMultipliers) delete boardModifiers.columnMultipliers[3];
            } else if (key === 'globalMultiplier') {
              delete boardModifiers.globalMultiplier;
            } else if (key === 'scarletOverflow' || key === 'onyxEclipse') {
              boardModifiers.payoutMultipliers.red = this.getScaledPayoutMultiplier('red', defaultPayout.red);
              boardModifiers.payoutMultipliers.black = this.getScaledPayoutMultiplier('black', defaultPayout.black);
            } else if (key === 'bloodSpill') {
              if (boardModifiers.bloodSpillSlots) {
                boardModifiers.convertNumbersToRed = boardModifiers.convertNumbersToRed.filter(
                  slot => !boardModifiers.bloodSpillSlots!.includes(slot)
                );
                delete boardModifiers.bloodSpillSlots;
              }
            }
            delete boardModifiers.tempDurations![key];
          }
        }
      });
    }

    // Now, filter activePlayedCards: keep active persistent cards, discard expired or instant ones
    if (this.battleState.activePlayedCards) {
      const toDiscard: Card[] = [];
      const toRetain: Card[] = [];
      
      this.battleState.activePlayedCards.forEach(c => {
        // Set isLocked to true because the turn is committed
        (c as any).isLocked = true;
        
        if (this.isCardActive(c)) {
          toRetain.push(c);
        } else {
          delete c.markedSlots;
          toDiscard.push(c);
        }
      });
      
      const normalDiscard = toDiscard.filter(c => !c.id.includes('_temp') && !(c as any).isTemp);
      this.battleState.discardPile.push(...normalDiscard);
      this.battleState.activePlayedCards = toRetain;
    }

    // Next turn prep
    if ((this.battleState.boardModifiers as any).freeCardsNextTurn) {
      (this.battleState.boardModifiers as any).freeCardsActive = true;
      (this.battleState.boardModifiers as any).freeCardsNextTurn = false;
    } else {
      (this.battleState.boardModifiers as any).freeCardsActive = false;
    }

    this.battleState.turn += 1;
    delete (this.battleState.enemy as any).simulatedHand;
    delete (this.battleState.enemy as any).simulatedPlays;
    delete (this.battleState.enemy as any).lastChosenPlay;

    if (this.battleState.curse?.id === 'curse') {
      this.runState.hp = Math.max(1, this.runState.hp - 2);
    }

    let chipsGained = 8;
    if ((this.battleState.boardModifiers as any).riskCapitalActive) {
      chipsGained -= 2;
    }
    if ((this.battleState.boardModifiers as any).predictiveSightPlusActive) {
      chipsGained -= 2;
      (this.battleState.boardModifiers as any).predictiveSightPlusActive = false; // Reset penalty flag
    }
    // Do NOT refill chipsPool. Keep the current chipsPool!
    this.battleState.chipsPool = this.battleState.chipsPool || 0;
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

    // Reset prediction for new turn
    this.battleState.predictionSector = [];
    this.battleState.predictionOffset = Math.random();

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

    // Money cards: capital venture win reward
    if (this.battleState.boardModifiers && this.battleState.boardModifiers.capitalVentureCount) {
      this.runState.chips += this.battleState.boardModifiers.capitalVentureCount;
    }

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
    this.battleState.turnStartBackup = {
      chipsPool: this.battleState.chipsPool,
      hp: this.runState.hp,
      physicsModifiers: JSON.parse(JSON.stringify(this.battleState.physicsModifiers)),
      boardModifiers: JSON.parse(JSON.stringify(this.battleState.boardModifiers)),
      enemyIntent: JSON.parse(JSON.stringify(this.battleState.enemy.intent)),
      playerWheel: JSON.parse(JSON.stringify(this.battleState.playerWheel)),
      enemyWheel: JSON.parse(JSON.stringify(this.battleState.enemyWheel)),
      spinSeedAngle: this.battleState.spinSeedAngle,
      ballSeedAngle: this.battleState.ballSeedAngle,
      spinSeedSpeed: this.battleState.spinSeedSpeed,
      ballSeedSpeed: this.battleState.ballSeedSpeed,
      hand: JSON.parse(JSON.stringify(this.battleState.hand)),
      drawPile: JSON.parse(JSON.stringify(this.battleState.drawPile)),
      discardPile: JSON.parse(JSON.stringify(this.battleState.discardPile))
    };
  }

  updatePrediction() {
    if (!this.battleState) return;
    const isEnemyWheel = (this.battleState as any).activeWheelOwner === 'enemy';
    if (this.battleState.physicsModifiers.predictionSize > 0) {
      const activeWheel = isEnemyWheel ? this.battleState.enemyWheel : this.battleState.playerWheel;
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
    this.battleState.physicsModifiers = JSON.parse(JSON.stringify(backup.physicsModifiers));
    this.battleState.boardModifiers = JSON.parse(JSON.stringify(backup.boardModifiers));
    this.battleState.enemy.intent = JSON.parse(JSON.stringify(backup.enemyIntent));
    this.battleState.playerWheel = JSON.parse(JSON.stringify(backup.playerWheel));
    this.battleState.enemyWheel = JSON.parse(JSON.stringify(backup.enemyWheel));
    
    // Restore card piles from backup
    this.battleState.hand = JSON.parse(JSON.stringify(backup.hand || []));
    this.battleState.drawPile = JSON.parse(JSON.stringify(backup.drawPile || []));
    this.battleState.discardPile = JSON.parse(JSON.stringify(backup.discardPile || []));
    
    // 2. Apply each card played this turn (not locked)
    for (const card of this.battleState.activePlayedCards || []) {
      if ((card as any).isLocked) continue; // Already baked into starting backup!
      
      // Splice this card out of the hand
      const handIndex = this.battleState.hand.findIndex(c => c.id === card.id);
      if (handIndex !== -1) {
        this.battleState.hand.splice(handIndex, 1);
      }
      
      const success = CardHandler.applyEffect(card, this.runState, this.battleState);
      if (!success) {
        return false;
      }
    }

    // Curse overrides
    if (this.battleState.curse) {
      const tid = this.battleState.curse.id;
      if (tid === 'faraday') {
        this.battleState.physicsModifiers.targetZoneBias = 0;
        this.battleState.physicsModifiers.biasRedOnly = false;
        this.battleState.physicsModifiers.biasBlackOnly = false;
      }
      if (tid === 'fog') {
        this.battleState.physicsModifiers.predictionSize = 0;
      }
      if (tid === 'rust') {
        this.battleState.physicsModifiers.friction *= 2.0;
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
    const prevDrawPile = [...this.battleState.drawPile];
    const prevDiscardPile = [...this.battleState.discardPile];
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
      this.battleState.drawPile = prevDrawPile;
      this.battleState.discardPile = prevDiscardPile;
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
    if ((card as any).isLocked) {
      return false; // Retraction blocked for committed/locked cards
    }
    
    // Save current state for rollback
    const prevActiveCards = [...this.battleState.activePlayedCards];
    const prevHand = [...this.battleState.hand];
    const prevDrawPile = [...this.battleState.drawPile];
    const prevDiscardPile = [...this.battleState.discardPile];
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
      this.battleState.drawPile = prevDrawPile;
      this.battleState.discardPile = prevDiscardPile;
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

  isCardActive(card: Card): boolean {
    const fightLongEffects = new Set([
      'CRIMSON_SURGE', 'DARK_FURY', 'LUCKY_SEVEN', 'UNLUCKY_THIRTEEN',
      'JACKPOT_TRIO', 'DEVILS_TRIO', 'ZERO_HERO', 'EMERALD_FOREST',
      'LOAN_SHARK', 'ZERO_ECLIPSE', 'MONOCHROME_EYE',
      'CHIP_MINE', 'LIFE_FOUNTAIN',
      'DANGER_ZONE', 'MIRROR_SLOT'
    ]);

    if (fightLongEffects.has(card.effectId)) return true;

    // Check if it has a remaining temporary duration
    const effectToDurationKey: Record<string, string> = {
      'GREEN_GREED': 'greenMultiplier',
      'PRIME_TARGET': 'primeMultiplier',
      'HIGH_ROLLER': 'highMultiplier',
      'LOW_SWEEP': 'lowMultiplier',
      'EVEN_SPLIT': 'evenMultiplier',
      'ODD_ADVANTAGE': 'oddMultiplier',
      'FIRST_DOZEN': 'dozenMultiplier_1',
      'SECOND_DOZEN': 'dozenMultiplier_2',
      'THIRD_DOZEN': 'dozenMultiplier_3',
      'SINGLE_OUT': 'singleOutMultiplier',
      'COLUMN_WAVE': 'columnMultiplier_1',
      'COLUMN_DRIFT': 'columnMultiplier_2',
      'COLUMN_APEX': 'columnMultiplier_3',
      'LUCKY_INDEX': 'globalMultiplier',
      'SCARLET_OVERFLOW': 'scarletOverflow',
      'ONYX_ECLIPSE': 'onyxEclipse',
      'BLOOD_SPILL': 'bloodSpill'
    };

    const key = effectToDurationKey[card.effectId];
    if (key && this.battleState?.boardModifiers.tempDurations?.[key] !== undefined) {
      return this.battleState.boardModifiers.tempDurations[key] > 0;
    }

    return false;
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
    
    // Dynamic cost override
    let cost = upgrade.cost;
    if (upgradeId.startsWith('level_')) {
      const color = upgradeId.replace('level_', '') as SlotColor;
      if (!this.runState.colorLevels) this.runState.colorLevels = {
        red: 1, black: 1, green: 1, gold: 1, purple: 1, cyan: 1, crimson: 1
      };
      const currentLevel = this.runState.colorLevels![color] || 1;
      if (currentLevel >= 10) return false; // Max level reached
      cost = 15 + (currentLevel - 1) * 5;
    }
    
    if (this.runState.chips >= cost) {
      this.runState.chips -= cost;
      if (upgradeId.startsWith('level_')) {
        const color = upgradeId.replace('level_', '') as SlotColor;
        this.runState.colorLevels![color] = (this.runState.colorLevels![color] || 1) + 1;
      } else {
        // Unlock abilities
        if (!this.runState.colorUnlocks) this.runState.colorUnlocks = { red_ability: false, black_ability: false, green_ability: false };
        if (upgradeId === 'red_ability_unlock') {
          this.runState.colorUnlocks!.red_ability = true;
        } else if (upgradeId === 'black_ability_unlock') {
          this.runState.colorUnlocks!.black_ability = true;
        } else if (upgradeId === 'green_ability_unlock') {
          this.runState.colorUnlocks!.green_ability = true;
        }
        applyBoardUpgrade(this.runState.playerWheel, upgrade);
      }
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


  simulateEnemyPlay(): {
    hand: Card[];
    allPlays: Array<{ card: Card | null; betType: string; numberValue?: number; score: number }>;
  } {
    if (!this.battleState) return { hand: [], allPlays: [] };
    const enemy = this.battleState.enemy;
    const activeWheel = this.battleState.enemyWheel;
    
    // 1. Determine enemy card pool based on theme
    const themeCards: string[] = [];
    if (enemy.spriteName === 'wraith') {
      themeCards.push('crimson_double', 'dark_fury', 'attraction_coil', 'repulsion_coil');
    } else if (enemy.spriteName === 'croupier') {
      themeCards.push('green_greed', 'steel_barricade', 'scrap_shield');
    } else if (enemy.spriteName === 'decay_wheel') {
      themeCards.push('friction_oil', 'focus_sight');
    } else if (enemy.isBoss) {
      themeCards.push('crimson_double', 'dark_fury', 'green_greed', 'predictive_sight', 'eagle_eye', 'fortress_shield');
    } else if (enemy.isElite) {
      themeCards.push('predictive_sight', 'steel_barricade', 'attraction_coil', 'repulsion_coil');
    } else {
      // Default gambler
      themeCards.push('scrap_shield', 'focus_sight');
    }

    // Pick 2 random cards from their theme pool to represent their "hand" for this turn
    let hand: Card[] = [];
    if ((enemy as any).simulatedHand && (enemy as any).simulatedHand.length > 0) {
      hand = (enemy as any).simulatedHand;
    } else {
      const shuffled = [...themeCards].sort(() => Math.random() - 0.5);
      hand = shuffled.slice(0, 2).map(id => getCardById(id)).filter(Boolean) as Card[];
      (enemy as any).simulatedHand = hand;
    }

    const options: (Card | null)[] = [null, ...hand];

    // 2. Determine Risk Tolerance based on scores
    const isPointsMode = this.runState.combatMode === 'points';
    let riskTolerance = 0.1;
    const pScore = this.battleState.playerScore || 0;
    const eScore = this.battleState.enemyScore || 0;
    const roundsPlayed = this.battleState.turn;
    const maxRounds = this.battleState.maxRounds || 3;
    
    if (isPointsMode) {
      if (eScore < pScore) {
        riskTolerance = Math.min(1.0, 0.1 + (pScore - eScore) * 0.08);
      }
      if (roundsPlayed >= maxRounds && eScore < pScore) {
        riskTolerance = 1.0;
      }
    }

    const evaluateOption = (card: Card | null, betType: string, numberValue?: number) => {
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
      
      const ev = this.calculateBetEV(betType, numberValue, activeWheel, tempPredictionSector, this.battleState!.boardModifiers);
      
      let risk = 0.1;
      if (betType === 'number') risk = 1.0;
      else if (betType === 'green') risk = 0.8;
      else if (['gold', 'purple', 'cyan', 'crimson'].includes(betType)) risk = 0.5;
      
      const score = ev * (1.0 - Math.abs(risk - riskTolerance));
      
      this.battleState!.physicsModifiers = originalPhysics;
      this.battleState!.boardModifiers = originalBoard;
      
      return score;
    };

    const allPlays: { card: Card | null; betType: string; numberValue?: number; score: number }[] = [];
    const baseBets = ['red', 'black', 'green', 'odd', 'even'];
    const hasColor = (c: SlotColor) => activeWheel.numbers.some(n => getSlotColor(n, activeWheel) === c);
    if (hasColor('gold')) baseBets.push('gold');
    if (hasColor('purple')) baseBets.push('purple');
    if (hasColor('cyan')) baseBets.push('cyan');
    if (hasColor('crimson')) baseBets.push('crimson');

    options.forEach(card => {
      baseBets.forEach(bet => {
        const score = evaluateOption(card, bet);
        allPlays.push({ card, betType: bet, score });
      });
      
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
      
      this.battleState!.physicsModifiers = originalPhysics;
      this.battleState!.boardModifiers = originalBoard;
      
      tempPredictionSector.forEach(num => {
        const score = evaluateOption(card, 'number', num);
        allPlays.push({ card, betType: 'number', numberValue: num, score });
      });
    });

    allPlays.sort((a, b) => b.score - a.score);

    return { hand, allPlays };
  }

  chooseEnemyPlay(): { bets: Bet[]; card: Card | null; betType: string; numberValue?: number } {
    if (!this.battleState) return { bets: [{ type: 'red', amount: 1 }], card: null, betType: 'red' };
    const enemy = this.battleState.enemy;
    const difficulty = enemy.difficulty !== undefined ? enemy.difficulty : 0.5;

    // Back up player modifiers to prevent contamination of enemy turn
    (this.battleState as any).playerTurnModifiersBackup = {
      physicsModifiers: JSON.parse(JSON.stringify(this.battleState.physicsModifiers)),
      boardModifiers: JSON.parse(JSON.stringify(this.battleState.boardModifiers)),
      predictionSector: this.battleState.predictionSector ? [...this.battleState.predictionSector] : []
    };

    // Clean enemy default modifiers
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

    this.battleState.boardModifiers = {
      extraGreenSlots: 0,
      convertNumbersToRed: [],
      convertNumbersToBlack: [],
      convertNumbersToGreen: [],
      convertNumbersToGold: [],
      convertNumbersToPurple: [],
      convertNumbersToCyan: [],
      convertNumbersToCrimson: [],
      capitalVentureCount: 0,
      customSlotColors: {},
      payoutMultipliers: {
        red: this.battleState.enemyWheel.payoutMultipliers.red,
        black: this.battleState.enemyWheel.payoutMultipliers.black,
        green: this.battleState.enemyWheel.payoutMultipliers.green,
        number: this.battleState.enemyWheel.payoutMultipliers.number,
        odd: this.battleState.enemyWheel.payoutMultipliers.odd,
        even: this.battleState.enemyWheel.payoutMultipliers.even
      },
      goldFoils: [],
      copperPlates: [],
      tempDurations: {},
      bloodSpillSlots: []
    };

    const backupBoard = (this.battleState as any).playerTurnModifiersBackup.boardModifiers;
    if (backupBoard) {
      if (backupBoard.dangerZones) {
        this.battleState.boardModifiers.dangerZones = JSON.parse(JSON.stringify(backupBoard.dangerZones));
      }
      if (backupBoard.cursedZones) {
        this.battleState.boardModifiers.cursedZones = [...backupBoard.cursedZones];
      }
    }

    this.battleState.predictionSector = [];

    const { hand, allPlays } = this.simulateEnemyPlay();
    
    (enemy as any).simulatedHand = hand;
    (enemy as any).simulatedPlays = allPlays;

    let selectedPlay = allPlays[0];
    if (Math.random() > difficulty && allPlays.length > 1) {
      const randomIdx = Math.floor(Math.random() * Math.min(10, allPlays.length));
      selectedPlay = allPlays[randomIdx];
    }
    
    (enemy as any).lastChosenPlay = selectedPlay;

    if (selectedPlay.card) {
      this.applyEnemyCard(selectedPlay.card);
      enemy.activeCard = selectedPlay.card;
    } else {
      enemy.activeCard = null;
    }

    // Now, choose multiple bets based on risk tolerance and current board/physics modifiers (which have cards applied)
    const activeWheel = this.battleState.enemyWheel;
    const boardMods = this.battleState.boardModifiers;
    const isPointsMode = this.runState.combatMode === 'points';
    
    let riskTolerance = 0.1;
    const pScore = this.battleState.playerScore || 0;
    const eScore = this.battleState.enemyScore || 0;
    const roundsPlayed = this.battleState.turn;
    const maxRounds = this.battleState.maxRounds || 3;
    
    if (isPointsMode) {
      if (eScore < pScore) {
        riskTolerance = Math.min(1.0, 0.1 + (pScore - eScore) * 0.08);
      }
      if (roundsPlayed >= maxRounds && eScore < pScore) {
        riskTolerance = 1.0;
      }
    }

    const baseBets = ['red', 'black', 'green', 'odd', 'even'];
    const hasColor = (c: SlotColor) => activeWheel.numbers.some(n => getSlotColor(n, activeWheel, boardMods) === c);
    if (hasColor('gold')) baseBets.push('gold');
    if (hasColor('purple')) baseBets.push('purple');
    if (hasColor('cyan')) baseBets.push('cyan');
    if (hasColor('crimson')) baseBets.push('crimson');

    let predNumbers: number[] = [];
    if (this.battleState.physicsModifiers.predictionSize > 0) {
      const winningNumbers = this.getWinningNumbers(activeWheel);
      predNumbers = this.runPredictionDryRun(activeWheel, winningNumbers);
    }

    const possibleBets: Array<{ type: Bet['type']; numberValue?: number; ev: number; score: number }> = [];

    baseBets.forEach(betType => {
      const ev = this.calculateBetEV(betType, undefined, activeWheel, predNumbers, boardMods);
      let risk = 0.1;
      if (betType === 'green') risk = 0.8;
      else if (['gold', 'purple', 'cyan', 'crimson'].includes(betType)) risk = 0.5;
      const score = ev * (1.0 - Math.abs(risk - riskTolerance));
      possibleBets.push({ type: betType as any, ev, score });
    });

    predNumbers.forEach(num => {
      const ev = this.calculateBetEV('number', num, activeWheel, predNumbers, boardMods);
      const score = ev * (1.0 - Math.abs(1.0 - riskTolerance));
      possibleBets.push({ type: 'number', numberValue: num, ev, score });
    });

    possibleBets.sort((a, b) => b.score - a.score);

    const selectedBetsList: typeof possibleBets = [];
    const seenTypes = new Set<string>();

    for (const b of possibleBets) {
      if (b.score <= 0 && selectedBetsList.length > 0) continue;
      const key = b.type === 'number' ? `number_${b.numberValue}` : b.type;
      if (seenTypes.has(key)) continue;

      if (b.type === 'red' && seenTypes.has('black')) continue;
      if (b.type === 'black' && seenTypes.has('red')) continue;
      if (b.type === 'odd' && seenTypes.has('even')) continue;
      if (b.type === 'even' && seenTypes.has('odd')) continue;

      seenTypes.add(key);
      selectedBetsList.push(b);
      if (selectedBetsList.length >= 3) break;
    }

    if (selectedBetsList.length === 0 && possibleBets.length > 0) {
      selectedBetsList.push(possibleBets[0]);
    }

    const currentEnemyChips = this.battleState.enemyChipsPool !== undefined ? this.battleState.enemyChipsPool : Infinity;
    const totalBudget = Math.max(0, Math.min(currentEnemyChips, enemy.intent.value));
    const finalBets: Bet[] = [];
    let remainingBudget = totalBudget;
    const maxBets = Math.min(3, selectedBetsList.length, totalBudget);

    for (let i = 0; i < maxBets; i++) {
      let amount = 0;
      if (i === maxBets - 1) {
        amount = remainingBudget;
      } else {
        const ratio = maxBets === 3 ? (i === 0 ? 0.5 : 0.3) : 0.65;
        amount = Math.max(1, Math.round(totalBudget * ratio));
        const remainingSlots = maxBets - 1 - i;
        if (amount > remainingBudget - remainingSlots) {
          amount = remainingBudget - remainingSlots;
        }
      }
      
      if (amount > 0) {
        finalBets.push({
          type: selectedBetsList[i].type,
          amount: amount,
          numberValue: selectedBetsList[i].numberValue
        });
        remainingBudget -= amount;
      }
    }

    if (finalBets.length === 0 && totalBudget > 0) {
      finalBets.push({ type: 'red', amount: totalBudget });
    }

    return {
      bets: finalBets,
      card: selectedPlay.card,
      betType: finalBets[0].type,
      numberValue: finalBets[0].numberValue
    };
  }

  // Helper to calculate EV of a bet
  private calculateBetEV(betType: string, numberValue: number | undefined, wheel: WheelConfig, predictionSector: number[], boardMods: BoardModifiers): number {
    let payoutMultiplier = 2.0;
    if (betType === 'red') payoutMultiplier = boardMods.payoutMultipliers.red;
    else if (betType === 'black') payoutMultiplier = boardMods.payoutMultipliers.black;
    else if (betType === 'green') payoutMultiplier = boardMods.payoutMultipliers.green;
    else if (betType === 'number') payoutMultiplier = boardMods.payoutMultipliers.number;
    else if (betType === 'gold') payoutMultiplier = this.getScaledPayoutMultiplier('gold', wheel.payoutMultipliers.gold || 4);
    else if (betType === 'purple') payoutMultiplier = this.getScaledPayoutMultiplier('purple', wheel.payoutMultipliers.purple || 4);
    else if (betType === 'cyan') payoutMultiplier = this.getScaledPayoutMultiplier('cyan', wheel.payoutMultipliers.cyan || 4);
    else if (betType === 'crimson') payoutMultiplier = this.getScaledPayoutMultiplier('crimson', wheel.payoutMultipliers.crimson || 6);
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
      const s = predictionSector.length;
      const activePlayed = this.battleState?.activePlayedCards || [];
      const hasLowRarityPhysics = activePlayed.some(c => 
        c.type === 'physics' && (c.rarity === 'common' || c.rarity === 'uncommon')
      );
      const cheatingPenalty = hasLowRarityPhysics ? 0.3 : 1.0;

      let penalty = 1.0;
      if (s === 9 || s === 7) penalty = 0.3;
      else if (s === 5 || s === 3) penalty = 0.5;
      else if (s === 1) penalty = 1.0;
      else if (s > 0) {
        if (s >= 7) penalty = 0.3;
        else if (s >= 3) penalty = 0.5;
      }
      return (wins / predictionSector.length) * (payoutMultiplier * Math.min(penalty, cheatingPenalty));
    } else {
      const activePlayed = this.battleState?.activePlayedCards || [];
      const hasLowRarityPhysics = activePlayed.some(c => 
        c.type === 'physics' && (c.rarity === 'common' || c.rarity === 'uncommon')
      );
      const cheatingPenalty = hasLowRarityPhysics ? 0.3 : 1.0;

      let wins = 0;
      wheel.numbers.forEach(num => {
        if (this.isBetWinning(betType, numberValue, num, wheel, boardMods)) {
          wins++;
        }
      });
      return (wins / totalSlots) * payoutMultiplier * cheatingPenalty;
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
