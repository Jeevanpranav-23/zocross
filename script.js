let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");
let score1Display = document.querySelector("#score1");
let score2Display = document.querySelector("#score2");

let turnO = true; 
let count = 0; 
let player1Score = 0;
let player2Score = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O"; 
      turnO = false; 
    } else {
      box.innerText = "X"; 
      turnO = true; 
    }
    box.disabled = true; 
    count++; 

    let isWinner = checkWinner(); 

    if (count === 9 && !isWinner) {
      gameDraw(); 
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true; 
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false; 
    box.innerText = ""; 
  }
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
  const player1Name = player1Input.value || "Player 1"; 
  const player2Name = player2Input.value || "Player 2"; 

  if (winner === "O") {
    msg.innerHTML = `🏆 Congratulations, Winner is <strong>${player1Name}</strong>! 🏆`; 
    player1Score++; 
    score1Display.innerText = `Player 1: ${player1Score}`; 
  } else {
    msg.innerHTML = `🏆 Congratulations, Winner is <strong>${player2Name}</strong>! 🏆`; 
    player2Score++; 
    score2Display.innerText = `Player 2: ${player2Score}`; 
  }

  msgContainer.classList.remove("hide"); 
  disableBoxes(); 
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", () => {
  player1Score = 0; 
  player2Score = 0; 
  score1Display.innerText = `Player 1: ${player1Score}`; 
  score2Display.innerText = `Player 2: ${player2Score}`; 
  resetGame(); 
});
