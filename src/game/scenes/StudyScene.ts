<<<<<<< HEAD
// game/scenes/StudyRoomScene.ts
import * as Phaser from 'phaser';
import { studyConfigService } from '../../config/dependencies';

interface WASDKeys {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
}

interface MobileMoveEvent extends CustomEvent {
  detail: {
    direction: 'up' | 'down' | 'left' | 'right';
    pressed: boolean;
  };
}

export class StudyRoomScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: WASDKeys;
  private clockZone!: Phaser.GameObjects.Zone;
  private showPomodoro: boolean = false;
  private currentDirection: string = 'down';
  private characterKey: string = 'gatito';
  private salaKey: string = 'salaestudio1';
  private nickname: string = 'Estudiante';
  private nameText!: Phaser.GameObjects.Text;
  private exitZone!: Phaser.GameObjects.Zone;
  private showExitPrompt: boolean = false;

  // Controles táctiles
  private touchLeft: boolean = false;
  private touchRight: boolean = false;
  private touchUp: boolean = false;
  private touchDown: boolean = false;

  // Enlazamos el manejador para poder removerlo después
  private boundHandleMobileMove = (e: Event) =>
    this.handleMobileMove(e as MobileMoveEvent);

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
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const background = this.add.image(width / 2, height / 2, 'study-room');
    const scale = Math.max(
      width / background.width,
      height / background.height
    );
    background.setScale(scale).setScrollFactor(0);

    this.createAnimations();

    this.exitZone = this.add.zone(width / 2, height - 80, width, 100);

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

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      }) as WASDKeys;
    }

    // Agregar event listener para los botones táctiles
    window.addEventListener('mobile-move', this.boundHandleMobileMove);

    this.player.anims.play('idle_frente');
  }

  // Manejador de eventos táctiles
  private handleMobileMove(e: MobileMoveEvent) {
    const { direction, pressed } = e.detail;
    switch (direction) {
      case 'up':
        this.touchUp = pressed;
        break;
      case 'down':
        this.touchDown = pressed;
        break;
      case 'left':
        this.touchLeft = pressed;
        break;
      case 'right':
        this.touchRight = pressed;
        break;
    }
  }

  update() {
    this.handleMovement();
    this.checkCollision();
    if (this.nameText && this.player) {
      this.nameText.setPosition(this.player.x, this.player.y - 60);
    }
  }

  shutdown() {
    window.removeEventListener('mobile-move', this.boundHandleMobileMove);
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
    let vx = 0,
      vy = 0;
    let moving = false;

    // Leer teclado
    let leftPressed = false,
      rightPressed = false,
      upPressed = false,
      downPressed = false;
    if (this.cursors && this.wasd) {
      leftPressed = this.cursors.left.isDown || this.wasd.left.isDown;
      rightPressed = this.cursors.right.isDown || this.wasd.right.isDown;
      upPressed = this.cursors.up.isDown || this.wasd.up.isDown;
      downPressed = this.cursors.down.isDown || this.wasd.down.isDown;
    }

    // Combinar con táctiles
    const finalLeft = leftPressed || this.touchLeft;
    const finalRight = rightPressed || this.touchRight;
    const finalUp = upPressed || this.touchUp;
    const finalDown = downPressed || this.touchDown;

    const speed = 300;
    if (finalLeft) {
      vx = -speed;
      this.currentDirection = 'left';
      this.player.setFlipX(true);
      moving = true;
    } else if (finalRight) {
      vx = speed;
      this.currentDirection = 'right';
      this.player.setFlipX(false);
      moving = true;
    }

    if (finalUp) {
      vy = -speed;
      this.currentDirection = 'up';
      moving = true;
    } else if (finalDown) {
      vy = speed;
      this.currentDirection = 'down';
      moving = true;
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

    const distExit = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.exitZone.x,
      this.exitZone.y
    );

    if (distExit < 60) {
      if (!this.showExitPrompt) {
        this.showExitPrompt = true;
        window.dispatchEvent(
          new CustomEvent('nearExit', { detail: { show: true } })
        );
      }
    } else {
      if (this.showExitPrompt) {
        this.showExitPrompt = false;
        window.dispatchEvent(
          new CustomEvent('nearExit', { detail: { show: false } })
        );
      }
=======
import { Scene } from 'phaser';
import gatitoSprite from '../assets/gatito.png';

export class StudyScene extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private currentDirection: string = 'down';
  private debugText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'StudyScene' });
  }

  preload() {
    this.load.spritesheet('gatito', gatitoSprite, {
      frameWidth: 32,
      frameHeight: 32,
    });
    console.log('🐱 Gatito cargado');
  }

  create() {
    console.log('🎮 Creando sala de estudio...');

    // Fondo
    this.add.rectangle(400, 300, 800, 600, 0x2d2d4a);

    // Piso cuadriculado
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 15; j++) {
        this.add
          .rectangle(i * 40 + 20, j * 40 + 20, 38, 38, 0x3d3d5a)
          .setStrokeStyle(1, 0x4d4d6a);
      }
    }

    // Escritorio
    this.add.rectangle(400, 450, 200, 80, 0x8b4513);
    this.add.rectangle(400, 445, 180, 10, 0xa0522d);
    this.add.rectangle(400, 500, 60, 40, 0x654321);
    this.add.rectangle(400, 430, 60, 40, 0x111111);
    this.add.rectangle(400, 420, 50, 30, 0x2a2a3e);
    this.add.rectangle(550, 470, 20, 30, 0x2d6a4f);
    this.add.circle(555, 465, 12, 0x40916c);

    // Ventana
    this.add.rectangle(100, 100, 80, 80, 0x1a3a5a);
    this.add.rectangle(100, 100, 70, 70, 0x2a5a8a);
    this.add.line(100, 60, 100, 140, 0xffffff);
    this.add.line(60, 100, 140, 100, 0xffffff);

    // GATITO
    this.player = this.physics.add.sprite(400, 300, 'gatito');
    this.player.setCollideWorldBounds(true);
    this.player.setSize(20, 20);
    this.player.setOffset(6, 8);
    this.player.setScale(2.5);

    // Texto debug
    this.debugText = this.add.text(10, 10, 'Presiona WASD o flechas', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 5, y: 5 },
    });

    // Cámara
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.startFollow(this.player);

    // Animaciones
    this.createAnimations();
    this.player.play('idle_down');

    // ========== TECLADO - VERSIÓN CORREGIDA ==========
    if (!this.input.keyboard) {
      console.error('❌ Teclado no disponible');
      return;
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    // Usar las constantes numéricas directamente
    const { W, S, A, D } = Phaser.Input.Keyboard.KeyCodes;
    this.wasd = {
      up: this.input.keyboard.addKey(W),
      down: this.input.keyboard.addKey(S),
      left: this.input.keyboard.addKey(A),
      right: this.input.keyboard.addKey(D),
    };

    console.log('✅ Sala creada, controles listos');
  }

  createAnimations() {
    // IDLE - Frente (0-3)
    this.anims.create({
      key: 'idle_down',
      frames: this.anims.generateFrameNumbers('gatito', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1,
    });

    // IDLE - Espalda (4-7)
    this.anims.create({
      key: 'idle_up',
      frames: this.anims.generateFrameNumbers('gatito', { start: 4, end: 7 }),
      frameRate: 6,
      repeat: -1,
    });

    // IDLE - Perfil (8-11)
    this.anims.create({
      key: 'idle_side',
      frames: this.anims.generateFrameNumbers('gatito', { start: 8, end: 11 }),
      frameRate: 6,
      repeat: -1,
    });

    // CAMINAR - Abajo (12-15)
    this.anims.create({
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers('gatito', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    // CAMINAR - Arriba (16-19)
    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers('gatito', { start: 16, end: 19 }),
      frameRate: 10,
      repeat: -1,
    });

    console.log('✅ 5 animaciones creadas');
  }

  update() {
    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;
    let isMoving = false;

    if (!this.cursors || !this.wasd) return;

    const left = this.cursors.left?.isDown || this.wasd.left.isDown;
    const right = this.cursors.right?.isDown || this.wasd.right.isDown;
    const up = this.cursors.up?.isDown || this.wasd.up.isDown;
    const down = this.cursors.down?.isDown || this.wasd.down.isDown;

    // Movimiento horizontal
    if (left) {
      velocityX = -speed;
      isMoving = true;
      this.currentDirection = 'left';
    } else if (right) {
      velocityX = speed;
      isMoving = true;
      this.currentDirection = 'right';
    }

    // Movimiento vertical
    if (up) {
      velocityY = -speed;
      isMoving = true;
      this.currentDirection = 'up';
    } else if (down) {
      velocityY = speed;
      isMoving = true;
      this.currentDirection = 'down';
    }

    // Normalizar diagonal
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= 0.707;
      velocityY *= 0.707;
    }

    // Aplicar velocidad
    this.player.setVelocity(velocityX, velocityY);

    // Animaciones
    if (isMoving) {
      if (this.currentDirection === 'down') {
        this.player.anims.play('walk_down', true);
      } else if (this.currentDirection === 'up') {
        this.player.anims.play('walk_up', true);
      } else {
        // Para lateral, usamos idle_side pero con movimiento
        this.player.anims.play('idle_side', true);
        this.player.setFlipX(this.currentDirection === 'left');
      }
      this.debugText.setText(
        `🎮 Moviendo: ${this.currentDirection} | ${Math.round(this.player.x)},${Math.round(this.player.y)}`
      );
    } else {
      if (this.currentDirection === 'down') {
        this.player.anims.play('idle_down', true);
      } else if (this.currentDirection === 'up') {
        this.player.anims.play('idle_up', true);
      } else {
        this.player.anims.play('idle_side', true);
        this.player.setFlipX(this.currentDirection === 'left');
      }
      this.debugText.setText(
        `😴 Quieto | ${Math.round(this.player.x)},${Math.round(this.player.y)}`
      );
>>>>>>> origin/main
    }
  }
}
