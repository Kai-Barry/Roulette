export type GameState = 'MENU' | 'LOADOUT_STORE' | 'MAP' | 'COMBAT' | 'SHOP' | 'EVENT' | 'GAME_OVER' | 'VICTORY' | 'FORGE';

export type SlotColor = 'red' | 'black' | 'green' | 'gold' | 'purple' | 'cyan' | 'crimson' | 'blue' | 'pink' | 'brown' | 'orange' | 'yellow' | 'grey' | 'white';
export type BetColor = 'red' | 'black' | 'green' | 'gold' | 'purple' | 'cyan' | 'crimson' | 'blue' | 'pink' | 'brown' | 'orange' | 'yellow' | 'grey' | 'white';
export type WheelRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export type CardType = 'physics' | 'board' | 'payout' | 'utility' | 'chaos' | 'paint' | 'money';
export type CardRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface Card {
  id: string;
  name: string;
  description: string;
  cost: number; // Cost in Essence/Chips
  type: CardType;
  rarity: CardRarity;
  effectId: string; // Identifier for logic lookups
  markedSlots?: number[];
}

export interface Relic {
  id: string;
  name: string;
  description: string;
  effectId: string;
}

export type EnemyActionType = 'attack' | 'shield' | 'physics_debuff' | 'steal_chips' | 'block_red' | 'buff';

export interface EnemyIntent {
  type: EnemyActionType;
  value: number;
  description: string;
}

export interface Enemy {
  id: string;
  name: string;
  maxHp: number;
  hp: number;
  intent: EnemyIntent;
  patternIndex: number;
  spriteName: string; // low poly representation name
  isBoss: boolean;
  isElite?: boolean;
  difficulty?: number;
  activeCard?: Card | null;
}

export type NodeType = 'combat' | 'elite' | 'event' | 'shop' | 'boss' | 'forge';

export interface MapNode {
  id: string;
  type: NodeType;
  floor: number;
  lane: number;
  connections: string[]; // Connected node IDs on next floor
  completed: boolean;
}

export interface WheelConfig {
  id: string;
  name: string;
  description: string;
  numbers: number[];
  greenNumbers: number[];
  colors: Record<number, SlotColor>;
  payoutMultipliers: {
    red: number;
    black: number;
    green: number;
    number: number;
    odd: number;
    even: number;
    gold?: number;
    purple?: number;
    cyan?: number;
    crimson?: number;
  };
  upgrades: string[]; // IDs of purchased board upgrades
  rarity?: WheelRarity;
  pointsCost?: number;
}

export interface BoardUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effectType: 'multiplier_boost' | 'add_green_slot' | 'convert_to_red' | 'convert_to_black' | 'lucky_number' | 'physics_mod';
  value: any;
}

export interface StoreItem {
  id: string;
  type: 'card' | 'wheel';
  itemId: string; // card effectId key or wheel id
  name: string;
  description: string;
  rarity: CardRarity | WheelRarity;
  pointsCost: number;
  purchased: boolean;
}

export interface ForgeCard {
  id: string;
  name: string;
  description: string;
  rarity: 'bronze' | 'silver' | 'gold';
  cost: number;
  effect: {
    type: 'destroy_random' | 'remove_color' | 'remove_green' | 'add_color' | 'upgrade_multiplier' | 'convert_color';
    params: {
      count?: number;
      color?: SlotColor;
      fromColor?: SlotColor;
      toColor?: SlotColor;
      upgradeType?: 'red' | 'black' | 'green' | 'number' | 'odd' | 'even';
      upgradeAmount?: number;
    }
  };
  purchased: boolean;
}

export interface RunState {
  hp: number;
  maxHp: number;
  chips: number; // Global money/currency
  deck: Card[];
  relics: Relic[];
  currentFloor: number;
  mapNodes: MapNode[][];
  currentNodeId: string | null;
  gameState: GameState;
  selectedWheelId: string;
  playerWheel: WheelConfig;
  // Store system
  storePoints?: number;
  storeItems?: StoreItem[];
  // Forge system
  forgeCards?: ForgeCard[];
  forgeRerollCount?: number;
  combatMode?: 'points' | 'damage';
  colorLevels?: Partial<Record<SlotColor, number>>;
  colorUnlocks?: Record<string, boolean>;
}

export interface Bet {
  type: 'red' | 'black' | 'green' | 'number' | 'odd' | 'even' | 'gold' | 'purple' | 'cyan' | 'crimson' | 'blue' | 'pink' | 'brown' | 'orange' | 'yellow' | 'grey' | 'white';
  numberValue?: number;
  amount: number;
}

