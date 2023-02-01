function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;

/**
 *by clicking on the start button makes it inactive, and the stop button is active, launches the function of randomly obtaining a color and setting it on the body every second
 */
buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  timerId = setInterval(
    () => (bodyEl.style.backgroundColor = getRandomHexColor()),
    1000
  );
});

/**
 *by clicking on the stop button makes it inactive, and the start button is active, stops the function of randomly obtaining a color and setting it on the body every second
 */
buttonStop.addEventListener('click', () => {
  buttonStart.disabled = false;
  buttonStop.disabled = true;
  clearInterval(timerId);
});
