export function trackLogoClick(clickCount) {
    if (typeof ym === 'function') {
        if (clickCount === 1) {
            ym(104706152, 'reachGoal', 'logo_first_click');
            console.log('Yandex Metrika goal: logo_first_click');
        } else if (clickCount === 5) {
            ym(104706152, 'reachGoal', 'logo_fifth_click');
            console.log('Yandex Metrika goal: logo_fifth_click');
        }
    }
}

export function trackNewHighScore(score) {
    if (typeof ym === 'function') {
        ym(104706152, 'reachGoal', 'new_high_score', { score: score });
        console.log('Yandex Metrika goal: new_high_score', { score: score });
    }
}

export function trackEmojiClick() {
    if (typeof ym === 'function') {
        ym(104706152, 'reachGoal', 'emoji_click');
        console.log('Yandex Metrika goal: emoji_click');
    }
}