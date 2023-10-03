const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const newGameButton = document.getElementById('new-game');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Function to check for a win
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            // Highlight the winning cells with a white line and red text
            cells[a].style.color = 'red';
            cells[b].style.color = 'red';
            cells[c].style.color = 'red';
            cells[a].style.textDecoration = 'underline';
            cells[b].style.textDecoration = 'underline';
            cells[c].style.textDecoration = 'underline';
            return true;
        }
    }

    return false;
}

// Function to handle cell click
function handleCellClick(index) {
    if (!gameOver && gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        cells[index].classList.add(currentPlayer);

        if (checkWin()) {
            message.style.fontSize = '36px';
            message.style.fontWeight = 'bold';
            message.style.color = '#FFA500';
            message.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
        } else if (gameBoard.every((cell) => cell !== '')) {
            // Game draw
            message.style.color = 'red';
            message.style.textDecoration = 'underline';
            message.textContent = "It's a draw!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;

    // Clear the cells and remove the X and O classes
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
        cell.style.color = ''; // Reset cell color
        cell.style.textDecoration = ''; // Reset text decoration
    });

    // Reset the message style
    message.style.fontSize = '20px';
    message.style.fontWeight = 'normal';
    message.style.color = '#000';

    // Reset the message
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Add click event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(index);
    });
});

// Add a click event listener to the "New Game" button
newGameButton.addEventListener('click', resetGame);

// Initialize the game
resetGame();
