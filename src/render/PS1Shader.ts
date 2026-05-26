import * as THREE from 'three';

export const PS1Shader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2(640, 480) }
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // 4x4 Bayer Dithering Matrix
    float getDither(vec2 pos) {
      int x = int(mod(pos.x, 4.0));
      int y = int(mod(pos.y, 4.0));
      int index = 0;
      
      if (y == 0) {
        if (x == 0) index = 0;
        else if (x == 1) index = 8;
        else if (x == 2) index = 2;
        else index = 10;
      } 
      else if (y == 1) {
        if (x == 0) index = 12;
        else if (x == 1) index = 4;
        else if (x == 2) index = 14;
        else index = 6;
      } 
      else if (y == 2) {
        if (x == 0) index = 3;
        else if (x == 1) index = 11;
        else if (x == 2) index = 1;
        else index = 9;
      } 
      else {
        if (x == 0) index = 15;
        else if (x == 1) index = 7;
        else if (x == 2) index = 13;
        else index = 5;
      }
      
      // Map index range 0..15 to centered weight [-0.5..0.5]
      return (float(index) / 16.0) - 0.5;
    }

    void main() {
      // 1. Pixelation: Snap UV coords to target low resolution
      vec2 uv = floor(vUv * uResolution) / uResolution;
      vec3 col = texture2D(tDiffuse, uv).rgb;
      
      // 2. Dithering: Apply Bayer matrix dither noise
      vec2 pixelPos = uv * uResolution;
      float ditherStrength = 0.04; // subtle noise to blend gradients
      float dither = getDither(pixelPos) * ditherStrength;
      col += vec3(dither);
      
      // 3. Color Depth Reduction: Banding to 6-bits per channel (64 levels)
      float colorSteps = 64.0;
      col = floor(col * colorSteps) / colorSteps;
      
      gl_FragColor = vec4(col, 1.0);
    }
  `
};
