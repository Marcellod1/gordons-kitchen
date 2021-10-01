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
        this.currOffset = this.startOffset;
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
    detectWin(){
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

    detectEnd(){
        return this.currOffset >= this.endOffset;
    }

    /* calculate the meter's total length and return it as an absolute value */
    get meterLength(){
        return Math.abs(this.endOffset - this.startOffset);
    }
}


/* Run when the document is ready */
$(document).ready(function(){

   /* Sounds */
   var action =  new Howl({src: "resources/sounds/clicking.wav", volume: 1.0});
   var quote =  new Howl({src: "resources/sounds/its_actually_quite_nice.mp3", volume: 0.1});

    var ambient = new Howl({
        src: "resources/sounds/sizzle.mp3",
        autoplay: true,
        loop: true,
        volume: 0.1
    });

    ambient.play();

    /* Animation Constants */
    const meterStartOffset = -40;
    const meterEndOffset = 620;
    const meterRate = 6;
    const acceptRegionSize = 50;
    const updateMillis = 10;

    /* Animation Variables */
    var game = new MeterGame(meterStartOffset, meterEndOffset, meterRate, acceptRegionSize);
    
    /* Update animation every "updateMillis" milliseconds*/
    setInterval(function(){
        // Update the positions of the indicator and ticket depening on the updated game state.
        var newIndicatorOffset = game.update();
        var newOrderOffset = Math.floor((game.acceptanceRegion[0] + game.acceptanceRegion[1])/2);

        $('#order-ticket').css("left", meterStartOffset + newOrderOffset);
        $('#meter-indicator').css("left", newIndicatorOffset);

        // change the steak png at thresholds on the meter
        const meterLength = game.meterLength;

        if (newIndicatorOffset < meterLength * 0.25){
            $('#steak').attr("src","resources/img/steak-raw.png");

        } else if (newIndicatorOffset < meterLength * 0.5){
            $('#steak').attr("src","resources/img/steak-med.png");
            
        } else {
            $('#steak').attr("src","resources/img/steak-well.png");
        }

        // Handle the case where the indicator hits the end of the meter - reset the game.
        if(game.detectEnd()){
            quote = new Howl({src: "resources/sounds/you-donkey.mp3", volume: 0.5});
            quote.play();
            game.reset();
        }
    }, updateMillis);


    /* Button mousedown event */
    $("#button").mousedown(function(){
        // Change png for the button, stop the indicator.
        $("#button").attr("src","resources/img/knob-off.png");
        game.stop();
        action.play();

        // Check if the animation mouse indicator is in the region of acceptance.
        if(game.detectWin()){
            quote = new Howl({src: "resources/sounds/perfectly_cooked_in_the_middle.mp3"});

        } else {
            quote = new Howl({src: "resources/sounds/you-donkey.mp3"}); 
        }

        // Play sounds depending on decided context, reset the game state
        quote.play();
        game.reset();
    });
    

    /* Button mouseup event */
    $("#button").mouseup(function(){
        $("#button").attr("src","resources/img/knob-high.png");
    });
});





