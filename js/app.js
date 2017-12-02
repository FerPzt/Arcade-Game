//Calculate random speed for enemies
function calculateSpeed() {
  return 100 + Math.floor(Math.random() * 250);
}

//Enemies player must avoid
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x += this.speed * dt;

    if (this.x > 500) {
      this.x = 0;
      this.speed = calculateSpeed();
    }
    this.collisionHandler();
  }

  //Check if enemy and player collide
  collisionHandler() {
    const px = player.getX();
    const py = player.getY()
    if (py === this.y &&
        px <= this.x + 25 &&
        px >= this.x - 25) {
      //and return player to initial position
      player.setPosition(200, 380);
    }
  }

  //Draw the enemy on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

//Player Class
class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
  }

  getX () {
    return this.x;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getY() {
    return this.y;
  }

  //Make sure player doesn't move out of the canvas
  update() {
    if (this.y > 380) {
      this.y = 380;
    }
    if (this.x > 400) {
      this.x = 400;
    }
    //When game is won, reset player position
    if (this.y <= 0) {
      this.x = 200;
      this.y = 380;
    }
    if (this.x < 0) {
      this.x = 0;
    }
  }

  //Handle keyboard commands to move the player
  handleInput(key) {
    switch (key) {
      case 'left':
        this.x -= this.speed + 50;
        break;
      case 'right':
        this.x += this.speed + 50;
        break;
      case 'up':
        this.y -= this.speed + 30;
        break;
      case 'down':
        this.y += this.speed + 30;
        break;
    }
    //When player arrives the water, he wins the game
    if (this.y <= 0) {
      setTimeout(function() {
        alert("Congratulations! You won! \nLet's play again! :)");
    }, 100);
    }
  }

  //Draw the player on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Place all enemy objects in an array called allEnemies
let allEnemies = [];
//Initial position of enemies
const enemyPos = [220, 140, 60]
// Place the player object in a variable called player
let player = new Player(200, 380, 50);

//add a new enemy
enemyPos.forEach(function(positionY) {
  let enemy = new Enemy(0, positionY, calculateSpeed());
  allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
