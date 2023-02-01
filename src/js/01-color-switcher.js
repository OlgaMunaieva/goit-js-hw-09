function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;

/**
 *by clicking on the start button makes it inactive, and the stop button is active, launches the function of randomly obtaining a color and sets it to the body
 */
buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  timerId = setInterval(
    () => (bodyEl.style.backgroundColor = getRandomHexColor()),
    1000
  );
});

buttonStop.addEventListener('click', () => {
  buttonStart.disabled = false;
  buttonStop.disabled = true;
  clearInterval(timerId);
});
