class MeterAnimation {
    constructor(meterStartOffset, meterEndOffset, rate) {
      this.startOffset = meterStartOffset;
      this.endOffset = meterEndOffset;
      this.currOffset = meterStartOffset;

      this.offsetRate = rate;
      this.isPlaying = true;
    }

    /* Increments the "meter-indicator" position each time this is called 
     * Returns the updated offset for the indicator
     */
    update(){
        if(!this.isPlaying){
            return;
        }
        var updateMeterOffset =  this.currOffset + this.offsetRate;

        if(updateMeterOffset > this.endOffset){
            updateMeterOffset = this.endOffset;
        }

        this.currOffset = updateMeterOffset;
        return updateMeterOffset;
    }

    /* Stops the animation. Each subsequent call of this.update() will have no effect */
    stop(){
        this.isPlaying = false;
    }

    /* Starts the animation. Each subsequent call of this.update() will update the animation */
    start(){
        this.isPlaying = true;
    }

    /* Resets the "meter-indicator" position to the startig offset for the animation */
    reset(){
        this.currMeterOffset = this.meterStartOffset;
    }
}


$(document).ready(function(){
    /* Animation Constants */
    const meterStartOffset = -40;
    const meterEndOffset = 620;

    /* Animation Variables */
    var meterRate = 5;
    var updateMillis = 20;
    var anim = new MeterAnimation(meterStartOffset, meterEndOffset, meterRate);
    
    /* Update animation every "updateMillis" milliseconds*/
    setInterval(function(){
        var newOffset = anim.update();
        $('#meter-indicator').css("left", newOffset);
    }, updateMillis);

    /* Button mousedown event */
    $("#button").mousedown(function(){
        $("#button").attr("src","resources/img/red-button-pressed.png");
        console.log("Button Down");
        var soundClip = new Howl({
            src: ['resources/sounds/waterphone.mp3']
        });
        soundClip.play();
    });

    /* Button mouseup event */
    $("#button").mouseup(function(){
        $("#button").attr("src","resources/img/red-button.png");
        console.log("Button Up");
        anim.stop();
    });    
});





