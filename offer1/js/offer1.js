let timeLeft = 3 * 60; // 180 seconds (3 minutes)

const timerDisplay = document.getElementById('timer-display');

const timerBox = document.getElementById('timer-box');

function updateTimer() {

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');

    const seconds = String(timeLeft % 60).padStart(2, '0');

    // timerDisplay.textContent = `${minutes}:${seconds}`;

    timerDisplay.innerHTML = `<span id="timer-text">Offer expires in :</span> ${minutes}:${seconds}`;

    if (timeLeft <= 0) {

        clearInterval(timerInterval);

        timerDisplay.innerHTML = `<span id="timer-text">Offer Expired !</span>`

        // timerBox.style.display = 'none'; // or any other action

    }

    timeLeft--;

}

updateTimer(); // initial display

const timerInterval = setInterval(updateTimer, 1000);
