import { GameEngine } from '../core/GameEngine';
import { SoundManager } from './SoundManager';
import { Card, MapNode } from '../core/Types';
import { getSlotColor } from '../physics/RoulettePhysics';
import { CARD_DATABASE } from '../cards/CardDatabase';
import { WHEEL_TEMPLATES, BOARD_UPGRADES } from '../core/WheelUpgrades';

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
  private shopCards: { cardId: string; name: string; cost: number; desc: string }[] = [];
  private activeShopTab: 'cards' | 'upgrades' = 'cards';

  // View state tracking
  private currentView = 4;
  public onViewChanged?: (viewId: number) => void;
  private renderer: any = null;

  public setRenderer(renderer: any) {
    this.renderer = renderer;
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
            <h1 class="game-title">ROULETTE<br><span class="subtitle">OF THE DAMNED</span></h1>
            <p class="flavor-text">Gamble with your blood. Break the wheel. Escape the House.</p>
            <button id="start-run-btn" class="btn primary-btn pulse-glow">ENTER THE TAVERN</button>
          </div>

          <!-- PANEL: STARTING WHEEL SELECTION -->
          <div id="wheel-select-panel" class="panel hidden">
            <h2 class="panel-header">SELECT YOUR WHEEL</h2>
            <p class="flavor-text">Choose the wheel that will bind your blood to the table.</p>
            <div id="wheel-choices-container" class="wheel-select-grid"></div>
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
            <h2 class="panel-header text-gold">THE CROUPIER'S SHOP</h2>
            <p class="shop-welcome">"Spend your essence wisely, mortal. Or bleed for it..."</p>
            
            <!-- Shop Tabs -->
            <div class="shop-tabs-bar">
              <button id="shop-tab-cards" class="shop-tab-btn active">CARDS & HEAL</button>
              <button id="shop-tab-upgrades" class="shop-tab-btn">BOARD UPGRADES</button>
            </div>

            <!-- Tab View Panels -->
            <div id="shop-cards-view" class="shop-view-panel">
              <div id="shop-items-container" class="shop-grid"></div>
            </div>
            
            <div id="shop-upgrades-view" class="shop-view-panel hidden">
              <div id="shop-upgrades-container" class="shop-grid"></div>
            </div>

            <div class="shop-actions">
              <button id="shop-leave-btn" class="btn secondary-btn">RETURN TO PATHS</button>
            </div>
          </div>

          <!-- PANEL: EVENT -->
          <div id="event-panel" class="panel hidden">
            <h2 id="event-title" class="panel-header">A DARK ENCOUNTER</h2>
            <div class="event-body">
              <p id="event-text" class="event-narrative"></p>
              <div id="event-options" class="event-choices-list"></div>
            </div>
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

                <!-- Number Grid Bets 0-36 -->
                <div class="number-grid-label">OR BET SPECIFIC NUMBER (36x):</div>
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
              <button class="view-btn" data-view="3">WHEEL</button>
              <button class="view-btn" data-view="5">OPPONENT</button>
            </div>

            <!-- Hand Instruction HUD -->
            <div class="combat-bottom-hud">
              <span class="tutorial-tip">Drag chips from stack onto board to bet. Click 3D Bell to SPIN / END TURN. Press 'C' to Clear Bets. Press '1'-'4' / Arrow keys or click HUD to change camera view. Press 'D' to toggle Debug UI.</span>
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

    // Shop Tabs click handlers
    const tabCards = this.root.querySelector('#shop-tab-cards');
    const tabUpgrades = this.root.querySelector('#shop-tab-upgrades');
    tabCards?.addEventListener('click', () => {
      if (this.activeShopTab === 'cards') return;
      this.sound.playDraw();
      this.activeShopTab = 'cards';
      this.render();
    });
    tabUpgrades?.addEventListener('click', () => {
      if (this.activeShopTab === 'upgrades') return;
      this.sound.playDraw();
      this.activeShopTab = 'upgrades';
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
        const type = btn.getAttribute('data-type') as 'red' | 'black' | 'green' | 'odd' | 'even';
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

      // Switch views on '1' - '5'
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        this.setCurrentView(parseInt(e.key));
      }

      // Arrow keys navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        let nextView = this.currentView;
        if (e.key === 'ArrowRight') {
          nextView = (this.currentView % 5) + 1;
        } else {
          nextView = this.currentView - 1;
          if (nextView < 1) nextView = 5;
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

      if (!this.engine.battleState) {
        this.render();
        return;
      }

      if (!this.isEnemyResolutionReport) {
        // Player spin continue
        if (this.engine.battleState.enemy.hp <= 0) {
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

  private placeEngineBet(type: 'red' | 'black' | 'green' | 'number' | 'odd' | 'even', amount: number, numberValue?: number) {
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
    
    // Explicitly transition to Wheel view (3) when spinning starts!
    this.setCurrentView(3);

    this.isSpinning = true;
    this.showTurnEnd = false;
    this.spinMessage = isEnemySpin ? 'ENEMY WHEEL IS SPINNING...' : 'THE WHEEL IS SPINNING...';
    this.render();
    
    // Trigger physics engine spin
    this.engine.spinWheel();
    
    // Play spinning click loop synthesized
    const playClick = () => {
      if (!this.isSpinning) return;
      
      const velocity = Math.abs(this.engine.physics.ballOmega - this.engine.physics.wheelOmega);
      if (velocity < 0.2) {
        return;
      }
      
      this.sound.playRouletteClick(0.6 + velocity * 0.1);
      const delay = Math.max(30, 400 / velocity);
      setTimeout(playClick, delay);
    };
    
    setTimeout(playClick, 100);

    // Continuous physics step simulations
    const interval = setInterval(() => {
      this.engine.physics.update(0.016); // 60 FPS steps
      
      if (this.engine.physics.isSettled) {
        clearInterval(interval);
        if (isEnemySpin) {
          this.resolveEnemySpinOutcome();
        } else {
          this.resolveSpinOutcome();
        }
      }
    }, 16);
  }

  private resolveSpinOutcome() {
    this.engine.resolveSpin();
    
    const res = this.engine.battleState?.lastSpinResult;
    if (!res) return;

    this.isSpinning = false;
    this.sound.playDamageDealt();

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

    // Set active wheel owner to enemy so camera, physics, and board update correctly
    battle.activeWheelOwner = 'enemy';
    this.render();

    // 1. Move camera to view 5 (Cinematic opponent diagonal view)
    this.setCurrentView(5);

    // 2. Decide enemy bet (RED or BLACK)
    const possibleBets = ['red', 'black'];
    if (battle.enemy.isBoss && Math.random() < 0.15) possibleBets.push('green');
    const enemyBetType = possibleBets[Math.floor(Math.random() * possibleBets.length)];

    // 3. Pause for 1.0 second to let the camera settle so the player sees the opponent
    setTimeout(() => {
      if (!this.engine.battleState) return;

      // 4. Play opponent card and bet animation in 3D scene (duration = 3.5s)
      if (this.renderer) {
        this.renderer.playOpponentActionAnimation(battle.enemy.intent, enemyBetType);
      }

      // 5. Wait for visual animation to complete (3.5s) + extra pause (1.5s) = 5.0 seconds
      setTimeout(() => {
        if (!this.engine.battleState) return;

        // 6. Move camera to view 3 (Wheel view)
        this.setCurrentView(3);

        // 7. Wait for camera to settle (1.0 second) before spinning
        setTimeout(() => {
          if (!this.engine.battleState) return;

          // 8. Set enemy's bet in engine state
          const amount = Math.max(1, battle.enemy.intent.value);
          battle.bets = [{ type: enemyBetType as any, amount }];
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

    const colorText = res.color.toUpperCase();
    const outcomeText = `${res.number} ${colorText}`;
    
    if (res.playerDamageTaken > 0) {
      this.spinMessage = `ENEMY LANDED ON: ${outcomeText}! <br><span class="text-red">HIT! YOU TAKE ${res.playerDamageTaken} DAMAGE!</span>`;
    } else {
      const intent = this.engine.battleState?.enemy.intent;
      if (intent && intent.type === 'steal_chips') {
        this.spinMessage = `ENEMY LANDED ON: ${outcomeText}! <br><span class="text-red">STEAL! THEY STOLE ${intent.value} CHIPS!</span>`;
      } else if (intent && intent.type === 'physics_debuff') {
        this.spinMessage = `ENEMY LANDED ON: ${outcomeText}! <br><span class="text-red">DEBUFF! WHEEL FRICTION DOUBLED!</span>`;
      } else {
        this.spinMessage = `ENEMY LANDED ON: ${outcomeText}. <br><span class="text-green">MISS! NO DAMAGE TAKEN.</span>`;
      }
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
    if (!isEnemy) {
      if (res.damageDealt > 0) {
        summary.innerHTML = `<span class="text-green" style="font-size: 22px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.4);">HIT! YOU DEALT ${res.damageDealt} DAMAGE!</span>`;
      } else {
        summary.innerHTML = `<span class="text-red" style="font-size: 18px;">MISS! NO DAMAGE DEALT.</span>`;
      }
    } else {
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
          const isGreenSlot = activeWheel.greenNumbers.includes(res.number) || (res.number === 32 && battle.boardModifiers.extraGreenSlots > 0);
          if (isGreenSlot) { isWin = true; mult = activeWheel.payoutMultipliers.green; }
        }
        else if (bet.type === 'number' && bet.numberValue === res.number) { isWin = true; mult = activeWheel.payoutMultipliers.number; }
        else if (bet.type === 'odd' && !activeWheel.greenNumbers.includes(res.number) && res.number % 2 !== 0) { isWin = true; mult = activeWheel.payoutMultipliers.odd; }
        else if (bet.type === 'even' && !activeWheel.greenNumbers.includes(res.number) && res.number % 2 === 0) { isWin = true; mult = activeWheel.payoutMultipliers.even; }

        if (isWin) {
          const payoutVal = bet.amount * mult;
          const targetText = !isEnemy ? `DEALT ${payoutVal} DMG` : `TOOK ${payoutVal} DMG`;
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

    // Toggle main screens
    this.togglePanel('menu-panel', state.gameState === 'MENU');
    this.togglePanel('wheel-select-panel', state.gameState === 'WHEEL_SELECT');
    this.togglePanel('map-panel', state.gameState === 'MAP');
    this.togglePanel('shop-panel', state.gameState === 'SHOP');
    this.togglePanel('event-panel', state.gameState === 'EVENT');
    this.togglePanel('gameover-panel', state.gameState === 'GAME_OVER');
    this.togglePanel('victory-panel', state.gameState === 'VICTORY');
    
    // Toggle overlays
    this.togglePanel('hud-panel', state.gameState !== 'MENU' && state.gameState !== 'WHEEL_SELECT' && state.gameState !== 'GAME_OVER' && state.gameState !== 'VICTORY');
    this.togglePanel('combat-ui', state.gameState === 'COMBAT');
    
    // Update Top HUD
    if (state.gameState !== 'MENU' && state.gameState !== 'WHEEL_SELECT') {
      const hpPercent = (state.hp / state.maxHp) * 100;
      const hpBar = this.root.querySelector('#hud-hp-bar') as HTMLElement;
      const hpText = this.root.querySelector('#hud-hp-text') as HTMLElement;
      const chipsText = this.root.querySelector('#hud-chips-text') as HTMLElement;
      const floorText = this.root.querySelector('#hud-floor-text') as HTMLElement;
      
      if (hpBar) hpBar.style.width = `${hpPercent}%`;
      if (hpText) hpText.innerText = `${state.hp} / ${state.maxHp}`;
      if (chipsText) chipsText.innerText = `${state.chips} ⚡`;
      if (floorText) floorText.innerText = `${state.currentFloor + 1} / 7`;
    }

    // Handle Wheel Selection Panel Rendering
    if (state.gameState === 'WHEEL_SELECT') {
      this.renderWheelSelect();
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
          boss: '👑'
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
  }

  private renderShopCards() {
    const container = this.root.querySelector('#shop-items-container')!;
    const state = this.engine.runState;

    // Populate random cards if empty for this shop visit
    if (this.shopCards.length === 0) {
      const keys = Object.keys(CARD_DATABASE);
      // Select 3 random cards to sell
      for (let i = 0; i < 3; i++) {
        const key = keys[Math.floor(Math.random() * keys.length)];
        const cardDef = CARD_DATABASE[key];
        const cost = 12 + Math.floor(Math.random() * 8); // e.g. 12-20 chips
        this.shopCards.push({
          cardId: key,
          name: cardDef.name,
          cost,
          desc: cardDef.description
        });
      }
    }

    let html = '';

    // Render Cards in Shop
    this.shopCards.forEach((item, index) => {
      const canAfford = state.chips >= item.cost;
      html += `
        <div class="shop-card-item glass-panel">
          <div class="card-title">${item.name}</div>
          <div class="card-desc">${item.desc}</div>
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
        <div class="card-desc">Transfuse essence back into your veins. Heals 25 HP.</div>
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
  }

  private renderShopUpgrades() {
    const container = this.root.querySelector('#shop-upgrades-container')!;
    if (!container) return;

    const state = this.engine.runState;
    const playerWheel = state.playerWheel;
    
    let html = '';
    
    Object.keys(BOARD_UPGRADES).forEach(key => {
      const upgrade = BOARD_UPGRADES[key];
      const isOwned = playerWheel.upgrades.includes(key);
      const canAfford = state.chips >= upgrade.cost;
      
      html += `
        <div class="shop-card-item glass-panel">
          <div class="card-title">${upgrade.name}</div>
          <div class="card-desc">${upgrade.description}</div>
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
  }

  private renderWheelSelect() {
    const container = this.root.querySelector('#wheel-choices-container')!;
    if (!container) return;
    
    let html = '';
    
    Object.keys(WHEEL_TEMPLATES).forEach(key => {
      const wheel = WHEEL_TEMPLATES[key];
      
      // Compute display stats
      const totalSlots = wheel.numbers.length;
      const greenSlots = wheel.greenNumbers.length;
      const redSlots = wheel.numbers.filter(num => wheel.colors[num] === 'red').length;
      const blackSlots = wheel.numbers.filter(num => wheel.colors[num] === 'black').length;
      
      html += `
        <div class="wheel-select-card glass-panel" data-id="${key}">
          <div class="wheel-name">${wheel.name}</div>
          <div class="wheel-desc">${wheel.description}</div>
          <div class="wheel-stats">
            <div><strong>TOTAL SLOTS:</strong> ${totalSlots}</div>
            <div><strong>GREEN SLOTS:</strong> ${greenSlots}</div>
            <div><strong>RED SLOTS:</strong> ${redSlots}</div>
            <div><strong>BLACK SLOTS:</strong> ${blackSlots}</div>
            <div style="margin-top: 8px;"><strong>PAYOUTS:</strong></div>
            <div>Red/Black: ${wheel.payoutMultipliers.red}x / ${wheel.payoutMultipliers.black}x</div>
            <div>Green: ${wheel.payoutMultipliers.green}x</div>
          </div>
          <button class="btn primary-btn select-wheel-btn" data-id="${key}">
            CHOOSE WHEEL
          </button>
        </div>
      `;
    });
    
    container.innerHTML = html;
    
    // Bind click events on the button and the card
    const selectCards = container.querySelectorAll('.wheel-select-card');
    selectCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id')!;
        this.sound.playDraw();
        this.engine.selectStartingWheel(id);
        this.render();
      });
    });
  }

  // Event Panel Generator (Text choices)
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
        this.sound.playDraw();

        if (choice === '1') {
          state.hp = Math.max(1, state.hp - 8);
          state.chips += 25;
        } else if (choice === '2') {
          // Add Magnet
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
      });
    });
  }

  // Combat State Panel Generator
  private renderCombat() {
    const battle = this.engine.battleState;
    if (!battle) return;

    // Update Enemy details
    const enemyName = this.root.querySelector('#enemy-name') as HTMLElement;
    const enemyHpBar = this.root.querySelector('#enemy-hp-bar') as HTMLElement;
    const enemyHpText = this.root.querySelector('#enemy-hp-text') as HTMLElement;
    const enemyIntentText = this.root.querySelector('#enemy-intent-text') as HTMLElement;

    if (enemyName) enemyName.innerText = battle.enemy.name;
    if (enemyHpBar) enemyHpBar.style.width = `${(battle.enemy.hp / battle.enemy.maxHp) * 100}%`;
    if (enemyHpText) enemyHpText.innerText = `${battle.enemy.hp} / ${battle.enemy.maxHp}`;
    if (enemyIntentText) enemyIntentText.innerText = battle.enemy.intent.description;

    // Update chips display
    const turnChipsVal = this.root.querySelector('#turn-chips-value') as HTMLElement;
    if (turnChipsVal) turnChipsVal.innerText = `${battle.chipsPool} ⚡`;

    // Re-render HTML betting board number grid dynamically based on player wheel configuration
    const numGridContainer = this.root.querySelector('.number-grid-container') as HTMLElement;
    if (numGridContainer && battle.playerWheel) {
      const activeWheel = battle.playerWheel;
      const greenNums = activeWheel.greenNumbers;
      const otherNums = activeWheel.numbers.filter(n => !greenNums.includes(n)).sort((a, b) => a - b);
      
      let gridHtml = '';
      // Render green numbers
      greenNums.forEach(num => {
        gridHtml += `<div class="num-cell num-green" data-num="${num}">${num}</div>`;
      });
      // Render standard numbers
      otherNums.forEach(num => {
        const color = getSlotColor(num, activeWheel, battle.boardModifiers);
        gridHtml += `<div class="num-cell num-${color}" data-num="${num}">${num}</div>`;
      });
      
      numGridContainer.innerHTML = gridHtml;
      
      // Bind click listeners for dynamic number cells
      const numCells = numGridContainer.querySelectorAll('.num-cell');
      numCells.forEach(cell => {
        cell.addEventListener('click', () => {
          const num = parseInt(cell.getAttribute('data-num')!);
          this.placeEngineBet('number', this.currentBetAmount, num);
        });
      });
    }

    // Update category button labels with dynamic payouts
    if (battle.playerWheel) {
      const activeWheel = battle.playerWheel;
      const payouts = activeWheel.payoutMultipliers;
      
      const btnRed = this.root.querySelector('.bet-red') as HTMLElement;
      if (btnRed) btnRed.innerHTML = `RED (${payouts.red}x)`;
      
      const btnBlack = this.root.querySelector('.bet-black') as HTMLElement;
      if (btnBlack) btnBlack.innerHTML = `BLACK (${payouts.black}x)`;
      
      const btnGreen = this.root.querySelector('.bet-green') as HTMLElement;
      if (btnGreen) btnGreen.innerHTML = `GREEN (${payouts.green}x)`;
      
      const btnOdd = this.root.querySelector('.bet-odd') as HTMLElement;
      if (btnOdd) btnOdd.innerHTML = `ODD (${payouts.odd}x)`;
      
      const btnEven = this.root.querySelector('.bet-even') as HTMLElement;
      if (btnEven) btnEven.innerHTML = `EVEN (${payouts.even}x)`;
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
}
