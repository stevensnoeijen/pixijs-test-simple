import { TextComponent } from './../components/TextComponent';
import { GameStatusComponent } from './../components/GameStatusComponent';
import { EntityFactory } from './../EntityFactory';
import { World } from 'ecsy';
import { SpriteComponent } from '../components/SpriteComponent';
import { PixiSystem, PixiSystemAttributes } from './PixiSystem';
import { EnemyComponent } from '../components/EnemyComponent';

type RespawnSystemAttributes = PixiSystemAttributes & {
    entityFactory: EntityFactory;
}

export class RespawnSystem extends PixiSystem {
    private static SPAWN_DELAY = 1200;
    private static FISH_PER_LEVEL = 3;

    private readonly entityFactory: EntityFactory;
    private lastSpawnTime: number = 0;

    constructor(world: World, attributes: RespawnSystemAttributes) {
		super(world, attributes);
        this.entityFactory = attributes.entityFactory;
    }

    public execute(delta: number, time: number): void {
        if(this.shouldRespawn(time)) {
            this.spawnFish(time);
        }
        this.queries.gamestatus.results[0].getComponent(TextComponent)!.text.text = `Level ${this.getLevel(time)}`;
    }

    private shouldRespawn(time: number): boolean {
        return this.queries.enemies.results.length < this.getLevel(time) * RespawnSystem.FISH_PER_LEVEL
            && this.lastSpawnTime + RespawnSystem.SPAWN_DELAY < time;
    }

    private spawnFish(time: number): void {
        const level = this.getLevel(time);
        this.entityFactory.createFish(level > 2 ? 1 + Math.random() * level: undefined);
        this.lastSpawnTime = time;
    }

    private getLevel(time: number): number {
        return 1 + Math.floor( time / 1000 / 10);
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