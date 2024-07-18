let sliderImages = document.querySelectorAll(".slide"),
    arrowLeft = document.querySelector("#arrow-left"),
    arrowRight = document.querySelector("#arrow-right"),
    current = 0;

var delay = 200;

// Clear all images
function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.opacity = 0;
        setTimeout(function () {
            sliderImages[i].style.display = "none";
        }, delay);
    }
}

function startSlide() {
    reset();
    setTimeout(function () {
        sliderImages[0].style.display = "block";
        sliderImages[0].style.opacity = "100%";
    }, delay);
}

function slideLeft() {
    reset();
    setTimeout(function () {
        sliderImages[current].style.display = "block";
        sliderImages[current].style.opacity = "100%";
    }, delay);
    current--;
}

function slideRight() {
    reset();
    current++;
    setTimeout(function () {
        sliderImages[current].style.display = "block";
        sliderImages[current].style.opacity = "100%";
    }, delay);
}

arrowLeft.addEventListener("click", function () {
    if (current !== 0) slideLeft();
});

arrowRight.addEventListener("click", function () {
    if (current === sliderImages.length - 1) {
        current = -1;
    }
    slideRight();
});

startSlide();
