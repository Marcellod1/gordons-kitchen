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


    /* Resets the "meter-indicator" position to the starting offset for the animation */
    reset(){
        this.currOffset = this.meterStartOffset;
        this.isPlaying = true;
        this.randomizeAcceptanceRegion();
    }


    /* Randomizes the acceptance region offsets */
    randomizeAcceptanceRegion(){
        const min = this.startOffset + this.meterLength * 0.25;
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

   
    get meterLength(){
        return Math.abs(this.endOffset - this.startOffset);
    }
}


$(document).ready(function(){
    /* Animation Constants */
    const meterStartOffset = -40;
    const meterEndOffset = 620;
    const meterRate = 5;
    const acceptRegionSize = meterRate * 15;
    const updateMillis = 10;

    /* Animation Variables */
    var game = new MeterGame(meterStartOffset, meterEndOffset, meterRate, acceptRegionSize);
    console.log("Acceptance Region: " + game.acceptanceRegion);
    
    /* Update animation every "updateMillis" milliseconds*/
    setInterval(function(){
        var newIndicatorOffset = game.update();
        var newOrderOffset = Math.floor((game.acceptanceRegion[0] + game.acceptanceRegion[1])/2);
        $('#order-ticket').css("left", meterStartOffset + newOrderOffset);
        $('#meter-indicator').css("left", newIndicatorOffset);

    }, updateMillis);


    /* Button mouseup event */
    $("#button").mouseup(function(){
        // Change png for the button, stop the indicator.
        $("#button").attr("src","resources/img/red-button.png");
        game.stop();

        var soundClip = new Howl({src: "resources/sounds/waterphone.mp3"});

        // Check if the animation mouse indicator is in the region of acceptance.
        if(game.inAcceptanceRegion()){
            console.log("WIN");
            soundClip = new Howl({src: "resources/sounds/its_actually_quite_nice.mp3"});

        } else {
            console.log("FAIL");
            soundClip = new Howl({src: "resources/sounds/you-donkey.mp3"}); 
        }
        soundClip.play();
    });    
});





