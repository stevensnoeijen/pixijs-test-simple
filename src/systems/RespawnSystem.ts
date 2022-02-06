import { LevelComponent } from './../components/LevelComponent';
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
    private level = 0;

    constructor(world: World, attributes: RespawnSystemAttributes) {
		super(world, attributes);
        this.entityFactory = attributes.entityFactory;
    }

    public execute(delta: number, time: number): void {
        this.level = this.queries.level.results[0].getComponent(LevelComponent)!.number;

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
}

RespawnSystem.queries = {
    enemies: {
        components: [SpriteComponent, EnemyComponent],
    },
    level: {
        components: [LevelComponent],
    },
};