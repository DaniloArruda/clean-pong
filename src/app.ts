import P5 from "p5";
import "p5/lib/addons/p5.dom";
import { Paddle, PaddleLimits } from "./model/paddle";
import "./styles.scss";

// Creating the sketch itself
const sketch = (p5: P5) => {
  let paddleLeft: Paddle

	// The sketch setup method
	p5.setup = () => {
    const canvas = p5.createCanvas(625, 350)
		canvas.parent("app")
    paddleLeft = new Paddle(
      26,
      p5.height / 2,
      new PaddleLimits(p5.height),
    )

	};

	// The sketch draw method
	p5.draw = () => {
    p5.clear()
		p5.background(0)
    displayPaddle(paddleLeft)
    paddleLeft.update()
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
};

new P5(sketch);
