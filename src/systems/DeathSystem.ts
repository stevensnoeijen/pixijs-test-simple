import { Howl } from 'howler';
import { TextComponent } from './../components/TextComponent';
import { GameStatusComponent } from './../components/GameStatusComponent';
import { EnemyComponent } from './../components/EnemyComponent';
import { PlayerComponent } from './../components/PlayerComponent';
import { System } from 'ecsy';
import { SpriteComponent } from '../components/SpriteComponent';
import { isCollided } from '../collision';
import { Audio } from '../Audio';

export class DeathSystem extends System {
    public execute(delta: number, time: number): void {
        const player = this.queries.player.results[0];
        for(const enemy of this.queries.enemies.results) {
            if (isCollided(player.getComponent(SpriteComponent)!.sprite, enemy.getComponent(SpriteComponent)!.sprite, 25)) {
                const gameStatusText = this.queries.gamestatus.results[0].getComponent(TextComponent)!.text;
                Audio.MUSIC.stop();
                Audio.MARIO_DIE.play();
                gameStatusText.text = "GAME OVER";
                gameStatusText.style.fill = 'red';
                player.alive = false;

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
        components: [SpriteComponent, PlayerComponent],
    },
    gamestatus: {
        components: [GameStatusComponent, TextComponent],
    },
};