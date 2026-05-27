import * as THREE from 'three';
import { GameEngine } from '../core/GameEngine';
import { WheelVisual, CardVisual, EnemyVisual, ForgeCardVisual } from './WheelVisual';
import { PS1Shader } from './PS1Shader';
import { Card, WheelConfig } from '../core/Types';
import { getSlotColor } from '../physics/RoulettePhysics';
import { SoundManager } from '../ui/SoundManager';

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
  
  // Raycasting
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2(-999, -999);
  
  // View states
  manualView = 4; // default to overview
  activeView = 4;
  cameraTargetPos = new THREE.Vector3(0, 1.85, 1.55);
  cameraTargetLookAt = new THREE.Vector3(0, 0.15, -0.2);
  cameraCurrentLookAt = new THREE.Vector3(0, 0.15, -0.2);

  // Texture force upload tracking
  private wasInBattle = false;

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

  // Resolution parameters
  readonly RENDER_WIDTH = 960;
  readonly RENDER_HEIGHT = 720;

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
    
    this.wheelVis.rebuildWheel(false, battle.playerWheel);
    this.enemyWheelVis.rebuildWheel(true, battle.enemyWheel);
    
    // Also reset active states
    this.wheelVis.setBallVisible(true);
    this.enemyWheelVis.setBallVisible(true);
    
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
    this.bellGroup.position.set(0.27, 0.005, 0.75);
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
    labelsCanvas.width = 512;
    labelsCanvas.height = 128;
    const lCtx = labelsCanvas.getContext('2d')!;
    lCtx.fillStyle = '#2b1b14'; // dark wood back
    lCtx.fillRect(0, 0, 512, 128);
    lCtx.strokeStyle = '#c59f51'; // gold border
    lCtx.lineWidth = 6;
    lCtx.strokeRect(3, 3, 506, 122);

    lCtx.fillStyle = '#ffffff';
    lCtx.font = 'bold 36px "Courier Prime", monospace';
    lCtx.textAlign = 'center';
    lCtx.textBaseline = 'middle';
    lCtx.fillText('10 ⚡', 512 / 6, 64);
    lCtx.fillText('5 ⚡', 512 / 2, 64);
    lCtx.fillText('1 ⚡', (512 * 5) / 6, 64);

    const labelsTex = new THREE.CanvasTexture(labelsCanvas);
    labelsTex.colorSpace = THREE.SRGBColorSpace;
    labelsTex.needsUpdate = true;
    const labelsGeo = new THREE.PlaneGeometry(0.32, 0.08);
    const labelsMat = new THREE.MeshBasicMaterial({
      map: labelsTex,
      fog: false
    });
    const labelsMesh = new THREE.Mesh(labelsGeo, labelsMat);
    labelsMesh.rotation.x = -Math.PI / 2;
    labelsMesh.position.set(0.53, 0.006, 0.90);
    this.scene.add(labelsMesh);

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
      if (!fcv) {
        fcv = new ForgeCardVisual(card);
        this.forgeCardsGroup.add(fcv.mesh);
        this.forgeCardsVisuals.push(fcv);
      }
      
      if (fcv.purchased !== card.purchased) {
        this.forgeCardsGroup.remove(fcv.mesh);
        this.forgeCardsVisuals = this.forgeCardsVisuals.filter(v => v.cardId !== card.id);
        
        fcv = new ForgeCardVisual(card);
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

  private createFeltTexture(isEnemy: boolean): THREE.Texture {
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

    // 2. Draw Green Sector (usually contains 0)
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(40, 40, 120, 300);
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 120, 300);

    // Write Green text inside sector
    ctx.fillStyle = '#ffffff';
    ctx.font = activeWheel.greenNumbers.length > 2 ? 'bold 28px "Courier Prime", monospace' : 'bold 72px "Courier Prime", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(activeWheel.greenNumbers.join('/'), 100, 190);

    // 3. Draw numbers grid
    ctx.font = cols > 12 ? 'bold 22px "Courier Prime", monospace' : 'bold 36px "Courier Prime", monospace';
    
    // Get prediction sector if available
    const predictionSector = (!isEnemy && battle) ? (battle.predictionSector || []) : [];
    
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
        }
      }
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

      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 20px "Courier Prime", monospace';
      ctx.fillText(displayName, xStart + width / 2, outY + 20);
      ctx.font = 'bold 14px "Courier Prime", monospace';
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

      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 20px "Courier Prime", monospace';
      ctx.fillText(displayName, xStart + width / 2, outY2 + 20);
      ctx.font = 'bold 14px "Courier Prime", monospace';
      ctx.fillText(`(${payoutVal}x)`, xStart + width / 2, outY2 + 45);
    }

    // Add grime / grunge overlay (opacity reduced to 0.12 for better clarity)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 512;
      const rSize = 10 + Math.random() * 40;
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
    
    let startX = 0;
    let startY = 0;
    let pressedSourceDenom = 0;
    let isPressedOnBell = false;
    let pressedCardId: string | null = null;
    let isPressedOnPlayedCard = false;

    const getMouseCoords = (e: PointerEvent) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      return new THREE.Vector2(x, y);
    };

    this.container.addEventListener('pointerdown', (e) => {
      const isForge = this.engine.runState.gameState === 'FORGE';
      if (!isForge && (!this.engine.battleState || this.engine.battleState.phase !== 'betting')) {
        return; // Lock all inputs!
      }
      startX = e.clientX;
      startY = e.clientY;

      const coords = getMouseCoords(e);
      this.mouse.copy(coords);

      this.raycaster.setFromCamera(this.mouse, this.camera);
      
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

      // 1. Check card hits (only interactive in Cards view)
      if (this.activeView === 1) {
        const hitCardId = this.raycastCardsAtRest();
        if (hitCardId) {
          pressedCardId = hitCardId;
          pressedSourceDenom = 0;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
          return;
        }
      }

      // Check played card hits on the table (active in views 1, 2, 4)
      if (this.activeView === 1 || this.activeView === 2 || this.activeView === 4) {
        const playedCardMeshes = this.playedCardVisuals.map(cv => cv.mesh);
        const playedCardIntersects = this.raycaster.intersectObjects(playedCardMeshes);
        if (playedCardIntersects.length > 0) {
          pressedCardId = playedCardIntersects[0].object.userData.cardId;
          pressedSourceDenom = 0;
          isPressedOnBell = false;
          isPressedOnPlayedCard = true;
          return;
        }
      }

      // 2. Check source chips stack and bell hits
      const draggableObjects: THREE.Object3D[] = [];
      this.scene.traverse((obj) => {
        if (obj.userData && (obj.userData.isSourceStack || obj.userData.isBell)) {
          draggableObjects.push(obj);
        }
      });

      const hits = this.raycaster.intersectObjects(draggableObjects);
      if (hits.length > 0) {
        const hitObj = hits[0].object;
        if (hitObj.userData.isSourceStack) {
          pressedSourceDenom = hitObj.userData.denom;
          pressedCardId = null;
          isPressedOnBell = false;
          isPressedOnPlayedCard = false;
        } else if (hitObj.userData.isBell) {
          isPressedOnBell = true;
          pressedSourceDenom = 0;
          pressedCardId = null;
          isPressedOnPlayedCard = false;
        }
      } else {
        pressedSourceDenom = 0;
        isPressedOnBell = false;
        pressedCardId = null;
        isPressedOnPlayedCard = false;
      }
    });

    this.container.addEventListener('pointermove', (e) => {
      const coords = getMouseCoords(e);
      this.mouse.copy(coords);

      const isForge = this.engine.runState.gameState === 'FORGE';
      if (isForge) return;

      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);

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
    });

    this.container.addEventListener('pointerup', (e) => {
      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
      const isForge = this.engine.runState.gameState === 'FORGE';

      if (isForge) {
        if (pressedCardId && dist <= 5) {
          if (this.onForgeCardClicked) {
            this.onForgeCardClicked(pressedCardId);
          }
        }
        pressedCardId = null;
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
        if (dist <= 5) {
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
          }
        }
      }

      pressedSourceDenom = 0;
      isPressedOnBell = false;
      pressedCardId = null;
      isPressedOnPlayedCard = false;
    });

    this.container.addEventListener('pointerleave', () => {
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
      pressedCardId = null;
      isPressedOnPlayedCard = false;
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
    cards.forEach(card => {
      const exists = this.cardVisuals.some(cv => cv.mesh.userData.cardId === card.id);
      if (!exists) {
        const cv = new CardVisual(card);
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

    // 2. Add visual cards that are newly played
    cards.forEach(card => {
      const exists = this.playedCardVisuals.some(cv => cv.mesh.userData.cardId === card.id);
      if (!exists) {
        const cv = new CardVisual(card);
        cv.mesh.position.set(0, 0.006, 0.85);
        cv.mesh.rotation.set(-Math.PI / 2, 0, 0);
        this.playedCardsGroup.add(cv.mesh);
        this.playedCardVisuals.push(cv);
      }
    });
  }

  private updatePlayedCardTargets() {
    const count = this.playedCardVisuals.length;
    if (count === 0) return;

    const spacing = 0.15;
    const startX = -((count - 1) * spacing) / 2;

    this.playedCardVisuals.forEach((cv, idx) => {
      const tx = startX + idx * spacing;
      const ty = 0.006;
      const tz = 0.85;

      const rx = -Math.PI / 2;
      const ry = 0.0;
      const rz = 0.0;

      cv.targetPosition.set(tx, ty, tz);
      cv.targetRotation.set(rx, ry, rz);
    });
  }

  playOpponentActionAnimation(intent: { type: string; value: number; description: string }, betType: string, numberValue?: number) {
    // 1. Create intent card mesh
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 360;
    const ctx = canvas.getContext('2d')!;

    // Dark red creepy background
    ctx.fillStyle = '#2d0a06';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gold border
    ctx.strokeStyle = '#c59f51';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    // Header background
    ctx.fillStyle = '#170503';
    ctx.fillRect(12, 12, canvas.width - 24, 60);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Courier Prime", monospace';
    ctx.fillText(intent.type.toUpperCase(), 24, 48);

    // Value
    if (intent.value > 0) {
      ctx.fillStyle = '#ef5350';
      ctx.font = 'bold 24px "Courier Prime", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${intent.value}⚡`, canvas.width - 24, 48);
      ctx.textAlign = 'left';
    }

    // Illustration placeholder
    ctx.fillStyle = '#17110c';
    ctx.fillRect(24, 90, canvas.width - 48, 120);
    ctx.strokeStyle = '#4a0f08';
    ctx.strokeRect(28, 94, canvas.width - 56, 112);

    // Creepy eye
    ctx.fillStyle = '#ef5350';
    ctx.font = 'bold 48px "Courier Prime", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('👁', 128, 150);

    // Description
    ctx.fillStyle = '#dddddd';
    ctx.font = 'bold 12px "Courier Prime", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const words = intent.description.split(' ');
    let line = '';
    let y = 240;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > (canvas.width - 48) && n > 0) {
        ctx.fillText(line, 24, y);
        line = words[n] + ' ';
        y += 20;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 24, y);

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
    let chipMat = this.chipMaterials.red;
    if (betType === 'black') chipMat = this.chipMaterials.black;
    else if (betType === 'green') chipMat = this.chipMaterials.green;
    else if (betType === 'number') chipMat = this.chipMaterials.number;
    else if (betType === 'even') chipMat = this.chipMaterials.blue;
    else if (betType === 'gold') chipMat = this.chipMaterials.gold;
    else if (betType === 'purple') chipMat = this.chipMaterials.purple;
    else if (betType === 'cyan') chipMat = this.chipMaterials.cyan;
    else if (betType === 'crimson') chipMat = this.chipMaterials.crimson;

    const count = Math.max(1, Math.min(5, intent.value));
    for (let i = 0; i < count; i++) {
      const chip = new THREE.Mesh(chipGeo, chipMat);
      chip.position.set(0.35, 0.005 + i * 0.007, -2.5);
      chip.castShadow = true;
      chip.receiveShadow = true;
      this.scene.add(chip);
      this.oppAnimChips.push(chip);
    }

    this.oppAnimChipsEnd = this.getBoardCellPosition(betType, numberValue);

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

      if (isHovered && this.activeView === 1) {
        tx = 0.0;
        ty = 0.0;
        tz = -0.13;
        rx = 0.0;
        rz = 0.0;
        ry = 0.0;
      }

      cv.targetPosition.set(tx, ty, tz);
      cv.targetRotation.set(rx, ry, rz);
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

  private performRaycasting() {
    if (this.mouse.x === -999 || this.activeView !== 1) {
      this.hoveredCardId = null;
      return;
    }

    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.hoveredCardId = this.raycastCardsAtRest();
  }

  animate = (time: number) => {
    requestAnimationFrame(this.animate);
    this.updateFpsStats(time);
    const sec = time * 0.001;
    const isForge = this.engine.runState.gameState === 'FORGE';

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
      this.bulbMaterial.emissive.setHex(0xffeaad);
      this.bulbMaterial.color.setHex(0xfff9e6);
      
      this.wheelSpotlight.intensity = 15.0;
      this.feltSpotlight.intensity = 20.0;
      this.ambientLight.intensity = 2.8;
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
    const playerMods = battle ? battle.physicsModifiers : undefined;
    const enemyMods = battle ? battle.physicsModifiers : undefined;

    this.wheelVis.update(
      playerPhysics.wheelAngle,
      playerPhysics.ballAngle,
      playerPhysics.ballRadius,
      playerPhysics.ballHeight,
      playerPhysics.isSettled,
      playerPhysics.settledSlotIndex,
      playerWheelConfig,
      playerMods
    );
    this.enemyWheelVis.update(
      enemyPhysics.wheelAngle,
      enemyPhysics.ballAngle,
      enemyPhysics.ballRadius,
      enemyPhysics.ballHeight,
      enemyPhysics.isSettled,
      enemyPhysics.settledSlotIndex,
      enemyWheelConfig,
      enemyMods
    );

    // Animate bell plunger shake
    if (this.bellShakeTime > 0) {
      this.bellShakeTime -= 0.016;
      const t = 1.0 - Math.min(1.0, this.bellShakeTime / 0.15);
      this.bellPlunger.position.y = 0.055 - Math.sin(t * Math.PI) * 0.015;
    } else {
      this.bellPlunger.position.y = 0.055;
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
        const scale = targetScale.clone();
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
      
      // Update camera views depending on game phase and manualView selection
      let currentActiveView = this.manualView;
      const resOverlay = document.getElementById('resolution-overlay');
      const isSpinOverlayVisible = resOverlay && !resOverlay.classList.contains('hidden');
      const isResolving = this.engine.battleState?.isResolving;
      if (this.engine.battleState.phase === 'spinning' || isSpinOverlayVisible || isResolving) {
        const isEnemy = this.engine.battleState?.activeWheelOwner === 'enemy';
        currentActiveView = isEnemy ? 6 : 3; // Force Player Wheel (3) or Enemy Wheel (6) during active spin/resolution
      }
      this.activeView = currentActiveView;

      if (this.activeView === 1) { // Cards
        this.cameraTargetPos.set(0, 0.8, 1.25);
        this.cameraTargetLookAt.set(0, 0.25, 0.8);
      } else if (this.activeView === 2) { // Board (focus on the player's board)
        this.cameraTargetPos.set(0.0, 1.5, 0.7);
        this.cameraTargetLookAt.set(0.0, 0.0, 0.45);
      } else if (this.activeView === 3) { // Player Wheel
        this.cameraTargetPos.set(-0.8, 1.25, -0.1);
        this.cameraTargetLookAt.set(-0.8, 0.05, -0.75);
      } else if (this.activeView === 6) { // Enemy Wheel
        this.cameraTargetPos.set(0.8, 1.25, -0.1);
        this.cameraTargetLookAt.set(0.8, 0.05, -0.75);
      } else if (this.activeView === 5) { // Opponent Side (cinematic diagonal view of opponent and their board)
        this.cameraTargetPos.set(-0.4, 1.25, -1.15);
        this.cameraTargetLookAt.set(0.0, 0.1, -1.95);
      } else if (this.activeView === 7) { // Opponent Himself (direct face-to-face view of opponent mask and eyes)
        this.cameraTargetPos.set(0.0, 1.25, -1.35);
        this.cameraTargetLookAt.set(0.0, 1.25, -3.0);
      } else { // Overview (4)
        this.cameraTargetPos.set(0, 1.9, 1.5);
        this.cameraTargetLookAt.set(0, 0.1, -0.2);
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
        this.oppActionCardMesh.position.set(0, 0.1 + t * 0.4, -2.62 + t * 0.2);
        this.oppActionCardMesh.rotation.set(-Math.PI / 2 + t * (Math.PI / 2 + 0.1), Math.PI - t * Math.PI, 0);
      } else if (progress < 0.8) {
        // Hover
        this.oppActionCardMesh.position.set(0, 0.5, -2.42);
        this.oppActionCardMesh.rotation.set(0.1, 0, 0);
      } else {
        // Sink/fade
        const t = (progress - 0.8) / 0.2;
        this.oppActionCardMesh.position.set(0, 0.5 - t * 0.4, -2.42 - t * 0.2);
        this.oppActionCardMesh.rotation.set(0.1 - t * (Math.PI / 2 + 0.1), t * Math.PI, 0);
      }

      if (this.oppAnimChips.length > 0) {
        const chipStartProgress = 0.3;
        const chipEndProgress = 0.8;
        if (progress > chipStartProgress) {
          const t = Math.min(1.0, (progress - chipStartProgress) / (chipEndProgress - chipStartProgress));
          const easeT = 1.0 - Math.pow(1.0 - t, 3);
          
          this.oppAnimChips.forEach((chip, i) => {
            const startX = 0.35;
            const startY = 0.005 + i * 0.007;
            const startZ = -2.5;
            
            const targetX = this.oppAnimChipsEnd.x;
            const targetY = this.oppAnimChipsEnd.y + i * 0.007;
            const targetZ = this.oppAnimChipsEnd.z;
            
            chip.position.x = startX + (targetX - startX) * easeT;
            chip.position.y = startY + (targetY - startY) * easeT + Math.sin(t * Math.PI) * 0.15;
            chip.position.z = startZ + (targetZ - startZ) * easeT;
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

    // Camera transitions
    this.camera.position.lerp(this.cameraTargetPos, 0.08);
    this.cameraCurrentLookAt.lerp(this.cameraTargetLookAt, 0.08);
    this.camera.lookAt(this.cameraCurrentLookAt);

    // Update visual card meshes
    this.cardVisuals.forEach(cv => cv.update(0.12));
    this.playedCardVisuals.forEach(cv => cv.update(0.12));

    if (isForge) {
      // Render Forge scene directly to screen in high-resolution (bypasses low-poly PS1 pixel/dither shader for perfect card legibility)
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.forgeScene, this.camera);
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

  private syncChips() {
    // 1. Clean up old chip meshes
    this.chipMeshes.forEach(mesh => {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
    });
    this.chipMeshes = [];

    if (!this.engine.battleState) return;

    const chipGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.006, 8);

    // 2. Create new chip meshes based on current bets
    this.engine.battleState.bets.forEach(bet => {
      const pos = this.getBoardCellPosition(bet.type, bet.numberValue);
      const stackHeight = Math.max(1, Math.min(8, Math.ceil(bet.amount / 2)));
      
      let mat = this.chipMaterials.number;
      if (bet.type === 'red') mat = this.chipMaterials.red;
      else if (bet.type === 'black') mat = this.chipMaterials.black;
      else if (bet.type === 'green') mat = this.chipMaterials.green;
      else if (bet.type === 'odd') mat = this.chipMaterials.red;
      else if (bet.type === 'even') mat = this.chipMaterials.blue;
      else if (bet.type === 'gold') mat = this.chipMaterials.gold;
      else if (bet.type === 'purple') mat = this.chipMaterials.purple;
      else if (bet.type === 'cyan') mat = this.chipMaterials.cyan;
      else if (bet.type === 'crimson') mat = this.chipMaterials.crimson;

      for (let j = 0; j < stackHeight; j++) {
        const chip = new THREE.Mesh(chipGeo, mat);
        chip.castShadow = true;
        chip.receiveShadow = true;
        
        const rx = (Math.random() - 0.5) * 0.006;
        const rz = (Math.random() - 0.5) * 0.006;
        
        chip.position.set(pos.x + rx, pos.y + j * 0.007 + 0.003, pos.z + rz);
        
        this.scene.add(chip);
        this.chipMeshes.push(chip);
      }
    });

    // 3. Draw source stacks dynamically based on player's available turn balance
    const pool = this.engine.battleState.chipsPool;
    const count10 = pool >= 10 ? Math.max(1, Math.min(8, Math.floor(pool / 10))) : 0;
    const count5 = pool >= 5 ? Math.max(1, Math.min(6, Math.floor(pool / 5))) : 0;
    const count1 = pool >= 1 ? Math.max(1, Math.min(8, pool)) : 0;

    // Stack of 10s (Gold/Number material) - Left: 0.423
    for (let j = 0; j < count10; j++) {
      const chip = new THREE.Mesh(chipGeo, this.chipMaterials.number);
      chip.position.set(0.423, 0.005 + j * 0.007 + 0.003, 0.90);
      chip.castShadow = true;
      chip.receiveShadow = true;
      chip.userData = { isSourceStack: true, denom: 10 };
      this.scene.add(chip);
      this.chipMeshes.push(chip);
    }
    // Stack of 5s (Green material) - Middle: 0.53
    for (let j = 0; j < count5; j++) {
      const chip = new THREE.Mesh(chipGeo, this.chipMaterials.green);
      chip.position.set(0.53, 0.005 + j * 0.007 + 0.003, 0.90);
      chip.castShadow = true;
      chip.receiveShadow = true;
      chip.userData = { isSourceStack: true, denom: 5 };
      this.scene.add(chip);
      this.chipMeshes.push(chip);
    }
    // Stack of 1s (Red material) - Right: 0.637
    for (let j = 0; j < count1; j++) {
      const chip = new THREE.Mesh(chipGeo, this.chipMaterials.red);
      chip.position.set(0.637, 0.005 + j * 0.007 + 0.003, 0.90);
      chip.castShadow = true;
      chip.receiveShadow = true;
      chip.userData = { isSourceStack: true, denom: 1 };
      this.scene.add(chip);
      this.chipMeshes.push(chip);
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
}
