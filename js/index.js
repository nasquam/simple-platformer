"use strict";
document.addEventListener("DOMContentLoaded", function(e) {
  const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
    "canvas"
  )); // This makes sure intellisense knows this is a canvas element

  let globalX = 0;
  let globalSX = 0;
  let globalRunSpeed = 4;
  let currentFrame = 0;
  let gravaty = 6;
  let thrust = 10;
  let jumpPlayer = false;
  let downPlayer = false;
  let canJump = true;
  let ground = 275;
  let jumpMax = 170;

  let ctx = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 512;

  let rightPressed = false;
  let leftPressed = false;
  let spacePressed = false;

  function Background() {
    let backgroundImage = new Image();
    backgroundImage.src = "img/background.png";
    //let backgroundImage = document.getElementById('source');

    this.x = 0;
    this.y = 0;
    this.width = backgroundImage.width;
    this.height = backgroundImage.height;

    this.renderStart = () => {
      ctx.drawImage(backgroundImage, globalX, 0);
    };

    this.renderForward = () => {
      this.x = this.x - globalRunSpeed;

      ctx.drawImage(backgroundImage, this.x, 0);
      if (this.x <= -1024) {
        this.x = 0;
      }
    };

    this.renderReverse = () => {
      this.x = this.x + globalRunSpeed;
      ctx.drawImage(backgroundImage, this.x, 0);
      if (this.x >= 0) {
        this.x = -2048;
      }
    };
  }

  function Player() {
    let playerImage = new Image();

    // dx: The X coordinate in the destination canvas at which to place the top-left corner of the source image.
    let dx = canvas.width / 2 - 60;
    let dy = ground;

    let dWidth = 120;
    let dHeight = 120;

    // sx: The X coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.

    let sx = 0;
    let sy = 0;

    // sWidth The width of the sub-rectangle of the source image to draw into the destination context.

    let sWidth = 120;
    let sHeight = 120;

    this.jump = () => {

        if (jumpPlayer && dy > jumpMax) {
          dy = dy - thrust;
        } else {
          downPlayer = true;
          jumpPlayer = false;
        }
  
        if (downPlayer && dy < ground){
          dy = dy + gravaty
        }
  
      


      if (dy >= ground) {
        console.log('on ground');
        canJump = true;
      }



    };

    this.renderPlayerIdle = () => {
      if (currentFrame % 5 == 0) {
        globalSX++;
      }

      if (globalSX > 11) globalSX = 0;
      // from: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
      playerImage.src = "img/boy_idle_120.png";

      ctx.drawImage(
        playerImage,
        globalSX * 120,
        sy,
        sWidth,
        sHeight,
        dx,
        dy,
        dWidth,
        dHeight
      );
    };

    this.renderPlayerJump = () => {
      if (currentFrame % 5 == 0) {
        globalSX++;
      }

      if (globalSX > 5) globalSX = 0;

      // from: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
      //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      playerImage.src = "img/boy_jump_120px.png";

      ctx.drawImage(
        playerImage,
        globalSX * 120,
        sy,
        sWidth,
        sHeight,
        dx,
        dy,
        dWidth,
        dHeight
      );
    };

    this.renderPlayerRunForward = () => {
      if (currentFrame % 5 == 0) {
        globalSX++;
      }

      if (globalSX > 9) globalSX = 0;
      // from: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
      //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      playerImage.src = "img/boy_run_forward_120.png";
      ctx.drawImage(
        playerImage,
        globalSX * 120,
        sy,
        sWidth,
        sHeight,
        dx,
        dy,
        dWidth,
        dHeight
      );
    };

    this.renderPlayerRunReverse = () => {
      if (currentFrame % 5 == 0) {
        globalSX++;
      }

      if (globalSX > 9) globalSX = 0;
      // from: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
      //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      playerImage.src = "img/boy_run_reverse_120.png";
      ctx.drawImage(
        playerImage,
        globalSX * 120,
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
    } else if (e.keyCode == 32) {
      spacePressed = true;
    }
  };

  const keyUpHandler = e => {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    } else if (e.keyCode == 32) {
      spacePressed = false;
    }
  };

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  const gameBackground = new Background();
  const player = new Player();

  const buildGame = () => {
    currentFrame++;

    gameBackground.renderStart(globalX);

    if (rightPressed || leftPressed || spacePressed) {
    } else {
      player.renderPlayerIdle();
    }

    if (rightPressed) {
      gameBackground.renderForward();
      if (!spacePressed) {
        player.renderPlayerRunForward();
      }
      globalX = gameBackground.x;
    }

    if (leftPressed) {
      gameBackground.renderReverse();

      if (!spacePressed) {
        player.renderPlayerRunReverse();
      }
      globalX = gameBackground.x;
    }

    if (spacePressed) {
      //gameBackground.renderForward();
      player.renderPlayerJump();
      globalX = gameBackground.x;
      jumpPlayer = true;
    }


      player.jump();

  };

  setInterval(buildGame, 16);
});
