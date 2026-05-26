export type GameState = 'MENU' | 'WHEEL_SELECT' | 'MAP' | 'COMBAT' | 'SHOP' | 'EVENT' | 'GAME_OVER' | 'VICTORY';

export type CardType = 'physics' | 'board' | 'payout' | 'utility';
export type CardRarity = 'common' | 'uncommon' | 'rare';

export interface Card {
  id: string;
  name: string;
  description: string;
  cost: number; // Cost in Essence/Chips
  type: CardType;
  rarity: CardRarity;
  effectId: string; // Identifier for logic lookups
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
}

export type NodeType = 'combat' | 'elite' | 'event' | 'shop' | 'boss';

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
  colors: Record<number, 'red' | 'black' | 'green'>;
  payoutMultipliers: {
    red: number;
    black: number;
    green: number;
    number: number;
    odd: number;
    even: number;
  };
  upgrades: string[]; // IDs of purchased board upgrades
}

export interface BoardUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effectType: 'multiplier_boost' | 'add_green_slot' | 'convert_to_red' | 'convert_to_black' | 'lucky_number' | 'physics_mod';
  value: any;
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
}

export interface Bet {
  type: 'red' | 'black' | 'green' | 'number' | 'odd' | 'even';
  numberValue?: number;
  amount: number;
}

export interface BattleState {
  enemy: Enemy;
  turn: number;
  chipsPool: number; // Chips available to bet this turn
  hand: Card[];
  drawPile: Card[];
  discardPile: Card[];
  bets: Bet[];
  activePlayedCards?: Card[];
  playerWheel: WheelConfig;
  enemyWheel: WheelConfig;
  turnStartBackup?: {
    chipsPool: number;
    hp: number;
    physicsModifiers: PhysicsModifiers;
    boardModifiers: BoardModifiers;
    enemyIntent: EnemyIntent;
    playerWheel: WheelConfig;
    enemyWheel: WheelConfig;
  } | null;
  lastSpinResult: {
    number: number;
    color: 'red' | 'black' | 'green';
    damageDealt: number;
    playerDamageTaken: number;
    betsEvaluated?: Bet[];
    cardsActive?: Card[];
  } | null;
  physicsModifiers: PhysicsModifiers;
  boardModifiers: BoardModifiers;
  phase: 'betting' | 'spinning' | 'resolved';
  activeWheelOwner: 'player' | 'enemy';
}

export interface PhysicsModifiers {
  spinSpeed: number;        // Multiplier (default 1)
  ballMass: number;         // Multiplier (default 1)
  friction: number;         // Multiplier (default 1)
  bounceRandomness: number; // Scale (default 0.1)
  wheelTilt: number;        // Angle (default 0)
  targetZoneBias: number;   // Bias towards active bets (-1 to 1)
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
}
