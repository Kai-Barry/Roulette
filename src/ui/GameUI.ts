import { GameEngine } from '../core/GameEngine';
import { SoundManager } from './SoundManager';
import { Card, MapNode, SlotColor, BetColor } from '../core/Types';
import { getSlotColor } from '../physics/RoulettePhysics';
import { CARD_DATABASE, getRandomCardId, formatDescription } from '../cards/CardDatabase';
import { WHEEL_TEMPLATES, BOARD_UPGRADES, getAllWheels } from '../core/WheelUpgrades';

export class GameUI {
  private engine: GameEngine;
  private sound: SoundManager;
  private root: HTMLElement;
  
  // Active bet configuration
  private currentBetAmount = 5;
  private selectedBetType: 'red' | 'black' | 'green' | 'number' = 'red';
  private selectedBetNumber = 0;

  // Spin feedback state
  private spinMessage = '';
  private isSpinning = false;
  private showTurnEnd = false;
  private isEnemyResolutionReport = false;

  // Shop state (cached shop offerings for current floor)
  public shopCards: { cardId: string; name: string; cost: number; desc: string; rarity: string; type: string }[] = [];
  public activeShopTab: 'cards' | 'upgrades' = 'cards';

  // Codex filter state
  private codexRarityFilter = 'all';
  private codexTypeFilter = 'all';

  // Forge state
  private hoveredForgeCardId: string | null = null;

  // Wheel Customizer State
  private isCustomizingWheel = false;
  private customWheelData = {
    id: 'custom',
    name: 'Custom Destroyer',
    description: 'A bespoke engine of risk and blood.',
    numbers: [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26],
    greenNumbers: [0],
    colors: {} as Record<number, SlotColor>,
    payoutMultipliers: { red: 2.0, black: 2.0, green: 10.0, number: 12.0, odd: 2.0, even: 2.0, gold: 4.0, purple: 4.0, cyan: 4.0, crimson: 6.0 },
    upgrades: [] as string[]
  };

  private initCustomColors() {
    this.customWheelData.colors = {};
    const reds = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
    for (let i = 0; i <= 36; i++) {
      if (this.customWheelData.greenNumbers.includes(i)) {
        this.customWheelData.colors[i] = 'green';
      } else {
        this.customWheelData.colors[i] = reds.has(i) ? 'red' : 'black';
      }
    }
  }

  // View state tracking
  private currentView = 4;
  public onViewChanged?: (viewId: number) => void;
  public renderer: any = null;

  public setRenderer(renderer: any) {
    this.renderer = renderer;
    renderer.ui = this;
  }

  public purchaseShopCard(idx: number): boolean {
    const state = this.engine.runState;
    if (idx === 999) { // Healing option
      const healCost = 12;
      if (this.engine.healInShop(25, healCost)) {
        this.sound.playDraw();
        this.render();
        return true;
      }
      return false;
    }
    const item = this.shopCards[idx];
    if (!item) return false;
    if (this.engine.buyCardInShop(item.cardId, item.cost)) {
      this.sound.playDraw();
      this.shopCards.splice(idx, 1);
      this.render();
      return true;
    }
    return false;
  }

  public purchaseBoardUpgrade(id: string): boolean {
    if (this.engine.buyBoardUpgrade(id)) {
      this.sound.playDraw();
      this.render();
      return true;
    }
    return false;
  }

  public makeEventChoice(choice: string) {
    const state = this.engine.runState;
    this.sound.playDraw();

    if (choice === '1') {
      state.hp = Math.max(1, state.hp - 8);
      state.chips += 25;
    } else if (choice === '2') {
      const card = CARD_DATABASE['magnetic_force'];
      state.deck.push({
        id: `magnetic_force_${Math.random()}`,
        name: card.name,
        description: card.description,
        cost: card.cost,
        type: card.type,
        rarity: card.rarity,
        effectId: card.effectId
      });
    }

    // Return to map and mark floor progression
    const floor = state.currentFloor;
    const floorNodes = state.mapNodes[floor];
    const node = floorNodes.find(n => n.id === state.currentNodeId);
    if (node) node.completed = true;
    
    state.currentFloor += 1;
    state.gameState = 'MAP';
    this.render();
  }

  public updateShopDescriptionBox() {
    const descBox = this.root.querySelector('#shop-card-desc-box') as HTMLElement;
    const confirmBtn = this.root.querySelector('#shop-confirm-buy-btn') as HTMLButtonElement;
    if (!descBox || !confirmBtn) return;

    const renderer = this.renderer;
    if (!renderer || renderer.selectedShopItemId === null) {
      descBox.innerHTML = `
        <div class="shop-desc-title">NO ITEM SELECTED</div>
        <div class="shop-desc-text">Click a card or upgrade to inspect it.</div>
        <div class="shop-desc-hint">Select an item to purchase</div>
      `;
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'CONFIRM PURCHASE';
      return;
    }

    const itemId = renderer.selectedShopItemId;
    const activeTab = this.activeShopTab;
    const state = this.engine.runState;
    const isPoints = state.combatMode === 'points';

    if (activeTab === 'cards') {
      if (itemId === '999') {
        const healCost = 12;
        const canAfford = state.chips >= healCost && state.hp < state.maxHp;
        const isFull = state.hp >= state.maxHp;
        descBox.innerHTML = `
          <div class="shop-desc-title">BLOOD INFUSION</div>
          <div class="shop-desc-text">${formatDescription('Transfuse essence back into your veins. Heals 25 HP.', isPoints)}</div>
          <div class="shop-desc-hint">Cost: ${healCost} ⚡ · ${isFull ? 'Already Full HP' : canAfford ? 'Click Bell or Confirm Button to Buy' : 'Cannot Afford'}</div>
        `;
        confirmBtn.disabled = !canAfford;
        confirmBtn.textContent = `BUY HEAL: ${healCost} ⚡`;
      } else {
        const idx = parseInt(itemId);
        const item = this.shopCards[idx];
        if (item) {
          const canAfford = state.chips >= item.cost;
          descBox.innerHTML = `
            <div class="shop-desc-title">${item.name.toUpperCase()}</div>
            <div class="shop-desc-text">${formatDescription(item.desc, isPoints)}</div>
            <div class="shop-desc-hint">Rarity: ${item.rarity.toUpperCase()} · Cost: ${item.cost} ⚡ | ${canAfford ? 'Click Bell or Confirm Button to Buy' : 'Cannot Afford'}</div>
          `;
          confirmBtn.disabled = !canAfford;
          confirmBtn.textContent = `BUY CARD: ${item.cost} ⚡`;
        } else {
          renderer.selectedShopItemId = null;
          this.updateShopDescriptionBox();
        }
      }
    } else {
      const upgrade = BOARD_UPGRADES[itemId];
      if (upgrade) {
        const isOwned = state.playerWheel.upgrades.includes(itemId);
        const canAfford = state.chips >= upgrade.cost && !isOwned;
        descBox.innerHTML = `
          <div class="shop-desc-title">${upgrade.name.toUpperCase()}</div>
          <div class="shop-desc-text">${formatDescription(upgrade.description, isPoints)}</div>
          <div class="shop-desc-hint">Cost: ${upgrade.cost} ⚡ · ${isOwned ? 'OWNED' : canAfford ? 'Click Bell or Confirm to Buy' : 'Cannot Afford'}</div>
        `;
        confirmBtn.disabled = !canAfford;
        confirmBtn.textContent = isOwned ? 'OWNED' : `BUY UPGRADE: ${upgrade.cost} ⚡`;
      } else {
        renderer.selectedShopItemId = null;
        this.updateShopDescriptionBox();
      }
    }
  }

  public updateEventDescriptionBox() {
    const descBox = this.root.querySelector('#event-desc-box') as HTMLElement;
    const confirmBtn = this.root.querySelector('#event-confirm-choice-btn') as HTMLButtonElement;
    if (!descBox || !confirmBtn) return;

    const renderer = this.renderer;
    if (!renderer || renderer.selectedEventChoiceId === null) {
      descBox.innerHTML = `
        <div class="event-desc-title">NO TABLET SELECTED</div>
        <div class="event-desc-text">Click a floating stone tablet to inspect.</div>
        <div class="event-desc-hint">Select a choice to proceed</div>
      `;
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'CONFIRM DECISION';
      return;
    }

    const choiceId = renderer.selectedEventChoiceId;
    let title = '';
    let desc = '';
    let hint = '';

    if (choiceId === '1') {
      title = 'INJECT SYRINGE';
      desc = 'Transfuse a high-concentration dose of volatile essence directly into your bloodstream. Risk of rupture is high, but the resource yield is substantial.';
      hint = 'Consequence: Lose 8 HP (Blood) · Gain 25 chips (Essence) | Click tablet again or Confirm to accept';
    } else if (choiceId === '2') {
      title = 'ACCEPT MAGNET';
      desc = 'Draw a heavy iron lodging stone. Induces strong magnetic attractors inside the wheel slot channels to draw the ball towards copper pockets.';
      hint = 'Consequence: Add Lodestone Magnet card to deck | Click tablet again or Confirm to accept';
    } else if (choiceId === '3') {
      title = 'DECLINE & PASS';
      desc = 'Refuse the transaction and ignore the hooded figure. Push past them. A safe path, devoid of both reward and harm.';
      hint = 'Consequence: Gain nothing, lose nothing | Click tablet again or Confirm to accept';
    }

    descBox.innerHTML = `
      <div class="event-desc-title">${title}</div>
      <div class="event-desc-text">${desc}</div>
      <div class="event-desc-hint">${hint}</div>
    `;
    confirmBtn.disabled = false;
    confirmBtn.textContent = `CONFIRM: ${title}`;
  }


  constructor(engine: GameEngine, sound: SoundManager, root: HTMLElement) {
    this.engine = engine;
    this.sound = sound;
    this.root = root;
    this.setupLayout();
    this.render();
  }

