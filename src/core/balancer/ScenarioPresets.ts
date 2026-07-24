import { Bet, BoardModifiers, WheelConfig } from '../Types';

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  wheel: WheelConfig;
  bets: Bet[];
  boardModifiers: BoardModifiers;
}

export const EUROPEAN_WHEEL: WheelConfig = {
  id: 'standard_european',
  name: 'Standard European Wheel',
  description: 'Classic 37-slot roulette wheel with a single 0 green slot.',
  numbers: [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26],
  greenNumbers: [0],
  colors: {},
  payoutMultipliers: {
    red: 2.0,
    black: 2.0,
    green: 14.0,
    number: 36.0,
    odd: 2.0,
    even: 2.0
  },
  upgrades: []
};

export const DEFAULT_BOARD_MODIFIERS: BoardModifiers = {
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

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'red_rusher',
    name: '🔴 Red Rusher',
    description: '10 chip bet placed on Red.',
    wheel: EUROPEAN_WHEEL,
    bets: [{ type: 'red', amount: 10 }],
    boardModifiers: DEFAULT_BOARD_MODIFIERS
  },
  {
    id: 'black_heavy',
    name: '🖤 Black Heavy',
    description: '10 chip bet placed on Black.',
    wheel: EUROPEAN_WHEEL,
    bets: [{ type: 'black', amount: 10 }],
    boardModifiers: DEFAULT_BOARD_MODIFIERS
  },
  {
    id: 'green_gambler',
    name: '🟢 Green Gambler',
    description: '5 chip bet placed on Green (Slot 0).',
    wheel: EUROPEAN_WHEEL,
    bets: [{ type: 'green', amount: 5 }],
    boardModifiers: DEFAULT_BOARD_MODIFIERS
  },
  {
    id: 'number_sniper',
    name: '🎯 Number Sniper',
    description: '2 chips bet on #7, #13, and #21 (6 chips total).',
    wheel: EUROPEAN_WHEEL,
    bets: [
      { type: 'number', numberValue: 7, amount: 2 },
      { type: 'number', numberValue: 13, amount: 2 },
      { type: 'number', numberValue: 21, amount: 2 }
    ],
    boardModifiers: DEFAULT_BOARD_MODIFIERS
  },
  {
    id: 'high_low_split',
    name: '⚡ High Roller (19-36)',
    description: '10 chips bet on High numbers (19-36).',
    wheel: EUROPEAN_WHEEL,
    bets: [{ type: 'even', amount: 10 }],
    boardModifiers: DEFAULT_BOARD_MODIFIERS
  }
];
