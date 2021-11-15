import P5 from "p5";
import "p5/lib/addons/p5.dom";
import { Ball, BallBuilder, BallLimits } from "./model/ball";
import { Paddle, PaddleLimits } from "./model/paddle";
import { Position } from "./model/position";
import "./styles.scss";

const sketch = (p5: P5) => {
  let paddleLeft: Paddle
  let paddleRight: Paddle
  let ball: Ball

  p5.setup = () => {
    p5.createCanvas(625, 350).parent("app")

    const paddleLimits = new PaddleLimits(p5.height)

    paddleLeft = new Paddle(new Position(26, p5.height / 2), paddleLimits)
    paddleRight = new Paddle(new Position(p5.width - 48, p5.height / 2), paddleLimits)
    ball = BallBuilder.withLimits(p5.height, p5.width).onMiddlePosition().startMovingRandomly().build()
  };

  p5.draw = () => {
    p5.clear()
    p5.background(0)
    displayPaddle(paddleLeft)
    displayPaddle(paddleRight)
    displayBall(ball)
    paddleLeft.update()
    paddleRight.update()
    ball.update()
    handleColision(paddleLeft, paddleRight, ball)
  };

  p5.keyPressed = () => {
    if (p5.keyCode === p5.UP_ARROW) {
      paddleLeft.up()
    } else if (p5.keyCode === p5.DOWN_ARROW) {
      paddleLeft.down()
    }
  }

  p5.keyReleased = () => {
    paddleLeft.stop()
  }

  function displayPaddle(paddle: Paddle) {
    p5.stroke(255)
    p5.rect(paddle.x, paddle.y, paddle.width, paddle.height)
  }

  function displayBall(ball: Ball) {
    p5.stroke(255)
    p5.ellipse(ball.x, ball.y, ball.diameter, ball.diameter)
  }

  function handleColision(paddleLeft: Paddle, paddleRight: Paddle, ball: Ball) {
    if (ball.hitPaddle(paddleLeft) || ball.hitPaddle(paddleRight)) {
      ball.revertHorizontalDirection()
    }
  }
};

new P5(sketch);


// it('should revert horizontal direction when ball hit a paddle', () => {
//   const paddle = new Paddle(new Position(0, 20), new PaddleLimits(100))
//   const ball = BallBuilder.withLimits(100, 100).onPosition(30, 30).startMovingToLeft().build()

//   expect(ball.isGoingLeft).toBe(true)

//   ball.update()

//   expect(ball.isGoingRight).toBe(true)
// })
