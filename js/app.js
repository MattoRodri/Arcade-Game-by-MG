 /*
 * Enemy class and the array for all the enemies, the player will have to avoid the enemies.
 */ 

let allEnemies = [];
function Enemy() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = [];
    this.level = 1;
    this.speed = Math.floor(Math.random() * (450 - 100 + 1)) + 100;
    for (let i = 0; i <= 5; i++) {
        this.y.push(i * 83 + 60);
    }
    this.coordinatesY = this.y[this.random()];
}

Enemy.prototype.random = function() {
        let randomY = Math.floor( Math.random() * 3 );
        return randomY;
    };

 /*
 * Parameter: dt, a time delta between ticks
 */   

Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);
    if (this.x > 505) {
        this.x = -101; 
        this.coordinatesY = this.y[this.random()];
        if (score.points <= 200) {
            this.speed = Math.floor(Math.random() * (450 - 100 + 1)) + 100;        
            } else if (score.points > 200 && score.points <= 600) {
            this.speed = Math.floor(Math.random() * (450 - 150 + 1)) + 250;
            }   else if (score.points > 600 && score.points <= 1400) {
            this.speed = Math.floor(Math.random() * (450 - 250 + 1)) + 350;
            }   else if (score.points > 1400) {
            this.speed = Math.floor(Math.random() * (450 - 350 + 1)) + 450;
            }
        }
};

/*
* Creating a render method for Enemies to be drawn on the page
*/

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.coordinatesY);
};

/*
* A player class.
*/

function Player() {
    this.startingX = 505/2 - 101/2;
    this.startingY = 404; 
    this.x = this.startingX;
    this.y = this.startingY;
    this.sprite = 'images/char-boy.png';
    this.collision = false;
    this.lifes = 3;
}

/*
* Creating an update method to update the player movements, set some movement rules. 
*/

Player.prototype.update = function() {
    if (this.x >= 404) {
        this.x = 404;
    } else if (this.x <= 0) {
        this.x = 0;
    } 
    if (this.y >= 404) {
        this.y = 404;
    }  else if (this.y <= -83) {
        this.y = this.startingY;
        this.x = this.startingX;
        pointCalc();
    }
};

/*
* Creating a render method for Player to be drawn on the page
*/

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
* A panel on the top of the canvas class. it will display lifes (hearts), points (score), and a pause button. 
*/

function Panel(w, h, x, y, group) {
    this.heartX = 0;
    this.points = 0;
    this.w = w;
    this.h = h; 
    this.x = x; 
    this.y = y; 
    this.spriteHeart = 'images/Heart.png'; 
    this.group = group; 
} 

/*
* Creating a render method for Panel to be drawn on the page
*/

Panel.prototype.render = function() {
    if (this.group === 'hearts') {
        for (let i = 1; i <= player.lifes; i++) {
            ctx.drawImage(Resources.get(this.spriteHeart), this.x + this.heartX, this.y, this.w, this.h);
            this.heartX += this.w;
        }
        this.heartX = 0;
    }
    if (this.group === 'scores') {
        ctx.font = "25px 'Audiowide', cursive";        
        ctx.fillText(this.points, this.x, this.y);
    }
};

/*
* Creating a update method for Panel for all the updates for the point calculation, point reductions etc.
*/
Panel.prototype.update = function() {
    
};

/*
* Creating handleInput function for controlling the player with arrows
*/

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= 101;
    } else if (key === 'right') {
        this.x +=101;
    } else if (key === 'down') {
        this.y += 83;
    } else if (key === 'up') {
        this.y -= 83;
    }
};

/*
* Creating checkCollisions function to determine when player and enemy collides. 
*/

const checkCollisions = function() {
    for (let i = 0; i < allEnemies.length; i++) {
        let enemyRadius = 71/2;
        let playerRadius = 71/2;
        let dx = allEnemies[i].x - player.x; 
        let dy = allEnemies[i].coordinatesY - player.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < enemyRadius + playerRadius) {
            player.x = player.startingX;
            player.y = player.startingY;
            player.collision = true;
            lifeRemove();
       }
    }
}

/*
* Creating lifeRemove function in order to remove lifes when collided
*/

const lifeRemove = function() {
    if (player.collision === true && player.lifes > 0) {
        player.lifes -= 1;
        player.collision = false;
    } 
}

/*
* Creating pointCalc function in order to add points when reached the top successfully
*/

const pointCalc = function()  {
    if (score.points <= 200) {
        score.points += 50;        
    } else if (score.points > 200 && score.points <= 600) {
        score.points += 100;
    }   else if (score.points > 600 && score.points <= 1400) {
        score.points += 200;
    }   else if (score.points > 1400) {
        score.points += 400;
    }

}

/*
* This listens for key presses and sends the keys to your
* Player.handleInput() method.
*/

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});


/*
* Creating panel objects 
*/

const heart = new Panel(40, 60, 0, 0, 'hearts');
const score = new Panel(0, 0, 400, 40, 'scores');  

/*
* Create a new enemy and push it to allEnemies Array
*/ 
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
allEnemies.push(enemy1, enemy2, enemy3);

/*
* Create a new player
*/
const player = new Player();
