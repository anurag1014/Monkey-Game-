//storing info in variables
var monkey , monkey_running,monkey_stop, ground, invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodssGroup, obstaclessGroup;
var score, survivalTime;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


//loading images
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


//it is run only once
function setup() {
  
  //creating invisible ground
  invisibleGround = createSprite(200,365,400,10);
  
  //creating ground and giving its properties
  ground = createSprite(200,390,400,40);
  ground.shapeColor = "green"
  
  //creating monkey and giving its properties
  monkey = createSprite(80,340,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  //creating groups for obstacless and foodss
  obstaclessGroup = createGroup();
  FoodssGroup = createGroup();
  
  //giving value to score and survival time as 0
  score = 0;
  survivalTime = 0
}


//it is run in loops
function draw() {

    //making background as light blue
    background("lightblue");
  
    //changing dimensions of monkeys debug
    monkey.setCollider("circle",0,0,40);
    invisibleGround.visible = false;
  
  // creating gamestates and defining its properties
   if(gameState === PLAY ){
     //displaying score and survival time
    textSize(20);
    text("Score :" + score,10,50);
     
    text("Survival Time :" + survivalTime,240,50)
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
     
     // increasing score as it touches banana
    if(FoodssGroup.isTouching(monkey)){
       score = score + 1;
       FoodssGroup.destroyEach();
    }
    
     //if we press space the monkey jumps
    if(keyDown("space") && monkey.y >=340 ){
       monkey.velocityY = -12;
    }
    
     //adding gravity
    monkey.velocityY = monkey.velocityY + 0.3 ;
  
     //if monkey crashes into obstacles the game ends
    if(obstaclessGroup.isTouching(monkey)){
       gameState = END;
    }
    
     //defining properties of end state
  }else if(gameState === END){
     
    //destroying obstacles and bananas
    obstaclessGroup.destroyEach();
    FoodssGroup.destroyEach();
    
    //making monkey invisible
    monkey.visible = false;
    
    //displaying that game is over
    textSize(30)
    text("your survival Time :" + survivalTime,40,220)
    text("your score :" + score,100,180);
    text("GAME OVER", 100,140)
    
  } 
  
  // monkey is collided with the invisible ground
  monkey.collide(invisibleGround);
  //monkey.debug = true;
  
  //displaying banana and rock
  food();
  obstacles();
  
  //displaying sprites
  drawSprites();
   
  }


//creating function obstacle
function obstacles(){
  //creating rock at a distance of 300
  
  if(frameCount % 300 === 0){
    var obstacle = createSprite(450,360,10,10);
    obstacle.addImage("obstace",obstacleImage);
    
    obstacle.velocityX = -4;
    obstacle.scale = 0.15;
    
    obstacle.lifetime = 130;
    obstaclessGroup.add(obstacle);
  }
}


//creating function for food
function food(){
  //creating banana at various places at a distance of 80 in the x axis
  if(frameCount % 80 === 0){
    var banana = createSprite(430, 370,20,20);
      banana.addImage("food",bananaImage);

      banana.y = Math.round(random(120,200));
      banana.velocityX = -4;

      banana.scale = 0.08;
      banana.lifetime = 120
      FoodssGroup.add(banana);
    }
}



