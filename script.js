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

    // Анимация фона с реакцией на движение мыши
    const backgroundAnimation = document.querySelector('.background-animation');
    const asciiAnimals = ['🐱', '🐰', '🌸', '✨', '💖', '🌈', '🍓', '🎀', '🌟', '🐾']; // Добавьте больше по желанию

    function createAnimatedShape(x, y) {
        const shape = document.createElement('span'); // Используем span для текста
        shape.classList.add('animated-shape');
        const randomAnimal = asciiAnimals[Math.floor(Math.random() * asciiAnimals.length)];
        shape.textContent = randomAnimal;
        const size = Math.random() * 30 + 20; // Размер шрифта от 20px до 50px
        shape.style.fontSize = `${size}px`;
        shape.style.left = `${x - size / 2}px`;
        shape.style.top = `${y - size / 2}px`;
        shape.style.opacity = Math.random() * 0.7 + 0.3; // Прозрачность от 0.3 до 1
        shape.style.color = `hsl(${Math.random() * 360}, 70%, 70%)`; // Случайный пастельный цвет
        backgroundAnimation.appendChild(shape);

        // Удаляем фигуру через некоторое время
        setTimeout(() => {
            shape.remove();
        }, 5000); // Фигура исчезает через 5 секунд
    }

    document.addEventListener('mousemove', (e) => {
        // Создаем новую фигуру только с некоторой вероятностью, чтобы не перегружать DOM
        if (Math.random() < 0.1) { // 10% шанс на создание фигуры при каждом движении мыши
            createAnimatedShape(e.clientX, e.clientY);
        }
    });

    // Рендерим портфолио по умолчанию (первая вкладка)
    renderPortfolio('3d_print');
});