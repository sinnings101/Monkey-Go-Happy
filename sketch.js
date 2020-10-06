var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var survivalTime = 0
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("grass.png");
}



function setup() {
  createCanvas(400, 400);
  monkey=createSprite(80,315,20,20); 
  monkey.addAnimation("moving", monkey_running); 
  monkey.scale=0.1 
  
  ground = createSprite(400,390,9130,10); 
  ground.addImage("ground", groundImage);
  ground.velocityX=-4; 
  ground.x=ground.width/2; 
  console.log(ground.x) 
  
  foodGroup = new Group();
  obstacleGroup = new Group();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100,50); 
  
}


function draw() {
  background("skyblue");
  
  
  
  if (gameState === PLAY) {
      if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -17;
  }
      monkey.velocityY = monkey.velocityY + 0.8;
      if (ground.x < 150){
      ground.x = ground.width/2;
  }
      if(monkey.isTouching(foodGroup)) {
     foodGroup.destroyEach();
  }  
    if(monkey.isTouching(obstacleGroup)) {
      gameState = END;
  }
      survivalTime = Math.ceil(frameCount/frameRate());
  }
  else if(gameState === END){
        monkey.velocityX = 0;
    ground.velocityX = 0; 
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  monkey.collide(ground); 
  
  food();
  obstacles();

  stroke("black");
  textSize(15);
  fill("black");
  text("Survival Time: "+ survivalTime,150,70);
  
  drawSprites();
}

function food() {
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,120,10,10);
    banana.y = Math.round(random(150,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
    food.lifetime = 220;
    foodGroup.add(banana);
  }
  
}

function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(420,320)
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -7;
    
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
  
}
// function gameEnd() {
//       ground.velocityX = 0; 
//       monkey.velocityY = 0;

// }







