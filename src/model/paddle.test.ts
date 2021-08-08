import { Paddle, PaddleDirection, PaddleLimits } from "./paddle"

describe('Paddle', () => {
  test('should paddle init stopped', () => {
    const paddle = new Paddle(10, 20)

    expect(paddle.direction).toBe(PaddleDirection.Stop)
  })

  test('should paddle direction is Up when paddle going up', () => {
    const paddle = new Paddle(10, 20)

    paddle.up()

    expect(paddle.direction).toBe(PaddleDirection.Up)
  })

  test('should paddle direction is Down when paddle going down', () => {
    const paddle = new Paddle(10, 20)

    paddle.down()

    expect(paddle.direction).toBe(PaddleDirection.Down)
  })

  test('should paddle direction is Stop when paddle to stop', () => {
    const paddle = new Paddle(10, 20)

    paddle.stop()

    expect(paddle.direction).toBe(PaddleDirection.Stop)
  })

  test('should decrement y when update paddle that is going up', () => {
    const paddle = new Paddle(10, 20)

    paddle.up()
    paddle.update()

    expect(paddle.y).toBe(18)
  })

  test('should increment y when paddle down', () => {
    const paddle = new Paddle(10, 20)

    paddle.down()
    paddle.update()

    expect(paddle.y).toBe(22)
  })

  test('should not decrement y when update paddle that is going up and reached the top limit', () => {
    const limits = new PaddleLimits(30, 0)
    const paddle = new Paddle(10, 0, limits)

    paddle.up()
    paddle.update()

    expect(paddle.y).toBe(0)
  })

  test('should not increment y when paddle down and reached the bottom limit', () => {
    const limits = new PaddleLimits(100, 0)
    const paddle = new Paddle(10, 20, limits)

    paddle.down()
    paddle.update()

    expect(paddle.y).toBe(20)
  })
})
