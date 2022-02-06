import { VelocityComponent } from './../components/VelocityComponent';
import { SpriteComponent } from './../components/SpriteComponent';
import { PixiSystem } from './PixiSystem';

export class CleanupSystem extends PixiSystem {

    public execute(delta: number, time: number): void {
        for (const entity of this.queries.entities.results) {
            const spriteComponent = entity.getComponent(SpriteComponent)!;

            // when entity is out of screen
            if (spriteComponent.sprite.x < -50 || spriteComponent.sprite.x > this.application.screen.width + 50) {
                this.application.stage.removeChild(spriteComponent.sprite);
                entity.remove();
            }
        }
    }
}

CleanupSystem.queries = {
    entities: {
        components: [SpriteComponent, VelocityComponent],
    },
};