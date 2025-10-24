import { openLightbox } from './lightbox.js';

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
    const portfolioGallery = document.getElementById('portfolio-gallery');
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
                openLightbox(item.src, category, index, portfolioItems);
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

export function initPortfolio() {
    const tabButtons = document.querySelectorAll('.tab-button');

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
}