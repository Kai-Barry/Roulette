import * as THREE from 'three';
import { Card, Enemy, WheelConfig, PhysicsModifiers, ForgeCard, BoardUpgrade, BoardModifiers } from '../core/Types';
import { getSlotColor, WHEEL_NUMBERS } from '../physics/RoulettePhysics';
import { formatDescription } from '../cards/CardDatabase';

export class WheelVisual {
  group: THREE.Group;
  wheelBase!: THREE.Mesh;
  wheelCone!: THREE.Group;
  ballMesh!: THREE.Mesh;
  ringMesh!: THREE.Mesh;
  highlightMesh!: THREE.Mesh;
  trailGroup!: THREE.Group;
  ballLight!: THREE.PointLight;
  isEnemyWheel: boolean = false;
  sharedTrailGeo?: THREE.SphereGeometry;
  
  extraBallMeshes = new Map<number, THREE.Mesh>();
  
  // Cache variables for ball speed check
  lastBallX?: number;
  lastBallZ?: number;
  
  constructor(isEnemy: boolean, config: WheelConfig) {
    this.isEnemyWheel = isEnemy;
    this.group = new THREE.Group();
    this.buildWheel(isEnemy, config);
  }

  clearExtraBalls() {
    for (const mesh of this.extraBallMeshes.values()) {
      this.group.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(m => m.dispose());
      } else {
        mesh.material.dispose();
      }
    }
    this.extraBallMeshes.clear();
  }

  rebuildWheel(isEnemy: boolean, config: WheelConfig, predictionSector: number[] = [], boardMods?: BoardModifiers) {
    this.clearExtraBalls();
    this.isEnemyWheel = isEnemy;
    // Dispose previous geometries and materials to avoid memory leaks
    this.group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry && child.geometry !== this.sharedTrailGeo) child.geometry.dispose();
        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(m => m.dispose());
        }
      }
    });
    if (this.sharedTrailGeo) {
      this.sharedTrailGeo.dispose();
      this.sharedTrailGeo = undefined;
    }

    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0]);
    }

    this.buildWheel(isEnemy, config, predictionSector, boardMods);
  }

  setBallVisible(visible: boolean) {
    if (this.ballMesh) {
      this.ballMesh.visible = visible;
    }
  }

  private buildWheel(isEnemy: boolean, config: WheelConfig, predictionSector: number[] = [], boardMods?: BoardModifiers) {
    const slotCount = config.numbers.length;
    const slotAngle = (Math.PI * 2) / slotCount;

    // 1. Static Outer Bowl (Wood) - Made openEnded and double-sided so it is a hollow ring
    const bowlGeo = new THREE.CylinderGeometry(1.2, 1.0, 0.3, 16, 1, true);
    
    // Player has warm brown mahogany wood, Enemy has cold black obsidian
    const bowlMat = new THREE.MeshPhongMaterial({ 
      color: isEnemy ? 0x181a18 : 0x4a2f1b,
      shininess: isEnemy ? 60 : 30,
      side: THREE.DoubleSide
    });
    this.wheelBase = new THREE.Mesh(bowlGeo, bowlMat);
    this.wheelBase.castShadow = true;
    this.wheelBase.receiveShadow = true;
    this.group.add(this.wheelBase);

    // Inner rim
    const rimGeo = new THREE.TorusGeometry(1.05, 0.05, 8, 24);
    // Player has brass/gold rim, Enemy has cold dark iron/silver rim
    const rimMat = new THREE.MeshPhongMaterial({
      color: isEnemy ? 0x5a6065 : 0xd4af37,
      shininess: isEnemy ? 80 : 90
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.1;
    this.group.add(rim);

    // 2. Rotating Wheel Cone
    this.wheelCone = new THREE.Group();
    this.wheelCone.position.y = 0.02;
    this.group.add(this.wheelCone);

    const coneCenterGeo = new THREE.ConeGeometry(0.3, 0.25, 12);
    // Player has gold cone, Enemy has obsidian/metal cone
    const metalMat = new THREE.MeshPhongMaterial({
      color: isEnemy ? 0x222222 : 0xffd700,
      shininess: isEnemy ? 90 : 120
    });
    const centerCone = new THREE.Mesh(coneCenterGeo, metalMat);
    centerCone.position.y = 0.1;
    this.wheelCone.add(centerCone);

    // Spinning base disc
    const discGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.05, 24);
    const discMat = new THREE.MeshPhongMaterial({
      color: isEnemy ? 0x141414 : 0x2b2b2b,
      shininess: 40
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    this.wheelCone.add(disc);

    // Number Ring
    const ringGeo = new THREE.CircleGeometry(0.8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      map: this.createWheelTexture(isEnemy, config, predictionSector, boardMods),
      side: THREE.DoubleSide,
      fog: false
    });
    this.ringMesh = new THREE.Mesh(ringGeo, ringMat);
    this.ringMesh.rotation.x = -Math.PI / 2;
    this.ringMesh.position.y = 0.026;
    this.ringMesh.receiveShadow = true;
    this.ringMesh.castShadow = true;
    this.wheelCone.add(this.ringMesh);

    // Add divider pegs (they look cool!)
    for (let i = 0; i < slotCount; i++) {
      const angle = i * slotAngle;
      // Tiny metal divider pegs between slots
      const pegGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.06, 4);
      const peg = new THREE.Mesh(pegGeo, metalMat);
      peg.position.x = Math.cos(angle + slotAngle/2) * 0.78;
      peg.position.z = Math.sin(angle + slotAngle/2) * 0.78;
      peg.position.y = 0.035;
      this.wheelCone.add(peg);
    }

    // 3. The Ball
    const ballGeo = new THREE.SphereGeometry(0.035, 8, 8);
    // Player has standard ivory white ball, Enemy has glowing red tinted ball
    const ballMat = new THREE.MeshStandardMaterial({
      color: isEnemy ? 0xffaaaa : 0xeeeeee,
      roughness: 0.1,
      metalness: 0.1,
      emissive: isEnemy ? 0x990000 : 0x333333
    });
    this.ballMesh = new THREE.Mesh(ballGeo, ballMat);
    this.ballMesh.castShadow = true;
    this.group.add(this.ballMesh);

    // Dynamic point light for glowing card effects
    this.ballLight = new THREE.PointLight(0xffffff, 0.0, 1.2);
    this.ballMesh.add(this.ballLight);

    // Initialize trail group for physics modifier visual effect trails
    this.trailGroup = new THREE.Group();
    this.group.add(this.trailGroup);

    // Create a ring sector for the landed slot highlight glow
    const highlightGeo = new THREE.RingGeometry(0.70, 0.85, 16, 1, -slotAngle / 2, slotAngle);
    const highlightMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
    this.highlightMesh.rotation.x = -Math.PI / 2;
    this.highlightMesh.position.y = 0.028;
    this.wheelCone.add(this.highlightMesh);

    // 4. Static Deflector Pins (8 pins on the bowl slope, matching physics at R = 0.82)
    const pinCount = 8;
    const pinSpacing = (Math.PI * 2) / pinCount;
    const R_PIN = 0.82;
    const tPinVis = (R_PIN - 0.65) / (1.0 - 0.65);
    const pinFloorY = 0.061 + (0.10 - 0.061) * tPinVis - 0.035; // surface height
    
    const pinGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.03, 6);
    const pinMat = new THREE.MeshPhongMaterial({
      color: isEnemy ? 0x9e9e9e : 0xffd700,
      shininess: 100
    });
    
    for (let i = 0; i < pinCount; i++) {
      const pinAngle = i * pinSpacing;
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.x = R_PIN * Math.cos(pinAngle);
      pinMesh.position.z = R_PIN * Math.sin(pinAngle);
      pinMesh.position.y = pinFloorY + 0.015; // center of cylinder
      pinMesh.castShadow = true;
      pinMesh.receiveShadow = true;
      this.group.add(pinMesh);
    }
  }

  private createWheelTexture(isEnemy: boolean, config: WheelConfig, predictionSector: number[] = [], boardMods?: BoardModifiers): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const centerX = 256;
    const centerY = 256;
    const slotCount = config.numbers.length;
    const slotAngle = (Math.PI * 2) / slotCount;

    // 1. Draw sectors
    for (let i = 0; i < slotCount; i++) {
      const startAngle = i * slotAngle - slotAngle / 2;
      const endAngle = i * slotAngle + slotAngle / 2;
      const num = config.numbers[i];
      const color = getSlotColor(num, config, boardMods);

      let colorStr = '#2ebd42'; // player green
      if (color === 'red') {
        colorStr = isEnemy ? '#b71c1c' : '#d32f2f'; // cold deep red vs warm red
      } else if (color === 'black') {
        colorStr = isEnemy ? '#111111' : '#222222'; // obsidian slate vs dark charcoal
      } else if (color === 'gold') {
        colorStr = '#ffd700'; // bright gold
      } else if (color === 'purple') {
        colorStr = '#9c27b0'; // deep purple
      } else if (color === 'cyan') {
        colorStr = '#00bcd4'; // teal cyan
      } else if (color === 'crimson') {
        colorStr = '#ff007f'; // vibrant ruby/rose crimson
      } else {
        colorStr = isEnemy ? '#64dd17' : '#2ebd42'; // neon green vs green
      }

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, 240, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colorStr;
      ctx.fill();

      // If prediction is active and this slot is NOT in the predicted sector, darken it!
      if (predictionSector.length > 0 && !predictionSector.includes(num)) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, 240, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fill();
      }

      // Draw Gold Foil or Copper Plate highlights
      const isGoldFoil = boardMods && boardMods.goldFoils && boardMods.goldFoils.includes(num);
      const isCopperPlate = boardMods && boardMods.copperPlates && boardMods.copperPlates.includes(num);
      if (isGoldFoil) {
        ctx.save();
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#ffd700'; // gold glow
        ctx.beginPath();
        ctx.arc(centerX, centerY, 230, startAngle, endAngle);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 165, startAngle, endAngle);
        ctx.stroke();
        ctx.restore();
      } else if (isCopperPlate) {
        ctx.save();
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#ffffff'; // white glow
        ctx.beginPath();
        ctx.arc(centerX, centerY, 230, startAngle, endAngle);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 165, startAngle, endAngle);
        ctx.stroke();
        ctx.restore();
      }
    }

    // 2. Draw gold/bronze inner slope circle to cover center of sectors
    ctx.beginPath();
    ctx.arc(centerX, centerY, 155, 0, Math.PI * 2);
    ctx.fillStyle = isEnemy ? '#0c0f0d' : '#21140e'; // dark slate vs dark wood
    ctx.fill();

    // 3. Draw divider lines
    ctx.strokeStyle = isEnemy ? 'rgba(90, 96, 101, 0.45)' : 'rgba(197, 159, 81, 0.45)';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < slotCount; i++) {
      const dividerAngle = i * slotAngle - slotAngle / 2;
      ctx.beginPath();
      ctx.moveTo(centerX + 155 * Math.cos(dividerAngle), centerY + 155 * Math.sin(dividerAngle));
      ctx.lineTo(centerX + 240 * Math.cos(dividerAngle), centerY + 240 * Math.sin(dividerAngle));
      ctx.stroke();
    }

    // 4. Draw outer trim circle
    ctx.strokeStyle = isEnemy ? '#5a6065' : '#8a703d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
    ctx.stroke();
    
    // 5. Draw inner trim circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 155, 0, Math.PI * 2);
    ctx.stroke();

    // 6. Draw numbers
    for (let i = 0; i < slotCount; i++) {
      const angle = i * slotAngle;
      const num = config.numbers[i];

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.translate(190, 0); // radius on canvas where numbers go
      ctx.rotate(Math.PI / 2); // orient text circumferentially

      if (predictionSector.length > 0 && !predictionSector.includes(num)) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'; // dim text
      } else {
        ctx.fillStyle = isEnemy ? '#ffcccc' : '#ffffff';
      }
      ctx.font = 'bold 22px "Courier Prime", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(num.toString(), 0, 0);
      ctx.restore();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  update(
    wheelAngle: number,
    ballAngle: number,
    ballRadius: number,
    ballHeight: number,
    isSettled: boolean,
    settledSlotIndex: number,
    config: WheelConfig,
    mods?: PhysicsModifiers,
    activeBalls?: any[]
  ) {
    // Update wheel rotating parts
    this.wheelCone.rotation.y = -wheelAngle; // match physical spin direction

    let lightColor = 0xffffff;
    let lightIntensity = 0.0;
    let ballColor = this.isEnemyWheel ? 0xffaaaa : 0xeeeeee;
    let ballEmissive = this.isEnemyWheel ? 0x990000 : 0x333333;

    if (mods) {
      if (mods.targetZoneBias > 0) {
        lightColor = 0x00d2ff;
        lightIntensity = 3.5;
        ballColor = 0x80e8ff;
        ballEmissive = 0x0055ff;
      } else if (mods.nudgeCheatActive) {
        lightColor = 0xff00ff;
        lightIntensity = 3.5;
        ballColor = 0xff80ff;
        ballEmissive = 0xaa00aa;
      } else if (mods.friction !== 1.0) {
        if (mods.friction < 1.0) {
          lightColor = 0x80deea;
          lightIntensity = 3.0;
          ballColor = 0xe0f7fa;
          ballEmissive = 0x006064;
        } else {
          lightColor = 0xff3d00;
          lightIntensity = 3.0;
          ballColor = 0xff9e80;
          ballEmissive = 0xb71c1c;
        }
      } else if (mods.wheelTilt > 0) {
        lightColor = 0xb388ff;
        lightIntensity = 3.0;
        ballColor = 0xd1c4e9;
        ballEmissive = 0x512da8;
      } else if (mods.ballMass !== 1.0) {
        if (mods.ballMass > 1.0) {
          lightColor = 0x00e676;
          lightIntensity = 3.0;
          ballColor = 0xb9f6ca;
          ballEmissive = 0x00c853;
        } else {
          lightColor = 0xffeb3b;
          lightIntensity = 3.0;
          ballColor = 0xfff9c4;
          ballEmissive = 0xf57f17;
        }
      }
    }

    if (activeBalls && activeBalls.length > 0) {
      // Hide default ball and light
      this.ballMesh.visible = false;
      if (this.ballLight) this.ballLight.intensity = 0;

      // Sync extra ball meshes
      const activeIds = new Set(activeBalls.map(b => b.id));
      const toDelete: number[] = [];
      for (const id of this.extraBallMeshes.keys()) {
        if (!activeIds.has(id)) {
          toDelete.push(id);
        }
      }
      for (const id of toDelete) {
        const mesh = this.extraBallMeshes.get(id);
        if (mesh) {
          this.group.remove(mesh);
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => m.dispose());
          } else {
            mesh.material.dispose();
          }
          this.extraBallMeshes.delete(id);
        }
      }

      for (const ball of activeBalls) {
        let mesh = this.extraBallMeshes.get(ball.id);
        if (!mesh) {
          const ballGeo = new THREE.SphereGeometry(0.035, 8, 8);
          const ballMat = new THREE.MeshStandardMaterial({
            color: this.isEnemyWheel ? 0xffaaaa : 0xeeeeee,
            roughness: 0.15,
            metalness: 0.9,
            emissive: this.isEnemyWheel ? 0x990000 : 0x333333
          });
          mesh = new THREE.Mesh(ballGeo, ballMat);
          mesh.castShadow = true;

          const pointLight = new THREE.PointLight(0xffffff, 0.0, 1.2);
          mesh.add(pointLight);

          this.group.add(mesh);
          this.extraBallMeshes.set(ball.id, mesh);
        }

        mesh.visible = true;

        mesh.position.x = Math.cos(ball.ballAngle) * ball.ballRadius;
        mesh.position.z = Math.sin(ball.ballAngle) * ball.ballRadius;

        let physFloorHeight = 0.02;
        if (ball.ballRadius > 0.88) {
          physFloorHeight = 0.15;
        } else if (ball.ballRadius > 0.65) {
          const tPhys = (ball.ballRadius - 0.65) / (0.88 - 0.65);
          physFloorHeight = 0.02 + 0.13 * tPhys;
        }
        const bounceHeight = Math.max(0, ball.ballHeight - physFloorHeight);

        const tVis = (ball.ballRadius - 0.65) / (1.0 - 0.65);
        const visualFloorHeight = 0.061 + (0.10 - 0.061) * Math.max(0, Math.min(1, tVis));
        mesh.position.y = visualFloorHeight + bounceHeight;

        // Set materials
        const ballLight = mesh.children[0] as THREE.PointLight;
        if (ballLight) {
          ballLight.color.setHex(lightColor);
          ballLight.intensity = lightIntensity;
        }
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.color.setHex(ballColor);
          mat.emissive.setHex(ballEmissive);
        }

        // Trails
        const activeModsExist = mods && (mods.targetZoneBias > 0 || mods.nudgeCheatActive || mods.friction !== 1.0 || mods.wheelTilt > 0 || mods.ballMass !== 1.0);
        const trailSpawnChance = activeBalls.length > 1 ? 0.25 : 0.85;
        if (activeModsExist && Math.random() < trailSpawnChance && this.trailGroup) {
          if (!this.sharedTrailGeo) {
            this.sharedTrailGeo = new THREE.SphereGeometry(0.018, 4, 4);
          }
          const trailMat = new THREE.MeshBasicMaterial({
            color: lightColor,
            transparent: true,
            opacity: 0.8,
            fog: false
          });
          const p = new THREE.Mesh(this.sharedTrailGeo, trailMat);
          p.position.copy(mesh.position);
          p.userData = { age: 0, maxAge: 12 };
          this.trailGroup.add(p);
        }
      }
    } else {
      // Clear extra balls and show default ball
      this.clearExtraBalls();
      this.ballMesh.visible = true;

      // Update ball coordinates in world space (wheel base)
      this.ballMesh.position.x = Math.cos(ballAngle) * ballRadius;
      this.ballMesh.position.z = Math.sin(ballAngle) * ballRadius;
      
      // Calculate physical floor height at current radius to determine bounce height
      let physFloorHeight = 0.02;
      if (ballRadius > 0.88) {
        physFloorHeight = 0.15;
      } else if (ballRadius > 0.65) {
        const tPhys = (ballRadius - 0.65) / (0.88 - 0.65);
        physFloorHeight = 0.02 + 0.13 * tPhys;
      }
      const bounceHeight = Math.max(0, ballHeight - physFloorHeight);

      // Map physical floor height to visual floor height dynamically
      const tVis = (ballRadius - 0.65) / (1.0 - 0.65);
      const visualFloorHeight = 0.061 + (0.10 - 0.061) * Math.max(0, Math.min(1, tVis));

      this.ballMesh.position.y = visualFloorHeight + bounceHeight;

      if (this.ballLight) {
        this.ballLight.color.setHex(lightColor);
        this.ballLight.intensity = lightIntensity;
      }
      if (this.ballMesh && this.ballMesh.material) {
        const mat = this.ballMesh.material as THREE.MeshStandardMaterial;
        mat.color.setHex(ballColor);
        mat.emissive.setHex(ballEmissive);
      }

      // --- Spawn Trail Particles if special physics card active ---
      const activeModsExist = mods && (mods.targetZoneBias > 0 || mods.nudgeCheatActive || mods.friction !== 1.0 || mods.wheelTilt > 0 || mods.ballMass !== 1.0);
      const speed = Math.abs(this.ballMesh.position.x - (this.lastBallX || 0)) + Math.abs(this.ballMesh.position.z - (this.lastBallZ || 0));
      this.lastBallX = this.ballMesh.position.x;
      this.lastBallZ = this.ballMesh.position.z;

      if (activeModsExist && speed > 0.005 && Math.random() < 0.85 && this.trailGroup) {
        if (!this.sharedTrailGeo) {
          this.sharedTrailGeo = new THREE.SphereGeometry(0.018, 4, 4);
        }
        const trailMat = new THREE.MeshBasicMaterial({
          color: lightColor,
          transparent: true,
          opacity: 0.8,
          fog: false
        });
        const p = new THREE.Mesh(this.sharedTrailGeo, trailMat);
        p.position.copy(this.ballMesh.position);
        p.userData = { age: 0, maxAge: 12 };
        this.trailGroup.add(p);
      }
    }

    // Update trail particles life cycles
    if (this.trailGroup) {
      for (let i = this.trailGroup.children.length - 1; i >= 0; i--) {
        const p = this.trailGroup.children[i] as THREE.Mesh;
        p.userData.age += 1;
        const t = p.userData.age / p.userData.maxAge;
        const s = 1.0 - t;
        p.scale.set(s, s, s);
        
        const mat = p.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.8 * (1.0 - t);
        
        if (p.userData.age >= p.userData.maxAge) {
          this.trailGroup.remove(p);
          if (p.geometry !== this.sharedTrailGeo) {
            p.geometry.dispose();
          }
          mat.dispose();
        }
      }
    }

    // --- Lands Highlight Ring sector ---
    if (this.highlightMesh) {
      if (isSettled && settledSlotIndex >= 0 && settledSlotIndex < config.numbers.length) {
        const num = config.numbers[settledSlotIndex];
        const color = getSlotColor(num, config);
        let glowColor = 0xffffff;
        if (color === 'red') glowColor = 0xff0000;
        else if (color === 'green') glowColor = 0x00ff00;
        else if (color === 'black') glowColor = 0x444444;
        else if (color === 'gold') glowColor = 0xffd700;
        else if (color === 'purple') glowColor = 0x9c27b0;
        else if (color === 'cyan') glowColor = 0x00bcd4;
        else if (color === 'crimson') glowColor = 0xff007f;
        
        const mat = this.highlightMesh.material as THREE.MeshBasicMaterial;
        mat.color.setHex(glowColor);
        
        const slotAngle = (Math.PI * 2) / config.numbers.length;
        this.highlightMesh.rotation.z = -settledSlotIndex * slotAngle;
        
        // Pulse opacity over time
        const pulse = 0.5 + Math.sin(Date.now() * 0.01) * 0.3;
        mat.opacity = pulse;
        this.highlightMesh.visible = true;
      } else {
        const mat = this.highlightMesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.0;
        this.highlightMesh.visible = false;
      }
    }
  }
}

