import { VelocityComponent } from './../components/VelocityComponent';
import { SpriteComponent } from './../components/SpriteComponent';
import { Attributes, System, World } from 'ecsy';

export class VelocitySystem extends System {

    constructor(world: World, attributes: Attributes) {
        super(world, attributes);
    }

    public execute(delta: number, time: number): void {
        for (const entity of this.queries.entities.results) {
            const velocityComponent = entity.getComponent(VelocityComponent)!;
            const spriteComponent = entity.getComponent(SpriteComponent)!;

            spriteComponent.sprite.x += velocityComponent.x * delta;
            spriteComponent.sprite.y += velocityComponent.y * delta;
        }
    }
}

VelocitySystem.queries = {
    entities: {
        components: [SpriteComponent, VelocityComponent],
    },
};