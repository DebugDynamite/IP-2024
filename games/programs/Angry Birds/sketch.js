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
var characterX;
var slingAttachPoint;
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

var defaultWidth, defaultHeight, adjustedRatio, adjustedWidth, adjustedHeight;

var windowWidthInit;
var windowHeightInit;

function preload() {
    slingImg1 = loadImage('sprites/sling1.png');
    slingImg2 = loadImage('sprites/sling2.png');
    woodImg1 = loadImage('sprites/wood1.png');
    woodImg2 = loadImage('sprites/wood2.png');
    bg = loadImage('sprites/bg.png');
    birdImg = loadImage("sprites/bird.png");
}

function setup() {
    adjustScreen();

    createCanvas(adjustedWidth, adjustedHeight);
    engine = Engine.create();
    world = engine.world;

    windowWidthInit = windowWidth;
    windowHeightInit = windowHeight;
    
    adjustedRatio -= adjustedRatio == 1 ? 0 : 0.4;

    goal = {
        x: width - (200 / adjustedRatio),
        w: 130 / adjustedRatio,
        h: 200 / adjustedRatio,
        barrier_w: 15 / adjustedRatio,
        barrier_h: 100 / adjustedRatio
    }
    goal.y = height - (goal.h / 2);
    goal.barrier_y = goal.y + (goal.barrier_h / 2);

    barrier1 = new Barrier(goal.x - (goal.w / 2), goal.barrier_y, goal.barrier_w, goal.barrier_h);
    barrier2 = new Barrier(goal.x + (goal.w / 2), goal.barrier_y, goal.barrier_w, goal.barrier_h);
    goal = new Goal(goal.x, goal.y, goal.w, 15 / adjustedRatio);

    characterX = 250 / adjustedRatio;
    slingAttachPoint = {
        x: characterX,
        y: 0
    }

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
    
    if (windowWidth !== windowWidthInit || windowHeight !== windowHeightInit) {
        location.reload();
    }

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
    tint(255, 125);
    imageMode(CENTER);
    for (var i = 0; i < birdImgPos.length; i++) {
        image(birdImg, birdImgPos[i].x, birdImgPos[i].y, bird.r * 2, bird.r * 2);
    }
    strokeWeight(3 / adjustedRatio);
    ellipse(characterX, birdLandPos.y, 7.5);
    line(characterX, birdLandPos.y, birdLandPos.x, birdLandPos.y);
    line(birdLandPos.x, birdLandPos.y, birdLandPos.x - 11, birdLandPos.y - 7);
    line(birdLandPos.x, birdLandPos.y, birdLandPos.x - 11, birdLandPos.y + 7);
    textSize(20 / adjustedRatio);
    textAlign(CENTER);
    var textX = (characterX + (physicsData.displacement / 2));
    var textY = birdLandPos.y
    text("Time taken: " + physicsData.timeTaken + " sec", textX, textY - (90 / adjustedRatio));
    text("Displacement: " + physicsData.displacement + " pixels", textX, textY - (60 / adjustedRatio));
    text("Average Velocity: " + physicsData.avgVelo + " pixels per second", textX, textY - (30 / adjustedRatio));
    textSize((50 / adjustedRatio));
    fill("yellow");
    stroke("black");
    strokeWeight((4 / adjustedRatio));
    if (physicsData.goalAchieved) {
        text("What an aim..!", width / 2, height / 2 - (100 / adjustedRatio));
    }
    else {
        text("Nishaana thoda kachha he..!", width / 2, height / 2 - (100 / adjustedRatio));
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
    bird = new Bird(characterX, 450 / adjustedRatio, 22 / adjustedRatio);
}

function generateGround() {
    var h = groundHeight;
    terrain = new Terrain(width / 2, height + (h / 2), width, h);
}

function spawnSlingshot() {
    var h = 30 / adjustedRatio;
    var y = height - (groundHeight / 2) - (55 / adjustedRatio)
    var w = 20 / adjustedRatio;
    var x = characterX + (30 / adjustedRatio);
    slingshot = new Slingshot(x, y, w, h);

    var h = 160 / adjustedRatio;
    var y = (height - groundHeight) - (h / 2) + (50 / adjustedRatio);
    slingAttachPoint.y = (y - (h / 2));
    slingAttachPoint.x += 20 / adjustedRatio;

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

function adjustScreen() {
    defaultWidth = 1200;
    defaultHeight = 600;

    adjustedRatio = 1;
    if (defaultWidth > innerWidth) {
        adjustedRatio *= defaultWidth / innerWidth;
        adjustedRatio += 0.2;
    }
    adjustedWidth = defaultWidth / adjustedRatio;
    adjustedHeight = defaultHeight / adjustedRatio;
    if (adjustedHeight > innerHeight) {
        adjustedRatio *= adjustedHeight / innerHeight;
        adjustedRatio += 0.2;
    }
    adjustedWidth = defaultWidth / adjustedRatio;
    adjustedHeight = defaultHeight / adjustedRatio;

    // alert(adjustedRatio + "\n" + defaultWidth + "\n" + defaultHeight + "\n" + innerWidth + "\n" + innerHeight + "\n" + adjustedWidth + "\n" + adjustedHeight);
}