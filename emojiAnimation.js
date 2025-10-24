import { trackNewHighScore, trackEmojiClick } from './yandexMetrika.js';
const heroAppearSound = new Howl({
    src: ['./audio/hero_appear.mp3'],
    volume: 0.6
});

const gameOverSound = new Howl({
    src: ['./audio/game_over.mp3'],
    volume: 0.7
});

const emojiClickSound = new Howl({
    src: ['./audio/emoji_click.mp3'],
    volume: 0.5
});

const gameStatusMusic = new Howl({
    src: ['./audio/game_status_music.mp3'],
    volume: 0.3,
    loop: true
});

const ambientMusic = new Howl({
    src: ['./audio/ambient_music.mp3'],
    volume: 0.2,
    loop: true
});

const stompingSounds = [
    new Howl({
        src: ['./audio/stomping.mp3'],
        volume: 0.4,
        loop: true
    }),
    new Howl({
        src: ['./audio/stomping2.mp3'], // Предполагаем, что у нас есть файл stomping2.mp3
        volume: 0.4,
        loop: true
    }),
    new Howl({
        src: ['./audio/stomping3.mp3'], // Предполагаем, что у нас есть файл stomping3.mp3
        volume: 0.4,
        loop: true
    })
];

const lifeLostSounds = [
    new Howl({
        src: ['./audio/life_lost1.mp3'], // Предполагаем, что у нас есть файл life_lost1.mp3
        volume: 0.6
    }),
    new Howl({
        src: ['./audio/life_lost2.mp3'], // Предполагаем, что у нас есть файл life_lost2.mp3
        volume: 0.6
    }),
    new Howl({
        src: ['./audio/life_lost3.mp3'], // Предполагаем, что у нас есть файл life_lost3.mp3
        volume: 0.6
    })
];

