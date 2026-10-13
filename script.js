let count = null;
let activity = null;
let confettiTimer = null;
const countDisplay = document.getElementById("count");
const countInput = document.getElementById("start");
const activityDisplay = document.getElementById("activityText");
const activityInput = document.getElementById("activity");
const savedCount = localStorage.getItem("count");
const savedActivity = localStorage.getItem("activity");
const toast = document.getElementById("toast");
let toastTimer;
const clickSound = new Audio("assets/yara yara phonk.mp3");
clickSound.volume = 0.5;
const finishSound = new Audio("assets/we are the champions.mp3");

//toast error message set up
function showError(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

//confetti finish set up
function stopConfetti() {
  clearInterval(confettiTimer);
  confettiTimer = null;
}

function confettiFinish() {
  stopConfetti(); //avoid stacking loops on rapid clicks
  finishSound.currentTime = 0;
  finishSound.play();

  confettiTimer = setInterval(() => {
    confetti({
      particleCount: 200,
      spread: 400,
      scalar: 2,
      gravity: 0.1,
      origin: {x: Math.random(), y: Math.random() * 0.4}
    });
  }, 1500);
}

//localStorage set up
function render() {
  countDisplay.textContent = count;
  activityDisplay.textContent = activity + " Left:";
}

function save() {
  localStorage.setItem("count", count);
  localStorage.setItem("activity", activity);
}

//On page load, restore saved progress if there's any
if (savedCount != null && savedActivity != null) {
  count = Number(savedCount);
  activity = savedActivity;
}
render();

finishSound.addEventListener("ended", stopConfetti);

document.getElementById("set").addEventListener("click", () => {
  if (activityInput.value == "") {
    count = null;
    activity = null;
    showError("You must input an activity");
    return;
  }
  else if (countInput.value == "") {
    count = null;
    activity = null;
    showError("You must input a goal number");
    return;
  }
  else {
    count = Number(document.getElementById("start").value);
    activity = activityInput.value;
  }
  save();
  render();
});

document.getElementById("check").addEventListener("click", () => {
  if (count > 1) {
    count -= 1;
    //Adding sound
    clickSound.currentTime = 0;
    clickSound.play();
    //Adding confetti effect
    confetti({
      particleCount: 100,
      spread: 170,
      scalar: 2,
      origin: {y: 0.6}
    });
    save();
    render();
  }
  else {
    count -=1;
    save();
    render();
    
    confettiFinish();
  }
});