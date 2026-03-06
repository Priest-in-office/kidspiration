import { useState, useEffect, useCallback, useRef } from "react";
import type { GameProps } from "./GameShell";

// Color tile definitions — curated, safe palette
const TILE_COLORS = [
  { id: "red", color: "#EF4444", name: "Red" },
  { id: "blue", color: "#3B82F6", name: "Blue" },
  { id: "green", color: "#22C55E", name: "Green" },
  { id: "purple", color: "#A855F7", name: "Purple" },
  { id: "orange", color: "#F97316", name: "Orange" },
  { id: "pink", color: "#EC4899", name: "Pink" },
  { id: "teal", color: "#14B8A6", name: "Teal" },
  { id: "amber", color: "#F59E0B", name: "Amber" },
  { id: "indigo", color: "#6366F1", name: "Indigo" },
  { id: "rose", color: "#F43F5E", name: "Rose" },
  { id: "lime", color: "#84CC16", name: "Lime" },
  { id: "cyan", color: "#06B6D4", name: "Cyan" },
];

interface Card {
  id: number;
  colorId: string;
  color: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function createBoard(pairCount: number): Card[] {
  const selected = TILE_COLORS.slice(0, pairCount);
  const pairs: Card[] = [];

  selected.forEach((tile, idx) => {
    pairs.push(
      {
        id: idx * 2,
        colorId: tile.id,
        color: tile.color,
        name: tile.name,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: idx * 2 + 1,
        colorId: tile.id,
        color: tile.color,
        name: tile.name,
        isFlipped: false,
        isMatched: false,
      },
    );
  });

  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  return pairs;
}

const PAIRS = 8; // 8 pairs = 16 cards (4×4 grid)
const SPARKS_PER_MATCH = 5;
const TIME_BONUS_THRESHOLD = 60; // under 60s = bonus
const TIME_BONUS_SPARKS = 20;
const PERFECT_BONUS = 30; // no wrong flips

export default function ColorMatch({ onComplete }: GameProps) {
  const [cards, setCards] = useState<Card[]>(() => createBoard(PAIRS));
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start timer on mount
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Check for game completion
  const checkCompletion = useCallback(() => {
    if (matches + 1 >= PAIRS) {
      setGameOver(true);
      if (timerRef.current) clearInterval(timerRef.current);

      const matchSparks = PAIRS * SPARKS_PER_MATCH;
      const timeBonus = timer < TIME_BONUS_THRESHOLD ? TIME_BONUS_SPARKS : 0;
      const perfectBonus = attempts === PAIRS ? PERFECT_BONUS : 0;
      const total = matchSparks + timeBonus + perfectBonus;
      setScore(total);

      setTimeout(() => onComplete(total), 500);
    }
  }, [matches, timer, attempts, onComplete]);

  const handleFlip = useCallback(
    (cardId: number) => {
      if (isChecking || gameOver) return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return;
      if (flippedIds.length >= 2) return;

      // Flip the card
      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)),
      );

      const newFlipped = [...flippedIds, cardId];
      setFlippedIds(newFlipped);

      // If two cards are flipped, check for match
      if (newFlipped.length === 2) {
        setIsChecking(true);
        setAttempts((a) => a + 1);

        const [firstId, secondId] = newFlipped;
        const first = cards.find((c) => c.id === firstId)!;
        const second = cards.find((c) => c.id === secondId)!;

        if (first.colorId === second.colorId) {
          // Match found
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, isMatched: true }
                  : c,
              ),
            );
            setMatches((m) => m + 1);
            setScore((s) => s + SPARKS_PER_MATCH);
            setFlippedIds([]);
            setIsChecking(false);
            checkCompletion();
          }, 600);
        } else {
          // No match — flip back
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, isFlipped: false }
                  : c,
              ),
            );
            setFlippedIds([]);
            setIsChecking(false);
          }, 1000);
        }
      }
    },
    [cards, flippedIds, isChecking, gameOver, checkCompletion],
  );

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
      {/* Stats bar */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm font-bold">
          <div className="flex items-center gap-1 text-kids-green">
            <span className="material-symbols-outlined text-base">
              check_circle
            </span>
            {matches} / {PAIRS} matched
          </div>
          <div className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-base">stars</span>
            {score} sparks
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-bold">
          <div className="flex items-center gap-1 text-text-muted dark:text-slate-400">
            <span className="material-symbols-outlined text-base">
              touch_app
            </span>
            {attempts} flips
          </div>
          <div className="flex items-center gap-1 text-text-main dark:text-white">
            <span className="material-symbols-outlined text-base">
              schedule
            </span>
            {formatTime(timer)}
          </div>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-4 gap-3 w-full max-w-lg">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            disabled={card.isFlipped || card.isMatched || isChecking}
            className={`
              aspect-square rounded-2xl transition-all duration-300 transform
              ${
                card.isMatched
                  ? "scale-90 opacity-40 cursor-default"
                  : card.isFlipped
                    ? "scale-105 shadow-lg cursor-default"
                    : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer"
              }
            `}
            style={{
              backgroundColor:
                card.isFlipped || card.isMatched ? card.color : undefined,
            }}
          >
            {card.isFlipped || card.isMatched ? (
              <span className="material-symbols-outlined text-white text-3xl md:text-4xl drop-shadow-md">
                {card.isMatched ? "check" : "circle"}
              </span>
            ) : (
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-2xl">
                question_mark
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Hint text */}
      <p className="text-sm text-text-muted dark:text-slate-500 font-bold">
        Flip two cards to find matching colors!
      </p>
    </div>
  );
}
