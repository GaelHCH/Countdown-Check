let count = 0;
const display = document.getElementById("count");
const saved = localStorage.getItem("count");
const clickSound = new Audio("assets/yara yara phonk.mp3");
clickSound.volume = 0.5;

//localStorage set up
function render() {
  display.textContent = count;
}

function save() {
  localStorage.setItem("count", count);
}

//On page load, restore saved progress if there's any
if (saved != null) {
  count = Number(saved);
}
render();

document.getElementById("set").addEventListener("click", () => {
  count = Number(document.getElementById("start").value);
  save();
  render();
});

document.getElementById("check").addEventListener("click", () => {
  if (count > 0) {
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
});