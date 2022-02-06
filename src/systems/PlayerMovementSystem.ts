import { SpriteComponent } from './../components/SpriteComponent';
import { Input } from '../Input';
import { PlayerComponent } from '../components/PlayerComponent';
import { PixiSystem } from './PixiSystem';
export class PlayerMovementSystem extends PixiSystem {
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

			if (moveX > 0 && spriteComponent.sprite.x < this.application.screen.width - spriteComponent.sprite.width / 2) {
				spriteComponent.sprite.x += moveX;
			} else if (moveX < 0 && spriteComponent.sprite.x > 0 + spriteComponent.sprite.width / 2) {
				spriteComponent.sprite.x += moveX;
			}

			if (moveY > 0 && spriteComponent.sprite.y < (this.application.screen.height - 70) - spriteComponent.sprite.height / 2) {
				spriteComponent.sprite.y += moveY;
			} else if (moveY < 0 && spriteComponent.sprite.y > 50 + spriteComponent.sprite.height / 2) {
            	spriteComponent.sprite.y += moveY;
			}
		}
	}
}

PlayerMovementSystem.queries = {
    entities: {
        components: [PlayerComponent, SpriteComponent],
    },
};