import { LevelComponent } from './components/LevelComponent';
import { Howl } from 'howler';
import { BlinkSystem } from './systems/BlinkSystem';
import { BlinkComponent } from './components/BlinkComponent';
import { GameStatusComponent } from './components/GameStatusComponent';
import { ScoreSystem } from './systems/ScoreSystem';
import { TextComponent } from './components/TextComponent';
import { EnemyComponent } from './components/EnemyComponent';
import { CleanupSystem } from './systems/CleanupSystem';
import { VelocitySystem } from './systems/VelocitySystem';
import { VelocityComponent } from './components/VelocityComponent';
import { EntityFactory } from './EntityFactory';
import { PlayerComponent } from './components/PlayerComponent';
import { SpriteComponent } from './components/SpriteComponent';
import { PlayerMovementSystem } from './systems/PlayerMovementSystem';
import { InputSystem } from './systems/InputSystem';
import { World } from 'ecsy';
import * as PIXI from 'pixi.js';
import { RespawnSystem } from './systems/RespawnSystem';
import { DeathSystem } from './systems/DeathSystem';
import { TimerComponent } from './components/TimerComponent';
import { Audio } from './Audio';

const application = new PIXI.Application();

document.getElementById('app')?.appendChild(application.view);

const world = new World();

world.registerComponent(PlayerComponent);
world.registerComponent(SpriteComponent);
world.registerComponent(VelocityComponent);
world.registerComponent(EnemyComponent);
world.registerComponent(TextComponent);
world.registerComponent(TimerComponent);
world.registerComponent(GameStatusComponent);
world.registerComponent(BlinkComponent);
world.registerComponent(LevelComponent);

const entityFactory = new EntityFactory(application, world);

world.registerSystem(InputSystem);
world.registerSystem(PlayerMovementSystem, { application });
world.registerSystem(VelocitySystem);
world.registerSystem(CleanupSystem, { application });
world.registerSystem(RespawnSystem, { application, entityFactory });
world.registerSystem(DeathSystem);
world.registerSystem(ScoreSystem);
world.registerSystem(BlinkSystem);

entityFactory.createLevel();
entityFactory.createTimer();
const gameStatus = entityFactory.createGameStatus();
const mario = entityFactory.createMario();

Audio.MUSIC.play();

let pause = false;
let gameTime = 0;
let lastUpdateTime = performance.now();
application.ticker.add((delta: number) => {
    if(pause) {
        return;
    }

    gameTime += performance.now() - lastUpdateTime;
    world.execute(delta, gameTime);

    lastUpdateTime = performance.now();
});

application.start();

const gameStatusText = gameStatus.getComponent(TextComponent)!.text;

window.onfocus = () => {
    if (!mario.alive) {
        return;
    }

    lastUpdateTime = performance.now();
    gameStatusText.text = "";
    world.play();
    pause = false;

    if (!Audio.MUSIC.playing()) {
        Audio.MUSIC.play();
    }
};
window.onblur = () => {
    pause = true;
    gameStatusText.text = "PAUSE";
    Audio.MUSIC.pause();
	world.stop();
};
