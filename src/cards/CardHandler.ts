import { Card, RunState, BattleState } from '../core/Types';

export class CardHandler {
  static applyEffect(card: Card, runState: RunState, battleState: BattleState): boolean {
    // Check if player has enough chips to play the card
    if (battleState.chipsPool < card.cost) {
      return false; // Cannot afford
    }
    
    // Deduct cost
    battleState.chipsPool -= card.cost;

    switch (card.effectId) {
      case 'CRIMSON_SURGE':
        battleState.boardModifiers.payoutMultipliers.red = 2.5;
        break;

      case 'DARK_FURY':
        battleState.boardModifiers.payoutMultipliers.black = 2.5;
        break;

      case 'GREEN_GREED':
        battleState.boardModifiers.payoutMultipliers.green = 20;
        break;

      case 'LUCKY_SEVEN':
        // Specifically modify number 7, but for simplicity we boost standard number payouts
        battleState.boardModifiers.payoutMultipliers.number = 50;
        break;

      case 'FRICTION_OIL':
        battleState.physicsModifiers.friction *= 0.5;
        break;

      case 'LEAD_BALL':
        battleState.physicsModifiers.ballMass = 2.0;
        battleState.physicsModifiers.friction *= 2.0;
        break;

      case 'WHEEL_TILT':
        battleState.physicsModifiers.wheelTilt = 0.15;
        break;

      case 'LODESTONE_MAGNET':
        battleState.physicsModifiers.targetZoneBias = Math.max(
          battleState.physicsModifiers.targetZoneBias,
          0.40
        );
        break;

      case 'CRIMSON_FLOOD':
        // Add 1 to 6 to conversion list
        for (let i = 1; i <= 6; i++) {
          if (!battleState.boardModifiers.convertNumbersToRed.includes(i)) {
            battleState.boardModifiers.convertNumbersToRed.push(i);
          }
        }
        break;

      case 'ABYSSAL_DARKNESS':
        // Add 13 to 18 to conversion list
        for (let i = 13; i <= 18; i++) {
          if (!battleState.boardModifiers.convertNumbersToBlack.includes(i)) {
            battleState.boardModifiers.convertNumbersToBlack.push(i);
          }
        }
        break;

      case 'EMERALD_RIFT':
        battleState.boardModifiers.extraGreenSlots += 1;
        // Map 32 to green (it's adjacent to 0 on the wheel)
        if (!battleState.boardModifiers.convertNumbersToRed.includes(32)) {
          // Remove from converted lists first
          battleState.boardModifiers.convertNumbersToRed = battleState.boardModifiers.convertNumbersToRed.filter(n => n !== 32);
          battleState.boardModifiers.convertNumbersToBlack = battleState.boardModifiers.convertNumbersToBlack.filter(n => n !== 32);
        }
        break;

      case 'BLOOD_BET':
        // Deal damage directly to player health (cannot kill, min 1 HP)
        runState.hp = Math.max(1, runState.hp - 6);
        battleState.chipsPool += 15;
        break;

      case 'DOUBLE_DOWN':
        // Double all current payout multipliers
        battleState.boardModifiers.payoutMultipliers.red *= 2;
        battleState.boardModifiers.payoutMultipliers.black *= 2;
        battleState.boardModifiers.payoutMultipliers.green *= 2;
        battleState.boardModifiers.payoutMultipliers.number *= 2;
        battleState.boardModifiers.payoutMultipliers.odd *= 2;
        battleState.boardModifiers.payoutMultipliers.even *= 2;
        
        // Flag double damage taken for this turn
        battleState.enemy.intent.value *= 2;
        battleState.enemy.intent.description += " (Doubled Down!)";
        break;

      case 'CALM_SPIN':
        battleState.physicsModifiers.spinSpeed = 0.5;
        break;

      default:
        console.warn(`Unhandled card effect: ${card.effectId}`);
        return false;
    }

    return true;
  }
}
