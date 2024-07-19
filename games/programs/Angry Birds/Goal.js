class Goal {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    display() {
        push();
        // fill("black");
        fill(0, 0, 0, 0);
        stroke("red");
        strokeWeight(5);
        var pos = { x: this.x, y: this.y };
        translate(pos.x, 0);
        ellipseMode(CENTER)
        // ellipse(0, pos.y, this.w + 10, this.h);
        for (var i = pos.y; i < height; i += 12) {
            ellipse(0, i, this.w + 10, this.h);
        }
        pop();
    }
}