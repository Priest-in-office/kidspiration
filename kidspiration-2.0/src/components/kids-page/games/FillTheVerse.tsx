import { useState, useEffect, useCallback } from "react";
import type { GameProps } from "./GameShell";

const FILL_VERSES = [
  {
    reference: "John 3:16",
    before: "For God so loved the",
    blank: "world",
    after: "that He gave His only Son.",
    choices: ["world", "church", "sky", "city"],
  },
  {
    reference: "Psalm 23:1",
    before: "The Lord is my",
    blank: "shepherd",
    after: "I shall not want.",
    choices: ["teacher", "shepherd", "king", "father"],
  },
  {
    reference: "Proverbs 3:5",
    before: "Trust in the Lord with all your",
    blank: "heart",
    after: "and lean not on your own understanding.",
    choices: ["mind", "strength", "heart", "soul"],
  },
  {
    reference: "Philippians 4:13",
    before: "I can do all things through",
    blank: "Christ",
    after: "who strengthens me.",
    choices: ["myself", "Christ", "prayer", "others"],
  },
  {
    reference: "Genesis 1:1",
    before: "In the beginning God created the heavens and the",
    blank: "earth",
    after: ".",
    choices: ["stars", "moon", "earth", "sea"],
  },
  {
    reference: "Psalm 119:105",
    before: "Your word is a",
    blank: "lamp",
    after: "to my feet and a light to my path.",
    choices: ["lamp", "guide", "star", "gift"],
  },
  {
    reference: "Matthew 28:20",
    before: "I am with you",
    blank: "always",
    after: "to the end of the age.",
    choices: ["sometimes", "always", "often", "today"],
  },
  {
    reference: "Romans 8:28",
    before: "All things work together for",
    blank: "good",
    after: "for those who love God.",
    choices: ["fun", "good", "peace", "joy"],
  },
  {
    reference: "Joshua 1:9",
    before: "Be strong and",
    blank: "courageous",
    after: "Do not be afraid.",
    choices: ["quiet", "patient", "courageous", "humble"],
  },
  {
    reference: "Isaiah 41:10",
    before: "Fear not, for I am",
    blank: "with",
    after: "you.",
    choices: ["above", "near", "behind", "with"],
  },
  {
    reference: "Psalm 46:1",
    before: "God is our refuge and",
    blank: "strength",
    after: "a very present help in trouble.",
    choices: ["peace", "joy", "strength", "hope"],
  },
  {
    reference: "Jeremiah 29:11",
    before: "I know the",
    blank: "plans",
    after: "I have for you, declares the Lord.",
    choices: ["plans", "words", "gifts", "songs"],
  },
];

function pickVerses(count: number) {
  const shuffled = [...FILL_VERSES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const TOTAL_ROUNDS = 10;
const TIME_PER_ROUND = 20;
const SPARKS_PER_CORRECT = 12;
const SPEED_BONUS = 5;
const PERFECT_BONUS = 30;

export default function FillTheVerse({ onComplete }: GameProps) {
  const [verses] = useState(() => pickVerses(TOTAL_ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_ROUND);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentVerse = verses[round] || verses[0];
  const correctIdx = currentVerse.choices.indexOf(currentVerse.blank);

  // Timer
  useEffect(() => {
    if (gameOver || showResult) return;
    if (timeLeft <= 0) {
      setSelectedIdx(-1);
      setShowResult(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, showResult]);

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
    setSelectedIdx(null);
    setShowResult(false);
  }, [round, score, correct, onComplete]);

  // Auto-advance
  useEffect(() => {
    if (!showResult) return;
    const timer = setTimeout(() => advanceRound(), 2500);
    return () => clearTimeout(timer);
  }, [showResult, advanceRound]);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (showResult || gameOver) return;
      setSelectedIdx(idx);
      setShowResult(true);

      if (idx === correctIdx) {
        const speedBonus = timeLeft > TIME_PER_ROUND - 5 ? SPEED_BONUS : 0;
        setScore((s) => s + SPARKS_PER_CORRECT + speedBonus);
        setCorrect((c) => c + 1);
      }
    },
    [showResult, gameOver, correctIdx, timeLeft],
  );

  const timerPct = (timeLeft / TIME_PER_ROUND) * 100;
  const timerColor =
    timeLeft > 12
      ? "bg-kids-green"
      : timeLeft > 6
        ? "bg-kids-orange"
        : "bg-accent-red";

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
      {/* Progress */}
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
          ${showResult && selectedIdx === correctIdx ? "border-kids-green" : ""}
          ${showResult && selectedIdx !== correctIdx ? "border-accent-red" : ""}
          ${!showResult ? "border-slate-100 dark:border-slate-800" : ""}
        `}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-3xl text-kids-orange">
            auto_stories
          </span>
        </div>
        <p className="text-center text-sm font-bold text-kids-orange mb-6">
          {currentVerse.reference}
        </p>

        {/* Verse with blank */}
        <div className="text-center text-xl md:text-2xl font-bold text-text-main dark:text-white mb-8 leading-relaxed font-display">
          <span>{currentVerse.before} </span>
          <span
            className={`
              inline-block min-w-[80px] border-b-4 px-2 py-1 mx-1 font-black text-center
              ${
                showResult
                  ? selectedIdx === correctIdx
                    ? "border-kids-green text-kids-green"
                    : "border-accent-red text-accent-red"
                  : "border-kids-blue text-kids-blue"
              }
            `}
          >
            {showResult ? currentVerse.blank : "______"}
          </span>
          <span> {currentVerse.after}</span>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-2 gap-3">
          {currentVerse.choices.map((choice, idx) => {
            const isCorrectChoice = idx === correctIdx;
            const isSelected = idx === selectedIdx;

            let btnClass =
              "bg-slate-100 dark:bg-slate-800 text-text-main dark:text-white hover:bg-kids-blue/15 hover:text-kids-blue hover:-translate-y-0.5 hover:shadow-md active:scale-95";

            if (showResult) {
              if (isCorrectChoice) {
                btnClass =
                  "bg-kids-green text-white scale-[1.02] shadow-lg shadow-kids-green/20";
              } else if (isSelected && !isCorrectChoice) {
                btnClass = "bg-accent-red text-white shake";
              } else {
                btnClass =
                  "bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showResult}
                className={`py-4 px-6 rounded-2xl text-lg font-black transition-all duration-200 text-center ${btnClass}`}
              >
                {choice}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
