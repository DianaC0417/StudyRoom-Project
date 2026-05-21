// game/config.ts
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: 0x2d2d4a,
  scale: {
    mode: Phaser.Scale.FIT, // Escala el juego para que encaje en el contenedor
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centra el canvas
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
};
