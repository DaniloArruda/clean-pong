import { Ball, BallBuilder } from "./ball"
import { Speed } from "./speed"

describe('Ball', () => {
  it('should init on middle from limits', () => {
    const bottomLimit = 30
    const rightLimit = 30
    const ball = BallBuilder.withLimits(bottomLimit, rightLimit).onMiddlePosition().build()

    expect(ball.x).toBe(bottomLimit / 2)
    expect(ball.y).toBe(rightLimit / 2)
  })

  it('should move properly', () => {
    const ball = BallBuilder.withLimits(30, 30).onPosition(0, 0).build()

    ball.moveWith(new Speed(10, 3))

    expect(ball.x).toBe(10)
    expect(ball.y).toBe(3)
  })

  it('should change direction when ball hit vertical limits', () => {
    const ball = BallBuilder.withLimits(30, 30).startMoving().onMiddlePosition().build()

    if (ball.goingDown) {
      ball.moveWith(new Speed(0, 14))

      ball.update()

      expect(ball.goingUp).toBe(true)
    } else {
      ball.moveWith(new Speed(0, -14))

      ball.update()

      expect(ball.goingDown).toBe(true)
    }
  })
})
