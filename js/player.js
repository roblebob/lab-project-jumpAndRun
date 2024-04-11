class Player {
  constructor(gameScreen, left, top, environmentVelocity = 3) {
    this.gameScreen = gameScreen;

    // primary attributes
    this.left = left;
    this.top = top;
    this.width = 65;
    this.height = 92;

    // create container for the player character stills
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;
    this.gameScreen.appendChild(this.element);
    this.element.style.zIndex = 9; 

    // add stills to the player character
    this.characterStills().forEach((still) => {
      const image = document.createElement("img");
      image.src = still;
      image.style.width = `auto`;
      image.style.height = `auto`;
      image.style.zIndex = 9;

      //TODO: ATTEMPT TO POSITION THE IMAGE ON TOP ON EACH OTHER
      image.style.position = "relative";
      image.style.top = "0px";
      image.style.left = "0px";

      this.element.appendChild(image);
    });

    // secondary attributes for movement
    this.directionX = 0;
    this.directionY = 0;
    this.falling = { active: true, velocity: 10 };
    this.jumping = { velocity: 20 };
    this.moving = { velocity: 10 };
    this.environment = { velocity: environmentVelocity };
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.falling.active) this.top += this.falling.velocity;
    if (!this.falling.active) this.left -= this.environment.velocity;

    this.left = Math.max(0, this.left);

    this.updatePosition();
  }

  didCollide(obstacles) {
    const playerRect = this.element.getBoundingClientRect();

    for (const obstacle of obstacles) {
      const obstacleRect = obstacle.element.getBoundingClientRect();

      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        // playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.bottom < obstacleRect.bottom &&
        true
      ) {
        this.falling.active = false;
        this.environment.velocity = obstacle.environment.velocity;
        return true;
      }
    }

    this.falling.active = true;
    return false;
  }

  info() {
    console.log("falling-active:", this.falling.active);
  }

  clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  characterStills() {
    return [
      "images/chicken-right/chicken-run-0.png",
      "images/chicken-right/chicken-run-1.png",
      "images/chicken-right/chicken-run-2.png",
      "images/chicken-right/chicken-run-3.png",
      "images/chicken-right/chicken-run-4.png",
      "images/chicken-right/chicken-run-5.png",
      "images/chicken-right/chicken-run-6.png",
      "images/chicken-right/chicken-run-7.png",
      "images/chicken-right/chicken-run-8.png",
      "images/chicken-right/chicken-run-9.png",
    ];
  }
}
