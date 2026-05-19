// game/scenes/StudyRoomScene.ts
import * as Phaser from 'phaser';
import { studyConfigService } from '../../config/dependencies'; // 👈 CAMBIO

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
  private todoZone!: Phaser.GameObjects.Zone;
  private showTodoList: boolean = false;
  private currentDirection: string = 'down';
  private characterKey: string = 'gatito';
  private salaKey: string = 'salaestudio1';
  private nickname: string = 'Estudiante';
  private nameText!: Phaser.GameObjects.Text;

  private exitZone!: Phaser.GameObjects.Zone; // +nueva zona pa salir
  private showExitPrompt: boolean = false; // +pa salir

  constructor() {
    super({ key: 'StudyRoomScene' });
  }

  preload() {
    // USAMOS EL SERVICIO en lugar de localStorage directo
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

    this.exitZone = this.add.zone(width / 2, height - 80, width, 100); //+ zona en la parte inferior

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
    this.todoZone = this.add.zone(width * 0.25, height * 0.5, 150, 150);

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
    if (!this.cursors || !this.wasd) return;

    const speed = 300;
    let vx = 0;
    let vy = 0;
    let moving = false;

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

    const distTodo = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.todoZone.x,
      this.todoZone.y
    );

    if (distTodo < 80) { // Distancia de activación
      if (!this.showTodoList) {
        this.showTodoList = true;
        window.dispatchEvent(new CustomEvent('openTodoList'));
      }
    } else {
      this.showTodoList = false;
    }
  }
}
