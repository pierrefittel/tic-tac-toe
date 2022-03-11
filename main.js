const gameBoard = (() => {
    //Creates a new empty virtual game board array.
    const newBoard = () => {
        const board = new Array('' * 9);
        return board;
    };
    const addEvent = (elements) => {
        elements.forEach(element => {
            element.addEventListener("mousedown", updateCell, { once : true });
        });
    };
    const updateCell = () => {
        event.target.innerHTML = side;
        playedCell = event.target.id;
        side = (side === 'x') ? 'o' : 'x';
        game.boardMap.push('e');
        console.log(game.boardMap);
    };
    return {newBoard, addEvent,};
})();

const Player = (i) => {
    const name = document.getElementById(`player-${i}`).value;
    const side = (i === 1) ? 'x' : 'o';
    let winCount = 0
    return { name, side, winCount };
};

const game = (() => {
    const newGame = () => {
        const playerOne = Player(1);
        const playerTwo = Player(2);
        boardMap = gameBoard.newBoard;
        cells = document.querySelectorAll(".cell");
        gameBoard.addEvent(cells);
    };
    return {newGame, };
})();

newGame = document.getElementById("new-game");
newGame.addEventListener("click", game.newGame);

let side = 'x';
let playedCell = null;