import { ScoreComponent } from './../components/ScoreComponent';
import { TextComponent } from './../components/TextComponent';
import { System } from 'ecsy';

export class ScoreSystem extends System {
    public execute(delta: number, time: number): void {
        this.queries.entities.results[0].getComponent(TextComponent)!.text.text = Math.floor(time / 1000).toString();
    }
}

ScoreSystem.queries = {
    entities: {
        components: [TextComponent, ScoreComponent],
    },
};