import { Speed } from "./speed";

export class Position {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  public moveWith(speed: Speed): Position {
    return new Position(this.x + speed.x, this.y + speed.y)
  }
}
