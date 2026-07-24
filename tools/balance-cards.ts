import fs from 'fs';
import path from 'path';
import { CARD_DATABASE } from '../src/cards/CardDatabase';
import { CardEVCalculator } from '../src/core/balancer/CardEVCalculator';
import { EUROPEAN_WHEEL, DEFAULT_BOARD_MODIFIERS } from '../src/core/balancer/ScenarioPresets';
import { Card } from '../src/core/Types';

const isApplyMode = process.argv.includes('--apply');

console.log('\n================================================================================');
console.log(' 🎲 ROULETTE OF THE DAMNED — CARD AUTO-BALANCER TOOL');
console.log('================================================================================');
if (isApplyMode) {
  console.log(' ⚙️  MODE: AUTO-BALANCE APPLY MODE (--apply detected)');
  console.log('     Cards will be automatically updated in CardDatabase.ts!\n');
} else {
  console.log(' ⚙️  MODE: AUDIT REPORT MODE');
  console.log('     Run with --apply flag to automatically apply suggested cost fixes!\n');
}

const allCards: Card[] = Object.entries(CARD_DATABASE).map(([id, cardData]) => ({
  id,
  ...cardData
}));

const auditResults: Array<{
  cardId: string;
  name: string;
  type: string;
  rarity: string;
  cost: number;
  suggestedCost: number;
  suggestedAdjustment: string;
  optimalStrategy: string;
  baseEV: string;
  modEV: string;
  deltaEV: string;
  efficiency: string;
  rating: string;
  recommendation: string;
}> = [];

let opList: typeof auditResults = [];
let upList: typeof auditResults = [];
let deadList: typeof auditResults = [];
let balancedList: typeof auditResults = [];
let physicsList: typeof auditResults = [];

const updatedDatabase: Record<string, Omit<Card, 'id'>> = JSON.parse(JSON.stringify(CARD_DATABASE));
let totalAdjustments = 0;

allCards.forEach(card => {
  const defaultBets = [{ type: 'red' as const, amount: 10 }];

  const analysis = CardEVCalculator.evaluateCard(
    card,
    defaultBets,
    EUROPEAN_WHEEL,
    DEFAULT_BOARD_MODIFIERS,
    undefined,
    true // Optimal Play
  );

  const entry = {
    cardId: card.id,
    name: card.name,
    type: card.type,
    rarity: (card.rarity || 'common').toUpperCase(),
    cost: card.cost,
    suggestedCost: analysis.suggestedCost,
    suggestedAdjustment: analysis.suggestedAdjustment,
    optimalStrategy: analysis.optimalStrategyName,
    baseEV: analysis.baseline.ev.toFixed(1),
    modEV: analysis.modified.ev.toFixed(1),
    deltaEV: (analysis.deltaEV >= 0 ? '+' : '') + analysis.deltaEV.toFixed(1),
    efficiency: analysis.efficiency.toFixed(1) + ' dmg/⚡',
    rating: analysis.balanceRating,
    recommendation: analysis.recommendation
  };

  if (analysis.balanceRating === 'OVERPOWERED' || analysis.balanceRating === 'UNDERPOWERED') {
    if (updatedDatabase[card.id] && card.type !== 'physics') {
      updatedDatabase[card.id].cost = analysis.suggestedCost;
      totalAdjustments++;
    }
  }

  if (analysis.balanceRating === 'OVERPOWERED') opList.push(entry);
  else if (analysis.balanceRating === 'UNDERPOWERED') upList.push(entry);
  else if (analysis.balanceRating === 'DEAD') deadList.push(entry);
  else if (analysis.balanceRating === 'BALANCED') balancedList.push(entry);
  else if (analysis.balanceRating === 'PHYSICS_DEPENDENT') physicsList.push(entry);

  auditResults.push(entry);
});

// Sort lists by efficiency
opList.sort((a, b) => parseFloat(b.efficiency) - parseFloat(a.efficiency));
upList.sort((a, b) => parseFloat(a.efficiency) - parseFloat(b.efficiency));
deadList.sort((a, b) => parseFloat(a.efficiency) - parseFloat(b.efficiency));

console.log('--------------------------------------------------------------------------------');
console.log(' 📊 EXECUTIVE SUMMARY OF CARD BALANCE');
console.log('--------------------------------------------------------------------------------');
console.log(` Total Cards Analyzed: ${allCards.length}`);
console.log(` 🔥 Overpowered Cards (Too Strong):       ${opList.length}`);
console.log(` ⚖️  Balanced Cards (In Sweet Spot):       ${balancedList.length}`);
console.log(` ❄️  Underpowered Cards (Too Weak):       ${upList.length}`);
console.log(` 💀 Dead Cards (No EV Benefit):           ${deadList.length}`);
console.log(` 🌀 Physics Cards (Requires Sim):         ${physicsList.length}`);
console.log('--------------------------------------------------------------------------------\n');

if (opList.length > 0) {
  console.log('🔥 OVERPOWERED CARDS & SUGGESTED FIXES');
  console.log('These cards provide excessive damage per essence spent for their rarity tier:\n');
  opList.forEach(c => {
    console.log(` • [${c.rarity}] "${c.name}" (Current: ${c.cost}⚡ ➔ Suggested: ${c.suggestedCost}⚡)`);
    console.log(`   └ Action: ${c.suggestedAdjustment}`);
    console.log(`   └ Strategy: ${c.optimalStrategy}`);
    console.log(`   └ Damage: Baseline ${c.baseEV} ➔ Card EV ${c.modEV} (Net Gain: ${c.deltaEV} dmg, Efficiency: ${c.efficiency})\n`);
  });
}

