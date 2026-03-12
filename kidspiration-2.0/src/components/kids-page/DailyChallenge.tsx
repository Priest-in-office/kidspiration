import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useKids } from "../../context/KidsContext";
import {
  getTodayChallenge,
  secondsUntilMidnight,
  TYPE_META,
  TYPE_TO_GAME,
} from "../../data/challenges";

export default function DailyChallenge() {
  const { completedChallenges, completeChallenge, streak } = useKids();
  const navigate = useNavigate();

  const challenge = getTodayChallenge(completedChallenges);
  const isCompleted = completedChallenges.includes(challenge.id);
  const meta = TYPE_META[challenge.type];
  const game = TYPE_TO_GAME[challenge.type];

  // Live countdown to midnight
  const [secsLeft, setSecsLeft] = useState(secondsUntilMidnight());
  useEffect(() => {
    const interval = setInterval(
      () => setSecsLeft(secondsUntilMidnight()),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(secsLeft / 3600);
  const mins = Math.floor((secsLeft % 3600) / 60);

  const handleStart = () => {
    if (isCompleted) return;
    navigate(`/kids/game/${game.gameId}`);
  };

  const handleClaim = () => {
    if (isCompleted) return;
    completeChallenge(challenge.id, challenge.sparksReward);
  };

  return (
    <section className="bg-linear-to-r from-kids-green/10 to-kids-blue/10 rounded-3xl p-1 shadow-lg border-2 border-dashed border-kids-green/30 relative overflow-hidden group">
      <div className="bg-white dark:bg-slate-900 rounded-[1.3rem] p-6 h-full relative z-10">
        {/* Decorative watermark */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-9xl text-kids-green rotate-12">
            emoji_events
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          {/* Icon */}
          <div className="shrink-0 relative">
            <div
              className={`w-24 h-24 bg-${meta.color}/20 rounded-full flex items-center justify-center text-${meta.color} border-4 border-white shadow-md dark:border-slate-800`}
            >
              <span className="material-symbols-outlined text-5xl">
                {meta.icon}
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-black px-2 py-1 rounded-lg shadow-sm border-2 border-white dark:border-slate-800">
              +{challenge.sparksReward}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span
                className={`bg-${meta.color} text-white text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wide`}
              >
                Daily Challenge
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md bg-${meta.color}/10 text-${meta.color}`}
              >
                {meta.label}
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  schedule
                </span>
                {hours}h {mins}m left
              </span>
            </div>

            <h3 className="text-2xl font-black text-text-main dark:text-white mb-1 font-display">
              {challenge.title}
            </h3>
            <p className="text-sm text-text-muted dark:text-slate-400 mb-3">
              {challenge.description}
            </p>

            {/* Streak */}
            {streak > 0 && (
              <div className="flex items-center gap-1 text-xs font-bold text-kids-orange mb-2">
                <span className="material-symbols-outlined text-sm">
                  local_fire_department
                </span>
                {streak}-day streak!
              </div>
            )}

            {/* Progress */}
            {isCompleted ? (
              <div className="flex items-center gap-2 text-kids-green font-bold text-sm">
                <span className="material-symbols-outlined">check_circle</span>
                Challenge Completed! +{challenge.sparksReward} sparks earned
              </div>
            ) : (
              <div className="w-full bg-slate-100 rounded-full h-4 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div
                  className={`bg-${meta.color} h-full rounded-full transition-all duration-1000 relative`}
                  style={{ width: "0%" }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 rounded-full animate-pulse" />
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          {isCompleted ? (
            <div className="shrink-0 bg-kids-green/10 text-kids-green font-black py-3 px-6 rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined">verified</span>
              Done!
            </div>
          ) : (
            <div className="shrink-0 flex flex-col gap-2">
              <button
                onClick={handleStart}
                className={`bg-${meta.color} hover:opacity-90 text-white font-black py-3 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2`}
              >
                Play {game.gameName}
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
              <button
                onClick={handleClaim}
                className="text-xs font-bold text-text-muted hover:text-kids-green transition-colors text-center"
              >
                Already done? Claim reward →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
