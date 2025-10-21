document.addEventListener('DOMContentLoaded', () => {
    const portfolioGallery = document.getElementById('portfolio-gallery');
    const tabButtons = document.querySelectorAll('.tab-button');

    // Структура для хранения данных портфолио (только изображения)
    // Вам нужно будет вручную заполнить этот объект путями к вашим изображениям.
    // Пример: 'images/3d_print/image1.jpg'
    const portfolioItems = {
        '3d_print': [
            { src: 'images/3d_print/1.webp', alt: '3D печать 1' },
            { src: 'images/3d_print/10.webp', alt: '3D печать 10' },
            { src: 'images/3d_print/11.webp', alt: '3D печать 11' },
            { src: 'images/3d_print/12.webp', alt: '3D печать 12' },
            { src: 'images/3d_print/13.webp', alt: '3D печать 13' },
            { src: 'images/3d_print/14.webp', alt: '3D печать 14' },
            { src: 'images/3d_print/15.webp', alt: '3D печать 15' },
            { src: 'images/3d_print/16.webp', alt: '3D печать 16' },
            { src: 'images/3d_print/17.webp', alt: '3D печать 17' },
            { src: 'images/3d_print/18.webp', alt: '3D печать 18' },
            { src: 'images/3d_print/2.webp', alt: '3D печать 2' },
            { src: 'images/3d_print/3.webp', alt: '3D печать 3' },
            { src: 'images/3d_print/4.webp', alt: '3D печать 4' },
            { src: 'images/3d_print/5.webp', alt: '3D печать 5' },
            { src: 'images/3d_print/6.webp', alt: '3D печать 6' },
            { src: 'images/3d_print/7.webp', alt: '3D печать 7' },
            { src: 'images/3d_print/8.webp', alt: '3D печать 8' },
            { src: 'images/3d_print/9.webp', alt: '3D печать 9' }
        ],
        'games': [
            { src: 'images/games/1.webp', alt: 'Игра 1' },
            { src: 'images/games/10.webp', alt: 'Игра 10' },
            { src: 'images/games/11.webp', alt: 'Игра 11' },
            { src: 'images/games/12.webp', alt: 'Игра 12' },
            { src: 'images/games/13.webp', alt: 'Игра 13' },
            { src: 'images/games/14.webp', alt: 'Игра 14' },
            { src: 'images/games/15.webp', alt: 'Игра 15' },
            { src: 'images/games/2.webp', alt: 'Игра 2' },
            { src: 'images/games/3.webp', alt: 'Игра 3' },
            { src: 'images/games/4.webp', alt: 'Игра 4' },
            { src: 'images/games/5.webp', alt: 'Игра 5' },
            { src: 'images/games/6.webp', alt: 'Игра 6' },
            { src: 'images/games/7.webp', alt: 'Игра 7' },
            { src: 'images/games/8.webp', alt: 'Игра 8' },
            { src: 'images/games/9.webp', alt: 'Игра 9' }
        ],
        'creativity': [
            { src: 'images/creativity/1.webp', alt: 'Творчество 1' },
            { src: 'images/creativity/10.webp', alt: 'Творчество 10' },
            { src: 'images/creativity/11.webp', alt: 'Творчество 11' },
            { src: 'images/creativity/12.webp', alt: 'Творчество 12' },
            { src: 'images/creativity/13.webp', alt: 'Творчество 13' },
            { src: 'images/creativity/14.webp', alt: 'Творчество 14' },
            { src: 'images/creativity/15.webp', alt: 'Творчество 15' },
            { src: 'images/creativity/16.webp', alt: 'Творчество 16' },
            { src: 'images/creativity/17.webp', alt: 'Творчество 17' },
            { src: 'images/creativity/18.webp', alt: 'Творчество 18' },
            { src: 'images/creativity/2.webp', alt: 'Творчество 2' },
            { src: 'images/creativity/3.webp', alt: 'Творчество 3' },
            { src: 'images/creativity/4.webp', alt: 'Творчество 4' },
            { src: 'images/creativity/5.webp', alt: 'Творчество 5' },
            { src: 'images/creativity/6.webp', alt: 'Творчество 6' },
            { src: 'images/creativity/7.webp', alt: 'Творчество 7' },
            { src: 'images/creativity/8.webp', alt: 'Творчество 8' },
            { src: 'images/creativity/9.webp', alt: 'Творчество 9' }
        ],
        'master_model': [
            { src: 'images/master_model/1.webp', alt: 'Мастер модель 1' },
            { src: 'images/master_model/2.webp', alt: 'Мастер модель 2' },
            { src: 'images/master_model/3.webp', alt: 'Мастер модель 3' },
            { src: 'images/master_model/4.webp', alt: 'Мастер модель 4' },
            { src: 'images/master_model/5.webp', alt: 'Мастер модель 5' },
            { src: 'images/master_model/6.webp', alt: 'Мастер модель 6' },
            { src: 'images/master_model/7.webp', alt: 'Мастер модель 7' },
            { src: 'images/master_model/8.webp', alt: 'Мастер модель 8' }
        ]
    };

    let currentCategory = '3d_print'; // Добавляем переменную для отслеживания текущей категории
    let currentImageIndex = 0; // Добавляем переменную для отслеживания текущего индекса изображения

    function renderPortfolio(category) {
        portfolioGallery.innerHTML = ''; // Очищаем галерею
        const items = portfolioItems[category];
        currentCategory = category; // Обновляем текущую категорию

        if (items && items.length > 0) {
            items.forEach((item, index) => {
                const portfolioItem = document.createElement('div');
                portfolioItem.classList.add('portfolio-item');
                portfolioItem.style.animationDelay = `${index * 0.1}s`;

                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.alt;
                img.dataset.full = item.src;
                img.dataset.index = index; // Добавляем индекс изображения

                img.addEventListener('click', () => {
                    openLightbox(item.src, category, index);
                });

                const info = document.createElement('div');
                info.classList.add('portfolio-item-info');

                const title = document.createElement('h3');
                title.textContent = item.title;

                const description = document.createElement('p');
                description.textContent = item.description;

                // info.appendChild(title);
                // info.appendChild(description);
                portfolioItem.appendChild(img);
                // portfolioItem.appendChild(info);
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


    // Handle navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.dataset.target;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set initial active state based on current scroll position (optional)
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) { // Adjust offset as needed
                current = '#' + section.getAttribute('id');
            }
        });

        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.target === current) {
                button.classList.add('active');
            }
        });
    });

    // Trigger initial scroll check to set active button on page load
    window.dispatchEvent(new Event('scroll'));


    // Новая система эмодзи
    const backgroundAnimation = document.querySelector('.background-animation');

    // Floating emojis
    const emojiContainer = document.createElement('div');
    const emojis = [
        '😀', '😂', '😍', '🤩', '🥳', '😎', '😇', '🥰', '😋', '😜',
        '👍', '👏', '🙌', '💖', '✨', '🔥', '🌈', '☀️', '🌸', '🌼',
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
        '🍎', '🍓', '🍇', '🍉', '🍍', '🍑', '🍒', '🥝', '🍔', '🍕',
        '🍦', '🍩', '🍪', '🎂', '🍬', '🍭', '🍫', '☕', '🍵', '🥂',
        '🎈', '🎁', '🎉', '🎊', '🎀', '👑', '💎', '💫', '🌟', '✨'
    ];

    function createFloatingEmoji() {
        const emoji = document.createElement('span');
        emoji.classList.add('floating-emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const size = Math.random() * 40 + 20; // Размер от 20px до 60px
        emoji.style.fontSize = `${size}px`;

        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + Math.random() * 100; // Начинаем ниже экрана
        emoji.style.left = `${startX}px`;
        emoji.style.top = `${startY}px`;

        const animationDuration = Math.random() * 10 + 5; // Длительность от 5 до 15 секунд
        emoji.style.animationDuration = `${animationDuration}s`;
        emoji.style.animationDelay = `${Math.random() * 5}s`; // Задержка до 5 секунд

        backgroundAnimation.appendChild(emoji);

        emoji.addEventListener('click', (event) => {
            const clickedEmoji = event.target;
            const rect = clickedEmoji.getBoundingClientRect();

            // Останавливаем текущую анимацию floatAndFade и сбрасываем трансформации
            clickedEmoji.style.animation = 'none';
            clickedEmoji.style.opacity = '1';
            clickedEmoji.style.transform = 'none'; // Сброс всех трансформаций

            clickedEmoji.style.position = 'fixed';
            clickedEmoji.style.left = `${rect.left}px`;
            clickedEmoji.style.top = `${rect.top}px`;
            clickedEmoji.style.zIndex = '1001';
            clickedEmoji.classList.add('falling');

            const randomX = (Math.random() - 0.5) * 400; // -200 to 200 pixels horizontal deviation
            const randomRotation = Math.random() * 1080; // 0 to 1080 degrees rotation
            const fallAnimationDuration = 2 + Math.random() * 2; // 2 to 4 seconds

            clickedEmoji.style.setProperty('--random-x', `${randomX}px`);
            clickedEmoji.style.setProperty('--random-rotation', `${randomRotation}deg`);
            clickedEmoji.style.setProperty('--emoji-size', `${size}px`);
            clickedEmoji.style.animation = `fall ${fallAnimationDuration}s forwards`;

            clickedEmoji.addEventListener('animationend', () => {
                // clickedEmoji.remove(); // Эмодзи остается на экране
                createFloatingEmoji(); // Создаем новый эмодзи взамен
            }, { once: true });
        });
    }

    // Создаем несколько эмодзи при загрузке страницы
    for (let i = 0; i < 30; i++) {
        createFloatingEmoji();
    }

    // Рендерим портфолио по умолчанию (первая вкладка)
    renderPortfolio('3d_print');

    // Обработчик клика для логотипа
    const logo = document.querySelector('.logo');
    let clickCount = 0;

    // Define the click listener function
    const logoClickListener = () => {
        const wasStraightBeforeClick = logo.classList.contains('straight');
        clickCount++;

        if (clickCount === 5) {
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
                clickCount = 0;

                animationContainer.classList.remove('slide-in-animation');
                animationContainer.classList.add('slide-out-animation');
            } else if (event.animationName === 'slide-out-keyframes') {
                animationContainer.remove();
            }
        }, { once: false });
    }

    // Функция для открытия лайтбокса
    function openLightbox(imageSrc, category, index) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.classList.add('active');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = portfolioItems[category][index].alt;

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('lightbox-close');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
        });

        const prevBtn = document.createElement('button');
        prevBtn.classList.add('lightbox-nav', 'prev');
        prevBtn.innerHTML = '&#10094;'; // Левая стрелка
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем закрытие лайтбокса при клике на стрелку
            navigateLightbox(-1, category);
        });

        const nextBtn = document.createElement('button');
        nextBtn.classList.add('lightbox-nav', 'next');
        nextBtn.innerHTML = '&#10095;'; // Правая стрелка
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем закрытие лайтбокса при клике на стрелку
            navigateLightbox(1, category);
        });

        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(prevBtn);
        lightbox.appendChild(nextBtn);
        document.body.appendChild(lightbox);
        document.body.classList.add('no-scroll'); // Добавляем класс для отключения прокрутки страницы

        currentImageIndex = index; // Устанавливаем текущий индекс

        // Обработчик событий клавиатуры для навигации
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1, category);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1, category);
            } else if (e.key === 'Escape') { // Добавляем закрытие по Escape
                lightbox.remove();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Удаляем обработчик событий клавиатуры при закрытии лайтбокса
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
            document.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('no-scroll'); // Удаляем класс при закрытии
        });

        // Закрытие лайтбокса по клику вне картинки
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
                document.removeEventListener('keydown', handleKeyDown);
                document.body.classList.remove('no-scroll'); // Удаляем класс при закрытии
            }
        });

        // Добавляем функциональность масштабирования
        let scale = 1;
        let isDragging = false;
        let startX, startY, translateX = 0, translateY = 0;

        // Обработчик события колесика мыши для масштабирования
        img.addEventListener('wheel', (e) => {
            if (e.ctrlKey) { // Проверяем, нажата ли клавиша Ctrl
                e.preventDefault(); // Предотвращаем масштабирование страницы

                const scaleAmount = 0.1; // Шаг масштабирования
                const oldScale = scale;

                if (e.deltaY < 0) { // Колесико вверх - увеличиваем
                    scale += scaleAmount;
                } else { // Колесико вниз - уменьшаем
                    scale -= scaleAmount;
                }

                scale = Math.max(1, Math.min(scale, 4)); // Ограничиваем масштаб от 1 до 4

                // Корректируем смещение, чтобы масштабирование происходило относительно центра курсора
                const rect = img.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                translateX -= (mouseX - rect.width / 2) * (scale - oldScale) / oldScale;
                translateY -= (mouseY - rect.height / 2) * (scale - oldScale) / oldScale;

                // Ограничиваем смещение, чтобы изображение не выходило за пределы экрана
                const lightboxRect = lightbox.getBoundingClientRect();
                const maxTranslateX = Math.max(0, (rect.width * scale - lightboxRect.width) / 2);
                const maxTranslateY = Math.max(0, (rect.height * scale - lightboxRect.height) / 2);

                translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
                translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));

                img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
                img.classList.toggle('zoomable', scale !== 1);

                if (scale <= 1) {
                    translateX = 0;
                    translateY = 0;
                    scale = 1;
                    img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
                    img.classList.remove('zoomable');
                }
            }
        });

        img.addEventListener('mousedown', (e) => {
            if (scale > 1) {
                e.preventDefault(); // Предотвращаем стандартное поведение перетаскивания браузера
                isDragging = true;
                startX = e.clientX - translateX;
                startY = e.clientY - translateY;
                img.style.cursor = 'grabbing';
            }
        });

        img.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            let newTranslateX = e.clientX - startX;
            let newTranslateY = e.clientY - startY;

            // Ограничиваем смещение, чтобы изображение не выходило за пределы лайтбокса
            const rect = img.getBoundingClientRect();
            const lightboxRect = lightbox.getBoundingClientRect();

            const maxTranslateX = Math.max(0, (rect.width * scale - lightboxRect.width) / 2);
            const maxTranslateY = Math.max(0, (rect.height * scale - lightboxRect.height) / 2);

            translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, newTranslateX));
            translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, newTranslateY));

            img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        });

        img.addEventListener('mouseup', () => {
            isDragging = false;
            if (scale > 1) {
                img.style.cursor = 'grab';
            } else {
                img.style.cursor = 'zoom-in';
            }
        });

        img.addEventListener('mouseleave', () => {
            isDragging = false;
            if (scale > 1) {
                img.style.cursor = 'grab';
            } else {
                img.style.cursor = 'zoom-in';
            }
        });

        // Добавляем зум для изображений в лайтбоксе (touch events)
        let startDistance = 0;
        let initialScale = 1;
        let initialTranslateX = 0;
        let initialTranslateY = 0;
        let lastTouchX = 0;
        let lastTouchY = 0;

        img.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Предотвращаем стандартное поведение браузера (зум страницы)
            if (e.touches.length === 2) {
                startDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                initialScale = scale;
                isDragging = false; // Отключаем петаскивание при мультитаче
            } else if (e.touches.length === 1) {
                isDragging = true;
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
                initialTranslateX = translateX;
                initialTranslateY = translateY;
            }
        });

        img.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length === 2) {
                const currentDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                scale = (currentDistance / startDistance) * initialScale;
                scale = Math.max(1, Math.min(scale, 4)); // Ограничиваем масштаб от 1 до 4

                img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
                img.classList.toggle('zoomable', scale !== 1);
            } else if (e.touches.length === 1 && isDragging) {
                const deltaX = e.touches[0].clientX - lastTouchX;
                const deltaY = e.touches[0].clientY - lastTouchY;

                let newTranslateX = initialTranslateX + deltaX;
                let newTranslateY = initialTranslateY + deltaY;

                const rect = img.getBoundingClientRect();
                const lightboxRect = lightbox.getBoundingClientRect();

                const maxTranslateX = Math.max(0, (rect.width * scale - lightboxRect.width) / 2);
                const maxTranslateY = Math.max(0, (rect.height * scale - lightboxRect.height) / 2);

                translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, newTranslateX));
                translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, newTranslateY));

                img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            }
        });

        img.addEventListener('touchend', () => {
            isDragging = false;
            if (scale <= 1) {
                scale = 1;
                translateX = 0;
                translateY = 0;
            }
            if (scale > 4) scale = 4;
            img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            img.classList.toggle('zoomable', scale !== 1);
        });
    }

    // Функция для навигации по лайтбоксу
    function navigateLightbox(direction, category) {
        const items = portfolioItems[category];
        currentImageIndex = (currentImageIndex + direction + items.length) % items.length;
        const newImageSrc = items[currentImageIndex].src;
        const lightboxImg = document.querySelector('#lightbox img');
        if (lightboxImg) {
            lightboxImg.src = newImageSrc;
            lightboxImg.alt = items[currentImageIndex].alt;

            // Сброс масштаба и положения при перелистывании
            scale = 1;
            translateX = 0;
            translateY = 0;
            lightboxImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            lightboxImg.classList.remove('zoomable');
        }
    }
});