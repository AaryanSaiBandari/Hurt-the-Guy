const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;
var rope,building,ground;
var build_con;
var build_con2;
var build_con3;
var rope3;

var bg_img;
var buildingImg;
var man;
var cong;
var congImg;

var button, button2,button3;
var man;
var manImg;
var mute_btn;
var airblower;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

var star;
var star2;
var starImg;

var star_empty;
var one_star;
var two_star;
var score;

function preload() {
  bg_img = loadImage('sky.webp');
  buildingImg = loadImage('building.png');
  manImg = loadImage('man.png');
  starImg = loadImage('star.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound('sad.wav');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  star_empty = loadAnimation("empty.png");
  one_star = loadAnimation('one_star.png');
  two_star = loadAnimation('two_star.png');

  congImg = loadImage("congrats.png");

  eating_sound.playing = true;
  eating_sound.loopung = false;
  sad_sound.playing = true;
  sad_sound.looping = false;
  //eat.looping = false;
}


function setup() {
  createCanvas(400,400);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_button.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_button.png');
  button2.position(100,90);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  rope = new Rope(7,{x:120,y:90});
  rope2 = new Rope(7,{x:490,y:90});

  ground = new Ground(300,height,width,20);

  building = Bodies.rectangle(300,300,20);
  Matter.Composite.add(rope.body,building);

  building_con = new Link(rope,building);
  building_con_2 = new Link(rope2,building);

  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  airblower = createImg('baloon2.png');
  airblower.position(260,370);
  airblower.size(120,120);

  man = createSprite(200,height-80,100,100);
  man.scale = 0.2;

  star = createSprite(320,50,20,20);
  star.addImage(coinImg);
  star.scale = 0.02;

  star2 = createSprite(50,370,20,20);
  star2.addImage(coinImg);
  star2.scale = 0.02;

  score = createSprite(50,20,30,30);
  score.addAnimation("empty_star",star_empty);
  score.addAnimation("star_one",one_star);
  score.addAnimation("star_two",two_star);
  score.changeAnimation("empty_star");
  score.scale=0.2;

  cong = createSprite(300,200);
  cong.addImage(congImg);
  cong.scale=0.4;
  cong.visible=false;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}


function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if (building!=null){
    image(buildingImg,building.position.x,building.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if (collide(building,man,80)==true)
  {
    World.remove(engine.world,fruit);
    building = null;
    eating_sound.play();
    cong.visible=true;
  }

  if(collide(building,star,20)==true)
  {
    star.visible=false;
    score.changeAnimation("star_one");
  }

  if (collide(building,star2,40)==true)
  {
    star2.visible=false;
    score.changeAnimation("star_two");
    
  }

  if (building!=null && building.position.y>=650)
  {
    bk_song.stop();
    sad_sound.play();
    building=null;
  }
}

function drop()
{
  cut_sound.play();
  rope.break();
  building_con.dettach();
  building_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope.break();
  building_con.dettach();
  building_con = null; 
}

function collide(body,sprite,x)
{
  if (body!=null)
  {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if (d<=x)
    {
      return true;
    } else{
      return false;
    }
  }
}

function mute()
{
  if (bk_song.isPlaying())
  {
    bk_song.stop();
  } else{
    bk_song.play();
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    airblow();
  }
}

function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03});
  air.play();
}