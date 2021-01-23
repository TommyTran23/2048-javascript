export default class Game {
    constructor(tiles) {
        this._onMove = [];
        this._onWin = [];
        this._onLose = [];
        this.tiles = tiles;
        this.totalTiles = this.tiles * this.tiles;
        this.gameBoard = [];
        for (let i = 0; i < this.totalTiles; i++) { this.gameBoard.push(0) }; // initial empty board

        // initial random tiles
        let firstTile = Math.floor(Math.random() * this.totalTiles);
        let secondTile = Math.floor(Math.random() * this.totalTiles);
        while (firstTile == secondTile) {  // guarantee two different positions on the board
            secondTile = Math.floor(Math.random() * this.totalTiles);
        }
        this.gameBoard[firstTile] = generateTile();
        this.gameBoard[secondTile] = generateTile();

        // create logic board to handle functions
        let tempBoard = [...this.gameBoard];
        this.logicBoard = [];
        while (tempBoard.length) {
            this.logicBoard.push(tempBoard.splice(0, this.tiles));
        }

        // set gameState
        this.gameState = {
            board: this.gameBoard,
            score: 0,
            won: false,
            over: false
        }
    }

    setupNewGame() { // resets the game back to a random starting position
        this.gameBoard = [];
        for (let i = 0; i < this.totalTiles; i++) { this.gameBoard.push(0) }; // initial empty board
        // initial random tiles
        let firstTile = Math.floor(Math.random() * this.totalTiles);
        let secondTile = Math.floor(Math.random() * this.totalTiles);
        while (firstTile == secondTile) {  // guarantee two different positions on the board
            secondTile = Math.floor(Math.random() * this.totalTiles);
        }
        this.gameBoard[firstTile] = generateTile();
        this.gameBoard[secondTile] = generateTile();

        let tempBoard = [...this.gameBoard];
        this.logicBoard = [];
        while (tempBoard.length) {
            this.logicBoard.push(tempBoard.splice(0, this.tiles));
        }
        // set gameState
        this.gameState = {
            board: this.gameBoard,
            score: 0,
            won: false,
            over: false
        }

    }

    loadGame(gameState) {
        this.gameState = gameState;
        this.gameBoard = this.gameState.board;
        let tempBoard = [...this.gameBoard];
        this.logicBoard = [];
        while (tempBoard.length) {
            this.logicBoard.push(tempBoard.splice(0, this.tiles));
        }
       
    }

    move(direction) {
        let boardMoved;
        let addToScore;
        let finalBoard;
        let flippedBoard;
        let rotatedBoard;
        let originalBoard;
        switch (direction) {
            case "left":
                originalBoard = [...this.logicBoard]; // original board to compare
                boardMoved = moveLeftFinal(this.logicBoard, this.tiles)[0];
                addToScore = moveLeftFinal(this.logicBoard, this.tiles)[1];
                this.gameState.won = moveLeftFinal(this.logicBoard, this.tiles)[2];
                this.logicBoard = [...boardMoved];
                if (compareGrids(originalBoard, this.logicBoard, this.tiles)) { // check to make sure moves possible
                    finalBoard = placeRandomTile(this.logicBoard, this.tiles); // generate new tile if a move was actually made
                    this.logicBoard = [...finalBoard];
                    this.gameBoard = [].concat(...finalBoard); // make sure to set gamestate and logicboard after each move and placement
                    this.gameState.score += addToScore;
                    this.gameState.board = this.gameBoard;
                    break;
                } else {
                    this.logicBoard = [...this.logicBoard];
                    this.gameBoard = [].concat(...this.logicBoard); // make sure to set gamestate and logicboard after each move and placement
                    this.gameState.score += addToScore;
                    this.gameState.board = this.gameBoard;
                    break;
                }

            case "right":
                originalBoard = [...this.logicBoard];
                // reflect board first then do functions then flip back
                flippedBoard = reflectBoard(this.logicBoard, this.tiles);
                this.logicBoard = [...flippedBoard];
                // main logic
                boardMoved = moveLeftFinal(this.logicBoard, this.tiles)[0];
                addToScore = moveLeftFinal(this.logicBoard, this.tiles)[1];
                this.gameState.won = moveLeftFinal(this.logicBoard, this.tiles)[2];
                this.logicBoard = [...boardMoved];
                if (compareGrids(originalBoard, this.logicBoard, this.tiles)) {
                    finalBoard = placeRandomTile(this.logicBoard, this.tiles); // generate new tile
                    this.logicBoard = reflectBoard(finalBoard, this.tiles); // flip the board back to normal
                    this.gameBoard = [].concat(...this.logicBoard); // make sure to set gamestate and logicboard after each move and placement
                    this.gameState.score += addToScore;
                    this.gameState.board = this.gameBoard;
                    break;
                } else {
                    this.logicBoard = reflectBoard(this.logicBoard, this.tiles); // flip the board back to normal
                    this.gameBoard = [].concat(...this.logicBoard); // make sure to set gamestate and logicboard after each move and placement
                    this.gameState.score += addToScore;
                    this.gameState.board = this.gameBoard;
                    break;
                }
            case "down":
                originalBoard = [...this.logicBoard];
                // rotate 90 degrees once so that it's facing the left
                rotatedBoard = rotate90Degrees(this.logicBoard);
                this.logicBoard = [...rotatedBoard];
                // main logic
                boardMoved = moveLeftFinal(this.logicBoard, this.tiles)[0];
                addToScore = moveLeftFinal(this.logicBoard, this.tiles)[1]; // score
                this.gameState.won = moveLeftFinal(this.logicBoard, this.tiles)[2];
                this.logicBoard = [...boardMoved];
                this.logicBoard = rotate90Degrees(this.logicBoard, this.tiles); // rotate 3 times to get back to normal position
                this.logicBoard = rotate90Degrees(this.logicBoard, this.tiles);
                this.logicBoard = rotate90Degrees(this.logicBoard, this.tiles);
                if (compareGrids(originalBoard, this.logicBoard, this.tiles)) {
                    finalBoard = placeRandomTile(this.logicBoard, this.tiles); // generate new tile
                    this.gameBoard = [].concat(...finalBoard); // make sure to set gamestate and logicboard after each move and placement
                    this.gameState.score += addToScore;
                    this.gameState.board = this.gameBoard;
                    break;
                } else {
                    this.gameBoard = [].concat(...this.logicBoard); // make sure to set gamestate and logicboard after each move and placement
                    this.gameState.score += addToScore;
                    this.gameState.board = this.gameBoard;
                    break;
                }

            case "up":
                originalBoard = [...this.logicBoard];
                // rotate 3 times 90 degrees to get left facing
                rotatedBoard = rotate90Degrees(this.logicBoard);
                rotatedBoard = rotate90Degrees(rotatedBoard);
                rotatedBoard = rotate90Degrees(rotatedBoard);
                rotatedBoard
                this.logicBoard = [...rotatedBoard];
                // main logic
                boardMoved = moveLeftFinal(this.logicBoard, this.tiles)[0];
                addToScore = moveLeftFinal(this.logicBoard, this.tiles)[1];
                this.gameState.won = moveLeftFinal(this.logicBoard, this.tiles)[2];
                this.logicBoard = [...boardMoved];
                this.logicBoard = rotate90Degrees(this.logicBoard, this.tiles); // rotate once to get back to up position
                if (compareGrids(originalBoard, this.logicBoard, this.tiles)) {
                    finalBoard = placeRandomTile(this.logicBoard, this.tiles); // generate new tile
                    this.gameBoard = [].concat(...finalBoard); // make sure to set gamestate and logicboard after each move and placement
                    this.gameState.score += addToScore;
                    this.gameState.board = this.gameBoard;
                    break;
                } else {
                    this.gameBoard = [].concat(...this.logicBoard); // make sure to set gamestate and logicboard after each move and placement
                    this.gameState.score += addToScore;
                    this.gameState.board = this.gameBoard;
                    break;
                }
        }

        for (let i = 0; i < this.totalTiles; i++) {
            if (this.gameState.board[i] >= 2048) {
                this.gameState.won = true;
            }
        }

        if(checkCantMove(this.logicBoard, this.tiles)) {
            this.gameState.over = true;
        }

        if (this.gameState.over) {
            this._onLose.forEach(x => x(this.gameState));
        }

        if (this.gameState.won) {
            this._onWin.forEach(x => x(this.gameState));
        }

        for (let i = 0; i < this._onMove.length; i++) {
            this._onMove.forEach(x => x(this.gameState));
        }
    }

    toString() { // for testing purposes
        let stringifiedBoard = "";
        for (let i = 0; i < this.totalTiles; i++) {
            if ((i + 1) % 4 == 0) {
                if (this.gameBoard[i] == 0) {
                    stringifiedBoard = stringifiedBoard.concat("[] ");
                } else {
                    stringifiedBoard = stringifiedBoard.concat(`[${this.gameBoard[i]}] `);
                }
                stringifiedBoard = stringifiedBoard.concat("\n");
            } else if (this.gameBoard[i] == 0) {
                stringifiedBoard = stringifiedBoard.concat("[] ");
            } else {
                stringifiedBoard = stringifiedBoard.concat(`[${this.gameBoard[i]}] `);
            }
        }
        return stringifiedBoard;
    }

    onMove(callback) {
        this._onMove.push(callback);
    }

    onWin(callback) {
        this._onWin.push(callback);
    }

    onLose(callback) {
        this._onLose.push(callback);
    }

    getGameState() {
        return this.gameState;
    }
}

