class Bird {
    constructor(x, y, r) {
        this.options = {
            restitution: 0.5,
            friction: 0
        };
        this.body = Bodies.circle(x, y, r, this.options);
        // Matter.Body.setMass(this.body, this.body.mass * 4);
        this.body.label = "Bird";
        this.r = r;
        this.image = loadImage("sprites/Bird.png");
        this.smokeImage = loadImage("sprites/smoke.png");
        this.trajectory = [];
        this.smokeVisibility = 255;

        World.add(world, this.body);
    }
    display() {
        push();
        fill(255, 255, 0);
        var pos = this.body.position;
        translate(pos.x, pos.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        // ellipse(0, 0, this.r);
        image(this.image, 0, 0, this.r * 2, this.r * 2);
        pop();

        if (birdReleased) {
            var position = [this.body.position.x, this.body.position.y];
            this.trajectory.push(position);
            for (var i = 0; i < this.trajectory.length; i++) {
                push();
                this.smokeVisibility -= 0.1;
                tint(255, this.smokeVisibility);
                image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
                pop();
            }
        }
    }
}