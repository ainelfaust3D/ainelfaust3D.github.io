export const heroAppearSound = new Howl({
    src: ['./audio/hero_appear.mp3'],
    volume: 0.6
});

export const gameOverSound = new Howl({
    src: ['./audio/game_over.mp3'],
    volume: 0.7
});

export const emojiClickSound = new Howl({
    src: ['./audio/emoji_click.mp3'],
    volume: 0.5
});

export const gameStatusMusic = new Howl({
    src: ['./audio/game_status_music.mp3'],
    volume: 0.3,
    loop: true
});

export const ambientMusic = new Howl({
    src: ['./audio/ambient_music.mp3'],
    volume: 0.2,
    loop: true
});

export const stompingSounds = [
    new Howl({
        src: ['./audio/stomping.mp3'],
        volume: 0.4,
        loop: true
    }),
    new Howl({
        src: ['./audio/stomping2.mp3'],
        volume: 0.4,
        loop: true
    }),
    new Howl({
        src: ['./audio/stomping3.mp3'],
        volume: 0.4,
        loop: true
    })
];

export const lifeLostSounds = [
    new Howl({
        src: ['./audio/life_lost1.mp3'],
        volume: 0.6
    }),
    new Howl({
        src: ['./audio/life_lost2.mp3'],
        volume: 0.6
    }),
    new Howl({
        src: ['./audio/life_lost3.mp3'],
        volume: 0.6
    })
];

export const scoreMilestoneSounds = [
    new Howl({
        src: ['./audio/score_50_1.mp3'],
        volume: 0.5
    }),
    new Howl({
        src: ['./audio/score_50_2.mp3'],
        volume: 0.5
    }),
    new Howl({
        src: ['./audio/score_50_3.mp3'],
        volume: 0.5
    })
];