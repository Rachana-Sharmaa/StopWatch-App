let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        startStopBtn.innerHTML = "Pause";
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    startStopBtn.innerHTML = "Start";
    minutesDisplay.innerHTML = '00';
    secondsDisplay.innerHTML = '00';
    millisecondsDisplay.innerHTML = '00';
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = `${minutesDisplay.innerHTML}:${secondsDisplay.innerHTML}:${millisecondsDisplay.innerHTML}`;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = lapTime;
        laps.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    minutesDisplay.innerHTML = (minutes < 10) ? "0" + minutes : minutes;
    secondsDisplay.innerHTML = (seconds < 10) ? "0" + seconds : seconds;
    millisecondsDisplay.innerHTML = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
