import { EnemyComponent } from './components/EnemyComponent';
import { PlayerComponent } from './components/PlayerComponent';
import { VelocityComponent } from './components/VelocityComponent';
import { SpriteComponent } from './components/SpriteComponent';
import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

export class EntityFactory {
    constructor(private readonly application: PIXI.Application, private readonly world: World) {

    }

    public createLevel(): void {
        const sprite = PIXI.Sprite.from('level.png');
        sprite.scale.set(2.5);
        this.application.stage.addChildAt(sprite, 0);

        this.world.createEntity()
            .addComponent(SpriteComponent, { sprite });
    }

    public createMario(): void {
        const sprite = PIXI.Sprite.from('mario.png');
        sprite.scale.set(0.5);
        sprite.anchor.set(0.5);
        sprite.x = this.application.screen.width / 2;
        sprite.y = this.application.screen.height / 2;
        this.application.stage.addChild(sprite);

        this.world.createEntity()
            .addComponent(SpriteComponent, { sprite })
            .addComponent(PlayerComponent);
    }

    public createFish(): void {
        const sprite = PIXI.Sprite.from('fish.png');
        sprite.scale.set(4);
        sprite.anchor.set(0.5);
        sprite.x = Math.random() > 0.5 ? 800 : 0;
        sprite.y = Math.random() * 300 + 200;

        const left = sprite.x === 0; 

        if(left) {
            sprite.scale.x *= -1;
        }

        this.application.stage.addChild(sprite);

        this.world.createEntity()
            .addComponent(SpriteComponent, { sprite })
            .addComponent(EnemyComponent)
            .addComponent(VelocityComponent, { x: left ? 1 : -1, y: 0 });
    }
}