import { initPortfolio } from './portfolio.js';
import { initNavigation } from './navigation.js';
import { initEmojiAnimation } from './emojiAnimation.js';
import { initLogoAnimation } from './logoAnimation.js';

document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    initNavigation();
    initEmojiAnimation();
    initLogoAnimation();
});