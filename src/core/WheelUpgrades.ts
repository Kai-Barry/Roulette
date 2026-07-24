import { WheelConfig, BoardUpgrade, SlotColor } from './Types';

export const WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export const RED_NUMBERS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
]);

export function initializeWheelColors(wheel: WheelConfig) {
  // Guarantee rare color multipliers are defined at runtime
  if (wheel.payoutMultipliers.gold === undefined) wheel.payoutMultipliers.gold = 4;
  if (wheel.payoutMultipliers.purple === undefined) wheel.payoutMultipliers.purple = 4;
  if (wheel.payoutMultipliers.cyan === undefined) wheel.payoutMultipliers.cyan = 4;
  if (wheel.payoutMultipliers.crimson === undefined) wheel.payoutMultipliers.crimson = 6;

  // Preserve existing colors for wheels that define them explicitly
  if (wheel.colors && Object.keys(wheel.colors).length > 0) {
    return;
  }
  wheel.colors = {};
  wheel.numbers.forEach(num => {
    if (wheel.greenNumbers.includes(num)) {
      wheel.colors[num] = 'green';
    } else {
      // Standard roulette colors
      wheel.colors[num] = RED_NUMBERS.has(num) ? 'red' : 'black';
    }
  });
}

// Helper to assign special colors to specific slots
function assignSpecialColors(wheel: WheelConfig, assignments: Record<number, SlotColor>) {
  for (const [numStr, color] of Object.entries(assignments)) {
    const num = Number(numStr);
    if (wheel.numbers.includes(num)) {
      wheel.colors[num] = color;
    }
  }
}

// --- WHEEL POOL BY RARITY ---

// COMMON WHEELS: Standard layouts, no special colors
const COMMON_WHEELS: WheelConfig[] = [
  {
    id: 'classic',
    name: 'The Gilded Classic',
    description: 'Standard 37-slot European layout. Balanced and reliable.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 14, number: 36, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'common',
    pointsCost: 0
  },
  {
    id: 'dozen',
    name: "The Devil's Dozen",
    description: '13-slot mini-wheel. High volatility, rapid payout cycle.',
    numbers: [0, 9, 2, 7, 4, 5, 12, 1, 10, 3, 8, 11, 6],
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 6, number: 12, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'common',
    pointsCost: 0
  },
  {
    id: 'half_wheel',
    name: 'The Split',
    description: '19-slot half-wheel (0-18). Fast spins, good for low-number strategies.',
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 8, number: 18, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'common',
    pointsCost: 0
  },
  {
    id: 'double_zero',
    name: 'American Dread',
    description: '38-slot wheel with 0 and 00. Two green slots for extra risk.',
    numbers: [...WHEEL_NUMBERS, 37], // 37 represents "00"
    greenNumbers: [0, 37],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 12, number: 37, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'common',
    pointsCost: 0
  },
  {
    id: 'red_heavy',
    name: 'Scarlet Table',
    description: '37-slot wheel with extra red slots. Good for red betting strategies.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 1.8, black: 2.4, green: 14, number: 36, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'common',
    pointsCost: 0
  },
  {
    id: 'black_heavy',
    name: 'Obsidian Slab',
    description: '37-slot wheel with extra black slots. Good for black betting strategies.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2.4, black: 1.8, green: 14, number: 36, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'common',
    pointsCost: 0
  }
];

