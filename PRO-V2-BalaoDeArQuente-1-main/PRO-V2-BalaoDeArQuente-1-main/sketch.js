var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstop1, obstop2
var obsbottom1,obsbottom2, obsbottom3

var gameState = PLAY
var PLAY = 0

var END = 1

function preload(){
  bgImg = loadImage("assets/bg.png")
  obstop1 = loadImage("assets/obsTop1.png")
  obstop2 = loadImage("assets/obsTop2.png")
  obsbottom1 =loadImage("assets/obsBottom1.png")
  obsbottom2 =loadImage("assets/obsBottom2.png")
  obsbottom3 =loadImage("assets/obsBottom3.png")
  gameOverImg= loadImage("assets/fimdejogo.png")
  restartImg = loadImage("assets/restart.png")
  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){

  //imagem de plano de fundo
  bg = createSprite(165,485,1,1);
  bg.addImage(bgImg);
  bg.scale = 1.3

  bottomGround = createSprite(200,540,800,20);
  //  bottomGround.visible = false;
  topGround = createSprite(200,10,800,20);
  //  topGround.visible = false;

//criando sprites de fim de jogo e reiniciar
 gameOver = createSprite(220,200);
 restart = createSprite(220,240)
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.5;
 restart.addImage(restartImg);
 restart.scale = 0.5;
 gameOver.visible = false;
 restart.visible = false;
        
  //criando o balão     
  balloon = createSprite(100,200,20,50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.2;


  obstaculoTopGroup = new Group()
  bottomObstaculosGroup = new Group()
}

function draw() {
  
  createCanvas(550, 550)
  background("black");
        
  if(gameState === PLAY){
    //fazendo o balão de ar quente pular
      if(keyDown("space")) {
    balloon.velocityY = -10;

    
  }
  //adicionando gravidade
  balloon.velocityY = balloon.velocityY + 2;
    createObstacles()
    barra()
    createDObs()

    if (obstaculoTopGroup.isTouching(balloon)||
    balloon.isTouching(topGround)||
    balloon.isTouching(bottomGround)||
    bottomObstaculosGroup.isTouching(balloon)){
      gameState = END
    }
  }

  if(gameState === END){
    gameOver.visible = true
    restart.visible = true

    balloon.velocityX = 0
    balloon.velocityY = 0
  }
  drawSprites();
        
}

function createObstacles(){
  if(frameCount%60 ===0){

   obstaculoTop = createSprite(560,30,50,50);
   obstaculoTop.velocityX = -4;
   obstaculoTop.y = Math.round(random(70,160))
   
   var rand = Math.round(random(1,2))
   switch(rand){
    case 1: obstaculoTop.addImage(obstop1)
    break
    case 2: obstaculoTop.addImage(obstop2)
    break
    default: break
   }
   obstaculoTop.lifetime= 150
   obstaculoTop.scale = 0.1

   obstaculoTopGroup.add(obstaculoTop)
  }



}

function createDObs(){

  if(frameCount%80 ===0){

    obsD1 =createSprite(500, 465, 40, 50)
    obsD1.velocityX = -4;
   
   var rand = Math.round(random(1,3))
   switch(rand){
    case 1: obsD1.addImage(obsbottom1)
    break
    case 2: obsD1.addImage(obsbottom2)
    break
    case 3: obsD1.addImage(obsbottom3)
    break
    default: break
  }

  obsD1.lifetime=150
  obsD1.scale = 0.1
  bottomObstaculosGroup.add(obsD1)
 }
}
function barra(){
    if(frameCount%60 === 0 ){
      var barra = createSprite(550,275,10,800)
      barra.velocityX  = -6
      barra.visible=false       
    }
}
