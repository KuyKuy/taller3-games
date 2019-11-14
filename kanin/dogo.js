/* Propiedaes de la ventana */
const ancho = 960;  
const alto = 600;  
const canvas = document.getElementById('canvas');
canvas.width = ancho;  
canvas.height = alto; 

const context = canvas.getContext('2d');  

/* configuracion del fondo */
const fondo = new Image();
fondo.src = "fondo/fondo2.jpg";
function set_fondo(){  
    context.fillStyle = '#d0e7f9';  
    context.beginPath();  
    context.drawImage(fondo, 0, 0, 960, 600, 0, 0, ancho, alto);
    //context.rect(0, 0, ancho, alto);  
    context.closePath();  
    context.fill();  
}

const piso_altura = 20
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
        this.imagen.src = "player/jolteon.png";
        /* tamano personaje */
        this.ancho = 100;
        this.alto = 100;

        /* tamano de cada frame */
        this.f_ancho = 100;
        this.f_alto  = 100
        this.nframes = 4;

        this.actualFrame = 0;
        this.X = 20;
        this.Y = (alto-piso_altura)-this.alto; 
    }
    draw(){
        context.drawImage(this.imagen, this.f_ancho*this.actualFrame, 0, this.f_ancho, this.f_alto, this.X, this.Y, this.ancho, this.alto);
        this.actualFrame = (this.actualFrame + 1) % this.nframes;
    }

   moveLeft() { this.X = Math.max(0,this.X-8); }
   moveRight(){ this.X = Math.min(ancho-this.f_ancho,this.X+5); }
   jump() {
       this.Y =this.Y-50 
       setTimeout(() => {
        this.Y =this.Y+50
       }, 300);
    }
   crouch() { this.Y = Math.max(0, this.Y+5) ; }
} 

class Rinno{
constructor(){
    /* configuracion de imagen */
    this.imagen = new Image();
    this.imagen.src = "player/rinno.png";
    /* tamano personaje */
    this.ancho = 85;
    this.alto = 50;

    /* tamano de cada frame */
    this.f_ancho = 920;
    this.f_alto  = 510
    this.nframes = 16;

    this.actualFrame = 0;
    this.X = 500;
    this.Y = (alto-piso_altura)-this.alto; 
}
draw(){
    context.drawImage(this.imagen, this.f_ancho*this.actualFrame, 0, this.f_ancho, this.f_alto, this.X, this.Y, this.ancho, this.alto);
    this.actualFrame = (this.actualFrame + 1) % this.nframes;
}

moveLeft() { this.X = (0,this.X-8); }
moveRight(){ this.X = Math.min(ancho-this.f_ancho,this.X+5); }
jump() {
   this.Y =this.Y-50 
   setTimeout(() => {
    this.Y =this.Y+50
   }, 300);
}
crouch() { this.Y = Math.max(0, this.Y+5) ; }
} 
class Catty{
    constructor(){
        /* configuracion de imagen */
        this.imagen = new Image();
        this.imagen.src = "player/catty.png";
        /* tamano personaje */
        this.ancho = 185;
        this.alto = 150;

        /* tamano de cada frame */
        this.f_ancho = 100;
        this.f_alto  = 75;
        this.nframes = 9;

        this.actualFrame = 0;
        this.X = 20;
        this.Y = (alto-piso_altura)-this.alto + 45; 
    }
    draw(){
        context.drawImage(this.imagen, this.f_ancho*this.actualFrame, 0, this.f_ancho, this.f_alto, this.X, this.Y, this.ancho, this.alto);
        this.actualFrame = (this.actualFrame + 1) % this.nframes;
    }

   moveLeft() { this.X = Math.max(0,this.X-5); }
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
    else if ((e.keyCode=='40') || (e.keyCode=='83')){ player.crouch(); }
}
var rinnos=[]
function agregar_rinno(){
    let rinno= new Rinno();
    rinnos.push(rinno);
    console.log("i born");
    setTimeout(agregar_rinno ,  Math.random()*5000);

}
agregar_rinno();
let gameover =false
function    check_match(player,enemy){
    DELTA=20;
    py = player.Y+player.alto;
    px1 = player.X + 2*DELTA;
    px2 = player.X+player.ancho -2*DELTA;

    Ey = enemy.Y;
    Ex1 = enemy.X;
    Ex2 = enemy.X+enemy.ancho;
    if((py<Ey)||(px2<Ex1)||(px1>Ex2)){
        gameover =false;
    }
    else {
        gameover =true;
    }
}

let gLoop;
let state = true;
const player = new Dogo();
const enemy =new Rinno()
function GameLoop(){
    set_fondo();   
    draw_flatfloor();
    player.draw();
    enemy.draw();
    enemy.moveLeft();
    rinnos.forEach(rinno => {
        rinno.draw();
        rinno.moveLeft();
        check_match(player,rinno);
    });

    if (gameover){
        alert("PERDISTE!!");
    }

    if (state)
        gLoop = setTimeout(GameLoop, 1000/15); 
}  

GameLoop(); 
