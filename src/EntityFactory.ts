import { GameStatusComponent } from './components/GameStatusComponent';
import { TextComponent } from './components/TextComponent';
import { EnemyComponent } from './components/EnemyComponent';
import { PlayerComponent } from './components/PlayerComponent';
import { VelocityComponent } from './components/VelocityComponent';
import { SpriteComponent } from './components/SpriteComponent';
import { Entity, World } from 'ecsy';
import * as PIXI from 'pixi.js';
import { ScoreComponent } from './components/ScoreComponent';

export class EntityFactory {
    constructor(private readonly application: PIXI.Application, private readonly world: World) {

    }

    public createLevel(): Entity {
        const sprite = PIXI.Sprite.from('level.png');
        sprite.scale.set(2.5);
        this.application.stage.addChildAt(sprite, 0);

        return this.world.createEntity()
            .addComponent(SpriteComponent, { sprite });
    }

    public createTimer(): Entity { 
        let text = new PIXI.Text('0');
        this.application.stage.addChild(text);
        text.x = 5;
        text.y = 5;

        return this.world.createEntity()
            .addComponent(TextComponent, { text })
            .addComponent(ScoreComponent);
    }

    public createGameStatus(): Entity {
        let text = new PIXI.Text('');
        this.application.stage.addChild(text);
        text.anchor.set(0.5);
        text.x = this.application.screen.width / 2;
        text.y = 25;

        return this.world.createEntity()
            .addComponent(TextComponent, { text })
            .addComponent(GameStatusComponent);
    }

    public createMario(): Entity {
        const sprite = PIXI.Sprite.from('mario.png');
        sprite.scale.set(0.5);
        sprite.anchor.set(0.5);
        sprite.x = this.application.screen.width / 2;
        sprite.y = this.application.screen.height / 2;
        this.application.stage.addChild(sprite);

        return this.world.createEntity()
            .addComponent(SpriteComponent, { sprite })
            .addComponent(VelocityComponent, { y: 1, x: 0 })
            .addComponent(PlayerComponent);
    }

    public createFish(speed = 1): Entity {
        const sprite = PIXI.Sprite.from('fish.png');
        sprite.scale.set(4);
        sprite.anchor.set(0.5);
        sprite.x = Math.random() > 0.5 ? 800 : 0;
        sprite.y = Math.random() * 400 + 80;

        const left = sprite.x === 0; 

        if(left) {
            sprite.scale.x *= -1;
        }

        this.application.stage.addChild(sprite);

        return this.world.createEntity()
            .addComponent(SpriteComponent, { sprite })
            .addComponent(EnemyComponent)
            .addComponent(VelocityComponent, { x: left ? speed : -speed, y: 0 });
    }
}