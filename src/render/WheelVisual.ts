import * as THREE from 'three';
import { Card, Enemy, WheelConfig } from '../core/Types';
import { getSlotColor, WHEEL_NUMBERS } from '../physics/RoulettePhysics';

export class WheelVisual {
  group: THREE.Group;
  wheelBase!: THREE.Mesh;
  wheelCone!: THREE.Group;
  ballMesh!: THREE.Mesh;
  ringMesh!: THREE.Mesh;
  
  constructor(isEnemy: boolean, config: WheelConfig) {
    this.group = new THREE.Group();
    this.buildWheel(isEnemy, config);
  }

  rebuildWheel(isEnemy: boolean, config: WheelConfig) {
    // Dispose previous geometries and materials to avoid memory leaks
    this.group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(m => m.dispose());
        }
      }
    });

    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0]);
    }

    this.buildWheel(isEnemy, config);
  }

  setBallVisible(visible: boolean) {
    if (this.ballMesh) {
      this.ballMesh.visible = visible;
    }
  }

  private buildWheel(isEnemy: boolean, config: WheelConfig) {
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
      map: this.createWheelTexture(isEnemy, config),
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
  }

  private createWheelTexture(isEnemy: boolean, config: WheelConfig): THREE.Texture {
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
      const color = getSlotColor(num, config);

      let colorStr = '#2ebd42'; // player green
      if (color === 'red') {
        colorStr = isEnemy ? '#b71c1c' : '#d32f2f'; // cold deep red vs warm red
      } else if (color === 'black') {
        colorStr = isEnemy ? '#111111' : '#222222'; // obsidian slate vs dark charcoal
      } else {
        colorStr = isEnemy ? '#64dd17' : '#2ebd42'; // neon green vs green
      }

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, 240, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colorStr;
      ctx.fill();
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

      ctx.fillStyle = isEnemy ? '#ffcccc' : '#ffffff';
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

  update(wheelAngle: number, ballAngle: number, ballRadius: number, ballHeight: number) {
    // Update wheel rotating parts
    this.wheelCone.rotation.y = -wheelAngle; // match physical spin direction

    // Update ball coordinates in world space (wheel base)
    this.ballMesh.position.x = Math.cos(ballAngle) * ballRadius;
    this.ballMesh.position.z = Math.sin(ballAngle) * ballRadius;
    
    // Add offset (+ 0.06) so the ball sits visually on top of the visual slots surface (ringMesh)
    this.ballMesh.position.y = ballHeight + 0.06;
  }
}

// Procedural Card Object Creator
export class CardVisual {
  mesh: THREE.Mesh;
  targetPosition = new THREE.Vector3();
  targetRotation = new THREE.Euler();
  
  constructor(card: Card) {
    // Create card textured with procedural Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 360;
    const ctx = canvas.getContext('2d')!;

    // Draw card background
    ctx.fillStyle = '#1e1610'; // Dark cardboard
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw border
    ctx.strokeStyle = card.type === 'physics' ? '#64b5f6' : 
                      card.type === 'board' ? '#81c784' : 
                      card.type === 'payout' ? '#e57373' : '#ffd54f';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
    
    // Top header background
    ctx.fillStyle = '#2d2218';
    ctx.fillRect(12, 12, canvas.width - 24, 60);

    // Draw Cost
    ctx.fillStyle = '#ffb300';
    ctx.font = 'bold 24px Courier New';
    ctx.fillText(`${card.cost}⚡`, canvas.width - 60, 48);

    // Draw Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Courier New';
    ctx.fillText(card.name.substring(0, 16), 24, 48);

    // Draw Type Label
    ctx.fillStyle = '#aaaaaa';
    ctx.font = 'italic 14px Courier New';
    ctx.fillText(card.type.toUpperCase(), 24, 95);

    // Draw Card Illustration placeholder
    ctx.fillStyle = '#17110c';
    ctx.fillRect(24, 110, canvas.width - 48, 110);
    
    // Draw simple geometric shapes representing card type
    ctx.strokeStyle = ctx.strokeStyle = '#3e2f22';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 115, canvas.width - 60, 100);
    
    ctx.fillStyle = ctx.strokeStyle;
    if (card.type === 'physics') {
      // Draw ball path
      ctx.beginPath();
      ctx.arc(128, 165, 30, 0, Math.PI * 2);
      ctx.stroke();
    } else if (card.type === 'board') {
      // Draw grid
      ctx.fillRect(100, 135, 56, 56);
    } else if (card.type === 'payout') {
      // Draw skull/multiplier
      ctx.font = 'bold 36px Courier New';
      ctx.fillStyle = '#e57373';
      ctx.fillText('x2.5', 90, 175);
    } else {
      // Utility gear/dice
      ctx.fillRect(108, 145, 40, 40);
    }

    // Draw Description (Word wrapped)
    ctx.fillStyle = '#dddddd';
    ctx.font = '14px Courier New';
    const words = card.description.split(' ');
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

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    
    // 3D Card box geometry
    const cardGeo = new THREE.BoxGeometry(0.11, 0.16, 0.002);
    
    // Materials: Front has canvas texture, back is wooden dark back, sides are cardboard gray
    const backMat = new THREE.MeshBasicMaterial({ color: 0x2d1a12, fog: false });
    const sideMat = new THREE.MeshBasicMaterial({ color: 0x5c4033, fog: false });
    const frontMat = new THREE.MeshBasicMaterial({ 
      map: texture,
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
  
  constructor() {
    this.group = new THREE.Group();
    this.buildEnemy();
  }

  private buildEnemy() {
    // 1. Shrouded Robe/Torso (Pyramid shape)
    const bodyGeo = new THREE.ConeGeometry(0.8, 1.8, 4);
    const bodyMat = new THREE.MeshPhongMaterial({
      color: 0x222222, // Lighter black robe
      shininess: 10
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.9;
    body.rotation.y = Math.PI / 4; // rotate to make front face flat
    body.castShadow = true;
    body.receiveShadow = true;
    this.group.add(body);

    // 2. Neck (Cylinder)
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.25, 6);
    const neckMat = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 10 });
    const neck = new THREE.Mesh(neckGeo, neckMat);
    neck.position.y = 1.8;
    this.group.add(neck);

    // 3. Head - A creepy low-poly geometric mask/skull
    const headGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const headMat = new THREE.MeshPhongMaterial({
      color: 0xeee3e7, // Brighter pale bone white
      shininess: 30
    });
    this.head = new THREE.Mesh(headGeo, headMat);
    this.head.position.y = 2.1;
    this.head.castShadow = true;
    this.group.add(this.head);

    // 4. Glowing Red Eyes (Tiny Cylinders emitting light)
    const eyeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 6);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    
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
