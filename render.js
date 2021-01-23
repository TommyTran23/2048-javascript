import Game from "./engine/game.js";

function updateGame(state) {
    $('#score').text("Score: " + state.score);
    for (let i = 0; i < 16; i++) {
        let currenttile = "#tile" + i;
        let tileColor = chooseBackground(state.board[i]);
        if (state.board[i] == 0) {
            $(currenttile).text('');
            $("#tile"+i).css("background-color", tileColor);
        } else {
            $(currenttile).text(state.board[i]);
            $("#tile"+i).css("background-color", tileColor);
        } 
    }
    
};

function chooseBackground(tile) {
    if(tile == 0) {
        return '#bfc0c0';
    } else if(tile == 2) {
        return '#F29E4C';
    } else if(tile == 4) {
        return '#F1C453';
    } else if(tile == 8) {
        return '#EFEA5A';
    } else if(tile == 16) {
        return '#B9E769';
    } else if(tile == 32) {
        return '#83E377';
    } else if (tile == 64) {
        return '#16DB93';
    } else if (tile == 128) {
        return '#0DB39E';
    } else if (tile == 256) {
        return '#048BA8';
    } else if (tile == 512) {
        return '#2C699A';
    } else if (tile == 1024) {
        return '#54478C';
    } else {
        return '#7678ed';
    }
}

$(function() {
    let game = new Game(4);

    $("#score").append(game.gameState.score);

    for (let i = 0; i < 16; i++) {
        let currenttile = "#tile" + i;
        let tileColor = chooseBackground(game.gameState.board[i]);
        if (game.gameState.board[i] == 0) {
            $(currenttile).text('');
            $("#tile"+i).css("background-color", tileColor);
        } else {
            $(currenttile).text(game.gameState.board[i]);
            $("#tile"+i).css("background-color", tileColor);
        } 
    }

    game.onMove(function(state) {
        updateGame(state);
    });

    game.onWin(function(state) {
        $('#winOrOver').text('You Won!');
    });

    game.onLose(function(state) {
        $('#winOrOver').text('You lost!');
    });

    $("#resetGame").on('click', function(e) {
        e.preventDefault();
        game.setupNewGame();
        $('#winOrOver').text('');
        updateGame(game.getGameState());
    });

    $(document).keydown(function(e) {
        e.preventDefault();
        if (e.key == "ArrowLeft") {
            game.move('left');
        } else if (e.key == "ArrowRight") {
            game.move('right');
        } else if (e.key == "ArrowUp") {
            game.move('up');
        } else if (e.key == "ArrowDown") {
            game.move('down');
        }
    });
})