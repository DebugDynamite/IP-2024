class Slingshot {
    constructor(x, y, w, h) {
        this.options = {
            isStatic: true
        };
        this.body = Bodies.rectangle(x, y, w, h, this.options);
        this.body.label = "Slingshot";
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;

        World.add(world, this.body);
    }
    display(sling) {
        push();
        fill(255);
        var pos = this.body.position;
        translate(pos.x, pos.y);
        // translate(this.x, this.y);
        rectMode(CENTER);
        imageMode(CENTER);
        if (sling === 1) {
            image(slingImg1, -15 / adjustedRatio, -15 / adjustedRatio, 47 / adjustedRatio, 196 / adjustedRatio);
        }
        if (sling === 2) {
            image(slingImg2, 8 / adjustedRatio, -15 / adjustedRatio, 38 / adjustedRatio, 196 / adjustedRatio);
        }
        // rect(0, 0, this.w, this.h);
        pop();
    }
}