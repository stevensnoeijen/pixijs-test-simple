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
import { ScoreComponent } from './components/ScoreComponent';
import { Audio } from './Audio';

const application = new PIXI.Application();

document.getElementById('app')?.appendChild(application.view);

const world = new World();

world.registerComponent(PlayerComponent);
world.registerComponent(SpriteComponent);
world.registerComponent(VelocityComponent);
world.registerComponent(EnemyComponent);
world.registerComponent(TextComponent);
world.registerComponent(ScoreComponent);
world.registerComponent(GameStatusComponent);
world.registerComponent(BlinkComponent);

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
entityFactory.createMario();

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
    lastUpdateTime = performance.now();
    gameStatusText.text = "";
    world.play();
    pause = false;
    Audio.MUSIC.play();
};
window.onblur = () => {
    pause = true;
    gameStatusText.text = "PAUSE";
    Audio.MUSIC.pause();
	world.stop();
};