const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var MouseConstraint = Matter.MouseConstraint;
var Mouse = Matter.Mouse;

var topBoard;

var bobCount = 5;
var bobs = [];
var thickness = 10;
var mConstraint;

function setup() {
    createCanvas(900, 600);
    engine = Engine.create();
    world = engine.world;
    topBoard = new Board(width / 2, 200);

    Engine.run(engine);
    spawnBeads();

    setMConstraint();
}

function draw() {
    Engine.update(engine, 1000 / 30);
    rectMode(CENTER);
    ellipseMode(RADIUS);
    background(0);

    for (var i in bobs) {
        showBob(bobs[i]);
    }
    topBoard.display();

    push();
    textAlign(CENTER);
    fill("white");
    textSize(40);
    text("Newton's Cradle", width / 2, 100)
    pop();
}

function spawnBeads() {
    var r = 30;
    var spacing = 2 * r;
    var offset = (width / 2) - (4 * r);
    var y = 400;
    for (var i = 0; i < bobCount; i++) {
        var x = i * spacing + offset;
        var bob = new Bob(x, y, r);
        bobs.push(bob);
        var joint = new Rope(bob.body, { x: bob.body.position.x, y: 200 });
        bob.joint = joint;
    }
}

function showBob(bob) {
    bob.joint.display();
    bob.display();
}

function setMConstraint() {
    var canvasMouse = Mouse.create(canvas);
    canvasMouse.pixelRatio = pixelDensity();
    var mouseConstraintOptions = {
        mouse: canvasMouse,
        element: document.body
    };
    mConstraint = MouseConstraint.create(engine, mouseConstraintOptions);
    World.add(world, mConstraint);
}