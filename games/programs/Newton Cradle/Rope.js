class Rope {
    constructor(body1, point2, ratio) {
        this.chain_options = {
            bodyA: body1,
            pointB: point2,
            length: 200 / ratio,
            stiffness: 0.5
        }
        this.chain = Matter.Constraint.create(this.chain_options);
        World.add(world, this.chain);
        this.bodyA = body1;
        this.pointB = point2;
        this.ratio = ratio;
    }
    relese() {
        this.chain.bodyA = null
    }
    join(chainObj) {
        this.chain.bodyA = chainObj;
    }
    display() {
        if (this.chain.bodyA) {
            var bodyAPos = this.chain.bodyA.position;
            var pointBPos = this.pointB;
            var ratio = this.ratio;
            push();
            stroke("white");
            strokeWeight(2);
            line(bodyAPos.x - 25 / ratio, bodyAPos.y, pointBPos.x, pointBPos.y);
            line(bodyAPos.x + 25 / ratio, bodyAPos.y, pointBPos.x, pointBPos.y);
            pop();
        }
    }
}