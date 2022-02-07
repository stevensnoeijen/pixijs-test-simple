import { Howl } from 'howler';

export class Audio {
    public static readonly MUSIC = new Howl({
        src: 'music.mp3',
        loop: true,
    });

    public static LEVEL_UP = new Howl({
        src: 'levelup.mp3',
    });

    public static readonly MARIO_DIE = new Howl({
        src: 'mariodie.mp3',
    });
}