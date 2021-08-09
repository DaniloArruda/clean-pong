import { Position } from "./position"

export class BallLimits {
  constructor(
    public readonly bottom: number,
    public readonly top: number,
    public readonly left: number,
    public readonly right: number,
  ) {}
}

export class Ball {
  public readonly radius = 10
  public position: Position

  private xSpeed: number
  private ySpeed: number

  constructor(
    private ballLimits: BallLimits,
  ) {}
}
