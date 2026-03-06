import { useState, useEffect, useCallback, useRef } from "react";
import type { GameProps } from "./GameShell";

const GAME_HEIGHT = 200;
const GAME_WIDTH = 700;
const GROUND_Y = 160;
const DINO_SIZE = 40;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_MIN_HEIGHT = 30;
const OBSTACLE_MAX_HEIGHT = 60;
const JUMP_VELOCITY = -12;
const GRAVITY = 0.7;
const INITIAL_SPEED = 4;
const MAX_SPEED = 10;
const SPEED_INCREMENT = 0.002;
const SPARKS_PER_100 = 1;
const OBSTACLE_GAP_MIN = 80;
const OBSTACLE_GAP_MAX = 200;

interface Obstacle {
  x: number;
  height: number;
  passed: boolean;
}

export default function DinoRun({ onComplete }: GameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [distance, setDistance] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game state refs (for animation loop)
  const dinoYRef = useRef(GROUND_Y - DINO_SIZE);
  const velocityRef = useRef(0);
  const isJumpingRef = useRef(false);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const speedRef = useRef(INITIAL_SPEED);
  const distanceRef = useRef(0);
  const frameRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPlayingRef = useRef(false);
  const nextObstacleRef = useRef(200);

  const jump = useCallback(() => {
    if (!isJumpingRef.current && isPlayingRef.current) {
      velocityRef.current = JUMP_VELOCITY;
      isJumpingRef.current = true;
    }
  }, []);

  const startGame = useCallback(() => {
    dinoYRef.current = GROUND_Y - DINO_SIZE;
    velocityRef.current = 0;
    isJumpingRef.current = false;
    obstaclesRef.current = [];
    speedRef.current = INITIAL_SPEED;
    distanceRef.current = 0;
    nextObstacleRef.current = 200;
    setDistance(0);
    setIsGameOver(false);
    setIsPlaying(true);
    isPlayingRef.current = true;
  }, []);

  const endGame = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setIsGameOver(true);
    const finalDist = Math.floor(distanceRef.current);
    const sparksEarned = Math.floor(finalDist / 100) * SPARKS_PER_100;
    setDistance(finalDist);
    if (finalDist > highScore) setHighScore(finalDist);
    onComplete(sparksEarned);
  }, [highScore, onComplete]);

  // Input handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!isPlayingRef.current && !isGameOver) {
          startGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump, startGame, isGameOver]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = () => {
      if (!isPlayingRef.current) {
        // Draw idle screen
        drawFrame(ctx, false);
        frameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // Update dino position
      velocityRef.current += GRAVITY;
      dinoYRef.current += velocityRef.current;

      // Ground collision
      if (dinoYRef.current >= GROUND_Y - DINO_SIZE) {
        dinoYRef.current = GROUND_Y - DINO_SIZE;
        velocityRef.current = 0;
        isJumpingRef.current = false;
      }

      // Update speed
      speedRef.current = Math.min(
        speedRef.current + SPEED_INCREMENT,
        MAX_SPEED,
      );

      // Update distance
      distanceRef.current += speedRef.current * 0.5;
      setDistance(Math.floor(distanceRef.current));

      // Generate obstacles
      nextObstacleRef.current -= speedRef.current;
      if (nextObstacleRef.current <= 0) {
        const height =
          OBSTACLE_MIN_HEIGHT +
          Math.random() * (OBSTACLE_MAX_HEIGHT - OBSTACLE_MIN_HEIGHT);
        obstaclesRef.current.push({
          x: GAME_WIDTH,
          height,
          passed: false,
        });
        nextObstacleRef.current =
          OBSTACLE_GAP_MIN +
          Math.random() * (OBSTACLE_GAP_MAX - OBSTACLE_GAP_MIN);
      }

      // Move obstacles
      obstaclesRef.current = obstaclesRef.current
        .map((obs) => ({ ...obs, x: obs.x - speedRef.current }))
        .filter((obs) => obs.x > -OBSTACLE_WIDTH);

      // Collision detection
      const dinoLeft = 50;
      const dinoRight = dinoLeft + DINO_SIZE - 8; // slight forgiveness
      const dinoBottom = dinoYRef.current + DINO_SIZE;

      for (const obs of obstaclesRef.current) {
        const obsLeft = obs.x;
        const obsRight = obs.x + OBSTACLE_WIDTH;
        const obsTop = GROUND_Y - obs.height;

        if (dinoRight > obsLeft && dinoLeft < obsRight && dinoBottom > obsTop) {
          endGame();
          return;
        }
      }

      drawFrame(ctx, true);
      frameRef.current = requestAnimationFrame(gameLoop);
    };

    frameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [endGame]);

  function drawFrame(ctx: CanvasRenderingContext2D, playing: boolean) {
    const isDark = document.documentElement.classList.contains("dark");

    // Clear
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    if (isDark) {
      skyGrad.addColorStop(0, "#0f172a");
      skyGrad.addColorStop(1, "#1e293b");
    } else {
      skyGrad.addColorStop(0, "#bfdbfe");
      skyGrad.addColorStop(1, "#e0f2fe");
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Ground
    ctx.fillStyle = isDark ? "#334155" : "#d1d5db";
    ctx.fillRect(0, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - GROUND_Y);
    ctx.fillStyle = isDark ? "#475569" : "#9ca3af";
    ctx.fillRect(0, GROUND_Y, GAME_WIDTH, 2);

    // Dino (simple rectangle character)
    const dinoX = 50;
    const dinoY = dinoYRef.current;
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.roundRect(dinoX, dinoY, DINO_SIZE, DINO_SIZE, 8);
    ctx.fill();

    // Dino eye
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(dinoX + DINO_SIZE - 10, dinoY + 12, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isDark ? "#0f172a" : "#1e293b";
    ctx.beginPath();
    ctx.arc(dinoX + DINO_SIZE - 8, dinoY + 12, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Dino legs (only visible when on ground)
    if (!isJumpingRef.current) {
      ctx.fillStyle = "#16a34a";
      const legOffset = playing ? Math.sin(distanceRef.current * 0.2) * 4 : 0;
      ctx.fillRect(dinoX + 8, dinoY + DINO_SIZE, 8, 6 + legOffset);
      ctx.fillRect(dinoX + DINO_SIZE - 16, dinoY + DINO_SIZE, 8, 6 - legOffset);
    }

    // Obstacles (cacti)
    for (const obs of obstaclesRef.current) {
      ctx.fillStyle = isDark ? "#f97316" : "#dc2626";
      ctx.beginPath();
      ctx.roundRect(
        obs.x,
        GROUND_Y - obs.height,
        OBSTACLE_WIDTH,
        obs.height,
        [4, 4, 0, 0],
      );
      ctx.fill();
      // Cactus spikes
      ctx.fillStyle = isDark ? "#fb923c" : "#ef4444";
      ctx.fillRect(obs.x - 4, GROUND_Y - obs.height + 10, 4, 8);
      ctx.fillRect(obs.x + OBSTACLE_WIDTH, GROUND_Y - obs.height + 15, 4, 8);
    }

    // Distance counter in canvas
    ctx.fillStyle = isDark ? "#e2e8f0" : "#334155";
    ctx.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`${Math.floor(distanceRef.current)}m`, GAME_WIDTH - 16, 24);

    // Decorative clouds
    ctx.fillStyle = isDark ? "#1e293b" : "#ffffff";
    ctx.globalAlpha = 0.6;
    const cloudOffset = playing ? (distanceRef.current * 0.3) % GAME_WIDTH : 0;
    drawCloud(ctx, (100 - cloudOffset + GAME_WIDTH) % GAME_WIDTH, 30, 40);
    drawCloud(ctx, (350 - cloudOffset + GAME_WIDTH) % GAME_WIDTH, 50, 30);
    drawCloud(ctx, (600 - cloudOffset + GAME_WIDTH) % GAME_WIDTH, 20, 35);
    ctx.globalAlpha = 1;
  }

  function drawCloud(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
  ) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
    ctx.arc(x + size * 0.3, y - size * 0.15, size * 0.35, 0, Math.PI * 2);
    ctx.arc(x + size * 0.6, y, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
      {/* Stats bar */}
      <div className="w-full flex items-center justify-between text-sm font-bold">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-text-main dark:text-white">
            <span className="material-symbols-outlined text-base">
              straighten
            </span>
            {distance}m
          </div>
          <div className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-base">stars</span>
            {Math.floor(distance / 100) * SPARKS_PER_100} sparks
          </div>
        </div>
        <div className="flex items-center gap-1 text-kids-orange">
          <span className="material-symbols-outlined text-base">
            emoji_events
          </span>
          Best: {highScore}m
        </div>
      </div>

      {/* Game canvas */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-700">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="w-full cursor-pointer"
          onClick={() => {
            if (!isPlayingRef.current && !isGameOver) {
              startGame();
            } else {
              jump();
            }
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            if (!isPlayingRef.current && !isGameOver) {
              startGame();
            } else {
              jump();
            }
          }}
        />

        {/* Start overlay */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <span className="material-symbols-outlined text-6xl text-kids-green mb-2">
              play_circle
            </span>
            <p className="text-lg font-black text-text-main dark:text-white">
              Tap or Press Space to Start!
            </p>
            <p className="text-sm text-text-muted dark:text-slate-400 font-bold mt-1">
              Jump over obstacles to earn sparks
            </p>
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div className="flex items-center gap-4 text-sm text-text-muted dark:text-slate-500 font-bold">
        <div className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs font-mono">
            SPACE
          </kbd>
          or
          <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs font-mono">
            ↑
          </kbd>
          to jump
        </div>
        <span>•</span>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-base">touch_app</span>
          Tap to jump on mobile
        </div>
      </div>
    </div>
  );
}
