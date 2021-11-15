import { Position } from "./position";

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
    private position: Position,
    private limits: PaddleLimits = new PaddleLimits()
  ) {}

  get x(): number {
    return this.position.x;
  }

  get y(): number {
    return this.position.y;
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
      this.position = new Position(this.position.x, this.position.y - 2)
    } else if (this.isGoingDown && this.canDown) {
      this.position = new Position(this.position.x, this.position.y + 2)
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

  get rightCorner(): number {
    return this.x + this.width
  }

  get leftCorner(): number {
    return this.x
  }

  get middleX(): number {
    return this.leftCorner + ((this.rightCorner - this.leftCorner) / 2)
  }
}
