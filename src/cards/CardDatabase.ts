import { Card, CardRarity } from '../core/Types';

export const CARD_DATABASE: Record<string, Omit<Card, 'id'>> = {
  // Payout Modifiers (25 cards)
  crimson_double: {
    name: 'Crimson Surge',
    description: 'Red bets deal 2.5x damage instead of 2.0x for the rest of the fight.',
    cost: 1,
    type: 'payout',
    rarity: 'common',
    effectId: 'CRIMSON_SURGE'
  },
  dark_fury: {
    name: 'Dark Fury',
    description: 'Black bets deal 2.5x damage instead of 2.0x for the rest of the fight.',
    cost: 1,
    type: 'payout',
    rarity: 'common',
    effectId: 'DARK_FURY'
  },
  green_greed: {
    name: 'Green Greed',
    description: 'Green bets deal 50x damage instead of 14x for this spin.',
    cost: 2,
    type: 'payout',
    rarity: 'rare',
    effectId: 'GREEN_GREED'
  },
  lucky_seven: {
    name: 'Lucky Number 7',
    description: 'Number 7 bets deal 200x damage for the rest of the fight.',
    cost: 2,
    type: 'payout',
    rarity: 'rare',
    effectId: 'LUCKY_SEVEN'
  },
  scarlet_overflow: {
    name: 'Scarlet Overflow',
    description: 'Red bets deal 3.0x damage, but Black bets deal 1.0x for the next 3 spins.',
    cost: 1,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'SCARLET_OVERFLOW'
  },
  onyx_eclipse: {
    name: 'Onyx Eclipse',
    description: 'Black bets deal 3.0x damage, but Red bets deal 1.0x for the next 3 spins.',
    cost: 1,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'ONYX_ECLIPSE'
  },
  royal_velvet: {
    name: 'Royal Velvet',
    description: 'Green bets deal 250x damage, but reduce Max HP by 5 for this fight.',
    cost: 3,
    type: 'payout',
    rarity: 'legendary',
    effectId: 'ROYAL_VELVET'
  },
  unlucky_thirteen: {
    name: 'Unlucky 13',
    description: 'Number 13 bets deal 300x damage for the rest of the fight.',
    cost: 2,
    type: 'payout',
    rarity: 'legendary',
    effectId: 'UNLUCKY_THIRTEEN'
  },
  prime_target: {
    name: 'Prime Target',
    description: 'Prime number bets deal 3.5x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'PRIME_TARGET'
  },
  high_roller: {
    name: 'High Roller',
    description: 'High numbers (19-36) deal 2.5x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'common',
    effectId: 'HIGH_ROLLER'
  },
  low_sweep: {
    name: 'Low Sweep',
    description: 'Low numbers (1-18) deal 2.5x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'common',
    effectId: 'LOW_SWEEP'
  },
  even_split: {
    name: 'Even Split',
    description: 'Even numbers deal 2.5x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'common',
    effectId: 'EVEN_SPLIT'
  },
  odd_advantage: {
    name: 'Odd Advantage',
    description: 'Odd numbers deal 2.5x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'common',
    effectId: 'ODD_ADVANTAGE'
  },
  first_dozen: {
    name: 'First Dozen',
    description: 'Bets on Dozen 1-12 deal 3.5x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'FIRST_DOZEN'
  },
  second_dozen: {
    name: 'Second Dozen',
    description: 'Bets on Dozen 13-24 deal 3.5x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'SECOND_DOZEN'
  },
  third_dozen: {
    name: 'Third Dozen',
    description: 'Bets on Dozen 25-36 deal 3.5x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'THIRD_DOZEN'
  },
  jackpot_trio: {
    name: 'Jackpot Trio',
    description: 'Betting on 7, 11, or 21 deals 250x damage for the rest of the fight.',
    cost: 2,
    type: 'payout',
    rarity: 'rare',
    effectId: 'JACKPOT_TRIO'
  },
  devils_trio: {
    name: "Devil's Trio",
    description: 'Betting on 6, 16, or 26 deals 250x damage for the rest of the fight.',
    cost: 2,
    type: 'payout',
    rarity: 'rare',
    effectId: 'DEVILS_TRIO'
  },
  single_out: {
    name: 'Single Out',
    description: 'Single number bets deal 40x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'common',
    effectId: 'SINGLE_OUT'
  },
  double_payout: {
    name: 'Double Payout',
    description: 'Double the next successful number bet payout.',
    cost: 2,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'DOUBLE_PAYOUT'
  },
  column_wave: {
    name: 'Column Wave',
    description: 'Bets on Column 1 deal 4x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'COLUMN_WAVE'
  },
  column_drift: {
    name: 'Column Drift',
    description: 'Bets on Column 2 deal 4x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'COLUMN_DRIFT'
  },
  column_apex: {
    name: 'Column Apex',
    description: 'Bets on Column 3 deal 4x damage for this spin.',
    cost: 1,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'COLUMN_APEX'
  },
  green_ripple: {
    name: 'Green Ripple',
    description: 'Green bets deal +5x damage per active Green slot on the wheel.',
    cost: 1,
    type: 'payout',
    rarity: 'uncommon',
    effectId: 'GREEN_RIPPLE'
  },
  golden_zero: {
    name: 'Golden Zero',
    description: '0 bets deal 300x damage for the rest of the fight.',
    cost: 2,
    type: 'payout',
    rarity: 'rare',
    effectId: 'GOLDEN_ZERO'
  },

  // Physics Modifiers (25 cards)
  friction_oil: {
    name: 'Friction Oil',
    description: 'Halves friction for the next spin. Predicts a wide 7-slot landing sector.',
    cost: 1,
    type: 'physics',
    rarity: 'common',
    effectId: 'FRICTION_OIL'
  },
  lead_ball: {
    name: 'Lead Ball',
    description: 'Double ball mass/friction. Bounces less and predicts a 5-slot landing sector.',
    cost: 1,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'LEAD_BALL'
  },
  table_tilt: {
    name: 'Wheel Tilt',
    description: 'Slightly tilts the roulette wheel, pulling the ball and predicting a 5-slot landing sector.',
    cost: 1,
    type: 'physics',
    rarity: 'common',
    effectId: 'WHEEL_TILT'
  },
  magnetic_force: {
    name: 'Lodestone Magnet',
    description: 'Magnetically pulls the ball. Grants 90% bias to land in a slot you have placed a bet on.',
    cost: 3,
    type: 'physics',
    rarity: 'rare',
    effectId: 'LODESTONE_MAGNET'
  },
  predictive_sight: {
    name: 'Predictive Sight',
    description: 'Runs high-accuracy visual simulation, predicting a tight 3-slot sector.',
    cost: 2,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'PREDICTIVE_SIGHT'
  },
  nudge_cheat: {
    name: 'Nudge Cheat',
    description: 'Magnets shift outcome by up to ±3 slots towards bets to force a win.',
    cost: 2,
    type: 'physics',
    rarity: 'rare',
    effectId: 'NUDGE_CHEAT'
  },
  ice_glaze: {
    name: 'Ice Glaze',
    description: 'Reduces wheel friction to 0.1 for this spin. Predicts a wide 9-slot sector.',
    cost: 0,
    type: 'physics',
    rarity: 'common',
    effectId: 'ICE_GLAZE'
  },
  sand_trap: {
    name: 'Sand Trap',
    description: 'Quintuples friction. Ball stops almost instantly and predicts a tight 3-slot sector.',
    cost: 1,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'SAND_TRAP'
  },
  heavy_core: {
    name: 'Heavy Core',
    description: 'Increases ball mass by 5x (very low bounce). Predicts a tight 3-slot sector.',
    cost: 2,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'HEAVY_CORE'
  },
  light_shell: {
    name: 'Light Shell',
    description: 'Halves ball mass (heavy bounce). Predicts a wide 7-slot sector.',
    cost: 1,
    type: 'physics',
    rarity: 'common',
    effectId: 'LIGHT_SHELL'
  },
  steep_slope: {
    name: 'Steep Slope',
    description: 'Increases wheel tilt to maximum. Predicts a tight 3-slot sector.',
    cost: 2,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'STEEP_SLOPE'
  },
  emp_pulse: {
    name: 'Electromagnetic Pulse',
    description: '100% bias to land in slots with bets, and draw 3 cards next turn.',
    cost: 4,
    type: 'physics',
    rarity: 'rare',
    effectId: 'EMP_PULSE'
  },
  weak_magnet: {
    name: 'Weak Magnet',
    description: '20% bias to land in slots with bets. Predicts a 5-slot sector.',
    cost: 1,
    type: 'physics',
    rarity: 'common',
    effectId: 'WEAK_MAGNET'
  },
  repulsion_coil: {
    name: 'Repulsion Coil',
    description: 'Magnetically pushes ball away from Red slots. Predicts a 5-slot sector.',
    cost: 1,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'REPULSION_COIL'
  },
  attraction_coil: {
    name: 'Attraction Coil',
    description: 'Magnetically pulls ball towards Black slots. Predicts a 5-slot sector.',
    cost: 1,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'ATTRACTION_COIL'
  },
  chaos_bounce: {
    name: 'Chaos Bounce',
    description: 'Multiplies bounce randomness by 3x. Predicts a wide 9-slot sector.',
    cost: 1,
    type: 'physics',
    rarity: 'common',
    effectId: 'CHAOS_BOUNCE'
  },
  sticky_track: {
    name: 'Sticky Track',
    description: 'Reduces bounce randomness to 0. Predicts a tight 5-slot sector.',
    cost: 1,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'STICKY_TRACK'
  },
  eagle_eye: {
    name: 'Eagle Eye',
    description: 'Runs absolute-accuracy visual simulation, predicting a pinpoint 1-slot sector.',
    cost: 3,
    type: 'physics',
    rarity: 'rare',
    effectId: 'EAGLE_EYE'
  },
  omniscience: {
    name: 'Omniscience',
    description: 'Runs perfect-accuracy simulation, predicting a pinpoint 1-slot sector and dealing 3x damage.',
    cost: 4,
    type: 'physics',
    rarity: 'legendary',
    effectId: 'OMNISCIENCE'
  },
  broad_vision: {
    name: 'Broad Vision',
    description: 'Highlights a wide 9-slot sector.',
    cost: 0,
    type: 'physics',
    rarity: 'common',
    effectId: 'BROAD_VISION'
  },
  focus_sight: {
    name: 'Focus Sight',
    description: 'Highlights a 5-slot sector.',
    cost: 1,
    type: 'physics',
    rarity: 'common',
    effectId: 'FOCUS_SIGHT'
  },
  predictive_sight_plus: {
    name: 'Predictive Sight+',
    description: 'Highlights a tight 3-slot sector, but draw 1 less card next turn.',
    cost: 0,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'PREDICTIVE_SIGHT_PLUS'
  },
  heavy_nudge: {
    name: 'Heavy Nudge',
    description: 'Shifts outcome by up to ±5 slots to force a bet win.',
    cost: 3,
    type: 'physics',
    rarity: 'legendary',
    effectId: 'HEAVY_NUDGE'
  },
  micro_nudge: {
    name: 'Micro Nudge',
    description: 'Shifts outcome by ±1 slot, but only if bet on that slot is >5.',
    cost: 1,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'MICRO_NUDGE'
  },
  wind_tunnel: {
    name: 'Wind Tunnel',
    description: 'Shifts final outcome in the direction of wheel rotation by +1 slot.',
    cost: 1,
    type: 'physics',
    rarity: 'uncommon',
    effectId: 'WIND_TUNNEL'
  },

  // Board Modifiers (25 cards)
  crimson_flood: {
    name: 'Crimson Flood',
    description: 'Converts numbers 1 to 6 into Red on the wheel (increasing Red odds).',
    cost: 2,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'CRIMSON_FLOOD'
  },
  abyssal_darkness: {
    name: 'Abyssal Darkness',
    description: 'Converts numbers 13 to 18 into Black on the wheel (increasing Black odds).',
    cost: 2,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'ABYSSAL_DARKNESS'
  },
  emerald_rift: {
    name: 'Emerald Rift',
    description: 'Adds an extra Green slot (0 and 32 are both Green).',
    cost: 2,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'EMERALD_RIFT'
  },
  crimson_deluge: {
    name: 'Crimson Deluge',
    description: 'Converts numbers 1 to 18 into Red on the wheel (half the wheel).',
    cost: 3,
    type: 'board',
    rarity: 'rare',
    effectId: 'CRIMSON_DELUGE'
  },
  onyx_tsunami: {
    name: 'Onyx Tsunami',
    description: 'Converts numbers 19 to 36 into Black on the wheel (half the wheel).',
    cost: 3,
    type: 'board',
    rarity: 'rare',
    effectId: 'ONYX_TSUNAMI'
  },
  jade_path: {
    name: 'Jade Path',
    description: 'Adds 4 extra Green slots (0, 5, 11, 17, 22, and 29 are Green).',
    cost: 3,
    type: 'board',
    rarity: 'rare',
    effectId: 'JADE_PATH'
  },
  color_shift_red: {
    name: 'Color Shift Red',
    description: 'Converts all Black slots under 15 to Red.',
    cost: 2,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'COLOR_SHIFT_RED'
  },
  color_shift_black: {
    name: 'Color Shift Black',
    description: 'Converts all Red slots over 20 to Black.',
    cost: 2,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'COLOR_SHIFT_BLACK'
  },
  emerald_forest: {
    name: 'Emerald Forest',
    description: 'Converts all prime numbers to Green and doubles Green payouts for this fight.',
    cost: 4,
    type: 'board',
    rarity: 'legendary',
    effectId: 'EMERALD_FOREST'
  },
  monochrome: {
    name: 'Monochrome',
    description: 'Swaps all colors: Red becomes Black, Black becomes Red.',
    cost: 1,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'MONOCHROME'
  },
  blood_spill: {
    name: 'Blood Spill',
    description: 'Converts the next 3 numbers the ball passes during spinning to Red.',
    cost: 2,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'BLOOD_SPILL'
  },
  number_duplicate: {
    name: 'Number Duplicate',
    description: "Copies a neighboring number's bets onto another cell on the board.",
    cost: 1,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'NUMBER_DUPLICATE'
  },
  number_swap: {
    name: 'Number Swap',
    description: 'Swaps values of two adjacent slots on the board.',
    cost: 1,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'NUMBER_SWAP'
  },
  lucky_zone: {
    name: 'Lucky Zone',
    description: 'Mark a 3-slot zone on the board; bets on this zone deal +1.5x damage.',
    cost: 1,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'LUCKY_ZONE'
  },
  cursed_zone: {
    name: 'Cursed Zone',
    description: 'Mark a 5-slot zone; if ball lands here, enemy is stunned for 2 turns.',
    cost: 2,
    type: 'board',
    rarity: 'rare',
    effectId: 'CURSED_ZONE'
  },
  chip_mine: {
    name: 'Chip Mine',
    description: 'Mark a number slot. If ball lands here, gain 15 chips.',
    cost: 1,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'CHIP_MINE'
  },
  life_fountain: {
    name: 'Life Fountain',
    description: 'Mark a number slot. If ball lands here, heal 10 HP.',
    cost: 1,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'LIFE_FOUNTAIN'
  },
  shield_generator: {
    name: 'Shield Generator',
    description: 'Mark a number slot. If ball lands here, gain 12 Block next turn.',
    cost: 1,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'SHIELD_GENERATOR'
  },
  zero_eclipse: {
    name: 'Zero Eclipse',
    description: '0 becomes a Black slot, and its payout becomes Red.',
    cost: 1,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'ZERO_ECLIPSE'
  },
  slot_expansion: {
    name: 'Slot Expansion',
    description: 'Expands the landing sector width of all Green slots.',
    cost: 2,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'SLOT_EXPANSION'
  },
  mirror_slot: {
    name: 'Mirror Slot',
    description: 'Mark one slot. If ball lands on the mirrored slot opposite it, you win too.',
    cost: 2,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'MIRROR_SLOT'
  },
  danger_zone: {
    name: 'Danger Zone',
    description: 'Converts 5 slots into red spikes. If enemy lands there, they take 50 flat damage.',
    cost: 2,
    type: 'board',
    rarity: 'rare',
    effectId: 'DANGER_ZONE'
  },
  gold_foil: {
    name: 'Gold Foil',
    description: 'Mark 1 slot. Landing there multiplies that slot\'s damage by 10x.',
    cost: 2,
    type: 'board',
    rarity: 'legendary',
    effectId: 'GOLD_FOIL'
  },
  copper_plate: {
    name: 'Copper Plate',
    description: 'Mark 3 slots. Landing there multiplies their damage by 1.5x.',
    cost: 1,
    type: 'board',
    rarity: 'common',
    effectId: 'COPPER_PLATE'
  },
  void_hole: {
    name: 'Void Hole',
    description: 'Mark 1 slot. Landing there destroys all opponent block.',
    cost: 1,
    type: 'board',
    rarity: 'uncommon',
    effectId: 'VOID_HOLE'
  },

  // Utility / Risk Modifiers (25 cards)
  blood_bet: {
    name: 'Blood Bet',
    description: 'Sacrifice 5 HP to gain 8 extra chips to place bets this turn.',
    cost: 0,
    type: 'utility',
    rarity: 'common',
    effectId: 'BLOOD_BET'
  },
  double_down: {
    name: 'Double Down',
    description: 'Double all bets placed, but double the enemy damage taken if you miss.',
    cost: 2,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'DOUBLE_DOWN'
  },
  slow_spin: {
    name: 'Calm Spin',
    description: 'Halves the wheel spin speed. Predicts a wide 7-slot sector.',
    cost: 1,
    type: 'utility',
    rarity: 'common',
    effectId: 'CALM_SPIN'
  },
  scrap_shield: {
    name: 'Scrap Shield',
    description: 'Gain 5 Block. Block shields you from incoming enemy damage this turn.',
    cost: 1,
    type: 'utility',
    rarity: 'common',
    effectId: 'SCRAP_SHIELD'
  },
  essence_recycle: {
    name: 'Identity Shift',
    description: 'Discard a card from your hand to draw 1 card for 0 cost.',
    cost: 0,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'ESSENCE_RECYCLE'
  },
  golden_blood: {
    name: 'Golden Blood',
    description: 'Sacrifice 10 HP to gain 18 extra chips to place bets this turn.',
    cost: 0,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'GOLDEN_BLOOD'
  },
  risk_capital: {
    name: 'Risk Capital',
    description: 'Gain 10 chips, but lose 2 chips per spin for the rest of the fight.',
    cost: 1,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'RISK_CAPITAL'
  },
  insurance_policy: {
    name: 'Insurance Policy',
    description: 'If you win this spin, gain 0 chips. If you lose, refund all chips bet.',
    cost: 1,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'INSURANCE_POLICY'
  },
  compound_interest: {
    name: 'Compound Interest',
    description: 'Gain chips equal to 50% of your current chip pool.',
    cost: 1,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'COMPOUND_INTEREST'
  },
  steel_barricade: {
    name: 'Steel Barricade',
    description: 'Gain 12 Block.',
    cost: 2,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'STEEL_BARRICADE'
  },
  fortress_shield: {
    name: 'Fortress Shield',
    description: 'Gain 60 Block.',
    cost: 3,
    type: 'utility',
    rarity: 'rare',
    effectId: 'FORTRESS_SHIELD'
  },
  aegis_ward: {
    name: 'Aegis Ward',
    description: 'Gain 8 Block. If opponent hits you, reflect 4 damage.',
    cost: 2,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'AEGIS_WARD'
  },
  blood_shield: {
    name: 'Blood Shield',
    description: 'Sacrifice 3 HP to gain 8 Block.',
    cost: 0,
    type: 'utility',
    rarity: 'common',
    effectId: 'BLOOD_SHIELD'
  },
  quick_draw: {
    name: 'Quick Draw',
    description: 'Draw 2 cards. Costs 1 chip instead of 2.',
    cost: 1,
    type: 'utility',
    rarity: 'common',
    effectId: 'QUICK_DRAW'
  },
  heavy_draw: {
    name: 'Heavy Draw',
    description: 'Draw 3 cards, but discard 1 card.',
    cost: 1,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'HEAVY_DRAW'
  },
  deck_shuffle: {
    name: 'Deck Shuffle',
    description: 'Shuffle discard pile back into draw pile. Draw 1 card.',
    cost: 0,
    type: 'utility',
    rarity: 'common',
    effectId: 'DECK_SHUFFLE'
  },
  calculated_risk: {
    name: 'Calculated Risk',
    description: 'Discard your entire hand. Draw that many cards.',
    cost: 1,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'CALCULATED_RISK'
  },
  golden_mirror: {
    name: 'Golden Mirror',
    description: 'Choose 1 card; add 2 temporary copies of it to hand with 0 cost.',
    cost: 2,
    type: 'utility',
    rarity: 'rare',
    effectId: 'GOLDEN_MIRROR'
  },
  copy_paste: {
    name: 'Copy Paste',
    description: 'Copy the last played non-utility card.',
    cost: 2,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'COPY_PASTE'
  },
  recycle_bin: {
    name: 'Recycle Bin',
    description: 'Retrieve 1 card from discard pile into your hand.',
    cost: 2,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'RECYCLE_BIN'
  },
  retain_vision: {
    name: 'Retain Vision',
    description: 'Choose 1 card in hand; it gets retained (stays in hand) permanently.',
    cost: 1,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'RETAIN_VISION'
  },
  turbo_spin: {
    name: 'Turbo Spin',
    description: 'Doubles wheel speed. Predicts 9-slot sector, but wins deal 1.5x damage.',
    cost: 1,
    type: 'utility',
    rarity: 'uncommon',
    effectId: 'TURBO_SPIN'
  },
  stun_strike: {
    name: 'Stun Strike',
    description: 'If you deal 5+ damage this turn, stun the enemy for 2 turns.',
    cost: 3,
    type: 'utility',
    rarity: 'rare',
    effectId: 'STUN_STRIKE'
  },
  adrenaline_rush: {
    name: 'Adrenaline Rush',
    description: 'Gain +3 actions/card plays this turn.',
    cost: 2,
    type: 'utility',
    rarity: 'legendary',
    effectId: 'ADRENALINE_RUSH'
  },
  lucky_charm: {
    name: 'Lucky Charm',
    description: 'Next spin outcome has 100% chance to be rerolled if it would result in a miss.',
    cost: 2,
    type: 'utility',
    rarity: 'legendary',
    effectId: 'LUCKY_CHARM'
  }
};

export function getRandomCardId(): string {
  const rand = Math.random();
  let selectedRarity: CardRarity = 'common';
  if (rand < 0.03) {
    selectedRarity = 'legendary';
  } else if (rand < 0.12) {
    selectedRarity = 'rare';
  } else if (rand < 0.40) {
    selectedRarity = 'uncommon';
  } else {
    selectedRarity = 'common';
  }

  const keys = Object.keys(CARD_DATABASE).filter(k => CARD_DATABASE[k].rarity === selectedRarity);
  if (keys.length > 0) {
    return keys[Math.floor(Math.random() * keys.length)];
  }
  const allKeys = Object.keys(CARD_DATABASE);
  return allKeys[Math.floor(Math.random() * allKeys.length)];
}

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
