var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	bgImg = loadImage("images/starNight.png");
	fairyVoice = loadSound("sound/JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

	// fairyVoice.play();

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;

	fairy.debug = false;
	fairy.setCollider("circle",500,60,40);

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

}


function draw() {
  background(bgImg);

  keyPressed();
  drawSprites();

}

function keyPressed() {

	//starBody.position.y = starIMG.y;
	//starBody.position.x = starIMG.x;


	if (keyDown("left")){
		fairy.x -= 10;
	}

	if (keyDown("right")){
		fairy.x += 10;
	}

	if (keyDown("s")){
		Body.setStatic(starBody,false);
		star.velocityY = 4;
		fairyVoice.play();
		
	}

	if (star.isTouching(fairy)){
		star.velocityY = 0;
		star.x = fairy.x;
		fairyVoice.stop();
	}
}
