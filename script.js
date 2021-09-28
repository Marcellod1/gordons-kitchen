$(document).ready(function(){

    /* Animation Constants*/
    const meterStartOffset = -40;
    const meterEndOffset = 620;
    const updateMsecs = 20;
    
    /* Animation Variables*/
    // NOTE: Change these depending on the difficulty?
    var offsetRate = 5;
    var playing = true;


    setInterval(function(play) {
        if(!play){
            return;
        }

        var currMeterOffset = parseInt($('#meter-indicator').css("left"));
        var updateMeterOffset =  currMeterOffset + offsetRate;
        
        if(updateMeterOffset < meterEndOffset){
            $('#meter-indicator').css("left", currMeterOffset + offsetRate);
        }
    }, updateMsecs, playing);


    /* Button mousedown event */
    $("#button").mousedown(function(){
        $("#button").attr("src","resources/img/red-button-pressed.png");
        console.log("Button Pressed");
        var soundClip = new Howl({
            src: ['resources/sounds/waterphone.mp3']
        });
        soundClip.play();
    });

    /* Button mouseup event */
    $("#button").mouseup(function(){
        $("#button").attr("src","resources/img/red-button.png");
        console.log("Button Up");
    });
});