var canvas, ctx;
var x = 100;
var y = 100;
var dx_nave = 10;
var dy_bala = 4;
var KEY_ENTER = 13;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var BARRA = 32;
var imagen, imagenEnemigo;

var teclaPulsada = null;
var tecla = [];
var colorBala = "red";
var balas_array = new Array();
var enemigos_array = new Array();

/*******************************************************
 *********************  OBJETOS ************************
 ******************************************************/

function Bala(x,y,w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.dibuja = function(){
        ctx.save();
        ctx.fillStyle = colorBala;
        ctx.fillRect(this.x, this.y, this.w, this.w);
        this.y -= dy_bala;
        ctx.restore();
    };
}

function Jugador(x) {
    this.x = x;
    this.y = 450;
    this.dibuja = function(x) {
        this.x = x;
        ctx.drawImage(imagen, this.x, this.y, 30, 15);
    };
}

function Enemigo(x,y) {
    this.x = x;
    this.y = y;
    this.w = 35;
    this.veces = 0;
    this.dx = 5;
    this.ciclos = 0;
    this.num = 14;
    this.figura = true;
    this.vive = true;

    this.dibuja = function() {
        // retraso
        if (this.ciclos > 30) {
            // saltos
            if (this.veces > this.num) {
                this.dx *= -1;
                this.veces = 0;
                this.num = 28;
                this.y += 20;
                this.dx = (this.dx>0)?this.dx++:this.dx--;
            } else {
                this.x += this.dx; 
            }
            this.veces++;
            this.ciclos = 0;
            this.figura = !this.figura;
        } else {
            this.ciclos++;
        }

        if (this.figura) {
            ctx.drawImage(imagenEnemigo, 0, 0, 40, 30, this.x, this.y, 35, 30);
        } else {
            ctx.drawImage(imagenEnemigo, 50, 0, 35, 30, this.x, this.y, 35, 30);
        }
        //this.figura = !this.figura;
    };
}
/******************* FIN OBJETOS *************************/

function anima() {
	requestAnimationFrame(anima);
	verifica();
	pinta();
}

function verifica() {
    if (tecla[KEY_RIGHT]) {
        x += dx_nave;
    }
    if (tecla[KEY_LEFT]) {
        x -= dx_nave;
    }

    // Colisiones del cañón con paredes laterales
    if (x>canvas.width-imagen.width) {
        x = canvas.width-imagen.width;
    }
    if (x<0) {
        x = 0;
    }

    // Disparo
    if (tecla[BARRA]) {
        balas_array.push(new Bala(jugador.x+12, jugador.y-3, 5));
        tecla[BARRA] = false;
    }
}

function pinta() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    jugador.dibuja(x);
    
    // las balas
    for (var i=0; i<balas_array.length; i++) {
        if (balas_array[i] != null) {
            balas_array[i].dibuja();
            // si sale de la pantalla, se elimina de la colección.
            if (balas_array[i].y<0) {
                balas_array[i] = null;
            }
        }
    }

    // las naves enemigas
    for (var i=0; i<enemigos_array.length; i++) {
        enemigos_array[i].dibuja();
    }
}

/********************************************************
 *                         LISTENERS
 *******************************************************/
document.addEventListener("keydown", function(e) {
    teclaPulsada = e.keyCode;
    tecla[e.keyCode] = true;
});

document.addEventListener("keyup", function(e) {
    tecla[e.keyCode] = false;
});
/********************* FIN LISTENERS ******************/

/* window.requestAnimationFrame=(function(){
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function(callback){window.setTimeout(callback,17);}
})(); */

window.onload = function(){
	canvas = document.getElementById("miCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
            x = canvas.width/2;

            // La nave propia
            imagen = new Image();
            imagen.src = "img/torre.fw.png";
            imagen.onload = function() {
                jugador = new Jugador(0);
                jugador.dibuja(canvas.width/2);
                anima();
            }

            // Las naves enemigas
            imagenEnemigo = new Image();
            imagenEnemigo.src = "img/invader.fw.png";
            imagenEnemigo.onload = function() {
                for (var i=0; i<5; i++) {
                    for (var j=0; j<10; j++) {
                        enemigos_array.push(new Enemigo(100+40*j, 30+45*i));
                    }
                }
            }
		} else {
			alert("Error al crear tu contexto");	
		}
	}
}