// UNCOMMON WHEELS: 1-2 special slots (gold), minor payout boosts
const UNCOMMON_WHEELS: WheelConfig[] = [
  {
    id: 'midas_touch',
    name: 'The Midas Touch',
    description: '37 slots with 2 GOLD slots. Gold heals 3 HP and pays 3x.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 14, number: 36, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'uncommon',
    pointsCost: 5
  },
  {
    id: 'lucky_streak',
    name: 'Lucky Streak',
    description: '25 slots, extra green, 1 GOLD slot. Compact and rewarding.',
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    greenNumbers: [0, 12],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 10, number: 24, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'uncommon',
    pointsCost: 5
  },
  {
    id: 'merchant',
    name: 'The Merchant',
    description: '13 slots with 1 GOLD slot and boosted number payouts.',
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 6, number: 15, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'uncommon',
    pointsCost: 5
  },
  {
    id: 'verdant',
    name: 'Verdant Fortune',
    description: '37 slots with 3 green and 1 GOLD. High green hit rate.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0, 18, 36],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 10, number: 36, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'uncommon',
    pointsCost: 5
  },
  {
    id: 'crimson_tide',
    name: 'Crimson Tide',
    description: '37 slots. Extra red slots (6 blacks become red) with boosted black payout.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 1.8, black: 2.5, green: 14, number: 36, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'uncommon',
    pointsCost: 5
  }
];

// RARE WHEELS: 2-3 special slots, unique layouts
const RARE_WHEELS: WheelConfig[] = [
  {
    id: 'phantom',
    name: 'The Phantom',
    description: '37 slots with 2 PURPLE curse slots and 1 CYAN shield slot. Risk and reward.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2.2, black: 2.2, green: 16, number: 36, odd: 2.2, even: 2.2 },
    upgrades: [],
    rarity: 'rare',
    pointsCost: 10
  },
  {
    id: 'shieldwall',
    name: 'Shieldwall',
    description: '25 slots with 3 CYAN shield slots. Defensive powerhouse.',
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 10, number: 24, odd: 2, even: 2 },
    upgrades: [],
    rarity: 'rare',
    pointsCost: 10
  },
  {
    id: 'gambler',
    name: "The Gambler's Edge",
    description: '13 slots, 2 GOLD, 1 PURPLE. Extreme risk/reward in a compact wheel.',
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2.5, black: 2.5, green: 8, number: 14, odd: 2.5, even: 2.5 },
    upgrades: [],
    rarity: 'rare',
    pointsCost: 10
  },
  {
    id: 'chaos_engine',
    name: 'Chaos Engine',
    description: '37 slots with randomized high payouts. 1 GOLD, 1 PURPLE, 1 CYAN.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2.5, black: 1.5, green: 18, number: 40, odd: 3.0, even: 1.5 },
    upgrades: [],
    rarity: 'rare',
    pointsCost: 10
  }
];

// LEGENDARY WHEELS: 3-5 special slots, powerful unique mechanics
const LEGENDARY_WHEELS: WheelConfig[] = [
  {
    id: 'bloodletter',
    name: 'Bloodletter',
    description: '37 slots with 3 CRIMSON and 2 PURPLE slots. Enormous damage potential.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2.5, black: 2.5, green: 18, number: 40, odd: 2.5, even: 2.5 },
    upgrades: [],
    rarity: 'legendary',
    pointsCost: 15
  },
  {
    id: 'alchemist',
    name: 'The Alchemist',
    description: '25 slots with 2 GOLD, 2 CYAN, 1 CRIMSON. Perfectly balanced power.',
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2.2, black: 2.2, green: 12, number: 28, odd: 2.2, even: 2.2 },
    upgrades: [],
    rarity: 'legendary',
    pointsCost: 15
  },
  {
    id: 'deaths_roulette',
    name: "Death's Roulette",
    description: '13 slots with 1 CRIMSON, 1 PURPLE, 1 GOLD. Insane payouts but dangerous.',
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 3.0, black: 3.0, green: 10, number: 16, odd: 3.0, even: 3.0 },
    upgrades: [],
    rarity: 'legendary',
    pointsCost: 15
  }
];

