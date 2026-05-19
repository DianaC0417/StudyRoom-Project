// game/scenes/StudyRoomScene.ts
import * as Phaser from 'phaser';
import { studyConfigService } from '../../config/dependencies';

interface WASDKeys {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
}

export class StudyRoomScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: WASDKeys;
  private clockZone!: Phaser.GameObjects.Zone;
  private showPomodoro: boolean = false;
  private musicZone!: Phaser.GameObjects.Zone;
  private showMusicPlayer: boolean = false;
  private currentDirection: string = 'down';
  private characterKey: string = 'gatito';
  private salaKey: string = 'salaestudio1';
  private nickname: string = 'Estudiante';
  private nameText!: Phaser.GameObjects.Text;

  private exitZone!: Phaser.GameObjects.Zone;
  private showExitPrompt: boolean = false;
  private exitVisualText!: Phaser.GameObjects.Text; // 👈 Texto nativo en Phaser para la salida

  constructor() {
    super({ key: 'StudyRoomScene' });
  }

  preload() {
    const config = studyConfigService.loadConfig();
    this.characterKey = config.personaje;
    this.salaKey = config.sala;
    this.nickname = config.nombre;

    this.load.image('study-room', `/assets/salas/${this.salaKey}.png`);
    this.load.atlas(
      this.characterKey,
      `/assets/personajes/${this.characterKey}.png`,
      `/assets/personajes/${this.characterKey}.json`
    );
  }

  create() {
    // Dentro de create()
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Fondo que cubra toda la escena sin distorsión
    const background = this.add.image(width / 2, height / 2, 'study-room');
    const scaleX = width / background.width;
    const scaleY = height / background.height;
    const scale = Math.max(scaleX, scaleY);
    background.setScale(scale).setScrollFactor(0);
    background.setDepth(-1);
    this.createAnimations();

    // Zona de salida (Borde inferior)
    this.exitZone = this.add.zone(width / 2, height - 50, width, 100);

    // 👈 CREACIÓN DEL BOTÓN DE SALIDA ESTILIZADO (Invisible al inicio)
    this.exitVisualText = this.add
      .text(
        width / 2,
        height - 110,
        '🚪 Presiona [ ESPACIO ] o Toca aquí para Salir',
        {
          fontFamily: 'monospace',
          fontSize: '18px',
          color: '#1a1a1a',
          backgroundColor: '#e4c766',
          stroke: '#222222',
          strokeThickness: 5,
          padding: { x: 14, y: 10 },
        }
      )
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(100)
      .setVisible(false)
      .setInteractive({ useHandCursor: true }); // Hace que reaccione al clic/toque

    // Evento al hacer clic en el botón de salida (para PC y Móvil)
    this.exitVisualText.on('pointerdown', () => {
      this.executeExit();
    });

    this.player = this.add.sprite(
      width / 2,
      height / 2,
      this.characterKey,
      `${this.characterKey} 0.aseprite`
    );
    this.player.setScale(5);
    this.player.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

    this.nameText = this.add
      .text(this.player.x, this.player.y - 60, this.nickname, {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#00000000',
        padding: { x: 6, y: 4 },
      })
      .setOrigin(0.5);

    this.clockZone = this.add.zone(width * 0.75, height * 0.15, 150, 150);
    this.musicZone = this.add.zone(width * 0.1, height - 40, 100, 100);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      }) as WASDKeys;

      // Si presiona espacio cerca de la puerta, sale
      this.input.keyboard.on('keydown-SPACE', () => {
        if (this.showExitPrompt) {
          this.executeExit();
        }
      });
    }

    this.player.anims.play('idle_frente');
  }

  update() {
    this.handleMovement();
    this.checkCollision();
    if (this.nameText && this.player) {
      this.nameText.setPosition(this.player.x, this.player.y - 60);
    }
  }

  private createAnimations() {
    const animsConfig = [
      { key: 'idle_frente', start: 0, end: 3, rate: 5 },
      { key: 'idle_espalda', start: 4, end: 6, rate: 5 },
      { key: 'idle_perfil', start: 8, end: 11, rate: 5 },
      { key: 'walk_down', start: 12, end: 14, rate: 8 },
      { key: 'walk_up', start: 16, end: 17, rate: 8 },
      { key: 'walk_side', start: 20, end: 23, rate: 8 },
    ];

    animsConfig.forEach((anim) => {
      if (!this.anims.exists(anim.key)) {
        this.anims.create({
          key: anim.key,
          frames: this.anims.generateFrameNames(this.characterKey, {
            prefix: `${this.characterKey} `,
            suffix: '.aseprite',
            start: anim.start,
            end: anim.end,
          }),
          frameRate: anim.rate,
          repeat: -1,
        });
      }
    });
  }

  private handleMovement() {
    const speed = 300;
    let vx = 0;
    let vy = 0;
    let moving = false;

    const pointer = this.input.activePointer;

    // 👈 DETECCIÓN PARA MÓVIL (Touch / Pointer)
    if (pointer.isDown && !this.showExitPrompt) {
      // Calculamos la distancia entre el toque y el jugador
      const angle = Phaser.Math.Angle.Between(
        this.player.x,
        this.player.y,
        pointer.x,
        pointer.y
      );
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        pointer.x,
        pointer.y
      );

      // Solo mover si el toque no está encima del propio jugador (evita temblores)
      if (distance > 20) {
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
        moving = true;

        // Determinar animación según el ángulo dominante
        const angleDeg = Phaser.Math.RadToDeg(angle);
        if (angleDeg >= -45 && angleDeg < 45) {
          this.currentDirection = 'right';
          this.player.setFlipX(false);
        } else if (angleDeg >= 45 && angleDeg < 135) {
          this.currentDirection = 'down';
        } else if (angleDeg >= -135 && angleDeg < -45) {
          this.currentDirection = 'up';
        } else {
          this.currentDirection = 'left';
          this.player.setFlipX(true);
        }
      }
    }
    // 👈 DETECCIÓN PARA PC (Teclado)
    else if (this.cursors && this.wasd) {
      if (this.cursors.left.isDown || this.wasd.left.isDown) {
        vx = -speed;
        this.currentDirection = 'left';
        this.player.setFlipX(true);
        moving = true;
      } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
        vx = speed;
        this.currentDirection = 'right';
        this.player.setFlipX(false);
        moving = true;
      }

      if (this.cursors.up.isDown || this.wasd.up.isDown) {
        vy = -speed;
        this.currentDirection = 'up';
        moving = true;
      } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
        vy = speed;
        this.currentDirection = 'down';
        moving = true;
      }
    }

    const dt = this.game.loop.delta / 1000;
    this.player.x += vx * dt;
    this.player.y += vy * dt;

    if (moving) {
      const animKey =
        this.currentDirection === 'up'
          ? 'walk_up'
          : this.currentDirection === 'down'
            ? 'walk_down'
            : 'walk_side';
      this.player.anims.play(animKey, true);
    } else {
      const idleKey =
        this.currentDirection === 'up'
          ? 'idle_espalda'
          : this.currentDirection === 'down'
            ? 'idle_frente'
            : 'idle_perfil';
      this.player.anims.play(idleKey, true);
    }

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.player.x = Phaser.Math.Clamp(this.player.x, 40, width - 40);
    this.player.y = Phaser.Math.Clamp(this.player.y, 40, height - 40);
  }

  private checkCollision() {
    // Colisión Pomodoro
    const distance = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.clockZone.x,
      this.clockZone.y
    );

    if (distance < 80) {
      if (!this.showPomodoro) {
        this.showPomodoro = true;
        window.dispatchEvent(
          new CustomEvent('openPomodoro', {
            detail: { message: '¡Es hora de concentrarse!' },
          })
        );
      }
    } else {
      this.showPomodoro = false;
    }

    // Colisión Zona de Salida
    const distExit = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.exitZone.x,
      this.exitZone.y
    );

    if (distExit < 70) {
      if (!this.showExitPrompt) {
        this.showExitPrompt = true;
        this.exitVisualText.setVisible(true); // 👈 Muestra el nuevo cartel en Phaser
        window.dispatchEvent(
          new CustomEvent('nearExit', { detail: { show: true } })
        );
      }
    } else {
      if (this.showExitPrompt) {
        this.showExitPrompt = false;
        this.exitVisualText.setVisible(false); // 👈 Oculta el cartel en Phaser
        window.dispatchEvent(
          new CustomEvent('nearExit', { detail: { show: false } })
        );
      }
    }

    const distMusic = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.musicZone.x,
      this.musicZone.y
    );

    if (distMusic < 100) {
      if (!this.showMusicPlayer) {
        this.showMusicPlayer = true;
        window.dispatchEvent(new CustomEvent('openMusicPlayer'));
      }
    } else {
      this.showMusicPlayer = false;
    }
  }

  // Método centralizado para cambiar de escena o salir
  private executeExit() {
    console.log('Saliendo de la sala...');
    // Aquí puedes añadir: this.scene.start('SiguienteEscenaKey');
    window.dispatchEvent(new CustomEvent('exitRoom'));
  }
}
