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
  public currentBetAmount = 5;
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
  public mobileModeActive = false;
  public isCombatIntroActive: boolean = false;
  private selectedFloors = 7;

  // Forge state
  private hoveredForgeCardId: string | null = null;

  // Wheel Customizer State
  private isCustomizingWheel = false;
  private customWheelData = {
    id: 'custom',
    name: 'Custom Destroyer',
    description: 'A bespoke engine of risk and reward.',
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
  private lastWheelView = 3;
  private lastEncounterId = '';

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
          <div class="shop-desc-title">HP TRANSFUSION</div>
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
      let upgrade = BOARD_UPGRADES[itemId];
      if (upgrade) {
        let isOwned = state.playerWheel.upgrades.includes(itemId);
        let cost = upgrade.cost;
        let desc = upgrade.description;
        let name = upgrade.name;
        
        if (itemId.startsWith('level_')) {
          const color = itemId.replace('level_', '') as SlotColor;
          const currentLevel = state.colorLevels?.[color] || 1;
          cost = 15 + (currentLevel - 1) * 5;
          if (currentLevel >= 10) {
            isOwned = true;
          }
          name = `${name} (Lvl ${currentLevel})`;
          desc = `${desc} Currently: Lvl ${currentLevel}.`;
        }
        
        const canAfford = state.chips >= cost && !isOwned;
        descBox.innerHTML = `
          <div class="shop-desc-title">${name.toUpperCase()}</div>
          <div class="shop-desc-text">${formatDescription(desc, isPoints)}</div>
          <div class="shop-desc-hint">Cost: ${cost} ⚡ · ${isOwned ? (itemId.startsWith('level_') ? 'MAXED' : 'OWNED') : canAfford ? 'Click Bell or Confirm to Buy' : 'Cannot Afford'}</div>
        `;
        confirmBtn.disabled = !canAfford;
        confirmBtn.textContent = isOwned ? (itemId.startsWith('level_') ? 'MAXED' : 'OWNED') : `BUY UPGRADE: ${cost} ⚡`;
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
      hint = 'Consequence: Lose 8 HP · Gain 25 chips (Essence) | Click tablet again or Confirm to accept';
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
    
    // Load persisted settings
    try {
      this.sound.musicVolume = parseFloat(localStorage.getItem('settings_musicVolume') ?? '0.55');
      this.sound.droneVolume = parseFloat(localStorage.getItem('settings_droneVolume') ?? '0.15');
      this.sound.sfxVolume = parseFloat(localStorage.getItem('settings_sfxVolume') ?? '0.8');
      const hasMobileSetting = localStorage.getItem('settings_mobileModeActive') !== null;
      if (hasMobileSetting) {
        this.mobileModeActive = localStorage.getItem('settings_mobileModeActive') === 'true';
      } else {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 768);
        this.mobileModeActive = isMobileDevice;
        localStorage.setItem('settings_mobileModeActive', this.mobileModeActive.toString());
      }
    } catch (e) {
      console.warn("localStorage settings reading failed:", e);
    }
    
    // Initialize drone volume level
    this.sound.setDroneVolume(this.sound.droneVolume);
    
    if (this.mobileModeActive) {
      document.body.classList.add('mobile-mode');
    } else {
      document.body.classList.remove('mobile-mode');
    }

    this.setupLayout();
    
    // Periodic developer panel monitor updates (e.g. for audio diagnostics)
    setInterval(() => {
      this.updateSoundVisualizerDev();
    }, 250);

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
              <span class="label">HP:</span>
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
            <button id="hud-settings-btn" class="debug-btn" style="border-color: #ffd700; color: #ffd700; margin-left: 4px;">SETTINGS</button>
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
              <div class="dev-row" style="margin-bottom: 6px;">
                <button id="dev-start-sandbox-btn" class="btn" style="border-color: #00ff64; color: #00ff64; width: 100%;">Start Sandbox Combat</button>
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
            </div>

            <!-- Group: CARD SANDBOX TOOLS -->
            <div class="dev-group">
              <div class="dev-group-title">Card Sandbox Filter/Sort</div>
              <div class="dev-row" style="margin-bottom: 4px;">
                <input type="text" id="dev-card-search" placeholder="Search cards..." class="dev-select" style="flex: 1; font-size: 11px; padding: 2px 4px; height: 24px; background: rgba(0,0,0,0.5); border: 1px solid rgba(197,159,81,0.3); color: #fff;" />
              </div>
              <div class="dev-row" style="gap: 4px; margin-bottom: 4px;">
                <select id="dev-card-filter-type" class="dev-select" style="flex: 1; font-size: 11px; height: 24px;">
                  <option value="all">All Types</option>
                  <option value="physics">Physics</option>
                  <option value="board">Board</option>
                  <option value="payout">Payout</option>
                  <option value="utility">Utility</option>
                  <option value="chaos">Chaos</option>
                  <option value="paint">Paint</option>
                  <option value="money">Money</option>
                </select>
                <select id="dev-card-filter-rarity" class="dev-select" style="flex: 1; font-size: 11px; height: 24px;">
                  <option value="all">All Rarities</option>
                  <option value="common">Common</option>
                  <option value="uncommon">Uncommon</option>
                  <option value="rare">Rare</option>
                  <option value="legendary">Legendary</option>
                </select>
              </div>
              <div class="dev-row" style="margin-bottom: 6px;">
                <select id="dev-card-sort" class="dev-select" style="flex: 1; font-size: 11px; height: 24px;">
                  <option value="default" selected>Sort: Type -> Rarity -> Cost</option>
                  <option value="name">Sort: Name (A-Z)</option>
                  <option value="cost-asc">Sort: Cost (Low-High)</option>
                  <option value="cost-desc">Sort: Cost (High-Low)</option>
                  <option value="rarity">Sort: Rarity</option>
                  <option value="type">Sort: Type</option>
                </select>
              </div>
              
              <div class="dev-group-title" style="margin-top: 4px;">Spawn Card In Hand</div>
              <div class="dev-row" style="margin-bottom: 6px;">
                <select id="dev-spawn-card-select" class="dev-select" style="flex: 1; font-size: 11px; height: 24px;">
                  <!-- Populated dynamically -->
                </select>
                <button id="dev-spawn-card-btn" class="btn" style="flex: 0 0 55px; font-size: 11px; height: 24px; padding: 0;">Spawn</button>
              </div>

              <div class="dev-group-title" style="margin-top: 4px;">Add Card to Deck</div>
              <div class="dev-row">
                <select id="dev-add-deck-select" class="dev-select" style="flex: 1; font-size: 11px; height: 24px;">
                  <!-- Populated dynamically -->
                </select>
                <button id="dev-add-deck-btn" class="btn" style="flex: 0 0 55px; font-size: 11px; height: 24px; padding: 0;">Add</button>
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

            <!-- Group: ENEMY DECISION PROCESS -->
            <div class="dev-group" id="dev-enemy-decision-group">
              <div class="dev-group-title">Enemy Decision Process</div>
              <div id="dev-enemy-decision-content" style="font-size: 11px; color: #ece0d8; line-height: 1.4;">
                Active combat required.
              </div>
            </div>

            <!-- Group: SOUND MANAGER VISUALIZER -->
            <div class="dev-group" id="dev-sound-visualizer-group">
              <div class="dev-group-title">Audio & Stems Monitor</div>
              <div id="dev-sound-visualizer-content" style="font-size: 11px; color: #ece0d8; line-height: 1.4; font-family: monospace;">
                Initializing...
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

          <!-- SETTINGS OVERLAY -->
          <div id="settings-overlay" class="hidden">
            <div class="settings-card glass-panel" style="position: relative; padding: 24px; max-width: 420px; width: 90%; margin: auto; border: 1.5px solid var(--color-gold); background: rgba(18, 11, 8, 0.95); box-shadow: 0 0 30px rgba(0,0,0,0.8); text-align: left;">
              <button id="settings-close-btn" class="btn" style="position: absolute; top: 12px; right: 12px; background: transparent; border: none; font-size: 1.2rem; color: var(--color-gold); cursor: pointer; padding: 0 4px;">✕</button>
              <h2 class="res-header" style="text-align: center; margin-bottom: 20px; font-family: 'VT323', monospace; color: var(--color-gold); font-size: 2.2rem; border-bottom: 1px solid rgba(197, 159, 81, 0.3); padding-bottom: 8px;">SETTINGS</h2>
              
              <!-- Audio settings -->
              <div class="settings-group" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
                <label style="font-family: 'VT323', monospace; color: var(--color-gold); font-size: 1.3rem; border-left: 3px solid var(--color-gold); padding-left: 8px; margin-bottom: 4px;">AUDIO MIXER</label>
                <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'VT323', monospace; font-size: 1.1rem; color: #fff;">
                  <span>Music Volume:</span>
                  <div style="display: flex; align-items: center; gap: 10px; width: 60%;">
                    <input type="range" id="vol-music-slider" min="0" max="100" value="55" style="flex: 1; accent-color: var(--color-gold); height: 4px; cursor: pointer;">
                    <span id="vol-music-lbl" style="width: 35px; text-align: right;">55%</span>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'VT323', monospace; font-size: 1.1rem; color: #fff;">
                  <span>Drone/Hum:</span>
                  <div style="display: flex; align-items: center; gap: 10px; width: 60%;">
                    <input type="range" id="vol-drone-slider" min="0" max="100" value="15" style="flex: 1; accent-color: var(--color-gold); height: 4px; cursor: pointer;">
                    <span id="vol-drone-lbl" style="width: 35px; text-align: right;">15%</span>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'VT323', monospace; font-size: 1.1rem; color: #fff;">
                  <span>SFX Volume:</span>
                  <div style="display: flex; align-items: center; gap: 10px; width: 60%;">
                    <input type="range" id="vol-sfx-slider" min="0" max="100" value="80" style="flex: 1; accent-color: var(--color-gold); height: 4px; cursor: pointer;">
                    <span id="vol-sfx-lbl" style="width: 35px; text-align: right;">80%</span>
                  </div>
                </div>
              </div>

              <!-- Display settings -->
              <div class="settings-group" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; border-top: 1px solid rgba(197, 159, 81, 0.15); padding-top: 16px;">
                <label style="font-family: 'VT323', monospace; color: var(--color-gold); font-size: 1.3rem; border-left: 3px solid var(--color-gold); padding-left: 8px; margin-bottom: 4px;">DISPLAY CONFIG</label>
                <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'VT323', monospace; font-size: 1.1rem; color: #fff;">
                  <span>Mobile Layout Mode:</span>
                  <input type="checkbox" id="settings-mobile-checkbox" style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--color-gold);">
                </div>
                <p style="font-family: 'VT323', monospace; font-size: 0.85rem; color: rgba(236, 224, 216, 0.5); line-height: 1.3; margin: 4px 0 0 0;">
                  Forces vertical scrolling layouts and scales down elements for smaller screens.
                </p>
              </div>

              <button id="settings-apply-btn" class="btn primary-btn pulse-glow" style="width: 100%; font-family: 'VT323', monospace; font-size: 1.3rem; padding: 8px 0; margin-top: 8px;">APPLY SETTINGS</button>
            </div>
          </div>

          <!-- PANEL: MAIN MENU -->
          <div id="menu-panel" class="panel active">
            <h1 class="game-title">ROULETTE.OS</h1>
            
            <!-- Path Length Selector -->
            <div class="menu-selector-row">
              <span class="selector-label">PATH LENGTH SELECTOR:</span>
              <div class="selector-btns">
                <button class="selector-btn active" data-floors="7">SHORT</button>
                <button class="selector-btn" data-floors="11">MEDIUM</button>
                <button class="selector-btn" data-floors="15">LONG</button>
              </div>
            </div>

            <div class="menu-btn-group">
              <button id="start-run-btn" class="menu-btn primary">ENTER THE TAVERN</button>
              <button id="codex-btn" class="menu-btn secondary">CARD CODEX</button>
              <button id="menu-settings-btn" class="menu-btn secondary">SETTINGS</button>
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
                <button class="filter-btn" data-filter-type="type" data-value="chaos">Chaos</button>
                <button class="filter-btn" data-filter-type="type" data-value="paint">Paint</button>
                <button class="filter-btn" data-filter-type="type" data-value="money">Money</button>
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
                  <input type="text" id="cust-wheel-desc" value="A bespoke engine of risk and reward." maxlength="80">
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
            
            <!-- Mobile Action Bar (only visible in mobile mode) -->
            <div class="mobile-action-bar">
              <div class="mobile-deck-counters" style="flex: 1; display: flex; gap: 15px; justify-content: flex-start; align-items: center;">
                <div>DRAW: <span id="mobile-draw-count" style="font-weight: bold; color: var(--color-gold);">0</span></div>
                <div>DISC: <span id="mobile-disc-count" style="font-weight: bold; opacity: 0.8;">0</span></div>
              </div>
              <div class="mobile-essence-display" style="flex: 1; display: flex; gap: 8px; justify-content: flex-end; align-items: center; font-family: var(--font-header); font-size: 1.4rem;">
                <span class="label" style="opacity: 0.7; font-size: 0.9rem;">ESSENCE:</span>
                <span id="mobile-essence-val" class="text-gold" style="font-weight: bold; text-shadow: 0 0 8px rgba(197,159,81,0.4);">10 ⚡</span>
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
      this.engine.startNewRun(this.selectedFloors);
      this.render();
    });

    // Path length selector buttons
    const selectorBtns = this.root.querySelectorAll('#menu-panel .selector-btn');
    selectorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const floors = parseInt(btn.getAttribute('data-floors') || '7');
        this.selectedFloors = floors;
        
        // Update active class
        selectorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        this.sound.playRouletteClick(0.7);
      });
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
      if (this.currentView === 4) return;
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
          this.updateEnemyAIDecisionDev();
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
    this.root.querySelector('#dev-start-sandbox-btn')?.addEventListener('click', () => {
      this.sound.playBell();
      this.engine.devStartTestCombat();
      this.setCurrentView(2); // Go to Board View directly
      this.render();
      window.dispatchEvent(new Event('resize'));
    });

    // Bind card filter/sort events
    const searchInput = this.root.querySelector('#dev-card-search') as HTMLInputElement;
    const typeSelect = this.root.querySelector('#dev-card-filter-type') as HTMLSelectElement;
    const raritySelect = this.root.querySelector('#dev-card-filter-rarity') as HTMLSelectElement;
    const sortSelect = this.root.querySelector('#dev-card-sort') as HTMLSelectElement;

    const handleFilterChange = () => {
      this.updateDevCardOptions();
    };

    searchInput?.addEventListener('input', handleFilterChange);
    typeSelect?.addEventListener('change', handleFilterChange);
    raritySelect?.addEventListener('change', handleFilterChange);
    sortSelect?.addEventListener('change', handleFilterChange);

    // Initial update of card options in dropdowns
    this.updateDevCardOptions();

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
      // Toggle debug menu on backtick ('`' or '~')
      if (e.key === '`' || e.key === '~') {
        const dBtn = this.root.querySelector('#debug-toggle-btn') as HTMLElement;
        if (dBtn) dBtn.click();
      }

      // Switch views on '1' - '7'
      if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        this.setCurrentView(parseInt(e.key));
      }

      // PC Keyboard WASD key navigation when not mobileModeActive
      if (!this.mobileModeActive) {
        const key = e.key.toLowerCase();
        if (key === 'w') {
          let nextView = this.currentView;
          if (this.currentView === 4) nextView = 1;
          else if (this.currentView === 1) nextView = 2;
          else if (this.currentView === 2) nextView = (this.lastWheelView === 6 ? 6 : 3);
          else if (this.currentView === 3 || this.currentView === 6) nextView = 5;
          else if (this.currentView === 5) nextView = 7;
          
          if (nextView !== this.currentView) {
            this.sound.playCardSwoosh();
            this.setCurrentView(nextView);
          }
        } else if (key === 's') {
          let nextView = this.currentView;
          if (this.currentView === 7) nextView = 5;
          else if (this.currentView === 5) nextView = (this.lastWheelView === 6 ? 6 : 3);
          else if (this.currentView === 3 || this.currentView === 6) nextView = 2;
          else if (this.currentView === 2) nextView = 1;
          else if (this.currentView === 1) nextView = 4;
          
          if (nextView !== this.currentView) {
            this.sound.playCardSwoosh();
            this.setCurrentView(nextView);
          }
        } else if (key === 'a') {
          if (!this.mobileModeActive) {
            if (this.currentView === 1 || this.currentView === 2) {
              (this as any).lastPreDeckView = this.currentView;
              this.setCurrentView(9);
              this.sound.playCardSwoosh();
            } else if (this.currentView === 3 || this.currentView === 6) {
              this.setCurrentView(this.currentView === 3 ? 6 : 3);
              this.sound.playCardSwoosh();
            }
          } else {
            if (this.currentView === 1 && this.renderer) {
              const count = this.renderer.cardVisuals.length;
              if (count > 0) {
                this.renderer.activeHandCardIndex = Math.max(0, this.renderer.activeHandCardIndex - 1);
                this.sound.playCardSwoosh();
              }
            } else if (this.currentView === 3 || this.currentView === 6) {
              this.setCurrentView(this.currentView === 3 ? 6 : 3);
              this.sound.playCardSwoosh();
            }
          }
        } else if (key === 'd') {
          if (!this.mobileModeActive && this.currentView === 9) {
            this.setCurrentView((this as any).lastPreDeckView || 2);
            this.sound.playCardSwoosh();
          } else if (this.currentView === 1 && this.renderer) {
            const count = this.renderer.cardVisuals.length;
            if (count > 0) {
              this.renderer.activeHandCardIndex = Math.min(count - 1, this.renderer.activeHandCardIndex + 1);
              this.sound.playCardSwoosh();
            }
          } else if (this.currentView === 3 || this.currentView === 6) {
            this.setCurrentView(this.currentView === 6 ? 3 : 6);
            this.sound.playCardSwoosh();
          }
        }
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
        if (this.currentView === 4) return;
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

    // Settings toggles & buttons
    const settingsOverlay = this.root.querySelector('#settings-overlay');
    const openSettings = () => {
      this.sound.playDraw();
      
      // Update form fields with current settings values
      const musicSlider = this.root.querySelector('#vol-music-slider') as HTMLInputElement;
      const droneSlider = this.root.querySelector('#vol-drone-slider') as HTMLInputElement;
      const sfxSlider = this.root.querySelector('#vol-sfx-slider') as HTMLInputElement;
      const mobileCheckbox = this.root.querySelector('#settings-mobile-checkbox') as HTMLInputElement;
      
      const musicLbl = this.root.querySelector('#vol-music-lbl') as HTMLElement;
      const droneLbl = this.root.querySelector('#vol-drone-lbl') as HTMLElement;
      const sfxLbl = this.root.querySelector('#vol-sfx-lbl') as HTMLElement;

      if (musicSlider) {
        musicSlider.value = Math.round(this.sound.musicVolume * 100).toString();
        if (musicLbl) musicLbl.innerText = `${musicSlider.value}%`;
      }
      if (droneSlider) {
        droneSlider.value = Math.round(this.sound.droneVolume * 100).toString();
        if (droneLbl) droneLbl.innerText = `${droneSlider.value}%`;
      }
      if (sfxSlider) {
        sfxSlider.value = Math.round(this.sound.sfxVolume * 100).toString();
        if (sfxLbl) sfxLbl.innerText = `${sfxSlider.value}%`;
      }
      if (mobileCheckbox) {
        mobileCheckbox.checked = this.mobileModeActive;
      }
      
      settingsOverlay?.classList.remove('hidden');
    };

    this.root.querySelector('#hud-settings-btn')?.addEventListener('click', openSettings);
    this.root.querySelector('#menu-settings-btn')?.addEventListener('click', openSettings);

    const closeSettings = () => {
      this.sound.playCardSwoosh();
      settingsOverlay?.classList.add('hidden');
    };

    this.root.querySelector('#settings-close-btn')?.addEventListener('click', closeSettings);

    // Track slider real-time value updates
    this.root.querySelector('#vol-music-slider')?.addEventListener('input', (e) => {
      const val = (e.target as HTMLInputElement).value;
      const lbl = this.root.querySelector('#vol-music-lbl') as HTMLElement;
      if (lbl) lbl.innerText = `${val}%`;
      this.sound.setMusicVolume(parseInt(val) / 100);
    });

    this.root.querySelector('#vol-drone-slider')?.addEventListener('input', (e) => {
      const val = (e.target as HTMLInputElement).value;
      const lbl = this.root.querySelector('#vol-drone-lbl') as HTMLElement;
      if (lbl) lbl.innerText = `${val}%`;
      this.sound.setDroneVolume(parseInt(val) / 100);
    });

    this.root.querySelector('#vol-sfx-slider')?.addEventListener('input', (e) => {
      const val = (e.target as HTMLInputElement).value;
      const lbl = this.root.querySelector('#vol-sfx-lbl') as HTMLElement;
      if (lbl) lbl.innerText = `${val}%`;
      this.sound.setSfxVolume(parseInt(val) / 100);
    });

    // Apply button click
    this.root.querySelector('#settings-apply-btn')?.addEventListener('click', () => {
      const mobileCheckbox = this.root.querySelector('#settings-mobile-checkbox') as HTMLInputElement;
      this.mobileModeActive = mobileCheckbox ? mobileCheckbox.checked : false;

      if (this.mobileModeActive) {
        document.body.classList.add('mobile-mode');
      } else {
        document.body.classList.remove('mobile-mode');
      }

      // Save to localStorage
      try {
        localStorage.setItem('settings_musicVolume', this.sound.musicVolume.toString());
        localStorage.setItem('settings_droneVolume', this.sound.droneVolume.toString());
        localStorage.setItem('settings_sfxVolume', this.sound.sfxVolume.toString());
        localStorage.setItem('settings_mobileModeActive', this.mobileModeActive.toString());
      } catch (err) {
        console.warn("Saving settings to localStorage failed:", err);
      }

      this.sound.playBell();
      settingsOverlay?.classList.add('hidden');
      this.render(); // full UI re-layout and render!
      window.dispatchEvent(new Event('resize'));
    });

    // Mobile Draw Card button
    const mobileDrawBtn = this.root.querySelector('#mobile-draw-btn');
    mobileDrawBtn?.addEventListener('click', () => {
      if (this.engine.buyCardDraw()) {
        this.sound.playDraw();
        this.render();
      } else {
        this.sound.playRouletteClick(0.3);
      }
    });

    // Mobile Clear button
    const mobileClearBtn = this.root.querySelector('#mobile-clear-btn');
    mobileClearBtn?.addEventListener('click', () => {
      this.sound.playCardSwoosh();
      this.engine.clearBets();
      this.render();
    });

    // Mobile Spin / End Turn button
    const mobileSpinBtn = this.root.querySelector('#mobile-spin-btn');
    mobileSpinBtn?.addEventListener('click', () => {
      if (this.showTurnEnd) {
        this.sound.playDraw();
        this.engine.resolveEnemyTurn();
        this.showTurnEnd = false;
        this.render();
      } else {
        this.triggerSpin();
      }
    });
  }

  private updateDevCardOptions() {
    const searchInput = this.root.querySelector('#dev-card-search') as HTMLInputElement;
    const typeSelect = this.root.querySelector('#dev-card-filter-type') as HTMLSelectElement;
    const raritySelect = this.root.querySelector('#dev-card-filter-rarity') as HTMLSelectElement;
    const sortSelect = this.root.querySelector('#dev-card-sort') as HTMLSelectElement;
    
    const deckSelect = this.root.querySelector('#dev-add-deck-select') as HTMLSelectElement;
    const spawnSelect = this.root.querySelector('#dev-spawn-card-select') as HTMLSelectElement;

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const typeFilter = typeSelect ? typeSelect.value : 'all';
    const rarityFilter = raritySelect ? raritySelect.value : 'all';
    const sortBy = sortSelect ? sortSelect.value : 'default';

    let cardKeys = Object.keys(CARD_DATABASE);

    cardKeys = cardKeys.filter(key => {
      const card = CARD_DATABASE[key];
      if (typeFilter !== 'all' && card.type !== typeFilter) return false;
      if (rarityFilter !== 'all' && card.rarity !== rarityFilter) return false;
      if (query) {
        const nameMatch = card.name.toLowerCase().includes(query);
        const descMatch = card.description.toLowerCase().includes(query);
        const keyMatch = key.toLowerCase().includes(query);
        if (!nameMatch && !descMatch && !keyMatch) return false;
      }
      return true;
    });

    cardKeys.sort((aKey, bKey) => {
      const a = CARD_DATABASE[aKey];
      const b = CARD_DATABASE[bKey];

      if (sortBy === 'cost-asc') {
        return a.cost - b.cost;
      } else if (sortBy === 'cost-desc') {
        return b.cost - a.cost;
      } else if (sortBy === 'rarity') {
        const rarities: Record<string, number> = { 'common': 0, 'uncommon': 1, 'rare': 2, 'legendary': 3 };
        return (rarities[a.rarity] ?? 0) - (rarities[b.rarity] ?? 0);
      } else if (sortBy === 'type') {
        return a.type.localeCompare(b.type);
      } else if (sortBy === 'default') {
        const typeOrders: Record<string, number> = { 'physics': 0, 'board': 1, 'payout': 2, 'utility': 3, 'chaos': 4, 'paint': 5, 'money': 6 };
        const rarityOrders: Record<string, number> = { 'common': 0, 'uncommon': 1, 'rare': 2, 'legendary': 3 };
        const typeDiff = (typeOrders[a.type] ?? 0) - (typeOrders[b.type] ?? 0);
        if (typeDiff !== 0) return typeDiff;
        const rarityDiff = (rarityOrders[a.rarity] ?? 0) - (rarityOrders[b.rarity] ?? 0);
        if (rarityDiff !== 0) return rarityDiff;
        return a.cost - b.cost;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    const optionsHtml = cardKeys.map(key => {
      const card = CARD_DATABASE[key];
      return `<option value="${key}">${card.name} [Cost: ${card.cost}⚡, ${card.rarity.substring(0,4)}, ${card.type.substring(0,4)}]</option>`;
    }).join('');

    if (deckSelect) deckSelect.innerHTML = optionsHtml;
    if (spawnSelect) spawnSelect.innerHTML = optionsHtml;
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

    const outcomesText = res.allOutcomes && res.allOutcomes.length > 0
      ? res.allOutcomes.map(o => `${o.number} ${o.color.toUpperCase()}`).join(', ')
      : `${res.number} ${res.color.toUpperCase()}`;
    
    if (res.damageDealt > 0) {
      this.spinMessage = `LANDED ON: ${outcomesText}! <br><span class="text-green">HIT! DEALT ${res.damageDealt} DAMAGE!</span>`;
    } else {
      this.spinMessage = `LANDED ON: ${outcomesText}. <br><span class="text-red">MISS. NO DAMAGE DEALT.</span>`;
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

    if ((battle as any).isTestCombatMode) {
      this.spinMessage = "TEST MODE: SKIPPING OPPONENT TURN";
      this.render();
      setTimeout(() => {
        this.engine.resolveEnemyTurn();
        this.setCurrentView(2); // Go back to Board View (2) directly
        this.render();
      }, 1200);
      return;
    }

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

    const outcomesText = res.allOutcomes && res.allOutcomes.length > 0
      ? res.allOutcomes.map(o => `${o.number} ${o.color.toUpperCase()}`).join(', ')
      : `${res.number} ${res.color.toUpperCase()}`;
    
    const intent = this.engine.battleState?.enemy.intent;
    if (res.enemyWon) {
      if (intent && intent.type === 'attack') {
        if (res.playerDamageTaken > 0) {
          this.spinMessage = `ENEMY LANDED ON: ${outcomesText}! <br><span class="text-red">HIT! YOU TAKE ${res.playerDamageTaken} DAMAGE!</span>`;
        } else {
          this.spinMessage = `ENEMY LANDED ON: ${outcomesText}! <br><span class="text-green">BLOCKED! Shield absorbed the attack!</span>`;
        }
      } else if (intent && intent.type === 'steal_chips') {
        this.spinMessage = `ENEMY LANDED ON: ${outcomesText}! <br><span class="text-red">STEAL! THEY STOLE ${intent.value} CHIPS!</span>`;
      } else if (intent && intent.type === 'physics_debuff') {
        this.spinMessage = `ENEMY LANDED ON: ${outcomesText}! <br><span class="text-red">DEBUFF! WHEEL FRICTION DOUBLED!</span>`;
      } else {
        this.spinMessage = `ENEMY LANDED ON: ${outcomesText}! <br><span class="text-red">HIT! Effect triggered!</span>`;
      }
    } else {
      this.spinMessage = `ENEMY LANDED ON: ${outcomesText}. <br><span class="text-green">MISS! NO DAMAGE TAKEN.</span>`;
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
    if (res.allOutcomes && res.allOutcomes.length > 1) {
      badge.innerHTML = res.allOutcomes.map(o => {
        let bgClass = 'green-bg';
        if (o.color === 'red') bgClass = 'red-bg';
        else if (o.color === 'black') bgClass = 'black-bg';
        else if (o.color === 'gold') bgClass = 'gold-bg';
        else if (o.color === 'purple') bgClass = 'purple-bg';
        else if (o.color === 'cyan') bgClass = 'cyan-bg';
        else if (o.color === 'crimson') bgClass = 'crimson-bg';
        return `<span class="res-sub-badge ${bgClass}" style="margin: 0 4px; padding: 2px 8px; border-radius: 4px; font-weight: bold; border: 1px solid rgba(255,255,255,0.2); font-size: 1.2rem;">${o.number}</span>`;
      }).join('');
      badge.className = 'res-badge-container';
      badge.style.border = 'none';
      badge.style.boxShadow = 'none';
      badge.style.background = 'none';
    } else {
      badge.innerText = res.number.toString();
      badge.className = 'res-badge';
      badge.style.border = '';
      badge.style.boxShadow = '';
      badge.style.background = '';
      if (res.color === 'red') badge.classList.add('red-bg');
      else if (res.color === 'black') badge.classList.add('black-bg');
      else if (res.color === 'green') badge.classList.add('green-bg');
      else if (res.color === 'gold') badge.classList.add('gold-bg');
      else if (res.color === 'purple') badge.classList.add('purple-bg');
      else if (res.color === 'cyan') badge.classList.add('cyan-bg');
      else if (res.color === 'crimson') badge.classList.add('crimson-bg');
    }

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
      if (isPointsMode) {
        const totalEnemyScore = (res.damageDealt || 0) + (res.playerDamageTaken || 0);
        if (totalEnemyScore > 0) {
          summary.innerHTML = `<span class="text-red" style="font-size: 22px; text-shadow: 0 0 10px rgba(255, 0, 0, 0.4);">HIT! OPPONENT SCORED ${totalEnemyScore} PTS!</span>`;
        } else {
          const intent = battle.enemy.intent;
          if (intent.type === 'steal_chips') {
            summary.innerHTML = `<span class="text-red" style="font-size: 18px;">STEAL! OPPONENT STOLE ${intent.value} CHIPS!</span>`;
          } else if (intent.type === 'physics_debuff') {
            summary.innerHTML = `<span class="text-red" style="font-size: 18px;">DEBUFF! WHEEL FRICTION WAS DOUBLED!</span>`;
          } else {
            summary.innerHTML = `<span class="text-green" style="font-size: 18px;">MISS! NO POINTS SCORED.</span>`;
          }
        }
      } else {
        // Health mode
        if (res.playerDamageTaken > 0) {
          summary.innerHTML = `<span class="text-red" style="font-size: 22px; text-shadow: 0 0 10px rgba(255, 0, 0, 0.4);">HIT! YOU TOOK ${res.playerDamageTaken} DAMAGE!</span>`;
        } else {
          const intent = battle.enemy.intent;
          if (intent.type === 'steal_chips') {
            summary.innerHTML = `<span class="text-red" style="font-size: 18px;">STEAL! OPPONENT STOLE ${intent.value} CHIPS!</span>`;
          } else if (intent.type === 'physics_debuff') {
            summary.innerHTML = `<span class="text-red" style="font-size: 18px;">DEBUFF! WHEEL FRICTION WAS DOUBLED!</span>`;
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
        else if (bet.type === 'gold' && res.color === 'gold') { isWin = true; mult = activeWheel.payoutMultipliers.gold || 4.0; }
        else if (bet.type === 'purple' && res.color === 'purple') { isWin = true; mult = activeWheel.payoutMultipliers.purple || 4.0; }
        else if (bet.type === 'cyan' && res.color === 'cyan') { isWin = true; mult = activeWheel.payoutMultipliers.cyan || 4.0; }
        else if (bet.type === 'crimson' && res.color === 'crimson') {
          isWin = true;
          const baseCrimsonMult = activeWheel.payoutMultipliers.crimson || 6.0;
          const hpPercent = this.engine.runState.hp / this.engine.runState.maxHp;
          mult = hpPercent < 0.5 ? baseCrimsonMult * 2.0 : baseCrimsonMult;
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
    if (viewId === 3 || viewId === 6) {
      this.lastWheelView = viewId;
    }
    
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
    if (this.currentView === 4) return;
    if (!this.engine.battleState || this.engine.battleState.phase !== 'betting' || this.isSpinning) return;
    
    if (this.engine.battleState.bets.length > 0) {
      this.sound.playBell();
      setTimeout(() => {
        this.triggerSpin();
      }, 150); // slight delay to feel the bell strike before spinning!
    } else {
      this.sound.playBell();
      this.spinMessage = "PASSING TURN... (NO BETS PLACED)";
      this.engine.passPlayerTurn();
      this.render();
      
      setTimeout(() => {
        this.triggerOpponentTurnSequence();
      }, 800);
    }
  }

  // --- DYNAMIC RENDERING ---

  render() {
    const state = this.engine.runState;

    // Update body state class for mobile layout selectors (preserving debug-ui-active)
    const wasDebug = document.body.classList.contains('debug-ui-active');
    document.body.className = this.mobileModeActive ? 'mobile-mode' : '';
    if (wasDebug) {
      document.body.classList.add('debug-ui-active');
    }
    document.body.classList.add(`state-${state.gameState.toLowerCase()}`);

    // Handle encounter-specific procedural music & Title stems
    if (state.gameState === 'COMBAT') {
      this.sound.stopTitleMusic();
      const type = this.engine.battleState?.encounterType || 'combat';
      if (type === 'boss') {
        this.sound.playEncounterMusic('boss');
      } else if (type === 'elite') {
        this.sound.playEncounterMusic('elite');
      } else {
        this.sound.playEncounterMusic('combat');
      }
    } else if (state.gameState === 'GAME_OVER' || state.gameState === 'VICTORY') {
      this.sound.stopTitleMusic();
      this.sound.stopMusic();
    } else if (state.gameState === 'MENU') {
      this.sound.stopMusic();
      this.sound.playTitleMusic();
    } else if (state.gameState === 'LOADOUT_STORE') {
      if (this.sound.isTitleMusicPlaying) {
        this.sound.stopTitleMusic(2.5);
      }
      this.sound.stopMusic();
    } else {
      // Ambient states: MAP, SHOP, EVENT, FORGE
      this.sound.stopTitleMusic();
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
    const showHud = state.gameState !== 'MENU' && 
                    state.gameState !== 'LOADOUT_STORE' && 
                    state.gameState !== 'GAME_OVER' && 
                    state.gameState !== 'VICTORY' && 
                    !(this.mobileModeActive && state.gameState === 'COMBAT');
    this.togglePanel('hud-panel', showHud);
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

    // Reset encounter ID if not in combat
    if (state.gameState !== 'COMBAT') {
      this.lastEncounterId = '';
    }

    // Handle Combat UI Rendering
    if (state.gameState === 'COMBAT' && this.engine.battleState) {
      const battle = this.engine.battleState;
      if (battle.enemy.id !== this.lastEncounterId) {
        this.lastEncounterId = battle.enemy.id;
        this.showCombatIntroOverlay(battle);
      }
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
    
    const rowHeight = 90;
    const colWidth = 90;
    const gridWidth = 320;
    const centerX = gridWidth / 2;
    const totalHeight = map.length * rowHeight + 100;
    
    // Slay the spire style canvas rendering
    let html = `<div class="map-grid-view" style="width: 320px; margin: 0 auto; height: ${totalHeight}px; position: relative;">`;
    
    // Let's create SVG connections lines
    html += `<svg class="map-connections-svg" style="width: 320px; height: ${totalHeight}px;">`;
    
    // Gather all node locations in SVG coordinate space
    const nodeCoords: Record<string, { x: number; y: number }> = {};
    
    map.forEach((floorNodes, floorIdx) => {
      const cy = (map.length - 1 - floorIdx) * rowHeight + 50; // top floor first
      floorNodes.forEach(node => {
        const cx = centerX + (node.lane - 1) * colWidth;
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

    const containerEl = container as HTMLElement;
    setTimeout(() => {
      if (containerEl) {
        const containerHeight = containerEl.clientHeight || 450;
        const cy = (map.length - 1 - state.currentFloor) * rowHeight + 50;
        containerEl.scrollTop = cy - containerHeight / 2;
      }
    }, 50);
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
    const levels = state.colorLevels || { red: 1, black: 1, green: 1, gold: 1, purple: 1, cyan: 1, crimson: 1 };
    const pmRed = this.engine.getScaledPayoutMultiplier('red', pm.red);
    const pmBlack = this.engine.getScaledPayoutMultiplier('black', pm.black);
    const pmGreen = this.engine.getScaledPayoutMultiplier('green', pm.green);

    const flavorText = this.mobileModeActive
      ? 'Purchase upgrades to shape your wheel layout. Reroll for new offers.'
      : 'Purchase upgrades to shape your wheel layout and bet payouts. Rerolling generates new offers.';

    const statsStyle = this.mobileModeActive ? 'style="font-size: 1.0rem; margin: 8px auto;"' : '';
    const multipliersStyle = this.mobileModeActive ? 'style="flex-wrap: wrap; gap: 8px; justify-content: center;"' : '';

    container.innerHTML = `
      <div class="forge-hud">
        <div class="forge-title-panel">
          <h1>THE BLACKSMITH'S FORGE</h1>
          <p class="flavor-text">${flavorText}</p>
        </div>

        <div class="forge-stats-panel" ${statsStyle}>
          <div>CHIPS: <span class="forge-stats-chips">${state.chips} ⚡</span></div>
          <div class="forge-stats-multipliers" ${multipliersStyle}>
            SLOTS: <span style="color:#fff;">${wheel.numbers.length}</span> | 
            RED (Lvl ${levels.red}): <span style="color:#ef5350;">${pmRed}x</span> | 
            BLACK (Lvl ${levels.black}): <span style="color:#aaaaaa;">${pmBlack}x</span> | 
            GREEN (Lvl ${levels.green}): <span style="color:#4caf50;">${pmGreen}x</span> | 
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

        <!-- Mobile Forge Offers List -->
        ${this.mobileModeActive && state.forgeCards ? `
          <div id="forge-mobile-container" class="shop-grid">
            ${state.forgeCards.map(card => {
              const rarityClass = `shop-card-rarity-${card.rarity === 'gold' ? 'legendary' : card.rarity === 'silver' ? 'rare' : 'common'}`;
              const canAfford = state.chips >= card.cost;
              return `
                <div class="shop-card-item glass-panel ${rarityClass}">
                  <div class="shop-card-meta">${card.rarity.toUpperCase()} UPGRADE</div>
                  <div class="card-title">${card.name}</div>
                  <div class="card-desc">${card.description}</div>
                  ${card.purchased ? `
                    <span class="upgrade-badge">PURCHASED</span>
                    <button class="btn primary-btn buy-btn" style="opacity: 0.5;" disabled>
                      OWNED
                    </button>
                  ` : `
                    <button class="btn primary-btn buy-btn forge-buy-btn" data-id="${card.id}" ${!canAfford ? 'disabled' : ''}>
                      BUY: ${card.cost} ⚡
                    </button>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}
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

    // Bind Mobile Buy events
    if (this.mobileModeActive) {
      const forgeBuyBtns = container.querySelectorAll('.forge-buy-btn');
      forgeBuyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const cardId = btn.getAttribute('data-id')!;
          if (this.engine.purchaseForgeCard(cardId)) {
            this.sound.playDraw();
            if (this.renderer) {
              this.renderer.hoveredForgeCardId = null;
              this.hoveredForgeCardId = null;
              this.renderer.syncForgeCards();
            }
            this.render();
          }
        });
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

    const welcomeEl = this.root.querySelector('.shop-welcome') as HTMLElement;
    if (welcomeEl) {
      welcomeEl.innerText = this.mobileModeActive 
        ? '"Spend essence wisely, mortal..."'
        : '"Spend your essence wisely, mortal. Or bleed for it..."';
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
      const paintClass = item.type === 'paint' ? 'paint-card' : '';
      const moneyClass = item.type === 'money' ? 'money-card' : '';
      html += `
        <div class="shop-card-item glass-panel ${rarityClass} ${paintClass} ${moneyClass}">
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

    // Hide HTML items view container to rely on 3D view unless in mobile mode
    if (this.mobileModeActive) {
      container.classList.remove('hidden');
    } else {
      container.classList.add('hidden');
    }
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
      let isOwned = playerWheel.upgrades.includes(key);
      let cost = upgrade.cost;
      let name = upgrade.name;
      let desc = upgrade.description;

      if (key.startsWith('level_')) {
        const color = key.replace('level_', '') as SlotColor;
        const currentLevel = state.colorLevels?.[color] || 1;
        cost = 15 + (currentLevel - 1) * 5;
        if (currentLevel >= 10) {
          isOwned = true;
        }
        name = `${name} (Lvl ${currentLevel})`;
        desc = `${desc} Currently: Lvl ${currentLevel}.`;
      }

      const canAfford = state.chips >= cost;
      
      html += `
        <div class="shop-card-item glass-panel">
          <div class="card-title">${name}</div>
          <div class="card-desc">${formatDescription(desc, isPoints)}</div>
          ${isOwned ? `
            <span class="upgrade-badge">${key.startsWith('level_') ? 'MAXED' : 'PURCHASED'}</span>
            <button class="btn primary-btn buy-upgrade-btn" style="opacity: 0.5;" disabled>
              ${key.startsWith('level_') ? 'MAXED' : 'OWNED'}
            </button>
          ` : `
            <button class="btn primary-btn buy-upgrade-btn animate-btn" data-id="${key}" ${!canAfford ? 'disabled' : ''}>
              BUY: ${cost} ⚡
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

    // Hide HTML upgrades view container to rely on 3D view unless in mobile mode
    if (this.mobileModeActive) {
      container.classList.remove('hidden');
    } else {
      container.classList.add('hidden');
    }
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
      this.customWheelData.description = descInput.value || 'A bespoke engine of risk and reward.';

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
    if (this.mobileModeActive) {
      textEl.innerHTML = `"A tribute to the wheel... or a transfusion to live. Your choice, mortal..."`;
    } else {
      textEl.innerHTML = `
        An old croupier with glowing red stitching across their eyes block your path. 
        They extend a decaying, shaking palm holding a dark magnet and a rusty syringe.
        <br><br>
        "A tribute to the wheel... or a transfusion to live. Your choice, mortal..."
      `;
    }

    choicesContainer.innerHTML = `
      <button class="event-choice-btn" data-choice="1">
        <span class="choice-tag">[Inject Syringe]</span> Lose 8 HP, gain 25 Essence chips.
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

    // Hide HTML choices list to rely on 3D tablets unless in mobile mode
    if (this.mobileModeActive) {
      choicesContainer.classList.remove('hidden');
    } else {
      choicesContainer.classList.add('hidden');
    }
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
    const state = this.engine.runState;
    const isPointsMode = state.combatMode === 'points';
    const enemyHud = this.root.querySelector('.enemy-hud') as HTMLElement;

    // Render color levels HUD
    const colorLevelsHud = this.root.querySelector('.color-levels-hud') as HTMLElement;
    if (colorLevelsHud) {
      const levels = state.colorLevels || { red: 1, black: 1, green: 1, gold: 1, purple: 1, cyan: 1, crimson: 1 };
      const unlocks = state.colorUnlocks || { red_ability: false, black_ability: false, green_ability: false };
      
      const colorRows = [
        { name: 'Red', color: '#ff3b30', lvl: levels.red, mult: this.engine.getScaledPayoutMultiplier('red', state.playerWheel.payoutMultipliers.red), ability: unlocks.red_ability ? '🔥 FEVER' : '🔒 LOCKED' },
        { name: 'Black', color: '#888888', lvl: levels.black, mult: this.engine.getScaledPayoutMultiplier('black', state.playerWheel.payoutMultipliers.black), ability: unlocks.black_ability ? '❄️ GLACIER' : '🔒 LOCKED' },
        { name: 'Green', color: '#34c759', lvl: levels.green, mult: this.engine.getScaledPayoutMultiplier('green', state.playerWheel.payoutMultipliers.green), ability: unlocks.green_ability ? '⚡ SYNAPSE' : '🔒 LOCKED' },
        { name: 'Gold', color: '#ffcc00', lvl: levels.gold, mult: this.engine.getScaledPayoutMultiplier('gold', state.playerWheel.payoutMultipliers.gold || 4.0), ability: '✨ MIDAS' },
        { name: 'Purple', color: '#af52de', lvl: levels.purple, mult: this.engine.getScaledPayoutMultiplier('purple', state.playerWheel.payoutMultipliers.purple || 4.0), ability: '🔮 CURSE' },
        { name: 'Cyan', color: '#5ac8fa', lvl: levels.cyan, mult: this.engine.getScaledPayoutMultiplier('cyan', state.playerWheel.payoutMultipliers.cyan || 4.0), ability: '🔋 CHARGE' },
        { name: 'Crimson', color: '#ff2d55', lvl: levels.crimson, mult: this.engine.getScaledPayoutMultiplier('crimson', state.playerWheel.payoutMultipliers.crimson || 6.0), ability: '🩸 SURGE' }
      ];

      const isLosing = (battle.playerScore || 0) < (battle.enemyScore || 0);

      let hudHtml = `
        <div style="font-weight: bold; color: var(--color-gold); font-family: var(--font-header); font-size: 1.1rem; margin-bottom: 6px; letter-spacing: 1px; border-bottom: 1px solid rgba(197, 159, 81, 0.25); padding-bottom: 4px; display: flex; justify-content: space-between;">
          <span>COLOR LEVEL</span>
          <span style="font-size: 0.8rem; opacity: 0.7;">MAX 10</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px; font-family: var(--font-mono); font-size: 0.7rem;">
      `;

      colorRows.forEach(row => {
        const displayMult = row.name === 'Crimson' 
          ? `${row.mult}x${isLosing ? ' (x2)' : ''}` 
          : `${row.mult}x`;

        hudHtml += `
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${row.color}; box-shadow: 0 0 4px ${row.color}; border: 1px solid rgba(255,255,255,0.2);"></span>
              <span style="font-weight: bold; color: #fff;">${row.name.toUpperCase()}</span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span style="color: var(--color-gold);">Lvl ${row.lvl}</span>
              <span style="opacity: 0.85; width: 45px; text-align: right;">${displayMult}</span>
              <span style="font-size: 0.6rem; font-family: var(--font-header); color: ${row.ability.includes('LOCKED') ? '#888' : '#ffd54f'}; background: ${row.ability.includes('LOCKED') ? 'rgba(255,255,255,0.05)' : 'rgba(197, 159, 81, 0.15)'}; padding: 1px 4px; border-radius: 2px; border: 1px solid ${row.ability.includes('LOCKED') ? 'rgba(255,255,255,0.1)' : 'rgba(197, 159, 81, 0.3)'}; min-width: 50px; text-align: center;">${row.ability}</span>
            </div>
          </div>
        `;
      });

      hudHtml += `</div>`;
      colorLevelsHud.innerHTML = hudHtml;
    }

    if (enemyHud) {
      if (this.mobileModeActive) {
        // Combined mobile HUD
        enemyHud.innerHTML = `
          <div class="mobile-combined-hud">
            <!-- Top row: Stats & Menu Buttons -->
            <div class="mobile-hud-top-row" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(197, 159, 81, 0.25); padding-bottom: 4px; margin-bottom: 6px;">
              <span class="mobile-hud-stat text-gold" style="font-weight: bold; font-family: var(--font-header); font-size: 1.15rem;">${state.chips} ⚡</span>
              <span class="mobile-hud-stat" style="font-family: var(--font-header); font-size: 1rem; opacity: 0.85;">FLOOR ${state.currentFloor + 1} / 7</span>
              <div class="mobile-hud-buttons" style="display: flex; gap: 6px;">
                <button class="mobile-hud-btn" id="mobile-hud-settings-btn" style="background: rgba(197,159,81,0.1); border: 1px solid var(--color-gold); color: var(--color-gold); font-size: 0.85rem; padding: 2px 6px; border-radius: 4px; cursor: pointer;">⚙ SETTINGS</button>
                <button class="mobile-hud-btn" id="mobile-hud-abandon-btn" style="background: rgba(229,57,53,0.1); border: 1px solid var(--color-red); color: var(--color-red); font-size: 0.85rem; padding: 2px 6px; border-radius: 4px; cursor: pointer;">🏳 ABANDON</button>
                <button class="mobile-hud-btn" id="mobile-hud-dev-btn" style="background: rgba(255,170,0,0.1); border: 1px solid #ffaa00; color: #ffaa00; font-size: 0.85rem; padding: 2px 6px; border-radius: 4px; cursor: pointer; display: block;">🛠 DEV</button>
              </div>
            </div>
            
            <!-- Middle row: Enemy details & intent -->
            <div class="mobile-hud-middle-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <div class="mobile-hud-enemy-info" style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; width: 100%;">
                <span class="enemy-name-label" style="font-family: var(--font-header); font-size: 1.1rem; color: #fff; font-weight: bold; text-shadow: 0 0 6px rgba(255,255,255,0.2);">${battle.enemy.name}</span>
                <span class="enemy-intent-label" style="font-family: var(--font-header); font-size: 0.9rem; color: #ffaa00; margin-top: 1px;">INTENT: <span class="intent-desc-val" style="color: #fff;">${battle.enemy.intent.description}</span></span>
              </div>
            </div>
            
            ${battle.curse ? `
              <div class="mobile-curse-info" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; padding: 4px; border: 1px dashed var(--color-gold); background: rgba(197,159,81,0.05); border-radius: 4px; font-family: var(--font-header);">
                <span style="font-size: 1.1rem;">${battle.curse.icon}</span>
                <div style="display: flex; flex-direction: column; text-align: left;">
                  <span style="font-size: 0.85rem; font-weight: bold; color: var(--color-gold);">${battle.curse.name}</span>
                  <span style="font-size: 0.75rem; color: #ece0d8; opacity: 0.85; line-height: 1.2;">${battle.curse.description}</span>
                </div>
              </div>
            ` : ''}

            <!-- Bottom row: Scores or HP Bars -->
            <div class="mobile-hud-bottom-row">
              ${isPointsMode ? `
                <div class="mobile-hud-scores" style="display: flex; align-items: center; justify-content: space-between; width: 100%; font-family: var(--font-header);">
                  <div class="mobile-score-box" style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                    <span class="score-lbl" style="font-size: 0.75rem; opacity: 0.7;">PLAYER</span>
                    <span class="score-val" style="font-size: 1.5rem; font-weight: bold; color: var(--color-gold);">${battle.playerScore || 0}</span>
                  </div>
                  <div class="mobile-score-vs" style="font-size: 0.9rem; opacity: 0.5; padding: 0 10px;">VS</div>
                  <div class="mobile-score-box" style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                    <span class="score-lbl" style="font-size: 0.75rem; opacity: 0.7;">ENEMY</span>
                    <span class="score-val" style="font-size: 1.5rem; font-weight: bold; color: var(--color-red);">${battle.enemyScore || 0}</span>
                  </div>
                  <div class="mobile-score-round" style="display: flex; flex-direction: column; align-items: flex-end; padding-left: 10px; border-left: 1px solid rgba(255,255,255,0.15); margin-left: 10px; font-size: 0.95rem;">
                    <span>RD ${battle.turn}/${battle.maxRounds || 3}</span>
                    ${battle.isSuddenDeath ? '<span class="sd-tag pulse-fast" style="color: var(--color-red); font-size: 0.7rem; font-weight: bold; letter-spacing: 0.5px;">SUDDEN DEATH</span>' : ''}
                  </div>
                </div>
              ` : `
                <div class="mobile-hud-hp-bars" style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
                  <div class="mobile-hp-bar-item" style="display: flex; align-items: center; gap: 8px;">
                    <span class="hp-bar-lbl" style="font-family: var(--font-header); font-size: 0.85rem; width: 50px; text-align: left; color: #ecdec0;">HP:</span>
                    <div class="bar-container player-hp-bar-container" style="flex: 1; height: 14px; position: relative;">
                      <div class="bar hp-bar" style="width: ${(state.hp / state.maxHp) * 100}%; height: 100%; background: var(--color-red);"></div>
                      <span class="bar-text" style="font-size: 9px; line-height: 14px;">${state.hp} / ${state.maxHp}</span>
                    </div>
                  </div>
                  <div class="mobile-hp-bar-item" style="display: flex; align-items: center; gap: 8px;">
                    <span class="hp-bar-lbl" style="font-family: var(--font-header); font-size: 0.85rem; width: 50px; text-align: left; color: #ffaa00;">ENEMY:</span>
                    <div class="bar-container enemy-hp-bar-container" style="flex: 1; height: 14px; position: relative;">
                      <div class="bar hp-bar" style="width: ${(battle.enemy.hp / battle.enemy.maxHp) * 100}%; height: 100%; background: #420a06; border: 1px solid var(--color-red);"></div>
                      <span class="bar-text" style="font-size: 9px; line-height: 14px;">${battle.enemy.hp} / ${battle.enemy.maxHp}</span>
                    </div>
                  </div>
                </div>
              `}
            </div>
          </div>
        `;
        
        // Bind combined mobile HUD buttons to trigger hidden desktop buttons
        enemyHud.querySelector('#mobile-hud-settings-btn')?.addEventListener('click', () => {
          this.root.querySelector('#hud-settings-btn')?.dispatchEvent(new Event('click'));
        });
        enemyHud.querySelector('#mobile-hud-abandon-btn')?.addEventListener('click', () => {
          this.root.querySelector('#hud-abandon-btn')?.dispatchEvent(new Event('click'));
        });
        enemyHud.querySelector('#mobile-hud-dev-btn')?.addEventListener('click', () => {
          this.root.querySelector('#dev-tools-btn')?.dispatchEvent(new Event('click'));
        });
      } else {
        // Desktop Layout Scoreboard or HP
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
              ${battle.curse ? `
                <div class="curse-box" style="margin-top: 10px; padding: 6px 10px; border: 1.5px solid var(--color-gold); background: rgba(18, 11, 8, 0.6); border-radius: 4px; display: flex; align-items: center; gap: 10px; text-align: left; font-family: var(--font-header);">
                  <span style="font-size: 1.5rem;">${battle.curse.icon}</span>
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 0.95rem; font-weight: bold; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.5px;">${battle.curse.name}</span>
                    <span style="font-size: 0.75rem; color: #ece0d8; opacity: 0.9; line-height: 1.3;">${battle.curse.description}</span>
                  </div>
                </div>
              ` : ''}
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
            ${battle.curse ? `
              <div class="curse-box" style="margin-top: 10px; padding: 6px 10px; border: 1.5px solid var(--color-gold); background: rgba(18, 11, 8, 0.6); border-radius: 4px; display: flex; align-items: center; gap: 10px; text-align: left; font-family: var(--font-header);">
                <span style="font-size: 1.5rem;">${battle.curse.icon}</span>
                <div style="display: flex; flex-direction: column;">
                  <span style="font-size: 0.95rem; font-weight: bold; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.5px;">${battle.curse.name}</span>
                  <span style="font-size: 0.75rem; color: #ece0d8; opacity: 0.9; line-height: 1.3;">${battle.curse.description}</span>
                </div>
              </div>
            ` : ''}
          `;
        }
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
      
      const maxHandSize = battle.curse?.id === 'choked' ? 5 : 8;
      const canDraw = battle.chipsPool >= cost && 
                      battle.phase === 'betting' && 
                      !this.isSpinning && 
                      (battle.drawPile.length > 0 || battle.discardPile.length > 0) && 
                      battle.hand.length < maxHandSize &&
                      this.currentView !== 4;
      drawCardBtn.disabled = !canDraw;
    }

    // Mobile Action Bar updates (if mobile mode active)
    const mobileDrawCount = this.root.querySelector('#mobile-draw-count') as HTMLElement;
    const mobileDiscCount = this.root.querySelector('#mobile-disc-count') as HTMLElement;
    if (mobileDrawCount) mobileDrawCount.innerText = `${battle.drawPile.length}`;
    if (mobileDiscCount) mobileDiscCount.innerText = `${battle.discardPile.length}`;

    const mobileEssenceVal = this.root.querySelector('#mobile-essence-val') as HTMLElement;
    if (mobileEssenceVal) {
      mobileEssenceVal.innerText = `${battle.chipsPool} ⚡`;
    }



    // Re-render HTML betting board number grid dynamically based on player wheel configuration
    const numGridContainer = this.root.querySelector('.number-grid-container') as HTMLElement;
    if (numGridContainer && battle.playerWheel) {
      const activeWheel = battle.playerWheel;
      const greenNums = activeWheel.greenNumbers;
      const otherNums = activeWheel.numbers.filter(n => !greenNums.includes(n)).sort((a, b) => a - b);
      
      const predictionSector = battle.predictionSector || [];
      const goldFoils = battle.boardModifiers.goldFoils || [];
      const copperPlates = battle.boardModifiers.copperPlates || [];
      
      let gridHtml = '';
      // Render green numbers
      greenNums.forEach(num => {
        const isPredicted = predictionSector.includes(num) ? ' predicted' : '';
        const isGoldFoil = goldFoils.includes(num) ? ' gold-foil' : '';
        const isCopperPlate = copperPlates.includes(num) ? ' copper-plate' : '';
        gridHtml += `<div class="num-cell num-green${isPredicted}${isGoldFoil}${isCopperPlate}" data-num="${num}">${num}</div>`;
      });
      // Render standard numbers
      otherNums.forEach(num => {
        const color = getSlotColor(num, activeWheel, battle.boardModifiers);
        const isPredicted = predictionSector.includes(num) ? ' predicted' : '';
        const isGoldFoil = goldFoils.includes(num) ? ' gold-foil' : '';
        const isCopperPlate = copperPlates.includes(num) ? ' copper-plate' : '';
        gridHtml += `<div class="num-cell num-${color}${isPredicted}${isGoldFoil}${isCopperPlate}" data-num="${num}">${num}</div>`;
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
          <div class="active-bet-item" style="display: flex; justify-content: space-between; align-items: center; padding: 4px 8px; margin-bottom: 4px; background: rgba(255,255,255,0.03); border-radius: 4px;">
            <span>${label}: <span class="text-gold">${bet.amount} ⚡</span></span>
            <button class="remove-bet-btn" data-type="${bet.type}" ${bet.numberValue !== undefined ? `data-num="${bet.numberValue}"` : ''} style="background: none; border: none; color: #ff5252; font-size: 14px; font-weight: bold; cursor: pointer; padding: 0 4px; display: inline-block;">×</button>
          </div>
        `;
      }).join('');

      // Add click listeners to remove buttons
      const removeBtns = betsListEl.querySelectorAll('.remove-bet-btn');
      removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const type = btn.getAttribute('data-type')!;
          const numAttr = btn.getAttribute('data-num');
          const numberValue = numAttr !== null ? parseInt(numAttr) : undefined;
          
          this.sound.playCardSwoosh();
          this.engine.removeBet(type, numberValue);
          this.render();
        });
      });
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

    this.updateEnemyAIDecisionDev();
  }

  private showCombatIntroOverlay(battle: any) {
    this.isCombatIntroActive = true;

    // Determine tier tag
    let tierTag = 'Normal Combat';
    if (battle.encounterType === 'boss') {
      tierTag = 'Boss Combat';
    } else if (battle.encounterType === 'elite') {
      tierTag = 'Elite Combat';
    }

    // Select random flavor quote
    let quotes: string[] = [];
    const sprite = battle.enemy.spriteName;
    if (sprite === 'decay_wheel') {
      quotes = [
        "A creaking, rusted construct spins before you. The stench of dry rot and oil fills the air.",
        "It rattles and spins, seeking to grind your bones into dust."
      ];
    } else if (sprite === 'croupier') {
      quotes = [
        "The dealer slides a decaying, skeletal hand across the felt. 'Place your bets, mortal...'",
        "'The House always has another seat for a soul like yours...'"
      ];
    } else if (sprite === 'wraith') {
      quotes = [
        "A crimson mist coalesces into a howling phantom. The table felt runs cold.",
        "The smell of iron and copper rises. It hungers for your life-blood."
      ];
    } else if (sprite === 'dealer_claw') {
      quotes = [
        "A massive, mechanical hand made of gold and wire drops from the ceiling! 'Hand over your sanity, gambler!'",
        "The gears grind. The Claw points at you. The stakes are raised!"
      ];
    } else if (sprite === 'the_house') {
      quotes = [
        "The Tavern walls shake. The ceiling splits open. A giant, glowing red mask descends. 'I am the House, and I NEVER LOSE.'",
        "A voice like grinding stone echoes: 'You broke my wheels... now I will break your skull.'"
      ];
    } else {
      quotes = [
        "A dark presence looms before you. The air grows cold and thick.",
        "The table is set. The stakes are your very soul."
      ];
    }
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // Create the overlay container
    const overlay = document.createElement('div');
    overlay.id = 'combat-intro-overlay';
    
    // Add css styles
    const styleId = 'combat-intro-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #combat-intro-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(10, 5, 3, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          font-family: 'VT323', monospace;
          color: #c59f51;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
          animation: introFadeIn 0.4s ease-out forwards;
        }
        #combat-intro-overlay.fade-out {
          animation: introFadeOut 0.4s ease-in forwards;
        }
        .intro-content {
          max-width: 600px;
          transform: scale(0.8);
          animation: introScaleUp 0.4s ease-out forwards;
        }
        .intro-tier {
          font-size: 1.5rem;
          letter-spacing: 4px;
          color: #ff3333;
          text-transform: uppercase;
          margin-bottom: 10px;
          text-shadow: 0 0 10px rgba(255, 51, 51, 0.5);
        }
        .intro-name {
          font-size: 4rem;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 20px;
          letter-spacing: 2px;
          text-shadow: 0 0 20px rgba(197, 159, 81, 0.6);
        }
        .intro-quote {
          font-size: 1.6rem;
          line-height: 1.4;
          font-style: italic;
          color: #ece0d8;
          border-top: 1px solid rgba(197, 159, 81, 0.3);
          border-bottom: 1px solid rgba(197, 159, 81, 0.3);
          padding: 15px 0;
          margin-top: 20px;
        }
        @keyframes introFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes introFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes introScaleUp {
          from { transform: scale(0.8); }
          to { transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }

    overlay.innerHTML = `
      <div class="intro-content">
        <div class="intro-tier">${tierTag}</div>
        <div class="intro-name">${battle.enemy.name}</div>
        <div class="intro-quote">"${quote}"</div>
        <div style="font-size: 1.1rem; color: rgba(197, 159, 81, 0.7); margin-top: 25px; letter-spacing: 2px; text-transform: uppercase;">[ Click anywhere to continue ]</div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      overlay.classList.add('fade-out');
      this.isCombatIntroActive = false;

      if (this.renderer) {
        const cost = this.engine.getDrawCardCost();
        const canDraw = battle ? (
          battle.chipsPool >= cost && 
          battle.phase === 'betting' && 
          !this.isSpinning && 
          (battle.drawPile.length > 0 || battle.discardPile.length > 0) && 
          battle.hand.length < 8
        ) : false;

        if (battle && battle.drawsThisTurn === 0 && canDraw) {
          this.renderer.manualView = 9;
          this.renderer.hasFocusedDeckThisTurn = true;
        } else {
          this.renderer.manualView = 1;
        }
      }

      setTimeout(() => {
        overlay.remove();
      }, 400);
    });
  }

  private calculateMoveEV(intent: any, battleState: any): number {
    const chipPool = battleState.chipsPool || 0;
    const round = battleState.turn || 1;
    
    if (intent.type === 'attack') {
      const dmgValue = intent.value || 0;
      let ev = Math.max(0.5, dmgValue);
      ev = ev * (1 + round * 0.08);
      return parseFloat(ev.toFixed(2));
    } else if (intent.type === 'steal_chips') {
      const stealVal = intent.value || 0;
      const actualSteal = Math.min(stealVal, chipPool);
      let ev = actualSteal * 1.5 + 1.0;
      const maxRounds = battleState.maxRounds || 3;
      ev = ev * (1 + Math.max(0, maxRounds - round) * 0.1);
      return parseFloat(ev.toFixed(2));
    } else if (intent.type === 'physics_debuff') {
      let ev = 4.0 + chipPool * 0.2 + round * 0.4;
      return parseFloat(ev.toFixed(2));
    }
    return 1.0;
  }

  private getEnemyPatterns(spriteName: string): any[] {
    if (spriteName === 'decay_wheel') {
      return [
        { type: 'attack', value: 4, description: 'Spin slam (4 damage)' },
        { type: 'physics_debuff', value: 0, description: 'Rusting Gaze (Doubles friction next turn)' },
        { type: 'attack', value: 8, description: 'Heavy Slam (8 damage)' },
        { type: 'attack', value: 5, description: 'Grinding edge (5 damage)' }
      ];
    } else if (spriteName === 'croupier') {
      return [
        { type: 'steal_chips', value: 4, description: 'Rake chips (Steals 4 chips)' },
        { type: 'attack', value: 6, description: 'Card slice (6 damage)' },
        { type: 'attack', value: 8, description: 'Cold gaze (8 damage)' },
        { type: 'steal_chips', value: 3, description: 'Taxation (Steals 3 chips)' }
      ];
    } else if (spriteName === 'wraith') {
      return [
        { type: 'attack', value: 5, description: 'Shriek (5 damage)' },
        { type: 'attack', value: 10, description: 'Soul drain (10 damage)' },
        { type: 'attack', value: 5, description: 'Essence siphon (5 damage)' },
        { type: 'attack', value: 12, description: 'Nightmare strike (12 damage)' }
      ];
    } else if (spriteName === 'dealer_claw') {
      return [
        { type: 'attack', value: 9, description: 'Crush (9 damage)' },
        { type: 'steal_chips', value: 6, description: 'Greedy clutch (Steals 6 chips)' },
        { type: 'attack', value: 15, description: 'Guillotine (15 damage)' },
        { type: 'attack', value: 10, description: 'Rend (10 damage)' }
      ];
    } else if (spriteName === 'the_house') {
      return [
        { type: 'attack', value: 12, description: 'Roof collapse (12 damage)' },
        { type: 'steal_chips', value: 8, description: 'Bankruptcy (Steals 8 chips)' },
        { type: 'attack', value: 20, description: 'Crushing Debt (20 damage)' },
        { type: 'physics_debuff', value: 0, description: 'Earthquake (Doubles friction next turn)' }
      ];
    } else {
      return [
        { type: 'attack', value: 5, description: 'Slash (5 damage)' },
        { type: 'attack', value: 7, description: 'Gamble slash (7 damage)' },
        { type: 'attack', value: 4, description: 'Weak poke (4 damage)' },
        { type: 'attack', value: 8, description: 'Heavy smash (8 damage)' }
      ];
    }
  }

  private updateEnemyAIDecisionDev() {
    const battle = this.engine.battleState;
    const contentEl = this.root.querySelector('#dev-enemy-decision-content');
    if (!contentEl) return;

    if (!battle) {
      contentEl.innerHTML = 'Active combat required.';
      return;
    }

    const enemy = battle.enemy;
    
    // Run simulation to make sure we have data
    const sim = this.engine.simulateEnemyPlay();
    const hand = sim.hand;
    const allPlays = sim.allPlays;
    
    // Retrieve selected play (optimal choice)
    const selectedPlay = (enemy as any).lastChosenPlay || allPlays[0];

    const themeCards: string[] = [];
    if (enemy.spriteName === 'wraith') {
      themeCards.push('crimson_double', 'dark_fury', 'attraction_coil', 'repulsion_coil');
    } else if (enemy.spriteName === 'croupier') {
      themeCards.push('green_greed', 'steel_barricade', 'scrap_shield');
    } else if (enemy.spriteName === 'decay_wheel') {
      themeCards.push('friction_oil', 'focus_sight');
    } else if (enemy.isBoss) {
      themeCards.push('crimson_double', 'dark_fury', 'green_greed', 'predictive_sight', 'eagle_eye', 'fortress_shield');
    } else if (enemy.isElite) {
      themeCards.push('predictive_sight', 'steel_barricade', 'attraction_coil', 'repulsion_coil');
    } else {
      themeCards.push('scrap_shield', 'focus_sight');
    }

    const deckNames = themeCards.map(id => {
      const card = CARD_DATABASE[id];
      return card ? card.name : id;
    });

    const currentChips = this.engine.battleState?.activeWheelOwner === 'enemy' ? this.engine.battleState.chipsPool : 10;
    const chipsPerTurn = this.engine.battleState?.curse?.id === 'greed' ? 5 : 10;

    let html = '';
    html += '<div style="margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.15); font-size: 10px; line-height: 1.4;">';
    html += `<div><strong>Enemy Name:</strong> ${enemy.name}</div>`;
    html += `<div><strong>Available Chips:</strong> ${currentChips} 🪙</div>`;
    html += `<div><strong>Chips per Turn:</strong> ${chipsPerTurn} 🪙</div>`;
    html += `<div><strong>Deck Pool:</strong> ${deckNames.join(', ')}</div>`;
    html += '</div>';
    
    // 1. Display Current Simulated Hand
    html += '<div style="margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.15);">';
    html += '<strong>Simulated Hand:</strong> ';
    if (!hand || hand.length === 0) {
      html += '<span style="color: #888; font-style: italic;">No cards</span>';
    } else {
      html += hand.map(c => `<span class="dev-card-badge" style="background: #3e2723; padding: 2px 5px; border-radius: 3px; font-size: 10px; color: #ffca28; margin-right: 4px;">${c.name}</span>`).join(' ');
    }
    html += '</div>';

    // 2. Display EV Calculations for potential placements
    html += '<div style="margin-bottom: 6px;"><strong>Potential Placements & EV (Top 6):</strong></div>';
    html += '<div style="display: flex; flex-direction: column; gap: 4px; max-height: 120px; overflow-y: auto; padding-right: 4px; margin-bottom: 8px;">';
    
    const topPlays = allPlays.slice(0, 6);
    topPlays.forEach((play) => {
      const cardName = play.card ? play.card.name : 'None';
      let betDesc = play.betType.toUpperCase();
      if (play.betType === 'number') {
        betDesc = `Number ${play.numberValue}`;
      }
      
      let style = 'padding: 3px 6px; border-radius: 3px; background: rgba(255,255,255,0.03); font-size: 10px;';
      let chosenBadge = '';
      if (selectedPlay && selectedPlay.card === play.card && selectedPlay.betType === play.betType && selectedPlay.numberValue === play.numberValue) {
        style = 'padding: 3px 6px; border-radius: 3px; background: rgba(100, 221, 23, 0.1); border-left: 2px solid #64dd17;';
        chosenBadge = ' <span style="color: #64dd17; font-weight: bold;">[SELECTED]</span>';
      }
      
      html += `
        <div style="${style}">
          <div><strong>Play:</strong> ${cardName} + ${betDesc} ${chosenBadge}</div>
          <div style="color: #ffaa00; margin-top: 1px;">EV Score: <span style="color: #fff; font-weight: bold;">${play.score.toFixed(2)}</span></div>
        </div>
      `;
    });
    html += '</div>';

    // 3. Display Pattern Intent loop as well
    html += '<div style="padding-top: 6px; border-top: 1px dashed rgba(255,255,255,0.15);">';
    html += '<strong>Intent Pattern Loop:</strong>';
    const patterns = this.getEnemyPatterns(enemy.spriteName);
    const currentIdx = enemy.patternIndex;
    const prevIdx = (currentIdx - 1 + 4) % 4;

    html += '<div style="margin-top: 4px; display: flex; flex-direction: column; gap: 3px;">';
    patterns.forEach((pattern, idx) => {
      const ev = this.calculateMoveEV(pattern, battle);
      let badge = '';
      let style = 'font-size: 10px;';
      if (idx === currentIdx) {
        badge = ' <span style="color: #64dd17; font-weight: bold;">[ACTIVE]</span>';
        style += ' border-left: 2px solid #64dd17; padding-left: 4px; background: rgba(100, 221, 23, 0.05);';
      } else if (idx === prevIdx) {
        badge = ' <span style="color: #ffaa00;">[PREV]</span>';
        style += ' border-left: 2px solid #ffaa00; padding-left: 4px; background: rgba(255, 170, 0, 0.05);';
      }
      
      html += `
        <div style="${style}">
          <strong>Move ${idx + 1}:</strong> ${pattern.description} ${badge}
          <span style="color: #ffaa00; margin-left: 6px;">EV: ${ev}</span>
        </div>
      `;
    });
    html += '</div></div>';

    contentEl.innerHTML = html;
  }

  private updateSoundVisualizerDev() {
    const contentEl = this.root.querySelector('#dev-sound-visualizer-content');
    if (!contentEl) return;

    const panel = this.root.querySelector('#dev-tools-panel');
    if (!panel || panel.classList.contains('hidden')) return;

    const diag = this.sound.getAudioDiagnostics();
    
    const makeBar = (val: number) => {
      const bars = Math.round(val * 10);
      return '[' + '='.repeat(Math.max(0, Math.min(10, bars))) + ' '.repeat(Math.max(0, Math.min(10, 10 - bars))) + ']';
    };

    let html = `<div><strong>MUSIC TYPE:</strong> ${diag.currentMusicType ? diag.currentMusicType.toUpperCase() : 'STOPPED'}</div>`;
    
    if (diag.isTitleMusicPlaying) {
      html += `<div style="margin-top: 4px;"><strong>TITLE STEMS STATE:</strong></div>`;
      html += `<div>Loop Count: ${diag.titleLoopCount}</div>`;
      html += `<div>Active Level: ${diag.titleActiveLevel} / 4</div>`;
      html += `<div>Direction: ${diag.titleLayersDirection.toUpperCase()}</div>`;
      html += `<div style="margin-top: 4px;"><strong>STEM VOLUMES:</strong></div>`;
      
      const layerNames = ["Bass/Groove", "Synth Pads", "Percussion", "Melody Lead"];
      for (let i = 0; i < 4; i++) {
        const vol = diag.layerVolumes[i] || 0;
        const relativeVol = diag.masterMusicVolume > 0 ? (vol / diag.masterMusicVolume) : 0;
        const percent = Math.round(relativeVol * 100);
        html += `<div style="font-size: 10px;">L${i+1} (${layerNames[i]}): ${makeBar(relativeVol)} ${percent}%</div>`;
      }
    } else {
      html += `<div style="margin-top: 4px; color: #888;">Title stems not playing.</div>`;
    }

    html += `<div style="margin-top: 6px; padding-top: 4px; border-top: 1px dashed rgba(255,255,255,0.15);"><strong>MASTER VOLUMES:</strong></div>`;
    html += `<div style="font-size: 10px;">Music: ${makeBar(diag.masterMusicVolume)} ${Math.round(diag.masterMusicVolume*100)}%</div>`;
    html += `<div style="font-size: 10px;">Drone: ${makeBar(diag.masterDroneVolume)} ${Math.round(diag.masterDroneVolume*100)}%</div>`;
    html += `<div style="font-size: 10px;">SFX:   ${makeBar(diag.masterSfxVolume)} ${Math.round(diag.masterSfxVolume*100)}%</div>`;

    contentEl.innerHTML = html;
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
      const paintClass = card.type === 'paint' ? 'paint-card' : '';
      const moneyClass = card.type === 'money' ? 'money-card' : '';
      return `
        <div class="codex-card ${rarityClass} ${paintClass} ${moneyClass}">
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
