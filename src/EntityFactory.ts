import { VelocityComponent } from './components/VelocityComponent';
import { SpriteComponent } from './components/SpriteComponent';
import { World } from 'ecsy';
import * as PIXI from 'pixi.js';

export class EntityFactory {
    constructor(private readonly application: PIXI.Application, private readonly world: World) {

    }

    public createFish(): void {
        const sprite = PIXI.Sprite.from('fish.png');
        sprite.scale.set(3);
        sprite.anchor.set(0.5);
        sprite.x = Math.random() > 0.5 ? 800 : 0;
        sprite.y = Math.random() * 300 + 200;

        const left = sprite.x === 0; 

        if(left) {
            sprite.scale.x *= -1;
        }

        this.application.stage.addChild(sprite);
        this.world.createEntity()
            .addComponent(SpriteComponent, { sprite: sprite })
            .addComponent(VelocityComponent, { x: left ? 1 : -1, y: 0 });
    }
}