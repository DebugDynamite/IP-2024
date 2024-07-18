class Plinko {
    constructor(x, y, r) {
        this.options = {
            // friction: 0,
            isStatic: true
        }
        this.body = Bodies.circle(x, y, r, this.options);
        this.body.label = "Plinko";
        this.r = r;
        this.x = x;
        this.y = y;
        World.add(world, this.body);
    }
    display() {
        push();
        fill(255, 255, 0);
        var pos = this.body.position;
        translate(pos.x, pos.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}
