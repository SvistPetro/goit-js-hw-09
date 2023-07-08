import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const daysContent = document.querySelector('span[data-days]');
const hoursContent = document.querySelector('span[data-hours]');
const minutesContent = document.querySelector('span[data-minutes]');
const secondsContent = document.querySelector('span[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selDate = selectedDates[0];
      selectDate = selDate.getTime();
      if(selectDate <= Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        return;
      }
      startBtn.disabled = false;
    },
};
let selectDate = 0;
let timeLeft = 0;
let setIntervalId = null;

flatpickr("input#datetime-picker", options);

startBtn.addEventListener('click', onStartClick);

function onStartClick(evt) {
  setIntervalId = setInterval(calcDate, 1000);
};

function calcDate() {
  if(selectDate <= Date.now()) {
    clearInterval(setIntervalId);
    return;
  }

  timeLeft = selectDate - Date.now();
  const timeLeftMass = convertMs(timeLeft);

  const days = timeLeftMass.days;
  const hours = timeLeftMass.hours;
  const minutes = timeLeftMass.minutes;
  const seconds = timeLeftMass.seconds;

  daysContent.textContent = addLeadingZero(days);
  hoursContent.textContent = addLeadingZero(hours);
  minutesContent.textContent = addLeadingZero(minutes);
  secondsContent.textContent = addLeadingZero(seconds);
};

function addLeadingZero(value) {
  const val = value.toString();
  return val.padStart(2, '0');
};

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