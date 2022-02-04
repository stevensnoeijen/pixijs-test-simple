import { SpriteComponent } from './../components/SpriteComponent';
import { System } from 'ecsy';
import { Input } from '../Input';

export class PlayerMovementSystem extends System {
    private static readonly SPRINT_SPEED = 2;

	public execute(delta: number, time: number): void {
		for (const entity of this.queries.entities.results) {
			const spriteComponent = entity.getComponent(SpriteComponent)!;

            if (Input.isKeyDown('a', false) && spriteComponent.sprite.scale.x == .5) {
                spriteComponent.sprite.scale.x *= -1;
            }
            if (Input.isKeyDown('d', false) && spriteComponent.sprite.scale.x == -.5) {
                spriteComponent.sprite.scale.x /= -1;
            }

			let moveX = 0;
			let moveY = 0;

			if (Input.isKeyDown('w')) {
				moveY -= 2 * delta;
			}
			if (Input.isKeyDown('s')) {
				moveY += 2 * delta;
			}
			if (Input.isKeyDown('a')) {
				moveX -= 2 * delta;
			}
			if (Input.isKeyDown('d')) {
				moveX += 2 * delta;
			}

            if (Input.isKeyDown('shift')) {
                moveX *= PlayerMovementSystem.SPRINT_SPEED;
                moveY *= PlayerMovementSystem.SPRINT_SPEED;
            }

            spriteComponent.sprite.x += moveX;
            spriteComponent.sprite.y += moveY;
		}
	}
}

PlayerMovementSystem.queries = {
    entities: {
        components: [SpriteComponent],
    },
};