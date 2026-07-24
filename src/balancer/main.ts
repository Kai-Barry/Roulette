import { CARD_DATABASE } from '../cards/CardDatabase';
import { CardEVCalculator, CardEVAnalysis } from '../core/balancer/CardEVCalculator';
import { PhysicsEVSimulator } from '../core/balancer/PhysicsEVSimulator';
import { SCENARIO_PRESETS, ScenarioPreset, EUROPEAN_WHEEL } from '../core/balancer/ScenarioPresets';
import { Card, Bet, BoardModifiers, WheelConfig } from '../core/Types';

// --- APPLICATION STATE ---
interface AppState {
  allCards: Card[];
  filteredCards: Card[];
  selectedCard: Card | null;
  selectedScenario: ScenarioPreset;
  customBets: Bet[];
  customBoardMods: BoardModifiers;
  activeWheel: WheelConfig;
  currentAnalysis: CardEVAnalysis | null;
  filterRarity: string;
  filterType: string;
  filterRating: string;
  searchQuery: string;
  useOptimalPlay: boolean; // Auto-calculate optimal betting strategy per card
  // Tuner values
  tunedCost: number;
  tunedMultiplier: number;
  isPhysicsSimulating: boolean;
  physicsResult: any | null;
}

const state: AppState = {
  allCards: [],
  filteredCards: [],
  selectedCard: null,
  selectedScenario: SCENARIO_PRESETS[0],
  customBets: JSON.parse(JSON.stringify(SCENARIO_PRESETS[0].bets)),
  customBoardMods: JSON.parse(JSON.stringify(SCENARIO_PRESETS[0].boardModifiers)),
  activeWheel: EUROPEAN_WHEEL,
  currentAnalysis: null,
  filterRarity: 'ALL',
  filterType: 'ALL',
  filterRating: 'ALL',
  searchQuery: '',
  useOptimalPlay: true, // Default to optimal play mode!
  tunedCost: 1,
  tunedMultiplier: 2.5,
  isPhysicsSimulating: false,
  physicsResult: null
};

// Initialize cards
function init() {
  state.allCards = Object.entries(CARD_DATABASE).map(([id, data]) => ({
    id,
    ...data
  }));
  state.filteredCards = [...state.allCards];
  if (state.allCards.length > 0) {
    selectCard(state.allCards[0]);
  }
  renderApp();
}

function selectCard(card: Card) {
  state.selectedCard = card;
  state.tunedCost = card.cost;
  state.tunedMultiplier = 2.5;
  state.physicsResult = null;
  recalculate();
}

function recalculate() {
  if (!state.selectedCard) return;

  const cardToAnalyze: Card = {
    ...state.selectedCard,
    cost: state.tunedCost
  };

  state.currentAnalysis = CardEVCalculator.evaluateCard(
    cardToAnalyze,
    state.customBets,
    state.activeWheel,
    state.customBoardMods,
    undefined,
    state.useOptimalPlay
  );
}

function selectScenario(scenario: ScenarioPreset) {
  state.selectedScenario = scenario;
  state.customBets = JSON.parse(JSON.stringify(scenario.bets));
  state.customBoardMods = JSON.parse(JSON.stringify(scenario.boardModifiers));
  state.activeWheel = JSON.parse(JSON.stringify(scenario.wheel));
  recalculate();
  renderApp();
}

function applyFilters() {
  state.filteredCards = state.allCards.filter(card => {
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchName = card.name.toLowerCase().includes(q);
      const matchDesc = card.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }
    if (state.filterRarity !== 'ALL' && card.rarity !== state.filterRarity) {
      return false;
    }
    if (state.filterType !== 'ALL' && card.type !== state.filterType) {
      return false;
    }
    if (state.filterRating !== 'ALL') {
      const analysis = CardEVCalculator.evaluateCard(
        card,
        state.customBets,
        state.activeWheel,
        state.customBoardMods,
        undefined,
        state.useOptimalPlay
      );
      if (analysis.balanceRating !== state.filterRating) return false;
    }
    return true;
  });
  renderCardList();
}

