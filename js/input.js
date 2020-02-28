"use strict";

window.onkeydown = function (event) {

    switch (event.keyCode) {
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

let gameSection = document.querySelector(".main-game-section");

gameSection.addEventListener('touchstart', handleTouchStart, false);
gameSection.addEventListener('touchmove', handleTouchMove, { passive: false });

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
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0)
            window.game.move(moveCodes.left);
        else
            window.game.move(moveCodes.right);
    }
    else {
        if (yDiff > 0)
            window.game.move(moveCodes.up);
        else
            window.game.move(moveCodes.down);
    }
    xDown = null;
    yDown = null;
}