  private setupLayout() {
    this.root.innerHTML = `
      <div id="game-container">
        <!-- 3D Canvas goes here -->
        <div id="canvas-container"></div>
        
        <!-- CRT Screen Overlay Effect -->
        <div class="crt-overlay"></div>
        <div class="vignette-overlay"></div>

        <!-- HTML UI Overlay -->
        <div id="ui-overlay">
          <!-- DEBUG STATS OVERLAY -->
          <div id="debug-stats-overlay" class="hidden">
            <div class="debug-stats-header">SYSTEM PERFORMANCE</div>
            <div class="debug-stats-row">
              <span>FPS:</span>
              <span id="debug-fps-value" style="color: #64dd17; font-weight: bold;">--</span>
            </div>
            <canvas id="debug-fps-canvas" width="160" height="40" style="border: 1px solid #3d0e08; background: #0c0402; margin-top: 5px; display: block;"></canvas>
            <div class="debug-stats-row" style="margin-top: 4px; font-size: 10px; color: #888;">
              <span>FRAME TIME:</span>
              <span id="debug-frame-time-value">-- ms</span>
            </div>
          </div>

          <!-- TOP HUD (Global Stats) -->
          <div id="hud-panel" class="hidden">
            <div class="hud-item hp-display">
              <span class="label">BLOOD:</span>
              <div class="bar-container">
                <div id="hud-hp-bar" class="bar hp-bar" style="width: 100%"></div>
                <span id="hud-hp-text" class="bar-text">80 / 80</span>
              </div>
            </div>
            <div class="hud-item chips-display">
              <span class="label">ESSENCE:</span>
              <span id="hud-chips-text" class="value text-gold">20 ⚡</span>
            </div>
            <div class="hud-item floor-display">
              <span class="label">FLOOR:</span>
              <span id="hud-floor-text" class="value">1 / 7</span>
            </div>
            <button id="hud-abandon-btn" class="abandon-btn">ABANDON</button>
            <button id="debug-toggle-btn" class="debug-btn">DEBUG UI: OFF</button>
            <button id="dev-tools-btn" class="debug-btn" style="border-color: #ffaa00; color: #ffaa00; margin-left: 4px;">DEV TOOLS</button>
          </div>

          <!-- FLOATING DEV TOOLS PANEL -->
          <div id="dev-tools-panel" class="hidden">
            <div class="dev-tools-header">DEV TOOLS DASHBOARD</div>
            
            <!-- Group: COMBAT STATS -->
            <div class="dev-group">
              <div class="dev-group-title">Combat Cheats</div>
              <div class="dev-row" style="margin-bottom: 6px;">
                <span style="font-size: 11px; color: #ffaa00; flex: 1; align-self: center;">Mode:</span>
                <select id="dev-combat-mode-select" class="dev-select" style="flex: 2; height: 22px; font-size: 11px;">
                  <option value="points">Points Duel</option>
                  <option value="damage">HP Damage</option>
                </select>
              </div>
              <div class="dev-row">
                <button id="dev-kill-enemy" class="btn">Finish Opponent</button>
              </div>
              <div class="dev-row">
                <button id="dev-drain-enemy" class="btn">Drain 10 HP</button>
              </div>
              <div class="dev-row">
                <button id="dev-add-chips-10" class="btn">+10 Chips</button>
                <button id="dev-add-chips-50" class="btn">+50 Chips</button>
              </div>
              <div class="dev-row">
                <button id="dev-draw-card-1" class="btn">Draw Card</button>
                <button id="dev-draw-card-4" class="btn">Draw 4</button>
              </div>
              <div class="dev-group-title" style="margin-top: 4px;">Spawn Card In Hand</div>
              <div class="dev-row">
                <select id="dev-spawn-card-select" class="dev-select">
                  ${Object.keys(CARD_DATABASE).map(key => `<option value="${key}">${CARD_DATABASE[key].name}</option>`).join('')}
                </select>
                <button id="dev-spawn-card-btn" class="btn" style="flex: 0 0 70px;">Spawn</button>
              </div>
            </div>

            <!-- Group: GLOBAL RUN STATS -->
            <div class="dev-group">
              <div class="dev-group-title">Run Cheats</div>
              <div class="dev-row">
                <button id="dev-add-run-essence" class="btn">+100 Essence</button>
              </div>
              <div class="dev-row">
                <button id="dev-full-heal" class="btn">Full Heal</button>
                <button id="dev-set-hp-1" class="btn">Set HP to 1</button>
              </div>
              <div class="dev-group-title" style="margin-top: 4px;">Add Card to Deck</div>
              <div class="dev-row">
                <select id="dev-add-deck-select" class="dev-select">
                  ${Object.keys(CARD_DATABASE).map(key => `<option value="${key}">${CARD_DATABASE[key].name}</option>`).join('')}
                </select>
                <button id="dev-add-deck-btn" class="btn" style="flex: 0 0 70px;">Add</button>
              </div>
              <div class="dev-group-title" style="margin-top: 4px;">Inject Slot Color</div>
              <div class="dev-row">
                <select id="dev-color-slot-select" class="dev-select">
                  <option value="gold">Gold</option>
                  <option value="purple">Purple</option>
                  <option value="cyan">Cyan</option>
                  <option value="crimson">Crimson</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="black">Black</option>
                </select>
                <button id="dev-color-slot-btn" class="btn" style="flex: 0 0 70px;">Inject</button>
              </div>
            </div>

            <!-- Group: TELEPORTS & MAP -->
            <div class="dev-group">
              <div class="dev-group-title">Teleport & Navigation</div>
              <div class="dev-row">
                <button id="dev-skip-floor-btn" class="btn">Skip Floor</button>
              </div>
              <div class="dev-row">
                <button class="btn dev-teleport-btn" data-node="combat">Combat</button>
                <button class="btn dev-teleport-btn" data-node="elite">Elite</button>
              </div>
              <div class="dev-row">
                <button class="btn dev-teleport-btn" data-node="boss">Boss</button>
                <button class="btn dev-teleport-btn" data-node="shop">Shop</button>
                <button class="btn dev-teleport-btn" data-node="event">Event</button>
                <button class="btn dev-teleport-btn" data-node="forge" style="border-color: #ff5500; color: #ff5500;">Forge</button>
              </div>
            </div>
          </div>

          <!-- SPIN RESOLUTION REPORT SCREEN -->
          <div id="resolution-overlay" class="hidden">
            <div class="resolution-card glass-panel">
              <h2 class="res-header">SPIN RESOLUTION REPORT</h2>
              
              <!-- Active Wheel Name display -->
              <div id="res-wheel-name" style="font-size: 14px; text-transform: uppercase; color: #ffb300; letter-spacing: 2px; text-align: center; margin-top: -5px; margin-bottom: 15px; font-family: 'Courier Prime', monospace; font-weight: bold;"></div>

              <!-- Result slot circle -->
              <div class="res-slot-row">
                <div id="res-slot-badge" class="res-badge">0</div>
              </div>
              
              <!-- Damage/Reward summary -->
              <div id="res-summary-text" class="res-summary">DEALT 45 DAMAGE!</div>
              
              <!-- Bets detail -->
              <div class="res-details-group">
                <div class="res-details-title">Bets Outcome</div>
                <div id="res-bets-list" class="res-details-list"></div>
              </div>
              
              <!-- Cards in effect detail -->
              <div class="res-details-group">
                <div class="res-details-title">Cards Active This Turn</div>
                <div id="res-cards-list" class="res-details-list"></div>
              </div>
              
              <!-- Action button to dismiss -->
              <button id="res-continue-btn" class="btn primary-btn pulse-glow" style="margin-top: 10px;">CONTINUE</button>
            </div>
          </div>

          <!-- PANEL: MAIN MENU -->
          <div id="menu-panel" class="panel active">
            <h1 class="game-title">ROULETTE.OS</h1>
            <div class="menu-btn-group">
              <button id="start-run-btn" class="btn primary-btn pulse-glow">ENTER THE TAVERN</button>
              <button id="codex-btn" class="codex-menu-btn">CARD CODEX</button>
            </div>
          </div>

          <!-- PANEL: CARD CODEX -->
          <div id="codex-panel" class="hidden">
            <button id="codex-close-btn" class="btn codex-close-btn">✕ CLOSE</button>
            <h2 class="codex-header">CARD CODEX</h2>
            <p class="codex-subtext">All cards available in the game. Study them before your next run.</p>
            
            <div class="codex-filters">
              <div class="filter-group">
                <span class="filter-label">Rarity:</span>
                <button class="filter-btn active" data-filter-type="rarity" data-value="all">All</button>
                <button class="filter-btn" data-filter-type="rarity" data-value="common">Common</button>
                <button class="filter-btn" data-filter-type="rarity" data-value="uncommon">Uncommon</button>
                <button class="filter-btn" data-filter-type="rarity" data-value="rare">Rare</button>
                <button class="filter-btn" data-filter-type="rarity" data-value="legendary">Legendary</button>
              </div>
              <div class="filter-group" style="margin-top: 8px;">
                <span class="filter-label">Type:</span>
                <button class="filter-btn active" data-filter-type="type" data-value="all">All</button>
                <button class="filter-btn" data-filter-type="type" data-value="payout">Payout</button>
                <button class="filter-btn" data-filter-type="type" data-value="physics">Physics</button>
                <button class="filter-btn" data-filter-type="type" data-value="board">Board</button>
                <button class="filter-btn" data-filter-type="type" data-value="utility">Utility</button>
              </div>
            </div>
            
            <div id="codex-grid" class="codex-grid"></div>
          </div>

          <!-- PANEL: LOADOUT STORE -->
          <div id="store-panel" class="panel hidden">
            <!-- Rendered dynamically in renderLoadoutStore -->
          </div>

          <!-- PANEL: WHEEL CUSTOMIZER -->
          <div id="wheel-customizer-panel" class="panel hidden">
            <h2 class="panel-header">CRAFT YOUR CUSTOM WHEEL</h2>
            <p class="flavor-text">Select your numbers, toggle colors, set payouts, and build your board.</p>
            
            <div class="customizer-layout">
              <!-- Left panel: Name & Payout multipliers -->
              <div class="customizer-sidebar glass-panel">
                <div class="input-group">
                  <label>Wheel Name:</label>
                  <input type="text" id="cust-wheel-name" value="Custom Destroyer" maxlength="24">
                </div>
                <div class="input-group" style="margin-top: 10px;">
                  <label>Description:</label>
                  <input type="text" id="cust-wheel-desc" value="A bespoke engine of risk and blood." maxlength="80">
                </div>
                
                <div class="payout-inputs-header">Payout Multipliers:</div>
                <div class="payout-inputs-grid">
                  <div class="input-group-inline">
                    <label>Red:</label>
                    <input type="number" id="cust-payout-red" value="2.0" step="0.1" min="1.0" max="10.0">
                  </div>
                  <div class="input-group-inline">
                    <label>Black:</label>
                    <input type="number" id="cust-payout-black" value="2.0" step="0.1" min="1.0" max="10.0">
                  </div>
                  <div class="input-group-inline">
                    <label>Green:</label>
                    <input type="number" id="cust-payout-green" value="10.0" step="0.5" min="2.0" max="50.0">
                  </div>
                  <div class="input-group-inline">
                    <label>Single #:</label>
                    <input type="number" id="cust-payout-number" value="12.0" step="1.0" min="5.0" max="100.0">
                  </div>
                  <div class="input-group-inline">
                    <label>Odd:</label>
                    <input type="number" id="cust-payout-odd" value="2.0" step="0.1" min="1.0" max="10.0">
                  </div>
                  <div class="input-group-inline">
                    <label>Even:</label>
                    <input type="number" id="cust-payout-even" value="2.0" step="0.1" min="1.0" max="10.0">
                  </div>
                </div>
                
                <div class="customizer-actions">
                  <button id="cust-cancel-btn" class="btn secondary-btn">✕ CANCEL</button>
                  <button id="cust-start-btn" class="btn primary-btn pulse-glow">✓ SAVE WHEEL</button>
                </div>
              </div>
              
              <!-- Right panel: Interactive slot editor -->
              <div class="customizer-board-editor glass-panel">
                <div class="editor-instructions">
                  Click cells to toggle inclusion on the wheel. Click active cell color dots to cycle: 
                  <span class="dot-desc color-green">Green</span> -> 
                  <span class="dot-desc color-red">Red</span> -> 
                  <span class="dot-desc color-black">Black</span> ->
                  <span class="dot-desc color-gold">Gold</span> ->
                  <span class="dot-desc color-purple">Purple</span> ->
                  <span class="dot-desc color-cyan">Cyan</span> ->
                  <span class="dot-desc color-crimson">Crimson</span>.
                </div>
                <div class="quick-templates">
                  Quick Templates:
                  <button class="template-btn" data-template="mini">Mini (0-12)</button>
                  <button class="template-btn" data-template="even">Even Only</button>
                  <button class="template-btn" data-template="reds">All Reds</button>
                  <button class="template-btn" data-template="classic">Classic (0-36)</button>
                </div>
                
                <div class="numbers-selector-grid" id="cust-numbers-grid">
                  <!-- Dynamic Grid will go here -->
                </div>
              </div>
            </div>
          </div>

          <!-- PANEL: MAP PROGRESSION -->
          <div id="map-panel" class="panel hidden">
            <h2 class="panel-header">THE BRANCHING PATHS</h2>
            <div id="map-scroll-container" class="map-container">
              <!-- Dynamically generated map SVG/HTML -->
            </div>
          </div>

          <!-- PANEL: SHOP -->
          <div id="shop-panel" class="panel hidden">
            <div class="shop-header-panel">
              <h2>THE CROUPIER'S SHOP</h2>
              <p class="shop-welcome">"Spend your essence wisely, mortal. Or bleed for it..."</p>
              
              <!-- Shop Tabs -->
              <div class="shop-tabs-bar">
                <button id="shop-tab-cards" class="shop-tab-btn active">CARDS & HEAL</button>
                <button id="shop-tab-upgrades" class="shop-tab-btn">BOARD UPGRADES</button>
              </div>
            </div>

            <!-- Tab View Panels (hidden, but populated in JS) -->
            <div id="shop-cards-view" class="shop-view-panel hidden">
              <div id="shop-items-container" class="shop-grid"></div>
            </div>
            
            <div id="shop-upgrades-view" class="shop-view-panel hidden">
              <div id="shop-upgrades-container" class="shop-grid"></div>
            </div>

            <div class="shop-bottom-hud">
              <div id="shop-card-desc-box" class="shop-card-desc-box"></div>
              <div class="shop-actions-row">
                <button id="shop-confirm-buy-btn" class="btn primary-btn" disabled>CONFIRM PURCHASE</button>
                <button id="shop-leave-btn" class="btn secondary-btn">RETURN TO PATHS</button>
              </div>
            </div>
          </div>

          <!-- PANEL: EVENT -->
          <div id="event-panel" class="panel hidden">
            <div class="event-header-panel">
              <h2 id="event-title">A DARK ENCOUNTER</h2>
              <p id="event-text" class="event-narrative"></p>
            </div>
            
            <!-- Hidden choice triggers (drawn in 3D now) -->
            <div id="event-options" class="event-choices-list hidden"></div>

            <div class="event-bottom-hud">
              <div id="event-desc-box" class="event-desc-box"></div>
              <div class="event-actions-row">
                <button id="event-confirm-choice-btn" class="btn primary-btn" disabled>CONFIRM DECISION</button>
              </div>
            </div>
          </div>

          <!-- PANEL: FORGE (BOARD/WHEEL BUILDER) -->
          <div id="forge-panel" class="panel hidden">
            <!-- Rendered dynamically in renderForge -->
          </div>

          <!-- PANEL: COMBAT PLAY OVERLAY -->
          <div id="combat-ui" class="hidden">
            <!-- Left Side: Enemy Status -->
            <div class="combat-left">
              <div class="enemy-hud glass-panel">
                <h3 id="enemy-name" class="enemy-title">DREAD GAMBLER</h3>
                <div class="bar-container enemy-hp-container">
                  <div id="enemy-hp-bar" class="bar hp-bar" style="width: 100%"></div>
                  <span id="enemy-hp-text" class="bar-text">50 / 50</span>
                </div>
                <div class="enemy-intent">
                  <span class="intent-label">INTENT:</span>
                  <span id="enemy-intent-text" class="intent-desc">Slash (5 damage)</span>
                </div>
              </div>
            </div>

            <!-- Right Side: Casino Betting Board -->
            <div class="combat-right glass-panel">
              <div class="betting-board">
                <div class="betting-header">BETTING BOARD</div>
                
                <!-- Quick Bet Selector -->
                <div class="bet-value-row">
                  <span class="sub-label">AMOUNT:</span>
                  <button class="bet-val-btn active" data-val="1">1</button>
                  <button class="bet-val-btn" data-val="5">5</button>
                  <button class="bet-val-btn" data-val="10">10</button>
                  <button class="bet-val-btn" data-val="max">MAX</button>
                </div>

                <!-- Colors & Category Bets -->
                <div class="bet-type-row">
                  <button class="bet-btn bet-red" data-type="red">RED (2x)</button>
                  <button class="bet-btn bet-black" data-type="black">BLACK (2x)</button>
                  <button class="bet-btn bet-green" data-type="green">GREEN (14x)</button>
                </div>
                <div class="bet-type-row" style="margin-top: 8px;">
                  <button class="bet-btn bet-odd" data-type="odd">ODD (2x)</button>
                  <button class="bet-btn bet-even" data-type="even">EVEN (2x)</button>
                </div>
                <div class="bet-type-row" style="margin-top: 8px;">
                  <button class="bet-btn bet-gold" data-type="gold" style="background: linear-gradient(135deg, #ffd700, #b8860b); color: #000;">GOLD (4x)</button>
                  <button class="bet-btn bet-purple" data-type="purple" style="background: linear-gradient(135deg, #9c27b0, #6a1b9a); color: #fff;">PURPLE (4x)</button>
                  <button class="bet-btn bet-cyan" data-type="cyan" style="background: linear-gradient(135deg, #00bcd4, #00838f); color: #fff;">CYAN (4x)</button>
                  <button class="bet-btn bet-crimson" data-type="crimson" style="background: linear-gradient(135deg, #ff007f, #4a0025); color: #fff;">CRIMSON (6x)</button>
                </div>

                <!-- Number Grid Bets 0-36 -->
                <div class="number-grid-label">OR BET SPECIFIC NUMBER (36x):</div>
                <div id="board-hover-info" class="board-hover-info">HOVER A SLOT TO VIEW PAYOUTS</div>
                <div class="number-grid-container">
                  <div class="num-cell num-green" data-num="0">0</div>
                  ${Array.from({ length: 36 }, (_, i) => {
                    const num = i + 1;
                    const color = getSlotColor(num);
                    return `<div class="num-cell num-${color}" data-num="${num}">${num}</div>`;
                  }).join('')}
                </div>

                <!-- Placed Bets Readout -->
                <div class="placed-bets-panel">
                  <div class="sub-label">ACTIVE BETS:</div>
                  <div id="placed-bets-list" class="placed-bets-list">No bets placed</div>
                </div>

                <!-- Combat Primary Buttons -->
                <div class="combat-actions">
                  <button id="clear-bets-btn" class="btn secondary-btn">CLEAR</button>
                  <button id="spin-wheel-btn" class="btn primary-btn pulse-glow disabled">SPIN WHEEL</button>
                  <button id="end-turn-btn" class="btn next-turn-btn hidden">END TURN</button>
                </div>
              </div>
            </div>

            <!-- Center screen readout overlay for spin resolution -->
            <div id="spin-overlay" class="hidden">
              <div id="spin-text" class="spin-announcement">SPINNING...</div>
            </div>

            <!-- View Controller HUD (Bottom-left, always visible during combat) -->
            <div class="view-controller-hud glass-panel">
              <button class="view-btn active" data-view="4">OVERVIEW</button>
              <button class="view-btn" data-view="1">CARDS</button>
              <button class="view-btn" data-view="2">BOARD</button>
              <button class="view-btn" data-view="3">MY WHEEL</button>
              <button class="view-btn" data-view="6">OPP. WHEEL</button>
              <button class="view-btn" data-view="5">OPP. BOARD</button>
              <button class="view-btn" data-view="7">OPPONENT</button>
            </div>

            <!-- Draw Card & Deck Counters Panel -->
            <div class="combat-deck-panel">
              <button id="draw-card-btn" class="draw-card-btn">DRAW CARD (FREE)</button>
              <div class="deck-counters">
                <div class="deck-counter">
                  <span class="counter-label">DRAW:</span>
                  <span id="draw-pile-count" class="counter-value">0</span>
                </div>
                <div class="deck-counter">
                  <span class="counter-label">DISC:</span>
                  <span id="discard-pile-count" class="counter-value">0</span>
                </div>
                <div class="deck-counter">
                  <span class="counter-label">HAND:</span>
                  <span id="hand-count" class="counter-value">0</span>
                </div>
              </div>
            </div>

            <!-- Hand Instruction HUD -->
            <div class="combat-bottom-hud">
              <span class="tutorial-tip">Click DRAW CARD to buy cards from your deck. Click 3D Bell to SPIN / END TURN. Press 'C' to Clear Bets. Press '1'-'6' / Arrow keys to change camera view. Press 'D' to toggle Debug UI.</span>
              <div class="turn-chips-panel">
                <span>TURN CHIPS:</span>
                <span id="turn-chips-value" class="text-gold">10 ⚡</span>
              </div>
            </div>
          </div>

          <!-- PANEL: GAME OVER -->
          <div id="gameover-panel" class="panel hidden">
            <h2 class="gameover-title">DEFEAT</h2>
            <p class="flavor-text">Your essence belongs to the House now.</p>
            <button id="restart-gameover-btn" class="btn primary-btn">PLAY AGAIN</button>
          </div>

          <!-- PANEL: VICTORY -->
          <div id="victory-panel" class="panel hidden">
            <h2 class="victory-title">VICTORY</h2>
            <p class="flavor-text">You successfully broke the wheel and escaped the Tavern.</p>
            <button id="restart-victory-btn" class="btn primary-btn">PLAY AGAIN</button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  private bindEvents() {
    // Menu start button
    const startBtn = this.root.querySelector('#start-run-btn');
    startBtn?.addEventListener('click', () => {
      this.sound.playDraw();
      this.engine.startNewRun();
      this.render();
    });

    // Card Codex button
    const codexBtn = this.root.querySelector('#codex-btn');
    codexBtn?.addEventListener('click', () => {
      this.sound.playDraw();
      // Reset filters when opening
      this.codexRarityFilter = 'all';
      this.codexTypeFilter = 'all';
      const filterBtns = this.root.querySelectorAll('#codex-panel .filter-btn');
      filterBtns.forEach(btn => {
        if (btn.getAttribute('data-value') === 'all') {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      this.showCodex();
    });

    // Codex close button
    const codexCloseBtn = this.root.querySelector('#codex-close-btn');
    codexCloseBtn?.addEventListener('click', () => {
      this.sound.playCardSwoosh();
      const codexPanel = this.root.querySelector('#codex-panel');
      codexPanel?.classList.add('hidden');
    });

    // Codex filter events delegation
    const codexPanel = this.root.querySelector('#codex-panel');
    codexPanel?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('filter-btn')) {
        const filterType = target.getAttribute('data-filter-type')!;
        const value = target.getAttribute('data-value')!;
        
        // Update active class
        const siblingButtons = target.parentElement?.querySelectorAll('.filter-btn');
        siblingButtons?.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        
        // Update filter state and re-render codex
        this.sound.playRouletteClick(0.5);
        if (filterType === 'rarity') {
          this.codexRarityFilter = value;
        } else if (filterType === 'type') {
          this.codexTypeFilter = value;
        }
        this.showCodex();
      }
    });

    // Draw Card button
    const drawCardBtn = this.root.querySelector('#draw-card-btn');
    drawCardBtn?.addEventListener('click', () => {
      if (this.engine.buyCardDraw()) {
        this.sound.playDraw();
        this.render();
      } else {
        this.sound.playRouletteClick(0.3);
      }
    });

    // Abandon run button
    const abandonBtn = this.root.querySelector('#hud-abandon-btn');
    abandonBtn?.addEventListener('click', () => {
      this.sound.playCardSwoosh();
      this.engine.runState.gameState = 'MENU';
      this.render();
    });

    // Restart game over
    const restartGameOverBtn = this.root.querySelector('#restart-gameover-btn');
    restartGameOverBtn?.addEventListener('click', () => {
      this.sound.playDraw();
      this.engine.startNewRun();
      this.render();
    });

    // Restart victory
    const restartVictoryBtn = this.root.querySelector('#restart-victory-btn');
    restartVictoryBtn?.addEventListener('click', () => {
      this.sound.playDraw();
      this.engine.startNewRun();
      this.render();
    });

    // Shop leave
    const shopLeaveBtn = this.root.querySelector('#shop-leave-btn');
    shopLeaveBtn?.addEventListener('click', () => {
      this.sound.playCardSwoosh();
      if (this.renderer) {
        this.renderer.selectedShopItemId = null;
      }
      
      const state = this.engine.runState;
      const floor = state.currentFloor;
      const floorNodes = state.mapNodes[floor];
      const node = floorNodes.find(n => n.id === state.currentNodeId);
      if (node) node.completed = true;
      
      state.currentFloor += 1;
      this.shopCards = []; // clear cache
      this.activeShopTab = 'cards'; // reset tab state
      
      this.engine.runState.gameState = 'MAP';
      this.render();
    });

    // Shop Confirm Buy click handler
    const shopConfirmBuyBtn = this.root.querySelector('#shop-confirm-buy-btn');
    shopConfirmBuyBtn?.addEventListener('click', () => {
      if (!this.renderer || this.renderer.selectedShopItemId === null) return;
      const itemId = this.renderer.selectedShopItemId;
      const activeTab = this.activeShopTab;
      let success = false;
      if (activeTab === 'cards') {
        const idx = parseInt(itemId);
        success = this.purchaseShopCard(idx);
      } else {
        success = this.purchaseBoardUpgrade(itemId);
      }
      if (success) {
        this.renderer.selectedShopItemId = null;
        this.updateShopDescriptionBox();
      }
    });

    // Event Confirm Choice click handler
    const eventConfirmChoiceBtn = this.root.querySelector('#event-confirm-choice-btn');
    eventConfirmChoiceBtn?.addEventListener('click', () => {
      if (!this.renderer || this.renderer.selectedEventChoiceId === null) return;
      const choiceId = this.renderer.selectedEventChoiceId;
      this.makeEventChoice(choiceId);
      this.renderer.selectedEventChoiceId = null;
    });

    // Shop Tabs click handlers
    const tabCards = this.root.querySelector('#shop-tab-cards');
    const tabUpgrades = this.root.querySelector('#shop-tab-upgrades');
    tabCards?.addEventListener('click', () => {
      if (this.activeShopTab === 'cards') return;
      this.sound.playDraw();
      this.activeShopTab = 'cards';
      if (this.renderer) {
        this.renderer.selectedShopItemId = null;
      }
      this.render();
    });
    tabUpgrades?.addEventListener('click', () => {
      if (this.activeShopTab === 'upgrades') return;
      this.sound.playDraw();
      this.activeShopTab = 'upgrades';
      if (this.renderer) {
        this.renderer.selectedShopItemId = null;
      }
      this.render();
    });

    // Betting selectors (Value buttons)
    const valBtns = this.root.querySelectorAll('.bet-val-btn');
    valBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        valBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.getAttribute('data-val')!;
        
        if (val === 'max') {
          this.currentBetAmount = this.engine.battleState?.chipsPool || 0;
        } else {
          this.currentBetAmount = parseInt(val);
        }
        this.sound.playDraw();
      });
    });

    // Color betting buttons click
    const betBtns = this.root.querySelectorAll('.bet-btn');
    betBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type') as 'red' | 'black' | 'green' | 'odd' | 'even' | 'gold' | 'purple' | 'cyan' | 'crimson';
        this.placeEngineBet(type, this.currentBetAmount);
      });
    });

    // Grid numbers click
    const numCells = this.root.querySelectorAll('.num-cell');
    numCells.forEach(cell => {
      cell.addEventListener('click', () => {
        const num = parseInt(cell.getAttribute('data-num')!);
        this.placeEngineBet('number', this.currentBetAmount, num);
      });
    });

    // Clear bets
    const clearBtn = this.root.querySelector('#clear-bets-btn');
    clearBtn?.addEventListener('click', () => {
      this.sound.playCardSwoosh();
      this.engine.clearBets();
      this.render();
    });

    // Spin wheel
    const spinBtn = this.root.querySelector('#spin-wheel-btn');
    spinBtn?.addEventListener('click', () => {
      this.triggerSpin();
    });

    // End turn
    const endTurnBtn = this.root.querySelector('#end-turn-btn');
    endTurnBtn?.addEventListener('click', () => {
      this.sound.playDraw();
      this.engine.resolveEnemyTurn();
      this.showTurnEnd = false;
      this.render();
    });

    // Debug toggle click
    const debugToggleBtn = this.root.querySelector('#debug-toggle-btn');
    debugToggleBtn?.addEventListener('click', () => {
      this.sound.playDraw();
      document.body.classList.toggle('debug-ui-active');
      const isActive = document.body.classList.contains('debug-ui-active');
      if (debugToggleBtn) debugToggleBtn.textContent = `DEBUG UI: ${isActive ? 'ON' : 'OFF'}`;
      
      const statsOverlay = this.root.querySelector('#debug-stats-overlay');
      if (statsOverlay) {
        if (isActive) statsOverlay.classList.remove('hidden');
        else statsOverlay.classList.add('hidden');
      }
    });

    // Dev Tools Toggle
    const devToolsBtn = this.root.querySelector('#dev-tools-btn');
    const devToolsPanel = this.root.querySelector('#dev-tools-panel');
    devToolsBtn?.addEventListener('click', () => {
      this.sound.playDraw();
      devToolsPanel?.classList.toggle('hidden');
      const isVisible = !devToolsPanel?.classList.contains('hidden');
      if (devToolsBtn) {
        devToolsBtn.textContent = `DEV TOOLS: ${isVisible ? 'ON' : 'OFF'}`;
        if (isVisible) {
          (devToolsBtn as HTMLElement).style.borderColor = '#ffaa00';
          (devToolsBtn as HTMLElement).style.color = '#ffaa00';
        } else {
          (devToolsBtn as HTMLElement).style.borderColor = '#555';
          (devToolsBtn as HTMLElement).style.color = '#888';
        }
      }
    });

    // Dev tools combat mode binding
    const devCombatModeSelect = this.root.querySelector('#dev-combat-mode-select') as HTMLSelectElement;
    devCombatModeSelect?.addEventListener('change', () => {
      this.engine.runState.combatMode = devCombatModeSelect.value as 'points' | 'damage';
      this.sound.playDraw();
      this.render();
    });

    // Dev tools button bindings
    this.root.querySelector('#dev-kill-enemy')?.addEventListener('click', () => {
      this.sound.playBell();
      this.engine.devDefeatEnemy();
      this.render();
    });

    this.root.querySelector('#dev-drain-enemy')?.addEventListener('click', () => {
      this.sound.playCardSwoosh();
      this.engine.devDamageEnemy(10);
      this.engine.devAdjustHp(10);
      this.render();
    });

    this.root.querySelector('#dev-add-chips-10')?.addEventListener('click', () => {
      this.sound.playDraw();
      this.engine.devAddChips(10);
      this.render();
    });

    this.root.querySelector('#dev-add-chips-50')?.addEventListener('click', () => {
      this.sound.playDraw();
      this.engine.devAddChips(50);
      this.render();
    });

    this.root.querySelector('#dev-draw-card-1')?.addEventListener('click', () => {
      this.sound.playDraw();
      this.engine.drawCard();
      this.render();
    });

    this.root.querySelector('#dev-draw-card-4')?.addEventListener('click', () => {
      this.sound.playDraw();
      for (let i = 0; i < 4; i++) this.engine.drawCard();
      this.render();
    });

    this.root.querySelector('#dev-spawn-card-btn')?.addEventListener('click', () => {
      const select = this.root.querySelector('#dev-spawn-card-select') as HTMLSelectElement;
      if (select) {
        this.sound.playDraw();
        this.engine.devSpawnCard(select.value);
        this.render();
      }
    });

    this.root.querySelector('#dev-add-run-essence')?.addEventListener('click', () => {
      this.sound.playDraw();
      this.engine.devAddChips(100);
      this.render();
    });

    this.root.querySelector('#dev-full-heal')?.addEventListener('click', () => {
      this.sound.playDraw();
      this.engine.devAdjustHp(100);
      this.render();
    });

    this.root.querySelector('#dev-set-hp-1')?.addEventListener('click', () => {
      this.sound.playDraw();
      const diff = 1 - this.engine.runState.hp;
      this.engine.devAdjustHp(diff);
      this.render();
    });

    this.root.querySelector('#dev-add-deck-btn')?.addEventListener('click', () => {
      const select = this.root.querySelector('#dev-add-deck-select') as HTMLSelectElement;
      if (select) {
        this.sound.playDraw();
        this.engine.devAddCardToDeck(select.value);
        this.render();
      }
    });

    this.root.querySelector('#dev-color-slot-btn')?.addEventListener('click', () => {
      const select = this.root.querySelector('#dev-color-slot-select') as HTMLSelectElement;
      if (select) {
        this.sound.playBell();
        const color = select.value as SlotColor;
        const wheel = this.engine.runState.playerWheel;
        const missing = [];
        for (let i = 0; i <= 36; i++) {
          if (!wheel.numbers.includes(i)) missing.push(i);
        }
        let num = 0;
        if (missing.length > 0) {
          num = missing[Math.floor(Math.random() * missing.length)];
          wheel.numbers.push(num);
        } else {
          num = wheel.numbers[Math.floor(Math.random() * wheel.numbers.length)];
        }
        wheel.colors[num] = color;
        if (color === 'green' && !wheel.greenNumbers.includes(num)) {
          wheel.greenNumbers.push(num);
        }
        if (this.renderer) {
          this.renderer.wheelVis.rebuildWheel(false, wheel);
        }
        this.render();
      }
    });

    this.root.querySelector('#dev-skip-floor-btn')?.addEventListener('click', () => {
      this.sound.playDraw();
      this.engine.devSkipFloor();
      this.render();
    });

    this.root.querySelectorAll('.dev-teleport-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const nodeType = btn.getAttribute('data-node') as any;
        if (nodeType) {
          this.sound.playDraw();
          this.engine.devTeleport(nodeType);
          this.render();
        }
      });
    });

    // View buttons click
    const viewBtns = this.root.querySelectorAll('.view-controller-hud .view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const viewId = parseInt(btn.getAttribute('data-view') || '4');
        this.sound.playDraw();
        this.setCurrentView(viewId);
      });
    });

    // Document wide keyboard input tracking
    document.addEventListener('keydown', (e) => {
      // Toggle debug menu on 'D'
      if (e.key === 'd' || e.key === 'D') {
        const dBtn = this.root.querySelector('#debug-toggle-btn') as HTMLElement;
        if (dBtn) dBtn.click();
      }

      // Switch views on '1' - '7'
      if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        this.setCurrentView(parseInt(e.key));
      }

      // Arrow keys navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        let nextView = this.currentView;
        const viewOrder = [4, 1, 2, 3, 6, 5, 7];
        const currentIdx = viewOrder.indexOf(this.currentView);
        if (e.key === 'ArrowRight') {
          const nextIdx = (currentIdx + 1) % viewOrder.length;
          nextView = viewOrder[nextIdx];
        } else {
          const prevIdx = (currentIdx - 1 + viewOrder.length) % viewOrder.length;
          nextView = viewOrder[prevIdx];
        }
        this.setCurrentView(nextView);
      }

      // Clear bets on 'C'
      if (e.key === 'c' || e.key === 'C') {
        if (this.engine.battleState && !this.isSpinning) {
          this.sound.playCardSwoosh();
          this.engine.clearBets();
          this.render();
        }
      }
    });

    // Spin report continue button click
    const resContinueBtn = this.root.querySelector('#res-continue-btn');
    resContinueBtn?.addEventListener('click', () => {
      this.sound.playDraw();
      
      const overlay = this.root.querySelector('#resolution-overlay');
      overlay?.classList.add('hidden');

      if (this.engine.battleState) {
        this.engine.battleState.isResolving = false;
      }

      if (!this.engine.battleState) {
        this.render();
        return;
      }

      if (!this.isEnemyResolutionReport) {
        // Player spin continue
        const isPointsMode = this.engine.runState.combatMode === 'points';
        if (!isPointsMode && this.engine.battleState.enemy.hp <= 0) {
          this.engine.resolveEnemyTurn();
          this.render();
        } else {
          this.triggerOpponentTurnSequence();
        }
      } else {
        // Enemy spin continue
        this.engine.resolveEnemyTurn();
        this.setCurrentView(4); // reset to overview
        this.render();
      }
    });
  }

  private placeEngineBet(type: 'red' | 'black' | 'green' | 'number' | 'odd' | 'even' | 'gold' | 'purple' | 'cyan' | 'crimson', amount: number, numberValue?: number) {
    if (!this.engine.battleState || this.engine.battleState.phase !== 'betting') return;
    
    // Play drawing sound
    this.sound.playDraw();
    
    const actualAmount = Math.min(amount, this.engine.battleState.chipsPool);
    if (actualAmount <= 0) return;

    this.engine.placeBet(type, actualAmount, numberValue);
    this.render();
  }

  private triggerSpin(isEnemySpin = false) {
    if (!this.engine.battleState || this.isSpinning) return;
    if (!isEnemySpin && this.engine.battleState.bets.length === 0) return;
    
    // Explicitly transition to Wheel view when spinning starts!
    this.setCurrentView(isEnemySpin ? 6 : 3);

    this.isSpinning = true;
    this.showTurnEnd = false;
    this.spinMessage = isEnemySpin ? 'ENEMY WHEEL IS SPINNING...' : 'THE WHEEL IS SPINNING...';
    if (this.engine.battleState) {
      this.engine.battleState.isResolving = false;
    }
    this.render();
    
    // Trigger physics engine spin
    this.engine.spinWheel();
    
    // Clicks and bounces are now driven in real-time by the physics engine callbacks

    // Continuous physics step simulations managed by 3D renderer for smooth rendering
    if (this.renderer) {
      this.renderer.onSpinSettled = () => {
        if (isEnemySpin) {
          this.resolveEnemySpinOutcome();
        } else {
          this.resolveSpinOutcome();
        }
      };
    }
  }

  private resolveSpinOutcome() {
    this.engine.resolveSpin();
    
    const res = this.engine.battleState?.lastSpinResult;
    if (!res) return;

    this.isSpinning = false;
    this.sound.playDamageDealt();
    if (this.engine.battleState) {
      this.engine.battleState.isResolving = true;
    }

    const colorText = res.color.toUpperCase();
    const outcomeText = `${res.number} ${colorText}`;
    
    if (res.damageDealt > 0) {
      this.spinMessage = `LANDED ON: ${outcomeText}! <br><span class="text-green">HIT! DEALT ${res.damageDealt} DAMAGE!</span>`;
    } else {
      this.spinMessage = `LANDED ON: ${outcomeText}. <br><span class="text-red">MISS. NO DAMAGE DEALT.</span>`;
    }
    
    this.render();

    // Show spin report overlay screen instead of auto-timeout!
    setTimeout(() => {
      this.showSpinReport(false);
    }, 1800);
  }

  private triggerOpponentTurnSequence() {
    const battle = this.engine.battleState;
    if (!battle) return;

    if (battle.boardModifiers.enemyStunTurns && battle.boardModifiers.enemyStunTurns > 0) {
      battle.boardModifiers.enemyStunTurns--;
      this.spinMessage = "ENEMY IS STUNNED! TURN SKIPPED!";
      this.render();
      setTimeout(() => {
        this.engine.resolveEnemyTurn();
        this.setCurrentView(4);
        this.render();
      }, 2000);
      return;
    } else if (battle.boardModifiers.enemyNextStun) {
      battle.boardModifiers.enemyNextStun = false;
      this.spinMessage = "ENEMY IS STUNNED! TURN SKIPPED!";
      this.render();
      setTimeout(() => {
        this.engine.resolveEnemyTurn();
        this.setCurrentView(4);
        this.render();
      }, 2000);
      return;
    }

    // Set active wheel owner to enemy so camera, physics, and board update correctly
    battle.activeWheelOwner = 'enemy';
    this.render();

    // 1. Move camera to view 5 (Cinematic opponent diagonal view)
    this.setCurrentView(5);

    // 2. Decide enemy play using AI
    const playResult = this.engine.chooseEnemyPlay();
    const enemyBetType = playResult.betType;
    const enemyBetNumber = playResult.numberValue;
    const enemyCard = playResult.card;

    // 3. Pause for 1.0 second to let the camera settle so the player sees the opponent
    setTimeout(() => {
      if (!this.engine.battleState) return;

      // 4. Play opponent card and bet animation in 3D scene (duration = 3.5s)
      if (this.renderer) {
        this.renderer.playOpponentActionAnimation(battle.enemy.intent, enemyBetType, enemyBetNumber, enemyCard || undefined);
      }

      // 5. Wait for visual animation to complete (3.5s) + extra pause (1.5s) = 5.0 seconds
      setTimeout(() => {
        if (!this.engine.battleState) return;

        // 6. Move camera to view 6 (Enemy Wheel view)
        this.setCurrentView(6);

        // 7. Wait for camera to settle (1.0 second) before spinning
        setTimeout(() => {
          if (!this.engine.battleState) return;

          // 8. Set enemy's bet in engine state
          const amount = Math.max(1, battle.enemy.intent.value);
          battle.bets = [{ type: enemyBetType as any, amount, numberValue: enemyBetNumber }];
          this.render(); // update chips stacks

          // 9. Spin wheel for the enemy
          this.triggerSpin(true); // isEnemySpin = true
        }, 1000);
      }, 5000);
    }, 1000);
  }

  private resolveEnemySpinOutcome() {
    this.engine.resolveEnemySpin();
    
    const res = this.engine.battleState?.lastSpinResult;
    if (!res) return;

    this.isSpinning = false;
    this.sound.playDamageDealt();
    if (this.engine.battleState) {
      this.engine.battleState.isResolving = true;
    }

    const colorText = res.color.toUpperCase();
    const outcomeText = `${res.number} ${colorText}`;
    
    const intent = this.engine.battleState?.enemy.intent;
    if (res.enemyWon) {
      if (intent && intent.type === 'attack') {
        if (res.playerDamageTaken > 0) {
          this.spinMessage = `ENEMY LANDED ON: ${outcomeText}! <br><span class="text-red">HIT! YOU TAKE ${res.playerDamageTaken} DAMAGE!</span>`;
        } else {
          this.spinMessage = `ENEMY LANDED ON: ${outcomeText}! <br><span class="text-green">BLOCKED! Shield absorbed the attack!</span>`;
        }
      } else if (intent && intent.type === 'steal_chips') {
        this.spinMessage = `ENEMY LANDED ON: ${outcomeText}! <br><span class="text-red">STEAL! THEY STOLE ${intent.value} CHIPS!</span>`;
      } else if (intent && intent.type === 'physics_debuff') {
        this.spinMessage = `ENEMY LANDED ON: ${outcomeText}! <br><span class="text-red">DEBUFF! WHEEL FRICTION DOUBLED!</span>`;
      } else {
        this.spinMessage = `ENEMY LANDED ON: ${outcomeText}! <br><span class="text-red">HIT! Effect triggered!</span>`;
      }
    } else {
      this.spinMessage = `ENEMY LANDED ON: ${outcomeText}. <br><span class="text-green">MISS! NO DAMAGE TAKEN.</span>`;
    }
    
    this.render();

    // Show spin report overlay screen instead of auto-timeout!
    setTimeout(() => {
      this.showSpinReport(true);
    }, 1800);
  }

  private showSpinReport(isEnemy: boolean) {
    const battle = this.engine.battleState;
    if (!battle || !battle.lastSpinResult) return;

    this.isEnemyResolutionReport = isEnemy;
    const res = battle.lastSpinResult;

    const overlay = this.root.querySelector('#resolution-overlay') as HTMLElement;
    const badge = this.root.querySelector('#res-slot-badge') as HTMLElement;
    const summary = this.root.querySelector('#res-summary-text') as HTMLElement;
    const betsList = this.root.querySelector('#res-bets-list') as HTMLElement;
    const cardsList = this.root.querySelector('#res-cards-list') as HTMLElement;
    const wheelName = this.root.querySelector('#res-wheel-name') as HTMLElement;

    if (!overlay || !badge || !summary || !betsList || !cardsList) return;

    // Set wheel name
    const activeWheel = isEnemy ? battle.enemyWheel : battle.playerWheel;
    if (wheelName) {
      wheelName.innerText = activeWheel.name.toUpperCase();
      wheelName.style.color = isEnemy ? '#ef5350' : '#ffca28';
    }

    // 1. Populate Slot badge
    badge.innerText = res.number.toString();
    badge.className = 'res-badge';
    if (res.color === 'red') badge.classList.add('red-bg');
    else if (res.color === 'black') badge.classList.add('black-bg');
    else badge.classList.add('green-bg');

    // 2. Populate Summary text
    const isPointsMode = this.engine.runState.combatMode === 'points';
    if (!isEnemy) {
      if (res.damageDealt > 0) {
        if (isPointsMode) {
          summary.innerHTML = `<span class="text-green" style="font-size: 22px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.4);">HIT! YOU SCORED ${res.damageDealt} POINTS!</span>`;
        } else {
          summary.innerHTML = `<span class="text-green" style="font-size: 22px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.4);">HIT! YOU DEALT ${res.damageDealt} DAMAGE!</span>`;
        }
      } else {
        if (isPointsMode) {
          summary.innerHTML = `<span class="text-red" style="font-size: 18px;">MISS! NO POINTS SCORED.</span>`;
        } else {
          summary.innerHTML = `<span class="text-red" style="font-size: 18px;">MISS! NO DAMAGE DEALT.</span>`;
        }
      }
    } else {
      if (res.playerDamageTaken > 0) {
        if (isPointsMode) {
          summary.innerHTML = `<span class="text-red" style="font-size: 22px; text-shadow: 0 0 10px rgba(255, 0, 0, 0.4);">HIT! OPPONENT SCORED ${res.playerDamageTaken} PTS!</span>`;
        } else {
          summary.innerHTML = `<span class="text-red" style="font-size: 22px; text-shadow: 0 0 10px rgba(255, 0, 0, 0.4);">HIT! YOU TOOK ${res.playerDamageTaken} DAMAGE!</span>`;
        }
      } else {
        const intent = battle.enemy.intent;
        if (intent.type === 'steal_chips') {
          summary.innerHTML = `<span class="text-red" style="font-size: 18px;">STEAL! OPPONENT STOLE ${intent.value} CHIPS!</span>`;
        } else if (intent.type === 'physics_debuff') {
          summary.innerHTML = `<span class="text-red" style="font-size: 18px;">DEBUFF! WHEEL FRICTION WAS DOUBLED!</span>`;
        } else {
          if (isPointsMode) {
            summary.innerHTML = `<span class="text-green" style="font-size: 18px;">MISS! NO POINTS SCORED.</span>`;
          } else {
            summary.innerHTML = `<span class="text-green" style="font-size: 18px;">MISS! NO DAMAGE TAKEN.</span>`;
          }
        }
      }
    }

    // Append slot color special effect notification if it triggered
    if (res.slotEffect) {
      summary.innerHTML += `<div class="slot-effect-banner ${res.color}" style="margin-top: 10px; font-size: 12px; font-weight: bold; border-radius: 4px; padding: 4px 10px;">${res.slotEffect}</div>`;
    }

    // 3. Populate Bets Detail list
    const evaluatedBets = res.betsEvaluated || [];
    if (evaluatedBets.length === 0) {
      betsList.innerHTML = '<span style="color: #666; font-style: italic;">No active bets evaluated</span>';
    } else {
      betsList.innerHTML = evaluatedBets.map(bet => {
        let label = bet.type.toUpperCase();
        if (bet.type === 'number') {
          label = `NUMBER ${bet.numberValue}`;
        }
        
        // Evaluate if this specific bet won
        let isWin = false;
        let mult = 0;
        if (bet.type === 'red' && res.color === 'red') { isWin = true; mult = activeWheel.payoutMultipliers.red; }
        else if (bet.type === 'black' && res.color === 'black') { isWin = true; mult = activeWheel.payoutMultipliers.black; }
        else if (bet.type === 'green') {
          const isGreenSlot = getSlotColor(res.number, activeWheel, battle.boardModifiers) === 'green';
          if (isGreenSlot) { isWin = true; mult = activeWheel.payoutMultipliers.green; }
        }
        else if (bet.type === 'number' && bet.numberValue === res.number) { isWin = true; mult = activeWheel.payoutMultipliers.number; }
        else if (bet.type === 'odd' && !activeWheel.greenNumbers.includes(res.number) && res.number % 2 !== 0) { isWin = true; mult = activeWheel.payoutMultipliers.odd; }
        else if (bet.type === 'even' && !activeWheel.greenNumbers.includes(res.number) && res.number % 2 === 0) { isWin = true; mult = activeWheel.payoutMultipliers.even; }

        if (isWin) {
          const payoutVal = bet.amount * mult;
          let targetText = '';
          if (isPointsMode) {
            targetText = !isEnemy ? `SCORED ${payoutVal} PTS` : `OPPONENT SCORED ${payoutVal} PTS`;
          } else {
            targetText = !isEnemy ? `DEALT ${payoutVal} DMG` : `TOOK ${payoutVal} DMG`;
          }
          return `
            <div class="res-details-item">
              <span>${label} (${bet.amount} ⚡)</span>
              <span class="text-green" style="font-weight: bold;">WIN! (${targetText})</span>
            </div>
          `;
        } else {
          return `
            <div class="res-details-item" style="opacity: 0.5;">
              <span>${label} (${bet.amount} ⚡)</span>
              <span class="text-red">LOSS</span>
            </div>
          `;
        }
      }).join('');
    }

    // 4. Populate Cards detail list
    const activeCards = res.cardsActive || [];
    if (activeCards.length === 0) {
      cardsList.innerHTML = '<span style="color: #666; font-style: italic;">No active cards in effect</span>';
    } else {
      cardsList.innerHTML = activeCards.map(card => {
        return `
          <div class="res-details-item">
            <span class="res-card-name">${card.name}</span>
            <span style="font-size: 10px; color: #888;">${card.type.toUpperCase()}</span>
          </div>
        `;
      }).join('');
    }

    // Show screen
    overlay.classList.remove('hidden');
  }

  // Double click 3D card wrapper trigger
  playCard(cardId: string) {
    if (!this.engine.battleState || this.engine.battleState.phase !== 'betting') return;

    const applySuccess = this.engine.playCard(cardId);
    if (applySuccess) {
      this.sound.playCardSwoosh();
      this.render();
    } else {
      // Buzz sound
      this.sound.playRouletteClick(0.3); // low frequency buzz
    }
  }

  removePlayedCard(cardId: string) {
    if (!this.engine.battleState || this.engine.battleState.phase !== 'betting') return;

    const success = this.engine.removeCard(cardId);
    if (success) {
      this.sound.playCardSwoosh();
      this.render();
    } else {
      // Buzz sound
      this.sound.playRouletteClick(0.3); // low frequency buzz
    }
  }

  private setCurrentView(viewId: number) {
    this.currentView = viewId;
    
    // Update view controller button active states
    const btns = this.root.querySelectorAll('.view-controller-hud .view-btn');
    btns.forEach(btn => {
      const vid = parseInt(btn.getAttribute('data-view') || '4');
      if (vid === viewId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (this.onViewChanged) {
      this.onViewChanged(viewId);
    }
  }

  bellTrigger() {
    if (!this.engine.battleState || this.engine.battleState.phase !== 'betting' || this.isSpinning) return;
    
    if (this.engine.battleState.bets.length > 0) {
      this.sound.playBell();
      setTimeout(() => {
        this.triggerSpin();
      }, 150); // slight delay to feel the bell strike before spinning!
    } else {
      this.sound.playRouletteClick(0.3);
    }
  }

  // --- DYNAMIC RENDERING ---

  render() {
    const state = this.engine.runState;

    // Handle encounter-specific procedural music
    if (state.gameState === 'COMBAT') {
      const type = this.engine.battleState?.encounterType || 'combat';
      if (type === 'boss') {
        this.sound.playEncounterMusic('boss');
      } else if (type === 'elite') {
        this.sound.playEncounterMusic('elite');
      } else {
        this.sound.playEncounterMusic('combat');
      }
    } else if (state.gameState === 'GAME_OVER' || state.gameState === 'MENU' || state.gameState === 'VICTORY') {
      this.sound.stopMusic();
    } else {
      // Ambient states: MAP, SHOP, EVENT, FORGE, LOADOUT_STORE
      this.sound.playEncounterMusic('ambient');
    }

    this.togglePanel('menu-panel', state.gameState === 'MENU');
    this.togglePanel('store-panel', state.gameState === 'LOADOUT_STORE' && !this.isCustomizingWheel);
    this.togglePanel('wheel-customizer-panel', state.gameState === 'LOADOUT_STORE' && this.isCustomizingWheel);
    this.togglePanel('map-panel', state.gameState === 'MAP');
    this.togglePanel('shop-panel', state.gameState === 'SHOP');
    this.togglePanel('event-panel', state.gameState === 'EVENT');
    this.togglePanel('forge-panel', state.gameState === 'FORGE');
    this.togglePanel('gameover-panel', state.gameState === 'GAME_OVER');
    this.togglePanel('victory-panel', state.gameState === 'VICTORY');
    
    // Toggle overlays
    this.togglePanel('hud-panel', state.gameState !== 'MENU' && state.gameState !== 'LOADOUT_STORE' && state.gameState !== 'GAME_OVER' && state.gameState !== 'VICTORY');
    this.togglePanel('combat-ui', state.gameState === 'COMBAT');
    
    // Update Top HUD
    if (state.gameState !== 'MENU' && state.gameState !== 'LOADOUT_STORE') {
      const hpPercent = (state.hp / state.maxHp) * 100;
      const hpBar = this.root.querySelector('#hud-hp-bar') as HTMLElement;
      const hpText = this.root.querySelector('#hud-hp-text') as HTMLElement;
      const chipsText = this.root.querySelector('#hud-chips-text') as HTMLElement;
      const floorText = this.root.querySelector('#hud-floor-text') as HTMLElement;
      
      const hpDisplay = this.root.querySelector('.hp-display') as HTMLElement;
      if (hpDisplay) {
        if (state.combatMode === 'points') {
          hpDisplay.classList.add('hidden');
        } else {
          hpDisplay.classList.remove('hidden');
        }
      }

      if (hpBar) hpBar.style.width = `${hpPercent}%`;
      if (hpText) hpText.innerText = `${state.hp} / ${state.maxHp}`;
      if (chipsText) chipsText.innerText = `${state.chips} ⚡`;
      if (floorText) floorText.innerText = `${state.currentFloor + 1} / 7`;
    }

    // Handle Store / Customizer Panel Rendering
    if (state.gameState === 'LOADOUT_STORE') {
      if (this.isCustomizingWheel) {
        this.renderWheelCustomizer();
      } else {
        this.renderLoadoutStore();
      }
    }

    // Handle Map Panel Rendering
    if (state.gameState === 'MAP') {
      this.renderMap();
    }

    // Handle Shop Panel Rendering
    if (state.gameState === 'SHOP') {
      this.renderShop();
    }

    // Handle Event Panel Rendering
    if (state.gameState === 'EVENT') {
      this.renderEvent();
    }

    // Handle Forge Panel Rendering
    if (state.gameState === 'FORGE') {
      this.renderForge();
    }

    // Handle Combat UI Rendering
    if (state.gameState === 'COMBAT' && this.engine.battleState) {
      this.renderCombat();
    }

    // Update Dev Tools Panel states dynamically
    const devToolsPanel = this.root.querySelector('#dev-tools-panel') as HTMLElement;
    if (devToolsPanel) {
      const isCombat = state.gameState === 'COMBAT';
      const combatSelectors = '.dev-group:first-of-type button, .dev-group:first-of-type select';
      const combatElements = devToolsPanel.querySelectorAll(combatSelectors) as NodeListOf<HTMLButtonElement | HTMLSelectElement>;
      combatElements.forEach(el => {
        el.disabled = !isCombat;
      });
      const devCombatModeSelect = devToolsPanel.querySelector('#dev-combat-mode-select') as HTMLSelectElement;
      if (devCombatModeSelect) {
        devCombatModeSelect.value = state.combatMode || 'points';
      }
    }
  }

  private togglePanel(id: string, show: boolean) {
    const el = this.root.querySelector(`#${id}`);
    if (el) {
      if (show) {
        el.classList.remove('hidden');
        el.classList.add('active');
      } else {
        el.classList.remove('active');
        el.classList.add('hidden');
      }
    }
  }