// --- RENDER FUNCTIONS ---
function renderApp() {
  const container = document.getElementById('balancer-app');
  if (!container) return;

  container.innerHTML = `
    <header class="studio-header">
      <div class="brand-title">
        <h1>🎲 ROULETTE OF THE DAMNED</h1>
        <span class="brand-badge">CARD BALANCER & EV STUDIO</span>
      </div>

      <div style="display: flex; align-items: center; gap: 12px;">
        <button id="toggle-optimal-play" class="btn-secondary" style="background: ${state.useOptimalPlay ? 'rgba(0, 245, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)'}; color: ${state.useOptimalPlay ? 'var(--cyan-accent)' : 'var(--text-muted)'}; border-color: ${state.useOptimalPlay ? 'var(--cyan-accent)' : 'var(--border-color)'}; font-weight: 800;">
          ${state.useOptimalPlay ? '⚡ MODE: Auto-Optimal Bet Strategy ON' : '🎯 MODE: Manual Fixed Bets Scenario'}
        </button>

        <div class="audit-stats-bar">
          <div class="stat-pill">Total: <strong>${state.allCards.length} Cards</strong></div>
          <div class="stat-pill op">🔥 OP</div>
          <div class="stat-pill bal">⚖️ Balanced</div>
          <div class="stat-pill up">❄️ Underpowered</div>
          <div class="stat-pill dead">💀 Dead</div>
        </div>
      </div>
    </header>

    <div class="studio-layout">
      <!-- LEFT PANEL: Card Library -->
      <aside class="panel-cards">
        <div class="panel-header">
          <div class="panel-title">
            <span>Card Library</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${state.filteredCards.length} shown</span>
          </div>
          <input type="text" class="search-input" id="card-search" placeholder="Search cards by name or effect..." value="${state.searchQuery}">
          
          <div class="filter-row">
            <button class="filter-chip ${state.filterRarity === 'ALL' ? 'active' : ''}" data-filter-rarity="ALL">All Rarities</button>
            <button class="filter-chip ${state.filterRarity === 'common' ? 'active' : ''}" data-filter-rarity="common">Common</button>
            <button class="filter-chip ${state.filterRarity === 'uncommon' ? 'active' : ''}" data-filter-rarity="uncommon">Uncommon</button>
            <button class="filter-chip ${state.filterRarity === 'rare' ? 'active' : ''}" data-filter-rarity="rare">Rare</button>
            <button class="filter-chip ${state.filterRarity === 'legendary' ? 'active' : ''}" data-filter-rarity="legendary">Legendary</button>
          </div>

          <div class="filter-row">
            <button class="filter-chip ${state.filterType === 'ALL' ? 'active' : ''}" data-filter-type="ALL">All Types</button>
            <button class="filter-chip ${state.filterType === 'payout' ? 'active' : ''}" data-filter-type="payout">Payout</button>
            <button class="filter-chip ${state.filterType === 'board' ? 'active' : ''}" data-filter-type="board">Board</button>
            <button class="filter-chip ${state.filterType === 'physics' ? 'active' : ''}" data-filter-type="physics">Physics</button>
            <button class="filter-chip ${state.filterType === 'utility' ? 'active' : ''}" data-filter-type="utility">Utility</button>
          </div>
        </div>

        <div class="card-list" id="card-list-container">
          <!-- Rendered by renderCardList() -->
        </div>
      </aside>

      <!-- CENTER PANEL: Scenario & Heatmap -->
      <main class="panel-center">
        <section class="section-box">
          <div class="section-title">
            <span>🎯 Baseline Betting Archetypes & Scenarios</span>
          </div>
          <div class="preset-grid">
            ${SCENARIO_PRESETS.map(preset => `
              <button class="preset-btn ${state.selectedScenario.id === preset.id ? 'active' : ''}" data-preset-id="${preset.id}">
                ${preset.name}
              </button>
            `).join('')}
          </div>
        </section>

        <section class="section-box">
          <div class="section-title">
            <span>💰 Active Bets Strategy Evaluated</span>
            <span style="font-size: 0.8rem; font-weight: bold; color: var(--cyan-accent); margin-left: auto;">
              ${state.useOptimalPlay && state.currentAnalysis ? `Optimal: ${state.currentAnalysis.optimalStrategyName}` : 'Custom Manual Bets'}
            </span>
          </div>
          <div class="bets-list">
            ${(state.useOptimalPlay && state.currentAnalysis ? state.currentAnalysis.optimalBets : state.customBets).map(bet => `
              <div class="bet-chip-badge ${bet.type}">
                <span>${bet.type.toUpperCase()}${bet.numberValue !== undefined ? ` #${bet.numberValue}` : ''}</span>
                <strong>${bet.amount} chips</strong>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="section-box">
          <div class="section-title">
            <span>🔥 Wheel Slot Damage Heatmap (0..36)</span>
            <span style="font-size: 0.8rem; font-weight: normal; color: var(--text-muted); margin-left: auto;">Color & Expected Payout per Landing Slot</span>
          </div>
          <div class="heatmap-container" id="slot-heatmap">
            <!-- Rendered by renderHeatmap() -->
          </div>
        </section>
      </main>

      <!-- RIGHT PANEL: Expected Value Analytics & Live Tuner -->
      <aside class="panel-analytics" id="analytics-container">
        <!-- Rendered by renderAnalytics() -->
      </aside>
    </div>
  `;

  attachEventListeners();
  renderCardList();
  renderHeatmap();
  renderAnalytics();
}

function renderCardList() {
  const container = document.getElementById('card-list-container');
  if (!container) return;

  container.innerHTML = state.filteredCards.map(card => {
    const isSelected = state.selectedCard?.id === card.id;
    const analysis = CardEVCalculator.evaluateCard(
      card,
      state.customBets,
      state.activeWheel,
      state.customBoardMods,
      undefined,
      state.useOptimalPlay
    );

    const deltaSign = analysis.deltaEV >= 0 ? '+' : '';

    return `
      <div class="card-item ${isSelected ? 'selected' : ''}" data-card-id="${card.id}">
        <div class="card-item-top">
          <span class="card-name">${card.name}</span>
          <span class="card-cost-badge">${card.cost}⚡</span>
        </div>
        <div class="card-desc">${card.description}</div>
        <div class="card-tags">
          <span class="tag-rarity ${card.rarity}">${card.rarity}</span>
          <span class="tag-ev" style="color: ${analysis.deltaEV > 0 ? '#38d9a9' : '#8d99ae'};">
            ${deltaSign}${analysis.deltaEV.toFixed(1)} EV
          </span>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.card-item').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-card-id');
      const card = state.allCards.find(c => c.id === id);
      if (card) {
        selectCard(card);
        renderApp();
      }
    });
  });
}