// create tile functions
function generateTile() { // generates random tile 2 (.9 chance) or 4 (.1 chance)
    let tile = 0;
    let probability = Math.random(); // 0-1
    if (probability > .9) {
        tile = 4;
    } else {
        tile = 2;
    }
    return tile;
}

function placeRandomTile(boardtoplace, tiles) { // after board is legally moved then this will place a random tile on the board
    let randomBoard = [...boardtoplace];
    let firstPosition = Math.floor(Math.random() * tiles);
    let secondPosition = Math.floor(Math.random() * tiles);
    let tracker = true;
    while (tracker) {
        if (randomBoard[firstPosition][secondPosition] == 0) {
            randomBoard[firstPosition][secondPosition] = generateTile(); // places random tile if it is empty
            tracker = false;
        }
        firstPosition = Math.floor(Math.random() * tiles);
        secondPosition = Math.floor(Math.random() * tiles);
    }
    return randomBoard;
}

// movement functions
function moveLeftRow(boardtomove, tiles, position) { // moves one row to the left
    // check for merges
    let tempArray = [];
    for (let i = 0; i < tiles; i++) {
        if (boardtomove[position][i] != 0) {
            tempArray.push(boardtomove[position][i]);
        }
    }
    let remainder = tiles - tempArray.length;
    for (let i = 0; i < remainder; i++) {
        tempArray.push(0);
    }
    return tempArray;
}

