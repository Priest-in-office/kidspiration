import { useState, useEffect, useCallback } from "react";
import type { GameProps } from "./GameShell";

const VERSES = [
  {
    reference: "Psalm 23:1",
    words: ["The", "Lord", "is", "my", "shepherd"],
  },
  {
    reference: "Genesis 1:1",
    words: [
      "In",
      "the",
      "beginning",
      "God",
      "created",
      "the",
      "heavens",
      "and",
      "the",
      "earth",
    ],
  },
  {
    reference: "Philippians 4:13",
    words: ["I", "can", "do", "all", "things", "through", "Christ"],
  },
  {
    reference: "John 3:16",
    words: ["For", "God", "so", "loved", "the", "world"],
  },
  {
    reference: "Proverbs 3:5",
    words: ["Trust", "in", "the", "Lord", "with", "all", "your", "heart"],
  },
  {
    reference: "Psalm 119:105",
    words: ["Your", "word", "is", "a", "lamp", "to", "my", "feet"],
  },
  {
    reference: "Romans 8:28",
    words: ["All", "things", "work", "together", "for", "good"],
  },
  {
    reference: "Joshua 1:9",
    words: ["Be", "strong", "and", "courageous"],
  },
  {
    reference: "Matthew 19:26",
    words: ["With", "God", "all", "things", "are", "possible"],
  },
  {
    reference: "Psalm 46:1",
    words: ["God", "is", "our", "refuge", "and", "strength"],
  },
  {
    reference: "Isaiah 41:10",
    words: ["Fear", "not", "for", "I", "am", "with", "you"],
  },
  {
    reference: "Jeremiah 29:11",
    words: ["I", "know", "the", "plans", "I", "have", "for", "you"],
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const TOTAL_ROUNDS = 8;
const TIME_PER_ROUND = 45;
const SPARKS_PER_VERSE = 15;
const PERFECT_BONUS = 30;

export default function VerseScramble({ onComplete }: GameProps) {
  const [verses] = useState(() => shuffleArray(VERSES).slice(0, TOTAL_ROUNDS));
  const [round, setRound] = useState(0);
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_ROUND);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const currentVerse = verses[round] || verses[0];

  // Initialize scrambled words for current round
  useEffect(() => {
    if (verses.length > 0) {
      setScrambled(shuffleArray(verses[round]?.words || verses[0].words));
      setSelected([]);
    }
  }, [round, verses]);

  // Timer
  useEffect(() => {
    if (gameOver || feedback) return;
    if (timeLeft <= 0) {
      setFeedback("wrong");
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, feedback]);

  const advanceRound = useCallback(() => {
    const next = round + 1;
    if (next >= TOTAL_ROUNDS) {
      setGameOver(true);
      const totalSparks =
        score + (correct === TOTAL_ROUNDS ? PERFECT_BONUS : 0);
      onComplete(totalSparks);
      return;
    }
    setRound(next);
    setTimeLeft(TIME_PER_ROUND);
    setFeedback(null);
  }, [round, score, correct, onComplete]);

  // Auto-advance on feedback
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => advanceRound(), 2000);
    return () => clearTimeout(timer);
  }, [feedback, advanceRound]);

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (feedback || gameOver) return;

    if (fromSelected) {
      // Move word back to scrambled pool
      const idx = selected.indexOf(word);
      if (idx === -1) return;
      const newSelected = [...selected];
      newSelected.splice(idx, 1);
      setSelected(newSelected);
      setScrambled((prev) => [...prev, word]);
    } else {
      // Move word to selected
      const idx = scrambled.indexOf(word);
      if (idx === -1) return;
      const newScrambled = [...scrambled];
      newScrambled.splice(idx, 1);
      setScrambled(newScrambled);
      setSelected((prev) => [...prev, word]);
    }
  };

  const handleSubmit = useCallback(() => {
    if (feedback || gameOver) return;

    const isCorrect = selected.join(" ") === currentVerse.words.join(" ");
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setScore((s) => s + SPARKS_PER_VERSE);
      setCorrect((c) => c + 1);
    }
  }, [feedback, gameOver, selected, currentVerse]);

  // Auto-check when all words are placed
  useEffect(() => {
    if (
      selected.length === currentVerse.words.length &&
      !feedback &&
      !gameOver
    ) {
      // Small delay so the user can see their arrangement
      const timer = setTimeout(() => handleSubmit(), 500);
      return () => clearTimeout(timer);
    }
  }, [selected, currentVerse, feedback, gameOver, handleSubmit]);

  const timerPct = (timeLeft / TIME_PER_ROUND) * 100;
  const timerColor =
    timeLeft > 25
      ? "bg-kids-green"
      : timeLeft > 10
        ? "bg-kids-orange"
        : "bg-accent-red";

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
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

      {/* Score */}
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

      {/* Verse card */}
      <div
        className={`
          relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border-2 w-full transition-all duration-300
          ${feedback === "correct" ? "border-kids-green" : ""}
          ${feedback === "wrong" ? "border-accent-red shake" : ""}
          ${!feedback ? "border-slate-100 dark:border-slate-800" : ""}
        `}
      >
        {/* Feedback overlay */}
        {feedback && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 rounded-3xl z-10 gap-2">
            <span
              className={`material-symbols-outlined text-7xl ${feedback === "correct" ? "text-kids-green" : "text-accent-red"}`}
            >
              {feedback === "correct" ? "check_circle" : "cancel"}
            </span>
            <p className="text-lg font-bold text-text-main dark:text-white">
              {currentVerse.words.join(" ")}
            </p>
            <p className="text-sm text-text-muted dark:text-slate-400 font-bold">
              — {currentVerse.reference}
            </p>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-3xl text-kids-orange">
            menu_book
          </span>
        </div>
        <p className="text-center text-sm font-bold text-kids-orange mb-1">
          {currentVerse.reference}
        </p>
        <p className="text-center text-text-muted dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-6">
          Put the words in the correct order!
        </p>

        {/* Selected words (answer area) */}
        <div className="min-h-[60px] bg-slate-50 dark:bg-slate-800 rounded-2xl p-3 mb-6 flex flex-wrap gap-2 items-start border-2 border-dashed border-slate-200 dark:border-slate-700">
          {selected.length === 0 && (
            <p className="text-sm text-slate-400 dark:text-slate-500 w-full text-center py-3">
              Tap words below to build the verse...
            </p>
          )}
          {selected.map((word, i) => (
            <button
              key={`s-${i}`}
              onClick={() => handleWordClick(word, true)}
              disabled={!!feedback}
              className="px-3 py-2 bg-kids-blue text-white rounded-xl text-sm font-bold hover:bg-kids-blue/80 active:scale-95 transition-all shadow-sm"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Scrambled word pool */}
        <div className="flex flex-wrap gap-2 justify-center">
          {scrambled.map((word, i) => (
            <button
              key={`w-${i}`}
              onClick={() => handleWordClick(word, false)}
              disabled={!!feedback}
              className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-text-main dark:text-white rounded-xl text-sm font-bold hover:bg-kids-orange/20 hover:text-kids-orange active:scale-95 transition-all"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Manual submit (if they want to submit before auto-check) */}
        {selected.length === currentVerse.words.length && !feedback && (
          <button
            onClick={handleSubmit}
            className="mt-6 mx-auto py-3 px-10 rounded-2xl text-lg font-black bg-kids-green text-white hover:bg-kids-green/90 shadow-lg shadow-kids-green/20 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">check</span>
            Check Answer
          </button>
        )}
      </div>
    </div>
  );
}
