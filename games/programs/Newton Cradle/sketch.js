const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;

var topBoard;

var bobCount = 5;
var bobs = [];
var thickness = 10;
var mConstraint;

var defaultWidth, defaultHeight, innerWidth, innerHeight, adjustedRatio, adjustedWidth, adjustedHeight;

var boardY;

function setup() {
    adjustScreen();

    createCanvas(adjustedWidth, adjustedHeight);
    engine = Engine.create();
    world = engine.world;

    boardY = 200 / adjustedRatio;

    topBoard = new Board(width / 2, boardY, adjustedRatio);

    Engine.run(engine);
    spawnBeads();

    setMConstraint();
}

function draw() {
    Engine.update(engine, 1000 / 30);
    rectMode(CENTER);
    ellipseMode(RADIUS);
    background(0);

    // document.style.zoom = (((window.innerHeight / 708) * 100) - 1) + "%";

    for (var i in bobs) {
        showBob(bobs[i]);
    }
    topBoard.display();

    push();
    textAlign(CENTER);
    fill("white");
    textSize(40 / adjustedRatio);
    text("Newton's Cradle", width / 2, (100 / adjustedRatio))
    pop();
}

function spawnBeads() {
    var r = 30 / adjustedRatio;
    var spacing = 2 * r;
    var offset = (width / 2) - (4 * r);
    var y = 400 / adjustedRatio;
    for (var i = 0; i < bobCount; i++) {
        var x = i * spacing + offset;
        var bob = new Bob(x, y, r);
        bobs.push(bob);
        var joint = new Rope(bob.body, { x: bob.body.position.x, y: boardY }, adjustedRatio);
        bob.joint = joint;
    }
}

function showBob(bob) {
    bob.joint.display(adjustedRatio);
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

function adjustScreen() {
    defaultWidth = 900;
    defaultHeight = 600;

    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;

    if (innerHeight < defaultHeight) {
        adjustedRatio = defaultHeight / innerHeight;

        adjustedWidth = defaultWidth / adjustedRatio;
        adjustedHeight = innerHeight;
    }
    else {
        adjustedRatio = 1;
        adjustedWidth = defaultWidth;
        adjustedHeight = defaultHeight;
    }
}