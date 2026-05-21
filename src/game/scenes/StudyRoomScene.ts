<<<<<<< HEAD
import * as Phaser from 'phaser';
import { studyConfigService } from '../../config/dependencies';
=======
// game/scenes/StudyRoomScene.ts
import * as Phaser from 'phaser';
import { studyConfigService } from '../../config/dependencies'; // 👈 CAMBIO
>>>>>>> origin/main

interface WASDKeys {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
}

<<<<<<< HEAD
interface MobileMoveEvent extends CustomEvent {
  detail: {
    direction: 'up' | 'down' | 'left' | 'right';
    pressed: boolean;
  };
}

=======
>>>>>>> origin/main
export class StudyRoomScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: WASDKeys;
  private clockZone!: Phaser.GameObjects.Zone;
  private showPomodoro: boolean = false;
<<<<<<< HEAD
  private musicZone!: Phaser.GameObjects.Zone;
  private showMusicPlayer: boolean = false;
  private todoZone!: Phaser.GameObjects.Zone;
  private showTodoList: boolean = false;
=======
>>>>>>> origin/main
  private currentDirection: string = 'down';
  private characterKey: string = 'gatito';
  private salaKey: string = 'salaestudio1';
  private nickname: string = 'Estudiante';
  private nameText!: Phaser.GameObjects.Text;

<<<<<<< HEAD
  private exitZone!: Phaser.GameObjects.Zone;
  private showExitPrompt: boolean = false;
  private exitVisualText!: Phaser.GameObjects.Text;

  // Controles móviles táctiles
  private touchLeft: boolean = false;
  private touchRight: boolean = false;
  private touchUp: boolean = false;
  private touchDown: boolean = false;

  private boundHandleMobileMove = (e: Event) =>
    this.handleMobileMove(e as MobileMoveEvent);
=======
  private exitZone!: Phaser.GameObjects.Zone; // +nueva zona pa salir
  private showExitPrompt: boolean = false; // +pa salir
>>>>>>> origin/main

  constructor() {
    super({ key: 'StudyRoomScene' });
  }

  preload() {
<<<<<<< HEAD
    // 🔐 Tu customización recuperada del localStorage sigue intacta aquí
=======
    // USAMOS EL SERVICIO en lugar de localStorage directo
>>>>>>> origin/main
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
<<<<<<< HEAD

  create() {
    // 🟢 Dimensiones fijas virtuales para posicionar todo de manera perfecta y responsiva
    const width = 1280;
    const height = 720;

    // Colocamos el fondo centrado en la resolución base del juego
    const background = this.add.image(width / 2, height / 2, 'study-room');
    background.setDisplaySize(width, height);
    background.setScrollFactor(0);
    background.setDepth(-1);

    this.createAnimations();

    // 🎯 Zonas interactivas estables sobre el pixel-art
    this.exitZone = this.add.zone(width / 2, height - 50, width, 100);
    this.clockZone = this.add.zone(960, 110, 150, 150);       // Reloj / Pomodoro
    this.musicZone = this.add.zone(130, 680, 100, 100);       // Tocadiscos izquierdo
    this.todoZone = this.add.zone(320, 360, 150, 150);        // Lista de tareas / Escritorio

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
      .setInteractive({ useHandCursor: true });

    this.exitVisualText.on('pointerdown', () => {
      this.executeExit();
    });

    // Crear el sprite del personaje en el centro
=======
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

    this.exitZone = this.add.zone(width / 2, height - 80, width, 100); //+ zona en la parte inferior

>>>>>>> origin/main
    this.player = this.add.sprite(
      width / 2,
      height / 2,
      this.characterKey,
      `${this.characterKey} 0.aseprite`
    );
    this.player.setScale(5);
    this.player.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

<<<<<<< HEAD
    // Texto del Nombre de usuario sobre el personaje
=======
>>>>>>> origin/main
    this.nameText = this.add
      .text(this.player.x, this.player.y - 60, this.nickname, {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#00000000',
        padding: { x: 6, y: 4 },
      })
      .setOrigin(0.5);

<<<<<<< HEAD
=======
    this.clockZone = this.add.zone(width * 0.75, height * 0.15, 150, 150);

>>>>>>> origin/main
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      }) as WASDKeys;
<<<<<<< HEAD

      this.input.keyboard.on('keydown-SPACE', () => {
        if (this.showExitPrompt) {
          this.executeExit();
        }
      });
    }

    window.addEventListener('mobile-move', this.boundHandleMobileMove);
    this.player.anims.play('idle_frente');
  }

  private handleMobileMove(e: MobileMoveEvent) {
    const { direction, pressed } = e.detail;
    switch (direction) {
      case 'up': this.touchUp = pressed; break;
      case 'down': this.touchDown = pressed; break;
      case 'left': this.touchLeft = pressed; break;
      case 'right': this.touchRight = pressed; break;
    }
  }

=======
    }

    this.player.anims.play('idle_frente');
  }

