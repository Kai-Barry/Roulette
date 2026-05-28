# Roulette.OS - Architectural Documentation & AI Developer Guide

Welcome to the documentation for **Roulette.OS**, a 3D, roulette-based roguelike deckbuilder built with TypeScript, Three.js (WebGL), and HTML/CSS overlays. This guide provides a comprehensive overview of the application's file architecture, state machines, rendering configurations, mobile mode layout mechanics, and audio synth engines.

---

## 1. Project Concept & Core Loop

Roulette.OS combines the risk-reward structure of **Roulette** with modern **Roguelike Deckbuilder** progression. Players traverse a branching path of encounters to reach a final boss.

*   **Global Run State**: Tracks player health (Blood), global chips (Essence/currency used for purchases/forge upgrades), deck loadout, relics, map node progression, and wheel slot layouts.
*   **Combat Loop**:
    1.  **Draw/Betting Phase**: The player draws cards into their hand, plays utility/physics cards, and places chips (bets) on a 3D betting felt board.
    2.  **Spinning Phase**: The player spins the wheel (ends betting). A physics-simulated ball is dropped onto a spinning custom 3D roulette wheel.
    3.  **Resolution Phase**: The ball lands on a winning number. The winning number's slot color, number value, and active bets are evaluated.
        *   In **HP/Damage Mode**: Winning bets deal damage to the enemy. Losing chips are lost. If the ball lands on a color or number associated with an enemy debuff or player buff card played, those triggers resolve. The enemy then performs their declared action (attacking the player, shielding, debuffing, etc.).
        *   In **Points Mode**: The player accumulates points matching their bet payouts over a fixed number of rounds (e.g., Best of 3/6 rounds).
    4.  **Turn Clean-up**: Discard played cards, reset transient modifiers, and start the next round until either the player's HP/points target is met or they are defeated.

---

## 2. Directory & Module File Architecture

```
d:/Game/
├── index.html                   # HTML host page structure
├── package.json                 # Project scripts and Vite configuration
├── tsconfig.json                # TypeScript settings
├── src/
│   ├── main.ts                  # Entry point: instantiates engine, UI, and renderer
│   ├── style.css                # Global styling, keyframes, and mobile layout overrides
│   ├── core/
│   │   ├── Types.ts             # All shared interfaces and state type definitions
│   │   ├── GameEngine.ts        # Primary state machine, turn manager, and progression engine
│   │   └── WheelUpgrades.ts     # Payout matrices, upgrade configurations, and loadout wheels
│   ├── cards/
│   │   ├── CardDatabase.ts      # Card definitions database (physics, board, payout, utility)
│   │   └── CardHandler.ts       # Executes card effects when drawn, played, or triggered
│   ├── map/
│   │   └── MapGenerator.ts      # Procedural path generation (Slay-the-Spire-style branching lanes)
│   ├── physics/
│   │   └── RoulettePhysics.ts   # Wheel spin physics, deceleration models, and sector lookups
│   ├── render/
│   │   └── RenderManager.ts     # Three.js rendering, lighting, camera views, 3D meshes, and raycasting
│   └── ui/
│       ├── GameUI.ts            # HTML HUD panels, menus, shop selectors, and event listeners
│       └── SoundManager.ts      # Procedural Web Audio synth sound sequencer
```

---

## 3. Module Overview

### 3.1. Main Bootstrap (`src/main.ts`)
Boots the application by instantiating the central controllers:
1.  `GameEngine`: Manages the run state, combat state, deck actions, and game rule progression.
2.  `SoundManager`: Initiates the AudioContext and synthesis pipelines.
3.  `GameUI`: Renders HTML overlays (menus, stats, overlays) and maps user event click handlers.
4.  `RenderManager`: Creates the WebGL context, setups the Three.js scene, lights, meshes, camera interpolations, and handles raw 3D click raycasting.

### 3.2. Central Types (`src/core/Types.ts`)
Defines all data structures. Key types include:
*   `GameState`: Represents screens: `MENU`, `LOADOUT_STORE`, `MAP`, `COMBAT`, `SHOP`, `EVENT`, `FORGE`, `GAME_OVER`, `VICTORY`.
*   `RunState`: Tracks player HP, max HP, global chips, deck array, active relics, floor index, and map layout.
*   `BattleState`: Active combat state tracking turn index, enemy stats, hand/draw/discard arrays, placed bets, multipliers, and phase flags (`betting`, `spinning`, `resolved`).
*   `WheelConfig`: Details a wheel's slots (numbers array, green numbers, slot colors, multipliers, and upgrades).

### 3.3. Game State Engine (`src/core/GameEngine.ts`)
The core state machine. It manages:
*   **Run Lifecycle**: `startNewRun()`, `completeStore()`, `selectNode()`, `nextFloor()`.
*   **Battle Phases**: Transitioning between player drawing, betting, wheel spinning (`spinWheel()`), physics evaluation, enemy attacks, and state backups for turn undos.
*   **Store/Forge Economy**: Purchasing cards, upgrading wheels, rerolling offers, and modifying slot configurations.

