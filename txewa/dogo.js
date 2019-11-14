/* Propiedaes de la ventana */
const ancho = 960;  
const alto = 600;  
const canvas = document.getElementById('canvas');
canvas.width = ancho;  
canvas.height = alto; 

const context = canvas.getContext('2d');  

/* configuracion del fondo */
const fondo = new Image();
fondo.src = "fondo/fondo5.gif";
function set_fondo(){  
    context.fillStyle = '#d0e7f9';  
    context.beginPath();  
    context.drawImage(fondo, 0, 0, 960, 600, 0, 0, ancho, alto);
    //context.rect(0, 0, ancho, alto);  
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
        this.imagen.src = "player/test.png";
        /* tamano personaje */
        this.ancho = 100;
        this.alto = 100;

        /* tamano de cada frame */
        this.f_ancho = 267;
        this.f_alto  = 178;
        this.nframes = 4;

        this.actualFrame = 0;
        this.X = 30;
        this.Y = (alto-piso_altura)-this.alto; 
    }
    draw(){
        context.drawImage(this.imagen, this.f_ancho*this.actualFrame, 0, this.f_ancho, this.f_alto, this.X, this.Y, this.ancho, this.alto);
        this.actualFrame = (this.actualFrame + 1) % this.nframes;
    }

   moveLeft() { this.X = Math.max(0,this.X-5); }
   moveRight(){ this.X = Math.min(ancho-this.f_ancho,this.X+5); }
   jump() {this.Y= this.Y-50;
    setTimeout(
        ()=>{this.Y=this.Y+50},100);
}

};

class Rinno{
    constructor(){
        /* configuracion de imagen */
        this.imagen = new Image();
        this.imagen.src = "player/rinno.png";
        /* tamano personaje */
        this.ancho = 100;
        this.alto = 100;

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
   jump() {this.Y= this.Y-50;
    setTimeout(
        ()=>{this.Y=this.Y+50},100);
}

};



class Catty{
    constructor(){
        /* configuracion de imagen */
        this.imagen = new Image();
        this.imagen.src = "player/jolteon.png";
        /* tamano personaje */
        this.ancho = 160
        this.alto = 180;

        /* tamano de cada frame */
        this.f_ancho = 100;
        this.f_alto  = 100;
        this.nframes = 4;

        this.actualFrame = 0;
        this.X = 20;
        this.Y = (alto-piso_altura)-this.alto + 45; 
    }
    draw(){
        context.drawImage(this.imagen, this.f_ancho*this.actualFrame, 0, this.f_ancho, this.f_alto, this.X, this.Y, this.ancho, this.alto);
        this.actualFrame = (this.actualFrame + 1) % this.nframes;
    }

   moveLeft() { this.X = Math.max(0,this.X-40); }
   moveRight(){ this.X = Math.min(ancho-this.f_ancho,this.X+5); }
};



document.onkeydown = function(e) {
    e = e || window.event;
    console.log(e.keyCode);
    /*
     * 37: flecha a la iuierda || 65: a
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
    let rinno=new Rinno();
    rinnos.push(rinno);
    console.log("i born");
    setTimeout (agregar_rinno, Math.random()*10000)
}
agregar_rinno();

let gameover=false
function chek_Match(player, enemy){
    delta=15;
    PY=player.Y
    PX1=player.X
    PX2=player.X+player.ancho
    EY=enemy.Y
    EX1=enemy.X+2*delta
    EX2=enemy.X+enemy.ancho-2*delta
    if((PY<EY)||(PX2<EX1)||(PX1>EX1)){
        gameover=false;
    }
    else {
        alert("game over")
    }
}

let gLoop;
let state = true;
const player = new Dogo();
let rinno=new Rinno();
function GameLoop(){  
    set_fondo();   
    draw_flatfloor();
    player.draw();

    rinnos.forEach((rinno)=>{
        rinno.draw();
        rinno.moveLeft();
        chek_Match(player,rinno)
    })
    if (state)
        gLoop = setTimeout(GameLoop, 1000/10); 
}  

GameLoop(); 
