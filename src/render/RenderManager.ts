import * as THREE from 'three';
import { GameEngine } from '../core/GameEngine';
import { WheelVisual, CardVisual, EnemyVisual, ForgeCardVisual, ShopItemVisual, EventChoiceVisual } from './WheelVisual';
import { PS1Shader } from './PS1Shader';
import { Card, WheelConfig, BoardUpgrade, BoardModifiers, Curse, SlotColor, Bet } from '../core/Types';
import { getSlotColor } from '../physics/RoulettePhysics';
import { SoundManager } from '../ui/SoundManager';
import { BOARD_UPGRADES } from '../core/WheelUpgrades';

export class RenderManager {
  engine: GameEngine;
  container: HTMLElement;
  sound: SoundManager;
  
  scene!: THREE.Scene;
  handScene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  
  // Render targets for PS1 pixelation
  renderTarget!: THREE.WebGLRenderTarget;
  postScene!: THREE.Scene;
  postCamera!: THREE.OrthographicCamera;
  postMaterial!: THREE.ShaderMaterial;
  
  // Game meshes
  wheelVis!: WheelVisual;
  enemyWheelVis!: WheelVisual;
  enemyVis!: EnemyVisual;
  tableMesh!: THREE.Mesh;
  playerFeltMesh!: THREE.Mesh;
  enemyFeltMesh!: THREE.Mesh;
  bookMesh?: THREE.Group;
  bookTexture?: THREE.CanvasTexture;
  bookCanvas?: HTMLCanvasElement;
  lastBookStateKey = '';
  isBookZoomed = false;
  private lastPlayerWheelId: string | null = null;
  private lastBoardHash = '';
  handGroup!: THREE.Group;
  bellGroup!: THREE.Group;
  bellPlunger!: THREE.Mesh;
  bellShakeTime = 0;

  // Eerie Environment & Lights
  bulbGroup!: THREE.Group;
  bulbLight!: THREE.PointLight;
  bulbMaterial!: THREE.MeshPhongMaterial;
  ambientLight!: THREE.AmbientLight;
  wheelSpotlight!: THREE.SpotLight;
  feltSpotlight!: THREE.SpotLight;
  dustGeometry!: THREE.BufferGeometry;
  dustPoints!: THREE.Points;

  // Stacking chips visual
  private chipMeshes: THREE.Mesh[] = [];
  private lastBetsHash = '';
  private lastDrawPileCount = -1;
  private chipMaterials!: {
    red: THREE.MeshPhongMaterial;
    black: THREE.MeshPhongMaterial;
    green: THREE.MeshPhongMaterial;
    number: THREE.MeshPhongMaterial;
    blue: THREE.MeshPhongMaterial;
    gold: THREE.MeshPhongMaterial;
    purple: THREE.MeshPhongMaterial;
    cyan: THREE.MeshPhongMaterial;
    crimson: THREE.MeshPhongMaterial;
  };
  
  // Cards management
  cardVisuals: CardVisual[] = [];
  hoveredCardId: string | null = null;
  selectedCardId: string | null = null;
  private heldCardId: string | null = null;
  private heldCardTimer: any = null;
  
  playedCardVisuals: CardVisual[] = [];
  playedCardsGroup!: THREE.Group;
  
  // Forge scene structures
  forgeScene!: THREE.Scene;
  forgeCardsGroup!: THREE.Group;
  forgeCardsVisuals: ForgeCardVisual[] = [];
  forgeSparksGroup!: THREE.Group;
  forgeSparks: THREE.Mesh[] = [];
  forgeFurnaceLight!: THREE.PointLight;
  forgePedestal!: THREE.Mesh;
  hoveredForgeCardId: string | null = null;
  private lastHoveredForgeCardId: string | null = null;
  onForgeCardHover?: (cardId: string | null) => void;
  onForgeCardClicked?: (cardId: string) => void;
  private playerOutsideBets: Array<{ type: string; xStart: number; width: number; yStart: number; height: number }> = [];
  private enemyOutsideBets: Array<{ type: string; xStart: number; width: number; yStart: number; height: number }> = [];
  
  // Shop & Event 3D scenes
  shopScene!: THREE.Scene;
  shopItemsVisuals: ShopItemVisual[] = [];
  shopCardsGroup!: THREE.Group;
  hoveredShopItemId: string | null = null;

  eventScene!: THREE.Scene;
  eventChoicesVisuals: EventChoiceVisual[] = [];
  eventChoicesGroup!: THREE.Group;
  hoveredEventChoiceId: string | null = null;

  // 3D Shop selection & Confirm Bell
  selectedShopItemId: string | null = null;
  selectedEventChoiceId: string | null = null;
  shopBellGroup!: THREE.Group;
  shopBellPlunger!: THREE.Mesh;
  shopBellShakeTime = 0;
  shopCandleLight!: THREE.PointLight;
  eventLeftTorchLight!: THREE.PointLight;
  eventRightTorchLight!: THREE.PointLight;

  public ui: any = null;

  // Raycasting
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2(-999, -999);
  
  // View states
  manualView = 4; // default to overview
  activeView = 4;
  activeHandCardIndex = 0;
  private lastVerticalView = 4;
  boardHorizontalOffset = 0;
  private dragStartOffset = 0;
  private isDraggingBoard = false;
  private isDraggingOverview = false;
  labelsMesh: THREE.Mesh | null = null;
  deckMeshes: THREE.Mesh[] = [];
  overviewPanOffsetX = 0;
  overviewPanOffsetY = 0;
  deckCostMesh: THREE.Mesh | null = null;
  private lastDrawCardCost = -1;
  hasFocusedDeckThisTurn = false;
  lastTurnIndex = -1;
  cameraTargetPos = new THREE.Vector3(0, 1.85, 1.55);
  cameraTargetLookAt = new THREE.Vector3(0, 0.15, -0.2);
  cameraCurrentLookAt = new THREE.Vector3(0, 0.15, -0.2);

  // Texture force upload tracking
  private wasInBattle = false;
  private curseGroup: THREE.Group | null = null;
  private lastCurseId: string | null = null;

  // Opponent action animation
  oppActionCardMesh: THREE.Mesh | null = null;
  oppAnimTime = 0;
  oppAnimType: 'card_play' | 'none' = 'none';
  oppAnimChips: THREE.Mesh[] = [];
  oppAnimChipsStart = new THREE.Vector3();
  oppAnimChipsEnd = new THREE.Vector3();

  // Smooth frame-locked physics sync
  onSpinSettled?: () => void;
  private lastPhysicsTime = 0;
  private physicsAccumulator = 0;

  // FPS performance metrics
  private fpsLastTime = 0;
  private fpsFrames = 0;
  private fpsHistory: number[] = [];
  private readonly maxFpsHistory = 80;

