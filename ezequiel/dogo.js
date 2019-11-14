/* Propiedaes de la ventana */
const ancho = 1300;  
const alto = 600;  
const canvas = document.getElementById('canvas');
canvas.width = ancho;  
canvas.height = alto; 

const context = canvas.getContext('2d');  

/* configuracion del fondo */
const fondo = new Image();
fondo.src = "fondo/fondo11.png";
function set_fondo(){  
    context.fillStyle = '#d0e7f9';  
    context.beginPath();  
    context.drawImage(fondo, 0, 0, 960, 600, 0, 0, ancho, alto);
    //context.rect(0, 0, ancho, alto);  
    context.closePath();  
    context.fill();  
}

const piso_altura = 30
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
        this.imagen.src = "player/bluep.png";
        /* tamano personaje */
        this.ancho = 200;
        this.alto = 150;

        /* tamano de cada frame */
        this.f_ancho = 400;
        this.f_alto  = 400;
        this.nframes = 10;

        this.actualFrame = 400;
        this.X = 2;
        this.Y = (alto-piso_altura)-this.alto; 
    }
    draw(){
        context.drawImage(this.imagen, this.f_ancho*this.actualFrame, 0, this.f_ancho, this.f_alto, this.X, this.Y, this.ancho, this.alto);
        this.actualFrame = (this.actualFrame + 1) % this.nframes;
    }

   moveLeft() { this.X = Math.max(0,this.X-10); }
   moveRight(){ this.X = Math.min(ancho-this.f_ancho,this.X+10); }
   jump()     { 
        this.Y = this.Y-158;
        setTimeout(() => { this.Y = this.Y +158; }, 660);
    }
};



class Rinno{
    constructor(){
        /* configuracion de imagen */
        this.imagen = new Image();
        this.imagen.src = "player/rinno.png";
        /* tamano personaje */
        this.ancho = 185;
        this.alto = 150;

        /* tamano de cada frame */
        this.f_ancho = 920;
        this.f_alto  = 510;
        this.nframes = 16;

        this.actualFrame = 0;
        this.X = 1000;
        this.Y = (alto-piso_altura)-this.alto; 
    }
    draw(){
        context.drawImage(this.imagen, this.f_ancho*this.actualFrame, 0, this.f_ancho, this.f_alto, this.X, this.Y, this.ancho, this.alto);
        this.actualFrame = (this.actualFrame + 1) % this.nframes;
    }

   moveLeft() { this.X = (-1400,this.X-14); }
   moveRight(){ this.X = Math.min(ancho-this.f_ancho,this.X+60); }
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



let gLoop;
let state = true;
const player = new Dogo();
const player2 = new Rinno();
var rinnos=[];
function agregar_rinno(){
    let rinno = new Rinno();
    rinnos.push(rinno);
    console.log("i born");
    setTimeout(agregar_rinno,Math.random()*5000);
}
agregar_rinno();
let Gameover=false;
function check_match(player,enemy){
    Py=player.Y+player.alto;
    Px1=player.X;
    Px2=player.X+player.ancho-67;
    Ey=enemy.Y;
    Ex1=enemy.X
    Ex2=enemy.X+enemy.ancho-60;
    if((Py<Ey)||(Px2<Ex1)||(Px1>Ex2)){
        Gameover =false;
    }
    else{
        Gameover=true;
    }
}
function GameLoop(){  

    set_fondo();   
    draw_flatfloor();
    rinnos.forEach((rinno)=>{
        rinno.draw();
        rinno.moveLeft();
        check_match(player,rinno);
        if (Gameover){
            alert("PERDISTE");
        }    
    })    
    player.draw();
    player2.draw();
    player2.moveLeft();
    if (state)
        gLoop = setTimeout(GameLoop, 800/15); 
}  

GameLoop(); 
