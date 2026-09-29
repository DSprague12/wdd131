const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menu-button');

menuButton.addEventListener('click', () => {
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});
