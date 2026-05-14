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
    }
  }
}
