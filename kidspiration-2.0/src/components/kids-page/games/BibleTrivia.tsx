import { useState, useEffect, useCallback } from "react";
import type { GameProps } from "./GameShell";

const QUESTIONS = [
  {
    question: "Who built the ark to save animals from a great flood?",
    choices: ["Abraham", "Moses", "Noah", "David"],
    answer: 2,
    fact: "God told Noah to build an ark 450 feet long — longer than a football field!",
  },
  {
    question: "Who defeated the giant Goliath with a sling and a stone?",
    choices: ["Samson", "David", "Joshua", "Gideon"],
    answer: 1,
    fact: "David was just a young shepherd boy when he defeated the mighty warrior Goliath!",
  },
  {
    question: "What sea did Moses part to help the Israelites escape Egypt?",
    choices: ["Dead Sea", "Red Sea", "Sea of Galilee", "Mediterranean Sea"],
    answer: 1,
    fact: "God used a strong east wind to push back the waters of the Red Sea all night!",
  },
  {
    question: "Who was thrown into a den of lions but was kept safe by God?",
    choices: ["Daniel", "Elijah", "Jonah", "Paul"],
    answer: 0,
    fact: "Daniel prayed three times a day no matter what — even when it was made illegal!",
  },
  {
    question: "What did God create on the very first day?",
    choices: ["Animals", "Water", "Light", "Trees"],
    answer: 2,
    fact: "God said 'Let there be light!' and there was light — Genesis 1:3!",
  },
  {
    question: "Who was swallowed by a great fish?",
    choices: ["Peter", "Jonah", "Paul", "John"],
    answer: 1,
    fact: "Jonah spent three days and three nights inside the great fish before it spit him out!",
  },
  {
    question: "How many disciples did Jesus have?",
    choices: ["7", "10", "12", "15"],
    answer: 2,
    fact: "The 12 disciples traveled with Jesus and learned from Him for about 3 years!",
  },
  {
    question: "What is the first book of the Bible?",
    choices: ["Exodus", "Psalms", "Matthew", "Genesis"],
    answer: 3,
    fact: "Genesis means 'beginning' — it tells the story of how God created the world!",
  },
  {
    question: "Who was the first man God created?",
    choices: ["Noah", "Abraham", "Adam", "Moses"],
    answer: 2,
    fact: "God formed Adam from the dust of the ground and breathed life into him!",
  },
  {
    question: "What did Jesus turn water into at a wedding?",
    choices: ["Milk", "Juice", "Wine", "Honey"],
    answer: 2,
    fact: "This was Jesus' very first miracle, at a wedding in Cana!",
  },
  {
    question: "Who led the Israelites out of slavery in Egypt?",
    choices: ["Joshua", "Moses", "Aaron", "Joseph"],
    answer: 1,
    fact: "God spoke to Moses through a burning bush that was not consumed by the fire!",
  },
  {
    question: "What gift did the Wise Men NOT bring to baby Jesus?",
    choices: ["Gold", "Silver", "Frankincense", "Myrrh"],
    answer: 1,
    fact: "The Wise Men brought gold, frankincense, and myrrh — they followed a special star to find Jesus!",
  },
  {
    question: "Where was Jesus born?",
    choices: ["Nazareth", "Jerusalem", "Bethlehem", "Egypt"],
    answer: 2,
    fact: "Jesus was born in a manger in Bethlehem because there was no room at the inn!",
  },
  {
    question: "How many days did God take to create the world?",
    choices: ["5", "6", "7", "10"],
    answer: 1,
    fact: "God created the world in 6 days and rested on the 7th day!",
  },
  {
    question: "Who was known as the strongest man in the Bible?",
    choices: ["David", "Goliath", "Samson", "Joshua"],
    answer: 2,
    fact: "Samson's strength came from God, and his hair was a sign of his special promise to God!",
  },
];

function pickQuestions(count: number) {
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 25;
const SPARKS_PER_CORRECT = 12;
const SPEED_BONUS = 5;
const PERFECT_BONUS = 30;

export default function BibleTrivia({ onComplete }: GameProps) {
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
      setSelectedAnswer(-1);
      setShowResult(true);
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

  // Auto-advance after showing result
  useEffect(() => {
    if (!showResult) return;
    const timer = setTimeout(() => advanceRound(), 2800);
    return () => clearTimeout(timer);
  }, [showResult, advanceRound]);

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
    },
    [showResult, gameOver, currentQ, timeLeft],
  );

  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor =
    timeLeft > 15
      ? "bg-kids-green"
      : timeLeft > 7
        ? "bg-kids-orange"
        : "bg-accent-red";

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
      {/* Progress */}
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

      {/* Question */}
      <div
        className={`
          relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border-2 w-full transition-all duration-300
          ${showResult && selectedAnswer === currentQ.answer ? "border-kids-green" : ""}
          ${showResult && selectedAnswer !== currentQ.answer ? "border-accent-red" : ""}
          ${!showResult ? "border-slate-100 dark:border-slate-800" : ""}
        `}
      >
        <div className="flex justify-center mb-4">
          <span className="material-symbols-outlined text-4xl text-kids-orange">
            menu_book
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-black text-text-main dark:text-white text-center mb-8 font-display">
          {currentQ.question}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQ.choices.map((choice, idx) => {
            const isCorrectChoice = idx === currentQ.answer;
            const isSelected = idx === selectedAnswer;

            let btnClass =
              "bg-slate-100 dark:bg-slate-800 text-text-main dark:text-white hover:bg-kids-orange/15 hover:text-kids-orange hover:-translate-y-0.5 hover:shadow-md active:scale-95";

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

        {/* Fun fact */}
        {showResult && (
          <div className="mt-6 p-4 bg-kids-orange/10 dark:bg-kids-orange/20 rounded-2xl flex items-start gap-3">
            <span className="material-symbols-outlined text-kids-orange text-xl mt-0.5">
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
