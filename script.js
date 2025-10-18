document.addEventListener('DOMContentLoaded', () => {
    const portfolioGallery = document.getElementById('portfolio-gallery');
    const tabButtons = document.querySelectorAll('.tab-button');

    // Пример структуры данных для портфолио.
    // Вам нужно будет заполнить это своими данными.
    // 'category' соответствует 'data-category' атрибуту кнопок вкладок.
    // 'type': 'model' для 3D-моделей (glb/gltf), 'image' для скриншотов.
    // 'src': путь к файлу.
    // 'alt': альтернативный текст или название модели.
    const portfolioItems = {
        '3d_print': [
            // { type: 'model', src: '3d/3d_print/model1.glb', alt: 'Модель для 3D печати 1', title: 'Название Модели 1', description: 'Описание модели для 3D печати.' },
            // { type: 'image', src: 'images/3d_print/screenshot1.jpg', alt: 'Скриншот 3D печати 1', title: 'Название Скриншота 1', description: 'Описание скриншота 3D печати.' }
        ],
        'games': [
            // { type: 'model', src: '3d/games/game_model1.glb', alt: 'Игровая модель 1', title: 'Название Игровой Модели 1', description: 'Описание игровой модели.' },
            // { type: 'image', src: 'images/games/game_screenshot1.jpg', alt: 'Скриншот игры 1', title: 'Название Скриншота Игры 1', description: 'Описание скриншота игры.' }
        ],
        'formwork': [
            // { type: 'model', src: '3d/formwork/formwork_model1.glb', alt: 'Модель опалубки 1', title: 'Название Модели Опалубки 1', description: 'Описание модели опалубки.' },
            // { type: 'image', src: 'images/formwork/formwork_screenshot1.jpg', alt: 'Скриншот опалубки 1', title: 'Название Скриншота Опалубки 1', description: 'Описание скриншота опалубки.' }
        ]
    };

    function renderPortfolio(category) {
        portfolioGallery.innerHTML = ''; // Очищаем галерею
        const items = portfolioItems[category];

        if (items && items.length > 0) {
            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('portfolio-item');

                if (item.type === 'model') {
                    const modelViewer = document.createElement('model-viewer');
                    modelViewer.setAttribute('src', item.src);
                    modelViewer.setAttribute('alt', item.alt);
                    modelViewer.setAttribute('auto-rotate', '');
                    modelViewer.setAttribute('camera-controls', '');
                    modelViewer.setAttribute('ar', ''); // Добавляем AR для мобильных устройств
                    itemDiv.appendChild(modelViewer);
                } else if (item.type === 'image') {
                    const img = document.createElement('img');
                    img.setAttribute('src', item.src);
                    img.setAttribute('alt', item.alt);
                    itemDiv.appendChild(img);
                }

                const title = document.createElement('h3');
                title.textContent = item.title;
                itemDiv.appendChild(title);

                const description = document.createElement('p');
                description.textContent = item.description;
                itemDiv.appendChild(description);

                portfolioGallery.appendChild(itemDiv);
            });
        } else {
            portfolioGallery.innerHTML = '<p>Нет элементов в этой категории.</p>';
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            renderPortfolio(category);
        });
    });

    // Рендерим первую категорию при загрузке страницы
    renderPortfolio('3d_print');
});