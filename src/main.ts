import { SpriteComponent } from './components/SpriteComponent';
import { PlayerMovementSystem } from './systems/PlayerMovementSystem';
import { InputSystem } from './systems/InputSystem';
import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

const application = new PIXI.Application();

document.getElementById("app")?.appendChild(application.view)

const world = new World();
world.registerComponent(SpriteComponent);
world.registerSystem(InputSystem);
world.registerSystem(PlayerMovementSystem);

const mario = world.createEntity()

const sprite = PIXI.Sprite.from('mario.png');
sprite.scale.set(0.5);
sprite.anchor.set(0.5);
sprite.x = application.screen.width / 2;
sprite.y = application.screen.height / 2;

application.stage.addChild(sprite);

mario.addComponent(SpriteComponent, { sprite: sprite });

application.ticker.add((delta: number) => {
    world.execute(delta, performance.now());
});

application.start();;