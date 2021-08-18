var man;
var bg;
var invisibleGround;
var gameState = "PLAY"
 var obstacleGroup;
 var waterGroup;

function preload(){
  man_img = loadAnimation("man1.png","man2.png","man3.png","man4.png","man5.png","man6.png");
  bg_img = loadImage("d1.jpg");

  obstacle1 = loadImage("catus1.jpg");
  obstacle2 = loadImage("catus2.jpg");
  obstacle3 = loadImage("catus3.jpg");
  obstacle4 = loadImage("stone1.jpg");
  obstacle5 = loadImage("stone2.jpg");

  water_img = loadImage("enegy.png");

  gameOver = loadAnimation("gameOver.png")

  
}

function setup(){
  createCanvas(800,350);

  bg = createSprite(400,50,800,350);
  bg.addImage("b", bg_img);
  //bg.scale = 0.7
  bg.velocityX = -4;

  man = createSprite(100,300,50,50);
  man.addAnimation("m", man_img);
  man.addAnimation("go", gameOver)
  man.scale = 0.8
 // man.frameDelay = 10;

 invisibleGround = createSprite(600,320,1200,10);
 invisibleGround.visible = false;

 obstacleGroup = createGroup();
 waterGroup = createGroup();
}

function draw(){

  background(0);

  if(gameState === "PLAY"){
    if(bg.x < 0){
      bg.x = bg.width/2
    }
  
    if(keyDown("space")&& man.y >= 100) {
      man.velocityY = -10;
    }
    
    man.velocityY = man.velocityY + 0.8;

    spawnObstacles();
    spawnWater();

    if (obstacleGroup.isTouching(man)){
      gameState = "END"
    }


     
  drawSprites()
  }

  else if(gameState === "END"){
    bg.velocityX = 0;
    man.velocityY = 0;

    obstacleGroup.destroyEach()
    man.changeAnimation ("go",gameOver);
    drawSprites()
    text("Oops! Game Over", 500,200)
  }
 

  man.collide(invisibleGround);
 

}

function spawnObstacles(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(1250,280,50,40);

    obstacle.velocityX = -5;

    var rand = Math.round(random(1,5));

    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      default: break;
    }

    obstacle.scale = 0.5;
    obstacleGroup.add(obstacle)
  }


}

function spawnWater(){
  if(frameCount % 200 === 0){
    water = createSprite(1250,random(50,150),50,40);

    water.velocityX = -5;

    water.addImage("water1",water_img)
    water.scale = 0.2;
    waterGroup.add(water)
  }


}