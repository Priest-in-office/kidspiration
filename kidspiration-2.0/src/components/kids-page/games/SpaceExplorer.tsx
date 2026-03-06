import { useState, useEffect, useCallback } from "react";
import type { GameProps } from "./GameShell";

// Curated, kid-safe space facts — no external API
const QUESTIONS = [
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1,
    fact: "Mars looks red because its soil contains iron oxide (rust)!",
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Saturn", "Jupiter", "Neptune"],
    answer: 2,
    fact: "Jupiter is so big that over 1,300 Earths could fit inside it!",
  },
  {
    question: "How many planets are in our solar system?",
    choices: ["7", "8", "9", "10"],
    answer: 1,
    fact: "There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune!",
  },
  {
    question: "What is the name of Earth's natural satellite?",
    choices: ["The Sun", "The Moon", "Mars", "A Star"],
    answer: 1,
    fact: "The Moon is about 384,400 km away from Earth!",
  },
  {
    question: "Which planet has beautiful rings around it?",
    choices: ["Mars", "Venus", "Saturn", "Mercury"],
    answer: 2,
    fact: "Saturn's rings are made of ice, rocks, and dust!",
  },
  {
    question: "What do astronauts wear in space?",
    choices: ["Raincoat", "Spacesuit", "Wetsuit", "Jacket"],
    answer: 1,
    fact: "A spacesuit weighs about 127 kg on Earth but nothing in space!",
  },
  {
    question: "Which planet is closest to the Sun?",
    choices: ["Venus", "Earth", "Mercury", "Mars"],
    answer: 2,
    fact: "Mercury can reach temperatures of 430°C during the day!",
  },
  {
    question: "What is a group of stars that form a pattern called?",
    choices: ["Galaxy", "Constellation", "Nebula", "Asteroid"],
    answer: 1,
    fact: "There are 88 officially recognized constellations in the sky!",
  },
  {
    question: "What force keeps us on the ground?",
    choices: ["Magnetism", "Wind", "Gravity", "Electricity"],
    answer: 2,
    fact: "Gravity is what makes things fall down and keeps planets in orbit!",
  },
  {
    question: "What is the Sun?",
    choices: ["A planet", "A moon", "A star", "An asteroid"],
    answer: 2,
    fact: "The Sun is a medium-sized star. It's about 4.6 billion years old!",
  },
  {
    question: "Which planet spins on its side?",
    choices: ["Neptune", "Uranus", "Mars", "Jupiter"],
    answer: 1,
    fact: "Uranus tilts at 98 degrees — scientists think a big collision caused it!",
  },
  {
    question: "What galaxy do we live in?",
    choices: ["Andromeda", "Milky Way", "Pinwheel", "Sombrero"],
    answer: 1,
    fact: "The Milky Way has between 100–400 billion stars!",
  },
  {
    question: "Who was the first person to walk on the Moon?",
    choices: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
    answer: 2,
    fact: "Neil Armstrong walked on the Moon on July 20, 1969!",
  },
  {
    question: "What do we call a rock that falls from space and hits Earth?",
    choices: ["Comet", "Asteroid", "Meteorite", "Star"],
    answer: 2,
    fact: "About 17 meteorites fall to Earth every day!",
  },
  {
    question: "Which planet is the hottest in our solar system?",
    choices: ["Mercury", "Venus", "Mars", "Jupiter"],
    answer: 1,
    fact: "Venus is hotter than Mercury because its thick atmosphere traps heat!",
  },
];

function pickQuestions(count: number) {
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 20;
const SPARKS_PER_CORRECT = 10;
const SPEED_BONUS = 5; // extra for answering within 5s
const PERFECT_BONUS = 30;

export default function SpaceExplorer({ onComplete }: GameProps) {
  const [questions] = useState(() => pickQuestions(TOTAL_QUESTIONS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentQ = questions[round] || questions[0];

  // Countdown timer
  useEffect(() => {
    if (gameOver || showResult) return;

    if (timeLeft <= 0) {
      // Time's up
      setSelectedAnswer(-1);
      setShowResult(true);
      setTimeout(() => advanceRound(), 2500);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, showResult]);

  const advanceRound = useCallback(() => {
    const next = round + 1;
    if (next >= TOTAL_QUESTIONS) {
      setGameOver(true);
      const totalSparks =
        score + (correct === TOTAL_QUESTIONS ? PERFECT_BONUS : 0);
      onComplete(totalSparks);
      return;
    }
    setRound(next);
    setTimeLeft(TIME_PER_QUESTION);
    setSelectedAnswer(null);
    setShowResult(false);
  }, [round, score, correct, onComplete]);

  const handleAnswer = useCallback(
    (choiceIdx: number) => {
      if (showResult || gameOver) return;

      setSelectedAnswer(choiceIdx);
      setShowResult(true);

      const isCorrect = choiceIdx === currentQ.answer;
      if (isCorrect) {
        const speedBonus = timeLeft > TIME_PER_QUESTION - 5 ? SPEED_BONUS : 0;
        setScore((s) => s + SPARKS_PER_CORRECT + speedBonus);
        setCorrect((c) => c + 1);
      }

      setTimeout(() => advanceRound(), 2500);
    },
    [showResult, gameOver, currentQ, timeLeft, advanceRound],
  );

  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor =
    timeLeft > 12
      ? "bg-kids-green"
      : timeLeft > 6
        ? "bg-kids-orange"
        : "bg-accent-red";

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
      {/* Progress & Timer */}
      <div className="w-full flex items-center justify-between gap-4">
        <span className="text-sm font-bold text-text-muted dark:text-slate-400">
          {round + 1} / {TOTAL_QUESTIONS}
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
          {correct} correct
        </div>
        <div className="flex items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-base">stars</span>
          {score} sparks
        </div>
      </div>

      {/* Question card */}
      <div
        className={`
          relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border-2
          w-full transition-all duration-300
          ${showResult && selectedAnswer === currentQ.answer ? "border-kids-green" : ""}
          ${showResult && selectedAnswer !== currentQ.answer ? "border-accent-red" : ""}
          ${!showResult ? "border-slate-100 dark:border-slate-800" : ""}
        `}
      >
        {/* Space theme icon */}
        <div className="flex justify-center mb-4">
          <span className="material-symbols-outlined text-4xl text-kids-blue">
            rocket_launch
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-black text-text-main dark:text-white text-center mb-8 font-display">
          {currentQ.question}
        </h3>

        {/* Answer choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQ.choices.map((choice, idx) => {
            const isCorrectChoice = idx === currentQ.answer;
            const isSelected = idx === selectedAnswer;

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
                className={`py-4 px-6 rounded-2xl text-lg font-bold transition-all duration-200 text-left ${btnClass}`}
              >
                <span className="font-black text-sm text-current/50 mr-2">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {choice}
              </button>
            );
          })}
        </div>

        {/* Fun fact on answer reveal */}
        {showResult && (
          <div className="mt-6 p-4 bg-kids-blue/10 dark:bg-kids-blue/20 rounded-2xl flex items-start gap-3">
            <span className="material-symbols-outlined text-kids-blue text-xl mt-0.5">
              auto_awesome
            </span>
            <p className="text-sm font-bold text-text-main dark:text-white">
              {currentQ.fact}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
