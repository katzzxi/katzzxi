const skills = document.querySelectorAll('.skill');
const introTitle = document.querySelector('.intro h1');
const portfolioTitle = document.querySelector('.portfolio-title');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const showMoreButton = document.querySelector('.show-more');
const portfolioExtra = document.querySelector('.portfolio-extra');
const extraItems = document.querySelectorAll('.portfolio-item.extra');
const mainPhoto = document.querySelector('.main-photo');
const posterImages = document.querySelectorAll('.poster-img');
const contactPhoto = document.querySelector('.contact-photo');
const aboutLink = document.querySelector('.about-projects-link');
const aboutModal = document.getElementById('aboutModal');
const aboutModalClose = document.querySelector('.about-modal-close');

// Function to shuffle array (for random animation order)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to get random animation direction
function getRandomDirection() {
    const directions = [
        'translateX(-200px)', // слева
        'translateX(200px)',  // справа
        'translateY(-200px)', // сверху
        'translateY(200px)'   // снизу
    ];
    return directions[Math.floor(Math.random() * directions.length)];
}

function checkScroll() {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollY = window.scrollY;

    // Анимация для intro
    let maxFontSize, minFontSize;
    if (window.innerWidth <= 768) {
        maxFontSize = Math.max(28, window.innerWidth * 0.09); // 9vw, минимум 28px для телефонов
        minFontSize = 20; // Минимальный размер для телефонов
    } else if (window.innerWidth <= 1024) {
        maxFontSize = Math.max(40, window.innerWidth * 0.06); // 6vw, минимум 40px для планшетов
        minFontSize = 28; // Минимальный размер для планшетов
    } else {
        maxFontSize = Math.max(100, window.innerWidth * 0.10); // 10vw, минимум 100px для десктопа
        minFontSize = 40; // Минимальный размер для десктопа
    }

    const maxScroll = windowHeight * 0.5;
    const fontSize = Math.max(minFontSize, maxFontSize - (scrollY / maxScroll) * (maxFontSize - minFontSize));
    const opacity = Math.max(0.3, 1 - (scrollY / maxScroll) * 0.7);
    introTitle.style.fontSize = `${fontSize}px`;
    introTitle.style.opacity = opacity;

    // Анимация для навыков
    skills.forEach(skill => {
        const rect = skill.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
            skill.classList.add('visible');
        } else {
            skill.classList.remove('visible');
        }
    });

    // Анимация для заголовка портфолио
    const portfolioRect = portfolioTitle.getBoundingClientRect();
    if (portfolioRect.top <= windowHeight * 0.8) {
        portfolioTitle.classList.add('visible');
    }

    // Анимация для дополнительных элементов портфолио
    if (portfolioExtra.classList.contains('visible')) {
        extraItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
                item.classList.add('visible');
            }
        });
    }

    // Анимация для главного фото в альбоме
    const mainPhotoRect = mainPhoto.getBoundingClientRect();
    if (mainPhotoRect.top <= windowHeight * 0.8 && mainPhotoRect.bottom >= 0) {
        mainPhoto.classList.add('visible');
    } else {
        mainPhoto.classList.remove('visible');
    }

    // Анимация для постеров
    const postersSection = document.querySelector('.posters');
    const postersRect = postersSection.getBoundingClientRect();
    if (postersRect.top <= windowHeight * 0.9 && postersRect.bottom >= 0) {
        const shuffledPosters = shuffleArray([...posterImages]);
        shuffledPosters.forEach((img, index) => {
            img.style.transform = getRandomDirection();
            setTimeout(() => {
                img.classList.add('visible');
            }, index * 200);
        });
    } else {
        posterImages.forEach(img => {
            img.classList.remove('visible');
            img.style.transform = getRandomDirection();
        });
    }

    // Анимация для фото в контактном блоке
    const contactPhotoRect = contactPhoto.getBoundingClientRect();
    if (contactPhotoRect.top <= windowHeight * 0.8 && contactPhotoRect.bottom >= 0) {
        contactPhoto.classList.add('visible');
    } else {
        contactPhoto.classList.remove('visible');
    }
}

// Обработчик клика для кнопки "Показать"
showMoreButton.addEventListener('click', () => {
    portfolioExtra.classList.add('visible');
    showMoreButton.style.display = 'none';
    checkScroll();
});

// Обработчик клика для элементов портфолио
portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const id = item.getAttribute('data-id');
        // Сохраняем возможность добавления других действий
    });
});

// Обработчик клика для изображений в portfolio-extra для модального окна
const zoomImages = document.querySelectorAll('.zoom-img');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
let scale = 1;

zoomImages.forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = 'flex';
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        scale = 1;
        modalImage.style.transform = `scale(${scale})`;
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    scale = 1;
    modalImage.style.transform = `scale(${scale})`;
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        scale = 1;
        modalImage.style.transform = `scale(${scale})`;
    }
});

zoomInBtn.addEventListener('click', () => {
    scale = Math.min(scale + 0.2, 3);
    modalImage.style.transform = `scale(${scale})`;
});

zoomOutBtn.addEventListener('click', () => {
    scale = Math.max(scale - 0.2, 1);
    modalImage.style.transform = `scale(${scale})`;
});

modalImage.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 3);
    modalImage.style.transform = `scale(${scale})`;
}, { passive: false });

// Обработчик клика для ссылки "О проектах"
aboutLink.addEventListener('click', (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    aboutModal.style.display = 'flex';
    setTimeout(() => {
        aboutModal.classList.add('visible'); // Добавляем класс для анимации
    }, 10); // Небольшая задержка для плавного появления
});

// Обработчик клика для закрытия модального окна
aboutModalClose.addEventListener('click', () => {
    aboutModal.classList.remove('visible');
    setTimeout(() => {
        aboutModal.style.display = 'none'; // Скрываем после завершения анимации
    }, 600); // Время соответствует длительности transition (0.6s)
});

// Закрытие модального окна при клике на фон
aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        aboutModal.classList.remove('visible');
        setTimeout(() => {
            aboutModal.style.display = 'none';
        }, 600);
    }
});

// Закрытие модального окна по клавише Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal.style.display === 'flex') {
        aboutModal.classList.remove('visible');
        setTimeout(() => {
            aboutModal.style.display = 'none';
        }, 600);
    }
});

window.addEventListener('scroll', checkScroll);
checkScroll();

// Закрытие модального окна по клавише Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        scale = 1;
        modalImage.style.transform = `scale(${scale})`;
    }
});

// Закрытие модального окна по клику на фон
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        scale = 1;
        modalImage.style.transform = `scale(${scale})`;
    }
});