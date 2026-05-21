<<<<<<< HEAD
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
=======
import React, { useEffect, useRef } from 'react';
import { Game } from 'phaser';
import { gameConfig } from './config/gameConfig';
import { StudyScene } from './scenes/StudyScene';

export const PhaserGame: React.FC = () => {
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      console.log('🎮 Iniciando Phaser Game...');

      gameRef.current = new Game({
        ...gameConfig,
        scene: StudyScene,
      });

      // 🔥 EXPONER EL JUEGO GLOBALMENTE PARA DEPURACIÓN
      // (window as any).game = gameRef.current;

      console.log('✅ Phaser Game creado y expuesto como window.game');
>>>>>>> origin/main
    }

    return () => {
      if (gameRef.current) {
<<<<<<< HEAD
        gameRef.current.destroy(true);
        gameRef.current = null;
=======
        console.log('🛑 Destruyendo Phaser Game');
        gameRef.current.destroy(true);
        gameRef.current = null;
        // (window as any).game = null;
>>>>>>> origin/main
      }
    };
  }, []);

<<<<<<< HEAD
  return <div id="game-container" className="game-container" />;
=======
  return (
    <div
      id="game-container"
      style={{
        width: '800px',
        height: '600px',
        margin: '0 auto',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        border: '3px solid #e94560',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    />
  );
>>>>>>> origin/main
};
