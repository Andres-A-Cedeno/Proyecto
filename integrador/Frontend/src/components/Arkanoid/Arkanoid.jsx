// src/components/Arkanoid.jsx
import React, { useEffect, useRef } from 'react';
import './Arkanoid.css'

const Arkanoid = () => {
  const canvasRef = useRef(null);
  const spriteRef = useRef(null);
  const bricksRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const $sprite = spriteRef.current;
    const $bricks = bricksRef.current;

    canvas.width = 448; //Ancho
    canvas.height = 400; //Altura

    /* Variables de nuestro juego */
    /* VARIABLES DE LA PELOTA */
    const ballRadius = 3;
    // posición de la pelota
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    // velocidad de la pelota
    let dx = -3;
    let dy = -3;

    /* VARIABLES DE LA PALETA */
    const PADDLE_SENSITIVITY = 8;

    const paddleHeight = 10;
    const paddleWidth = 50;

    let paddleX = (canvas.width - paddleWidth) / 2;
    let paddleY = canvas.height - paddleHeight - 10;

    let rightPressed = false;
    let leftPressed = false;

    /* VARIABLES DE LOS LADRILLOS */
    const brickRowCount = 6;
    const brickColumnCount = 13;
    const brickWidth = 32;
    const brickHeight = 16;
    const brickPadding = 0;
    const brickOffsetTop = 80;
    const brickOffsetLeft = 16;
    const bricks = [];

    const BRICK_STATUS = {
      ACTIVE: 1,
      DESTROYED: 0,
    };

    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = []; // inicializamos con un array vacío
      for (let r = 0; r < brickRowCount; r++) {
        // calculamos la posición del ladrillo en la pantalla
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        // Asignar un color aleatorio a cada ladrillo
        const random = Math.floor(Math.random() * 8);
        // Guardamos la información de cada ladrillo
        bricks[c][r] = {
          x: brickX,
          y: brickY,
          status: BRICK_STATUS.ACTIVE,
          color: random,
        };
      }
    }

    function drawBall() {
      ctx.beginPath(); // iniciar el trazado
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.closePath(); // terminar el trazado
    }

    function drawPaddle() {
      ctx.drawImage(
        $sprite, // imagen
        29, // clipX: coordenadas de recorte
        174, // clipY: coordenadas de recorte
        paddleWidth, // el tamaño del recorte
        paddleHeight, // tamaño del recorte
        paddleX, // posición X del dibujo
        paddleY, // posición Y del dibujo
        paddleWidth, // ancho del dibujo
        paddleHeight // alto del dibujo
      );
    }

    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const currentBrick = bricks[c][r];
          if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

          const clipX = currentBrick.color * 32;

          ctx.drawImage(
            $bricks,
            clipX,
            0,
            brickWidth, // 31
            brickHeight, // 14
            currentBrick.x,
            currentBrick.y,
            brickWidth,
            brickHeight
          );
        }
      }
    }

    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const currentBrick = bricks[c][r];
          if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

          const isBallSameXAsBrick =
            x > currentBrick.x &&
            x < currentBrick.x + brickWidth;

          const isBallSameYAsBrick =
            y > currentBrick.y &&
            y < currentBrick.y + brickHeight;

          if (isBallSameXAsBrick && isBallSameYAsBrick) {
            dy = -dy;
            currentBrick.status = BRICK_STATUS.DESTROYED;
          }
        }
      }
    }

    function ballMovement() {
      // rebotar las pelotas en los laterales
      if (
        x + dx > canvas.width - ballRadius || // la pared derecha
        x + dx < ballRadius // la pared izquierda
      ) {
        dx = -dx;
      }

      // rebotar en la parte de arriba
      if (y + dy < ballRadius) {
        dy = -dy;
      }

      // la pelota toca la pala
      const isBallSameXAsPaddle =
        x > paddleX &&
        x < paddleX + paddleWidth;

      const isBallTouchingPaddle =
        y + dy > paddleY;

      if (isBallSameXAsPaddle && isBallTouchingPaddle) {
        dy = -dy; // cambiamos la dirección de la pelota
      } else if ( // la pelota toca el suelo
        y + dy > canvas.height - ballRadius || y + dy > paddleY + paddleHeight
      ) {
        gameOver = true;
        console.log('Game Over');
        document.location.reload();
      }

      // mover la pelota
      x += dx;
      y += dy;
    }

    function paddleMovement() {
      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += PADDLE_SENSITIVITY;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= PADDLE_SENSITIVITY;
      }
    }

    function cleanCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function initEvents() {
      document.addEventListener('keydown', keyDownHandler);
      document.addEventListener('keyup', keyUpHandler);

      function keyDownHandler(event) {
        const { key } = event;
        if (key === 'Right' || key === 'ArrowRight' || key.toLowerCase() === 'd') {
          rightPressed = true;
        } else if (key === 'Left' || key === 'ArrowLeft' || key.toLowerCase() === 'a') {
          leftPressed = true;
        }
      }

      function keyUpHandler(event) {
        const { key } = event;
        if (key === 'Right' || key === 'ArrowRight' || key.toLowerCase() === 'd') {
          rightPressed = false;
        } else if (key === 'Left' || key === 'ArrowLeft' || key.toLowerCase() === 'a') {
          leftPressed = false;
        }
      }
    }

    // a qué velocidad de fps queremos que renderice nuestro juego
    const fps = 60;

    let msPrev = window.performance.now();
    let msFPSPrev = window.performance.now() + 1000;
    const msPerFrame = 1000 / fps;
    let frames = 0;
    let framesPerSec = fps;

    let gameOver = false;

    function draw() {
      if (gameOver) return;

      window.requestAnimationFrame(draw);

      const msNow = window.performance.now();
      const msPassed = msNow - msPrev;

      if (msPassed < msPerFrame) return;

      const excessTime = msPassed % msPerFrame;
      msPrev = msNow - excessTime;

      frames++;

      if (msFPSPrev < msNow) {
        msFPSPrev = window.performance.now() + 1000;
        framesPerSec = frames;
        frames = 0;
      }

      cleanCanvas();
      drawBall();
      drawPaddle();
      drawBricks();
      collisionDetection();
      ballMovement();
      paddleMovement();
    }

    initEvents();
    draw();
  }, []);

  return (
    <div className="arkanoid-container">
      <canvas ref={canvasRef} id="gameCanvas" className="arkanoid-canvas"></canvas>
      <img ref={spriteRef} id="sprite" src="/Arkanoid/images/sprite.png" style={{ display: 'none' }} alt="Sprite" />
      <img ref={bricksRef} id="bricks" src="/Arkanoid/images/bricks.png" style={{ display: 'none' }} alt="Bricks" />
    </div>
  );
};

export default Arkanoid;