// CUSTOM POPUP FUNCTION
function showPopup(msg) {
  const popup = document.getElementById("customPopup");
  const popupMsg = document.getElementById("popupMessage");

  popupMsg.innerText = msg;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

function reverseNumber(num) {
  return parseInt(num.toString().split("").reverse().join(""));
}

function revealMagic() {
  const input = document.getElementById("originalNumber");
  const animationBox = document.getElementById("animationText");
  const resultBox = document.getElementById("finalResult");
  const retryBtn = document.getElementById("retryBtn");
  const audio = document.getElementById("magicSound");

  let num = parseInt(input.value);

  // VALIDATION POPUP
  if (isNaN(num) || num < 100 || num > 999) {
    showPopup("Please enter a valid 3-digit number!");
    return;
  }

  const digits = input.value.split("");
  const first = parseInt(digits[0]);
  const last = parseInt(digits[2]);

  if (Math.abs(first - last) < 2) {
    showPopup("First and last digit must differ by at least 2!");
    return;
  }

  input.disabled = true;
  document.getElementById("revealBtn").disabled = true;

  const rev = reverseNumber(num);
  const high = Math.max(num, rev);
  const low = Math.min(num, rev);
  const diff = high - low;
  const revDiff = reverseNumber(diff);
  const final = diff + revDiff;

  const steps = [
    "🧠 Tuning into your mind waves...",
    "🔄 Visualizing the number hiden behind your thoughts...",
    "➖ Bending reality to read your reversed number...",
    "🔁 Calculating the mystical difference...",
    "➕ Reconstructing the final magic sequence...",
    "🎉 And the universe whispers your number is: ",
  ];

  let index = 0;

  animationBox.classList.remove("hidden");
  animationBox.classList.add("show");
  animationBox.innerText = "";
  resultBox.classList.add("hidden");
  retryBtn.classList.add("hidden");
  audio.pause();
  audio.currentTime = 0;

  function showNext() {
    if (index < steps.length - 1) {
      animationBox.style.opacity = "0";

      setTimeout(() => {
        animationBox.innerText = steps[index];
        animationBox.style.opacity = "1";
        index++;
        setTimeout(showNext, 1200);
      }, 400);
    } else {
      animationBox.style.opacity = "0";

      setTimeout(() => {
        animationBox.innerText = steps[index];
        animationBox.style.opacity = "1";

        setTimeout(() => {
          resultBox.innerText = final;
          resultBox.classList.remove("hidden");
          resultBox.style.opacity = "1";
          audio.play();
          retryBtn.classList.remove("hidden");
        }, 900);
      }, 400);
    }
  }

  showNext();
}

function resetCalc() {
  const input = document.getElementById("originalNumber");
  const animationBox = document.getElementById("animationText");
  const resultBox = document.getElementById("finalResult");
  const retryBtn = document.getElementById("retryBtn");

  input.value = "";
  input.disabled = false;
  animationBox.innerText = "";
  animationBox.classList.remove("show");
  animationBox.classList.add("hidden");
  resultBox.innerText = "";
  resultBox.classList.add("hidden");
  retryBtn.classList.add("hidden");

  const revealBtn = document.getElementById("revealBtn");
  if (revealBtn) revealBtn.disabled = false;
}

function initGame() {
  const revealBtn = document.getElementById("revealBtn");
  const retryBtn = document.getElementById("retryBtn");

  if (revealBtn) {
    revealBtn.removeEventListener("click", revealMagic);
    revealBtn.addEventListener("click", revealMagic);
  }
  if (retryBtn) {
    retryBtn.removeEventListener("click", resetCalc);
    retryBtn.addEventListener("click", resetCalc);
  }
}

initGame();
