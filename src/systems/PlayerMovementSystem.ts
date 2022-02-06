import { VelocityComponent } from './../components/VelocityComponent';
import { SpriteComponent } from './../components/SpriteComponent';
import { Input } from '../Input';
import { PlayerComponent } from '../components/PlayerComponent';
import { PixiSystem } from './PixiSystem';
import { Audio } from '../Audio';

export class PlayerMovementSystem extends PixiSystem {
	private static readonly MOVE_SPEED = 2;
    private static readonly SPRINT_MULTIPLIER = 2;

	public execute(delta: number, time: number): void {
		for (const entity of this.queries.entities.results) {
			const spriteComponent = entity.getComponent(SpriteComponent)!;
			const velocityComponent = entity.getMutableComponent(VelocityComponent)!;

            if (Input.isKeyDown('a', false) && spriteComponent.sprite.scale.x == .5) {
                spriteComponent.sprite.scale.x *= -1;
            }
            if (Input.isKeyDown('d', false) && spriteComponent.sprite.scale.x == -.5) {
                spriteComponent.sprite.scale.x /= -1;
            }

			let moveX = 0;
			let moveY = 0;

			if (Input.isKeyDown('w')) {
				moveY -= PlayerMovementSystem.MOVE_SPEED * delta;
			}
			if (Input.isKeyDown('s')) {
				moveY += PlayerMovementSystem.MOVE_SPEED * delta;
			}
			if (Input.isKeyDown('a')) {
				moveX -= PlayerMovementSystem.MOVE_SPEED * delta;
			}
			if (Input.isKeyDown('d')) {
				moveX += PlayerMovementSystem.MOVE_SPEED * delta;
			}

			if (Input.isKeyUp('m')) {
				Audio.MUSIC.mute(!Audio.MUSIC.mute());
			}

            if (Input.isKeyDown('shift')) {
                moveX *= PlayerMovementSystem.SPRINT_MULTIPLIER;
                moveY *= PlayerMovementSystem.SPRINT_MULTIPLIER;
            }

			if ((moveX > 0 && spriteComponent.sprite.x < this.application.screen.width - spriteComponent.sprite.width / 2)
				|| (moveX < 0 && spriteComponent.sprite.x > 0 + spriteComponent.sprite.width / 2)) {
				spriteComponent.sprite.x += moveX;
			}

			if ((moveY > 0 && spriteComponent.sprite.y < (this.application.screen.height - 70) - spriteComponent.sprite.height / 2)
				|| (moveY < 0 && spriteComponent.sprite.y > 50 + spriteComponent.sprite.height / 2)) {
            	spriteComponent.sprite.y += moveY;
			}

			// float horizontal after moving
			if (Input.isKeyUp('a')){
				velocityComponent.x = -1;
			}
			if (Input.isKeyUp('d')){
				velocityComponent.x = 1;
			}

			// declease horizontal float over time
			if (velocityComponent.x !== 0) {
				if(velocityComponent.x > 0) {
					velocityComponent.x -= .1 * (delta / 10);
				} else if(velocityComponent.x < 0) {
					velocityComponent.x += .1 * (delta / 10);
				}
			}
		}
	}
}

PlayerMovementSystem.queries = {
    entities: {
        components: [PlayerComponent, SpriteComponent, VelocityComponent],
    },
};