// Procedural Card Object Creator
export class CardVisual {
  mesh: THREE.Mesh;
  targetPosition = new THREE.Vector3();
  targetRotation = new THREE.Euler();
  
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
  card: Card;
  isPointsMode: boolean;
  lastTurnsLeft?: number;
  
  constructor(card: Card, isPointsMode: boolean = false) {
    this.card = card;
    this.isPointsMode = isPointsMode;
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = 512;
    this.canvas.height = 720;
    this.ctx = this.canvas.getContext('2d')!;
    
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    
    this.drawCardFace();
    
    const cardGeo = new THREE.BoxGeometry(0.11, 0.16, 0.002);
    
    const backMat = new THREE.MeshBasicMaterial({ 
      color: card.rarity === 'legendary' ? 0x20072c :
             card.rarity === 'rare' ? 0x3d2708 :
             card.rarity === 'uncommon' ? 0x0f1821 : 0x2d1a12, 
      fog: false 
    });
    const sideMat = new THREE.MeshBasicMaterial({ 
      color: card.rarity === 'legendary' ? 0xb53c14 :
             card.rarity === 'rare' ? 0x8c6d13 :
             card.rarity === 'uncommon' ? 0x224252 : 0x5c4033, 
      fog: false 
    });
    const frontMat = new THREE.MeshBasicMaterial({ 
      map: this.texture,
      fog: false
    });

    const materials = [
      sideMat, // right
      sideMat, // left
      sideMat, // top
      sideMat, // bottom
      frontMat, // front
      backMat   // back
    ];

    this.mesh = new THREE.Mesh(cardGeo, materials);
    this.mesh.castShadow = true;
    this.mesh.userData = { cardId: card.id };
  }

