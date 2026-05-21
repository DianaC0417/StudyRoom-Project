<<<<<<< HEAD
=======

>>>>>>> origin/main
import * as Phaser from 'phaser';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
<<<<<<< HEAD
  width: 1280, // Base virtual fija de ancho
  height: 720, // Base virtual fija de alto
  scale: {
    mode: Phaser.Scale.SMOOTH, // 🚀 Adapta el lienzo de forma inteligente sin recortar los bordes del juego
    autoCenter: Phaser.Scale.CENTER_BOTH, // Mantiene el juego centrado en cualquier pantalla
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
};
=======
  width: 1024,
  height: 768,
  backgroundColor: '#2d2d2d',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1024,
    height: 768,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};
>>>>>>> origin/main
