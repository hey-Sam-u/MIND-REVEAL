/* ============================================
   🧙 MAGIC (Hidden Digit) – DO NOT TOUCH
============================================ */
function guessDigit() {
  let total = 0;
  for (let i = 1; i <= 4; i++) {
    const val = parseInt(document.getElementById("d" + i).value);
    if (!isNaN(val)) total += val;
  }

  let missing = 9 - (total % 9);
  if (missing === 9) missing = 0;

  const resultBox = document.getElementById("result");
  resultBox.innerHTML = `🧙‍♂️ Your hidden digit is: <span>${missing}</span>`;
  resultBox.classList.remove("show");
  void resultBox.offsetWidth;
  resultBox.classList.add("show");

  const audio = new Audio("magicsound.wav");
  audio.play();
}

/* ============================================
   🔄 AUTO REFRESH ON BACK / RETURN
============================================ */
window.addEventListener("pageshow", function (event) {
  if (event.persisted) window.location.reload();
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    if (sessionStorage.getItem("mr-last-open")) {
      window.location.reload();
    }
  }
});
sessionStorage.setItem("mr-last-open", "yes");

/* ============================================
   🟦 SIDEBAR OPEN/CLOSE (Single Correct Version)
============================================ */
const sidebar = document.getElementById("sidebar");

function toggleSidebar() {
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
}

function openSidebar() {
  sidebar.classList.add("open");
  sidebar.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebar.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
}

// close outside
document.addEventListener(
  "click",
  (e) => {
    if (!sidebar.classList.contains("open")) return;
    const inside = sidebar.contains(e.target);
    const toggle = e.target.closest(".sidebar-toggle");
    if (!inside && !toggle) closeSidebar();
  },
  { passive: true }
);

// esc close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar.classList.contains("open")) {
    closeSidebar();
  }
});

/* ============================================
   🎮 MAIN GAME LOADER (THIS IS THE CORRECT ONE)
============================================ */
function loadGame(gameName) {
  fetch(`games/${gameName}.html`)
    .then((res) => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then((html) => {
      const container = document.getElementById("game-content");
      container.innerHTML = html;

      // Remove old dynamic CSS/JS
      const oldCSS = document.getElementById("dynamic-css");
      if (oldCSS) oldCSS.remove();

      const oldJS = document.getElementById("dynamic-js");
      if (oldJS) oldJS.remove();

      // Add new CSS for the game
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `games/${gameName}.css`;
      link.id = "dynamic-css";
      document.head.appendChild(link);

      // Load JS for game
      const script = document.createElement("script");
      script.src = `games/${gameName}.js`;
      script.id = "dynamic-js";
      script.onload = () => {
        setTimeout(() => {
          if (typeof initGame === "function") {
            initGame();
          }
        }, 40);
      };
      document.body.appendChild(script);

      window.scrollTo(0, 0);
      closeSidebar();
    })
    .catch((err) => {
      document.getElementById("game-content").innerHTML =
        "<p>Error loading game. Please try again.</p>";
      console.error(err);
    });
}

/* ============================================
   ✍️ TYPING EFFECT
============================================ */
(function typingEffect() {
  const wrap = document.querySelector(".mr-typed-wrap");
  if (!wrap) return;

  const typed = document.createElement("span");
  typed.className = "mr-typed";

  const cursor = document.createElement("span");
  cursor.className = "mr-cursor";

  wrap.appendChild(typed);
  wrap.appendChild(cursor);

  const words = [
    "MindReveal",
    "Magic Tricks",
    "Number Puzzles",
    "Symbol Guess",
  ];
  let w = 0,
    c = 0,
    del = false;

  function loop() {
    const word = words[w % words.length];

    if (!del) {
      typed.textContent = word.slice(0, c + 1);
      c++;
      if (c === word.length) {
        del = true;
        return setTimeout(loop, 1200);
      }
      return setTimeout(loop, 80);
    } else {
      typed.textContent = word.slice(0, c - 1);
      c--;
      if (c === 0) {
        del = false;
        w++;
        return setTimeout(loop, 300);
      }
      return setTimeout(loop, 40);
    }
  }

  setTimeout(loop, 600);
})();

/* ============================================
   📅 YEAR
============================================ */
(function () {
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
