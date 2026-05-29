import { Card, RunState, BattleState } from '../core/Types';

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];

export class CardHandler {
  static applyEffect(card: Card, runState: RunState, battleState: BattleState): boolean {
    // Check if player has enough chips to play the card
    if (battleState.chipsPool < card.cost) {
      return false; // Cannot afford
    }
    
    // Deduct cost
    battleState.chipsPool -= card.cost;

    // Initialize extended properties if undefined
    if (!battleState.boardModifiers.dozenMultipliers) battleState.boardModifiers.dozenMultipliers = {};
    if (!battleState.boardModifiers.columnMultipliers) battleState.boardModifiers.columnMultipliers = {};
    if (!battleState.boardModifiers.customNumberMultipliers) battleState.boardModifiers.customNumberMultipliers = {};
    if (!battleState.boardModifiers.luckyZones) battleState.boardModifiers.luckyZones = [];
    if (!battleState.boardModifiers.cursedZones) battleState.boardModifiers.cursedZones = [];
    if (!battleState.boardModifiers.chipMines) battleState.boardModifiers.chipMines = {};
    if (!battleState.boardModifiers.lifeFountains) battleState.boardModifiers.lifeFountains = {};
    if (!battleState.boardModifiers.dangerZones) battleState.boardModifiers.dangerZones = {};
    if (!battleState.boardModifiers.goldFoils) battleState.boardModifiers.goldFoils = [];
    if (!battleState.boardModifiers.copperPlates) battleState.boardModifiers.copperPlates = [];
    if (!battleState.boardModifiers.mirrorSlots) battleState.boardModifiers.mirrorSlots = {};

    switch (card.effectId) {
      // --- PAYOUT MODIFIERS ---
      case 'CRIMSON_SURGE':
        battleState.boardModifiers.payoutMultipliers.red = 2.5;
        break;

      case 'DARK_FURY':
        battleState.boardModifiers.payoutMultipliers.black = 2.5;
        break;

      case 'GREEN_GREED':
        battleState.boardModifiers.payoutMultipliers.green = 50;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['greenMultiplier'] = 3;
        break;

      case 'LUCKY_SEVEN':
        battleState.boardModifiers.customNumberMultipliers[7] = 200;
        break;

      case 'SCARLET_OVERFLOW':
        battleState.boardModifiers.payoutMultipliers.red = 3.0;
        battleState.boardModifiers.payoutMultipliers.black = 1.0;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['scarletOverflow'] = 5;
        break;

      case 'ONYX_ECLIPSE':
        battleState.boardModifiers.payoutMultipliers.black = 3.0;
        battleState.boardModifiers.payoutMultipliers.red = 1.0;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['onyxEclipse'] = 5;
        break;



      case 'UNLUCKY_THIRTEEN':
        battleState.boardModifiers.customNumberMultipliers[13] = 300;
        break;

      case 'PRIME_TARGET':
        battleState.boardModifiers.primeMultiplier = 3.5;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['primeMultiplier'] = 3;
        break;

      case 'HIGH_ROLLER':
        battleState.boardModifiers.highMultiplier = 2.5;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['highMultiplier'] = 3;
        break;

      case 'LOW_SWEEP':
        battleState.boardModifiers.lowMultiplier = 2.5;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['lowMultiplier'] = 3;
        break;

      case 'EVEN_SPLIT':
        battleState.boardModifiers.payoutMultipliers.even = 2.5;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['evenMultiplier'] = 3;
        break;

      case 'ODD_ADVANTAGE':
        battleState.boardModifiers.payoutMultipliers.odd = 2.5;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['oddMultiplier'] = 3;
        break;

      case 'FIRST_DOZEN':
        battleState.boardModifiers.dozenMultipliers[1] = 3.5;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['dozenMultiplier_1'] = 3;
        break;

      case 'SECOND_DOZEN':
        battleState.boardModifiers.dozenMultipliers[2] = 3.5;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['dozenMultiplier_2'] = 3;
        break;

      case 'THIRD_DOZEN':
        battleState.boardModifiers.dozenMultipliers[3] = 3.5;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['dozenMultiplier_3'] = 3;
        break;

      case 'JACKPOT_TRIO':
        battleState.boardModifiers.customNumberMultipliers[7] = 250;
        battleState.boardModifiers.customNumberMultipliers[11] = 250;
        battleState.boardModifiers.customNumberMultipliers[21] = 250;
        break;

      case 'DEVILS_TRIO':
        battleState.boardModifiers.customNumberMultipliers[6] = 250;
        battleState.boardModifiers.customNumberMultipliers[16] = 250;
        battleState.boardModifiers.customNumberMultipliers[26] = 250;
        break;

      case 'SINGLE_OUT':
        battleState.boardModifiers.payoutMultipliers.number = 40.0;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['singleOutMultiplier'] = 3;
        break;

      case 'DOUBLE_PAYOUT':
        battleState.boardModifiers.doubleNextPayout = true;
        break;

      case 'COLUMN_WAVE':
        battleState.boardModifiers.columnMultipliers[1] = 4.0;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['columnMultiplier_1'] = 3;
        break;

      case 'COLUMN_DRIFT':
        battleState.boardModifiers.columnMultipliers[2] = 4.0;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['columnMultiplier_2'] = 3;
        break;

      case 'COLUMN_APEX':
        battleState.boardModifiers.columnMultipliers[3] = 4.0;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['columnMultiplier_3'] = 3;
        break;

      case 'GREEN_RIPPLE':
        // Custom ripple is evaluated in resolveSpin dynamically
        break;

      case 'GOLDEN_ZERO':
        battleState.boardModifiers.customNumberMultipliers[0] = 300;
        break;

      case 'LUCKY_INDEX':
        battleState.boardModifiers.globalMultiplier = 1.2;
        if (!battleState.boardModifiers.tempDurations) battleState.boardModifiers.tempDurations = {};
        battleState.boardModifiers.tempDurations['globalMultiplier'] = 3;
        break;

      case 'RED_STREAK':
        battleState.boardModifiers.redStreakActive = true;
        battleState.boardModifiers.redStreakCount = battleState.boardModifiers.redStreakCount || 0;
        break;

      case 'BLACK_STREAK':
        battleState.boardModifiers.blackStreakActive = true;
        battleState.boardModifiers.blackStreakCount = battleState.boardModifiers.blackStreakCount || 0;
        break;

      case 'SPLIT_BETS':
        // Evaluated at resolveSpin
        break;


      // --- PHYSICS MODIFIERS ---
      case 'FRICTION_OIL':
        battleState.physicsModifiers.friction = Math.max(0.3, battleState.physicsModifiers.friction * 0.65);
        battleState.physicsModifiers.predictionSize = 7;
        break;

      case 'LEAD_BALL':
        battleState.physicsModifiers.ballMass = 2.0;
        battleState.physicsModifiers.friction *= 2.0;
        battleState.physicsModifiers.predictionSize = 5;
        break;

      case 'WHEEL_TILT':
        battleState.physicsModifiers.wheelTilt = 0.15;
        battleState.physicsModifiers.predictionSize = 5;
        break;

      case 'LODESTONE_MAGNET':
        battleState.physicsModifiers.targetZoneBias = Math.max(
          battleState.physicsModifiers.targetZoneBias,
          0.90
        );
        break;

      case 'PREDICTIVE_SIGHT':
        battleState.physicsModifiers.predictionSize = 3;
        break;

      case 'NUDGE_CHEAT':
        battleState.physicsModifiers.nudgeCheatActive = true;
        battleState.physicsModifiers.nudgeDistance = 3;
        break;

      case 'ICE_GLAZE':
        battleState.physicsModifiers.friction = 0.3;
        battleState.physicsModifiers.predictionSize = 9;
        break;

      case 'SAND_TRAP':
        battleState.physicsModifiers.friction = 5.0;
        battleState.physicsModifiers.predictionSize = 3;
        break;

      case 'HEAVY_CORE':
        battleState.physicsModifiers.ballMass = 5.0;
        battleState.physicsModifiers.predictionSize = 3;
        break;

      case 'LIGHT_SHELL':
        battleState.physicsModifiers.ballMass = 0.5;
        battleState.physicsModifiers.predictionSize = 7;
        break;

      case 'STEEP_SLOPE':
        battleState.physicsModifiers.wheelTilt = 0.35;
        battleState.physicsModifiers.predictionSize = 3;
        break;

      case 'EMP_PULSE':
        battleState.physicsModifiers.targetZoneBias = 1.0;
        battleState.discardPile.push(...battleState.hand);
        battleState.hand = [];
        (battleState.boardModifiers as any).empPulseDrawNext = 3;
        break;

      case 'WEAK_MAGNET':
        battleState.physicsModifiers.targetZoneBias = 0.2;
        battleState.physicsModifiers.predictionSize = 5;
        break;

      case 'REPULSION_COIL':
        battleState.physicsModifiers.biasBlackOnly = true; // repel red, draw to black
        battleState.physicsModifiers.predictionSize = 5;
        break;

      case 'ATTRACTION_COIL':
        battleState.physicsModifiers.biasRedOnly = true; // pull to red
        battleState.physicsModifiers.predictionSize = 5;
        break;

      case 'CHAOS_BOUNCE':
        battleState.physicsModifiers.bounceRandomness = 0.3;
        battleState.physicsModifiers.predictionSize = 9;
        break;

      case 'STICKY_TRACK':
        battleState.physicsModifiers.bounceRandomness = 0.0;
        battleState.physicsModifiers.predictionSize = 5;
        break;

      case 'EAGLE_EYE':
        battleState.physicsModifiers.predictionSize = 1;
        if (battleState.drawPile.length === 0 && battleState.discardPile.length > 0) {
          battleState.drawPile = [...battleState.discardPile].sort(() => Math.random() - 0.5);
          battleState.discardPile = [];
        }
        if (battleState.drawPile.length > 0) {
          battleState.hand.push(battleState.drawPile.pop()!);
        }
        break;

      case 'OMNISCIENCE':
        battleState.physicsModifiers.predictionSize = 1;
        (battleState.boardModifiers as any).omniscienceDamageMult = 3.0;
        // Secondary fallback utility: Gain +3 actions (12 Essence) and draw 2 cards
        battleState.chipsPool += 12;
        for (let d = 0; d < 2; d++) {
          if (battleState.drawPile.length === 0 && battleState.discardPile.length > 0) {
            battleState.drawPile = [...battleState.discardPile].sort(() => Math.random() - 0.5);
            battleState.discardPile = [];
          }
          if (battleState.drawPile.length > 0) {
            battleState.hand.push(battleState.drawPile.pop()!);
          }
        }
        break;

      case 'BROAD_VISION':
        battleState.physicsModifiers.predictionSize = 9;
        break;

      case 'FOCUS_SIGHT':
        battleState.physicsModifiers.predictionSize = 5;
        break;

      case 'PREDICTIVE_SIGHT_PLUS':
        battleState.physicsModifiers.predictionSize = 3;
        (battleState.boardModifiers as any).predictiveSightPlusActive = true;
        break;

      case 'HEAVY_NUDGE':
        battleState.physicsModifiers.nudgeCheatActive = true;
        battleState.physicsModifiers.nudgeDistance = 5;
        break;

      case 'MICRO_NUDGE':
        battleState.physicsModifiers.nudgeCheatActive = true;
        battleState.physicsModifiers.nudgeDistance = 1;
        break;

      case 'WIND_TUNNEL':
        battleState.physicsModifiers.nudgeCheatActive = true;
        battleState.physicsModifiers.nudgeDistance = 1;
        break;


      // --- BOARD MODIFIERS ---
      case 'CRIMSON_FLOOD':
        for (let i = 1; i <= 6; i++) {
          if (!battleState.boardModifiers.convertNumbersToRed.includes(i)) {
            battleState.boardModifiers.convertNumbersToRed.push(i);
          }
        }
        break;

      case 'ABYSSAL_DARKNESS':
        for (let i = 13; i <= 18; i++) {
          if (!battleState.boardModifiers.convertNumbersToBlack.includes(i)) {
            battleState.boardModifiers.convertNumbersToBlack.push(i);
          }
        }
        break;

      case 'EMERALD_RIFT':
        battleState.boardModifiers.extraGreenSlots += 1;
        battleState.boardModifiers.convertNumbersToRed = battleState.boardModifiers.convertNumbersToRed.filter(n => n !== 32);
        battleState.boardModifiers.convertNumbersToBlack = battleState.boardModifiers.convertNumbersToBlack.filter(n => n !== 32);
        break;

      case 'CRIMSON_DELUGE':
        for (let i = 1; i <= 18; i++) {
          if (!battleState.boardModifiers.convertNumbersToRed.includes(i)) {
            battleState.boardModifiers.convertNumbersToRed.push(i);
          }
        }
        break;

      case 'ONYX_TSUNAMI':
        for (let i = 19; i <= 36; i++) {
          if (!battleState.boardModifiers.convertNumbersToBlack.includes(i)) {
            battleState.boardModifiers.convertNumbersToBlack.push(i);
          }
        }
        break;

      case 'JADE_PATH':
        battleState.boardModifiers.extraGreenSlots += 4;
        break;

      case 'COLOR_SHIFT_RED':
        for (let i = 1; i < 15; i++) {
          if (!battleState.boardModifiers.convertNumbersToRed.includes(i)) {
            battleState.boardModifiers.convertNumbersToRed.push(i);
          }
        }
        break;

      case 'COLOR_SHIFT_BLACK':
        for (let i = 20; i <= 36; i++) {
          if (!battleState.boardModifiers.convertNumbersToBlack.includes(i)) {
            battleState.boardModifiers.convertNumbersToBlack.push(i);
          }
        }
        break;

      case 'EMERALD_FOREST':
        (battleState.boardModifiers as any).emeraldForestActive = true;
        break;

      case 'MONOCHROME':
        (battleState.boardModifiers as any).monochromeActive = true;
        break;

      case 'BLOOD_SPILL':
        if (!card.markedSlots || card.markedSlots.length === 0) {
          const slots: number[] = [];
          for (let k = 0; k < 3; k++) {
            const randSlot = Math.floor(Math.random() * 37);
            if (!slots.includes(randSlot)) {
              slots.push(randSlot);
            }
          }
          card.markedSlots = slots;
        }
        if (!battleState.boardModifiers.bloodSpillSlots) {
          battleState.boardModifiers.bloodSpillSlots = [];
        }
        card.markedSlots.forEach(slot => {
          if (!battleState.boardModifiers.convertNumbersToRed.includes(slot)) {
            battleState.boardModifiers.convertNumbersToRed.push(slot);
            battleState.boardModifiers.bloodSpillSlots!.push(slot);
          }
        });
        if (!battleState.boardModifiers.tempDurations) {
          battleState.boardModifiers.tempDurations = {};
        }
        battleState.boardModifiers.tempDurations['bloodSpill'] = 5;
        break;

      case 'NUMBER_DUPLICATE':
        // logic handled in resolveSpin
        break;

      case 'NUMBER_SWAP':
        // logic handled in resolveSpin
        break;

      case 'LUCKY_ZONE':
        if (!card.markedSlots || card.markedSlots.length === 0) {
          const slots: number[] = [];
          for (let z = 0; z < 3; z++) {
            slots.push(Math.floor(Math.random() * 37));
          }
          card.markedSlots = slots;
        }
        battleState.boardModifiers.luckyZones.push(...card.markedSlots);
        break;

      case 'CURSED_ZONE':
        if (!card.markedSlots || card.markedSlots.length === 0) {
          const slots: number[] = [];
          for (let z = 0; z < 5; z++) {
            slots.push(Math.floor(Math.random() * 37));
          }
          card.markedSlots = slots;
        }
        battleState.boardModifiers.cursedZones.push(...card.markedSlots);
        break;

      case 'CHIP_MINE':
        if (!card.markedSlots || card.markedSlots.length === 0) {
          card.markedSlots = [Math.floor(Math.random() * 37)];
        }
        battleState.boardModifiers.chipMines![card.markedSlots[0]] = 15;
        break;


      case 'ZERO_ECLIPSE':
        (battleState.boardModifiers as any).zeroEclipseActive = true;
        break;

      case 'SLOT_EXPANSION':
        // Expands green landing width, handled in physics
        break;

      case 'MIRROR_SLOT':
        battleState.boardModifiers.mirrorSlots[0] = 36;
        battleState.boardModifiers.mirrorSlots[36] = 0;
        break;

      case 'DANGER_ZONE':
        if (!card.markedSlots || card.markedSlots.length === 0) {
          const slots: number[] = [];
          for (let z = 0; z < 5; z++) {
            slots.push(Math.floor(Math.random() * 37));
          }
          card.markedSlots = slots;
        }
        card.markedSlots.forEach(slot => {
          battleState.boardModifiers.dangerZones![slot] = 50;
        });
        break;

      case 'GOLD_FOIL':
        if (!card.markedSlots || card.markedSlots.length === 0) {
          card.markedSlots = [Math.floor(Math.random() * 37)];
        }
        battleState.boardModifiers.goldFoils.push(...card.markedSlots);
        break;

      case 'COPPER_PLATE':
        if (!card.markedSlots || card.markedSlots.length === 0) {
          const slots: number[] = [];
          for (let z = 0; z < 3; z++) {
            slots.push(Math.floor(Math.random() * 37));
          }
          card.markedSlots = slots;
        }
        battleState.boardModifiers.copperPlates.push(...card.markedSlots);
        break;



      // --- UTILITY MODIFIERS ---


      case 'DOUBLE_DOWN':
        battleState.boardModifiers.payoutMultipliers.red *= 2;
        battleState.boardModifiers.payoutMultipliers.black *= 2;
        battleState.boardModifiers.payoutMultipliers.green *= 2;
        battleState.boardModifiers.payoutMultipliers.number *= 2;
        battleState.boardModifiers.payoutMultipliers.odd *= 2;
        battleState.boardModifiers.payoutMultipliers.even *= 2;
        
        battleState.enemy.intent.value *= 2;
        battleState.enemy.intent.description += " (Doubled Down!)";
        break;

      case 'CALM_SPIN':
        battleState.physicsModifiers.spinSpeed = 0.5;
        battleState.physicsModifiers.predictionSize = 7;
        break;


      case 'ESSENCE_RECYCLE':
        if (battleState.hand.length > 0) {
          const randIdx = Math.floor(Math.random() * battleState.hand.length);
          const discarded = battleState.hand.splice(randIdx, 1)[0];
          battleState.discardPile.push(discarded);
          
          if (battleState.drawPile.length === 0 && battleState.discardPile.length > 0) {
            battleState.drawPile = [...battleState.discardPile].sort(() => Math.random() - 0.5);
            battleState.discardPile = [];
          }
          if (battleState.drawPile.length > 0) {
            const drawn = battleState.drawPile.pop()!;
            battleState.hand.push(drawn);
          }
        } else {
          return false;
        }
        break;



      case 'RISK_CAPITAL':
        battleState.chipsPool += 10;
        (battleState.boardModifiers as any).riskCapitalActive = true;
        break;

      case 'INSURANCE_POLICY':
        battleState.boardModifiers.insuranceActive = true;
        break;

      case 'COMPOUND_INTEREST':
        battleState.chipsPool += Math.floor(battleState.chipsPool * 0.5);
        break;




      case 'QUICK_DRAW':
        for (let q = 0; q < 2; q++) {
          if (battleState.drawPile.length === 0 && battleState.discardPile.length > 0) {
            battleState.drawPile = [...battleState.discardPile].sort(() => Math.random() - 0.5);
            battleState.discardPile = [];
          }
          if (battleState.drawPile.length > 0) {
            battleState.hand.push(battleState.drawPile.pop()!);
          }
        }
        break;

      case 'HEAVY_DRAW':
        for (let h = 0; h < 3; h++) {
          if (battleState.drawPile.length === 0 && battleState.discardPile.length > 0) {
            battleState.drawPile = [...battleState.discardPile].sort(() => Math.random() - 0.5);
            battleState.discardPile = [];
          }
          if (battleState.drawPile.length > 0) {
            battleState.hand.push(battleState.drawPile.pop()!);
          }
        }
        if (battleState.hand.length > 0) {
          const randIdx = Math.floor(Math.random() * battleState.hand.length);
          battleState.discardPile.push(battleState.hand.splice(randIdx, 1)[0]);
        }
        break;

      case 'DECK_SHUFFLE':
        if (battleState.discardPile.length > 0) {
          battleState.drawPile.push(...battleState.discardPile);
          battleState.drawPile.sort(() => Math.random() - 0.5);
          battleState.discardPile = [];
        }
        if (battleState.drawPile.length > 0) {
          battleState.hand.push(battleState.drawPile.pop()!);
        }
        break;

      case 'CALCULATED_RISK':
        const handSize = battleState.hand.length;
        battleState.discardPile.push(...battleState.hand);
        battleState.hand = [];
        for (let c = 0; c < handSize; c++) {
          if (battleState.drawPile.length === 0 && battleState.discardPile.length > 0) {
            battleState.drawPile = [...battleState.discardPile].sort(() => Math.random() - 0.5);
            battleState.discardPile = [];
          }
          if (battleState.drawPile.length > 0) {
            battleState.hand.push(battleState.drawPile.pop()!);
          }
        }
        break;

      case 'GOLDEN_MIRROR':
        if (battleState.hand.length > 0) {
          const randIdx = Math.floor(Math.random() * battleState.hand.length);
          const sourceCard = battleState.hand[randIdx];
          for (let i = 0; i < 2; i++) {
            battleState.hand.push({
              ...sourceCard,
              cost: 0,
              id: `${sourceCard.effectId}_temp_${Math.random().toString(36).substr(2, 9)}`
            });
          }
        }
        break;

      case 'COPY_PASTE':
        const lastCard = battleState.activePlayedCards && battleState.activePlayedCards.length > 0 ? 
                         battleState.activePlayedCards[battleState.activePlayedCards.length - 1] : null;
        if (lastCard) {
          battleState.hand.push({
            ...lastCard,
            id: `${lastCard.effectId}_copy_${Math.random().toString(36).substr(2, 9)}`
          });
        }
        break;

      case 'RECYCLE_BIN':
        if (battleState.discardPile.length > 0) {
          const randIdx = Math.floor(Math.random() * battleState.discardPile.length);
          battleState.hand.push(battleState.discardPile.splice(randIdx, 1)[0]);
        }
        break;

      case 'RETAIN_VISION':
        // Choose first hand card as target for retention
        if (battleState.hand.length > 0) {
          (battleState.hand[0] as any).isRetained = true;
        }
        break;

      case 'TURBO_SPIN':
        battleState.physicsModifiers.spinSpeed = 2.0;
        battleState.physicsModifiers.predictionSize = 9;
        break;

      case 'STUN_STRIKE':
        // Handled after damage is evaluated in resolveSpin
        break;

      case 'ADRENALINE_RUSH':
        // Increases actions count (optional bonus chips for bets)
        battleState.chipsPool += 12;
        break;

      case 'LUCKY_CHARM':
        // Handled in resolveSpin
        break;

      default:
        console.warn(`Unhandled card effect: ${card.effectId}`);
        return false;
    }

    return true;
  }
}
