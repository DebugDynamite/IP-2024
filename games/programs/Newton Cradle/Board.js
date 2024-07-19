class Board {
    constructor(x, y, ratio) {
        var options = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0,
            isStatic: true
        }
        this.width = 350 / ratio;
        this.height = 30 / ratio;
        this.body = Bodies.rectangle(x, y, this.width, this.height, options);
        World.add(world, this.body);
    }

    display() {
        push();
        fill(color(187, 255, 0));
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
        pop();
    }
}