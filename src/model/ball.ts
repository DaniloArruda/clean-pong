import { Paddle } from "./paddle"
import { Position } from "./position"
import { Speed } from "./speed"

export class BallLimits {
  constructor(
    public readonly bottom: number,
    public readonly right: number,
    public readonly top: number = 0,
    public readonly left: number = 0,
  ) { }
}

export class Ball {
  public readonly radius = 10

  private position: Position
  private speed: Speed

  constructor(
    private readonly ballLimits: BallLimits,
  ) { }

  public definePosition(position: Position) {
    this.position = position
  }

  public defineMiddlePosition() {
    this.position = new Position(this.ballLimits.right / 2, this.ballLimits.bottom / 2)
  }

  public defineSpeedRandomly(): void {
    const xSpeed = (() => {
      const value = this.randomBetween(3, 4)
      const isRight = this.randomBetween(0, 1) > 0.5
      return isRight ? value : -value
    })()

    const ySpeed = this.randomBetween(-3, 3)

    this.speed = new Speed(xSpeed, ySpeed)
  }

  public defineSpeedToRight(): void {
    const xSpeed = this.randomBetween(3, 4)
    const ySpeed = this.randomBetween(-3, 3)

    this.speed = new Speed(xSpeed, ySpeed)
  }

  public defineSpeedToLeft(): void {
    const xSpeed = this.randomBetween(-3, -4)
    const ySpeed = this.randomBetween(-3, 3)

    this.speed = new Speed(xSpeed, ySpeed)
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

  public get rightCorner(): number {
    return this.x + this.radius
  }

  public get leftCorner(): number {
    return this.x - this.radius
  }

  public get isGoingUp(): boolean {
    return this.speed.y < 0
  }

  public get isGoingDown(): boolean {
    return this.speed.y > 0
  }

  public get isGoingLeft(): boolean {
    return this.speed.x < 0
  }

  public get isGoingRight(): boolean {
    return this.speed.x > 0
  }

  public update() {
    if (this.hitTop || this.hitBottom) {
      this.speed = this.speed.revertVerticalDirection();
    } else if (this.hitLeft || this.hitRight) {
      this.defineMiddlePosition()
      this.defineSpeedRandomly()
    }

    this.moveWith(this.speed)
  }

  public moveWith(speed: Speed): void {
    this.position = new Position(this.x + speed.x, this.y + speed.y)
  }

  public revertHorizontalDirection(): void {
    this.speed = this.speed.revertHorizontalDirection()
  }

  public hitPaddle(paddle: Paddle): boolean { // TODO: consider y coordinate on calculation
    return this.rightCorner >= paddle.leftCorner && this.rightCorner <= paddle.middleX
      || this.leftCorner <= paddle.rightCorner && this.leftCorner > paddle.middleX
  }

  private get hitTop(): boolean {
    return this.y < this.radius
  }

  private get hitBottom(): boolean {
    return this.y > this.ballLimits.bottom - this.radius
  }

  private get hitLeft(): boolean {
    return this.x < this.radius
  }

  private get hitRight(): boolean {
    return this.x > this.ballLimits.right - this.radius
  }

  private randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }
}

export class BallBuilder {
  static withLimits(
    bottom: number,
    right: number,
    top: number = 0,
    left: number = 0,
  ): BallBuilder {
    return new BallBuilder(new BallLimits(bottom, right, top, left))
  }

  private instance: Ball = null

  private constructor(limits: BallLimits) {
    this.instance = new Ball(limits)
  }

  onPosition(x: number, y: number): BallBuilder {
    this.instance.definePosition(new Position(x, y))
    return this
  }

  onMiddlePosition(): BallBuilder {
    this.instance.defineMiddlePosition()
    return this
  }

  startMovingRandomly(): BallBuilder {
    this.instance.defineSpeedRandomly()
    return this
  }

  startMovingToLeft(): BallBuilder {
    this.instance.defineSpeedToLeft()
    return this
  }

  startMovingToRight(): BallBuilder {
    this.instance.defineSpeedToRight()
    return this
  }

  build(): Ball {
    return this.instance
  }
}
