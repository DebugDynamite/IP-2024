class Bob {
    constructor(x, y, r) {
        var options = {
            restitution: 1.21,
            friction: 0,
            density: 0.1
        }
        this.body = Bodies.circle(x, y, r, options);
        World.add(world, this.body);
        this.radius = r;
    }
    display() {
        push();
        // col
        fill(color("#FB48C4"));
        ellipse(this.body.position.x, this.body.position.y, this.radius);
        pop();
    }
}