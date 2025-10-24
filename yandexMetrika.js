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