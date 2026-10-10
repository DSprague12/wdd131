const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('#site-nav');

function setMenuOpen(isOpen) {
    navigation.classList.toggle('hide', !isOpen);
    menuButton.classList.toggle('change', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
});

navigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement && window.matchMedia('(max-width: 699px)').matches) {
        setMenuOpen(false);
    }
});
