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

const application = new PIXI.Application();

document.getElementById('app')?.appendChild(application.view);

const world = new World();

world.registerComponent(PlayerComponent);
world.registerComponent(SpriteComponent);
world.registerComponent(VelocityComponent);
world.registerComponent(EnemyComponent);

const entityFactory = new EntityFactory(application, world);

world.registerSystem(InputSystem);
world.registerSystem(PlayerMovementSystem, { application });
world.registerSystem(VelocitySystem);
world.registerSystem(CleanupSystem, { application });
world.registerSystem(RespawnSystem, { application, entityFactory });
world.registerSystem(DeathSystem);

entityFactory.createLevel();
entityFactory.createMario();

application.ticker.add((delta: number) => {
    world.execute(delta, performance.now());
});

application.start();
