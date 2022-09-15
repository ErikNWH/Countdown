const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownElBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEL = document.getElementById('complete');
const completeELInfo = document.getElementById('complete-info');
const completeELBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log(distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    // Hidden Input
    inputContainer.hidden = true;

    // If the countdown has ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeELInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
      completeEL.hidden = false;
    } else {
      // Else show countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      completeEL.hidden = true;
      countdownEl.hidden = false;
    }
  }, 100);
}

// Take Values form from input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  console.log(countdownTitle, countdownDate);
  // Check for calid date
  if (countdownDate === '' || countdownTitle === '') {
    alert('please select a date and title for the countdown.');
  } else {
    // Get number Version of current date
    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown Value', countdownValue);
    updateDOM();
  }
}

// Reset All Values
function reset() {
  // Hide countdowns, show input
  countdownEl.hidden = true;
  completeEL.hidden = true;
  inputContainer.hidden = false;
  // stop countdown
  clearInterval(countdownActive);
  // Reset Values
  countdownTitle = '';
  countdownDate = '';
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownElBtn.addEventListener('click', reset);
completeELBtn.addEventListener('click', reset);
