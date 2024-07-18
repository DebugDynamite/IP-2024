var Engine = Matter.Engine;
var World = Matter.World;
var Body = Matter.Body;
var Bodies = Matter.Bodies;
var Events = Matter.Events;

var engine;
var world;

var particles = [];
var plinkos = [];
var bounds = [];

var rows = 10;
var colsMax = 11;
var colsMin = 10;
var offset = 50;
var plinkoWidth = 15;

var wallCount = 10;

function setup() {
    createCanvas(600, 800);
    engine = Engine.create();
    world = engine.world;

    Events.on(engine, "collisionStart", collisionEvent);

    spawnParticle();
    spawnPlinkos();
    spawnWalls();
}

function draw() {
    background(0);
    Engine.update(engine, 1000 / 30);
    if (frameCount % 30 === 0) {
        spawnParticle();
    }
    for (var i in particles) {
        const particle = particles[i];
        particle.display();
        if (particle.isOffScreen()) {
            World.remove(world, particle.body);
            particles.splice(i, 1);
            i--;
        }
    }
    for (const j in plinkos) {
        const plinko = plinkos[j];
        plinko.display();
    }
    for (const j in bounds) {
        const bound = bounds[j];
        bound.display();
    }
}

function spawnParticle() {
    var particle = new Particle(width / 2, -50, 10);
    particles.push(particle);
}

function spawnPlinkos() {
    var availSpace = width - (offset * 2)
    var spacing = availSpace / colsMin;
    for (var j = 0; j < rows; j++) {
        var y = spacing + (j * spacing) + offset;
        if (j % 2 === 0) {
            for (var i = 0; i < colsMax; i++) {
                var x = (i * spacing) + offset;
                var plinko = new Plinko(x, y, plinkoWidth);
                plinkos.push(plinko);
            }
        }
        else {
            for (var i = 0; i < colsMin; i++) {
                var x = (i * spacing) + offset + (spacing / 2)
                var plinko = new Plinko(x, y, plinkoWidth);
                plinkos.push(plinko);
            }
        }
    }
}

function spawnWalls() {
    var b = new Boundary(width / 2, height + 50, width, 100);
    bounds.push(b);

    var spacing = width / wallCount;
    for (var i = 0; i < 10; i++) {
        var h = 160;
        var w = 10;
        var x = (i * spacing) + (spacing / 2);
        var y = height - (h / 2);

        var b = new Boundary(x, y, w, h);
        bounds.push(b);
    }
}

function collisionEvent(event) {
    var pairs = event.pairs;    for (var i in pairs) {
        var bodyA = pairs[i].bodyA;
        var bodyB = pairs[i].bodyB;
        var labelA = bodyA.label;
        var labelB = bodyB.label;
        if ((labelA === "Particle" && labelB === "Plinko") || labelA === "Plinko" && labelB === "Particle") {
            Body.setVelocity(bodyA, {
                x: random(-2, 2),
                y: random(-2, 2)
            });
        }
    }
}   