function moveLeft(boardtomove, tiles) { // moves entire board to the left
    let shiftedBoard = [...boardtomove];
    for (let i = 0; i < tiles; i++) {
        shiftedBoard[i] = moveLeftRow(boardtomove, tiles, i);
    }
    return shiftedBoard;
}

function combineLeftRow(boardtomove, tiles, position) { // combines equal numbers of one row
    let tempArray = [...boardtomove[position]];
    let newScore = 0;
    let gameWon = false;
    for (let i = 0; i <= tiles - 1; i++) {
        let first = tempArray[i];
        let second = tempArray[i + 1];
        if (first == second) { // combine if same number
            tempArray[i] = first + second;
            newScore += tempArray[i];
            tempArray[i + 1] = 0;

            if (tempArray[i] >= 2048) {
                gameWon = true;
            }
        }
    }
    let arrayReturned = [tempArray, newScore, gameWon];
    return arrayReturned;
}

function combineLeft(boardtomove, tiles) { // combines entire board
    let combinedBoard = [...boardtomove];
    let newTotalScore = 0;
    let gameStateWon = false;
    for (let i = 0; i < tiles; i++) {
        combinedBoard[i] = combineLeftRow(boardtomove, tiles, i)[0];
        newTotalScore += combineLeftRow(boardtomove, tiles, i)[1];
        if (combineLeftRow(boardtomove, tiles, i)[2]) {
            gameStateWon = true;
        }
    }
    let arrayReturned = [combinedBoard, newTotalScore, gameStateWon];
    return arrayReturned;
}

function moveLeftFinal(boardtomove, tiles) { // 2048 move function, returns final board [0] and gamescore to be added to current game score [1]
    let shiftedBoard = moveLeft(boardtomove, tiles);
    let combinedBoard = combineLeft(shiftedBoard, tiles)[0];
    let gameScore = combineLeft(shiftedBoard, tiles)[1];
    let gameStateWon = combineLeft(shiftedBoard, tiles)[2];
    let finalBoard = moveLeft(combinedBoard, tiles);
    let arrayReturned = [finalBoard, gameScore, gameStateWon];
    return arrayReturned;
}

// flip/rotate board functions to work on moveLeftFinal();
function reflectBoard(boardtoreflect, tiles) { // reflect the board across vertical line through the board
    let reflectedBoard = [...boardtoreflect];
    for (let i = 0; i < tiles; i++) {
        reflectedBoard[i].reverse();
    }
    return reflectedBoard;
}

function rotate90Degrees(boardtorotate) { // rotate board 90 degrees clockwise
    let originalGrid = [...boardtorotate];
    let rotatedGrid = [...boardtorotate];
    for (let i = 0; i < originalGrid.length; i++) {
        let row = originalGrid[i].map(function (x, j) {
            let k = (originalGrid.length - 1) - j;
            return rotatedGrid[k][i];
        })
        originalGrid[i] = row;
    }
    return originalGrid;
}

// compare moved and unmoved grid
function compareGrids(original, newBoard, tiles) { // returns true if it moved
    for (let i = 0; i < tiles; i++) {
        for (let j = 0; j < tiles; j++) {
            if (original[i][j] !== newBoard[i][j]) {
                return true;
            }
        }
    }
    return false;
}

// check if any moves can be made
function checkCantMove(boardtocheck, tiles) {
    for (let i = 0; i < tiles; i++) {
        for (let j = 0; j < tiles; j++) {
            let currentTile = boardtocheck[i][j];
            // check left
            if (j - 1 >= 0) {
                if (boardtocheck[i][j-1] == 0) {
                    return false;
                } else if (boardtocheck[i][j-1] == currentTile) {
                    return false;
                }
            }
            // check right
            if (j + 1 < tiles) {
                if (boardtocheck[i][j+1] == 0) {
                    return false;
                } else if (boardtocheck[i][j+1] == currentTile) {
                    return false;
                }
            }
            // check up
            if (i - 1 >= 0) {
                if (boardtocheck[i-1][j] == 0) {
                    return false;
                } else if (boardtocheck[i-1][j] == currentTile) {
                    return false;
                }
            }
            // check down
            if (i + 1 < tiles) {
                if (boardtocheck[i+1][j] == 0) {
                    return false;
                } else if (boardtocheck[i+1][j] == currentTile) {
                    return false
                }
            }
        } 
    }
    return true;
}