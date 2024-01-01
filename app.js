let currentPlayer = 'X';
let isGameActive = true;
let isAIEnabled = false;

const board = ['', '', '', '', '', '', '', '', ''];
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(index) {
    if (!isGameActive || board[index] !== '') {
        return;
    }

    board[index] = currentPlayer;
    updateCell(index);
    
    if (checkWin()) {
        displayMessage(`Player ${currentPlayer} wins!`);
        isGameActive = false;
    } else if (board.every(cell => cell !== '')) {
        displayMessage('It\'s a tie!');
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayMessage(`Player ${currentPlayer}'s turn`);
        
        if (isAIEnabled && currentPlayer === 'O') {
            makeAIPlay();
        }
    }
}

function updateCell(index) {
    const cell = document.querySelector(`.cell:nth-child(${index + 1})`);
    cell.textContent = board[index];
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}

function checkWin() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board.fill('');
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    isGameActive = true;
    currentPlayer = 'X';
    displayMessage(`Player ${currentPlayer}'s turn`);
}

function toggleAI() {
    isAIEnabled = !isAIEnabled;
    resetGame();
    displayMessage(isAIEnabled ? 'Player X\'s turn' : 'Player O\'s turn');
}

function makeAIPlay() {
    const availableMoves = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const aiMove = availableMoves[randomIndex];
    
    setTimeout(() => {
        handleClick(aiMove);
    }, 1000);
}
