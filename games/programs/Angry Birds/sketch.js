var Engine = Matter.Engine;
var World = Matter.World;
var Body = Matter.Body;
var Bodies = Matter.Bodies;
var Events = Matter.Events;
var Constraint = Matter.Constraint;
var MouseConstraint = Matter.MouseConstraint;
var Mouse = Matter.Mouse;
var Composites = Matter.Composites;

var engine;
var world;
var mConstraint;

var terrain;
var bird;
var slingshot;
var slingy;
var characterX = 250;
var slingAttachPoint = {
    x: characterX,
    y: 0
}
var birdReleased = false;

var groundHeight = 50;

var slingImg1, slingImg2, woodImg1, woodImg2, bg;

var maxObstacles = 7;

var birdPhysics;

var reachTimer = 0;
var reachTimerStart = false;
var gameEnded = false;
var speeds = [];

var physicsDataEndFetched = false;

var physicsData;

function preload() {
    slingImg1 = loadImage('sprites/sling1.png');
    slingImg2 = loadImage('sprites/sling2.png');
    woodImg1 = loadImage('sprites/wood1.png');
    woodImg2 = loadImage('sprites/wood2.png');
    bg = loadImage('sprites/bg.png');
}

function setup() {
    createCanvas(1200, 500);
    engine = Engine.create();
    world = engine.world;
    
    spawnBird();
    spawnSlingshot();
    generateGround();

    setMConstraint();
}

function draw() {
    background(bg);
    Engine.update(engine, 1000 / 30);
    text("X: " + mouseX, 400, 80);
    text("Y: " + mouseY, 400, 120);

    terrain.display();
    slingy.display();
    slingshot.display(2);
    bird.display();
    slingshot.display(1);

    if (birdReachCheck()) {
        reachTimerStart = false;
        gameEnded = true;
        displayPhysicsStats();
    }

    if (reachTimerStart && !gameEnded) {
        getRealTimeBirdStats();
        reachTimer++;
    }
}

function getRealTimeBirdStats() {
    var body = bird.body
    var speed = body.speed.toFixed(3);
    text("Speed: " + speed, 200, 50);
    speeds.push(speed);
}

function displayPhysicsStats() {
    if (!physicsDataEndFetched) physicsData = getPhysicsAtEnd();

    text(physicsData.timeTaken + " sec", 200, 80);
    text("Distance: " + physicsData.distanceTravelled + " pixels", 200, 120);
}

function getPhysicsAtEnd() {
    physicsDataEndFetched = true;
    var timeTaken = (reachTimer / 30).toFixed(3);
    var distanceTravelled = 0;
    for (var i = 0; i < bird.trajectory.length; i++) {
        if (bird.trajectory[i + 1]) {
            var difference = getDifference(
                bird.trajectory[i + 1][0],
                bird.trajectory[i + 1][1],
                bird.trajectory[i][0],
                bird.trajectory[i][1]
            );
            // console.log(bird.trajectory[i + 1][0],
            //     bird.trajectory[i + 1][1],
            //     bird.trajectory[i][0],
            //     bird.trajectory[i][1],
            //     difference);
            // ;
            distanceTravelled += difference;
        }
    }
    // var totalSpeed = 0;
    // for (var i in speeds) {
    //     totalSpeed += parseFloat(i);
    // }
    // var avgSpeed = totalSpeed / speeds.length;
    // var distanceTravelled = (avgSpeed * timeTaken).toFixed(1);

    var physics = {
        timeTaken: timeTaken,
        distanceTravelled: distanceTravelled
    }
    return physics;
}

function getDifference(x1, y1, x2, y2) {
    var x = x2 - x1;
    var y = y2 - y1;
    var difference = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
    return difference;
}

function spawnBird() {
    bird = new Bird(characterX, 200, 22);
}

function generateGround() {
    var h = groundHeight;
    terrain = new Terrain(width / 2, height + (h / 2), width, h);
}

function spawnSlingshot() {
    var h = 30;
    var y = height - (groundHeight / 2) - 55
    var w = 20;
    var x = characterX + 30;
    slingshot = new Slingshot(x, y, w, h);

    var h = 160;
    var y = (height - groundHeight) - (h / 2) + 50;
    slingAttachPoint.y = (y - (h / 2));
    slingAttachPoint.x += 20;

    slingy = new Slingy(slingAttachPoint, bird.body);
}

function setMConstraint() {
    var canvasMouse = Mouse.create(canvas);
    canvasMouse.pixelRatio = pixelDensity();
    var mouseConstraintOptions = {
        mouse: canvasMouse,
        // collisionFilter: { mask: 4294967295 },
        element: document.body,
        // body: bird.body
    };
    mConstraint = MouseConstraint.create(engine, mouseConstraintOptions);
    World.add(world, mConstraint);
}

function birdReachCheck() {
    var birdPos = bird.body.position;
    var result = birdPos.y >= height - bird.r;
    return result;
}

function mouseReleased() {
    World.remove(world, slingshot.body)
    slingy.chain.stiffness = 0.5;
    setTimeout(function () {
        slingy.fly();
        reachTimerStart = true;
    }, 15);
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}