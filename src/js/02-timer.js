import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';


document.body.style.backgroundColor = '#97a3c9';
const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

 const refs = {
   dateInput: document.querySelector('input#datetime-picker'),
   btnStartTimer: document.querySelector('button[data-start]'),
   daysRemaining: document.querySelector('[data-days]'),
   hoursRemaining: document.querySelector('[data-hours]'),
   minutesRemaining: document.querySelector('[data-minutes]'),
   secondsRemaining: document.querySelector('[data-seconds]'),
};

refs.btnStartTimer.disabled = true;
refs.btnStartTimer.addEventListener('click', timerStart);

let remainingTime = 0;

 const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
     onClose(selectedDates) {
         onDateValueCheck(selectedDates);
   },
 };

flatpickr(refs.dateInput, options);

Report.info(
   '👋Hey!',
   'Please, choose a date and click on start ;)',
   'Okay'
);
 
function onDateValueCheck(selectedDates) {
   selectedDate = selectedDates[0].getTime();
   currentDate = new Date().getTime();

   if (selectedDate > currentDate) {
     refs.btnStartTimer.disabled = false;
     Report.success(
       '🥰Perfectly!',
       'The data is entered correctly. Click on start!',
       'Okay'
     );
     return;
   }
   Report.failure(
     '🥺 Ooops...something is wrong(',
     'Please, choose a date in the future!',
     'Okay'
   );
}
 
function timerStart() {
   intervalId = setInterval(() => {
    currentDate = new Date().getTime();
     if (selectedDate - currentDate <= 1000) {
       clearInterval(intervalId);
       refs.btnStartTimer.disabled = true;
       refs.dateInput.disabled = false;
       Report.info(
         '👏Timer stopped!',
         'WARNING, if you want to start timer, choose a date and click on start or reload this page',
         'Okay'
       );
       return;
     } else {
       refs.btnStartTimer.disabled = true;
       refs.dateInput.disabled = true;
       currentDate += 1000;
      remainingTime = Math.floor(selectedDate - currentDate);
      convertMs(remainingTime);
    }
  }, TIMER_DELAY);
}

function createMarkupElem({ days, hours, minutes, seconds }) {
   refs.daysRemaining.textContent = days;
   refs.hoursRemaining.textContent = hours;
   refs.minutesRemaining.textContent = minutes;
   refs.secondsRemaining.textContent = seconds;
}
 
function setsCorrectValue (value) {
  return String(value).padStart(2, '0');
}
 
function convertMs(ms) {
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;

   const days = setsCorrectValue(Math.floor(ms / day));
   const hours = setsCorrectValue(Math.floor((ms % day) / hour));
   const minutes = setsCorrectValue(Math.floor(((ms % day) % hour) / minute));
   const seconds = setsCorrectValue (
     Math.floor((((ms % day) % hour) % minute) / second)
   );
   createMarkupElem({ days, hours, minutes, seconds });
   return { days, hours, minutes, seconds };
}
