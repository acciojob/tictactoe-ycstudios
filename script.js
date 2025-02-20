let currentPlayer = 1;
let playerOne = '';
let playerTwo = '';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Start game on submit
document.getElementById("submit").addEventListener('click', () => {
    playerOne = document.getElementById('player1').value.trim();
    playerTwo = document.getElementById('player2').value.trim();

    if (playerOne === '' || playerTwo === '') {
        alert('Please enter names for both players');
        return;
    }

    document.getElementById('login').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    updateMessage();
});

// Handle cell click
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    if (!gameActive) return;

    const cellId = parseInt(e.target.id) - 1; // Ensure valid index
    if (gameBoard[cellId] !== '') return; // Prevent overwriting moves

    gameBoard[cellId] = currentPlayer === 1 ? 'X' : 'O';
    e.target.textContent = gameBoard[cellId];

    if (checkWin()) {
        const winner = currentPlayer === 1 ? playerOne : playerTwo;
        document.querySelector('.message').textContent = `${winner}, congratulations you won!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        document.querySelector('.message').textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateMessage();
}

// Check win condition
function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
        let combination = winningCombinations[i];
        let first = gameBoard[combination[0]];
        let second = gameBoard[combination[1]];
        let third = gameBoard[combination[2]];

        if (first !== '' && first === second && second === third) {
            return true; // Winner found
        }
    }
    return false; // No winner
}

// Check draw condition (Updated)
function checkDraw() {
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            return false; // If any cell is empty, it's not a draw
        }
    }
    return true; // No empty cells, so it's a draw
}

// Update message for current player
function updateMessage() {
    const currentPlayerName = currentPlayer === 1 ? playerOne : playerTwo;
    document.querySelector('.message').textContent = `${currentPlayerName}, you're up`;
}