// Initialize colors for all wheels, then apply special color assignments
function initAllWheels() {
  // Common wheels - standard colors only
  for (const w of COMMON_WHEELS) {
    initializeWheelColors(w);
  }
  // Inject some starting special slots to common wheels to make rare colors more common early on
  assignSpecialColors(COMMON_WHEELS.find(w => w.id === 'classic')!, { 7: 'gold' });
  assignSpecialColors(COMMON_WHEELS.find(w => w.id === 'dozen')!, { 6: 'purple' });
  assignSpecialColors(COMMON_WHEELS.find(w => w.id === 'half_wheel')!, { 13: 'cyan' });
  assignSpecialColors(COMMON_WHEELS.find(w => w.id === 'double_zero')!, { 11: 'gold' });
  // Special color assignments for red_heavy
  const redHeavy = COMMON_WHEELS.find(w => w.id === 'red_heavy')!;
  [2, 4, 6, 8, 10, 11].forEach(n => { if (redHeavy.colors[n] !== undefined) redHeavy.colors[n] = 'red'; });
  // Special color assignments for black_heavy
  const blackHeavy = COMMON_WHEELS.find(w => w.id === 'black_heavy')!;
  [1, 3, 5, 7, 9, 12].forEach(n => { if (blackHeavy.colors[n] !== undefined) blackHeavy.colors[n] = 'black'; });

  // Uncommon wheels
  for (const w of UNCOMMON_WHEELS) {
    initializeWheelColors(w);
  }
  assignSpecialColors(UNCOMMON_WHEELS.find(w => w.id === 'midas_touch')!, { 7: 'gold', 28: 'gold' });
  assignSpecialColors(UNCOMMON_WHEELS.find(w => w.id === 'lucky_streak')!, { 7: 'gold' });
  assignSpecialColors(UNCOMMON_WHEELS.find(w => w.id === 'merchant')!, { 7: 'gold' });
  assignSpecialColors(UNCOMMON_WHEELS.find(w => w.id === 'verdant')!, { 7: 'gold' });
  // Crimson tide: convert 6 black to red
  const crimsonTide = UNCOMMON_WHEELS.find(w => w.id === 'crimson_tide')!;
  [2, 4, 6, 8, 10, 11].forEach(n => { if (crimsonTide.colors[n] !== undefined) crimsonTide.colors[n] = 'red'; });

  // Rare wheels
  for (const w of RARE_WHEELS) {
    initializeWheelColors(w);
  }
  assignSpecialColors(RARE_WHEELS.find(w => w.id === 'phantom')!, { 13: 'purple', 31: 'purple', 17: 'cyan' });
  assignSpecialColors(RARE_WHEELS.find(w => w.id === 'shieldwall')!, { 5: 'cyan', 12: 'cyan', 20: 'cyan' });
  assignSpecialColors(RARE_WHEELS.find(w => w.id === 'gambler')!, { 3: 'gold', 9: 'gold', 6: 'purple' });
  assignSpecialColors(RARE_WHEELS.find(w => w.id === 'chaos_engine')!, { 7: 'gold', 13: 'purple', 25: 'cyan' });

  // Legendary wheels
  for (const w of LEGENDARY_WHEELS) {
    initializeWheelColors(w);
  }
  assignSpecialColors(LEGENDARY_WHEELS.find(w => w.id === 'bloodletter')!, { 7: 'crimson', 17: 'crimson', 30: 'crimson', 13: 'purple', 31: 'purple' });
  assignSpecialColors(LEGENDARY_WHEELS.find(w => w.id === 'alchemist')!, { 3: 'gold', 15: 'gold', 8: 'cyan', 20: 'cyan', 12: 'crimson' });
  assignSpecialColors(LEGENDARY_WHEELS.find(w => w.id === 'deaths_roulette')!, { 7: 'crimson', 4: 'purple', 10: 'gold' });
}

initAllWheels();

// Combined pool for easy access
export const WHEEL_POOL: Record<string, WheelConfig[]> = {
  common: COMMON_WHEELS,
  uncommon: UNCOMMON_WHEELS,
  rare: RARE_WHEELS,
  legendary: LEGENDARY_WHEELS
};

