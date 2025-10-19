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


    // Новая система эмодзи
    const backgroundAnimation = document.querySelector('.background-animation');
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
    if (logo) {
        logo.addEventListener('click', () => {
            logo.classList.toggle('straight');
        });
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

        currentImageIndex = index; // Устанавливаем текущий индекс
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
        }
    }
});