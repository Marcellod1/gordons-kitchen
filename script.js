$(document).ready(function(){
    $("#button").mousedown(function(){
        $("#button").attr("src","resources/img/red-button-pressed.png");
        console.log("Button Pressed");

        var soundClip = new Howl({
            src: ['resources/sounds/waterphone.mp3']
        });

        soundClip.play();
    });

    $("#button").mouseup(function(){
        $("#button").attr("src","resources/img/red-button.png");
        console.log("Button Up");
    });
});
