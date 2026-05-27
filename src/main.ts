import './style.css';
import { GameEngine } from './core/GameEngine';
import { SoundManager } from './ui/SoundManager';
import { GameUI } from './ui/GameUI';
import { RenderManager } from './render/RenderManager';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector<HTMLDivElement>('#app')!;
  
  // 1. Initialize core logic and audio systems
  const engine = new GameEngine();
  const sound = new SoundManager();
  
  // 2. Initialize DOM UI manager (this builds the overlays)
  const ui = new GameUI(engine, sound, appContainer);
  
  // 3. Initialize WebGL 3D renderer inside the canvas container
  const canvasContainer = document.querySelector<HTMLDivElement>('#canvas-container')!;
  const renderer = new RenderManager(engine, canvasContainer, sound);

  // Connect renderer to UI for automated camera sequences and animations
  ui.setRenderer(renderer);

  // 4. Wire 3D card clicks to card execution logic
  renderer.onCardClicked = (cardId: string) => {
    ui.playCard(cardId);
  };

  renderer.onPlayedCardClicked = (cardId: string) => {
    ui.removePlayedCard(cardId);
  };

  renderer.onForgeCardClicked = (cardId: string) => {
    const success = engine.purchaseForgeCard(cardId);
    if (success) {
      sound.playHammerStrike();
      renderer.wheelVis.rebuildWheel(false, engine.runState.playerWheel);
      ui.render();
    } else {
      sound.playRouletteClick(0.5);
    }
  };

  renderer.onForgeCardHover = (cardId: string | null) => {
    ui.setHoveredForgeCard(cardId);
  };

  ui.onViewChanged = (viewId: number) => {
    renderer.setView(viewId);
  };

  renderer.onBetPlaced = () => {
    ui.render();
  };

  renderer.onBellClicked = () => {
    ui.bellTrigger();
  };
});