  // 3D Chip Dragging
  isDragging = false;
  dragDenom = 0;
  draggedDenomMesh: THREE.Mesh | null = null;
  dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.02);
  activeHoveredCell: { type: string; numberValue?: number } | null = null;

  // 3D Slider & Coins properties
  sliderHandle!: THREE.Mesh;
  displayPanelMesh!: THREE.Mesh;
  displayPanelTex!: THREE.CanvasTexture;
  displayPanelCanvas!: HTMLCanvasElement;
  clearCoin!: THREE.Mesh;
  rebetCoin!: THREE.Mesh;
  doubleCoin!: THREE.Mesh;
  sacrificeCoin!: THREE.Mesh;
  activeBrush = 1;
  isDraggingSlider = false;
  isPainting = false;
  paintMode: 'add' | 'subtract' | null = null;
  lastHoveredCellPaint: { type: string; numberValue?: number } | null = null;
  brushIndicatorMesh: THREE.Mesh | null = null;
  brushIndicatorTextSprite: THREE.Sprite | null = null;

  clearCoinShakeTime = 0;
  rebetCoinShakeTime = 0;
  doubleCoinShakeTime = 0;
  sacrificeCoinShakeTime = 0;

  // Resolution parameters
  readonly RENDER_WIDTH = 1920;
  readonly RENDER_HEIGHT = 1440;

  onCardClicked?: (cardId: string) => void;
  onPlayedCardClicked?: (cardId: string) => void;
  onBellClicked?: () => void;
  onBetPlaced?: () => void;
  onBounce?: (type: 'pin' | 'divider', speed: number) => void;

  constructor(engine: GameEngine, container: HTMLElement, sound: SoundManager) {
    this.engine = engine;
    this.container = container;
    this.sound = sound;
    
    this.initThree();
    this.buildScene();
    this.buildForgeScene();
    this.buildShopScene();
    this.buildEventScene();
    this.setupPostProcessing();
    this.setupEvents();
    
    this.animate(0);
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0503, 0.08); // creepy dark reddish fog (less dense for better visibility)
    
    this.camera = new THREE.PerspectiveCamera(50, this.container.clientWidth / this.container.clientHeight, 0.01, 100);
    this.camera.position.set(0, 1.4, 1.5);
    
    this.handScene = new THREE.Scene();
    this.handGroup = new THREE.Group();
    this.camera.add(this.handGroup);
    this.handScene.add(this.camera);

    this.playedCardsGroup = new THREE.Group();
    this.scene.add(this.playedCardsGroup);
    
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);
  }

  setView(viewId: number) {
    this.manualView = viewId;
  }

  handleMobileSwipe(direction: 'up' | 'down' | 'left' | 'right') {
    if (!this.ui || !this.ui.mobileModeActive) return;

    if (direction === 'up') {
      // Inverted swipe UP goes down the hierarchy: Opponent (7) -> Opponent Board (5) -> Wheel (3/6) -> Board (2) -> Cards (1) -> Overview (4)
      if (this.activeView === 7) {
        this.ui.setCurrentView(5);
        this.sound.playCardSwoosh();
      } else if (this.activeView === 5) {
        this.ui.setCurrentView(3); // Default to Player's Wheel
        this.sound.playCardSwoosh();
      } else if (this.activeView === 3 || this.activeView === 6) {
        this.ui.setCurrentView(2);
        this.sound.playCardSwoosh();
      } else if (this.activeView === 2 || this.activeView === 9) {
        this.ui.setCurrentView(1);
        this.sound.playCardSwoosh();
      } else if (this.activeView === 1) {
        this.ui.setCurrentView(4);
        this.sound.playCardSwoosh();
      }
    } else if (direction === 'down') {
      // Inverted swipe DOWN goes up the hierarchy: Overview (4) -> Cards (1) -> Board (2) -> Wheel (3/6) -> Opponent Board (5) -> Opponent (7)
      if (this.activeView === 4) {
        this.ui.setCurrentView(1);
        this.sound.playCardSwoosh();
      } else if (this.activeView === 1) {
        this.ui.setCurrentView(2);
        this.sound.playCardSwoosh();
      } else if (this.activeView === 2 || this.activeView === 9) {
        this.ui.setCurrentView(3); // Default to Player's Wheel
        this.sound.playCardSwoosh();
      } else if (this.activeView === 3 || this.activeView === 6) {
        this.ui.setCurrentView(5);
        this.sound.playCardSwoosh();
      } else if (this.activeView === 5) {
        this.ui.setCurrentView(7);
        this.sound.playCardSwoosh();
      }
    } else if (direction === 'left' || direction === 'right') {
      if (this.activeView === 1) {
        // In Cards view: swipe left/right scrolls through cards in hand
        const count = this.cardVisuals.length;
        if (count > 0) {
          if (direction === 'left') {
            if (this.activeHandCardIndex < count - 1) {
              this.activeHandCardIndex++;
              this.sound.playCardSwoosh();
            }
          } else {
            if (this.activeHandCardIndex > 0) {
              this.activeHandCardIndex--;
              this.sound.playCardSwoosh();
            }
          }
        }
      } else if (this.activeView === 3) { // Player's Wheel
        if (direction === 'left') {
          this.ui.setCurrentView(6); // Go to Opponent's Wheel
          this.sound.playCardSwoosh();
        }
      } else if (this.activeView === 6) { // Opponent's Wheel
        if (direction === 'right') {
          this.ui.setCurrentView(3); // Go to Player's Wheel
          this.sound.playCardSwoosh();
        }
      }
    }
  }

  getActiveWheel(): WheelConfig {
    const battle = this.engine.battleState;
    if (!battle) {
      return this.engine.runState.playerWheel;
    }
    return battle.activeWheelOwner === 'enemy' ? battle.enemyWheel : battle.playerWheel;
  }

  rebuildWheelsForCombat() {
    const battle = this.engine.battleState;
    if (!battle) return;
    
    const isEnemyOwner = battle.activeWheelOwner === 'enemy';
    const cleanMods: BoardModifiers = {
      extraGreenSlots: 0,
      convertNumbersToRed: [],
      convertNumbersToBlack: [],
      payoutMultipliers: { red: 2, black: 2, green: 14, number: 36, odd: 2, even: 2 }
    };

    this.wheelVis.rebuildWheel(false, battle.playerWheel, isEnemyOwner ? [] : (battle.predictionSector || []), battle.boardModifiers);
    this.enemyWheelVis.rebuildWheel(true, battle.enemyWheel, isEnemyOwner ? (battle.predictionSector || []) : [], cleanMods);
    this.enemyVis.rebuildEnemy(battle.enemy.spriteName);
    
    // Also reset active states
    this.wheelVis.setBallVisible(true);
    this.enemyWheelVis.setBallVisible(true);
    
    if (this.playerFeltMesh) {
      const oldMat = this.playerFeltMesh.material as THREE.MeshBasicMaterial;
      if (oldMat.map) oldMat.map.dispose();
      oldMat.dispose();
      
      this.playerFeltMesh.material = new THREE.MeshBasicMaterial({
        map: this.createFeltTexture(false, battle.boardModifiers),
        fog: false
      });
    }

    if (this.enemyFeltMesh) {
      const oldMat = this.enemyFeltMesh.material as THREE.MeshBasicMaterial;
      if (oldMat.map) oldMat.map.dispose();
      oldMat.dispose();
      
      this.enemyFeltMesh.material = new THREE.MeshBasicMaterial({
        map: this.createFeltTexture(true, cleanMods),
        fog: false
      });
    }
  }

  updateCurseVisual() {
    const battle = this.engine.battleState;
    const activeCurse = battle?.curse;
    const curseId = activeCurse ? activeCurse.id : null;

    if (curseId === this.lastCurseId) {
      return;
    }
    this.lastCurseId = curseId;

    // Remove old curse visual
    if (this.curseGroup) {
      this.scene.remove(this.curseGroup);
      this.curseGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
            else child.material.dispose();
          }
        }
      });
      this.curseGroup = null;
    }

    if (!activeCurse || !curseId) {
      return;
    }

    // Create new curse visual
    this.curseGroup = new THREE.Group();
    this.curseGroup.position.set(0.45, 0.005, -2.35); // Next to the opponent
    this.scene.add(this.curseGroup);

    // 1. Pedestal (creepy dark stone altar)
    const pedGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.1, 8);
    const pedMat = new THREE.MeshPhongMaterial({ color: 0x110c08, shininess: 5 });
    const pedestal = new THREE.Mesh(pedGeo, pedMat);
    pedestal.position.y = 0.05;
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    this.curseGroup.add(pedestal);

    // 2. The Curse object itself floating above the pedestal
    const coreGroup = new THREE.Group();
    coreGroup.position.y = 0.22;
    coreGroup.name = "curseCore";
    this.curseGroup.add(coreGroup);

    // Build custom geometry based on curse ID
    if (curseId === 'faraday') {
      const rodGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.14, 6);
      const rodMat = new THREE.MeshStandardMaterial({ color: 0xb87333, metalness: 0.9, roughness: 0.1 });
      const rod = new THREE.Mesh(rodGeo, rodMat);
      coreGroup.add(rod);

      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(0.04, 0.006, 4, 12);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.1 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2 + (i - 1) * 0.4;
        ring.rotation.y = (i - 1) * 0.3;
        ring.name = `ring_${i}`;
        coreGroup.add(ring);
      }
    } else if (curseId === 'fog') {
      const ballGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const ballMat = new THREE.MeshPhongMaterial({ color: 0x333333, emissive: 0x111111, transparent: true, opacity: 0.85 });
      const ball = new THREE.Mesh(ballGeo, ballMat);
      coreGroup.add(ball);

      for (let i = 0; i < 4; i++) {
        const dotGeo = new THREE.BoxGeometry(0.01, 0.01, 0.01);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x777777 });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        const angle = (i / 4) * Math.PI * 2;
        dot.position.set(Math.cos(angle) * 0.06, (Math.random() - 0.5) * 0.06, Math.sin(angle) * 0.06);
        dot.name = `dot_${i}`;
        coreGroup.add(dot);
      }
    } else if (curseId === 'rust') {
      const gearGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.02, 5);
      const gearMat = new THREE.MeshPhongMaterial({ color: 0x8b4513, shininess: 2 });
      const gear = new THREE.Mesh(gearGeo, gearMat);
      gear.rotation.x = Math.PI / 2;
      coreGroup.add(gear);

      const smallGearGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.015, 5);
      const smallGear = new THREE.Mesh(smallGearGeo, gearMat);
      smallGear.position.set(0.03, 0.03, 0.02);
      smallGear.rotation.x = Math.PI / 2;
      smallGear.name = "smallGear";
      coreGroup.add(smallGear);
    } else if (curseId === 'greed') {
      const coin1 = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.01, 0.035), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 }));
      coin1.position.set(-0.01, -0.02, 0.01);
      coin1.rotation.y = 0.5;
      coreGroup.add(coin1);

      const coin2 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.012, 0.03), new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.8 }));
      coin2.position.set(0.01, 0.01, -0.01);
      coin2.rotation.y = -0.4;
      coreGroup.add(coin2);
    } else if (curseId === 'avarice') {
      const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.005, 4, 10), new THREE.MeshPhongMaterial({ color: 0xcc1111 }));
      innerRing.name = "innerRing";
      const outerRing = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.005, 4, 10), new THREE.MeshPhongMaterial({ color: 0x1111cc }));
      outerRing.rotation.y = Math.PI / 2;
      outerRing.name = "outerRing";
      coreGroup.add(innerRing);
      coreGroup.add(outerRing);
    } else if (curseId === 'fragile') {
      const jarBase = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.06, 6), new THREE.MeshPhongMaterial({ color: 0x8b5a2b }));
      jarBase.position.y = -0.02;
      coreGroup.add(jarBase);
      const jarNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.025, 0.04, 6), new THREE.MeshPhongMaterial({ color: 0x8b5a2b }));
      jarNeck.position.y = 0.03;
      coreGroup.add(jarNeck);
    } else if (curseId === 'eclipse') {
      const moon = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), new THREE.MeshBasicMaterial({ color: 0x111111 }));
      coreGroup.add(moon);

      const crescent = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.004, 3, 12, Math.PI * 1.5), new THREE.MeshBasicMaterial({ color: 0xff3300 }));
      crescent.rotation.x = Math.PI / 4;
      crescent.name = "crescent";
      coreGroup.add(crescent);
    } else if (curseId === 'curse') {
      const spikeMat = new THREE.MeshPhongMaterial({ color: 0xaa1111, shininess: 80 });
      for (let i = 0; i < 3; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.09, 4), spikeMat);
        spike.position.set((i - 1) * 0.02, 0, 0);
        spike.rotation.set((i - 1) * 0.5, 0, (i - 1) * 0.3);
        spike.name = `spike_${i}`;
        coreGroup.add(spike);
      }
    } else if (curseId === 'lead') {
      const mono = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.09, 0.035), new THREE.MeshPhongMaterial({ color: 0x55555c, shininess: 5 }));
      mono.rotation.y = 0.3;
      coreGroup.add(mono);
    } else if (curseId === 'choked') {
      const cageMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.2 });
      for (let i = 0; i < 2; i++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.004, 4, 8), cageMat);
        ring.rotation.x = Math.PI / 2;
        ring.rotation.y = i * (Math.PI / 2);
        ring.position.y = (i - 0.5) * 0.02;
        ring.name = `cage_${i}`;
        coreGroup.add(ring);
      }
    }
  }

  private buildScene() {
    // 1. Table
    const tableGeo = new THREE.BoxGeometry(6, 0.1, 6);
    const tableMat = new THREE.MeshPhongMaterial({
      color: 0x3d251a, // Brighter retro wood
      shininess: 15
    });
    this.tableMesh = new THREE.Mesh(tableGeo, tableMat);
    this.tableMesh.position.y = -0.05;
    this.tableMesh.receiveShadow = true;
    this.scene.add(this.tableMesh);

    // 2. Dual Wheels (Player left, Enemy right)
    const dummyWheel: WheelConfig = {
      id: 'classic',
      name: 'Classic',
      description: '',
      numbers: [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26],
      greenNumbers: [0],
      colors: {},
      payoutMultipliers: { red: 2, black: 2, green: 14, number: 36, odd: 2, even: 2 },
      upgrades: []
    };

    this.wheelVis = new WheelVisual(false, dummyWheel);
    this.wheelVis.group.position.set(-0.8, 0.05, -0.75);
    this.wheelVis.group.scale.set(0.55, 0.55, 0.55);
    this.scene.add(this.wheelVis.group);

    this.enemyWheelVis = new WheelVisual(true, dummyWheel);
    this.enemyWheelVis.group.position.set(0.8, 0.05, -0.75);
    this.enemyWheelVis.group.scale.set(0.55, 0.55, 0.55);
    this.scene.add(this.enemyWheelVis.group);

    // 2b. Betting Board Felts (Using unlit MeshBasicMaterial for 100% visibility)
    const feltGeo = new THREE.PlaneGeometry(1.2, 0.55);
    
    // Player Felt
    const playerFeltMat = new THREE.MeshBasicMaterial({
      map: this.createFeltTexture(false),
      fog: false
    });
    this.playerFeltMesh = new THREE.Mesh(feltGeo, playerFeltMat);
    this.playerFeltMesh.rotation.x = -Math.PI / 2; // Player board faces the player
    this.playerFeltMesh.position.set(0.0, 0.005, 0.45);
    this.scene.add(this.playerFeltMesh);

    // Enemy Felt
    const enemyFeltMat = new THREE.MeshBasicMaterial({
      map: this.createFeltTexture(true),
      fog: false
    });
    this.enemyFeltMesh = new THREE.Mesh(feltGeo, enemyFeltMat);
    this.enemyFeltMesh.rotation.set(-Math.PI / 2, 0, Math.PI); // Enemy board rotated 180 degrees to face the enemy
    this.enemyFeltMesh.position.set(0.0, 0.005, -1.95);
    this.scene.add(this.enemyFeltMesh);

    // Initialize Chip Materials (Using retro MeshPhongMaterial with high contrast)
    this.chipMaterials = {
      red: new THREE.MeshPhongMaterial({ color: 0xe53935, shininess: 40 }),
      black: new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 40 }), // lighter charcoal
      green: new THREE.MeshPhongMaterial({ color: 0x43a047, shininess: 40 }),
      number: new THREE.MeshPhongMaterial({ color: 0xffd54f, shininess: 60 }),
      blue: new THREE.MeshPhongMaterial({ color: 0x0288d1, shininess: 40 }),
      gold: new THREE.MeshPhongMaterial({ color: 0xffd700, shininess: 60 }),
      purple: new THREE.MeshPhongMaterial({ color: 0x9c27b0, shininess: 40 }),
      cyan: new THREE.MeshPhongMaterial({ color: 0x00bcd4, shininess: 40 }),
      crimson: new THREE.MeshPhongMaterial({ color: 0xff007f, shininess: 40 })
    };

    // 2c. 3D Bell Turn Trigger
    this.bellGroup = new THREE.Group();
    this.bellGroup.position.set(0.72, 0.005, 0.55); // Moved off the board to the right side
    this.scene.add(this.bellGroup);

    const bellBaseGeo = new THREE.CylinderGeometry(0.06, 0.065, 0.015, 10);
    const bellBaseMat = new THREE.MeshPhongMaterial({ color: 0x1a1a1a, shininess: 20 });
    const bellBase = new THREE.Mesh(bellBaseGeo, bellBaseMat);
    bellBase.receiveShadow = true;
    bellBase.castShadow = true;
    bellBase.userData = { isBell: true };
    this.bellGroup.add(bellBase);

    const bellDomeGeo = new THREE.CylinderGeometry(0.045, 0.05, 0.04, 12);
    const bellDomeMat = new THREE.MeshPhongMaterial({ color: 0xcd7f32, shininess: 80 }); // bronze-brass
    const bellDome = new THREE.Mesh(bellDomeGeo, bellDomeMat);
    bellDome.position.y = 0.025;
    bellDome.castShadow = true;
    bellDome.userData = { isBell: true };
    this.bellGroup.add(bellDome);

    const shaftGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.03, 8);
    const metalMat = new THREE.MeshPhongMaterial({ color: 0x999999, shininess: 70 });
    this.bellPlunger = new THREE.Mesh(shaftGeo, metalMat);
    this.bellPlunger.position.y = 0.055; // rest position y=0.055, pushed y=0.04
    this.bellPlunger.castShadow = true;
    this.bellPlunger.userData = { isBell: true };
    this.bellGroup.add(this.bellPlunger);

    const capGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.006, 8);
    const bellCap = new THREE.Mesh(capGeo, metalMat);
    bellCap.position.y = 0.015;
    bellCap.userData = { isBell: true };
    this.bellPlunger.add(bellCap);

    // 2d. Player source chip stacks labels plate
    const labelsCanvas = document.createElement('canvas');
    labelsCanvas.width = 1024;
    labelsCanvas.height = 256;
    const lCtx = labelsCanvas.getContext('2d')!;
    lCtx.fillStyle = '#2b1b14'; // dark wood back
    lCtx.fillRect(0, 0, 1024, 256);
    lCtx.strokeStyle = '#c59f51'; // gold border
    lCtx.lineWidth = 12;
    lCtx.strokeRect(6, 6, 1012, 244);

    lCtx.font = '900 76px "Courier Prime", "Arial Black", monospace, sans-serif';
    lCtx.textAlign = 'center';
    lCtx.textBaseline = 'middle';
    
    const drawChipLabel = (text: string, x: number, y: number) => {
      lCtx.strokeStyle = '#000000';
      lCtx.lineWidth = 14;
      lCtx.strokeText(text, x, y);
      lCtx.fillStyle = '#ffffff';
      lCtx.fillText(text, x, y);
    };

    drawChipLabel('10 ⚡', 1024 / 6, 128);
    drawChipLabel('5 ⚡', 1024 / 2, 128);
    drawChipLabel('1 ⚡', (1024 * 5) / 6, 128);

    const labelsTex = new THREE.CanvasTexture(labelsCanvas);
    labelsTex.colorSpace = THREE.SRGBColorSpace;
    labelsTex.minFilter = THREE.LinearFilter;
    labelsTex.magFilter = THREE.LinearFilter;
    labelsTex.needsUpdate = true;
    const labelsGeo = new THREE.PlaneGeometry(0.44, 0.11);
    const labelsMat = new THREE.MeshBasicMaterial({
      map: labelsTex,
      fog: false
    });
    this.labelsMesh = new THREE.Mesh(labelsGeo, labelsMat);
    this.labelsMesh.rotation.x = -Math.PI / 2;
    this.labelsMesh.position.set(0.70, 0.006, 0.86);
    this.scene.add(this.labelsMesh);

    // --- Tactile 3D Betting System Initialization ---
    // 1. Slider Base (wooden rectangle on felt)
    const sliderBaseGeo = new THREE.BoxGeometry(0.52, 0.005, 0.07);
    const sliderBaseMat = new THREE.MeshPhongMaterial({ color: 0x2b1b14, shininess: 20 });
    const sliderBase = new THREE.Mesh(sliderBaseGeo, sliderBaseMat);
    sliderBase.position.set(0.14, 0.005, 0.86);
    sliderBase.receiveShadow = true;
    sliderBase.castShadow = true;
    this.scene.add(sliderBase);

    // 2. Slider Metal Track Line
    const trackGeo = new THREE.BoxGeometry(0.44, 0.002, 0.008);
    const trackMat = new THREE.MeshPhongMaterial({ color: 0xc59f51, shininess: 80 });
    const sliderTrack = new THREE.Mesh(trackGeo, trackMat);
    sliderTrack.position.set(0, 0.003, 0); // relative to base
    sliderTrack.userData = { isSliderTrack: true };
    sliderBase.add(sliderTrack);

    // 3. Slider Handle
    const handleGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.018, 16);
    const handleMat = new THREE.MeshPhongMaterial({ color: 0xc59f51, shininess: 90 });
    this.sliderHandle = new THREE.Mesh(handleGeo, handleMat);
    this.sliderHandle.castShadow = true;
    this.sliderHandle.receiveShadow = true;
    this.sliderHandle.userData = { isSliderHandle: true };
    this.sliderHandle.position.set(-0.22, 0.009, 0); // start position on left of track
    sliderBase.add(this.sliderHandle);

    // 4. Slider Display Panel
    this.displayPanelCanvas = document.createElement('canvas');
    this.displayPanelCanvas.width = 1024;
    this.displayPanelCanvas.height = 256;
    const dpCtx = this.displayPanelCanvas.getContext('2d')!;
    dpCtx.fillStyle = '#2b1b14';
    dpCtx.fillRect(0, 0, 1024, 256);
    dpCtx.strokeStyle = '#c59f51';
    dpCtx.lineWidth = 12;
    dpCtx.strokeRect(6, 6, 1012, 244);
    dpCtx.font = '900 72px "Courier Prime", "Arial Black", monospace, sans-serif';
    dpCtx.textAlign = 'center';
    dpCtx.textBaseline = 'middle';
    dpCtx.strokeStyle = '#000000';
    dpCtx.lineWidth = 14;
    dpCtx.strokeText('BRUSH: ⚡1', 512, 128);
    dpCtx.fillStyle = '#ffffff';
    dpCtx.fillText('BRUSH: ⚡1', 512, 128);

    this.displayPanelTex = new THREE.CanvasTexture(this.displayPanelCanvas);
    this.displayPanelTex.colorSpace = THREE.SRGBColorSpace;
    this.displayPanelTex.minFilter = THREE.LinearFilter;
    this.displayPanelTex.magFilter = THREE.LinearFilter;
    this.displayPanelTex.needsUpdate = true;
    const dpGeo = new THREE.PlaneGeometry(0.32, 0.08);
    const dpMat = new THREE.MeshBasicMaterial({ map: this.displayPanelTex, fog: false });
    this.displayPanelMesh = new THREE.Mesh(dpGeo, dpMat);
    this.displayPanelMesh.rotation.x = -Math.PI / 2;
    this.displayPanelMesh.position.set(0.14, 0.006, 0.76); // slightly above board Z
    this.scene.add(this.displayPanelMesh);

    // 5. Coins helper function
    const createActionCoin = (label: string, color: number, x: number) => {
      const coinCanvas = document.createElement('canvas');
      coinCanvas.width = 512;
      coinCanvas.height = 512;
      const cCtx = coinCanvas.getContext('2d')!;
      
      // Draw background circle
      cCtx.fillStyle = '#0a0a0a';
      cCtx.fillRect(0, 0, 512, 512);
      cCtx.fillStyle = '#' + color.toString(16).padStart(6, '0');
      cCtx.beginPath();
      cCtx.arc(256, 256, 220, 0, Math.PI * 2);
      cCtx.fill();
      
      cCtx.strokeStyle = '#ffffff';
      cCtx.lineWidth = 16;
      cCtx.stroke();
      
      // High contrast text with heavy outline
      const isYellow = color === 0xffd54f || color === 0xffd700;
      const textColor = isYellow ? '#000000' : '#ffffff';
      const strokeColor = isYellow ? '#ffffff' : '#000000';

      cCtx.font = '900 100px "Courier Prime", "Arial Black", monospace, sans-serif';
      cCtx.textAlign = 'center';
      cCtx.textBaseline = 'middle';
      
      cCtx.strokeStyle = strokeColor;
      cCtx.lineWidth = 22;
      cCtx.strokeText(label, 256, 256);

      cCtx.fillStyle = textColor;
      cCtx.fillText(label, 256, 256);

      const coinTex = new THREE.CanvasTexture(coinCanvas);
      coinTex.colorSpace = THREE.SRGBColorSpace;
      coinTex.minFilter = THREE.LinearFilter;
      coinTex.magFilter = THREE.LinearFilter;
      coinTex.needsUpdate = true;

      const coinGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.012, 24);
      const sideMat = new THREE.MeshPhongMaterial({ color: 0x444444, shininess: 40 });
      const topMat = new THREE.MeshPhongMaterial({ map: coinTex, shininess: 80 });
      const bottomMat = new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 20 });
      
      const coin = new THREE.Mesh(coinGeo, [sideMat, topMat, bottomMat]);
      coin.position.set(x, 0.010, 0.86);
      coin.castShadow = true;
      coin.receiveShadow = true;
      return coin;
    };

    // Instantiate coins
    this.clearCoin = createActionCoin('CLEAR', 0x333333, -0.48);
    this.clearCoin.userData = { isClearCoin: true };
    this.scene.add(this.clearCoin);

    this.rebetCoin = createActionCoin('REBET', 0x43a047, -0.34);
    this.rebetCoin.userData = { isRebetCoin: true };
    this.scene.add(this.rebetCoin);

    this.doubleCoin = createActionCoin('DOUBLE', 0xffd54f, -0.20);
    this.doubleCoin.userData = { isDoubleCoin: true };
    this.scene.add(this.doubleCoin);

    this.sacrificeCoin = createActionCoin('SACR', 0xe53935, 0.52);
    this.sacrificeCoin.userData = { isSacrificeCoin: true };
    this.scene.add(this.sacrificeCoin);

    // 6. Brush Hover Mesh Indicator
    const brushGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.006, 8);
    const brushMat = new THREE.MeshBasicMaterial({
      color: 0xe53935,
      transparent: true,
      opacity: 0.6,
      wireframe: false
    });
    this.brushIndicatorMesh = new THREE.Mesh(brushGeo, brushMat);
    this.brushIndicatorMesh.visible = false;
    this.scene.add(this.brushIndicatorMesh);

    // Sprite text label above indicator
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 128;
    spriteCanvas.height = 64;
    const sCtx = spriteCanvas.getContext('2d')!;
    sCtx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    sCtx.strokeStyle = '#ffd700';
    sCtx.lineWidth = 2;
    sCtx.beginPath();
    sCtx.roundRect(4, 4, 120, 56, 8);
    sCtx.fill();
    sCtx.stroke();
    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 24px "Courier Prime", monospace';
    sCtx.textAlign = 'center';
    sCtx.textBaseline = 'middle';
    sCtx.fillText('⚡1', 64, 32);

    const spriteTex = new THREE.CanvasTexture(spriteCanvas);
    spriteTex.colorSpace = THREE.SRGBColorSpace;
    const spriteMat = new THREE.SpriteMaterial({ map: spriteTex, transparent: true });
    this.brushIndicatorTextSprite = new THREE.Sprite(spriteMat);
    this.brushIndicatorTextSprite.scale.set(0.12, 0.06, 1.0);
    this.brushIndicatorTextSprite.visible = false;
    this.scene.add(this.brushIndicatorTextSprite);

    // 2e. Opponent Hand Facedown Cards & messy static chips
    const oppCardGeo = new THREE.BoxGeometry(0.22, 0.31, 0.006);
    const oppCardBackTex = this.createOpponentCardBackTexture();
    const oppCardMat = new THREE.MeshBasicMaterial({
      map: oppCardBackTex,
      fog: false
    });
    
    for (let i = 0; i < 3; i++) {
      const oppCard = new THREE.Mesh(oppCardGeo, oppCardMat);
      oppCard.rotation.x = -Math.PI / 2;
      const offsetAngle = (i - 1) * 0.15;
      oppCard.position.set((i - 1) * 0.16, 0.006, -2.42 - Math.abs(i - 1) * 0.02);
      oppCard.rotation.z = -offsetAngle;
      oppCard.castShadow = true;
      this.scene.add(oppCard);
    }

    const oppChipGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.005, 8);
    const oppBlackMat = new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 30 });
    const oppRedMat = new THREE.MeshPhongMaterial({ color: 0x991b1b, shininess: 30 });
    
    for (let j = 0; j < 5; j++) {
      const chip = new THREE.Mesh(oppChipGeo, oppBlackMat);
      chip.position.set(-0.35 + (Math.random() - 0.5) * 0.004, 0.005 + j * 0.006, -2.42 + (Math.random() - 0.5) * 0.004);
      this.scene.add(chip);
    }
    for (let j = 0; j < 3; j++) {
      const chip = new THREE.Mesh(oppChipGeo, oppRedMat);
      chip.position.set(-0.40 + (Math.random() - 0.5) * 0.004, 0.005 + j * 0.006, -2.37 + (Math.random() - 0.5) * 0.004);
      this.scene.add(chip);
    }
    for (let j = 0; j < 6; j++) {
      const chip = new THREE.Mesh(oppChipGeo, oppRedMat);
      chip.position.set(0.35 + (Math.random() - 0.5) * 0.004, 0.005 + j * 0.006, -2.42 + (Math.random() - 0.5) * 0.004);
      this.scene.add(chip);
    }

    // 3. Enemy
    this.enemyVis = new EnemyVisual();
    this.enemyVis.group.position.set(0, -0.15, -3.0); // Shifted down to prevent clipping the top of the window
    this.enemyVis.group.scale.set(0.68, 0.68, 0.68); // Scaled down slightly for better fitting
    this.scene.add(this.enemyVis.group);

    // 4. Creepy Closed Cellar Walls & Ceiling (using MeshPhongMaterial + fog + shadow mapping)
    const wallTex = this.createWallTexture();
    wallTex.wrapS = THREE.RepeatWrapping;
    wallTex.wrapT = THREE.RepeatWrapping;
    wallTex.repeat.set(4, 2.5); // square tiling across 8x5 plane
    const wallMat = new THREE.MeshPhongMaterial({
      map: wallTex,
      side: THREE.DoubleSide,
      shininess: 5,
      fog: true
    });

    // Back wall behind opponent
    const backWallGeo = new THREE.PlaneGeometry(8, 5);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 1.5, -3.5);
    backWall.receiveShadow = true;
    this.scene.add(backWall);

    // Left wall
    const leftWallGeo = new THREE.PlaneGeometry(8, 5);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-3.0, 1.5, 0);
    leftWall.receiveShadow = true;
    this.scene.add(leftWall);

    // Right wall
    const rightWallGeo = new THREE.PlaneGeometry(8, 5);
    const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(3.0, 1.5, 0);
    rightWall.receiveShadow = true;
    this.scene.add(rightWall);

    // Ceiling
    const ceilingTex = this.createCeilingTexture();
    ceilingTex.wrapS = THREE.RepeatWrapping;
    ceilingTex.wrapT = THREE.RepeatWrapping;
    ceilingTex.repeat.set(4, 4); // square tiling across 8x8 ceiling plane
    const ceilingGeo = new THREE.PlaneGeometry(8, 8);
    const ceilingMat = new THREE.MeshPhongMaterial({
      map: ceilingTex,
      side: THREE.DoubleSide,
      shininess: 8,
      fog: true
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 2.5, 0);
    ceiling.receiveShadow = true;
    this.scene.add(ceiling);

    // 5. Hanging Light Bulb (lowered so it sways within window framing and casts lower shadow lines)
    this.bulbGroup = new THREE.Group();
    this.bulbGroup.position.set(0, 2.5, -0.1); // hangs from the ceiling at y=2.5, moved to z=-0.1 for visibility
    this.scene.add(this.bulbGroup);

    // Bulb wire (extended to 1.8m)
    const wireGeo = new THREE.CylinderGeometry(0.003, 0.003, 1.8, 4);
    const wireMat = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 5 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    wire.position.y = -0.9; // wire hangs down from 0 to -1.8
    this.bulbGroup.add(wire);

    // Socket
    const socketGeo = new THREE.CylinderGeometry(0.015, 0.018, 0.05, 8);
    const socketMat = new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 15 });
    const socket = new THREE.Mesh(socketGeo, socketMat);
    socket.position.y = -1.825;
    this.bulbGroup.add(socket);

    // Glass Bulb (Emissive)
    const bulbGeo = new THREE.SphereGeometry(0.028, 12, 12);
    this.bulbMaterial = new THREE.MeshPhongMaterial({
      color: 0xfff9e6,
      emissive: 0xffeaad,
      emissiveIntensity: 1.0,
      shininess: 100
    });
    const bulbMesh = new THREE.Mesh(bulbGeo, this.bulbMaterial);
    bulbMesh.position.y = -1.86;
    this.bulbGroup.add(bulbMesh);

    // Point Light source inside bulb
    this.bulbLight = new THREE.PointLight(0xffeaad, 28.0, 10.0);
    this.bulbLight.position.set(0, -1.86, 0);
    this.bulbLight.castShadow = true;
    this.bulbLight.decay = 1.0;
    this.bulbLight.shadow.mapSize.width = 512;
    this.bulbLight.shadow.mapSize.height = 512;
    this.bulbLight.shadow.bias = -0.005;
    this.bulbGroup.add(this.bulbLight);

    // 6. Dust Particles (Dust Motes floating in the cellar - reduced for subtle ambiance)
    this.dustGeometry = new THREE.BufferGeometry();
    const particleCount = 25;
    const coords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 3.0;     // X: -1.5 to 1.5
      coords[i * 3 + 1] = Math.random() * 2.2;          // Y: 0 to 2.2
      coords[i * 3 + 2] = (Math.random() - 0.5) * 3.0;   // Z: -1.5 to 1.5
    }
    this.dustGeometry.setAttribute('position', new THREE.BufferAttribute(coords, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0xffeaad,
      size: 0.015,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    });
    this.dustPoints = new THREE.Points(this.dustGeometry, dustMat);
    this.scene.add(this.dustPoints);

    // 7. Overhead Spotlight for Roulette Wheel
    this.wheelSpotlight = new THREE.SpotLight(0xfff3e0, 15.0, 12.0, Math.PI / 4, 0.6, 1.0);
    this.wheelSpotlight.position.set(0, 2.0, -0.75);
    const wheelTarget = new THREE.Object3D();
    wheelTarget.position.set(0, 0.05, -0.75);
    this.scene.add(wheelTarget);
    this.wheelSpotlight.target = wheelTarget;
    this.wheelSpotlight.castShadow = true;
    this.wheelSpotlight.decay = 1.0;
    this.wheelSpotlight.shadow.mapSize.width = 512;
    this.wheelSpotlight.shadow.mapSize.height = 512;
    this.wheelSpotlight.shadow.bias = -0.002;
    this.scene.add(this.wheelSpotlight);

    // 8. Overhead Spotlight for Betting Felt
    this.feltSpotlight = new THREE.SpotLight(0xfff3e0, 20.0, 12.0, Math.PI / 3, 0.6, 1.0);
    this.feltSpotlight.position.set(0, 2.0, 0.45);
    const feltTarget = new THREE.Object3D();
    feltTarget.position.set(0, 0.005, 0.45);
    this.scene.add(feltTarget);
    this.feltSpotlight.target = feltTarget;
    this.feltSpotlight.castShadow = true;
    this.feltSpotlight.decay = 1.0;
    this.feltSpotlight.shadow.mapSize.width = 512;
    this.feltSpotlight.shadow.mapSize.height = 512;
    this.feltSpotlight.shadow.bias = -0.002;
    this.scene.add(this.feltSpotlight);

    // Eerie ambient light (brighter mold green/gray, boosted for dither readability)
    this.ambientLight = new THREE.AmbientLight(0x555c57, 2.8);
    this.scene.add(this.ambientLight);
  }

  private buildForgeScene() {
    this.forgeScene = new THREE.Scene();
    this.forgeScene.fog = new THREE.FogExp2(0x22150a, 0.06); // Warm forge fog

    // Forge lights
    const ambLight = new THREE.AmbientLight(0x2d211a, 0.4);
    this.forgeScene.add(ambLight);

    this.forgeFurnaceLight = new THREE.PointLight(0xff5500, 3.5, 6.0);
    this.forgeFurnaceLight.position.set(1.0, 0.4, -1.2);
    this.forgeFurnaceLight.castShadow = true;
    this.forgeScene.add(this.forgeFurnaceLight);

    const centerLight = new THREE.PointLight(0xffa866, 1.5, 5.0);
    centerLight.position.set(0.0, 2.0, -0.4);
    centerLight.castShadow = true;
    this.forgeScene.add(centerLight);

    // Warm headlight right in front of cards - gentle point light to prevent blinding glares
    const cardLight = new THREE.PointLight(0xffeaad, 1.2, 3.0);
    cardLight.position.set(0.0, 0.9, 0.7);
    this.forgeScene.add(cardLight);

    const forgeSpotlight = new THREE.SpotLight(0xffecd2, 2.0, 8.0, Math.PI / 3, 0.5, 1.0);
    forgeSpotlight.position.set(0.0, 3.0, 0.8);
    const forgeSpotlightTarget = new THREE.Object3D();
    forgeSpotlightTarget.position.set(0.0, 0.3, -0.4);
    this.forgeScene.add(forgeSpotlightTarget);
    forgeSpotlight.target = forgeSpotlightTarget;
    forgeSpotlight.castShadow = true;
    forgeSpotlight.shadow.mapSize.width = 512;
    forgeSpotlight.shadow.mapSize.height = 512;
    forgeSpotlight.shadow.bias = -0.002;
    this.forgeScene.add(forgeSpotlight);

    // Warm medieval blacksmith stones (brighter base values)
    const floorGeo = new THREE.PlaneGeometry(8, 8);
    const floorMat = new THREE.MeshPhongMaterial({ color: 0x4a4035, shininess: 4 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.forgeScene.add(floor);

    const wallMat = new THREE.MeshPhongMaterial({ color: 0x554c42, shininess: 2, side: THREE.DoubleSide });
    
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat);
    backWall.position.set(0, 2.5, -3.0);
    backWall.receiveShadow = true;
    this.forgeScene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-3.0, 2.5, 0);
    leftWall.receiveShadow = true;
    this.forgeScene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(3.0, 2.5, 0);
    rightWall.receiveShadow = true;
    this.forgeScene.add(rightWall);

    // Anvil Mesh structure
    const anvilGroup = new THREE.Group();
    anvilGroup.position.set(0.0, 0.0, -0.4);

    const blockGeo = new THREE.CylinderGeometry(0.18, 0.20, 0.35, 6);
    const blockMat = new THREE.MeshPhongMaterial({ color: 0x6a4835, shininess: 5 });
    const block = new THREE.Mesh(blockGeo, blockMat);
    block.position.y = 0.175;
    block.receiveShadow = true;
    block.castShadow = true;
    anvilGroup.add(block);

    const flairGeo = new THREE.BoxGeometry(0.24, 0.03, 0.14);
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x5a5f66, metalness: 0.85, roughness: 0.3 });
    const flair = new THREE.Mesh(flairGeo, metalMat);
    flair.position.y = 0.35 + 0.015;
    flair.castShadow = true;
    anvilGroup.add(flair);

    const bodyGeo = new THREE.BoxGeometry(0.20, 0.12, 0.10);
    const body = new THREE.Mesh(bodyGeo, metalMat);
    body.position.y = 0.35 + 0.03 + 0.06;
    body.castShadow = true;
    anvilGroup.add(body);

    const hornGeo = new THREE.ConeGeometry(0.05, 0.12, 6);
    const horn = new THREE.Mesh(hornGeo, metalMat);
    horn.rotation.z = Math.PI / 2;
    horn.position.set(-0.16, 0.35 + 0.03 + 0.06, 0);
    horn.castShadow = true;
    anvilGroup.add(horn);

    const tailGeo = new THREE.BoxGeometry(0.08, 0.06, 0.08);
    const tail = new THREE.Mesh(tailGeo, metalMat);
    tail.position.set(0.14, 0.35 + 0.03 + 0.09, 0);
    tail.castShadow = true;
    anvilGroup.add(tail);

    this.forgeScene.add(anvilGroup);

    // Pedestal for player wheel display
    const pedestalGeo = new THREE.CylinderGeometry(0.26, 0.30, 0.55, 8);
    const pedestalMat = new THREE.MeshPhongMaterial({ color: 0x45484c, shininess: 10 });
    this.forgePedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    this.forgePedestal.position.set(-0.9, 0.275, -0.5);
    this.forgePedestal.receiveShadow = true;
    this.forgePedestal.castShadow = true;
    this.forgeScene.add(this.forgePedestal);

    // Furnace
    const furnaceGroup = new THREE.Group();
    furnaceGroup.position.set(1.0, 0.0, -1.2);

    const baseGeo = new THREE.BoxGeometry(0.6, 0.4, 0.6);
    const brickMat = new THREE.MeshPhongMaterial({ color: 0x7c4f4b, shininess: 5 });
    const base = new THREE.Mesh(baseGeo, brickMat);
    base.position.y = 0.2;
    base.receiveShadow = true;
    base.castShadow = true;
    furnaceGroup.add(base);

    const coalsGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.05, 8);
    const coalsMat = new THREE.MeshBasicMaterial({ color: 0xff5500 });
    const coals = new THREE.Mesh(coalsGeo, coalsMat);
    coals.position.y = 0.4;
    furnaceGroup.add(coals);

    this.forgeScene.add(furnaceGroup);

    // Particle Emitter (Sparks)
    this.forgeSparksGroup = new THREE.Group();
    this.forgeScene.add(this.forgeSparksGroup);

    const sparkGeo = new THREE.BoxGeometry(0.015, 0.015, 0.015);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true });

    const resetSpark = (spark: THREE.Mesh) => {
      spark.position.set(1.0 + (Math.random() - 0.5) * 0.2, 0.42, -1.2 + (Math.random() - 0.5) * 0.2);
      spark.userData = {
        vx: (Math.random() - 0.65) * 0.15,
        vy: 0.35 + Math.random() * 0.4,
        vz: (Math.random() - 0.5) * 0.15,
        age: 0,
        life: 0.8 + Math.random() * 1.2
      };
      (spark.material as THREE.MeshBasicMaterial).opacity = 1.0;
    };

    for (let i = 0; i < 30; i++) {
      const spark = new THREE.Mesh(sparkGeo, sparkMat.clone());
      resetSpark(spark);
      spark.position.y = 0.42 + Math.random() * 0.8;
      this.forgeSparksGroup.add(spark);
      this.forgeSparks.push(spark);
    }

    // Forge Cards Group
    this.forgeCardsGroup = new THREE.Group();
    this.forgeScene.add(this.forgeCardsGroup);
  }

  private buildShopScene() {
    this.shopScene = new THREE.Scene();
    this.shopScene.fog = new THREE.FogExp2(0x0f0b1a, 0.05);

    const ambLight = new THREE.AmbientLight(0x1a1230, 0.6);
    this.shopScene.add(ambLight);

    const centerLight = new THREE.PointLight(0xb388ff, 3.0, 6.0);
    centerLight.position.set(0.0, 2.0, -0.4);
    centerLight.castShadow = true;
    this.shopScene.add(centerLight);

    const cardLight = new THREE.PointLight(0xffeaad, 1.5, 3.0);
    cardLight.position.set(0.0, 0.9, 0.7);
    this.shopScene.add(cardLight);

    const shopSpotlight = new THREE.SpotLight(0xd1c4e9, 3.0, 8.0, Math.PI / 3, 0.5, 1.0);
    shopSpotlight.position.set(0.0, 3.0, 0.8);
    const shopSpotlightTarget = new THREE.Object3D();
    shopSpotlightTarget.position.set(0.0, 0.3, -0.4);
    this.shopScene.add(shopSpotlightTarget);
    shopSpotlight.target = shopSpotlightTarget;
    shopSpotlight.castShadow = true;
    shopSpotlight.shadow.mapSize.width = 1024;
    shopSpotlight.shadow.mapSize.height = 1024;
    shopSpotlight.shadow.bias = -0.001;
    this.shopScene.add(shopSpotlight);

    // Flickering candle on the right side of the counter
    const candleGroup = new THREE.Group();
    candleGroup.position.set(0.6, 0.4, -0.15); // table top is y=0.4
    this.shopScene.add(candleGroup);

    // Candle wax body
    const candleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8);
    const candleMat = new THREE.MeshPhongMaterial({ color: 0xddcbb4, shininess: 8 });
    const candle = new THREE.Mesh(candleGeo, candleMat);
    candle.position.y = 0.06;
    candle.castShadow = true;
    candle.receiveShadow = true;
    candleGroup.add(candle);

    // Flame
    const flameGeo = new THREE.ConeGeometry(0.01, 0.03, 6);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.135;
    candleGroup.add(flame);

    // Candle PointLight
    this.shopCandleLight = new THREE.PointLight(0xff9800, 3.5, 3.0);
    this.shopCandleLight.position.set(0.6, 0.55, -0.15);
    this.shopCandleLight.castShadow = true;
    this.shopCandleLight.shadow.bias = -0.002;
    this.shopScene.add(this.shopCandleLight);

    // 3D Gold Counter Bell
    this.shopBellGroup = new THREE.Group();
    this.shopBellGroup.position.set(-0.6, 0.4, -0.15); // on left side of the table (easy to click!)
    this.shopScene.add(this.shopBellGroup);

    // Bell base
    const bellBaseGeo = new THREE.CylinderGeometry(0.045, 0.05, 0.012, 10);
    const bellBaseMat = new THREE.MeshPhongMaterial({ color: 0x1a1a1a, shininess: 20 });
    const bellBase = new THREE.Mesh(bellBaseGeo, bellBaseMat);
    bellBase.position.y = 0.006;
    bellBase.castShadow = true;
    bellBase.receiveShadow = true;
    bellBase.userData = { isShopBell: true };
    this.shopBellGroup.add(bellBase);

    // Dome
    const bellDomeGeo = new THREE.CylinderGeometry(0.035, 0.04, 0.03, 12);
    const bellDomeMat = new THREE.MeshPhongMaterial({ color: 0xffd700, shininess: 90 });
    const bellDome = new THREE.Mesh(bellDomeGeo, bellDomeMat);
    bellDome.position.y = 0.027;
    bellDome.castShadow = true;
    bellDome.userData = { isShopBell: true };
    this.shopBellGroup.add(bellDome);

    // Plunger
    const shaftGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.022, 6);
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.2 });
    this.shopBellPlunger = new THREE.Mesh(shaftGeo, metalMat);
    this.shopBellPlunger.position.y = 0.053;
    this.shopBellPlunger.castShadow = true;
    this.shopBellPlunger.userData = { isShopBell: true };
    this.shopBellGroup.add(this.shopBellPlunger);

    const capGeo = new THREE.SphereGeometry(0.01, 6, 6);
    const bellCap = new THREE.Mesh(capGeo, metalMat);
    bellCap.position.y = 0.011;
    bellCap.userData = { isShopBell: true };
    this.shopBellPlunger.add(bellCap);

    const floorGeo = new THREE.PlaneGeometry(8, 8);
    const floorMat = new THREE.MeshPhongMaterial({ color: 0x221d30, shininess: 4 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.shopScene.add(floor);

    const wallMat = new THREE.MeshPhongMaterial({ color: 0x28233b, shininess: 2, side: THREE.DoubleSide });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat);
    backWall.position.set(0, 2.5, -3.0);
    backWall.receiveShadow = true;
    this.shopScene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-3.0, 2.5, 0);
    leftWall.receiveShadow = true;
    this.shopScene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(3.0, 2.5, 0);
    rightWall.receiveShadow = true;
    this.shopScene.add(rightWall);

    const tableGeo = new THREE.BoxGeometry(1.6, 0.4, 0.6);
    const tableMat = new THREE.MeshPhongMaterial({ color: 0x3d251a, shininess: 12 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(0.0, 0.2, -0.4);
    table.receiveShadow = true;
    table.castShadow = true;
    this.shopScene.add(table);

    this.shopCardsGroup = new THREE.Group();
    this.shopScene.add(this.shopCardsGroup);
  }

  private buildEventScene() {
    this.eventScene = new THREE.Scene();
    this.eventScene.fog = new THREE.FogExp2(0x0a140f, 0.07);

    const ambLight = new THREE.AmbientLight(0x0d1a14, 0.6);
    this.eventScene.add(ambLight);

    const centerLight = new THREE.PointLight(0x81c784, 1.5, 5.0);
    centerLight.position.set(0.0, 2.0, -0.4);
    centerLight.castShadow = true;
    this.eventScene.add(centerLight);

    const tabletLight = new THREE.PointLight(0xffeaad, 1.2, 3.0);
    tabletLight.position.set(0.0, 0.9, 0.7);
    this.eventScene.add(tabletLight);

    // Focused green/teal spotlight shining on the altar
    const eventSpotlight = new THREE.SpotLight(0x81c784, 3.0, 8.0, Math.PI / 4, 0.5, 1.0);
    eventSpotlight.position.set(0.0, 3.0, 0.8);
    const eventSpotlightTarget = new THREE.Object3D();
    eventSpotlightTarget.position.set(0.0, 0.3, -0.4);
    this.eventScene.add(eventSpotlightTarget);
    eventSpotlight.target = eventSpotlightTarget;
    eventSpotlight.castShadow = true;
    eventSpotlight.shadow.mapSize.width = 1024;
    eventSpotlight.shadow.mapSize.height = 1024;
    this.eventScene.add(eventSpotlight);

    // Left Runic Torch (Cyan)
    const leftTorchGroup = new THREE.Group();
    leftTorchGroup.position.set(-0.6, 0.6, -0.4);
    this.eventScene.add(leftTorchGroup);

    const leftTorchGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.15, 6);
    const leftTorchMat = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 5 });
    const leftTorch = new THREE.Mesh(leftTorchGeo, leftTorchMat);
    leftTorch.castShadow = true;
    leftTorchGroup.add(leftTorch);

    const leftCrystalGeo = new THREE.OctahedronGeometry(0.03, 0);
    const leftCrystalMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 2.0, roughness: 0.1 });
    const leftCrystal = new THREE.Mesh(leftCrystalGeo, leftCrystalMat);
    leftCrystal.position.y = 0.1;
    leftTorchGroup.add(leftCrystal);

    this.eventLeftTorchLight = new THREE.PointLight(0x00e5ff, 1.5, 3.0);
    this.eventLeftTorchLight.position.set(-0.6, 0.7, -0.4);
    this.eventLeftTorchLight.castShadow = true;
    this.eventScene.add(this.eventLeftTorchLight);

    // Right Runic Torch (Emerald Green)
    const rightTorchGroup = new THREE.Group();
    rightTorchGroup.position.set(0.6, 0.6, -0.4);
    this.eventScene.add(rightTorchGroup);

    const rightTorchGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.15, 6);
    const rightTorchMat = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 5 });
    const rightTorch = new THREE.Mesh(rightTorchGeo, rightTorchMat);
    rightTorch.castShadow = true;
    rightTorchGroup.add(rightTorch);

    const rightCrystalGeo = new THREE.OctahedronGeometry(0.03, 0);
    const rightCrystalMat = new THREE.MeshStandardMaterial({ color: 0x2ecc71, emissive: 0x2ecc71, emissiveIntensity: 2.0, roughness: 0.1 });
    const rightCrystal = new THREE.Mesh(rightCrystalGeo, rightCrystalMat);
    rightCrystal.position.y = 0.1;
    rightTorchGroup.add(rightCrystal);

    this.eventRightTorchLight = new THREE.PointLight(0x2ecc71, 1.5, 3.0);
    this.eventRightTorchLight.position.set(0.6, 0.7, -0.4);
    this.eventRightTorchLight.castShadow = true;
    this.eventScene.add(this.eventRightTorchLight);

    const floorGeo = new THREE.PlaneGeometry(8, 8);
    const floorMat = new THREE.MeshPhongMaterial({ color: 0x1d2420, shininess: 2 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.eventScene.add(floor);

    const wallMat = new THREE.MeshPhongMaterial({ color: 0x222a25, shininess: 1, side: THREE.DoubleSide });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat);
    backWall.position.set(0, 2.5, -3.0);
    backWall.receiveShadow = true;
    this.eventScene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-3.0, 2.5, 0);
    leftWall.receiveShadow = true;
    this.eventScene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(3.0, 2.5, 0);
    rightWall.receiveShadow = true;
    this.eventScene.add(rightWall);

    const altarGeo = new THREE.BoxGeometry(0.8, 0.6, 0.8);
    const altarMat = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 15 });
    const altar = new THREE.Mesh(altarGeo, altarMat);
    altar.position.set(0.0, 0.3, -0.4);
    altar.receiveShadow = true;
    altar.castShadow = true;
    this.eventScene.add(altar);

    this.eventChoicesGroup = new THREE.Group();
    this.eventScene.add(this.eventChoicesGroup);
  }

  public syncShopItems() {
    if (!this.ui) return;

    const activeTab = this.ui.activeShopTab;
    const currentOffers: Array<{ type: 'card' | 'upgrade' | 'heal', data: any, id: string, purchased: boolean }> = [];

    if (activeTab === 'cards') {
      this.ui.shopCards.forEach((c: any, idx: number) => {
        currentOffers.push({
          type: 'card',
          data: c,
          id: idx.toString(),
          purchased: false
        });
      });

      const state = this.engine.runState;
      const healCost = 12;
      const isFullHp = state.hp >= state.maxHp;
      currentOffers.push({
        type: 'heal',
        data: {
          name: 'Blood Infusion',
          description: 'Transfuse essence back into your veins. Heals 25 HP.',
          cost: healCost
        },
        id: '999',
        purchased: isFullHp
      });
    } else {
      const playerWheel = this.engine.runState.playerWheel;
      const state = this.engine.runState;
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

        currentOffers.push({
          type: 'upgrade',
          data: {
            ...upgrade,
            name,
            cost,
            description: desc
          },
          id: key,
          purchased: isOwned
        });
      });
    }

    const activeOfferIds = currentOffers.map(o => o.id);
    this.shopItemsVisuals = this.shopItemsVisuals.filter(siv => {
      const exists = activeOfferIds.includes(siv.itemId) && siv.itemType === (currentOffers.find(o => o.id === siv.itemId)?.type === 'heal' ? 'heal' : activeTab === 'cards' ? 'card' : 'upgrade');
      if (!exists) {
        this.shopCardsGroup.remove(siv.mesh);
      }
      return exists;
    });

    currentOffers.forEach((offer, idx) => {
      let sivIndex = this.shopItemsVisuals.findIndex(v => v.itemId === offer.id);
      if (sivIndex !== -1) {
        const existingSiv = this.shopItemsVisuals[sivIndex];
        if (existingSiv.purchased !== offer.purchased) {
          this.shopCardsGroup.remove(existingSiv.mesh);
          this.shopItemsVisuals.splice(sivIndex, 1);
          sivIndex = -1; // Force creation of new visual
        }
      }

      let siv;
      if (sivIndex === -1) {
        const isPointsMode = this.engine.runState.combatMode === 'points';
        siv = new ShopItemVisual(offer.type, offer.data, offer.id, offer.purchased, isPointsMode);
        this.shopCardsGroup.add(siv.mesh);
        this.shopItemsVisuals.push(siv);
      } else {
        siv = this.shopItemsVisuals[sivIndex];
      }

      const N = currentOffers.length;
      const spacing = activeTab === 'cards' ? 0.28 : 0.24;
      const tx = (idx - (N - 1) / 2) * spacing;
      const ty = 0.52;
      const tz = 0.15;

      const isHovered = (this.hoveredShopItemId === offer.id);
      const isSelected = (this.selectedShopItemId === offer.id);

      let targetY = ty;
      let targetZ = tz;
      let targetRotX = -0.42;

      if (isSelected) {
        targetY += 0.14; // float higher
        targetZ += 0.08; // move forward closer to camera
        targetRotX = -0.15; // tilt forward for reading
      } else if (isHovered) {
        targetY += 0.06;
        targetZ += 0.03;
        targetRotX = -0.32;
      }

      siv.targetPosition.set(
        tx,
        targetY + Math.sin(Date.now() * 0.003 + idx) * 0.012,
        targetZ
      );

      const cardAngleY = ((N - 1) / 2 - idx) * 0.12;
      siv.targetRotation.set(
        targetRotX,
        cardAngleY + (isHovered ? Math.sin(Date.now() * 0.005) * 0.08 : 0),
        0
      );
    });
  }

  public syncEventChoices() {
    const choices = [
      { id: '1', title: 'Inject Syringe', cost: 'Lose 8 HP', desc: 'Gain 25 Essence chips.' },
      { id: '2', title: 'Accept Magnet', cost: 'Acquire Lodestone', desc: 'Add Lodestone Magnet card to your deck.' },
      { id: '3', title: 'Decline & Pass', cost: 'Decline Offer', desc: 'Push past them. Gain nothing, lose nothing.' }
    ];

    const activeIds = choices.map(c => c.id);
    this.eventChoicesVisuals = this.eventChoicesVisuals.filter(ecv => {
      const exists = activeIds.includes(ecv.choiceId);
      if (!exists) {
        this.eventChoicesGroup.remove(ecv.mesh);
      }
      return exists;
    });

    choices.forEach((choice, idx) => {
      let ecv = this.eventChoicesVisuals.find(v => v.choiceId === choice.id);
      if (!ecv) {
        const isPointsMode = this.engine.runState.combatMode === 'points';
        ecv = new EventChoiceVisual(choice.id, choice.title, choice.cost, choice.desc, isPointsMode);
        this.eventChoicesGroup.add(ecv.mesh);
        this.eventChoicesVisuals.push(ecv);
      }

      const tx = (idx - 1) * 0.35;
      const ty = 0.58;
      const tz = 0.15;

      const isHovered = (this.hoveredEventChoiceId === choice.id);
      const isSelected = (this.selectedEventChoiceId === choice.id);

      let targetY = ty;
      let targetZ = tz;
      let targetRotX = -0.42;

      if (isSelected) {
        targetY += 0.14; // float higher
        targetZ += 0.08; // move forward closer to camera
        targetRotX = -0.15; // tilt forward for reading
      } else if (isHovered) {
        targetY += 0.06;
        targetZ += 0.03;
        targetRotX = -0.32;
      }

      ecv.targetPosition.set(
        tx,
        targetY + Math.sin(Date.now() * 0.003 + idx) * 0.012,
        targetZ
      );

      const cardAngleY = (1 - idx) * 0.18;
      ecv.targetRotation.set(
        targetRotX,
        cardAngleY + (isHovered ? Math.sin(Date.now() * 0.005) * 0.08 : 0),
        0
      );
    });
  }

  private performShopRaycasting() {
    if (this.mouse.x === -999) {
      this.hoveredShopItemId = null;
    } else {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const meshes = this.shopItemsVisuals.map(cv => cv.mesh);
      const intersects = this.raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        const hitObj = intersects[0].object;
        this.hoveredShopItemId = hitObj.userData.shopItemIdx;
      } else {
        this.hoveredShopItemId = null;
      }
    }
  }

  private performEventRaycasting() {
    if (this.mouse.x === -999) {
      this.hoveredEventChoiceId = null;
    } else {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const meshes = this.eventChoicesVisuals.map(cv => cv.mesh);
      const intersects = this.raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        const hitObj = intersects[0].object;
        this.hoveredEventChoiceId = hitObj.userData.eventChoiceId;
      } else {
        this.hoveredEventChoiceId = null;
      }
    }
  }


  private updateForgeSparks(sec: number) {
    const dt = 0.016;
    this.forgeSparks.forEach(spark => {
      const ud = spark.userData;
      ud.age += dt;
      if (ud.age >= ud.life) {
        spark.position.set(1.0 + (Math.random() - 0.5) * 0.2, 0.42, -1.2 + (Math.random() - 0.5) * 0.2);
        ud.age = 0;
        ud.life = 0.8 + Math.random() * 1.2;
        ud.vx = (Math.random() - 0.65) * 0.15;
        ud.vy = 0.35 + Math.random() * 0.4;
        ud.vz = (Math.random() - 0.5) * 0.15;
        (spark.material as THREE.MeshBasicMaterial).opacity = 1.0;
      } else {
        spark.position.x += ud.vx * dt;
        spark.position.y += ud.vy * dt;
        spark.position.z += ud.vz * dt;
        const progress = ud.age / ud.life;
        (spark.material as THREE.MeshBasicMaterial).opacity = 1.0 - progress;
      }
    });
  }

  public syncForgeCards() {
    const forgeCards = this.engine.runState.forgeCards || [];
    const activeIds = forgeCards.map(c => c.id);
    
    this.forgeCardsVisuals = this.forgeCardsVisuals.filter(fcv => {
      const exists = activeIds.includes(fcv.cardId);
      if (!exists) {
        this.forgeCardsGroup.remove(fcv.mesh);
      }
      return exists;
    });

    forgeCards.forEach((card, idx) => {
      let fcv = this.forgeCardsVisuals.find(v => v.cardId === card.id);
      const isPointsMode = this.engine.runState.combatMode === 'points';
      if (!fcv) {
        fcv = new ForgeCardVisual(card, isPointsMode);
        this.forgeCardsGroup.add(fcv.mesh);
        this.forgeCardsVisuals.push(fcv);
      }
      
      if (fcv.purchased !== card.purchased) {
        this.forgeCardsGroup.remove(fcv.mesh);
        this.forgeCardsVisuals = this.forgeCardsVisuals.filter(v => v.cardId !== card.id);
        
        fcv = new ForgeCardVisual(card, isPointsMode);
        this.forgeCardsGroup.add(fcv.mesh);
        this.forgeCardsVisuals.push(fcv);
      }

      const tx = (idx - 1) * 0.48;
      const ty = 0.52;
      const tz = 0.15;
      
      const isHovered = (this.hoveredForgeCardId === card.id);
      
      fcv.targetPosition.set(
        tx,
        ty + (isHovered ? 0.08 : 0) + Math.sin(Date.now() * 0.003 + idx) * 0.015,
        tz + (isHovered ? -0.06 : 0)
      );
      
      // Fan layout: left card rotates right, center straight, right rotates left
      const cardAngleY = (1 - idx) * 0.22;
      
      fcv.targetRotation.set(
        -0.42, // Tilt back to face the camera directly
        cardAngleY + (isHovered ? Math.sin(Date.now() * 0.005) * 0.08 : 0),
        0
      );
    });
  }

  private performForgeRaycasting() {
    if (this.mouse.x === -999) {
      this.hoveredForgeCardId = null;
    } else {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const meshes = this.forgeCardsVisuals.map(cv => cv.mesh);
      const intersects = this.raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        const hitObj = intersects[0].object;
        this.hoveredForgeCardId = hitObj.userData.forgeCardId;
      } else {
        this.hoveredForgeCardId = null;
      }
    }
    
    if (this.hoveredForgeCardId !== this.lastHoveredForgeCardId) {
      this.lastHoveredForgeCardId = this.hoveredForgeCardId;
      if (this.onForgeCardHover) {
        this.onForgeCardHover(this.hoveredForgeCardId);
      }
    }
  }

  private getActiveOutsideBets(wheel: WheelConfig, isEnemy: boolean): { row1: string[], row2: string[] } {
    const battle = this.engine.battleState;
    const boardModifiers = battle ? battle.boardModifiers : undefined;
    
    const colorsPresent = new Set<string>();
    let hasOdd = false;
    let hasEven = false;
    let hasGreen = false;

    for (const num of wheel.numbers) {
      const isGreenNum = wheel.greenNumbers.includes(num);
      if (isGreenNum) {
        hasGreen = true;
      } else {
        const slotColor = getSlotColor(num, wheel, boardModifiers);
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

    const row1: string[] = [];
    if (colorsPresent.has('red')) row1.push('red');
    if (colorsPresent.has('black')) row1.push('black');
    if (hasOdd) row1.push('odd');
    if (hasEven) row1.push('even');
    if (hasGreen) row1.push('green');

    const row2: string[] = [];
    if (colorsPresent.has('gold')) row2.push('gold');
    if (colorsPresent.has('purple')) row2.push('purple');
    if (colorsPresent.has('cyan')) row2.push('cyan');
    if (colorsPresent.has('crimson')) row2.push('crimson');

    return { row1, row2 };
  }

  private createFeltTexture(isEnemy: boolean, boardMods?: BoardModifiers): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // 1. Draw creepy felt background (dark obsidian grey for enemy, green for player)
    ctx.fillStyle = isEnemy ? '#111111' : '#1b7a3e';
    ctx.fillRect(0, 0, 1024, 512);

    // Draw borders (glowing red for enemy, gold/yellow for player)
    ctx.strokeStyle = isEnemy ? '#ba1212' : '#ffca28';
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, 1004, 492);

    // Get active wheel config based on isEnemy parameter
    const battle = this.engine.battleState;
    const activeWheel = battle ? (isEnemy ? battle.enemyWheel : battle.playerWheel) : this.engine.runState.playerWheel;
    const gridNumbers = activeWheel.numbers.filter((n: number) => !activeWheel.greenNumbers.includes(n)).sort((a: number, b: number) => a - b);
    const cols = Math.ceil(gridNumbers.length / 3);
    const colWidth = 820 / cols;
    const rowHeight = 300 / 3;

    // Get prediction sector if available
    const isEnemyOwner = battle && battle.activeWheelOwner === 'enemy';
    const predictionSector = (battle && (isEnemy === isEnemyOwner)) ? (battle.predictionSector || []) : [];

    // 2. Draw Green Sector (usually contains 0)
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(40, 40, 120, 300);
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 120, 300);

    // Write Green text inside sector, stacked vertically if there are multiple green slots to prevent clipping
    const greenNums = activeWheel.greenNumbers;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (greenNums.length === 1) {
      ctx.font = 'bold 72px "Courier Prime", monospace';
      ctx.fillText(greenNums[0].toString(), 100, 190);
    } else {
      const fontSize = greenNums.length > 3 ? 24 : (greenNums.length === 2 ? 40 : 32);
      ctx.font = `bold ${fontSize}px "Courier Prime", monospace`;
      const startY = 40;
      const height = 300;
      const step = height / (greenNums.length + 1);
      for (let k = 0; k < greenNums.length; k++) {
        ctx.fillText(greenNums[k].toString(), 100, startY + step * (k + 1));
      }
    }

    // Highlight green sector if prediction is active and at least one green number is predicted
    if (predictionSector.length > 0 && activeWheel.greenNumbers.some((n: number) => predictionSector.includes(n))) {
      ctx.save();
      ctx.strokeStyle = '#00ff64';
      ctx.lineWidth = 4;
      ctx.strokeRect(42, 42, 116, 296);
      ctx.fillStyle = 'rgba(0, 255, 100, 0.2)';
      ctx.fillRect(40, 40, 120, 300);
      ctx.restore();
    } else if (predictionSector.length > 0) {
      // Darken green sector if prediction is active and no green numbers are predicted
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.fillRect(40, 40, 120, 300);
      ctx.restore();
    }

    // 3. Draw numbers grid
    ctx.font = cols > 12 ? 'bold 22px "Courier Prime", monospace' : 'bold 36px "Courier Prime", monospace';
    
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < 3; row++) {
        const index = 3 * col + (2 - row);
        if (index >= gridNumbers.length) continue;
        
        const num = gridNumbers[index];
        const cellColor = getSlotColor(num, activeWheel, this.engine.battleState?.boardModifiers);
        
        let colorStr = '#2ebd42';
        if (cellColor === 'red') colorStr = '#ef5350';
        else if (cellColor === 'black') colorStr = '#2d2d2d';
        else if (cellColor === 'gold') colorStr = '#ffd700';
        else if (cellColor === 'purple') colorStr = '#9c27b0';
        else if (cellColor === 'cyan') colorStr = '#00bcd4';
        else if (cellColor === 'crimson') colorStr = '#ff007f';

        const x = 160 + col * colWidth;
        const y = 40 + row * rowHeight;

        ctx.fillStyle = colorStr;
        ctx.fillRect(x, y, colWidth - 2, rowHeight - 2);
        ctx.strokeRect(x, y, colWidth - 2, rowHeight - 2);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(num.toString(), x + colWidth / 2, y + rowHeight / 2);
        
        // Render prediction glow for predicted cells
        if (predictionSector.includes(num)) {
          ctx.save();
          ctx.strokeStyle = '#00ff64';
          ctx.lineWidth = 4;
          ctx.strokeRect(x + 2, y + 2, colWidth - 6, rowHeight - 6);
          
          // Semi-transparent green overlay
          ctx.fillStyle = 'rgba(0, 255, 100, 0.2)';
          ctx.fillRect(x, y, colWidth - 2, rowHeight - 2);
          ctx.restore();
        } else if (predictionSector.length > 0) {
          // Darken non-predicted cells
          ctx.save();
          ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
          ctx.fillRect(x, y, colWidth - 2, rowHeight - 2);
          ctx.restore();
        }

        // Draw Gold Foil or Copper Plate highlights
        const goldFoils = boardMods?.goldFoils || [];
        const copperPlates = boardMods?.copperPlates || [];
        const isGoldFoil = goldFoils.includes(num);
        const isCopperPlate = copperPlates.includes(num);

        if (isGoldFoil) {
          ctx.save();
          ctx.strokeStyle = '#ffd700';
          ctx.lineWidth = 4;
          ctx.strokeRect(x + 2, y + 2, colWidth - 6, rowHeight - 6);
          // Draw a small gold star in corner
          ctx.fillStyle = '#ffd700';
          ctx.font = 'bold 20px "Courier Prime", monospace';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'top';
          ctx.fillText('★', x + colWidth - 6, y + 6);
          ctx.restore();
        } else if (isCopperPlate) {
          ctx.save();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 4;
          ctx.strokeRect(x + 2, y + 2, colWidth - 6, rowHeight - 6);
          // Draw a small copper star in corner
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 20px "Courier Prime", monospace';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'top';
          ctx.fillText('✦', x + colWidth - 6, y + 6);
          ctx.restore();
        }
      }
    }

    // Highlight green sector if any green number is gold/copper foil
    const goldFoils = boardMods?.goldFoils || [];
    const copperPlates = boardMods?.copperPlates || [];
    const greenGoldFoil = activeWheel.greenNumbers.some((n: number) => goldFoils.includes(n));
    const greenCopperPlate = activeWheel.greenNumbers.some((n: number) => copperPlates.includes(n));
    if (greenGoldFoil) {
      ctx.save();
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 4;
      ctx.strokeRect(42, 42, 116, 296);
      ctx.restore();
    } else if (greenCopperPlate) {
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.strokeRect(42, 42, 116, 296);
      ctx.restore();
    }

    // Clear and compute layout arrays
    if (isEnemy) {
      this.enemyOutsideBets = [];
    } else {
      this.playerOutsideBets = [];
    }

    const activeLayout = this.getActiveOutsideBets(activeWheel, isEnemy);

    // 4. Draw Outside bets below grid (Row 1: Red, Black, Odd, Even, Green)
    const outHeight = 65;
    const outY = 350;
    const payouts = activeWheel.payoutMultipliers;

    const row1Active = activeLayout.row1;
    const gap1 = 8;
    const totalGaps1 = (row1Active.length - 1) * gap1;
    const widthPerItem1 = row1Active.length > 0 ? Math.floor((820 - totalGaps1) / row1Active.length) : 0;

    for (let i = 0; i < row1Active.length; i++) {
      const type = row1Active[i];
      const xStart = 160 + i * (widthPerItem1 + gap1);
      const width = (i === row1Active.length - 1) ? (980 - xStart) : widthPerItem1;
      
      const layoutItem = {
        type,
        xStart,
        width,
        yStart: outY,
        height: outHeight
      };
      if (isEnemy) {
        this.enemyOutsideBets.push(layoutItem);
      } else {
        this.playerOutsideBets.push(layoutItem);
      }

      let fillStyle = '#ef5350';
      let textColor = '#ffffff';
      let displayName = '';
      let payoutVal = 1;

      if (type === 'red') {
        fillStyle = '#ef5350';
        displayName = 'RED';
        payoutVal = payouts.red || 2;
      } else if (type === 'black') {
        fillStyle = '#2d2d2d';
        displayName = 'BLACK';
        payoutVal = payouts.black || 2;
      } else if (type === 'odd') {
        fillStyle = '#d84315';
        displayName = 'ODD';
        payoutVal = payouts.odd || 2;
      } else if (type === 'even') {
        fillStyle = '#0288d1';
        displayName = 'EVEN';
        payoutVal = payouts.even || 2;
      } else if (type === 'green') {
        fillStyle = '#4caf50';
        displayName = 'GREEN';
        payoutVal = payouts.green || 10;
      }

      ctx.fillStyle = fillStyle;
      ctx.fillRect(xStart, outY, width, outHeight);
      ctx.strokeStyle = isEnemy ? '#ba1212' : '#ffca28';
      ctx.lineWidth = 3;
      ctx.strokeRect(xStart, outY, width, outHeight);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '900 22px "Courier Prime", "Arial Black", monospace, sans-serif';
      
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;
      ctx.strokeText(displayName, xStart + width / 2, outY + 20);
      ctx.fillStyle = textColor;
      ctx.fillText(displayName, xStart + width / 2, outY + 20);

      ctx.font = 'bold 15px "Courier Prime", monospace';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.strokeText(`(${payoutVal}x)`, xStart + width / 2, outY + 45);
      ctx.fillStyle = textColor;
      ctx.fillText(`(${payoutVal}x)`, xStart + width / 2, outY + 45);
    }

    // Row 2 of outside bets (Gold, Purple, Cyan, Crimson)
    const outY2 = 425;
    const row2Active = activeLayout.row2;
    const gap2 = 10;
    const totalGaps2 = (row2Active.length - 1) * gap2;
    const widthPerItem2 = row2Active.length > 0 ? Math.floor((820 - totalGaps2) / row2Active.length) : 0;

    for (let i = 0; i < row2Active.length; i++) {
      const type = row2Active[i];
      const xStart = 160 + i * (widthPerItem2 + gap2);
      const width = (i === row2Active.length - 1) ? (980 - xStart) : widthPerItem2;

      const layoutItem = {
        type,
        xStart,
        width,
        yStart: outY2,
        height: outHeight
      };
      if (isEnemy) {
        this.enemyOutsideBets.push(layoutItem);
      } else {
        this.playerOutsideBets.push(layoutItem);
      }

      let fillStyle = '#ffd700';
      let textColor = '#ffffff';
      let displayName = '';
      let payoutVal = 1;

      if (type === 'gold') {
        fillStyle = '#ffd700';
        textColor = '#000000';
        displayName = 'GOLD';
        payoutVal = payouts.gold || 5;
      } else if (type === 'purple') {
        fillStyle = '#9c27b0';
        displayName = 'PURPLE';
        payoutVal = payouts.purple || 5;
      } else if (type === 'cyan') {
        fillStyle = '#00bcd4';
        displayName = 'CYAN';
        payoutVal = payouts.cyan || 5;
      } else if (type === 'crimson') {
        fillStyle = '#ff007f';
        displayName = 'CRIMSON';
        payoutVal = payouts.crimson || 5;
      }

      ctx.fillStyle = fillStyle;
      ctx.fillRect(xStart, outY2, width, outHeight);
      ctx.strokeStyle = isEnemy ? '#ba1212' : '#ffca28';
      ctx.lineWidth = 3;
      ctx.strokeRect(xStart, outY2, width, outHeight);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '900 22px "Courier Prime", "Arial Black", monospace, sans-serif';
      
      const strokeColor = (type === 'gold') ? '#ffffff' : '#000000';
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 6;
      ctx.strokeText(displayName, xStart + width / 2, outY2 + 20);
      ctx.fillStyle = textColor;
      ctx.fillText(displayName, xStart + width / 2, outY2 + 20);

      ctx.font = 'bold 15px "Courier Prime", monospace';
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 4;
      ctx.strokeText(`(${payoutVal}x)`, xStart + width / 2, outY2 + 45);
      ctx.fillStyle = textColor;
      ctx.fillText(`(${payoutVal}x)`, xStart + width / 2, outY2 + 45);
    }

    // Add grime / grunge overlay with stable seeded pseudo-random values to prevent flashing on rebuild
    let splotchSeed = isEnemy ? 999 : 444;
    const splotchRandom = () => {
      const x = Math.sin(splotchSeed++) * 10000;
      return x - Math.floor(x);
    };
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    for (let i = 0; i < 40; i++) {
      const rx = splotchRandom() * 1024;
      const ry = splotchRandom() * 512;
      const rSize = 10 + splotchRandom() * 40;
      ctx.beginPath();
      ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  private createOpponentCardBackTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 360;
    const ctx = canvas.getContext('2d')!;

    // Dark red creepy background
    ctx.fillStyle = '#2d0a06';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stitches/gold border
    ctx.strokeStyle = '#c59f51';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    // Pattern in center: an hourglass/cross pattern
    ctx.strokeStyle = '#ba1212';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(40, 60);
    ctx.lineTo(216, 300);
    ctx.moveTo(216, 60);
    ctx.lineTo(40, 300);
    ctx.stroke();

    ctx.fillStyle = '#c59f51';
    ctx.beginPath();
    ctx.arc(128, 180, 24, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  private createWallTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Background: moldy dark-greenish gray concrete
    ctx.fillStyle = '#3a443f';
    ctx.fillRect(0, 0, 512, 512);

    // Draw horizontal brick lines
    ctx.strokeStyle = '#1d2220';
    ctx.lineWidth = 6;
    
    const rowHeight = 64;
    const colWidth = 128;

    for (let y = 0; y <= 512; y += rowHeight) {
      // Horizontal seam
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Vertical brick lines
    for (let y = rowHeight; y <= 512; y += rowHeight) {
      const offset = (y / rowHeight) % 2 === 0 ? 0 : colWidth / 2;
      for (let x = offset; x <= 512 + colWidth; x += colWidth) {
        ctx.beginPath();
        ctx.moveTo(x, y - rowHeight);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }

    // Add retro 3D brick bevels
    // Top/Left highlights
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    for (let y = 0; y < 512; y += rowHeight) {
      const offset = ((y + rowHeight) / rowHeight) % 2 === 0 ? 0 : colWidth / 2;
      for (let x = offset; x < 512 + colWidth; x += colWidth) {
        ctx.beginPath();
        ctx.moveTo(x - colWidth, y + 3);
        ctx.lineTo(x, y + 3);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x - colWidth + 3, y);
        ctx.lineTo(x - colWidth + 3, y + rowHeight);
        ctx.stroke();
      }
    }

    // Bottom/Right shadows
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 2;
    for (let y = 0; y < 512; y += rowHeight) {
      const offset = ((y + rowHeight) / rowHeight) % 2 === 0 ? 0 : colWidth / 2;
      for (let x = offset; x < 512 + colWidth; x += colWidth) {
        ctx.beginPath();
        ctx.moveTo(x - colWidth, y + rowHeight - 3);
        ctx.lineTo(x, y + rowHeight - 3);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x - 3, y);
        ctx.lineTo(x - 3, y + rowHeight);
        ctx.stroke();
      }
    }

    // Add grunge / mold / staining splotches
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    for (let i = 0; i < 15; i++) {
      const rx = Math.random() * 512;
      const ry = Math.random() * 512;
      const rSize = 20 + Math.random() * 60;
      ctx.beginPath();
      ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(45, 65, 35, 0.2)';
    for (let i = 0; i < 10; i++) {
      const rx = Math.random() * 512;
      const ry = Math.random() * 512;
      const rSize = 30 + Math.random() * 70;
      ctx.beginPath();
      ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 8; i++) {
      const rx = Math.random() * 512;
      const ry = Math.random() * 512;
      const rSize = 15 + Math.random() * 40;
      ctx.beginPath();
      ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  private createCeilingTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#2c332f';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#141816';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(256, 0);
    ctx.lineTo(256, 512);
    ctx.moveTo(0, 256);
    ctx.lineTo(512, 256);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(258, 0); ctx.lineTo(258, 512);
    ctx.moveTo(0, 258); ctx.lineTo(512, 258);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(254, 0); ctx.lineTo(254, 512);
    ctx.moveTo(0, 254); ctx.lineTo(512, 254);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 4;
    const centers = [
      [128, 128], [384, 128], [128, 384], [384, 384]
    ];
    centers.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fill();
    });

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    for (let i = 0; i < 15; i++) {
      const rx = Math.random() * 512;
      const ry = Math.random() * 512;
      const rSize = 40 + Math.random() * 100;
      ctx.beginPath();
      ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 10; i++) {
      const rx = Math.random() * 512;
      const ry = Math.random() * 512;
      const rSize = 20 + Math.random() * 60;
      ctx.beginPath();
      ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  private getFeltCellAtPosition(wx: number, wz: number): { type: string; numberValue?: number } | null {
    // Player's board is centered at X = 0.0 with width = 1.2
    const lx = wx - 0.0;
    const lz = wz - 0.45;

    if (lx < -0.6 || lx > 0.6 || lz < -0.275 || lz > 0.275) {
      return null;
    }

    const cx = (lx / 1.2 + 0.5) * 1024;
    const cy = (lz / 0.55 + 0.5) * 512;

    // Get player's active wheel
    const activeWheel = this.engine.battleState ? this.engine.battleState.playerWheel : this.engine.runState.playerWheel;

    // Check outside bets using the stored player layouts!
    for (const item of this.playerOutsideBets) {
      if (cx >= item.xStart && cx <= item.xStart + item.width &&
          cy >= item.yStart && cy <= item.yStart + item.height) {
        return { type: item.type };
      }
    }

    // Check green sector: cx >= 40 && cx <= 160 && cy >= 40 && cy <= 340
    if (cx >= 40 && cx <= 160 && cy >= 40 && cy <= 340) {
      return { type: 'number', numberValue: activeWheel.greenNumbers[0] };
    }

    // Check grid numbers: cx >= 160 && cx <= 980 && cy >= 40 && cy <= 340
    if (cx >= 160 && cx <= 980 && cy >= 40 && cy <= 340) {
      const gridNumbers = activeWheel.numbers.filter((n: number) => !activeWheel.greenNumbers.includes(n)).sort((a: number, b: number) => a - b);
      const cols = Math.ceil(gridNumbers.length / 3);
      const colWidth = 820 / cols;
      const rowHeight = 300 / 3;
      const col = Math.floor((cx - 160) / colWidth);
      const row = Math.floor((cy - 40) / rowHeight);
      
      if (col >= 0 && col < cols && row >= 0 && row < 3) {
        const index = 3 * col + (2 - row);
        if (index < gridNumbers.length) {
          return { type: 'number', numberValue: gridNumbers[index] };
        }
      }
    }

    return null;
  }

  private setupPostProcessing() {
    // Render target with fixed PS1 resolution
    this.renderTarget = new THREE.WebGLRenderTarget(this.RENDER_WIDTH, this.RENDER_HEIGHT, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat
    });

    // Post processing scene (full screen quad)
    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    this.postMaterial = new THREE.ShaderMaterial({
      vertexShader: PS1Shader.vertexShader,
      fragmentShader: PS1Shader.fragmentShader,
      uniforms: {
        tDiffuse: { value: this.renderTarget.texture },
        uResolution: { value: new THREE.Vector2(this.RENDER_WIDTH, this.RENDER_HEIGHT) }
      },
      depthWrite: false,
      depthTest: false
    });

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(quadGeo, this.postMaterial);
    this.postScene.add(quad);
  }

  private setupEvents() {
    const handleResize = () => {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    
    this.container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    
    let startX = 0;
    let startY = 0;
    let pressedSourceDenom = 0;
    let isPressedOnBell = false;
    let pressedCardId: string | null = null;
    let isPressedOnPlayedCard = false;
    let pressedShopItemId: string | null = null;
    let isPressedOnShopBell = false;
    let pressedEventChoiceId: string | null = null;
    let pressedPlacedChip: THREE.Object3D | null = null;
    let isPressedOnDrawDeck = false;
    let isPressedOnSliderHandle = false;
    let isPressedOnClearCoin = false;
    let isPressedOnRebetCoin = false;
    let isPressedOnDoubleCoin = false;
    let isPressedOnSacrificeCoin = false;

    const getMouseCoords = (e: PointerEvent) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      return new THREE.Vector2(x, y);
    };

    this.container.addEventListener('pointerdown', (e) => {
      startX = e.clientX;
      startY = e.clientY;

      const coords = getMouseCoords(e);
      this.mouse.copy(coords);
      this.raycaster.setFromCamera(this.mouse, this.camera);

      // Check book click first to allow toggling it at any time!
      if (this.bookMesh && this.bookMesh.visible) {
        const intersects = this.raycaster.intersectObjects(this.bookMesh.children);
        if (intersects.length > 0) {
          this.isBookZoomed = !this.isBookZoomed;
          if (this.sound) this.sound.playCardSwoosh();
          return;
        }
      }

      if (this.activeView === 4) {
        if (this.ui && !this.ui.mobileModeActive) {
          this.isDraggingOverview = true;
        }
        return;
      }

      if (this.ui && this.ui.mobileModeActive && this.activeView === 2) {
        this.isDraggingBoard = true;
        this.dragStartOffset = this.boardHorizontalOffset;
      }

      const state = this.engine.runState;
      const isForge = state.gameState === 'FORGE';
      const isShop = state.gameState === 'SHOP';
      const isEvent = state.gameState === 'EVENT';

      if (!isForge && !isShop && !isEvent && (!this.engine.battleState || this.engine.battleState.phase !== 'betting')) {
        return; // Lock all inputs!
      }
      
      if (isForge) {
        const meshes = this.forgeCardsVisuals.map(cv => cv.mesh);
        const intersects = this.raycaster.intersectObjects(meshes);
        if (intersects.length > 0) {
          const hitObj = intersects[0].object;
          pressedCardId = hitObj.userData.forgeCardId;
        } else {
          pressedCardId = null;
        }
        return;
      }

      if (isShop) {
        pressedShopItemId = null;
        isPressedOnShopBell = false;

        const shopMeshes = this.shopItemsVisuals.map(cv => cv.mesh);
        const intersects = this.raycaster.intersectObjects(shopMeshes);
        if (intersects.length > 0) {
          const hitObj = intersects[0].object;
          pressedShopItemId = hitObj.userData.shopItemIdx;
        } else {
          // Check shop bell
          const bellObjects: THREE.Object3D[] = [];
          if (this.shopBellGroup) {
            this.shopBellGroup.traverse((obj) => {
              if (obj.userData && obj.userData.isShopBell) {
                bellObjects.push(obj);
              }
            });
          }
          const bellIntersects = this.raycaster.intersectObjects(bellObjects);
          if (bellIntersects.length > 0) {
            isPressedOnShopBell = true;
          }
        }
        return;
      }

      if (isEvent) {
        pressedEventChoiceId = null;
        const eventMeshes = this.eventChoicesVisuals.map(cv => cv.mesh);
        const intersects = this.raycaster.intersectObjects(eventMeshes);
        if (intersects.length > 0) {
          const hitObj = intersects[0].object;
          pressedEventChoiceId = hitObj.userData.eventChoiceId;
        }
        return;
      }

      if (this.heldCardTimer) {
        clearTimeout(this.heldCardTimer);
        this.heldCardTimer = null;
      }
      this.heldCardId = null;

      // 1. Check card hits (interactive in Cards view, and Board view)
      if (this.activeView === 1 || this.activeView === 2) {
        let hitCardId: string | null = null;
        if (this.activeView === 2) {
          hitCardId = this.raycastCardsInCurrentState();
        } else {
          if (this.ui && this.ui.mobileModeActive) {
            const meshes = this.cardVisuals.map(cv => cv.mesh);
            const intersects = this.raycaster.intersectObjects(meshes);
            if (intersects.length > 0) {
              hitCardId = intersects[0].object.userData.cardId;
            }
          } else {
            hitCardId = this.raycastCardsAtRest();
          }
        }
        if (hitCardId) {
          pressedCardId = hitCardId;
          pressedSourceDenom = 0;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          isPressedOnDrawDeck = false;

          // Start hold timer to zoom card ONLY in Board View (2)
          if (this.activeView === 2) {
            this.heldCardTimer = setTimeout(() => {
              this.heldCardId = hitCardId;
              if (this.sound) this.sound.playCardSwoosh();
            }, 200);
          }

          return;
        }
      }

      // Check played card hits on the table (active in views 1, 2, 4)
      if (this.activeView === 1 || this.activeView === 2 || this.activeView === 4) {
        const playedCardMeshes = this.playedCardVisuals.map(cv => {
          cv.mesh.updateMatrixWorld(true);
          return cv.mesh;
        });
        const playedCardIntersects = this.raycaster.intersectObjects(playedCardMeshes);
        if (playedCardIntersects.length > 0) {
          pressedCardId = playedCardIntersects[0].object.userData.cardId;
          pressedSourceDenom = 0;
          isPressedOnBell = false;
          isPressedOnPlayedCard = true;
          isPressedOnDrawDeck = false;
          return;
        }
      }

      // 2. Check source chips stack, bell, placed chips, draw deck, slider elements, and coins
      const interactableObjects: THREE.Object3D[] = [];
      this.scene.traverse((obj) => {
        if (obj.userData && (
          obj.userData.isSourceStack || 
          obj.userData.isBell || 
          obj.userData.isPlacedChip || 
          obj.userData.isDrawDeck ||
          obj.userData.isSliderHandle ||
          obj.userData.isSliderTrack ||
          obj.userData.isClearCoin ||
          obj.userData.isRebetCoin ||
          obj.userData.isDoubleCoin ||
          obj.userData.isSacrificeCoin
        )) {
          interactableObjects.push(obj);
        }
      });

      const hits = this.raycaster.intersectObjects(interactableObjects);
      if (hits.length > 0) {
        const hitObj = hits[0].object;
        if (hitObj.userData.isSliderHandle) {
          isPressedOnSliderHandle = true;
          pressedSourceDenom = 0;
          pressedCardId = null;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          pressedPlacedChip = null;
          isPressedOnDrawDeck = false;
        } else if (hitObj.userData.isSliderTrack) {
          // Snap slider handle to click location on track
          const localPoint = hitObj.worldToLocal(hits[0].point.clone());
          const newX = Math.max(-0.22, Math.min(0.22, localPoint.x));
          if (this.sliderHandle) {
            this.sliderHandle.position.x = newX;
            const pct = (newX + 0.22) / 0.44;
            const brushVal = Math.round(1 + pct * 24);
            this.activeBrush = brushVal;
            this.updateBrushDisplay();
            if (this.sound) this.sound.playChipPlace();
          }
          isPressedOnSliderHandle = true;
          pressedSourceDenom = 0;
          pressedCardId = null;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          pressedPlacedChip = null;
          isPressedOnDrawDeck = false;
        } else if (hitObj.userData.isClearCoin) {
          isPressedOnClearCoin = true;
          pressedSourceDenom = 0;
          pressedCardId = null;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          pressedPlacedChip = null;
          isPressedOnDrawDeck = false;
          hitObj.position.y = 0.005;
          if (this.sound) this.sound.playChipPlace();
        } else if (hitObj.userData.isRebetCoin) {
          isPressedOnRebetCoin = true;
          pressedSourceDenom = 0;
          pressedCardId = null;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          pressedPlacedChip = null;
          isPressedOnDrawDeck = false;
          hitObj.position.y = 0.005;
          if (this.sound) this.sound.playChipPlace();
        } else if (hitObj.userData.isDoubleCoin) {
          isPressedOnDoubleCoin = true;
          pressedSourceDenom = 0;
          pressedCardId = null;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          pressedPlacedChip = null;
          isPressedOnDrawDeck = false;
          hitObj.position.y = 0.005;
          if (this.sound) this.sound.playChipPlace();
        } else if (hitObj.userData.isSacrificeCoin) {
          isPressedOnSacrificeCoin = true;
          pressedSourceDenom = 0;
          pressedCardId = null;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          pressedPlacedChip = null;
          isPressedOnDrawDeck = false;
          hitObj.position.y = 0.005;
          if (this.sound) this.sound.playChipPlace();
        } else if (hitObj.userData.isSourceStack) {
          pressedSourceDenom = hitObj.userData.denom;
          pressedCardId = null;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          pressedPlacedChip = null;
          isPressedOnDrawDeck = false;
        } else if (hitObj.userData.isBell) {
          isPressedOnBell = true;
          pressedSourceDenom = 0;
          pressedCardId = null;
          isPressedOnPlayedCard = false;
          pressedPlacedChip = null;
          isPressedOnDrawDeck = false;
        } else if (hitObj.userData.isPlacedChip) {
          pressedPlacedChip = hitObj;
          pressedSourceDenom = 0;
          pressedCardId = null;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          isPressedOnDrawDeck = false;
        } else if (hitObj.userData.isDrawDeck) {
          isPressedOnDrawDeck = true;
          pressedSourceDenom = 0;
          pressedCardId = null;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          pressedPlacedChip = null;
        }
      } else {
        pressedSourceDenom = 0;
        isPressedOnBell = false;
        pressedCardId = null;
        isPressedOnPlayedCard = false;
        pressedPlacedChip = null;
        isPressedOnDrawDeck = false;
      }
    });

    this.container.addEventListener('pointermove', (e) => {
      const coords = getMouseCoords(e);
      this.mouse.copy(coords);

      if (this.ui && this.ui.mobileModeActive) {
        if (this.isDraggingBoard && this.activeView === 2) {
          const diffX = e.clientX - startX;
          this.boardHorizontalOffset = Math.max(-0.8, Math.min(0.5, this.dragStartOffset - diffX * 0.0025));
        }
        return; // Disable 3D chip dragging in mobile mode
      }

      const isForge = this.engine.runState.gameState === 'FORGE';
      if (isForge) return;

      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);

      if (this.heldCardTimer && dist > 10) {
        clearTimeout(this.heldCardTimer);
        this.heldCardTimer = null;
      }

      if (pressedSourceDenom > 0 && dist > 5 && !this.isDragging) {
        this.isDragging = true;
        this.dragDenom = pressedSourceDenom;
        
        const chipGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.006, 8);
        let chipMat = this.chipMaterials.red;
        if (this.dragDenom === 5) chipMat = this.chipMaterials.green;
        else if (this.dragDenom === 10) chipMat = this.chipMaterials.number;
        
        this.draggedDenomMesh = new THREE.Mesh(chipGeo, chipMat);
        this.draggedDenomMesh.castShadow = true;
        this.scene.add(this.draggedDenomMesh);
      }

      if (this.isDragging && this.draggedDenomMesh) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersectPoint = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint);
        
        this.draggedDenomMesh.position.copy(intersectPoint);
        this.draggedDenomMesh.position.y = 0.04;

        const cell = this.getFeltCellAtPosition(intersectPoint.x, intersectPoint.z);
        if (cell) {
          this.activeHoveredCell = cell;
          const cellPos = this.getBoardCellPosition(cell.type, cell.numberValue);
          this.draggedDenomMesh.position.set(cellPos.x, 0.02, cellPos.z);
        } else {
          this.activeHoveredCell = null;
        }
      }

      if (isPressedOnSliderHandle && this.sliderHandle) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersectPoint = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint);
        const newX = Math.max(-0.22, Math.min(0.22, intersectPoint.x - 0.14));
        this.sliderHandle.position.x = newX;
        
        const pct = (newX + 0.22) / 0.44;
        const brushVal = Math.round(1 + pct * 24);
        this.activeBrush = brushVal;
        this.updateBrushDisplay();
        return;
      }

      // Hover overlay check for painting/betting cells
      if (!this.isDragging && !isPressedOnSliderHandle && this.activeBrush > 0) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersectPoint = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint);
        const cell = this.getFeltCellAtPosition(intersectPoint.x, intersectPoint.z);
        if (cell && this.engine.battleState) {
          if (this.brushIndicatorMesh && this.brushIndicatorTextSprite) {
            const cellPos = this.getBoardCellPosition(cell.type, cell.numberValue);
            this.brushIndicatorMesh.position.set(cellPos.x, 0.008, cellPos.z);
            this.brushIndicatorMesh.visible = true;
            this.brushIndicatorTextSprite.position.set(cellPos.x, 0.08, cellPos.z);
            this.brushIndicatorTextSprite.visible = true;
          }
        } else {
          if (this.brushIndicatorMesh && this.brushIndicatorTextSprite) {
            this.brushIndicatorMesh.visible = false;
            this.brushIndicatorTextSprite.visible = false;
          }
        }
      } else {
        if (this.brushIndicatorMesh && this.brushIndicatorTextSprite) {
          this.brushIndicatorMesh.visible = false;
          this.brushIndicatorTextSprite.visible = false;
        }
      }
    });

    this.container.addEventListener('pointerup', (e) => {
      if (this.heldCardTimer) {
        clearTimeout(this.heldCardTimer);
        this.heldCardTimer = null;
      }

      if (this.heldCardId) {
        this.heldCardId = null;
        pressedCardId = null;
        this.isDraggingBoard = false;
        this.isDraggingOverview = false;
        return;
      }

      this.isDraggingBoard = false;
      this.isDraggingOverview = false;

      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);

      if (this.ui && this.ui.mobileModeActive && this.engine.battleState && dist > 40) {
        // Swipe gesture detected
        const diffX = e.clientX - startX;
        const diffY = e.clientY - startY;
        let direction: 'up' | 'down' | 'left' | 'right';
        if (Math.abs(diffX) > Math.abs(diffY)) {
          direction = diffX > 0 ? 'right' : 'left';
        } else {
          direction = diffY > 0 ? 'down' : 'up';
        }
        
        this.handleMobileSwipe(direction);

        pressedSourceDenom = 0;
        isPressedOnBell = false;
        pressedCardId = null;
        isPressedOnPlayedCard = false;
        pressedPlacedChip = null;
        return;
      }

      if (this.activeView === 4) {
        return;
      }

      const state = this.engine.runState;
      const isForge = state.gameState === 'FORGE';
      const isShop = state.gameState === 'SHOP';
      const isEvent = state.gameState === 'EVENT';

      if (isForge) {
        if (pressedCardId && dist <= 5) {
          if (this.onForgeCardClicked) {
            this.onForgeCardClicked(pressedCardId);
          }
        }
        pressedCardId = null;
        return;
      }

      if (isShop) {
        if (dist <= 5 && this.ui) {
          if (pressedShopItemId) {
            if (this.selectedShopItemId === pressedShopItemId) {
              // Clicked already selected card: Buy it!
              const activeTab = this.ui.activeShopTab;
              let success = false;
              if (activeTab === 'cards') {
                const idx = parseInt(pressedShopItemId);
                success = this.ui.purchaseShopCard(idx);
              } else {
                success = this.ui.purchaseBoardUpgrade(pressedShopItemId);
              }
              if (success) {
                this.selectedShopItemId = null;
                this.ui.updateShopDescriptionBox();
              }
            } else {
              // Clicked different card: Select it!
              this.selectedShopItemId = pressedShopItemId;
              this.sound.playCardSwoosh();
              this.ui.updateShopDescriptionBox();
            }
          } else if (isPressedOnShopBell) {
            this.shopBellShakeTime = 0.15;
            this.sound.playBell();
            if (this.selectedShopItemId) {
              const activeTab = this.ui.activeShopTab;
              let success = false;
              if (activeTab === 'cards') {
                const idx = parseInt(this.selectedShopItemId);
                success = this.ui.purchaseShopCard(idx);
              } else {
                success = this.ui.purchaseBoardUpgrade(this.selectedShopItemId);
              }
              if (success) {
                this.selectedShopItemId = null;
                this.ui.updateShopDescriptionBox();
              }
            }
          } else {
            // Clicked empty space: deselect
            if (this.selectedShopItemId !== null) {
              this.selectedShopItemId = null;
              this.sound.playCardSwoosh();
              this.ui.updateShopDescriptionBox();
            }
          }
        }
        pressedShopItemId = null;
        isPressedOnShopBell = false;
        return;
      }

      if (isEvent) {
        if (dist <= 5 && this.ui) {
          if (pressedEventChoiceId) {
            if (this.selectedEventChoiceId === pressedEventChoiceId) {
              // Clicked already selected tablet: Confirm!
              this.ui.makeEventChoice(pressedEventChoiceId);
              this.selectedEventChoiceId = null;
            } else {
              // Clicked different tablet: Select it!
              this.selectedEventChoiceId = pressedEventChoiceId;
              this.sound.playCardSwoosh();
              this.ui.updateEventDescriptionBox();
            }
          } else {
            // Clicked empty space: deselect
            if (this.selectedEventChoiceId !== null) {
              this.selectedEventChoiceId = null;
              this.sound.playCardSwoosh();
              this.ui.updateEventDescriptionBox();
            }
          }
        }
        pressedEventChoiceId = null;
        return;
      }

      if (this.isDragging) {
        if (this.activeHoveredCell && this.engine.battleState) {
          const type = this.activeHoveredCell.type as 'red' | 'black' | 'green' | 'number' | 'odd' | 'even' | 'gold' | 'purple' | 'cyan' | 'crimson';
          const numberValue = this.activeHoveredCell.numberValue;
          const actualAmount = Math.min(this.dragDenom, this.engine.battleState.chipsPool);
          if (actualAmount > 0) {
            this.engine.placeBet(type, actualAmount, numberValue);
            if (this.onBetPlaced) {
              this.onBetPlaced();
            }
          }
        }
        
        if (this.draggedDenomMesh) {
          this.scene.remove(this.draggedDenomMesh);
          this.draggedDenomMesh.geometry.dispose();
          this.draggedDenomMesh = null;
        }
        this.isDragging = false;
        this.activeHoveredCell = null;
      } else {
        const clickThreshold = (this.ui && this.ui.mobileModeActive) ? 8 : 12;
        if (dist <= clickThreshold) {
          if (isPressedOnDrawDeck) {
            const success = this.engine.buyCardDraw();
            if (success) {
              this.sound.playCardSwoosh();
              this.ui.render();
            } else {
              this.sound.playRouletteClick(0.3);
            }
          } else if (this.ui && this.ui.mobileModeActive && (this.activeView === 2 || this.activeView === 9)) {
            // Mobile Click-to-Bet logic
            if (pressedCardId) {
              if (isPressedOnPlayedCard) {
                if (this.onPlayedCardClicked) {
                  this.onPlayedCardClicked(pressedCardId);
                }
              } else {
                if (this.onCardClicked) {
                  this.onCardClicked(pressedCardId);
                }
              }
            } else if (pressedSourceDenom > 0) {
              this.ui.currentBetAmount = pressedSourceDenom;
              this.sound.playRouletteClick(0.8);
              this.ui.render();
            } else if (isPressedOnBell && this.onBellClicked) {
              this.bellShakeTime = 0.15;
              this.onBellClicked();
            } else if (!pressedCardId && !isPressedOnBell && !pressedPlacedChip) {
              this.raycaster.setFromCamera(this.mouse, this.camera);
              const intersectPoint = new THREE.Vector3();
              this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint);
              const cell = this.getFeltCellAtPosition(intersectPoint.x, intersectPoint.z);
              if (cell && this.engine.battleState) {
                const type = cell.type as 'red' | 'black' | 'green' | 'number' | 'odd' | 'even' | 'gold' | 'purple' | 'cyan' | 'crimson';
                const numberValue = cell.numberValue;
                const actualAmount = Math.min(this.ui.currentBetAmount, this.engine.battleState.chipsPool);
                if (actualAmount > 0) {
                  this.engine.placeBet(type, actualAmount, numberValue);
                  if (this.onBetPlaced) {
                    this.onBetPlaced();
                  }
                } else {
                  this.sound.playRouletteClick(0.3);
                }
              }
            } else if (pressedPlacedChip) {
              const betType = pressedPlacedChip.userData.betType;
              const numVal = pressedPlacedChip.userData.numberValue;
              this.engine.removeBet(betType, numVal);
              this.syncChips();
              if (this.onBetPlaced) {
                this.onBetPlaced();
              }
              this.sound.playCardSwoosh();
            }
          } else {
            // Normal desktop click logic
            if (pressedCardId) {
              if (isPressedOnPlayedCard) {
                if (this.onPlayedCardClicked) {
                  this.onPlayedCardClicked(pressedCardId);
                }
              } else {
                if (this.onCardClicked) {
                  this.onCardClicked(pressedCardId);
                }
              }
            } else if (isPressedOnBell && this.onBellClicked) {
              this.bellShakeTime = 0.15;
              this.onBellClicked();
            } else if (pressedPlacedChip) {
              const betType = pressedPlacedChip.userData.betType;
              const numVal = pressedPlacedChip.userData.numberValue;
              this.engine.removeBet(betType, numVal);
              this.syncChips();
              if (this.onBetPlaced) {
                this.onBetPlaced();
              }
              this.sound.playCardSwoosh();
            }
          }
        }
      }

      if (this.clearCoin) this.clearCoin.position.y = 0.010;
      if (this.rebetCoin) this.rebetCoin.position.y = 0.010;
      if (this.doubleCoin) this.doubleCoin.position.y = 0.010;
      if (this.sacrificeCoin) this.sacrificeCoin.position.y = 0.010;

      pressedSourceDenom = 0;
      isPressedOnBell = false;
      pressedCardId = null;
      isPressedOnPlayedCard = false;
      pressedPlacedChip = null;
      isPressedOnDrawDeck = false;
      isPressedOnSliderHandle = false;
      isPressedOnClearCoin = false;
      isPressedOnRebetCoin = false;
      isPressedOnDoubleCoin = false;
      isPressedOnSacrificeCoin = false;
    });

    const releaseAllInputs = () => {
      isPressedOnSliderHandle = false;
      isPressedOnClearCoin = false;
      isPressedOnRebetCoin = false;
      isPressedOnDoubleCoin = false;
      isPressedOnSacrificeCoin = false;
      if (this.clearCoin) this.clearCoin.position.y = 0.010;
      if (this.rebetCoin) this.rebetCoin.position.y = 0.010;
      if (this.doubleCoin) this.doubleCoin.position.y = 0.010;
      if (this.sacrificeCoin) this.sacrificeCoin.position.y = 0.010;
    };

    window.addEventListener('pointerup', releaseAllInputs);

    this.container.addEventListener('pointerleave', () => {
      this.isDraggingBoard = false;
      this.isDraggingOverview = false;
      this.mouse.set(-999, -999);
      if (this.isDragging) {
        if (this.draggedDenomMesh) {
          this.scene.remove(this.draggedDenomMesh);
          this.draggedDenomMesh.geometry.dispose();
          this.draggedDenomMesh = null;
        }
        this.isDragging = false;
        this.activeHoveredCell = null;
      }
      pressedSourceDenom = 0;
      isPressedOnBell = false;
      pressedPlacedChip = null;
      pressedCardId = null;
      isPressedOnPlayedCard = false;
      releaseAllInputs();
    });
  }

  // Synergize hand cards in Three.js with game battle state
  syncHand(cards: Card[]) {
    // 1. Remove visual cards that are no longer in hand
    const activeIds = cards.map(c => c.id);
    this.cardVisuals = this.cardVisuals.filter(cv => {
      const inHand = activeIds.includes(cv.mesh.userData.cardId);
      if (!inHand) {
        this.handGroup.remove(cv.mesh);
      }
      return inHand;
    });

    // 2. Add visual cards that are newly drawn
    const isPointsMode = this.engine.runState.combatMode === 'points';
    cards.forEach(card => {
      const exists = this.cardVisuals.some(cv => cv.mesh.userData.cardId === card.id);
      if (!exists) {
        const cv = new CardVisual(card, isPointsMode);
        cv.mesh.position.set(0, -0.8, -0.5);
        cv.mesh.rotation.set(0, 0, 0);
        cv.mesh.scale.set(0.01, 0.01, 0.01);
        this.handGroup.add(cv.mesh);
        this.cardVisuals.push(cv);
      }
    });
  }

  syncPlayedCards(cards: Card[]) {
    // 1. Remove visual cards that are no longer in activePlayedCards
    const activeIds = cards.map(c => c.id);
    this.playedCardVisuals = this.playedCardVisuals.filter(cv => {
      const isPlayed = activeIds.includes(cv.mesh.userData.cardId);
      if (!isPlayed) {
        this.playedCardsGroup.remove(cv.mesh);
      }
      return isPlayed;
    });

    // 2. Add visual cards that are newly played, and update persistent banners
    const isPointsModePlay = this.engine.runState.combatMode === 'points';
    const effectToDurationKey: Record<string, string> = {
      'GREEN_GREED': 'greenMultiplier',
      'PRIME_TARGET': 'primeMultiplier',
      'HIGH_ROLLER': 'highMultiplier',
      'LOW_SWEEP': 'lowMultiplier',
      'EVEN_SPLIT': 'evenMultiplier',
      'ODD_ADVANTAGE': 'oddMultiplier',
      'FIRST_DOZEN': 'dozenMultiplier_1',
      'SECOND_DOZEN': 'dozenMultiplier_2',
      'THIRD_DOZEN': 'dozenMultiplier_3',
      'SINGLE_OUT': 'singleOutMultiplier',
      'COLUMN_WAVE': 'columnMultiplier_1',
      'COLUMN_DRIFT': 'columnMultiplier_2',
      'COLUMN_APEX': 'columnMultiplier_3',
      'LUCKY_INDEX': 'globalMultiplier',
      'SCARLET_OVERFLOW': 'scarletOverflow',
      'ONYX_ECLIPSE': 'onyxEclipse',
      'BLOOD_SPILL': 'bloodSpill'
    };

    cards.forEach(card => {
      let cv = this.playedCardVisuals.find(v => v.mesh.userData.cardId === card.id);
      if (!cv) {
        cv = new CardVisual(card, isPointsModePlay);
        cv.mesh.position.set(0, 0.006, 0.85);
        cv.mesh.rotation.set(-Math.PI / 2, 0, 0);
        this.playedCardsGroup.add(cv.mesh);
        this.playedCardVisuals.push(cv);
      }
      
      const tempDurations = this.engine.battleState?.boardModifiers.tempDurations || {};
      const durKey = effectToDurationKey[card.effectId];
      const turnsLeft = durKey ? tempDurations[durKey] : undefined;
      cv.updatePersistentState(turnsLeft);
    });
  }

  private updatePlayedCardTargets() {
    const count = this.playedCardVisuals.length;
    if (count === 0) return;

    const isMobile = this.ui && this.ui.mobileModeActive;
    const spacing = 0.15;

    this.playedCardVisuals.forEach((cv, idx) => {
      let tx = 0;
      if (isMobile) {
        // Place along either side of the centered chip stacks to prevent overlap
        const isLeft = idx % 2 === 0;
        const sideIdx = Math.floor(idx / 2);
        if (isLeft) {
          tx = -0.25 - sideIdx * spacing;
        } else {
          tx = 0.25 + sideIdx * spacing;
        }
      } else {
        const startX = -((count - 1) * spacing) / 2;
        tx = startX + idx * spacing;
      }
      const ty = 0.006;
      const tz = 0.85;

      const rx = -Math.PI / 2;
      const ry = 0.0;
      const rz = 0.0;

      cv.targetPosition.set(tx, ty, tz);
      cv.targetRotation.set(rx, ry, rz);
    });
  }

  playOpponentActionAnimation(intent: { type: string; value: number; description: string }, bets: Bet[], cardToPlay?: Card) {
    // 1. Create intent card mesh
    const scale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = 256 * scale;
    canvas.height = 360 * scale;
    const ctx = canvas.getContext('2d')!;

    // Dark red creepy background
    ctx.fillStyle = '#2d0a06';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gold border
    ctx.strokeStyle = '#c59f51';
    ctx.lineWidth = 12 * scale;
    ctx.strokeRect(6 * scale, 6 * scale, canvas.width - 12 * scale, canvas.height - 12 * scale);

    // Header background
    ctx.fillStyle = '#170503';
    ctx.fillRect(12 * scale, 12 * scale, canvas.width - 24 * scale, 60 * scale);

    // Name & Cost
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    if (cardToPlay) {
      // Draw card name
      ctx.font = 'bold ' + (15 * scale) + 'px "Courier Prime", monospace';
      ctx.fillText(cardToPlay.name.toUpperCase(), 20 * scale, 42 * scale);
      
      // Draw card cost
      ctx.fillStyle = '#ffca28';
      ctx.font = 'bold ' + (22 * scale) + 'px "Courier Prime", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${cardToPlay.cost}⚡`, canvas.width - 20 * scale, 42 * scale);
      ctx.textAlign = 'left';
    } else {
      ctx.font = 'bold ' + (20 * scale) + 'px "Courier Prime", monospace';
      ctx.fillText(intent.type.toUpperCase(), 24 * scale, 42 * scale);

      // Value
      if (intent.value > 0) {
        ctx.fillStyle = '#ef5350';
        ctx.font = 'bold ' + (24 * scale) + 'px "Courier Prime", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`${intent.value}⚡`, canvas.width - 24 * scale, 42 * scale);
        ctx.textAlign = 'left';
      }
    }

    // Illustration placeholder
    ctx.fillStyle = '#17110c';
    ctx.fillRect(24 * scale, 90 * scale, canvas.width - 48 * scale, 120 * scale);
    ctx.strokeStyle = '#4a0f08';
    ctx.strokeRect(28 * scale, 94 * scale, canvas.width - 56 * scale, 112 * scale);

    // Center symbol
    ctx.fillStyle = '#ef5350';
    ctx.font = 'bold ' + (48 * scale) + 'px "Courier Prime", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (cardToPlay) {
      let sym = '⚙️';
      if (cardToPlay.type === 'payout') sym = '💸';
      else if (cardToPlay.type === 'physics') sym = '🌀';
      else if (cardToPlay.type === 'board') sym = '📊';
      else if (cardToPlay.type === 'chaos') sym = '💥';
      ctx.fillText(sym, 128 * scale, 150 * scale);
    } else {
      ctx.fillText('👁', 128 * scale, 150 * scale);
    }

    // Description
    ctx.fillStyle = '#dddddd';
    ctx.font = 'bold ' + (12 * scale) + 'px "Courier Prime", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    
    const descText = cardToPlay ? cardToPlay.description : intent.description;
    const words = descText.split(' ');
    let line = '';
    let y = 240 * scale;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > (canvas.width - 48 * scale) && n > 0) {
        ctx.fillText(line, 24 * scale, y);
        line = words[n] + ' ';
        y += 20 * scale;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 24 * scale, y);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    const cardGeo = new THREE.BoxGeometry(0.18, 0.25, 0.004);
    const backMat = new THREE.MeshBasicMaterial({ color: 0x2d0a06, fog: false });
    const sideMat = new THREE.MeshBasicMaterial({ color: 0x170503, fog: false });
    const frontMat = new THREE.MeshBasicMaterial({ map: texture, fog: false });
    
    const materials = [
      sideMat, // right
      sideMat, // left
      sideMat, // top
      sideMat, // bottom
      frontMat, // front
      backMat   // back
    ];

    this.oppActionCardMesh = new THREE.Mesh(cardGeo, materials);
    this.oppActionCardMesh.position.set(0, 0.1, -2.62);
    this.oppActionCardMesh.rotation.set(-Math.PI / 2, Math.PI, 0);
    this.oppActionCardMesh.castShadow = true;
    this.scene.add(this.oppActionCardMesh);

    // 2. Setup chips bet animation
    this.oppAnimChips.forEach(c => this.scene.remove(c));
    this.oppAnimChips = [];

    const chipGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.006, 8);

    bets.forEach((bet, betIdx) => {
      let chipMat = this.chipMaterials.red;
      if (bet.type === 'black') chipMat = this.chipMaterials.black;
      else if (bet.type === 'green') chipMat = this.chipMaterials.green;
      else if (bet.type === 'number') chipMat = this.chipMaterials.number;
      else if (bet.type === 'even') chipMat = this.chipMaterials.blue;
      else if (bet.type === 'gold') chipMat = this.chipMaterials.gold;
      else if (bet.type === 'purple') chipMat = this.chipMaterials.purple;
      else if (bet.type === 'cyan') chipMat = this.chipMaterials.cyan;
      else if (bet.type === 'crimson') chipMat = this.chipMaterials.crimson;

      const count = Math.max(1, Math.min(5, bet.amount));
      const endPos = this.getBoardCellPosition(bet.type, bet.numberValue);
      
      // Stagger start X slightly on Z = -2.5 (opponent side)
      const startX = -0.25 + (betIdx * 0.25);
      const startZ = -2.5;

      for (let i = 0; i < count; i++) {
        const chip = new THREE.Mesh(chipGeo, chipMat);
        chip.position.set(startX, 0.005 + i * 0.007, startZ);
        chip.castShadow = true;
        chip.receiveShadow = true;
        
        chip.userData = {
          startPosition: new THREE.Vector3(startX, 0.005 + i * 0.007, startZ),
          targetPosition: new THREE.Vector3(endPos.x, endPos.y + i * 0.007, endPos.z)
        };

        this.scene.add(chip);
        this.oppAnimChips.push(chip);
      }
    });

    this.oppAnimTime = 0;
    this.oppAnimType = 'card_play';
  }

  private updateFpsStats(time: number) {
    const statsOverlay = document.getElementById('debug-stats-overlay');
    if (!statsOverlay || statsOverlay.classList.contains('hidden')) {
      return; // only update when debug overlay is active
    }

    this.fpsFrames++;

    if (this.fpsLastTime === 0) {
      this.fpsLastTime = time;
      return;
    }

    const frameTime = time - this.fpsLastTime;
    this.fpsLastTime = time;

    // Smooth update of values every 10 frames
    if (this.fpsFrames % 10 === 0) {
      const fps = Math.round(1000 / Math.max(1, frameTime));
      const fpsValEl = document.getElementById('debug-fps-value');
      const frameTimeValEl = document.getElementById('debug-frame-time-value');
      
      if (fpsValEl) {
        fpsValEl.innerText = fps.toString();
        if (fps >= 55) fpsValEl.style.color = '#64dd17';
        else if (fps >= 30) fpsValEl.style.color = '#ffb300';
        else fpsValEl.style.color = '#ef5350';
      }
      
      if (frameTimeValEl) {
        frameTimeValEl.innerText = `${frameTime.toFixed(1)} ms`;
      }

      this.fpsHistory.push(fps);
      if (this.fpsHistory.length > this.maxFpsHistory) {
        this.fpsHistory.shift();
      }

      // Draw FPS graph on canvas
      const canvas = document.getElementById('debug-fps-canvas') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw 60/30 grid lines
          ctx.strokeStyle = '#220a06';
          ctx.lineWidth = 1;
          ctx.beginPath();
          const y60 = canvas.height - (60 / 90) * canvas.height;
          ctx.moveTo(0, y60);
          ctx.lineTo(canvas.width, y60);
          const y30 = canvas.height - (30 / 90) * canvas.height;
          ctx.moveTo(0, y30);
          ctx.lineTo(canvas.width, y30);
          ctx.stroke();

          // Draw graph path
          ctx.strokeStyle = '#ef5350';
          ctx.lineWidth = 2.0;
          ctx.beginPath();

          const colWidth = canvas.width / this.maxFpsHistory;
          for (let i = 0; i < this.fpsHistory.length; i++) {
            const hFps = Math.min(90, Math.max(0, this.fpsHistory[i]));
            const x = i * colWidth;
            const y = canvas.height - (hFps / 90) * canvas.height;
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();

          // Fill color underneath
          if (this.fpsHistory.length > 0) {
            ctx.fillStyle = 'rgba(239, 83, 80, 0.1)';
            ctx.lineTo((this.fpsHistory.length - 1) * colWidth, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();
          }
        }
      }
    }
  }

  // Update card layouts in hand
  private updateCardTargets() {
    const count = this.cardVisuals.length;
    if (count === 0) return;

    const isMobileCards = this.ui && this.ui.mobileModeActive && this.activeView === 1;

    if (isMobileCards) {
      this.activeHandCardIndex = Math.min(count - 1, Math.max(0, this.activeHandCardIndex));
      
      this.cardVisuals.forEach((cv, idx) => {
        const diff = idx - this.activeHandCardIndex;
        let tx = 0;
        let ty = 0.00; // Raised to clear bottom UI
        let tz = -0.16;
        let scaleVal = 0.52;
        let ry = 0.0;
        let rz = 0.0;

        if (diff !== 0) {
          // Show adjacent cards peeking out from the left and right behind the active card
          if (Math.abs(diff) === 1) {
            tx = diff * 0.12;      // Shift slightly left or right
            ty = 0.01;             // Slightly lower
            tz = -0.22;            // Push back on Z
            scaleVal = 0.38;       // Scale down
            ry = -diff * 0.15;     // Rotate slightly inwards
          } else {
            // Cards further away are hidden
            scaleVal = 0.01;
            tx = diff < 0 ? -0.5 : 0.5;
            tz = -0.2;
          }
        }
        
        cv.targetPosition.set(tx, ty, tz);
        cv.targetRotation.set(-0.05, ry, rz);
        cv.mesh.userData.targetScale = new THREE.Vector3(scaleVal, scaleVal, scaleVal);
      });
      return;
    }

    let baseLocalY = -0.12;
    let baseLocalZ = -0.24;
    
    // Check if any card is hovered in Cards view
    const isAnyCardHovered = this.hoveredCardId !== null && this.activeView === 1;

    if (this.activeView === 1) { // Cards view - fully focused
      baseLocalY = -0.04;
      // Push non-hovered cards back if one is hovered to create depth and prevent overlay overlaps
      baseLocalZ = isAnyCardHovered ? -0.22 : -0.16;
    } else if (this.activeView === 2) { // Felt board view - shifted down
      baseLocalY = -0.22;
      baseLocalZ = -0.24;
    } else if (this.activeView === 3 || this.activeView === 5 || this.activeView === 6 || this.activeView === 7) { // Wheel / Opponent views - hidden completely
      baseLocalY = -0.6;
      baseLocalZ = -0.3;
    } else { // Overview (4) - resting at bottom
      baseLocalY = -0.19;
      baseLocalZ = -0.32;
    }

    const angleRange = Math.min(0.6, 0.12 * (count - 1));
    const angleStep = count > 1 ? angleRange / (count - 1) : 0;
    const startAngle = -angleRange / 2;

    this.cardVisuals.forEach((cv, idx) => {
      const isHovered = cv.mesh.userData.cardId === this.hoveredCardId;
      const angle = startAngle + idx * angleStep;

      // Space out linearly in X and stack from left to right in Z
      let tx = angle * 0.35;
      let ty = baseLocalY - Math.abs(angle) * 0.02;
      let tz = baseLocalZ + idx * 0.015; // progressive linear Z offset (left-to-right layering)

      // Flatten yaw/roll completely to avoid clipping edges
      let rx = -0.05;
      let ry = 0.0;
      let rz = 0.0;

      const isHeld = cv.mesh.userData.cardId === this.heldCardId;

      if (isHeld) {
        tx = 0.0;
        ty = 0.12;
        tz = -0.12;
        rx = 0.05;
        ry = 0.0;
        rz = 0.0;
        cv.targetPosition.set(tx, ty, tz);
        cv.targetRotation.set(rx, ry, rz);
        cv.mesh.userData.targetScale = new THREE.Vector3(0.9, 0.9, 0.9);
      } else if (isHovered && this.activeView === 1) {
        tx = 0.0;
        ty = 0.0;
        tz = -0.13;
        rx = 0.0;
        rz = 0.0;
        ry = 0.0;
        cv.targetPosition.set(tx, ty, tz);
        cv.targetRotation.set(rx, ry, rz);
        cv.mesh.userData.targetScale = null;
      } else {
        cv.targetPosition.set(tx, ty, tz);
        cv.targetRotation.set(rx, ry, rz);
        cv.mesh.userData.targetScale = null;
      }
    });
  }

  private raycastCardsAtRest(): string | null {
    // Save current positions and rotations
    const originalPositions = this.cardVisuals.map(cv => cv.mesh.position.clone());
    const originalRotations = this.cardVisuals.map(cv => cv.mesh.rotation.clone());

    // Move meshes to their RESTING target positions for raycasting
    const count = this.cardVisuals.length;
    const baseLocalY = -0.04;
    const baseLocalZ = -0.16; // resting Z
    const angleRange = Math.min(0.6, 0.12 * (count - 1));
    const angleStep = count > 1 ? angleRange / (count - 1) : 0;
    const startAngle = -angleRange / 2;

    this.cardVisuals.forEach((cv, idx) => {
      const angle = startAngle + idx * angleStep;
      const tx = angle * 0.35;
      const ty = baseLocalY - Math.abs(angle) * 0.02;
      const tz = baseLocalZ + idx * 0.015;

      cv.mesh.position.set(tx, ty, tz);
      cv.mesh.rotation.set(-0.05, 0, 0);
      cv.mesh.updateMatrixWorld(true);
    });

    const meshes = this.cardVisuals.map(cv => cv.mesh);
    const intersects = this.raycaster.intersectObjects(meshes);

    // Restore original positions and rotations
    this.cardVisuals.forEach((cv, idx) => {
      cv.mesh.position.copy(originalPositions[idx]);
      cv.mesh.rotation.copy(originalRotations[idx]);
      cv.mesh.updateMatrixWorld(true);
    });

    if (intersects.length > 0) {
      return intersects[0].object.userData.cardId;
    }
    return null;
  }

  private raycastCardsInCurrentState(): string | null {
    const meshes = this.cardVisuals.map(cv => {
      cv.mesh.updateMatrixWorld(true);
      return cv.mesh;
    });
    const intersects = this.raycaster.intersectObjects(meshes);
    if (intersects.length > 0) {
      return intersects[0].object.userData.cardId;
    }
    return null;
  }

  private performRaycasting() {
    if (this.mouse.x === -999 || (this.activeView !== 1 && !(this.activeView === 2 && this.ui && this.ui.mobileModeActive))) {
      this.hoveredCardId = null;
      return;
    }

    this.raycaster.setFromCamera(this.mouse, this.camera);
    if (this.ui && this.ui.mobileModeActive) {
      const meshes = this.cardVisuals.map(cv => cv.mesh);
      const intersects = this.raycaster.intersectObjects(meshes);
      this.hoveredCardId = intersects.length > 0 ? intersects[0].object.userData.cardId : null;
    } else {
      this.hoveredCardId = this.raycastCardsAtRest();
    }
  }

  animate = (time: number) => {
    requestAnimationFrame(this.animate);
    this.updateFpsStats(time);
    const sec = time * 0.001;
    const isForge = this.engine.runState.gameState === 'FORGE';
    const isShop = this.engine.runState.gameState === 'SHOP';
    const isEvent = this.engine.runState.gameState === 'EVENT';

    // Animate hanging light bulb sway
    if (this.bulbGroup) {
      const swingX = Math.sin(sec * 1.1) * 0.06;
      const swingZ = Math.cos(sec * 0.8) * 0.05;
      this.bulbGroup.rotation.set(swingX, 0, swingZ);
    }

    // Animate dust particles drift
    if (this.dustGeometry) {
      const posArr = this.dustGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArr.length; i += 3) {
        posArr[i + 1] -= 0.003; // sink slowly
        posArr[i] += Math.sin(sec * 0.5 + i) * 0.001; // drift
        if (posArr[i + 1] < 0) {
          posArr[i + 1] = 2.2; // reset to ceiling
          posArr[i] = (Math.random() - 0.5) * 3.0;
        }
      }
      this.dustGeometry.attributes.position.needsUpdate = true;
    }

    // Check player death / game over state to adjust lights
    const isGameOver = this.engine.runState.gameState === 'GAME_OVER';

    if (isGameOver) {
      // Dark death scene - Extinguish hanging light bulb and other spotlights
      this.bulbLight.intensity = 0.0;
      this.wheelSpotlight.intensity = 0.0;
      this.feltSpotlight.intensity = 0.0;
      this.ambientLight.intensity = 0.05; // very dim gray light, glowing red eyes dominate
      this.bulbMaterial.emissive.setHex(0x000000);
      this.bulbMaterial.color.setHex(0x222222);
    } else {
      // Normal game lighting with gentle light bulb flicker
      const baseIntensity = 24.0 + Math.random() * 6.0;
      const flicker = Math.random() < 0.004 ? 0.2 : 1.0; // occasional light dip
      
      this.bulbLight.intensity = baseIntensity * flicker;
      this.bulbMaterial.emissiveIntensity = flicker;
      
      let ambientColor = 0x555c57;
      let ambientIntensity = 2.8;
      let spotlightColor = 0xfff8e7;
      let bulbColor = 0xffeaad;
      
      const battle = this.engine.battleState;
      if (battle && this.engine.runState.gameState === 'COMBAT') {
        const isPointsMode = this.engine.runState.combatMode === 'points';
        const pScore = battle.playerScore || 0;
        const eScore = battle.enemyScore || 0;

        if (isPointsMode && pScore !== eScore) {
          if (pScore > eScore) {
            // Player Lead: Warm golden-amber
            ambientColor = 0x4a3b00;
            ambientIntensity = 2.2;
            spotlightColor = 0xffc107;
            bulbColor = 0xffd54f;
          } else {
            // Enemy Lead: Alert warning red
            ambientColor = 0x4a0a0d;
            ambientIntensity = 1.8;
            spotlightColor = 0xff1744;
            bulbColor = 0xff5252;
          }
        } else {
          // Default encounter colors
          const enemy = battle.enemy;
          if (enemy.isElite || enemy.spriteName === 'dealer_claw') { // Elite
            ambientColor = 0x3a1f5c;
            ambientIntensity = 1.8;
            spotlightColor = 0xe040fb;
            bulbColor = 0xb388ff;
          } else if (enemy.isBoss) { // Boss
            ambientColor = 0x5c1a1a;
            ambientIntensity = 1.2;
            spotlightColor = 0xff1744;
            bulbColor = 0xff3d00;
          }
        }
      }
      
      this.bulbMaterial.emissive.setHex(bulbColor);
      this.bulbMaterial.color.setHex(bulbColor);
      this.bulbLight.color.setHex(bulbColor);
      
      this.wheelSpotlight.intensity = 15.0;
      this.wheelSpotlight.color.setHex(spotlightColor);
      this.feltSpotlight.intensity = 20.0;
      this.feltSpotlight.color.setHex(spotlightColor);
      this.ambientLight.intensity = ambientIntensity;
      this.ambientLight.color.setHex(ambientColor);
    }

    // Trigger visual rebuilds reactively on state transitions
    const isInBattle = !!this.engine.battleState;
    
    // 1. Rebuild wheels and boards on battle start
    if (isInBattle && !this.wasInBattle) {
      this.rebuildWheelsForCombat();
    }
    this.wasInBattle = isInBattle;

    // 2. Rebuild player/enemy wheels and boards on starting selection (non-combat)
    if (!isInBattle) {
      const currentWheelId = this.engine.runState.selectedWheelId;
      if (currentWheelId !== this.lastPlayerWheelId) {
        this.lastPlayerWheelId = currentWheelId;
        this.wheelVis.rebuildWheel(false, this.engine.runState.playerWheel);
        this.enemyWheelVis.rebuildWheel(true, this.engine.runState.playerWheel);
        if (this.playerFeltMesh) {
          const oldMat = this.playerFeltMesh.material as THREE.MeshBasicMaterial;
          if (oldMat.map) oldMat.map.dispose();
          oldMat.dispose();
          this.playerFeltMesh.material = new THREE.MeshBasicMaterial({
            map: this.createFeltTexture(false),
            fog: false
          });
        }
        if (this.enemyFeltMesh) {
          const oldMat = this.enemyFeltMesh.material as THREE.MeshBasicMaterial;
          if (oldMat.map) oldMat.map.dispose();
          oldMat.dispose();
          this.enemyFeltMesh.material = new THREE.MeshBasicMaterial({
            map: this.createFeltTexture(true),
            fog: false
          });
        }
      }
    }

    // 3. Rebuild wheels and boards on temporary card board modifications (combat)
    if (isInBattle && this.engine.battleState) {
      const boardHash = JSON.stringify(this.engine.battleState.boardModifiers) + `|owner-${this.engine.battleState.activeWheelOwner}|pred-${JSON.stringify(this.engine.battleState.predictionSector || [])}`;
      if (boardHash !== this.lastBoardHash) {
        this.lastBoardHash = boardHash;
        this.rebuildWheelsForCombat();
      }
    }

    // Update animations of independent scene visual nodes
    this.enemyVis.update(sec);
    this.updateCurseVisual();

    if (this.curseGroup) {
      const core = this.curseGroup.getObjectByName("curseCore");
      if (core) {
        // Soft hover animation
        core.position.y = 0.22 + Math.sin(sec * 1.5) * 0.02;
        // Slow rotation
        core.rotation.y += 0.01;
        
        // Custom sub-mesh animations based on curse ID
        const activeCurse = this.engine.battleState?.curse;
        if (activeCurse) {
          const cid = activeCurse.id;
          if (cid === 'faraday') {
            for (let i = 0; i < 3; i++) {
              const r = core.getObjectByName(`ring_${i}`);
              if (r) r.rotation.z += 0.02 * (i + 1);
            }
          } else if (cid === 'fog') {
            for (let i = 0; i < 4; i++) {
              const d = core.getObjectByName(`dot_${i}`);
              if (d) {
                d.position.y = Math.sin(sec * 2.0 + i) * 0.04;
              }
            }
          } else if (cid === 'rust') {
            const sg = core.getObjectByName("smallGear");
            if (sg) sg.rotation.z -= 0.03;
          } else if (cid === 'avarice') {
            const ir = core.getObjectByName("innerRing");
            const or = core.getObjectByName("outerRing");
            if (ir) ir.rotation.x += 0.03;
            if (or) or.rotation.z += 0.015;
          } else if (cid === 'eclipse') {
            const c = core.getObjectByName("crescent");
            if (c) c.rotation.z -= 0.025;
          } else if (cid === 'curse') {
            for (let i = 0; i < 3; i++) {
              const s = core.getObjectByName(`spike_${i}`);
              if (s) {
                s.position.y = Math.sin(sec * 3.0 + i) * 0.01;
              }
            }
          } else if (cid === 'choked') {
            for (let i = 0; i < 2; i++) {
              const c = core.getObjectByName(`cage_${i}`);
              if (c) c.rotation.z += 0.01 * (i === 0 ? 1 : -1);
            }
          }
        }
      }
    }

    // Active physics update tied to the requestAnimationFrame loop to ensure perfect sync
    if (this.engine.battleState && this.engine.battleState.phase === 'spinning') {
      const activePhysics = this.engine.physics;
      const dt = Math.min(0.1, sec - this.lastPhysicsTime);
      this.physicsAccumulator += dt;
      
      const fixedStep = 0.008; // 120Hz physics step
      while (this.physicsAccumulator >= fixedStep) {
        activePhysics.update(fixedStep);
        this.physicsAccumulator -= fixedStep;
        
        if (activePhysics.justHitPin) {
          activePhysics.justHitPin = false;
          const relSpeed = Math.abs(activePhysics.ballOmega - activePhysics.wheelOmega);
          this.sound.playPegBounce(0.8 + relSpeed * 0.15);
          if (this.onBounce) {
            this.onBounce('pin', relSpeed);
          }
        }
        if (activePhysics.justHitDivider) {
          activePhysics.justHitDivider = false;
          const relSpeed = Math.abs(activePhysics.ballOmega - activePhysics.wheelOmega);
          
          const mods = this.engine.battleState?.physicsModifiers;
          let specialType = '';
          if (mods) {
            if (mods.targetZoneBias > 0) specialType = 'magnetic';
            else if (mods.nudgeCheatActive) specialType = 'nudge';
            else if (mods.friction !== 1.0) specialType = 'friction';
            else if (mods.wheelTilt > 0) specialType = 'tilt';
            else if (mods.ballMass !== 1.0) specialType = 'mass';
          }
          if (specialType) {
            this.sound.playSpecialPhysicsClick(specialType, 0.6 + relSpeed * 0.1);
          } else {
            this.sound.playRouletteClick(0.6 + relSpeed * 0.1);
          }
          
          if (this.onBounce) {
            this.onBounce('divider', relSpeed);
          }
        }
        
        if (activePhysics.isSettled) {
          this.physicsAccumulator = 0;
          if (this.onSpinSettled) {
            const cb = this.onSpinSettled;
            this.onSpinSettled = undefined;
            cb();
          }
          break;
        }
      }
    }
    this.lastPhysicsTime = sec;

    // Physics sync: update player and enemy wheels
    const battle = this.engine.battleState;
    const playerWheelConfig = battle ? battle.playerWheel : this.engine.runState.playerWheel;
    const enemyWheelConfig = battle ? battle.enemyWheel : this.engine.runState.playerWheel;
    const playerPhysics = this.engine.playerPhysics;
    const enemyPhysics = this.engine.enemyPhysics;
    
    const activeOwner = battle ? battle.activeWheelOwner : 'player';
    const playerMods = (battle && activeOwner === 'player') ? battle.physicsModifiers : undefined;
    const enemyMods = (battle && activeOwner === 'enemy') ? battle.physicsModifiers : undefined;

    this.wheelVis.update(
      playerPhysics.wheelAngle,
      playerPhysics.ballAngle,
      playerPhysics.ballRadius,
      playerPhysics.ballHeight,
      playerPhysics.isSettled,
      playerPhysics.settledSlotIndex,
      playerWheelConfig,
      playerMods,
      playerPhysics.balls
    );
    this.enemyWheelVis.update(
      enemyPhysics.wheelAngle,
      enemyPhysics.ballAngle,
      enemyPhysics.ballRadius,
      enemyPhysics.ballHeight,
      enemyPhysics.isSettled,
      enemyPhysics.settledSlotIndex,
      enemyWheelConfig,
      enemyMods,
      enemyPhysics.balls
    );

    // Animate bell plunger shake
    if (this.bellShakeTime > 0) {
      this.bellShakeTime -= 0.016;
      const t = 1.0 - Math.min(1.0, this.bellShakeTime / 0.15);
      this.bellPlunger.position.y = 0.055 - Math.sin(t * Math.PI) * 0.015;
    } else {
      this.bellPlunger.position.y = 0.055;
    }

    // Animate shop bell plunger shake
    if (this.shopBellShakeTime > 0) {
      this.shopBellShakeTime -= 0.016;
      const t = 1.0 - Math.min(1.0, this.shopBellShakeTime / 0.15);
      this.shopBellPlunger.position.y = 0.053 - Math.sin(t * Math.PI) * 0.012;
    } else {
      this.shopBellPlunger.position.y = 0.053;
    }

    // Animate alchemical candle flicker in shop
    if (this.shopCandleLight && this.engine.runState.gameState === 'SHOP') {
      this.shopCandleLight.intensity = 3.5 + Math.sin(sec * 15.0) * 0.5 + (Math.random() - 0.5) * 0.2;
    }

    // Animate event torch pulsing in event crypt
    if (this.engine.runState.gameState === 'EVENT') {
      if (this.eventLeftTorchLight) {
        this.eventLeftTorchLight.intensity = 1.5 + Math.sin(sec * 2.5) * 0.4;
      }
      if (this.eventRightTorchLight) {
        this.eventRightTorchLight.intensity = 1.5 + Math.cos(sec * 2.5) * 0.4;
      }
    }

    if (this.bookMesh) {
      this.bookMesh.visible = (this.engine.runState.gameState === 'COMBAT');
      
      // Move to handScene when zoomed to bypass dither/PS1 low-res pixelation pass
      if (this.isBookZoomed) {
        if (this.bookMesh.parent !== this.handScene) {
          this.handScene.add(this.bookMesh);
        }
        
        // Zoomed target in camera space
        const targetPos = new THREE.Vector3(0, 0, -0.40); // 0.4 units in front of camera
        targetPos.applyMatrix4(this.camera.matrixWorld);
        
        const targetQuat = this.camera.quaternion.clone();
        targetQuat.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2.2));
        
        this.bookMesh.position.lerp(targetPos, 0.15);
        this.bookMesh.quaternion.slerp(targetQuat, 0.15);
      } else {
        if (this.bookMesh.parent !== this.scene) {
          this.scene.add(this.bookMesh);
        }
        
        // Tabletop target
        const targetPos = new THREE.Vector3(-0.8, 0.012, 0.15);
        const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 10, 0));
        
        this.bookMesh.position.lerp(targetPos, 0.15);
        this.bookMesh.quaternion.slerp(targetQuat, 0.15);
      }
    }

    if (this.engine.battleState && this.bookMesh && this.bookMesh.visible) {
      const runState = this.engine.runState;
      const levels = runState.colorLevels || { red: 1, black: 1, green: 1, gold: 1, purple: 1, cyan: 1, crimson: 1 };
      const unlocks = runState.colorUnlocks || { red_ability: false, black_ability: false, green_ability: false };
      const boardMods = this.engine.battleState.boardModifiers;
      
      const stateKey = `${levels.red}_${levels.black}_${levels.green}_${levels.gold}_${levels.purple}_${levels.cyan}_${levels.crimson}_${unlocks.red_ability}_${unlocks.black_ability}_${unlocks.green_ability}_${boardMods?.redStreakCount || 0}_${boardMods?.blackStreakCount || 0}_${boardMods?.insuranceActive || false}_${boardMods?.enemyStunTurns || 0}`;
      
      if (stateKey !== this.lastBookStateKey) {
        this.lastBookStateKey = stateKey;
        this.updateBookTexture();
      }
    }

    // Sync hand cards
    if (this.engine.battleState) {
      this.syncHand(this.engine.battleState.hand);
      this.syncPlayedCards(this.engine.battleState.activePlayedCards || []);
      this.performRaycasting();
      this.updateCardTargets();
      this.updatePlayedCardTargets();
      
      // Scale hand cards depending on view
      const targetScale = new THREE.Vector3(1.0, 1.0, 1.0);
      if (this.activeView === 1) {
        targetScale.set(0.50, 0.50, 0.50); // scale down in card view
      } else if (this.activeView === 2) {
        targetScale.set(0.35, 0.35, 0.35); // scale down in board view
      } else if (this.activeView === 3 || this.activeView === 5 || this.activeView === 6 || this.activeView === 7) {
        targetScale.set(0.01, 0.01, 0.01); // shrink to zero in wheel or opponent view
      } else if (this.activeView === 4) {
        targetScale.set(0.30, 0.30, 0.30); // scale down in overview view (reduced to 0.30)
      }
      
      // Scale the individual card meshes instead of scaling the handGroup.
      // This ensures that the horizontal spacing layout is not scaled down, preventing overlapping.
      this.cardVisuals.forEach(cv => {
        const scale = cv.mesh.userData.targetScale || targetScale;
        cv.mesh.scale.lerp(scale, 0.08);
      });
      // Keep handGroup scale always at (1, 1, 1)
      this.handGroup.scale.set(1.0, 1.0, 1.0);

      // Sync 3D chips stacks
      const betsHash = this.engine.battleState.bets.map(b => `${b.type}-${b.amount}-${b.numberValue || 0}`).join('|') + `|pool-${this.engine.battleState.chipsPool}`;
      if (betsHash !== this.lastBetsHash) {
        this.lastBetsHash = betsHash;
        this.syncChips();
      }

      // Track turn changes to reset the deck focus flag
      if (this.engine.battleState.turn !== this.lastTurnIndex) {
        this.lastTurnIndex = this.engine.battleState.turn;
        this.hasFocusedDeckThisTurn = false;
      }

      // Automatic turn-start Deck zoom
      if (this.ui && this.ui.mobileModeActive) {
        const battle = this.engine.battleState;
        if (battle.phase === 'betting') {
          const canDraw = (battle.drawPile.length > 0 || battle.discardPile.length > 0) && battle.hand.length < 8;
          if (battle.drawsThisTurn === 0 && canDraw) {
            if (!this.hasFocusedDeckThisTurn) {
              this.manualView = 9;
              this.hasFocusedDeckThisTurn = true;
            }
          } else if (battle.drawsThisTurn > 0 && this.manualView === 9) {
            this.manualView = 1; // Transition manualView to 1 (Cards) instead of 2
          }
        }
      }

      // Sync 3D draw deck stack size and draw cost
      const drawPileCount = this.engine.battleState.drawPile.length;
      const currentDrawCost = this.engine.getDrawCardCost();
      if (drawPileCount !== this.lastDrawPileCount || currentDrawCost !== this.lastDrawCardCost) {
        this.lastDrawPileCount = drawPileCount;
        this.lastDrawCardCost = currentDrawCost;
        this.syncDeck();
      }
      
      // Update camera views depending on game phase and manualView selection
      let currentActiveView = this.manualView;
      const resOverlay = document.getElementById('resolution-overlay');
      const isSpinOverlayVisible = resOverlay && !resOverlay.classList.contains('hidden');
      const isResolving = this.engine.battleState?.isResolving;
      if (this.engine.battleState.phase === 'spinning' || isSpinOverlayVisible || isResolving) {
        const isEnemy = this.engine.battleState?.activeWheelOwner === 'enemy';
        currentActiveView = isEnemy ? 6 : 3; // Force Player Wheel (3) or Enemy Wheel (6) during active spin/resolution
      }
      if (this.ui && this.ui.isCombatIntroActive) {
        currentActiveView = 7;
      }
      this.activeView = currentActiveView;

      if (this.activeView === 1) { // Cards
        this.cameraTargetPos.set(0, 0.8, 1.25);
        this.cameraTargetLookAt.set(0, 0.25, 0.8);
      } else if (this.activeView === 2) { // Board (focus on the player's board)
        const offset = (this.ui && this.ui.mobileModeActive) ? this.boardHorizontalOffset : 0.0;
        if (this.ui && this.ui.mobileModeActive) {
          this.cameraTargetPos.set(0.0 + offset, 1.6, 1.15); // Shift back on Z to fit board and chips stacks
          this.cameraTargetLookAt.set(0.0 + offset, 0.0, 0.45);
        } else {
          this.cameraTargetPos.set(0.0, 1.40, 0.74);
          this.cameraTargetLookAt.set(0.0, 0.0, 0.52);
        }
      } else if (this.activeView === 3) { // Player Wheel
        if (this.ui && this.ui.mobileModeActive) {
          this.cameraTargetPos.set(-0.8, 1.75, 0.85); // Zoomed out
          this.cameraTargetLookAt.set(-0.8, 0.05, -0.75);
        } else {
          this.cameraTargetPos.set(-0.8, 1.25, 0.35);
          this.cameraTargetLookAt.set(-0.8, 0.05, -0.75);
        }
      } else if (this.activeView === 6) { // Enemy Wheel
        if (this.ui && this.ui.mobileModeActive) {
          this.cameraTargetPos.set(0.8, 1.75, 0.85); // Zoomed out
          this.cameraTargetLookAt.set(0.8, 0.05, -0.75);
        } else {
          this.cameraTargetPos.set(0.8, 1.25, 0.35);
          this.cameraTargetLookAt.set(0.8, 0.05, -0.75);
        }
      } else if (this.activeView === 5) { // Opponent Side (cinematic diagonal view of opponent and their board)
        const animProgress = this.oppAnimType === 'card_play' ? Math.min(1.0, this.oppAnimTime / 3.5) : 0;
        if (this.oppAnimType === 'card_play' && animProgress >= 0.2 && animProgress < 0.8) {
          // Camera zoom/focus on the played card above the board!
          this.cameraTargetPos.set(0.0, 0.85, -1.35); // Close zoom
          this.cameraTargetLookAt.set(0.0, 0.35, -1.95); // Look straight at the card
        } else {
          if (this.ui && this.ui.mobileModeActive) {
            this.cameraTargetPos.set(-0.4, 1.95, 0.05); // Zoomed out
            this.cameraTargetLookAt.set(0.0, 0.1, -1.95);
          } else {
            this.cameraTargetPos.set(-0.4, 1.75, -0.45);
            this.cameraTargetLookAt.set(0.0, 0.1, -1.95);
          }
        }
      } else if (this.activeView === 7) { // Opponent Himself (direct face-to-face view of opponent mask and eyes)
        if (this.ui && this.ui.mobileModeActive) {
          this.cameraTargetPos.set(0.0, 1.55, -0.45); // Zoomed out
          this.cameraTargetLookAt.set(0.0, 1.25, -3.0);
        } else {
          this.cameraTargetPos.set(0.0, 1.45, -0.95);
          this.cameraTargetLookAt.set(0.0, 1.25, -3.0);
        }
      } else if (this.activeView === 9) { // Draw Deck Camera View
        const offset = (this.ui && this.ui.mobileModeActive) ? this.boardHorizontalOffset : 0.0;
        this.cameraTargetPos.set(-0.75 + offset, 1.25, 1.0);
        this.cameraTargetLookAt.set(-0.75 + offset, 0.05, 0.65);
      } else { // Overview (4)
        if (this.ui && this.ui.mobileModeActive) {
          this.cameraTargetPos.set(0, 2.2, 1.8);
          this.cameraTargetLookAt.set(0, 0.1, -0.2);
        } else {
          this.cameraTargetPos.set(0, 1.9, 1.5);
          this.cameraTargetLookAt.set(0, 0.1, -0.2);
        }
      }
    } else if (isForge) {
      // Forge state camera view
      this.activeView = 8;
      this.cameraTargetPos.set(0.0, 1.25, 0.95);
      this.cameraTargetLookAt.set(-0.25, 0.45, -0.5);

      // Transition wheel to forge scene if not already done
      if (this.wheelVis.group.parent !== this.forgeScene) {
        this.forgeScene.add(this.wheelVis.group);
        this.wheelVis.group.position.set(-0.9, 0.55, -0.5);
        this.wheelVis.group.scale.set(0.45, 0.45, 0.45);
        
        // sync initial forge card offers
        this.syncForgeCards();
      }

      // Rotate wheel visual slowly on pedestal
      this.wheelVis.group.rotation.y += 0.005;

      // Pulse furnace coals light (lower intensity)
      if (this.forgeFurnaceLight) {
        this.forgeFurnaceLight.intensity = 2.5 + Math.sin(sec * 5.0) * 0.8;
      }

      // Update sparks particles
      this.updateForgeSparks(sec);

      // Raycast and sync forge cards
      this.performForgeRaycasting();
      this.syncForgeCards();
      this.forgeCardsVisuals.forEach(fcv => fcv.update(0.12));
    } else if (isShop) {
      // Shop state camera view
      this.activeView = 9;
      this.cameraTargetPos.set(0.0, 1.2, 0.85);
      this.cameraTargetLookAt.set(0.0, 0.45, -0.4);

      // Transition wheel back to main scene if it was in forge
      if (this.wheelVis.group.parent === this.forgeScene) {
        this.scene.add(this.wheelVis.group);
        this.wheelVis.group.position.set(-0.8, 0.05, -0.75);
        this.wheelVis.group.rotation.set(0, 0, 0);
        this.wheelVis.group.scale.set(0.55, 0.55, 0.55);
      }

      this.performShopRaycasting();
      this.syncShopItems();
      this.shopItemsVisuals.forEach(siv => siv.update(0.12));
    } else if (isEvent) {
      // Event state camera view
      this.activeView = 10;
      this.cameraTargetPos.set(0.0, 1.25, 0.95);
      this.cameraTargetLookAt.set(0.0, 0.5, -0.4);

      // Transition wheel back to main scene if it was in forge
      if (this.wheelVis.group.parent === this.forgeScene) {
        this.scene.add(this.wheelVis.group);
        this.wheelVis.group.position.set(-0.8, 0.05, -0.75);
        this.wheelVis.group.rotation.set(0, 0, 0);
        this.wheelVis.group.scale.set(0.55, 0.55, 0.55);
      }

      this.performEventRaycasting();
      this.syncEventChoices();
      this.eventChoicesVisuals.forEach(ecv => ecv.update(0.12));
    } else {
      // Transition wheel back to normal scene if it was in forge
      if (this.wheelVis.group.parent === this.forgeScene) {
        this.scene.add(this.wheelVis.group);
        this.wheelVis.group.position.set(-0.8, 0.05, -0.75);
        this.wheelVis.group.rotation.set(0, 0, 0);
        this.wheelVis.group.scale.set(0.55, 0.55, 0.55);

        // Remove forge card visual meshes
        this.forgeCardsVisuals.forEach(cv => this.forgeCardsGroup.remove(cv.mesh));
        this.forgeCardsVisuals = [];
      }

      // Clean up shop items
      if (this.shopItemsVisuals.length > 0) {
        this.shopItemsVisuals.forEach(cv => this.shopCardsGroup.remove(cv.mesh));
        this.shopItemsVisuals = [];
        this.hoveredShopItemId = null;
      }

      // Clean up event choices
      if (this.eventChoicesVisuals.length > 0) {
        this.eventChoicesVisuals.forEach(cv => this.eventChoicesGroup.remove(cv.mesh));
        this.eventChoicesVisuals = [];
        this.hoveredEventChoiceId = null;
      }

      // Resting map or event state: slowly pan camera
      this.activeView = 4;
      this.cameraTargetPos.set(Math.sin(sec * 0.15) * 0.5, 1.5, 1.4);
      this.cameraTargetLookAt.set(0, 0.0, -0.8);
      
      // Remove all visual cards from local group
      this.cardVisuals.forEach(cv => this.handGroup.remove(cv.mesh));
      this.cardVisuals = [];
      this.handGroup.scale.set(1.0, 1.0, 1.0); // Reset scale

      // Remove all played cards
      this.playedCardVisuals.forEach(cv => this.playedCardsGroup.remove(cv.mesh));
      this.playedCardVisuals = [];

      // Clear chips
      if (this.chipMeshes.length > 0) {
        this.syncChips();
        this.lastBetsHash = '';
      }
    }

    // Update opponent action animation (card play and chip slide physics)
    if (this.oppAnimType === 'card_play' && this.oppActionCardMesh) {
      this.oppAnimTime += 0.016;
      const duration = 3.5;
      const progress = Math.min(1.0, this.oppAnimTime / duration);
      
      if (progress < 0.2) {
        // Lift up & rotate
        const t = progress / 0.2;
        // Fly from deck/hand position (0, 0.1, -2.62) to above the board (0, 0.35, -1.95)
        this.oppActionCardMesh.position.set(0, 0.1 + t * 0.25, -2.62 + t * 0.67);
        this.oppActionCardMesh.rotation.set(-Math.PI / 2 + t * (Math.PI / 2 + 0.3), Math.PI - t * Math.PI, 0);
      } else if (progress < 0.8) {
        // Hover above the board (0, 0.35, -1.95)
        this.oppActionCardMesh.position.set(0, 0.35, -1.95);
        this.oppActionCardMesh.rotation.set(0.3, 0, 0); // Tilted towards the player camera
      } else {
        // Sink/fade towards the board felt
        const t = (progress - 0.8) / 0.2;
        this.oppActionCardMesh.position.set(0, 0.35 - t * 0.3, -1.95);
        this.oppActionCardMesh.rotation.set(0.3 - t * (Math.PI / 2 + 0.3), 0, 0);
      }

      if (this.oppAnimChips.length > 0) {
        const chipStartProgress = 0.3;
        const chipEndProgress = 0.8;
        if (progress > chipStartProgress) {
          const t = Math.min(1.0, (progress - chipStartProgress) / (chipEndProgress - chipStartProgress));
          const easeT = 1.0 - Math.pow(1.0 - t, 3);
          
          this.oppAnimChips.forEach((chip) => {
            const startPos = chip.userData.startPosition;
            const targetPos = chip.userData.targetPosition;
            if (startPos && targetPos) {
              chip.position.x = startPos.x + (targetPos.x - startPos.x) * easeT;
              chip.position.y = startPos.y + (targetPos.y - startPos.y) * easeT + Math.sin(t * Math.PI) * 0.15;
              chip.position.z = startPos.z + (targetPos.z - startPos.z) * easeT;
            }
          });
        }
      }

      if (progress >= 1.0) {
        this.oppAnimType = 'none';
        this.scene.remove(this.oppActionCardMesh);
        this.oppActionCardMesh = null;
        this.oppAnimChips.forEach(c => this.scene.remove(c));
        this.oppAnimChips = [];
      }
    }

    // Clean up deckCostMesh if combat ended
    if (!this.engine.battleState) {
      if (this.deckCostMesh && this.deckCostMesh.parent) {
        this.scene.remove(this.deckCostMesh);
      }
      this.isBookZoomed = false;
    }

    // Camera transitions with smooth Overview pan/tilt
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    const isMobile = this.ui && this.ui.mobileModeActive;
    if (this.activeView === 4 && this.isDraggingOverview && this.mouse.x !== -999 && !isMobile) {
      targetOffsetX = this.mouse.x * 1.5; // multiplier for a 180-degree sweep
      targetOffsetY = this.mouse.y * 0.8; // multiplier for a 60-degree sweep
      this.overviewPanOffsetX += (targetOffsetX - this.overviewPanOffsetX) * 0.05;
      this.overviewPanOffsetY += (targetOffsetY - this.overviewPanOffsetY) * 0.05;
    } else {
      this.overviewPanOffsetX += (0 - this.overviewPanOffsetX) * 0.05;
      this.overviewPanOffsetY += (0 - this.overviewPanOffsetY) * 0.05;
    }

    const modifiedTargetPos = this.cameraTargetPos.clone();
    const modifiedTargetLookAt = this.cameraTargetLookAt.clone();

    if (this.activeView === 4) {
      const yaw = (this.overviewPanOffsetX / 1.5) * (Math.PI / 2); // maps to -90 to +90 degrees
      const pitch = -1.15 + (this.overviewPanOffsetY / 0.8) * (Math.PI / 6); // -1.15 rad default look down (mouse drag offset tilts relative to this)
      
      const dir = new THREE.Vector3(0, 0, -1);
      dir.applyAxisAngle(new THREE.Vector3(1, 0, 0), pitch);
      dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), -yaw); // minus yaw so dragging right rotates look right
      dir.multiplyScalar(2.0);
      modifiedTargetLookAt.copy(modifiedTargetPos).add(dir);
    } else {
      modifiedTargetPos.x += this.overviewPanOffsetX;
      modifiedTargetPos.y += this.overviewPanOffsetY;
      modifiedTargetLookAt.x += this.overviewPanOffsetX * 0.5;
      modifiedTargetLookAt.y += this.overviewPanOffsetY * 0.5;
    }

    this.camera.position.lerp(modifiedTargetPos, 0.08);
    this.cameraCurrentLookAt.lerp(modifiedTargetLookAt, 0.08);
    this.camera.lookAt(this.cameraCurrentLookAt);

    // Update visual card meshes
    this.cardVisuals.forEach(cv => cv.update(0.12));
    this.playedCardVisuals.forEach(cv => cv.update(0.12));

    if (isForge) {
      // Render Forge scene directly to screen in high-resolution (bypasses low-poly PS1 pixel/dither shader for perfect card legibility)
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.forgeScene, this.camera);
    } else if (isShop) {
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.shopScene, this.camera);
    } else if (isEvent) {
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.eventScene, this.camera);
    } else {
      // Render 3D Scene into low-poly RenderTarget
      this.renderer.setRenderTarget(this.renderTarget);
      this.renderer.render(this.scene, this.camera);
      
      // Render Fullscreen Quad to screen using pixel/dither shader
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.postScene, this.postCamera);
    }

    // Render Hand Cards in a second pass directly to the screen (high-res overlay)
    if (this.engine.battleState) {
      this.renderer.autoClear = false;
      this.renderer.clearDepth();
      this.renderer.render(this.handScene, this.camera);
      this.renderer.autoClear = true;
    }
  };

  private updateBrushIndicatorText(val: number) {
    if (!this.brushIndicatorTextSprite) return;
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 128, 64);
    
    // Draw background bubble
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(4, 4, 120, 56, 8);
    ctx.fill();
    ctx.stroke();
    
    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "Courier Prime", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`⚡${val}`, 64, 32);
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    
    const oldTex = this.brushIndicatorTextSprite.material.map;
    this.brushIndicatorTextSprite.material.map = tex;
    if (oldTex) oldTex.dispose();
  }

  updateBrushDisplay() {
    if (!this.displayPanelCanvas || !this.displayPanelTex) return;
    const canvas = this.displayPanelCanvas;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#2b1b14';
    ctx.fillRect(0, 0, 1024, 256);
    ctx.strokeStyle = '#c59f51';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, 1012, 244);
    ctx.font = '900 72px "Courier Prime", "Arial Black", monospace, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const label = `BRUSH: ⚡${this.activeBrush}`;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 14;
    ctx.strokeText(label, 512, 128);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, 512, 128);
    this.displayPanelTex.needsUpdate = true;

    // Update brush hover mesh color dynamically
    if (this.brushIndicatorMesh) {
      let color = 0xe53935; // Red for 1s
      if (this.activeBrush >= 10) color = 0xffd54f; // Gold for 10s
      else if (this.activeBrush >= 5) color = 0x43a047; // Green for 5s
      (this.brushIndicatorMesh.material as THREE.MeshBasicMaterial).color.setHex(color);

      // Adjust height representation of brushIndicatorMesh
      const heightMultiplier = Math.min(6, Math.ceil(this.activeBrush / 2));
      this.brushIndicatorMesh.scale.y = heightMultiplier;
    }

    // Update the floating indicator text sprite
    this.updateBrushIndicatorText(this.activeBrush);
    
    // Sync to UI custom-bet-input if available
    if (this.ui) {
      const customInput = this.ui.root.querySelector('#custom-bet-input') as HTMLInputElement;
      if (customInput) {
        customInput.value = this.activeBrush.toString();
      }
      this.ui.currentBetAmount = this.activeBrush;
    }
  }

  private syncChips() {
    // 1. Clean up old chip meshes
    this.chipMeshes.forEach(mesh => {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
    });
    this.chipMeshes = [];

    if (!this.engine.battleState) return;

    const chipGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.006, 8);

    // 2. Create new chip meshes based on current bets, broken down by denomination color
    this.engine.battleState.bets.forEach(bet => {
      const pos = this.getBoardCellPosition(bet.type, bet.numberValue);
      
      // Breakdown bet.amount into denominations: 10, 5, 1
      let amount = bet.amount;
      const denoms: number[] = [];
      while (amount >= 10) {
        denoms.push(10);
        amount -= 10;
      }
      while (amount >= 5) {
        denoms.push(5);
        amount -= 5;
      }
      while (amount >= 1) {
        denoms.push(1);
        amount -= 1;
      }

      // Limit stack height to prevent excessive meshes (e.g. max 12)
      const renderDenoms = denoms.slice(0, 12);

      renderDenoms.forEach((denom, j) => {
        let mat = this.chipMaterials.red; // 1s = red
        if (denom === 5) mat = this.chipMaterials.green; // 5s = green
        else if (denom === 10) mat = this.chipMaterials.number; // 10s = gold/yellow

        const chip = new THREE.Mesh(chipGeo, mat);
        chip.castShadow = true;
        chip.receiveShadow = true;
        chip.userData = { isPlacedChip: true, betType: bet.type, numberValue: bet.numberValue };
        
        // Stable pseudorandom offset based on bet type, numberValue, and stack index
        // This stops placed chips from shifting around when other bets change
        const seedValue = (bet.type.charCodeAt(0) || 0) + (bet.numberValue || 0) + j;
        const rx = (Math.sin(seedValue * 12.9898) * 43758.5453 % 1) * 0.006;
        const rz = (Math.cos(seedValue * 78.233) * 43758.5453 % 1) * 0.006;
        
        chip.position.set(pos.x + rx, pos.y + j * 0.007 + 0.003, pos.z + rz);
        
        this.scene.add(chip);
        this.chipMeshes.push(chip);
      });
    });

    // 3. Draw source stacks dynamically based on player's available turn balance
    const pool = this.engine.battleState.chipsPool;
    const count10 = pool >= 10 ? Math.max(1, Math.min(8, Math.floor(pool / 10))) : 0;
    const count5 = pool >= 5 ? Math.max(1, Math.min(6, Math.floor(pool / 5))) : 0;
    const count1 = pool >= 1 ? Math.max(1, Math.min(8, pool)) : 0;

    const isMobile = this.ui && this.ui.mobileModeActive;
    const x10 = isMobile ? -0.107 : 0.423;
    const x5  = isMobile ? 0.0 : 0.53;
    const x1  = isMobile ? 0.107 : 0.637;
    const zPos = isMobile ? 0.85 : 0.90;

    // Stack of 10s (Gold/Number material)
    for (let j = 0; j < count10; j++) {
      const chip = new THREE.Mesh(chipGeo, this.chipMaterials.number);
      chip.position.set(x10, 0.005 + j * 0.007 + 0.003, zPos);
      chip.castShadow = true;
      chip.receiveShadow = true;
      chip.userData = { isSourceStack: true, denom: 10 };
      this.scene.add(chip);
      this.chipMeshes.push(chip);
    }
    // Stack of 5s (Green material)
    for (let j = 0; j < count5; j++) {
      const chip = new THREE.Mesh(chipGeo, this.chipMaterials.green);
      chip.position.set(x5, 0.005 + j * 0.007 + 0.003, zPos);
      chip.castShadow = true;
      chip.receiveShadow = true;
      chip.userData = { isSourceStack: true, denom: 5 };
      this.scene.add(chip);
      this.chipMeshes.push(chip);
    }
    // Stack of 1s (Red material)
    for (let j = 0; j < count1; j++) {
      const chip = new THREE.Mesh(chipGeo, this.chipMaterials.red);
      chip.position.set(x1, 0.005 + j * 0.007 + 0.003, zPos);
      chip.castShadow = true;
      chip.receiveShadow = true;
      chip.userData = { isSourceStack: true, denom: 1 };
      this.scene.add(chip);
      this.chipMeshes.push(chip);
    }

    if (this.labelsMesh) {
      this.labelsMesh.position.set(x5, 0.006, zPos);
    }
    this.syncDeck();
  }

  private syncDeck() {
    // Clear old deck meshes
    this.deckMeshes.forEach(mesh => {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
    });
    this.deckMeshes = [];

    const battle = this.engine.battleState;
    if (!battle) {
      if (this.deckCostMesh) {
        this.scene.remove(this.deckCostMesh);
      }
      return;
    }

    const cardsCount = battle.drawPile.length;
    if (cardsCount === 0) {
      if (this.deckCostMesh) {
        this.scene.remove(this.deckCostMesh);
      }
      return; // Disappear if no cards remaining!
    }

    // Draw stack of facedown cards
    const stackSize = Math.max(1, Math.min(6, Math.ceil(cardsCount / 3)));
    const cardGeo = new THREE.BoxGeometry(0.22, 0.31, 0.006);
    const cardBackTex = this.createOpponentCardBackTexture(); // facedown texture
    const cardMat = new THREE.MeshBasicMaterial({
      map: cardBackTex,
      fog: false
    });

    const dx = -0.75;
    const dz = 0.65;

    for (let i = 0; i < stackSize; i++) {
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.rotation.x = -Math.PI / 2;
      cardMesh.rotation.z = (Math.random() - 0.5) * 0.05;
      
      const rx = (Math.random() - 0.5) * 0.003;
      const rz = (Math.random() - 0.5) * 0.003;
      
      cardMesh.position.set(dx + rx, 0.005 + i * 0.007, dz + rz);
      cardMesh.userData = { isDrawDeck: true };
      
      this.scene.add(cardMesh);
      this.deckMeshes.push(cardMesh);
    }

    // 3D Draw Deck Cost Label
    const cost = this.engine.getDrawCardCost();
    const text = cost === 0 ? 'DRAW: FREE' : `DRAW: ${cost} ⚡`;

    if (!this.deckCostMesh) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;

      // Draw onto canvas
      ctx.fillStyle = '#2b1b14';
      ctx.fillRect(0, 0, 512, 128);
      ctx.strokeStyle = '#c59f51';
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, 512 - 6, 128 - 6);

      ctx.fillStyle = '#c59f51';
      ctx.font = 'bold 48px "Courier Prime", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 256, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
      });

      const geom = new THREE.PlaneGeometry(0.22, 0.055);
      const mesh = new THREE.Mesh(geom, material);
      mesh.position.set(-0.75, 0.006, 0.82);
      mesh.rotation.x = -Math.PI / 2;
      
      mesh.userData = { canvas, ctx, texture };
      
      this.scene.add(mesh);
      this.deckCostMesh = mesh;
    } else {
      const { canvas, ctx, texture } = this.deckCostMesh.userData;
      ctx.fillStyle = '#2b1b14';
      ctx.fillRect(0, 0, 512, 128);
      ctx.strokeStyle = '#c59f51';
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, 512 - 6, 128 - 6);

      ctx.fillStyle = '#c59f51';
      ctx.font = 'bold 48px "Courier Prime", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 256, 64);

      texture.needsUpdate = true;
      if (!this.deckCostMesh.parent) {
        this.scene.add(this.deckCostMesh);
      }
    }
  }

  private getBoardCellPosition(betType: string, numVal?: number): THREE.Vector3 {
    let cx = 512;
    let cy = 256;

    const battle = this.engine.battleState;
    const isEnemy = battle && battle.activeWheelOwner === 'enemy';
    const activeWheel = battle ? (isEnemy ? battle.enemyWheel : battle.playerWheel) : this.engine.runState.playerWheel;
    const boardCenterX = 0.0;
    const boardCenterZ = isEnemy ? -1.95 : 0.45;
    const boardWidth = 1.2;

    const outsideBetsList = isEnemy ? this.enemyOutsideBets : this.playerOutsideBets;
    const foundBet = outsideBetsList.find(item => item.type === betType);
    
    if (foundBet) {
      cx = foundBet.xStart + foundBet.width / 2;
      cy = foundBet.yStart + foundBet.height / 2;
    } else if (betType === 'number' && numVal !== undefined) {
      if (activeWheel.greenNumbers.includes(numVal)) {
        cx = 100;
        cy = 190;
      } else {
        const gridNumbers = activeWheel.numbers.filter((n: number) => !activeWheel.greenNumbers.includes(n)).sort((a: number, b: number) => a - b);
        const idx = gridNumbers.indexOf(numVal);
        if (idx >= 0) {
          const cols = Math.ceil(gridNumbers.length / 3);
          const colWidth = 820 / cols;
          const col = Math.floor(idx / 3);
          const row = 2 - (idx % 3);
          cx = 160 + col * colWidth + colWidth / 2;
          cy = 40 + row * 100 + 50;
        }
      }
    }

    let lx, lz;
    if (isEnemy) {
      // Enemy board is rotated 180 degrees to face the enemy
      lx = boardCenterX - (cx / 1024 - 0.5) * boardWidth;
      lz = -(cy / 512 - 0.5) * 0.55;
    } else {
      // Player board faces the player (normal)
      lx = boardCenterX + (cx / 1024 - 0.5) * boardWidth;
      lz = (cy / 512 - 0.5) * 0.55;
    }

    return new THREE.Vector3(lx, 0.005, boardCenterZ + lz);
  }

  initBook() {
    this.bookCanvas = document.createElement('canvas');
    this.bookCanvas.width = 512;
    this.bookCanvas.height = 512;
    
    this.bookTexture = new THREE.CanvasTexture(this.bookCanvas);
    this.bookTexture.colorSpace = THREE.SRGBColorSpace;
    
    this.bookMesh = new THREE.Group();
    
    const coverGeo = new THREE.BoxGeometry(0.38, 0.015, 0.28);
    const coverMat = new THREE.MeshBasicMaterial({
      color: 0x3d1a08
    });
    const coverMesh = new THREE.Mesh(coverGeo, coverMat);
    coverMesh.position.y = -0.0075;
    coverMesh.castShadow = true;
    this.bookMesh.add(coverMesh);
    
    const pagesGeo = new THREE.PlaneGeometry(0.36, 0.26);
    const pagesMat = new THREE.MeshBasicMaterial({
      map: this.bookTexture,
      fog: false
    });
    const pagesMesh = new THREE.Mesh(pagesGeo, pagesMat);
    pagesMesh.rotation.x = -Math.PI / 2;
    pagesMesh.position.y = 0.001;
    this.bookMesh.add(pagesMesh);
    
    this.bookMesh.position.set(-0.8, 0.012, 0.15);
    this.bookMesh.rotation.y = Math.PI / 10;
    
    this.scene.add(this.bookMesh);
    this.updateBookTexture();
  }

  updateBookTexture() {
    if (!this.bookCanvas || !this.bookTexture) return;
    const ctx = this.bookCanvas.getContext('2d')!;
    
    ctx.fillStyle = '#f3ebd9';
    ctx.fillRect(0, 0, 512, 512);
    
    ctx.strokeStyle = 'rgba(139, 101, 8, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 236, 492);
    ctx.strokeRect(266, 10, 236, 492);
    
    ctx.strokeStyle = '#c8b693';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(256, 10);
    ctx.lineTo(256, 502);
    ctx.stroke();
    
    const spineGrad = ctx.createLinearGradient(230, 0, 282, 0);
    spineGrad.addColorStop(0, 'rgba(0, 0, 0, 0.0)');
    spineGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.22)');
    spineGrad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
    ctx.fillStyle = spineGrad;
    ctx.fillRect(230, 0, 52, 512);
    
    const runState = this.engine.runState;
    const levels = runState.colorLevels || { red: 1, black: 1, green: 1, gold: 1, purple: 1, cyan: 1, crimson: 1 };
    const unlocks = runState.colorUnlocks || { red_ability: false, black_ability: false, green_ability: false };
    const pm = runState.playerWheel.payoutMultipliers;
    
    const getMultText = (color: string, base: number) => {
      const scale = this.engine.getScaledPayoutMultiplier(color as any, base);
      return `${scale.toFixed(1)}x`;
    };
    
    // LEFT PAGE
    ctx.fillStyle = '#3e2723';
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px "Courier Prime", Courier, monospace';
    ctx.fillText('COLOR LEVELS', 128, 48);
    
    ctx.font = 'italic 12px "Courier Prime", Courier, monospace';
    ctx.fillText('Basic Multipliers', 128, 70);
    
    ctx.strokeStyle = 'rgba(62, 39, 35, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(226, 80);
    ctx.stroke();
    
    const basicColors = [
      { name: 'Red', hex: '#d32f2f', lvl: levels.red, mult: getMultText('red', pm.red), ability: unlocks.red_ability ? '🔥 FEVER' : '🔒 LOCKED' },
      { name: 'Black', hex: '#333333', lvl: levels.black, mult: getMultText('black', pm.black), ability: unlocks.black_ability ? '❄️ GLACIER' : '🔒 LOCKED' },
      { name: 'Green', hex: '#2e7d32', lvl: levels.green, mult: getMultText('green', pm.green), ability: unlocks.green_ability ? '⚡ SYNAPSE' : '🔒 LOCKED' },
      { name: 'Gold', hex: '#f57f17', lvl: levels.gold, mult: getMultText('gold', pm.gold || 4.0), ability: '✨ MIDAS' }
    ];
    
    ctx.textAlign = 'left';
    basicColors.forEach((c, idx) => {
      const y = 120 + idx * 85;
      
      ctx.fillStyle = c.hex;
      ctx.beginPath();
      ctx.arc(35, y, 7, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#3e2723';
      ctx.font = 'bold 18px "Courier Prime", Courier, monospace';
      ctx.fillText(c.name.toUpperCase(), 50, y + 6);
      
      ctx.font = 'bold 15px "Courier Prime", Courier, monospace';
      ctx.fillText(`Lvl ${c.lvl}`, 50, y + 26);
      ctx.fillText(c.mult, 140, y + 26);
      
      ctx.font = 'bold 12px "Courier Prime", Courier, monospace';
      ctx.fillStyle = c.ability.includes('LOCKED') ? '#8d6e63' : '#d84315';
      ctx.fillText(c.ability, 50, y + 46);
    });
    
    // RIGHT PAGE
    ctx.textAlign = 'center';
    ctx.fillStyle = '#3e2723';
    ctx.font = 'bold 24px "Courier Prime", Courier, monospace';
    ctx.fillText('SPECIAL TYPES', 384, 48);
    
    ctx.font = 'italic 12px "Courier Prime", Courier, monospace';
    ctx.fillText('Occurrences & Effects', 384, 70);
    
    ctx.strokeStyle = 'rgba(62, 39, 35, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(286, 80);
    ctx.lineTo(482, 80);
    ctx.stroke();
    
    const specialColors = [
      { name: 'Purple', hex: '#7b1fa2', lvl: levels.purple, mult: getMultText('purple', pm.purple || 4.0), ability: '🔮 CURSE' },
      { name: 'Cyan', hex: '#0097a7', lvl: levels.cyan, mult: getMultText('cyan', pm.cyan || 4.0), ability: '🔋 CHARGE' },
      { name: 'Crimson', hex: '#c2185b', lvl: levels.crimson, mult: getMultText('crimson', pm.crimson || 6.0), ability: '🩸 SURGE' }
    ];
    
    ctx.textAlign = 'left';
    specialColors.forEach((c, idx) => {
      const y = 120 + idx * 85;
      
      ctx.fillStyle = c.hex;
      ctx.beginPath();
      ctx.arc(295, y, 7, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#3e2723';
      ctx.font = 'bold 18px "Courier Prime", Courier, monospace';
      ctx.fillText(c.name.toUpperCase(), 310, y + 6);
      
      ctx.font = 'bold 15px "Courier Prime", Courier, monospace';
      const isLosing = this.engine.battleState && (this.engine.battleState.playerScore || 0) < (this.engine.battleState.enemyScore || 0);
      const multDisplay = c.name === 'Crimson' && isLosing ? `${c.mult} (x2)` : c.mult;
      ctx.fillText(`Lvl ${c.lvl}  ${multDisplay}`, 310, y + 26);
      
      ctx.font = 'bold 12px "Courier Prime", Courier, monospace';
      ctx.fillStyle = '#d84315';
      ctx.fillText(c.ability, 310, y + 46);
    });
    
    const modY = 385;
    ctx.fillStyle = '#3e2723';
    ctx.font = 'bold 18px "Courier Prime", Courier, monospace';
    ctx.fillText('CURRENT MODS', 300, modY);
    
    ctx.strokeStyle = 'rgba(62, 39, 35, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(286, modY + 8);
    ctx.lineTo(482, modY + 8);
    ctx.stroke();
    
    ctx.font = 'bold 13px "Courier Prime", Courier, monospace';
    ctx.fillStyle = '#4e342e';
    
    const boardMods = this.engine.battleState?.boardModifiers;
    let modText1 = 'Streak: None';
    if (boardMods) {
      if ((boardMods.redStreakCount || 0) > 0) modText1 = `Red Streak: x${boardMods.redStreakCount}`;
      else if ((boardMods.blackStreakCount || 0) > 0) modText1 = `Black Streak: x${boardMods.blackStreakCount}`;
    }
    ctx.fillText(modText1, 300, modY + 28);
    
    let modText2 = 'Shield: Inactive';
    if (boardMods?.insuranceActive) modText2 = 'Insurance Active';
    ctx.fillText(modText2, 300, modY + 48);
    
    let modText3 = 'Stun Turns: 0';
    if (boardMods?.enemyStunTurns) modText3 = `Enemy Stunned: ${boardMods.enemyStunTurns}t`;
    ctx.fillText(modText3, 300, modY + 68);
    
    this.bookTexture.needsUpdate = true;
  }
}
