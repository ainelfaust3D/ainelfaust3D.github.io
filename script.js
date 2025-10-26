import { initPortfolio } from './portfolio.js';
import { initNavigation } from './navigation.js';
import { initEmojiAnimation } from './emojiAnimation.js';
import { initLogoAnimation } from './logoAnimation.js';

document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    initNavigation();
    initEmojiAnimation();
    initLogoAnimation();

    // Handle page visibility change to pause/resume all Howler sounds
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            Howler.mute(true);
        } else {
            // Only unmute if the user hasn't explicitly muted it
            if (localStorage.getItem('isMuted') !== 'true') {
                Howler.mute(false);
            }
        }
    });
});