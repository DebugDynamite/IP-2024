class Terrain {
    constructor(x, y, w, h) {
        this.options = {
            isStatic: true,
            friction: 0.5
        };
        this.body = Bodies.rectangle(x, y, w, h, this.options);
        this.body.label = "Ground";
        this.w = w;
        this.h = h;

        World.add(world, this.body);
    }
    display() {
        push();
        fill("brown");
        var pos = this.body.position;
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }
}