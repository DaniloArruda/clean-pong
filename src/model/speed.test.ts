import { Speed } from "./speed"

describe('Speed', () => {
  it('should change y sinal when revert on vertical', () => {
    const speed = new Speed(3, 2);
    const newSpeed = speed.revertVerticalDirection()

    expect(newSpeed.x).toBe(3)
    expect(newSpeed.y).toBe(-2)
  })

  it('should change x sinal when revert on horizontal', () => {
    const speed = new Speed(3, 2);
    const newSpeed = speed.revertHorizontalDirection()

    expect(newSpeed.x).toBe(-3)
    expect(newSpeed.y).toBe(2)
  })
})
