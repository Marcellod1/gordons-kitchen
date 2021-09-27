var buttonImg = document.getElementById("button");
var tally = 0;

// Change img source to pushed down button on mouse down
buttonImg.addEventListener("mousedown", event => {
    tally++;
    console.log(`The button has been clicked ${tally} times(s)`);
    buttonImg.src = "/resources/img/red-button-pressed.png";

    var soundClip = new Howl({
        src: ['/resources/sounds/waterphone.mp3']
      });

    soundClip.play();
});


// Change img source to default button on mouse up
buttonImg.addEventListener("mouseup", event => {
    buttonImg.src = "/resources/img/red-button.png";
});