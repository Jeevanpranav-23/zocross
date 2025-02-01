let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerOInput = document.querySelector("#playerO");
let playerXInput = document.querySelector("#playerX");
let score1Display = document.querySelector("#score1");
let score2Display = document.querySelector("#score2");

let turnO = true; 
let count = 0; 
let playerOScore = 0;
let playerXScore = 0;

const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8]
];


const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};


const newGame = () => {
  playerOScore = 0;
  playerXScore = 0;
  updateScoreboard();
  resetGame();
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") { 
      box.innerText = turnO ? "O" : "X"; 
      box.disabled = true; 
      count++; 

      if (!checkWinner()) {
        if (count === 9) {
          gameDraw(); 
        } else {
          turnO = !turnO; 
        }
      }
    }
  });
});


const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};


const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true); 
};


const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false; 
    box.innerText = ""; 
  });
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
      showWinner(boxes[a].innerText); 
      return true; 
    }
  }
  return false; 
};


const showWinner = (winner) => {
  let name = winner === "O" ? playerOInput.value || "Player O" : playerXInput.value || "Player X";
  
  msg.innerHTML = ` 🏆Congratulations,Winner<strong>${name}</strong>!🏆`; 
  msgContainer.classList.remove("hide"); 
  disableBoxes(); 

  if (winner === "O") {
    playerOScore++;
  } else {
    playerXScore++;
  }

  updateScoreboard();
};


const updateScoreboard = () => {
  score1Display.innerText = `Player O: ${playerOScore}`;
  score2Display.innerText = `Player X: ${playerXScore}`;
};


resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);
