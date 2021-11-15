export class Speed {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) { }

  revertVerticalDirection(): Speed {
    return new Speed(this.x, -this.y);
  }

  revertHorizontalDirection(): Speed {
    return new Speed(-this.x, this.y);
  }
}