if (deadList.length > 0 || upList.length > 0) {
  console.log('❄️ UNDERPOWERED CARDS & SUGGESTED FIXES');
  console.log('These cards offer poor damage return on essence investment for their rarity:\n');
  [...deadList, ...upList.slice(0, 10)].forEach(c => {
    console.log(` • [${c.rarity}] "${c.name}" (Current: ${c.cost}⚡ ➔ Suggested: ${c.suggestedCost}⚡)`);
    console.log(`   └ Action: ${c.suggestedAdjustment}`);
    console.log(`   └ Strategy: ${c.optimalStrategy}`);
    console.log(`   └ Damage: Baseline ${c.baseEV} ➔ Card EV ${c.modEV} (Net Gain: ${c.deltaEV} dmg, Efficiency: ${c.efficiency})\n`);
  });
}

console.log('⚖️ SAMPLE BALANCED CARDS (GOOD BENCHMARKS)');
balancedList.slice(0, 5).forEach(c => {
  console.log(` • [${c.rarity}] "${c.name}" (${c.cost}⚡ Essence) — Perfect balance (${c.efficiency})`);
});

if (isApplyMode) {
  console.log('\n================================================================================');
  console.log(` 💾 APPLYING AUTO-BALANCE ADJUSTMENTS TO CardDatabase.ts...`);
  console.log(` Total card costs adjusted: ${totalAdjustments}`);
  
  const dbPath = path.join(process.cwd(), 'src', 'cards', 'CardDatabase.ts');
  const helpersCode = `
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
    return {
      id: \`\${id}_\${Math.random().toString(36).substr(2, 9)}\`,
      name: 'Unknown Card',
      description: '',
      cost: 1,
      type: 'utility',
      rarity: 'common',
      effectId: 'UNKNOWN'
    };
  }
  return {
    id: \`\${id}_\${Math.random().toString(36).substr(2, 9)}\`,
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
    getCardById('quick_draw'),
    getCardById('slow_spin'),
    getCardById('lead_ball'),
    getCardById('magnetic_force'),
  ];
}

export function formatDescription(desc: string, isPointsMode: boolean): string {
  let formatted = desc;
  
  if (isPointsMode) {
    formatted = formatted.replace(/\\bincoming enemy damage\\b/gi, 'incoming opponent points');
    formatted = formatted.replace(/\\benemy damage\\b/gi, 'opponent points');
    formatted = formatted.replace(/\\bopponent damage\\b/gi, 'opponent points');
    
    formatted = formatted.replace(/\\bflat damage\\b/gi, 'flat PTS');
    formatted = formatted.replace(/\\bdealt damage\\b/gi, 'scored points');
    formatted = formatted.replace(/\\bdeal damage\\b/gi, 'score points');
    formatted = formatted.replace(/\\bdeals damage\\b/gi, 'scores points');
    formatted = formatted.replace(/\\bdeal (\\d+x|\\d+\\+)?\\s*damage\\b/gi, (match, p1) => {
      return p1 ? \`score \${p1} PTS\` : 'score PTS';
    });
    formatted = formatted.replace(/\\bdeals (\\d+x|\\d+\\+)?\\s*damage\\b/gi, (match, p1) => {
      return p1 ? \`scores \${p1} PTS\` : 'scores PTS';
    });
    formatted = formatted.replace(/\\bdamage dealt\\b/gi, 'points scored');
    formatted = formatted.replace(/\\bdamage taken\\b/gi, 'points taken');
    formatted = formatted.replace(/\\bdamage\\b/g, 'PTS');
    formatted = formatted.replace(/\\bDamage\\b/g, 'PTS');
    formatted = formatted.replace(/\\bdmg\\b/gi, 'PTS');
    
    formatted = formatted.replace(/\\bdeal\\b/g, 'score');
    formatted = formatted.replace(/\\bdeals\\b/g, 'scores');
    formatted = formatted.replace(/\\bdealt\\b/g, 'scored');
    formatted = formatted.replace(/\\bDeal\\b/g, 'Score');
    formatted = formatted.replace(/\\bDeals\\b/g, 'Scores');
    formatted = formatted.replace(/\\bDealt\\b/g, 'Scored');
  }
  
  return formatted;
}
`;
  const newContent = `import { Card, CardRarity } from '../core/Types';\n\nexport const CARD_DATABASE: Record<string, Omit<Card, 'id'>> = ${JSON.stringify(updatedDatabase, null, 2)};\n${helpersCode}`;
  
  fs.writeFileSync(dbPath, newContent, 'utf-8');
  console.log(` ✅ CardDatabase.ts has been successfully updated with balanced costs!`);
  console.log('================================================================================\n');
} else {
  console.log('\n================================================================================');
  console.log(' 💡 HOW TO APPLY THESE BALANCE FIXES TO YOUR GAME CODE:');
  console.log(' Run command: cmd /c npx vite-node tools/balance-cards.ts --apply');
  console.log(' Or launch Web Studio UI: http://localhost:5173/balancer.html');
  console.log('================================================================================\n');
}
