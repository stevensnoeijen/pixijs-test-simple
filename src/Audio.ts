import { Howl } from 'howler';

export class Audio {
    public static readonly MUSIC = new Howl({
        src: 'music.wav',
        loop: true,
    });

    public static LEVEL_UP = new Howl({
        src: 'levelup.wav',
    });

    public static readonly MARIO_DIE = new Howl({
        src: 'mariodie.wav',
    });
}