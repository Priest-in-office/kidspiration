import { useState, useEffect, useCallback, useRef } from "react";
import type { GameProps } from "./GameShell";

interface WordData {
  word: string;
  hint: string;
}

function scrambleWord(word: string): string {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  const result = letters.join("");
  if (result === word && word.length > 1) {
    [letters[0], letters[1]] = [letters[1], letters[0]];
    return letters.join("");
  }
  return result;
}

const TOTAL_ROUNDS = 8;
const TIME_PER_ROUND = 30;
const SPARKS_PER_WORD = 15;
const STREAK_BONUS = 5;
const PERFECT_BONUS = 30;

export default function WordScramble({ onComplete }: GameProps) {
  const [words, setWords] = useState<WordData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [round, setRound] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_ROUND);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Use a ref for currentWord so callbacks always see latest
  const currentWord = words[round] || { word: "", hint: "" };
  const currentWordRef = useRef(currentWord);
  currentWordRef.current = currentWord;

  // Fetch words on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchWords() {
      try {
        const res = await fetch("/data/words.json");
        const allWords: WordData[] = await res.json();
        const shuffled = allWords.sort(() => Math.random() - 0.5);
        if (isMounted) {
          setWords(shuffled.slice(0, TOTAL_ROUNDS));
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load words", err);
        if (isMounted) {
          setWords([
            { word: "PLANET", hint: "Earth is one" },
            { word: "ROCKET", hint: "Flies to space" },
            { word: "OCEAN", hint: "Full of saltwater" },
            { word: "FOREST", hint: "Lots of trees" },
            { word: "CASTLE", hint: "A king lives here" },
            { word: "GUITAR", hint: "A musical instrument" },
            { word: "RABBIT", hint: "Hops around" },
            { word: "BRIDGE", hint: "Crosses a river" },
          ]);
          setIsLoading(false);
        }
      }
    }
    fetchWords();
    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize scrambled word once words are loaded
  useEffect(() => {
    if (words.length > 0 && !scrambled) {
      setScrambled(scrambleWord(words[0].word));
    }
  }, [words, scrambled]);

  // Advance to next round
  const nextRound = useCallback(() => {
    const next = round + 1;
    if (next >= TOTAL_ROUNDS) {
      setGameOver(true);
      const totalSparks =
        score + (correct === TOTAL_ROUNDS ? PERFECT_BONUS : 0);
      onComplete(totalSparks);
      return;
    }
    setRound(next);
    setScrambled(scrambleWord(words[next].word));
    setGuess("");
    setTimeLeft(TIME_PER_ROUND);
    setFeedback(null);
    setHintUsed(false);
    setShowHint(false);
  }, [round, score, correct, words, onComplete]);

  // Countdown timer
  useEffect(() => {
    if (isLoading || gameOver || feedback) return;

    if (timeLeft <= 0) {
      setFeedback("wrong");
      setConsecutiveCorrect(0);
      const timer = setTimeout(nextRound, 1500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, feedback, isLoading, nextRound]);

  const handleSubmit = useCallback(
    (timedOut = false) => {
      if (feedback || gameOver) return;

      const cleaned = guess
        .trim()
        .toUpperCase()
        .replace(/[^A-Z]/g, "");
      const isCorrect = !timedOut && cleaned === currentWordRef.current.word;
      setFeedback(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        const streakBonus = consecutiveCorrect * STREAK_BONUS;
        const hintPenalty = hintUsed ? Math.floor(SPARKS_PER_WORD / 3) : 0;
        const earned = SPARKS_PER_WORD + streakBonus - hintPenalty;
        setScore((s) => s + earned);
        setCorrect((c) => c + 1);
        setConsecutiveCorrect((c) => c + 1);
      } else {
        setConsecutiveCorrect(0);
      }

      setTimeout(nextRound, 1500);
    },
    [feedback, gameOver, guess, consecutiveCorrect, hintUsed, nextRound],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handleInputChange = useCallback((value: string) => {
    const sanitized = value.toUpperCase().replace(/[^A-Z]/g, "");
    if (sanitized.length <= currentWordRef.current.word.length) {
      setGuess(sanitized);
    }
  }, []);

  // ── Loading screen ──
  if (isLoading) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined text-6xl text-primary animate-spin mb-4">
          progress_activity
        </span>
        <h2 className="text-xl font-bold text-text-muted dark:text-slate-400">
          Loading words...
        </h2>
      </div>
    );
  }

  // ── Gameplay UI ──
  const timerPct = (timeLeft / TIME_PER_ROUND) * 100;
  const timerColor =
    timeLeft > 18
      ? "bg-kids-green"
      : timeLeft > 8
        ? "bg-kids-orange"
        : "bg-accent-red";

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
      {/* Progress & Timer */}
      <div className="w-full flex items-center justify-between gap-4">
        <span className="text-sm font-bold text-text-muted dark:text-slate-400">
          {round + 1} / {TOTAL_ROUNDS}
        </span>
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
          {correct} solved
        </div>
        <div className="flex items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-base">stars</span>
          {score} sparks
        </div>
        {consecutiveCorrect >= 2 && (
          <div className="flex items-center gap-1 text-kids-orange animate-pulse">
            <span className="material-symbols-outlined text-base">
              local_fire_department
            </span>
            {consecutiveCorrect}x streak!
          </div>
        )}
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
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 rounded-3xl z-10 gap-2">
            <span
              className={`material-symbols-outlined text-7xl ${
                feedback === "correct" ? "text-kids-green" : "text-accent-red"
              }`}
            >
              {feedback === "correct" ? "check_circle" : "cancel"}
            </span>
            {feedback === "wrong" && (
              <p className="text-lg font-bold text-text-main dark:text-white">
                Answer:{" "}
                <span className="text-kids-blue">{currentWord.word}</span>
              </p>
            )}
          </div>
        )}

        <p className="text-text-muted dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-6">
          Unscramble the word!
        </p>

        {/* Scrambled letters */}
        <div className="flex justify-center gap-2 md:gap-3 mb-8 flex-wrap">
          {scrambled.split("").map((letter, i) => (
            <div
              key={`${round}-${i}`}
              className="w-12 h-14 md:w-14 md:h-16 bg-kids-blue/10 dark:bg-kids-blue/20 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-black text-kids-blue border-2 border-kids-blue/20 shadow-sm"
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Hint button */}
        {!showHint && !feedback && (
          <button
            onClick={() => {
              setShowHint(true);
              setHintUsed(true);
            }}
            className="mb-4 text-sm font-bold text-kids-orange hover:text-kids-orange/80 transition-colors flex items-center gap-1 mx-auto"
          >
            <span className="material-symbols-outlined text-base">
              lightbulb
            </span>
            Use Hint (-5 sparks)
          </button>
        )}
        {showHint && (
          <p className="mb-4 text-sm font-bold text-kids-orange bg-kids-orange/10 px-4 py-2 rounded-full inline-block">
            💡 {currentWord.hint}
          </p>
        )}

        {/* Input */}
        <div className="max-w-sm mx-auto">
          <input
            type="text"
            value={guess}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!!feedback}
            autoFocus
            placeholder="Answer here"
            className="w-full h-14 text-center text-2xl font-black tracking-[0.3em] rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-text-main dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:border-kids-blue focus:ring-0 outline-none transition-colors uppercase"
            maxLength={currentWord.word.length}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <p className="text-xs font-bold text-text-muted dark:text-slate-500 mt-2">
            {guess.length} / {currentWord.word.length} letters
          </p>
        </div>

        {/* Submit button */}
        <button
          onClick={() => handleSubmit()}
          disabled={!!feedback || guess.length === 0}
          className={`
            mt-6 py-3 px-10 rounded-2xl text-lg font-black transition-all duration-200
            flex items-center gap-2 mx-auto
            ${
              guess.length === currentWord.word.length && !feedback
                ? "bg-kids-green text-white hover:bg-kids-green/90 shadow-lg shadow-kids-green/20 hover:-translate-y-0.5 active:scale-95"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            }
          `}
        >
          <span className="material-symbols-outlined">send</span>
          Submit
        </button>
      </div>
    </div>
  );
}
