/* Propiedaes de la ventana */
const ancho = 960;  
const alto = 600;  
const canvas = document.getElementById('canvas');
canvas.width = ancho;  
canvas.height = alto; 

const context = canvas.getContext('2d');  

/* configuracion del fondo */
const fondo = new Image();
fondo.src = "fondo/fondo10.png";
function set_fondo(){  
    context.fillStyle = '#d0e7f9';  
    context.beginPath();  
    //context.drawImage(fondo, 0, 0, 960, 600, 0, 0, ancho, alto);
    context.rect(0, 0, ancho, alto);  
    context.closePath();  
    context.fill();  
}

const piso_altura = 40
class Piso{
    constructor(longitud, xpos){
        this.xpos = xpos;
        this.longitud = longitud;
        this.alto = piso_altura;
    }
};


function draw_flatfloor(){
    let piso = new Piso(ancho,0);
    context.fillStyle = 'rgb(137,77,9)';
    context.beginPath();
    context.rect(piso.xpos, alto-piso.alto, piso.longitud, piso.alto);
    context.closePath();
    context.fill();
}

class Dogo{
    constructor(){
        /* configuracion de imagen */
        this.imagen = new Image();
        this.imagen.src = "player/dogo.png";
        /* tamano personaje */
        this.ancho = 85;
        this.alto = 50;

        /* tamano de cada frame */
        this.f_ancho = 120;
        this.f_alto  = 60;
        this.nframes = 8;

        this.actualFrame = 0;
        this.X = 20;
        this.Y = (alto-piso_altura)-this.alto; 
    }
    draw(){
        context.drawImage(this.imagen, this.f_ancho*this.actualFrame, 0, this.f_ancho, this.f_alto, this.X, this.Y, this.ancho, this.alto);
        this.actualFrame = (this.actualFrame + 1) % this.nframes;
    }

   moveLeft() { this.X = Math.max(0,this.X-5); }
   moveRight(){ this.X = Math.min(ancho-this.f_ancho,this.X+5); }
   jump(){
       this.Y=this.Y-50;
       setTimeout(() => {
           this.Y=this.Y+50;       
        },100);  
    };
};

class Rinno {
    constructor(){
        /* configuracion de imagen */
        this.imagen = new Image();
        this.imagen.src = "player/rinno.png";
        /* tamano personaje */
        this.ancho = 85;
        this.alto = 50;

        /* tamano de cada frame */
        this.f_ancho = 920;
        this.f_alto  = 510;
        this.nframes = 16;

        this.actualFrame = 0;
        this.X = 600;
        this.Y = (alto-piso_altura)-this.alto; 
    }
    draw(){
        context.drawImage(this.imagen, this.f_ancho*this.actualFrame, 0, this.f_ancho, this.f_alto, this.X, this.Y, this.ancho, this.alto);
        this.actualFrame = (this.actualFrame + 1) % this.nframes;
    }

   moveLeft() { this.X = this.X-5; }
   moveRight(){ this.X = Math.min(ancho-this.f_ancho,this.X+5); }
};


document.onkeydown = function(e) {
    e = e || window.event;
    console.log(e.keyCode);
    /*
     * 37: flecha a la izquierda || 65: a
     * 38: flecha arriba         || 87: w
     * 39: flecha a la derecha   || 68: d
     * 40: flecha abajo          || 83: s
     */

    if      ((e.keyCode=='37') || (e.keyCode=='65')){ player.moveLeft(); }
    else if ((e.keyCode=='39') || (e.keyCode=='68')){ player.moveRight(); }
    else if ((e.keyCode=='38') || (e.keyCode=='87')){ player.jump(); }
    else if ((e.keyCode=='40') || (e.keyCode=='83')){ player.hump(); }
}

var rinnos=[]

function agregar_rinno(){
    let rinno=new Rinno();
    rinnos.push(rinno);
    console.log("i born");
    setTimeout(agregar_rinno,Math.random()*5000);
}

agregar_rinno();

let gameover=false
function check_match(player,enemy){
    py=player.Y+player.alto - 45
    pX1=player.X
    pX2=player.X+player.ancho - 40
    EY=enemy.Y
    EX1=enemy.X
    EX2=enemy.X+enemy.ancho
    if((py<EY)||(pX2<EX1)||(pX1>EX2)){
        gameover=false
    }
    else {
        alert("game over");
    }
}

let gLoop;
let state = true;
const player = new Dogo();
function GameLoop(){      
    set_fondo();   
    draw_flatfloor();
    player.draw();
    rinnos.forEach((rinno)=>{
        rinno.draw();
        rinno.moveLeft();
        check_match(player,rinno);
    })
    if (state)
        gLoop = setTimeout(GameLoop, 1000/15);
}  

GameLoop();