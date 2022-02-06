import { EnemyComponent } from './../components/EnemyComponent';
import { PlayerComponent } from './../components/PlayerComponent';
import { System } from 'ecsy';
import { SpriteComponent } from '../components/SpriteComponent';
import { isCollided } from '../collision';

export class DeathSystem extends System {

    public execute(delta: number, time: number): void {
        const player = this.queries.player.results[0];

        for(const enemy of this.queries.enemies.results) {
            if (isCollided(player.getComponent(SpriteComponent)!.sprite, enemy.getComponent(SpriteComponent)!.sprite, 20)) {
                console.log('player dead');
                this.world.stop();
            }
        }
    }
}

DeathSystem.queries = {
    enemies: {
        components: [SpriteComponent, EnemyComponent],
    },
    player: {
        components: [SpriteComponent, PlayerComponent]
    }
};