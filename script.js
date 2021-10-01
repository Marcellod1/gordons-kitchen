class MeterGame{

    /* Constructor */
    constructor(meterStartOffset, meterEndOffset, rate, acceptRegionSize) {
        this.startOffset = meterStartOffset;
        this.endOffset = meterEndOffset;
        this.offsetRate = rate;
        this.regionSize = acceptRegionSize;

        this.acceptanceRegion = []
        this.currOffset = meterStartOffset;
        this.isPlaying = true;

        this.randomizeAcceptanceRegion();
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
        this.currOffset = this.meterStartOffset;
        this.randomizeAcceptanceRegion();
    }

    get meterLength(){
        return Math.abs(this.endOffset - this.startOffset);
    }


    /* Randomizes the acceptance region offsets */
    randomizeAcceptanceRegion(){
        const min = this.startOffset + this.regionSize;
        const max = this.endOffset - this.regionSize;
        const regionStart = Math.floor(Math.random() * (max - min) + min);

        this.acceptanceRegion = [regionStart, regionStart + this.regionSize];
    }


    /* checks if the currOffset for the indicator is within the acceptance region */
    inAcceptanceRegion(){
        if(this.currOffset <= this.acceptanceRegion[1] &&
           this.currOffset >= this.acceptanceRegion[0])
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}


$(document).ready(function(){
    /* Animation Constants */
    const meterStartOffset = -40;
    const meterEndOffset = 620;
    const meterRate = 5;
    const acceptRegionSize = meterRate * 10;
    const updateMillis = 10;

    /* Animation Variables */
    var game = new MeterGame(meterStartOffset, meterEndOffset, meterRate, acceptRegionSize);
    console.log("Acceptance Region: " + game.acceptanceRegion);

    /* Update animation every "updateMillis" milliseconds*/
    setInterval(function(){
        var newOffset = game.update();
        $('#meter-indicator').css("left", newOffset);
        console.log( game.currOffset + " " + game.inAcceptanceRegion());

    }, updateMillis);

    /* Button mousedown event */
    $("#button").mousedown(function(){
        $("#button").attr("src","resources/img/red-button-pressed.png");
        console.log("Button Down");
    });

    /* Button mouseup event */
    $("#button").mouseup(function(){
        $("#button").attr("src","resources/img/red-button.png");
        console.log("Button Up");
        game.stop();

        // Check if the animation mouse indicator is in the region of acceptance
        
        var soundClip = new Howl({
            src: ['resources/sounds/waterphone.mp3']
        });
        soundClip.play();
    });    
});