const scoreMilestoneSounds = [
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

export function initEmojiAnimation() {
    ambientMusic.play(); // Запускаем фоновую музыку при загрузке страницы
    const backgroundAnimation = document.querySelector('.background-animation');
    const hero = document.getElementById('hero');
    const container = document.getElementById('emoji-container');
    const livesElement = document.getElementById('lives');
    const emojiCountElement = document.getElementById('emoji-count');
    const gameOverElement = document.getElementById('game-over');
    const highScoreElement = document.getElementById('high-score'); // Новый элемент для рекорда

    // Функции для работы с куки
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }

    let highScore = 0; // Переменная для хранения рекорда

    // Загружаем рекорд из куки при инициализации
    highScore = parseInt(getCookie('highScore') || '0');
    updateHighScoreDisplay();

    // Функция для обновления отображения рекорда
    function updateHighScoreDisplay() {
    if (highScoreElement) {
        highScoreElement.textContent = `🏆 Рекорд: ${highScore}`;
        highScoreElement.classList.add('animate');
        setTimeout(() => {
            highScoreElement.classList.remove('animate');
        }, 200); // Длительность анимации
    }
}

    let caughtEmojisCount = 0;
    let lives = 3;
    let gameStarted = false;
    let gameOver = false;

    const MAX_EMOJIS = 60; // Максимальное количество эмодзи на экране
    let activeEmojis = 0;

    let initialSpawnInterval = 1000; // Начальный интервал спавна (1 секунда)
    let currentSpawnInterval = initialSpawnInterval;
    const minSpawnInterval = 300; // Минимальный интервал спавна (0.3 секунды)
    const spawnIntervalDecreaseRate = 50; // На сколько уменьшать интервал за каждый шаг
    const difficultyThreshold = 10; // Каждые 10 пойманных эмодзи увеличиваем сложность
    let currentDifficultyThreshold = difficultyThreshold;

    let spawnInterval = null;
    let lifeCheckInterval = null;

    function updateEmojiCount() {
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
            updateDifficulty();
            currentDifficultyThreshold += difficultyThreshold; // Увеличиваем порог для следующего уровня сложности
        }
    }

    function updateDifficulty() {
        if (currentSpawnInterval > minSpawnInterval) {
            currentSpawnInterval = Math.max(minSpawnInterval, currentSpawnInterval - spawnIntervalDecreaseRate);
            if (spawnInterval) {
                clearInterval(spawnInterval);
                spawnInterval = setInterval(createFloatingEmoji, currentSpawnInterval);
            }
        }
    }

    function updateLives() {
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

    function endGame() {
        gameOver = true;
        if (spawnInterval) clearInterval(spawnInterval);
        if (lifeCheckInterval) clearInterval(lifeCheckInterval);
        gameStatusMusic.stop(); // Останавливаем музыку статуса игры

        const heroTitle = document.querySelector('#hero h1');
        heroAppearSound.play(); // Воспроизводим звук появления героя
        const gameOverElement = document.getElementById('game-over');

        // Анимация исчезновения Ainel Faust 3D
        if (heroTitle) {
            heroTitle.style.animation = 'none'; // Останавливаем текущие анимации
            void heroTitle.offsetWidth; // Принудительная перерисовка
            heroTitle.style.animation = 'heroTitleReverse 0.5s forwards'; // Ускоряем в 2 раза
            heroTitle.addEventListener('animationend', function handleHeroTitleAnimationEnd() {
                heroTitle.style.visibility = 'hidden';
                heroTitle.style.animation = ''; // Очищаем свойство animation
                heroTitle.removeEventListener('animationend', handleHeroTitleAnimationEnd);

                // После исчезновения Ainel Faust 3D, показываем Game Over
                setTimeout(() => {
                    if (gameOverElement) {
                        // gameOverSound.play(); // Воспроизводим звук Game Over
                        // gameOverElement.style.display = 'block';
                    }
                }, 1000); // Задержка перед появлением Game Over
            });
        }

        if (gameOverElement) {
            gameOverSound.play(); // Воспроизводим звук Game Over
            gameOverElement.style.display = 'block';
            gameOverElement.style.visibility = 'visible';
            gameOverElement.style.opacity = '0';
            gameOverElement.style.animation = 'none'; // Сброс анимации
            void gameOverElement.offsetWidth; // Принудительная перерисовка
            gameOverElement.style.animation = 'gameOverFadeIn 4s forwards'; // Ускоряем в 2 раза
            gameOverElement.addEventListener('animationend', function handleGameOverFadeInEnd() {
                gameOverElement.removeEventListener('animationend', handleGameOverFadeInEnd);
                // После появления Game Over, ждем 1 секунду (было 2) и запускаем исчезновение
                setTimeout(() => {
                    gameOverElement.style.animation = 'none'; // Сброс анимации
                    void gameOverElement.offsetWidth; // Принудительная перерисовка
                    gameOverElement.style.animation = 'gameOverFadeOut 0.5s forwards'; // Ускоряем в 2 раза
                    gameOverElement.addEventListener('animationend', function handleGameOverFadeOutEnd() {
                        gameOverElement.style.visibility = 'hidden';
                        gameOverElement.style.opacity = '0';
                        gameOverElement.style.animation = ''; // Очищаем свойство animation
                        gameOverElement.removeEventListener('animationend', handleGameOverFadeOutEnd);

                        // Обновляем рекорд, если текущий счет выше
                        if (caughtEmojisCount > highScore) {
                            highScore = caughtEmojisCount;
                            setCookie('highScore', highScore, 365); // Сохраняем рекорд на 365 дней
                            updateHighScoreDisplay();
                            if (typeof ym === 'function') {
                                trackNewHighScore(highScore);
                            }
                        }

                        resetGame();
                    }, { once: true });
                }, 4000); // Задержка перед исчезновением Game Over (увеличена)
            }, { once: true });
        }

        activeEmojiElements.forEach(emoji => {
            const rect = emoji.getBoundingClientRect();
            // Проверяем, находится ли эмодзи еще на экране или уже улетело вверх
            // Если оно уже улетело вверх, его не нужно принудительно падать
            if (rect.bottom > 0) { // Простая проверка, что эмодзи еще видно
                forceEmojiFall(emoji);
            } else {
                emoji.remove(); // Удаляем эмодзи, которое уже улетело
            }
        });
        activeEmojiElements = []; // Clear the array
        activeEmojis = 0; // Reset the counter
    } // This closes the endGame function

    function resetGame() {
        lives = 3;
        caughtEmojisCount = 0;
        gameStarted = false;
        gameOver = false;
        currentSpawnInterval = initialSpawnInterval; // Сброс интервала спавна
        currentDifficultyThreshold = difficultyThreshold; // Сброс порога сложности

        livesElement.style.opacity = '0';
        livesElement.style.visibility = 'hidden';
        emojiCountElement.style.opacity = '0';
        emojiCountElement.style.visibility = 'hidden';
        highScoreElement.style.opacity = '0';
        highScoreElement.style.visibility = 'hidden';

        // Добавляем задержку, чтобы обновление жизней произошло после завершения анимации скрытия
        setTimeout(() => {
            updateLives();
            updateEmojiCount();
        }, 500); // 500ms соответствует длительности CSS-перехода

        const heroTitle = document.querySelector('#hero h1');
        if (heroTitle) {
            heroTitle.style.visibility = 'visible';
            heroTitle.style.opacity = '1'; // Убедимся, что opacity сброшен
            heroTitle.style.display = 'block'; // Убедимся, что display сброшен
            heroTitle.style.animation = 'none'; // Сбрасываем анимацию
            void heroTitle.offsetWidth; // Принудительная перерисовка
            heroTitle.style.animation = 'heroTitle 1s ease-in-out, gradientShift 4s ease-in-out infinite'; // Ускоряем heroTitle в 2 раза
            heroAppearSound.play(); // Воспроизводим звук появления title hero
            ambientMusic.play(); // Запускаем фоновую музыку после сброса игры
        }

        const gameOverElement = document.getElementById('game-over');
        if (gameOverElement) {
            gameOverElement.style.visibility = 'hidden';
            gameOverElement.style.opacity = '0';
            gameOverElement.style.animation = ''; // Очищаем свойство animation
        }

        // Clear any remaining emojis from the screen
        const currentEmojis = Array.from(backgroundAnimation.querySelectorAll('.floating-emoji'));
        currentEmojis.forEach(emoji => emoji.remove());

        // Reset intervals if they somehow persist
        if (spawnInterval) clearInterval(spawnInterval);
        if (lifeCheckInterval) clearInterval(lifeCheckInterval);

        // Re-spawn initial emojis after reset
        for (let i = 0; i < 5; i++) {
            createFloatingEmoji();
        }

        // Restart spawn interval
        spawnInterval = setInterval(createFloatingEmoji, currentSpawnInterval);
    }

    const emojis = [
        '😀', '😂', '😍', '🤩', '🥳', '😎', '😇', '🥰', '😋', '😜',
        '👍', '👏', '🙌', '💖', '✨', '🔥', '🌈', '☀️', '🌸', '🌼',
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
        '🍎', '🍓', '🍇', '🍉', '🍍', '🍑', '🍒', '🥝', '🍔', '🍕',
        '🍦', '🍩', '🍪', '🎂', '🍬', '🍭', '🍫', '☕', '🍵', '🥂',
        '🎈', '🎁', '🎉', '🎊', '🎀', '👑', '💎', '💫', '🌟', '✨'
    ];

    // Добавляем более точную проверку улёта вверх через requestAnimationFrame
    function lifeCheckLoop() {
        if (gameOver || !gameStarted) return;
        const heroRect = hero.getBoundingClientRect();
        const list = Array.from(backgroundAnimation.querySelectorAll('.floating-emoji'));
        list.forEach(el => {
            if (el.classList.contains('falling')) return;
            if (el.dataset.escaped === '1') return;
            const rect = el.getBoundingClientRect();
            if (rect.bottom <= heroRect.top) {
                el.dataset.escaped = '1';
                lives -= 1; // Сначала уменьшаем жизни
                lifeLostSounds[Math.floor(Math.random() * lifeLostSounds.length)].play(); // Воспроизводим случайный звук потери жизни
                updateLives(); // Обновляем отображение жизней
                // Находим соответствующий элемент сердечка для анимации падения
                const lostHeartIndex = lives; // Индекс только что потерянного сердечка
                const lostHeartElement = livesElement.querySelector(`[data-heart-index="${lostHeartIndex}"]`);
                if (lostHeartElement) {
                    animateFallingHeart(lostHeartElement);
                }
                el.remove();
                activeEmojis = Math.max(0, activeEmojis - 1);
                // Удаляем эмодзи из activeEmojiElements
                activeEmojiElements = activeEmojiElements.filter(item => item !== el);
                if (lives <= 0) endGame();
            }
        });
        requestAnimationFrame(lifeCheckLoop);
    }

    function forceEmojiFall(el) {
        const size = parseFloat(getComputedStyle(el).fontSize) || 30;
        const rect = el.getBoundingClientRect();
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.position = 'fixed';
        el.style.left = `${rect.left}px`;
        el.style.top = `${rect.top}px`;
        el.style.zIndex = '1001';
        el.classList.add('falling');
        const randomX = (Math.random() - 0.5) * 400;
        const randomRotation = Math.random() * 1080;
        const fallAnimationDuration = 2 + Math.random() * 2;
        el.style.setProperty('--random-x', `${randomX}px`);
        el.style.setProperty('--random-rotation', `${randomRotation}deg`);
        el.style.setProperty('--emoji-size', `${size}px`);
        el.style.animation = `fall ${fallAnimationDuration}s forwards`;
        el.addEventListener('animationend', () => {
            el.remove();
            activeEmojis = Math.max(0, activeEmojis - 1);
        }, { once: true });
    }

    function animateFallingHeart(heartElement) {
        const heartRect = heartElement.getBoundingClientRect();
        const fallingHeart = document.createElement('span');
        fallingHeart.textContent = '❤️'; // Всегда полное сердце
        fallingHeart.classList.add('falling-heart');
        fallingHeart.style.left = `${heartRect.left}px`;
        fallingHeart.style.top = `${heartRect.top}px`;
        fallingHeart.style.fontSize = `${heartRect.height}px`; // Размер как у оригинального сердечка

        const randomX = (Math.random() - 0.5) * 200; // Меньший разброс для сердечек
        const randomRotation = Math.random() * 720; // Меньшее вращение
        const fallAnimationDuration = 1.5 + Math.random() * 1; // Быстрее падает

        fallingHeart.style.setProperty('--random-x', `${randomX}px`);
        fallingHeart.style.setProperty('--random-rotation', `${randomRotation}deg`);
        fallingHeart.style.setProperty('--fall-animation-duration', `${fallAnimationDuration}s`);

        document.body.appendChild(fallingHeart); // Добавляем в body, чтобы не зависело от backgroundAnimation

        fallingHeart.addEventListener('animationend', () => {
            fallingHeart.remove();
        }, { once: true });
    }

    function startGame(clickedTop) {
        if (gameStarted) return;
        gameStarted = true;
        ambientMusic.stop(); // Останавливаем фоновую музыку при начале игры
        gameStatusMusic.play(); // Запускаем музыку статуса игры

        livesElement.style.opacity = '1';
        livesElement.style.visibility = 'visible';
        emojiCountElement.style.opacity = '1';
        emojiCountElement.style.visibility = 'visible';
        highScoreElement.style.opacity = '1';
        highScoreElement.style.visibility = 'visible';

        // Clear existing intervals before starting new ones
        if (spawnInterval) clearInterval(spawnInterval);
        if (lifeCheckInterval) clearInterval(lifeCheckInterval);

        const current = Array.from(backgroundAnimation.querySelectorAll('.floating-emoji'));
        current.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < clickedTop) {
                forceEmojiFall(el);
            } else {
                el.dataset.target = '1';
            }
        });

        spawnInterval = setInterval(createFloatingEmoji, currentSpawnInterval);
        requestAnimationFrame(lifeCheckLoop);
    }

    function createFloatingEmoji() {
        if (gameOver) return;
        if (activeEmojis >= MAX_EMOJIS) return;
        const emoji = document.createElement('span');
        emoji.classList.add('floating-emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const size = Math.random() * 40 + 20;
        emoji.style.fontSize = `${size}px`;
        // Ограничиваем спавн внутри горизонтальных границ backgroundAnimation
        const containerRect = backgroundAnimation.getBoundingClientRect();

        console.log('containerRect:', containerRect);
        console.log('Emoji size:', size);

        // Calculate startX relative to the container's left edge (0 to container.width - size)
        const startX = Math.random() * (containerRect.width - size);
        console.log('Calculated startX (relative to container):', startX);
        // Спавним ниже нижней границы backgroundAnimation, чтобы летали через hero
        const startY = backgroundAnimation.offsetHeight + 50; // Start below the visible area
        emoji.style.left = `${Math.random() * (backgroundAnimation.offsetWidth - 30)}px`;
        emoji.style.top = `${startY}px`;
        const animationDuration = Math.random() * 10 + 5;
        emoji.dataset.animationDuration = animationDuration;
        // Анимация floatAndFade применяется ко всем эмодзи
        emoji.style.animation = `floatAndFade ${animationDuration}s ease-in forwards`;
        if (!gameStarted) {
            emoji.style.animationDelay = `${Math.random() * 5}s`;
        } else {
            emoji.style.animationDelay = `${Math.random() * 3}s`;
        }
        backgroundAnimation.appendChild(emoji);
        activeEmojis++;
        // Добавляем эмодзи в массив для отслеживания прозрачности
        activeEmojiElements.push(emoji);
        emoji.addEventListener('click', (event) => {
            const clickedEmoji = event.target;
            const rect = clickedEmoji.getBoundingClientRect();
            caughtEmojisCount++;
            emojiClickSound.play(); // Воспроизводим звук клика по эмодзи
            if (typeof ym === 'function') {
                
                
                
                trackEmojiClick();
            }
            if (caughtEmojisCount > highScore) {
                highScore = caughtEmojisCount;
                setCookie('highScore', highScore, 365); // Сохраняем рекорд на 365 дней
                updateHighScoreDisplay();
            }


            updateEmojiCount();
            if (typeof ym === 'function') {
      
            }
            if (!gameStarted) {
                startGame(rect.top);
            }
            forceEmojiFall(clickedEmoji);
        });
    }

    let activeEmojiElements = []; // Массив для хранения активных эмодзи

    updateEmojiCount();
    updateLives();

    // Добавляем начальные эмодзи
    for (let i = 0; i < 5; i++) {
      createFloatingEmoji();
    }

    requestAnimationFrame(updateEmojiOpacity); // Moved here

    function updateEmojiOpacity() {
        const heroRect = hero.getBoundingClientRect();
        const backgroundRect = backgroundAnimation.getBoundingClientRect();

        activeEmojiElements = activeEmojiElements.filter(emoji => {
            const rect = emoji.getBoundingClientRect();
            // Проверяем, существует ли элемент в DOM
            if (!emoji.parentElement) return false;

            let opacity = 1;
            const fadeZone = 100; // Зона затухания в пикселях

            // Затухание при входе снизу (от нижней границы backgroundAnimation к heroRect.bottom)
            if (rect.top > heroRect.bottom - fadeZone) {
                opacity = Math.min(1, (backgroundRect.bottom - rect.top) / fadeZone);
            }
            // Затухание при выходе сверху (от heroRect.top к верхней границе backgroundAnimation)
            else if (rect.bottom < heroRect.top + fadeZone) {
                opacity = Math.min(1, (rect.bottom - backgroundRect.top) / fadeZone);
            }

            // Удаляем эмодзи, если оно полностью ушло за верхнюю границу backgroundAnimation
            if (rect.bottom < backgroundRect.top) {
                if (gameStarted) { // Отнимаем жизнь только если игра началась
                    lives -= 1; // Отнимаем жизнь
                    lifeLostSounds[Math.floor(Math.random() * lifeLostSounds.length)].play(); // Воспроизводим случайный звук потери жизни
                    updateLives(); // Обновляем отображение жизней
                    // Находим соответствующий элемент сердечка для анимации падения
                    const lostHeartIndex = lives; // Индекс только что потерянного сердечка
                    const lostHeartElement = livesElement.querySelector(`[data-heart-index="${lostHeartIndex}"]`);
                    if (lostHeartElement) {
                        animateFallingHeart(lostHeartElement);
                    }
                    if (lives <= 0) endGame(); // Если жизни закончились, завершаем игру
                }
                emoji.remove();
                activeEmojis--; // Уменьшаем счетчик активных эмодзи
                return false; // Удаляем эмодзи из activeEmojiElements
            }

            emoji.style.opacity = opacity;
            return true;
        });

        requestAnimationFrame(updateEmojiOpacity);
    }
}