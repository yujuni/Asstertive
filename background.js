const body = document.querySelector('body');
const image = document.createElement('img');
const refresh = document.querySelector('div#refresh-btn');

const maxIndex = 3;

function handleClick() {
    let currentIndex = Math.ceil(Math.random() * maxIndex);
    image.src = `${currentIndex}.jpg`;
    body.appendChild(image);
}

handleClick();
refresh.addEventListener('click', handleClick);