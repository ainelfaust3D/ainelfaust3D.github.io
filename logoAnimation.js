import { trackLogoClick } from './yandexMetrika.js';
import { creakSound, fallSound, stompingSounds, logoPlaceSound } from './audioManager.js';



export function initLogoAnimation() {
    const logo = document.querySelector('.logo');
    let logoClickCount = 0;
    let logoFirstClickTracked = false;

    const logoClickListener = () => {
        creakSound.play(); // Воспроизводим звук скрипа при каждом клике
        logoClickCount++;
        if (!logoFirstClickTracked) {
            trackLogoClick(1);
            logoFirstClickTracked = true;
        }
        if (logoClickCount === 5) {
            trackLogoClick(5);
            setTimeout(() => {
            fallSound.play();
            setTimeout(() => {
                fallSound.fade(0.7, 0, 1000); // Затухание с текущей громкости до 0 за 1.5 секунды
            }, 1000); // Начать затухание через 2 секунды после play()
        }, 1000); // Задержка 1 секунда
        }
        const wasStraightBeforeClick = logo.classList.contains('straight');

        if (logoClickCount === 5) {
            const originalTransition = logo.style.transition;
            logo.classList.add('straight'); // Запускаем плавное выпрямление

            // Ждем завершения анимации выпрямления
            setTimeout(() => {
                logo.style.transition = 'none'; // Временно отключаем transition для точного измерения
                void logo.offsetWidth; // Принудительная перерисовка

                const logoRect = logo.getBoundingClientRect();

                const logoCopy = logo.cloneNode(true);
                logoCopy.classList.add('falling-logo');
                logoCopy.style.position = 'fixed';
                logoCopy.style.left = logoRect.left + 'px';
                logoCopy.style.top = logoRect.top + 'px';
                logoCopy.style.width = logoRect.width + 'px';
                logoCopy.style.height = logoRect.height + 'px';
                logoCopy.style.zIndex = '9999';
                document.body.appendChild(logoCopy);

                // Восстанавливаем исходное состояние оригинального логотипа и transition
                if (!wasStraightBeforeClick) {
                    logo.classList.remove('straight');
                }
                logo.style.transition = originalTransition; // Восстанавливаем оригинальный transition

                logo.style.opacity = '0.01';
                logo.style.pointerEvents = 'none';
                logo.removeEventListener('click', logoClickListener);

                logoCopy.addEventListener('animationend', () => {
                    logoCopy.remove();
                    animateCarriedLogo(logo, logoClickListener);
                }, { once: true });
            }, 350); // 350ms, чтобы дать время для завершения 300ms CSS transition
        } else {
            // Для обычных кликов просто переключаем класс. CSS transition сделает анимацию.
            logo.classList.toggle('straight');
        }
    };

    if (logo) {
        logo.addEventListener('click', logoClickListener);
    }

    function animateCarriedLogo(originalLogo, listener) {
        const randomIndex = Math.floor(Math.random() * stompingSounds.length);
        stompingSounds[randomIndex].play();
        stompingSounds[randomIndex].fade(0, 0.4, 2000);

        const emojiPairs = [
            { left: '🐱', right: '🐶' },
            { left: '👵', right: '👴' },
            { left: '👨', right: '👩' },
            { left: '😎', right: '😔' }
        ];

        const randomPair = emojiPairs[Math.floor(Math.random() * emojiPairs.length)];

        const animationContainer = document.createElement('div');
        animationContainer.classList.add('carried-logo-animation-container');
        animationContainer.style.position = 'fixed';
        animationContainer.style.zIndex = '10000';

        const wasOriginalLogoStraight = originalLogo.classList.contains('straight');
        const originalTransition = originalLogo.style.transition; // Сохраняем оригинальный transition
        originalLogo.style.transition = 'none'; // Временно отключаем transition

        originalLogo.classList.add('straight'); // Принудительно делаем прямым

        // Принудительная перерисовка
        void originalLogo.offsetWidth;

        animationContainer.style.top = `${originalLogo.getBoundingClientRect().top}px`;
        animationContainer.style.left = `${originalLogo.getBoundingClientRect().left}px`;
        animationContainer.style.transform = 'translateX(-100vw)';
        document.body.appendChild(animationContainer);

        // Восстанавливаем исходное состояние класса 'straight' и transition
        if (!wasOriginalLogoStraight) {
            originalLogo.classList.remove('straight');
        }
        originalLogo.style.transition = originalTransition; // Восстанавливаем оригинальный transition

        const leftEmoji = document.createElement('span');
        leftEmoji.textContent = randomPair.left;
        leftEmoji.classList.add('animal-emoji');
        leftEmoji.style.position = 'absolute';
        leftEmoji.style.left = '-60px';
        leftEmoji.style.top = '0';
        leftEmoji.style.fontSize = '50px';
        animationContainer.appendChild(leftEmoji);

        const rightEmoji = document.createElement('span');
        rightEmoji.textContent = randomPair.right;
        rightEmoji.classList.add('animal-emoji');
        rightEmoji.style.position = 'absolute';
        rightEmoji.style.left = `${originalLogo.getBoundingClientRect().width + 10}px`;
        rightEmoji.style.top = '0';
        rightEmoji.style.fontSize = '50px';
        animationContainer.appendChild(rightEmoji);

        const carriedLogo = originalLogo.cloneNode(true);
        carriedLogo.classList.add('carried-logo-on-animals');
        carriedLogo.style.position = 'absolute';
        carriedLogo.style.left = '0';
        carriedLogo.style.top = '0';
        carriedLogo.style.width = originalLogo.getBoundingClientRect().width + 'px';
        carriedLogo.style.height = originalLogo.getBoundingClientRect().height + 'px';
        carriedLogo.style.opacity = '1';
        animationContainer.appendChild(carriedLogo);

        animationContainer.classList.add('slide-in-animation');

        animationContainer.addEventListener('animationend', (event) => {
            if (event.animationName === 'slide-in-keyframes') {
                carriedLogo.remove();
                originalLogo.style.opacity = '1';
                originalLogo.style.pointerEvents = 'auto';
                originalLogo.classList.add('straight');
                originalLogo.addEventListener('click', listener);
                logoClickCount = 0;
                logoPlaceSound.play(); // Воспроизводим звук установки логотипа

                animationContainer.classList.remove('slide-in-animation');
                animationContainer.classList.add('slide-out-animation');
            } else if (event.animationName === 'slide-out-keyframes') {
                stompingSounds.forEach(sound => {
                    sound.fade(0.4, 0, 500);
                    setTimeout(() => sound.stop(), 500);
                    setTimeout(() => sound.stop(), 500);
                });
                setTimeout(() => {
                    fallSound.fade(0.7, 0, 1500); // Затухание с текущей громкости до 0 за 1.5 секунды
                }, 2000); // Начать затухание через 2 секунды после завершения анимации
                setTimeout(() => fallSound.stop(), 4000); // Остановить звук после завершения затухания
                animationContainer.remove();
            }
        }, { once: false });
    }
}
