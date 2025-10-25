import { scoreMilestoneSounds, lifeLostSounds } from './audioManager.js';

export function updateHighScoreDisplay(highScoreElement, highScore) {
    if (highScoreElement) {
        highScoreElement.textContent = `🏆 Рекорд: ${highScore}`;
        highScoreElement.classList.add('animate');
        setTimeout(() => {
            highScoreElement.classList.remove('animate');
        }, 200); // Длительность анимации
    }
}

export function updateEmojiCount(emojiCountElement, caughtEmojisCount, currentDifficultyThreshold, updateDifficultyCallback) {
    if (caughtEmojisCount > 0) {
        emojiCountElement.textContent = caughtEmojisCount;
        emojiCountElement.style.display = 'block';
        emojiCountElement.classList.add('animate');
        if (caughtEmojisCount > 0 && caughtEmojisCount % 10 === 0) {
            emojiCountElement.classList.add('milestone-score');
            scoreMilestoneSounds[Math.floor(Math.random() * scoreMilestoneSounds.length)].play();
            setTimeout(() => {
                emojiCountElement.classList.remove('milestone-score');
            }, 2000); // Удаляем класс через 2 секунды
        }
        setTimeout(() => {
            emojiCountElement.classList.remove('animate');
        }, 200);
    } else {
        emojiCountElement.style.display = 'none';
    }
    if (caughtEmojisCount >= currentDifficultyThreshold) {
        updateDifficultyCallback();
    }
}

export function updateLives(livesElement, lives) {
    if (livesElement) {
        const totalLives = 3; // Общее количество жизней
        livesElement.innerHTML = ''; // Очищаем существующие сердечки
        for (let i = 0; i < totalLives; i++) {
            const heartSpan = document.createElement('span');
            heartSpan.classList.add('heart-icon');
            heartSpan.dataset.heartIndex = i; // Присваиваем индекс для идентификации
            if (i < lives) {
                heartSpan.textContent = '❤️'; // Полное сердце для оставшихся жизней
            } else {
                heartSpan.textContent = '💔'; // Разбитое сердце для потерянных жизней
                heartSpan.classList.add('spent-heart'); // Добавляем класс для прозрачности
            }
            livesElement.appendChild(heartSpan);
        }
    }
}