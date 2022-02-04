import { VelocitySystem } from './systems/VelocitySystem';
import { VelocityComponent } from './components/VelocityComponent';
import { EntityFactory } from './EntityFactory';
import { PlayerComponent } from './components/PlayerComponent';
import { SpriteComponent } from './components/SpriteComponent';
import { PlayerMovementSystem } from './systems/PlayerMovementSystem';
import { InputSystem } from './systems/InputSystem';
import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

const application = new PIXI.Application();

document.getElementById("app")?.appendChild(application.view);

const world = new World();
world.registerComponent(PlayerComponent);
world.registerComponent(SpriteComponent);
world.registerComponent(VelocityComponent);
world.registerSystem(InputSystem);
world.registerSystem(PlayerMovementSystem);
world.registerSystem(VelocitySystem);

const mario = world.createEntity()
const sprite = PIXI.Sprite.from('mario.png');
sprite.scale.set(0.5);
sprite.anchor.set(0.5);
sprite.x = application.screen.width / 2;
sprite.y = application.screen.height / 2;
application.stage.addChild(sprite);
mario.addComponent(SpriteComponent, { sprite: sprite });
mario.addComponent(PlayerComponent);

const level = PIXI.Sprite.from('level.png');
level.scale.set(2.5);
application.stage.addChildAt(level, 0);

const entityFactory = new EntityFactory(application, world);

Array.from({ length: 5 }).forEach(() => entityFactory.createFish());

application.ticker.add((delta: number) => {
    world.execute(delta, performance.now());
});

application.start();;