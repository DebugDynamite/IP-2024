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

var slingImg1, slingImg2, woodImg1, woodImg2, bg, birdImg;

var maxObstacles = 7;

var birdPhysics;

var reachTimer = 0;
var reachTimerStart = false;
var gameEnded = false;
var speeds = [];

var physicsDataEndFetched = false;

var physicsData;

var barrier1;
var goal;

var goalEffectComplete = false;

var birdImgPos = [];
var birdLandPos;
var birdReached = false;

function preload() {
    slingImg1 = loadImage('sprites/sling1.png');
    slingImg2 = loadImage('sprites/sling2.png');
    woodImg1 = loadImage('sprites/wood1.png');
    woodImg2 = loadImage('sprites/wood2.png');
    bg = loadImage('sprites/bg.png');
    birdImg = loadImage("sprites/bird.png");
}

function setup() {
    createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;

    goal = {
        x: width - 200,
        w: 150,
        h: 200,
        barrier_w: 15,
        barrier_h: 100
    }
    goal.y = height - (goal.h / 2);
    goal.barrier_y = goal.y + (goal.barrier_h / 2);

    barrier1 = new Barrier(goal.x - (goal.w / 2), goal.barrier_y, goal.barrier_w, goal.barrier_h);
    barrier2 = new Barrier(goal.x + (goal.w / 2), goal.barrier_y, goal.barrier_w, goal.barrier_h);
    goal = new Goal(goal.x, goal.y, goal.w, 15);

    spawnBird();
    spawnSlingshot();
    generateGround();

    setMConstraint();
}

function draw() {
    background(bg);
    Engine.update(engine, 1000 / 30);

    terrain.display();
    slingy.display();
    slingshot.display(2);
    bird.display();
    slingshot.display(1);
    goal.display();

    if (!birdReached) birdReachCheck();

    if (birdReached) {
        reachTimerStart = false;
        gameEnded = true;
        displayPhysicsStats();
    }

    if (reachTimerStart && !gameEnded) {
        reachTimer++;
    }
}

function displayPhysicsStats() {
    if (!physicsDataEndFetched) physicsData = getPhysicsAtEnd();

    push();
    tint(255, 100);
    imageMode(CENTER);
    for (var i = 0; i < birdImgPos.length; i++) {
        image(birdImg, birdImgPos[i].x, birdImgPos[i].y);
    }
    strokeWeight(3);
    ellipse(characterX, birdLandPos.y, 7.5);
    line(characterX, birdLandPos.y, birdLandPos.x, birdLandPos.y);
    line(birdLandPos.x, birdLandPos.y, birdLandPos.x - 11, birdLandPos.y - 7);
    line(birdLandPos.x, birdLandPos.y, birdLandPos.x - 11, birdLandPos.y + 7);
    textSize(20);
    textAlign(CENTER);
    var textX = (characterX + (physicsData.displacement / 2));
    var textY = birdLandPos.y
    text("Time taken: " + physicsData.timeTaken + " sec", textX, textY - 90);
    text("Displacement: " + physicsData.displacement + " pixels", textX, textY - 60);
    text("Average Velocity: " + physicsData.avgVelo + " pixels per second", textX, textY - 30);
    textSize(50);
    fill("yellow");
    stroke("black");
    strokeWeight(4);
    if (physicsData.goalAchieved) {
        text("What an aim..!", width / 2, height / 2 - 100);
    }
    else {
        text("Nishaana thoda kachha he..!", width / 2, height / 2 - 100);
    }
    pop();
}

function getPhysicsAtEnd() {
    physicsDataEndFetched = true;
    birdLandPos = { x: bird.body.position.x, y: bird.body.position.y }
    for (var i = 0; i < bird.trajectory.length; i += 5) {
        birdImgPos.push({ x: bird.trajectory[i][0], y: bird.trajectory[i][1] });
    }

    var timeTaken = (reachTimer / 30).toFixed(3);
    var body = bird.body;
    var displacement = (body.position.x - characterX).toFixed(3);
    var avgVelo = (displacement / timeTaken).toFixed(3);
    var goalAchieved =
        (birdLandPos.x > goal.x - (goal.w / 2))
        && (birdLandPos.x < goal.x + (goal.w / 2))

    text("Avg. Velocity: " + avgVelo, 200, 50);
    var physics = {
        timeTaken: timeTaken,
        displacement: displacement,
        avgVelo: avgVelo,
        goalAchieved: goalAchieved
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
    bird = new Bird(characterX, 450, 22);
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
    if (result) birdReached = true;
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