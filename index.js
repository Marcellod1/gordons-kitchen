var buttonImg = document.getElementById("button");
var tally = 0;

// Change img source to pushed down button on mouse down
buttonImg.addEventListener("mousedown", event => {
    buttonImg.src = "/resources/img/red-button-pressed.png";
});


// Change img source to default button on mouse up
buttonImg.addEventListener("mouseup", event => {
    buttonImg.src = "/resources/img/red-button.png";
});