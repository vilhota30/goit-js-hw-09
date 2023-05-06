const DELAY_CHANGE_COLOR = 1000;
let idInitialInterval = null;

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}


refs.btnStop.disabled = true;
refs.btnStart.addEventListener('click', onBtnChangeColor);
refs.btnStop.addEventListener('click', onBtnStopChangeColor);


function onBtnChangeColor() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
    

    idInitialInterval = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, DELAY_CHANGE_COLOR);
}

function onBtnStopChangeColor() {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
    
    clearInterval(idInitialInterval);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

