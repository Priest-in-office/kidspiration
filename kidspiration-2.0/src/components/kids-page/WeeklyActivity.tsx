const days = [
  { label: "M", pct: 100, active: true },
  { label: "T", pct: 75, active: true },
  { label: "W", pct: 50, active: true },
  { label: "T", pct: 0, active: false },
  { label: "F", pct: 0, active: false },
];

const widthMap: Record<number, string> = {
  100: "w-full",
  75: "w-3/4",
  50: "w-1/2",
  0: "w-0",
};

export default function WeeklyActivity() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-text-main dark:text-white font-display">
          Your Week
        </h3>
        <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">
          Level 5
        </span>
      </div>

      <div className="space-y-3">
        {days.map((d, i) => (
          <div
            key={`${d.label}-${i}`}
            className={`flex items-center gap-3 ${!d.active ? "opacity-40" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                d.active
                  ? "bg-kids-blue/20 text-kids-blue"
                  : "bg-slate-100 text-slate-400 dark:bg-slate-800"
              }`}
            >
              {d.label}
            </div>
            <div className="flex-1 h-2 bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
              {d.active && (
                <div
                  className={`h-full bg-kids-blue ${widthMap[d.pct] ?? "w-0"}`}
                />
              )}
            </div>
            {d.active && (
              <span className="text-xs font-bold text-kids-blue">{d.pct}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
