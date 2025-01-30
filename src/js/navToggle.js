const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

document.addEventListener('DOMContentLoaded', () => {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});
