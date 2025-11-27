function initGame() {
  const symbolGrid = document.getElementById("symbolGrid");
  const resultBox = document.getElementById("resultBox");
  const audio = document.getElementById("magicSound");

  const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "§", "✓", "★", "♥", "☯", "☀", "♠", "♣", "☺", "✿", "✦"];
  let magicSymbol = "";

  function generateGrid() {
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    magicSymbol = randomSymbol;

    symbolGrid.innerHTML = "";

    for (let i = 1; i <= 99; i++) {
      const symbol = (i % 9 === 0) ? randomSymbol : symbols[Math.floor(Math.random() * symbols.length)];
      const div = document.createElement("div");
      div.className = "symbol-cell";
      div.textContent = `${i} - ${symbol}`;
      symbolGrid.appendChild(div);
    }

    resultBox.classList.add("hidden");
  }

  function revealSymbol() {
    resultBox.innerText = `🧠 Your symbol is: ${magicSymbol}`;
    resultBox.classList.remove("hidden");
    audio.play();
  }

  window.revealSymbol = revealSymbol;

  generateGrid();
}