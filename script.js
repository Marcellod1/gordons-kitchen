class MeterAnimation {
    constructor(meterStartOffset, meterEndOffset, rate) {
      this.startOffset = meterStartOffset;
      this.endOffset = meterEndOffset;
      this.offsetRate = rate;
      this.isPlaying = true;
    }

    update(){
        if(!this.isPlaying){
            return;
        }

        var currMeterOffset = parseInt($('#meter-indicator').css("left"));
        var updateMeterOffset =  currMeterOffset + this.offsetRate;

        if(updateMeterOffset < this.endOffset){
            $('#meter-indicator').css("left", currMeterOffset + this.offsetRate);
        }
    }

    stop(){
        this.isPlaying = false;
    }

    start(){
        this.isPlaying = true;
    }

    reset(){
        $('#meter-indicator').css("left", this.startOffset);
    }
}


$(document).ready(function(){
    /* Animation Constants */
    const meterStartOffset = -40;
    const meterEndOffset = 620;
    const meterRate = 5;
    const updateMillis = 20;

    var anim = new MeterAnimation(meterStartOffset, meterEndOffset, meterRate);
    
    setInterval(function(){
        anim.update()
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





