// src/game/scenes/StudyRoomScene.ts
import * as Phaser from 'phaser';

// Definimos un tipo para nuestras teclas personalizadas
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
  private currentDirection: string = 'down';
  //aca cambiar a ranita y demas
  private characterKey: string = 'ranita';
  private salaKey: string = 'salaestudio1';
  private nickname: string = 'Estudiante';
  private nameText!: Phaser.GameObjects.Text;
  constructor() {
    super({ key: 'StudyRoomScene' });
  }

  // preload() {
  //   // 1. LEER LOS DATOS DE LA CUSTOMIZACIÓN
  //   const savedConfig = localStorage.getItem('user_study_config');
  //   if (savedConfig) {
  //     const config = JSON.parse(savedConfig);
  //     this.characterKey = config.personaje; // 'gatito', 'ranita' o 'perrito'
  //     this.salaKey = config.sala; // 'salaestudio1', 'salaestudio2', etc.
  //   }
  //   // 2. CARGAR DINÁMICAMENTE BASADO EN LA ELECCIÓN
  //   this.load.image('study-room', `/assets/salas/${this.salaKey}.png`);
  //   this.load.atlas(
  //     this.characterKey,
  //     `/assets/personajes/${this.characterKey}.png`,
  //     `/assets/personajes/${this.characterKey}.json`
  //   );
  //   this.nickname = config.nombre || 'Invitado';
  // }
  preload() {
    // 1. RECUPERAMOS LA CONFIGURACIÓN (Igual que en tu React)
    const savedConfig = localStorage.getItem('user_study_config');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      this.characterKey = config.personaje;
      this.salaKey = config.sala;

      this.nickname = config.nombre || 'Invitado';
    } else {
      console.warn('No se encontró configuración de customización');
    }

    // 2. CARGAR DINÁMICAMENTE
    this.load.image('study-room', `/assets/salas/${this.salaKey}.png`);
    this.load.atlas(
      this.characterKey,
      `/assets/personajes/${this.characterKey}.png`,
      `/assets/personajes/${this.characterKey}.json`
    );
  }
  // preload() {
  //   this.load.image('study-room', '/assets/salas/salaestudio1.png');
  //   this.load.atlas(
  //     this.characterKey,
  //     `/assets/personajes/${this.characterKey}.png`,
  //     `/assets/personajes/${this.characterKey}.json`
  //   );
  // }

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

    this.player = this.add.sprite(
      width / 2,
      height / 2,
      this.characterKey,
      `${this.characterKey} 0.aseprite`
    );
    this.player.setScale(5);
    this.player.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    // Crear el texto del nombre
    this.nameText = this.add
      .text(this.player.x, this.player.y - 60, this.nickname, {
        fontFamily: 'monospace', // O tu fuente pixelada si tienes una
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#00000000', // Fondo negro semi-transparente
        padding: { x: 6, y: 4 },
      })
      .setOrigin(0.5); // Para que quede centrado

    this.clockZone = this.add.zone(width * 0.75, height * 0.15, 150, 150);

    // Inicializar controles
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      }) as WASDKeys;
    }

    this.player.anims.play('idle_frente');
  }

  // --- ¡ESTO ES LO QUE FALTABA! ---
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
      // Evitar duplicados si la escena se reinicia
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
    // Seguridad: si no hay controles, no hacer nada
    if (!this.cursors || !this.wasd) return;

    const speed = 300; // Un poco más rápido para pantallas grandes
    let vx = 0;
    let vy = 0;
    let moving = false;

    // Movimiento Horizontal
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

    // Movimiento Vertical
    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      vy = -speed;
      this.currentDirection = 'up';
      moving = true;
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
      vy = speed;
      this.currentDirection = 'down';
      moving = true;
    }

    // Aplicar el movimiento real
    const dt = this.game.loop.delta / 1000;
    this.player.x += vx * dt;
    this.player.y += vy * dt;

    // Animaciones
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

    // Límites de pantalla
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
  }
}
