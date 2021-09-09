var canvas, ctx;

var dx_player = 10;
var player_image_path = "img/torre.fw.png";

var dy_fire = 4;
var colorFire = "red";

var dx_enemy1 = 5;
var enemy1_image_path = "img/invader.fw.png";

var KEY_ENTER = 13;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var BARRA = 32;

var teclaPulsada = null;
var tecla = [];

var fire_array = new Array();
var enemigos_array = new Array();


function animate() {
	requestAnimationFrame(animate);
	verify();
	render();
}

function verify() {
    if (tecla[KEY_RIGHT]) {
        player.moveRight();
    }
    if (tecla[KEY_LEFT]) {
        player.moveLeft();
    }

    // Player ship - board walls collisions
    player.checkWallCollisions(canvas.width);

    // Fire
    if (tecla[BARRA]) {
        fire_array.push(new Fire(player.getX()+12, player.getY()-3, 5, dy_fire, colorFire));
        tecla[BARRA] = false;
    }
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    
    // fire
    for (let i=0; i<fire_array.length; i++) {
        if (fire_array[i] != null) {
            fire_array[i].draw(ctx);
            // si sale de la pantalla, se elimina de la colección.
            if (fire_array[i].y<0) {
                fire_array[i] = null;
            }
        }
    }

    // the enemy ships
    for (let i=0; i<enemigos_array.length; i++) {
        enemigos_array[i].draw(ctx);
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
	canvas = document.getElementById("board");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx) {

            // The player ship
            player = new Player(canvas.width/2, 450, dx_player, player_image_path);
            player.draw(ctx);
            animate();

            // Enemy ships
            for (var i=0; i<5; i++) {
                for (var j=0; j<10; j++) {
                    enemigos_array.push(new Enemy1(100+40*j, 30+45*i, dx_enemy1, enemy1_image_path));
                }
            }
		} else {
			alert("Error in context creation");	
		}
	}
};
