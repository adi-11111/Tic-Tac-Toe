const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.reset');

let currentPlayer = 'x';
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (let combo of winningCombination) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'tie';
};

const handleClick = (e) => {
    const index = e.target.getAttribute('data-index');
    
    if (board[index] || checkWin()) return;

    board[index] = currentPlayer;
    e.target.classList.add(currentPlayer);
    
    const winner = checkWin();
    if (winner) {
        message.textContent = winner === 'tie' ? 'It\'s a tie!' : `${winner.toUpperCase()} wins!`;
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'x';
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
    });
    message.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
