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

    private readonly entityFactory: EntityFactory;
    private lastSpawnTime: number = 0;

    constructor(world: World, attributes: RespawnSystemAttributes) {
		super(world, attributes);
        this.entityFactory = attributes.entityFactory;
    }

    public execute(delta: number, time: number): void {
        if(this.shouldRespawn(time)) {
            this.spawnFish();
            this.lastSpawnTime = time;
        }
    }

    private spawnFish(): void {
        this.entityFactory.createFish();
    }

    private shouldRespawn(time: number): boolean {
        return this.queries.entities.results.length < 3
            && this.lastSpawnTime + RespawnSystem.SPAWN_DELAY < time;
    }
}

RespawnSystem.queries = {
    entities: {
        components: [SpriteComponent, EnemyComponent],
    },
};