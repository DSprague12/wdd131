let selectElem = document.querySelector('select');
let body = document.querySelector('body');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        body.style.backgroundColor = "#333";
        body.style.color = "white";
        logo.src = "byui-logo-white.png";
    } else {
        body.style.backgroundColor = "white";
        body.style.color = "black";
        logo.src = "byui-logo-blue.webp";
    }
}           
                    