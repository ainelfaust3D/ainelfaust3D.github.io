export function openLightbox(imageSrc, category, index, portfolioItems) {
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
    prevBtn.innerHTML = '&#10094;';
    prevBtn.addEventListener('click', () => {
        navigateLightbox(-1, category, portfolioItems);
    });

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('lightbox-nav', 'next');
    nextBtn.innerHTML = '&#10095;';
    nextBtn.addEventListener('click', () => {
        navigateLightbox(1, category, portfolioItems);
    });

    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    document.body.appendChild(lightbox);
    document.body.classList.add('no-scroll'); // Добавляем класс для отключения прокрутки страницы

    // Обновляем текущий индекс изображения для навигации
    lightbox.dataset.currentCategory = category;
    lightbox.dataset.currentIndex = index;

    // Обработчик событий клавиатуры для навигации
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            navigateLightbox(-1, category, portfolioItems);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1, category, portfolioItems);
        } else if (e.key === 'Escape') { // Добавляем закрытие по Escape
            lightbox.remove();
            document.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('no-scroll'); // Удаляем класс при закрытии
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

function navigateLightbox(direction, category, portfolioItems) {
    const lightbox = document.getElementById('lightbox');
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    const items = portfolioItems[category];

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = items.length - 1;
    } else if (currentIndex >= items.length) {
        currentIndex = 0;
    }

    const newImage = items[currentIndex];
    const imgElement = lightbox.querySelector('img');
    if (imgElement) {
        imgElement.src = newImage.src;
        imgElement.alt = newImage.alt;
        lightbox.dataset.currentIndex = currentIndex;

        // Сброс масштаба и положения при перелистывании
        let scale = 1;
        let translateX = 0;
        let translateY = 0;
        imgElement.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        imgElement.classList.remove('zoomable');
    }
}