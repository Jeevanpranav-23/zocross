let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let resetHighScoreBtn = document.querySelector("#reset-high-score");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerOInput = document.querySelector("#playerO");
let playerXInput = document.querySelector("#playerX");
let score1Display = document.querySelector("#score1");
let score2Display = document.querySelector("#score2");
let highScoreODisplay = document.querySelector("#high-scoreO");
let highScoreXDisplay = document.querySelector("#high-scoreX");
let highScoreOName = document.querySelector("#high-scoreO-name");
let highScoreXName = document.querySelector("#high-scoreX-name");

let turnO = true;  
let count = 0;
let playerOScore = 0;
let playerXScore = 0;
let highestScoreO = 0;
let highestScoreX = 0;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  
  [0, 4, 8], [2, 4, 6]              
];



boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleClick(box, index));
});


const handleClick = (box, index) => {
  if (box.innerText !== "") return; 

  box.innerText = turnO ? "O" : "X";
  box.classList.add(turnO ? "o" : "x");

  count++;
  if (checkWinner()) return;

  if (count === 9) {
    msg.innerHTML = "😲 It's a Draw!";
    msgContainer.classList.remove("hide");
  }

  turnO = !turnO; 
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};


const showWinner = (winner) => {
  let winnerName = winner === "O" ? playerOInput.value || "Player O" : playerXInput.value || "Player X";
  msg.innerHTML = `🏆 Congratulations, <strong>${winnerName}</strong> wins! 🏆`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  if (winner === "O") {
    playerOScore++;
    if (playerOScore > highestScoreO) {
      highestScoreO = playerOScore;
      highScoreOName.innerText = playerOInput.value || "Player O";
    }
  } else {
    playerXScore++;
    if (playerXScore > highestScoreX) {
      highestScoreX = playerXScore;
      highScoreXName.innerText = playerXInput.value || "Player X";
    }
  }

  updateScoreboard();
};


const updateScoreboard = () => {
  score1Display.innerText = `Player O: ${playerOScore}`;
  score2Display.innerText = `Player X: ${playerXScore}`;
  highScoreODisplay.innerText = highestScoreO;
  highScoreXDisplay.innerText = highestScoreX;
};


const resetGame = () => {
  turnO = true;
  count = 0;
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("x", "o");
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
};


const resetHighScore = () => {
  highestScoreO = 0;
  highestScoreX = 0;
  highScoreOName.innerText = "No Player Yet";
  highScoreXName.innerText = "No Player Yet";
  updateScoreboard();
};


const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};


resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", () => {
  playerOScore = 0;
  playerXScore = 0;
  updateScoreboard();
  resetGame();
});
resetHighScoreBtn.addEventListener("click", resetHighScore);
if ('serviceWorker' in navigator) {

navigator.serviceWorker.register('./service-worker.js') .then(() => 
console.log('Service Worker Registered'));
 }
