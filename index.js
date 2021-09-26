const buttonImg = document.getElementById("button");
var tally = 0;

buttonImg.addEventListener("click", function(event) {
    tally++;
    console.log(`button has been clicked ${tally} time(s)`);
});