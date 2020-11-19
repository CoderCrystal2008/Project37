var bird;
var ground;
var birdImg;
var backImg, background1;
var coinImg;
var obstaclesGrp;
var attackArray;
var gameState = "PLAY";
var obstacleImg;
var flag = 0;
var score = 0;

function preload(){
  birdImg = loadImage("sprites/bird.png");
  backImg = loadImage("sprites/bg.png");
  obstacleImg = loadImage("sprites/enemy.png");
  
  


}

function setup() {
  createCanvas(800,400);
  //creates the background1
  background1 = createSprite(400,400,800,800);
  background1.addImage("backImg",backImg);
  background1.scale = 2;

  //creates the bird
  bird = createSprite(200, 330, 50, 50);
  bird.addImage("birdImg",birdImg);
  bird.velocityX = 7;

  //creates the ground
  ground = createSprite(200,400,3000,100);
  ground.shapeColor = "brown";

  //creates the obstacle and prize group
  obstaclesGrp = new Group();
  

  
}

function draw() {
  background(255,255,255); 
  camera.position.x = bird.x;
  
  //console.logs the y position of the bird
  console.log(bird.y);
  //sets the collider
  bird.setCollider("circle",0,0,25);

  if(gameState === "PLAY"){
    //resets the ground to the center
  if(frameCount % 140 === 0){
    background1.x = bird.x + 200;
    ground.x = bird.x;
  }
  
   //simulates gravity
   bird.velocityY = bird.velocityY + 0.8;
  

  //makes the bird go up when necessary
  if(keyWentDown("UP_ARROW") && bird.y > 300){
    bird.velocityY = -15;
    score = score + 1;
  }

  if(bird.isTouching(obstaclesGrp)){
    bird.velocityX = 0;
    bird.velocityY = 0;
    flag = 1;
    gameState ="END";
  }

  spawnObstacles();
  } else if(gameState === "END"){
    bird.velocityX = 0;
    bird.velocityY = 0;
  }

  if(keyDown("r") && gameState === "END"){
    reset();
  }
  bird.collide(ground);
  
  
  drawSprites(); 

  if(flag === 1 && gameState === "END"){
    textSize(50);
    fill(0);
    text("Oops! You lost! Press R to restart!",camera.position.x-400,camera.position.y);
    obstaclesGrp.setLifetimeEach(-1);
  }

  //creates the score
  fill(0);
  text("Score:"+score,bird.x + 200,200);
  
}

function spawnObstacles(){
  if(World.frameCount % 60 === 0){
    //creates the obstacle
    var obstacle = createSprite(800,330,50,50);
    obstacle.addImage("obstacleImg",obstacleImg);
    obstacle.lifetime = 100;
    obstacle.x = camera.position.x + width/2;
    obstaclesGrp.add(obstacle);
  }
}

function reset(){
  bird.x = 200;
  bird.velocityX = 7;
  gameState = "PLAY";
}