>>>>>>> origin/main
  update() {
    this.handleMovement();
    this.checkCollision();
    if (this.nameText && this.player) {
      this.nameText.setPosition(this.player.x, this.player.y - 60);
    }
  }

<<<<<<< HEAD
  shutdown() {
    window.removeEventListener('mobile-move', this.boundHandleMobileMove);
  }

=======
>>>>>>> origin/main
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
<<<<<<< HEAD
    let vx = 0, vy = 0;
    let moving = false;

    let leftPressed = false, rightPressed = false, upPressed = false, downPressed = false;
    if (this.cursors && this.wasd) {
      leftPressed = this.cursors.left.isDown || this.wasd.left.isDown;
      rightPressed = this.cursors.right.isDown || this.wasd.right.isDown;
      upPressed = this.cursors.up.isDown || this.wasd.up.isDown;
      downPressed = this.cursors.down.isDown || this.wasd.down.isDown;
    }

    const finalLeft = leftPressed || this.touchLeft;
    const finalRight = rightPressed || this.touchRight;
    const finalUp = upPressed || this.touchUp;
    const finalDown = downPressed || this.touchDown;

    const speed = 300;
    if (finalLeft) {
=======
    if (!this.cursors || !this.wasd) return;

    const speed = 300;
    let vx = 0;
    let vy = 0;
    let moving = false;

    if (this.cursors.left.isDown || this.wasd.left.isDown) {
>>>>>>> origin/main
      vx = -speed;
      this.currentDirection = 'left';
      this.player.setFlipX(true);
      moving = true;
<<<<<<< HEAD
    } else if (finalRight) {
=======
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
>>>>>>> origin/main
      vx = speed;
      this.currentDirection = 'right';
      this.player.setFlipX(false);
      moving = true;
    }

<<<<<<< HEAD
    if (finalUp) {
      vy = -speed;
      this.currentDirection = 'up';
      moving = true;
    } else if (finalDown) {
=======
    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      vy = -speed;
      this.currentDirection = 'up';
      moving = true;
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
>>>>>>> origin/main
      vy = speed;
      this.currentDirection = 'down';
      moving = true;
    }

    const dt = this.game.loop.delta / 1000;
    this.player.x += vx * dt;
    this.player.y += vy * dt;

    if (moving) {
<<<<<<< HEAD
      const animKey = this.currentDirection === 'up' ? 'walk_up' : this.currentDirection === 'down' ? 'walk_down' : 'walk_side';
      this.player.anims.play(animKey, true);
    } else {
      const idleKey = this.currentDirection === 'up' ? 'idle_espalda' : this.currentDirection === 'down' ? 'idle_frente' : 'idle_perfil';
      this.player.anims.play(idleKey, true);
    }

    // El personaje se frena de forma limpia en los bordes de la sala virtual de 1280x720
    this.player.x = Phaser.Math.Clamp(this.player.x, 40, 1280 - 40);
    this.player.y = Phaser.Math.Clamp(this.player.y, 40, 720 - 40);
  }

  private checkCollision() {
    // 1. Reloj (Pomodoro)
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.clockZone.x, this.clockZone.y);
    if (distance < 80) {
      if (!this.showPomodoro) {
        this.showPomodoro = true;
        window.dispatchEvent(new CustomEvent('openPomodoro', { detail: { message: '¡Es hora de concentrarse!' } }));
=======
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
>>>>>>> origin/main
      }
    } else {
      this.showPomodoro = false;
    }

<<<<<<< HEAD
    // 2. Salida
    const distExit = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.exitZone.x, this.exitZone.y);
    if (distExit < 70) {
      if (!this.showExitPrompt) {
        this.showExitPrompt = true;
        this.exitVisualText.setVisible(true);
        window.dispatchEvent(new CustomEvent('nearExit', { detail: { show: true } }));
=======
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
>>>>>>> origin/main
      }
    } else {
      if (this.showExitPrompt) {
        this.showExitPrompt = false;
<<<<<<< HEAD
        this.exitVisualText.setVisible(false);
        window.dispatchEvent(new CustomEvent('nearExit', { detail: { show: false } }));
      }
    }

    // 3. Música
    const distMusic = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.musicZone.x, this.musicZone.y);
    if (distMusic < 100) {
      if (!this.showMusicPlayer) {
        this.showMusicPlayer = true;
        window.dispatchEvent(new CustomEvent('openMusicPlayer'));
      }
    } else {
      this.showMusicPlayer = false;
    }

    // 4. Lista de Tareas
    const distTodo = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.todoZone.x, this.todoZone.y);
    if (distTodo < 80) {
      if (!this.showTodoList) {
        this.showTodoList = true;
        window.dispatchEvent(new CustomEvent('openTodoList'));
      }
    } else {
      this.showTodoList = false;
    }
  }

  private executeExit() {
    window.dispatchEvent(new CustomEvent('exitRoom'));
  }
}
=======
        window.dispatchEvent(
          new CustomEvent('nearExit', { detail: { show: false } })
        );
      }
    }
  }
}
>>>>>>> origin/main
