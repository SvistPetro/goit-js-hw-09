const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

function changeColor() {
    body.style.backgroundColor = getRandomHexColor();
}

function onStartClick(evt) {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalId = setInterval(changeColor, 1000);
};

function onStopClick(evt) {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(intervalId);
};

