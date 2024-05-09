// const eventDate = new Date(2024, 4, 14); // Set to May 14, 2024
const eventDate = new Date(2024, 4, 14, 10, 0, 0);

const dayHand = document.querySelector('.day-hand');
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

// New selectors for the countdown display
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function updateClock() {
  const now = new Date();
  const diffTime = eventDate - now;

  if (diffTime <= 0) {
    clearInterval(intervalId);
    // Update both hands and numeric displays
    dayHand.style.transform = 'translateX(-50%) rotate(360deg)';
    hourHand.style.transform = 'translateX(-50%) rotate(360deg)';
    minuteHand.style.transform = 'translateX(-50%) rotate(360deg)';
    secondHand.style.transform = 'translateX(-50%) rotate(360deg)';
    // Setting all to zero once the countdown is over
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(diffTime / 1000);
  const diffDays = Math.floor(totalSeconds / (60 * 60 * 24));
  const diffHours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutesPast = Math.floor((totalSeconds % (60 * 60)) / 60);
  const secondsPast = totalSeconds % 60;

  // Update hands
  dayHand.style.transform = `translateX(-50%) rotate(${360 * diffDays / 365}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${360 - (360 * diffHours / 24)}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${360 - (360 * minutesPast / 60)}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${360 - (360 * secondsPast / 60)}deg)`;

  // Update numeric countdown
  daysElement.textContent = pad(diffDays);
  hoursElement.textContent = pad(diffHours);
  minutesElement.textContent = pad(minutesPast);
  secondsElement.textContent = pad(secondsPast);

  function pad(num) {
    return num.toString().padStart(2, '0');
  }
}

const intervalId = setInterval(updateClock, 1000);