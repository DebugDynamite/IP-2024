var alertDisplay = false;
var alertDiv = document.getElementById("orientation-change-msg");

var sliderBtns;
var activeBtn;
var delay;

var zoom;
var windowWidthInit;
var windowHeightInit;

function setup() {
    sliderBtns = document.querySelectorAll(".game-select-div");

    activeBtn = 0;
    delay = 200;
    windowWidthInit = windowWidth;
    windowHeightInit = windowHeight;

    startSlide();
}

async function draw() {
    for (var i = 0; i < document.getElementsByClassName("game-select-div").length; i++) {
        var div = document.getElementsByClassName("game-select-div")[i]
        div.style.height = (windowHeight * 0.8) + "px";
        div.style.fontSize = ((windowHeight / 708) * (window.innerWidth / 1528) * 30) + "px";
    }

    adjustScreen();

    var orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    alertDisplay = orientation !== "landscape";
    alertDiv.hidden = !alertDisplay;

    if (alertDisplay) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "default";
    }
}

function adjustScreen() {
    if (windowWidth !== windowWidthInit || windowHeight !== windowHeightInit) {
        location.reload();
    }
    if (windowWidth < windowHeight) {
        if (windowHeight < 708) {
            zoom = (((windowHeight / 708) * 100) - 1) + "%";
        }
        if (windowWidth < 1528) {
            zoom = (((windowWidth / 1528) * 100) - 1) + "%";
        }
        console.log(windowWidth, windowHeight)
    }
    else {
        zoom = 1;
    }
    document.body.style.zoom = zoom;
}

setInterval(function () {
    if (alertDisplay) {
        flash();
    }
}, 1000);

function flash() {
    if (alertDiv.style.backgroundColor === "yellow") {
        alertDiv.style.backgroundColor = "red";
        alertDiv.style.color = "yellow";
    }
    else {
        alertDiv.style.backgroundColor = "yellow";
        alertDiv.style.color = "red";
    }
}