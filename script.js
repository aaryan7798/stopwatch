/* script.js */
let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (savedTime || 0);
        tInterval = setInterval(updateTime, 1);
        startPauseButton.innerHTML = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        startPauseButton.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    display.innerHTML = '00:00:00';
    startPauseButton.innerHTML = 'Start';
    lapsContainer.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('div');
        lapTime.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
        lapsContainer.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    const milliseconds = time.getUTCMilliseconds();

    display.innerHTML = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 100 ? '0' : ''}${milliseconds < 10 ? '0' : ''}${milliseconds}`;
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
