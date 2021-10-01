/* Run when the document is ready */
$(document).ready(function(){

    /* Sounds */
    var action =  new Howl({src: "resources/sounds/clicking.wav", volume: 1.0});
    var quote =  new Howl({src: "resources/sounds/its_actually_quite_nice.mp3", volume: 0.1});
    ambient.play();

    /* Animation Constants */
    const meterStartOffset = -40;
    const meterEndOffset = 620;
    const meterRate = 6;
    const acceptRegionSize = 50;
    const updateMillis = 10;

    /* Game simulation Variables */
    var game = new MeterGame(meterStartOffset, meterEndOffset, meterRate, acceptRegionSize);
    var streak = 0;
    
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
            quote = getRandomHowl("failure");
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
            quote = getRandomHowl("success");
            streak = streak + 1;

        } else {
            quote = getRandomHowl("failure");
            streak = 0;
        }
    
        // Replace displayed streak with the current streak
        $("#streak").text(streak);

        // Replace high score 
        var currHigh = $("#high-score").text();

        if (streak > currHigh){
            $("#high-score").text(streak);
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





