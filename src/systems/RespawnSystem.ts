import { BlinkComponent } from './../components/BlinkComponent';
import { TextComponent } from './../components/TextComponent';
import { GameStatusComponent } from './../components/GameStatusComponent';
import { EntityFactory } from './../EntityFactory';
import { World } from 'ecsy';
import { SpriteComponent } from '../components/SpriteComponent';
import { PixiSystem, PixiSystemAttributes } from './PixiSystem';
import { EnemyComponent } from '../components/EnemyComponent';
import { Audio } from '../Audio';

type RespawnSystemAttributes = PixiSystemAttributes & {
    entityFactory: EntityFactory;
}

export class RespawnSystem extends PixiSystem {
    private static SPAWN_DELAY = 1200;
    private static FISH_PER_LEVEL = 3;

    private readonly entityFactory: EntityFactory;
    private lastSpawnTime: number = 0;
    private level = 0;

    constructor(world: World, attributes: RespawnSystemAttributes) {
		super(world, attributes);
        this.entityFactory = attributes.entityFactory;
    }

    public execute(delta: number, time: number): void {
        this.updateLevel(time);
        this.queries.gamestatus.results[0].getComponent(TextComponent)!.text.text = `Level ${this.level}`;

        if(this.shouldRespawn(time)) {
            this.spawnFish(time);
        }
    }

    private shouldRespawn(time: number): boolean {
        return this.queries.enemies.results.length < this.level * RespawnSystem.FISH_PER_LEVEL
            && this.lastSpawnTime + RespawnSystem.SPAWN_DELAY < time;
    }

    private spawnFish(time: number): void {
        this.entityFactory.createFish(this.level > 2 ? 1 + Math.random() * this.level: undefined);
        this.lastSpawnTime = time;
    }

    private updateLevel(time: number): void {
        const newLevel = 1 + Math.floor( time / 1000 / 10);
        
        if (this.level !== newLevel) {
            this.level = 1 + Math.floor( time / 1000 / 10);
            
            if (this.level !== 1) {
                Audio.LEVEL_UP.play();
                this.queries.gamestatus.results[0].addComponent(BlinkComponent, { blinkTime: 250, removeAfter: 1500, elapsedTime: 0 });
            }
        }
    }
}

RespawnSystem.queries = {
    enemies: {
        components: [SpriteComponent, EnemyComponent],
    },
    gamestatus: {
        components: [TextComponent, GameStatusComponent],
    },
};