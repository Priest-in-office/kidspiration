import { useState, useEffect, useCallback } from "react";
import type { GameProps } from "./GameShell";

type Operator = "+" | "-" | "x";

interface Problem {
  a: number;
  b: number;
  op: Operator;
  answer: number;
  choices: number[];
}

function generateProblem(round: number): Problem {
  // Difficulty increases with each round
  const ops: Operator[] =  round < 4 ? ["+", "-"] : ["+", "-", "x"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const max = Math.min(10 + round * 3, 50);

  let a: number, b: number, answer: number;

  switch (op) {
    case "+":
      a = Math.floor(Math.random() * max) + 1;
      b = Math.floor(Math.random() * max) + 1;
      answer = a + b;
      break;
    case "-":
      a = Math.floor(Math.random() * max) + 2;
      b = Math.floor(Math.random() * a) + 1; // This ensures a positive result 
      answer = a - b;
      break;
    case "x":
      a = Math.floor(Math.random() * 12) + 1;
      b = Math.floor(Math.random() * 12) + 1;
      answer = a * b;
      break;
  }

  // Generate 3 wrong choices & the correct one
  const wrongSet = new Set<number>();
  while (wrongSet.size < 3) {
    const offset = Math.floor(Math.random() * 10) - 5 || 1;
    const wrong = answer + offset;
    if (wrong !== answer && wrong >= 0) wrongSet.add(wrong); 
  }

  const choices = [...wrongSet, answer].sort(() => Math.random() - 0.5);

  return { a, b, op, answer, choices };
}

const TOTAL_ROUNDS = 10;
const TIME_PER_ROUND = 15; // seconds
const SPARKS_PER_CORRECT = 10;
const BONUS_SPARKS = 25; // this is for completing all rounds

export default function MathBlaster ({ onComplete }: GameProps) {
  const [round, setRound] = useState(0);
  const [problem, setProblem] = useState<Problem>(() => generateProblem(0));
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_ROUND);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (gameOver || feedback) return;

    if (timeLeft <= 0) {
      // treat as wrong answer
      handleAnswer(-1);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, feedback]);

  const nextRound = useCallback(() => {
    const next = round + 1;
    if (next >= TOTAL_ROUNDS) {
      setGameOver(true);
      // Calculate total sparks
      const totalSparks = score + (correct === TOTAL_ROUNDS ? BONUS_SPARKS : 0);
      onComplete(totalSparks);
      return;
    }
    setRound(next);
    setProblem(generateProblem(next));
    setTimeLeft(TIME_PER_ROUND);
    setFeedback(null);
  }, [round, score, correct, onComplete]);

  const handleAnswer = (choice: number) => {
    if (feedback || gameOver) return;

    const isCorrect = choice === problem.answer;
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setScore(s => s + SPARKS_PER_CORRECT);
      setCorrect(c => c + 1);
    }

    // Brief pause for the child to see feedback
    setTimeout(nextRound, 1200);
  };

  const timerPct = (timeLeft / TIME_PER_ROUND) * 100;
  const timerColor =
    timeLeft > 8
      ? "bg-kids-green"
      : timeLeft > 4
        ? "bg-kids-orange"
        : "bg-accent-red";
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
      {/* Progress & Timer */}
      <div className="w-full flex items-center justify-between gap-4">
        <span className="text-sm font-bold text-text-muted dark:text-slate-400">
          {round + 1} / {TOTAL_ROUNDS}
        </span>
        {/* Timer bar */}
        <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${timerColor} rounded-full transition-all duration-1000 ease-linear`}
            style={{ width: `${timerPct}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-sm font-bold text-text-main dark:text-white">
          <span className="material-symbols-outlined text-base">schedule</span>
          {timeLeft}s
        </div>
      </div>
      {/* Score bar */}
      <div className="flex items-center gap-6 text-sm font-bold">
        <div className="flex items-center gap-1 text-kids-green">
          <span className="material-symbols-outlined text-base">
            check_circle
          </span>
          {correct} correct
        </div>
        <div className="flex items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-base">stars</span>
          {score} sparks
        </div>
      </div>
      {/* Problem card */}
      <div
        className={`
          relative bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl border-2
          w-full text-center transition-all duration-300
          ${feedback === "correct" ? "border-kids-green scale-[1.02]" : ""}
          ${feedback === "wrong" ? "border-accent-red shake" : ""}
          ${!feedback ? "border-slate-100 dark:border-slate-800" : ""}
        `}
      >
        {/* Feedback overlay */}
        {feedback && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-slate-900/70 rounded-3xl z-10">
            <span
              className={`material-symbols-outlined text-7xl ${
                feedback === "correct" ? "text-kids-green" : "text-accent-red"
              }`}
            >
              {feedback === "correct" ? "check_circle" : "cancel"}
            </span>
          </div>
        )}
        <p className="text-text-muted dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-4">
          Solve this!
        </p>
        <div className="text-5xl md:text-7xl font-black text-text-main dark:text-white mb-2 font-display">
          {problem.a} {problem.op} {problem.b}
        </div>
        <div className="text-3xl font-black text-primary mb-8">= ?</div>
        {/* Answer choices */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {problem.choices.map((choice, i) => (
            <button
              key={`${round}-${i}`}
              onClick={() => handleAnswer(choice)}
              disabled={!!feedback}
              className={`
                py-4 px-6 rounded-2xl text-2xl font-black transition-all duration-200
                ${
                  feedback && choice === problem.answer
                    ? "bg-kids-green text-white scale-105"
                    : feedback && choice !== problem.answer
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50"
                      : "bg-slate-100 dark:bg-slate-800 text-text-main dark:text-white hover:bg-kids-blue/20 hover:text-kids-blue hover:-translate-y-1 hover:shadow-lg active:scale-95"
                }
              `}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}