// Get all wheels flat
export function getAllWheels(): WheelConfig[] {
  return [...COMMON_WHEELS, ...UNCOMMON_WHEELS, ...RARE_WHEELS, ...LEGENDARY_WHEELS];
}

// Get a specific wheel by id
export function getWheelById(id: string): WheelConfig | undefined {
  return getAllWheels().find(w => w.id === id);
}

// Generate store wheel offerings: 2 uncommon + 1 rare
export function generateStoreWheels(): WheelConfig[] {
  const uncommons = [...UNCOMMON_WHEELS];
  const rares = [...RARE_WHEELS];
  
  // Shuffle
  for (let i = uncommons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uncommons[i], uncommons[j]] = [uncommons[j], uncommons[i]];
  }
  for (let i = rares.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rares[i], rares[j]] = [rares[j], rares[i]];
  }
  
  return [
    JSON.parse(JSON.stringify(uncommons[0])),
    JSON.parse(JSON.stringify(uncommons[1])),
    JSON.parse(JSON.stringify(rares[0]))
  ];
}

// Get a random common wheel for the starter loadout
export function getRandomCommonWheel(): WheelConfig {
  const idx = Math.floor(Math.random() * COMMON_WHEELS.length);
  return JSON.parse(JSON.stringify(COMMON_WHEELS[idx]));
}

// Legacy compatibility - WHEEL_TEMPLATES maps to common wheels by original id
export const WHEEL_TEMPLATES: Record<string, WheelConfig> = {};
for (const w of getAllWheels()) {
  WHEEL_TEMPLATES[w.id] = w;
}

// --- BOARD UPGRADES (unchanged) ---

