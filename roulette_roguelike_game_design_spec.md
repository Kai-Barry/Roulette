# Game Design Specification

## Working Title
**Roulette of the Damned** (placeholder)

## High Concept
A dark, atmospheric **3D roguelike** where combat is driven by a **roulette wheel** instead of traditional attacks. Each turn, the player gambles limited resources by betting on roulette outcomes (red/black/green/number) to deal damage to enemies. A deck-building system allows players to **modify roulette physics, probabilities, payouts, and board rules**, creating increasingly broken and risky builds.

Inspired by **Inscryption (Act 1)** for tone, presentation, and pacing, and **Balatro** for probabilistic manipulation and combo-driven gameplay.

---

## Genre & Pillars
- **Genre:** 3D Roguelike / Deckbuilder / Gambling Strategy
- **Core Pillars:**
  - Risk vs reward
  - System manipulation
  - Tactile, physical-feeling randomness
  - Creepy, intimate atmosphere

---

## Target Platform
- PC (Windows first)
- Unity Engine (3D)

---

## Core Gameplay Loop
1. Enter an encounter
2. Draw 1 card (optional play)
3. Spend limited resources to place roulette bets
4. Spin the roulette wheel
5. Damage is dealt based on outcome + modifiers
6. Enemy reacts / attacks
7. Repeat until victory or death
8. Gain rewards (cards, resources, relics)
9. Progress through map

---

## Combat System

### Roulette-Based Combat
- Each turn revolves around a **single roulette spin**
- Player chooses one or more bets:
  - Red
  - Black
  - Green (house edge / high risk)
  - Specific number (very high risk / reward)

### Base Damage Rules (Example)
- Red / Black: 2x damage
- Green: 14x damage
- Specific Number: 36x damage

(All values subject to modification via cards and relics)

---

## Resource System

### Primary Resource (Placeholder: "Blood", "Chips", or "Essence")
- Required to place bets each turn
- Regenerates slowly or via effects
- Running out means:
  - Forced weak bets
  - Taking self-damage
  - Skipping turns

### Secondary Resources (Optional)
- Health
- Permanent corruption
- Temporary luck

---

## Card & Deck System

### Deck Structure
- Player has a deck of modifier cards
- Each turn:
  - Draw 1 card into hand
  - Playing cards is optional
  - Hand limit applies

### Card Types

#### 1. Roulette Modifiers
- Change probabilities
- Modify physics
- Alter payouts

Examples:
- Red deals 2.5x damage instead of 2x
- Wheel spins slower but favors last bet
- Green gains splash damage

#### 2. Board Modifiers
- Add or remove slots
- Duplicate colors
- Replace numbers with effects

Examples:
- Add extra green slot
- Convert all 1–12 numbers into red

#### 3. Physics Modifiers
- Affect how the ball behaves

Examples:
- Ball bounces unpredictably
- Increased friction near green
- Wheel tilts slightly each spin

#### 4. Utility / Risk Cards
- Allow rerolls
- Double down
- Sacrifice health for power

---

## Physics System (Key Feature)

### Goals
- Roulette feels **physical and tangible**, not RNG-only
- Outcomes can be subtly influenced

### Elements to Expose to Modification
- Spin speed
- Ball mass
- Friction
- Bounce randomness
- Wheel tilt
- Slot size

Cards and relics can manipulate these values at runtime.

---

## Enemy Design

### Enemy Traits
- Health
- Attack pattern
- Roulette interaction modifiers

Examples:
- Enemy blocks red damage
- Enemy steals resources when green hits
- Enemy alters wheel physics during their turn

### Bosses
- Multi-phase encounters
- Introduce unique roulette rules
- Permanently modify wheel during fight

---

## Progression & Roguelike Structure

### Run Structure
- Branching node-based map
- Node types:
  - Combat
  - Elite combat
  - Card reward
  - Shop
  - Event
  - Boss

### Meta Progression
- Unlock new cards
- Unlock new wheel components
- Unlock new starting relics

---

## Art Direction

### Visual Style
- Low-poly 3D models
- Limited geometry detail
- Strong silhouettes

### Shader Style
- Retro / PS1-inspired
- Dithering
- Limited color palette
- Slight vertex wobble
- Heavy shadows

### Camera
- Fixed or semi-fixed
- Close, intimate framing
- Minimal UI clutter

---

## Audio Direction
- Minimalist ambient soundtrack
- Mechanical roulette sounds emphasized
- Subtle distortion / vinyl crackle
- Enemy vocalizations are unsettling, not loud

---

## UI / UX
- Diegetic UI where possible
- Cards physically placed on table
- Numbers and damage appear briefly, then fade
- Wheel is always the visual focus

---

## Technical Notes (Unity)

### Systems
- Modular card system (ScriptableObjects)
- Physics-driven roulette wheel
- Event-based combat resolution
- Seeded RNG for reproducibility

### Performance Considerations
- Low-poly assets
- Single-light setups
- Baked lighting where possible

---

## Stretch Ideas
- Multiple wheel types
- Cursed wheels
- Multiplayer ghost runs
- Daily seeded challenges

---

## Design Goals Summary
- Make randomness feel **earned**, not arbitrary
- Let players break the system
- Maintain constant tension between greed and survival
- Keep presentation intimate, creepy, and tactile

