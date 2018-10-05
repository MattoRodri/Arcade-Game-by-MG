// Enemies our player must avoid
let allEnemies = [];
const Keys = {

};
function Enemy() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = [];
    this.speed = Math.floor(Math.random() * (450 - 100 + 1)) + 100;
    for (i = 0; i <= 5; i++) {
        this.y.push(i * 83 + 60);
    }
    this.coordinatesY = this.y[this.random()];
};

Enemy.prototype.random = function() {
        let randomY = Math.floor( Math.random() * 3 );
        return randomY;
    };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);
    if (this.x > 505) {
        this.x = -101; 
        this.coordinatesY = this.y[this.random()];
        this.speed = Math.floor(Math.random() * (450 - 100 + 1)) + 100;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log( Math.floor( Math.random() * 3 ));
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.coordinatesY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {
    this.startingX = 505/2 - 101/2;
    this.startingY = 404; 
    this.x = this.startingX;
    this.y = this.startingY;
    this.sprite = 'images/char-boy.png';
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
    }
};

/*
* Creating a render method for Player to be drawn on the page
*/

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
* Creating checkCollisions function to dtermine when player and enemy collides. 
*/

let checkCollisions = function() {

    if (player.x < enemy.x + 71  && player.x + 71 > enemy.x &&
        player.y < enemy.coordinatesY + 71 && player.y + 71 > enemy.coordinatesY) {
    // The objects are touching
    player.x = player.startingX;
    player.y = player.startingY;
   };
}; 


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
/*
* Create a new enemy and push it to allEnemies Array
*/ 
const enemy = new Enemy();
// const enemy2 = new Enemy();
// const enemy3 = new Enemy();
allEnemies.push(enemy);

/*
* Create a new player
*/
const player = new Player();
