import { RunState, BattleState, GameState, Enemy, Card, MapNode, Bet, PhysicsModifiers, BoardModifiers, EnemyActionType, EnemyIntent, WheelConfig } from './Types';
import { createStarterDeck, getCardById } from '../cards/CardDatabase';
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
      targetZoneBias: 0
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
      activeWheelOwner: 'player'
    };

    // Reset physics engines with initial modifiers
    this.playerPhysics.reset(this.battleState!.playerWheel, defaultPhysics);
    this.enemyPhysics.reset(this.battleState!.enemyWheel, defaultPhysics);

    this.runState.gameState = 'COMBAT';
    this.updateEnemyIntent();
    
    // Draw initial hand
    for (let i = 0; i < 4; i++) {
      this.drawCard();
    }

    this.createTurnStartBackup();
  }

  private shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  drawCard() {
    if (!this.battleState) return;
    
    if (this.battleState.drawPile.length === 0) {
      // Reshuffle discard into draw
      this.battleState.drawPile = [...this.battleState.discardPile];
      this.shuffle(this.battleState.drawPile);
      this.battleState.discardPile = [];
    }

    if (this.battleState.drawPile.length > 0 && this.battleState.hand.length < 6) {
      const card = this.battleState.drawPile.pop()!;
      this.battleState.hand.push(card);
    }
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

  // Prepares the physics spin based on active bets (handles magnetic Lodestone cheat bias)
  spinWheel() {
    if (!this.battleState) return null;
    this.battleState.phase = 'spinning';
    
    const activeWheel = (this.battleState as any).activeWheelOwner === 'enemy' ? this.battleState.enemyWheel : this.battleState.playerWheel;
    
    // Find all numbers that are winning numbers based on bets
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

    // Reset correct physics engine with current turn modifiers
    const activePhysics = this.getActivePhysics();
    activePhysics.reset(
      activeWheel,
      this.battleState.physicsModifiers,
      winningNumbers
    );

    return activePhysics;
  }

  // Evaluates the result once physics settles
  resolveSpin() {
    if (!this.battleState) return;
    this.battleState.phase = 'resolved';
    
    const winningNum = this.playerPhysics.getWinningNumber();
    if (winningNum < 0) return; // Physics not settled!

    const activeWheel = this.battleState.playerWheel;
    const color = getSlotColor(winningNum, activeWheel, this.battleState.boardModifiers);
    let damageDealt = 0;

    // Calculate payouts/damage
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
        const isGreenSlot = activeWheel.greenNumbers.includes(winningNum);
        if (isGreenSlot) {
          isWin = true;
          multiplier = activeWheel.payoutMultipliers.green;
        }
      } else if (bet.type === 'number' && bet.numberValue === winningNum) {
        isWin = true;
        multiplier = activeWheel.payoutMultipliers.number;
      } else if (bet.type === 'odd' && !activeWheel.greenNumbers.includes(winningNum) && winningNum % 2 !== 0) {
        isWin = true;
        multiplier = activeWheel.payoutMultipliers.odd;
      } else if (bet.type === 'even' && !activeWheel.greenNumbers.includes(winningNum) && winningNum % 2 === 0) {
        isWin = true;
        multiplier = activeWheel.payoutMultipliers.even;
      }

      if (isWin) {
        damageDealt += bet.amount * multiplier;
      }
    });

    // Apply lucky number checks (Sinner's Seven)
    if (activeWheel.upgrades.includes('lucky_seven') && winningNum === 7) {
      this.runState.hp = Math.min(this.runState.maxHp, this.runState.hp + 6);
    }

    // Apply damage to enemy
    this.battleState.enemy.hp = Math.max(0, this.battleState.enemy.hp - damageDealt);

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
        playerDamageTaken = intent.value;
        this.runState.hp = Math.max(0, this.runState.hp - playerDamageTaken);
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

    // Discard hand and active played cards to discard pile
    this.battleState.discardPile.push(...this.battleState.hand);
    if (this.battleState.activePlayedCards) {
      this.battleState.discardPile.push(...this.battleState.activePlayedCards);
    }
    this.battleState.hand = [];
    this.battleState.activePlayedCards = [];

    // Next turn prep
    this.battleState.turn += 1;
    this.battleState.chipsPool += 8; // Gain base 8 chips per turn
    this.battleState.phase = 'betting';
    (this.battleState as any).activeWheelOwner = 'player';

    // Reset physics modifiers for next turn
    this.battleState.physicsModifiers = {
      spinSpeed: 1.0,
      ballMass: 1.0,
      friction: 1.0,
      bounceRandomness: 0.1,
      wheelTilt: 0,
      targetZoneBias: 0
    };

    // Update intent and draw cards
    this.updateEnemyIntent();
    
    // Draw 4 cards for new turn
    for (let i = 0; i < 4; i++) {
      this.drawCard();
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
      physicsModifiers: JSON.parse(JSON.stringify(this.battleState.physicsModifiers)),
      boardModifiers: JSON.parse(JSON.stringify(this.battleState.boardModifiers)),
      enemyIntent: JSON.parse(JSON.stringify(this.battleState.enemy.intent)),
      playerWheel: JSON.parse(JSON.stringify(this.battleState.playerWheel)),
      enemyWheel: JSON.parse(JSON.stringify(this.battleState.enemyWheel))
    };
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

  selectStartingWheel(wheelId: string) {
    const template = WHEEL_TEMPLATES[wheelId];
    if (template) {
      this.runState.selectedWheelId = wheelId;
      this.runState.playerWheel = JSON.parse(JSON.stringify(template));
      this.runState.gameState = 'MAP';
    }
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