### 3.4. Cards System (`src/cards/`)
*   `CardDatabase.ts`: Static registry containing definition details for all unlockable cards, organized into rarity (Common, Uncommon, Rare, Legendary) and types (Physics, Board, Payout, Utility).
*   `CardHandler.ts`: Functional dispatcher executing triggers.
    *   *Physics Cards*: Modify gravity, friction, spin speed, target sector bias, or predict sectors.
    *   *Board Cards*: Convert number colors, add green slots, double payouts, or place insurance.
    *   *Payout Cards*: Buff multipliers for specific numbers, odd/even, or specific color categories.
    *   *Utility Cards*: Gain block, heal, draw extra cards, or stun the enemy.

### 3.5. Roulette Physics Simulator (`src/physics/RoulettePhysics.ts`)
A mathematically simulated physics model. It calculates:
*   Rotational speeds of both the wheel and the ball using separate angular velocity and drag/friction calculations.
*   Winning index retrieval: Evaluates where the ball settles based on relative angles, applying slight randomness to mimic bounce behaviors.
*   Payout triggers and sector maps.

### 3.6. Three.js Visual Renderer (`src/render/RenderManager.ts`)
Creates a 3D environment:
*   **3D Assets**: Procedurally builds a felt table, a realistic tiered roulette wheel structure with metal division pegs, 3D bet placement chips, 3D hand card meshes, and a 3D draw deck card stack.
*   **Raycasting**: Checks mouse/pointer intersections to place bets on the felt, pick up cards to inspect/play, click the 3D spin bell, or tap the 3D draw deck.
*   **Lighting System**: A central eerie overhead bulb, spotlights focusing on the wheel and betting board, and simulated floating dust particles using `THREE.Points`.
*   **Camera Views**: Supports 9 camera perspectives (`cameraTargetPos` and `cameraTargetLookAt`) that smoothly interpolate using linear vector learning (`lerp`).

### 3.7. HTML Overlay UI (`src/ui/GameUI.ts`)
Renders highly styled HTML interfaces on top of the WebGL canvas:
*   Main Menu with run options.
*   The procedural branching map.
*   Shop drafting, forge upgrading, and custom wheel layout designers.
*   Scoreboards and Dual HP blood-vessel progress bars.
*   Bottom swipe-gesture action bars.

### 3.8. Sound Effects Synth (`src/ui/SoundManager.ts`)
Generates high-fidelity sound effects procedurally without static audio files:
*   Uses `OscillatorNode`, `BiquadFilterNode`, `GainNode`, and periodic wave adjustments.
*   *Card Swoosh*: High-pass filtered white noise envelope.
*   *Roulette Click*: Sharp, decaying low-frequency pulse.
*   *Hammer Strike*: Metal resonant square-wave ping with rapid gain decay.
*   *Bell Ring*: High-frequency sine waves creating rich bell-like overtones.

---

## 4. WebGL Camera View Registry

`RenderManager.ts` supports 9 manual camera viewpoints. View transitions are handled dynamically by setting `RenderManager.setView(viewId)`:

| View ID | View Name | Description | Camera Coordinates (X, Y, Z) | LookAt Coordinates (X, Y, Z) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Cards** | Closeup of the player's active hand. | `(0.0, 0.8, 1.25)` | `(0.0, 0.25, 0.8)` |
| **2** | **Board** | Wide view of the betting felt board. | Desktop: `(0.0, 1.5, 0.7)`<br>Mobile: `(0.0+offset, 1.6, 1.15)` | `(0.0+offset, 0.0, 0.45)` |
| **3** | **Player Wheel** | Close zoom of the player's custom wheel. | Desktop: `(-0.8, 1.25, -0.1)`<br>Mobile: `(-0.8, 1.35, 0.15)` | `(-0.8, 0.05, -0.75)` |
| **4** | **Overview** | General tactical table view (default). | `(0.0, 1.9, 1.5)` | `(0.0, 0.1, -0.2)` |
| **5** | **Opponent Board** | Cinematic diagonal view of opponent's board. | Desktop: `(-0.4, 1.25, -1.15)`<br>Mobile: `(-0.4, 1.35, -0.85)` | `(0.0, 0.1, -1.95)` |
| **6** | **Enemy Wheel** | Close zoom of the enemy's wheel. | Desktop: `(0.8, 1.25, -0.1)`<br>Mobile: `(0.8, 1.35, 0.15)` | `(0.8, 0.05, -0.75)` |
| **7** | **Opponent Face** | Face-to-face view of the opponent croupier. | Desktop: `(0.0, 1.25, -1.35)`<br>Mobile: `(0.0, 1.35, -0.9)` | `(0.0, 1.25, -3.0)` |
| **8** | **Forge** | Focused perspective for blacksmith card forge. | `(0.0, 1.25, 0.95)` | `(-0.25, 0.45, -0.5)` |
| **9** | **Draw Deck** | Focused zoom on the 3D draw deck stack. | `(0.45+offset, 1.25, 1.0)` | `(0.45+offset, 0.05, 0.65)` |

