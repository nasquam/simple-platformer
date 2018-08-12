"use strict";
document.addEventListener("DOMContentLoaded", function(e) {
  const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
    "canvas"
  )); // This makes sure intellisense knows this is a canvas element

  let globalX = 0;
  let globalSX = 0;

  let ctx = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 512;

  let rightPressed = false;
  let leftPressed = false;

  function Background() {
    let backgroundImage = new Image();
    backgroundImage.src = "img/background.png";
    //let backgroundImage = document.getElementById('source');

    this.x = 0;
    this.y = 0;
    this.width = backgroundImage.width;
    this.height = backgroundImage.height;

    this.renderStart = () => {
      // this.x = xPos || 0;
      ctx.drawImage(backgroundImage, globalX, 0);
    };

    this.renderForward = () => {
      ctx.drawImage(backgroundImage, this.x--, 0);
      if (this.x <= -1024) {
        this.x = 0;
      }
    };

    this.renderReverse = () => {
      ctx.drawImage(backgroundImage, this.x++, 0);
      if (this.x >= 0) {
        this.x = -2048;
      }
    };
  }

  function Player() {
    let playerImage = new Image();
    playerImage.src = "img/boy_idle_120.png";

    // dx: The X coordinate in the destination canvas at which to place the top-left corner of the source image.
    let dx = canvas.width / 2 - 60;
    let dy = 272;

    let dWidth = 120;
    let dHeight = 120;

    // sx: The X coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.

    let sx = 0;
    let sy = 0;

    // sWidth The width of the sub-rectangle of the source image to draw into the destination context.

    let sWidth = 120;
    let sHeight = 120;

    this.renderPlayerIdle = () => {
      // from: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
      //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      ctx.drawImage(
        playerImage,
        sx * 120,
        sy,
        sWidth,
        sHeight,
        dx,
        dy,
        dWidth,
        dHeight
      );

    };
  }

  const keyDownHandler = e => {
    if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 37) {
      leftPressed = true;
    }
  };

  const keyUpHandler = e => {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    }
  };

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  const gameBackground = new Background();
  const player = new Player();

  const buildGame = () => {

    player.renderPlayerIdle();

    gameBackground.renderStart(globalX);

    if (!rightPressed || !leftPressed) {
      player.renderPlayerIdle();
    }

    if (rightPressed) {
      gameBackground.renderForward();
      //console.log(gameBackground.x)
      globalX = gameBackground.x;
    }

    if (leftPressed) {
      gameBackground.renderReverse();
      //console.log(gameBackground.x)
      globalX = gameBackground.x;
    }
  };

  setInterval(buildGame, 2);
});
