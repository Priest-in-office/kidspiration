export default function DailyChallenge() {
  const completed = 2;
  const total = 3;
  const pct = Math.round((completed / total) * 100);

  return (
    <section className="bg-gradient-to-r from-kids-green/10 to-kids-blue/10 rounded-3xl p-1 shadow-lg border-2 border-dashed border-kids-green/30 relative overflow-hidden group">
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
            <div className="w-24 h-24 bg-kids-green/20 rounded-full flex items-center justify-center text-kids-green border-4 border-white shadow-md dark:border-slate-800">
              <span className="material-symbols-outlined text-5xl">
                rocket_launch
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-black px-2 py-1 rounded-lg shadow-sm border-2 border-white dark:border-slate-800">
              +50 Sparks
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="bg-kids-green text-white text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                Daily Challenge
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  schedule
                </span>{" "}
                Ends in 4h
              </span>
            </div>

            <h3 className="text-2xl font-black text-text-main dark:text-white mb-2 font-display">
              Complete 3 Math Puzzles
            </h3>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-4 mb-3 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div
                className="bg-kids-green h-full rounded-full transition-all duration-1000 relative"
                style={{ width: `${pct}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 rounded-full animate-pulse" />
              </div>
            </div>

            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 flex justify-between">
              <span>
                {completed}/{total} Puzzles Completed
              </span>
              <span className="text-kids-green">{pct}%</span>
            </p>
          </div>

          {/* CTA */}
          <button className="shrink-0 bg-kids-green hover:bg-kids-green/90 text-white font-black py-3 px-8 rounded-xl shadow-lg shadow-kids-green/20 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
            Start Challenge
            <span className="material-symbols-outlined">play_arrow</span>
          </button>
        </div>
      </div>
    </section>
  );
}
