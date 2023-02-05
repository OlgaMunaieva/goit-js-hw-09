// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const buttonStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hourstEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let difference;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    buttonStart.disabled = true;
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);

let intervalId;

buttonStart.disabled = true;

buttonStart.addEventListener('click', handleButtonBehaviour);

function handleButtonBehaviour() {
  intervalId = setInterval(countDownTimeToNY, 1000);
  buttonStart.disabled = true;
}

function countDownTimeToNY() {
  difference = calendar.selectedDates[0] - new Date();
  if (difference >= 1) {
    const ob = convertMs(difference);
    daysEl.textContent = addLeadingZero(ob.days);
    hourstEl.textContent = addLeadingZero(ob.hours);
    minutesEl.textContent = addLeadingZero(ob.minutes);
    secondsEl.textContent = addLeadingZero(ob.seconds);
  } else {
    clearInterval(intervalId);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
