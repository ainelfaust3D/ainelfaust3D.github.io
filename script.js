document.addEventListener('DOMContentLoaded', () => {
    const portfolioGallery = document.getElementById('portfolio-gallery');
    const tabButtons = document.querySelectorAll('.tab-button');

    // Структура для хранения данных портфолио (только изображения)
    // Вам нужно будет вручную заполнить этот объект путями к вашим изображениям.
    // Пример: 'images/3d_print/image1.jpg'
    const portfolioItems = {
        '3d_print': [
            { src: 'images/3d_print/1.png', alt: '3D печать 1', title: '3D печать 1', description: 'Описание 3D печати 1.' },
            { src: 'images/3d_print/2.png', alt: '3D печать 2', title: '3D печать 2', description: 'Описание 3D печати 2.' },
            { src: 'images/3d_print/3.png', alt: '3D печать 3', title: '3D печать 3', description: 'Описание 3D печати 3.' }
        ],
        'games': [
            { src: 'images/games/1.png', alt: 'Игра 1', title: 'Игра 1', description: 'Описание игры 1.' },
            { src: 'images/games/2.png', alt: 'Игра 2', title: 'Игра 2', description: 'Описание игры 2.' },
            { src: 'images/games/3.png', alt: 'Игра 3', title: 'Игра 3', description: 'Описание игры 3.' }
        ],
        'technical_models': [
            { src: 'images/technical_models/1.png', alt: 'Техническая модель 1', title: 'Техническая модель 1', description: 'Описание технической модели 1.' },
            { src: 'images/technical_models/2.png', alt: 'Техническая модель 2', title: 'Техническая модель 2', description: 'Описание технической модели 2.' },
            { src: 'images/technical_models/3.png', alt: 'Техническая модель 3', title: 'Техническая модель 3', description: 'Описание технической модели 3.' }
        ]
    };

    function renderPortfolio(category) {
        portfolioGallery.innerHTML = ''; // Очищаем галерею
        const items = portfolioItems[category];

        if (items && items.length > 0) {
            items.forEach(item => {
                const portfolioItem = document.createElement('div');
                portfolioItem.classList.add('portfolio-item');

                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.alt;

                const info = document.createElement('div');
                info.classList.add('portfolio-item-info');

                const title = document.createElement('h3');
                title.textContent = item.title;

                const description = document.createElement('p');
                description.textContent = item.description;

                info.appendChild(title);
                info.appendChild(description);
                portfolioItem.appendChild(img);
                portfolioItem.appendChild(info);
                portfolioGallery.appendChild(portfolioItem);
            });
        } else {
            portfolioGallery.innerHTML = '<p>В этой категории пока нет работ.</p>';
        }
    }

    // Обработчики событий для кнопок вкладок
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            renderPortfolio(category);
        });
    });

    // Улучшенная анимация фона с реакцией на движение мыши
    const backgroundAnimation = document.querySelector('.background-animation');
    const emojis = ['🐱', '🐰', '🌸', '✨', '💖', '🌈', '🍓', '🎀', '🌟', '🐾', '🦋', '🌺', '💫', '🦄', '🌙', '⭐', '🎈', '🎨', '🎭', '🎪'];
    const animatedShapes = [];
    let mouseX = 0, mouseY = 0;
    let animationId;

    // Функция для равномерного распределения эмодзи
    function getRandomPosition() {
        const margin = 50; // Отступ от краев
        const x = Math.random() * (backgroundAnimation.offsetWidth - margin * 2) + margin;
        const y = Math.random() * (backgroundAnimation.offsetHeight - margin * 2) + margin;
        return { x, y };
    }

    function createAnimatedShape(x, y, isMouseTriggered = false) {
        const shape = document.createElement('span');
        shape.classList.add('animated-shape');
        
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        shape.textContent = randomEmoji;
        
        const size = Math.random() * 40 + 15; // Размер от 15px до 55px
        shape.style.fontSize = `${size}px`;

        // Добавляем случайную анимацию
        const animations = ['', 'bounce', 'spin'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        if (randomAnimation) {
            shape.classList.add(randomAnimation);
        }

        // Позиционирование - равномерное распределение
        let initialX, initialY;
        if (x !== undefined && y !== undefined && isMouseTriggered) {
            // Если это триггер от мыши, используем координаты мыши
            initialX = x;
            initialY = y;
        } else {
            // Иначе используем равномерное распределение
            const pos = getRandomPosition();
            initialX = pos.x;
            initialY = pos.y;
        }

        shape.style.left = `${initialX - size / 2}px`;
        shape.style.top = `${initialY - size / 2}px`;
        shape.style.opacity = Math.random() * 0.8 + 0.2;
        shape.style.color = `hsl(${Math.random() * 60 + 300}, 80%, 70%)`; // Пастельные цвета
        
        backgroundAnimation.appendChild(shape);
        animatedShapes.push(shape);

        // Плавное исчезание через случайное время (от 10 до 20 секунд)
        const fadeTime = Math.random() * 10000 + 10000; // 10-20 секунд
        setTimeout(() => {
            shape.classList.add('fade-out');
            // Увеличиваем время для плавного исчезания
            setTimeout(() => {
                if (shape.parentNode) {
                    shape.parentNode.removeChild(shape);
                }
                const index = animatedShapes.indexOf(shape);
                if (index > -1) {
                    animatedShapes.splice(index, 1);
                }
            }, 1500); // Даем больше времени на исчезание
        }, fadeTime);

        // Если это триггер от мыши, добавляем дополнительный эффект
        if (isMouseTriggered) {
            shape.style.transform = 'scale(1.5)';
            setTimeout(() => {
                shape.style.transform = '';
            }, 200);
        }
    }

    // Создаем начальные фигуры с задержкой для равномерного распределения
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createAnimatedShape();
        }, i * 300); // Создаем по одному эмодзи каждые 300мс
    }

    // Улучшенный параллакс эффект
    function updateParallax() {
        const centerX = backgroundAnimation.offsetWidth / 2;
        const centerY = backgroundAnimation.offsetHeight / 2;

        const offsetX = (mouseX - centerX) * 0.03;
        const offsetY = (mouseY - centerY) * 0.03;

        animatedShapes.forEach((shape, index) => {
            const depth = (parseFloat(shape.style.fontSize) / 55) * 2; // Более выраженный параллакс
            const delay = index * 0.1; // Добавляем небольшую задержку для волнового эффекта
            
            shape.style.transform = `translate(${offsetX * depth}px, ${offsetY * depth}px) translateZ(${delay}px)`;
        });

        animationId = requestAnimationFrame(updateParallax);
    }

    let lastMouseTime = 0;
    let mouseMoveCount = 0;

    // Обработчик движения мыши
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const currentTime = Date.now();
        mouseMoveCount++;

        // Создаем новые фигуры при движении мыши с контролируемой частотой
        // Не чаще чем раз в 2 секунды и только после 10 движений мыши
        if (mouseMoveCount > 10 && currentTime - lastMouseTime > 2000 && Math.random() < 0.3) {
            createAnimatedShape(mouseX, mouseY, true);
            lastMouseTime = currentTime;
            mouseMoveCount = 0; // Сбрасываем счетчик
        }

        // Ограничиваем количество фигур
        if (animatedShapes.length > 20) {
            const oldestShape = animatedShapes.shift();
            if (oldestShape && oldestShape.parentNode) {
                oldestShape.classList.add('fade-out');
                setTimeout(() => {
                    if (oldestShape.parentNode) {
                        oldestShape.parentNode.removeChild(oldestShape);
                    }
                }, 1500);
            }
        }
    });

    // Запускаем параллакс анимацию
    updateParallax();

    // Система автоматического пополнения эмодзи
    function maintainEmojiCount() {
        const targetCount = 15;
        const currentCount = animatedShapes.length;
        
        if (currentCount < targetCount) {
            const needed = targetCount - currentCount;
            for (let i = 0; i < needed; i++) {
                setTimeout(() => {
                    createAnimatedShape();
                }, i * 500); // Создаем с интервалом 500мс
            }
        }
    }

    // Проверяем количество эмодзи каждые 5 секунд
    setInterval(maintainEmojiCount, 5000);

    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        // Пересоздаем фигуры при изменении размера
        animatedShapes.forEach(shape => {
            if (shape.parentNode) {
                shape.parentNode.removeChild(shape);
            }
        });
        animatedShapes.length = 0;
        
        for (let i = 0; i < 15; i++) {
            createAnimatedShape();
        }
    });

    // Рендерим портфолио по умолчанию (первая вкладка)
    renderPortfolio('3d_print');
});