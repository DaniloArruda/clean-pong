export class Speed {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) { }

  changeVerticalDirection(): Speed {
    return new Speed(this.x, -this.y);
  }
}
