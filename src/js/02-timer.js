import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let SELECTED_DATE = new Date().getTime();
console.log(SELECTED_DATE)
let difTime;
let intervalId;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span.value[data-days]'),
  hoursValue: document.querySelector('span.value[data-hours]'),
  minutesValue: document.querySelector('span.value[data-minutes]'),
  secondsValue: document.querySelector('span.value[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};


refs.btnStart.disabled = true;

refs.btnStart.addEventListener('click', onStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    SELECTED_DATE = selectedDates[0];
  
    if (SELECTED_DATE <= new Date().getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
      refs.input.disabled = true;
      Notiflix.Notify.success('Good. Go ahead! Click Start button');
    }
  },
};

// Init flatpicker
flatpickr('#datetime-picker', options);



function onStartBtn() {
  refs.btnStart.disabled = true;
  intervalId = setInterval(() => {
    difTime = SELECTED_DATE - new Date().getTime();
    if (difTime > 0) {
      const { days, hours, minutes, seconds } = convertMs(difTime);
      // console.log(days, hours, minutes, seconds);

      refs.secondsValue.textContent = addLeadingZero(seconds);
      refs.daysValue.textContent = addLeadingZero(days);
      refs.hoursValue.textContent = addLeadingZero(hours);
      refs.minutesValue.textContent = addLeadingZero(minutes);
      refs.secondsValue.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(intervalId);

      Notiflix.Report.info(
        'The timer has finished',
        function cb() {
          refs.input.disabled = false;
        }
      );
    }
  }, 1000);
  // console.log("intervalId :", intervalId)
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

function addLeadingZero(value) {
  let result = value.toString().padStart(2, '0');
  // console.log(result)
  return result;
}
