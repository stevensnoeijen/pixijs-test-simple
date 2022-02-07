import { PlayerComponent } from './../components/PlayerComponent';
import { LevelComponent } from './../components/LevelComponent';
import { TimerComponent } from '../components/TimerComponent';
import { TextComponent } from './../components/TextComponent';
import { System } from 'ecsy';
import { Audio } from '../Audio';
import { BlinkComponent } from '../components/BlinkComponent';

export class ScoreSystem extends System {
    private level = 0;

    public execute(delta: number, time: number): void {
        this.queries.timer.results[0].getComponent(TextComponent)!.text.text = Math.floor(time / 1000).toString();

        this.updateLevel(time);
        this.queries.gamestatus.results[0].getMutableComponent(LevelComponent)!.number = this.level;
        if (this.queries.player.results[0].alive) {
            this.queries.gamestatus.results[0].getComponent(TextComponent)!.text.text = `Level ${this.level}`;
        }
    }
    
    private updateLevel(time: number): void {
        const newLevel = 1 + Math.floor( time / 1000 / 10);
        
        if (this.level !== newLevel) {
            this.level = 1 + Math.floor( time / 1000 / 10);
            
            if (this.level !== 1) {
                Audio.LEVEL_UP.play();
                this.queries.gamestatus.results[0].addComponent(BlinkComponent, { blinkTime: 250, removeAfter: 1500, elapsedTime: 0 });
            }
        }
    }
}

ScoreSystem.queries = {
    player: {
        components: [PlayerComponent],
    },
    timer: {
        components: [TextComponent, TimerComponent],
    },
    gamestatus: {
        components: [TextComponent, LevelComponent],
    },
};