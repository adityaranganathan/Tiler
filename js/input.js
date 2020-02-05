window.onkeydown  = function(event){
    event.preventDefault();

    var move = null;
    switch(event.keyCode){
        case 37: move = movementValues.left; //left
         break;
        case 38: move = movementValues.up; //up
        break;
        case 39: move = movementValues.right; //right
        break;
        case 40: move = movementValues.down; //down
        break;
        default: move = null;
    }

    keyboardMoveEvent(move)
}


document.getElementById('btn_new_game').onclick = startGame
document.getElementById('btn_easy').onclick = function(){
    setDiff(0)
}
document.getElementById('btn_medium').onclick = function(){
    setDiff(1)
}
document.getElementById('btn_hard').onclick = function(){
    setDiff(2)
}

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, {passive:false});

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             
         evt.originalEvent.touches;
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    evt.preventDefault();
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            
            keyboardMoveEvent(movementValues.left)
        } else {
            keyboardMoveEvent(movementValues.right)
        }                       
    } else {
        if ( yDiff > 0 ) {
            keyboardMoveEvent(movementValues.up)
        } else { 
            keyboardMoveEvent(movementValues.down)
        }                                                                 
    }
    xDown = null;
    yDown = null;                                             
};
