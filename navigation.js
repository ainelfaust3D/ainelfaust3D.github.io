export function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-button:not(#mute-button)');

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
}