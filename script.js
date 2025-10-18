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

    // Рендерим портфолио по умолчанию (первая вкладка)
    renderPortfolio('3d_print');
});