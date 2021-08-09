import { Position } from "./position"
import { Speed } from "./speed"

describe('Position', () => {
  test('should add x and y coordinate from speed to position', () => {
    const position = new Position(10, 20)
    const speed = new Speed(2, 4)

    const newPosition = position.moveWith(speed)

    expect(newPosition.x).toBe(12)
    expect(newPosition.y).toBe(24)
  })
})