function renderHeatmap() {
  const container = document.getElementById('slot-heatmap');
  if (!container || !state.currentAnalysis) return;

  const payouts = state.currentAnalysis.modified.slotPayouts;

  container.innerHTML = payouts.map(sp => {
    const hasPayout = sp.damage > 0;
    return `
      <div class="slot-tile ${sp.color} ${hasPayout ? 'has-payout' : ''}" title="Slot #${sp.number} (${sp.color.toUpperCase()}): ${sp.damage} damage">
        <span class="slot-number">${sp.number}</span>
        <span class="slot-payout">${hasPayout ? `${sp.damage}` : '-'}</span>
      </div>
    `;
  }).join('');
}

function renderAnalytics() {
  const container = document.getElementById('analytics-container');
  if (!container || !state.selectedCard || !state.currentAnalysis) return;

  const card = state.selectedCard;
  const analysis = state.currentAnalysis;
  const rating = analysis.balanceRating;

  let badgeClass = 'bal';
  let ratingText = '⚖️ BALANCED';
  if (rating === 'OVERPOWERED') { badgeClass = 'op'; ratingText = '🔥 OVERPOWERED'; }
  else if (rating === 'UNDERPOWERED') { badgeClass = 'up'; ratingText = '❄️ UNDERPOWERED'; }
  else if (rating === 'DEAD') { badgeClass = 'dead'; ratingText = '💀 DEAD CARD'; }
  else if (rating === 'PHYSICS_DEPENDENT') { badgeClass = 'physics'; ratingText = '🌀 PHYSICS MOD'; }

  container.innerHTML = `
    <div class="ev-hero-box">
      <div class="hero-header">
        <div class="hero-title-group">
          <h2>${card.name}</h2>
          <span class="hero-subtitle">${card.type.toUpperCase()} • ${card.rarity.toUpperCase()}</span>
        </div>
        <div class="rating-badge ${badgeClass}">${ratingText}</div>
      </div>

      <div style="background: rgba(0,245,212,0.1); border: 1px solid var(--cyan-accent); border-radius: 6px; padding: 8px 12px; font-size: 0.85rem; font-weight: 600; color: var(--cyan-accent);">
        ⚡ Optimal Strategy: ${analysis.optimalStrategyName}
      </div>

      <div class="ev-metrics-grid">
        <div class="metric-card">
          <span class="metric-label">Baseline Turn EV</span>
          <span class="metric-value">${analysis.baseline.ev.toFixed(1)}</span>
        </div>
        <div class="metric-card">
          <span class="metric-label">Card Played EV</span>
          <span class="metric-value highlight">${analysis.modified.ev.toFixed(1)}</span>
        </div>
        <div class="metric-card">
          <span class="metric-label">Net EV Gain (ΔEV)</span>
          <span class="metric-value ${analysis.deltaEV >= 0 ? 'positive' : 'negative'}">
            ${analysis.deltaEV >= 0 ? '+' : ''}${analysis.deltaEV.toFixed(1)}
          </span>
        </div>
        <div class="metric-card">
          <span class="metric-label">Efficiency / Essence</span>
          <span class="metric-value ${analysis.efficiency > 5 ? 'positive' : 'highlight'}">
            ${analysis.efficiency.toFixed(1)} EV/cost
          </span>
        </div>
        <div class="metric-card">
          <span class="metric-label">Hit Probability</span>
          <span class="metric-value">${(analysis.modified.hitChance * 100).toFixed(1)}%</span>
        </div>
        <div class="metric-card">
          <span class="metric-label">Max Burst Damage</span>
          <span class="metric-value highlight">${analysis.modified.maxDamage}</span>
        </div>
      </div>

      <div class="recommendation-box">
        <strong>Balancing Analysis:</strong> ${analysis.recommendation}<br>
        <strong style="color: var(--gold-accent);">Suggested Fix:</strong> ${analysis.suggestedAdjustment}
      </div>
    </div>

    <!-- Live Card Tuner Sandbox -->
    <div class="tuner-box">
      <div class="section-title">
        <span>⚙️ Live Card Tuner Sandbox</span>
      </div>

      <div class="tuner-control">
        <div class="tuner-label-row">
          <span>Card Cost (Essence/Chips):</span>
          <strong id="cost-val">${state.tunedCost}⚡</strong>
        </div>
        <input type="range" class="tuner-slider" id="cost-slider" min="0" max="5" value="${state.tunedCost}" step="1">
      </div>

      <button class="btn-primary" id="auto-balance-btn" style="background: linear-gradient(135deg, #00f5d4, #00b4d8); color: #000; font-weight: 800;">
        ✨ Auto-Balance This Card (${analysis.suggestedCost}⚡)
      </button>

      <button class="btn-primary" id="recalc-btn">Re-Evaluate Card EV</button>

      <button class="btn-secondary" id="physics-sim-btn">
        ${state.isPhysicsSimulating ? 'Running Monte Carlo (1,000 Spins)...' : '🌀 Run Monte Carlo Physics Sim (1,000 Spins)'}
      </button>

      ${state.physicsResult ? `
        <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; font-size: 0.85rem; font-family: var(--font-code);">
          <div style="color: var(--cyan-accent); font-weight: bold; margin-bottom: 4px;">Monte Carlo Physics Results:</div>
          <div>Simulations: ${state.physicsResult.simulationsCount} spins</div>
          <div>Empirical EV: <strong>${state.physicsResult.empiricalEV.toFixed(1)}</strong> (Theoretical: ${state.physicsResult.theoreticalEV.toFixed(1)})</div>
          <div>Empirical Hit Rate: ${(state.physicsResult.hitRate * 100).toFixed(1)}%</div>
          <div>Execution Time: ${state.physicsResult.executionTimeMs.toFixed(0)} ms</div>
        </div>
      ` : ''}
    </div>
  `;

  // Attach tuner handlers
  const autoBalBtn = document.getElementById('auto-balance-btn');
  if (autoBalBtn) {
    autoBalBtn.addEventListener('click', () => {
      state.tunedCost = analysis.suggestedCost;
      recalculate();
      renderAnalytics();
      renderHeatmap();
      renderCardList();
    });
  }

  const costSlider = document.getElementById('cost-slider') as HTMLInputElement;
  if (costSlider) {
    costSlider.addEventListener('input', (e) => {
      state.tunedCost = parseInt((e.target as HTMLInputElement).value, 10);
      const costVal = document.getElementById('cost-val');
      if (costVal) costVal.innerText = `${state.tunedCost}⚡`;
      recalculate();
      renderAnalytics();
      renderHeatmap();
    });
  }

  const physicsBtn = document.getElementById('physics-sim-btn');
  if (physicsBtn) {
    physicsBtn.addEventListener('click', () => {
      state.isPhysicsSimulating = true;
      renderAnalytics();
      setTimeout(() => {
        state.physicsResult = PhysicsEVSimulator.runSimulation(
          state.activeWheel,
          analysis.optimalBets,
          { spinSpeed: 1, ballMass: 1, friction: 1, bounceRandomness: 0.1, wheelTilt: 0, targetZoneBias: 0.3, predictionSize: 0, nudgeCheatActive: false },
          state.customBoardMods,
          1000,
          state.selectedCard ? [state.selectedCard] : []
        );
        state.isPhysicsSimulating = false;
        renderAnalytics();
      }, 50);
    });
  }
}

function attachEventListeners() {
  const searchInput = document.getElementById('card-search') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = (e.target as HTMLInputElement).value;
      applyFilters();
    });
  }

  const toggleOptimalBtn = document.getElementById('toggle-optimal-play');
  if (toggleOptimalBtn) {
    toggleOptimalBtn.addEventListener('click', () => {
      state.useOptimalPlay = !state.useOptimalPlay;
      recalculate();
      renderApp();
    });
  }

  document.querySelectorAll('[data-filter-rarity]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.filterRarity = (e.target as HTMLElement).getAttribute('data-filter-rarity') || 'ALL';
      renderApp();
    });
  });

  document.querySelectorAll('[data-filter-type]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.filterType = (e.target as HTMLElement).getAttribute('data-filter-type') || 'ALL';
      renderApp();
    });
  });

  document.querySelectorAll('[data-preset-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.target as HTMLElement).getAttribute('data-preset-id');
      const preset = SCENARIO_PRESETS.find(p => p.id === id);
      if (preset) {
        selectScenario(preset);
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
