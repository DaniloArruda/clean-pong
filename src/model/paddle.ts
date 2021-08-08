export enum PaddleDirection {
  Up,
  Down,
  Stop,
}

export class PaddleLimits {
  constructor(
    public bottom?: number,
    public top = 0,
  ) {}
}

export class Paddle {
  public readonly height = 80
  public readonly width = 20

  private _direction = PaddleDirection.Stop

  constructor(
    private _x: number,
    private _y: number,
    private limits: PaddleLimits = new PaddleLimits()
  ) {}

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get direction(): PaddleDirection {
    return this._direction
  }

  get isStopped(): boolean {
    return this.direction === PaddleDirection.Stop
  }

  up() {
    this._direction = PaddleDirection.Up
  }

  down() {
    this._direction = PaddleDirection.Down
  }

  stop() {
    this._direction = PaddleDirection.Stop
  }

  update() {
    if (this.isGoingUp && this.canUp) {
      this._y -= 2
    } else if (this.isGoingDown && this.canDown) {
      this._y += 2
    }
  }

  get isGoingUp(): boolean {
    return this.direction === PaddleDirection.Up
  }

  get isGoingDown(): boolean {
    return this.direction === PaddleDirection.Down
  }

  get canUp(): boolean {
    return this.y > this.limits.top
  }

  get canDown(): boolean {
    return !this.limits.bottom || this.y < this.limits.bottom - this.height
  }

}
