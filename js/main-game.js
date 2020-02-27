
"use strict";

class Game {

    constructor(gridSize, game_board, timerText, successText) {
        this.gridSize   = gridSize;
        this.game_board = game_board;
        this.timer      = new Timer(timerText);
        this.success    = successText;
        this.margin     = 0.9;
        this.offset     = 0;
    }

    initialise() {
        this.gridHeight           = this.game_board.getBoundingClientRect().height;
        this.cellSize             = Math.floor(this.gridHeight / this.gridSize);
        this.emptycell            = { "x": this.gridSize - 1, "y": this.gridSize - 1 };
        this.game_started         = false;
        this.cells                = [];
        this.game_board.innerHTML = "";
        this.timer.reset();
        this.timer.stop();
        document.documentElement.style.setProperty('--grid-size', this.gridSize);
        document.documentElement.style.setProperty('--cell-size', (this.margin * this.cellSize) + "px");
    }

    setup() {
        this.initialise();

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (i == this.gridSize - 1 && j == this.gridSize - 1)
                    continue;

                let cell = document.createElement("div");
                let cellText = document.createElement("p");

                cellText.textContent = (i * this.gridSize) + j + 1;
                cellText.setAttribute("class", "cell-text");
                cell.appendChild(cellText);

                cell.dataset.x = i;
                cell.dataset.y = j;
                if (this.cells[i] === undefined)
                    this.cells[i] = [];
                this.cells[i].push(cell);

                this.offset = (1 - this.margin) / 2 * this.cellSize;
                cell.style.setProperty("transform", "translate3d(" + (this.offset + cell.dataset.y * this.cellSize) + "px," + (this.offset + cell.dataset.x * this.cellSize) + "px,0px)");
                this.game_board.appendChild(cell);
            }
        }
    }

    redraw() {

        game.gridHeight = game.game_board.getBoundingClientRect().height;
        game.cellSize = Math.floor(game.gridHeight / game.gridSize);
        game.offset = (1 - game.margin) / 2 * game.cellSize;
        document.documentElement.style.setProperty('--cell-size', (game.margin * game.cellSize) + "px");

        for (let i = 0; i < game.gridSize; i++) {
            for (let j = 0; j < game.gridSize; j++) {

                if (game.cells[i][j]) {
                    game.cells[i][j].style.setProperty("transform", "translate3d(" + (game.offset + game.cells[i][j].dataset.y * game.cellSize) + "px," + (game.offset + game.cells[i][j].dataset.x * game.cellSize) + "px,0px)");
                }
            }
        }
    }

    move(direction) {
        if (this.game_started === false) {
            this.success.style.setProperty("display", "none");
            this.randomMoves(Math.pow(this.gridSize, 2) * 2);
            this.game_started = true;
            this.timer.reset();
            this.timer.start();
            return;
        }

        if (!this.isValidMove(direction)) {
            return;
        }
        this.moveTile(direction);
        this.checkSolved();
    }

    moveTile(direction) {

        let cellToMove = null;
        let dx = 0;
        let dy = 0;
        switch (direction) {
            case moveCodes.left:
                dy = +1;
                break;
            case moveCodes.up:
                dx = +1;
                break;
            case moveCodes.right:
                dy = -1;
                break;
            case moveCodes.down:
                dx = -1;
                break;
        }

        cellToMove = this.cells[this.emptycell.x + dx][this.emptycell.y + dy];
        cellToMove.style.setProperty("transform", "translate3d(" + (this.offset + this.emptycell.y * this.cellSize) + "px," + (this.offset + this.emptycell.x * this.cellSize) + "px,0px)");
        this.emptycell.x = this.emptycell.x + dx;
        this.emptycell.y = this.emptycell.y + dy;
        this.cells[cellToMove.dataset.x][cellToMove.dataset.y] = null;
        cellToMove.dataset.x = +cellToMove.dataset.x - dx;
        cellToMove.dataset.y = +cellToMove.dataset.y - dy;
        this.cells[cellToMove.dataset.x][cellToMove.dataset.y] = cellToMove;
    }

    randomMoves(num_moves) {
        if (num_moves === 0) {
            return
        }
        let rmove = parseInt(Math.random() * 4);
        let _this = this;

        if (this.isValidMove(rmove)) {
            this.moveTile(rmove);
            setTimeout(function () { _this.randomMoves(--num_moves); }, 0);
        }
        else {
            setTimeout(function () { _this.randomMoves(num_moves); }, 0);
        }
    }

    isValidMove(move) {

        switch (move) {
            case moveCodes.left:
                if (this.emptycell.y + 1 >= this.gridSize)
                    return false;
                break;
            case moveCodes.up:
                if (this.emptycell.x + 1 >= this.gridSize)
                    return false;
                break;
            case moveCodes.right:
                if (this.emptycell.y - 1 < 0)
                    return false;
                break;
            case moveCodes.down:
                if (this.emptycell.x - 1 < 0)
                    return false;
                break;
        }
        return true;
    }

    checkSolved() {
        let count = 1;
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells.length; j++) {
                if (this.cells[i][j]) {
                    if (count != this.cells[i][j].innerText)
                        return;
                }
                count += 1;
            }
        }
        this.success.style.setProperty("display", "block");
        this.timer.stop();
        this.game_started = false;
    }
}

let defaultSize = 3;
let game_board = document.querySelector(".main-game-board");
let checkBox = document.querySelector(".theme-checkbox");
let timerText = document.querySelector(".timer");
let successText = document.querySelector(".success");
let slider = document.querySelector(".slider");

var game = new Game(defaultSize, game_board, timerText, successText);
game.setup();

checkBox.onclick = function () {

    if (this.checked == true) {
        document.documentElement.style.setProperty('--primary-color', "rgb(223, 223, 223, 1)");
        document.documentElement.style.setProperty('--shadow-color', "rgba(170, 170, 170, 0.4)");
        document.documentElement.style.setProperty('--tile-color', "#242424");
        document.documentElement.style.setProperty('--background', "#111");
    } else {
        document.documentElement.style.setProperty('--primary-color', "rgba(0,0,0,0.4)");
        document.documentElement.style.setProperty('--shadow-color', "rgba(0,0,0,0.4)");
        document.documentElement.style.setProperty('--tile-color', "white");
        document.documentElement.style.setProperty('--background', "white");
    }
}

slider.oninput = function () {
    game.gridSize = this.value;
    game.setup();
}

window.addEventListener("resize", game.redraw);