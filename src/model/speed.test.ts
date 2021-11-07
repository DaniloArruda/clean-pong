import { Speed } from "./speed"

describe('Speed', () => {
  it('should change y sinal when revert on vertical', () => {
    const speed = new Speed(2, 2);
    const newSpeed = speed.changeVerticalDirection()

    expect(newSpeed.y).toBe(-2)
  })
})