---

## 5. Mobile Mode Architecture & Layout

When a mobile browser is detected (or toggled via Settings), `GameUI.ts` sets `public mobileModeActive = true`, which alters the game engine layout, camera boundaries, and pointer interactions.

### 5.1. Centered Procedural Map
On narrow viewports, the map container `.map-container` is restricted to `92%` width with a max-width of `340px`. The grid width is fixed at `320px` with `margin: 0 auto`. Node coordinates are generated symmetrically using `centerX + (node.lane - 1) * colWidth` (with `centerX = 160`, `colWidth = 90`). This guarantees the path is perfectly centered without horizontal clipping.

### 5.2. Combined Top HUD Panel
The standard desktop top panel (`#hud-panel`) is hidden completely in combat mode. It is replaced by a glass-morphic `.mobile-combined-hud` panel inside the `.enemy-hud` structure at the top of the viewport.
*   **Utility Delegation**: Buttons inside the combined HUD (Settings, Abandon, Dev Tools) delegate click events by calling `.dispatchEvent(new Event('click'))` on the hidden desktop HTML elements. This avoids duplication of logic and sound triggers.

### 5.3. Touch Swipe Gestures
Since screen space is constrained, touch navigation is mapped to directional swipes. Swipes are detected in `pointerup` using start coordinates tracked in `pointerdown`. Swipes are triggered only when movement exceeds `40px` to prevent interference with click/tap actions.

#### Vertical Swipes (Cycling Camera Views)
Swiping vertically cycles through the table views. Swiping up/down moves in inverted direction for natural scroll feel:
*   **Swipe Up (Go Down Hierarchy)**: `Opponent (7) -> Opponent Board (5) -> Wheel (3/6) -> Board/Deck (2/9) -> Cards (1) -> Overview (4)`.
*   **Swipe Down (Go Up Hierarchy)**: `Overview (4) -> Cards (1) -> Board/Deck (2/9) -> Wheel (3/6) -> Opponent Board (5) -> Opponent (7)`.

#### Horizontal Swipes
*   In **Cards View (1)**: Swipe Left/Right increments/decrements `activeHandCardIndex` to scroll cards.
*   In **Wheel View (3/6)**: Swipe Left/Right cycles between the Player's Wheel (3) and the Opponent's Wheel (6).

### 5.4. Raised Card Carousel
In Mobile Cards View, the active card Y coordinate is raised to `0.03` to float above the bottom action bar. Left/right adjacent cards peek out behind the active card (`scale = 0.38`, `Z = -0.22`, `ry = -diff * 0.15`) indicating to the player that swiping is available.

### 5.5. 3D Card Draw Pile Stack
*   **Visual Stack**: Facedown card meshes are drawn on the felt at `X = 0.45`, `Z = 0.65`. The number of visual cards is dynamically calculated: `Math.max(1, Math.min(6, Math.ceil(drawPileCount / 3)))`. If no cards remain, the stack disappears.
*   **Automatic Focus Zoom**: At the start of a turn, if `mobileModeActive`, `drawsThisTurn === 0`, and the player is allowed to draw cards, the camera auto-zooms to the **Draw Deck (9)**. When a card is successfully drawn (`drawsThisTurn > 0`), the camera zooms back to the **Board View (2)**.
*   **Tap-to-Draw**: Tapping the 3D card stack triggers `this.engine.buyCardDraw()`, plays the draw sound effect, and updates the UI.

### 5.6. Bottom Action Bar & 3D Bell Spin
*   The mobile action bar replaces the Draw, Clear, and Spin HTML buttons with the player's Essence chips pool (`chipsPool`) and deck count stats.
*   **Tap-to-Spin**: Instead of HTML buttons, the player taps the **3D bell mesh** on the table felt in Board/Deck view to spin the wheel/end their turn.

---

## 6. How to Extend / Add Features

### 6.1. Adding a New Card
1.  Open `src/cards/CardDatabase.ts`.
2.  Add a new entry to `CARD_DATABASE` with a unique key, setting name, description, cost, type, and rarity.
3.  Open `src/cards/CardHandler.ts`.
4.  Implement card triggers under appropriate hooks (`applyPhysicsModifiers`, `applyBoardModifiers`, `onPlayCard`, or `onSpinResolution`).

### 6.2. Creating a Custom Wheel Template
1.  Open `src/core/WheelUpgrades.ts`.
2.  Add a new template configuration to `WHEEL_TEMPLATES` defining slots, payout multipliers, and rarity.
3.  Include it in the shop draft selection inside `initializeShopItems()` or customizer presets.