export interface Curse {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface BattleState {
  enemy: Enemy;
  encounterType?: 'combat' | 'elite' | 'boss';
  curse?: Curse;
  isTestCombatMode?: boolean;
  turn: number;
  playerScore?: number;
  enemyScore?: number;
  maxRounds?: number;
  isSuddenDeath?: boolean;
  chipsPool: number; // Chips available to bet this turn
  enemyChipsPool?: number; // Enemy chips pool
  hand: Card[];
  drawPile: Card[];
  discardPile: Card[];
  bets: Bet[];
  backupBets?: Bet[];
  activePlayedCards?: Card[];
  drawsThisTurn: number;
  playerWheel: WheelConfig;
  enemyWheel: WheelConfig;
  predictionSector?: number[]; // List of numbers predicted to win
  predictionOffset?: number;
  spinSeedAngle?: number;
  ballSeedAngle?: number;
  spinSeedSpeed?: number;
  ballSeedSpeed?: number;
  turnStartBackup?: {
    chipsPool: number;
    hp: number;
    physicsModifiers: PhysicsModifiers;
    boardModifiers: BoardModifiers;
    enemyIntent: EnemyIntent;
    playerWheel: WheelConfig;
    enemyWheel: WheelConfig;
    spinSeedAngle?: number;
    ballSeedAngle?: number;
    spinSeedSpeed?: number;
    ballSeedSpeed?: number;
    hand: Card[];
    drawPile: Card[];
    discardPile: Card[];
  } | null;
  lastSpinResult: {
    number: number;
    color: SlotColor;
    betColor: BetColor;
    damageDealt: number;
    playerDamageTaken: number;
    betsEvaluated?: Bet[];
    cardsActive?: Card[];
    slotEffect?: string; // description of special color effect that triggered
    enemyWon?: boolean;
    allOutcomes?: { number: number; color: SlotColor }[];
  } | null;
  physicsModifiers: PhysicsModifiers;
  boardModifiers: BoardModifiers;
  phase: 'betting' | 'spinning' | 'resolved';
  activeWheelOwner: 'player' | 'enemy';
  isResolving?: boolean;
}

export interface PhysicsModifiers {
  spinSpeed: number;        // Multiplier (default 1)
  ballMass: number;         // Multiplier (default 1)
  friction: number;         // Multiplier (default 1)
  bounceRandomness: number; // Scale (default 0.1)
  wheelTilt: number;        // Angle (default 0)
  targetZoneBias: number;   // Bias towards active bets (-1 to 1)
  predictionSize: number;   // Size of sector to predict (e.g. 3, 5, 7 or 0 if none)
  nudgeCheatActive: boolean; // Is nudge cheat active?
  biasRedOnly?: boolean;
  biasBlackOnly?: boolean;
  nudgeDistance?: number;   // Max slots to nudge
  multiballCount?: number;
  splitPegActive?: boolean;
  shotgunTime?: number;
}

export interface BoardModifiers {
  extraGreenSlots: number;    // Count
  convertNumbersToRed: number[]; // Numbers to force-color red
  convertNumbersToBlack: number[]; // Numbers to force-color black
  payoutMultipliers: {
    red: number;     // default 2
    black: number;   // default 2
    green: number;   // default 14
    number: number;  // default 36
    odd: number;     // default 2
    even: number;    // default 2
  };
  primeMultiplier?: number;
  highMultiplier?: number; // 19-36
  lowMultiplier?: number;  // 1-18
  dozenMultipliers?: Record<number, number>; // dozen index 1, 2, 3 -> multiplier
  columnMultipliers?: Record<number, number>; // col index 1, 2, 3 -> multiplier
  customNumberMultipliers?: Record<number, number>; // number -> multiplier
  luckyZones?: number[]; // list of numbers in lucky zones (+1.5x damage)
  cursedZones?: number[]; // list of numbers in cursed zones (enemy stun)
  chipMines?: Record<number, number>; // number -> chip reward
  lifeFountains?: Record<number, number>; // number -> healing amount
  dangerZones?: Record<number, number>; // number -> flat damage to enemy
  goldFoils?: number[]; // numbers with 3x damage multiplier
  copperPlates?: number[]; // numbers with 1.5x damage multiplier
  mirrorSlots?: Record<number, number>; // source number -> mirror target number
  doubleNextPayout?: boolean;
  insuranceActive?: boolean;
  redStreakCount?: number;
  blackStreakCount?: number;
  redStreakActive?: boolean;
  blackStreakActive?: boolean;
  globalMultiplier?: number;
  enemyNextStun?: boolean;
  enemyStunTurns?: number;
  tempDurations?: Record<string, number>;
  bloodSpillSlots?: number[];
  convertAllToRed?: boolean;
  convertAllToBlack?: boolean;
  convertAllToGreen?: boolean;
  convertNumbersToGreen?: number[];
  convertNumbersToGold?: number[];
  convertNumbersToPurple?: number[];
  convertNumbersToCyan?: number[];
  convertNumbersToCrimson?: number[];
  convertAllToGold?: boolean;
  convertAllToPurple?: boolean;
  convertAllToCyan?: boolean;
  convertAllToCrimson?: boolean;
  capitalVentureCount?: number;
  customSlotColors?: Record<number, SlotColor>;
}
