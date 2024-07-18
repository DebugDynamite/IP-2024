class Boundary {
    constructor(x, y, w, h) {
        this.options = {
            isStatic: true
        };
        this.body = Bodies.rectangle(x, y, w, h, this.options);
        World.add(world, this.body);
        this.w = w;
        this.h = h;
    }
    display() {
        push();
        fill(255, 0, 0);
        var pos = this.body.position;
        rectMode(CENTER)
        translate(pos.x, pos.y);
        rect(0, 0, this.w, this.h);
        pop();
    }
}