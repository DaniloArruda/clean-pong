import { Ball, BallLimits } from "./ball"
import { Speed } from "./speed"

describe('Ball', () => {
  it('should init on middle from limits', () => {
    const limits = new BallLimits(30, 30)
    const ball = new Ball(limits)

    expect(ball.x).toBe(limits.right / 2)
    expect(ball.y).toBe(limits.bottom / 2)
  })

  it('should move properly', () => {
    const ball = new Ball(new BallLimits(30, 30))

    ball.moveWith(new Speed(10, 3))

    expect(ball.x).toBe(25)
    expect(ball.y).toBe(18)
  })

  it('should change direction when ball hit vertical limits', () => {
    const ball = new Ball(new BallLimits(30, 30))

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
