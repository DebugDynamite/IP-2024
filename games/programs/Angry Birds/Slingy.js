class Slingy {
    constructor(pointA, body) {
        const options = {
            pointA: pointA,
            bodyB: body,
            stiffness: 0.05,
            length: 1
        };
        this.chain = Constraint.create(options);
        World.add(world, this.chain);
    }
    attach(body) {
        this.chain.bodyB = body;
    }
    fly() {
        this.chain.bodyB = null;
        birdReleased = true;
    }
    display() {
        if (this.chain.bodyB) {
            var pointPos = this.chain.pointA;
            var bodyPos = this.chain.bodyB.position;
            push();
            stroke(70, 20, 20);
            strokeWeight(5 / adjustedRatio);
            line(pointPos.x - (20 / adjustedRatio), pointPos.y + 7 * adjustedRatio, bodyPos.x - (15 / adjustedRatio), bodyPos.y);
            line(pointPos.x + (20 / adjustedRatio), pointPos.y + 7 * adjustedRatio, bodyPos.x + (15 / adjustedRatio), bodyPos.y);
            pop();
        }
    }
}