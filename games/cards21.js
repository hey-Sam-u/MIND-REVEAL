
function initGame() {
  let cards = [];
  let round = 0;

  const cardGrid = document.getElementById("cardGrid");
  const resultBox = document.getElementById("resultBox");
  const restartBtn = document.getElementById("restartBtn");
  const audio = document.getElementById("magicSound");

  function generateCards() {
    const suits = ["♠", "♥", "♣", "♦"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const deck = [];
    for (let s of suits) {
      for (let v of values) deck.push(`${v}${s}`);
    }
    deck.sort(() => 0.5 - Math.random());
    return deck.slice(0, 21);
  }

  function displayGrid() {
    cardGrid.innerHTML = "";
    resultBox.classList.add("hidden");
    restartBtn.classList.add("hidden");

    const columns = [[], [], []];
    for (let i = 0; i < 21; i++) columns[i % 3].push(cards[i]);

    for (let i = 0; i < 3; i++) {
      const colDiv = document.createElement("div");
      colDiv.className = "grid-column";
      columns[i].forEach(card => {
        const div = document.createElement("div");
        div.className = "card";
        div.textContent = card;
        colDiv.appendChild(div);
      });
      cardGrid.appendChild(colDiv);
    }

    cards = [].concat(...columns);
  }

  function chooseColumn(colIndex) {
    const columns = [[], [], []];
    for (let i = 0; i < 21; i++) columns[i % 3].push(cards[i]);

    const order = [0, 1, 2];
    order.splice(order.indexOf(colIndex), 1);
    const newOrder = [columns[order[0]], columns[colIndex], columns[order[1]]];
    cards = [];

    for (let i = 0; i < 7; i++) {
      cards.push(newOrder[0][i], newOrder[1][i], newOrder[2][i]);
    }

    round++;
    if (round < 3) displayGrid();
    else revealCard();
  }

  function revealCard() {
    cardGrid.innerHTML = "";
    resultBox.textContent = `🔮 Your card is: ${cards[10]}`;
    resultBox.classList.remove("hidden");
    audio.play();
    restartBtn.classList.remove("hidden");
  }

  function restartGame() {
    round = 0;
    cards = generateCards();
    displayGrid();
  }

  window.chooseColumn = chooseColumn;
  window.restartGame = restartGame;

  cards = generateCards();
  displayGrid();
}