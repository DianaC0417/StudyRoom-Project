export const gameConfig = {
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: 0x2d2d4a,
  type: 0,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true, // Pon true para ver hitboxes
    },
  },
};
