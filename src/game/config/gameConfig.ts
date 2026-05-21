<<<<<<< HEAD
// game/config.ts
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
=======
export const gameConfig = {
>>>>>>> origin/main
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: 0x2d2d4a,
<<<<<<< HEAD
  scale: {
    mode: Phaser.Scale.FIT, // Escala el juego para que encaje en el contenedor
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centra el canvas
  },
=======
  type: 0,
>>>>>>> origin/main
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
<<<<<<< HEAD
      debug: false,
=======
      debug: true, // Pon true para ver hitboxes
>>>>>>> origin/main
    },
  },
};
