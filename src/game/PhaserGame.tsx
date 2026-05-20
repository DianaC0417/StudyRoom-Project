import { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';
import { gameConfig } from './config';
import { StudyRoomScene } from './scenes/StudyRoomScene';

export const PhaserGame = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      const configWithScene: Phaser.Types.Core.GameConfig = {
        ...gameConfig,
        parent: 'game-container',
        scene: [StudyRoomScene],
      };

      gameRef.current = new Phaser.Game(configWithScene);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="game-container" className="game-container" />;
};