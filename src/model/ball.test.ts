import { BallBuilder } from "./ball"
import { Paddle, PaddleLimits } from "./paddle"
import { Position } from "./position"
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
    const ball = BallBuilder.withLimits(30, 30).startMovingRandomly().onMiddlePosition().build()

    if (ball.isGoingDown) {
      ball.moveWith(new Speed(0, 14))

      ball.update()

      expect(ball.isGoingUp).toBe(true)
    } else {
      ball.moveWith(new Speed(0, -14))

      ball.update()

      expect(ball.isGoingDown).toBe(true)
    }
  })

  it('should ball hit a paddle', () => {
    const paddle = new Paddle(new Position(0, 20), new PaddleLimits(100))
    const ball = BallBuilder.withLimits(100, 100).onPosition(30, 30).startMovingToLeft().build()

    expect(ball.hitPaddle(paddle)).toBe(true)
  })
})
