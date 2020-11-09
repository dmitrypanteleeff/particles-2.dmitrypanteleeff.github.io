//canvas setup
//const canvas = document.querySelector('.canvas1');
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); // рисуем в 2d
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
const numberOfParticles = 30;

//get mouse position
const mouse = {
    x:null,
    y:null
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
  //  console.log(event);
   // console.log(mouse.x, mouse.y);
});


setInterval(function(){
    mouse.x = undefined;
    mouse.y = undefined;
}, 200);


//create particles
class Particle {
    constructor(x, y, size, color, weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();        
    }
    update(){
        this.size -= 0.2; // уменьшаем размер круга
        if (this.size < 0){
            this.x = (mouse.x + ((Math.random()*20) - 10));
            this.y = (mouse.y + ((Math.random()*20) - 10));
            this.size = ((Math.random() * 5 ) + 5);//маленькие particles рендерятся быстрее
            this.weight = (Math.random() * 2 ) - 0.5;
        } 
        this.y += this.weight;
        this.weight += 0.2;

        if ((this.y > canvas.height - this.size) && (this.weight > 0.5)){
            this.weight = this.weight*(-0.7);
        };
        
            
        
    }
}

function init(){
    particleArray = [];
    for (let i = 0; i < numberOfParticles; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 5) + 2;
        let color = 'pink';
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight));
    }
}


function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
 //  ctx.fillStyle = 'rgba(0,0,0,0.08)';
 //  ctx.fillRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
     //   particleArray[i].draw();

    }
    connect();
    requestAnimationFrame(animate);
}




function connect(){
    let opacityValue = 1; 
    for(let a = 0; a < particleArray.length; a++){
        for(let b = 0; b < particleArray.length; b++){
            let distance = Math.pow(
                ((((particleArray[a].x)-(particleArray[b].x))*((particleArray[a].x)-(particleArray[b].x)))
            +
            (((particleArray[a].y)-(particleArray[b].y))*((particleArray[a].x)-(particleArray[b].x)))),
            1);
            if (distance < 1800){
                opacityValue = 1 - (distance/10000);
                ctx.strokeStyle ='rgba(255,255,255,'+ opacityValue +')';
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(particleArray[a].x,particleArray[a].y);
            ctx.lineTo(particleArray[b].x,particleArray[b].y);
            ctx.stroke();
            }
            
        }
    }
}

init();
animate();