"use strict";

window.onkeydown  = function(event){
    
    switch(event.keyCode){
        case 37: 
        window.game.move(moveCodes.left);
        event.preventDefault();
        break;
        case 38: 
        window.game.move(moveCodes.up);
        event.preventDefault();
        break;
        case 39: 
        window.game.move(moveCodes.right);
        event.preventDefault();
        break;
        case 40: 
        window.game.move(moveCodes.down);
        event.preventDefault();
        break;
    }
    
}