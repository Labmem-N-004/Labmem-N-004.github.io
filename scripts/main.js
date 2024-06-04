// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomcolor(){
  return("rgb("+random(0,255)+","+random(0,255)+","+random(0,255)+")")
}

class Ball{
  constructor(x,y,velX,velY,color,size){
    this.x=x;
    this.y=y;
    this.velX=velX;
    this.velY=velY;
    this.color=color;
    this.size=size;
  }

  draw(){
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.fill();
  }
  update(){
     if(this.x + this.size>=width||this.x-this.size<=0){
        this.velX = -this.velX;
     }
     if(this.y + this.size>=height||this.y-this.size<=0){
        this.velY = -this.velY;
     }
     this.x+=this.velX;
     this.y+=this.velY;
    }
  collisionDetect(){
    for(let i=0;i<balls.length;++i){
       if(this !== balls[i]){
          const dx=this.x-balls[i].x;
          const dy=this.y-balls[i].y;
          const distance=Math.sqrt(dx**2+dy**2);

          if(distance<=(this.size+balls[i].size)){
            const overlap = (this.size + balls[i].size) - distance;
            const adjustX = (dx / distance) * overlap;
            const adjustY = (dy / distance) * overlap;

            this.x+=adjustX;
            this.y+=adjustY;
           
            let tempX=balls[i].velX;
            let tempY=balls[i].velY;
            balls[i].velX=this.velX;
            balls[i].velY=this.velY;
            this.velX=tempX;
            this.velY=tempY;
            // this.color=balls.color=randomcolor();
          };
       }
    }
   
  }
}

// let testBall=new Ball(50,100,4,4,"blue",10);
// testBall.draw();

let balls=[];
while(balls.length<100){
  let size=random(10,20);
  let ball =new Ball(
    random(0+size,width-size),
    random(0+size,height-size),
    random(-10,10),
    random(-10,10),
    randomcolor(),
    size,
  );
  balls.push(ball);
}

function loop(){
  ctx.fillStyle="rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,width,height);

  for(let i=0;i < balls.length; i++){
    balls[i].update();
    balls[i].collisionDetect();
    balls[i].draw();
  }
  requestAnimationFrame(loop);
}

loop();


