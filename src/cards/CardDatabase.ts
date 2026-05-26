import { Card } from '../core/Types';

export const CARD_DATABASE: Record<string, Omit<Card, 'id'>> = {
  // Payout Modifiers
  crimson_double: {
    name: 'Crimson Surge',
    description: 'Red bets deal 2.5x damage instead of 2.0x for the rest of the fight.',
    cost: 4,
    type: 'payout',
    rarity: 'common',
    effectId: 'CRIMSON_SURGE'
  },
  dark_fury: {
    name: 'Dark Fury',
    description: 'Black bets deal 2.5x damage instead of 2.0x for the rest of the fight.',
    cost: 4,
    type: 'payout',
    rarity: 'common',
    effectId: 'DARK_FURY'
  },
  green_greed: {
    name: 'Green Greed',
    description: 'Green bets deal 20x damage instead of 14x for this spin.',
    cost: 6,
    type: 'payout',
    rarity: 'rare',
    effectId: 'GREEN_GREED'
  },
  lucky_seven: {
    name: 'Lucky Number 7',
    description: 'Number 7 bets deal 50x damage instead of 36x for the rest of the fight.',
    cost: 8,
    type: 'payout',
    rarity: 'rare',
    effectId: 'LUCKY_SEVEN'
  },

  // Physics Modifiers
  friction_oil: {
    name: 'Friction Oil',
    description: 'Halves friction (0.5x) for the next spin. The wheel and ball spin longer, altering landing patterns.',
    cost: 2,
    type: 'physics',
    rarity: 'common',
    effectId: 'FRICTION_OIL'
  },
  lead_ball: {
    name: 'Lead Ball',
    description: 'Double ball mass (2.0x) and double friction. Drops quickly and bounces very little.',
    cost: 3,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'LEAD_BALL'
  },
  table_tilt: {
    name: 'Wheel Tilt',
    description: 'Slightly tilts the roulette wheel, pulling the ball towards the bottom side.',
    cost: 3,
    type: 'physics',
    rarity: 'common',
    effectId: 'WHEEL_TILT'
  },
  magnetic_force: {
    name: 'Lodestone Magnet',
    description: 'Magnetically pulls the ball. Grants 40% bias to land in a slot you have placed a bet on.',
    cost: 7,
    type: 'physics',
    rarity: 'rare',
    effectId: 'LODESTONE_MAGNET'
  },

  // Board Modifiers
  crimson_flood: {
    name: 'Crimson Flood',
    description: 'Converts numbers 1 to 6 into Red on the wheel (increasing Red odds).',
    cost: 5,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'CRIMSON_FLOOD'
  },
  abyssal_darkness: {
    name: 'Abyssal Darkness',
    description: 'Converts numbers 13 to 18 into Black on the wheel (increasing Black odds).',
    cost: 5,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'ABYSSAL_DARKNESS'
  },
  emerald_rift: {
    name: 'Emerald Rift',
    description: 'Adds an extra Green slot. Green bets win on both 0 and 32 (both become Green).',
    cost: 6,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'EMERALD_RIFT'
  },

  // Utility / Risk Modifiers
  blood_bet: {
    name: 'Blood Bet',
    description: 'Sacrifice 6 HP to gain 15 extra chips to place bets this turn.',
    cost: 0,
    type: 'utility',
    rarity: 'common',
    effectId: 'BLOOD_BET'
  },
  double_down: {
    name: 'Double Down',
    description: 'Double all bets placed, but double the enemy damage taken if you miss.',
    cost: 3,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'DOUBLE_DOWN'
  },
  slow_spin: {
    name: 'Calm Spin',
    description: 'Halves the wheel spin speed. The ball settles much faster and is easier to predict.',
    cost: 2,
    type: 'utility',
    rarity: 'common',
    effectId: 'CALM_SPIN'
  }
};

export function getCardById(id: string): Card {
  const base = CARD_DATABASE[id];
  if (!base) {
    throw new Error(`Card template not found: ${id}`);
  }
  return {
    id: `${id}_${Math.random().toString(36).substr(2, 9)}`,
    ...base
  };
}

export function createStarterDeck(): Card[] {
  return [
    getCardById('crimson_double'),
    getCardById('dark_fury'),
    getCardById('friction_oil'),
    getCardById('table_tilt'),
    getCardById('crimson_flood'),
    getCardById('abyssal_darkness'),
    getCardById('blood_bet'),
    getCardById('slow_spin'),
    getCardById('lead_ball'),
    getCardById('magnetic_force'),
  ];
}
