class Platform extends Component {
  constructor(gameScreen, left, top, width, height, environmentVelocity = 3) {
    super(
      gameScreen,
      left,
      top,
      width,
      height,
      "./images/platforms/platform-1.png"
    );
    this.environment = { velocity: environmentVelocity };
  }

  move() {
    this.left -= this.environment.velocity;
    this.updatePosition();
  }
}
