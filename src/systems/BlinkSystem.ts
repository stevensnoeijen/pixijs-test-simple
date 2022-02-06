import { System } from 'ecsy';
import { TextComponent } from './../components/TextComponent';
import { BlinkComponent } from './../components/BlinkComponent';

export class BlinkSystem extends System {
    private lastExecuteTime = 0;

    public execute(delta: number, time: number): void {       
        for (const entity of this.queries.entities.results) {
            const blinkComponent = entity.getMutableComponent(BlinkComponent)!;
            const textComponent = entity.getComponent(TextComponent)!;

            blinkComponent.elapsedTime += time - this.lastExecuteTime;

            if (Math.round(blinkComponent.elapsedTime / blinkComponent.blinkTime) % 2 === 0) {
                textComponent.text.visible = true;
            } else if (Math.round(blinkComponent.elapsedTime / blinkComponent.blinkTime) % 2 === 1) {
                textComponent.text.visible = false;
            }

            if (blinkComponent.elapsedTime > blinkComponent.removeAfter) {
                entity.removeComponent(BlinkComponent);
            }
        }

        this.lastExecuteTime = time;
    }
}

BlinkSystem.queries = {
    entities: {
        components: [BlinkComponent, TextComponent],
    },
};