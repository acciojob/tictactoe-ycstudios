//your JS code here. If required.
let currentPlayer = 1;
let player1Name = '';
let player2Name = '';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

document.getElementById('submit').addEventListener('click', startGame);
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function startGame() {
    player1Name = document.getElementById('player-1').value.trim();
    player2Name = document.getElementById('player-2').value.trim();
    
    if (!player1Name || !player2Name) {
        alert('Please enter names for both players');
        return;
    }
    
    document.getElementById('player-form').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    updateMessage();
}

function handleCellClick(e) {
    if (!gameActive) return;
    
    const cellId = parseInt(e.target.id) - 1;
    if (gameBoard[cellId] !== '') return;
    
    gameBoard[cellId] = currentPlayer === 1 ? 'X' : 'O';
    e.target.textContent = gameBoard[cellId];
    
    if (checkWin()) {
        const winner = currentPlayer === 1 ? player1Name : player2Name;
        document.querySelector('.message').textContent = 
            `${winner}, congratulations you won!`;
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

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === (currentPlayer === 1 ? 'X' : 'O');
        });
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function updateMessage() {
    const currentPlayerName = currentPlayer === 1 ? player1Name : player2Name;
    document.querySelector('.message').textContent = `${currentPlayerName}, you're up`;
}