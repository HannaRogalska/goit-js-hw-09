const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
btnStop.setAttribute('disabled', '');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId;
btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick(element) {
  element.target.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

btnStop.addEventListener('click', onBtnStopClick);

function onBtnStopClick(element) {
  element.target.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');
  clearInterval(intervalId);
}
