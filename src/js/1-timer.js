import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const value = document.querySelectorAll('.value');

let userSelectedDate = null;
startBtn.disabled = true;
let timerId = null;

const messageConfig = {
  position: 'topRight',
  timeout: 3000,
  transitionIn: 'fadeInDown',
};

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        ...messageConfig,
      });

      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
  },
};

function onStartClick() {
  startBtn.disabled = true;
  dateInput.disabled = true;

  timerId = setInterval(() => {
    const timeTime = userSelectedDate - new Date();
    if (timeTime <= 0) {
      startBtn.disabled = false;
      dateInput.disabled = false;
      clearInterval(timerId);
      updateClockface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    const time = convertMs(timeTime);
    updateClockface(time);
  }, 1000);
}

const fp = flatpickr(dateInput, options);
startBtn.addEventListener('click', onStartClick);

function updateClockface(time) {
  const { days, hours, minutes, seconds } = time;
  value.forEach(el => {
    if (el.dataset.days !== undefined) {
      el.textContent = addLeadingZero(days);
    } else if (el.dataset.hours !== undefined) {
      el.textContent = addLeadingZero(hours);
    } else if (el.dataset.minutes !== undefined) {
      el.textContent = addLeadingZero(minutes);
    } else if (el.dataset.seconds !== undefined) {
      el.textContent = addLeadingZero(seconds);
    }
  });
}

function addLeadingZero(time) {
  return String(time).padStart(2, '0');
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
