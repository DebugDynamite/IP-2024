class Particle {
    constructor(x, y, r) {
        x += random(-1, 1);
        this.options = {
            restitution: 0.5,
            friction: 0,
            density: 10
        };
        this.body = Bodies.circle(x, y, r, this.options);
        this.body.label = "Particle";
        this.r = r;
        this.hue = random(360);

        World.add(world, this.body);
    }
    display() {
        push();
        colorMode(HSB)
        fill(this.hue, 255, 255);
        var pos = this.body.position;
        translate(pos.x, pos.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }
    isOffScreen() {
        var x = this.body.position.x;
        return (x < -50 || x > width + 50)
    }
}