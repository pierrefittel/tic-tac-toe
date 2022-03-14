const gameLogic = (() => {
    const newGame = () => {
        gameView.resetBoard();
        turn = 0;
        playerOne = Player(1);
        playerTwo = Player(2);
        gameView.displayName('player-1-name', playerOne.name);
        gameView.displayName('player-2-name', playerTwo.name);
        turnSide = playerOne.side;
        gameView.addEvent();
    };
    const mapBoard = () => {
        let boardMap = [];
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => { 
            if (cell.innerHTML === turnSide) {
                boardMap.push('.');
            } else { boardMap.push(''); }
        });
        return boardMap;
    };
    const checkPattern = (array1, array2) => {
        let score = 0;
        for (let i in array1) {
            score = (array1[i] === '.' && array2[i] === '.') ? score += 1 : score;
        }
        return score;
    };
    const checkWin = (pattern) => {
        winningPatterns = [
            ['.', '.', '.', '', '', '', '', '', ''],
            ['.', '', '', '.', '', '', '.', '', ''],
            ['.', '', '', '', '.', '', '', '', '.'],
            ['', '.', '', '', '.', '', '', '.', ''],
            ['', '', '', '.', '.', '.', '', '', ''],
            ['', '', '', '', '', '', '.', '.', '.'],
            ['', '', '.', '', '', '.', '', '', '.'],
            ['', '', '.', '', '.', '', '.', '', ''],
        ];
        result = false;
        for (let i in winningPatterns) {
            score = checkPattern(pattern, winningPatterns[i]);
            if (score >= 3) { result = true; break; }
        }
        return result;
    };
    const gameController = () => {
        let boardMap = mapBoard();
        controller = checkWin(boardMap);
        if (controller === true) { 
            gameView.displayWinner();
            gameView.removeEvent();
            gameView.resetMenu();
        } else if (controller === false && turn === 8) {
            gameView.displayTie();
            gameView.removeEvent();
            gameView.resetMenu();
        }
    };
    return {newGame, gameController,};
})();

const gameView = (() => {
    const resetBoard = () => {
        cells = document.querySelectorAll(".cell");
        cells.forEach(cell => { cell.innerHTML = ''; });
        document.getElementById('winner').innerHTML = '';
        title = document.getElementById('title');
        title.style.display = 'flex';
        winner = document.getElementById('winner');
        winner.style.display = 'none';
    };
    const resetMenu = () => {
        field = document.getElementsByClassName('player-name')
        for (let i of field) {
            i.style.display = 'block';
            i.innerHTML = '';
        }
        input = document.getElementsByTagName('input');
        for (let i of input) {
            i.style.display = 'block';
            i.value = '';
        }
    };
    const displayName = (player, playerName) => {
        field = document.getElementById(`${player}`)
        field.innerHTML = playerName;
        field.style.display = 'block';
        input = document.getElementsByTagName('input');
        for (let i of input) { i.style.display = 'none' };
    };
    const addEvent = () => {
        elements = document.querySelectorAll(".cell");
        elements.forEach(element => {
            element.addEventListener("click", updateCell, { once : true });
        });
    };
    const removeEvent = () => {
        elements = document.querySelectorAll(".cell");
        elements.forEach(element => {
            element.removeEventListener("click", updateCell);
        });
    };
    const updateCell = () => {
        event.target.innerHTML = turnSide;
        gameLogic.gameController();
        turnSide = (turnSide === playerOne.side) ? playerTwo.side : playerOne.side;
        turn++;
    };
    const displayWinner = () => {
        title = document.getElementById('title');
        title.style.display = 'none';
        winnerName = (playerOne.side === turnSide) ? playerOne.name : playerTwo.name;
        winner = document.getElementById('winner');
        winner.innerHTML = `Player ${winnerName} has won the game!`;
        winner.style.display = 'block';
    };
    const displayTie = () => {
        title = document.getElementById('title');
        title.style.display = 'none';
        winnerName = (playerOne.side === turnSide) ? playerOne.name : playerTwo.name;
        winner = document.getElementById('winner');
        winner.innerHTML = 'This is a tie! Play again...';
        winner.style.display = 'block';
    };
    return {addEvent, resetBoard, displayWinner, removeEvent, displayName, resetMenu, displayTie};
})();

const Player = (i) => {
    const name = document.getElementById(`player-${i}`).value;
    const side = (i === 1) ? 'x' : 'o';
    let winCount = 0;
    return { name, side, winCount };
};

newGame = document.getElementById("new-game");
newGame.addEventListener("click", gameLogic.newGame);

let playerOne = null;
let playerTwo = null;
let turnSide = null;
let turn = 0;