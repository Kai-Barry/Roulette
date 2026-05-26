import { WheelConfig, BoardUpgrade } from './Types';

export const WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export const RED_NUMBERS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
]);

export function initializeWheelColors(wheel: WheelConfig) {
  if (wheel.id === 'custom') {
    if (wheel.colors && Object.keys(wheel.colors).length > 0) {
      return;
    }
  }
  wheel.colors = {};
  wheel.numbers.forEach(num => {
    if (wheel.greenNumbers.includes(num)) {
      wheel.colors[num] = 'green';
    } else if (wheel.id === 'dozen') {
      // Devil's dozen: Odd is red, Even is black
      wheel.colors[num] = num % 2 !== 0 ? 'red' : 'black';
    } else if (wheel.id === 'crimson') {
      // Crimson wheel: standard colors, but convert 2, 4, 6, 8, 10, 11 to red
      const forcedRed = [2, 4, 6, 8, 10, 11];
      if (forcedRed.includes(num)) {
        wheel.colors[num] = 'red';
      } else {
        wheel.colors[num] = RED_NUMBERS.has(num) ? 'red' : 'black';
      }
    } else {
      // Standard roulette colors
      wheel.colors[num] = RED_NUMBERS.has(num) ? 'red' : 'black';
    }
  });
}

export const WHEEL_TEMPLATES: Record<string, WheelConfig> = {
  classic: {
    id: 'classic',
    name: 'The Gilded Classic',
    description: 'Standard 37-slot casino layout. Balanced and reliable.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 14, number: 36, odd: 2, even: 2 },
    upgrades: []
  },
  dozen: {
    id: 'dozen',
    name: 'The Devil\'s Dozen',
    description: '13-slot mini-wheel (0-12). High volatility, rapid payout cycle.',
    numbers: [0, 9, 2, 7, 4, 5, 12, 1, 10, 3, 8, 11, 6],
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 6, number: 12, odd: 2, even: 2 },
    upgrades: []
  },
  crimson: {
    id: 'crimson',
    name: 'The Blood Reservoir',
    description: '37-slot wheel. Several Black slots are Red. Black payouts are boosted (2.5x).',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 1.8, black: 2.5, green: 14, number: 36, odd: 2, even: 2 },
    upgrades: []
  },
  void: {
    id: 'void',
    name: 'The Void Gateway',
    description: '37-slot wheel with 3 Green slots (0, 18, 36). Very high Green hit rate.',
    numbers: WHEEL_NUMBERS,
    greenNumbers: [0, 18, 36],
    colors: {},
    payoutMultipliers: { red: 2, black: 2, green: 10, number: 36, odd: 2, even: 2 },
    upgrades: []
  },
  custom: {
    id: 'custom',
    name: 'Custom Board Designer',
    description: 'Create your own wheel from scratch. Customize slots, colors, and payouts.',
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    greenNumbers: [0],
    colors: {},
    payoutMultipliers: { red: 2.0, black: 2.0, green: 10.0, number: 12.0, odd: 2.0, even: 2.0 },
    upgrades: []
  }
};

// Initialize colors for all templates
Object.values(WHEEL_TEMPLATES).forEach(initializeWheelColors);

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
    name: 'Sinner\'s Seven',
    description: 'Number 7 becomes a Golden Lucky slot: landing on it heals 6 Blood HP.',
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
