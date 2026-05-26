import * as THREE from 'three';
import { GameEngine } from '../core/GameEngine';
import { WheelVisual, CardVisual, EnemyVisual } from './WheelVisual';
import { PS1Shader } from './PS1Shader';
import { Card, WheelConfig } from '../core/Types';
import { getSlotColor } from '../physics/RoulettePhysics';

export class RenderManager {
  engine: GameEngine;
  container: HTMLElement;
  
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
  };
  
  // Cards management
  cardVisuals: CardVisual[] = [];
  hoveredCardId: string | null = null;
  selectedCardId: string | null = null;
  
  playedCardVisuals: CardVisual[] = [];
  playedCardsGroup!: THREE.Group;
  
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
  private texturesInitialized = false;
  private textureUploadFrames = 30;
  private wasInBattle = false;
  private lastActiveView = -1;
  private frameCount = 0;

  // Opponent action animation
  oppActionCardMesh: THREE.Mesh | null = null;
  oppAnimTime = 0;
  oppAnimType: 'card_play' | 'none' = 'none';
  oppAnimChips: THREE.Mesh[] = [];
  oppAnimChipsStart = new THREE.Vector3();
  oppAnimChipsEnd = new THREE.Vector3();

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

  constructor(engine: GameEngine, container: HTMLElement) {
    this.engine = engine;
    this.container = container;
    
    this.initThree();
    this.buildScene();
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
    this.playerFeltMesh.rotation.x = -Math.PI / 2;
    this.playerFeltMesh.position.set(-0.8, 0.005, 0.45);
    this.scene.add(this.playerFeltMesh);

    // Enemy Felt
    const enemyFeltMat = new THREE.MeshBasicMaterial({
      map: this.createFeltTexture(true),
      fog: false
    });
    this.enemyFeltMesh = new THREE.Mesh(feltGeo, enemyFeltMat);
    this.enemyFeltMesh.rotation.x = -Math.PI / 2;
    this.enemyFeltMesh.position.set(0.8, 0.005, -1.95);
    this.scene.add(this.enemyFeltMesh);

    // Initialize Chip Materials (Using retro MeshPhongMaterial with high contrast)
    this.chipMaterials = {
      red: new THREE.MeshPhongMaterial({ color: 0xe53935, shininess: 40 }),
      black: new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 40 }), // lighter charcoal
      green: new THREE.MeshPhongMaterial({ color: 0x43a047, shininess: 40 }),
      number: new THREE.MeshPhongMaterial({ color: 0xffd54f, shininess: 60 }),
      blue: new THREE.MeshPhongMaterial({ color: 0x0288d1, shininess: 40 })
    };

    // 2c. 3D Bell Turn Trigger
    this.bellGroup = new THREE.Group();
    this.bellGroup.position.set(-0.53, 0.005, 0.75);
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
    labelsMesh.position.set(-0.27, 0.006, 0.90);
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
      oppCard.position.set((i - 1) * 0.16, 0.006, -1.6 - Math.abs(i - 1) * 0.02);
      oppCard.rotation.z = -offsetAngle;
      oppCard.castShadow = true;
      this.scene.add(oppCard);
    }

    const oppChipGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.005, 8);
    const oppBlackMat = new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 30 });
    const oppRedMat = new THREE.MeshPhongMaterial({ color: 0x991b1b, shininess: 30 });
    
    for (let j = 0; j < 5; j++) {
      const chip = new THREE.Mesh(oppChipGeo, oppBlackMat);
      chip.position.set(-0.35 + (Math.random() - 0.5) * 0.004, 0.005 + j * 0.006, -1.5 + (Math.random() - 0.5) * 0.004);
      this.scene.add(chip);
    }
    for (let j = 0; j < 3; j++) {
      const chip = new THREE.Mesh(oppChipGeo, oppRedMat);
      chip.position.set(-0.40 + (Math.random() - 0.5) * 0.004, 0.005 + j * 0.006, -1.45 + (Math.random() - 0.5) * 0.004);
      this.scene.add(chip);
    }
    for (let j = 0; j < 6; j++) {
      const chip = new THREE.Mesh(oppChipGeo, oppRedMat);
      chip.position.set(0.35 + (Math.random() - 0.5) * 0.004, 0.005 + j * 0.006, -1.5 + (Math.random() - 0.5) * 0.004);
      this.scene.add(chip);
    }

    // 3. Enemy
    this.enemyVis = new EnemyVisual();
    this.enemyVis.group.position.set(0, 0.05, -2.5);
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
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < 3; row++) {
        const index = 3 * col + (2 - row);
        if (index >= gridNumbers.length) continue;
        
        const num = gridNumbers[index];
        const cellColor = getSlotColor(num, activeWheel, this.engine.battleState?.boardModifiers);
        
        let colorStr = '#2ebd42';
        if (cellColor === 'red') colorStr = '#ef5350';
        else if (cellColor === 'black') colorStr = '#2d2d2d';

        const x = 160 + col * colWidth;
        const y = 40 + row * rowHeight;

        ctx.fillStyle = colorStr;
        ctx.fillRect(x, y, colWidth - 2, rowHeight - 2);
        ctx.strokeRect(x, y, colWidth - 2, rowHeight - 2);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(num.toString(), x + colWidth / 2, y + rowHeight / 2);
      }
    }

    // 4. Draw Outside bets below grid
    const outHeight = 110;
    const outY = 360;

    // Payout details
    const payouts = activeWheel.payoutMultipliers;

    // RED outside bet
    ctx.fillStyle = '#ef5350';
    ctx.fillRect(160, outY, 156, outHeight);
    ctx.strokeRect(160, outY, 156, outHeight);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "Courier Prime", monospace';
    ctx.fillText('RED', 238, outY + 35);
    ctx.font = 'bold 20px "Courier Prime", monospace';
    ctx.fillText(`(${payouts.red}x)`, 238, outY + 75);

    // BLACK outside bet
    ctx.font = 'bold 30px "Courier Prime", monospace';
    ctx.fillStyle = '#2d2d2d';
    ctx.fillRect(324, outY, 156, outHeight);
    ctx.strokeRect(324, outY, 156, outHeight);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('BLACK', 402, outY + 35);
    ctx.font = 'bold 20px "Courier Prime", monospace';
    ctx.fillText(`(${payouts.black}x)`, 402, outY + 75);

    // ODD outside bet
    ctx.font = 'bold 30px "Courier Prime", monospace';
    ctx.fillStyle = '#d84315';
    ctx.fillRect(488, outY, 156, outHeight);
    ctx.strokeRect(488, outY, 156, outHeight);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('ODD', 566, outY + 35);
    ctx.font = 'bold 20px "Courier Prime", monospace';
    ctx.fillText(`(${payouts.odd}x)`, 566, outY + 75);

    // EVEN outside bet
    ctx.font = 'bold 30px "Courier Prime", monospace';
    ctx.fillStyle = '#0288d1';
    ctx.fillRect(652, outY, 156, outHeight);
    ctx.strokeRect(652, outY, 156, outHeight);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('EVEN', 730, outY + 35);
    ctx.font = 'bold 20px "Courier Prime", monospace';
    ctx.fillText(`(${payouts.even}x)`, 730, outY + 75);

    // GREEN outside bet
    ctx.font = 'bold 30px "Courier Prime", monospace';
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(816, outY, 164, outHeight);
    ctx.strokeRect(816, outY, 164, outHeight);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('GREEN', 898, outY + 35);
    ctx.font = 'bold 20px "Courier Prime", monospace';
    ctx.fillText(`(${payouts.green}x)`, 898, outY + 75);

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
    // Player's board is centered at X = -0.8 with width = 1.2
    const lx = wx - (-0.8);
    const lz = wz - 0.45;

    if (lx < -0.6 || lx > 0.6 || lz < -0.275 || lz > 0.275) {
      return null;
    }

    const cx = (lx / 1.2 + 0.5) * 1024;
    const cy = (lz / 0.55 + 0.5) * 512;

    // Get player's active wheel
    const activeWheel = this.engine.battleState ? this.engine.battleState.playerWheel : this.engine.runState.playerWheel;

    // Check outside bets row: cy >= 360 && cy <= 470
    if (cy >= 360 && cy <= 470) {
      if (cx >= 160 && cx <= 316) {
        return { type: 'red' };
      } else if (cx >= 324 && cx <= 480) {
        return { type: 'black' };
      } else if (cx >= 488 && cx <= 644) {
        return { type: 'odd' };
      } else if (cx >= 652 && cx <= 808) {
        return { type: 'even' };
      } else if (cx >= 816 && cx <= 980) {
        return { type: 'green' };
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
      if (!this.engine.battleState || this.engine.battleState.phase !== 'betting') {
        return; // Lock all inputs!
      }
      startX = e.clientX;
      startY = e.clientY;


      const coords = getMouseCoords(e);
      this.mouse.copy(coords);

      this.raycaster.setFromCamera(this.mouse, this.camera);
      
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

      if (this.isDragging) {
        if (this.activeHoveredCell && this.engine.battleState) {
          const type = this.activeHoveredCell.type as 'red' | 'black' | 'green' | 'number' | 'odd' | 'even';
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
    this.oppActionCardMesh.position.set(0, 0.1, -1.6);
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

    const count = Math.max(1, Math.min(5, intent.value));
    for (let i = 0; i < count; i++) {
      const chip = new THREE.Mesh(chipGeo, chipMat);
      chip.position.set(0.35, 0.005 + i * 0.007, -1.5);
      chip.castShadow = true;
      chip.receiveShadow = true;
      this.scene.add(chip);
      this.oppAnimChips.push(chip);
    }

    this.oppAnimChipsEnd = this.getBoardCellPosition(betType, numberValue);

    this.oppAnimTime = 0;
    this.oppAnimType = 'card_play';
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
    } else if (this.activeView === 3 || this.activeView === 5) { // Wheel / Opponent view - hidden completely
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
    const sec = time * 0.001;
    this.frameCount++;

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
      this.textureUploadFrames = 60;
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
        this.textureUploadFrames = 30;
      }
    }

    // 3. Rebuild wheels and boards on temporary card board modifications (combat)
    if (isInBattle && this.engine.battleState) {
      const boardHash = JSON.stringify(this.engine.battleState.boardModifiers) + `|owner-${this.engine.battleState.activeWheelOwner}`;
      if (boardHash !== this.lastBoardHash) {
        this.lastBoardHash = boardHash;
        this.rebuildWheelsForCombat();
        this.textureUploadFrames = 30;
      }
    }

    // Trigger texture upload on active view changes
    if (this.activeView !== this.lastActiveView) {
      this.textureUploadFrames = 60;
      this.lastActiveView = this.activeView;
    }

    // Failsafe: periodically force upload textures (every 180 frames)
    if (this.frameCount % 180 === 0) {
      this.textureUploadFrames = 30;
    }

    // 1. Force upload procedural canvas textures to GPU
    if (this.textureUploadFrames > 0) {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat) => {
            if (mat && (mat as any).map) {
              (mat as any).map.needsUpdate = true;
            }
          });
        }
      });
      this.textureUploadFrames--;
    }

    // Update animations of independent scene visual nodes
    this.enemyVis.update(sec);

    // Physics sync: update player and enemy wheels
    this.wheelVis.update(
      this.engine.playerPhysics.wheelAngle,
      this.engine.playerPhysics.ballAngle,
      this.engine.playerPhysics.ballRadius,
      this.engine.playerPhysics.ballHeight
    );
    this.enemyWheelVis.update(
      this.engine.enemyPhysics.wheelAngle,
      this.engine.enemyPhysics.ballAngle,
      this.engine.enemyPhysics.ballRadius,
      this.engine.enemyPhysics.ballHeight
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
      } else if (this.activeView === 3 || this.activeView === 5) {
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
      if (this.engine.battleState.phase === 'spinning' || isSpinOverlayVisible) {
        currentActiveView = 3; // Force Wheel View during active spin and outcome display
      }
      this.activeView = currentActiveView;

      if (this.activeView === 1) { // Cards
        this.cameraTargetPos.set(0, 0.8, 1.25);
        this.cameraTargetLookAt.set(0, 0.25, 0.8);
      } else if (this.activeView === 2) { // Board (focus on the player's board)
        this.cameraTargetPos.set(-0.8, 1.5, 0.7);
        this.cameraTargetLookAt.set(-0.8, 0.0, 0.45);
      } else if (this.activeView === 3) { // Wheel (loosened zoom)
        const isEnemy = this.engine.battleState?.activeWheelOwner === 'enemy';
        if (isEnemy) {
          this.cameraTargetPos.set(0.8, 1.25, -0.1);
          this.cameraTargetLookAt.set(0.8, 0.05, -0.75);
        } else {
          this.cameraTargetPos.set(-0.8, 1.25, -0.1);
          this.cameraTargetLookAt.set(-0.8, 0.05, -0.75);
        }
      } else if (this.activeView === 5) { // Opponent Side (cinematic diagonal view of opponent and their board)
        this.cameraTargetPos.set(-0.4, 1.25, -0.65);
        this.cameraTargetLookAt.set(0.4, 0.1, -1.85);
      } else { // Overview (4)
        this.cameraTargetPos.set(0, 1.9, 1.5);
        this.cameraTargetLookAt.set(0, 0.1, -0.2);
      }
    } else {
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
        this.oppActionCardMesh.position.set(0, 0.1 + t * 0.4, -1.6 + t * 0.2);
        this.oppActionCardMesh.rotation.set(-Math.PI / 2 + t * (Math.PI / 2 + 0.1), Math.PI, 0);
      } else if (progress < 0.8) {
        // Hover
        this.oppActionCardMesh.position.set(0, 0.5, -1.4);
        this.oppActionCardMesh.rotation.set(0.1, Math.PI, 0);
      } else {
        // Sink/fade
        const t = (progress - 0.8) / 0.2;
        this.oppActionCardMesh.position.set(0, 0.5 - t * 0.4, -1.4 - t * 0.2);
        this.oppActionCardMesh.rotation.set(0.1 - t * (Math.PI / 2 + 0.1), Math.PI, 0);
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
            const startZ = -1.5;
            
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

    // Render 3D Scene into low-poly RenderTarget
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);
    
    // Render Fullscreen Quad to screen using pixel/dither shader
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.postScene, this.postCamera);

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

    // Stack of 10s (Gold/Number material) - Left: -0.377
    for (let j = 0; j < count10; j++) {
      const chip = new THREE.Mesh(chipGeo, this.chipMaterials.number);
      chip.position.set(-0.377, 0.005 + j * 0.007 + 0.003, 0.90);
      chip.castShadow = true;
      chip.receiveShadow = true;
      chip.userData = { isSourceStack: true, denom: 10 };
      this.scene.add(chip);
      this.chipMeshes.push(chip);
    }
    // Stack of 5s (Green material) - Middle: -0.27
    for (let j = 0; j < count5; j++) {
      const chip = new THREE.Mesh(chipGeo, this.chipMaterials.green);
      chip.position.set(-0.27, 0.005 + j * 0.007 + 0.003, 0.90);
      chip.castShadow = true;
      chip.receiveShadow = true;
      chip.userData = { isSourceStack: true, denom: 5 };
      this.scene.add(chip);
      this.chipMeshes.push(chip);
    }
    // Stack of 1s (Red material) - Right: -0.163
    for (let j = 0; j < count1; j++) {
      const chip = new THREE.Mesh(chipGeo, this.chipMaterials.red);
      chip.position.set(-0.163, 0.005 + j * 0.007 + 0.003, 0.90);
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
    const boardCenterX = isEnemy ? 0.8 : -0.8;
    const boardWidth = 1.2;

    if (betType === 'red') {
      cx = 238;
      cy = 415;
    } else if (betType === 'black') {
      cx = 402;
      cy = 415;
    } else if (betType === 'odd') {
      cx = 566;
      cy = 415;
    } else if (betType === 'even') {
      cx = 730;
      cy = 415;
    } else if (betType === 'green') {
      cx = 898;
      cy = 415;
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

    const lx = boardCenterX + (cx / 1024 - 0.5) * boardWidth;
    const lz = (cy / 512 - 0.5) * 0.55;

    return new THREE.Vector3(lx, 0.005, 0.45 + lz);
  }
}
