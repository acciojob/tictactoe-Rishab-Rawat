//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player-1').value;
    const player2 = document.getElementById('player-2').value;

    if (player1 === '' || player2 === '') {
        alert('Please enter names for both players');
        return;
    }

    document.querySelector('.setup').style.display = 'none';
    document.querySelector('.game').style.display = 'block';

    let currentPlayer = player1;
    const cells = document.querySelectorAll('.cell');
    const messageDiv = document.querySelector('.message');
    const board = Array(9).fill(null);
    let gameActive = true;

    messageDiv.textContent = `${currentPlayer}, you're up`;

    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            if (cell.textContent !== '' || !gameActive) {
                return;
            }

            const index = parseInt(cell.id) - 1;
            board[index] = currentPlayer === player1 ? 'X' : 'O';
            cell.textContent = board[index];

            if (checkWin(board)) {
                messageDiv.textContent = `${currentPlayer} congratulations you won!`;
                gameActive = false;
                return;
            }

            if (board.every(cell => cell !== null)) {
                messageDiv.textContent = 'It\'s a draw!';
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;
            messageDiv.textContent = `${currentPlayer}, you're up`;
        });
    });

    function checkWin(board) {
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

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }
});
