/* Global State */
var playing = true;

/* Animation Constants */
const meterStartOffset = -40;
const meterEndOffset = 620;
const updateMsecs = 20;

$(document).ready(function(){
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
        playing = false;
    });


    /* Animation */
    var offsetRate = 5;
    
    setInterval(function(play) {
        
        if(!playing){
            return;
        }

        var currMeterOffset = parseInt($('#meter-indicator').css("left"));
        var updateMeterOffset =  currMeterOffset + offsetRate;
        
        if(updateMeterOffset < meterEndOffset){
            $('#meter-indicator').css("left", currMeterOffset + offsetRate);
        }
    }, updateMsecs, playing);



});