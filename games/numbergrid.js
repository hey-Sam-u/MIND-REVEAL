function initGame() {
  const gridContainer = document.getElementById("gridContainer");
  const resultBox = document.getElementById("resultBox");
  const restartBtn = document.getElementById("restartBtn");
  const audio = document.getElementById("magicSound");

  let currentStep = 0;
  let guessedNumber = 0;

  const grids = [];
  for (let bit = 0; bit < 6; bit++) {
    const grid = [];
    for (let i = 1; i <= 99; i++) {
      if ((i >> bit) & 1) grid.push(i);
    }
    grids.push(grid);
  }

  function showGrid() {
    gridContainer.innerHTML = "";
    resultBox.classList.add("hidden");
    restartBtn.classList.add("hidden");

    if (currentStep >= grids.length) return showResult();

    const grid = grids[currentStep];
    const gridHtml = document.createElement("div");
    gridHtml.className = "grid";

    grid.forEach(num => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = num;
      gridHtml.appendChild(cell);
    });

    gridContainer.appendChild(gridHtml);
  }

  function answerYes() {
    guessedNumber += 1 << currentStep;
    currentStep++;
    showGrid();
  }

  function answerNo() {
    currentStep++;
    showGrid();
  }

  function showResult() {
    gridContainer.innerHTML = "";
    resultBox.textContent = `🔮 You thought of: ${guessedNumber}`;
    resultBox.classList.remove("hidden");
    audio.play();
    restartBtn.classList.remove("hidden");
  }

  function restartGame() {
    currentStep = 0;
    guessedNumber = 0;
    showGrid();
  }

  window.answerYes = answerYes;
  window.answerNo = answerNo;
  window.restartGame = restartGame;

  showGrid();
}
