class Game {
    constructor(x){
        this.time = 0;
        this.timer = function(){
            if(this.interval)
                clearInterval(this.interval);
            this.interval = setInterval(()=>{
            this.time +=1;
            var minutes = Math.floor(this.time / 60);
            var seconds = this.time - minutes * 60;

            document.getElementById("timer").innerHTML = minutes+":"+seconds
        },1000)
    }
        this.board = document.getElementById("board");
        tileSize = 400/x;
        this.sizeX = x;
        this.sizeY = x;
        this.holeX = x-1;
        this.holeY = x-1;
        this.log = []
        this.started = false;
    }

    setup(){
        var count = 1;
        for(let i = 0; i < this.sizeX; i++){
            for(let j = 0; j< this.sizeY; j++){
                if(count < this.sizeX*this.sizeY){
                    this.addTile(count,i,j);
                    count++;
                }
            }
        }
    }

    addTile(count,x,y){
        var gridItem = document.createElement("div");
        gridItem.className = "grid-cell shadow";
        gridItem.style.top = x*tileSize+"px";
        gridItem.style.left = y*tileSize+"px";
        gridItem.style.height = 0.9*tileSize+"px";
        gridItem.style.width = 0.9*tileSize+"px";
        gridItem.style.margin = 0.05*tileSize+"px";

        gridItem.style.lineHeight = tileSize+"px";
        gridItem.dataset.x = x
        gridItem.dataset.y = y
        gridItem.style.borderRadius = 0.1*tileSize+"px"
        gridItem.style.fontSize = 0.5*tileSize+"px";
        gridItem.innerHTML = count;
        this.board.appendChild(gridItem);
    }

    randomize(steps){
            if(steps == 0){
                this.timer();
                this.time = 0;
                this.started = true
                return
            }
            var move = parseInt(Math.random() *4);
            if(isMoveValid(move)){
                keyboardMoveEvent(move)
                setTimeout(()=>{
                    this.randomize(--steps)
                },0)
            }else{
                this.randomize(steps)
            }
    }

    start(){
        this.started = false;
        this.log = []
        this.updateLog()
        this.randomize(this.sizeX*this.sizeX*10);
    }

    updateLog(){
        var logholder = document.getElementById("logs");
        logholder.innerHTML= "";
        for (let i = 0; i< this.log.length; i ++){
            var log = document.createElement("div");
            log.className = "log"
            log.innerHTML = "Moved "+this.log[i].value+" to "+this.log[i].x+","+this.log[i].y
            logholder.appendChild(log)
        }
    }

    reset(){
        this.time = 0;
        this.board.innerHTML = ""
    }

}

var game = null
var movement = null

setDiff(0)


function startGame(event){
    game.start()
}

function setDiff(diff){

    if(game)
        game.reset();

   switch(diff){
       case 0:
        game = new Game(3);
        break;
        case 1:
        game = new Game(5);    
        break;
        case 2:
        game = new Game(9);
        break;
    }
    movement = new Movement(game);
    game.setup();
}

function keyboardMoveEvent(move){
    switch(move){
        case movementValues.left:
        movement.left(getElementAtPosition(game.holeX,game.holeY+1))
        break;
        case movementValues.up:
        movement.top(getElementAtPosition(game.holeX+1,game.holeY))
        break;
        case movementValues.right:
        movement.right(getElementAtPosition(game.holeX,game.holeY-1))
        break;
        case movementValues.down:
        movement.bottom(getElementAtPosition(game.holeX-1,game.holeY))
        break;
    }
}


function isMoveValid(move){
    var elem = null;
    switch(move){
        case movementValues.left:
       elem = getElementAtPosition(game.holeX,game.holeY+1)
        break;
        case movementValues.up:
       elem = getElementAtPosition(game.holeX+1,game.holeY)
        break;
        case movementValues.right:
       elem = getElementAtPosition(game.holeX,game.holeY-1)
        break;
        case movementValues.down:
       elem = getElementAtPosition(game.holeX-1,game.holeY)
        break;
    }

    if(elem)
    return true
    else return false
}


function getElementAtPosition(x,y){
    var grids = document.getElementsByClassName("grid-cell");
    for(let i = 0; i< grids.length; i++){
        if(parseInt(grids[i].dataset.x) === x && parseInt(grids[i].dataset.y) === y){
            return grids[i]
        }
    }
    return null;
}