setInterval(draw, 1);

function draw() {
    for (var i = 0; i < document.getElementsByClassName("game-select-div").length; i++) {
        btn = document.getElementsByClassName("game-select-div")[i]
        btn.style.height = (window.innerHeight * 0.8) + "px";
        btn.style.fontSize = ((window.innerHeight / 708) * (window.innerWidth / 1528) * 30) + "px";
    }
}

var sliderBtns = document.querySelectorAll(".game-select-div");
var prevBtn = document.querySelector("#prev-btn");
var nextBtn = document.querySelector("#next-btn");
var activeBtn = 0;

var delay = 200;

// Clear all images
function reset() {
    for (let i = 0; i < sliderBtns.length; i++) {
        sliderBtns[i].style.opacity = 0;
        setTimeout(function () {
            sliderBtns[i].style.display = "none";
        }, delay);
    }
}

function startSlide() {
    reset();
    setTimeout(function () {
        sliderBtns[0].style.display = "block";
        sliderBtns[0].style.opacity = "100%";
    }, delay);
}

function slideLeft() {
    reset();
    setTimeout(function () {
        sliderBtns[activeBtn].style.display = "block";
        sliderBtns[activeBtn].style.opacity = "100%";
    }, delay);
    activeBtn--;
}

function slideRight() {
    reset();
    activeBtn++;
    setTimeout(function () {
        sliderBtns[activeBtn].style.display = "block";
        sliderBtns[activeBtn].style.opacity = "100%";
    }, delay);
}

prevBtn.addEventListener("click", function () {
    if (activeBtn === 0) {
        activeBtn = sliderBtns.length;
    }
    slideLeft();
});

nextBtn.addEventListener("click", function () {
    if (activeBtn === sliderBtns.length - 1) {
        activeBtn = -1;
    }
    slideRight();
});

startSlide();