export const BOARD_UPGRADES: Record<string, BoardUpgrade> = {
  red_boost: {
    id: 'red_boost',
    name: 'Red Iron Polish',
    description: 'Permanently increases Red bet payout by +0.2x.',
    cost: 10,
    effectType: 'multiplier_boost',
    value: { type: 'red', amount: 0.2 }
  },
  black_boost: {
    id: 'black_boost',
    name: 'Obsidian Coating',
    description: 'Permanently increases Black bet payout by +0.2x.',
    cost: 10,
    effectType: 'multiplier_boost',
    value: { type: 'black', amount: 0.2 }
  },
  green_boost: {
    id: 'green_boost',
    name: 'Jade Encrustation',
    description: 'Permanently increases Green bet payout by +2.0x.',
    cost: 15,
    effectType: 'multiplier_boost',
    value: { type: 'green', amount: 2.0 }
  },
  add_green: {
    id: 'add_green',
    name: 'Verdant Corruption',
    description: 'Permanently converts a random Black slot into a Green slot.',
    cost: 25,
    effectType: 'add_green_slot',
    value: null
  },
  convert_red: {
    id: 'convert_red',
    name: 'Coagulating Mist',
    description: 'Permanently converts a random Black slot into a Red slot.',
    cost: 16,
    effectType: 'convert_to_red',
    value: null
  },
  lucky_seven: {
    id: 'lucky_seven',
    name: "Sinner's Seven",
    description: 'Number 7 becomes a Golden Lucky slot: landing on it heals 6 HP.',
    cost: 20,
    effectType: 'lucky_number',
    value: { number: 7, heal: 6 }
  },
  light_ball: {
    id: 'light_ball',
    name: 'Hollow Ivory Ball',
    description: 'Reduces ball mass by 20% (increases spin velocity and bounce height).',
    cost: 12,
    effectType: 'physics_mod',
    value: { field: 'ballMass', multiplier: 0.8 }
  },
  heavy_friction: {
    id: 'heavy_friction',
    name: 'Velvet Lining',
    description: 'Increases wheel friction by 25% (wheel and ball decelerate faster).',
    cost: 12,
    effectType: 'physics_mod',
    value: { field: 'friction', multiplier: 1.25 }
  },
  red_ability_unlock: {
    id: 'red_ability_unlock',
    name: 'Fever Ignition',
    description: 'Unlock Red slot ability: consecutive Red landing builds Heat Combo (bets multiplier boosted to 3.5x).',
    cost: 18,
    effectType: 'physics_mod',
    value: null
  },
  black_ability_unlock: {
    id: 'black_ability_unlock',
    name: 'Glacier Core',
    description: 'Unlock Black slot ability: consecutive Black landing builds Glacier Shield (drains score from opponent).',
    cost: 18,
    effectType: 'physics_mod',
    value: null
  },
  green_ability_unlock: {
    id: 'green_ability_unlock',
    name: 'Synapse Link',
    description: 'Unlock Green slot ability: landing on Green sets all cards cost to 0 next turn.',
    cost: 22,
    effectType: 'physics_mod',
    value: null
  },
  level_red: {
    id: 'level_red',
    name: 'Planet Mars',
    description: 'Level up Red slots. Increases Red payout multiplier by +0.2x and Fever combo power.',
    cost: 15,
    effectType: 'physics_mod',
    value: { color: 'red' }
  },
  level_black: {
    id: 'level_black',
    name: 'Planet Pluto',
    description: 'Level up Black slots. Increases Black payout multiplier by +0.2x and Glacier drain power.',
    cost: 15,
    effectType: 'physics_mod',
    value: { color: 'black' }
  },
  level_green: {
    id: 'level_green',
    name: 'Planet Earth',
    description: 'Level up Green slots. Increases Green payout multiplier by +2.0x and Synapse bonus power.',
    cost: 15,
    effectType: 'physics_mod',
    value: { color: 'green' }
  },
  level_gold: {
    id: 'level_gold',
    name: 'Planet Saturn',
    description: 'Level up Gold slots. Increases Gold payout multiplier by +0.5x, points and shop chips returns.',
    cost: 15,
    effectType: 'physics_mod',
    value: { color: 'gold' }
  },
  level_purple: {
    id: 'level_purple',
    name: 'Planet Neptune',
    description: 'Level up Purple slots. Increases Purple payout multiplier by +0.5x and corruption stun turns.',
    cost: 15,
    effectType: 'physics_mod',
    value: { color: 'purple' }
  },
  level_cyan: {
    id: 'level_cyan',
    name: 'Planet Uranus',
    description: 'Level up Cyan slots. Increases Cyan payout multiplier by +0.5x, points and card draw counts.',
    cost: 15,
    effectType: 'physics_mod',
    value: { color: 'cyan' }
  },
  level_crimson: {
    id: 'level_crimson',
    name: 'Planet Jupiter',
    description: 'Level up Crimson slots. Increases Crimson payout multiplier by +0.5x and points reward.',
    cost: 15,
    effectType: 'physics_mod',
    value: { color: 'crimson' }
  }
};

export function applyBoardUpgrade(wheel: WheelConfig, upgrade: BoardUpgrade) {
  if (upgrade.effectType === 'multiplier_boost') {
    const { type, amount } = upgrade.value;
    (wheel.payoutMultipliers as any)[type] = parseFloat(((wheel.payoutMultipliers as any)[type] + amount).toFixed(1));
  } else if (upgrade.effectType === 'add_green_slot') {
    // Find a random number that is currently black
    const blackNums = wheel.numbers.filter(num => wheel.colors[num] === 'black');
    if (blackNums.length > 0) {
      const target = blackNums[Math.floor(Math.random() * blackNums.length)];
      wheel.colors[target] = 'green';
      if (!wheel.greenNumbers.includes(target)) {
        wheel.greenNumbers.push(target);
      }
    }
  } else if (upgrade.effectType === 'convert_to_red') {
    const blackNums = wheel.numbers.filter(num => wheel.colors[num] === 'black');
    if (blackNums.length > 0) {
      const target = blackNums[Math.floor(Math.random() * blackNums.length)];
      wheel.colors[target] = 'red';
    }
  }
  wheel.upgrades.push(upgrade.id);
}
