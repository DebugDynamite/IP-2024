setInterval(draw, 1);

var headingDiv = document.getElementById("heading-div");

function draw() {
    for (var i = 0; i < document.getElementsByClassName("nav-btns").length; i++) {
        btn = document.getElementsByClassName("nav-btns")[i]
        btn.style.height = (window.innerHeight * 0.4) + "px";
        btn.style.fontSize = ((708 / window.innerHeight) * (window.innerWidth / 1528) * 60) + "px";
    }
}