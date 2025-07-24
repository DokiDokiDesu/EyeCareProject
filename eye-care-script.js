let info = 'EyeCareProject is designed to reduce eye strain while using computers caused by focusing on something from the same distance for too long.This program is designed to apply 20/20/20 rule while using a computer.User should focus onto something 20 meters far away for 20 seconds once every 20 minutes.';

let remainingSeconds = 1200;
let restRemainingSeconds = 20;
let newInputSeconds = 0;
let newInputRest = 0;
let intervalId = null;
let cycleCount = 0;
let timer;
const audio = document.querySelector('.sound-effect');

document.querySelector('.info').innerHTML = info;

function startTimer() {
  if(document.querySelector('.start-button').style.display = 'none') {
    document.querySelector('.start-button').style.display = 'inline-block';
  }

  document.querySelector('.rest-alert').innerHTML = '';
  timer = setInterval(()=>{
  remainingSeconds--;
  document.querySelector('.rest-alert').innerHTML = 'Counting';
  document.querySelector('.start-button').innerHTML = 'Pause';
  document.querySelector('.start-button').onclick = pauseTimer;

    
      

    if(remainingSeconds === 0) {
      clearInterval(timer);
      restTime();
      return;
    }

    const minute = Math.floor(remainingSeconds / 60);
    const second = remainingSeconds % 60;

    document.querySelector('.timer').innerHTML = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  },1000)
}

function continueTimer() {
  timer = setInterval(() => {
    remainingSeconds--;

    document.querySelector('.start-button').innerHTML = 'Pause';
    document.querySelector('.start-button').onclick = pauseTimer;

    if(document.querySelector('.rest-alert').innerHTML === 'Paused') {
      document.querySelector('.rest-alert').innerHTML = 'Counting';
    }

    if (remainingSeconds === 0) {
      clearInterval(timer);
      restTime();
      return;
    }

    const minute = Math.floor(remainingSeconds / 60);
    const second = remainingSeconds % 60;

    document.querySelector('.timer').innerHTML = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  document.querySelector('.start-button').innerHTML = 'Resume';
  document.querySelector('.start-button').onclick = continueTimer;
  document.querySelector('.rest-alert').innerHTML = 'Paused';
}

function resetTimer() {
  clearInterval(timer);
  stopSound();
  // cycleCount = 0; deneme
  updateCycleCounter();
  
  if(newInputSeconds !== 0) {
    remainingSeconds = newInputSeconds;
  }else {
  remainingSeconds = 1200;
  }
    const minute = Math.floor(remainingSeconds / 60);
    const second = remainingSeconds % 60;

    document.querySelector('.timer').innerHTML = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  document.querySelector('.start-button').innerHTML = 'Start';
  document.querySelector('.start-button').onclick = startTimer;

  document.querySelector('.rest-alert').innerHTML = 'Start Counting';
}

function restTime() {
  document.querySelector('.start-button').style.display = 'none';
  document.querySelector('.skip-rest-button').style.display ='block';
  document.querySelector('.rest-alert').innerHTML = 'Rest time  ';
  playSound();
  if(newInputRest !== 0) {
    restRemainingSeconds = newInputRest;
  }else {
   restRemainingSeconds = 20;
  }

  const minute = Math.floor(restRemainingSeconds / 60);
  const second = restRemainingSeconds % 60;

  document.querySelector('.timer').innerHTML = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;

  if(newInputSeconds !== 0) {
    remainingSeconds = newInputSeconds;
  }else {
  remainingSeconds = 1200;
  }
  let restTimer;

    restTimer = setInterval(()=>{
    restRemainingSeconds--;

     if(restRemainingSeconds === 0) {
      document.querySelector('.rest-alert').innerHTML = '';
      document.querySelector('.skip-rest-button').style.display = 'none';
      clearInterval(restTimer);
       cycleCount++;
      updateCycleCounter();
      startTimer();
      stopSound();
      const minute = Math.floor(remainingSeconds / 60);
      const second = remainingSeconds % 60;

      document.querySelector('.timer').innerHTML = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;

      return;
    }
    document.querySelector('.skip-rest-button').onclick =(()=>{
      clearInterval(restTimer);
      restRemainingSeconds = 20;
      cycleCount++;
      updateCycleCounter();
      startTimer();
      stopSound();
      document.querySelector('.skip-rest-button').style.display = 'none';
    });

    const minute = Math.floor(restRemainingSeconds / 60);
    const second = restRemainingSeconds % 60;

    document.querySelector('.timer').innerHTML = `${String(minute).padStart(2, '0')}:${String(restRemainingSeconds).padStart(2, '0')}`;
  },1000)
}

function playSound() {
  audio.play();
}
function stopSound() {
  audio.pause();
  audio.currentTime = 0;
}
function displaySettings(){
  resetTimer();
  const displaySettings = document.querySelector('.settings-menu');
  displaySettings.style.display = "flex";

  const minute = Math.floor(remainingSeconds / 60);
  document.getElementById("run-time").value = minute;
  document.getElementById("rest-time").value = restRemainingSeconds;
}
function saveAndQuit() {
  let userInputMinute;
  userInputMinute = document.getElementById("run-time").value;

  if(userInputMinute < 1) {
    alert('run time input cannot be less than a minute');
  } else {

   newInputSeconds = userInputMinute * 60;
   newInputRest = document.getElementById("rest-time").value;

  remainingSeconds = newInputSeconds;
  restRemainingSeconds = newInputRest;

  document.querySelector('.settings-menu').style.display = "none";

    const minute = Math.floor(remainingSeconds / 60);
    const second = remainingSeconds % 60;
  document.querySelector('.timer').innerHTML = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  }
}
function resetCycleCounter() {
  cycleCount = 0;
  updateCycleCounter();
}

function restoreToDefault() {
  document.querySelector('.settings-menu').style.display = "none";
  remainingSeconds = 1200;
  restRemainingSeconds = 20;
  newInputSeconds = 0;
  newInputRest = 0;

    const minute = Math.floor(remainingSeconds / 60);
    const second = remainingSeconds % 60;
  document.querySelector('.timer').innerHTML = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
}
function updateCycleCounter () {
  document.querySelector('.cycle-counter').innerHTML = `Cycles passed : ${cycleCount}`;
}

function displayInfo() {
  const displayInfo = document.querySelector('.info-page');
  displayInfo.style.display = "flex";
}
document.querySelector('.close-info').addEventListener('click',()=>{
  document.querySelector('.info-page').style.display ="none";
});

const checkboxDarkMode = document.querySelector('.checkbox-dark-mode');

checkboxDarkMode.addEventListener('change',function(){
  if(this.checked) {
    document.getElementById('theme').href = 'eye-care-style-dark.css';
  }
  else {
    document.getElementById('theme').href = 'eye-care-style.css';
  }
});