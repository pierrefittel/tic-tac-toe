const gameLogic = (() => {
    //Creates a new empty virtual game board array.
    const newGame = () => {
        gameView.resetBoard();
        playerOne = Player(1);
        playerTwo = Player(2);
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
        if (controller === true) { gameView.displayWinner(); gameView.removeEvent; }
    };
    return {newGame, gameController,};
})();

const gameView = (() => {
    const resetBoard = () => {
        cells = document.querySelectorAll(".cell");
        cells.forEach(cell => { cell.innerHTML = ''; });
        document.getElementById('winner').innerHTML = '';
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
    }
    const updateCell = () => {
        event.target.innerHTML = turnSide;
        gameLogic.gameController();
        turnSide = (turnSide === 'x') ? 'o' : 'x';
        turn++;
    };
    const displayWinner = () => {
        winner = (playerOne.side === turnSide) ? playerOne.name : playerTwo.name;
        document.getElementById('winner').innerHTML = `Player ${winner} has won the game!`;
    }
    return {addEvent, resetBoard, displayWinner, removeEvent};
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
let playerTwo = null
let turnSide = null;
let turn = 0;