import { useKids } from "../../context/KidsContext";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SHORT_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export default function WeeklyActivity() {
  const { weeklyProgress, streak } = useKids();
  const todayIdx = new Date().getDay(); // 0 = Sunday

  // Compute level from total progress
  const totalPct = DAY_LABELS.reduce(
    (sum, day) => sum + (weeklyProgress[day] ?? 0),
    0,
  );
  const level = Math.max(1, Math.floor(totalPct / 100) + 1);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-text-main dark:text-white font-display">
          Your Week
        </h3>
        <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">
          Level {level}
        </span>
      </div>

      {/* Streak bar */}
      {streak > 0 && (
        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-kids-orange bg-kids-orange/10 px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-sm">
            local_fire_department
          </span>
          {streak}-day streak — keep it going!
        </div>
      )}

      <div className="space-y-3">
        {DAY_LABELS.map((day, i) => {
          const pct = weeklyProgress[day] ?? 0;
          const isToday = i === todayIdx;
          const isPast = i < todayIdx;
          const active = isToday || isPast;

          return (
            <div
              key={`${day}-${i}`}
              className={`flex items-center gap-3 ${!active ? "opacity-40" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  isToday
                    ? "bg-primary/20 text-primary ring-2 ring-primary"
                    : active
                      ? "bg-kids-blue/20 text-kids-blue"
                      : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                }`}
              >
                {SHORT_LABELS[i]}
              </div>
              <div className="flex-1 h-2 bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                {active && (
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isToday ? "bg-primary" : "bg-kids-blue"
                    }`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                )}
              </div>
              {active && (
                <span
                  className={`text-xs font-bold min-w-[32px] text-right ${
                    isToday ? "text-primary" : "text-kids-blue"
                  }`}
                >
                  {pct}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
