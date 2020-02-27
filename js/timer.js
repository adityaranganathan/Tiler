"use strict"

class Timer{
    constructor(timerText){
       this.total_seconds = 0;
       this.minutes = 0;
       this.seconds = 0;
       this.text = timerText;
    }

    start(){
        let _this = this
        this.timer = setInterval(function(){_this.time(_this);}, 1000);
    }

    time(_this){
        _this.minutes = (parseInt(_this.total_seconds/60)).toString();
        _this.seconds = (_this.total_seconds%60).toString();
        if(_this.seconds.length === 1)
            _this.seconds = "0"+_this.seconds;
        if(_this.minutes.length === 1)
            _this.minutes = "0"+_this.minutes;
        _this.text.innerText = _this.minutes+":"+_this.seconds;
        _this.total_seconds += 1;
    }

    stop(){
       clearInterval(this.timer);
    }

    reset(){
       this.total_seconds = 0;
       this.minutes = 0;
       this.seconds = 0;
       this.text.innerText = "00:00";
    }
}