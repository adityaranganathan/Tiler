
class Movement {
    constructor(game){
        this.game = game;
    }

    move(elem,x,y){

        if(this.game.started == true){
            this.game.log.push({
                value: elem.innerHTML,
                x: x,
                y: y
            })
            this.game.updateLog();
        }

        var tempHoleX = this.game.holeX;
        var tempHoleY = this.game.holeY;

        this.game.holeX = parseInt(elem.dataset.x);
        this.game.holeY = parseInt(elem.dataset.y);

        elem.dataset.x = tempHoleX;
        elem.dataset.y = tempHoleY;

        window.requestAnimationFrame( ()=>{
            elem.style.setProperty("top", (x*tileSize)+"px");
            elem.style.setProperty("left", (y*tileSize)+"px");
        })
    }

    right(elem){
        if(!elem)
        return;
        var top = parseInt(elem.dataset.x);
        var left = parseInt(elem.dataset.y);
        this.move(elem,top,left+1);   
    }

    left(elem){
        if(!elem)
        return;
        var top = parseInt(elem.dataset.x);
        var left = parseInt(elem.dataset.y);
        this.move(elem,top,left-1);
    }

    top(elem){
        if(!elem)
        return;
        var top = parseInt(elem.dataset.x);
        var left = parseInt(elem.dataset.y);
        this.move(elem,top-1,left);
    }

    bottom(elem){
        if(!elem)
        return;
        var top = parseInt(elem.dataset.x);
        var left = parseInt(elem.dataset.y);
        this.move(elem,top+1,left);
    }

}
