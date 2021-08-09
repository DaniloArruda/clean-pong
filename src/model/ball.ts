import { Position } from "./position"
import { Speed } from "./speed"

export class BallLimits {
  constructor(
    public readonly bottom: number,
    public readonly right: number,
    public readonly top: number = 0,
    public readonly left: number = 0,
  ) {}
}

export class Ball {
  public readonly radius = 10
  public position: Position

  private speed: Speed

  constructor(
    private ballLimits: BallLimits,
  ) {
    this.position = new Position(this.ballLimits.right / 2, this.ballLimits.bottom / 2)
    this.speed = this.defineSpeed()
  }

  public get x(): number {
    return this.position.x
  }

  public get y(): number {
    return this.position.y
  }

  public get diameter(): number {
    return this.radius * 2
  }

  public update() {
    if (this.hitTop || this.hitBottom) {
      this.speed = new Speed(this.speed.x, -this.speed.y)
    }

    this.position = this.position.moveWith(this.speed)
  }

  private get hitTop(): boolean {
    return this.y < this.radius
  }

  private get hitBottom(): boolean {
    return this.y > this.ballLimits.bottom - this.radius
  }

  private defineSpeed(): Speed {
    const xSpeed = (() => {
      const value = this.randomBetween(3, 4)
      const isRight = this.randomBetween(0, 1) > 0.5
      return isRight ? value : -value
    })()

    const ySpeed = this.randomBetween(-3, 3)

    return new Speed(xSpeed, ySpeed)
  }

  private randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }
}