  drawCardFace(turnsLeft?: number) {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const card = this.card;
    const isPointsMode = this.isPointsMode;
    const scale = 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw card background
    if (card.rarity === 'legendary') {
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#250830'); // Deep purple
      grad.addColorStop(0.5, '#09020d'); // Obsidian black
      grad.addColorStop(1, '#250830');
      ctx.fillStyle = grad;
    } else if (card.rarity === 'rare') {
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#2d1b06');
      grad.addColorStop(0.5, '#120b02');
      grad.addColorStop(1, '#2d1b06');
      ctx.fillStyle = grad;
    } else if (card.rarity === 'uncommon') {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#0c1520');
      grad.addColorStop(1, '#05080c');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = '#1e1610'; // Dark cardboard
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw border
    if (card.rarity === 'legendary') {
      ctx.strokeStyle = '#ff5722'; // Fiery Orange-Red
    } else if (card.rarity === 'rare') {
      ctx.strokeStyle = '#ffd700'; // Pure Gold
    } else if (card.rarity === 'uncommon') {
      ctx.strokeStyle = '#4fc3f7'; // Neon Cyan
    } else {
      ctx.strokeStyle = card.type === 'physics' ? '#64b5f6' : 
                        card.type === 'board' ? '#81c784' : 
                        card.type === 'payout' ? '#e57373' :
                        card.type === 'chaos' ? '#e040fb' : 
                        card.type === 'paint' ? '#ff9100' : 
                        card.type === 'money' ? '#00e676' : '#ffd54f';
    }
    ctx.lineWidth = 12 * scale;
    ctx.strokeRect(6 * scale, 6 * scale, canvas.width - 12 * scale, canvas.height - 12 * scale);
    
    // Top header background
    ctx.fillStyle = card.rarity === 'legendary' ? '#380a47' :
                    card.rarity === 'rare' ? '#3d2b0e' :
                    card.rarity === 'uncommon' ? '#122030' : '#2d2218';
    ctx.fillRect(12 * scale, 12 * scale, canvas.width - 24 * scale, 60 * scale);

    // Draw Cost
    ctx.fillStyle = card.rarity === 'legendary' ? '#ff5722' :
                    card.rarity === 'rare' ? '#ffd700' : '#ffb300';
    ctx.font = 'bold ' + (24 * scale) + 'px "Courier Prime", monospace';
    ctx.fillText(`${card.cost}⚡`, canvas.width - 60 * scale, 48 * scale);

    // Draw Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold ' + (18 * scale) + 'px "Courier Prime", monospace';
    ctx.fillText(card.name.substring(0, 16), 24 * scale, 48 * scale);

    // Draw Type & Rarity Label
    ctx.fillStyle = card.rarity === 'legendary' ? '#ff5722' :
                    card.rarity === 'rare' ? '#ffd700' :
                    card.rarity === 'uncommon' ? '#4fc3f7' : '#aaaaaa';
    ctx.font = 'bold italic ' + (13 * scale) + 'px "Courier Prime", monospace';
    ctx.fillText(`${card.type.toUpperCase()} · ${card.rarity.toUpperCase()}`, 24 * scale, 95 * scale);

    // Draw Card Illustration placeholder
    ctx.fillStyle = card.rarity === 'legendary' ? '#1c0525' :
                    card.rarity === 'rare' ? '#201608' :
                    card.rarity === 'uncommon' ? '#0d131a' : '#17110c';
    ctx.fillRect(24 * scale, 110 * scale, canvas.width - 48 * scale, 110 * scale);
    
    // Draw simple geometric shapes representing card type
    ctx.strokeStyle = card.rarity === 'legendary' ? '#ff5722' :
                      card.rarity === 'rare' ? '#ffd700' :
                      card.rarity === 'uncommon' ? '#4fc3f7' : '#3e2f22';
    ctx.lineWidth = 4 * scale;
    ctx.strokeRect(30 * scale, 115 * scale, canvas.width - 60 * scale, 100 * scale);
    
    ctx.fillStyle = ctx.strokeStyle;
    if (card.type === 'physics') {
      ctx.beginPath();
      ctx.arc(128 * scale, 165 * scale, 30 * scale, 0, Math.PI * 2);
      ctx.stroke();
    } else if (card.type === 'chaos') {
      ctx.beginPath();
      ctx.arc(128 * scale, 165 * scale, 30 * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(128 * scale, 165 * scale, 18 * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(128 * scale, 165 * scale, 8 * scale, 0, Math.PI * 2);
      ctx.stroke();
    } else if (card.type === 'board') {
      ctx.fillRect(100 * scale, 135 * scale, 56 * scale, 56 * scale);
    } else if (card.type === 'payout') {
      ctx.font = 'bold ' + (36 * scale) + 'px "Courier Prime", monospace';
      ctx.fillStyle = card.rarity === 'legendary' ? '#ff5722' :
                      card.rarity === 'rare' ? '#ffd700' : '#e57373';
      ctx.fillText('x2.5', 90 * scale, 175 * scale);
    } else if (card.type === 'paint') {
      ctx.beginPath();
      ctx.arc(128 * scale, 170 * scale, 20 * scale, 0, Math.PI);
      ctx.lineTo(128 * scale, 130 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (card.type === 'money') {
      ctx.font = `bold ${48 * scale}px "Courier Prime", Courier, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', 128 * scale, 165 * scale);
      ctx.strokeText('$', 128 * scale, 165 * scale);
      ctx.textAlign = 'left';
    } else {
      ctx.fillRect(108 * scale, 145 * scale, 40 * scale, 40 * scale);
    }

    // Add stars to illustration block
    if (card.rarity === 'legendary') {
      ctx.fillStyle = '#ff5722';
      ctx.font = (16 * scale) + 'px "Courier Prime", monospace';
      ctx.fillText('★ ★ ★ ★', canvas.width - 100 * scale, 135 * scale);
    } else if (card.rarity === 'rare') {
      ctx.fillStyle = '#ffd700';
      ctx.font = (16 * scale) + 'px "Courier Prime", monospace';
      ctx.fillText('★ ★ ★', canvas.width - 90 * scale, 135 * scale);
    } else if (card.rarity === 'uncommon') {
      ctx.fillStyle = '#4fc3f7';
      ctx.font = (16 * scale) + 'px "Courier Prime", monospace';
      ctx.fillText('★ ★', canvas.width - 80 * scale, 135 * scale);
    }

    // Draw Description (Word wrapped)
    ctx.fillStyle = '#dddddd';
    ctx.font = (14 * scale) + 'px "Courier Prime", monospace';
    const formattedDesc = formatDescription(card.description, isPointsMode);
    const words = formattedDesc.split(' ');
    let line = '';
    let y = 245 * scale;
    
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

    // If turnsLeft is active or it is a fight-long persistent card, draw a banner!
    const fightLongEffects = new Set([
      'CRIMSON_SURGE', 'DARK_FURY', 'LUCKY_SEVEN', 'UNLUCKY_THIRTEEN',
      'JACKPOT_TRIO', 'DEVILS_TRIO', 'ZERO_HERO', 'EMERALD_FOREST',
      'LOAN_SHARK', 'ZERO_ECLIPSE', 'MONOCHROME_EYE',
      'CHIP_MINE', 'SHIELD_GENERATOR', 'LIFE_FOUNTAIN',
      'DANGER_ZONE', 'VOID_HOLE', 'MIRROR_SLOT'
    ]);
    const isFightLong = fightLongEffects.has(card.effectId);

    if (turnsLeft !== undefined && turnsLeft > 0) {
      // Draw banner background across the bottom
      ctx.fillStyle = 'rgba(255, 87, 34, 0.85)'; // semi-transparent neon orange
      ctx.fillRect(12 * scale, 312 * scale, canvas.width - 24 * scale, 30 * scale);
      
      // Draw banner border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(12 * scale, 312 * scale, canvas.width - 24 * scale, 30 * scale);
      
      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold ' + (12 * scale) + 'px "Courier Prime", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`ACTIVE: ${turnsLeft} SPINS LEFT`, canvas.width / 2, 330 * scale);
      
      // Revert text align
      ctx.textAlign = 'left';
    } else if (isFightLong) {
      // Draw banner background across the bottom (purple/magenta for fight-long)
      ctx.fillStyle = 'rgba(156, 39, 176, 0.85)';
      ctx.fillRect(12 * scale, 312 * scale, canvas.width - 24 * scale, 30 * scale);
      
      // Draw banner border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(12 * scale, 312 * scale, canvas.width - 24 * scale, 30 * scale);
      
      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold ' + (12 * scale) + 'px "Courier Prime", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ACTIVE: FIGHT-LONG', canvas.width / 2, 330 * scale);
      
      // Revert text align
      ctx.textAlign = 'left';
    }
  }

  updatePersistentState(turnsLeft?: number) {
    if (this.lastTurnsLeft === turnsLeft) return;
    this.lastTurnsLeft = turnsLeft;
    this.drawCardFace(turnsLeft);
    this.texture.needsUpdate = true;
  }

  update(lerpFactor = 0.15) {
    // Smoothly interpolate position and rotation towards target state
    this.mesh.position.lerp(this.targetPosition, lerpFactor);
    
    // Quaternion lerp for smooth rotations
    const targetQ = new THREE.Quaternion().setFromEuler(this.targetRotation);
    this.mesh.quaternion.slerp(targetQ, lerpFactor);
  }
}

// Procedural PS1 Creepy Enemy Mesh
export class EnemyVisual {
  group: THREE.Group;
  head!: THREE.Mesh;
  leftEye!: THREE.Mesh;
  rightEye!: THREE.Mesh;
  private currentSpriteName: string = '';
  
  constructor() {
    this.group = new THREE.Group();
    this.rebuildEnemy('gambler');
  }

  public rebuildEnemy(spriteName: string) {
    if (this.currentSpriteName === spriteName && this.group.children.length > 0) return;
    this.currentSpriteName = spriteName;

    // Clear existing children from group
    while (this.group.children.length > 0) {
      const child = this.group.children[0] as THREE.Mesh;
      this.group.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach(m => m.dispose());
      } else if (child.material) {
        child.material.dispose();
      }
    }

    // Set colors based on opponent identity
    let bodyColor = 0x222222;
    let headColor = 0xeee3e7;
    let eyeColor = 0xff0000;
    let headShape: 'box' | 'cylinder' | 'sphere' = 'box';
    let robeShape: 'cone' | 'cylinder' = 'cone';
    let metalness = 0.0;
    let roughness = 0.8;

    if (spriteName === 'decay_wheel') {
      bodyColor = 0x3e4a35;
      headColor = 0x7d8c77;
      eyeColor = 0x00ff44;
      headShape = 'sphere';
    } else if (spriteName === 'croupier') {
      bodyColor = 0x1a1a1a;
      headColor = 0xeee3e7;
      eyeColor = 0x990000;
      headShape = 'box';
    } else if (spriteName === 'wraith') {
      bodyColor = 0x5e0f13;
      headColor = 0xa8222a;
      eyeColor = 0xffffff;
      headShape = 'cylinder';
    } else if (spriteName === 'dealer_claw') {
      bodyColor = 0x3e185e; // purple robe
      headColor = 0xffd700; // shiny gold mask
      eyeColor = 0x00ffff; // neon cyan eyes
      headShape = 'box';
      metalness = 0.85;
      roughness = 0.3;
    } else if (spriteName === 'the_house') {
      bodyColor = 0x0c0c0d; // giant void black robe
      headColor = 0x111111; // dark charcoal bone
      eyeColor = 0xff4400; // blazing orange eyes
      headShape = 'box';
    }

    // 1. Shrouded Robe/Torso
    const bodyGeo = robeShape === 'cone' ? new THREE.ConeGeometry(0.4, 1.8, 4) : new THREE.CylinderGeometry(0.3, 0.4, 1.8, 6);
    const bodyMat = new THREE.MeshPhongMaterial({
      color: bodyColor,
      shininess: metalness > 0 ? 50 : 10
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.9;
    body.rotation.y = Math.PI / 4;
    body.castShadow = true;
    body.receiveShadow = true;
    this.group.add(body);

    // 2. Neck
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.25, 6);
    const neckMat = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 10 });
    const neck = new THREE.Mesh(neckGeo, neckMat);
    neck.position.y = 1.8;
    this.group.add(neck);

    // 3. Head
    let headGeo: THREE.BufferGeometry;
    if (headShape === 'sphere') {
      headGeo = new THREE.SphereGeometry(0.26, 6, 6);
    } else if (headShape === 'cylinder') {
      headGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.5, 6);
    } else {
      headGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    }

    const headMat = new THREE.MeshStandardMaterial({
      color: headColor,
      metalness: metalness,
      roughness: roughness
    });
    this.head = new THREE.Mesh(headGeo, headMat);
    this.head.position.y = 2.1;
    this.head.castShadow = true;
    this.group.add(this.head);

    // 4. Glowing Eyes
    const eyeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 6);
    const eyeMat = new THREE.MeshBasicMaterial({ color: eyeColor });
    
    this.leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    this.leftEye.rotation.x = Math.PI / 2;
    this.leftEye.position.set(-0.13, 2.15, 0.24);
    this.group.add(this.leftEye);

    this.rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    this.rightEye.rotation.x = Math.PI / 2;
    this.rightEye.position.set(0.13, 2.15, 0.24);
    this.group.add(this.rightEye);
  }

  update(time: number) {
    // Subtle breathing / swaying micro-animation
    this.group.position.y = Math.sin(time * 2.0) * 0.02;
    
    // Head twitching slightly
    if (Math.sin(time * 0.5) > 0.95 && Math.random() < 0.05) {
      this.head.rotation.y = (Math.random() - 0.5) * 0.4;
      this.head.rotation.x = (Math.random() - 0.5) * 0.2;
    } else {
      // slowly return to looking center
      this.head.rotation.y *= 0.95;
      this.head.rotation.x *= 0.95;
    }
  }
}

export class ForgeCardVisual {
  mesh: THREE.Mesh;
  targetPosition = new THREE.Vector3();
  targetRotation = new THREE.Euler();
  cardId: string;
  rarity: 'bronze' | 'silver' | 'gold';
  purchased: boolean = false;
  
  constructor(card: ForgeCard, isPointsMode: boolean = false) {
    this.cardId = card.id;
    this.rarity = card.rarity;
    this.purchased = card.purchased;

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 360;
    const ctx = canvas.getContext('2d')!;

    let metalColor = '#2d251e';
    let rarityColor = '#cd7f32';
    let label = 'BRONZE';
    let roughness = 0.65;
    let metalness = 0.6;

    if (card.rarity === 'silver') {
      metalColor = '#1f2429';
      rarityColor = '#aaaaaa';
      label = 'SILVER';
      roughness = 0.55;
      metalness = 0.75;
    } else if (card.rarity === 'gold') {
      metalColor = '#2b2408';
      rarityColor = '#ffd700';
      label = 'GOLD';
      roughness = 0.45;
      metalness = 0.85;
    }

    ctx.fillStyle = metalColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    ctx.strokeStyle = rarityColor;
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, canvas.width - 14, canvas.height - 14);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(18, 18, canvas.width - 36, 56);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px Courier New';
    ctx.textAlign = 'left';
    ctx.fillText(card.name, 28, 40);

    ctx.fillStyle = rarityColor;
    ctx.font = 'bold 20px Courier New';
    ctx.textAlign = 'right';
    ctx.fillText(`${card.cost}⚡`, canvas.width - 28, 62);

    ctx.fillStyle = rarityColor;
    ctx.font = 'bold italic 13px Courier New';
    ctx.textAlign = 'left';
    ctx.fillText(label, 28, 92);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(24, 110, canvas.width - 48, 110);
    ctx.strokeStyle = rarityColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 110, canvas.width - 48, 110);

    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(50, 120, canvas.width - 100, 90);
    
    ctx.strokeStyle = rarityColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(98, 185);
    ctx.lineTo(158, 185);
    ctx.lineTo(148, 165);
    ctx.lineTo(108, 165);
    ctx.closePath();
    ctx.fillStyle = rarityColor;
    ctx.fill();
    ctx.stroke();

    ctx.strokeRect(118, 185, 20, 15);
    
    ctx.translate(128, 140);
    ctx.rotate(-Math.PI / 6);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillRect(-10, -5, 20, 10);
    ctx.fillStyle = '#8b5a2b';
    ctx.fillRect(-2, 5, 4, 15);
    ctx.restore();

    ctx.fillStyle = '#dddddd';
    ctx.font = '14px Courier New';
    ctx.textAlign = 'left';
    const formattedDesc = formatDescription(card.description, isPointsMode);
    const words = formattedDesc.split(' ');
    let line = '';
    let y = 245;
    
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

    if (card.purchased) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
      ctx.fillStyle = rarityColor;
      ctx.font = 'bold 36px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText('OWNED', canvas.width / 2, canvas.height / 2 + 10);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    const cardGeo = new THREE.BoxGeometry(0.38, 0.54, 0.008);

    const metallicColorHex = card.rarity === 'gold' ? 0xffd700 : card.rarity === 'silver' ? 0xcccccc : 0xcd7f32;
    const backMat = new THREE.MeshStandardMaterial({
      color: card.purchased ? 0x111111 : metallicColorHex,
      metalness: card.purchased ? 0.0 : metalness,
      roughness: card.purchased ? 0.9 : roughness + 0.2,
      bumpScale: 0.05
    });
    const sideMat = new THREE.MeshStandardMaterial({
      color: card.purchased ? 0x111111 : metallicColorHex,
      metalness: card.purchased ? 0.0 : metalness,
      roughness: card.purchased ? 0.9 : roughness
    });
    const frontMat = new THREE.MeshLambertMaterial({
      map: texture
    });

    const materials = [
      sideMat, // right
      sideMat, // left
      sideMat, // top
      sideMat, // bottom
      frontMat, // front
      backMat   // back
    ];

    this.mesh = new THREE.Mesh(cardGeo, materials);
    this.mesh.castShadow = true;
    this.mesh.userData = { isForgeCard: true, forgeCardId: card.id };
  }

  update(lerpFactor = 0.15) {
    this.mesh.position.lerp(this.targetPosition, lerpFactor);
    const targetQ = new THREE.Quaternion().setFromEuler(this.targetRotation);
    this.mesh.quaternion.slerp(targetQ, lerpFactor);
  }
}

export class ShopItemVisual {
  mesh: THREE.Mesh;
  targetPosition = new THREE.Vector3();
  targetRotation = new THREE.Euler();
  itemId: string;
  itemType: 'card' | 'upgrade' | 'heal';
  cost: number;
  purchased: boolean = false;
  
  constructor(type: 'card' | 'upgrade' | 'heal', data: any, itemId: string, purchased: boolean, isPointsMode: boolean = false) {
    this.itemType = type;
    this.itemId = itemId;
    this.purchased = purchased;
    this.cost = data.cost;

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 360;
    const ctx = canvas.getContext('2d')!;

    let bgColor = '#181224';
    let borderColor = '#6a4c9c';
    let roughness = 0.5;
    let metalness = 0.5;

    if (type === 'card') {
      const rarity = data.rarity || 'common';
      if (rarity === 'common') {
        bgColor = '#22252a';
        borderColor = '#aaaaaa';
        roughness = 0.6;
        metalness = 0.4;
      } else if (rarity === 'uncommon') {
        bgColor = '#1e2836';
        borderColor = '#00bcd4';
        roughness = 0.5;
        metalness = 0.6;
      } else if (rarity === 'rare') {
        bgColor = '#2b271a';
        borderColor = '#ffd700';
        roughness = 0.4;
        metalness = 0.8;
      } else if (rarity === 'legendary') {
        bgColor = '#331f24';
        borderColor = '#ff5722';
        roughness = 0.35;
        metalness = 0.9;
      }
    } else if (type === 'upgrade') {
      bgColor = '#1a1329';
      borderColor = '#b388ff';
      roughness = 0.45;
      metalness = 0.7;
    } else if (type === 'heal') {
      bgColor = '#2d0a06';
      borderColor = '#ff1744';
      roughness = 0.7;
      metalness = 0.2;
    }

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(18, 18, canvas.width - 36, 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px "Courier Prime", monospace';
    ctx.fillText(data.name.toUpperCase(), 24, 48);

    ctx.fillStyle = borderColor;
    ctx.font = 'bold 18px "Courier Prime", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${data.cost}⚡`, canvas.width - 28, 48);
    ctx.textAlign = 'left';

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = 'bold 11px "Courier Prime", monospace';
    const subLabel = type === 'card' ? `${data.type} · ${data.rarity}`.toUpperCase() : (type === 'heal' ? 'RECOVERY' : 'BOARD UPGRADE');
    ctx.fillText(subLabel, 24, 90);

    ctx.fillStyle = '#dddddd';
    ctx.font = 'bold 12px "Courier Prime", monospace';
    const formattedDesc = formatDescription(data.description || '', isPointsMode);
    const words = formattedDesc.split(' ');
    let line = '';
    let y = 120;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > (canvas.width - 48) && n > 0) {
        ctx.fillText(line, 24, y);
        line = words[n] + ' ';
        y += 18;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 24, y);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(24, 210, canvas.width - 48, 120);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeRect(28, 214, canvas.width - 56, 112);

    ctx.fillStyle = borderColor;
    ctx.font = 'bold 42px "Courier Prime", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const icon = type === 'heal' ? '🩸' : (type === 'upgrade' ? '⚙️' : '🃏');
    ctx.fillText(icon, canvas.width / 2, 270);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';

    if (this.purchased) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 12);
      ctx.fillStyle = 'rgba(255, 0, 80, 0.15)';
      ctx.fillRect(-100, -30, 200, 60);
      ctx.strokeStyle = '#ff0050';
      ctx.lineWidth = 4;
      ctx.strokeRect(-100, -30, 200, 60);
      ctx.fillStyle = '#ff0050';
      ctx.font = 'bold 36px "Courier Prime", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(type === 'upgrade' ? 'OWNED' : 'SOLD', 0, 0);
      ctx.restore();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    const cardGeo = new THREE.BoxGeometry(0.18, 0.25, 0.004);
    const sideColor = type === 'heal' ? 0x2d0a06 : 0x181224;
    const backMat = new THREE.MeshPhongMaterial({ color: sideColor, shininess: 10, fog: false });
    const sideMat = new THREE.MeshPhongMaterial({ color: sideColor, shininess: 10, fog: false });
    const frontMat = new THREE.MeshStandardMaterial({ 
      map: texture, 
      metalness: this.purchased ? 0.1 : metalness, 
      roughness: this.purchased ? 0.9 : roughness,
      fog: false 
    });

    this.mesh = new THREE.Mesh(cardGeo, [sideMat, sideMat, sideMat, sideMat, frontMat, backMat]);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.mesh.userData = {
      isShopItem: true,
      shopItemIdx: itemId,
      shopItemType: type
    };
  }

  update(time: number) {
    this.mesh.position.lerp(this.targetPosition, 0.08);
    const targetQ = new THREE.Quaternion().setFromEuler(this.targetRotation);
    this.mesh.quaternion.slerp(targetQ, 0.08);
  }
}

export class EventChoiceVisual {
  mesh: THREE.Mesh;
  targetPosition = new THREE.Vector3();
  targetRotation = new THREE.Euler();
  choiceId: string;
  
  constructor(choiceId: string, title: string, costText: string, description: string, isPointsMode: boolean = false) {
    this.choiceId = choiceId;

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 360;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#242b27';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 256, 0);
      ctx.lineTo(Math.random() * 256, 360);
      ctx.stroke();
    }

    ctx.strokeStyle = '#4a594f';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, canvas.width - 14, canvas.height - 14);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(18, 18, canvas.width - 36, 52);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px "Courier Prime", monospace';
    ctx.fillText(title.toUpperCase(), 24, 48);

    ctx.fillStyle = '#81c784';
    if (costText.includes('Lose') || costText.includes('cost')) {
      ctx.fillStyle = '#e57373';
    }
    ctx.font = 'bold 11px "Courier Prime", monospace';
    ctx.fillText(costText.toUpperCase(), 24, 90);

    ctx.fillStyle = '#dddddd';
    ctx.font = 'bold 12px "Courier Prime", monospace';
    const formattedDesc = formatDescription(description || '', isPointsMode);
    const words = formattedDesc.split(' ');
    let line = '';
    let y = 120;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > (canvas.width - 48) && n > 0) {
        ctx.fillText(line, 24, y);
        line = words[n] + ' ';
        y += 18;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 24, y);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.font = 'bold 72px "Courier Prime", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const runes = ['ᛗ', 'ᛟ', 'ᚦ', 'ᚱ', 'ᚺ', 'ᛊ'];
    const rune = runes[parseInt(choiceId) % runes.length];
    ctx.fillText(rune, canvas.width / 2, 270);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    const tabletGeo = new THREE.BoxGeometry(0.20, 0.28, 0.015);
    const sideMat = new THREE.MeshPhongMaterial({ color: 0x1e2421, shininess: 2, fog: false });
    const frontMat = new THREE.MeshStandardMaterial({ 
      map: texture, 
      roughness: 0.85, 
      metalness: 0.1,
      fog: false 
    });

    this.mesh = new THREE.Mesh(tabletGeo, [sideMat, sideMat, sideMat, sideMat, frontMat, sideMat]);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.mesh.userData = {
      isEventChoice: true,
      eventChoiceId: choiceId
    };
  }

  update(time: number) {
    this.mesh.position.lerp(this.targetPosition, 0.08);
    const targetQ = new THREE.Quaternion().setFromEuler(this.targetRotation);
    this.mesh.quaternion.slerp(targetQ, 0.08);
  }
}