  // Procedural SVG-based Map Drawing
  private renderMap() {
    const container = this.root.querySelector('#map-scroll-container')!;
    const state = this.engine.runState;
    const map = state.mapNodes;
    
    // Slay the spire style canvas rendering
    let html = `<div class="map-grid-view">`;
    
    // Let's create SVG connections lines
    html += `<svg class="map-connections-svg">`;
    
    // Gather all node locations in SVG coordinate space
    const nodeCoords: Record<string, { x: number; y: number }> = {};
    const colWidth = 140;
    const rowHeight = 90;
    const offsetLeft = 40;
    
    map.forEach((floorNodes, floorIdx) => {
      const cy = (map.length - 1 - floorIdx) * rowHeight + 50; // top floor first
      floorNodes.forEach(node => {
        const cx = node.lane * colWidth + offsetLeft + 60;
        nodeCoords[node.id] = { x: cx, y: cy };
      });
    });

    // Draw lines
    map.forEach(floorNodes => {
      floorNodes.forEach(node => {
        const fromCoord = nodeCoords[node.id];
        node.connections.forEach(connId => {
          const toCoord = nodeCoords[connId];
          if (toCoord && fromCoord) {
            // Draw curved bezier line representing connection path
            const activeLine = node.completed ? 'completed-line' : '';
            html += `<path d="M ${fromCoord.x} ${fromCoord.y} C ${fromCoord.x} ${fromCoord.y - 40}, ${toCoord.x} ${toCoord.y + 40}, ${toCoord.x} ${toCoord.y}" class="map-path ${activeLine}" />`;
          }
        });
      });
    });
    
    html += `</svg>`;

    // Render nodes
    map.forEach((floorNodes, floorIdx) => {
      const isSelectableFloor = floorIdx === state.currentFloor;
      
      floorNodes.forEach(node => {
        const coord = nodeCoords[node.id];
        let statusClass = 'locked';
        
        if (node.completed) {
          statusClass = 'completed';
        } else if (isSelectableFloor) {
          // If first floor, it's open. Otherwise must connect from current completed node
          if (state.currentNodeId === null) {
            statusClass = 'selectable';
          } else {
            // Check if current node connects to this
            const currentFloorNodes = map[state.currentFloor - 1] || [];
            const prevNode = currentFloorNodes.find(n => n.id === state.currentNodeId);
            if (prevNode && prevNode.connections.includes(node.id)) {
              statusClass = 'selectable';
            }
          }
        }

        // Icon types
        const icons: Record<string, string> = {
          combat: '💀',
          elite: '👹',
          shop: '⚡',
          event: '❓',
          boss: '👑',
          forge: '🔥'
        };

        html += `
          <button 
            class="map-node ${statusClass} node-type-${node.type}" 
            style="left: ${coord.x - 22}px; top: ${coord.y - 22}px"
            data-id="${node.id}"
            ${statusClass !== 'selectable' ? 'disabled' : ''}
          >
            <span class="node-icon">${icons[node.type]}</span>
            <span class="node-tooltip">${node.type.toUpperCase()}</span>
          </button>
        `;
      });
    });

    html += `</div>`;
    container.innerHTML = html;

    // Bind map clicking
    const nodeBtns = container.querySelectorAll('.map-node.selectable');
    nodeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const nodeId = btn.getAttribute('data-id')!;
        this.sound.playDraw();
        this.engine.selectNode(nodeId);
        this.render();
      });
    });
  }

  public setHoveredForgeCard(cardId: string | null) {
    this.hoveredForgeCardId = cardId;
    this.updateForgeDescriptionBox();
  }

  private updateForgeDescriptionBox() {
    const box = this.root.querySelector('#forge-card-desc-box');
    if (!box) return;

    if (!this.hoveredForgeCardId) {
      box.className = 'forge-card-desc-box';
      box.innerHTML = `
        <div class="forge-desc-title" style="color: #888;">INSPECT OFFERS</div>
        <div class="forge-desc-text" style="color: rgba(255,255,255,0.4);">
          Hover your cursor over a 3D Forge Card to inspect its details...
        </div>
      `;
      return;
    }

    const state = this.engine.runState;
    const card = (state.forgeCards || []).find(c => c.id === this.hoveredForgeCardId);
    if (!card) {
      box.className = 'forge-card-desc-box';
      box.innerHTML = `
        <div class="forge-desc-title" style="color: #888;">INSPECT OFFERS</div>
        <div class="forge-desc-text" style="color: rgba(255,255,255,0.4);">
          Hover your cursor over a 3D Forge Card to inspect its details...
        </div>
      `;
      return;
    }

    box.className = `forge-card-desc-box has-hover`;
    
    let statusText = '';
    if (card.purchased) {
      statusText = `<div class="forge-desc-status" style="color: #ffca28; font-weight: bold; text-shadow: 0 0 6px rgba(255, 202, 40, 0.4);">OWNED / INSTALLED</div>`;
    } else if (state.chips < card.cost) {
      statusText = `<div class="forge-desc-status" style="color: #ff3333; font-weight: bold;">TOO EXPENSIVE (Costs ${card.cost} ⚡)</div>`;
    } else {
      statusText = `<div class="forge-desc-status" style="color: #00ff66; font-weight: bold; text-shadow: 0 0 6px rgba(0, 255, 100, 0.4);">CLICK TO PURCHASE FOR ${card.cost} ⚡</div>`;
    }

    const isPoints = state.combatMode === 'points';

    box.innerHTML = `
      <div class="forge-desc-title rarity-${card.rarity}">${card.name}</div>
      <div class="forge-desc-text">${formatDescription(card.description, isPoints)}</div>
      ${statusText}
    `;
  }

  private renderForge() {
    const container = this.root.querySelector('#forge-panel') as HTMLElement;
    if (!container) return;

    const state = this.engine.runState;
    const wheel = state.playerWheel;
    if (!wheel) return;

    const pm = wheel.payoutMultipliers;

    container.innerHTML = `
      <div class="forge-hud">
        <div class="forge-title-panel">
          <h1>THE BLACKSMITH'S FORGE</h1>
          <p class="flavor-text">Purchase upgrades to shape your wheel layout and bet payouts. Rerolling generates new offers.</p>
        </div>

        <div class="forge-stats-panel">
          <div>CHIPS: <span class="forge-stats-chips">${state.chips} ⚡</span></div>
          <div class="forge-stats-multipliers">
            SLOTS: <span style="color:#fff;">${wheel.numbers.length}</span> | 
            RED: <span style="color:#ef5350;">${pm.red}x</span> | 
            BLACK: <span style="color:#aaaaaa;">${pm.black}x</span> | 
            GREEN: <span style="color:#4caf50;">${pm.green}x</span> | 
            SINGLE #: <span style="color:#ffd54f;">${pm.number}x</span> | 
            ODD: <span style="color:#ffd54f;">${pm.odd}x</span> | 
            EVEN: <span style="color:#0288d1;">${pm.even}x</span>
          </div>
        </div>

        <div class="forge-bottom-hud">
          <div id="forge-card-desc-box" class="forge-card-desc-box">
            <!-- Updated dynamically on hover -->
          </div>

          <div class="forge-action-buttons">
            <button id="forge-reroll-btn" class="forge-btn" ${state.chips < 5 ? 'disabled' : ''}>
              Reroll Offers (5 ⚡)
            </button>
            <button id="forge-leave-btn" class="forge-btn leave-btn">
              Return to Paths
            </button>
          </div>
        </div>
      </div>
    `;

    // Populate initial description box state
    this.updateForgeDescriptionBox();

    // Bind Reroll Click
    const rerollBtn = container.querySelector('#forge-reroll-btn');
    if (rerollBtn) {
      rerollBtn.addEventListener('click', () => {
        if (state.chips < 5) return;
        this.sound.playDraw();
        this.engine.rerollForge();
        if (this.renderer) {
          this.renderer.hoveredForgeCardId = null;
          this.hoveredForgeCardId = null;
          this.renderer.syncForgeCards();
        }
        this.render();
      });
    }

    // Bind Leave Click
    const leaveBtn = container.querySelector('#forge-leave-btn');
    if (leaveBtn) {
      leaveBtn.addEventListener('click', () => {
        this.sound.playCardSwoosh();
        state.gameState = 'MAP';
        this.render();
      });
    }
  }

  // Shop Generator
  private renderShop() {
    // 1. Sync Tab Buttons & Panel Views
    const tabCards = this.root.querySelector('#shop-tab-cards') as HTMLElement;
    const tabUpgrades = this.root.querySelector('#shop-tab-upgrades') as HTMLElement;
    const viewCards = this.root.querySelector('#shop-cards-view') as HTMLElement;
    const viewUpgrades = this.root.querySelector('#shop-upgrades-view') as HTMLElement;

    if (tabCards && tabUpgrades && viewCards && viewUpgrades) {
      if (this.activeShopTab === 'cards') {
        tabCards.classList.add('active');
        tabUpgrades.classList.remove('active');
        viewCards.classList.remove('hidden');
        viewUpgrades.classList.add('hidden');
      } else {
        tabUpgrades.classList.add('active');
        tabCards.classList.remove('active');
        viewUpgrades.classList.remove('hidden');
        viewCards.classList.add('hidden');
      }
    }

    // 2. Delegate Rendering
    if (this.activeShopTab === 'cards') {
      this.renderShopCards();
    } else {
      this.renderShopUpgrades();
    }

    // 3. Update selection details description box
    this.updateShopDescriptionBox();
  }

  private renderShopCards() {
    const container = this.root.querySelector('#shop-items-container')!;
    const state = this.engine.runState;

    // Populate random cards if empty for this shop visit
    if (this.shopCards.length === 0) {
      // Select 3 random cards to sell
      for (let i = 0; i < 3; i++) {
        const key = getRandomCardId();
        const cardDef = CARD_DATABASE[key];
        let cost = 12 + Math.floor(Math.random() * 8);
        if (cardDef.rarity === 'common') {
          cost = 8 + Math.floor(Math.random() * 6); // 8-13 chips
        } else if (cardDef.rarity === 'uncommon') {
          cost = 14 + Math.floor(Math.random() * 8); // 14-21 chips
        } else if (cardDef.rarity === 'rare') {
          cost = 25 + Math.floor(Math.random() * 11); // 25-35 chips
        } else if (cardDef.rarity === 'legendary') {
          cost = 45 + Math.floor(Math.random() * 16); // 45-60 chips
        }
        this.shopCards.push({
          cardId: key,
          name: cardDef.name,
          cost,
          desc: cardDef.description,
          rarity: cardDef.rarity,
          type: cardDef.type
        });
      }
    }

    let html = '';

    const isPoints = state.combatMode === 'points';

    // Render Cards in Shop
    this.shopCards.forEach((item, index) => {
      const canAfford = state.chips >= item.cost;
      const rarityClass = `shop-card-rarity-${item.rarity}`;
      html += `
        <div class="shop-card-item glass-panel ${rarityClass}">
          <div class="shop-card-meta">${item.type} · ${item.rarity}</div>
          <div class="card-title">${item.name}</div>
          <div class="card-desc">${formatDescription(item.desc, isPoints)}</div>
          <button class="btn primary-btn buy-btn" data-idx="${index}" ${!canAfford ? 'disabled' : ''}>
            BUY: ${item.cost} ⚡
          </button>
        </div>
      `;
    });

    // Render Healing Options
    const healCost = 12;
    const canAffordHeal = state.chips >= healCost && state.hp < state.maxHp;
    html += `
      <div class="shop-card-item glass-panel shop-heal-item">
        <div class="card-title">Blood Infusion</div>
        <div class="card-desc">${formatDescription('Transfuse essence back into your veins. Heals 25 HP.', isPoints)}</div>
        <button id="buy-heal-btn" class="btn primary-btn buy-btn" ${!canAffordHeal ? 'disabled' : ''}>
          HEAL: ${healCost} ⚡
        </button>
      </div>
    `;

    container.innerHTML = html;

    // Bind buy events
    const buyBtns = container.querySelectorAll('.buy-btn[data-idx]');
    buyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx')!);
        const item = this.shopCards[idx];
        if (this.engine.buyCardInShop(item.cardId, item.cost)) {
          this.sound.playDraw();
          // Remove purchased card from shelf
          this.shopCards.splice(idx, 1);
          this.render();
        }
      });
    });

    const buyHealBtn = container.querySelector('#buy-heal-btn');
    buyHealBtn?.addEventListener('click', () => {
      if (this.engine.healInShop(25, healCost)) {
        this.sound.playDraw();
        this.render();
      }
    });

    // Hide HTML items view container to rely on 3D view
    container.classList.add('hidden');
    if (this.renderer) {
      this.renderer.syncShopItems();
    }
  }

  private renderShopUpgrades() {
    const container = this.root.querySelector('#shop-upgrades-container')!;
    if (!container) return;

    const state = this.engine.runState;
    const playerWheel = state.playerWheel;
    
    let html = '';
    
    const isPoints = state.combatMode === 'points';
    
    Object.keys(BOARD_UPGRADES).forEach(key => {
      const upgrade = BOARD_UPGRADES[key];
      const isOwned = playerWheel.upgrades.includes(key);
      const canAfford = state.chips >= upgrade.cost;
      
      html += `
        <div class="shop-card-item glass-panel">
          <div class="card-title">${upgrade.name}</div>
          <div class="card-desc">${formatDescription(upgrade.description, isPoints)}</div>
          ${isOwned ? `
            <span class="upgrade-badge">PURCHASED</span>
            <button class="btn primary-btn buy-upgrade-btn" style="opacity: 0.5;" disabled>
              OWNED
            </button>
          ` : `
            <button class="btn primary-btn buy-upgrade-btn animate-btn" data-id="${key}" ${!canAfford ? 'disabled' : ''}>
              BUY: ${upgrade.cost} ⚡
            </button>
          `}
        </div>
      `;
    });
    
    container.innerHTML = html;
    
    // Bind click events
    const buyBtns = container.querySelectorAll('.buy-upgrade-btn[data-id]');
    buyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id')!;
        if (this.engine.buyBoardUpgrade(id)) {
          this.sound.playDraw();
          this.render();
        }
      });
    });

    // Hide HTML upgrades view container to rely on 3D view
    container.classList.add('hidden');
    if (this.renderer) {
      this.renderer.syncShopItems();
    }
  }

  private renderLoadoutStore() {
    const container = this.root.querySelector('#store-panel') as HTMLElement;
    if (!container) return;

    const state = this.engine.runState;
    const storePoints = state.storePoints ?? 10;
    const storeItems = state.storeItems ?? [];

    // Separate cards and wheels
    const cardsForSale = storeItems.filter(item => item.type === 'card');
    const wheelsForSale = storeItems.filter(item => item.type === 'wheel');

    // Build Current Loadout Display
    const deckCount = state.deck.length;
    const currentWheelName = state.playerWheel.name;
    const currentWheelRarity = state.playerWheel.rarity || 'common';

    // Deck Preview HTML
    const deckListHtml = state.deck.map(c => `
      <span class="store-loadout-chip rarity-${c.rarity}">${c.name}</span>
    `).join('');

    const isPoints = state.combatMode === 'points';

    let cardsHtml = '';
    cardsForSale.forEach(item => {
      const isPurchased = item.purchased;
      const isTooExpensive = storePoints < item.pointsCost;
      const cardClass = `store-item rarity-${item.rarity} ${isPurchased ? 'purchased' : ''} ${isTooExpensive && !isPurchased ? 'too-expensive' : ''}`;
      
      cardsHtml += `
        <div class="${cardClass}" data-id="${item.id}">
          <div class="store-item-header">
            <span class="store-item-name">${item.name}</span>
            <span class="store-item-cost">${item.pointsCost} PTS</span>
          </div>
          <div class="store-item-desc">${formatDescription(item.description, isPoints)}</div>
          <div class="store-item-rarity ${item.rarity}">${item.rarity}</div>
          ${isPurchased ? '<div class="purchased-badge">OWNED</div>' : ''}
        </div>
      `;
    });

    let wheelsHtml = '';
    wheelsForSale.forEach(item => {
      const isPurchased = item.purchased;
      const isTooExpensive = storePoints < item.pointsCost;
      const wheelClass = `store-item rarity-${item.rarity} ${isPurchased ? 'purchased' : ''} ${isTooExpensive && !isPurchased ? 'too-expensive' : ''}`;
      
      // Get the wheel config to show stats
      const allWheels = getAllWheels();
      const wheelConfig = allWheels.find(w => w.id === item.itemId);
      let statsHtml = '';
      if (wheelConfig) {
        const slots = wheelConfig.numbers.length;
        const greens = wheelConfig.greenNumbers.length;
        statsHtml = `
          <div class="store-wheel-stats">
            <span class="store-wheel-stat">${slots} slots</span>
            <span class="store-wheel-stat">${greens} green</span>
            <span class="store-wheel-stat">${wheelConfig.payoutMultipliers.red}x R / ${wheelConfig.payoutMultipliers.black}x B</span>
          </div>
        `;
      }

      wheelsHtml += `
        <div class="${wheelClass}" data-id="${item.id}">
          <div class="store-item-header">
            <span class="store-item-name">${item.name}</span>
            <span class="store-item-cost">${item.pointsCost} PTS</span>
          </div>
          <div class="store-item-desc">${formatDescription(item.description, isPoints)}</div>
          ${statsHtml}
          <div class="store-item-rarity ${item.rarity}">${item.rarity}</div>
          ${isPurchased ? '<div class="purchased-badge">ACTIVE</div>' : ''}
        </div>
      `;
    });

    container.innerHTML = `
      <div class="store-container">
        <div class="store-header">
          <h1>ROULETTE.OS Drafting Store</h1>
          <p class="flavor-text">Prepare your loadout. Choose your weapons and bind your wheel.</p>
          <div class="store-points-bar">
            <span>AVAILABLE POINTS:</span>
            <span class="store-points-value">${storePoints}</span>
          </div>
        </div>

        <div class="store-sections">
          <div class="store-section">
            <h2>CARDS FOR SALE</h2>
            <div class="store-grid">
              ${cardsHtml}
            </div>
          </div>
          <div class="store-section">
            <h2>WHEELS FOR SALE</h2>
            <div class="store-grid">
              ${wheelsHtml}
            </div>
          </div>
        </div>

        <div class="store-loadout">
          <h3>CURRENT LOADOUT</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span class="store-loadout-chip wheel-chip rarity-${currentWheelRarity}" style="font-size: 1.1rem; padding: 6px 12px;">
                WHEEL: ${currentWheelName} (${currentWheelRarity})
              </span>
              <button id="store-customize-wheel-btn" class="btn secondary-btn" style="padding: 4px 12px; font-size: 0.9rem;">
                ⚙ CUSTOMIZE WHEEL
              </button>
            </div>
            <div>
              <span style="font-family: 'VT323', monospace; font-size: 0.95rem; color: #aaa; margin-right: 6px;">DECK (${deckCount} cards):</span>
              <div class="store-loadout-items" style="display: inline-flex; vertical-align: middle;">
                ${deckListHtml}
              </div>
            </div>
          </div>
        </div>

        <button id="store-continue-btn" class="store-continue-btn">
          CONTINUE TO MAP
        </button>
      </div>
    `;

    // Bind click events on items
    const storeItemEls = container.querySelectorAll('.store-item');
    storeItemEls.forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id')!;
        this.sound.playDraw();
        const success = this.engine.purchaseStoreItem(id);
        if (success) {
          this.render();
        } else {
          this.sound.playRouletteClick(0.3); // invalid
        }
      });
    });

    // Bind customize button
    const customizeBtn = container.querySelector('#store-customize-wheel-btn');
    if (customizeBtn) {
      customizeBtn.addEventListener('click', () => {
        this.sound.playCardSwoosh();
        // Clone player's current wheel into customWheelData
        this.customWheelData = JSON.parse(JSON.stringify(state.playerWheel));
        this.isCustomizingWheel = true;
        this.render();
      });
    }

    // Bind continue button
    const continueBtn = container.querySelector('#store-continue-btn')!;
    continueBtn.addEventListener('click', () => {
      this.sound.playCardSwoosh();
      this.engine.completeStore();
      this.render();
    });
  }

  private renderWheelCustomizer() {
    const gridContainer = this.root.querySelector('#cust-numbers-grid');
    if (!gridContainer) return;

    let html = '';
    const reds = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
    
    for (let i = 0; i <= 36; i++) {
      const isActive = this.customWheelData.numbers.includes(i);
      const color = this.customWheelData.colors[i] || (i === 0 ? 'green' : (reds.has(i) ? 'red' : 'black'));
      
      html += `
        <div class="cell-option ${isActive ? 'active' : ''}" data-num="${i}">
          <span class="cell-num">${i}</span>
          ${isActive ? `<span class="cell-color-indicator ${color}" data-num="${i}"></span>` : ''}
        </div>
      `;
    }
    
    gridContainer.innerHTML = html;

    // Bind click events on the cell option
    const cells = gridContainer.querySelectorAll('.cell-option');
    cells.forEach(cell => {
      cell.addEventListener('click', (e) => {
        const num = parseInt(cell.getAttribute('data-num')!);
        const target = e.target as HTMLElement;
        
        // Check if color indicator dot was clicked to cycle color
        if (target.classList.contains('cell-color-indicator')) {
          e.stopPropagation();
          const currColor = this.customWheelData.colors[num] || 'black';
          let nextColor: SlotColor = 'red';
          
          if (currColor === 'green') {
            nextColor = 'red';
            this.customWheelData.greenNumbers = this.customWheelData.greenNumbers.filter(n => n !== num);
          } else if (currColor === 'red') {
            nextColor = 'black';
            this.customWheelData.greenNumbers = this.customWheelData.greenNumbers.filter(n => n !== num);
          } else if (currColor === 'black') {
            nextColor = 'gold';
            this.customWheelData.greenNumbers = this.customWheelData.greenNumbers.filter(n => n !== num);
          } else if (currColor === 'gold') {
            nextColor = 'purple';
            if (!this.customWheelData.greenNumbers.includes(num)) {
              this.customWheelData.greenNumbers.push(num);
            }
          } else if (currColor === 'purple') {
            nextColor = 'cyan';
            this.customWheelData.greenNumbers = this.customWheelData.greenNumbers.filter(n => n !== num);
          } else if (currColor === 'cyan') {
            nextColor = 'crimson';
            this.customWheelData.greenNumbers = this.customWheelData.greenNumbers.filter(n => n !== num);
          } else {
            nextColor = 'green';
            if (!this.customWheelData.greenNumbers.includes(num)) {
              this.customWheelData.greenNumbers.push(num);
            }
          }
          
          this.customWheelData.colors[num] = nextColor;
          this.sound.playRouletteClick(0.5);
          this.renderWheelCustomizer();
          return;
        }

        // Toggle cell selection
        const idx = this.customWheelData.numbers.indexOf(num);
        if (idx >= 0) {
          if (this.customWheelData.numbers.length <= 1) {
            // Must have at least 1 slot
            this.sound.playRouletteClick(0.3);
            return;
          }
          this.customWheelData.numbers.splice(idx, 1);
          this.customWheelData.greenNumbers = this.customWheelData.greenNumbers.filter(n => n !== num);
        } else {
          this.customWheelData.numbers.push(num);
          // Set default color
          if (num === 0) {
            this.customWheelData.colors[num] = 'green';
            if (!this.customWheelData.greenNumbers.includes(num)) this.customWheelData.greenNumbers.push(num);
          } else {
            this.customWheelData.colors[num] = reds.has(num) ? 'red' : 'black';
          }
        }
        
        this.sound.playDraw();
        this.renderWheelCustomizer();
      });
    });

    // Bind Quick Templates buttons
    const templateBtns = this.root.querySelectorAll('.quick-templates .template-btn');
    templateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const template = btn.getAttribute('data-template')!;
        this.sound.playCardSwoosh();
        
        if (template === 'mini') {
          this.customWheelData.numbers = [0, 9, 2, 7, 4, 5, 12, 1, 10, 3, 8, 11, 6];
          this.customWheelData.greenNumbers = [0];
          this.initCustomColors();
        } else if (template === 'even') {
          this.customWheelData.numbers = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
          this.customWheelData.greenNumbers = [0];
          this.initCustomColors();
        } else if (template === 'reds') {
          this.customWheelData.numbers = [0, 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
          this.customWheelData.greenNumbers = [0];
          this.customWheelData.colors = {};
          this.customWheelData.numbers.forEach(n => {
            this.customWheelData.colors[n] = n === 0 ? 'green' : 'red';
          });
        } else if (template === 'classic') {
          this.customWheelData.numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
          this.customWheelData.greenNumbers = [0];
          this.initCustomColors();
        }
        
        this.renderWheelCustomizer();
      });
    });

    // Bind Cancel Button
    const cancelBtn = this.root.querySelector('#cust-cancel-btn');
    cancelBtn?.replaceWith(cancelBtn.cloneNode(true)); // remove old listeners
    const freshCancelBtn = this.root.querySelector('#cust-cancel-btn')!;
    freshCancelBtn.addEventListener('click', () => {
      this.sound.playCardSwoosh();
      this.isCustomizingWheel = false;
      this.render();
    });

    // Bind Start Button
    const startBtn = this.root.querySelector('#cust-start-btn');
    startBtn?.replaceWith(startBtn.cloneNode(true));
    const freshStartBtn = this.root.querySelector('#cust-start-btn')!;
    freshStartBtn.addEventListener('click', () => {
      if (this.customWheelData.numbers.length === 0) {
        alert("The wheel must contain at least 1 slot.");
        return;
      }
      
      const nameInput = this.root.querySelector('#cust-wheel-name') as HTMLInputElement;
      const descInput = this.root.querySelector('#cust-wheel-desc') as HTMLInputElement;
      this.customWheelData.name = nameInput.value || 'Custom Destroyer';
      this.customWheelData.description = descInput.value || 'A bespoke engine of risk and blood.';

      // Parse payouts
      this.customWheelData.payoutMultipliers.red = parseFloat((this.root.querySelector('#cust-payout-red') as HTMLInputElement).value) || 2.0;
      this.customWheelData.payoutMultipliers.black = parseFloat((this.root.querySelector('#cust-payout-black') as HTMLInputElement).value) || 2.0;
      this.customWheelData.payoutMultipliers.green = parseFloat((this.root.querySelector('#cust-payout-green') as HTMLInputElement).value) || 10.0;
      this.customWheelData.payoutMultipliers.number = parseFloat((this.root.querySelector('#cust-payout-number') as HTMLInputElement).value) || 12.0;
      this.customWheelData.payoutMultipliers.odd = parseFloat((this.root.querySelector('#cust-payout-odd') as HTMLInputElement).value) || 2.0;
      this.customWheelData.payoutMultipliers.even = parseFloat((this.root.querySelector('#cust-payout-even') as HTMLInputElement).value) || 2.0;

      const reds = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
      this.customWheelData.numbers.forEach(n => {
        if (!this.customWheelData.colors[n]) {
          this.customWheelData.colors[n] = this.customWheelData.greenNumbers.includes(n) ? 'green' : (reds.has(n) ? 'red' : 'black');
        }
      });

      this.sound.playBell();
      this.isCustomizingWheel = false;
      this.engine.runState.playerWheel = JSON.parse(JSON.stringify(this.customWheelData));
      this.engine.runState.playerWheel.id = 'custom';
      this.engine.runState.selectedWheelId = 'custom';
      this.render();
    });
  }

  private renderEvent() {
    const titleEl = this.root.querySelector('#event-title')!;
    const textEl = this.root.querySelector('#event-text')!;
    const choicesContainer = this.root.querySelector('#event-options')!;
    const state = this.engine.runState;

    titleEl.innerHTML = "THE HOODED SPECTRE";
    textEl.innerHTML = `
      An old croupier with glowing red stitching across their eyes block your path. 
      They extend a decaying, shaking palm holding a dark magnet and a rusty syringe.
      <br><br>
      "A tribute to the wheel... or a transfusion to live. Your choice, mortal..."
    `;

    choicesContainer.innerHTML = `
      <button class="event-choice-btn" data-choice="1">
        <span class="choice-tag">[Inject Syringe]</span> Lose 8 Blood, gain 25 Essence chips.
      </button>
      <button class="event-choice-btn" data-choice="2">
        <span class="choice-tag">[Accept Magnet]</span> Add Lodestone Magnet card to your deck.
      </button>
      <button class="event-choice-btn" data-choice="3">
        <span class="choice-tag">[Decline & Pass]</span> Push past them. Gain nothing, lose nothing.
      </button>
    `;

    const choiceBtns = choicesContainer.querySelectorAll('.event-choice-btn');
    choiceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.getAttribute('data-choice')!;
        this.makeEventChoice(choice);
      });
    });

    // Hide HTML choices list to rely on 3D tablets
    choicesContainer.classList.add('hidden');
    if (this.renderer) {
      this.renderer.syncEventChoices();
    }

    // Update selection details description box
    this.updateEventDescriptionBox();
  }

  // Combat State Panel Generator
  private renderCombat() {
    const battle = this.engine.battleState;
    if (!battle) return;

    // Update Enemy details (Scoreboard or HP bar)
    const isPointsMode = this.engine.runState.combatMode === 'points';
    const enemyHud = this.root.querySelector('.enemy-hud') as HTMLElement;
    if (enemyHud) {
      if (isPointsMode) {
        enemyHud.innerHTML = `
          <div class="scoreboard-container">
            <div class="scoreboard-header">
              <h3 id="enemy-name" class="enemy-title" style="margin: 0; font-size: 15px;">${battle.enemy.name}</h3>
              <div class="enemy-intent" style="margin-top: 2px;">
                <span class="intent-label" style="font-size: 8px;">INTENT:</span>
                <span id="enemy-intent-text" class="intent-desc" style="font-size: 11px;">${battle.enemy.intent.description}</span>
              </div>
            </div>
            <div class="scoreboard-rounds">
              <span class="rounds-label">ROUND</span>
              <span class="rounds-value">${battle.turn} / ${battle.maxRounds || 6}</span>
              ${battle.isSuddenDeath ? '<div class="sudden-death-glow pulse-fast">SUDDEN DEATH</div>' : ''}
            </div>
            <div class="scoreboard-scores">
              <div class="score-box player-score-box">
                <span class="score-label">PLAYER</span>
                <span class="score-value">${battle.playerScore || 0}</span>
              </div>
              <div class="score-box vs-box">VS</div>
              <div class="score-box enemy-score-box">
                <span class="score-label">ENEMY</span>
                <span class="score-value">${battle.enemyScore || 0}</span>
              </div>
            </div>
          </div>
        `;
      } else {
        enemyHud.innerHTML = `
          <h3 id="enemy-name" class="enemy-title">${battle.enemy.name}</h3>
          <div class="bar-container enemy-hp-container">
            <div id="enemy-hp-bar" class="bar hp-bar" style="width: ${(battle.enemy.hp / battle.enemy.maxHp) * 100}%"></div>
            <span id="enemy-hp-text" class="bar-text">${battle.enemy.hp} / ${battle.enemy.maxHp}</span>
          </div>
          <div class="enemy-intent">
            <span class="intent-label">INTENT:</span>
            <span id="enemy-intent-text" class="intent-desc">${battle.enemy.intent.description}</span>
          </div>
        `;
      }
    }

    // Update chips display
    const turnChipsVal = this.root.querySelector('#turn-chips-value') as HTMLElement;
    if (turnChipsVal) turnChipsVal.innerText = `${battle.chipsPool} ⚡`;

    // Update deck counters
    const drawPileCount = this.root.querySelector('#draw-pile-count') as HTMLElement;
    const discardPileCount = this.root.querySelector('#discard-pile-count') as HTMLElement;
    const handCount = this.root.querySelector('#hand-count') as HTMLElement;
    if (drawPileCount) drawPileCount.innerText = `${battle.drawPile.length}`;
    if (discardPileCount) discardPileCount.innerText = `${battle.discardPile.length}`;
    if (handCount) handCount.innerText = `${battle.hand.length}`;

    // Update Draw Card button availability and text
    const drawCardBtn = this.root.querySelector('#draw-card-btn') as HTMLButtonElement;
    if (drawCardBtn) {
      const cost = this.engine.getDrawCardCost();
      const costText = cost === 0 ? "FREE" : `${cost} ⚡`;
      drawCardBtn.innerText = `DRAW CARD (${costText})`;
      
      const canDraw = battle.chipsPool >= cost && 
                      battle.phase === 'betting' && 
                      !this.isSpinning && 
                      (battle.drawPile.length > 0 || battle.discardPile.length > 0) && 
                      battle.hand.length < 8;
      drawCardBtn.disabled = !canDraw;
    }

    // Update block shield indicator on player HP bar
    const hpBarContainer = this.root.querySelector('.hp-display .bar-container') as HTMLElement;
    if (hpBarContainer) {
      // Remove existing block indicator
      const existingBlock = hpBarContainer.querySelector('.block-indicator');
      if (existingBlock) existingBlock.remove();
      
      if (battle.playerBlock > 0) {
        const blockEl = document.createElement('div');
        blockEl.className = 'block-indicator';
        blockEl.innerText = `🛡 ${battle.playerBlock}`;
        hpBarContainer.style.position = 'relative';
        hpBarContainer.appendChild(blockEl);
      }
    }

    // Re-render HTML betting board number grid dynamically based on player wheel configuration
    const numGridContainer = this.root.querySelector('.number-grid-container') as HTMLElement;
    if (numGridContainer && battle.playerWheel) {
      const activeWheel = battle.playerWheel;
      const greenNums = activeWheel.greenNumbers;
      const otherNums = activeWheel.numbers.filter(n => !greenNums.includes(n)).sort((a, b) => a - b);
      
      const predictionSector = battle.predictionSector || [];
      
      let gridHtml = '';
      // Render green numbers
      greenNums.forEach(num => {
        const isPredicted = predictionSector.includes(num) ? ' predicted' : '';
        gridHtml += `<div class="num-cell num-green${isPredicted}" data-num="${num}">${num}</div>`;
      });
      // Render standard numbers
      otherNums.forEach(num => {
        const color = getSlotColor(num, activeWheel, battle.boardModifiers);
        const isPredicted = predictionSector.includes(num) ? ' predicted' : '';
        gridHtml += `<div class="num-cell num-${color}${isPredicted}" data-num="${num}">${num}</div>`;
      });
      
      numGridContainer.innerHTML = gridHtml;
      
      // Bind click and hover listeners for dynamic number cells
      const numCells = numGridContainer.querySelectorAll('.num-cell');
      numCells.forEach(cell => {
        const num = parseInt(cell.getAttribute('data-num')!);
        const color = getSlotColor(num, activeWheel, battle.boardModifiers);

        // Set title for native tooltips
        const singlePayout = activeWheel.payoutMultipliers.number;
        const colorPayout = color === 'gold' ? (activeWheel.payoutMultipliers.gold || 4) :
                             color === 'purple' ? (activeWheel.payoutMultipliers.purple || 4) :
                             color === 'cyan' ? (activeWheel.payoutMultipliers.cyan || 4) :
                             color === 'crimson' ? (activeWheel.payoutMultipliers.crimson || 6) :
                             color === 'green' ? activeWheel.payoutMultipliers.green :
                             color === 'red' ? activeWheel.payoutMultipliers.red :
                             activeWheel.payoutMultipliers.black;
        cell.setAttribute('title', `Slot ${num}\nSingle Bet Payout: ${singlePayout}x\nColor Payout: ${colorPayout}x`);

        cell.addEventListener('click', () => {
          this.placeEngineBet('number', this.currentBetAmount, num);
        });

        // Interactive hover information panel update
        cell.addEventListener('mouseenter', () => {
          const hoverInfo = this.root.querySelector('#board-hover-info') as HTMLElement;
          if (hoverInfo) {
            hoverInfo.innerText = `SLOT ${num}: ${color.toUpperCase()} | PAYOUTS: ${singlePayout}x SINGLE / ${colorPayout}x COLOR`;
            hoverInfo.style.color = color === 'red' ? '#ef5350' : (color === 'crimson' ? '#ff007f' : (color === 'black' ? '#fff' : (color === 'green' ? '#4caf50' : (color === 'gold' ? '#ffd700' : (color === 'purple' ? '#ce93d8' : '#80deea')))));
          }
        });

        cell.addEventListener('mouseleave', () => {
          const hoverInfo = this.root.querySelector('#board-hover-info') as HTMLElement;
          if (hoverInfo) {
            hoverInfo.innerText = "HOVER A SLOT TO VIEW PAYOUTS";
            hoverInfo.style.color = 'var(--color-gold)';
          }
        });
      });
    }

    // Update category button labels with dynamic payouts and hide if not on wheel
    if (battle.playerWheel) {
      const activeWheel = battle.playerWheel;
      const boardModifiers = battle.boardModifiers;
      const payouts = activeWheel.payoutMultipliers;
      
      // Check presence of colors and categories
      const colorsPresent = new Set<string>();
      let hasOdd = false;
      let hasEven = false;
      let hasGreen = false;

      for (const num of activeWheel.numbers) {
        const isGreenNum = activeWheel.greenNumbers.includes(num);
        if (isGreenNum) {
          hasGreen = true;
        } else {
          const slotColor = getSlotColor(num, activeWheel, boardModifiers);
          if (slotColor) {
            colorsPresent.add(slotColor);
          }
          if (num % 2 !== 0) {
            hasOdd = true;
          } else {
            hasEven = true;
          }
        }
      }

      const updateAndShowBtn = (btnClass: string, isPresent: boolean, htmlContent: string) => {
        const btn = this.root.querySelector(btnClass) as HTMLElement;
        if (btn) {
          btn.innerHTML = htmlContent;
          if (isPresent) {
            btn.classList.remove('hidden');
          } else {
            btn.classList.add('hidden');
          }
        }
      };

      updateAndShowBtn('.bet-red', colorsPresent.has('red'), `RED (${payouts.red}x)`);
      updateAndShowBtn('.bet-black', colorsPresent.has('black'), `BLACK (${payouts.black}x)`);
      updateAndShowBtn('.bet-green', hasGreen, `GREEN (${payouts.green}x)`);
      updateAndShowBtn('.bet-odd', hasOdd, `ODD (${payouts.odd}x)`);
      updateAndShowBtn('.bet-even', hasEven, `EVEN (${payouts.even}x)`);
      updateAndShowBtn('.bet-gold', colorsPresent.has('gold'), `GOLD (${payouts.gold || 4}x)`);
      updateAndShowBtn('.bet-purple', colorsPresent.has('purple'), `PURPLE (${payouts.purple || 4}x)`);
      updateAndShowBtn('.bet-cyan', colorsPresent.has('cyan'), `CYAN (${payouts.cyan || 4}x)`);
      updateAndShowBtn('.bet-crimson', colorsPresent.has('crimson'), `CRIMSON (${payouts.crimson || 6}x)`);

      // If a row has all buttons hidden, hide the row itself
      const rows = this.root.querySelectorAll('.bet-type-row') as NodeListOf<HTMLElement>;
      rows.forEach(row => {
        const btns = row.querySelectorAll('.bet-btn') as NodeListOf<HTMLElement>;
        let visibleCount = 0;
        btns.forEach(btn => {
          if (!btn.classList.contains('hidden')) {
            visibleCount++;
          }
        });
        if (visibleCount === 0) {
          row.classList.add('hidden');
        } else {
          row.classList.remove('hidden');
        }
      });
    }

    // Placed Bets list update
    const betsListEl = this.root.querySelector('#placed-bets-list')!;
    if (battle.bets.length === 0) {
      betsListEl.innerHTML = '<span class="no-bets-text">No bets placed</span>';
    } else {
      betsListEl.innerHTML = battle.bets.map(bet => {
        let label = bet.type.toUpperCase();
        if (bet.type === 'number') {
          const color = getSlotColor(bet.numberValue!, battle.playerWheel, battle.boardModifiers);
          label = `NUMBER ${bet.numberValue} (<span class="text-${color}">${color}</span>)`;
        }
        return `
          <div class="active-bet-item">
            <span>${label}:</span>
            <span class="text-gold">${bet.amount} ⚡</span>
          </div>
        `;
      }).join('');
    }

    // Spin Button availability
    const spinBtn = this.root.querySelector('#spin-wheel-btn') as HTMLButtonElement;
    if (spinBtn) {
      if (battle.bets.length > 0 && !this.isSpinning) {
        spinBtn.classList.remove('disabled');
        spinBtn.disabled = false;
      } else {
        spinBtn.classList.add('disabled');
        spinBtn.disabled = true;
      }
    }

    // Clear Button availability
    const clearBtn = this.root.querySelector('#clear-bets-btn') as HTMLButtonElement;
    if (clearBtn) {
      clearBtn.disabled = battle.bets.length === 0 || this.isSpinning;
    }

    // End Turn display
    const endTurnBtn = this.root.querySelector('#end-turn-btn') as HTMLElement;
    if (endTurnBtn) {
      if (this.showTurnEnd) {
        endTurnBtn.classList.remove('hidden');
        if (spinBtn) spinBtn.classList.add('hidden');
      } else {
        endTurnBtn.classList.add('hidden');
        if (spinBtn) spinBtn.classList.remove('hidden');
      }
    }

    // Handle spin screen announcement overlays
    const spinOverlay = this.root.querySelector('#spin-overlay')!;
    const spinText = this.root.querySelector('#spin-text')!;
    
    if (this.isSpinning || this.showTurnEnd) {
      spinOverlay.classList.remove('hidden');
      spinText.innerHTML = this.spinMessage;
    } else {
      spinOverlay.classList.add('hidden');
    }
  }

  // Card Codex Screen
  private showCodex() {
    const codexPanel = this.root.querySelector('#codex-panel') as HTMLElement;
    const codexGrid = this.root.querySelector('#codex-grid') as HTMLElement;
    if (!codexPanel || !codexGrid) return;

    let allCards = GameEngine.getAllCardTemplates();
    
    // Sort allCards: Legendary -> Rare -> Uncommon -> Common.
    // Within the same rarity, sort by cost ascending, then by name.
    const rarityOrder: Record<string, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 };
    allCards.sort((a, b) => {
      const diff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
      if (diff !== 0) return diff;
      const costDiff = a.cost - b.cost;
      if (costDiff !== 0) return costDiff;
      return a.name.localeCompare(b.name);
    });

    // Apply active filters
    if (this.codexRarityFilter !== 'all') {
      allCards = allCards.filter(c => c.rarity === this.codexRarityFilter);
    }
    if (this.codexTypeFilter !== 'all') {
      allCards = allCards.filter(c => c.type === this.codexTypeFilter);
    }

    if (allCards.length === 0) {
      codexGrid.innerHTML = `<div class="codex-empty-message">No cards found matching the selected filters.</div>`;
      return;
    }
    
    const isPoints = this.engine.runState.combatMode === 'points';
    
    codexGrid.innerHTML = allCards.map(card => {
      const rarityClass = `codex-card-rarity-${card.rarity}`;
      return `
        <div class="codex-card ${rarityClass}">
          <div class="codex-card-header">
            <span class="codex-card-name">${card.name}</span>
            <span class="codex-card-cost">${card.cost} ⚡</span>
          </div>
          <div class="codex-card-desc">${formatDescription(card.description, isPoints)}</div>
          <div class="codex-card-meta">
            <span>${card.type}</span>
            <span>${card.rarity}</span>
          </div>
        </div>
      `;
    }).join('');

    codexPanel.classList.remove('hidden');
  }


}
