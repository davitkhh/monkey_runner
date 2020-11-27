var monkey, monkey_running;
var banana, banana_image, obstacle, obstacle_image, ground_image;
var food_group, obstacle_group;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survival_time = 0;
var gl_debug = false;

function preload(){
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png",
                                 "sprite_2.png", "sprite_3.png",
                                 "sprite_4.png", "sprite_5.png",
                                 "sprite_6.png", "sprite_7.png",
                                 "sprite_8.png");
  monkey_running.frameDelay = 1.5

  banana_image = loadImage("banana.png");
  obstacle_image = loadImage("obstacle.png");
  ground_image = loadImage("jungle_ground_3.png");
}

function setup() {
    enhance_sprite();
    createCanvas(700, 500);
    ground = createSprite(532, 454, 100, 100);
    ground.depth = 0;
    ground.addImage("ground", ground_image);
    ground.scale = 3;
    ground.setCollider("rectangle", 0, 3);
    obstacle_group = createGroup();
    food_group = createGroup();
    textSize(25);      
    fill(255, 204, 0);
    monkey = createSprite(150, 50, 100, 100);
    monkey.depth = 3;
    monkey.scale = 0.17;
    monkey.addAnimation("running", monkey_running);
    monkey.debug = gl_debug;
    monkey.setCollider('rectangle', 10, - 30, 350, 650);
    
    monkey.velocityY = 8;
    frameRate(30);
    setTimeout(spawn_obstacles, Math.round(random(2500, 4500)));
    setTimeout(spawn_banana, Math.round(random(2000, 3750)));
  }
  
  
  function draw() {
    background(130, 190, 183);
    if (gameState === PLAY) {
      if (ground.x < 168){
        ground.x = 522;
      }  
      
      ground.velocityX = -7;

    if (keyDown("space") && monkey.y >= 360 ) {
      monkey.velocityY = -14; 
      
    }

    monkey.velocityY += 0.8; 
    monkey.collide(ground);
    
      survival_time = Math.round(millis() / 1000)
    
    if (monkey.isTouching(obstacle_group)) {
      gameState = END;
    }
    
  }
  

  else if (gameState === END) {
    var anim = monkey.animation;
    anim.stop();
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacle_group.setVelocityXEach(0);
    food_group.setVelocityXEach(0);
    obstacle_group.setLifetimeEach(-1);
    food_group.setLifetimeEach(-1);
    
  }
  
  text("Survival time: " + survival_time, 230, 50);
  drawSprites();
  
  
}

function spawn_obstacles() {
    var obstacle = createSprite(0, 0, 0, 0);
    obstacle.addImage("obstacle", obstacle_image);
    obstacle.scale = 0.2;
    obstacle.left = 700;
    obstacle.bottom = ground.top + 27;
    obstacle.depth = 5;
    obstacle.debug = gl_debug;
    obstacle.velocityX = -7;
    obstacle.setCollider('circle', -20, 30, 200);
    obstacle_group.add(obstacle);
    obstacle.life = 120;
    
    if (gameState === PLAY) {
      setTimeout(spawn_obstacles, Math.round(random(1500, 4500)));
    }
  }

  function spawn_banana() {
    var rand_y = Math.round(random(300, 380));
    var banana = createSprite(0, rand_y, 0, 0);
    banana.addImage("banana", banana_image);
    banana.scale = 0.135;
    banana.left = 700;
    banana.depth = 2;
    banana.velocityX = -7;
    banana.setCollider('circle', -20, 30, 200);
    food_group.add(banana); 
    banana.life = 120;
    if (gameState === PLAY) {
      setTimeout(spawn_banana, Math.round(random(1500, 4500)));
    }

  }

