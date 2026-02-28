const button = document.querySelector('.lang-button');
const menu = document.querySelector('.lang-menu');

button.addEventListener('click', () => {
    menu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
        menu.classList.remove('active');
    }
});