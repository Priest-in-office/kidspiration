import { useNavigate, useParams } from "react-router-dom";
import { useKids } from "../../../context/KidsContext";
import { useState } from "react";
import MathBlaster from "./MathBlaster";

// I'll add more games to this Registry as I build
const GAMES: Record<string, { title: string; component: React.FC<GameProps> }> = {
   "math-blaster": { title: "Math Blaster", component: MathBlaster },
};

// The games will receives these props from the shell
export interface GameProps {
  onComplete: (sparksEarned: number) => void;
  onQuit: () => void;
}

export default function GameShell() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { addSparks, recordGameScore } = useKids();

  const [sparksEarned, setSparksEarned] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const game = gameId ? GAMES[gameId] : undefined;

  const handleComplete = (earned: number) => {
    setSparksEarned(earned);
    setIsComplete(true);
    addSparks(earned);
    if (gameId) recordGameScore(gameId, earned);
  };

  const handleQuit = () => navigate("/kids");

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-slate-950 text-text-main dark:text-white font-display">
        <span className="material-symbols-outlined text-7xl text-slate-300 mb-4">
          sentiment_dissatisfied
        </span>
        <h2 className="text-3xl font-black mb-2">Game Not Found</h2>
        <p className="text-text-muted dark:text-slate-400 mb-6">
          This game doesn't exist yet!
        </p>
        <button
          onClick={() => navigate("/kids")}
          className="bg-primary text-text-main font-bold py-3 px-8 rounded-xl hover:bg-primary-hover transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const GameComponent = game.component;

  // Completion Screen
  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-slate-950 text-text-main dark:text-white font-display gap-6">
        {/* Celebration */}
        <div className="relative">
          <span className="material-symbols-outlined text-8xl text-primary animate-bounce">
            emoji_events
          </span>
        </div>
        <h2 className="text-4xl font-black">Great Job!</h2>
        <div className="flex items-center gap-2 text-2xl font-black text-primary">
          <span className="material-symbols-outlined text-3xl">stars</span>
          +{sparksEarned} Sparks Earned
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => {
              setIsComplete(false);
              setSparksEarned(0);
            }}
            className="bg-kids-blue text-white font-bold py-3 px-8 rounded-xl hover:bg-kids-blue/90 transition-colors shadow-lg shadow-kids-blue/30 flex items-center gap-2"
          >
            <span className="material-symbols-outlined">replay</span>
            Play Again
          </button>
          <button
            onClick={() => navigate("/kids")}
            className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-text-main dark:text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">home</span>
            Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Active game
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-slate-950">
      {/* Game top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white dark:bg-slate-900 px-6 py-3 border-b-4 border-primary shadow-sm">
        <button
          onClick={handleQuit}
          className="flex items-center gap-2 text-text-muted dark:text-slate-400 hover:text-text-main dark:hover:text-white font-bold transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Quit
        </button>
        <h1 className="text-xl font-black text-text-main dark:text-white font-display">
          {game.title}
        </h1>
        <div className="flex items-center gap-2 bg-primary-light dark:bg-slate-800 px-3 py-1.5 rounded-full">
          <span className="material-symbols-outlined text-primary text-lg">
            stars
          </span>
          <span className="font-black text-text-main dark:text-white text-sm">
            +{sparksEarned}
          </span>
        </div>
      </header>
      {/* Game area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <GameComponent onComplete={handleComplete} onQuit={handleQuit} />
      </main>
    </div>
  );
}