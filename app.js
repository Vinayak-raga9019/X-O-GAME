 // Select all game boxes
let boxes = document.querySelectorAll(".box");
// Select the reset button
let resetBtn = document.querySelector("#reset-btn");
// Select the new game button (renamed for clarity)
let newGameBtn = document.querySelector("#new-btn");
// Select the message container
let msgContainer = document.querySelector(".msg-container");
// Select the message paragraph inside the container
let msg = document.querySelector("#msg");

// State variable to track whose turn it is (true for O, false for X)
let turnO = true;
// Flag to indicate if the game has ended (win or tie)
let gameEnded = false;
// Counter for moves made, used to detect a tie game
let moveCount = 0;

// All possible winning patterns for Tic-Tac-Toe
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

/**
 * Initializes or resets the game to its starting state.
 * Sets O as the starting player, clears the board, enables all boxes,
 * and hides the winner/tie message.
 */
const resetGame = () => {
  turnO = true; // O always starts the game
  gameEnded = false; // Reset game state to not ended
  moveCount = 0; // Reset move count for tie detection
  enableBoxes(); // Clear content and enable all game boxes
  msgContainer.classList.add("hide"); // Hide the winner/tie message container
};

// Attach click event listeners to each game box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // If the game has already ended (winner or tie), do nothing
    if (gameEnded) {
      return;
    }

    // Place 'O' or 'X' based on the current turn
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#FFD700"; // Set color for 'O' (Gold)
      turnO = false; // Switch turn to X
    } else {
      box.innerText = "X";
      box.style.color = "#DC143C"; // Set color for 'X' (Crimson Red)
      turnO = true; // Switch turn to O
    }
    box.disabled = true; // Disable the clicked box to prevent further clicks
    moveCount++; // Increment the move counter

    // After each move, check if there's a winner or a tie
    checkWinner();
  });
});

/**
 * Disables all game boxes.
 * This is called when a winner is found or the game is a tie.
 */
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

/**
 * Enables all game boxes and clears their text content.
 * Used at the start of a new game or when resetting.
 */
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false; // Enable the box
    box.innerText = ""; // Clear any 'X' or 'O'
    box.style.color = ""; // Reset any custom color applied to the text
  }
};

/**
 * Displays the winner message and ends the game.
 * @param {string} winner - The symbol of the winning player ('O' or 'X').
 */
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}!`;
  msgContainer.classList.remove("hide"); // Show the message container
  gameEnded = true; // Mark the game as ended
  disableBoxes(); // Disable all boxes to prevent further moves
};

/**
 * Displays the tie game message and ends the game.
 */
const showTie = () => {
  msg.innerText = `It's a Tie!`;
  msgContainer.classList.remove("hide"); // Show the message container
  gameEnded = true; // Mark the game as ended
  disableBoxes(); // Disable all boxes
};

/**
 * Checks all winning patterns to determine if there's a winner.
 * Also checks for a tie game if no winner is found after all moves are made.
 */
const checkWinner = () => {
  for (let pattern of winPatterns) {
    // Get the values from the three boxes in the current pattern
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // Check if all three positions in the pattern are filled
    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      // Check if all three values are the same (a win)
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val); // Call showWinner with the winning symbol
        return; // Exit the function immediately as a winner is found
      }
    }
  }

  // If no winner is found and all 9 moves have been made, it's a tie
  if (moveCount === 9 && !gameEnded) {
    showTie();
  }
};

// Attach event listeners to the New Game and Reset Game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initialize the game when the script first loads
resetGame();