import { Link } from "react-router-dom";
import { GAMES } from "../../data/games";
// Map dynamic color tokens to actual class strings so Tailwind can detect them
const colorMap: Record<string, { bg: string; text: string; tagBg: string }> = {
  "kids-green": {
    bg: "bg-kids-green/10",
    text: "text-kids-green",
    tagBg: "bg-kids-green/10",
  },
  "kids-blue": {
    bg: "bg-kids-blue/10",
    text: "text-kids-blue",
    tagBg: "bg-kids-blue/10",
  },
  "kids-pink": {
    bg: "bg-kids-pink/10",
    text: "text-kids-pink",
    tagBg: "bg-kids-pink/10",
  },
  "kids-orange": {
    bg: "bg-kids-orange/10",
    text: "text-kids-orange",
    tagBg: "bg-kids-orange/10",
  },
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    tagBg: "bg-primary/10",
  },
};

export default function GameZone() {
  return (
    <section className="bg-primary/5 rounded-3xl p-6 border-2 border-primary/20 dark:bg-slate-800/50 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-kids-orange/20 p-2.5 rounded-xl text-kids-orange">
            <span className="material-symbols-outlined text-3xl">
              sports_esports
            </span>
          </div>
          <h3 className="text-2xl font-black text-text-main dark:text-white font-display">
            Game Zone
          </h3>
        </div>
        <button className="text-kids-orange font-bold hover:bg-kids-orange/10 px-4 py-2 rounded-xl transition-colors flex items-center gap-1">
          View All{" "}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {GAMES.map((g) => {
          const clr = colorMap[g.tagColor] ?? colorMap.primary;
          return (
            <Link
              to={`/kids/game/${g.id}`}
              key={g.name}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Dark card with colored accent icon */}
              <div className="aspect-square w-full bg-slate-100 dark:bg-slate-800 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Subtle colored ring */}
                <div
                  className={`absolute w-20 h-20 rounded-full border-4 ${clr.text} opacity-15`}
                />
                {/* Large accent-colored icon */}
                <span
                  className={`material-symbols-outlined text-7xl ${clr.text} drop-shadow group-hover:scale-110 transition-transform duration-300 relative z-10`}
                >
                  {g.icon}
                </span>
              </div>
              <div className="p-3 text-center">
                <h4 className="font-bold text-text-main dark:text-white truncate text-sm">
                  {g.name}
                </h4>
                <span
                  className={`text-[10px] font-bold ${clr.text} ${clr.tagBg} px-2 py-0.5 rounded-full mt-1 inline-block`}
                >
                  {g.tag}
                </span>
              </div>
            </Link>
          );
        })}

        {/* More Games placeholder */}
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700">
          <div className="text-center p-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400 dark:bg-slate-800">
              <span className="material-symbols-outlined">add</span>
            </div>
            <h4 className="font-bold text-slate-400 text-sm">More Games</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
